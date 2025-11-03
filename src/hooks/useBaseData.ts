import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const DB_NAME = "warband-builder-db";
const DB_VERSION = 2;
const STORE_NAME = "json-data";

async function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };
  });
}

async function getFromIndexedDB(collection: string, baseId: string): Promise<any | null> {
  try {
    const db = await openDB();
    // Para documentos individuais, usa o formato: collection/baseId
    const id = `${collection}/${baseId}`;
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(id);

      request.onsuccess = () => {
        const result = request.result;
        if (result && result.content) {
          resolve(result.content);
        } else {
          resolve(null);
        }
      };
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error(`[useBaseData] Erro ao acessar IndexedDB para ${collection}/${baseId}:`, error);
    return null;
  }
}

/**
 * Hook para buscar um dado base do Firestore usando base_id
 * Com fallback: Firestore → IndexedDB → null
 */
export function useBaseData<T = any>(
  collection: string,
  baseId: string | undefined,
  enabled: boolean = true
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!enabled || !baseId) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        console.log(`[useBaseData] 🔍 Buscando ${collection}/${baseId} do Firestore...`);

        // 1. Tenta carregar do Firestore
        if (!baseId) return; // Garante que baseId não é undefined
        const docRef = doc(db, collection, baseId);
        const docSnap = await getDoc(docRef);

        if (cancelled) return;

        if (docSnap.exists()) {
          const firestoreData = docSnap.data() as T;
          console.log(`[useBaseData] ✅ Dados carregados do FIRESTORE para ${collection}/${baseId}`);
          
          // Salva no IndexedDB como cache
          try {
            const db = await openDB();
            const transaction = db.transaction([STORE_NAME], "readwrite");
            const store = transaction.objectStore(STORE_NAME);
            const id = `${collection}/${baseId}`;
            store.put({
              id,
              content: firestoreData,
              updatedAt: new Date().toISOString(),
              source: "firestore",
            });
            console.log(`[useBaseData] 📦 Cache salvo no INDEXEDDB para ${collection}/${baseId}`);
          } catch (saveError) {
            console.warn(`[useBaseData] ⚠️ Aviso: não foi possível salvar no IndexedDB:`, saveError);
          }
          
          if (!cancelled) {
            setData(firestoreData);
          }
          return;
        }
        
        console.log(`[useBaseData] ⚠️ ${collection}/${baseId} não encontrado no FIRESTORE`);

        // 2. Tenta carregar do IndexedDB
        if (!baseId) return; // Garante que baseId não é undefined
        console.log(`[useBaseData] 🔍 Tentando carregar ${collection}/${baseId} do INDEXEDDB...`);
        const indexedDBData = await getFromIndexedDB(collection, baseId);
        if (indexedDBData) {
          console.log(`[useBaseData] ✅ Dados carregados do INDEXEDDB para ${collection}/${baseId}`);
          if (!cancelled) {
            setData(indexedDBData);
          }
          return;
        }
        
        console.log(`[useBaseData] ⚠️ ${collection}/${baseId} não encontrado no INDEXEDDB`);
        
        // 3. Não encontrado em nenhum lugar
        if (!cancelled) {
          setError(new Error(`Documento não encontrado: ${collection}/${baseId}`));
          setData(null);
        }
      } catch (err: any) {
        if (cancelled) return;
        console.error(`[useBaseData] ❌ Erro ao buscar ${collection}/${baseId}:`, err);
        
        // Em caso de erro no Firestore, tenta IndexedDB como fallback
        if (!baseId) return; // Garante que baseId não é undefined
        try {
          console.log(`[useBaseData] 🔄 Tentando fallback para INDEXEDDB após erro...`);
          const indexedDBData = await getFromIndexedDB(collection, baseId);
          if (indexedDBData) {
            console.log(`[useBaseData] ✅ Dados carregados do INDEXEDDB (fallback) para ${collection}/${baseId}`);
            if (!cancelled) {
              setData(indexedDBData);
              setError(null); // Limpa erro se encontrou no IndexedDB
            }
            return;
          }
        } catch (fallbackError) {
          console.error(`[useBaseData] ❌ Erro no fallback IndexedDB:`, fallbackError);
        }
        
        if (!cancelled) {
          setError(err);
          setData(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [collection, baseId, enabled]);

  return { data, loading, error };
}

/**
 * Hook para buscar múltiplos dados base do Firestore
 * Com fallback: Firestore → IndexedDB → null
 */
export function useMultipleBaseData<T = any>(
  collection: string,
  baseIds: (string | undefined)[],
  enabled: boolean = true
) {
  const [data, setData] = useState<Record<string, T | null>>({});
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<Record<string, Error | null>>({});

  useEffect(() => {
    if (!enabled || baseIds.length === 0) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function fetchAll() {
      try {
        setLoading(true);
        setErrors({});

        const results: Record<string, T | null> = {};
        const errorsResult: Record<string, Error | null> = {};

        const validIds = baseIds.filter((id): id is string => Boolean(id));
        console.log(`[useMultipleBaseData] 🔍 Buscando ${validIds.length} documentos da coleção ${collection} do Firestore...`);

        await Promise.all(
          validIds.map(async (baseId) => {
            try {
              // 1. Tenta carregar do Firestore
              const docRef = doc(db, collection, baseId);
              const docSnap = await getDoc(docRef);

              if (docSnap.exists()) {
                const firestoreData = docSnap.data() as T;
                console.log(`[useMultipleBaseData] ✅ ${collection}/${baseId} carregado do FIRESTORE`);
                
                // Salva no IndexedDB como cache
                try {
                  const db = await openDB();
                  const transaction = db.transaction([STORE_NAME], "readwrite");
                  const store = transaction.objectStore(STORE_NAME);
                  const id = `${collection}/${baseId}`;
                  store.put({
                    id,
                    content: firestoreData,
                    updatedAt: new Date().toISOString(),
                    source: "firestore",
                  });
                } catch (saveError) {
                  console.warn(`[useMultipleBaseData] ⚠️ Não foi possível salvar ${collection}/${baseId} no IndexedDB:`, saveError);
                }
                
                results[baseId] = firestoreData;
                errorsResult[baseId] = null;
                return;
              }
              
              console.log(`[useMultipleBaseData] ⚠️ ${collection}/${baseId} não encontrado no FIRESTORE`);
              
              // 2. Tenta carregar do IndexedDB
              const indexedDBData = await getFromIndexedDB(collection, baseId);
              if (indexedDBData) {
                console.log(`[useMultipleBaseData] ✅ ${collection}/${baseId} carregado do INDEXEDDB`);
                results[baseId] = indexedDBData;
                errorsResult[baseId] = null;
                return;
              }
              
              console.log(`[useMultipleBaseData] ⚠️ ${collection}/${baseId} não encontrado no INDEXEDDB`);
              results[baseId] = null;
              errorsResult[baseId] = new Error(`Documento não encontrado: ${baseId}`);
            } catch (err: any) {
              console.error(`[useMultipleBaseData] ❌ Erro ao buscar ${collection}/${baseId}:`, err);
              
              // Em caso de erro no Firestore, tenta IndexedDB como fallback
              try {
                const indexedDBData = await getFromIndexedDB(collection, baseId);
                if (indexedDBData) {
                  console.log(`[useMultipleBaseData] ✅ ${collection}/${baseId} carregado do INDEXEDDB (fallback)`);
                  results[baseId] = indexedDBData;
                  errorsResult[baseId] = null;
                  return;
                }
              } catch (fallbackError) {
                console.error(`[useMultipleBaseData] ❌ Erro no fallback IndexedDB para ${collection}/${baseId}:`, fallbackError);
              }
              
              results[baseId] = null;
              errorsResult[baseId] = err;
            }
          })
        );

        const successCount = Object.values(results).filter(Boolean).length;
        console.log(`[useMultipleBaseData] 📊 Resultado: ${successCount}/${validIds.length} documentos encontrados na coleção ${collection}`);

        if (cancelled) return;

        setData(results);
        setErrors(errorsResult);
      } catch (err: any) {
        if (cancelled) return;
        // Erro geral
        const errorsResult: Record<string, Error> = {};
        baseIds.forEach((id) => {
          if (id) errorsResult[id] = err;
        });
        setErrors(errorsResult);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchAll();

    return () => {
      cancelled = true;
    };
  }, [collection, baseIds.join(","), enabled]);

  return { data, loading, errors };
}
