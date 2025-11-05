import { useEffect, useMemo, useState } from "react";
import { useMultipleBaseData } from "../hooks/useBaseData";
import EquipmentCard from "./EquipmentCard";
import NaturalAttackModal from "./NaturalAttackModal";
import {
  hasGiantClawMutation,
  hasArsenalMaster,
  hasMarksmanMaster,
  hasTepokMark,
  hasBattleWizard,
  hasConjurador,
} from "../pages/warband-builder/roster/helpers/warbandCalculations.helpers";
import { isShieldName, isHelmetName } from "../pages/warband-builder/roster/helpers/equipment.helpers";

type ItemObj = { name: string; category: string; cost?: string; data?: any };

export interface EquipmentManagerProps {
  unitId: string;
  unitName: string;
  equipment?: Record<string, { name: string }[]> | undefined;
  abilities?: { name: string }[] | undefined;
  equippedItems?: ItemObj[] | undefined; // Agora usa figure.equiped diretamente (array de Equipment)
  stashItems: ItemObj[] | undefined;
  onEquipFromStashFlat: (unitId: string, itemId: string) => void;
  onUnequipToStashFlat: (unitId: string, itemId: string) => void;
  onEquipToSecondaryHand?: (unitId: string, itemId: string) => void;
  onUnequipFromSecondaryHand?: (unitId: string, itemId: string) => void;
  onEquipToPrimaryHand?: (
    unitId: string,
    itemId: string,
    asTwoHanded?: boolean
  ) => void;
  onUnequipFromPrimaryHand?: (unitId: string, itemId: string) => void;
  onEquipAsArmor?: (unitId: string, itemId: string) => void;
  onUnequipFromArmor?: (unitId: string, itemId: string) => void;
  onEquipAsPair?: (unitId: string, itemId: string) => void;
  maxSlots?: number;
  availableEquipmentNames?: string[]; // figure.avaiableEquipment para validação visual (legado)
  availableEquipment?: {
    // Objeto equipment completo da figura base para validação
    "hand-to-hand"?: Array<{ name: string; cost?: string }>;
    ranged?: Array<{ name: string; cost?: string }>;
    armor?: Array<{ name: string; cost?: string }>;
    miscellaneous?: Array<{ name: string; cost?: string }>;
    modifiers?: Array<{ name: string; cost?: string }>;
    [key: string]: Array<{ name: string; cost?: string }> | undefined;
  };
  equipmentLocked?: boolean;
  figureSkills?: Array<{ name: string; description?: string; id?: string }>; // figure.skills para verificar skills especiais
  figureMutations?: Array<{
    name?: string;
    id?: string;
    base_mutation_id?: string;
  }>; // figure.mutations para verificar mutações especiais
  figureSacredMarks?: Array<{
    name?: string;
    id?: string;
    base_sacred_mark_id?: string;
    base_id?: string;
  }>; // figure.sacredMarks para verificar marcas sagradas especiais
  figureInjuries?: Array<{ name?: string }>; // figure.injuries para regras que afetam mãos
}

