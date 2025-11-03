/**
 * Helpers para operações com IndexedDB para bandos de guerra
 */

export const LOCAL_WARBANDS_STORE = "local-warbands";
const DB_NAME = "twentyheim-cache";
const DB_VERSION = 2; // Incrementado para garantir criação da nova store

// Fila de operações para garantir que apenas uma escrita aconteça por vez
let operationQueue: Promise<void> = Promise.resolve();

/**
 * Adiciona uma operação à fila, garantindo execução sequencial
 */
function queueOperation<T>(operation: () => Promise<T>): Promise<T> {
  console.log("[queueOperation] Adicionando operação à fila");

  // Cria uma nova Promise que será resolvida/rejeitada após a operação
  let resolveOperation: (value: T) => void;
  let rejectOperation: (error: any) => void;
  const operationPromise = new Promise<T>((resolve, reject) => {
    resolveOperation = resolve;
    rejectOperation = reject;
  });

  // Adiciona a operação à fila
  operationQueue = operationQueue
    .then(async () => {
      try {
        console.log("[queueOperation] Executando operação");
        const result = await operation();
        console.log("[queueOperation] Operação concluída com sucesso");
        resolveOperation!(result);
      } catch (error) {
        console.error("[queueOperation] Erro na operação:", error);
        rejectOperation!(error);
      }
    })
    .catch(error => {
      console.error("[queueOperation] Erro na fila:", error);
      rejectOperation!(error);
    });

  return operationPromise;
}

export interface LocalWarbandData {
  id: string;
  name: string;
  faction?: string;
  notes?: string;
  gold?: string;
  wyrdstone?: string;
  vault?: any[];
  figures?: any[];
  updatedAt?: string;
  firestoreUpdatedAt?: string;
  source?: "local" | "user";
  userId?: string | null;
  // Campos adicionais para SavedWarband
  initialCrowns?: number;
  createdAt?: any;
  // Log de atualizações (ISO strings) para detecção de diferenças
  updateLog?: string[];
}

/**
 * Abre conexão com IndexedDB
 */
export async function openWarbandDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = event => {
      const db = (event.target as IDBOpenDBRequest).result;
      const oldVersion = event.oldVersion;

      // Se está migrando da versão 1, preserva stores existentes e cria novas
      if (oldVersion < 2) {
        // Preserva store json-data se existir
        if (!db.objectStoreNames.contains("json-data")) {
          db.createObjectStore("json-data", { keyPath: "id" });
        }
        // Cria store local-warbands
        if (!db.objectStoreNames.contains(LOCAL_WARBANDS_STORE)) {
          db.createObjectStore(LOCAL_WARBANDS_STORE, { keyPath: "id" });
        }
      } else {
        // Para futuras versões, apenas cria se não existir
        if (!db.objectStoreNames.contains(LOCAL_WARBANDS_STORE)) {
          db.createObjectStore(LOCAL_WARBANDS_STORE, { keyPath: "id" });
        }
      }
    };
  });
}

/**
 * Busca um bando local pelo ID
 */
export async function getLocalWarband(
  id: string
): Promise<LocalWarbandData | null> {
  try {
    const db = await openWarbandDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([LOCAL_WARBANDS_STORE], "readonly");
      const store = transaction.objectStore(LOCAL_WARBANDS_STORE);
      const request = store.get(id);

      request.onsuccess = () => {
        const result = request.result;
        if (result) {
          resolve({
            id: result.id,
            name: result.name || "",
            faction: result.faction || "",
            notes: result.notes || "",
            gold: result.gold || "0",
            wyrdstone: result.wyrdstone || "0",
            vault: result.vault || [],
            figures: result.figures || [],
            updatedAt: result.updatedAt,
            firestoreUpdatedAt: result.firestoreUpdatedAt,
            source: result.source || "local",
            userId: result.userId || null,
            initialCrowns: result.initialCrowns || 0,
            createdAt: result.createdAt,
          } as LocalWarbandData);
        } else {
          resolve(null);
        }
      };
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error("Erro ao carregar bando local:", error);
    return null;
  }
}

