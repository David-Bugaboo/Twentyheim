import MobileLayout from "../../components/MobileLayout";
import MobileText from "../../components/MobileText";
import MobileHeroHeader from "../../components/MobileHeroHeader";
import CollapsibleSection from "../../components/CollapsibleSection";
import UnitCard from "../../components/UnitCard";
import PowerCard from "../../components/PowerCard";
import slugify from "slugify";
import { useRef } from "react";
import headerImage from "../../assets/header-art/21ef8615dda8ffc145957aff5273c244_upscayl_4x_high-fidelity-4x.png";

const orcMobUnits = [
  {
    name: "Chefaum Orc",
    role: "Herói",
    stats: {
      move: 12,
      fight: "+4",
      shoot: "0",
      armour: 10,
      will: "+2",
      health: 18,
      cost: "-",
    },
    abilities: [
      {
        name: "Poderes",
        description:
          "O Chefaum Ork começa com 5 poderes da lista de Porradas do Waaaagh!. Um poder tem classe de dificuldade 3. Os outros têm um classe de dificuldade de 5.",
      },
      {
        name: "O Fodaum",
        description: "O Chefaum Ork tem a característica Forte e Grande.",
      },

      {
        name: "Equipamento Disponível",
        weapons: [
          "Adaga",
          "Machado",
          "Arma de Concussão",
          "Arma de Haste",
          "Arma de Duas Mãos",
          "Arco",
          "Besta",
        ],
        armor: ["Armadura Leve", "Escudo"],
        special: [],
      },
    ],
  },
  {
    name: "Orc Véio",
    role: "Campeão",
    stats: {
      move: 14,
      fight: "+1",
      shoot: "+0",
      armour: 10,
      will: "+4",
      health: 12,
      cost: "100 coroas",
    },
    spellAffinity: {
      aligned0: ["Tradição da WAAAAAAAAAAAGH!"],
      aligned2: [
        "Tradição das Sombras, Tradição da Vida, Tradição das Bestas, Tradição do Metal",
      ],
    },
    abilities: [
      {
        name: "Conjurador",
        description:
          "O Orc Véio é um conjurador da Tradição da WAAAAAAAAAAAGH!. Ele começa com 4 magias, das quais 3 devem ser da Tradição da WAAAAAAAAAAAGH! e a última de uma tradição associada.",
      },
      {
        name: "Equipamento Disponível",
        weapons: ["Cajado", "Adaga", "Machado"],
        armor: [],
        special: [],
      },
    ],
  },
  {
    name: "Goblin",
    stats: {
      move: 8,
      fight: "0",
      shoot: "0",
      armour: 8,
      will: "-2",
      health: 4,
      cost: "Free",
    },
    abilities: [
      {
        name: "Indisciplinado",
        description:
          "Goblins que não ativarem junto ao Chefaum Ork ou Orc Véio agem como criaturas irregulares no fim do turno. No começo do próximo turno eles voltam ao controle do bando.",
      },
      {
        name: "Molecada",
        description: "Goblins não ganham experiência.",
      },
      {
        name: "Equipamento Disponível",
        weapons: ["Adaga", "Machado", "Espada", "Arma de Haste", "Arco Curto"],
        armor: ["Escudo"],
        special: [
          "Pode comprar Elixir de cogumelo louco para essa figura sem rolagem de mercado negro",
        ],
      },
    ],
  },
  {
    name: "Minino Orc",
    stats: {
      move: 4,
      fight: "+3",
      shoot: "+0",
      armour: "10",
      will: "+1",
      health: 16,
      cost: "50 coroas",
    },
    abilities: [
      {
        name: "Indisciplinado",
        description:
          "Kabras Orks que não ativarem junto ao Chefaum Ork ou Orc Véio agem como criaturas irregulares no fim do turno. No começo do próximo turno eles voltam ao controle do bando.",
      },
      {
        name: "Equipamento Disponível",
        weapons: [
          "Adaga",
          "Machado",
          "Arma de Concussão",
          "Arma de Haste",
          "Arma de Duas Mãos",
          "Arco",
          "Besta",
        ],
        armor: ["Armadura Leve", "Escudo"],
        special: [],
      },
    ],
  },
  {
    name: "Cabra Orc",
    stats: {
      move: 12,
      fight: "+4",
      shoot: "+0",
      armour: "10",
      will: "+1",
      health: 16,
      cost: "100 coroas",
    },
    abilities: [
      {
        name: "Nascido pra Peia",
        description: "Krabas Orks tem a característica Forte.",
      },
      {
        name: "Indisciplinado",
        description:
          "Cabras Orcs que não ativarem junto ao Chefaum Ork agem como criaturas irregulares no fim do turno. No começo do próximo turno eles voltam ao controle do bando.",
      },
      {
        name: "Equipamento Disponível",
        weapons: [
          "Adaga",
          "Machado",
          "Arma de Concussão",
          "Arma de Haste",
          "Arma de Duas Mãos",
          "Arco",
          "Besta",
        ],
        armor: ["Armadura Leve", "Escudo"],
        special: [],
      },
    ],
  },
  {
    name: "Orc Batuqueiro",
    stats: {
      move: 12,
      fight: "+3",
      shoot: "+0",
      armour: "10",
      will: "+4",
      health: 16,
      cost: "100 coroas",
    },
    abilities: [
      {
        name: "Indisciplinado",
        description:
          "Orcs Batuqueiros que não ativarem junto ao Chefaum Ork agem como criaturas irregulares no fim do turno. No começo do próximo turno eles voltam ao controle do bando.",
      },
      {
        name: "Batuque de Guerra",
        description:
          "Quando o Chefaum Orc ativar, caso exista um Orc Batuqueiro a até 8cm dele, até 2 figuras a até 5cm do orc batuqueiro podem ativar junto ao Chefaum.",
      },

      {
        name: "Equipamento Disponível",
        weapons: [
          "Adaga",
          "Machado",
          "Arma de Concussão",
          "Arma de Haste",
          "Arma de Duas Mãos",
          "Arco",
          "Besta",
        ],
        armor: ["Armadura Leve", "Escudo"],
        special: [],
      },
    ],
  },
  {
    name: "Pé-Duro das Cavernas",
    stats: {
      move: "1d20",
      fight: "+2",
      shoot: "-",
      armour: 12,
      will: "-2",
      health: 8,
      cost: "35 coroas",
    },
    abilities: [
      {
        name: "Frenéticos",
        description: `Os Pé-Duros das Cavernas não possuem um valor fixo de Agilidade, deslocando-se com um salto desajeitado e imprevisível. Para representar isso, ao mover um Pé-Duro, role 1d20  para determinar a distância que ele se move (mínimo de 5cm). Esse valor também será usado para quaisquer teste de agilidade do Squig. Squigs nunca pode usar uma ação de disparada.`,
      },
      {
        name: "Indisciplinado",
        description:
          "Pé-Duros das Cavernas que não ativarem junto ao Chefaum Ork ou Orc Véio agem como criaturas irregulares no fim do turno. No começo do próximo turno eles voltam ao controle do bando.",
      },
      {
        name: "Habitante das Cavernas",
        description: "Pé-Duros das Cavernas tem a característica Animal.",
      },
      {
        name: "Equipamento Disponível",
        weapons: [],
        armor: [],
        special: [
          "Nenhum! Pés-Duro atacam se chocando com seus inimigos durante seus pulos",
        ],
      },
    ],
  },
  {
    name: "Troll",
    stats: {
      move: 4,
      fight: "+4",
      shoot: "+0",
      armour: 14,
      will: "0",
      health: 18,
      cost: "180 coroas",
    },
    abilities: [
      {
        name: "Besta Fedorenta",
        description:
          "Trolls tem as características Grande, Forte e Aterrorizante e Voraz.",
      },
      {
        name: "Regeneração Rápida",
        description: `Trolls tem a característica Regeneração. Essa característica não ativa se o Troll sofreu dano elemental no seu turno anterior.`,
      },
      {
        name: "Indisciplinado",
        description:
          "Trolls que não ativarem junto ao Chefaum Ork ou Orc Véio agem como criaturas irregulares no fim do turno. No começo do próximo turno eles voltam ao controle do bando.",
      },
      {
        name: "Equipamento Disponível",
        weapons: [],
        armor: [],
        special: ["Nenhum! Trolls atacam com troncos ou escombros"],
      },
    ],
  },
];

