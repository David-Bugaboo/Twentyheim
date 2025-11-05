/**
 * Hook para gerenciar equipamentos (equipar, desequipar, comprar, vender)
 */

import { toast } from "react-toastify";
import {
  calculateItemCost,
  isShieldName,
  isHelmetName,
} from "../helpers/equipment.helpers";
import { resolveEquipmentByName } from "../helpers/equipment.helpers";
import { createEquipmentFromBase } from "../../utils/createFigureFromBase";
import { stripUndefinedDeep } from "../helpers/firestore.helpers";
import { hasGiantClawMutation } from "../helpers/warbandCalculations.helpers";
import type { StashItem } from "../../../../components/WarbandStash";
import type { Warband } from "./useWarbandState";

interface UseEquipmentManagementParams {
  warband: Warband;
  updateWarbandFigure: (
    figureId: string,
    updater: (figure: any) => any
  ) => void;
  updateWarbandVault: (updater: (vault: any[]) => any[]) => void;
  updateWarbandProperty: (
    property: "name" | "faction" | "notes" | "gold" | "wyrdstone",
    value: string
  ) => void;
  setHasUnsavedChanges: (value: boolean) => void;
  equipmentCatalogs: {
    meleeDb: any[];
    rangedDb: any[];
    firearmsDb: any[];
    armorDb: any[];
    accessoriesDb: any[];
    remediesPoisonsDb: any[];
  };
  modifierCatalogs: {
    meleeMods: any[];
    rangedMods: any[];
    firearmsMods: any[];
  };
}

