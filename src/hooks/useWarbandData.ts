import React from "react";
import { useJsonData } from "./useJsonData";
import { getStaticImport } from "../data/jsonFileMap";
import { useBaseData, useMultipleBaseData } from "./useBaseData";
import type { figure } from "../pages/warband-builder/types/figure.type";

/**
 * Hook para buscar dados de uma facção específica
 */
export function useFactionData(factionId: string | undefined) {
  const result = useJsonData({
    fileId: factionId || "",
    staticImport: () =>
      factionId
        ? getStaticImport(factionId)()
        : Promise.resolve({ default: [] }),
    enabled: !!factionId,
  });

  // Log detalhado do que foi encontrado
  React.useEffect(() => {
    if (!result.loading && result.data) {
      // Dados carregados com sucesso
    } else if (!result.loading && !result.data) {
      // Dados não foram carregados
    }
  }, [factionId, result.data, result.loading, result.source]);

  return result;
}

/**
 * Hook para buscar dados base de uma figura do Firestore
 * SEMPRE busca primeiro no array completo da facção (Firestore → IndexedDB → Local)
 * Depois, se não encontrar, tenta buscar como documento individual
 */
export function useFigureBaseData(
  baseFigureId: string | undefined,
  factionId?: string | undefined,
  fallbackData?: any
) {
  // PRIMEIRO: Busca o array completo da facção (já tem fallback Firestore → IndexedDB → Local)
  const {
    data: factionArrayData,
    loading: factionLoading,
    source: factionSource,
  } = useFactionData(factionId);

  // Log quando o array da facção é carregado
  React.useEffect(() => {
    if (!factionLoading && factionArrayData) {
      // Array da facção carregado
    }
  }, [factionId, factionArrayData, factionLoading, factionSource]);

  // Busca a figura no array completo da facção
  const figureFromArray = React.useMemo(() => {
    if (!baseFigureId || !factionId) {
      return null;
    }

    // Se ainda está carregando o array, não tenta buscar
    if (factionLoading) {
      return null;
    }

    if (!factionArrayData) {
      return null;
    }

    // fallbackData pode ser um array ou um objeto com propriedade data/content
    let allUnits: any[] = [];
    if (Array.isArray(factionArrayData)) {
      allUnits = factionArrayData;
    } else if (factionArrayData?.data && Array.isArray(factionArrayData.data)) {
      allUnits = factionArrayData.data;
    } else if (
      factionArrayData?.content &&
      Array.isArray(factionArrayData.content)
    ) {
      allUnits = factionArrayData.content;
    }

    if (allUnits.length > 0) {
      // Tenta encontrar com diferentes comparações
      let found = allUnits.find((unit: any) => unit.id === baseFigureId);
      if (!found) {
        // Tenta case-insensitive
        found = allUnits.find(
          (unit: any) =>
            String(unit.id).toLowerCase() === String(baseFigureId).toLowerCase()
        );
      }
      return found || null;
    } else {
      return null;
    }
  }, [baseFigureId, factionId, factionArrayData, factionLoading]);

  // SEGUNDO: Se não encontrou no array, tenta buscar como documento individual (fallback)
  const figureFromFirestore = useBaseData(
    factionId || "base-figures",
    baseFigureId,
    !!baseFigureId && !!factionId && !figureFromArray // Só busca individual se não encontrou no array
  );

  // Se não encontrou no Firestore (nem individual nem array) e tem dados de fallback, busca nos dados estáticos
  // IMPORTANTE: Também busca no fallbackData mesmo quando não tem factionId (para mercenários/legends)
  const figureFromStatic = React.useMemo(() => {
    if (!baseFigureId) return null;
    // Se já encontrou no Firestore/array, não precisa buscar no fallback
    if (figureFromFirestore.data || figureFromArray) return null;

    // Se não tem fallbackData, não pode buscar
    if (!fallbackData) return null;

    // Busca nos dados estáticos (facção ou extraPools como hiredSwords/legends)
    // fallbackData pode ser um array ou um objeto com propriedade data/content
    let allUnits: any[] = [];
    if (Array.isArray(fallbackData)) {
      allUnits = fallbackData;
    } else if (fallbackData?.data && Array.isArray(fallbackData.data)) {
      allUnits = fallbackData.data;
    } else if (fallbackData?.content && Array.isArray(fallbackData.content)) {
      allUnits = fallbackData.content;
    }

    const found = allUnits.find((unit: any) => unit.id === baseFigureId);
    return found || null;
  }, [baseFigureId, fallbackData, figureFromFirestore.data, figureFromArray]);

  // Normaliza dados: converte stats para baseStats e outros campos se necessário
  const normalizedData = React.useMemo(() => {
    // Prioridade: Array da facção (Firestore/IndexedDB/Local) > Documento individual > Dados estáticos
    const data =
      figureFromArray || figureFromFirestore.data || figureFromStatic;

    if (!data) {
      return null;
    }

    // Faz cópia profunda e normaliza campos
    const normalized: any = { ...data };

    // Se tem stats mas não baseStats, converte
    if (normalized.stats && !normalized.baseStats) {
      normalized.baseStats = normalized.stats;
    }

    // Se tem stats.skills mas não availableSkills, converte
    if (normalized.baseStats?.skills && !normalized.availableSkills) {
      normalized.availableSkills = normalized.baseStats.skills;
    }

    // Se tem stats.startingXp mas não xp na raiz, normaliza
    if (
      normalized.baseStats?.startingXp !== undefined &&
      normalized.xp === undefined
    ) {
      normalized.xp = normalized.baseStats.startingXp;
    }

    // Garante que abilities seja um array
    if (!normalized.abilities && data.abilities) {
      normalized.abilities = Array.isArray(data.abilities)
        ? data.abilities
        : [];
    }

    return normalized;
  }, [
    baseFigureId,
    figureFromFirestore.data,
    figureFromArray,
    figureFromStatic,
  ]);

  return {
    data: normalizedData,
    loading: factionLoading || figureFromFirestore.loading,
    error: figureFromFirestore.error,
  };
}