/**
 * Busca todos os bandos locais
 */
export async function getAllLocalWarbands(): Promise<LocalWarbandData[]> {
  try {
    const db = await openWarbandDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([LOCAL_WARBANDS_STORE], "readonly");
      const store = transaction.objectStore(LOCAL_WARBANDS_STORE);
      const request = store.getAll();

      request.onsuccess = () => {
        const warbands = (request.result || []).map(
          (w: any) =>
            ({
              id: w.id,
              name: w.name || "",
              faction: w.faction || "",
              notes: w.notes || "",
              gold: w.gold || "0",
              wyrdstone: w.wyrdstone || "0",
              vault: w.vault || [],
              figures: w.figures || [],
              updatedAt: w.updatedAt,
              firestoreUpdatedAt: w.firestoreUpdatedAt,
              source: (w.source || "local") as "local" | "user",
              userId: w.userId || null,
              initialCrowns: w.initialCrowns || 0,
              createdAt: w.createdAt,
            }) as LocalWarbandData
        );
        console.log("[getAllLocalWarbands] Total de bandos:", warbands.length);
        resolve(warbands);
      };
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error("Erro ao carregar bandos locais:", error);
    return [];
  }
}

/**
 * Salva um bando no IndexedDB
 * Se userId for fornecido e válido, também salva no Firestore
 * Usa fila de operações para evitar conflitos concorrentes
 */
