import React, { useMemo } from "react";
import { useJsonData } from "../../../hooks/useJsonData";
import { getStaticImport } from "../../../data/jsonFileMap";
import { createWarbandNavigationSections } from "../../../utils/navigationSections";
import MobileSection from "../../../components/MobileSection";
import HeaderH1 from "../../../components/HeaderH1";
import HeaderH2 from "../../../components/HeaderH2";
import MobileText from "../../../components/MobileText";
import UnitCard from "../../../components/UnitCard";
import QuickNavigation from "../../../components/QuickNavigation";
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
    armour: number | string;
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
    description?: string;
    weapons?: string[];
    armor?: string[];
    special?: string[];
  }>;
  equipment: any;
}

interface Mutation {
  id: string;
  name: string;
  description: string;
  cost: string;
}

export default function CultOfThePossessedPage() {
  // Carrega dados via hook (Firestore -> IndexedDB -> Static)
  const staticImportFn = React.useMemo(
    () => () => getStaticImport("cult-of-the-possessed")(),
    []
  );

  const { data: cultData, loading: loadingUnits } = useJsonData({
    fileId: "cult-of-the-possessed",
    staticImport: staticImportFn,
  });

  // Carrega mutações via hook (Firestore -> IndexedDB -> Static)
  const mutationsStaticImportFn = React.useMemo(
    () => () => getStaticImport("cult-mutations")(),
    []
  );

  const { data: mutationsData, loading: loadingMutations } = useJsonData({
    fileId: "cult-mutations",
    staticImport: mutationsStaticImportFn,
  });

  const loading = loadingUnits || loadingMutations;

  const units = (cultData || []) as Unit[];
  const mutations = (mutationsData || []) as Mutation[];

  // Separate units by role
  const leader = useMemo(() => {
    if (!units || !Array.isArray(units)) return undefined;
    return units.find((unit) => unit.role === "Líder");
  }, [units]);

  const heroes = useMemo(() => {
    if (!units || !Array.isArray(units)) return [];
    return units.filter((unit) => unit.role === "Herói");
  }, [units]);

  const soldiers = useMemo(() => {
    if (!units || !Array.isArray(units)) return [];
    return units.filter((unit) => !unit.role || unit.role === "Soldado");
  }, [units]);

  // Navigation sections
  const navigationSections = useMemo(() => {
    const baseSections = [
    { id: "introducao", title: "Introdução", level: 0 },
    { id: "estrutura-bando", title: "Estrutura do Bando", level: 0 },
    ];
    
    const warbandSections = createWarbandNavigationSections(
      units,
      baseSections
    );

    // Adiciona seção de mutações
    return [
      ...warbandSections,
    {
      id: "mutacoes",
      title: "Mutações",
      level: 0,
      children: mutations.map((mutation, index) => ({
          id: mutation.id || `mutation-${index}`,
        title: mutation.name,
        level: 1,
      })),
    },
  ];
  }, [units, mutations]);

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <PageTitle>Culto dos Possuídos</PageTitle>

          <MobileSection id="introducao">
            <MobileText>
              No rescaldo da destruição de Mordheim, todo tipo de mutante
              surgiu. Enquanto muitos que até então eram imaculados sentem o
              despertar de poderes estranhos, os primeiros sinais de dons
              destinados a levá-los a uma morte ardente nas mãos dos Caçadores
              de Bruxas.
            </MobileText>

            <MobileText>
              Agora um líder apareceu, um novo Imperador das Trevas, que
              reivindica a soberania da Cidade dos Condenados. Ele é chamado de
              Senhor das Sombras ou Mestre dos Possuídos. Seguidores dos Cultos
              do Caos se reúnem de todo o Império para jurar suas almas a ele.
              Embora ninguém saiba se ele é homem ou Daemônio, todos o proclamam
              seu salvador e ansiosamente buscam por realizar seus comandos.
            </MobileText>

            <MobileText>
              Como todos os estudantes das artes sombrias sabem, é pelo poder da
              magia que figuras como Daemônios e espíritos são capazes de
              alcançar o mundo mortal. A Pedra-bruxa que prolifera em Mordheim
              concede vida sobrenatural a muitas coisas vis que por todos os
              direitos naturais nunca deveriam existir. Os Possuídos já foram
              homens, mas ao se renderem completamente aos deuses sombrios,
              permitiram que Daemônios possuíssem seus corpos e se tornaram um
              com eles.
            </MobileText>
            <MobileText>
              Com o poder dos Possuídos atrás deles, os seguidores do Senhor das
              Sombras se tornaram poderosos em Mordheim. No Massacre da Rua
              Prateada, o Culto dos Possuídos emboscou e destruiu uma grande
              força enviada para caçá-los. Agora as ruas de Mordheim pertencem
              ao Senhor das Sombras e seus servos.
            </MobileText>
          </MobileSection>

          <MobileSection id="estrutura-bando">
            <HeaderH1 id="estrutura-bando">Estrutura do Bando</HeaderH1>
            <MobileText>
              Um bando do Culto dos Possuídos deve incluir um mínimo de três
              modelos. Você tem 500 coroas de ouro para recrutar seu bando
              inicial. O número máximo de guerreiros no bando nunca pode exceder
              15.
            </MobileText>

            <MobileText>
              • <strong>Magistrado do Caos:</strong> Cada bando do Culto dos
              Possuídos deve ter um Magistrado do Caos: nem mais, nem menos!
              <br />• <strong>Possuído:</strong> Seu bando pode incluir até dois
              Possuídos (0-2).
              <br />• <strong>Mutante:</strong> Seu bando pode incluir até dois
              Mutantes (0-2).
              <br />• <strong>Cultistas:</strong> Seu bando pode incluir
              qualquer número de Cultistas (ilimitado).
              <br />• <strong>Alma Sombria:</strong> Seu bando pode incluir até
              cinco Almas Sombrias (0-5).
              <br />• <strong>Homem-Fera:</strong> Seu bando pode incluir até
              três Homens-Fera (0-3).
            </MobileText>
          </MobileSection>

          <MobileSection id="mutacoes">
            <HeaderH1 id="mutacoes">Mutações</HeaderH1>
            <MobileText>
              Aqueles que habitam Mordheim logo desenvolvem mutações horríveis,
              e o Culto dos Possuídos parece ser especialmente suscetível. Além
              disso, Mordheim atrai mutantes de todo o Império, que sempre são
              rápidos em se juntar aos covens do Caos. A maioria das mutações
              são simplesmente inconvenientes ou hediondas, mas algumas tornam
              seus portadores extremamente perigosos em combate.
            </MobileText>

            <MobileText>
              Mutações podem ser compradas para um Mutante ou Possuído apenas
              quando são recrutados; você não pode comprar novas mutações para
              um modelo após o recrutamento. Qualquer Mutante ou Possuído pode
              ter uma ou mais mutações. A primeira mutação é comprada pelo preço
              indicado, mas a segunda e mutações subsequentes compradas para o
              mesmo modelo custam o dobro.
            </MobileText>

            <div className="space-y-6">
              {loading ? (
                <MobileText>Carregando mutações...</MobileText>
              ) : mutations.length > 0 ? (
                mutations.map((mutation, index) => (
                <div
                  key={mutation.id}
                  id={`mutation-${index}`}
                  className="bg-green-900/20 border border-green-500/40 rounded-lg p-4"
                >
                  <HeaderH2 className="text-green-300 mb-2">
                    {mutation.name}
                  </HeaderH2>
                  <div className="mb-3">
                    <div className="text-green-400 font-bold text-sm mb-1">
                      Custo: {mutation.cost}
                    </div>
                  </div>
                  <div>
                    <div className="text-green-400 font-bold text-sm mb-1">
                      Descrição:
                    </div>
                    <div className="text-white text-sm">
                      {mutation.description}
                    </div>
                  </div>
                </div>
              ))
              ) : (
                <MobileText>Nenhuma mutação encontrada</MobileText>
              )}
            </div>
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
              heroes.map((hero) => (
              <div key={hero.id} id={hero.id}>
                <UnitCard
                  id={hero.id}
                  name={hero.name}
                  role={hero.role}
                  quantity={hero.quantity}
                  lore={hero.lore}
                  qualidade={(hero as any).qualidade || 0}
                  stats={hero.stats}
                  abilities={hero.abilities}
                  equipment={hero.equipment}
                />
              </div>
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
              soldiers.map((soldier) => (
              <div key={soldier.id} id={soldier.id}>
                <UnitCard
                  id={soldier.id}
                  name={soldier.name}
                  quantity={soldier.quantity}
                  lore={soldier.lore}
                  qualidade={(soldier as any).qualidade || 0}
                  stats={soldier.stats}
                  abilities={soldier.abilities}
                  equipment={soldier.equipment}
                />
              </div>
              ))
            ) : (
              <MobileText>Nenhum soldado encontrado</MobileText>
            )}
          </MobileSection>

          <MobileText
            variant="quote"
            className="text-center text-lg leading-relaxed mt-8"
          >
            "Não há poucos visões tão horríveis quanto um bando de culto.
            Guerreiros enlouquecidos manchados de sangue e sujeira brandem armas
            irregulares e cantam ritos blasfemos enquanto se lançam sobre seus
            inimigos."
          </MobileText>
        </div>
      </div>

      <QuickNavigation sections={navigationSections} loading={loading} />
    </div>
  );
}