/**
 * Hook para buscar dados base de múltiplas figuras do Firestore
 * SEMPRE busca primeiro no array completo da facção (Firestore → IndexedDB → Local)
 * Depois, se não encontrar, tenta buscar como documentos individuais
 */
export function useMultipleFigureBaseData(
  baseFigureIds: string[],
  factionId?: string | undefined,
  fallbackData?: any
) {
  // PRIMEIRO: Busca o array completo da facção (já tem fallback Firestore → IndexedDB → Local)
  const { data: factionArrayData, loading: factionLoading } =
    useFactionData(factionId);

  // Busca figuras no array completo da facção
  const figuresFromArray = React.useMemo(() => {
    if (!factionArrayData || baseFigureIds.length === 0) return {};
    if (factionLoading) return {};

    let allUnits: any[] = [];
    if (Array.isArray(factionArrayData)) {
      allUnits = factionArrayData;
    } else if (factionArrayData?.data && Array.isArray(factionArrayData.data)) {
      allUnits = factionArrayData.data;
    } else if (
      factionArrayData?.content &&
      Array.isArray(factionArrayData.content)
    ) {
      allUnits = factionArrayData.content;
    }

    const results: Record<string, any> = {};
    baseFigureIds.forEach(id => {
      const found = allUnits.find((unit: any) => unit.id === id);
      if (found) {
        results[id] = found;
      }
    });

    return results;
  }, [baseFigureIds, factionId, factionArrayData, factionLoading]);

  // SEGUNDO: Se não encontrou no array, tenta buscar como documentos individuais (fallback)
  const missingIds = React.useMemo(() => {
    return baseFigureIds.filter(id => !figuresFromArray[id]);
  }, [baseFigureIds, figuresFromArray]);

  const figuresFromFirestore = useMultipleBaseData(
    factionId || "base-figures",
    missingIds,
    missingIds.length > 0 && !!factionId && !factionLoading
  );

  // Faz fallback para dados estáticos
  const figuresFromStatic = React.useMemo(() => {
    if (!fallbackData || baseFigureIds.length === 0) return {};

    // Verifica quantas figuras já foram encontradas (individual ou array)
    const foundCount = Object.keys({
      ...figuresFromFirestore.data,
      ...figuresFromArray,
    }).filter(key => {
      const fromIndividual = figuresFromFirestore.data?.[key];
      const fromArray = figuresFromArray[key];
      return (
        (fromIndividual !== null && fromIndividual !== undefined) ||
        (fromArray !== null && fromArray !== undefined)
      );
    }).length;

    if (foundCount === baseFigureIds.length) {
      // Todos foram encontrados
      return {};
    }

    // fallbackData pode ser um array ou um objeto com propriedade data/content
    let allUnits: any[] = [];
    if (Array.isArray(fallbackData)) {
      allUnits = fallbackData;
    } else if (fallbackData?.data && Array.isArray(fallbackData.data)) {
      allUnits = fallbackData.data;
    } else if (fallbackData?.content && Array.isArray(fallbackData.content)) {
      allUnits = fallbackData.content;
    }

    const results: Record<string, any> = {};

    baseFigureIds.forEach(id => {
      // Se não encontrou no Firestore (nem individual nem array), busca nos dados estáticos
      if (!figuresFromFirestore.data?.[id] && !figuresFromArray[id]) {
        const found = allUnits.find((unit: any) => unit.id === id);
        if (found) {
          // Normaliza: converte stats para baseStats se necessário
          const normalized =
            found.stats && !found.baseStats
              ? { ...found, baseStats: found.stats }
              : found;
          results[id] = normalized;
        }
      }
    });

    return results;
  }, [
    baseFigureIds,
    fallbackData,
    figuresFromFirestore.data,
    figuresFromArray,
  ]);

  // Normaliza todos os dados: converte stats para baseStats e outros campos
  const normalizedData = React.useMemo(() => {
    // Prioridade: Array da facção (Firestore/IndexedDB/Local) > Documentos individuais > Dados estáticos
    const combined = {
      ...figuresFromArray,
      ...figuresFromFirestore.data,
      ...figuresFromStatic,
    };
    const normalized: Record<string, any> = {};

    Object.keys(combined).forEach(id => {
      const data = combined[id];
      if (data) {
        const normalizedItem: any = { ...data };

        // Se tem stats mas não baseStats, converte
        if (normalizedItem.stats && !normalizedItem.baseStats) {
          normalizedItem.baseStats = normalizedItem.stats;
        }

        // Se tem stats.skills mas não availableSkills, converte
        if (
          normalizedItem.baseStats?.skills &&
          !normalizedItem.availableSkills
        ) {
          normalizedItem.availableSkills = normalizedItem.baseStats.skills;
        }

        // Se tem stats.startingXp mas não xp na raiz, normaliza
        if (
          normalizedItem.baseStats?.startingXp !== undefined &&
          normalizedItem.xp === undefined
        ) {
          normalizedItem.xp = normalizedItem.baseStats.startingXp;
        }

        // Garante que abilities seja um array
        if (!normalizedItem.abilities && data.abilities) {
          normalizedItem.abilities = Array.isArray(data.abilities)
            ? data.abilities
            : [];
        }

        normalized[id] = normalizedItem;
      }
    });

    return normalized;
  }, [figuresFromFirestore.data, figuresFromArray, figuresFromStatic]);

  return {
    data: normalizedData,
    loading: factionLoading || figuresFromFirestore.loading,
    errors: figuresFromFirestore.errors,
  };
}