export async function saveLocalWarband(
  id: string,
  data: Partial<LocalWarbandData>,
  source: "local" | "user" = "local",
  userId?: string | null // Opcional: se fornecido, também salva no Firestore
): Promise<void> {
  return queueOperation(async () => {
    try {
      const db = await openWarbandDB();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([LOCAL_WARBANDS_STORE], "readwrite");
        const store = transaction.objectStore(LOCAL_WARBANDS_STORE);

        // Primeiro busca o documento existente para manter outras propriedades
        const getRequest = store.get(id);
        getRequest.onsuccess = () => {
          const existing = getRequest.result || {};
          const now = new Date().toISOString();

          // IMPORTANTE: Mantém o source existente se não for especificado
          const finalSource = source || existing.source || "local";

          console.log("[saveLocalWarband] Dados recebidos:", {
            dataVault: data.vault?.length || 0,
            dataFigures: data.figures?.length || 0,
            existingVault: existing.vault?.length || 0,
            existingFigures: existing.figures?.length || 0,
          });

          // Constrói o objeto raiz completo (FULL OBJECT) a ser salvo
          // Garante que os dados principais vêm do parâmetro data, não de existing
          // Atualiza updateLog: adiciona timestamp desta escrita para apoiar PWA/sync
          const prevLog: string[] = Array.isArray(existing.updateLog)
            ? existing.updateLog
            : [];
          const nextLog: string[] = [...prevLog, now];

          const toSave: LocalWarbandData = {
            id,
            name: data.name !== undefined ? data.name : (existing.name ?? ""),
            faction:
              data.faction !== undefined
                ? data.faction
                : (existing.faction ?? ""),
            notes:
              data.notes !== undefined ? data.notes : (existing.notes ?? ""),
            gold: data.gold !== undefined ? data.gold : (existing.gold ?? "0"),
            wyrdstone:
              data.wyrdstone !== undefined
                ? data.wyrdstone
                : (existing.wyrdstone ?? "0"),
            vault:
              data.vault !== undefined ? data.vault : (existing.vault ?? []),
            figures:
              data.figures !== undefined
                ? data.figures
                : (existing.figures ?? []),
            updatedAt: now, // SEMPRE atualiza updatedAt no IndexedDB (como estava antes)
            source: finalSource, // Mantém source existente se não especificado
            // Preserva apenas campos específicos de metadados
            firestoreUpdatedAt:
              existing.firestoreUpdatedAt ||
              (finalSource === "user" ? now : undefined),
            initialCrowns: existing.initialCrowns,
            createdAt: existing.createdAt,
            updateLog: nextLog,
            userId:
              finalSource === "user"
                ? (userId ?? existing.userId ?? null)
                : (existing.userId ?? null),
          };

          console.log("[saveLocalWarband] Salvando no IndexedDB:", {
            id,
            source,
            updatedAt: toSave.updatedAt,
            figuresCount: (toSave.figures || []).length,
            vaultCount: (toSave.vault || []).length,
            hasVault: !!toSave.vault,
            hasFigures: !!toSave.figures,
          });

          const putRequest = store.put(toSave);
          putRequest.onsuccess = async () => {
            console.log(
              "[saveLocalWarband] ✅ Salvamento concluído no IndexedDB!"
            );

            // Se userId foi fornecido, também salva no Firestore
            if (userId && source === "user") {
              try {
                const { saveWarbandToFirestore } = await import(
                  "./firestore.helpers"
                );
                const { stripUndefinedDeep } = await import(
                  "./firestore.helpers"
                );

                // Prepara dados para Firestore (sem campos específicos do IndexedDB)
                const firestorePayload = stripUndefinedDeep({
                  name: toSave.name,
                  faction: toSave.faction,
                  notes: toSave.notes,
                  gold: toSave.gold,
                  wyrdstone: toSave.wyrdstone,
                  vault: toSave.vault,
                  figures: toSave.figures,
                  initialCrowns: toSave.initialCrowns,
                  createdAt: toSave.createdAt,
                });

                await saveWarbandToFirestore(userId, id, firestorePayload);
                console.log("[saveLocalWarband] ✅ Também salvo no Firestore!");
              } catch (firestoreError) {
                console.error(
                  "[saveLocalWarband] ⚠️ Erro ao salvar no Firestore (continua mesmo assim):",
                  firestoreError
                );
                // Não rejeita a promise - IndexedDB foi salvo com sucesso
              }
            }

            resolve();

            // Lê o objeto do banco DEPOIS de salvar para confirmar que foi persistido
            // Usa uma NOVA transação para garantir que os dados foram commitados
            setTimeout(async () => {
              try {
                const verifyDb = await openWarbandDB();
                const verifyTransaction = verifyDb.transaction(
                  [LOCAL_WARBANDS_STORE],
                  "readonly"
                );
                const verifyStore =
                  verifyTransaction.objectStore(LOCAL_WARBANDS_STORE);
                const verifyRequest = verifyStore.get(id);

                verifyRequest.onsuccess = () => {
                  const savedData = verifyRequest.result;

                  // FULL OBJECT - Este é o objeto raiz completo EXATAMENTE como está no IndexedDB
                  // Sem transformações, sem deep clone - o objeto direto do banco
                  console.log(
                    "[saveLocalWarband] 📦 FULL OBJECT (OBJETO EXATO DO INDEXEDDB):",
                    savedData
                  );

                  // Também mostra como JSON string para ver a estrutura completa
                  console.log(
                    "[saveLocalWarband] 📦 FULL OBJECT (JSON):",
                    JSON.stringify(savedData, null, 2)
                  );
                };

                verifyRequest.onerror = () => {
                  console.error(
                    "[saveLocalWarband] ❌ Erro ao ler objeto do banco:",
                    verifyRequest.error
                  );
                };
              } catch (e) {
                console.error(
                  "[saveLocalWarband] ❌ Erro ao abrir transação de verificação:",
                  e
                );
              }
            }, 100); // Pequeno delay para garantir que a transação foi commitada
          };
          putRequest.onerror = () => {
            console.error(
              "[saveLocalWarband] ❌ Erro ao salvar:",
              putRequest.error
            );
            reject(putRequest.error);
          };
        };
        getRequest.onerror = () => reject(getRequest.error);
      });
    } catch (error) {
      console.error("Erro ao salvar bando local:", error);
      throw error;
    }
  });
}

/**
 * Remove um bando do IndexedDB
 */
export async function deleteLocalWarband(id: string): Promise<void> {
  try {
    const db = await openWarbandDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([LOCAL_WARBANDS_STORE], "readwrite");
      const store = transaction.objectStore(LOCAL_WARBANDS_STORE);
      const request = store.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error("Erro ao deletar bando local:", error);
    throw error;
  }
}
