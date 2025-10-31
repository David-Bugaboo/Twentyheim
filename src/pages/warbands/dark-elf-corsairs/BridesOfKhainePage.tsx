import MobileLayout from "../../../components/MobileLayout";
import MobileText from "../../../components/MobileText";
import MobileHeroHeader from "../../../components/MobileHeroHeader";
import CollapsibleSection from "../../../components/CollapsibleSection";
import UnitCard from "../../../components/UnitCard";
import PowerCard from "../../../components/PowerCard";
import slugify from "slugify";
import { useRef } from "react";
import headerImage from "../../assets/header-art/21ef8615dda8ffc145957aff5273c244_upscayl_4x_high-fidelity-4x.png";

const bridesUnits = [
  {
    name: "Rainha Bruxa",
    role: "Heroína",
    stats: {
      move: 20,
      fight: "+1",
      shoot: "0",
      armour: 9,
      Vontade: "+4",
      health: 14,
      cost: "-",
    },
    spellAffinity: {
      aligned0: ["Tradição das Sombras"],
    },
    abilities: [
      {
        name: "Conjurador",
        description:
          "A Rainha Bruxa é uma conjuradora da Tradição das Sombras. Ela começa com 8 magias, das quais 4 devem ser da Tradição das Sombras e uma de cada uma das tradições associadas.",
      },
      {
        name: "Elixir de Bruxa",
        description:
          "Enquanto a Rainha Bruxa estiver no campo de batalha, cada figura da guerra começa com um frasco de Elixir de Bruxa. Este frasco não consome um slot de item. Qualquer figura pode beber este frasco como uma ação livre para ganhar uma ação extra na sua próxima ativação, mas ganhar -2 de Vontade até o fim do jogo. Isso não pode levar uma figura a ter mais de 3 ações por turno.",
      },
      {
        name: "Equipamento Disponível",
        weapons: [
          "Adaga",
          "Machado",
          "Alabarda",
          "Espada",
          "Arma de Duas Mãos",
          "Cajado",
          "Adaga Sacrificial",
          "Besta",
          "Besta de Mão",
        ],
        armor: [],
        special: [],
      },
    ],
  },
  {
    name: "Rainha do Massacre",
    role: "Campeã",
    stats: {
      move: 20,
      fight: "+3",
      shoot: "0",
      armour: 9,
      Vontade: "+3",
      health: 14,
      cost: "100 coroas",
    },
    abilities: [
      {
        name: "Poderes",
        description:
          "A Rainha do Massacre pode usar poderes dos Sussurros da Dor. Ela começa o jogo com 5 poderes dessa lista. Um desses poderes tem um número de ativação de 3. Os outros têm um número de ativação de 5.",
      },
      {
        name: "Equipamento Disponível",
        weapons: [
          "Adaga",
          "Machado",
          "Alabarda",
          "Espada",
          "Arma de Duas Mãos",
          "Cajado",
          "Adaga Sacrificial",
          "Besta",
          "Besta de Mão",
        ],
        armor: ["Armadura Leve", "Escudo"],
        special: [],
      },
    ],
  },
  {
    name: "Irmã Sangrenta",
    stats: {
      move: 20,
      fight: "+2",
      shoot: "0",
      armour: 9,
      Vontade: "-1",
      health: 10,
      cost: "Free",
    },
    abilities: [
      {
        name: "Equipamento Disponível",
        weapons: [
          "Adaga",
          "Machado",
          "Alabarda",
          "Espada",
          "Arma de Duas Mãos",
          "Cajado",
          "Adaga Sacrificial",
        ],
        armor: ["Armadura Leve", "Escudo"],
        special: [],
      },
    ],
  },
  {
    name: "Elfa Bruxa",
    stats: {
      move: 20,
      fight: "+3",
      shoot: "0",
      armour: 10,
      Vontade: "0",
      health: 10,
      cost: "50 coroas",
    },
    abilities: [
      {
        name: "Equipamento Disponível",
        weapons: [
          "Adaga",
          "Machado",
          "Alabarda",
          "Espada",
          "Arma de Duas Mãos",
          "Cajado",
          "Adaga Sacrificial",
          "Chicote de Aço",
          "Besta de Mão",
        ],
        armor: ["Armadura Leve", "Escudo"],
        special: [],
      },
    ],
  },
  {
    name: "Beastmaster Sister",
    stats: {
      move: 20,
      fight: "0",
      shoot: "0",
      armour: 10,
      Vontade: "+1",
      health: 12,
      cost: "100coroas",
    },
    abilities: [
      {
        name: "Mestre das Bestas Frias",
        description: `Cada Irmã Domadora, no entanto, também traz um Besta-Gélida com ela. Este Besta-Gélida não pode pegar tesouro ou carregar itens. A Irmã Domadora só tem 3 espaços de itens.`,
      },
      {
        name: "Equipamento Disponível",
        weapons: [
          "Adaga",
          "Machado",
          "Alabarda",
          "Espada",
          "Arma de Duas Mãos",
          "Cajado",
          "Adaga Sacrificial",
          "Chicote de Aço",
          "Besta",
          "Besta de Mão",
        ],
        armor: ["Armadura Leve", "Escudo"],
        special: [],
      },
    ],
  },
  {
    name: "Esfoladora Khinerai",
    stats: {
      move: 15,
      fight: "+2",
      shoot: "0",
      armour: 9,
      Vontade: "+1",
      health: 12,
      cost: "125 coroas",
    },
    abilities: [
      {
        name: "Esfoladores Voadores",
        description:
          "As Esfoladoras Voadoras têm a característica Voador. Se a Esfoladora Khinerai se move e luta na mesma ativação, ela ganha +2 de Luta para essa ativação apenas. Ela não pode escolher permanencer em combate quando esta habilidade é usada.",
      },
      {
        name: "Equipamento",
        weapons: [
          "Adaga",
          "Machado",
          "Espada",
          "Adaga Sacrificial",
          "Arma de Arremesso",
        ],
        armor: [],
        special: [],
      },
    ],
  },
  {
    name: "Cold One Beasthound",
    stats: {
      move: 16,
      fight: "+1",
      shoot: "0",
      armour: 11,
      Vontade: "+2",
      health: 10,
      cost: "15 coroas",
    },
    abilities: [
      {
        name: "Predador Primitivo",
        description: "Bestas Gélidas tem a característica Saurídeo.",
      },
      {
        name: "Leadade Ferrenha",
        description:
          "Cbestas Gélidas que não ativam a até 15cm de uma Irmã Domadora agem como figuras neutras, até o fim do jogo. As Bestas Gélidas não podem se beneficiar da habilidade de Líder da Rainha Bruxa; sua única lealdade é à Irmã Domadora.",
      },
      {
        name: "Equipamento Disponível",
        weapons: [],
        armor: [],
        special: ["Bestas Gélidas lutam com suas mandíbulas saurídeas"],
      },
    ],
  },
];

