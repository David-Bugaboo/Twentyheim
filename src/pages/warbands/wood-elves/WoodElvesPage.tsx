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

const woodElvesUnits = [
  {
    name: "Senhor da Clareira",
    role: "Herói",
    stats: {
      move: 18,
      fight: "0",
      shoot: "+3",
      armour: 9,
      will: "+5",
      health: 16,
      cost: "-",
    },
    abilities: [
      {
        name: "Poderes",
        description:
          "O Senhor da Clareira começa com 5 poderes da lista de Caminhos da Caçada Selvagem. Um desses poderes é seu Caminho assinatura e tem um número de ativação de 3. O resto dos poderes tem um número de ativação de 5.",
      },
      {
        name: "Mestre Arqueiro",
        description:
          "O Senhor da Clareira pode fazer uma ação especial de 'mirar'. Se esta ação for imediatamente seguida por uma ação de tiro na mesma ativação, o Senhor da Clareira pode ignorar o primeiro pedaço de terreno interposto (mas não cobertura) entre ele e seu alvo.",
      },
      {
        name: "Passo da Floresta",
        description:
          "O Senhor da Clareira nunca sofre penalidades de movimento por terreno acidentado.",
      },
      {
        name: "Equipamento Disponível",
        weapons: [
          "Adaga",
          "Espada",
          "Arma de Duas Mãos",
          "Arma de Haste",
          "Arco",
          "Longo Arco",
          "Arco Élfico",
        ],
        armor: ["Armadura Leve", "Escudo"],
        special: [
          "Pode comprar armas ou armaduras com modificador De Ithilmar por valor da arma + 300 coroas sem fazer rolagens de Mercado Negro",
        ],
      },
    ],
  },
  {
    name: "Lirista Arcano",
    role: "Campeão",
    stats: {
      move: 7,
      fight: "0",
      shoot: "0",
      armour: 8,
      will: "+4",
      health: 12,
      cost: "100 coroas",
      spellAffinity: {
        aligned0: ["Tradição da Vida"],
        aligned1: [
          "Tradição das Bestas, Tradição da Luz, Tradição das Sombras, Tradição do Metal",
        ],
      },
    },
    abilities: [
      {
        name: "Conjurador",
        description:
          "O Lirista Arcano é um conjurador da Tradição da Vida. Ele começa com 4 magias, sendo 3 da tradição da vida e a outra de qualquer uma das tradições associadas.",
      },
      {
        name: "Caminho da Floresta",
        description:
          "Uma vez por jogo, o Cantor de Magia pode gastar uma ação para se teletransportar para qualquer lugar que seja a menos de 3cm de um Ente ou Senhor da Clareira, desde que não esteja a menos de 20cm de uma figura inimiga. Ele não pode conjurar no turno em que usa esta habilidade.",
      },
      {
        name: "Equipamento Disponível",
        weapons: [
          "Adaga",
          "Espada",
          "Arma de Duas Mãos",
          "Arma de Haste",
          "Arco",
          "Longo Arco",
          "Arco Élfico",
          "Cajado",
        ],
        armor: [],
        special: [
          "Pode comprar armas ou armaduras com modificador De Ithilmar por valor da arma + 300 coroas sem fazer rolagens de Mercado Negro",
        ],
      },
    ],
  },
  {
    name: "Batedor da Clareira",
    stats: {
      move: 18,
      fight: "+1",
      shoot: "+0",
      armour: 9,
      will: "+0",
      health: 8,
      cost: "Free",
    },
    abilities: [
      {
        name: "Equipamento Disponível",
        weapons: [
          "Adaga",
          "Machado",
          "Espada",
          "Arma de Concussão",
          "Arco",
          "Arco Longo",
          "Arco Élfico",
        ],
        armor: ["Armadura Leve"],
        special: [
          "Pode comprar armas ou armaduras com modificador De Ithilmar por valor da arma + 300 coroas sem fazer rolagens de Mercado Negro",
        ],
      },
    ],
  },
  {
    name: "Guardião da Clareira",
    stats: {
      move: 18,
      fight: "+1",
      shoot: "+2",
      armour: 9,
      will: "+1",
      health: 8,
      cost: "50 coroas",
    },
    abilities: [
      {
        name: "Equipamento Disponível",
        weapons: [
          "Adaga",
          "Machado",
          "Espada",
          "Arma de Concussão",
          "Arco",
          "Arco Longo",
          "Arco Élfico",
        ],
        armor: ["Armadura Leve"],
        special: [
          "Pode comprar armas ou armaduras com modificador De Ithilmar por valor da arma + 300 coroas sem fazer rolagens de Mercado Negro",
        ],
      },
    ],
  },
  {
    name: "Elfo Centauro",
    stats: {
      move: 20,
      fight: "+3",
      shoot: "+0",
      armour: 9,
      will: "0",
      health: 10,
      cost: "75 coroas",
    },
    abilities: [
      {
        name: "Fúria da Caçada Selvagem",
        description:
          "Cavaleiros Selvagens têm Mente de Ferro e são Imunes a Aterrorizante. Além disso, se um Cavaleiro Selvagem se move pelo menos 14cm antes de completar uma carga, eles ganham +1 de Dano para a primeira luta depois disso.",
      },
      {
        name: "Imprudencia Selvagem",
        description:
          "Cavaleiros Selvagens devem sempre declarar carga contra a figura inimiga mais próxima se não estiverem já em combate. Caso não possam declarar carga, devem se mover na direção do inimigo visível mais próximo Se um inimigo estiver visível e for a figura inimiga mais proxima, e eles não terminaram sua ativação mais próximos daquele inimigo do que estavam antes da ativação atual, eles ganham um marcador de Atordoamento.",
      },
      {
        name: "Cavaleiros da Floresta",
        description:
          "Cavaleiros Selvagens nunca sofrem penalidades de movimento por qualquer terreno, mas não podem escalar.",
      },
      {
        name: "Equipamento",
        weapons: [
          "Adaga",
          "Espada",
          "Machado",
          "Arma de Duas Mãos",
          "Arma de Haste",
          "Arma de Arremesso",
        ],
        armor: ["Armadura Leve"],
        special: [
          "Pode comprar armas ou armaduras com modificador De Ithilmar por valor da arma + 300 coroas sem fazer rolagens de Mercado Negro",
        ],
      },
    ],
  },
  {
    name: "Odalisca da Guerra",
    stats: {
      move: 20,
      fight: "+4",
      shoot: "+0",
      armour: 9,
      will: "+1",
      health: 12,
      cost: "120 coroas",
    },
    abilities: [
      {
        name: "Dança de Guerra",
        description:
          "Odaliscas de Guerra lutam enquanto performam uma dança brutal, e suas lâminas nunca parar de girar, fazendo uma horda de inimigos serem triviais para ela. Seus oponentes nunca podem reivindicar mais que +2 por figuras de apoio, não importa quantas figuras aliadas estejam realmente em combate com o Dançarino de Guerra. Além disso, se o Dançarino de Guerra vencer um combate corpo a corpo contra um oponente que esteja usando armadura leve ou pesada, esse oponente sofre -1 de armadura para determinar o dano do ataque do Dançarino de Guerra.",
      },
      {
        name: "Acrobático",
        description:
          "Dançarinos de Guerra nunca sofrem dano de queda de quedas de 14cm ou menos.",
      },
      {
        name: "Equipamento",
        weapons: ["Adaga", "Arma de Duas Mãos", "Arma de Haste"],
        armor: ["Armadura Leve"],
        special: [],
      },
    ],
  },
  {
    name: "Vigilante",
    stats: {
      move: 18,
      fight: "+1",
      shoot: "+3",
      armour: 9,
      will: "+2",
      health: 10,
      cost: "100 coroas",
    },
    abilities: [
      {
        name: "Fantasma da Floresta",
        description:
          'Devido às suas habilidades de furtividade e camuflagem, nenhuma figura pode traçar linha de visão para um Vigilante que esteja a mais de 40cm de distância ou em qualquer tipo de cobertura. Além disso, se uma figura não conseguir traçar linha de visão para o Vigilante de Caminho devido a esta habilidade, o Vigilante de Caminho pode fazer uma ação especial de "Franco-atirador" contra essa figura. Se esta ação for tomada, seu próximo ataque a distância pode ignorar o primeiro pedaço de terreno interposto entre o Vigilante e o alvo.',
      },
      {
        name: "Equipamento Disponível",
        weapons: [
          "Adaga",
          "Machado",
          "Espada",
          "Arma de Concussão",
          "Arco",
          "Arco Longo",
          "Arco Élfico",
        ],
        armor: ["Armadura Leve"],
        special: [
          "Pode comprar armas ou armaduras com modificador De Ithilmar por valor da arma + 300 coroas sem fazer rolagens de Mercado Negro",
        ],
      },
    ],
  },

  {
    name: "Treant",
    stats: {
      move: 4,
      fight: "+2",
      shoot: "-",
      armour: 15,
      will: "+3",
      health: 24,
      cost: "200 coroas",
    },
    abilities: [
      {
        name: "Guardião Ancestral",
        description:
          "O Ent tem a característica Grande. Sua pele é grossa como casca, mas tem Vulnerabilidade Elemental(3).",
      },
      {
        name: "Presença da Floresta",
        description:
          "Enquanto o Ent não sofreu dano Elemental durante este turno, todas as figuras aliadas a 14cm dele contam como tendo Cobertura Pesada.",
      },
    ],
  },
];

