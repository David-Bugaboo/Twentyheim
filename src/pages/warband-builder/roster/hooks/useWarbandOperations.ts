/**
 * Hook para operações do warband (adicionar/remover figuras, atualizar propriedades)
 */

import { useRef } from "react";
import { toast } from "react-toastify";
import {
  createFigureFromBase,
  createEquipmentFromBase,
} from "../../utils/createFigureFromBase";
import { resolveEquipmentByName } from "../helpers/equipment.helpers";
// Catálogos de Skills (mesmos do SkillPicker)
import combateSkills from "../../../skills/data/combate.skills.json";
import atiradorSkills from "../../../skills/data/atirador.skills.json";
import academicaSkills from "../../../skills/data/academica.skills.json";
import forcaSkills from "../../../skills/data/forca.skills.json";
import velocidadeSkills from "../../../skills/data/velocidade.skills.json";
import irmasDeSigmarSkills from "../../../skills/data/irmas-de-sigmar.skills.json";
import skavenEnshinSkills from "../../../skills/data/skaven-do-cla-enshin.skills.json";
import saqueadoresHomemFeraSkills from "../../../skills/data/saqueadores-homem-fera.skills.json";
import cacadoresTesouroAnoesSkills from "../../../skills/data/cacadores-de-tesouro-anoes.skills.json";
import mataTrollsAnaoSkills from "../../../skills/data/mata-trolls-anao.skills.json";
import vonCarsteinSkills from "../../../skills/data/habilidades-von-carstein.skills.json";
import dragaoCarmesimSkills from "../../../skills/data/habilidades-de-dragao-carmesim.skills.json";
import lahmiaSkills from "../../../skills/data/habilidades-de-lahmia.skills.json";
import strigoiSkills from "../../../skills/data/habilidades-de-strigoi.skills.json";
import corsariosDruchiiSkills from "../../../skills/data/corsarios-druchii.skills.json";
import geckosSkills from "../../../skills/data/habilidades-de-geckos.skills.json";
import saurioSkills from "../../../skills/data/habilidades-de-saurio.skills.json";
import hordasOrcSkills from "../../../skills/data/hordas-orc.skills.json";
import filhosDeHashutSkills from "../../../skills/data/filhos-de-hashut.skills.json";
import necrarcasSkills from "../../../skills/data/habilidades-dos-necrarcas.skills.json";
import patrulheiroElficoSkills from "../../../skills/data/patrulheiro-elfico.skills.json";

// Catálogos de Magias (mesmos do SpellPicker)
// Catálogos de magias serão carregados via import() dinâmico para evitar require em runtime
import type { Warband } from "./useWarbandState";

interface UseWarbandOperationsParams {
  warband: Warband;
  setWarband: React.Dispatch<React.SetStateAction<Warband>>;
  setHasUnsavedChanges: (value: boolean) => void;
  equipmentCatalogs: {
    meleeDb: any[];
    rangedDb: any[];
    firearmsDb: any[];
    armorDb: any[];
    accessoriesDb: any[];
    remediesPoisonsDb: any[];
  };
}