const whispersOfPain = [
  {
    name: "Sussurro da Tortura",
    when: "Sempre que a Rainha do Massacre luta contra uma figura inimiga que sofreu pelo menos 1 dano.",
    effect:
      "A figura faz sua rolagem de luta com o atributo Vontade ao invés de Ímpeto.",
  },
  {
    name: "Sussurro do Açoite",
    when: "Em qualquer momento durante a ativação da Rainha do Massacre.",
    effect:
      "A Rainha do Massacre escolhe uma figura a até 15cm de si. Como uma ação, ela faz um teste contestado de ímpeto contra aquela figura. Se ela ganhar a rolagem, a figura é movida até 15cm em sua direção. Ela pode usar esse movimento para fazer a figura alvo entrar em contato de base com ela. Se ela faz isso, pode lutar com com sua ação restante, ganhando +2 de Ímpeto para essa ativação apenas.",
  },
  {
    name: "Sussurro da Toxina",
    when: "Em qualquer momento durante a ativação da Rainha do Massacre.",
    effect:
      "Durante essa ativação apenas, a Rainha do Massacre ganha a característica Venenoso.",
  },
  {
    name: "Sussurro da Sangria",
    when: "Sempre que a Rainha do Massacre ganha uma luta e causa pelo menos 1 dano.",
    effect:
      "A figura ganha um marcador de Sangramento. Se a figura já tiver um marcador de Sangramento, sofre 1 dano extra.",
  },
  {
    name: "Sussurro da Submissão",
    when: "Sempre que uma figura inimiga tenta completar uma carga contra a Rainha do Massacre.",
    effect:
      "Aquela figura deve fazer um teste de Vontade com CD 16 para completar sua carga. Se falhar, seu movimento termina a até 15cm da Rainha do Massacre e sua ativação termina. O Sussurro da Submissão não pode ser usado contra Heróis e Campeões.",
  },
  {
    name: "Sussurro do Esfolamento",
    when: "Sempre que a Rainha do Massacre ganha uma luta e causa pelo menos 1 dano.",
    effect:
      "A figura inimiga perde 1 de armadura até o fim do jogo. Este poder não pode levar uma figura a menos de 7 de armadura.",
  },
  {
    name: "Sussurro do Massacre",
    when: "Sempre que a Rainha do Massacre ganha uma luta e causa pelo menos 1 dano.",
    effect:
      "A Rainha do Massacre pode se mover imediatamente 15cm, incluindo saindo daquele combate. Esse movimento pode ser usado pra declarar uma carga. Se ela faz isso e completa a carga, ou permanece em combate com o alvo deste poder, ela ganha uma ação extra. Esta ação só pode ser uma ação de luta. Este poder não pode levar uma figura a mais de 3 ações.",
  },
  {
    name: "Sussuro do Desespero",
    when: "Em qualquer momento durante a ativação da Rainha do Massacre.",
    effect:
      "Escolha qualquer figura a até 15cm de si. Aquela figura deve fazer um teste de Vontade com CD 16. Se falhar, a figura perde sua próxima ativação. Heróis e Campeões recebem +5 no teste de Vontade.",
  },
  {
    name: "Sussurro da Punidão",
    when: "Sempre que uma figura se move a até 15cm da Rainha do Massacre, sem nenhuma figura entre elas.",
    effect:
      "A Rainha do Massacre pode forçar combate com a figura em movimento. Esta habilidade só pode ser usada contra uma figura com a qual a Rainha do Massacre normalmente teria permissão para forçar combate se estivesse a até 15cm. Nenhuma outra figura pode forçar combate com a figura alvo enquanto o Sussurro da Punição estiver em efeito.",
  },
  {
    name: "Sussurro da Euforia",
    when: "Em qualquer momento durante a ativação da Rainha do Massacre.",
    effect:
      "A Rainha do Massacre pode se mover através de terreno e figuras como se elas não estivessem lá até o fim da sua ativação. No entanto, ela não pode terminar seu movimento dentro de um pedaço de terreno ou figura. Se ela se move através de uma figura, essa figura sofre 2 dano. Uma figura pode sofrer esse dano apenas uma vez por turno.",
  },
  {
    name: "Sussurro da Sacrifício",
    when: "At any point during the Slaughter Queen activation.",
    effect:
      "A Rainha do Massacre ganha +2 de Dano e +2 de Movimento, mas seu vigor máximo é reduzido em 2 pontos durante essa ativação.",
  },
  {
    name: "Sussurro do Dilaceramento",
    when: "Sempre que a Rainha do Massacre ganha uma luta com uma rolagem natural de 18, 19 ou 20.",
    effect: "Trate este ataque como um Ataque Crítico.",
  },
];

