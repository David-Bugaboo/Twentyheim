/**
 * Hook para auto-save do warband
 * Salva automaticamente a cada 2.5 segundos no IndexedDB e Firestore (se logado)
 */

import { useEffect, useRef } from "react";
import { saveLocalWarband } from "../helpers/indexedDb.helpers";
import { stripUndefinedDeep } from "../helpers/firestore.helpers";

interface UseAutoSaveParams {
  hasUnsavedChanges: boolean;
  warbandId: string;
  warband: any;
  warbandSource: "local" | "user";
  setHasUnsavedChanges: (value: boolean) => void;
  setIsSaving: (value: boolean) => void;
  userId?: string | null; // Opcional: se fornecido, também salva no Firestore
}

export function useAutoSave({
  hasUnsavedChanges: _hasUnsavedChanges,
  warbandId,
  warband,
  warbandSource,
  setHasUnsavedChanges,
  setIsSaving,
  userId,
}: UseAutoSaveParams) {
  const componentSaveQueueRef = useRef<Promise<void>>(Promise.resolve());
  const warbandRef = useRef(warband);
  const intervalRef = useRef<number | null>(null);

  // Mantém ref atualizada com o warband mais recente
  useEffect(() => {
    warbandRef.current = warband;
  }, [warband]);

  // Configura intervalo de salvamento a cada 2 segundos
  // IMPORTANTE: NÃO salva durante o load inicial - apenas quando houver mudanças
  useEffect(() => {
    if (!warbandId) return;

    // Função de salvamento (definida dentro do effect para ter acesso às dependências)
    const performSave = () => {
      // Usa ref para garantir que pegamos o estado mais recente
      const currentWarband = warbandRef.current;
      
      // Verifica se há dados válidos antes de salvar
      if (!currentWarband.name && !currentWarband.figures?.length) {
        // Dados ainda não carregados ou vazios - não salva
        return;
      }
      
      const payloadRaw: any = {
        name: currentWarband.name,
        faction: currentWarband.faction,
        notes: currentWarband.notes ?? "",
        gold: currentWarband.gold ?? "0",
        wyrdstone: currentWarband.wyrdstone ?? "0",
        vault: (currentWarband.vault || []).map((e: any) => stripUndefinedDeep(e)),
        figures: (currentWarband.figures || []).map((f: any) => stripUndefinedDeep(f)),
      };

      const payload = stripUndefinedDeep(payloadRaw);

      setIsSaving(true);
      componentSaveQueueRef.current = componentSaveQueueRef.current.then(async () => {
        try {
          // Salva no IndexedDB e no Firestore (se userId fornecido)
          await saveLocalWarband(warbandId, payload, warbandSource, userId);
          setHasUnsavedChanges(false);
        } catch (e) {
          console.error("[AutoSave][Error] Erro ao salvar:", e);
        } finally {
          setIsSaving(false);
        }
      });
    };

    // NÃO salva na primeira vez - apenas quando houver mudanças
    // O salvamento acontecerá quando houver alterações (hasUnsavedChanges = true)
    // OU a cada 2 segundos após o primeiro salvamento

    // Configura intervalo para salvar a cada 2.5 segundos (mas só salva se houver dados válidos)
    intervalRef.current = window.setInterval(() => {
      performSave();
    }, 2500);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [warbandId, warbandSource, setHasUnsavedChanges, setIsSaving, userId]);
}