const krumpinsOfTheWaaaagh = [
  {
    name: "UMBORA CAMBADA!",
    when: "No início da ativação do Chefaum, antes de qualquer ação ser tomada.",
    effect:
      "O Chefaum Orc e até 3 Cabras Orcs, Mininos Orcs ou Orcs Batuqueiros que ativarem junto ao Chefaum são imunes a Aterrorizante até o final do turno.",
  },
  {
    name: "AQUI É COGUMELO, GALADO!",
    when: "Em qualquer momento durante a ativação do Chefaum Orc ou fora do jogo.",
    effect:
      "O Chefaum Orc pode fazer um tentativa de ativar este poder antes de cada jogo, na fase de conjurar rituais. O Chefaum Orc cura uma ferida permanente. Se usado durante o jogo, o Chefaum Orc recupera 5 pontos de saúde.",
  },
  {
    name: "RECEBA A PREDA!",
    when: "Em qualquer momento durante a ativação do Chefaum Orc.",
    effect: `O Chefaum Orc pode gastar uma ação para pegar um tronco, escombro, corpo morto etc, e arremessá-lo em um inimigo. O Chefaum Orc pode fazer um ataque a distância com um alcance máximo de 20cm. Este ataque a distância é feito com a estatística de Precisão do Chefaum Orc. Se o ataque acertar, causa +3 de dano.`,
  },
  {
    name: "SABIDO E PARRUDO",
    when: "Em qualquer momento durante a ativação do Chefaum Orc.",
    effect: `Escolha um Minino Orc, Cabra Orc ou Orc Batuqueiro dentro de 15cm. Esta figura pode ativar imediatamente depois do Chefaum e contar como tendo ativado junto ao Chefaum Orc para essa ativação.`,
  },
  {
    name: "RACHA QUENGO",
    when: "Sempre que o Chefaum Orc vencer um combate rolando um 18, 19 ou 20 naturais.",
    effect:
      "Trate esse acerto como um acerto crítico. A figura atingida ganha um marcador de Atordoamento.",
  },
  {
    name: "O TORA PLEURA",
    when: "Sempre que o Chefaum Orc vencer um combate e causar pelo menos 5 pontos de dano.",
    effect:
      "Se a figura alvo estiver usando armadura leve, sofre -1 de Armadura para o resto do jogo. Se estiver usando armadura pesada, sofre -2 de Armadura para o resto do jogo.",
  },
  {
    name: "SE AVEXE NÃO!",
    when: "Em qualquer momento durante a ativação do Chefaum Orc.",
    effect:
      "O Chefaum Orc ganha a característica Agarrar para esse combate apenas.",
  },
  {
    name: "VAIA BRUTAL",
    when: "Em qualquer momento durante a ativação do Chefaum Orc.",
    effect: `Qualquer figura dentro de 8cm do Chefaum Orc deve rolar Vontade contra uma CD igual a rolagem de ativação deste poder. Figuras que falharem recebem um marcador de Atordoamento.`,
  },
  {
    name: "SAI DO MEI, CABRA!",
    when: "No início de um movimento do Chefaum Orc.",
    effect: `Escolha uma figura inimiga que o Chefaum Orc possa declarar e completar carga.  Ignore qualquer terreno,figuras e tentativas de interceptação durante seu próximo movimento, se for uma carga contra essa criatura. Se o Chefaum Orc andar através de uma figura, ele pode rolar um teste contestado de Ímpeto contra essa figura. Se a figura perder o teste, o Chefaum Orc pode movê-la 8cm em qualquer direção, exceto fora da mesa ou em contato de base com outra figura.`,
  },
  {
    name: "ÓIA O MUQUE DO PAI",
    when: "Sempre que o Chefaum Orc rolar um teste de Ímpeto (qualquer teste de Ímpeto com uma CD).",
    effect:
      "Adicione +5 ao rolagem de Ímpeto do Chefaum Orc. Alternativamente, o Chefaum Orc pode usar esta habilidade sempre que vencer um combate para causar +1 de dano.",
  },
  {
    name: "RECEBA, GRAÇAS A GORK!",
    when: "Em qualquer ocasião em que o Chefaum Orc vencer uma luta.",
    effect:
      "O Chefaum Orc causa 3 pontos de dano adicionais além do dano normal que ele causaria.",
  },
  {
    name: "WAAAAAAAAAGH!",
    when: "No começo de qualquer turno, antes de rolar iniciativa, uma vez por jogo.",
    effect:
      "Cada Cabra, Minino, Batuqueiro, Goblin e o próprio Chefaum Orc ganham +8 de Agilidade, +2 de Ímpeto, +2 de dano, +2 de Vigor máximo, são imunes a Aterrorizante e têm a característica Mente de Ferro até o final do turno. O bando do Chefaum Orc é o vencedor de iniciativa, independentemente de qualquer rolagem. Figuras afetadas pelo Waaaagh! só podem tomar ações de movimento para declarar carga e ações de luta e ativação de poderes, e recebem dois marcadores de Atordoamento se não completarem uma carga durante esse turno. Eles não podem pegar fragmentos de pedra-bruxa. Cada figura no bando recebe o dano da ativação desse poder. O Poder pode ser tentado quantas vezes forem necessárias até ter sucesso. No Final do turno da Waaagh, todas as figuras afetadas recebem um marcador de Atordoamento.",
  },
];

