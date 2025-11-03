import React, { useMemo } from "react";
import { useJsonData } from "../../../hooks/useJsonData";
import { getStaticImport } from "../../../data/jsonFileMap";
import { createWarbandNavigationSections } from "../../../utils/navigationSections";
import QuickNavigation from "../../../components/QuickNavigation";
import MobileSection from "../../../components/MobileSection";
import HeaderH1 from "../../../components/HeaderH1";
import HeaderH2 from "../../../components/HeaderH2";
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
    move: number | string;
    fight: string;
    shoot: string;
    armour: number | string;
    Vontade: string;
    health: number | string;
    cost: string;
    quantity?: string;
    skills?: string[];
    startingXp?: number;
    strength?: string | number;
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

interface Blessing {
  id: string;
  name: string;
  cost: string;
  description: string;
}

const CarnivalOfChaosPage: React.FC = () => {
  // Carrega dados via hook (Firestore -> IndexedDB -> Static)
  const staticImportFn = React.useMemo(
    () => () => getStaticImport("carnival-of-chaos")(),
    []
  );

  const { data: carnivalData, loading: loadingUnits } = useJsonData({
    fileId: "carnival-of-chaos",
    staticImport: staticImportFn,
  });

  // Carrega bênçãos de Nurgle via hook (Firestore -> IndexedDB -> Static)
  const blessingsStaticImportFn = React.useMemo(
    () => () => getStaticImport("carnival-blessings")(),
    []
  );

  const { data: blessingsOfNurgle, loading: loadingBlessings } = useJsonData({
    fileId: "carnival-blessings",
    staticImport: blessingsStaticImportFn,
  });

  const loading = loadingUnits || loadingBlessings;

  const blessings = (blessingsOfNurgle || []) as Blessing[];

  // Cria as seções de navegação de forma segura
  const navigationSections = useMemo(() => {
    const baseSections = [
    { id: "introducao", title: "Introdução", level: 0 },
    { id: "estrutura-do-bando", title: "Estrutura do Bando", level: 0 },
      { id: "regras-especiais", title: "Regras Especiais", level: 0 },
    ];
    
    const warbandSections = createWarbandNavigationSections(
      carnivalData as Unit[] | null | undefined,
      baseSections
    );

    // Adiciona seção de bênçãos
    const blessingsSection = {
      id: "bencaos-de-nurgle",
      title: "Bençãos de Nurgle",
      level: 0,
      children: blessings.map((blessing, index) => ({
        id: blessing.id || `blessing-${index}`,
        title: blessing.name,
        level: 1,
      })),
    };

    // Atualiza título de soldados
    const soldiersSection = warbandSections.find(s => s.id === "soldados");
    if (soldiersSection) {
      soldiersSection.title = "Soldados & Entidades";
    }

    // Insere bênçãos antes de "lider" ou no final
    const leaderIndex = warbandSections.findIndex(s => s.id === "lider");
    if (leaderIndex >= 0) {
      warbandSections.splice(leaderIndex, 0, blessingsSection);
    } else {
      warbandSections.push(blessingsSection);
    }

    return warbandSections;
  }, [carnivalData, blessings]);

  // Extrai unidades de forma segura (com fallback para array vazio)
  const leader = useMemo(() => {
    if (!carnivalData || !Array.isArray(carnivalData)) return undefined;
    return carnivalData.find((unit) => unit.role === "Líder") as Unit | undefined;
  }, [carnivalData]);

  const heroes = useMemo(() => {
    if (!carnivalData || !Array.isArray(carnivalData)) return [];
    return carnivalData.filter((unit) => unit.role === "Herói") as Unit[];
  }, [carnivalData]);

  const soldiers = useMemo(() => {
    if (!carnivalData || !Array.isArray(carnivalData)) return [];
    return carnivalData.filter((unit) => !unit.role) as Unit[];
  }, [carnivalData]);

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <QuickNavigation sections={navigationSections} loading={loading} />

          <MobileSection id="introducao">
            <PageTitle>Circo do Caos</PageTitle>
            <MobileText>
              Ninguém sabe de onde veio o temido Circo do Caos. Alguns dizem que
              teria sido, em tempos antigos, uma caravana de ciganos do leste do
              Império, um povo itinerante que levava sua arte colorida de aldeia
              em aldeia. Se isso foi verdade no passado, o presente é muito mais
              sinistro e letal: ainda vaga pelos ermos do Império como um
              cortejo multicolorido de carroças, seus artistas vestidos com o
              luxo espalhafatoso de trupes itinerantes, levando versos e canções
              aos camponeses excitados.
            </MobileText>
            <MobileText>
              Ao chegar a um novo povoado, os saltimbancos erguem seu palco e
              encantam o povo com canções e peças sobre os dias sombrios do
              Império. Halterofilistas executam façanhas de força, malabaristas
              jogam bolas, facas e tochas flamejantes, enquanto o palhaço salta
              entre a plateia com sua bexiga de porco inflada, rindo e zombando.
            </MobileText>
            <MobileText>
              Apenas quando o espetáculo atinge o clímax blasfemo, com o sol se
              pondo, a verdade é revelada em toda sua glória pútrida: não são
              meros artistas, mas daemônios ciclópicos, com carne podre pendendo
              de ossos amarelados. As máscaras e maquiagens se mostram rostos
              verdadeiros, cobertos de pústulas e lesões variolentas. A alegria
              vira terror — e a matança começa.
            </MobileText>
          </MobileSection>

          <MobileSection id="estrutura-do-bando">
            <HeaderH1>Estrutura do Bando</HeaderH1>
            <MobileText>
              Um bando do Circo do Caos deve incluir ao menos 3 modelos e pode
              ter até 15. Você tem 500 coroas de ouro para recrutar seu bando
              inicial.
            </MobileText>
            <MobileText>
              - <strong>Mestre de Cerimônias:</strong> um bando deve ter apenas
              1 Mestre de Cerimônias, nem mais nem menos.
              <br />- <strong>Brutamontes:</strong> até 2.
              <br />- <strong>Apodrecidos:</strong> até 2.
              <br />- <strong>Enfermos:</strong> até 2.
              <br />- <strong>Cultistas:</strong> qualquer número.
              <br />- <strong>Nurguinhos:</strong> qualquer número.
            </MobileText>
          </MobileSection>

          <MobileSection id="bencaos-de-nurgle">
            <HeaderH1>Bençãos de Nurgle</HeaderH1>
            <MobileText className="mb-3">
              Escolhas de bençãos disponíveis para Apodrecidos e outros
              seguidores de Nurgle deste bando.
            </MobileText>
            <MobileText className="mb-3">
              Aqueles que cultuam o fétido altar do Senhor da Decadência sofrem
              de terríveis doenças e putrefação — dons conhecidos como as
              <strong> Bençãos de Nurgle</strong>.
            </MobileText>
            <MobileText className="mb-3">
              <strong>Elegibilidade e momento de compra:</strong> Bençãos de
              Nurgle podem ser compradas apenas para{" "}
              <strong>Apodrecidos</strong>, e somente no momento em que são{" "}
              <strong>contratados</strong>. Não é permitido comprar novas
              Bençãos para um modelo após a contratação.
            </MobileText>
            <MobileText className="mb-3">
              <strong>Quantidade:</strong> qualquer Apodrecido pode possuir
              <strong> uma ou mais</strong> Bençãos.
            </MobileText>
            <MobileText className="mb-4">
              <strong>Custo cumulativo:</strong> a <strong>primeira</strong>
              Benção é comprada pelo <strong>preço indicado</strong>; a
              <strong> segunda</strong> e as <strong>subsequentes</strong>
              custam <strong>o dobro</strong> do valor listado.
            </MobileText>

            <div className="space-y-6">
              {loading ? (
                <MobileText>Carregando bênçãos...</MobileText>
              ) : blessings.length > 0 ? (
                blessings.map((blessing, index) => (
                <div
                  key={blessing.id}
                  id={`blessing-${index}`}
                  className="bg-green-900/20 border border-green-500/40 rounded-lg p-4"
                >
                  <HeaderH2 className="text-green-300 mb-2">
                    {blessing.name}
                  </HeaderH2>
                  <div className="mb-3">
                    <div className="text-green-400 font-bold text-sm mb-1">
                      Custo: {blessing.cost}
                    </div>
                  </div>
                  <div>
                    <div className="text-green-400 font-bold text-sm mb-1">
                      Descrição:
                    </div>
                    <div className="text-white text-sm">
                      {blessing.description}
                    </div>
                  </div>
                </div>
              ))
              ) : (
                <MobileText>Nenhuma bênção encontrada</MobileText>
              )}
            </div>
          </MobileSection>

          <MobileSection id="regras-especiais">
            <HeaderH1>Regras Especiais</HeaderH1>
            <MobileText>
              <strong>Reputação Miserável:</strong> devido à sua natureza
              pestilenta, um bando do Circo do Caos nunca pode contratar
              mercenários.
            </MobileText>
            <MobileText>
              <strong>Maculados:</strong> o Circo do Caos conta como um bando de
              Culto dos Possuídos para propósitos de exploração e ferimentos
              graves.
            </MobileText>
          </MobileSection>

          <MobileSection id="lider">
            <HeaderH1>Líder</HeaderH1>
            {loading ? (
              <MobileText>Carregando...</MobileText>
            ) : leader ? (
              <UnitCard
                id={leader.id}
                name={leader.name}
                role={leader.role}
                lore={leader.lore}
                qualidade={(leader as any).qualidade || 0}
                stats={leader.stats}
                abilities={leader.abilities}
                equipment={leader.equipment}
                spellAffinity={leader.spellAffinity}
              />
            ) : (
              <MobileText>Nenhum líder encontrado</MobileText>
            )}
          </MobileSection>

          <MobileSection id="herois">
            <HeaderH1>Heróis</HeaderH1>
            {loading ? (
              <MobileText>Carregando...</MobileText>
            ) : heroes.length > 0 ? (
              heroes.map((hero) => (
              <UnitCard
                key={hero.id}
                id={hero.id}
                name={hero.name}
                role={hero.role}
                lore={hero.lore}
                qualidade={(hero as any).qualidade || 0}
                stats={hero.stats}
                abilities={hero.abilities}
                equipment={hero.equipment}
                spellAffinity={hero.spellAffinity}
              />
              ))
            ) : (
              <MobileText>Nenhum herói encontrado</MobileText>
            )}
          </MobileSection>

          <MobileSection id="soldados">
            <HeaderH1>Soldados & Entidades</HeaderH1>
            {loading ? (
              <MobileText>Carregando...</MobileText>
            ) : soldiers.length > 0 ? (
              soldiers.map((unit) => (
              <UnitCard
                key={unit.id}
                id={unit.id}
                name={unit.name}
                lore={unit.lore}
                qualidade={(unit as any).qualidade || 0}
                stats={unit.stats}
                abilities={unit.abilities}
                equipment={unit.equipment}
                spellAffinity={unit.spellAffinity}
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

export default CarnivalOfChaosPage;
