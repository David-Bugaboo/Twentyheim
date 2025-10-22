import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

import Header from "../../components/Header";
import UnitCard from "../../components/UnitCard";
import PowerCard from "../../components/PowerCard";
import EquipmentCard from "../../components/EquipmentCard";
import slugify from "slugify";
import WarbandIndex from "../../components/WarbandIndex";
import {
  PageContainer,
  ContentSection,
  NavigationSection,
  StyledNavigationButton,
  ContentContainer,
  ParchmentText,
  PowerListTitle,
} from "../../components/PageComponents";

const skavenUnits = [
  {
    name: "Assassino",
    role: "Herói",
    stats: {
      move: 20,
      fight: "+3",
      shoot: "+1",
      armour: 9,
      will: "+2",
      health: 14,
      cost: "-",
    },
    abilities: [
      {
        name: "Poderes",
        description:
          "O Assassino começa com 5 poderes da lista de Artes Marciais do Clã Eshin. Um desses poderes tem classe de dificuldade 3. Os outros poderes têm classe de dificuldade 5.",
      },
      {
        name: "Presas do Rato Chifrudo",
        description:
          "Qualquer figura danificada por um ataque de assassino é envenenada.",
      },
      {
        name: "Apunhalar pelas Costas",
        description: `Além disso, assassinos ganham um adicional +2 a seu Ímpeto se já estiverem recebendo um bônus de um ou mais figuras suporte, o entanto, assassinos nunca contam como uma figura suporte para outras figuras, mesmo membros da própria bando.`,
      },

      {
        name: "Equipamento Disponível",
        weapons: [
          "Adaga",
          "Espada",
          "Arma de Haste",
          "Lamentadoras",
          "Garras de Combat Skaven",
          "Funda",
          "Zarabatana",
          "Pistola de Gatilho-Bruxo",
        ],
        armor: ["Armadura Leve"],
        special: ["Pode comprar veneno sem fazer rolagens de Mercado Negro"],
      },
    ],
  },
  {
    name: "Bruxo do Clã Eshin",
    role: "Campeão",
    stats: {
      move: 20,
      fight: "-1",
      shoot: "+0",
      armour: 9,
      will: "+3",
      health: 12,
      cost: "100 coroas",
    },
    spellAffinity: {
      aligned0: ["Tradição do Rato Chifrudo"],
      aligned2: [
        "Tradição do Fogo",
        "Tradição das Sombras",
        "Tradição do Metal",
        "Tradição da Morte",
      ],
    },
    abilities: [
      {
        name: "Conjurador",
        description:
          "O Bruxo do clã enshin é um conjurador da Tradição do Rato Chifrudo. Ele começa o jogo com 4 magias, sendo 3 delas da Tradição do Rato Chifrudo e 1 de uma tradição associada.",
      },
      {
        name: "Equipamento Disponível",
        weapons: [
          "Adaga",
          "Espada",
          "Arma de Haste",
          "Lamentadoras",
          "Garras de Combat Skaven",
          "Funda",
          "Zarabatana",
          "Pistola de Gatilho-Bruxo",
        ],
        armor: [],
        special: ["Pode comprar veneno sem fazer rolagens de Mercado Negro"],
      },
    ],
  },
  {
    name: "Pestes",
    stats: {
      move: 20,
      fight: "-1",
      shoot: "0",
      armour: 9,
      will: "-1",
      health: 10,
      cost: "Grátis",
    },
    abilities: [
      {
        name: "Equipamento",
        weapons: ["Adaga", "Espada", "Arma de Haste", "Funda"],
        armor: ["Armadura Leve", "Escudo"],
        special: [],
      },
    ],
  },
  {
    name: "Enxame de Ratos",
    stats: {
      move: 14,
      fight: "0",
      shoot: "0",
      armour: 6,
      will: "-2",
      health: 8,
      cost: "20 coroas",
    },
    abilities: [
      {
        name: "Equipamento",
        weapons: [],
        armor: [],
        special: [
          "Enxames são uma massa de presas amareladas e garras contaminadas",
        ],
      },
      {
        name: "Enxame",
        description: "Enxame de Ratos tem as características Animal e Enxame.",
      },
    ],
  },
  {
    name: "Skaven Sombrio",
    stats: {
      move: 20,
      fight: "+4",
      shoot: "+0",
      armour: 9,
      will: "0",
      health: 12,
      cost: "85 coroas",
    },
    abilities: [
      {
        name: "Equipamento Disponível",
        weapons: [
          "Adaga",
          "Espada",
          "Arma de Haste",
          "Lamentadoras",
          "Garras de Combat Skaven",
          "Funda",
          "Zarabatana",
          "Pistola de Gatilho-Bruxo",
        ],
        armor: ["Armadura Leve"],
        special: ["Pode comprar veneno sem fazer rolagens de Mercado Negro"],
      },
    ],
  },
  {
    name: "Night Runners",
    role: "Especialista",
    stats: {
      move: 20,
      fight: "1",
      shoot: "1",
      armour: 9,
      will: "-1",
      health: 12,
      cost: "75 coroas",
    },
    abilities: [
      {
        name: "Equipamento",
        weapons: ["Dagger", "Hand Crossbow"],
        armor: [],
        special: [],
      },
      {
        name: "Equipamento Disponível",
        weapons: [
          "Adaga",
          "Espada",
          "Arma de Haste",
          "Lamentadoras",
          "Garras de Combat Skaven",
          "Funda",
          "Zarabatana",
          "Pistola de Gatilho-Bruxo",
        ],
        armor: ["Armadura Leve"],
        special: ["Pode comprar veneno sem fazer rolagens de Mercado Negro"],
      },
    ],
  },
  {
    name: "Ogro Rato",
    stats: {
      move: 16,
      fight: "+4",
      shoot: "0",
      armour: 12,
      will: "-2",
      health: 14,
      cost: "200 coroas",
    },
    abilities: [
      {
        name: "Monstruosidade do Clã Moulder",
        description:
          "Rat Ogres tem as características Grande, Forte, Animal e Aterrorizante.",
      },
      {
        name: "Escudon de Carne",
        description:
          "Atiradores não podem fazer ataques a distância contra outras figuras do bando do Ogro Rato se o este for a figura mais próxima.",
      },
      {
        name: "Equipamento Disponível",
        weapons: [],
        armor: [],
        special: ["Presas, Garras e Força Bruta!"],
      },
    ],
  },
];