export function useWarbandOperations({
  warband,
  setWarband,
  setHasUnsavedChanges,
  equipmentCatalogs,
}: UseWarbandOperationsParams) {
  // Catálogos estáticos para resolver IDs de habilidades e magias por nome
  const skillsCatalogs: any[] = [
    ...combateSkills,
    ...atiradorSkills,
    ...academicaSkills,
    ...forcaSkills,
    ...velocidadeSkills,
    ...irmasDeSigmarSkills,
    ...skavenEnshinSkills,
    ...saqueadoresHomemFeraSkills,
    ...cacadoresTesouroAnoesSkills,
    ...mataTrollsAnaoSkills,
    ...vonCarsteinSkills,
    ...dragaoCarmesimSkills,
    ...lahmiaSkills,
    ...strigoiSkills,
    ...corsariosDruchiiSkills,
    ...geckosSkills,
    ...saurioSkills,
    ...hordasOrcSkills,
    ...filhosDeHashutSkills,
    ...necrarcasSkills,
    ...patrulheiroElficoSkills,
  ].filter(Boolean);

  const allSpellFileIds = [
    "lore-of-horned-rat",
    "lore-of-necromancy",
    "druchii-magic",
    "magic-of-the-old-ones",
    "magic-of-the-goblins",
    "magic-of-the-waaaaagh",
    "prayers-of-sigmar",
    "prayers-of-ulric",
    "rituals-of-chaos",
    "rituals-of-hashut",
    "lesser-magic",
    "rituals-of-nurgle",
    "dark-god-invocations",
  ] as const;

  const importSpellCatalog = async (fileId: string): Promise<any[]> => {
    switch (fileId) {
      case "lore-of-horned-rat":
        return (await import("../../../spells/data/lore-of-horned-rat.json"))
          .default as any[];
      case "lore-of-necromancy":
        return (await import("../../../spells/data/lore-of-necromancy.json"))
          .default as any[];
      case "druchii-magic":
        return (await import("../../../spells/data/druchii-magic.json"))
          .default as any[];
      case "magic-of-the-old-ones":
        return (await import("../../../spells/data/magic-of-the-old-ones.json"))
          .default as any[];
      case "magic-of-the-goblins":
        return (await import("../../../spells/data/magic-of-the-goblins.json"))
          .default as any[];
      case "magic-of-the-waaaaagh":
        return (await import("../../../spells/data/magic-of-the-waaaaagh.json"))
          .default as any[];
      case "prayers-of-sigmar":
        return (await import("../../../spells/data/prayers-of-sigmar.json"))
          .default as any[];
      case "prayers-of-ulric":
        return (await import("../../../spells/data/prayers-of-ulric.json"))
          .default as any[];
      case "rituals-of-chaos":
        return (await import("../../../spells/data/rituals-of-chaos.json"))
          .default as any[];
      case "rituals-of-hashut":
        return (await import("../../../spells/data/rituals-of-hashut.json"))
          .default as any[];
      case "lesser-magic":
        return (await import("../../../spells/data/lesser-magic.json"))
          .default as any[];
      case "rituals-of-nurgle":
        return (await import("../../../spells/data/rituals-of-nurgle.json"))
          .default as any[];
      case "dark-god-invocations":
        return (await import("../../../spells/data/dark-god-invocations.json"))
          .default as any[];
      default:
        return [];
    }
  };

  const skillNameToId: Record<string, string> = Object.create(null);
  for (const s of skillsCatalogs) {
    const name = String(s?.name || "")
      .trim()
      .toLowerCase();
    const id = String(s?.id || "").trim();
    if (name && id && !skillNameToId[name]) skillNameToId[name] = id;
  }

  // O mapa global de magias por nome será resolvido on-demand via import dinâmico
  const editQueueRef = useRef<Promise<void>>(Promise.resolve());

  // Atualiza uma propriedade simples do warband
  const updateWarbandProperty = (
    property: "name" | "faction" | "notes" | "gold" | "wyrdstone",
    value: string
  ) => {
    editQueueRef.current = editQueueRef.current.then(async () => {
      setWarband(prev => ({
        ...prev,
        [property]: value,
      }));
      setHasUnsavedChanges(true);
    });
  };

  // Atualiza uma figure específica por ID
  const updateWarbandFigure = (
    figureId: string,
    updater: (figure: any) => any
  ) => {
    editQueueRef.current = editQueueRef.current.then(async () => {
      setWarband(prev => {
        const figures = (prev.figures || []).map((fig: any) => {
          if (fig?.id === figureId) {
            return updater(fig);
          }
          return fig;
        });
        return { ...prev, figures };
      });
      setHasUnsavedChanges(true);
    });
  };

  // Adiciona uma nova figure ao warband
  const addWarbandFigure = (figure: any) => {
    editQueueRef.current = editQueueRef.current.then(async () => {
      setWarband(prev => ({
        ...prev,
        figures: [...(prev.figures || []), figure],
      }));
      setHasUnsavedChanges(true);
    });
  };

  // Remove uma figure por ID
  const removeWarbandFigure = (figureId: string) => {
    editQueueRef.current = editQueueRef.current.then(async () => {
      setWarband(prev => ({
        ...prev,
        figures: (prev.figures || []).filter(
          (fig: any) => fig?.id !== figureId
        ),
      }));
      setHasUnsavedChanges(true);
    });
  };

  // Atualiza o vault
  const updateWarbandVault = (updater: (vault: any[]) => any[]) => {
    editQueueRef.current = editQueueRef.current.then(async () => {
      setWarband(prev => ({
        ...prev,
        vault: updater(prev.vault || []),
      }));
      setHasUnsavedChanges(true);
    });
  };

  // Adiciona figura a partir de base
  const addFigureFromBase = async (
    base: any,
    shouldChargeCost: boolean = true
  ) => {
    if (!base) return;
    setHasUnsavedChanges(true);
    // id gerado no createFigureFromBase

    // Obtém o custo ANTES de criar a figura
    let unitCost = 0;
    if (shouldChargeCost) {
      const costSource =
        base?.stats?.cost || base?.baseStats?.cost || base?.cost || "0";
      const costMatch = String(costSource).match(/(\d+)/);
      unitCost = costMatch ? parseInt(costMatch[1], 10) : 0;

      if (unitCost > 0) {
        const currentGoldMatch = String(warband.gold || "0").match(/(\d+)/);
        const currentGold = currentGoldMatch
          ? parseInt(currentGoldMatch[1], 10)
          : 0;

        if (currentGold < unitCost) {
          toast.error(
            `Você não tem coroas suficientes! (Necessário: ${unitCost}, Disponível: ${currentGold})`
          );
          return;
        }

        const newGold = Math.max(0, currentGold - unitCost);
        updateWarbandProperty("gold", String(newGold));
        toast.success(`Modelo adicionado! ${unitCost} coroas descontadas.`);
      }
    }

    const fig = createFigureFromBase(base);

    // Se for mercenário/lenda com itens fixos, resolve e equipa no formato Equipment (equipment.type.ts)
    // Tanto mercenários quanto lendas usam o campo mercEquipment ou mercItems
    const mercItemsRaw: any[] = (() => {
      if (Array.isArray(base?.stats?.mercEquipment))
        return base.stats.mercEquipment as any[];
      if (Array.isArray(base?.stats?.mercItems))
        return base.stats.mercItems as any[];
      if (typeof base?.stats?.mercEquipment === "string")
        return [base.stats.mercEquipment];
      if (typeof base?.stats?.mercItems === "string")
        return [base.stats.mercItems];
      return [];
    })();
    const splitter = /,|\||\/|\be\b|\bou\b/gi;
    const mercItems: string[] = (mercItemsRaw || [])
      .flatMap(x => String(x).split(splitter))
      .map(s => s.trim())
      .filter(s => s.length > 0);

    // Cria objetos Equipment (equipment.type.ts) para cada item do mercenário/lenda
    let equippedFromMerc: Array<{
      id: string;
      base_equipment_id: string;
      base_modifier_id?: string;
      countAsLight?: boolean;
    }> = [];
    if (mercItems.length > 0) {
      // Verifica se é a Bertha Bestraufrung (ID: bertha-bestraufrung)
      const isBertha =
        base?.id === "bertha-bestraufrung" ||
        String(base?.name || "")
          .toLowerCase()
          .includes("bertha");

      equippedFromMerc = mercItems
        .map(itemName => {
          // Resolve o equipamento pelo nome nos catálogos
          const resolved = resolveEquipmentByName(
            String(itemName),
            equipmentCatalogs
          );
          if (!resolved) {
            return null;
          }

          // O resolveEquipmentByName retorna um objeto com templateId = found.id do catálogo
          // createEquipmentFromBase usa esse templateId como base_equipment_id
          const equipment: {
            id: string;
            base_equipment_id: string;
            base_modifier_id?: string;
            countAsLight?: boolean;
          } = createEquipmentFromBase(resolved);

          // Bertha Bestraufrung: os dois "Martelo de Guerra Sigmarita" contam como armas leves
          if (isBertha) {
            const normalizedItemName = String(itemName).toLowerCase().trim();
            const normalizedMartelo =
              "martelo de guerra sigmarita".toLowerCase();
            if (
              normalizedItemName === normalizedMartelo ||
              (normalizedItemName.includes("martelo") &&
                normalizedItemName.includes("sigmarita"))
            ) {
              equipment.countAsLight = true;
            }
          }

          return equipment;
        })
        .filter(Boolean) as Array<{
        id: string;
        base_equipment_id: string;
        base_modifier_id?: string;
        countAsLight?: boolean;
      }>;

      // Atribui o array de Equipment ao equiped do mercenário/lenda
      (fig as any).equiped = equippedFromMerc;

      // Mercenários e lendas podem equipar/desequipar entre os itens que têm, mas não podem adicionar/remover do cofre
      (fig as any).equipmentLocked = true;
    }

    // Lendas: habilidades e magias fixas
    // legendSkills / legendSpells podem vir em base.stats
    const legendSkillsRaw: any[] = (() => {
      const ls = (base?.stats as any)?.legendSkills;
      if (!ls) return [];
      return Array.isArray(ls) ? ls : [ls];
    })();
    const legendSpellsVal: any = (base?.stats as any)?.legendSpells;

    const splitTokens = /,|\||\/|\be\b|\bou\b/gi;

    if (legendSkillsRaw.length > 0) {
      const names = legendSkillsRaw
        .flatMap(x => String(x).split(splitTokens))
        .map(s => s.trim())
        .filter(s => s.length > 0);
      const skillRefs = names
        .map(nm => {
          const id = skillNameToId[String(nm).toLowerCase()];
          if (!id) return null;
          return { id: crypto.randomUUID(), base_skill_id: id };
        })
        .filter(Boolean) as Array<{ id: string; base_skill_id: string }>;
      if (skillRefs.length > 0) {
        (fig as any).skills = skillRefs as any;
        (fig as any).skillsLocked = true;
      }
    }

    // Resolver legendSpells: novo formato { lore, spells } ou antigo (array/strings)
    const resolveLegendSpells = async (
      spellsInput: any
    ): Promise<
      Array<{
        id: string;
        base_spell_id?: string;
        casting_number_modifier?: number;
        name?: string;
        castingNumber?: number;
        keywords?: string[];
        effect?: string;
      }>
    > => {
      const results: Array<any> = [];
      const resolveInCatalog = (catalog: any[], name: string) =>
        (catalog || []).find(
          (s: any) =>
            String(s?.name || "")
              .trim()
              .toLowerCase() === name.toLowerCase()
        );
      const resolveByIdInCatalog = (catalog: any[], id: string) =>
        (catalog || []).find((s: any) => String(s?.id || "").trim() === id);
      const namesFromMixed = (val: any): string[] => {
        if (Array.isArray(val)) return val.map(v => String(v));
        return String(val)
          .split(splitter)
          .map(s => s.trim())
          .filter(s => s.length > 0);
      };

      if (
        spellsInput &&
        typeof spellsInput === "object" &&
        !Array.isArray(spellsInput)
      ) {
        const fileId = String(spellsInput.lore || "").trim();
        const raw = spellsInput.spells;
        const items: any[] = Array.isArray(raw) ? raw : namesFromMixed(raw || []);
        const catalog = await importSpellCatalog(fileId);
        for (const it of items) {
          let found: any = null;
          if (it && typeof it === "object" && !Array.isArray(it)) {
            const tokenId = String(it.id || "").trim();
            if (tokenId) {
              found = resolveByIdInCatalog(catalog, tokenId);
              if (!found) {
                for (const fid of allSpellFileIds) {
                  if (fid === fileId) continue;
                  const cat = await importSpellCatalog(fid);
                  found = resolveByIdInCatalog(cat, tokenId);
                  if (found) break;
                }
              }
            }
          } else {
            const nm = String(it || "");
            // tenta por id
            found = resolveByIdInCatalog(catalog, nm);
            // senão por nome
            if (!found) found = resolveInCatalog(catalog, nm);
          }
          if (!found) {
            // Fallback: busca global por nome (ou id se o item era string)
            for (const fid of allSpellFileIds) {
              if (fid === fileId) continue;
              const cat = await importSpellCatalog(fid);
              if (it && typeof it === "string") {
                found =
                  resolveByIdInCatalog(cat, it) || resolveInCatalog(cat, it);
              } else if (it && typeof it === "object" && it.id) {
                found = resolveByIdInCatalog(cat, String(it.id));
              }
              if (found) break;
            }
          }
          if (found) {
            const baseId = String(found.id || "");
            if (baseId) {
              results.push({
                id: crypto.randomUUID(),
                base_spell_id: baseId,
                casting_number_modifier: 0,
              });
            } else {
              results.push({
                id: crypto.randomUUID(),
                name: found.name,
                castingNumber: found.castingNumber || 0,
                keywords: Array.isArray(found.keywords) ? found.keywords : [],
                effect: found.effect || "",
              });
            }
          }
        }
      } else if (spellsInput) {
        const names = namesFromMixed(spellsInput);
        for (const nm of names) {
          let base: any = null;
          for (const fid of allSpellFileIds) {
            const cat = await importSpellCatalog(fid);
            // tenta por id
            base =
              resolveByIdInCatalog(cat, String(nm).trim()) ||
              resolveInCatalog(cat, String(nm));
            if (base) break;
          }
          if (base) {
            const baseId = String(base.id || "");
            if (baseId) {
              results.push({
                id: crypto.randomUUID(),
                base_spell_id: baseId,
                casting_number_modifier: 0,
              });
            } else {
              results.push({
                id: crypto.randomUUID(),
                name: base.name,
                castingNumber: base.castingNumber || 0,
                keywords: Array.isArray(base.keywords) ? base.keywords : [],
                effect: base.effect || "",
              });
            }
          }
        }
      }

      return results;
    };

    const resolvedLegendSpells = await resolveLegendSpells(legendSpellsVal);
    if (resolvedLegendSpells.length > 0) {
      (fig as any).spells = resolvedLegendSpells as any;
      (fig as any).spellsLocked = true;
    }

    // Adiciona adaga grátis (freeDagger) apenas se a base permitir
    // Verifica se a figura já tem adaga equipada (por base_equipment_id, que é o formato novo)
    const hasDagger = (fig as any).equiped?.some((e: any) => {
      // No formato novo, busca pelo base_equipment_id
      const baseId = String(e.base_equipment_id || "").toLowerCase();
      if (baseId.includes("adaga")) return true;

      // Fallback: se ainda estiver no formato antigo, busca por nome
      const name = String(e.name || "").toLowerCase();
      return name.includes("adaga");
    });

    // Verifica se a figura base tem adaga disponível em equipment.hand-to-hand
    // Pode estar em base.equipment ou base.baseStats.equipment
    const handToHandEquipment =
      base?.equipment?.["hand-to-hand"] ||
      base?.baseStats?.equipment?.["hand-to-hand"] ||
      [];

    const baseHasDaggerAvailable =
      Array.isArray(handToHandEquipment) &&
      handToHandEquipment.some((it: any) => {
        const itemName = String(it?.name || "").toLowerCase();
        return itemName.includes("adaga");
      });

    if (!hasDagger && baseHasDaggerAvailable) {
      const daggerBase = resolveEquipmentByName("Adaga", equipmentCatalogs);
      if (daggerBase) {
        const dagger = createEquipmentFromBase(daggerBase);
        (dagger as any).freeDagger = true;
        (fig as any).equiped = [dagger, ...((fig as any).equiped || [])];
      }
    }

    // custo não utilizado diretamente aqui; cálculo feito ao comprar

    // Adiciona a figure diretamente ao warband
    addWarbandFigure(fig);
  };

  // Remove unidade (com devolução de ouro e equipamentos)
  const removeUnit = (id: string) => {
    setHasUnsavedChanges(true);
    const figure = (warband.figures || []).find((f: any) => f?.id === id);
    if (!figure) return;

    // Verifica se é mercenário/lenda: pela flag equipmentLocked OU pelo role
    const role = (figure?.role || "").toString().toLowerCase();
    const hasEquipmentLocked = (figure as any)?.equipmentLocked === true;
    const isMercenaryOrLegend =
      hasEquipmentLocked || role.includes("merc") || role.includes("lenda");

    let nextVault = [...(warband.vault || [])];

    // Mercenários e lendas não devolvem equipamentos ao cofre (são equipamentos fixos)
    if (!isMercenaryOrLegend) {
      const figEquip: any[] = (figure?.equiped || []) as any[];
      // Filtra equipamentos: não inclui itens com freeDagger: true
      const equipmentToReturn = figEquip.filter((eq: any) => {
        return !(eq as any)?.freeDagger;
      });
      nextVault = [...nextVault, ...equipmentToReturn];
    } else {
    }

    // Calcula e devolve ouro
    let refund = 0;
    const costValue = figure?.baseStats?.cost || "0";
    const costMatch = String(costValue).match(/(\d+)/);
    refund = costMatch ? parseInt(costMatch[1], 10) : 0;

    const currentGoldMatch = String(warband.gold || "0").match(/(\d+)/);
    const currentGold = currentGoldMatch
      ? parseInt(currentGoldMatch[1], 10)
      : 0;
    const newGold = currentGold + refund;

    if (refund > 0) {
      toast.success(`Figura removida! ${refund} coroas devolvidas ao cofre.`);
    } else {
      toast.success("Figura removida!");
    }

    setWarband(prev => ({
      ...prev,
      vault: nextVault,
      figures: (prev.figures || []).filter((f: any) => f?.id !== id),
      gold: String(newGold),
    }));
  };

  return {
    updateWarbandProperty,
    updateWarbandFigure,
    addWarbandFigure,
    removeWarbandFigure,
    updateWarbandVault,
    addFigureFromBase,
    removeUnit,
  };
}
