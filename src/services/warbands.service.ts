import { apiClient } from "./apiClient";
import type { Warband } from "../types/warband.entity";
import type { Faction } from "../types/faction.entity";


export async function fetchWarbandById(warbandId: string, signal?: AbortSignal) {
  const response = await apiClient.get<Warband>(`/warbands/${warbandId}`, {
    signal,
  });
  return response.data;
}

export async function fetchFactionBySlug(slug: string, signal?: AbortSignal) {
  const response = await apiClient.get<Faction>(
    `/queries/factions/${slug}`,
    {
      signal,
    }
  );
  return response.data;
}

export async function addFigureToWarband(
  warbandId: string,
  figureSlug: string
) {
  const response = await apiClient.post<Warband>(
    `/warbands/${warbandId}/add-figure/${figureSlug}`,
    {}
  );
  return response.data;
}

export async function fireWarbandSoldier(
  warbandId: string,
  warbandSoldierId: string
) {
  const response = await apiClient.delete<Warband>(
    `/warbands/${warbandId}/fire/${warbandSoldierId}`
  );
  return response.data;
}

export interface AddVaultItemPayload {
  equipmentSlug: string;
  modifierSlug?: string;
}

export async function addItemToVault(
  warbandId: string,
  payload: AddVaultItemPayload,
  options?: { loot?: boolean; discount?: number }
) {
  const params: Record<string, unknown> = {
    loot: options?.loot ?? false,
  };
  if (options?.discount !== undefined && options.discount > 0) {
    params.discount = options.discount;
  }
  const response = await apiClient.post<Warband>(
    `/warbands/${warbandId}/vault`,
    payload,
    {
      params,
    }
  );
  return response.data;
}

export async function updateVaultItem(
  warbandId: string,
  vaultItemId: string,
  options?: { sell?: boolean; destroy?: boolean }
) {
  const params: Record<string, unknown> = {
    sell: options?.sell ?? false,
  };
  if (options?.destroy === true) {
    params.destroy = true;
  }
  const response = await apiClient.delete<Warband>(
    `/warbands/${warbandId}/undoFromVault/${vaultItemId}`,
    {
      params,
    }
  );
  return response.data;
}

export async function deleteWarband(warbandId: string) {
  const response = await apiClient.delete(`/warbands/${warbandId}`);
  return response.data;
}

export interface UpdateWarbandPayload {
  name?: string;
  crowns?: number;
  wyrdstone?: number;
}

export async function updateWarband(
  warbandId: string,
  payload: UpdateWarbandPayload
) {
  const response = await apiClient.patch<Warband>(
    `/warbands/${warbandId}`,
    payload
  );
  return response.data;
}

export interface FactionSummary {
  slug: string;
  name: string;
}

export async function fetchFactions(signal?: AbortSignal) {
  const response = await apiClient.get<FactionSummary[]>(
    `/queries/factions`,
    { signal }
  );
  return response.data;
}

export interface CreateWarbandPayload {
  name: string;
  crowns?: number;
  wyrdstone?: number;
}

export async function createWarband(
  factionSlug: string,
  payload: CreateWarbandPayload
) {
  const response = await apiClient.post(`/warbands/${factionSlug}`, payload);
  return response.data;
}

export interface SharedLinkResponse {
  id: string;
  warbandId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export async function createSharedLink(warbandId: string) {
  const response = await apiClient.post<SharedLinkResponse>(
    `/warbands/${warbandId}/share`
  );
  return response.data;
}

export async function updateSharedLink(
  warbandId: string,
  linkId: string
) {
  const response = await apiClient.patch<SharedLinkResponse>(
    `/warbands/${warbandId}/share`,
    { linkId }
  );
  return response.data;
}

export interface SharedWarbandData {
  warband: Warband;
  bandSnapShot: unknown;
}

export async function fetchSharedLinkById(linkId: string, signal?: AbortSignal) {
  const response = await apiClient.get<SharedWarbandData>(
    `/warbands/shared-link/${linkId}`,
    { signal }
  );
  return response.data;
}