const woodElvesEquipment = [
  {
    name: "Arco Longo Asrai",
    description:
      "Um Arco Longo Asrai é um arco obra-prima forjado da madeira viva de Athel Loren. Alcance: 75cm, trate a armadura de uma figura atingida por um Ataque a Distância deste arco como 1 ponto menor.",
  },
  {
    name: "Flecha de Fogo Lunar",
    description:
      "Uma Flecha de Fogo Lunar é uma única flecha mágica que pode ser disparada uma vez por jogo. Quando declarada, a flecha acerta automaticamente se o alvo estiver no alcance e linha de visão (nenhuma rolagem de Tiro necessária). A flecha causa +3 de Dano e a armadura do alvo é reduzida para 10 para calcular o dano. Custo: 30 coroas (uso único).",
  },
];

const waysOfTheWildHunt = [
  {
    name: "Caminho da Bênção da Floresta",
    when: "No início de qualquer turno, antes de rolar iniciativa.",
    effect:
      "O Bando do do Senhor da Clareira automaticamente vence a iniciativa esse turno. Se um ou mais bandos ativaram efeitos similares, rolem entre si para definir a ordem.",
  },
  {
    name: "Caminho da Chuva de Flechas=",
    when: "A qualquer momento durante a ativação do Senhor da Clareira.",
    effect:
      "O Senhor da Clareira imediatamente ganha uma ação extra. Esta ação só pode ser usada para fazer ataques a distância. Este poder não pode levar o Senhor da Clareira além de 3 ações.",
  },
  {
    name: "Caminho da Trilha Oculta",
    when: "A qualquer momento durante a ativação do Senhor da Clareira.",
    effect:
      "O Senhor da Clareira é removido da mesa. Durante sua próxima ativação, ele pode ser colocado em qualquer lugar na mesa que não esteja a 20cm de uma figura inimiga em cobertura.",
  },
  {
    name: "Caminho da Flecha de Fogo Lunar",
    when: "A qualquer momento durante a ativação do Senhor da Clareira, se houver um Cantor de Magia no bando.",
    effect:
      "Se o Senhor da Clareira fizer uma ação de luta ou ataque a distância contra uma criatura e causar pelo menos 1 de dano, a próxima Rolagem de Conjuração de uma magia feita contra essa criatura pelo Lirista Arcano é feita com +2.",
  },
  {
    name: "Caminho da Fúria da Caçada Selvagem",
    when: "A qualquer momento durante a ativação do Senhor da Clareira.",
    effect:
      "Até o final de sua ativação, o Senhor da Clareira ganha +2 de Ímpeto, +4 de Agilidade e pode atacar com qualquer arco como se fosse uma Arma de Duas Mãos. Ele deve, no entanto, declarar carga contra uma figura inimiga. Se ele não conseguir fazer isso, não pode usar este poder.",
  },
  {
    name: "Caminho do Tiro Supressor",
    when: "Sempre que uma figura inimiga declara carga contra qualquer elfo da floresta.",
    effect:
      "Se o Senhor da Clareira tiver alcance e linha de visão contra a figura inimiga, ele pode imediatamente fazer um Ataque a Distância contra essa criatura. Essa criatura recebe -2 de Ímpeto para aquele combate.",
  },
  {
    name: "Caminho do Flecha Inerrável",
    when: "Sempre que o Senhor da Clareira acerta uma figura com um Ataque a Distância, com uma rolagem natural de 18, 19 ou 20.",
    effect: "o ataque conta como um ataque crítico.",
  },
  {
    name: "Caminho da Fúria da Clareira",
    when: "Sempre que qualquer figura Elfo da Floresta é reduzida a 0 de Vida a 30cm do Senhor da Clareira.",
    effect:
      "O Senhor da Clareira e todos os Guardiões da Casca a 14cm dele ganham +1 de Ímpeto, Precisão e  Dano até o final do turno conforme a fúria da floresta é desencadeada.",
  },
  {
    name: "Caminho do Farol de Fogo Lunar",
    when: "Sempre que o Senhor da Clareira acerta uma figura com um Ataque a Distância feito usando uma Flecha de Fogo Lunar.",
    effect:
      "A figura inimiga ganha um marcador de Marcado pela Lua. Qualquer Elfo da Floresta atirando contra esta figura ignora o primeiro pedaço de terreno interposto entre ele e a figura. Efeitos que tornam impossível traçar linha de visão se não estiver dentro de distância X também são anulados. Uma figura perde o marcador de Marcado pela Lua no início de sua ativação.",
  },
  {
    name: "Caminho da Guardião Ancestral",
    when: "A qualquer momento durante a ativação do Senhor da Clareira, como uma ação de movimento.",
    effect:
      "O Senhor da Clareira pode escalar um Ent a 5cm de si mesmo. Enquanto montado no Ent, qualquer ataque direcionado a ele é tratado como se fosse contra Cobertura Pesada e usa a armadura do Ent, mas também ganha a propriedade Vulnerabilidade Elemental(3) do Ent. O Senhor da Clareira ganha +1 de Precisão enquanto estiver montado no Ent.",
  },
  {
    name: "Caminho do Perfurador de Carvalho",
    when: "A qualquer momento durante a ativação do Senhor da Clareira, como uma ação.",
    effect:
      "O Senhor da Clareira traça uma linha reta de qualquer ponto de sua base até qualquer borda ou canto do campo de batalha. Qualquer criatura nesta linha sofre um Ataque a Distância usando a precisão do Senhor da Clareira.",
  },
  {
    name: "Caminho do Abraço da Floresta",
    when: "A qualquer momento durante a ativação do Senhor da Clareira, como uma ação (pode substituir uma ação de movimento).",
    effect:
      "A área a 14cm do Senhor da Clareira se torna um fragmento de Athel Loren. Elfos da Floresta e Entes dentro desta área contam como estando em Cobertura Pesada, e recuperam 2 de Vigor no início de suas ativações. Se o Senhor da Clareira sofrer dano elemental, o efeito deste poder termina imediatamente.",
  },
];

