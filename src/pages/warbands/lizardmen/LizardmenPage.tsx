import MobileLayout from "../../components/MobileLayout";
import MobileText from "../../components/MobileText";
import MobileHeroHeader from "../../components/MobileHeroHeader";
import CollapsibleSection from "../../components/CollapsibleSection";
import UnitCard from "../../components/UnitCard";
import TotemicPowerCard from "../../components/TotemicPowerCard";
import slugify from "slugify";
import { useRef } from "react";
import headerImage from "../../assets/header-art/21ef8615dda8ffc145957aff5273c244_upscayl_4x_high-fidelity-4x.png";

const lizardmenUnits = [
  {
    name: "Magisacerdote Lagarto",
    role: "Herói",
    stats: {
      move: 18,
      fight: "2",
      shoot: "0",
      armour: 11,
      will: "+4",
      health: 14,
      cost: "-",
    },
    spellAffinity: {
      aligned0: ["Tradição da Vida"],
      aligned2: [
        "Tradição das Bestas",
        "Tradição dos Céus",
        "Tradição do Metal",
        "Tradição da Morte",
      ],
    },
    abilities: [
      {
        name: "Conjurador",
        description:
          "O Magisacerdote Skink é um conjurador da Tradição da Vida. Ele começa com 8 magias, das quais 4 devem ser da Tradição da Vida e uma de cada uma das tradições associadas.",
      },
      {
        name: "Ancestralidade Reptiliana",
        description: "O Magisacerdote Skink tem a característica Anfíbio.",
      },
      {
        name: "Equipamento Disponível",
        weapons: [
          "Adaga",
          "Machado",
          "Espada",
          "Arma de Concussão",
          "Arma de Haste",
          "Cajado",
          "Arco Curto",
          "Arma de Arremesso",
          "Zarabatana",
        ],
        armor: [],
        special: [],
      },
    ],
  },
  {
    name: "Guerreiro Totêmico Saurídeo",
    role: "Campeão",
    stats: {
      move: 15,
      fight: "+4",
      shoot: "-",
      armour: 12,
      will: "+5",
      health: 18,
      cost: "120 coroas",
    },
    abilities: [
      {
        name: "Fúria Totêmica",
        description: `O Guerreiro Totêmico Saurus não depende de destreza marcial, e portanto não usa poderes.
        No entanto, ele pode canalizar a Fúria dos Espíritos-Guia de seu povo para crescer em poder e destruir seus inimigos.
        O Guerreiro Totêmico Saurus não começa o jogo com uma Fúria Totêmica ativa. Se ele desejar ativar uma fúria totêmica ou trocar a sua atual por outra que conheça, deve no começo da sua ativação, 
        passar em um teste de Vontade com CD 14. Se falhar nesse teste, sofre 3 de dano. Se for bem-sucedido, passa a estar sob o efeito de uma fúria totêmica a sua escolha até que troque por outra ou 
        seja reduzido a 0 de Vigor.`,
      },
      {
        name: "Ancestralidade Reptiliana",
        description:
          "O Guerreiro Totêmico Saurus tem a característica Anfíbio.",
      },
      {
        name: "Mandíbula Esmagadora",
        description: `O Guerreiro Totemico Saurídeo tem Mandibulas poderosas que podem esmagar aço tão fácil quanto carne. Ele pode lutar desarmado sem penalidades. Adicionalmente, se estiver
        lutando com uma arma, a combinação de suas mandíbulas e armas concedem a ele a característica Penetração de Armadura(1)`,
      },
      {
        name: "Equipamento Disponível",
        weapons: [
          "Adaga",
          "Machado",
          "Arma de Concussão",
          "Espada",
          "Arma de Haste",
          "Arma de Duas Mãos",
        ],
        armor: ["Escudo", "Armadura Leve"],
        special: [],
      },
    ],
  },
  {
    name: "Batedor Lagarto",
    stats: {
      move: 18,
      fight: "+1",
      shoot: "0",
      armour: 12,
      will: "-1",
      health: 10,
      cost: "Free",
    },
    abilities: [
      {
        name: "Ancestralidade Reptiliana",
        description: "O Batedor Lagarto tem a característica Anfíbio.",
      },
      {
        name: "Equipamento Disponível",
        weapons: [
          "Adaga",
          "Machado",
          "Espada",
          "Arma de Concussão",
          "Arma de Haste",
          "Arco Curto",
          "Arma de Arremesso",
          "Zarabatana",
        ],
        armor: ["Escudo"],
        special: [],
      },
    ],
  },
  {
    name: "Saurídeo Veterano",
    stats: {
      move: 12,
      fight: "+3",
      shoot: "0",
      armour: "12",
      will: "0",
      health: 14,
      cost: "50 coroas",
    },
    abilities: [
      {
        name: "Mandíbula Esmagadora",
        description: `O Saurídeo tem Mandibulas poderosas que podem esmagar aço tão fácil quanto carne. Ele pode lutar desarmado sem penalidades. Adicionalmente, se estiver
        lutando com uma arma, a combinação de suas mandíbulas e armas concedem a ele a característica Penetração de Armadura(1)`,
      },
      {
        name: "Ancestralidade Reptiliana",
        description: "O Veterano Saurídeo tem a característica Anfíbio.",
      },
      {
        name: "Equipamento Disponível",
        weapons: [
          "Adaga",
          "Machado",
          "Arma de Concussão",
          "Espada",
          "Arma de Haste",
          "Arma de Duas Mãos",
        ],
        armor: ["Escudo", "Armadura Leve"],
        special: [],
      },
    ],
  },
  {
    name: "Lagarto Crista-Alta",
    stats: {
      move: 18,
      fight: "+2",
      shoot: "+2",
      armour: 11,
      will: "-1",
      health: 10,
      cost: "100 coroas",
    },
    abilities: [
      {
        name: "Guia Incansável",
        description:
          "Os Lagartos Crista-Alta estão acostumados a lutar e avançar por terrenos muito piores do que os escombros de Mordheim. Eles ignoram penalidades de movimento ao atravessar terreno acidentado.",
      },
      {
        name: "Iniciativa Repentina",
        description: `No início do jogo, após ambos os lados se posicionarem, mas antes das primeiras Rolagens de Iniciativa, um jogador com um Lagarto Crista-Alta pode mover essa figura e até uma outra em contato de base com ela em até 8cm. 
        O Guerreiro-de-Crista e a outra figura devem permanecer em contato base-a-base ao final desse movimento.`,
      },
      {
        name: "Ancestralidade Reptiliana",
        description: "O Lagarto Crista-Alta tem a característica Anfíbio.",
      },
      {
        name: "Equipamento Disponível",
        weapons: [
          "Adaga",
          "Machado",
          "Espada",
          "Arma de Concussão",
          "Arma de Haste",
          "Arco Curto",
          "Arma de Arremesso",
          "Zarabatana",
        ],
        armor: ["Escudo"],
        special: [],
      },
    ],
  },
  {
    name: "Lagarto Patrulheiro",
    stats: {
      move: 16,
      fight: "-1",
      shoot: "+4",
      armour: 11,
      will: "0",
      health: 14,
      cost: "100 coroas",
    },
    abilities: [
      {
        name: "Dardos Precisos",
        description:
          "Os Lagarto Patrulheiro pode realizar uma ação especial de 'mirar'. Se essa ação for imediatamente seguida por uma ação de ataque a distância na mesma ativação, o Lagarto Patrulheiro pode ignorar o primeiro terreno interposto (mas não cobertura) entre ele e seu alvo.",
      },
      {
        name: "Ancestralidade Reptiliana",
        description: "O Lagarto Atirador tem a característica Anfíbio.",
      },
      {
        name: "Escamas Camaleônicas",
        description: `Devido às suas escamas refrativas, nenhuma figura pode traçar linha de visão para um Lagarto Atirador que está a mais de 40cm de distância ou recebendo beneficio de cobertura.`,
      },
      {
        name: "Equipamento Disponível",
        weapons: [
          "Adaga",
          "Machado",
          "Espada",
          "Arma de Concussão",
          "Arma de Haste",
          "Arco Curto",
          "Arma de Arremesso",
          "Zarabatana",
        ],
        armor: ["Escudo"],
        special: [],
      },
    ],
  },
  {
    name: "Kroxigor",
    stats: {
      move: 10,
      fight: "+4",
      shoot: "0",
      armour: 15,
      will: "-2",
      health: 18,
      cost: "180 coroas",
    },
    abilities: [
      {
        name: "Besta Primeval",
        description:
          "O Kroxigor tem as características Grande, Forte, Aterrorizante e Anfíbio.",
      },
      {
        name: "Mandíbula Esmagadora",
        description: `O Kroxigor tem Mandibulas poderosas que podem esmagar aço tão fácil quanto carne. Ele pode lutar desarmado sem penalidades. Adicionalmente, se estiver
        lutando com uma arma, a combinação de suas mandíbulas e armas concedem a ele a característica Penetração de Armadura(2)`,
      },
      {
        name: "Equipamento Disponível",
        weapons: ["Arma de Haste"],
        armor: [],
        special: [],
      },
    ],
  },
];