export function useEquipmentManagement({
  warband,
  updateWarbandFigure,
  updateWarbandVault,
  updateWarbandProperty,
  setHasUnsavedChanges,
  equipmentCatalogs,
  modifierCatalogs,
}: UseEquipmentManagementParams) {
  // Adiciona item ao cofre (vault)
  const handlePurchaseItem = (item: StashItem, isPurchase: boolean = false) => {
    setHasUnsavedChanges(true);

    // O custo já vem calculado do WarbandStash se tiver modificador resolvido
    // Mas precisa recalcular se não tiver, ou usar o custo já calculado
    const parseCost = (v: any): number => {
      const s = v == null ? "" : String(v);
      const m = s.match(/(\d+(?:\.\d+)?)/);
      return m ? parseFloat(m[1]) : 0;
    };

    // O custo já vem calculado do WarbandStash quando tem modificador
    // Usa ele diretamente, ou recalcula se não tiver sido calculado
    let finalCost = parseCost(item.cost);

    // Se o custo foi "-" ou inválido E tem modificador, recalcula
    if ((finalCost === 0 || item.cost === "-") && item.modifier) {
      // Recalcula usando função antiga como fallback
      finalCost = calculateItemCost(item.cost, item.modifier, modifierCatalogs);
    }

    // Se ainda está 0, tenta pegar do item.cost novamente
    if (finalCost === 0) {
      const baseCostMatch = String(item.cost || "0").match(/(\d+(?:\.\d+)?)/);
      finalCost = baseCostMatch ? parseFloat(baseCostMatch[1]) : 0;
    }

    if (isPurchase) {
      const currentGoldMatch = String(warband.gold || "0").match(/(\d+)/);
      const currentGold = currentGoldMatch
        ? parseInt(currentGoldMatch[1], 10)
        : 0;

      if (currentGold < finalCost) {
        toast.error(
          `Você não tem coroas suficientes! (Necessário: ${finalCost}, Disponível: ${currentGold})`
        );
        return;
      }

      toast.success(`Item comprado! ${finalCost} coroas descontadas.`);
    } else {
      toast.success("Item adicionado ao cofre (loot).");
    }

    const baseEquipment = resolveEquipmentByName(item.name, equipmentCatalogs);
    if (!baseEquipment) return;

    let baseModifier: any = undefined;
    if (item.modifier && item.modifier.name) {
      const modNameLc = String(item.modifier.name).toLowerCase();
      const allMods: any[] = [
        ...(modifierCatalogs.meleeMods || []),
        ...(modifierCatalogs.rangedMods || []),
        ...(modifierCatalogs.firearmsMods || []),
      ];
      baseModifier =
        allMods.find(m => String(m.name).toLowerCase() === modNameLc) ||
        undefined;
    }

    const newEquipment = createEquipmentFromBase(baseEquipment, baseModifier);
    const cleaned = stripUndefinedDeep(newEquipment);

    if (isPurchase) {
      const currentGoldMatch = String(warband.gold || "0").match(/(\d+)/);
      const currentGold = currentGoldMatch
        ? parseInt(currentGoldMatch[1], 10)
        : 0;
      const finalGold = Math.max(0, currentGold - finalCost);
      updateWarbandProperty("gold", String(finalGold));
    }

    updateWarbandVault(vault => [...vault, cleaned]);
  };

  // Equipa item do cofre - busca sempre por ID
  const handleEquipFromStashFlat = (unitId: string, itemId: string) => {
    setHasUnsavedChanges(true);
    // Busca por ID do item no vault
    const idx = (warband.vault || []).findIndex(
      (i: any) => String(i?.id || "") === String(itemId)
    );
    if (idx === -1) {
      console.warn(
        `[useEquipmentManagement] Item não encontrado no vault: ${itemId}`
      );
      return;
    }

    const equipmentObj = (warband.vault || [])[idx];
    if (!equipmentObj) return;

    const itemNameForValidation = equipmentObj.name || "";
    const isShield = isShieldName(itemNameForValidation);
    const isHelmet = isHelmetName(itemNameForValidation);
    const isArmor =
      equipmentObj?.type === "armor" ||
      equipmentObj?.category === "armor" ||
      false;
    const isArmorItem = isArmor && !isShield && !isHelmet;

    if (isShield || isArmorItem) {
      const figure = (warband.figures || []).find((f: any) => f?.id === unitId);
      if (figure) {
        const hasConflictingEquipment = (figure?.equiped || []).some(
          (eq: any) => {
            const eqName = String(eq?.name || "");
            if (isShield) {
              return isShieldName(eqName);
            } else if (isArmorItem) {
              const cat = String(eq?.type || eq?.category || "").toLowerCase();
              return (
                cat === "armor" &&
                !isShieldName(eqName) &&
                !isHelmetName(eqName)
              );
            }
            return false;
          }
        );

        if (hasConflictingEquipment) {
          const itemType = isShield ? "escudo" : "armadura";
          toast.error(
            `A figura já possui um ${itemType} equipado. Você só pode ter 1 ${itemType} por vez.`
          );
          return;
        }
      }
    }

    // Atualiza a figure diretamente
    updateWarbandFigure(unitId, (fig: any) => ({
      ...fig,
      equiped: [...((fig.equiped || []) as any[]), equipmentObj],
    }));

    // Remove do vault
    updateWarbandVault(vault => vault.filter((_, i) => i !== idx));
  };

  // Função auxiliar para buscar armorBonus de um equipamento
  // Desequipa item para o cofre - busca sempre por ID
  const handleUnequipToStashFlat = (unitId: string, itemId: string) => {
    setHasUnsavedChanges(true);
    const figure = (warband.figures || []).find((f: any) => f?.id === unitId);
    if (!figure) return;

    const equippedList: any[] = (figure?.equiped || []) as any[];
    // Busca por ID do equipamento
    const removedEquipment = equippedList.find(
      (e: any) => String(e?.id || "") === String(itemId)
    );

    if (!removedEquipment) {
      console.warn(
        `[useEquipmentManagement] Equipamento não encontrado para desequipar: ${itemId}`
      );
      return;
    }

    // Remove da figure por ID (não atualiza modifiers, será calculado na renderização)
    updateWarbandFigure(unitId, (fig: any) => {
      const newEquiped = equippedList.filter(
        (e: any) => String(e?.id || "") !== String(itemId)
      );
      return {
        ...fig,
        equiped: newEquiped,
      };
    });

    // Se o item tem freeDagger: true, não adiciona ao cofre (apenas remove)
    if ((removedEquipment as any)?.freeDagger === true) {
      return;
    }

    // Remove todas as flags de equipamento antes de adicionar ao cofre
    const {
      mainHandWeapon,
      offHandWeapon,
      twoHandedWeapon,
      equippedAsArmor,
      ...cleanEquipment
    } = removedEquipment as any;

    // Adiciona ao vault apenas se não for freeDagger, sem flags de equipamento
    updateWarbandVault(vault => [...vault, cleanEquipment]);
  };

  // Equipa item na mão secundária (marca offHandWeapon: true) - versão base para escudos
  const handleEquipToSecondaryHandBase = (unitId: string, itemId: string) => {
    setHasUnsavedChanges(true);
    const figure = (warband.figures || []).find((f: any) => f?.id === unitId);
    if (!figure) return;

    const equippedList: any[] = (figure?.equiped || []) as any[];
    const targetItem = equippedList.find(
      (e: any) => String(e?.id || "") === String(itemId)
    );

    if (!targetItem) {
      console.warn(
        `[useEquipmentManagement] Equipamento não encontrado para equipar na mão secundária: ${itemId}`
      );
      return;
    }

    // Atualiza o equipamento para marcar como mão secundária (não atualiza modifiers, será calculado na renderização)
    updateWarbandFigure(unitId, (fig: any) => ({
      ...fig,
      equiped: equippedList.map((e: any) => {
        // Remove offHandWeapon de outros itens
        if (e.id !== itemId && e?.offHandWeapon === true) {
          const { offHandWeapon, ...rest } = e;
          return rest;
        }
        // Adiciona offHandWeapon ao item selecionado
        if (String(e?.id || "") === String(itemId)) {
          return { ...e, offHandWeapon: true };
        }
        return e;
      }),
    }));
  };

  // Desequipa item da mão secundária (remove offHandWeapon: true)
  const handleUnequipFromSecondaryHand = (unitId: string, itemId: string) => {
    setHasUnsavedChanges(true);
    const figure = (warband.figures || []).find((f: any) => f?.id === unitId);
    if (!figure) return;

    const equippedList: any[] = (figure?.equiped || []) as any[];
    const targetItem = equippedList.find(
      (e: any) => String(e?.id || "") === String(itemId)
    );

    if (!targetItem || !targetItem?.offHandWeapon) {
      console.warn(
        `[useEquipmentManagement] Item não encontrado ou não está na mão secundária: ${itemId}`
      );
      return;
    }

    // Remove offHandWeapon do item (não atualiza modifiers, será calculado na renderização)
    updateWarbandFigure(unitId, (fig: any) => {
      const newEquiped = equippedList.map((e: any) => {
        if (String(e?.id || "") === String(itemId)) {
          const { offHandWeapon, ...rest } = e;
          return rest;
        }
        return e;
      });
      return {
        ...fig,
        equiped: newEquiped,
      };
    });
  };

  // Equipa item como armadura (marca equippedAsArmor: true e adiciona bônus)
  const handleEquipAsArmor = (unitId: string, itemId: string) => {
    setHasUnsavedChanges(true);
    const figure = (warband.figures || []).find((f: any) => f?.id === unitId);
    if (!figure) return;

    const equippedList: any[] = (figure?.equiped || []) as any[];
    const targetItem = equippedList.find(
      (e: any) => String(e?.id || "") === String(itemId)
    );

    if (!targetItem) {
      console.warn(
        `[useEquipmentManagement] Equipamento não encontrado para equipar como armadura: ${itemId}`
      );
      return;
    }

    // Busca o base do equipamento para verificar se é armadura
    const allEquipment: any[] = [
      ...(equipmentCatalogs.meleeDb || []),
      ...(equipmentCatalogs.rangedDb || []),
      ...(equipmentCatalogs.firearmsDb || []),
      ...(equipmentCatalogs.armorDb || []),
      ...(equipmentCatalogs.accessoriesDb || []),
      ...(equipmentCatalogs.remediesPoisonsDb || []),
    ];

    const targetBase = targetItem?.base_equipment_id
      ? allEquipment.find(
          (e: any) =>
            e.id === targetItem.base_equipment_id ||
            e.templateId === targetItem.base_equipment_id
        )
      : null;

    const isArmor =
      targetBase?.type === "Armadura" ||
      String(targetBase?.name || "")
        .toLowerCase()
        .includes("armadura") ||
      targetItem?.type === "Armadura" ||
      String(targetItem?.name || "")
        .toLowerCase()
        .includes("armadura");

    if (!isArmor) {
      console.warn(
        `[useEquipmentManagement] Item não é uma armadura: ${itemId}`
      );
      return;
    }

    // Verifica se já existe outra armadura equipada para avisar
    const otherArmorEquipped = equippedList.find(
      (e: any) => e?.id !== itemId && e?.equippedAsArmor === true
    );

    // Atualiza o equipamento para marcar como armadura equipada (não atualiza modifiers, será calculado na renderização)
    updateWarbandFigure(unitId, (fig: any) => ({
      ...fig,
      equiped: equippedList.map((e: any) => {
        // Remove equippedAsArmor de outras armaduras
        if (e.id !== itemId && e?.equippedAsArmor === true) {
          const { equippedAsArmor, ...rest } = e;
          return rest;
        }
        // Adiciona equippedAsArmor ao item selecionado
        if (String(e?.id || "") === String(itemId)) {
          return { ...e, equippedAsArmor: true };
        }
        return e;
      }),
    }));

    if (otherArmorEquipped) {
      toast.info("Outra armadura foi desequipada");
    }
  };

  // Desequipa item como armadura (remove equippedAsArmor: true e o bônus de armadura)
  const handleUnequipFromArmor = (unitId: string, itemId: string) => {
    setHasUnsavedChanges(true);
    const figure = (warband.figures || []).find((f: any) => f?.id === unitId);
    if (!figure) return;

    const equippedList: any[] = (figure?.equiped || []) as any[];
    const targetItem = equippedList.find(
      (e: any) => String(e?.id || "") === String(itemId)
    );

    if (!targetItem || !targetItem?.equippedAsArmor) {
      console.warn(
        `[useEquipmentManagement] Item não encontrado ou não está equipado como armadura: ${itemId}`
      );
      return;
    }

    // Remove equippedAsArmor do item (não atualiza modifiers, será calculado na renderização)
    updateWarbandFigure(unitId, (fig: any) => {
      const newEquiped = equippedList.map((e: any) => {
        if (String(e?.id || "") === String(itemId)) {
          const { equippedAsArmor, ...rest } = e;
          return rest;
        }
        return e;
      });
      return {
        ...fig,
        equiped: newEquiped,
      };
    });
  };

  // Verifica se uma arma tem uma característica especial (Leve, Pistola, Duas Mãos, etc.)
  const hasSpecialRule = (equipment: any, keywords: string[]): boolean => {
    if (!equipment?.base_equipment_id) return false;

    const allEquipment: any[] = [
      ...(equipmentCatalogs.meleeDb || []),
      ...(equipmentCatalogs.rangedDb || []),
      ...(equipmentCatalogs.firearmsDb || []),
      ...(equipmentCatalogs.armorDb || []),
      ...(equipmentCatalogs.accessoriesDb || []),
      ...(equipmentCatalogs.remediesPoisonsDb || []),
    ];

    const baseEquipment = allEquipment.find(
      (e: any) =>
        e.id === equipment.base_equipment_id ||
        e.templateId === equipment.base_equipment_id
    );

    if (!baseEquipment) return false;

    const specialRules = baseEquipment?.specialRules || [];
    const rulesText = JSON.stringify(specialRules).toLowerCase();

    return keywords.some(keyword => rulesText.includes(keyword.toLowerCase()));
  };

  // Equipa item na mão primária
  // asTwoHanded: true = equipa como duas mãos (desequipa todas outras), false = equipa normal (versátil em modo mão principal)
  const handleEquipToPrimaryHand = (
    unitId: string,
    itemId: string,
    asTwoHanded?: boolean
  ) => {
    setHasUnsavedChanges(true);
    const figure = (warband.figures || []).find((f: any) => f?.id === unitId);
    if (!figure) return;

    const equippedList: any[] = (figure?.equiped || []) as any[];
    const targetItem = equippedList.find(
      (e: any) => String(e?.id || "") === String(itemId)
    );

    if (!targetItem) {
      console.warn(
        `[useEquipmentManagement] Equipamento não encontrado para equipar na mão primária: ${itemId}`
      );
      return;
    }

    // Verifica se tem Garra Colossal
    const mutations = (figure?.mutations || []) as any[];
    const hasGiantClaw = hasGiantClawMutation(mutations);
    // Verifica ferimento de antebraço esmagado
    const hasCrushedForearm = (() => {
      const injuries = (figure?.injuries || []) as any[];
      return injuries.some((inj: any) => {
        const n = String(inj?.name || inj || "").toLowerCase();
        const forearm =
          n.includes("antebraço") ||
          n.includes("antebraco") ||
          n.includes("ante-braço") ||
          n.includes("ante-braco") ||
          n.includes("ante braço") ||
          n.includes("ante braco");
        const crush = n.includes("esmag") || n.includes("esmigalh");
        return forearm && crush;
      });
    })();
    const offhandDisabled = hasGiantClaw || hasCrushedForearm;

    // Verifica se é uma arma de "Duas Mãos" ou "Versátil"
    const isTwoHanded = hasSpecialRule(targetItem, ["Duas Mãos", "duas mãos"]);
    const isVersatile = hasSpecialRule(targetItem, ["Versátil", "versatil"]);

    // Determina se deve equipar como duas mãos
    // Se for duas mãos (e NÃO versátil) OU versátil em modo duas mãos EXPLICITO
    // BLOQUEADO se a mão secundária estiver desabilitada
    const shouldEquipAsTwoHanded =
      !offhandDisabled && // Bloqueia se offhand estiver desabilitada
      ((isTwoHanded && !isVersatile) || (isVersatile && asTwoHanded === true));

    // Validação adicional: se tentar equipar como duas mãos com offhand desabilitada, bloqueia
    if (offhandDisabled && ((isTwoHanded && !isVersatile) || (isVersatile && asTwoHanded === true))) {
      toast.error("Não é possível equipar armas de duas mãos devido às restrições atuais");
      return;
    }

    if (shouldEquipAsTwoHanded) {
      // Remove todas as armas da mão primária e secundária
      updateWarbandFigure(unitId, (fig: any) => ({
        ...fig,
        equiped: equippedList.map((e: any) => {
          // Remove todas as flags de equipamento de outras armas
          if (
            e?.id !== itemId &&
            (e?.mainHandWeapon || e?.offHandWeapon || e?.twoHandedWeapon)
          ) {
            const { mainHandWeapon, offHandWeapon, twoHandedWeapon, ...rest } =
              e;
            return rest;
          }
          // Adiciona twoHandedWeapon ao item selecionado
          if (String(e?.id || "") === String(itemId)) {
            return {
              ...e,
              twoHandedWeapon: true,
            };
          }
          return e;
        }),
      }));
      toast.info("Armas da mão primária e secundária foram desequipadas");
    } else {
      // Verifica se já existe uma arma de duas mãos equipada
      const twoHandedWeapon = equippedList.find(
        (e: any) => e?.twoHandedWeapon === true
      );

      // Se existe uma arma de duas mãos, desequipa ela
      if (twoHandedWeapon) {
        updateWarbandFigure(unitId, (fig: any) => ({
          ...fig,
          equiped: equippedList.map((e: any) => {
            // Remove twoHandedWeapon da arma de duas mãos
            if (e?.id === twoHandedWeapon.id) {
              const { twoHandedWeapon, ...rest } = e;
              return rest;
            }
            // Adiciona mainHandWeapon ao item selecionado
            if (String(e?.id || "") === String(itemId)) {
              return { ...e, mainHandWeapon: true };
            }
            return e;
          }),
        }));
        toast.info("Arma de duas mãos foi desequipada");
      } else {
        // Equipa normalmente na mão primária (NÃO desequipa outras armas, apenas remove mainHandWeapon de outras)
        updateWarbandFigure(unitId, (fig: any) => ({
          ...fig,
          equiped: equippedList.map((e: any) => {
            // Remove mainHandWeapon apenas de outras armas na mão primária
            if (e?.id !== itemId && e?.mainHandWeapon) {
              const { mainHandWeapon, ...rest } = e;
              return rest;
            }
            // Adiciona mainHandWeapon ao item selecionado
            if (String(e?.id || "") === String(itemId)) {
              return { ...e, mainHandWeapon: true };
            }
            return e;
          }),
        }));
      }
    }
  };

  // Desequipa item da mão primária
  const handleUnequipFromPrimaryHand = (unitId: string, itemId: string) => {
    setHasUnsavedChanges(true);
    const figure = (warband.figures || []).find((f: any) => f?.id === unitId);
    if (!figure) return;

    const equippedList: any[] = (figure?.equiped || []) as any[];
    const targetItem = equippedList.find(
      (e: any) => String(e?.id || "") === String(itemId)
    );

    if (
      !targetItem ||
      (!targetItem?.mainHandWeapon && !targetItem?.twoHandedWeapon)
    ) {
      console.warn(
        `[useEquipmentManagement] Item não encontrado ou não está na mão primária: ${itemId}`
      );
      return;
    }

    // Remove mainHandWeapon ou twoHandedWeapon do item
    updateWarbandFigure(unitId, (fig: any) => ({
      ...fig,
      equiped: equippedList.map((e: any) => {
        if (String(e?.id || "") === String(itemId)) {
          const { mainHandWeapon, twoHandedWeapon, ...rest } = e;
          return rest;
        }
        return e;
      }),
    }));
  };

  // Equipa item na mão secundária - versão completa com lógica para "Duas Mãos"
  const handleEquipToSecondaryHand = (unitId: string, itemId: string) => {
    setHasUnsavedChanges(true);
    const figure = (warband.figures || []).find((f: any) => f?.id === unitId);
    if (!figure) return;
    // Regra global: bloqueia mão secundária se mutação Garra Colossal ou ferimento antebraço esmagado
    const offhandDisabled = (() => {
      const hasGiant = hasGiantClawMutation((figure?.mutations || []) as any[]);
      const hasCrushed = ((figure?.injuries || []) as any[]).some((inj: any) => {
        const n = String(inj?.name || inj || "").toLowerCase();
        const forearm =
          n.includes("antebraço") ||
          n.includes("antebraco") ||
          n.includes("ante-braço") ||
          n.includes("ante-braco") ||
          n.includes("ante braço") ||
          n.includes("ante braco");
        const crush = n.includes("esmag") || n.includes("esmigalh");
        return forearm && crush;
      });
      return hasGiant || hasCrushed;
    })();

    if (offhandDisabled) {
      toast.error("Mão secundária indisponível devido às restrições atuais");
      return;
    }


    const equippedList: any[] = (figure?.equiped || []) as any[];
    const targetItem = equippedList.find(
      (e: any) => String(e?.id || "") === String(itemId)
    );

    if (!targetItem) {
      console.warn(
        `[useEquipmentManagement] Equipamento não encontrado: ${itemId}`
      );
      return;
    }

    // Se for escudo, usa a lógica original
    const allEquipment: any[] = [
      ...(equipmentCatalogs.meleeDb || []),
      ...(equipmentCatalogs.rangedDb || []),
      ...(equipmentCatalogs.firearmsDb || []),
      ...(equipmentCatalogs.armorDb || []),
      ...(equipmentCatalogs.accessoriesDb || []),
      ...(equipmentCatalogs.remediesPoisonsDb || []),
    ];

    const targetBase = targetItem?.base_equipment_id
      ? allEquipment.find(
          (e: any) =>
            e.id === targetItem.base_equipment_id ||
            e.templateId === targetItem.base_equipment_id
        )
      : null;

    const isShield =
      targetBase?.type === "Escudo" ||
      String(targetBase?.name || "")
        .toLowerCase()
        .includes("escudo") ||
      targetItem?.type === "Escudo" ||
      String(targetItem?.name || "")
        .toLowerCase()
        .includes("escudo");

    if (isShield) {
      // Lógica base para escudos
      handleEquipToSecondaryHandBase(unitId, itemId);
      return;
    }

    // Verifica se é uma arma (não escudo)
    const isWeaponItem =
      targetBase?.type === "Arma Corpo a Corpo" ||
      targetBase?.type === "Arma a Distância" ||
      targetBase?.type === "Arma de Fogo" ||
      String(targetBase?.type || "")
        .toLowerCase()
        .includes("arma");

    // Se for arma (não escudo), verifica se há uma arma de duas mãos equipada
    const twoHandedWeapon = equippedList.find(
      (e: any) => e?.twoHandedWeapon === true
    );

    // Se existe uma arma de duas mãos, desequipa ela
    if (twoHandedWeapon) {
      updateWarbandFigure(unitId, (fig: any) => ({
        ...fig,
        equiped: equippedList.map((e: any) => {
          // Remove twoHandedWeapon da arma de duas mãos
          if (e?.id === twoHandedWeapon.id) {
            const { twoHandedWeapon, ...rest } = e;
            return rest;
          }
          // Adiciona offHandWeapon ao item selecionado
          if (String(e?.id || "") === String(itemId)) {
            return { ...e, offHandWeapon: true };
          }
          return e;
        }),
      }));
      toast.info("Arma de duas mãos foi desequipada");
    } else {
      // Se for arma (não escudo) e há uma arma versátil na mão principal (modo mão principal), desequipa ela
      if (isWeaponItem) {
        const versatileWeapon = equippedList.find(
          (e: any) => e?.mainHandWeapon === true && !e?.twoHandedWeapon
        );

        if (versatileWeapon) {
          // Verifica se é realmente versátil
          const isVersatile = hasSpecialRule(versatileWeapon, [
            "Versátil",
            "versatil",
          ]);
          if (isVersatile) {
            updateWarbandFigure(unitId, (fig: any) => ({
              ...fig,
              equiped: equippedList.map((e: any) => {
                // Remove mainHandWeapon da arma versátil
                if (e?.id === versatileWeapon.id) {
                  const { mainHandWeapon, ...rest } = e;
                  return rest;
                }
                // Adiciona offHandWeapon ao item selecionado
                if (String(e?.id || "") === String(itemId)) {
                  return { ...e, offHandWeapon: true };
                }
                return e;
              }),
            }));
            toast.info("Arma versátil foi desequipada");
            return;
          }
        }
      }
      // Equipa normalmente na mão secundária (NÃO desequipa outras armas)
      updateWarbandFigure(unitId, (fig: any) => ({
        ...fig,
        equiped: equippedList.map((e: any) => {
          // Remove offHandWeapon apenas de outros itens na mão secundária (exceto escudos)
          if (e.id !== itemId && e?.offHandWeapon === true && !isShield) {
            const { offHandWeapon, ...rest } = e;
            return rest;
          }
          // Adiciona offHandWeapon ao item selecionado
          if (String(e?.id || "") === String(itemId)) {
            return { ...e, offHandWeapon: true };
          }
          return e;
        }),
      }));
    }
  };

  // Equipa item como Par (desequipa tudo e seta mainHandWeapon + offHandWeapon)
  const handleEquipAsPair = (unitId: string, itemId: string) => {
    setHasUnsavedChanges(true);
    const figure = (warband.figures || []).find((f: any) => f?.id === unitId);
    if (!figure) return;

    // Bloqueia se mão secundária estiver desabilitada
    const offhandDisabled = (() => {
      const hasGiant = hasGiantClawMutation((figure?.mutations || []) as any[]);
      const hasCrushed = ((figure?.injuries || []) as any[]).some((inj: any) => {
        const n = String(inj?.name || inj || "").toLowerCase();
        const forearm =
          n.includes("antebraço") ||
          n.includes("antebraco") ||
          n.includes("ante-braço") ||
          n.includes("ante-braco") ||
          n.includes("ante braço") ||
          n.includes("ante braco");
        const crush = n.includes("esmag") || n.includes("esmigalh");
        return forearm && crush;
      });
      return hasGiant || hasCrushed;
    })();
    if (offhandDisabled) {
      toast.error("Não é possível equipar como Par devido às restrições atuais");
      return;
    }

    const equippedList: any[] = (figure?.equiped || []) as any[];
    const targetItem = equippedList.find(
      (e: any) => String(e?.id || "") === String(itemId)
    );

    if (!targetItem) {
      console.warn(
        `[useEquipmentManagement] Equipamento não encontrado para equipar como par: ${itemId}`
      );
      return;
    }

    // Desequipa tudo: remove todas as flags de equipamento de TODOS os itens
    // Depois seta mainHandWeapon E offHandWeapon no item selecionado
    updateWarbandFigure(unitId, (fig: any) => ({
      ...fig,
      equiped: equippedList.map((e: any) => {
        // Remove todas as flags de equipamento de outros itens
        if (e?.id !== itemId) {
          const {
            mainHandWeapon,
            offHandWeapon,
            twoHandedWeapon,
            equippedAsArmor,
            ...rest
          } = e;
          return rest;
        }
        // Adiciona mainHandWeapon E offHandWeapon ao item selecionado
        if (String(e?.id || "") === String(itemId)) {
          return {
            ...e,
            mainHandWeapon: true,
            offHandWeapon: true,
          };
        }
        return e;
      }),
    }));
    toast.info("Todas as armas foram desequipadas. Item equipado como Par.");
  };

  return {
    handlePurchaseItem,
    handleEquipFromStashFlat,
    handleUnequipToStashFlat,
    handleEquipToSecondaryHand,
    handleUnequipFromSecondaryHand,
    handleEquipToPrimaryHand,
    handleUnequipFromPrimaryHand,
    handleEquipAsArmor,
    handleUnequipFromArmor,
    handleEquipAsPair,
  };
}
