import React, { useMemo, useState } from "react";
import EquipmentCard from "./EquipmentCard";
import meleeDb from "../database/items/melee-weapons.data.json";
import rangedDb from "../database/items/ranged-weapons.data.json";
import firearmsDb from "../pages/weapons and equipments/data/armas-de-fogo-refactor.json";
import meleeRefactor from "../pages/weapons and equipments/data/armas-corpo-a-corpo-refactor.json";
import rangedRefactor from "../pages/weapons and equipments/data/armas-a-distancia-refactor.json";
import armorDb from "../pages/weapons and equipments/data/armaduras-e-escudos-refactor.json";

type ItemObj = { name: string; category: string; cost?: string; data?: any };

export interface EquipmentManagerProps {
  unitId: string;
  unitName: string;
  equipment?: Record<string, { name: string }[]> | undefined;
  abilities?: { name: string }[] | undefined;
  equippedItems?: ItemObj[] | undefined; // Agora usa figure.equiped diretamente (array de Equipment)
  stashItems: ItemObj[] | undefined;
  onEquipFromStashFlat: (unitId: string, itemName: string) => void;
  onUnequipToStashFlat: (unitId: string, itemName: string) => void;
  maxSlots?: number;
  availableEquipmentNames?: string[]; // figure.avaiableEquipment para validação visual
  equipmentLocked?: boolean;
  figureSkills?: Array<{ name: string; description?: string; id?: string }>; // figure.skills para verificar skills especiais
}