const skavenEquipment = [
  {
    name: "Skaven Fighting Claws",
    description:
      "Skaven Fighting Claws count as if the user is using two daggers (+1 to fight due to Two Weapon Fighting rules and -1 damage) and occupies both its hands. Figures equipped with Skaven Fighting Claws can climb with no movement penalties.",
  },
];

const clanEshinMartialArts = [
  {
    name: "Estilo do Passo Efêmero",
    when: "No começo de uma ação de movimento do Assassino.",
    effect:
      "durante essa ação de movimento, o Assassino pode mover-se através de terreno como se não estivesse lá, mas não pode terminar seu movimento dentro de uma peça de terreno.",
  },
  {
    name: "Estilo da Ladrão Noturna",
    when: "Quando o Assassino é nomeado como alvo de um ataque a distância de uma figura. Adicionalmente, o Assassino deve estar em cover, ou deve haver terreno intermediário entre o atirador e o Assassino.",
    effect:
      "O ataque a distância automaticamente falha sem fazer rolagens. Esta habilidade não pode ser usada enquanto o Assassino está em combate. Aplica-se a ataques a distância causados por Magias.",
  },
  {
    name: "Estilo da Fome Negra",
    when: "Quando o Assassino vence uma luta com uma rolagem natural de 18, 19 ou 20.",
    effect: "Trate este ataque como um ataque crítico.",
  },
  {
    name: "Estilo da Ratazana Mercurial",
    when: "Durante a ação de movimento do Assassino.",
    effect:
      "Durante sua próxima ação de movimento, o Assassino recebe +8 a sua Agilidade e não sofre dano de queda.",
  },
  {
    name: "Estilo da Lamina-Bruxa",
    when: "No começo de uma ação de movimento do Assassino antes de qualquer ação ser tomada.",
    effect: `Para o resto da turno, o Assassino conta como se estivesse armado com uma arma mágica que lhe dá +2 de Ímpeto. Se o Assassino já estiver usando uma arma mágica, este efeito substitui qualquer bônus de ímpeto da arma, embora os bônus de dano e outras habilidades especiais sejam mantidos.`,
  },
  {
    name: "Estilo da Flecha Estridente",
    when: "Quando o Assassino faz um ataque a distância.",
    effect:
      "Nenhum modificador para cobertura ou terreno interposto é aplicado ao ataque. O Assassino deve ter linha de visão para declarar o ataque a distância.",
  },
  {
    name: "Estilo do Morcego Mortal",
    when: "Em qualquer ponto da ativação do Assassino.",
    effect: `O Assassino pode usar uma ação de movimento para fazer um movimento 'Pulo' em vez de um movimento normal, até o fim da sua ativação. Em um Pulo, o Assassino pode mover-se até a sua totalidade de movimento em uma linha reta, em qualquer direção (incluindo diretamente para cima), desde que essa linha seja livre de obstáculos. Se este movimento termina com o Assassino no ar, mova-o imediatamente de volta para a mesa e cause dano de queda apropriado. O Pulo não pode ser usado enquanto o Assassino está em combate. Esse movimento pode ser usado para declarar uma carga. Se a carga for completada, o Assassino recebe +2 de dano na próxima luta contra o alvo da carga.`,
  },
  {
    name: "Estilo do Chifre Corrompido",
    when: "Quando o Assassino faz um ataque a distância.",
    effect:
      "Se esse ataque a distância atingir o alvo, ele causa +3 de dano. Este efeito é cumulativo com outros modificadores de dano da arma.",
  },
  {
    name: "Estilo do Enxame de Ferrões",
    when: "Em qualquer ponto da ativação do Assassino.",
    effect:
      "O Assassino recebe uma ação adicional. Esta ação adicional não pode ser de movimento (portanto, o Assassino pode tomar um máximo de duas ações de movimento durante sua turno). Esta ação não pode levar o Assassino além de três ações.",
  },
  {
    name: "Estilo do Punho Faminto",
    when: "Em qualquer ponto da ativação do Assassino, como uma ação especial.",
    effect: `Este poder só pode ser usado contra um soldado carregando um Fragmento de Pedra-Bruxa dentro de 5cm do Assassino. Essa figura deve fazer um teste de Ímpeto contra a rolagem de ativação desse poder. Se falhar, a figura imediatamente solta o framento de pedra-bruxa e o Assassino pode movê-la a até 10cm em qualquer direção e pegar esse fragmento.`,
  },
  {
    name: "Estilo do Espectro Chifrudo",
    when: "Em qualquer ponto da ativação do Assassino.",
    effect: `Nenhuma figura pode traçar linha de visão para esta figura se estiver a mais de 30cm de distância e ganha +2 de Ímpeto quando rola contra ataques a distância, até ser atingido por um ataque a distância ou até o fim do turno, o que acontecer primeiro.`,
  },
  {
    name: "Estilo da Efemeração",
    when: "Em qualquer ponto da ativação do Assassino.",
    effect: `Como uma ação, o Assassino é removido da mesa. Então, durante sua próxima ativação, como uma ação, ele pode ser posicionado em qualquer ponto que não esteja a menos de 20cm de uma figura inimiga e esteja fora da linha de visão de todas as figuras inimigas. Se uma figura inimiga estiver fora da linha de visão de todas as figuras aliadas, o Assassino pode ser posicionado em combate com ela.`,
  },
];