/**
 * Hook para buscar dados base de um equipamento do Firestore
 */
export function useEquipmentBaseData(baseEquipmentId: string | undefined) {
  return useBaseData("base-equipment", baseEquipmentId, !!baseEquipmentId);
}

/**
 * Hook para buscar dados base de múltiplos equipamentos do Firestore
 */
export function useMultipleEquipmentBaseData(baseEquipmentIds: string[]) {
  return useMultipleBaseData(
    "base-equipment",
    baseEquipmentIds,
    baseEquipmentIds.length > 0
  );
}

/**
 * Hook para buscar dados base de uma skill do Firestore
 */
export function useSkillBaseData(baseSkillId: string | undefined) {
  return useBaseData("base-skills", baseSkillId, !!baseSkillId);
}

/**
 * Hook para buscar dados base de uma spell do Firestore
 */
export function useSpellBaseData(baseSpellId: string | undefined) {
  return useBaseData("base-spells", baseSpellId, !!baseSpellId);
}

/**
 * Hook para buscar dados base de uma mutação do Firestore
 * Mutações estão em admin-data/cult-mutations
 */
export function useMutationBaseData(_baseMutationId: string | undefined) {
  // Mutações são carregadas via useJsonData, não useBaseData
  // Este hook está sendo mantido para compatibilidade, mas retorna dados vazios
  // Use useJsonData diretamente com fileId: "cult-mutations" para obter todas as mutações
  return { data: null, loading: false };
}

