import MobileLayout from "../../components/MobileLayout";
import MobileText from "../../components/MobileText";
import MobileHeroHeader from "../../components/MobileHeroHeader";
import CollapsibleSection from "../../components/CollapsibleSection";
import UnitCard from "../../components/UnitCard";
import PowerCard from "../../components/PowerCard";
import slugify from "slugify";
import { useRef } from "react";
import headerImage from "../../assets/header-art/21ef8615dda8ffc145957aff5273c244_upscayl_4x_high-fidelity-4x.png";

const dwarfUnits = [
  {
    name: "Engenheiro de Kharadron",
    role: "Herói",
    stats: {
      move: 10,
      fight: "+3",
      shoot: "+2",
      armour: 11,
      will: "+4",
      health: 20,
      cost: "-",
    },
    abilities: [
      {
        name: "Poderes",
        description:
          "O Engenheiro de Kharadron começa com 5 poderes da lista de Obras-Primas de Kharadron. Um desses poderes tem classe de dificuldade 3. Os outros poderes têm classe de dificuldade 5.",
      },
      {
        name: "Military Engineering",
        description: `O Engenheiro de Kharadron faz com que todas as armas de fogo, bestas e bestas de mão do bando ganharem 10cm de alcance adicional.`,
      },
      {
        name: "Ferreiro-Daemonico",
        description:
          "O Engenheiro de Kharadron pode trocar uma de suas rolagens na tabela de Venda de Pedra-Bruxa por uma rolagem na tabela de Modificações de Construto. Essa rolagem pode ser substituida tanto nas rolagens de Mercado Negro, quando nas rolagens de venda.",
      },
      {
        name: "Devagar e Sempre",
        description: `O Engenheiro de Kharadron nunca perde agilidade devido ao uso de equipamentos.`,
      },
      {
        name: "Equipamento Disponível",
        weapons: [
          "Adaga",
          "Machado",
          "Arma de Concussão",
          "Espada",
          "Machado Anão",
          "Pistola",
          "Besta",
          "Arcabuz",
        ],
        armor: ["Armadura Leve", "Armadura Pesada", "Escudo"],
        special: ["Gromril"],
      },
    ],
  },
  {
    name: "Mata-Trolls Anão",
    role: "Herói",
    stats: {
      move: 10,
      fight: "+3",
      shoot: "+0",
      armour: 11,
      will: "+3",
      health: 18,
      cost: "100 coroas",
    },
    abilities: [
      {
        name: "Poderes",
        description:
          "O Mata-Trolls começa com 5 poderes da lista de Sagas do Mata-Trolls. Um desses poderes tem classe de dificuldade 3. Os outros poderes têm classe de dificuldade 5.",
      },
      {
        name: "Suicida",
        description:
          "O Mata-Trolls é imune a medo e tem a característica Mente de Ferro.",
      },
      {
        name: "Devagar e Sempre",
        description: `O Engenheiro de Kharadron nunca perde agilidade devido ao uso de equipamentos.`,
      },
      {
        name: "Equipamento Disponível",
        weapons: [
          "Adaga",
          "Machado",
          "Arma de Concussão",
          "Espada",
          "Machado Anão",
          "Arma de Haste",
          "Arma Anã de Duas Mãos",
          "Arma de Duas Mãos",
        ],
        armor: [],
        special: ["Gromril"],
      },
    ],
  },
  {
    name: "Barba Curta",
    stats: {
      move: 10,
      fight: "+2",
      shoot: "+0",
      armour: 11,
      will: "-1",
      health: 12,
      cost: "Free",
    },
    abilities: [
      {
        name: "Devagar e Sempre",
        description: `Um Barba Curta nunca perde agilidade devido ao uso de equipamentos.`,
      },
      {
        name: "Equipamento Disponível",
        weapons: [
          "Adaga",
          "Machado",
          "Arma de Concussão",
          "Espada",
          "Machado Anão",
          "Arma de Haste",
          "Arma Anã de Duas Mãos",
          "Arma de Duas Mãos",
          "Pistola",
        ],
        armor: ["Armadura Leve", "Armadura Pesada", "Escudo"],
        special: ["Gromril"],
      },
    ],
  },
  {
    name: "Irmãos de Clã",
    stats: {
      move: 10,
      fight: "+3",
      shoot: "+0",
      armour: 13,
      will: "+1",
      health: 12,
      cost: "50 coroas",
    },
    abilities: [
      {
        name: "Devagar e Sempre",
        description: `O Engenheiro de Kharadron nunca perde agilidade devido ao uso de equipamentos.`,
      },
      {
        name: "Equipamento Disponível",
        weapons: [
          "Adaga",
          "Machado",
          "Arma de Concussão",
          "Espada",
          "Machado Anão",
          "Arma de Haste",
          "Arma Anã de Duas Mãos",
          "Arma de Duas Mãos",
        ],
        armor: [],
        special: ["Gromril"],
      },
    ],
  },
  {
    name: "Trovejador Anão",
    stats: {
      move: 10,
      fight: "+2",
      shoot: "+3",
      armour: 11,
      will: "+1",
      health: 12,
      cost: "80 coroas",
    },
    abilities: [
      {
        name: "Treinamento Militar",
        description:
          "O Trovejador Anão é permitido tomar uma ação especial 'mirar', que pode substituir uma ação de movimento. Se esta ação for imediatamente seguida por uma ação de ataque a distância na mesma ativação, o Trovejador Anão pode ignorar o primeiro terreno interposto (mas não cobertura) entre ele e seu alvo.",
      },
      {
        name: "Devagar e Sempre",
        description: `O Engenheiro de Kharadron nunca perde agilidade devido ao uso de equipamentos.`,
      },
      {
        name: "Equipamento Disponível",
        weapons: [
          "Adaga",
          "Machado",
          "Arma de Concussão",
          "Espada",
          "Machado Anão",
          "Pistola",
          "Besta",
          "Arcabuz",
        ],
        armor: ["Armadura Leve", "Armadura Pesada", "Escudo"],
        special: ["Gromril"],
      },
    ],
  },
  {
    name: "Mecânico Anão",

    stats: {
      move: 10,
      fight: "+2",
      shoot: "+0",
      armour: 11,
      will: "+1",
      health: 12,
      cost: "20 coroas",
    },
    abilities: [
      {
        name: "Engenheiro Assistente",
        description:
          "Os Mecânicos Anãos são especialistas na lida com automação de tarefas, ajudando o engenheiro a otimizar seu trabalho. Um bando que tem um Mecânico Anão ganha um +1 para uma tentativa de ativar a Obra-Prima dos Homens de Gromril ou a Obra-Prima da Reforço de Gromril.",
      },
      {
        name: "Improvisador",
        description:
          "Mecânicos Anãos são gênios da improvisação,sempre achando formas criativas de resolver problemas e contanto nunca contam como desarmados. Se estiverem sem uma arma, eles contam como armados com uma adaga.",
      },
      {
        name: "Devagar e Sempre",
        description: `O Engenheiro de Kharadron nunca perde agilidade devido ao uso de equipamentos.`,
      },
      {
        name: "Equipamento Disponível",
        weapons: [
          "Adaga",
          "Machado",
          "Arma de Concussão",
          "Espada",
          "Machado Anão",
          "Pistola",
          "Besta",
          "Arcabuz",
        ],
        armor: ["Armadura Leve", "Armadura Pesada", "Escudo"],
        special: ["Gromril"],
      },
    ],
  },
  {
    name: "Metalúrgico Anão",

    stats: {
      move: 10,
      fight: "+3",
      shoot: "+0",
      armour: 11,
      will: "+1",
      health: 14,
      cost: "50 coroas",
    },
    abilities: [
      {
        name: "Reciclador de Materiais",
        description:
          "Um bando que tem um Metalúrgico Anão pode fazer uma rolagem adicional durante a fase de Rolagens de Mercado Negro, mas apenas na tabela de Modificações de Constructos. Além disso, o bando ganha um desconto de 20% em todas as compras feitas na Tabela de Modificações de Constructos.",
      },
      {
        name: "Devagar e Sempre",
        description: `O Engenheiro de Kharadron nunca perde agilidade devido ao uso de equipamentos.`,
      },
      {
        name: "Equipamento Disponível",
        weapons: [
          "Adaga",
          "Machado",
          "Arma de Concussão",
          "Espada",
          "Machado Anão",
          "Arma de Haste",
          "Cajado",
          "Arma Anã de Duas Mãos",
          "Arma de Duas Mãos",
        ],
        armor: [],
        special: ["Gromril"],
      },
    ],
  },
];

