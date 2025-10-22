import MobileLayout from "../../components/MobileLayout";
import MobileText from "../../components/MobileText";
import MobileHeroHeader from "../../components/MobileHeroHeader";
import CollapsibleSection from "../../components/CollapsibleSection";
import UnitCard from "../../components/UnitCard";
import PowerCard from "../../components/PowerCard";
import slugify from "slugify";
import { useRef } from "react";
import headerImage from "../../assets/header-art/21ef8615dda8ffc145957aff5273c244_upscayl_4x_high-fidelity-4x.png";

const sistersUnits = [
  {
    name: "Matriarca Sigmarita",
    role: "Heroína",
    stats: {
      move: 14,
      fight: "+3",
      shoot: "+0",
      armour: 10,
      will: "+4",
      health: 16,
      cost: "-",
    },
    spellAffinity: {
      aligned0: ["Orações de Sigmar"],
    },
    abilities: [
      {
        name: "Sacerdotiza",
        description:
          "A Matriarca Sigmarita é uma sacerdotisa e tem uma seleção limitada de magias, mais difíceis de conjurar que a média. No entanto, pode conjurar enquanto usa armadura ou escudo e em combate. Ela começa com 3 magias das Orações de Sigmar.",
      },
      {
        name: "Equipamento Disponível",
        weapons: [
          "Adaga",
          "Arma de Concussão",
          "Martelo de Guerra Sigmarita",
          "Chicote de Aço",
          "Arma de Duas Mãos",
          "Funda",
        ],
        armor: ["Armadura Leve", "Armadura Pesada", "Escudo"],
        special: [
          "Pode comprar Água Benta sem fazer rolagens de Mercado Negro",
        ],
      },
    ],
  },
  {
    name: "Áugure",
    role: "Campeã",
    stats: {
      move: 14,
      fight: "+1",
      shoot: "-",
      armour: 10,
      will: "+4",
      health: 14,
      cost: "100 coroas",
    },
    abilities: [
      {
        name: "Poderes",
        description:
          "A Áugure começa com 3 poderes da lista de Palavras de Sigmar. Um desses poderes tem classe de dificuldade 3. Os outros poderes têm classe de dificuldade 5.",
      },
      {
        name: "Visão Sagrada",
        description:
          "A Áugure tem a característica Visão Verdadeira. Ela pode usar sua Visão Sagrada para evitar problemas ao explorar. Ela pode rolar sua rolagem de exploração duas vezes e escolher o resultado.",
      },
      {
        name: "Equipamento Disponível",
        weapons: [
          "Adaga",
          "Arma de Concussão",
          "Martelo de Guerra Sigmarita",
          "Chicote de Aço",
          "Arma de Duas Mãos",
          "Funda",
        ],
        armor: [],
        special: [
          "Pode comprar Água Benta sem fazer rolagens de Mercado Negro",
        ],
      },
    ],
  },
  {
    name: "Noviças",
    stats: {
      move: 14,
      fight: "0",
      shoot: "0",
      armour: 10,
      will: "+3",
      health: 10,
      cost: "free",
    },
    abilities: [
      {
        name: "Equipamento Disponível",
        weapons: [
          "Adaga",
          "Arma de Concussão",
          "Martelo de Guerra Sigmarita",
          "Chicote de Aço",
          "Arma de Duas Mãos",
          "Funda",
        ],
        armor: ["Armadura Leve", "Armadura Pesada", "Escudo"],
        special: [
          "Pode comprar Água Benta sem fazer rolagens de Mercado Negro",
        ],
      },
    ],
  },
  {
    name: "Irmã Hospitalária",
    stats: {
      move: 14,
      fight: "+1",
      shoot: "0",
      armour: 10,
      will: "+3",
      health: 12,
      cost: "75gp",
    },
    abilities: [
      {
        name: "Equipamento Disponível",
        weapons: [
          "Adaga",
          "Arma de Concussão",
          "Martelo de Guerra Sigmarita",
          "Chicote de Aço",
          "Arma de Duas Mãos",
          "Funda",
        ],
        armor: ["Armadura Leve", "Armadura Pesada", "Escudo"],
        special: [
          "Pode comprar Água Benta sem fazer rolagens de Mercado Negro",
        ],
      },
    ],
  },
  {
    name: "Irmã Proclamadora",
    stats: {
      move: 14,
      fight: "0",
      shoot: "0",
      armour: 10,
      will: "+5",
      health: 12,
      cost: "100gp",
    },
    abilities: [
      {
        name: "Proclamação do Deus-Rei	",
        description:
          "Qualquer figura aliada dentro de 14cm e linha de visão desta figura ganha +1 de Vontade. A figura tem apenas 3 espaços de equipamento e sempre tem uma mão ocupada pela Liturgia de Sigmar, que é impérvia a efeitos de destruição de equipamento.",
      },
      {
        name: "Equipamento Disponível",
        weapons: [
          "Adaga",
          "Arma de Concussão",
          "Martelo de Guerra Sigmarita",
          "Chicote de Aço",
          "Arma de Duas Mãos",
          "Funda",
        ],
        armor: ["Armadura Leve", "Armadura Pesada", "Escudo"],
        special: [
          "Pode comprar Água Benta sem fazer rolagens de Mercado Negro",
        ],
      },
    ],
  },
  {
    name: "Irmã Sigmarita",
    stats: {
      move: 12,
      fight: "+3",
      shoot: "0",
      armour: 10,
      will: "+3",
      health: 12,
      cost: "75 coroas",
    },
    abilities: [
      {
        name: "Equipamento Disponível",
        weapons: [
          "Adaga",
          "Arma de Concussão",
          "Martelo de Guerra Sigmarita",
          "Chicote de Aço",
          "Arma de Duas Mãos",
          "Funda",
        ],
        armor: ["Armadura Leve", "Armadura Pesada", "Escudo"],
        special: [
          "Pode comprar Água Benta sem fazer rolagens de Mercado Negro",
        ],
      },
    ],
  },
  {
    name: "Sister Superior",
    stats: {
      move: 12,
      fight: "+3",
      shoot: "0",
      armour: 10,
      will: "+3",
      health: 14,
      cost: "100 coroas",
    },
    abilities: [
      {
        name: "Destruidora dos Impuros",
        description:
          "A Irmã Superior tem +1 de Ataque e +1 de Dano contra figuras com os traços Daemonio e Morto-Vivo, e seus ataques contam como sagrados (contam como mágicos, mas ignoram a resistência mágica) contra tais alvos.",
      },
      {
        name: "Equipamento Disponível",
        weapons: [
          "Adaga",
          "Arma de Concussão",
          "Martelo de Guerra Sigmarita",
          "Chicote de Aço",
          "Arma de Duas Mãos",
          "Funda",
        ],
        armor: ["Armadura Leve", "Armadura Pesada", "Escudo"],
        special: [
          "Pode comprar Água Benta sem fazer rolagens de Mercado Negro",
        ],
      },
    ],
  },
];