const totemicPowers = [
  {
    name: "Fúria de Xlatax",
    effect:
      "Sempre que uma figura inimiga se move dentro de 8cm do Guerreiro Totêmico, ele pode interceptar aquela figura. Essa habilidade não funciona se o Guerreiro Totêmico estiver em combate.",
  },
  {
    name: "Fúria de Zatlal",
    effect:
      "O Guerreiro Totêmico pode como uma ação de ataque a distância (que pode substituir ação de movimento), fazer um ataque a distância usando sua estatística de Ímpeto e 8cm de alcance. Se sua rolagem de ataque a distância superar a da figura alvo por 5, ele pode mover a figura inimiga até 8cm em direção a ele. Se isso levar a figura inimiga a entrar em contato de base, ele pode usar qualquer ação restante para lutar com ela com +1 de Impeto.",
  },
  {
    name: "Furia de Huanchi",
    effect:
      "O Guerreiro Totêmico ganha a característica Chifres. Adicionalmente, ele pode atravessar figuras e terrenos, mas apenas em um movimento que declarou carga.",
  },
  {
    name: "Fúria de Tepok",
    effect:
      "O Guerreiro Totêmico ganha +2 de Ímpeto contra Ataques a Distância. Adicionalmente, sempre que ele for alvo de um Ataque a Distância (incluindo magias), ele pode mover até 8cm em direção ao atacante.",
  },
  {
    name: "Fúria de Xatli",
    effect:
      "Qualquer magia lançada sobre o Guerreiro Totêmico que seja resista com sucesso através um teste de Ímpeto ou Vontade é refletida de volta para o Conjurador. O conjurador se torna o novo alvo da magia, que é tratada como tento uma rolagem de conjuração de 14.",
  },
  {
    name: "Fúria de Chotec",
    effect:
      "The Totem Warrior gains the Ganha a característica Toque Incandescente e Resistência Elemental(5). Todos os seus ataques contam como Dano Elemental.",
  },
  {
    name: "Fury of Tlazcotl",
    effect:
      "Any figure that attempts to move within 3\" of the Totem Warrior must make a Will Roll (TN = 10 + Totem Warrior's Will). If failed, their movement immediately ends. They may take other actions but cannot approach closer until their next activation.",
  },
  {
    name: "Fury of the Quetz",
    effect:
      "O Guerreiro Totêmico ganha a visão de um líder de bando. Sempre que o Guerreiro-Totêmico prover suporte em combate a outra figura, ele provem +4 de bonus ao Impeto ao invés do habitual +2. Sempre que ele receber suporte de uma ou mais criaturas, ele ganha +4 de bonus ao seu Ímpeto ao invés do habitual +2, mas apenas para a primeira figura a prover suporte.",
  },
  {
    name: "Fury of Kroxgor",
    effect:
      'A Armadura do Guerreiro Totêmico é tratada como 3 pontos maior (até um máximo de 16). Inimigos podem escolher "atirar em pontos fracos" quando atacando, sofrendo -2 de Ímpeto ou -2 de Precisão, mas ignorando o bonus dessa fúria totêmica caso acertem.',
  },
  {
    name: "Fúria da Prole de Sotek",
    effect:
      "O Guerreiro Totêmico espeta ácido no inimigo mais próximo dentro de 16cm e linha de visão como uma ação livre, no começo da sua ativação. Isso conta como um ataque a distância normal que causa +2 de Dano e ignora 1 ponto de Armadura, podendo ser usado inclusive em combate. Se não houver inimigos dentro do alcance, esse ataque é perdido.",
  },
  {
    name: "Fury das Constelações Gêmeas",
    effect:
      "O Guerreiro Totêmico enxerga os movimentos de seus inimigos com uma clareza especial, e um inimigo ou uma horda não fazem mais diferença para ele. Qualquer figura em combate com ele conta como tendo uma figura de suporte a menos (até um mínimo de 0).",
  },
  {
    name: "Fury de Atzcalipotla",
    effect:
      "O Guerreiro Totêmico ganha a característica Escalador. Ao determinar o dano de queda, reduza a distância de queda em 5cm.",
  },
];