const slayerSagas = [
  {
    name: "Saga do Mata Ogros",
    when: "Sempre que o Mata-Trolls luta com uma figura com a característica Grande.",
    effect: `O Slayer ganha +2 de Ímpeto, e ignora 1 ponto de armadura da figura inimiga para aquela luta apenas.`,
  },
  {
    name: "Saga da Matança Incansável",
    when: "Em qualquer momento em que o Mata-Trolls vence uma luta, mas não causa dano.",
    effect:
      "The trollslayer attacks novamente. Esse poder pode ser ativado mais de uma vez na ativação da mesma criatura.",
  },
  {
    name: "Saga do Esfolamento",
    when: "Sempre que o Mata-Trolls vence uma luta e causa pelo menos 5 de dano.",
    effect:
      "A figura que tomou o dano também recebe um marcador de sangramento.",
  },
  {
    name: "Saga do Perseguição",
    when: "Em qualquer ponto em que o Mata-Trolls ativação do Mata-Trolls.",
    effect: `O Mata-Trolls seleciona uma figura inimiga a até 15cm de si. O Mata-Trolls ganha +4 de Agilidade, mas deve entrar em combate com essa figura.Ele não pode ativar esse poder se não tiver como completar a carga, mesmo com o bonus de Agilidade.. O Mata-Trolls ganha +1 de Dano na próxima luta contra essa figura.`,
  },
  {
    name: "Saga do Berserker",
    when: "Em qualquer ponto em que o Mata-Trolls luta.",
    effect:
      "Durante essa luta apenas, o Mata-Trolls também causa dano, mesmo se perder a luta.",
  },
  {
    name: "Saga da Decapitação",
    when: "A qualquer momento em que o Mata-Trolls causa dano a uma figura inimiga e esta é reduzida a 3 ou menos de vigor, mas mais que 0.",
    effect: "A figura inimiga é imediatamente reduzida a 0 de vigor.",
  },
  {
    name: "Saga do Rancor Inebriante",
    when: "A qualquer momento em que o Mata-Trolls reduz uma figura inimiga a 0 de vigor.",
    effect: "O Mata-Trolls recupera imediatamente 5 pontos de vigor.",
  },
  {
    name: "Saga da Vontade Inabalável",
    when: "A primeira vez que o Mata-Trolls é reduzido a 0 de vigor durante o jogo.",
    effect: "O Mata-Trolls ao invés disso é reduzido a 1 de vigor.",
  },
  {
    name: "Saga da Pele de Pedra ",
    when: "A qualquer momento em que o Mata-Trolls recebe dano.",
    effect:
      "Reduz o dano recebido em 5. Se isso reduzir o resultado para 0 ou menos, o Mata-Trolls não sofre quaisquer efeitos adicionais do ataque.",
  },
  {
    name: "Saga do Cruzador de Abismos",
    when: "Em qualquer momento durante a ativação do Mata-Trolls.",
    effect: `O Mata-Trolls pode usar uma ação para fazer um movimento 'Pulo' em vez de um movimento normal. Em um Pulo, o Mata-Trolls pode mover até seu movimento total +4 em uma linha reta, em qualquer direção (incluindo diretamente para cima). Se este movimento termina com o Mata-Trolls no ar, imediatamente mova-o de volta para a mesa e cause dano de queda apropriado. O Mata-Trolls pode usar esse movimento para declarar uma carga contra uma figura inimiga. Se o fizer, e completar a carga, ganha +2 de dano na próxima luta contra aquela figura.`,
  },
  {
    name: "Saga do Imovível",
    when: "A qualquer momento em que o Mata-Trolls seria movido por uma força externa, incluindo ser empurrado para trás após uma luta, movido por uma magia, ou por alguma outra regra especial.",
    effect:
      "O Mata-Trolls pode escolher não mover, ou mover qualquer distância até a quantidade normal especificada pela força externa.",
  },
  {
    name: "Saga do Lançador de Montanhas",
    when: "A qualquer momento em que o Mata-Trolls vence uma luta.",
    effect: `O Mata-Trolls causa +1 de dano e, adicionalmente, pode escolher empurrar a figura inimiga até 1cm em vez dos 3cm usuais. Este empurrão pode mover a figura através ou sobre terreno ou através de outras figuras, causando 2 de dano para cada terreno e figura atravessada.`,
  },
];