const wordsOfSigmar = [
  {
    name: "Palavra da Repreensãp",
    when: `Sempre que uma magia é lançada contra a Áugure ou qualquer Irmã dentro de 8cm da Áugure.`,
    effect:
      "A magia automaticamente falha, sem fazer rolagem de conjuração, e a ação do conjurador é perdida.",
  },
  {
    name: "Palavra da Sabedoria",
    when: "Em qualquer ponto durante a ativação da Áugure.",
    effect: `Coloca um marcador de Sabedoria próximo a uma Irmã dentro de 12cm da Áugure.`,
  },
  {
    name: "Palavra da Proteção Justa",
    when: `Sempre que a Áugure ou qualquer Irmã dentro de 8cm da Áugure recebe pelo menos 5 de dano.`,
    effect:
      "Reduz esse dano em 5. Se o dano for reduzido para 0, qualquer efeito especial desse ataque também é negado.",
  },
  {
    name: "Palavra da Consolação",
    when: `Sempre que a Áugure ou qualquer Irmã dentro de 8cm da Áugure faz uma rolagem de Vontade.`,
    effect: "Adiciona imediatamente +5 à rolagem de Vontade.",
  },
  {
    name: "Palavra do Vigor Vingativo",
    when: "Antes do início do jogo.",
    effect:
      "A Áugure recupera  3 pontos de Vigor, e qualquer marcador negativo (Sangramento, Reverberação e etc) é removido.",
  },
  {
    name: "Palavra do Bastião",
    when: "Em qualquer ponto durante a ativação da Áugure ou qualquer Irmã dentro de 8cm da Áugure é movida por uma força externa.",
    effect:
      "A Áugure or a Irmã alvo pode escolher não mover, ou mover qualquer distância até a quantidade normal especificada pela força externa.",
  },
  {
    name: "Palavra do Guerreiro Ungido",
    when: `Em qualquer ponto durante a ativação da Áugure.`,
    effect: `Para o resto do turno, a Áugure ou uma Irmã dentro de 12cm da Áugure conta como se estivesse armado com uma arma mágica que dá +2 de Ímpeto, e causa dano sagrado (conta como mágicos, mas ignora a resistência mágica) contra figuras com as características Daemônio e Morto-Vivo	. Se a Áugure já estiver usando uma arma mágica ou superior, este efeito substitui qualquer bônus de Ímpeto daquela arma, embora os bônus de dano e outras habilidades especiais sejam mantidos.`,
  },
  {
    name: "Palavra do Ira Sagrada",
    when: `Quando a Áugure ou qualquer Irmã dentro de 8cm da Áugure vence um combate e causa dano.`,
    effect:
      "Esse ataque ganha Penetração de Armadura(4). Se a arma usada foi um Martelo de Guerra Sigmarita, ele sempre causará o efeito da característica Concussão, independente de quanto dano foi causado.",
  },
  {
    name: "Palavra do Destino Selado",
    when: `Sempre que a Áugure ou qualquer Irmã dentro de 8cm da Áugure falha em uma rolagem de dados com um resultado natural de 1.`,
    effect:
      "Rola novamente a rolagem falhada, mas lança dois dados em vez de um e escolhe o resultado mais alto. Se um 1 for rolado novamente, a figura que rerolou recebe 10 de dano. Nenhum poder ou efeito pode reduzir esse dano.",
  },
  {
    name: "Palavra da Prosperidade",
    when: "Fora do jogo, quando a bando rola para seus tesouros.",
    effect:
      "O poder deve ser ativado durante a fase de Conjurar Rituais da sequencia pós jogo. O Bando pode rolar dois dados e escolher qual deles manter quando rolar na tabela de Venda de Pedra-Bruxa. Se rolar 1 em ambos os dados, a rolagem é perdida e nada é ganho pela venda do fragmento.",
  },
  {
    name: "Palavra da Visão Celestial",
    when: "Em qualquer ponto durante a ativação da Áugure.",
    effect: `Uma Irmã dentro de 30cm da Áugure ganha a característica Visão Verdadeira até o primeiro momento em que ela luta ou faz um ataque a distância ou até o final do turno, o que acontecer primeiro.`,
  },
  {
    name: "Palavra do Sangue Tempestuoso",
    when: "No início da ativação da Áugure, antes de qualquer ação ser tomada.",
    effect:
      "Qualquer Irmã que ativarem junto a Áugure ganha Resistência Elemental(5) até o primeiro ataque elementar que ela recebe ou até o final do turno, o que acontecer primeiro.",
  },
];

