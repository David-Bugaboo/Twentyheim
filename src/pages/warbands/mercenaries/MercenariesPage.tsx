import React, { useState } from "react";
import mercenariesData from "./data/mercenaries.data.json";
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

interface Region {
  id: string;
  name: string;
  lore: string;
  specialRules: string[];
  restrictions?: string[];
}

const MercenariesPage: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(
    "reikland"
  );

  const leader = mercenariesData.find((unit) => unit.role === "Líder") as Unit;
  const heroes = mercenariesData.filter(
    (unit) => unit.role === "Herói"
  ) as Unit[];
  const soldiers = mercenariesData.filter((unit) => !unit.role) as Unit[];

  // Filtrar unidades baseado na região selecionada
  const getFilteredUnits = () => {
    if (!selectedRegion) {
      // Sem região selecionada: mostra todas as unidades exceto as especiais
      const filteredHeroes = heroes.filter(
        (hero) => hero.name !== "Sacerdote Lupino de Ulric"
      );
      const filteredSoldiers = soldiers.filter(
        (soldier) => soldier.name !== "Cão de Guerra"
      );
      return { leader, heroes: filteredHeroes, soldiers: filteredSoldiers };
    }

    let filteredHeroes = heroes;
    let filteredSoldiers = soldiers;

    // Regras especiais por região
    if (selectedRegion === "middenheim") {
      // Middenheim: Mantém Sacerdote Lupino de Ulric (já está na lista de heróis)
      // Remove Cães de Guerra se estiverem na lista
      filteredSoldiers = soldiers.filter(
        (soldier) => soldier.name !== "Cão de Guerra"
      );
    } else if (selectedRegion === "ostermark") {
      // Ostermark: Adiciona Cães de Guerra, remove Sacerdote se estiver
      filteredHeroes = heroes.filter(
        (hero) => hero.name !== "Sacerdote Lupino de Ulric"
      );
      const caesDeGuerra = mercenariesData.find(
        (unit) => unit.name === "Cão de Guerra"
      ) as Unit;
      if (caesDeGuerra) {
        filteredSoldiers.push(caesDeGuerra);
      }
    } else {
      // Outras regiões: remove unidades especiais
      filteredHeroes = heroes.filter(
        (hero) => hero.name !== "Sacerdote Lupino de Ulric"
      );
      filteredSoldiers = soldiers.filter(
        (soldier) => soldier.name !== "Cão de Guerra"
      );
    }

    return { leader, heroes: filteredHeroes, soldiers: filteredSoldiers };
  };

  const {
    leader: filteredLeader,
    heroes: filteredHeroes,
    soldiers: filteredSoldiers,
  } = getFilteredUnits();

  // Placeholder para as regiões - será preenchido com as regras específicas
  const regions: Region[] = [
    {
      id: "reikland",
      name: "Reikland",
      lore: "Reikland fica no coração do Império e sua maior cidade é Altdorf, lar do Grande Teogonista e sede do Templo de Sigmar. Os reiklanders são devotos seguidores de Sigmar, o fundador, primeiro Imperador e deus patrono do Império. O Grão-Príncipe de Reikland (como Siegfried, o governante de Reikland, se intitula) é apoiado em sua reivindicação ao trono pelo Grande Teogonista e é mais fortemente oposto pelo Conde de Middenheim e pelos Sacerdotes de Ulric.",
      specialRules: [
        "Orgulho do Grão-Príncipe: O Capitão Mercenário pode ativar até criaturas a 12cm dele, ao invés do normal 3 criaturas a 8cm. O Sargento pode ativar até 2 criaturas a 12cm dele, ao invés do normal 1 criatura a 8cm.",
        "Treinamento de Atirador: Os Atiradores começam com Precisão +1.",
      ],
    },
    {
      id: "middenheim",
      name: "Middenheim",
      lore: "Middenheim fica no topo de uma montanha cercada por floresta escura no centro de Middenland, e também é conhecida como a Cidade do Lobo Branco, em homenagem a Ulric, o antigo deus dos lobos e do inverno. O Sacerdócio de Ulric ainda é forte em Middenheim, onde Ulric é venerado como patrono da cidade. A tradição de rivalidade entre Middenheim e Reikland remonta a centenas de anos, e o Conde de Middenheim, Mannfred Todbringer, é um dos principais pretendentes ao trono do Imperador.",
      specialRules: [
        "Força Selvagem: O Capitão Mercenário de um bando de Mercenários de Middenheim tem  +1 de Ímpeto.",
        "Culto do Lobo: Um bando de Mercenários de Middenheim não tem a opção de contratar um sargento. Ao invés disso podem contratar um Sacerdote Lupino de Ulric.",
      ],
    },
    {
      id: "marienburg",
      name: "Marienburg",
      lore: "Marienburg é a maior e mais próspera cidade comercial do Velho Mundo. Muitos a chamam de Cidade do Ouro, o que por si só transmite uma boa ideia da riqueza desta cidade cosmopolita em expansão. Em nenhum outro lugar pode ser encontrada a vasta gama de lojas vendendo mercadorias de lugares tão distantes quanto os reinos élficos de Ulthuan no oeste e a distante Cathay no leste. Os artesãos da cidade representam toda habilidade conhecida pelo homem, e algumas outras além, de modo que se diz que em Marienburg não há atividade que não possa ser rapidamente transformada em lucro.",
      specialRules: [
        "Patrocinador: Para refletir o patrocínio que recebem de grandes mercados, os bandos de Marienburg começam com 100 coroas adicionais para montar seu bando.",
        "Contatos Mercantis: Um bando de Mercenários de Marienburg tem importantes conexões no mundo do comércio. Eles ganham +3 em rolagens para encontrar itens raros.",
      ],
    },
    {
      id: "ostermark",
      name: "Ostermark",
      lore: "Os ostermarkers estão acostumados a uma vida dura, lutando sozinhos para defender suas fazendas contra mercenários e criminosos. Seus anos de isolamento e autossuficiência os tornaram guerreiros resistentes e como tal, eles não desistem facilmente ou hesitam diante de inimigos em maior número.",
      specialRules: [
        "Tenacidade: O Capitão Mercenário e o sargento ganham +1 de Vontade e +2 de Vida Máxima.",
        "Fazendeiros: Um bando de Mercenários de Ostermark pode contratar Cães de Guerra.",
      ],
    },
  ];

  const navigationSections = [
    { id: "introducao", title: "Introdução", level: 0 },
    { id: "estrutura-do-bando", title: "Estrutura do Bando", level: 0 },
    { id: "regioes", title: "Regiões e Regras Especiais", level: 0 },
    {
      id: "lider",
      title: "Líder",
      level: 0,
      children: filteredLeader
        ? [{ id: filteredLeader.id, title: filteredLeader.name, level: 1 }]
        : [],
    },
    {
      id: "herois",
      title: "Heróis",
      level: 0,
      children: filteredHeroes.map((hero) => ({
        id: hero.id,
        title: hero.name,
        level: 1,
      })),
    },
    {
      id: "soldados",
      title: "Soldados",
      level: 0,
      children: filteredSoldiers.map((soldier) => ({
        id: soldier.id,
        title: soldier.name,
        level: 1,
      })),
    },
  ];

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <QuickNavigation sections={navigationSections} />

          <MobileSection id="introducao">
            <PageTitle>Mercenários</PageTitle>
            <MobileText>
              Nobres, mercadores e o próprio Templo de Sigmar oferecem ricas
              recompensas por fragmentos da misteriosa Pedra-Bruxa. Entre os
              principais patronos dos guerreiros mercenários estão o
              Grão-Príncipe de Reikland, o Conde de Middenheim, Lady Magritta de
              Marienburg – favorita das guildas mercantis e as Ligas
              Coletivistas de Ostenmark.
            </MobileText>
          </MobileSection>

          <MobileSection id="estrutura-do-bando">
            <HeaderH1 id="estrutura-do-bando">Estrutura do Bando</HeaderH1>
            <MobileText>
              • <strong>Capitão Mercenário:</strong> Cada bando mercenário deve
              ter um Capitão – nem mais, nem menos!
              <br />• <strong>Sargento:</strong> Seu bando pode incluir até 2
              Sargentos.
              <br />• <strong>Sacerdote Lupino de Ulric:</strong> Seu bando pode
              incluir até 1 Sacerdote (apenas em Middenheim).
              <br />• <strong>Recruta:</strong> Seu bando pode incluir até 2
              Recrutas.
              <br />• <strong>Soldados:</strong> Seu bando pode incluir de 1 a 5
              Soldados.
              <br />• <strong>Atiradores:</strong> Seu bando pode incluir até 7
              Atiradores.
              <br />• <strong>Espadachim:</strong> Seu bando pode incluir até 5
              Espadachins.
              <br />• <strong>Cão de Guerra:</strong> Seu bando pode incluir até
              5 Cães de Guerra.
            </MobileText>
          </MobileSection>

          <MobileSection id="regioes">
            <HeaderH1 id="regioes">Regiões e Regras Especiais</HeaderH1>
            <MobileText>
              Cada região do Império produz mercenários com características
              únicas. Escolha sua região de origem para determinar as regras
              especiais e restrições do seu bando.
            </MobileText>

            {/* Botões de seleção de região */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2 mb-4">
                <button
                  onClick={() => setSelectedRegion(null)}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    selectedRegion === null
                      ? "bg-green-600 border-green-500 text-white"
                      : "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  Todas as Regiões
                </button>
                {regions.map((region) => (
                  <button
                    key={region.id}
                    onClick={() => setSelectedRegion(region.id)}
                    className={`px-4 py-2 rounded-lg border transition-colors ${
                      selectedRegion === region.id
                        ? "bg-green-600 border-green-500 text-white"
                        : "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    {region.name}
                  </button>
                ))}
              </div>
              {selectedRegion && (
                <div className="bg-green-900/20 border border-green-600 rounded-lg p-4 mb-4">
                  <MobileText className="text-green-200">
                    <strong>Região Selecionada:</strong>{" "}
                    {regions.find((r) => r.id === selectedRegion)?.name}
                  </MobileText>
                </div>
              )}
            </div>

            {selectedRegion
              ? (() => {
                  const region = regions.find((r) => r.id === selectedRegion);
                  return region ? (
                    <div className="mb-8">
                      <HeaderH2>{region.name}</HeaderH2>
                      <div className="bg-[#1a1a1a] p-6 rounded-lg border border-gray-700 mb-4">
                        <MobileText className="mb-4">{region.lore}</MobileText>

                        <div className="mb-4">
                          <h4 className="text-lg font-bold text-green-400 mb-2">
                            Regras Especiais:
                          </h4>
                          <ul className="list-disc list-inside space-y-1">
                            {region.specialRules.map((rule, index) => (
                              <li key={index} className="text-gray-300">
                                {rule}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {region.restrictions &&
                          region.restrictions.length > 0 && (
                            <div>
                              <h4 className="text-lg font-bold text-red-400 mb-2">
                                Restrições:
                              </h4>
                              <ul className="list-disc list-inside space-y-1">
                                {region.restrictions.map(
                                  (restriction, index) => (
                                    <li key={index} className="text-gray-300">
                                      {restriction}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          )}
                      </div>
                    </div>
                  ) : null;
                })()
              : regions.map((region: Region) => (
                  <div key={region.id} className="mb-8">
                    <HeaderH2>{region.name}</HeaderH2>
                    <div className="bg-[#1a1a1a] p-6 rounded-lg border border-gray-700 mb-4">
                      <MobileText className="mb-4">{region.lore}</MobileText>

                      <div className="mb-4">
                        <h4 className="text-lg font-bold text-green-400 mb-2">
                          Regras Especiais:
                        </h4>
                        <ul className="list-disc list-inside space-y-1">
                          {region.specialRules.map((rule, index) => (
                            <li key={index} className="text-gray-300">
                              {rule}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {region.restrictions &&
                        region.restrictions.length > 0 && (
                          <div>
                            <h4 className="text-lg font-bold text-red-400 mb-2">
                              Restrições:
                            </h4>
                            <ul className="list-disc list-inside space-y-1">
                              {region.restrictions.map((restriction, index) => (
                                <li key={index} className="text-gray-300">
                                  {restriction}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                    </div>
                  </div>
                ))}
          </MobileSection>

          <MobileSection id="lider">
            <HeaderH1 id="lider">Líder</HeaderH1>
            {filteredLeader && (
              <UnitCard
                id={filteredLeader.id}
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
            )}
          </MobileSection>

          <MobileSection id="herois">
            <HeaderH1 id="herois">Heróis</HeaderH1>
            {filteredHeroes.map((hero) => (
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
            ))}
          </MobileSection>

          <MobileSection id="soldados">
            <HeaderH1 id="soldados">Soldados</HeaderH1>
            {filteredSoldiers.map((soldier) => (
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
            ))}
          </MobileSection>
        </div>
      </div>
    </div>
  );
};

export default MercenariesPage;
