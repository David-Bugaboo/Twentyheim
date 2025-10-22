import MobileLayout from "../../components/MobileLayout";
import MobileText from "../../components/MobileText";
import MobileHeroHeader from "../../components/MobileHeroHeader";
import CollapsibleSection from "../../components/CollapsibleSection";
import UnitCard from "../../components/UnitCard";
import PowerCard from "../../components/PowerCard";
import slugify from "slugify";
import { useRef } from "react";
import headerImage from "../../assets/header-art/21ef8615dda8ffc145957aff5273c244_upscayl_4x_high-fidelity-4x.png";

const seaGuardUnits = [
  {
    name: "Mestre das Tradições",
    role: "Herói",
    stats: {
      move: 18,
      fight: "+1",
      shoot: "+1",
      armour: 9,
      will: "+6",
      health: 12,
      cost: "-",
    },
    spellAffinity: {
      aligned0: ["Todas as Tradições Arcanas"],
    },
    abilities: [
      {
        name: "Conjurador",
        description:
          "O Loremaster é um conjurador extremamente poderoso, e pode conjurar magias de todas as tradições arcanas. Ele começa com 8 magias, que podem ser escolhidas dentre quaisquer combinação de escolas.",
      },
      {
        name: "Equipamento Disponível",
        weapons: ["Adaga", "Espada", "Cajado"],
        armor: [],
        special: [],
      },
    ],
  },
  {
    name: "Guardião Imortal",
    role: "Campeão",
    stats: {
      move: 18,
      fight: "+3",
      shoot: "+1",
      armour: 10,
      will: "+4",
      health: 18,
      cost: "100 coroas",
    },
    abilities: [
      {
        name: "Poderes",
        description:
          "O Guarda Imortal começa com 5 poderes da lista Marés de Hoeth. Um deles tem sua classe de dificuldade com 3, e os outros tem classe de dificuldade 5.",
      },
      {
        name: "Postura do Quebra Marés",
        description:
          " Enquanto o Guarda Imortal está em contato de base com o Mestre das Tradições, o Mestre das Tradições ganha +2 de Armadura.",
      },

      {
        name: "Equipamento Disponível",
        weapons: [
          "Adaga",
          "Machado",
          "Espada",
          "Arma de Haste",
          "Arma de Duas Mãos",
          "Glaive de Guerra Élfica",
          "Arco Longo",
          "Arco Curto",
          "De Ithilmar",
        ],
        armor: ["Armadura Leve", "Escudo", "De Ithilmar"],
        special: [
          
        ],
      },
    ],
  },
  {
    name: "Cadetes",
    stats: {
      move: 18,
      fight: "+2",
      shoot: "+0",
      armour: 9,
      will: "-1",
      health: 10,
      cost: "free",
    },
    abilities: [
      {
        name: "Equipamento Disponível",
        weapons: [
          "Adaga",
          "Espada",
          "Machado",
          "Arma de Haste",
          "Arco",
          "Arco Longo",
          "De Ithilmar",
        ],
        armor: ["Armadura Leve", "Escudo", "De Ithilmar"],
        special: [],
      },
    ],
  },
  {
    name: "Lanceiro Lotherno",
    stats: {
      move: 18,
      fight: "+3",
      shoot: "0",
      armour: 9,
      will: "+1",
      health: 12,
      cost: "65 coroas",
    },
    abilities: [
      {
        name: "Equipamento Disponível",
        weapons: [
          "Adaga",
          "Machado",
          "Espada",
          "Arma de Haste",
          "Arma de Duas Mãos",
          "Glaive de Guerra Élfica",
          "Arco Longo",
          "Arco Curto",
          "De Ithilmar",
        ],
        armor: ["Armadura Leve", "Escudo", "De Ithilmar"],
        special: [
          
        ],
      },
    ],
  },
  {
    name: "Duelista das Tormentas",
    stats: {
      move: 18,
      fight: "+3",
      shoot: "0",
      armour: 9,
      will: "+4",
      health: 12,
      cost: "85 coroas",
    },
    abilities: [
      {
        name: "Avatar dos Ventos",
        description:
          "Os ataques do Lança do Vendaval contam como mágicos usando qualquer arma, até mesmo desarmado. Ele nunca recebe penalidades por lutar desarmado.",
      },
      {
        name: "Equipamento Disponível",
        weapons: ["Arma de Haste", "Glaive de Guerra Élfica", "Cajado", "De Ithilmar"],
        armor: [],
        special: [
          
        ],
      },
    ],
  },
  {
    name: "Porta-Estandarte Lotherno",
    role: "Especialista",
    stats: {
      move: 14,
      fight: "+3",
      shoot: "0",
      armour: 9,
      will: "+1",
      health: 12,
      cost: "100 coroas",
    },
    abilities: [
      {
        name: "Bandeira de Ulthuan",
        description:
          "Qualquer figura aliada dentro de 14cm e linha de visão desta figura ganha +1 de Vontade. A figura tem apenas 3 espaços de equipamento e sempre tem uma mão ocupada pela bandeira, que é impérvia a efeitos de destruição de equipamento.",
      },
      {
        name: "Equipamento Disponível",
        weapons: [
          "Adaga",
          "Machado",
          "Espada",
          "Arma de Haste",
          "Arma de Duas Mãos",
          "Glaive de Guerra Élfica",
          "Arco Longo",
          "Arco Curto",
          "De Ithilmar",
        ],
        armor: ["Armadura Leve", "Escudo", "De Ithilmar"],
        special: [
          
        ],
      },
    ],
  },
  {
    name: "Canalizador de Tormentas",
    role: "Especialista",
    stats: {
      move: 18,
      fight: "+1",
      shoot: "+3",
      armour: 9,
      will: "+2",
      health: 10,
      cost: "110 coroas",
    },
    abilities: [
      {
        name: "Canalizar Vendaval",
        description:
          "O Canalizador Ventonato pode usar uma ação, que pode substituir a ação de movimento, para canalizar os ventos ao redor de sua flecha. O próximo Ataque a Distância feito pelo Canalizador Ventonato ganha um adicional de 10cm de alcance.",
      },
      {
        name: "Equipamento Disponível",
        weapons: [
          "Adaga",
          "Espada",
          "Machado",
          "Arma de Haste",
          "Arco",
          "Arco Longo",
          "Arco Élfico",
          "De Ithilmar",
        ],
        armor: ["Armadura Leve", "Escudo", "De Ithilmar"],
        special: [],
      },
    ],
  },
];

