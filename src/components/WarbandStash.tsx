import React, { useState } from "react";
import { toast } from "react-toastify";
import HeaderH1 from "./HeaderH1";
import MobileText from "./MobileText";
import meleeDb from "../database/items/melee-weapons.data.json";
import rangedDb from "../database/items/ranged-weapons.data.json";
import firearmsDb from "../pages/weapons and equipments/data/armas-de-fogo-refactor.json";
import meleeRefactor from "../pages/weapons and equipments/data/armas-corpo-a-corpo-refactor.json";
import rangedRefactor from "../pages/weapons and equipments/data/armas-a-distancia-refactor.json";
import armorDb from "../pages/weapons and equipments/data/armaduras-e-escudos-refactor.json";
import accessoriesDb from "../pages/weapons and equipments/data/acessorios-refactor.json";
import remediesPoisonsDb from "../pages/weapons and equipments/data/remedios-e-venenos.json";
import rangedMods from "../pages/weapons and equipments/data/modificadores-de-arma-a-distancia-refactor.json";
import meleeMods from "../pages/weapons and equipments/data/modificadores-de-arma-refactor.json";
import firearmsMods from "../pages/weapons and equipments/data/modificadores-de-armas-de-fogo-refactor.json";
import EquipmentCard from "./EquipmentCard";