function LizardmenPage() {
  const tableOfContents = [
    {
      id: "unidades",
      label: "Unidades",
      type: "Section",
      ref: useRef(null),
    },
    {
      id: "poderes-totemicos",
      label: "Poderes Totêmicos",
      type: "Section",
      ref: useRef(null),
    },
  ];

  return (
    <>
      <MobileHeroHeader imageUrl={headerImage} title="Lizardmen" />

      <MobileLayout
        title="Lizardmen — Filhos dos Deuses Antigos"
        backButtonPath="/warbands"
        tableOfContents={tableOfContents}
      >
        <br />

        <MobileText className="mb-4">
          Os Lizardmen são os remanescentes de uma civilização antiga e poderosa
          que governou o mundo antes da ascensão dos homens. Criaturas
          reptilianas de inteligência superior, eles servem aos Deuses Antigos
          através de rituais complexos e magia ancestral. Sua sociedade é
          rigidamente hierárquica, com cada casta tendo um propósito específico
          na grande teia do destino.
        </MobileText>

        <MobileText className="mb-4">
          Após milênios de isolamento em Lustria, os augúrios dos Magisacerdotes
          Lagartos revelaram um novo desequilíbrio no mundo: os Skaven, inimigos
          eternos dos Filhos dos Antigos, estão reunindo grandes quantidades de
          pedra-bruxa nas ruínas de Mordheim. Essas energias corrompidas estão
          sendo usadas para criar armas impuras, capazes de ameaçar o equilíbrio
          do próprio mundo.
        </MobileText>

        <MobileText className="mb-4">
          Em resposta, pequenos bandos de Lizardmen foram enviados através dos
          mares e selvas até o Velho Mundo, com uma única missão: localizar e
          destruir toda pedra-bruxa encontrada, e aniquilar qualquer criatura
          que busque usá-la. Liderados por Magisacerdotes Lagartos e Guerreiros
          Totêmicos Saurídeos, estes bandos unem magia antiga e fúria primitiva
          em nome dos Deuses Antigos.
        </MobileText>

        <MobileText className="mb-4">
          Frieza, disciplina e propósito divino guiam cada passo dessas
          criaturas anfíbias pelas ruínas amaldiçoadas de Mordheim. Para os
          Lizardmen, não há tesouro, glória ou poder — apenas o cumprimento
          sagrado de um dever eterno: erradicar a corrupção da pedra-bruxa e
          restaurar o equilíbrio do mundo.
        </MobileText>

        <span
          id="unidades"
          ref={tableOfContents.find((item) => item.id === "unidades")?.ref}
        />
        <CollapsibleSection title="Unidades" id="unidades">
          <div className="space-y-4">
            {lizardmenUnits.map((unit, index) => (
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
          id="poderes-totemicos"
          ref={
            tableOfContents.find((item) => item.id === "poderes-totemicos")?.ref
          }
        />
        <CollapsibleSection title="Poderes Totêmicos" id="poderes-totemicos">
          <div className="space-y-4">
            {totemicPowers.map((power, index) => (
              <div key={index} id={slugify(power.name, { lower: true })}>
                <TotemicPowerCard name={power.name} effect={power.effect} />
              </div>
            ))}
          </div>
        </CollapsibleSection>
      </MobileLayout>
    </>
  );
}

export default LizardmenPage;