function WoodElvesPage() {
  const navigate = useNavigate();

  const units = woodElvesUnits.map((unit) => ({
    id: slugify(unit.name, { lower: true }),
    label: unit.name,
    type: "Unit",
  }));

  const equipment = woodElvesEquipment.map((item) => ({
    id: slugify(item.name, { lower: true }),
    label: item.name,
    type: "Equipment",
  }));

  const ways = waysOfTheWildHunt.map((power) => ({
    id: slugify(power.name, { lower: true }),
    label: power.name,
    type: "Way",
  }));

  const sections = [...units, ...equipment, ...ways];

  return (
    <PageContainer>
      <WarbandIndex sections={sections} />
      <Header title="Wood Elves of Athel Loren" />

      <ContentSection>
        <ContentContainer>
          <div id="units">
            {woodElvesUnits.map((unit, index) => (
              <div key={index} id={slugify(unit.name, { lower: true })}>
                <UnitCard
                  name={unit.name}
                  role={unit.role}
                  stats={unit.stats}
                  abilities={unit.abilities}
                />
              </div>
            ))}
          </div>

          <div id="equipment">
            <PowerListTitle>Special Equipment</PowerListTitle>
            {woodElvesEquipment.map((item, index) => (
              <div key={index} id={slugify(item.name, { lower: true })}>
                <EquipmentCard
                  name={item.name}
                  description={item.description}
                />
              </div>
            ))}
          </div>

          <div id="ways">
            <PowerListTitle>Ways of the Wild Hunt</PowerListTitle>

            <ParchmentText>
              The Ways of the Wild Hunt represent the ancient traditions of the
              Wood Elves, blending martial prowess with the primal magic of
              Athel Loren. These powers emphasize{" "}
              <strong>
                mobility, deadly archery, and harmony with the forest itself
              </strong>
              . From disappearing into hidden paths to unleashing storms of
              arrows, each Way reflects the savage grace and supernatural
              connection to nature that defines the Wood Elves.
              <br />
              <br />
              In short, the Ways of the Wild Hunt are designed to make the Glade
              Lord feel like a master hunter and guardian of the forest — swift,
              deadly, and one with the wild.
            </ParchmentText>

            {waysOfTheWildHunt.map((power, index) => (
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

export default WoodElvesPage;
