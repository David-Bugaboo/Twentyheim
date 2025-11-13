/*import React, { useMemo } from "react";
import { useJsonData } from "../../../hooks/useJsonData";
import { getStaticImport } from "../../../data/jsonFileMap";
import { createWarbandNavigationSections } from "../../../utils/navigationSections";
import QuickNavigation from "../../../components/QuickNavigation";
import MobileSection from "../../../components/MobileSection";
import HeaderH1 from "../../../components/HeaderH1";
import MobileText from "../../../components/MobileText";
import UnitCard from "../../../components/UnitCard";
import PageTitle from "../../../components/PageTitle";

interface Unit {
  id: string;
  name: string;
  role?: string;
  quantity?: string;
  lore?: string;
  stats: {
    move: number;
    fight: string;
    shoot: string;
    armour: number;
    Vontade: string;
    health: number;
    cost: string;
    skills?: string[];
  };
  spellAffinity?: {
    aligned0?: string[];
    aligned2?: string[];
  };
  abilities: Array<{
    name: string;
    description: string;
  }>;
  equipment?: {
    "hand-to-hand"?: Array<{ name: string; cost: string }>;
    ranged?: Array<{ name: string; cost: string }>;
    armor?: Array<{ name: string; cost: string }>;
    miscellaneous?: Array<{ name: string; cost: string }>;
    modifiers?: Array<{ name: string; cost: string }>;
  };
}

const DwarfTreasureHuntersPage: React.FC = () => {
  // Carrega dados via hook (Firestore -> IndexedDB -> Static)
  const staticImportFn = React.useMemo(
    () => () => getStaticImport("dwarf-treasure-hunters")(),
    []
  );

  const { data: dwarfTreasureHuntersData, loading } = useJsonData({
    fileId: "dwarf-treasure-hunters",
    staticImport: staticImportFn,
  });

  // Cria as seções de navegação de forma segura
  const navigationSections = useMemo(() => {
    const baseSections = [
    { id: "introducao", title: "Introdução", level: 0 },
    { id: "estrutura-do-bando", title: "Estrutura do Bando", level: 0 },
    ];

    return createWarbandNavigationSections(
      dwarfTreasureHuntersData as Unit[] | null | undefined,
      baseSections
    );
  }, [dwarfTreasureHuntersData]);

  // Extrai unidades de forma segura (com fallback para array vazio)
  const leader = useMemo(() => {
    if (!dwarfTreasureHuntersData || !Array.isArray(dwarfTreasureHuntersData))
      return undefined;
    return dwarfTreasureHuntersData.find(unit => unit.role === "Líder") as
      | Unit
      | undefined;
  }, [dwarfTreasureHuntersData]);

  const heroes = useMemo(() => {
    if (!dwarfTreasureHuntersData || !Array.isArray(dwarfTreasureHuntersData))
      return [];
    return dwarfTreasureHuntersData.filter(
      unit => unit.role === "Herói"
    ) as Unit[];
  }, [dwarfTreasureHuntersData]);

  const soldiers = useMemo(() => {
    if (!dwarfTreasureHuntersData || !Array.isArray(dwarfTreasureHuntersData))
      return [];
    return dwarfTreasureHuntersData.filter(unit => !unit.role) as Unit[];
  }, [dwarfTreasureHuntersData]);

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <QuickNavigation sections={navigationSections} loading={loading} />
          <PageTitle>Caçadores de Tesouros Anões</PageTitle>
          <MobileSection id="introducao">
            <MobileText>
              Ocasionalmente, um nobre anão se encontrará em tempos
              desesperados. Seu domínio familiar pode ter sido invadido por
              Goblins ou Skaven, ou ele pode de alguma forma ter se desonrado e
              sido banido. Outros anões conhecem esses guerreiros como os
              Despossuídos. Os anões são uma raça orgulhosa e é contra a
              natureza de um anão se perder no desespero. Em vez disso, um nobre
              que se encontra em tal situação desesperadora reunirá um grupo de
              seus amigos mais próximos e parentes e irá caçar tesouros,
              esperando acumular um tesouro grande o suficiente para estabelecer
              seu próprio domínio. Neste momento, a maior fonte de riqueza no
              Mundo Conhecido é rumorejada ser uma cidade no Império. A cidade é
              conhecida como Mordheim...
            </MobileText>
          </MobileSection>

          <MobileSection id="estrutura-do-bando">
            <HeaderH1 id="estrutura-do-bando">Estrutura do Bando</HeaderH1>
            <MobileText>
              Um bando anão deve incluir um mínimo de 3 modelos. Você tem 500
              coroas que pode usar para recrutar e equipar seu bando. O número
              máximo de guerreiros no bando é 12.
            </MobileText>
            <MobileText>
              • <strong>Nobre:</strong> Cada bando anão deve ter um Nobre – nem
              mais, nem menos!
              <br />• <strong>Engenheiro:</strong> Seu bando pode incluir até 1
              Engenheiro.
              <br />• <strong>Mata-Trolls:</strong> Seu bando pode incluir até 2
              Mata-Trolls.
              <br />• <strong>Irmãos de Clã:</strong> Seu bando pode incluir
              qualquer número de Irmãos de Clã.
              <br />• <strong>Fuzileiro Anão:</strong> Seu bando pode incluir
              até 5 Fuzileiros Anões.
              <br />• <strong>Barbas Curtas:</strong> Seu bando pode incluir
              qualquer número de Barbas Curtas.
            </MobileText>
          </MobileSection>

          <MobileSection id="lider">
            <HeaderH1 id="lider">Líder</HeaderH1>
            {loading ? (
              <MobileText>Carregando...</MobileText>
            ) : leader ? (
              <UnitCard
                id={leader.id}
                name={leader.name}
                role={leader.role}
                quantity={leader.quantity}
                lore={leader.lore}
                qualidade={(leader as any).qualidade || 0}
                stats={leader.stats}
                spellAffinity={leader.spellAffinity}
                abilities={leader.abilities}
                equipment={leader.equipment}
              />
            ) : (
              <MobileText>Nenhum líder encontrado</MobileText>
            )}
          </MobileSection>

          <MobileSection id="herois">
            <HeaderH1 id="herois">Heróis</HeaderH1>
            {loading ? (
              <MobileText>Carregando...</MobileText>
            ) : heroes.length > 0 ? (
              heroes.map(hero => (
              <UnitCard
                key={hero.id}
                id={hero.id}
                name={hero.name}
                role={hero.role}
                quantity={hero.quantity}
                lore={hero.lore}
                qualidade={(hero as any).qualidade || 0}
                stats={hero.stats}
                spellAffinity={hero.spellAffinity}
                abilities={hero.abilities}
                equipment={hero.equipment}
              />
              ))
            ) : (
              <MobileText>Nenhum herói encontrado</MobileText>
            )}
          </MobileSection>

          <MobileSection id="soldados">
            <HeaderH1 id="soldados">Soldados</HeaderH1>
            {loading ? (
              <MobileText>Carregando...</MobileText>
            ) : soldiers.length > 0 ? (
              soldiers.map(soldier => (
              <UnitCard
                key={soldier.id}
                id={soldier.id}
                name={soldier.name}
                quantity={soldier.quantity}
                lore={soldier.lore}
                qualidade={(soldier as any).qualidade || 0}
                stats={soldier.stats}
                abilities={soldier.abilities}
                equipment={soldier.equipment}
              />
              ))
            ) : (
              <MobileText>Nenhum soldado encontrado</MobileText>
            )}
          </MobileSection>
        </div>
      </div>
    </div>
  );
};

export default DwarfTreasureHuntersPage; */
