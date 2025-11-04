import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

/**
 * Hook para buscar um dado base do Firestore usando base_id
 * APENAS Firestore - sem fallbacks para IndexedDB ou arquivos locais
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

        // Apenas Firestore - sem fallbacks
        if (!baseId) {
          setError(new Error("baseId is required"));
          setLoading(false);
          return;
        }
        const docRef = doc(db, collection, baseId);
        const docSnap = await getDoc(docRef);

        if (cancelled) return;

        if (docSnap.exists()) {
          const firestoreData = docSnap.data() as T;
          if (!cancelled) {
            setData(firestoreData);
          }
        } else {
          // Não encontrado no Firestore
          if (!cancelled) {
            setData(null);
            setError(new Error(`Documento não encontrado: ${collection}/${baseId}`));
          }
        }
      } catch (err: any) {
        if (cancelled) return;
        console.error(`[useBaseData] ❌ Erro ao buscar ${collection}/${baseId}:`, err);
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error("Erro desconhecido"));
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
 * APENAS Firestore - sem fallbacks para IndexedDB ou arquivos locais
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

        await Promise.all(
          validIds.map(async (baseId) => {
            try {
              // Apenas Firestore - sem fallbacks
              const docRef = doc(db, collection, baseId);
              const docSnap = await getDoc(docRef);

              if (docSnap.exists()) {
                const firestoreData = docSnap.data() as T;
                results[baseId] = firestoreData;
                errorsResult[baseId] = null;
              } else {
                results[baseId] = null;
                errorsResult[baseId] = new Error(`Documento não encontrado: ${baseId}`);
              }
            } catch (err: any) {
              console.error(`[useMultipleBaseData] ❌ Erro ao buscar ${collection}/${baseId}:`, err);
              results[baseId] = null;
              errorsResult[baseId] = err instanceof Error ? err : new Error("Erro desconhecido");
            }
          })
        );

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