const undermountainMasterpieces = [
  {
    name: "Obra-Prima dos Homens de Gromril",
    when: "Fora de Jogo, na fase de conjurar rituais da sequência pós-jogo.",
    effect:
      "O Bando imediatamente ganha um construto da lista Constructos de Kharadron, que ocupa um espaço de soldado no bando normalmente. Esse poder sempre é ganho com poder de ativação 8, independe de como seja conseguido. O Engenheiro recebe uma penalidade na sua rolagem de ativação, de acordo com o Construto que tenta levantar. Drone de Kharadron (-0), Cabra Montanhosa de Gromril (-2), Guardião de Kharadron (-4).",
  },
  {
    name: "Obra-Prima da Armadura Mecânica",
    when: "Fora de Jogo, na fase de conjurar rituais da sequência pós-jogo.",
    effect:
      "Um soldado do bando que tenha armadura pesada entre seus Equipamentos Disponíveis ganha uma armadura mecânica. Em cada jogo em que esse soldado é usado, um custo de 50 coroas deve ser pago como manutenção da armadura. Se o custo de manutenção não é pago, o soldado não ganha os beneficios da armadura, mas pode ser usado normalmente. Uma figura usando essa armadura ganha +4 de armadura. Um soldado carregando umaarmadura mecânica conta como carregandop uma arma de mão, uma pistola, e um filtro de máscara — todos integrados. O filtro de máscara torna a figura imune a veneno. Uma figura usando uma armadura mecânica é reduzida a apenas 2 espaços de itens.",
  },
  {
    name: "Obra-Prima do Planador",
    when: "Fora de Jogo, na fase de conjurar rituais da sequência pós-jogo",
    effect:
      "O Engenheiro constrói um planador para um soldado do bando ou para si mesmo. O planador ocupa um espaço de item e pode ser descartada a qualquer momento. Uma figura com um planador pode mover-se de um ponto mais alto para um mais baixo como se tivesse a Característica Voador.",
  },
  {
    name: "Obra-Prima do Lança de Granadas",
    when: "Fora de Jogo, na fase de conjurar rituais da sequência pós-jogo.",
    effect: `O engenheiro fixa um lança-granadas em uma arma de fogo usado por qualquer figura do grupo. O lança-granadas faz aquela arma ocupar um espaço de arma adicional e pode ser descartada a qualquer momento. Um lança-granadas pode ser usado uma vez por jogo e tem o mesmo efeito de um Coquetel Kislevita, mas pode ser atirado a uma distância de 35cm.`,
  },
  {
    name: "Obra-Prima da Baioneta Vaposserra",
    when: "Fora de Jogo, na fase de conjurar rituais da sequência pós-jogo.",
    effect:
      "O engenheiro fixa uma baioneta vaposserra em uma arma de fogo usada por qualquer figura do grupo. A baioneta vaposserra faz aquela arma ocupar um espaço de arma adicional e pode ser descartada a qualquer momento. Quando essa arma é usada como uma arma de combate corpo a corpo, ela ganha Penetração de Armadura(2).",
  },
  {
    name: "Obra-Prima dos Botas Magnéticas",
    when: "Fora de Jogo, na fase de conjurar rituais da sequência pós-jogo.",
    effect:
      "O engenheiro melhora as botas de uma figura do grupo com discos magnéticos. As Botas Magnéticas ocupam um espaço de item e podem ser descartadas a qualquer momento. Uma figura equipada com elas pode escalar sem gastar qualquer movimento adicional.",
  },
  {
    name: "Obra-Prima do Reforço de Gromril",
    when: "Fora de Jogo, na fase de conjurar rituais da sequência pós-jogo.",
    effect:
      "Escolha uma arma corpo-a-corpo ou armadura usado por uma figura do bando. Se for uma arma corpo-a-corpo, ela ganha +1 de Ímpeto e conta como mágica. Se for uma armadura, ela ganha +1 de armadura e conta como mágica. Uma arma ou armadura não pode ser o alvo desta obra-prima duas vezes.",
  },
  {
    name: "Obra-Prima do Lança-Chamas Dracônico",
    when: "Fora de Jogo, na fase de conjurar rituais da sequência pós-jogo.",
    effect:
      "O Engenheiro escolhe um Construto com a característica Grande do bando. Essa obra-prima conta como uma Modificação de Construto aplicada no Construto escolhido. O Construto pode, como uma ação, fazer um ataque a disância elemental +3 contra as 3 figuras mais próximas dentro de 15cm. Figuras atingidas recebem um marcador de Chamas. O engenheiro pode, uma vez por jogo, usar uma ação para fazer esse Construto usar esse ataque, mesmo se este já tiver ativado no turno.",
  },
  {
    name: "Obra-Prima das Manoplas Sônicas",
    when: "Fora de Jogo, na fase de conjurar rituais da sequência pós-jogo.",
    effect: `O Engenheiro escolhe um Construto com a característica Grande ou Chifres do bando. Essa obra-prima conta como uma Modificação de Construto aplicada no Construto escolhido. Sempre que o Construto luta, todas as figuras dentro de 3cm dele recebem um ataque a disância +3. Figuras atingidas são empurradas 3cm em linha reta para longe do Construto.`,
  },
  {
    name: "Obra-Prima do Kit de Soldagem Portátil",
    when: "Em qualquer momento durante a ativação do Engenheiro.",
    effect: `O Engenheiro escolhe um Construto dentro de 3cm dele. O Construto recupera 5 pontos de vigor.`,
  },
  {
    name: "Obra-Prima da Mina de Fragmentação",
    when: "Em qualquer momento durante a ativação do Engenheiro.",
    effect: `O Engenheiro coloca uma mina de fragmentação no chão ou na parede, dentro de 3cm de si mesmo. Se qualquer figura se move dentro de 3cm da mina, ela explode, e todas as figuras dentro de 8cm de ela recebem um ataque a disância +5, ignorando 2 pontos de armadura de qualquer figura que seja atingida. O Engenheiro pode ter no máximo 2 minas de fragmentação ativas ao mesmo tempo.`,
  },
  {
    name: "Obra Prima do Arpéu",
    when: "Fora de Jogo, na fase de conjurar rituais da sequência pós-jogo.",
    effect: `O Engenheiro constrói um arpéu para uma figura do bando. O Arpéu ocupa um espaço de item. Como uma ação (pode ser uma ação de movimento), uma figura pode ativar o arpéu, mirando qualquer peça de terreno dentro da linha de visão e 30cm. A figura move naquela direção imediatamente, e não pode ser interceptada durante esse movimento. Esse item também pode ser mirado em uma figura inimiga, mas apenas se o movimento dele for usado para declarar carga. `,
  },
];

