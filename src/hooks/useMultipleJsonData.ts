import { useMemo } from "react";
import { useJsonData } from "./useJsonData";
import { getStaticImport } from "../data/jsonFileMap";

/**
 * Hook para carregar múltiplos arquivos JSON de uma vez
 * Útil para componentes que precisam de vários arquivos
 */
export function useMultipleJsonData(fileIds: string[]) {
  const results = fileIds.map(fileId => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useJsonData({
      fileId,
      staticImport: () => getStaticImport(fileId)(),
      enabled: true,
    });
  });

  const data = useMemo(() => {
    const obj: Record<string, any> = {};
    fileIds.forEach((fileId, index) => {
      obj[fileId] = results[index].data;
    });
    return obj;
  }, [fileIds, results]);

  const loading = results.some(r => r.loading);
  const errors = results.filter(r => r.error).map(r => r.error);
  const sources = useMemo(() => {
    const obj: Record<string, "firestore" | "indexeddb" | "static" | null> = {};
    fileIds.forEach((fileId, index) => {
      obj[fileId] = results[index].source;
    });
    return obj;
  }, [fileIds, results]);

  return { data, loading, errors, sources };
}