const EquipmentManager: React.FC<EquipmentManagerProps> = ({
  unitId,
  unitName,
  // equipment,
  // abilities,
  equippedItems, // Agora usa figure.equiped diretamente
  stashItems,
  onEquipFromStashFlat,
  onUnequipToStashFlat,
  maxSlots,
  availableEquipmentNames,
  equipmentLocked,
  figureSkills,
}) => {
  // Regras antigas de permissão foram removidas: qualquer item do cofre pode ser equipado

  const usedSlots = useMemo(() => {
    const list = equippedItems || [];
    let total = 0;
    let numDaggers = 0;
    for (const it of list) {
      const n = String(it?.name || "").toLowerCase();
      if (n.includes("adaga") || n.includes("dagger")) numDaggers += 1;
      // it já é o objeto Equipment completo, não precisa de .data
      const raw = (it as any)?.slots ?? (it as any)?.equipmentSpaces;
      let v: number | undefined;
      if (typeof raw === "number") v = raw;
      else if (typeof raw === "string") {
        const p = parseInt(raw, 10);
        if (Number.isFinite(p)) v = p;
      }
      total += v ?? 1;
    }
    if (numDaggers > 0) total = Math.max(0, total - 1);
    return total;
  }, [equippedItems]);

  const filteredStash = stashItems || [];

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewData, setPreviewData] = useState<any | null>(null);

  const normalizeToEquipmentCard = (raw: any) => {
    if (!raw) return null;
    const toStr = (v: any) =>
      v === undefined || v === null ? null : String(v);
    const toArr = (v: any) => (Array.isArray(v) ? v : v ? [String(v)] : []);

    // NOVA ARQUITETURA: monta nome completo a partir de name + modifier.name
    const baseName = String(raw.name || "");
    const modifier = raw.modifier;
    const nameWithMod = modifier?.name
      ? `${baseName} ${modifier.name}`
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
      return out.filter((r) => r.value);
    };

    const base = {
      name: toStr(nameWithMod),
      type: toStr(raw.type || raw.category),
      damageModifier: toStr(
        raw.damageModifier || raw.damage || raw.modificadorDeDano
      ),
      maxRange: toStr(raw.maxRange || raw.range || raw.alcance),
      exclusive: toStr(raw.exclusive),
      specialProperties: Array.isArray(raw.specialProperties)
        ? raw.specialProperties
        : undefined,
      // Calcula custo final: base * multiplier (se houver modificador)
      cost: (() => {
        const baseCostStr = String(
          raw.cost || raw.purchaseCost || raw.sellCost || "0"
        );
        const baseCostMatch = baseCostStr.match(/(\d+(?:\.\d+)?)/);
        const baseCost = baseCostMatch ? parseFloat(baseCostMatch[1]) : 0;
        const multiplier = raw.modifier?.multiplier ?? 1;
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
      specialRules: (() => {
        // Regras especiais do item base
        const baseRules = toSpecialRules((raw as any).specialRules);

        // Adiciona regra do modificador (se houver) apenas no modal
        const modifier = raw.modifier;
        if (modifier?.name && modifier?.effect) {
          baseRules.push({
            label: `Modificador — ${modifier.name}`,
            value: String(modifier.effect),
          });
        }

        return baseRules;
      })(),
    };
    return base;
  };

  const openPreview = (item: any) => {
    // item já é o objeto Equipment completo (de figure.equiped)
    // Não precisa buscar no catálogo - usa direto
    const normalized = normalizeToEquipmentCard(item);
    if (normalized) {
      setPreviewData(normalized);
      setPreviewOpen(true);
    }
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
            {(equippedItems || []).map((it, idx) => {
              // it é o objeto Equipment completo de figure.equiped
              const cat = String(
                (it as any)?.type || (it as any)?.category || ""
              ).toLowerCase();
              const isWeaponOrArmor =
                cat === "hand-to-hand" ||
                cat === "ranged" ||
                cat === "armor" ||
                cat.includes("arma") ||
                cat.includes("armadura");

              // NOVA ARQUITETURA: objeto base intacto + modifier separado
              // it já é o objeto Equipment completo de figure.equiped
              // Monta nome completo na renderização: name + modifier.name (se houver)
              const baseName = String((it as any)?.name || "").trim();
              const modifier = (it as any)?.modifier;
              let displayLabel = modifier?.name
                ? `${baseName} ${modifier.name}`
                : baseName;

              // LÓGICA SIMPLES: verifica se item.name está em availableEquipmentNames
              let isViolation = false;

              // Só valida se NÃO estiver locked E for arma/armadura
              if (!equipmentLocked && isWeaponOrArmor) {
                // Verifica skills especiais que permitem pular a validação
                const skills = figureSkills || [];
                const hasMestreArsenal = skills.some(
                  (s: any) => s.name === "Mestre do Arsenal"
                );
                const hasMestreAtirador = skills.some(
                  (s: any) => s.name === "Mestre Atirador"
                );

                // Verifica se pode pular a validação por causa das skills
                let skipValidation = false;
                // Mestre do Arsenal: permite qualquer arma corpo a corpo
                if (
                  (cat === "hand-to-hand" ||
                    cat.includes("corpo a corpo") ||
                    cat.includes("corpo-a-corpo")) &&
                  hasMestreArsenal
                ) {
                  skipValidation = true;
                }
                // Mestre Atirador: permite qualquer arma a distância ou de fogo
                else if (
                  (cat === "ranged" ||
                    cat.includes("distância") ||
                    cat.includes("distancia") ||
                    cat.includes("fogo") ||
                    cat === "arma de fogo") &&
                  hasMestreAtirador
                ) {
                  skipValidation = true;
                }

                // Se não puder pular, valida normalmente
                if (!skipValidation) {
                  const availableItems = availableEquipmentNames || [];
                  // Verificação direta: o nome do item está no array?
                  if (!availableItems.includes(baseName)) {
                    isViolation = true;
                    displayLabel = `${displayLabel} (incompatível)`;
                  }
                }
              }

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
                  </button>
                  {!equipmentLocked && (
                    <button
                      onClick={() => onUnequipToStashFlat(unitId, baseName)}
                      className="px-2 py-1 rounded bg-red-600 hover:bg-red-700 text-white text-xs"
                    >
                      Remover
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {!equipmentLocked && filteredStash.length > 0 && (
          <div className="pt-2">
            <select
              className="bg-[#1a1a1a] border border-gray-600 rounded px-2 py-1 text-white"
              onChange={(e) => {
                const v = e.target.value;
                if (!v) return;
                onEquipFromStashFlat(unitId, v);
                e.currentTarget.selectedIndex = 0;
              }}
              defaultValue=""
            >
              <option value="" disabled>
                Adicionar do Cofre…
              </option>
              {filteredStash.map((i, idx) => {
                // Monta nome completo: base + modificador (se houver)
                const itemData = (i as any)?.data;
                const baseName = i.name || String(itemData?.name || "");
                const modifier = itemData?.modifier;
                const displayName = modifier?.name
                  ? `${baseName} ${modifier.name}`
                  : baseName;

                return (
                  <option
                    key={`${i.name}-${idx}-${itemData?.id || idx}`}
                    value={i.name}
                  >
                    {displayName}
                  </option>
                );
              })}
            </select>
          </div>
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

export default EquipmentManager;
