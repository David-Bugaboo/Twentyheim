import { useEffect, useState } from "react";
import { collection, getDocs, query, limit } from "firebase/firestore";
import { db } from "../firebase";
import { migrateStaticDataToFirestore } from "./useJsonData";
import { ALL_FILES } from "../pages/admin/MigrateDataPage";

const MIGRATION_CHECK_KEY = "twentyheim-migration-checked";

/**
 * Hook para verificar e migrar automaticamente os dados na primeira carga
 * Verifica se já existe dados no Firestore, se não existir, migra automaticamente
 */
export function useAutoMigrate(enabled: boolean = true) {
  const [migrating, setMigrating] = useState(false);
  const [migrationStatus, setMigrationStatus] = useState<"checking" | "needed" | "done" | "error">("checking");

  useEffect(() => {
    if (!enabled) return;

    // Evita múltiplas tentativas na mesma sessão
    if (sessionStorage.getItem(MIGRATION_CHECK_KEY) === "true") {
      setMigrationStatus("done");
      return;
    }

    async function checkAndMigrate() {
      try {
        setMigrationStatus("checking");

        // Verifica se já existe pelo menos um documento na coleção admin-data
        const adminDataRef = collection(db, "admin-data");
        const snapshot = await getDocs(query(adminDataRef, limit(1)));

        if (snapshot.empty) {
          // Não existe nenhum dado, precisa migrar
          setMigrationStatus("needed");
          setMigrating(true);

          console.log("🔄 Migração automática iniciada...");
          
          // Migra todos os arquivos
          const results = await migrateStaticDataToFirestore(ALL_FILES);

          const successCount = results.filter((r) => r.success).length;
          const failCount = results.length - successCount;

          if (successCount > 0) {
            console.log(`✅ Migração concluída! ${successCount} sucessos, ${failCount} falhas.`);
            setMigrationStatus("done");
            sessionStorage.setItem(MIGRATION_CHECK_KEY, "true");
          } else {
            console.error("❌ Migração falhou completamente");
            setMigrationStatus("error");
          }
        } else {
          // Já existe dados, não precisa migrar
          setMigrationStatus("done");
          sessionStorage.setItem(MIGRATION_CHECK_KEY, "true");
        }
      } catch (error) {
        console.error("Erro ao verificar/migrar dados:", error);
        setMigrationStatus("error");
      } finally {
        setMigrating(false);
      }
    }

    // Delay pequeno para não bloquear o carregamento inicial
    const timer = setTimeout(checkAndMigrate, 1000);
    return () => clearTimeout(timer);
  }, [enabled]);

  return { migrating, migrationStatus };
}

