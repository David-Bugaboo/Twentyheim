import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

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
  } else if (content && typeof content === "object") {
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
  if (!content || typeof content !== "object") {
    return content;
  }

  // Se tiver estrutura { data: [...], updatedAt: ... }, retorna apenas o array
  if (
    "data" in content &&
    Array.isArray(content.data) &&
    "updatedAt" in content
  ) {
    return content.data;
  }

  // Se for objeto com updatedAt, remove a propriedade
  if ("updatedAt" in content) {
    const { updatedAt, ...rest } = content;
    return rest;
  }

  return content;
}

// IndexedDB removido - dados agora vêm apenas do Firestore
// (Bandos locais usam funções específicas em indexedDb.helpers.ts)

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
      return null;
    }
    // Documento não existe
    if (error?.code === "not-found") {
      return null;
    }
    // Outros erros
    console.error(
      `[useJsonData] ❌ Erro ao carregar do Firestore (${fileId}):`,
      error
    );
    return null;
  }
}

interface UseJsonDataOptions {
  fileId: string;
  staticImport?: () => Promise<any>;
  enabled?: boolean;
}

/**
 * Hook para carregar dados JSON APENAS do Firestore.
 * Sem fallbacks para IndexedDB ou arquivos locais.
 * (Bandos locais usam funções específicas do IndexedDB)
 */
export function useJsonData<T = any>({
  fileId,
  staticImport: _staticImport, // Mantido para compatibilidade, mas não será usado
  enabled = true,
}: UseJsonDataOptions) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [source, setSource] = useState<"firestore" | null>(null);

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

        // Apenas Firestore - sem fallbacks
        const firestoreData = await getFromFirestore(fileId);
        if (firestoreData) {
          if (!cancelled) {
            setData(firestoreData);
            setSource("firestore");
          }
        } else {
          // Não encontrado no Firestore
          if (!cancelled) {
            setData(null);
            setSource(null);
          }
        }
      } catch (err) {
        console.error(
          `[useJsonData] ❌ ERRO ao carregar dados para ${fileId}:`,
          err
        );
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error("Erro desconhecido"));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileId, enabled]);

  return { data, loading, error, source };
}

/**
 * Função utilitária para migrar todos os dados estáticos para o Firestore
 */
export async function migrateStaticDataToFirestore(
  files: Array<{
    id: string;
    name: string;
    path: string;
    import: () => Promise<any>;
  }>,
  updateProgress?: (current: number, total: number, name: string) => void,
  forceUpdate: boolean = false
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

      // Se existe e não está forçando atualização, pula
      if (docSnap.exists() && !forceUpdate) {
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

      // Salva no Firestore (sobrescreve se existir quando forceUpdate = true)
      await setDoc(docRef, {
        path: file.path,
        name: file.name,
        content: contentWithUpdatedAt,
        updatedAt: new Date().toISOString(),
        updatedBy: "migration-script",
        migrated: true,
      });

      // IndexedDB não é mais usado como cache - dados vêm apenas do Firestore
      results.push({ id: file.id, success: true, updated: docSnap.exists() });
    } catch (error: any) {
      console.error(`❌ Erro ao migrar ${file.name} (${file.id}):`, error);
      results.push({
        id: file.id,
        success: false,
        error: error?.message || String(error),
        errorCode: error?.code,
      });
    }
  }

  return results;
}
