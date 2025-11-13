import { apiClient } from "./apiClient";

export async function killSoldier(soldierId: string) {
  const response = await apiClient.delete(
    `/soldiers/kill/${soldierId}`
  );
  return response.data;
}

export async function undoSoldier(soldierId: string) {
  const response = await apiClient.delete(
    `/soldiers/undo/${soldierId}`
  );
  return response.data;
}

export async function equipSoldierFromVault(
  soldierId: string,
  warbandVaultItemId: string
) {
  const response = await apiClient.post(
    `/soldiers/${soldierId}/equipment/${warbandVaultItemId}`,
    {}
  );
  return response.data;
}

export async function returnEquipmentToVault(
  soldierId: string,
  warbandToSoldierItemId: string
) {
  const response = await apiClient.delete(
    `/soldiers/${soldierId}/equipment/${warbandToSoldierItemId}`
  );
  return response.data;
}

export async function equipSoldierEquipment(
  equipmentToWarbandSoldierId: string,
  slot: string
) {
  const response = await apiClient.post(
    `/soldiers/equipment/${equipmentToWarbandSoldierId}/equip/${slot}`,
    {}
  );
  return response.data;
}

export async function unequipSoldierEquipment(
  equipmentToWarbandSoldierId: string
) {
  const response = await apiClient.delete(
    `/soldiers/equipment/${equipmentToWarbandSoldierId}/unequip`
  );
  return response.data;
}

export async function addSkillToSoldier(
  soldierId: string,
  skillSlug: string
) {
  const response = await apiClient.post(
    `/soldiers/${soldierId}/skills/${skillSlug}`,
    {}
  );
  return response.data;
}

export async function removeSkillFromSoldier(
  soldierId: string,
  skillToWarbandSoldierId: string
) {
  const response = await apiClient.delete(
    `/soldiers/${soldierId}/skills/${skillToWarbandSoldierId}`
  );
  return response.data;
}

export async function addSpellToSoldier(
  soldierId: string,
  spellSlug: string
) {
  const response = await apiClient.post(
    `/soldiers/${soldierId}/spells/${spellSlug}`,
    {}
  );
  return response.data;
}

export async function removeSpellFromSoldier(
  soldierId: string,
  warbandSoldierSpellId: string
) {
  const response = await apiClient.delete(
    `/soldiers/${soldierId}/spells/${warbandSoldierSpellId}`
  );
  return response.data;
}

export async function addAdvancementToSoldier(
  soldierId: string,
  advancementSlug: string
) {
  const response = await apiClient.post(
    `/soldiers/${soldierId}/advancements/${advancementSlug}`,
    {}
  );
  return response.data;
}

export async function removeAdvancementFromSoldier(
  soldierId: string,
  advancementToWarbandSoldierId: string
) {
  const response = await apiClient.delete(
    `/soldiers/${soldierId}/advancements/${advancementToWarbandSoldierId}`
  );
  return response.data;
}

export async function addInjuryToSoldier(
  soldierId: string,
  injurySlug: string
) {
  const response = await apiClient.post(
    `/soldiers/${soldierId}/injuries/${injurySlug}`,
    {}
  );
  return response.data;
}

export async function removeInjuryFromSoldier(
  soldierId: string,
  injuryToWarbandSoldierId: string
) {
  const response = await apiClient.delete(
    `/soldiers/${soldierId}/injuries/${injuryToWarbandSoldierId}`
  );
  return response.data;
}

export async function addSupernaturalAbilityToSoldier(
  soldierId: string,
  supernaturalAbilitySlug: string
) {
  const response = await apiClient.post(
    `/soldiers/${soldierId}/supernatural-abilities/${supernaturalAbilitySlug}`,
    {}
  );
  return response.data;
}

export async function removeSupernaturalAbilityFromSoldier(
  soldierId: string,
  supernaturalAbilityToWarbandSoldierId: string
) {
  const response = await apiClient.delete(
    `/soldiers/${soldierId}/supernatural-abilities/${supernaturalAbilityToWarbandSoldierId}`
  );
  return response.data;
}

export type SoldierMiscModifierPayload = {
  move: number;
  fight: number;
  shoot: number;
  armour: number;
  will: number;
  health: number;
  strength: number;
};

export type SoldierMiscModifiers = SoldierMiscModifierPayload;

export type UpdateSoldierPayload = {
  campaignName?: string | null;
  notes?: string | null;
  twoWeaponFighting?: boolean;
  miscModifiers?: SoldierMiscModifiers;
};

export async function updateSoldier(
  soldierId: string,
  payload: UpdateSoldierPayload
) {
  const requestBody: Partial<UpdateSoldierPayload> = { ...payload };

  if (payload.miscModifiers) {
    requestBody.miscModifiers = {
      move: normalizeModifierValue(payload.miscModifiers.move),
      fight: normalizeModifierValue(payload.miscModifiers.fight),
      shoot: normalizeModifierValue(payload.miscModifiers.shoot),
      armour: normalizeModifierValue(payload.miscModifiers.armour),
      will: normalizeModifierValue(payload.miscModifiers.will),
      health: normalizeModifierValue(payload.miscModifiers.health),
      strength: normalizeModifierValue(payload.miscModifiers.strength),
    };
  }

  const response = await apiClient.patch(
    `/soldiers/${soldierId}`,
    requestBody
  );
  return response.data;
}

function normalizeModifierValue(value: number | undefined): number {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return 0;
  }
  return value;
}

