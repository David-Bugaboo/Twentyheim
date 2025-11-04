import React, { useState, useMemo } from "react";
import { toast } from "react-toastify";
import HeaderH1 from "./HeaderH1";
import MobileText from "./MobileText";
import { useJsonData } from "../hooks/useJsonData";
import { getStaticImport } from "../data/jsonFileMap";
import EquipmentCard from "./EquipmentCard";
import { useMultipleBaseData } from "../hooks/useBaseData";

export interface StashItem {
  id?: string; // id da instância no cofre (quando disponível)
  name: string;
  category: string;
  cost: string;
  data?: any; // objeto bruto do catálogo
  modifier?: { name: string; effect?: string };
  availability?: string[];
  exclusions?: string[];
  rarity?: number;
}

interface WarbandStashProps {
  stash: StashItem[];
  gold: string;
  onPurchase: (item: StashItem, isPurchase: boolean) => void;
  onSell: (index: number) => void;
  onUndo: (index: number) => void;
  onRemoveVaultItemById?: (id: string) => void;
  factionKey?: string; // slug da facção (ex.: "carnival-of-chaos")
  factionLabel?: string; // rótulo da facção (ex.: "Circo do Caos")
}

const EQUIP_TYPES: string[] = [
  "Arma Corpo a Corpo",
  "Arma a Distância",
  "Arma de Fogo",
  "Armadura",
  "Acessórios",
  "Remédios e Venenos",
];

// Função auxiliar para extrair número de custo
// custo não utilizado nesta versão

// Normaliza arrays de strings
const toStringArray = (v: any): string[] =>
  Array.isArray(v) ? v.map(x => String(x)) : v ? [String(v)] : [];

// Disponibilidade para compra (pode sempre ganhar)
const isPurchasableForFaction = (
  availability: string[] | undefined,
  exclusions: string[] | undefined,
  factionLabel?: string
): boolean => {
  const f = (factionLabel || "").toLowerCase();
  const av = (availability || []).map(s => s.toLowerCase());
  const ex = (exclusions || []).map(s => s.toLowerCase());
  if (ex.includes(f)) return false;
  if (av.length === 0) return true;
  if (av.includes(f)) return true;
  if (av.includes("todos") || av.includes("all")) return true;
  return false;
};