function SistersOfSigmarPage() {
  const tableOfContents = [
    {
      id: "unidades",
      label: "Unidades",
      type: "Section",
      ref: useRef(null),
    },
    {
      id: "palavras",
      label: "Palavras de Sigmar",
      type: "Section",
      ref: useRef(null),
    },
  ];

  return (
    <>
      <MobileHeroHeader imageUrl={headerImage} title="Irmãs de Sigmar" />

      <MobileLayout
        title="Irmãs de Sigmar — Guerreiras da Fé"
        backButtonPath="/warbands"
        tableOfContents={tableOfContents}
      >
        <br />

        <MobileText className="mb-4">
          As Irmãs de Sigmar são uma ordem religiosa dedicada ao Deus-Rei
          Sigmar, composta por mulheres guerreiras que dedicaram suas vidas à
          proteção da fé e à purificação das forças do Caos. Estas devotas
          combatentes combinam fervor religioso com habilidade marcial, criando
          uma força formidável de purificação e proteção.
        </MobileText>

        <MobileText className="mb-4">
          Lideradas por Matriarcas Sigmaritas e Áugures, estes bandos são
          construídos em torno da fé como escudo e do destino como arma. Suas
          Palavras de Sigmar canalizam a autoridade divina em bênçãos diretas,
          proteções e punições, transformando a voz divina na ponte entre o
          mortal e o sagrado.
        </MobileText>

        <MobileText className="mb-4">
          Com sua ênfase em proteção, rerrolagens e empoderamento situacional,
          as Irmãs de Sigmar resistem mais tempo, atacam mais forte e resistem
          às forças da corrupção através da força de sua fé inabalável.
        </MobileText>

        <span
          id="unidades"
          ref={tableOfContents.find((item) => item.id === "unidades")?.ref}
        />
        <CollapsibleSection title="Unidades" id="unidades">
          <div className="space-y-4">
            {sistersUnits.map((unit, index) => (
              <div key={index} id={slugify(unit.name, { lower: true })}>
                <CollapsibleSection
                  title={unit.role ? `${unit.name} (${unit.role})` : unit.name}
                  defaultExpanded={true}
                >
                  <UnitCard
                    name={unit.name}
                    role={unit.role}
                    stats={unit.stats}
                    abilities={unit.abilities}
                    {...(unit.spellAffinity && {
                      spellAffinity: unit.spellAffinity,
                    })}
                  />
                </CollapsibleSection>
              </div>
            ))}
          </div>
        </CollapsibleSection>

        <span
          id="palavras"
          ref={tableOfContents.find((item) => item.id === "palavras")?.ref}
        />
        <CollapsibleSection title="Palavras de Sigmar" id="palavras">
          <div className="space-y-4">
            {wordsOfSigmar.map((power, index) => (
              <div key={index} id={slugify(power.name, { lower: true })}>
                <PowerCard
                  name={power.name}
                  when={power.when}
                  effect={power.effect}
                />
              </div>
            ))}
          </div>
        </CollapsibleSection>
      </MobileLayout>
    </>
  );
}

export default SistersOfSigmarPage;