function DwarfTreasureHuntersPage() {
  const tableOfContents = [
    {
      id: "unidades",
      label: "Unidades",
      type: "Section",
      ref: useRef(null),
    },
    {
      id: "equipamentos",
      label: "Equipamentos Especiais",
      type: "Section",
      ref: useRef(null),
    },
    {
      id: "slayer-sagas",
      label: "Slayer Sagas",
      type: "Section",
      ref: useRef(null),
    },
    {
      id: "masterpieces",
      label: "Obras-Primas de Kharadron",
      type: "Section",
      ref: useRef(null),
    },
  ];

  return (
    <>
      <MobileHeroHeader
        imageUrl={headerImage}
        title="Caçadores de Tesouro Anões"
      />

      <MobileLayout
        title="Dwarf Treasure Hunters — Engenheiros de Kharadron"
        backButtonPath="/warbands"
        tableOfContents={tableOfContents}
      >
        <br />

        <MobileText className="mb-4">
          Os Caçadores de Tesouro Anões são engenheiros brilhantes e guerreiros
          destemidos das Montanhas do Mundo, unidos em sua busca por riquezas e
          conhecimento perdido. Estes anões não são apenas mineradores e
          artesãos habilidosos, mas também inventores geniais que criam
          maravilhas mecânicas e construtos de guerra.
        </MobileText>

        <MobileText className="mb-4">
          Liderados por Engenheiros de Kharadron, estes bandos combinam a
          tradicional resistência anã com a inovação tecnológica mais avançada.
          Suas Obras-Primas de Kharadron são invenções extraordinárias que podem
          mudar o curso de uma batalha, desde armaduras mecânicas até construtos
          de guerra automatizados.
        </MobileText>

        <MobileText className="mb-4">
          Os Mata-Trolls anões trazem consigo as antigas Sagas de seus
          ancestrais, poderes místicos que se manifestam através de sua
          determinação inabalável e sede de vingança contra as criaturas
          monstruosas que ameaçam seu povo.
        </MobileText>

        <MobileText className="mb-4">
          Com sua combinação única de tecnologia avançada, tradição ancestral e
          determinação férrea, os Caçadores de Tesouro Anões são uma força
          formidável em Mordheim, capazes de superar qualquer obstáculo através
          da engenharia e da força de vontade.
        </MobileText>

        <span
          id="unidades"
          ref={tableOfContents.find((item) => item.id === "unidades")?.ref}
        />
        <CollapsibleSection title="Unidades" id="unidades">
          <div className="space-y-4">
            {dwarfUnits.map((unit, index) => (
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
                  />
                </CollapsibleSection>
              </div>
            ))}
          </div>
        </CollapsibleSection>
        <span
          id="slayer-sagas"
          ref={tableOfContents.find((item) => item.id === "slayer-sagas")?.ref}
        />
        <CollapsibleSection title="Slayer Sagas" id="slayer-sagas">
          <div className="space-y-4">
            {slayerSagas.map((power, index) => (
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

        <span
          id="masterpieces"
          ref={tableOfContents.find((item) => item.id === "masterpieces")?.ref}
        />
        <CollapsibleSection title="Obras-Primas de Kharadron" id="masterpieces">
          <div className="space-y-4">
            {undermountainMasterpieces.map((power, index) => (
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

export default DwarfTreasureHuntersPage;
