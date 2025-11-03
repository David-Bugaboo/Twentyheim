import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

// IndexedDB utilities
const DB_NAME = "twentyheim-cache";
const DB_VERSION = 2; // Mesma versão para garantir compatibilidade entre stores
const STORE_NAME = "json-data";

/**
 * Adiciona o campo updatedAt ao conteúdo JSON antes de salvar
 * - Se for array: transforma em { data: array, updatedAt: string }
 * - Se for objeto: adiciona updatedAt diretamente
 */
function addUpdatedAtToContent(content: any): any {
  const updatedAt = new Date().toISOString();
  
  if (Array.isArray(content)) {
    return {
      data: content,
      updatedAt,
    };
  } else if (content && typeof content === 'object') {
    return {
      ...content,
      updatedAt,
    };
  }
  
  // Para outros tipos (string, number, etc), mantém como está
  return content;
}

/**
 * Remove o campo updatedAt do conteúdo antes de usar
 * Para manter compatibilidade com código que espera o formato original
 */
function removeUpdatedAtFromContent(content: any): any {
  if (!content || typeof content !== 'object') {
    return content;
  }
  
  // Se tiver estrutura { data: [...], updatedAt: ... }, retorna apenas o array
  if ('data' in content && Array.isArray(content.data) && 'updatedAt' in content) {
    return content.data;
  }
  
  // Se for objeto com updatedAt, remove a propriedade
  if ('updatedAt' in content) {
    const { updatedAt, ...rest } = content;
    return rest;
  }
  
  return content;
}

async function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const oldVersion = event.oldVersion;
      
      // Se está migrando da versão 1, preserva stores existentes e cria novas
      if (oldVersion < 2) {
        // Cria store json-data se não existir
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: "id" });
        }
        // Cria store local-warbands se não existir
        if (!db.objectStoreNames.contains("local-warbands")) {
          db.createObjectStore("local-warbands", { keyPath: "id" });
        }
      } else {
        // Para futuras versões, apenas cria se não existir
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: "id" });
        }
      }
    };
  });
}

async function getFromIndexedDB(id: string): Promise<any | null> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(id);

      request.onsuccess = () => {
        const result = request.result;
        if (result && result.content) {
          // Remove updatedAt do conteúdo antes de retornar para manter compatibilidade
          const cleanContent = removeUpdatedAtFromContent(result.content);
          resolve(cleanContent);
        } else {
          resolve(null);
        }
      };
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error("Erro ao acessar IndexedDB:", error);
    return null;
  }
}

async function saveToIndexedDB(
  id: string,
  content: any,
  source: "firestore" | "static"
): Promise<void> {
  try {
    const db = await openDB();
    // Adiciona updatedAt ao conteúdo antes de salvar
    const contentWithUpdatedAt = addUpdatedAtToContent(content);
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put({
        id,
        content: contentWithUpdatedAt,
        updatedAt: new Date().toISOString(),
        source,
      });

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error("Erro ao salvar no IndexedDB:", error);
  }
}

async function getFromFirestore(fileId: string): Promise<any | null> {
  try {
    const docRef = doc(db, "admin-data", fileId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists() && docSnap.data().content) {
      // Remove updatedAt do conteúdo antes de retornar para manter compatibilidade
      const cleanContent = removeUpdatedAtFromContent(docSnap.data().content);
      return cleanContent;
    }
    return null;
  } catch (error: any) {
    // Erro de permissão (usuário não autenticado ou não é admin)
    if (error?.code === "permission-denied") {
      console.log(`[useJsonData] ⚠️ Permissão negada no Firestore para ${fileId} (usuário não autenticado ou sem permissão de admin)`);
      return null;
    }
    // Documento não existe
    if (error?.code === "not-found") {
      console.log(`[useJsonData] 📄 Documento não encontrado no Firestore: ${fileId}`);
      return null;
    }
    // Outros erros
    console.error(`[useJsonData] ❌ Erro ao carregar do Firestore (${fileId}):`, error);
    return null;
  }
}

interface UseJsonDataOptions {
  fileId: string;
  staticImport: () => Promise<any>;
  enabled?: boolean;
}

/**
 * Hook para carregar dados JSON com fallback:
 * 1. Firestore (se existir versão editada)
 * 2. IndexedDB (cache local)
 * 3. Arquivo estático (fallback final)
 */
