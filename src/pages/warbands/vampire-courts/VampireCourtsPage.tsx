import React, { useState, useMemo } from "react";
import { useJsonData } from "../../../hooks/useJsonData";
import { createWarbandNavigationSections } from "../../../utils/navigationSections";
import QuickNavigation from "../../../components/QuickNavigation";
import MobileSection from "../../../components/MobileSection";
import MobileText from "../../../components/MobileText";
import HeaderH1 from "../../../components/HeaderH1";
import HeaderH2 from "../../../components/HeaderH2";
import UnitCard from "../../../components/UnitCard";
import PageTitle from "../../../components/PageTitle";

interface Unit {
  id?: string;
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

interface Lineage {
  id: string;
  name: string;
  lore: string;
  specialRules: string[];
  restrictions?: string[];
}

const VampireCourtsPage: React.FC = () => {
  const [selectedLineage, setSelectedLineage] = useState<string | null>(
    "von-carstein"
  );

  // Mapeia linhagem -> fileId de dados
  const lineageToFileId: Record<string, string> = {
    "von-carstein": "vampire-courts-von-carstein",
    "blood-dragon": "vampire-courts-blood-dragon",
    necrarch: "vampire-courts-necrarch",
    lahmian: "vampire-courts-lahmia",
    strigoi: "vampire-courts-strigoi",
  };

  const currentFileId = useMemo(() => {
    return selectedLineage ? lineageToFileId[selectedLineage] : undefined;
  }, [selectedLineage]);

  // staticImport não é usado (carregamento apenas do Firestore)

  const {
    data: vampireCourtsData,
    loading,
    source,
  } = useJsonData({
    fileId: (currentFileId || "") as any,
    enabled: Boolean(currentFileId),
  });

  // Debug: qual fileId/source está carregando
  React.useEffect(() => {
    if ((import.meta as any)?.env?.DEV) {
      // eslint-disable-next-line no-console
      console.debug(
        "[VampireCourtsPage] fileId:",
        currentFileId,
        "source:",
        source,
        "items:",
        Array.isArray(vampireCourtsData) ? vampireCourtsData.length : 0
      );
    }
  }, [currentFileId, source, vampireCourtsData]);

  // Extrai unidades de forma segura (com fallback para array vazio)
  const leader = useMemo(() => {
    if (!vampireCourtsData || !Array.isArray(vampireCourtsData))
      return undefined;
    // Cada arquivo de linhagem define o líder com role "Líder"
    return vampireCourtsData.find(unit => unit.role === "Líder") as
      | Unit
      | undefined;
  }, [vampireCourtsData]);

  const heroes = useMemo(() => {
    if (!vampireCourtsData || !Array.isArray(vampireCourtsData)) return [];
    return vampireCourtsData.filter(
      unit => unit.role === "Herói" && unit.name !== "Conde Vampiro"
    ) as Unit[];
  }, [vampireCourtsData]);

  const soldiers = useMemo(() => {
    if (!vampireCourtsData || !Array.isArray(vampireCourtsData)) return [];
    return vampireCourtsData.filter(unit => !unit.role) as Unit[];
  }, [vampireCourtsData]);

  // Com dados já específicos da linhagem, apenas expõe leader/heroes/soldiers
  const getFilteredUnits = () => ({ leader, heroes, soldiers });

  // Filtrar unidades baseado na linhagem selecionada
  const {
    leader: filteredLeader,
    heroes: filteredHeroes,
    soldiers: filteredSoldiers,
  } = useMemo(
    () => getFilteredUnits(),
    [selectedLineage, leader, heroes, soldiers]
  );

  // Linhagens vampíricas (estáticas)
  const lineages: Lineage[] = [
    {
      id: "von-carstein",
      name: "Von Carstein",
      lore: "Os vampiros da linhagem Von Carstein são os vampiros fundadores. Esses monstros são os vampiros mais prevalentes dentro das fronteiras do Império. A maioria dos vampiros desta linhagem pode ser encontrada no escuro Condado de Sylvania, onde se diz que o próprio Conde-Votante é seu desumano e ancestral líder. Os vampiros da linha Von Carstein são notórios por sua arrogância e afetação, com gostos caros e maneiras impecáveis, mas são predadores absolutamente implacáveis. Os Von Carsteins ocasionalmente têm negócios com vampiros de outros clãs; os Necrarchs cujo conhecimento nas artes sombrias eles cobiçam e os Blood Dragons cujas habilidades marciais eles admiram. Eles são profundamente suspeitos da irmandade das Lahmians e mantêm os Strigoi com profundo desprezo, caçando-os se forem encontrados dentro das fronteiras de suas terras.",
      specialRules: [
        "Tirano Vampírico: Condes Von Carstein pode ativar 4 figuras a até 14cm de si, ao invés das normais 3 a 8cm.",
        "Nobres Servos: Escórias Von Carstein são mais leais e ganham +1 de Vontade devido ao treinamento aristocrático.",
        "Linhagem Nobre: Ganha acesso a lista de habilidades Von Carstein.",
      ],
    },
    {
      id: "blood-dragon",
      name: "Dragões Carmesim",
      lore: "Os vampiros Dragão Carmesim são supostamente descendentes do guerreiro ancestal Abhorash, Senhor do Sangue. Acima de todos os vampiros, estes são de longe os mais honrados e talvez os mais conectados com seu passado humano. Eles são renomados como guerreiros excepcionais e lutam com bravura e cavalheirismo surpreendentes. Os vampiros Dragão Carmesim são raros no Império, com a maioria de seu número vindo de Bretonnia e do quase Mítico Forte Sanguíneo, que se especula estar localizada em algum lugar nas Montanhas Cinzentas. Os Dragões Carmesim têm muito pouco a ver com os vampiros de outros clãs, pois permanecem desinteressados em suas disputas políticas e jogos de poder.",
      specialRules: [
        "Descendentes de Abhorash: Condes Dragão Carmesim começam com +1 em Ímpeto.",
        "Estandarte Carmesim: Condes Dragão Carmesim ganham +5 no primeiro teste de debandada falho no jogo.",
        "Duelista Honrado: Condes Dragão Carmesim devem sempre escolher permanencer em combate ao vencerem uma luta. Adicionalmente, não podem falhar voluntariamente no teste de debandada.",
        "Escudeiros Vampíricos: Escórias do bando de um Conde Dragão Carmesim são escudeiros vampíricos e começam com +1 de Ímpeto e +2 de vida máxima.",
        "Linhagem Marcial: Ganha acesso a lista de habilidades Dragão Carmesim.",
      ],
    },
    {
      id: "necrarch",
      name: "Necrarca",
      lore: "Os temidos Necrarcas são maliciosos e deformados, e mais do que qualquer outro vampiro, eles se assemelham aos mortos com uma aparência emaciada e cadavérica. Os Necrarcas são incompreensíveis até mesmo para seus próprios irmãos mortos-vivos e a maioria parece completamente insana. Sua loucura é temperada por seu gênio inegável e domínio da magia necromântica. Enquanto os vampiros de outras linhagens buscam domínio sobre os reinos dos homens, os Necrarcas aspiram ver o fim de todas as coisas vivas, tal é seu ódio por tudo. Os Necrarcas são por natureza solitários e frequentemente vivem profundamente no subsolo ou em torres isoladas onde podem praticar suas magias nefastas sem interrupção. Ocasionalmente, no entanto, eles emergem de seus lugares sombrios no mundo para reunir novas vítimas, conhecimento e, é claro, Pedra-Bruxa para seus experimentos. Os vampiros Necrarch têm uma antipatia mal contida por seus parentes de outros clãs, mas lidarão com eles ocasionalmente quando for do seu benefício fazê-lo.",
      specialRules: [
        "Constituição Fraca: Não pode usar habilidades, perdendo acesso a todas as listas, e seu Ímpeto é reduzido em 2. Só pode ser equipado com adagas, espadas, machados e maças. ",
        "Gênio Mágico: Se torna um conjurador da tradição da Necromancia, começando com uma magia dessa tradição.",
        "Ódio aos vivos: Não pode contratar nenhum mercenário, mesmo os que normalmente poderiam ser contratados por Cortes Vampíricas.",
        "Linhagem Arcana: Ganha acesso a lista de habilidades Necrarch.",
      ],
    },
    {
      id: "lahmian",
      name: "Lâmia",
      lore: "De todos os vampiros, a irmandade Lâmia Delfina segue a cultura e prática dos dias antigos mais de perto. A linhagem Lâmia  difere dos outros clãs vampíricos por ser composta quase exclusivamente por fêmeas. Esta irmandade é renomada por escolher apenas as mais belas dos mortais para se juntar às suas fileiras. Elas são lideradas pela própria rainha original das trevas, Neferata, do Culto do Sangue, que habita em algum lugar nas regiões setentrionais das Montanhas da Borda do Mundo em um lugar chamado Pico de Prata. Histórias do palácio da Rainha da Noite são contadas há séculos e podem ser encontradas nas baladas de Bretonnia, nos escritos do Império e nos poemas de Tilea. As Lâmias Delfinas competem com os Von Carsteins em sua trama para arrancar o controle do mundo dos homens, embora sejam muito mais sutis em seus métodos, preferindo infiltrar-se nos escalões superiores da sociedade do que usar força das armas. Elas têm grande talento para arte e estadismo, e suas personalidades poderosas mantêm um charme irresistível para mortais. A irmandade Lâmia Delfina sempre tentará manipular vampiros de outras famílias para seus próprios fins.",
      specialRules: [
        "Sem Treino Marcial: Condessas Lâmias tem seu Ímpeto reduzido em 1. Só podem ser equipadas com adagas, espadas, machados e maças, perdendo acesso a todas as outras armas e a armaduras pesadas e escudos.",
        "Charme Irresistível: Figuras a 8cm da Condessa Lâmia tem seu atributo Vontade reduzida em 2.",
        "Velocidade Sobrenatural: Condessas Lâmia tem 20 no atributo Movimento.",
        "Linhagem Sedutora: Ganha acesso a lista de habilidades Lâmia.",
      ],
    },
    {
      id: "strigoi",
      name: "Strigoi",
      lore: "Os vampiros Strigoi são conhecidos como os Amaldiçoados e são geralmente desprezados entre sua própria espécie. Há muito tempo na história desta linhagem, o pai desses vampiros foi amaldiçoado pelos outros vampiros e desde então existe um ódio sem fim entre eles. Os vampiros Strigoi são pouco mais que bestas - monstruosidades enormes, desajeitadas e cheias de ódio. Frequentemente, essas figuras solitárias fazem de cemitérios e necrotérios suas casas, onde matilhas de Carniçais devoradores de carne formam cortes grotescas ao redor deles. A maioria deles perdeu a mente em algum grau, mas ainda possuem os poderes inatos do vampiro e podem comandar os mortos-vivos. Os Strigoi constantemente são achados contemplando um tempo em que derrubarão o mundo dos homens e destruirão completamente seus parentes dos outros clãs.",
      specialRules: [
        "Bestas Selvagens: Condes Strigoi tem +1 de Ímpeto e um ataque natural que causa dano mágico e tem um modificador de dano de +2, mas perde o acesso a qualquer equipamento.",
        "Ódio absoluto: Um Conde Strigoi ganha a característica Ódio(Vivos).",
        "Corte dos Carniçais: Pode contratar um Atormentador por 50 coroas, que usa as estatísticas de um Carniçal, mas é um héroi, com acesso as listas de Força e Agilidade. Ele começa com 2 poderes dentre essas listas, com Classe de Dificuldade 5. O bando pode ter até 3 atormentadores. ",
        "Temido: Gasta 10 coroas a mais para contratar Necromantes e Escória. Não pode contratar mercenários, mesmo os que normalmente poderiam ser contratados por Cortes Vampíricas.",
        "Linhagem Bestial: Ganha acesso a lista de habilidades Strigoi.",
      ],
    },
  ];

  // Cria as seções de navegação de forma segura
  const navigationSections = useMemo(() => {
    const baseSections = [
      { id: "introducao", title: "Introdução", level: 0 },
      { id: "estrutura-do-bando", title: "Estrutura do Bando", level: 0 },
      { id: "linhagens", title: "Linhagens Vampíricas", level: 0 },
    ];

    const warbandSections = createWarbandNavigationSections(
      vampireCourtsData as Unit[] | null | undefined,
      baseSections
    );

    // Atualiza com unidades filtradas
    const leaderSection = warbandSections.find(s => s.id === "lider");
    if (leaderSection && filteredLeader) {
      leaderSection.children = [
        {
          id:
            filteredLeader.id ||
            filteredLeader.name.toLowerCase().replace(/\s+/g, "-"),
          title: filteredLeader.name,
          level: 1,
        },
      ];
    }

    const heroesSection = warbandSections.find(s => s.id === "herois");
    if (heroesSection) {
      heroesSection.children = filteredHeroes.map(hero => ({
        id: hero.id || hero.name.toLowerCase().replace(/\s+/g, "-"),
        title: hero.name,
        level: 1,
      }));
    }

    const soldiersSection = warbandSections.find(s => s.id === "soldados");
    if (soldiersSection) {
      soldiersSection.children = filteredSoldiers.map(soldier => ({
        id: soldier.id || soldier.name.toLowerCase().replace(/\s+/g, "-"),
        title: soldier.name,
        level: 1,
      }));
    }

    return warbandSections;
  }, [vampireCourtsData, filteredLeader, filteredHeroes, filteredSoldiers]);

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <QuickNavigation sections={navigationSections} loading={loading} />

          <MobileSection id="introducao">
            <PageTitle>Cortes Vampíricas</PageTitle>
            <MobileText>
              Os Cortes Vampíricos são bandos de vampiros e suas figuras servas
              que se aventuram em Mordheim em busca de poder, conhecimento e
              fragmentos de Pedra-Bruxa. Liderados por Condes Vampiros antigos e
              poderosos, esses bandos são compostos por necromantes, vampiros
              menores e figuras mortas-vivas reanimadas.
            </MobileText>
            <MobileText>
              Os vampiros são seres imortais que se alimentam do sangue dos
              vivos. Em Mordheim, eles veem uma oportunidade única de expandir
              seu poder e coletar fragmentos de Pedra-Bruxa para seus
              experimentos sombrios. Sua natureza Morto-Vivo os torna imunes a
              muitos efeitos que afetariam figuras vivas, mas também os torna
              vulneráveis a orações e símbolos sagrados.
            </MobileText>
            <MobileText>
              Os necromantes que servem aos vampiros são especialistas em magia
              da morte e necromancia. Eles podem reanimar os mortos e criar
              figuras servas para seus mestres vampiros. Sua magia é temida por
              todos que se opõem aos Cortes Vampíricos.
            </MobileText>
            <MobileText>
              As figuras servas dos vampiros incluem zumbis reanimados,
              carniçais vorazes e lobos atrozes. Essas figuras não têm vontade
              própria e servem apenas aos desejos de seus mestres vampiros,
              fazendo delas soldados ideais para missões perigosas em Mordheim.
            </MobileText>
          </MobileSection>

          <MobileSection id="estrutura-do-bando">
            <HeaderH1 id="estrutura-do-bando">Estrutura do Bando</HeaderH1>
            <MobileText>
              Um bando dos Cortes Vampíricos deve incluir um mínimo de 3
              modelos. Você tem 500 coroas que pode usar para recrutar e equipar
              seu bando. O número máximo de guerreiros no bando é 15.
            </MobileText>
            <MobileText>
              • <strong>Conde Vampiro:</strong> Cada bando deve ter um Conde
              Vampiro – nem mais, nem menos!
              <br />• <strong>Necromante:</strong> Seu bando pode incluir até 1
              Necromante.
              <br />• <strong>Escória:</strong> Seu bando pode incluir até 3
              Escórias.
              <br />• <strong>Zumbis:</strong> Seu bando pode incluir qualquer
              número de Zumbis.
              <br />• <strong>Carniçais:</strong> Seu bando pode incluir
              qualquer número de Carniçais.
              <br />• <strong>Lobos Atrozes:</strong> Seu bando pode incluir até
              5 Lobos Atrozes.
            </MobileText>
          </MobileSection>

          <MobileSection id="linhagens">
            <HeaderH1 id="linhagens">Linhagens Vampíricas</HeaderH1>
            <MobileText>
              Cada Corte Vampírico é liderado por uma linhagem específica de
              vampiros, cada uma com suas próprias tradições, poderes e
              objetivos. Escolha sua linhagem para determinar as regras
              especiais e restrições do seu bando.
            </MobileText>

            {/* Botões de seleção de linhagem */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2 mb-4 justify-center">
                {lineages.map(lineage => (
                  <button
                    key={lineage.id}
                    onClick={() => setSelectedLineage(lineage.id)}
                    className={`px-4 py-2 rounded-lg border transition-colors ${
                      selectedLineage === lineage.id
                        ? "bg-green-600 border-green-500 text-white"
                        : "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    {lineage.name}
                  </button>
                ))}
              </div>
              {selectedLineage && (
                <div className="bg-green-900/20 border border-green-600 rounded-lg p-4 mb-4">
                  <MobileText className="text-green-200">
                    <strong>Linhagem Selecionada:</strong>{" "}
                    {lineages.find(l => l.id === selectedLineage)?.name}
                  </MobileText>
                </div>
              )}
            </div>

            {selectedLineage
              ? (() => {
                  const lineage = lineages.find(l => l.id === selectedLineage);
                  return lineage ? (
                    <div className="mb-8">
                      <HeaderH2>{lineage.name}</HeaderH2>
                      <div className="bg-[#1a1a1a] p-6 rounded-lg border border-gray-700 mb-4">
                        <MobileText className="mb-4">{lineage.lore}</MobileText>
                        <div className="space-y-3">
                          <HeaderH2>Regras Especiais</HeaderH2>
                          {lineage.specialRules.map((rule, index) => (
                            <div
                              key={index}
                              className="bg-gray-800 p-3 rounded border-l-4 border-green-500"
                            >
                              <MobileText className="text-sm">
                                {rule}
                              </MobileText>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : null;
                })()
              : (() => (
                  <div className="grid gap-6 md:grid-cols-2">
                    {lineages.map(lineage => (
                      <div
                        key={lineage.id}
                        className="bg-[#1a1a1a] p-6 rounded-lg border border-gray-700 hover:border-green-500 transition-colors cursor-pointer"
                        onClick={() => setSelectedLineage(lineage.id)}
                      >
                        <HeaderH2 className="text-green-400 mb-3">
                          {lineage.name}
                        </HeaderH2>
                        <MobileText className="text-sm text-gray-300 mb-4">
                          {lineage.lore.substring(0, 150)}...
                        </MobileText>
                        <div className="text-xs text-gray-400">
                          {lineage.specialRules.length} regras especiais
                        </div>
                      </div>
                    ))}
                  </div>
                ))()}
          </MobileSection>

          <MobileSection id="lider">
            <HeaderH1 id="lider">Líder</HeaderH1>
            {loading ? (
              <MobileText>Carregando...</MobileText>
            ) : filteredLeader ? (
              <UnitCard
                id={
                  filteredLeader.id ||
                  filteredLeader.name.toLowerCase().replace(/\s+/g, "-")
                }
                name={filteredLeader.name}
                role={filteredLeader.role}
                quantity={filteredLeader.quantity}
                lore={filteredLeader.lore}
                qualidade={(filteredLeader as any).qualidade || 0}
                stats={filteredLeader.stats}
                spellAffinity={filteredLeader.spellAffinity}
                abilities={filteredLeader.abilities}
                equipment={filteredLeader.equipment}
              />
            ) : (
              <MobileText>Nenhum líder encontrado</MobileText>
            )}
          </MobileSection>

          <MobileSection id="herois">
            <HeaderH1 id="herois">Heróis</HeaderH1>
            {loading ? (
              <MobileText>Carregando...</MobileText>
            ) : filteredHeroes.length > 0 ? (
              filteredHeroes.map(hero => (
                <UnitCard
                  key={hero.name}
                  id={hero.id || hero.name.toLowerCase().replace(/\s+/g, "-")}
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
            ) : filteredSoldiers.length > 0 ? (
              filteredSoldiers.map(soldier => (
                <UnitCard
                  key={soldier.name}
                  id={
                    soldier.id ||
                    soldier.name.toLowerCase().replace(/\s+/g, "-")
                  }
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

export default VampireCourtsPage;
