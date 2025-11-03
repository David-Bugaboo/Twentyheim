/**
 * Template/Helper para migrar páginas de warband para usar hooks
 * 
 * Padrão a seguir:
 * 
 * 1. Substituir imports:
 *    import warbandData from "./data/warband.data.json";
 *    Por:
 *    import { useJsonData } from "../../../hooks/useJsonData";
 *    import { getStaticImport } from "../../../data/jsonFileMap";
 *    import { createWarbandNavigationSections } from "../../../utils/navigationSections";
 * 
 * 2. Adicionar useMemo para staticImport:
 *    const staticImportFn = React.useMemo(
 *      () => () => getStaticImport("file-id")(),
 *      []
 *    );
 * 
 * 3. Carregar dados:
 *    const { data: warbandData, loading } = useJsonData({
 *      fileId: "file-id",
 *      staticImport: staticImportFn,
 *    });
 * 
 * 4. Criar navigationSections:
 *    const navigationSections = useMemo(() => {
 *      const baseSections = [
 *        { id: "introducao", title: "Introdução", level: 0 },
 *        { id: "estrutura-do-bando", title: "Estrutura do Bando", level: 0 },
 *      ];
 *      return createWarbandNavigationSections(warbandData, baseSections);
 *    }, [warbandData]);
 * 
 * 5. Extrair unidades com proteção:
 *    const leader = useMemo(() => {
 *      if (!warbandData || !Array.isArray(warbandData)) return undefined;
 *      return warbandData.find((unit) => unit.role === "Líder");
 *    }, [warbandData]);
 * 
 * 6. Adicionar loading ao QuickNavigation:
 *    <QuickNavigation sections={navigationSections} loading={loading} />
 * 
 * 7. Adicionar verificações de loading nas renderizações:
 *    {loading ? (
 *      <MobileText>Carregando...</MobileText>
 *    ) : leader ? (
 *      <UnitCard ... />
 *    ) : (
 *      <MobileText>Nenhum líder encontrado</MobileText>
 *    )}
 */

// Este arquivo é apenas documentação/helper, não precisa exportar nada