function OrcMobPage() {
  const tableOfContents = [
    {
      id: "unidades",
      label: "Unidades",
      type: "Section",
      ref: useRef(null),
    },
    {
      id: "porradas",
      label: "Porradas do Waaaagh!",
      type: "Section",
      ref: useRef(null),
    },
  ];

  return (
    <>
      <MobileHeroHeader imageUrl={headerImage} title="Horda Orc" />

      <MobileLayout
        title="Horda Orc — WAAAAGH!"
        backButtonPath="/warbands"
        tableOfContents={tableOfContents}
      >
        <br />

        <MobileText className="mb-4">
          A Horda Orc é uma massa caótica e brutal de guerreiros verdes unidos
          pela promessa de violência e saque. Liderados por um Chefaum Orc
          carismático e brutal, estes bandos são movidos por uma sede insaciável
          de combate e destruição. Sua filosofia é simples: mais é melhor, e
          força bruta resolve qualquer problema.
        </MobileText>

        <MobileText className="mb-4">
          Apesar de sua aparente desorganização, as Hordas Orcs são
          surpreendentemente eficazes em combate. Suas Porradas do Waaaagh!
          canalizam a fúria coletiva dos orcs em poderes devastadores,
          transformando o caos aparente em uma força de destruição coordenada e
          implacável.
        </MobileText>

        <MobileText className="mb-4">
          Com sua resistência natural, números esmagadores e a lendária
          WAAAAGH!, as Hordas Orcs são uma presença aterrorizante em Mordheim,
          capazes de dominar o campo de batalha através de pura agressão e
          determinação inabalável.
        </MobileText>

        <span
          id="unidades"
          ref={tableOfContents.find((item) => item.id === "unidades")?.ref}
        />
        <CollapsibleSection title="Unidades" id="unidades">
          <div className="space-y-4">
            {orcMobUnits.map((unit, index) => (
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
          id="porradas"
          ref={tableOfContents.find((item) => item.id === "porradas")?.ref}
        />
        <CollapsibleSection title="Porradas do Waaaagh!" id="porradas">
          <div className="space-y-4">
            {krumpinsOfTheWaaaagh.map((power, index) => (
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

export default OrcMobPage;