function SkavenPage() {
  const navigate = useNavigate();

  const units = skavenUnits.map((unit) => ({
    id: slugify(unit.name, { lower: true }),
    label: unit.name,
    type: "Unit",
  }));

  const equipment = skavenEquipment.map((item) => ({
    id: slugify(item.name, { lower: true }),
    label: item.name,
    type: "Equipment",
  }));

  const martialArts = clanEshinMartialArts.map((power) => ({
    id: slugify(power.name, { lower: true }),
    label: power.name,
    type: "Clan Eshin Martial Art",
  }));

  const sections = [...units, ...equipment, ...martialArts];

  return (
    <PageContainer>
      <WarbandIndex sections={sections} />
      <Header title="Skaven of Clan Eshin" />

      <ContentSection>
        <ContentContainer>
          <div id="units">
            {skavenUnits.map((unit, index) => (
              <div key={index} id={slugify(unit.name, { lower: true })}>
                <UnitCard
                  name={unit.name}
                  role={unit.role}
                  stats={unit.stats}
                  abilities={unit.abilities}
                  {...(unit.spellAffinity && {
                    spellAffinity: unit.spellAffinity,
                  })}
                />
              </div>
            ))}
          </div>

          <div id="equipment">
            <PowerListTitle>Special Equipment</PowerListTitle>
            {skavenEquipment.map((item, index) => (
              <div key={index} id={slugify(item.name, { lower: true })}>
                <EquipmentCard
                  name={item.name}
                  description={item.description}
                />
              </div>
            ))}
          </div>

          <div id="martialarts">
            <PowerListTitle>Clan Eshin Martial Arts</PowerListTitle>

            <ParchmentText>
              The Clan Eshin styles are designed as a toolkit of deadly
              disciplines for assassins, each representing a secret technique
              that twists the flow of battle in their favor. Their design
              identity is rooted in{" "}
              <strong>mobility, deception, and surgical lethality</strong>
              . Instead of granting broad or constant advantages, they deliver
              sharp, situational bursts of power that allow the assassin to
              dictate when and how engagements occur.
              <br />
              <br />
              In short, the Clan Eshin Martial Arts are designed to make the
              assassin feel like an unpredictable blade in the dark: elusive,
              precise, and terrifying when unleashed at the right moment.
            </ParchmentText>

            {clanEshinMartialArts.map((power, index) => (
              <div key={index} id={slugify(power.name, { lower: true })}>
                <PowerCard
                  name={power.name}
                  when={power.when}
                  effect={power.effect}
                />
              </div>
            ))}
          </div>
        </ContentContainer>
      </ContentSection>

      <NavigationSection>
        <Box sx={{ maxWidth: "600px", width: "100%" }}>
          <StyledNavigationButton
            onClick={() => navigate("/warbands")}
            variant="outlined"
            fullWidth
            sx={{
              backgroundColor: "rgba(20, 18, 14, 0.6)",
              "&:hover": {
                backgroundColor: "rgba(28, 24, 18, 0.8)",
              },
            }}
          >
            Back to Warbands
          </StyledNavigationButton>
        </Box>
      </NavigationSection>
    </PageContainer>
  );
}

export default SkavenPage;