const tidesOfHoeth = [
  {
    name: "Escudo da Tormenta",
    when: "Quando o Mestre das Tradições é alvo de um Ataque a Distância e está a 8cm de distância do Guarda Imortal.",
    effect:
      "Até 3 figuras aliadas dentro de 8cm do Guarda Imortal ganham +2 de Armadura durante até receber um ataque a distância ou até o final do turno, o que acontecer primeiro.",
  },
  {
    name: "Formação do Recife de Coral",
    when: "Quando o Guarda Imortal está a 8cm de distância do Mestre das Tradições e uma figura inimiga declara carga contra o Mestre das Tradições.",
    effect:
      "O Guarda Imortal pode imediatamente mover até 8cm, mas apenas na direção daquela figura. Se o Guarda Imortal termina seu movimento entre o Mestre das Tradições e a figura inimiga, a figura perde 2 de Movimento. Caso não consiga mais completar a carga devido a penalidade, sua ativação termina e quaisquer açòes restantes são perdidas.",
  },
  {
    name: "Enseada Espelho",
    when: "Quando o Mestre das Tradições conjura uma magia dentro de 14cm do Guarda Imortal.",
    effect:
      "O Mestre das Tradições pode traçar linha de visão e tratar o ponto de origem da magia a partir do Guarda Imortal, incluindo para medir o alcance.",
  },
  {
    name: "Ressurgência das Marés",
    when: "Quando o Mestre das Tradições falha em conjurar uma magia dentro de 14cm do Guarda Imortal.",
    effect:
      "O Mestre das Tradições pode forçar a magia usando o Vigor do Guarda Imortal ao invés do seu próprio Vigor. O Mestre das tradições só pode forçar até 3 na sua rolagem usando o vigor do Guarda Imortal. ",
  },
  {
    name: "Passo do Vendaval",
    when: "Quando qualquer figura aliada a até 8cm do Guarda Imortal perde um combate.",
    effect:
      "O Guarda Imortal pode mover até 8cm e entrar no combate. Qualquer dano causado pelo ataque que desencadeou este poder é reduzido em 4. Se esse dano for reduzido para 0, o Guarda Imortal pode imediatamente lutar contra a figura inimiga.",
  },
  {
    name: "Eco das Ondas",
    when: "Quando o Guarda Imortal vence um combate contra uma figura inimiga e causa pelo menos 1 de dano.",
    effect:
      "A figura inimiga ganha um marcador de Reverberação. Qualquer figura aliada que causa dano contra uma figura com um marcador de Reverberação adiciona mais um desses marcadores a ela. Uma figura com um Marcador de Reverberação recebe 1 de dano extra de qualquer fonte para cada marcador destes que tem. O Mestre das Tradições pode gastar uma ação para consumir qualquer número de marcadores de reverberação em uma figura e ganhar esse número de marcadores como bônus na sua próxima rolagem de conjuração, contanto que ainda seja feita na mesma ativação que os marcadores forem consumidos. Todos os Marcadores de Reverberação são perdidos no início de cada turno.",
  },
  {
    name: "Armadura de Marfim Entalhado",
    when: "A qualquer momento em que o Guarda Imortal é o alvo de uma magia.",
    effect:
      "O Guarda Imortal ganha +5 de Vontade contra o efeito daquela magia. Depois do jogo, se o Guarda Imortal não for reduzido a 0 de vigor, ele pode tentar ativar esse poder novamente durante a fase de Conjurar Rituais. Se tiver sucesso, o Mestre das Tradições pode conjurar essa magia no próximo jogo sem rolagem de conjuração, tratando esta como 14. O Guarda Imortal só pode usar esse segundo efeito para uma das magias que foi alvo durante o jogo.",
  },
  {
    name: "Ondas Ecoantes",
    when: "Quando o Guarda Imortal vence uma luta e causa pelo menos 1 de dano.",
    effect:
      "Uma figura aliada dentro de 8cm que está também em combate pode imediatamente lutar como uma livre.",
  },
  {
    name: "Discórdia da Sirena",
    when: "Sempre que o Mestre das Tradições ou qualquer figura aliada a até 14cm do Guarda Imortal recebe dano.",
    effect:
      "O Guarda Imortal pode imediatamente atacar uma figura que está causando dano com um Ataque a Distância mágico +3. Se o Mestre das Tradições foi quem recebeu o dano que desencadeou este poder, a figura que está causando dano e todos dentro de 8cm do Guarda Imortal recebem um Ataque a Distância mágico com +3.",
  },
  {
    name: "Vendaval de Aço",
    when: "Em qualquer ponto durante a ativação do Guarda Imortal ou de uma figura inimiga.",
    effect:
      "O Guarda Imortal pode interceptar figuras a até 8cm de si mesmo ao invés dos usuais 3cm até o fim da ativação em que ativou esse poder.",
  },
];