// Função para buscar itens de todos os catálogos globais (para comprar)
// Agora recebe os dados carregados via hooks como parâmetro
const getGlobalItemsByTypeForPurchase = (
  type: string,
  dataSources: {
    meleeDb?: any[];
    meleeRefactor?: any[];
    rangedDb?: any[];
    rangedRefactor?: any[];
    firearmsDb?: any[];
    armorDb?: any[];
    accessoriesDb?: any[];
    remediesPoisonsDb?: any[];
  },
  _factionKey?: string,
  _factionLabel?: string
): StashItem[] => {
  const {
    meleeDb = [],
    meleeRefactor = [],
    rangedDb = [],
    rangedRefactor = [],
    firearmsDb = [],
    armorDb = [],
    accessoriesDb = [],
    remediesPoisonsDb = [],
  } = dataSources;

  if (type === "Arma Corpo a Corpo") {
    const items1 = (meleeDb as any[])
      .filter(w => String(w.type || "").includes("Corpo"))
      .map(w => ({
        name: w.name,
        cost: w.cost || "-",
        category: "hand-to-hand",
        availability: toStringArray((w as any).availability),
        exclusions: toStringArray((w as any).exclusions),
        rarity: undefined,
      }));
    const items2 = (meleeRefactor as any[])
      .filter(w => String(w.type || "").includes("Corpo"))
      .map(w => ({
        name: w.name,
        cost: w.purchaseCost || w.sellCost || "-",
        category: "hand-to-hand",
        availability: toStringArray((w as any).availability),
        exclusions: toStringArray((w as any).exclusions),
        rarity: w.rarity,
      }));
    const allItems = [...items1, ...items2];
    const unique = Array.from(
      new Map(allItems.map(item => [item.name, item])).values()
    );
    return unique;
  }
  if (type === "Arma a Distância") {
    const items1 = (rangedDb as any[])
      .filter(w => String(w.type || "").includes("Distância"))
      .map(w => ({
        name: w.name,
        cost: w.cost || "-",
        category: "ranged",
        availability: toStringArray((w as any).availability),
        exclusions: toStringArray((w as any).exclusions),
        rarity: undefined,
      }));
    const items2 = (rangedRefactor as any[])
      .filter(w => String(w.type || "").includes("Distância"))
      .map(w => ({
        name: w.name,
        cost: w.purchaseCost || w.sellCost || "-",
        category: "ranged",
        availability: toStringArray((w as any).availability),
        exclusions: toStringArray((w as any).exclusions),
        rarity: w.rarity,
      }));
    const allItems = [...items1, ...items2];
    const unique = Array.from(
      new Map(allItems.map(item => [item.name, item])).values()
    );
    return unique;
  }
  if (type === "Arma de Fogo") {
    return ((firearmsDb || []) as any[]).map(w => ({
      name: w.name,
      cost: w.purchaseCost || w.sellCost || "-",
      category: "ranged",
      availability: toStringArray((w as any).availability),
      exclusions: toStringArray((w as any).exclusions),
      rarity: w.rarity,
    }));
  }
  if (type === "Armadura") {
    return ((armorDb || []) as any[]).map(w => ({
      name: w.name,
      cost: w.purchaseCost || w.sellCost || "-",
      category: "armor",
      availability: toStringArray((w as any).availability),
      exclusions: toStringArray((w as any).exclusions),
      rarity: w.rarity,
    }));
  }
  if (type === "Acessórios") {
    const items1 = ((accessoriesDb || []) as any[]).map(w => ({
      name: w.name,
      cost: w.purchaseCost || w.sellCost || "-",
      category: "miscellaneous",
      availability: toStringArray((w as any).availability),
      exclusions: toStringArray((w as any).exclusions),
      rarity: w.rarity,
    }));
    const allItems = [...items1];
    const unique = Array.from(
      new Map(allItems.map(item => [item.name, item])).values()
    );
    return unique;
  }
  if (type === "Remédios e Venenos") {
    const items = ((remediesPoisonsDb || []) as any[]).map(w => ({
      name: w.name,
      cost: w.purchaseCost || w.sellCost || "-",
      category: "miscellaneous",
      availability: toStringArray((w as any).availability),
      exclusions: toStringArray((w as any).exclusions),
      rarity: w.rarity,
    }));
    const unique = Array.from(
      new Map(items.map(item => [item.name, item])).values()
    );
    return unique;
  }
  return [];
};