export interface StashItem {
  id?: string; // id da instância no cofre (quando disponível)
  name: string;
  category: string;
  cost: string;
  data?: any; // objeto bruto do catálogo
  modifier?: { name: string; effect?: string };
  availability?: string[];
  exclusions?: string[];
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
  Array.isArray(v) ? v.map((x) => String(x)) : v ? [String(v)] : [];

// Disponibilidade para compra (pode sempre ganhar)
const isPurchasableForFaction = (
  availability: string[] | undefined,
  exclusions: string[] | undefined,
  factionLabel?: string
): boolean => {
  const f = (factionLabel || "").toLowerCase();
  const av = (availability || []).map((s) => s.toLowerCase());
  const ex = (exclusions || []).map((s) => s.toLowerCase());
  if (ex.includes(f)) return false;
  if (av.length === 0) return true;
  if (av.includes(f)) return true;
  if (av.includes("todos") || av.includes("all")) return true;
  return false;
};

// Função para buscar itens de todos os catálogos globais (para comprar)
const getGlobalItemsByTypeForPurchase = (
  type: string,
  _factionKey?: string,
  _factionLabel?: string
): StashItem[] => {
  if (type === "Arma Corpo a Corpo") {
    const items1 = (meleeDb as any[])
      .filter((w) => String(w.type || "").includes("Corpo"))
      .map((w) => ({
        name: w.name,
        cost: w.cost || "-",
        category: "hand-to-hand",
        availability: toStringArray((w as any).availability),
        exclusions: toStringArray((w as any).exclusions),
      }));
    const items2 = (meleeRefactor as any[])
      .filter((w) => String(w.type || "").includes("Corpo"))
      .map((w) => ({
        name: w.name,
        cost: w.purchaseCost || w.sellCost || "-",
        category: "hand-to-hand",
        availability: toStringArray((w as any).availability),
        exclusions: toStringArray((w as any).exclusions),
      }));
    const allItems = [...items1, ...items2];
    const unique = Array.from(
      new Map(allItems.map((item) => [item.name, item])).values()
    );
    return unique;
  }
  if (type === "Arma a Distância") {
    const items1 = (rangedDb as any[])
      .filter((w) => String(w.type || "").includes("Distância"))
      .map((w) => ({
        name: w.name,
        cost: w.cost || "-",
        category: "ranged",
        availability: toStringArray((w as any).availability),
        exclusions: toStringArray((w as any).exclusions),
      }));
    const items2 = (rangedRefactor as any[])
      .filter((w) => String(w.type || "").includes("Distância"))
      .map((w) => ({
        name: w.name,
        cost: w.purchaseCost || w.sellCost || "-",
        category: "ranged",
        availability: toStringArray((w as any).availability),
        exclusions: toStringArray((w as any).exclusions),
      }));
    const allItems = [...items1, ...items2];
    const unique = Array.from(
      new Map(allItems.map((item) => [item.name, item])).values()
    );
    return unique;
  }
  if (type === "Arma de Fogo") {
    return (firearmsDb as any[]).map((w) => ({
      name: w.name,
      cost: w.purchaseCost || w.sellCost || "-",
      category: "ranged",
      availability: toStringArray((w as any).availability),
      exclusions: toStringArray((w as any).exclusions),
    }));
  }
  if (type === "Armadura") {
    return (armorDb as any[]).map((w) => ({
      name: w.name,
      cost: w.purchaseCost || w.sellCost || "-",
      category: "armor",
      availability: toStringArray((w as any).availability),
      exclusions: toStringArray((w as any).exclusions),
    }));
  }
  if (type === "Acessórios") {
    const items1 = (accessoriesDb as any[]).map((w) => ({
      name: w.name,
      cost: w.purchaseCost || w.sellCost || "-",
      category: "miscellaneous",
      availability: toStringArray((w as any).availability),
      exclusions: toStringArray((w as any).exclusions),
    }));
    const allItems = [...items1];
    const unique = Array.from(
      new Map(allItems.map((item) => [item.name, item])).values()
    );
    return unique;
  }
  if (type === "Remédios e Venenos") {
    const items = (remediesPoisonsDb as any[]).map((w) => ({
      name: w.name,
      cost: w.purchaseCost || w.sellCost || "-",
      category: "miscellaneous",
      availability: toStringArray((w as any).availability),
      exclusions: toStringArray((w as any).exclusions),
    }));
    const unique = Array.from(
      new Map(items.map((item) => [item.name, item])).values()
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
  const [purchaseCategory, setPurchaseCategory] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [previewData, setPreviewData] = useState<any | null>(null);
  const [selectedModifier, setSelectedModifier] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  // (sem orçamento)

  // Sem restrição, botão sempre habilitado quando há seleção

  const findItemInCatalogs = (name: string): any | null => {
    const allLists: any[][] = [
      meleeDb as any[],
      meleeRefactor as any[],
      rangedDb as any[],
      rangedRefactor as any[],
      firearmsDb as any[],
      armorDb as any[],
      accessoriesDb as any[],
      remediesPoisonsDb as any[],
    ];
    for (const list of allLists) {
      const found = list.find(
        (x) => String(x.name).toLowerCase() === name.toLowerCase()
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
    if (purchaseCategory === "Arma Corpo a Corpo") src = meleeMods as any[];
    else if (purchaseCategory === "Arma a Distância") src = rangedMods as any[];
    else if (purchaseCategory === "Arma de Fogo") src = firearmsMods as any[];
    else src = [];
    const opts = src.map((m) => ({
      key: String(m.name),
      label: String(m.name),
      effect: String(m.effect || ""),
    }));
    return [{ key: "", label: "Sem modificador" }, ...opts];
  }, [purchaseCategory]);

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
      return out.filter((r) => r.value);
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
      allMods.find((m) => String(m.name).toLowerCase() === modNameLc) ||
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
    const items = getGlobalItemsByTypeForPurchase(purchaseCategory);
    const item = items.find((i) => i.name === selectedItem);
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
    const mod = modifierOptions.find((m) => m.key === selectedModifier) as
      | { key: string; label: string; effect?: string }
      | undefined;

    const itemData = {
      ...item,
      data: raw || undefined,
      cost: item.cost || "-",
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
        <h3 className="text-lg font-bold mb-3" style={{ color: "#8fbc8f" }}>
          Adicionar Equipamento
        </h3>
        <div className="flex flex-col md:flex-row gap-3">
          <select
            className="bg-[#161616] border border-gray-600 rounded px-3 py-2 text-white flex-1"
            value={purchaseCategory}
            onChange={(e) => {
              setPurchaseCategory(e.target.value);
              setSelectedItem("");
            }}
          >
            <option value="">Selecionar tipo...</option>
            {EQUIP_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <select
            className="bg-[#161616] border border-gray-600 rounded px-3 py-2 text-white flex-1"
            value={selectedItem}
            onChange={(e) => setSelectedItem(e.target.value)}
            disabled={!purchaseCategory}
          >
            <option value="">Selecionar item...</option>
            {purchaseCategory &&
              getGlobalItemsByTypeForPurchase(
                purchaseCategory,
                factionKey,
                factionLabel
              ).map((item: any) => {
                const allowed = isPurchasableForFaction(
                  item.availability,
                  item.exclusions,
                  factionLabel
                );
                return (
                  <option
                    key={item.name}
                    value={item.name}
                    style={{ color: allowed ? undefined : "#ef4444" }}
                  >
                    {item.name} — {item.cost}
                    {!allowed ? " (não disponível)" : ""}
                  </option>
                );
              })}
          </select>
          {/* Modificador (apenas para armas e armaduras de fogo/ranged/melee) */}
          <select
            className="bg-[#161616] border border-gray-600 rounded px-3 py-2 text-white flex-1"
            value={selectedModifier}
            onChange={(e) => setSelectedModifier(e.target.value)}
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
            {modifierOptions.map((opt) => (
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
            onChange={(e) =>
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
                  factionKey,
                  factionLabel
                )
              : [];
            const selectedItemObj = items.find((i) => i.name === selectedItem);
            const isAvailable =
              selectedItemObj &&
              isPurchasableForFaction(
                selectedItemObj.availability,
                selectedItemObj.exclusions,
                factionLabel
              );
            const mod =
              selectedModifier &&
              modifierOptions.find((m) => m.key === selectedModifier);
            const unitCost = selectedItemObj
              ? calculateItemCost(
                  selectedItemObj.cost || "0",
                  mod && mod.key
                    ? { name: mod.key, effect: (mod as any).effect || "" }
                    : undefined
                )
              : 0;
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
      </div>

      {/* Itens no Cofre */}
      <div className="bg-[#1f1f1f] border border-gray-600 rounded p-4">
        <h3 className="text-lg font-bold mb-3" style={{ color: "#8fbc8f" }}>
          Itens no Cofre ({stash.length})
        </h3>
        {stash.length > 0 ? (
          <div className="space-y-2">
            {stash.map((item, index) => {
              // Monta nome completo: base + modificador (se houver)
              const itemData = (item as any)?.data;
              const baseName = item.name || String(itemData?.name || "");
              const modifier = itemData?.modifier;
              const displayName = modifier?.name
                ? `${baseName} ${modifier.name}`
                : baseName;

              // Calcula custo final: base * multiplier (se houver modificador)
              const baseCostStr = String(
                item.cost || itemData?.purchaseCost || itemData?.sellCost || "0"
              );
              const baseCostMatch = baseCostStr.match(/(\d+(?:\.\d+)?)/);
              const baseCost = baseCostMatch ? parseFloat(baseCostMatch[1]) : 0;
              const multiplier = modifier?.multiplier ?? 1;
              const modifierAddend = itemData?.modifierAddend ?? 0;
              const modifierFixedCost = itemData?.modifierFixedCost;

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