function SeaGuardPage() {
  const tableOfContents = [
    {
      id: "unidades",
      label: "Unidades",
      type: "Section",
      ref: useRef(null),
    },
    {
      id: "mares",
      label: "Marés de Hoeth",
      type: "Section",
      ref: useRef(null),
    },
  ];

  return (
    <>
      <MobileHeroHeader
        imageUrl={headerImage}
        title="Guarda Marítima de Ulthuan"
      />

      <MobileLayout
        title="Guarda Marítima de Ulthuan — Defensores da Ilha"
        backButtonPath="/warbands"
        tableOfContents={tableOfContents}
      >
        <br />

        <MobileText className="mb-4">
          A Guarda Marítima de Ulthuan representa a elite dos guerreiros élficos
          que defendem as costas sagradas da Ilha dos Elfos. Estes guerreiros
          nobres combinam a maestria arcana com estratégias defensivas
          refinadas, criando uma sinergia perfeita entre poder mágico e controle
          tático do campo de batalha.
        </MobileText>

        <MobileText className="mb-4">
          A Cidadela do Crepúsculo foi outrora erguida para proteger as rotas
          marítimas e observar civilizações emergentes. Após o Cataclismo que
          destruiu Mordheim e espalhou a terrível Pedra-Bruxa, os Altos Elfos
          perceberam que uma nova ameaça à ordem do mundo havia surgido — não
          nas selvas de Lustria, mas no coração corrompido do Velho Mundo.
        </MobileText>

        <MobileText className="mb-4">
          A Pedra-Bruxa, essência bruta da própria magia, distorce o equilíbrio
          arcano cuidadosamente mantido desde os dias dos Antigos. Para os
          eruditos de Saphery, ela é um fragmento da energia primordial que
          sustenta o mundo — energia que, se manipulada por mãos mortais, pode
          desestabilizar toda a Tecido da Realidade.
        </MobileText>

        <MobileText className="mb-4">
          Sabendo do perigo, os Altos Elfos enviaram destacamentos secretos ao
          continente humano, disfarçados de mercenários, estudiosos ou
          peregrinos. Sua missão não é de conquista, mas de contenção e
          vigilância. Procuram coletar, estudar e — quando possível — destruir a
          Pedra-Bruxa antes que ela corrompa mais seres ou caia nas mãos
          erradas.
        </MobileText>

        <MobileText className="mb-4">
          Ainda assim, nem todos os elfos compartilham da mesma visão. Alguns
          acreditam que a Pedra-Bruxa pode conter segredos do poder dos Antigos,
          capazes de restaurar a glória élfica perdida. Outros a veem apenas
          como um veneno que deve ser erradicado a qualquer custo.
        </MobileText>

        <MobileText className="mb-4">
          Seja qual for o motivo, a presença élfica em Mordheim não é mero
          acaso. É uma guerra silenciosa — travada nas sombras, entre ruínas,
          para decidir se o poder dos deuses antigos será novamente desperto...
          ou selado para sempre.
        </MobileText>

        <MobileText className="mb-4">
          Liderados por Mestres das Tradições e Guardiões Imortais, estes bandos
          são construídos em torno da simbiose entre poder arcano e proteção
          estratégica. Suas Marés de Hoeth canalizam a harmonia entre domínio
          mágico e controle defensivo, criando uma dualidade de ofensa e defesa,
          inteligência e controle bruto do campo de batalha.
        </MobileText>

        <span
          id="unidades"
          ref={tableOfContents.find((item) => item.id === "unidades")?.ref}
        />
        <CollapsibleSection title="Unidades" id="unidades">
          <div className="space-y-4">
            {seaGuardUnits.map((unit, index) => (
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
          id="mares"
          ref={tableOfContents.find((item) => item.id === "mares")?.ref}
        />
        <CollapsibleSection title="Marés de Hoeth" id="mares">
          <div className="space-y-4">
            {tidesOfHoeth.map((power, index) => (
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

export default SeaGuardPage;