export function useJsonData<T = any>({
  fileId,
  staticImport,
  enabled = true,
}: UseJsonDataOptions) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [source, setSource] = useState<"firestore" | "indexeddb" | "static" | null>(null);

  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function loadData() {
      try {
        setLoading(true);
        setError(null);
        console.log(`[useJsonData] Iniciando carregamento para fileId: ${fileId}`);

        // 1. Tenta carregar do Firestore
        console.log(`[useJsonData] 🔍 Tentando carregar ${fileId} do FIRESTORE...`);
        const firestoreData = await getFromFirestore(fileId);
        if (firestoreData) {
          const itemCount = Array.isArray(firestoreData) 
            ? firestoreData.length 
            : firestoreData ? 1 : 0;
          console.log(`[useJsonData] ✅ Dados carregados do FIRESTORE para ${fileId} (${itemCount} itens)`);
          if (!cancelled) {
            setData(firestoreData);
            setSource("firestore");
            // Salva no IndexedDB como cache para próximas visitas
            try {
              await saveToIndexedDB(fileId, firestoreData, "firestore");
              console.log(`[useJsonData] 📦 Cache salvo no INDEXEDDB para ${fileId}`);
            } catch (saveError) {
              console.warn(`[useJsonData] ⚠️ Aviso: não foi possível salvar no IndexedDB:`, saveError);
              // Não bloqueia o uso dos dados, apenas não terá cache
            }
          }
          return;
        }
        console.log(`[useJsonData] ⚠️ ${fileId} não encontrado no FIRESTORE`);

        // 2. Tenta carregar do IndexedDB
        console.log(`[useJsonData] 🔍 Tentando carregar ${fileId} do INDEXEDDB...`);
        const indexedDBData = await getFromIndexedDB(fileId);
        if (indexedDBData) {
          const itemCount = Array.isArray(indexedDBData) 
            ? indexedDBData.length 
            : indexedDBData ? 1 : 0;
          console.log(`[useJsonData] ✅ Dados carregados do INDEXEDDB para ${fileId} (${itemCount} itens)`);
          if (!cancelled) {
            setData(indexedDBData);
            setSource("indexeddb");
          }
          return;
        }
        console.log(`[useJsonData] ⚠️ ${fileId} não encontrado no INDEXEDDB`);

        // 3. Fallback: carrega do arquivo estático
        console.log(`[useJsonData] 🔍 Tentando carregar ${fileId} do ARQUIVO ESTÁTICO (LOCAL)...`);
        try {
          const staticModule = await staticImport();
          const staticData = staticModule.default || staticModule;
          const itemCount = Array.isArray(staticData) 
            ? staticData.length 
            : staticData ? 1 : 0;
          console.log(`[useJsonData] ✅ Dados carregados do ARQUIVO ESTÁTICO (LOCAL) para ${fileId} (${itemCount} itens)`);
          if (!cancelled) {
            setData(staticData);
            setSource("static");
            // Salva no IndexedDB como cache
            try {
              await saveToIndexedDB(fileId, staticData, "static");
              console.log(`[useJsonData] 📦 Cache salvo no INDEXEDDB para ${fileId}`);
            } catch (saveError) {
              console.warn(`[useJsonData] ⚠️ Aviso: não foi possível salvar no IndexedDB:`, saveError);
            }
          }
        } catch (importError) {
          console.error(`[useJsonData] ❌ ERRO ao importar arquivo estático para ${fileId}:`, importError);
          throw importError; // Re-throw para ser capturado pelo catch externo
        }
      } catch (err) {
        console.error(`[useJsonData] ❌ ERRO ao carregar dados para ${fileId}:`, err);
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error("Erro desconhecido"));
        }
      } finally {
        if (!cancelled) {
          console.log(`[useJsonData] ✅ Carregamento finalizado para ${fileId} - Fonte: ${source || 'desconhecida'}`);
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileId, enabled]); // Removido staticImport das dependências para evitar loops

  return { data, loading, error, source };
}

/**
 * Função utilitária para migrar todos os dados estáticos para o Firestore
 */
export async function migrateStaticDataToFirestore(
  files: Array<{ id: string; name: string; path: string; import: () => Promise<any> }>,
  updateProgress?: (current: number, total: number, name: string) => void
) {
  const { setDoc, getDoc } = await import("firebase/firestore");
  const results = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    try {
      updateProgress?.(i + 1, files.length, file.name);

      // Verifica se o arquivo já existe no Firestore
      const docRef = doc(db, "admin-data", file.id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        console.log(`📄 Arquivo ${file.name} (${file.id}) já existe no Firestore. Pulando...`);
        results.push({ id: file.id, success: true, skipped: true });
        continue;
      }

      // Carrega o arquivo estático
      const module = await file.import();
      const content = module.default || module;

      if (!content) {
        throw new Error(`Conteúdo vazio para ${file.name}`);
      }

      // Adiciona updatedAt ao conteúdo antes de salvar
      const contentWithUpdatedAt = addUpdatedAtToContent(content);
      
      // Salva no Firestore
      await setDoc(docRef, {
        path: file.path,
        name: file.name,
        content: contentWithUpdatedAt,
        updatedAt: new Date().toISOString(),
        updatedBy: "migration-script",
        migrated: true,
      });

      console.log(`✅ Migrado ${file.name} (${file.id}) para Firestore`);

      // Também salva no IndexedDB (usa o mesmo conteúdo com updatedAt)
      await saveToIndexedDB(file.id, content, "static");

      results.push({ id: file.id, success: true });
    } catch (error: any) {
      console.error(`❌ Erro ao migrar ${file.name} (${file.id}):`, error);
      results.push({ 
        id: file.id, 
        success: false, 
        error: error?.message || String(error),
        errorCode: error?.code
      });
    }
  }

  return results;
}