function BridesOfKhainePage() {
  const tableOfContents = [
    {
      id: "unidades",
      label: "Unidades",
      type: "Section",
      ref: useRef(null),
    },
    {
      id: "whispers-of-pain",
      label: "Whispers of Pain",
      type: "Section",
      ref: useRef(null),
    },
  ];

  return (
    <>
      <MobileHeroHeader imageUrl={headerImage} title="Noivas de Khaine" />

      <MobileLayout
        title="Brides of Khaine — Filhas de Khaine"
        backButtonPath="/warbands"
        tableOfContents={tableOfContents}
      >
        <br />

        <MobileText className="mb-4">
          As Bruxas Élficas, também conhecidas como "Noivas de Khaine", são as
          guerreiras-cultistas femininas dos Elfos Negros que servem Khaine, o
          deus da guerra e do assassinato no Panteão Élfico.
        </MobileText>

        <MobileText className="mb-4">
          As Bruxas Élficas são as mais cruéis de todos os Elfos Negros, pois
          são as cultistas femininas que vivem apenas para servir às demandas
          malévolas de Khaine por sacrifícios sangrentos e agonizantes. Suas
          observâncias ao Senhor do Assassinato são assuntos ensopados de
          sangue.
        </MobileText>
        <MobileText className="mb-4">
          Uma vez que a batalha começa, as Bruxas Élficas se lançam contra seus
          inimigos, despedaçando-os com uma tempestade de lâminas envenenadas.
          Aqueles inimigos infelizes o suficiente para sobreviver a seus
          ferimentos são capturados pelas Bruxas Élficas no final da batalha.
        </MobileText>

        <span
          id="unidades"
          ref={tableOfContents.find((item) => item.id === "unidades")?.ref}
        />
        <CollapsibleSection title="Unidades" id="unidades">
          <div className="space-y-4">
            {bridesUnits.map((unit, index) => (
              <div key={index} id={slugify(unit.name, { lower: true })}>
                <CollapsibleSection
                  title={unit.role ? `${unit.name} (${unit.role})` : unit.name}
                  defaultExpanded={true}
                >
                  <UnitCard
                    name={unit.name}
                    role={unit.role}
                    qualidade={(unit as any).qualidade || 0}
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
          id="whispers-of-pain"
          ref={
            tableOfContents.find((item) => item.id === "whispers-of-pain")?.ref
          }
        />
        <CollapsibleSection title="Whispers of Pain" id="whispers-of-pain">
          <div className="space-y-4">
            {whispersOfPain.map((power, index) => (
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

export default BridesOfKhainePage;