/**
 * Hook para resolver dados completos de uma figura usando seus IDs base
 */
export function useResolvedFigure(
  figure: figure | undefined,
  factionId?: string | undefined,
  factionFallbackData?: any
) {
  const baseFigureId = figure?.baseFigureId;

  const figureBase = useFigureBaseData(
    baseFigureId,
    factionId,
    factionFallbackData
  );

  // Extrai os base_equipment_id do array equiped
  const equipmentIds = Array.isArray(figure?.equiped)
    ? figure.equiped.map((e: any) => e?.base_equipment_id).filter(Boolean)
    : [];
  const equipmentBases = useMultipleEquipmentBaseData(equipmentIds);
  const skillBases = useMultipleBaseData(
    "base-skills",
    figure?.availableSkills || []
  );
  const spellBases = useMultipleBaseData(
    "base-spells",
    figure?.availableSpells || []
  );

  // Mutações estão em admin-data/cult-mutations (documento na coleção admin-data)
  const { data: allMutationsData } = useJsonData({
    fileId: "cult-mutations",
  });

  // Cria mapa de mutações
  const mutationBasesMap = React.useMemo(() => {
    const map: Record<string, any> = {};
    if (allMutationsData && Array.isArray(allMutationsData)) {
      (allMutationsData as any[]).forEach((m: any) => {
        if (m.id) map[m.id] = m;
      });
    }
    return map;
  }, [allMutationsData]);

  const mutationBases = React.useMemo(
    () => ({
      data: mutationBasesMap,
      loading: false,
    }),
    [mutationBasesMap]
  );

  const loading =
    figureBase.loading ||
    equipmentBases.loading ||
    skillBases.loading ||
    spellBases.loading ||
    mutationBases.loading;

  return {
    figureBase: figureBase.data,
    equipmentBases: equipmentBases.data,
    skillBases: skillBases.data,
    spellBases: spellBases.data,
    mutationBases: mutationBases.data,
    loading,
  };
}

/**
 * Hook para resolver dados completos de múltiplas figuras
 */
export function useResolvedFigures(
  figures: figure[],
  factionId?: string | undefined,
  factionFallbackData?: any
) {
  const allBaseFigureIds = figures.map(f => f.baseFigureId).filter(Boolean);
  // Extrai os base_equipment_id de todos os equipamentos equipados
  const allEquipmentIds = figures
    .flatMap(f =>
      Array.isArray(f.equiped)
        ? f.equiped.map((e: any) => e?.base_equipment_id).filter(Boolean)
        : []
    )
    .filter(Boolean);
  const allSkillIds = figures
    .flatMap(f => f.availableSkills || [])
    .filter(Boolean);
  const allSpellIds = figures
    .flatMap(f => f.availableSpells || [])
    .filter(Boolean);
  // Mutações não precisam ser extraídas aqui - são carregadas via useJsonData
  // figure?.mutations são objetos com base_mutation_id, não IDs simples

  const figureBases = useMultipleFigureBaseData(
    allBaseFigureIds,
    factionId,
    factionFallbackData
  );
  const equipmentBases = useMultipleBaseData("base-equipment", allEquipmentIds);
  const skillBases = useMultipleBaseData("base-skills", allSkillIds);
  const spellBases = useMultipleBaseData("base-spells", allSpellIds);

  // Mutações estão em admin-data/cult-mutations (documento na coleção admin-data)
  const { data: allMutationsData } = useJsonData({
    fileId: "cult-mutations",
  });

  // Cria mapa de mutações
  const mutationBasesMap = React.useMemo(() => {
    const map: Record<string, any> = {};
    if (allMutationsData && Array.isArray(allMutationsData)) {
      (allMutationsData as any[]).forEach((m: any) => {
        if (m.id) map[m.id] = m;
      });
    }
    return map;
  }, [allMutationsData]);

  const mutationBases = React.useMemo(
    () => ({
      data: mutationBasesMap,
      loading: false,
    }),
    [mutationBasesMap]
  );

  const loading =
    figureBases.loading ||
    equipmentBases.loading ||
    skillBases.loading ||
    spellBases.loading ||
    mutationBases.loading;

  return {
    figureBases: figureBases.data,
    equipmentBases: equipmentBases.data,
    skillBases: skillBases.data,
    spellBases: spellBases.data,
    mutationBases: mutationBases.data,
    loading,
  };
}
