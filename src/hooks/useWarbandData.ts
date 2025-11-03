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
    staticImport: () => (factionId ? getStaticImport(factionId)() : Promise.resolve({ default: [] })),
    enabled: !!factionId,
  });
  
  // Log detalhado do que foi encontrado
  React.useEffect(() => {
    if (!result.loading && result.data) {
      const itemCount = Array.isArray(result.data) 
        ? result.data.length 
        : result.data?.data?.length || result.data?.content?.length || 0;
      console.log(`[useFactionData] ✅ Dados da facção ${factionId} carregados:`, {
        origem: result.source,
        quantidade: itemCount,
        tipo: Array.isArray(result.data) ? 'array' : typeof result.data,
      });
    } else if (!result.loading && !result.data) {
      console.log(`[useFactionData] ⚠️ Dados da facção ${factionId} NÃO foram carregados`);
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
  const { data: factionArrayData, loading: factionLoading, source: factionSource } = useFactionData(factionId);
  
  // Log quando o array da facção é carregado
  React.useEffect(() => {
    if (!factionLoading && factionArrayData) {
      const itemCount = Array.isArray(factionArrayData) 
        ? factionArrayData.length 
        : factionArrayData?.data 
        ? factionArrayData.data.length 
        : factionArrayData?.content 
        ? factionArrayData.content.length 
        : 0;
      console.log(`[useFigureBaseData] 📦 Array da facção ${factionId} carregado:`, {
        origem: factionSource,
        quantidade: itemCount,
        tipo: Array.isArray(factionArrayData) ? 'array' : typeof factionArrayData,
        keys: Object.keys(factionArrayData || {}),
      });
    }
  }, [factionId, factionArrayData, factionLoading, factionSource]);
  
  // Busca a figura no array completo da facção
  const figureFromArray = React.useMemo(() => {
    if (!baseFigureId || !factionId) {
      console.log(`[useFigureBaseData] ⚠️ Parâmetros inválidos: baseFigureId=${baseFigureId}, factionId=${factionId}`);
      return null;
    }
    
    // Se ainda está carregando o array, não tenta buscar
    if (factionLoading) {
      console.log(`[useFigureBaseData] ⏳ Aguardando carregamento do array da facção ${factionId}...`);
      return null;
    }
    
    if (!factionArrayData) {
      console.log(`[useFigureBaseData] ⚠️ Array da facção ${factionId} não disponível após carregamento`);
      return null;
    }
    
    console.log(`[useFigureBaseData] 🔍 Buscando ${baseFigureId} no array da facção ${factionId}...`);
    console.log(`[useFigureBaseData] 📊 Dados da facção recebidos:`, {
      tipo: typeof factionArrayData,
      isArray: Array.isArray(factionArrayData),
      temData: !!factionArrayData?.data,
      temContent: !!factionArrayData?.content,
      keys: Object.keys(factionArrayData || {}),
    });
    
    // fallbackData pode ser um array ou um objeto com propriedade data/content
    let allUnits: any[] = [];
    if (Array.isArray(factionArrayData)) {
      allUnits = factionArrayData;
      console.log(`[useFigureBaseData] 📊 Array direto tem ${allUnits.length} unidades`);
    } else if (factionArrayData?.data && Array.isArray(factionArrayData.data)) {
      allUnits = factionArrayData.data;
      console.log(`[useFigureBaseData] 📊 Array em .data tem ${allUnits.length} unidades`);
    } else if (factionArrayData?.content && Array.isArray(factionArrayData.content)) {
      allUnits = factionArrayData.content;
      console.log(`[useFigureBaseData] 📊 Array em .content tem ${allUnits.length} unidades`);
    } else {
      console.log(`[useFigureBaseData] ⚠️ Estrutura de dados da facção não reconhecida:`, {
        tipo: typeof factionArrayData,
        keys: Object.keys(factionArrayData || {}),
        dados: factionArrayData,
      });
    }
    
    if (allUnits.length > 0) {
      console.log(`[useFigureBaseData] 🔍 IDs disponíveis no array (primeiros 10):`, allUnits.slice(0, 10).map((u: any) => u?.id));
      console.log(`[useFigureBaseData] 🔍 Buscando por: "${baseFigureId}" (tipo: ${typeof baseFigureId})`);
      
      // Tenta encontrar com diferentes comparações
      let found = allUnits.find((unit: any) => unit.id === baseFigureId);
      if (!found) {
        // Tenta case-insensitive
        found = allUnits.find((unit: any) => String(unit.id).toLowerCase() === String(baseFigureId).toLowerCase());
        if (found) {
          console.log(`[useFigureBaseData] ⚠️ Encontrado com comparação case-insensitive`);
        }
      }
      
      if (found) {
        console.log(`[useFigureBaseData] ✅ Figura ${baseFigureId} encontrada no array da facção ${factionId}:`, {
          id: found.id,
          name: found.name,
          temStats: !!found.stats,
          temBaseStats: !!found.baseStats,
          temAbilities: Array.isArray(found.abilities),
          keys: Object.keys(found),
        });
      } else {
        console.log(`[useFigureBaseData] ❌ Figura ${baseFigureId} NÃO encontrada no array da facção ${factionId}`);
        console.log(`[useFigureBaseData] 🔍 Comparação de IDs:`, {
          buscando: baseFigureId,
          tipoBuscando: typeof baseFigureId,
          primeiros3IDs: allUnits.slice(0, 3).map((u: any) => ({
            id: u.id,
            tipo: typeof u.id,
            igual: u.id === baseFigureId,
            igualString: String(u.id) === String(baseFigureId),
          })),
        });
      }
      return found || null;
    } else {
      console.log(`[useFigureBaseData] ⚠️ Array da facção ${factionId} está vazio`);
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
  const figureFromStatic = React.useMemo(() => {
    if (!baseFigureId || !fallbackData) return null;
    if (figureFromFirestore.data || figureFromArray) return null; // Já encontrou no Firestore

    // Busca nos dados estáticos da facção
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
    if (found) {
      console.log(`[useFigureBaseData] ✅ Figura ${baseFigureId} encontrada nos dados estáticos (fallback)`);
    }
    return found || null;
  }, [baseFigureId, fallbackData, figureFromFirestore.data, figureFromArray]);

  // Normaliza dados: converte stats para baseStats e outros campos se necessário
  const normalizedData = React.useMemo(() => {
    // Prioridade: Array da facção (Firestore/IndexedDB/Local) > Documento individual > Dados estáticos
    const data = figureFromArray || figureFromFirestore.data || figureFromStatic;
    
    // Log detalhado ANTES da normalização
    console.log(`[useFigureBaseData] 🔍 Normalizando dados para ${baseFigureId}:`, {
      temArray: !!figureFromArray,
      temIndividual: !!figureFromFirestore.data,
      temStatic: !!figureFromStatic,
      dadosBrutos: data ? Object.keys(data) : 'null',
      temStats: !!data?.stats,
      temBaseStats: !!data?.baseStats,
    });
    
    if (!data) {
      console.log(`[useFigureBaseData] ⚠️ NENHUM dado encontrado para ${baseFigureId}`);
      return null;
    }
    
    // Faz cópia profunda e normaliza campos
    const normalized: any = { ...data };
    
    // Se tem stats mas não baseStats, converte
    if (normalized.stats && !normalized.baseStats) {
      console.log(`[useFigureBaseData] 🔄 Convertendo stats para baseStats para ${baseFigureId}`);
      normalized.baseStats = normalized.stats;
    }
    
    // Se tem stats.skills mas não availableSkills, converte
    if (normalized.baseStats?.skills && !normalized.availableSkills) {
      console.log(`[useFigureBaseData] 🔄 Convertendo baseStats.skills para availableSkills para ${baseFigureId}`);
      normalized.availableSkills = normalized.baseStats.skills;
    }
    
    // Se tem stats.startingXp mas não xp na raiz, normaliza
    if (normalized.baseStats?.startingXp !== undefined && normalized.xp === undefined) {
      console.log(`[useFigureBaseData] 🔄 Convertendo baseStats.startingXp para xp para ${baseFigureId}`);
      normalized.xp = normalized.baseStats.startingXp;
    }
    
    // Garante que abilities seja um array
    if (!normalized.abilities && data.abilities) {
      normalized.abilities = Array.isArray(data.abilities) ? data.abilities : [];
    }
    
    // Log para debug APÓS normalização
    console.log(`[useFigureBaseData] ✅ Dados normalizados para ${baseFigureId}:`, {
      origem: figureFromArray ? 'array-facção' : figureFromFirestore.data ? 'individual' : 'static',
      temBaseStats: !!normalized.baseStats,
      baseStatsKeys: normalized.baseStats ? Object.keys(normalized.baseStats) : [],
      temStats: !!normalized.stats,
      temAbilities: Array.isArray(normalized.abilities) ? normalized.abilities.length : 0,
      temAvailableSkills: Array.isArray(normalized.availableSkills) ? normalized.availableSkills.length : 0,
      temEquipment: !!normalized.equipment,
      temLore: !!normalized.lore,
    });
    
    return normalized;
  }, [baseFigureId, figureFromFirestore.data, figureFromArray, figureFromStatic]);

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
  const { data: factionArrayData, loading: factionLoading } = useFactionData(factionId);
  
  // Busca figuras no array completo da facção
  const figuresFromArray = React.useMemo(() => {
    if (!factionArrayData || baseFigureIds.length === 0) return {};
    if (factionLoading) return {};
    
    let allUnits: any[] = [];
    if (Array.isArray(factionArrayData)) {
      allUnits = factionArrayData;
    } else if (factionArrayData?.data && Array.isArray(factionArrayData.data)) {
      allUnits = factionArrayData.data;
    } else if (factionArrayData?.content && Array.isArray(factionArrayData.content)) {
      allUnits = factionArrayData.content;
    }
    
    const results: Record<string, any> = {};
    baseFigureIds.forEach((id) => {
      const found = allUnits.find((unit: any) => unit.id === id);
      if (found) {
        results[id] = found;
        console.log(`[useMultipleFigureBaseData] ✅ Figura ${id} encontrada no array da facção ${factionId}`);
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
      ...figuresFromArray
    }).filter(key => {
      const fromIndividual = figuresFromFirestore.data?.[key];
      const fromArray = figuresFromArray[key];
      return (fromIndividual !== null && fromIndividual !== undefined) || (fromArray !== null && fromArray !== undefined);
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

    baseFigureIds.forEach((id) => {
      // Se não encontrou no Firestore (nem individual nem array), busca nos dados estáticos
      if (!figuresFromFirestore.data?.[id] && !figuresFromArray[id]) {
        const found = allUnits.find((unit: any) => unit.id === id);
        if (found) {
          // Normaliza: converte stats para baseStats se necessário
          const normalized = found.stats && !found.baseStats 
            ? { ...found, baseStats: found.stats }
            : found;
          results[id] = normalized;
          console.log(`[useMultipleFigureBaseData] ✅ Figura ${id} encontrada nos dados estáticos (fallback)`);
        }
      }
    });

    return results;
  }, [baseFigureIds, fallbackData, figuresFromFirestore.data, figuresFromArray]);

  // Normaliza todos os dados: converte stats para baseStats e outros campos
  const normalizedData = React.useMemo(() => {
    // Prioridade: Array da facção (Firestore/IndexedDB/Local) > Documentos individuais > Dados estáticos
    const combined = { ...figuresFromArray, ...figuresFromFirestore.data, ...figuresFromStatic };
    const normalized: Record<string, any> = {};
    
    Object.keys(combined).forEach((id) => {
      const data = combined[id];
      if (data) {
        const normalizedItem: any = { ...data };
        
        // Se tem stats mas não baseStats, converte
        if (normalizedItem.stats && !normalizedItem.baseStats) {
          normalizedItem.baseStats = normalizedItem.stats;
        }
        
        // Se tem stats.skills mas não availableSkills, converte
        if (normalizedItem.baseStats?.skills && !normalizedItem.availableSkills) {
          normalizedItem.availableSkills = normalizedItem.baseStats.skills;
        }
        
        // Se tem stats.startingXp mas não xp na raiz, normaliza
        if (normalizedItem.baseStats?.startingXp !== undefined && normalizedItem.xp === undefined) {
          normalizedItem.xp = normalizedItem.baseStats.startingXp;
        }
        
        // Garante que abilities seja um array
        if (!normalizedItem.abilities && data.abilities) {
          normalizedItem.abilities = Array.isArray(data.abilities) ? data.abilities : [];
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
  return useMultipleBaseData("base-equipment", baseEquipmentIds, baseEquipmentIds.length > 0);
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
 */
export function useMutationBaseData(baseMutationId: string | undefined) {
  return useBaseData("base-mutations", baseMutationId, !!baseMutationId);
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
  console.log(`[useResolvedFigure] 🔍 Iniciando resolução da figura ${baseFigureId || 'N/A'} da facção ${factionId || 'N/A'}`);
  
  const figureBase = useFigureBaseData(baseFigureId, factionId, factionFallbackData);
  
  // Log detalhado do que foi encontrado
  React.useEffect(() => {
    if (figureBase.data) {
      console.log(`[useResolvedFigure] ✅ Dados da figura ${baseFigureId} encontrados:`, {
        temBaseStats: !!figureBase.data?.baseStats,
        temStats: !!figureBase.data?.stats,
        temName: !!figureBase.data?.name,
        temLore: !!figureBase.data?.lore,
        temAbilities: Array.isArray(figureBase.data?.abilities),
        temEquipment: !!figureBase.data?.equipment,
        keys: Object.keys(figureBase.data),
      });
    } else {
      console.log(`[useResolvedFigure] ⚠️ Dados da figura ${baseFigureId} NÃO encontrados`);
    }
  }, [baseFigureId, figureBase.data]);
  
  const equipmentBases = useMultipleEquipmentBaseData(figure?.equipment || []);
  const skillBases = useMultipleBaseData("base-skills", figure?.availableSkills || []);
  const spellBases = useMultipleBaseData("base-spells", figure?.availableSpells || []);
  const mutationBases = useMultipleBaseData("base-mutations", figure?.mutations || []);

  const loading =
    figureBase.loading ||
    equipmentBases.loading ||
    skillBases.loading ||
    spellBases.loading ||
    mutationBases.loading;

  // Log quando todos os dados forem carregados
  if (!loading && figure?.baseFigureId) {
    console.log(`[useResolvedFigure] ✅ Figura ${figure.baseFigureId} resolvida:`, {
      figura: figureBase.data ? '✅' : '❌',
      equipamentos: `${Object.keys(equipmentBases.data || {}).length} encontrados`,
      skills: `${Object.keys(skillBases.data || {}).length} encontradas`,
      spells: `${Object.keys(spellBases.data || {}).length} encontradas`,
      mutacoes: `${Object.keys(mutationBases.data || {}).length} encontradas`,
    });
  }

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
  const allBaseFigureIds = figures.map((f) => f.baseFigureId).filter(Boolean);
  const allEquipmentIds = figures.flatMap((f) => f.equipment || []).filter(Boolean);
  const allSkillIds = figures.flatMap((f) => f.availableSkills || []).filter(Boolean);
  const allSpellIds = figures.flatMap((f) => f.availableSpells || []).filter(Boolean);
  const allMutationIds = figures.flatMap((f) => f.mutations || []).filter(Boolean);

  const figureBases = useMultipleFigureBaseData(allBaseFigureIds, factionId, factionFallbackData);
  const equipmentBases = useMultipleBaseData("base-equipment", allEquipmentIds);
  const skillBases = useMultipleBaseData("base-skills", allSkillIds);
  const spellBases = useMultipleBaseData("base-spells", allSpellIds);
  const mutationBases = useMultipleBaseData("base-mutations", allMutationIds);

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

