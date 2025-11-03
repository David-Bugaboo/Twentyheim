/**
 * Helpers para operações com Firestore
 */

import { doc, updateDoc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebase";

/**
 * Remove recursivamente qualquer campo com valor undefined (Firestore não aceita)
 */
export function stripUndefinedDeep(value: any): any {
  if (Array.isArray(value)) {
    return value
      .map((v) => stripUndefinedDeep(v))
      .filter((v) => v !== undefined);
  }
  if (value && typeof value === "object") {
    const out: any = {};
    for (const [k, v] of Object.entries(value)) {
      if (v === undefined) continue;
      const cleaned = stripUndefinedDeep(v);
      if (cleaned !== undefined) out[k] = cleaned;
    }
    return out;
  }
  return value;
}

/**
 * Salva um warband no Firestore
 * Só atualiza updatedAt se houver mudanças reais nos dados
 */
export async function saveWarbandToFirestore(
  userId: string,
  warbandId: string,
  data: any
): Promise<void> {
  try {
    const ref = doc(db, "users", userId, "warbands", warbandId);
    
    // Busca dados existentes para comparar
    const existingSnap = await getDoc(ref);
    const existing = existingSnap.exists() ? existingSnap.data() : null;
    
    // Prepara dados para salvar (sem updatedAt ainda)
    const cleaned = stripUndefinedDeep(data);
    const { updatedAt: _removedUpdatedAt, ...dataWithoutUpdatedAt } = cleaned;
    
    // Verifica se há mudanças reais
    if (existing) {
      const hasChanges = 
        JSON.stringify(dataWithoutUpdatedAt) !== JSON.stringify({
          ...existing,
          updatedAt: undefined,
        });
      
      if (!hasChanges) {
        console.log("[saveWarbandToFirestore] ⚠️ Nenhuma mudança detectada - não atualizando Firestore");
        return; // Não atualiza se não houver mudanças
      }
      
      // Há mudanças - atualiza documento existente
      await updateDoc(ref, {
        ...cleaned,
        updatedAt: new Date().toISOString(),
      });
    } else {
      // Documento não existe - cria novo
      await setDoc(ref, {
        ...cleaned,
        updatedAt: new Date().toISOString(),
      });
    }
  } catch (error) {
    console.error("Erro ao salvar no Firestore:", error);
    throw error;
  }
}

/**
 * Busca um warband do Firestore
 */
export async function getWarbandFromFirestore(
  userId: string,
  warbandId: string
): Promise<any | null> {
  try {
    const ref = doc(db, "users", userId, "warbands", warbandId);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      return snap.data();
    }
    return null;
  } catch (error) {
    console.error("Erro ao buscar do Firestore:", error);
    return null;
  }
}

/**
 * Sincroniza um warband local com o Firestore
 */
export async function syncWarband(
  warband: any,
  userId: string,
  localData: any
): Promise<{ success: boolean; message: string }> {
  try {
    const firestoreData = await getWarbandFromFirestore(userId, warband.id);
    
    if (!firestoreData) {
      // Não existe no Firestore, cria novo
      const { setDoc } = await import("firebase/firestore");
      const ref = doc(db, "users", userId, "warbands", warband.id);
      await setDoc(ref, {
        ...stripUndefinedDeep(warband),
        updatedAt: new Date().toISOString(),
      });
      return { success: true, message: "Bando sincronizado com sucesso" };
    }

    // Compara timestamps
    const localUpdatedAt = localData.updatedAt ? new Date(localData.updatedAt).getTime() : 0;
    const firestoreUpdatedAt = firestoreData.updatedAt 
      ? new Date(firestoreData.updatedAt).getTime() 
      : 0;

    if (localUpdatedAt > firestoreUpdatedAt) {
      // Local é mais recente, sobrescreve Firestore
      await saveWarbandToFirestore(userId, warband.id, warband);
      return { success: true, message: "Bando local sincronizado (local era mais recente)" };
    } else if (firestoreUpdatedAt > localUpdatedAt) {
      // Firestore é mais recente, precisa fazer merge ou avisar usuário
      return { 
        success: false, 
        message: "Versão na nuvem é mais recente. Faça download primeiro." 
      };
    } else {
      // Mesma versão - verifica se há mudanças antes de salvar
      // (saveWarbandToFirestore já faz essa verificação internamente)
      await saveWarbandToFirestore(userId, warband.id, warband);
      return { success: true, message: "Bando já estava sincronizado" };
    }
  } catch (error: any) {
    console.error("Erro ao sincronizar:", error);
    return { 
      success: false, 
      message: `Erro ao sincronizar: ${error.message || "Erro desconhecido"}` 
    };
  }
}