const EquipmentManager: React.FC<EquipmentManagerProps> = ({
  unitId,
  unitName,
  // equipment,
  abilities,
  equippedItems, // Agora usa figure.equiped diretamente
  stashItems,
  onEquipFromStashFlat,
  onUnequipToStashFlat,
  onEquipToSecondaryHand,
  onUnequipFromSecondaryHand,
  onEquipToPrimaryHand,
  onUnequipFromPrimaryHand,
  onEquipAsArmor,
  onUnequipFromArmor,
  onEquipAsPair,
  maxSlots,
  availableEquipmentNames,
  availableEquipment,
  equipmentLocked,
  figureSkills,
  figureMutations,
  figureSacredMarks,
  figureInjuries,
}) => {
  // Regras antigas de permissão foram removidas: qualquer item do cofre pode ser equipado

  // Debug: verificar o que está sendo recebido
  useEffect(() => {
    if ((import.meta as any)?.env?.DEV) {
      // eslint-disable-next-line no-console
      console.debug(
        `[EquipmentManager] ${unitName} - equippedItems:`,
        equippedItems,
        `length: ${(equippedItems || []).length}`
      );
    }
  }, [equippedItems, unitName]);

  const usedSlots = useMemo(() => {
    const list = equippedItems || [];
    let total = 0;
    for (const it of list) {
      // Itens virtuais (adicionados por habilidades) não ocupam espaço
      if ((it as any)?.isVirtual) continue;

      // it já é o objeto Equipment completo, não precisa de .data
      const raw = (it as any)?.slots ?? (it as any)?.equipmentSpaces;
      let v: number | undefined;
      if (typeof raw === "number") v = raw;
      else if (typeof raw === "string") {
        const p = parseInt(raw, 10);
        if (Number.isFinite(p)) v = p;
      }
      // Adiciona os slots (adagas têm slots = 0, então não contam)
      total += v ?? 1;
    }
    return total;
  }, [equippedItems]);

  const filteredStash = stashItems || [];

  // Resolve bases para itens do cofre no novo formato (com base_equipment_id / base_modifier_id)
  const stashEquipmentIds = useMemo(
    () =>
      (filteredStash || [])
        .map((i: any) => {
          const itemData = i?.data || i;
          return itemData?.base_equipment_id;
        })
        .filter(Boolean),
    [filteredStash]
  );
  const stashModifierIds = useMemo(
    () =>
      (filteredStash || [])
        .map((i: any) => {
          const itemData = i?.data || i;
          return itemData?.base_modifier_id;
        })
        .filter(Boolean),
    [filteredStash]
  );
  const stashEquipmentBases = useMultipleBaseData(
    "base-equipment",
    stashEquipmentIds,
    stashEquipmentIds.length > 0
  );
  const stashModifierBases = useMultipleBaseData(
    "base-modifiers",
    stashModifierIds,
    stashModifierIds.length > 0
  );

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewData, setPreviewData] = useState<any | null>(null);
  const [isNaturalAttack, setIsNaturalAttack] = useState(false);

  // Função auxiliar para determinar (o) ou (a) baseado no final do nome
  const getModifierSuffix = (modifierName: string): string => {
    if (!modifierName) return "";
    const normalized = modifierName.trim().toLowerCase();
    // Palavras que terminam em "a" geralmente usam "(a)", outras "(o)"
    // Mas pode haver exceções, então vamos usar uma lógica simples:
    // Se termina em "a", "e", "i" (com algumas exceções) ou palavras específicas
    const endsWithA = normalized.endsWith("a") && !normalized.endsWith("ao");
    const endsWithE = normalized.endsWith("e") && !normalized.endsWith("oe");
    // Palavras que geralmente usam "(a)"
    const usesA =
      endsWithA ||
      endsWithE ||
      normalized === "pesada" ||
      normalized === "leve" ||
      normalized.endsWith("ada") ||
      normalized.endsWith("ida");
    return usesA ? " (a)" : " (o)";
  };

  const normalizeToEquipmentCard = (raw: any) => {
    if (!raw) return null;
    const toStr = (v: any) =>
      v === undefined || v === null ? null : String(v);
    const toArr = (v: any) => (Array.isArray(v) ? v : v ? [String(v)] : []);

    // NOVA ARQUITETURA: usa base.name do equipamento resolvido + modifier.name com (o)/(a)
    const baseEquipment = raw.base; // raw.base vem do RosterUnitCard
    const modifier = raw.modifier;

    // Se não tem base ainda, retorna dados básicos para não quebrar a renderização
    if (!baseEquipment && raw.base_equipment_id) {
      console.warn(
        "[EquipmentManager] Equipamento base ainda carregando:",
        raw.base_equipment_id
      );
      // Retorna dados mínimos para não quebrar a UI
      return {
        name: `Carregando... (${raw.base_equipment_id})`,
        type: null,
        damageModifier: null,
        maxRange: null,
        exclusive: null,
        cost: null,
        spaces: null,
        description: [],
        strength: null,
        armorBonus: null,
        movePenalty: null,
        requirements: null,
        rarity: null,
        availability: undefined,
        effect: null,
        specialRules: [],
      };
    }

    const baseName = String(baseEquipment?.name || raw.name || "");
    const modifierName = modifier?.name;

    // Formata nome: "Item + Modificador (o)" ou "Item + Modificador (a)"
    const nameWithMod = modifierName
      ? `${baseName} ${modifierName}${getModifierSuffix(modifierName)}`
      : baseName;
    const toSpecialRules = (
      sr: any
    ): Array<{ label: string; value: string }> => {
      if (!Array.isArray(sr)) return [];
      const out: Array<{ label: string; value: string }> = [];
      for (const item of sr) {
        if (!item) continue;
        if (typeof item === "string") {
          out.push({ label: "Regra Especial", value: item });
        } else if (item.label || item.value) {
          out.push({
            label: String(item.label || "Regra Especial"),
            value: String(item.value || ""),
          });
        }
      }
      return out.filter(r => r.value);
    };

    const base = {
      name: toStr(nameWithMod),
      type: toStr(
        baseEquipment?.type ||
          baseEquipment?.category ||
          raw.type ||
          raw.category
      ),
      damageModifier: toStr(
        baseEquipment?.damageModifier ||
          baseEquipment?.damage ||
          baseEquipment?.modificadorDeDano ||
          raw.damageModifier ||
          raw.damage ||
          raw.modificadorDeDano
      ),
      maxRange: toStr(
        baseEquipment?.maxRange ||
          baseEquipment?.range ||
          baseEquipment?.alcance ||
          raw.maxRange ||
          raw.range ||
          raw.alcance
      ),
      exclusive: toStr(baseEquipment?.exclusive || raw.exclusive),
      specialProperties: Array.isArray(baseEquipment?.specialProperties)
        ? baseEquipment.specialProperties
        : Array.isArray(raw.specialProperties)
          ? raw.specialProperties
          : undefined,
      // Calcula custo final: base * multiplier (se houver modificador)
      cost: (() => {
        const baseCostStr = String(
          baseEquipment?.cost ||
            baseEquipment?.purchaseCost ||
            baseEquipment?.sellCost ||
            raw.cost ||
            raw.purchaseCost ||
            raw.sellCost ||
            "0"
        );
        const baseCostMatch = baseCostStr.match(/(\d+(?:\.\d+)?)/);
        const baseCost = baseCostMatch ? parseFloat(baseCostMatch[1]) : 0;
        const multiplier = modifier?.multiplier ?? 1;
        const modifierAddend = raw.modifierAddend ?? 0;
        const modifierFixedCost = raw.modifierFixedCost;

        let finalCost = baseCost;
        if (modifierFixedCost != null) {
          finalCost = modifierFixedCost; // Substituição de custo
        } else {
          finalCost = baseCost * multiplier + modifierAddend; // Multiplicador + adição
        }

        return finalCost % 1 === 0
          ? `${Math.round(finalCost)} coroas`
          : `${finalCost} coroas`;
      })(),
      spaces: toStr(
        baseEquipment?.spaces ||
          baseEquipment?.equipmentSpaces ||
          baseEquipment?.espacos ||
          baseEquipment?.slots ||
          raw.spaces ||
          raw.equipmentSpaces ||
          raw.espacos ||
          raw.slots
      ),
      description: toArr(
        baseEquipment?.description ||
          baseEquipment?.descricao ||
          raw.description ||
          raw.descricao
      ),
      strength: toStr(
        baseEquipment?.strength ||
          baseEquipment?.requisitoDeForca ||
          baseEquipment?.requisitosDeForca ||
          raw.strength ||
          raw.requisitoDeForca ||
          raw.requisitosDeForca
      ),
      armorBonus: toStr(
        baseEquipment?.armorBonus ||
          baseEquipment?.armourBonus ||
          baseEquipment?.armadura ||
          baseEquipment?.bonusArmadura ||
          raw.armorBonus ||
          raw.armourBonus ||
          raw.armadura ||
          raw.bonusArmadura
      ),
      movePenalty: toStr(
        baseEquipment?.movePenalty ||
          baseEquipment?.penalidadeMovimento ||
          raw.movePenalty ||
          raw.penalidadeMovimento
      ),
      requirements: toStr(
        baseEquipment?.requirements ||
          baseEquipment?.requisitos ||
          raw.requirements ||
          raw.requisitos
      ),
      rarity: baseEquipment?.rarity ?? raw.rarity ?? null,
      availability: Array.isArray(baseEquipment?.availability)
        ? baseEquipment.availability
        : Array.isArray(raw.availability)
          ? raw.availability
          : undefined,
      effect: toStr(
        baseEquipment?.effect ||
          baseEquipment?.efeito ||
          raw.effect ||
          raw.efeito
      ),
      specialRules: (() => {
        // Regras especiais do item base (prioriza baseEquipment)
        const baseSpecialRules =
          baseEquipment?.specialRules || (raw as any)?.specialRules;
        const baseRules = toSpecialRules(baseSpecialRules);

        // Adiciona efeito do modificador como special rule (se houver)
        if (modifier?.effect) {
          baseRules.push({
            label: "Regra Especial",
            value: String(modifier.effect),
          });
        }

        return baseRules;
      })(),
    };
    return base;
  };

  const openPreview = (item: any) => {
    // Itens virtuais (armas naturais) usam modal customizado
    if ((item as any)?.isVirtual) {
      const attackId = (item as any)?.id;
      if (attackId) {
        // Importação dinâmica para evitar dependência circular
        import("./NaturalAttackModal").then(module => {
          const attackData = module.getNaturalAttackData(attackId);
          if (attackData) {
            setPreviewData(attackData);
            setIsNaturalAttack(true);
            setPreviewOpen(true);
          }
        });
      }
      return;
    }

    // item já é o objeto Equipment completo (de figure.equiped)
    // Não precisa buscar no catálogo - usa direto
    const normalized = normalizeToEquipmentCard(item);
    if (normalized) {
      setPreviewData(normalized);
      setIsNaturalAttack(false);
      setPreviewOpen(true);
    }
  };

  // Verifica o estado atual das mãos equipadas para determinar quais botões mostrar
  const getHandState = () => {
    const allEquipped = equippedItems || [];

    // Verifica se há uma arma de duas mãos equipada (usa o flag twoHandedWeapon)
    const twoHandedWeapon = allEquipped.find(
      (e: any) => e?.twoHandedWeapon === true
    );

    // Verifica se há algo na mão primária (ignora armas virtuais como a garra)
    const hasMainHandItem = allEquipped.some(
      (e: any) =>
        !(e as any)?.isVirtual &&
        (e?.mainHandWeapon === true || e?.twoHandedWeapon === true)
    );

    // Verifica se há algo na mão secundária (inclui armas virtuais como a garra)
    const hasOffHandItem = allEquipped.some(
      (e: any) => e?.offHandWeapon === true
    );

    // Verifica se há uma ARMA (não escudo) com Leve ou Pistola na mão secundária
    const hasLightWeaponInOffHand = allEquipped.some((e: any) => {
      if (!e?.offHandWeapon) return false;
      const base = (e as any)?.base;
      // Verifica se é um escudo
      const cat = String(
        base?.type ||
          base?.category ||
          (e as any)?.type ||
          (e as any)?.category ||
          ""
      ).toLowerCase();
      const isShield =
        cat === "escudo" ||
        base?.type === "Escudo" ||
        String(base?.name || "")
          .toLowerCase()
          .includes("escudo");

      // Se for escudo, não conta
      if (isShield) return false;

      // Verifica se é uma arma com Leve ou Pistola
      // Também verifica o campo countAsLight: true (para casos especiais como Bertha)
      if ((e as any)?.countAsLight === true) return true;
      const specialRules = base?.specialRules || [];
      const rulesText = JSON.stringify(specialRules).toLowerCase();
      return rulesText.includes("leve") || rulesText.includes("pistola");
    });

    // Verifica se há uma arma desbalanceada equipada (na mão principal)
    // Inclui armas versáteis em modo uma mão (mainHandWeapon sem twoHandedWeapon) que têm desbalanceada
    const unbalancedWeapon = allEquipped.find((e: any) => {
      // Deve estar na mão primária (mainHandWeapon ou twoHandedWeapon)
      if (!e?.mainHandWeapon && !e?.twoHandedWeapon) return false;

      // Se for versátil em modo duas mãos (twoHandedWeapon), não conta como desbalanceada
      const isVersatile = (() => {
        const base = (e as any)?.base;
        const specialRules = base?.specialRules || [];
        const rulesText = JSON.stringify(specialRules).toLowerCase();
        return rulesText.includes("versátil") || rulesText.includes("versatil");
      })();

      // Se for versátil em modo duas mãos, não é desbalanceada
      if (isVersatile && e?.twoHandedWeapon) return false;

      const base = (e as any)?.base;
      const specialRules = base?.specialRules || [];
      return specialRules.some((rule: any) => {
        const ruleLabel = String(rule?.label || rule?.title || "")
          .toLowerCase()
          .trim();
        return ruleLabel === "desbalanceada";
      });
    });

    return {
      hasTwoHandedWeapon: !!twoHandedWeapon,
      hasUnbalancedWeapon: !!unbalancedWeapon,
      hasMainHandItem,
      hasOffHandItem,
      hasLightWeaponInOffHand,
    };
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-lg font-bold" style={{ color: "#8fbc8f" }}>
          Itens Equipados - {unitName}
        </h4>
        <span
          className={
            usedSlots > (maxSlots ?? 5)
              ? "text-sm font-semibold text-red-400"
              : "text-sm text-gray-300"
          }
          title={
            usedSlots > (maxSlots ?? 5)
              ? "Excedendo os espaços de equipamento"
              : undefined
          }
        >
          Espaços: {usedSlots}/{maxSlots ?? 5}
          {usedSlots > (maxSlots ?? 5) ? "  (excedido)" : ""}
        </span>
      </div>
      <div className="bg-[#2a2a2a] p-4 rounded space-y-2">
        {(equippedItems || []).length === 0 ? (
          <div className="text-gray-400">(vazio)</div>
        ) : (
          <div className="space-y-1">
            {(() => {
              const handState = getHandState();
              // Verifica se tem Garra Colossal para bloquear equipamentos
              const hasGiantClaw = hasGiantClawMutation(figureMutations || []);
              // Verifica ferimento de antebraço esmagado para aplicar mesma regra
              const hasCrushedForearm = (() => {
                const injuries = figureInjuries || [];
                return injuries.some((inj: any) => {
                  const n = String(inj?.name || inj || "").toLowerCase();
                  const hasForearm =
                    n.includes("antebraço") ||
                    n.includes("antebraco") ||
                    n.includes("ante-braço") ||
                    n.includes("ante-braco") ||
                    n.includes("ante braço") ||
                    n.includes("ante braco");
                  const hasCrush = n.includes("esmag") || n.includes("esmigalh");
                  return hasForearm && hasCrush;
                });
              })();
              const offhandDisabled = hasGiantClaw || hasCrushedForearm;
              return (equippedItems || []).map((it, idx) => {
                // NOVA ARQUITETURA: usa base e modifier resolvidos (vindo do RosterUnitCard)
                const baseEquipment = (it as any)?.base;
                const modifier = (it as any)?.modifier;

                // Categoria vem do baseEquipment resolvido
                const cat = String(
                  baseEquipment?.type ||
                    baseEquipment?.category ||
                    (it as any)?.type ||
                    (it as any)?.category ||
                    ""
                ).toLowerCase();

                // Verifica se é um escudo
                const isShield =
                  cat === "escudo" ||
                  baseEquipment?.type === "Escudo" ||
                  (it as any)?.type === "Escudo" ||
                  String(baseEquipment?.name || "")
                    .toLowerCase()
                    .includes("escudo") ||
                  String((it as any)?.name || "")
                    .toLowerCase()
                    .includes("escudo");

                // Verifica se é uma armadura
                const isArmor =
                  cat === "armadura" ||
                  baseEquipment?.type === "Armadura" ||
                  (it as any)?.type === "Armadura" ||
                  String(baseEquipment?.name || "")
                    .toLowerCase()
                    .includes("armadura") ||
                  String((it as any)?.name || "")
                    .toLowerCase()
                    .includes("armadura");

                // Verifica se é um elmo (não deve ter botão de equipar)
                const itemNameForHelmetCheck =
                  baseEquipment?.name || (it as any)?.name || "";
                const isHelmet = isHelmetName(itemNameForHelmetCheck);

                // Verifica se é uma arma (Corpo a Corpo, a Distância, Arma de Fogo)
                const isWeapon =
                  cat === "hand-to-hand" ||
                  cat === "ranged" ||
                  cat === "firearms" ||
                  cat.includes("corpo a corpo") ||
                  cat.includes("corpo-a-corpo") ||
                  cat.includes("distância") ||
                  cat.includes("distancia") ||
                  cat.includes("arma de fogo") ||
                  cat.includes("fogo") ||
                  baseEquipment?.type === "Arma Corpo a Corpo" ||
                  baseEquipment?.type === "Arma a Distância" ||
                  baseEquipment?.type === "Arma de Fogo" ||
                  (it as any)?.type === "Arma Corpo a Corpo" ||
                  (it as any)?.type === "Arma a Distância" ||
                  (it as any)?.type === "Arma de Fogo";

                // Verifica se já está equipado na mão secundária
                const isInSecondaryHand = (it as any)?.offHandWeapon === true;

                // Verifica se já está equipado na mão primária
                const isInPrimaryHand = (it as any)?.mainHandWeapon === true;

                // Verifica se já está equipado como duas mãos
                const isTwoHandedEquipped =
                  (it as any)?.twoHandedWeapon === true;

                // Verifica se já está equipado como armadura
                const isEquippedAsArmor = (it as any)?.equippedAsArmor === true;

                // Verifica se o equipamento tem a característica "Duas Mãos"
                const specialRules = baseEquipment?.specialRules || [];
                const rulesText = JSON.stringify(specialRules).toLowerCase();
                const isTwoHandedWeapon =
                  rulesText.includes("duas mãos") ||
                  rulesText.includes("duas-maos") ||
                  (baseEquipment?.specialRules || []).some(
                    (rule: any) =>
                      String(rule?.label || rule?.title || "").toLowerCase() ===
                        "duas mãos" ||
                      String(rule?.label || rule?.title || "").toLowerCase() ===
                        "duas-maos"
                  );

                // Verifica se o equipamento tem a característica "Versátil"
                const isVersatileWeapon =
                  rulesText.includes("versátil") ||
                  rulesText.includes("versatil") ||
                  (baseEquipment?.specialRules || []).some(
                    (rule: any) =>
                      String(rule?.label || rule?.title || "").toLowerCase() ===
                        "versátil" ||
                      String(rule?.label || rule?.title || "").toLowerCase() ===
                        "versatil"
                  );

                // Verifica se o equipamento tem características que permitem mão secundária (Leve ou Pistola)
                // IMPORTANTE: verifica apenas os labels/títulos das regras, não o conteúdo
                // Também verifica o campo countAsLight: true (para casos especiais como Bertha)
                const hasLightRule =
                  (it as any)?.countAsLight === true ||
                  (baseEquipment?.specialRules || []).some((rule: any) => {
                    const ruleLabel = String(rule?.label || rule?.title || "")
                      .toLowerCase()
                      .trim();
                    return ruleLabel === "leve";
                  });
                const hasPistolRule = (baseEquipment?.specialRules || []).some(
                  (rule: any) => {
                    const ruleLabel = String(rule?.label || rule?.title || "")
                      .toLowerCase()
                      .trim();
                    return ruleLabel.includes("pistola");
                  }
                );

                // Verifica se o equipamento tem a regra "Desbalanceada"
                const hasDesbalancedRule = (
                  baseEquipment?.specialRules || []
                ).some((rule: any) => {
                  const ruleLabel = String(rule?.label || rule?.title || "")
                    .toLowerCase()
                    .trim();
                  return ruleLabel === "desbalanceada";
                });

                // Verifica se o equipamento tem a regra "Par"
                const hasPairRule = (baseEquipment?.specialRules || []).some(
                  (rule: any) => {
                    const ruleLabel = String(rule?.label || rule?.title || "")
                      .toLowerCase()
                      .trim();
                    return ruleLabel === "par";
                  }
                );

                // Determina se pode equipar na mão secundária baseado nas regras
                let canEquipToSecondaryHand = false;

                // Com Garra Colossal, NADA pode ir na mão secundária (a garra ocupa esse espaço)
                if (offhandDisabled) {
                  canEquipToSecondaryHand = false;
                }
                // ESCUDOS: sempre podem ir na mão secundária (exceto se houver arma de duas mãos)
                else if (isShield) {
                  // Regra 1: Se há arma de duas mãos equipada, nenhum equipamento mostra botão mão secundária
                  if (handState.hasTwoHandedWeapon) {
                    canEquipToSecondaryHand = false;
                  } else {
                    // Escudos podem ser equipados em qualquer outro caso
                    canEquipToSecondaryHand = true;
                  }
                }
                // ARMAS: regras específicas
                else if (isWeapon) {
                  // Regra 1: Se há arma de duas mãos equipada, nenhum equipamento mostra botão mão secundária
                  if (handState.hasTwoHandedWeapon) {
                    canEquipToSecondaryHand = false;
                  }
                  // Regra 2: Se há arma desbalanceada equipada, apenas escudos mostram botão mão secundária
                  // (armas não podem ir na secundária neste caso)
                  else if (handState.hasUnbalancedWeapon) {
                    canEquipToSecondaryHand = false;
                  }
                  // Regra 3: Caso normal - apenas armas com Leve/Pistola podem ir na mão secundária
                  else {
                    canEquipToSecondaryHand = hasLightRule || hasPistolRule;
                  }
                }

                const isWeaponOrArmor =
                  cat === "hand-to-hand" ||
                  cat === "ranged" ||
                  cat === "armor" ||
                  cat.includes("arma") ||
                  cat.includes("armadura");

                // Monta nome completo: base.name + modifier.name (o)/(a)
                const baseName = String(
                  baseEquipment?.name ||
                    (it as any)?.name ||
                    (it as any)?.base_equipment_id ||
                    "Carregando..."
                ).trim();
                const modifierName = modifier?.name;
                let displayLabel = modifierName
                  ? `${baseName} ${modifierName}${getModifierSuffix(modifierName)}`
                  : baseName;

                // Se não tem base ainda, adiciona indicador
                if (!baseEquipment && (it as any)?.base_equipment_id) {
                  displayLabel = `${displayLabel} (carregando...)`;
                }

                // LÓGICA SIMPLES: verifica se item.name está em availableEquipmentNames
                let isViolation = false;

                // Itens virtuais (armas naturais) são sempre compatíveis
                const isVirtual = (it as any)?.isVirtual === true;
                if (isVirtual) {
                  isViolation = false; // Garante que não marca como incompatível
                }

                // Marca de Tepok: Se tiver a marca, torna armaduras e escudos incompatíveis
                const sacredMarks = figureSacredMarks || [];
                const hasTepok = hasTepokMark(sacredMarks);
                if (hasTepok && !isVirtual) {
                  // Verifica se é armadura ou escudo
                  const itemName = baseEquipment?.name || baseName;
                  const isArmor =
                    cat === "armor" ||
                    cat.includes("armadura") ||
                    baseEquipment?.type === "Armadura" ||
                    (it as any)?.type === "Armadura" ||
                    (it as any)?.category === "armor" ||
                    (it as any)?.category === "armadura";
                  const isShield = isShieldName(itemName);

                  if (isArmor || isShield) {
                    isViolation = true;
                    displayLabel = `${displayLabel} (incompatível - Marca de Tepok)`;
                  }
                }

                // Conjurador: Se tiver a specialRule Conjurador, torna armaduras, escudos e elmos incompatíveis
                // Exceções: 
                // - Se tiver "Mago de Batalha", pode usar armaduras disponíveis no equipamento
                // - "Elmo de Osso" é sempre permitido mesmo sem "Mago de Batalha"
                const figureAbilities = abilities || [];
                const hasConjuradorRule = hasConjurador(figureAbilities);
                const skills = figureSkills || [];
                const hasBattleWizardSkill = hasBattleWizard(skills);
                
                if (hasConjuradorRule && !isVirtual) {
                  const itemName = baseEquipment?.name || baseName;
                  const normalizedItemName = itemName.toLowerCase();
                  
                  // Verifica se é armadura
                  const isArmor =
                    cat === "armor" ||
                    cat.includes("armadura") ||
                    baseEquipment?.type === "Armadura" ||
                    (it as any)?.type === "Armadura" ||
                    (it as any)?.category === "armor" ||
                    (it as any)?.category === "armadura";
                  
                  // Verifica se é escudo
                  const isShield = isShieldName(itemName);
                  
                  // Verifica se é elmo
                  const isHelmet = isHelmetName(itemName);
                  
                  // Verifica se é "Elmo de Osso" (exceção especial)
                  const isBoneHelmet = normalizedItemName.includes("elmo de osso") || 
                                      normalizedItemName.includes("bone helmet");

                  // Se tiver Mago de Batalha, permite armaduras disponíveis no equipamento
                  // Mas ainda bloqueia escudos (mesmo com Mago de Batalha)
                  if (isArmor && hasBattleWizardSkill) {
                    // Permite armaduras disponíveis no equipamento (a validação normal vai verificar)
                    // Não marca como violation aqui, deixa a validação normal verificar se está disponível
                  } else if (isArmor) {
                    // Sem Mago de Batalha, armaduras são incompatíveis
                    isViolation = true;
                    displayLabel = `${displayLabel} (incompatível - Conjurador)`;
                  }
                  
                  // Escudos são sempre incompatíveis para Conjuradores (mesmo com Mago de Batalha)
                  if (isShield) {
                    isViolation = true;
                    displayLabel = `${displayLabel} (incompatível - Conjurador)`;
                  }
                  
                  // Elmos são incompatíveis, EXCETO "Elmo de Osso"
                  if (isHelmet && !isBoneHelmet) {
                    isViolation = true;
                    displayLabel = `${displayLabel} (incompatível - Conjurador)`;
                  }
                }

                // Só valida se NÃO estiver locked E for arma/armadura E não for virtual
                if (
                  !equipmentLocked &&
                  isWeaponOrArmor &&
                  !isVirtual &&
                  !isViolation
                ) {
                  // Verifica skills especiais que permitem pular a validação
                  const skills = figureSkills || [];
                  // Usa as funções helper que verificam pelo base_skill_id
                  const hasMestreArsenal = hasArsenalMaster(skills);
                  const hasMestreAtirador = hasMarksmanMaster(skills);

                  // Verifica se pode pular a validação por causa das skills
                  let skipValidation = false;
                  // Mestre do Arsenal: permite qualquer arma corpo a corpo
                  // Verifica múltiplas variações de categoria
                  const isMeleeWeapon =
                    cat === "hand-to-hand" ||
                    cat.includes("corpo a corpo") ||
                    cat.includes("corpo-a-corpo") ||
                    cat.includes("corpoacorpo") ||
                    baseEquipment?.type === "Arma Corpo a Corpo" ||
                    (it as any)?.type === "Arma Corpo a Corpo";

                  if (isMeleeWeapon && hasMestreArsenal) {
                    skipValidation = true;
                  }
                  // Mestre Atirador: permite qualquer arma a distância ou de fogo
                  // Verifica múltiplas variações de categoria
                  const isRangedOrFirearm =
                    cat === "ranged" ||
                    cat === "firearms" ||
                    cat === "arma de fogo" ||
                    cat.includes("distância") ||
                    cat.includes("distancia") ||
                    cat.includes("fogo") ||
                    cat.includes("arma a distância") ||
                    cat.includes("arma a distancia") ||
                    cat.includes("arma de fogo") ||
                    baseEquipment?.type === "Arma a Distância" ||
                    baseEquipment?.type === "Arma de Fogo" ||
                    (it as any)?.type === "Arma a Distância" ||
                    (it as any)?.type === "Arma de Fogo";

                  if (isRangedOrFirearm && hasMestreAtirador) {
                    skipValidation = true;
                  }

                  // Se não puder pular, valida normalmente
                  if (!skipValidation) {
                    // Busca em todos os subcampos de equipment da figura base
                    let isAvailable = false;
                    const nameToCheck = baseEquipment?.name || baseName;

                    if (availableEquipment) {
                      // Itera por todos os subcampos de equipment (hand-to-hand, ranged, armor, etc.)
                      for (const items of Object.values(availableEquipment)) {
                        if (Array.isArray(items)) {
                          const found = items.some((item: any) => {
                            const itemName = String(item?.name || "").trim();
                            return (
                              itemName === nameToCheck ||
                              itemName.toLowerCase() ===
                                nameToCheck.toLowerCase()
                            );
                          });
                          if (found) {
                            isAvailable = true;
                            break;
                          }
                        }
                      }
                    }

                    // Fallback: usa availableEquipmentNames se não tiver availableEquipment
                    if (!isAvailable && availableEquipmentNames) {
                      isAvailable =
                        availableEquipmentNames.includes(nameToCheck);
                    }

                    if (!isAvailable) {
                      isViolation = true;
                      displayLabel = `${displayLabel} (incompatível)`;
                    }
                  }
                }

                // Verifica se é arma a distância e tem alcance
                const isRanged =
                  cat === "ranged" ||
                  cat.includes("distância") ||
                  cat.includes("distancia") ||
                  cat.includes("fogo") ||
                  cat === "arma de fogo";
                // Alcance vem do baseEquipment resolvido
                const maxRange =
                  baseEquipment?.maxRange ||
                  baseEquipment?.range ||
                  baseEquipment?.alcance ||
                  (it as any)?.maxRange;

                // Verifica se é um item virtual (adicionado por habilidades)
                const isVirtualItem = (it as any)?.isVirtual === true;

                return (
                  <div
                    key={`${baseName}-${modifier?.name || ""}-${idx}-${
                      (it as any)?.id || idx
                    }`}
                    className="flex justify-between items-center"
                  >
                    <button
                      type="button"
                      onClick={() => openPreview(it)}
                      className={isViolation ? "text-red-400" : "text-white"}
                      title={
                        isViolation
                          ? "Item não disponível para esta figura"
                          : "Ver detalhes do item"
                      }
                    >
                      {displayLabel}
                      {isRanged && maxRange && (
                        <span className="text-gray-400 ml-2">({maxRange})</span>
                      )}
                    </button>
                    <div className="flex gap-2">
                      {/* Badge "Ataque Natural" para itens virtuais */}
                      {isVirtualItem && (
                        <span className="px-2 py-1 rounded bg-amber-600 text-white text-xs">
                          Ataque Natural
                        </span>
                      )}
                      {/* Para armas de duas mãos, sempre mostra botão "Equipar (Duas Mãos)" - exceto se já houver uma equipada */}
                      {/* Bloqueado se tiver Garra Colossal (não pode usar duas mãos) */}
                      {/* Mercenários podem equipar mesmo com equipmentLocked (mas não podem adicionar do cofre) */}
                      {/* Itens virtuais não podem ser equipados */}
                      {/* Itens incompatíveis não podem ser equipados */}
                      {!isVirtualItem &&
                        !isViolation &&
                        isWeapon &&
                        isTwoHandedWeapon &&
                        !isVersatileWeapon &&
                        !handState.hasTwoHandedWeapon &&
                        !isInPrimaryHand &&
                        !isInSecondaryHand &&
                        !offhandDisabled && // Bloqueia se offhand estiver desabilitada (não pode usar duas mãos)
                        onEquipToPrimaryHand && (
                          <button
                            onClick={() =>
                              onEquipToPrimaryHand(
                                unitId,
                                (it as any)?.id || "",
                                true
                              )
                            }
                            className="px-2 py-1 rounded bg-green-600 hover:bg-green-700 text-white text-xs"
                            title="Equipar (Duas Mãos) - desequipa todas as armas das mãos"
                          >
                            Equipar (Duas Mãos)
                          </button>
                        )}
                      {/* Para armas versáteis */}
                      {/* Com Garra Colossal: só mostra botão "Equipar (Mão Principal)" - modo uma mão */}
                      {/* Sem Garra Colossal: mostra ambos os botões (Duas Mãos e Mão Principal) */}
                      {/* Mercenários podem equipar mesmo com equipmentLocked */}
                      {/* Itens virtuais não podem ser equipados */}
                      {/* Itens incompatíveis não podem ser equipados */}
                      {!isVirtualItem &&
                        !isViolation &&
                        isWeapon &&
                        isVersatileWeapon &&
                        !isInPrimaryHand &&
                        !isInSecondaryHand &&
                        onEquipToPrimaryHand && (
                          <>
                            {/* Botão duas mãos só aparece se NÃO estiver com offhand desabilitada */}
                            {!handState.hasTwoHandedWeapon && !offhandDisabled && (
                              <button
                                onClick={() =>
                                  onEquipToPrimaryHand?.(
                                    unitId,
                                    (it as any)?.id || "",
                                    true
                                  )
                                }
                                className="px-2 py-1 rounded bg-purple-600 hover:bg-purple-700 text-white text-xs"
                                title="Equipar como arma de duas mãos (desequipa todas as outras armas)"
                              >
                                Equipar (Duas Mãos)
                              </button>
                            )}
                            {/* Botão mão principal */}
                            {/* Com offhand desabilitada: sempre mostra (modo uma mão) */}
                            {/* Sem Garra Colossal: mostra se não tiver nada na mão primária e não tiver conflito */}
                            {(offhandDisabled ||
                              (!handState.hasMainHandItem &&
                                !(
                                  handState.hasLightWeaponInOffHand &&
                                  hasDesbalancedRule
                                ))) && (
                              <button
                                onClick={() =>
                                  onEquipToPrimaryHand?.(
                                    unitId,
                                    (it as any)?.id || "",
                                    false
                                  )
                                }
                                className="px-2 py-1 rounded bg-green-600 hover:bg-green-700 text-white text-xs"
                                title={"Equipar na mão principal"}
                              >
                                Equipar (Mão Principal)
                              </button>
                            )}
                          </>
                        )}
                      {/* ESCUDOS: só aparecem se não tiver nada na mão secundária (exceto se houver arma de duas mãos) */}
                      {/* Bloqueado se tiver Garra Colossal */}
                      {/* Mercenários podem equipar mesmo com equipmentLocked */}
                      {/* Itens virtuais não podem ser equipados */}
                      {/* Itens incompatíveis não podem ser equipados */}
                      {!isVirtualItem &&
                        !isViolation &&
                        isShield &&
                        !handState.hasTwoHandedWeapon &&
                        !handState.hasOffHandItem &&
                        !isInSecondaryHand &&
                        !offhandDisabled && // Bloqueia se offhand estiver desabilitada
                        onEquipToSecondaryHand && (
                          <button
                            onClick={() =>
                              onEquipToSecondaryHand(
                                unitId,
                                (it as any)?.id || ""
                              )
                            }
                            className="px-2 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white text-xs"
                            title="Equipar na mão secundária"
                          >
                            Equipar na mão secundária
                          </button>
                        )}
                      {/* Para armas com specialRule "Par", mostra botão "Equipar (Par)" */}
                      {/* Itens virtuais não podem ser equipados */}
                      {/* Itens incompatíveis não podem ser equipados */}
                      {!isVirtualItem &&
                        !isViolation &&
                        isWeapon &&
                        hasPairRule &&
                        !isInPrimaryHand &&
                        !isInSecondaryHand &&
                        onEquipAsPair && (
                          <button
                            onClick={() =>
                              onEquipAsPair(unitId, (it as any)?.id || "")
                            }
                            className="px-2 py-1 rounded bg-indigo-600 hover:bg-indigo-700 text-white text-xs"
                            title="Equipar como Par (desequipa todas as armas)"
                          >
                            Equipar (Par)
                          </button>
                        )}
                      {/* Para armas normais ou desbalanceadas, mostra opção de mão primária apenas se não tiver nada na mão primária */}
                      {/* Com Garra Colossal, TODAS as armas (normais, leves, pistolas) podem ser equipadas na mão primária (ganham bônus) */}
                      {/* Itens virtuais não podem ser equipados */}
                      {/* Itens incompatíveis não podem ser equipados */}
                      {!isVirtualItem &&
                        !isViolation &&
                        isWeapon &&
                        !isTwoHandedWeapon &&
                        !isVersatileWeapon &&
                        !hasPairRule &&
                        !handState.hasMainHandItem &&
                        !isInPrimaryHand &&
                        !isInSecondaryHand &&
                        // Com Garra Colossal, sempre pode equipar na primária (a garra ocupa a secundária, mas não a primária)
                        // Sem Garra Colossal: todas as armas (normais, leves, pistolas) podem ir na primária
                        // Bloqueia apenas desbalanceadas se tem leve na secundária
                        (offhandDisabled
                          ? true // Com Garra Colossal, todas as armas podem ir na primária
                          : !(
                              handState.hasLightWeaponInOffHand &&
                              hasDesbalancedRule
                            )) && // Sem Garra Colossal, bloqueia desbalanceadas se tem leve na secundária
                        onEquipToPrimaryHand && (
                          <button
                            onClick={() =>
                              onEquipToPrimaryHand(
                                unitId,
                                (it as any)?.id || "",
                                false
                              )
                            }
                            className="px-2 py-1 rounded bg-green-600 hover:bg-green-700 text-white text-xs"
                            title={
                              offhandDisabled
                                ? "Equipar na mão primária (mão secundária indisponível)"
                                : "Equipar na mão primária"
                            }
                          >
                            {hasDesbalancedRule
                              ? "Equipar (Mão Primária)"
                              : "Mão primária"}
                          </button>
                        )}
                      {/* Mostra botão de mão secundária para ARMAS apenas se não tiver nada na mão secundária (escudos já têm botão acima) */}
                      {/* Bloqueado se tiver Garra Colossal (não pode usar mão secundária) */}
                      {/* Mercenários podem equipar mesmo com equipmentLocked */}
                      {/* Itens virtuais não podem ser equipados */}
                      {/* Itens incompatíveis não podem ser equipados */}
                      {!isVirtualItem &&
                        !isViolation &&
                        canEquipToSecondaryHand &&
                        isWeapon &&
                        !isTwoHandedWeapon &&
                        !isVersatileWeapon &&
                        !hasGiantClaw && // Bloqueia se tiver Garra Colossal (não pode usar mão secundária)
                        !handState.hasOffHandItem &&
                        !isInPrimaryHand &&
                        !isInSecondaryHand &&
                        onEquipToSecondaryHand && (
                          <button
                            onClick={() =>
                              onEquipToSecondaryHand(
                                unitId,
                                (it as any)?.id || ""
                              )
                            }
                            className="px-2 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white text-xs"
                            title="Equipar na mão secundária"
                          >
                            Mão secundária
                          </button>
                        )}
                      {/* Botão Desequipar: permite desequipar (remove flags) mesmo para mercenários */}
                      {/* Itens virtuais não podem ser desequipados */}
                      {!isVirtualItem &&
                        (isInPrimaryHand ||
                          isInSecondaryHand ||
                          isTwoHandedEquipped) &&
                        (onUnequipFromPrimaryHand ||
                          onUnequipFromSecondaryHand) && (
                          <button
                            onClick={() => {
                              if (
                                isTwoHandedEquipped &&
                                onUnequipFromPrimaryHand
                              ) {
                                // Desequipa de duas mãos também usa onUnequipFromPrimaryHand
                                onUnequipFromPrimaryHand(
                                  unitId,
                                  (it as any)?.id || ""
                                );
                              } else if (
                                isInPrimaryHand &&
                                onUnequipFromPrimaryHand
                              ) {
                                onUnequipFromPrimaryHand(
                                  unitId,
                                  (it as any)?.id || ""
                                );
                              } else if (
                                isInSecondaryHand &&
                                onUnequipFromSecondaryHand
                              ) {
                                onUnequipFromSecondaryHand(
                                  unitId,
                                  (it as any)?.id || ""
                                );
                              }
                            }}
                            className="px-2 py-1 rounded bg-yellow-600 hover:bg-yellow-700 text-white text-xs"
                            title="Desequipar (remove flags, mantém no inventário)"
                          >
                            Desequipar
                          </button>
                        )}
                      {/* Badge para armas equipadas como Par (mainHandWeapon E offHandWeapon) */}
                      {/* Itens virtuais não mostram badges de equipamento */}
                      {!isVirtualItem &&
                        isInPrimaryHand &&
                        isInSecondaryHand &&
                        !isTwoHandedEquipped && (
                          <span className="px-2 py-1 rounded bg-indigo-600 text-white text-xs">
                            Equipado (Par)
                          </span>
                        )}
                      {/* Badge para armas de duas mãos ou versáteis */}
                      {!isVirtualItem &&
                        (isInPrimaryHand || isTwoHandedEquipped) &&
                        !(isInPrimaryHand && isInSecondaryHand) && (
                          <span
                            className={`px-2 py-1 rounded text-white text-xs ${
                              isTwoHandedEquipped
                                ? "bg-purple-600"
                                : "bg-green-600"
                            }`}
                          >
                            {isTwoHandedEquipped
                              ? "Equipado (Duas Mãos)"
                              : isVersatileWeapon && isInPrimaryHand
                                ? "Equipado (Mão Principal)"
                                : "Mão primária"}
                          </span>
                        )}
                      {!isVirtualItem && isInSecondaryHand && !isWeapon && (
                        <span className="px-2 py-1 rounded bg-blue-600 text-white text-xs">
                          Mão secundária
                        </span>
                      )}
                      {/* Itens virtuais não podem ser equipados */}
                      {/* Itens incompatíveis não podem ser equipados */}
                      {!isVirtualItem &&
                        !isViolation &&
                        isArmor &&
                        !isHelmet &&
                        !isEquippedAsArmor &&
                        onEquipAsArmor && (
                          <button
                            onClick={() =>
                              onEquipAsArmor(unitId, (it as any)?.id || "")
                            }
                            className="px-2 py-1 rounded bg-purple-600 hover:bg-purple-700 text-white text-xs"
                            title="Equipar armadura"
                          >
                            Equipar armadura
                          </button>
                        )}
                      {/* Itens virtuais não podem ser desequipados */}
                      {!isVirtualItem &&
                        isEquippedAsArmor &&
                        onUnequipFromArmor && (
                          <button
                            onClick={() =>
                              onUnequipFromArmor(unitId, (it as any)?.id || "")
                            }
                            className="px-2 py-1 rounded bg-orange-600 hover:bg-orange-700 text-white text-xs"
                            title="Desequipar armadura (mantém no inventário)"
                          >
                            Desequipar armadura
                          </button>
                        )}
                      {/* Itens virtuais não mostram badge de armadura equipada */}
                      {!isVirtualItem &&
                        isEquippedAsArmor &&
                        !onUnequipFromArmor && (
                          <span className="px-2 py-1 rounded bg-green-600 text-white text-xs">
                            Armadura equipada
                          </span>
                        )}
                      {/* Itens virtuais não podem ser removidos */}
                      {!isVirtualItem &&
                        !equipmentLocked &&
                        !(it as any)?.freeDagger && (
                          <button
                            onClick={() =>
                              onUnequipToStashFlat(
                                unitId,
                                (it as any)?.id || ""
                              )
                            }
                            className="px-2 py-1 rounded bg-red-600 hover:bg-red-700 text-white text-xs"
                            title="Remover do inventário e mover para o cofre"
                          >
                            Remover
                          </button>
                        )}
                    </div>
                  </div>
                );
              });
            })()}
          </div>
        )}

        {!equipmentLocked && filteredStash.length > 0 && (
          <div className="pt-2">
            <select
              className="bg-[#1a1a1a] border border-gray-600 rounded px-2 py-1 text-white"
              onChange={e => {
                const itemId = e.target.value;
                if (!itemId) return;
                onEquipFromStashFlat(unitId, itemId);
                e.currentTarget.selectedIndex = 0;
              }}
              defaultValue=""
            >
              <option value="" disabled>
                Adicionar do Cofre…
              </option>
              {filteredStash.map((i, idx) => {
                const itemData = (i as any)?.data || i;
                // ID do item (sempre usa o id do próprio item, não o base_equipment_id)
                const itemId = itemData?.id || String(idx);

                // Novo formato: ids baseados
                const baseId = itemData?.base_equipment_id;
                const modId = itemData?.base_modifier_id;

                // Aguarda carregamento antes de resolver
                if (stashEquipmentBases.loading || stashModifierBases.loading) {
                  return (
                    <option key={`${itemId}-${idx}`} value={itemId}>
                      Carregando...
                    </option>
                  );
                }

                const baseResolved = baseId
                  ? (stashEquipmentBases.data as any)[baseId]
                  : undefined;
                const modResolved = modId
                  ? (stashModifierBases.data as any)[modId]
                  : undefined;

                // Nome
                const baseName = String(
                  i.name ||
                    itemData?.name ||
                    baseResolved?.name ||
                    baseId ||
                    "Item"
                );
                const modName = modResolved?.name || itemData?.modifier?.name;
                const displayName = modName
                  ? `${baseName} ${modName}${modName ? getModifierSuffix(modName) : ""}`
                  : baseName;

                // Custo: base purchaseCost * multiplier (se houver)
                // Prioriza dados resolvidos do Firestore
                const parseCost = (v: any): number => {
                  const s = v == null ? "" : String(v);
                  const m = s.match(/(\d+(?:\.\d+)?)/);
                  return m ? parseFloat(m[1]) : 0;
                };
                // Busca custo base nos dados resolvidos primeiro, depois fallback
                const baseCost = parseCost(
                  baseResolved?.purchaseCost ||
                    baseResolved?.cost ||
                    itemData?.purchaseCost ||
                    itemData?.cost ||
                    "0"
                );
                // Multiplicador do modificador resolvido primeiro (não fallback para itemData se modResolved existe)
                const multiplierRaw = modResolved?.multiplier;
                const multiplier =
                  multiplierRaw != null
                    ? typeof multiplierRaw === "string"
                      ? parseFloat(multiplierRaw)
                      : Number(multiplierRaw || 1)
                    : 1;
                // Multiplica se tiver modificador resolvido e multiplier válido
                const finalCost =
                  modResolved && Number.isFinite(multiplier) && multiplier > 0
                    ? Math.max(0, Math.round(baseCost * multiplier))
                    : baseCost;
                const costLabel = finalCost > 0 ? ` — ${finalCost} coroas` : "";

                return (
                  <option key={`${itemId}-${idx}`} value={itemId}>
                    {displayName}
                    {costLabel}
                  </option>
                );
              })}
            </select>
          </div>
        )}
      </div>
      {previewOpen && previewData && (
        <>
          {isNaturalAttack ? (
            <NaturalAttackModal
              isOpen={previewOpen}
              onClose={() => {
                setPreviewOpen(false);
                setIsNaturalAttack(false);
                setPreviewData(null);
              }}
              attackData={previewData}
            />
          ) : (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
              <div className="max-w-xl w-full relative">
                <button
                  type="button"
                  className="absolute -top-2 -right-2 bg-gray-800 text-white rounded-full w-9 h-9 border border-gray-600 hover:bg-gray-700"
                  onClick={() => {
                    setPreviewOpen(false);
                    setPreviewData(null);
                  }}
                  aria-label="Fechar"
                >
                  ✕
                </button>
                <EquipmentCard {...previewData} />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EquipmentManager;