const WarbandStash: React.FC<WarbandStashProps> = ({
  stash,
  gold: _gold,
  onPurchase,
  onSell,
  onUndo,
  onRemoveVaultItemById,
  factionKey,
  factionLabel,
}) => {
  // Carrega dados via hooks (Firestore -> IndexedDB -> Static)
  const { data: meleeDb } = useJsonData({
    fileId: "melee-weapons-old", // arquivo antigo, pode não estar no mapeamento
    staticImport: () => import("../database/items/melee-weapons.data.json"),
    enabled: false, // Desabilitado por enquanto - usa apenas refactor
  });
  const { data: rangedDb } = useJsonData({
    fileId: "ranged-weapons-old",
    staticImport: () => import("../database/items/ranged-weapons.data.json"),
    enabled: false, // Desabilitado por enquanto
  });
  const { data: meleeRefactor } = useJsonData({
    fileId: "armas-corpo-a-corpo",
    staticImport: () => getStaticImport("armas-corpo-a-corpo")(),
  });
  const { data: rangedRefactor } = useJsonData({
    fileId: "armas-a-distancia",
    staticImport: () => getStaticImport("armas-a-distancia")(),
  });
  const { data: firearmsDb } = useJsonData({
    fileId: "armas-de-fogo",
    staticImport: () => getStaticImport("armas-de-fogo")(),
  });
  const { data: armorDb } = useJsonData({
    fileId: "armaduras-e-escudos",
    staticImport: () => getStaticImport("armaduras-e-escudos")(),
  });
  const { data: accessoriesDb } = useJsonData({
    fileId: "acessorios",
    staticImport: () => getStaticImport("acessorios")(),
  });
  const { data: remediesPoisonsDb } = useJsonData({
    fileId: "remedios-e-venenos",
    staticImport: () => getStaticImport("remedios-e-venenos")(),
  });
  // Resolve bases para itens do cofre no novo formato (com base_equipment_id / base_modifier_id)
  const stashEquipmentIds = useMemo(
    () =>
      (stash || [])
        .map((item: any) => {
          const itemData = item?.data || item;
          return itemData?.base_equipment_id;
        })
        .filter(Boolean),
    [stash]
  );
  const stashModifierIds = useMemo(
    () =>
      (stash || [])
        .map((item: any) => {
          const itemData = item?.data || item;
          return itemData?.base_modifier_id;
        })
        .filter(Boolean),
    [stash]
  );

  const stashEquipmentBases = useMultipleBaseData(
    "base-equipment",
    stashEquipmentIds,
    stashEquipmentIds.length > 0
  );

  const { data: meleeMods } = useJsonData({
    fileId: "modificadores-de-arma",
    staticImport: () => getStaticImport("modificadores-de-arma")(),
  });
  const { data: rangedMods } = useJsonData({
    fileId: "modificadores-de-arma-a-distancia",
    staticImport: () => getStaticImport("modificadores-de-arma-a-distancia")(),
  });
  const { data: firearmsMods } = useJsonData({
    fileId: "modificadores-de-armas-de-fogo",
    staticImport: () => getStaticImport("modificadores-de-armas-de-fogo")(),
  });

  const [purchaseCategory, setPurchaseCategory] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [previewData, setPreviewData] = useState<any | null>(null);
  const [selectedModifier, setSelectedModifier] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [purchaseOpen, setPurchaseOpen] = useState<boolean>(true);

  // Também resolve modificador selecionado para compra (se houver) - DEPOIS de modifierOptions estar criado
  // Nota: selectedModifier é o key (nome do modificador), não o ID
  const selectedModifierId = useMemo(() => {
    if (!selectedModifier) return undefined;
    // Busca diretamente nos catálogos pelo nome do modificador selecionado (que é o key)
    const allMods: any[] = [
      ...(meleeMods || []),
      ...(rangedMods || []),
      ...(firearmsMods || []),
    ];
    const modFromCatalog = allMods.find(
      m =>
        String(m.name).toLowerCase() === String(selectedModifier).toLowerCase()
    );
    return modFromCatalog?.id;
  }, [selectedModifier, meleeMods, rangedMods, firearmsMods]);

  // Adiciona o modificador selecionado aos IDs para resolver
  const allModifierIds = useMemo(() => {
    const ids = [...stashModifierIds];
    if (selectedModifierId && !ids.includes(selectedModifierId)) {
      ids.push(selectedModifierId);
    }
    return ids;
  }, [stashModifierIds, selectedModifierId]);

  const stashModifierBases = useMultipleBaseData(
    "base-modifiers",
    allModifierIds,
    allModifierIds.length > 0
  );

  // Prepara dados para passar para a função
  const dataSources = {
    meleeDb: (meleeDb || []) as any[],
    meleeRefactor: (meleeRefactor || []) as any[],
    rangedDb: (rangedDb || []) as any[],
    rangedRefactor: (rangedRefactor || []) as any[],
    firearmsDb: (firearmsDb || []) as any[],
    armorDb: (armorDb || []) as any[],
    accessoriesDb: (accessoriesDb || []) as any[],
    remediesPoisonsDb: (remediesPoisonsDb || []) as any[],
  };

  // (sem orçamento)

  // Sem restrição, botão sempre habilitado quando há seleção

  const findItemInCatalogs = (name: string): any | null => {
    // Usa os dados carregados via hooks
    const allLists: any[][] = [
      (meleeDb || []) as any[],
      (meleeRefactor || []) as any[],
      (rangedDb || []) as any[],
      (rangedRefactor || []) as any[],
      (firearmsDb || []) as any[],
      (armorDb || []) as any[],
      (accessoriesDb || []) as any[],
      (remediesPoisonsDb || []) as any[],
    ];
    for (const list of allLists) {
      const found = list.find(
        x => String(x.name).toLowerCase() === name.toLowerCase()
      );
      if (found) return found;
    }
    return null;
  };

  const normalizeToEquipmentCard = (raw: any) => {
    if (!raw) return null;
    const toStr = (v: any) =>
      v === undefined || v === null ? null : String(v);
    const toArr = (v: any) => (Array.isArray(v) ? v : v ? [String(v)] : []);

    return {
      name: toStr(raw.name),
      type: toStr(raw.type || raw.category),
      damageModifier: toStr(
        raw.damageModifier || raw.damage || raw.modificadorDeDano
      ),
      maxRange: toStr(raw.maxRange || raw.range || raw.alcance),
      exclusive: toStr(raw.exclusive),
      specialProperties: Array.isArray(raw.specialProperties)
        ? raw.specialProperties
        : undefined,
      cost: toStr(raw.cost || raw.purchaseCost || raw.sellCost),
      spaces: toStr(
        raw.spaces || raw.equipmentSpaces || raw.espacos || raw.slots
      ),
      description: toArr(raw.description || raw.descricao),
      strength: toStr(
        raw.strength || raw.requisitoDeForca || raw.requisitosDeForca
      ),
      armorBonus: toStr(
        raw.armorBonus || raw.armourBonus || raw.armadura || raw.bonusArmadura
      ),
      movePenalty: toStr(raw.movePenalty || raw.penalidadeMovimento),
      requirements: toStr(raw.requirements || raw.requisitos),
      rarity: raw.rarity ?? null,
      availability: Array.isArray(raw.availability)
        ? raw.availability
        : undefined,
      effect: toStr(raw.effect || raw.efeito),
      specialRules: Array.isArray(raw.specialRules)
        ? raw.specialRules
        : undefined,
    };
  };

  // Modificadores por categoria (via JSONs)
  const modifierOptions = React.useMemo(() => {
    let src: any[] = [];
    if (purchaseCategory === "Arma Corpo a Corpo")
      src = (meleeMods || []) as any[];
    else if (purchaseCategory === "Arma a Distância")
      src = (rangedMods || []) as any[];
    else if (purchaseCategory === "Arma de Fogo")
      src = (firearmsMods || []) as any[];
    else src = [];
    const opts = src.map(m => ({
      key: String(m.name),
      label: String(m.name),
      effect: String(m.effect || ""),
      id: String(m.id || ""), // Inclui o ID do modificador
    }));
    return [{ key: "", label: "Sem modificador", id: "" }, ...opts];
  }, [purchaseCategory, meleeMods, rangedMods, firearmsMods]);

  const normalizeFromEquipmentObject = (eq: any) => {
    if (!eq) return null;
    const nameWithMod = (eq as any)?.modifier?.name
      ? `${String(eq.name)} ${(eq as any).modifier.name}`
      : String(eq.name);
    // Mapeia regras especiais do próprio item
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

    const baseSpecialRules = toSpecialRules((eq as any).specialRules);

    // Regra especial do modificador será adicionada apenas no modal (não aqui)

    // Calcula custo final: base * multiplier (se houver modificador)
    const baseCostStr = String(
      eq.cost || eq.purchaseCost || eq.sellCost || "0"
    );
    const baseCostMatch = baseCostStr.match(/(\d+(?:\.\d+)?)/);
    const baseCost = baseCostMatch ? parseFloat(baseCostMatch[1]) : 0;
    const multiplier = (eq as any)?.modifier?.multiplier ?? 1;
    const modifierAddend = (eq as any)?.modifierAddend ?? 0;
    const modifierFixedCost = (eq as any)?.modifierFixedCost;

    let finalCost = baseCost;
    if (modifierFixedCost != null) {
      finalCost = modifierFixedCost; // Substituição de custo
    } else {
      finalCost = baseCost * multiplier + modifierAddend; // Multiplicador + adição
    }

    const costDisplay =
      finalCost % 1 === 0
        ? `${Math.round(finalCost)} coroas`
        : `${finalCost} coroas`;

    const toNull = (v: any) => (v === undefined || v === null ? null : v);
    return {
      name: toNull(nameWithMod), // Nome já inclui modificador se houver
      cost: toNull(costDisplay), // Custo calculado: base * multiplier
      type: toNull((eq as any).type || (eq as any).category),
      damageModifier: toNull((eq as any).damageModifier),
      maxRange: toNull((eq as any).maxRange),
      exclusive: null,
      specialProperties: undefined,
      spaces: toNull((eq as any).slots || (eq as any).equipmentSpaces),
      description: undefined,
      strength: toNull((eq as any).strength),
      armorBonus: toNull((eq as any).armorBonus),
      movePenalty: toNull((eq as any).movePenalty),
      requirements: toNull((eq as any).requirements),
      rarity: (eq as any).rarity ?? null,
      availability: (eq as any).availability || undefined,
      effect: toNull((eq as any).effect),
      specialRules: baseSpecialRules, // Modificador será adicionado apenas no modal
    };
  };

  const openPreview = (itemName: string, equipmentObj?: any) => {
    let normalized = null as any;
    if (equipmentObj) {
      normalized = normalizeFromEquipmentObject(equipmentObj);
      // Adiciona regra do modificador no modal (se houver)
      const modifier = equipmentObj.modifier;
      if (modifier?.name && modifier?.effect && normalized) {
        normalized.specialRules = [
          ...(normalized.specialRules || []),
          {
            label: `Modificador — ${modifier.name}`,
            value: String(modifier.effect),
          },
        ];
      }
    } else {
      const data = findItemInCatalogs(itemName);
      normalized = normalizeToEquipmentCard(data);
    }
    if (normalized) {
      setPreviewData(normalized);
      setPreviewOpen(true);
    }
  };

  // Função para calcular custo final (mesma lógica do WarbandRosterPage)
  const calculateItemCost = (
    baseCost: string,
    modifier?: { name: string; effect?: string }
  ): number => {
    const baseCostMatch = String(baseCost || "0").match(/(\d+(?:\.\d+)?)/);
    const baseCostNum = baseCostMatch ? parseFloat(baseCostMatch[1]) : 0;

    if (!modifier || !modifier.name) return baseCostNum;

    // Busca modificador nos catálogos
    const modNameLc = String(modifier.name).toLowerCase();
    const allMods: any[] = [
      ...(meleeMods as any[]),
      ...(rangedMods as any[]),
      ...(firearmsMods as any[]),
    ];
    const mod =
      allMods.find(m => String(m.name).toLowerCase() === modNameLc) ||
      (modifier as any);

    const exprRaw = String(mod.purchaseCost || "");
    const expr = exprRaw.toLowerCase().replace(/\s+/g, "");
    let multiplier = 1;
    let addend = 0;
    let fixedCost: number | null = null;

    const mult = expr.match(/base\*(\d+(?:\.\d+)?)/);
    const add = expr.match(/base\+(\d+(?:\.\d+)?)/);
    if (mult) {
      multiplier = parseFloat(mult[1]);
    } else if (add) {
      addend = parseFloat(add[1]);
    } else if (!expr && typeof (mod as any).purchaseCost === "number") {
      fixedCost = Number((mod as any).purchaseCost);
    }

    if (fixedCost != null) {
      return fixedCost;
    } else {
      return baseCostNum * multiplier + addend;
    }
  };

  const handlePurchase = (isPurchase: boolean) => {
    if (!selectedItem || !purchaseCategory) return;
    const items = getGlobalItemsByTypeForPurchase(
      purchaseCategory,
      dataSources
    );
    const item = items.find(i => i.name === selectedItem);
    if (!item) return;

    // Verifica disponibilidade para compra
    const isAvailable = isPurchasableForFaction(
      item.availability,
      item.exclusions,
      factionLabel
    );

    if (isPurchase && !isAvailable) {
      toast.error(
        "Este item não está disponível para compra nesta facção. Use 'Loot' para adicionar sem comprar."
      );
      return;
    }

    const raw = findItemInCatalogs(item.name);
    const mod = modifierOptions.find(m => m.key === selectedModifier) as
      | { key: string; label: string; effect?: string }
      | undefined;

    // Resolve modificador para obter ID e calcular custo correto
    let baseModifierId: string | undefined = undefined;
    const parseCost = (v: any): number => {
      const s = v == null ? "" : String(v);
      const m = s.match(/(\d+(?:\.\d+)?)/);
      return m ? parseFloat(m[1]) : 0;
    };
    let calculatedCost: number = parseCost(item.cost || "0");

    if (mod && mod.key) {
      const modId = (mod as any).id;
      if (modId) {
        baseModifierId = modId;
        // Busca modificador resolvido do Firestore
        const modResolved = (stashModifierBases.data as any)[modId];
        if (modResolved?.multiplier) {
          const multiplier =
            typeof modResolved.multiplier === "string"
              ? parseFloat(modResolved.multiplier)
              : Number(modResolved.multiplier || 1);
          calculatedCost = Math.max(0, Math.round(calculatedCost * multiplier));
        } else {
          // Fallback: busca nos catálogos locais
          const allMods: any[] = [
            ...(meleeMods as any[]),
            ...(rangedMods as any[]),
            ...(firearmsMods as any[]),
          ];
          const modFromCatalog = allMods.find(m => m.id === modId);
          if (modFromCatalog?.multiplier) {
            const multiplier =
              typeof modFromCatalog.multiplier === "string"
                ? parseFloat(modFromCatalog.multiplier)
                : Number(modFromCatalog.multiplier || 1);
            calculatedCost = Math.max(
              0,
              Math.round(calculatedCost * multiplier)
            );
          } else {
            // Último fallback: calcula usando função antiga
            calculatedCost = calculateItemCost(item.cost || "0", {
              name: mod.key,
              effect: mod.effect,
            });
          }
        }
      } else {
        // Se não tem ID, busca por nome e usa função antiga
        calculatedCost = calculateItemCost(item.cost || "0", {
          name: mod.key,
          effect: mod.effect,
        });
      }
    }

    const itemData = {
      ...item,
      data: {
        ...raw,
        base_modifier_id: baseModifierId,
        modifier:
          mod && mod.key ? { name: mod.key, effect: mod.effect } : undefined,
      },
      cost: String(calculatedCost), // Usa custo já calculado
      modifier:
        mod && mod.key ? { name: mod.key, effect: mod.effect } : undefined,
    };

    // Adiciona a quantidade especificada
    for (let i = 0; i < quantity; i++) {
      onPurchase(itemData, isPurchase);
    }

    setSelectedItem("");
    setSelectedModifier("");
    setQuantity(1);
  };

  return (
    <div className="mt-6 border-t border-gray-700 pt-6">
      <HeaderH1>Cofre do Bando</HeaderH1>
      <MobileText className="text-gray-400 mb-4">
        Adicione equipamentos ao cofre do bando.
      </MobileText>

      {/* Compra de Equipamentos */}
      <div className="bg-[#1f1f1f] border border-gray-600 rounded p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold" style={{ color: "#8fbc8f" }}>
            Adicionar Equipamento
          </h3>
          <button
            type="button"
            onClick={() => setPurchaseOpen(o => !o)}
            className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-800 text-white text-xs"
            title={purchaseOpen ? "Esconder tabela de compra" : "Mostrar tabela de compra"}
          >
            {purchaseOpen ? "Esconder" : "Mostrar"}
          </button>
        </div>
        {purchaseOpen && (
          <div className="flex flex-col md:flex-row gap-3">
          <select
            className="bg-[#161616] border border-gray-600 rounded px-3 py-2 text-white flex-1"
            value={purchaseCategory}
            onChange={e => {
              setPurchaseCategory(e.target.value);
              setSelectedItem("");
            }}
          >
            <option value="">Selecionar tipo...</option>
            {EQUIP_TYPES.map(type => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <select
            className="bg-[#161616] border border-gray-600 rounded px-3 py-2 text-white flex-1"
            value={selectedItem}
            onChange={e => setSelectedItem(e.target.value)}
            disabled={!purchaseCategory}
          >
            <option value="">Selecionar item...</option>
            {purchaseCategory &&
              getGlobalItemsByTypeForPurchase(
                purchaseCategory,
                dataSources,
                factionKey,
                factionLabel
              ).map((item: any) => {
                const allowed = isPurchasableForFaction(
                  item.availability,
                  item.exclusions,
                  factionLabel
                );
                const rarityDisplay = item.rarity
                  ? ` (Rrd: ${item.rarity === 1 ? "Comum" : item.rarity})`
                  : "";
                return (
                  <option
                    key={item.name}
                    value={item.name}
                    style={{ color: allowed ? undefined : "#ef4444" }}
                  >
                    {item.name} — {item.cost}
                    {rarityDisplay}
                    {!allowed ? " (não disponível)" : ""}
                  </option>
                );
              })}
          </select>
          {/* Modificador (apenas para armas e armaduras de fogo/ranged/melee) */}
          <select
            className="bg-[#161616] border border-gray-600 rounded px-3 py-2 text-white flex-1"
            value={selectedModifier}
            onChange={e => setSelectedModifier(e.target.value)}
            disabled={
              !purchaseCategory ||
              !(
                purchaseCategory === "Arma Corpo a Corpo" ||
                purchaseCategory === "Arma a Distância" ||
                purchaseCategory === "Arma de Fogo"
              )
            }
            title="Modificador do equipamento"
          >
            {modifierOptions.map(opt => (
              <option key={opt.key} value={opt.key}>
                {opt.label}
              </option>
            ))}
          </select>
          {/* Campo de Quantidade */}
          <input
            type="number"
            min="1"
            max="99"
            value={quantity}
            onChange={e =>
              setQuantity(
                Math.max(1, Math.min(99, parseInt(e.target.value) || 1))
              )
            }
            className="bg-[#161616] border border-gray-600 rounded px-3 py-2 text-white w-24 text-center"
            placeholder="Qtd"
            title="Quantidade a comprar/lootear"
          />
          {/* Botões de Comprar e Loot */}
          {(() => {
            const items = purchaseCategory
              ? getGlobalItemsByTypeForPurchase(
                  purchaseCategory,
                  dataSources,
                  factionKey,
                  factionLabel
                )
              : [];
            const selectedItemObj = items.find(i => i.name === selectedItem);
            const isAvailable =
              selectedItemObj &&
              isPurchasableForFaction(
                selectedItemObj.availability,
                selectedItemObj.exclusions,
                factionLabel
              );
            const mod =
              selectedModifier &&
              modifierOptions.find(m => m.key === selectedModifier);

            // Resolve modificador pelo ID (já está resolvido no stashModifierBases)
            let modResolved: any = undefined;
            const modId = mod && (mod as any).id ? (mod as any).id : undefined;
            if (modId) {
              // Busca modificador resolvido do Firestore pelo ID
              modResolved = (stashModifierBases.data as any)[modId];
            }

            // Calcula custo: prioriza modificador resolvido do Firestore
            const parseCost = (v: any): number => {
              const s = v == null ? "" : String(v);
              const m = s.match(/(\d+(?:\.\d+)?)/);
              return m ? parseFloat(m[1]) : 0;
            };
            const baseCost = parseCost(selectedItemObj?.cost || "0");

            let unitCost = baseCost;
            if (modResolved?.multiplier) {
              // Usa multiplicador do modificador resolvido do Firestore
              const multiplier =
                typeof modResolved.multiplier === "string"
                  ? parseFloat(modResolved.multiplier)
                  : Number(modResolved.multiplier || 1);
              unitCost = Math.max(0, Math.round(baseCost * multiplier));
            } else if (mod && mod.key) {
              // Fallback: busca nos catálogos locais primeiro
              const allMods: any[] = [
                ...(meleeMods || []),
                ...(rangedMods || []),
                ...(firearmsMods || []),
              ];
              const modFromCatalog = allMods.find(
                m =>
                  String(m.name).toLowerCase() === String(mod.key).toLowerCase()
              );
              if (modFromCatalog?.multiplier) {
                const multiplier =
                  typeof modFromCatalog.multiplier === "string"
                    ? parseFloat(modFromCatalog.multiplier)
                    : Number(modFromCatalog.multiplier || 1);
                unitCost = Math.max(0, Math.round(baseCost * multiplier));
              } else {
                // Último fallback: usa função antiga para calcular
                unitCost = calculateItemCost(selectedItemObj?.cost || "0", {
                  name: mod.key,
                  effect: (mod as any).effect || "",
                });
              }
            }
            const totalCost = unitCost * (quantity || 1);
            const currentGoldMatch = String(_gold || "0").match(/(\d+)/);
            const currentGold = currentGoldMatch
              ? parseInt(currentGoldMatch[1], 10)
              : 0;
            const canAfford = currentGold >= totalCost;

            return (
              <>
                <button
                  className="px-3 py-2 rounded bg-green-600 hover:bg-green-700 text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={
                    !selectedItem ||
                    !purchaseCategory ||
                    !isAvailable ||
                    !canAfford
                  }
                  onClick={() => handlePurchase(true)}
                  title={
                    !isAvailable
                      ? "Item não disponível para compra nesta facção"
                      : !canAfford
                        ? `Você não tem coroas suficientes (Necessário: ${totalCost})`
                        : quantity > 1
                          ? `Comprar ${quantity}x por ${totalCost} coroas (${unitCost} cada)`
                          : `Comprar por ${totalCost} coroas`
                  }
                >
                  Comprar ({totalCost} coroas)
                  {quantity > 1 && ` - ${quantity}x`}
                </button>
                <button
                  className="px-3 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!selectedItem || !purchaseCategory}
                  onClick={() => handlePurchase(false)}
                  title={
                    quantity > 1
                      ? `Adicionar ${quantity}x ao cofre sem custo (loot)`
                      : "Adicionar ao cofre sem custo (loot)"
                  }
                >
                  Loot
                  {quantity > 1 && ` (${quantity}x)`}
                </button>
              </>
            );
          })()}
          </div>
        )}
      </div>

      {/* Itens no Cofre */}
      <div className="bg-[#1f1f1f] border border-gray-600 rounded p-4">
        <h3 className="text-lg font-bold mb-3" style={{ color: "#8fbc8f" }}>
          Itens no Cofre ({stash.length})
        </h3>
        {stash.length > 0 ? (
          <div className="space-y-2">
            {stash.map((item, index) => {
              const itemData = (item as any)?.data || item;

              // Novo formato: resolve por IDs
              const baseId = itemData?.base_equipment_id;
              const modId = itemData?.base_modifier_id;
              const baseResolved = baseId
                ? (stashEquipmentBases.data as any)[baseId]
                : undefined;
              const modResolved = modId
                ? (stashModifierBases.data as any)[modId]
                : undefined;

              // Monta nome completo: base + modificador (se houver)
              const baseName =
                item.name ||
                String(itemData?.name || baseResolved?.name || baseId || "");
              const modifier = modResolved || itemData?.modifier;
              const modName = modifier?.name;
              const displayName = modName ? `${baseName} ${modName}` : baseName;

              // Calcula custo final: base * multiplier (se houver modificador resolvido)
              // Prioriza dados resolvidos do Firestore
              const parseCost = (v: any): number => {
                const s = v == null ? "" : String(v);
                const m = s.match(/(\d+(?:\.\d+)?)/);
                return m ? parseFloat(m[1]) : 0;
              };

              const baseCost = parseCost(
                baseResolved?.purchaseCost ||
                  baseResolved?.cost ||
                  item.cost ||
                  itemData?.purchaseCost ||
                  itemData?.sellCost ||
                  "0"
              );

              // Multiplicador do modificador resolvido primeiro
              const multiplierRaw = modResolved?.multiplier;
              const multiplier =
                multiplierRaw != null
                  ? typeof multiplierRaw === "string"
                    ? parseFloat(multiplierRaw)
                    : Number(multiplierRaw || 1)
                  : (itemData?.modifier?.multiplier ?? 1);
              const modifierAddend = itemData?.modifierAddend ?? 0;
              const modifierFixedCost = itemData?.modifierFixedCost;

              let finalCost = baseCost;
              if (modifierFixedCost != null) {
                finalCost = modifierFixedCost; // Substituição de custo
              } else if (
                modResolved &&
                Number.isFinite(multiplier) &&
                multiplier > 0
              ) {
                // Só multiplica se tiver modificador resolvido válido
                finalCost =
                  Math.max(0, Math.round(baseCost * multiplier)) +
                  modifierAddend;
              } else {
                finalCost = baseCost * multiplier + modifierAddend; // Fallback para formato antigo
              }

              const costDisplay =
                finalCost % 1 === 0
                  ? `${Math.round(finalCost)} coroas`
                  : `${finalCost} coroas`;

              return (
                <div
                  key={item.id || index}
                  className="flex justify-between items-center bg-[#161616] border border-gray-700 rounded p-2"
                >
                  <div className="flex-1">
                    <button
                      type="button"
                      onClick={() => openPreview(item.name, itemData)}
                      className="text-white font-medium hover:text-green-300"
                    >
                      {displayName}
                    </button>
                    <span className="text-gray-400 text-sm ml-2">
                      — {costDisplay} ({item.category})
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="px-2 py-1 rounded bg-yellow-600 hover:bg-yellow-700 text-white text-xs"
                      onClick={() => onSell(index)}
                      title={`Vender por ${Math.floor(finalCost / 2)} coroas`}
                    >
                      Vender
                    </button>
                    <button
                      type="button"
                      className="px-2 py-1 rounded bg-red-700 hover:bg-red-800 text-white text-xs"
                      onClick={() => onUndo(index)}
                      title="Desfazer (remover sem vender)"
                    >
                      Desfazer
                    </button>
                    {item.id && onRemoveVaultItemById ? (
                      <button
                        type="button"
                        className="px-2 py-1 rounded bg-gray-700 hover:bg-gray-800 text-white text-xs"
                        onClick={() => onRemoveVaultItemById(item.id!)}
                        title="Remover definitivamente do cofre"
                      >
                        Remover
                      </button>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-400 italic">O cofre está vazio.</p>
        )}
      </div>
      {previewOpen && previewData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="max-w-xl w-full relative">
            <button
              type="button"
              className="absolute -top-2 -right-2 bg-gray-800 text-white rounded-full w-9 h-9 border border-gray-600 hover:bg-gray-700"
              onClick={() => setPreviewOpen(false)}
              aria-label="Fechar"
            >
              ✕
            </button>
            <EquipmentCard {...previewData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default WarbandStash;
