import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

import Header from "../../components/Header";
import UnitCard from "../../components/UnitCard";
import PowerCard from "../../components/PowerCard";
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

const witchHuntersUnits = [
  {
    name: "Inquisidor",
    role: "Herói",
    stats: {
      move: 14,
      fight: "+3",
      shoot: "+2",
      armour: 10,
      will: "+5",
      health: 16,
      cost: "-",
    },
    abilities: [
      {
        name: "Éditos da Inquisição",
        description:
          "O Inquisidor começa com 5 poderes das Listas de Éditos da Inquisição. Um desses poderes tem Classe de Dificuldade 3. Os outros poderes têm classe de dificuldade 5.",
      },
      {
        name: "Queimem a Bruxa!",
        description:
          "Inquisitor tem +1 de ímpeto e +1 de dano contra qualquer conjurador.",
      },
      {
        name: "Equipamento",
        weapons: [
          "Adaga",
          "Machado",
          "Arma de Concussão",
          "Espada",
          "Arma de Duas Mãos",
          "Besta",
          "Besta de Mão",
          "Pistola",
        ],
        armor: ["Armadura Leve", "Armadura Pesada", "Escudo"],
        special: [],
      },
    ],
  },
  {
    name: "Warrior Priest of Sigmar",
    role: "Campeão",
    stats: {
      move: 14,
      fight: "+2",
      shoot: "+0",
      armour: 10,
      will: "+4",
      health: 14,
      cost: "100 coroas",
    },
    spellAffinity: {
      aligned0: ["Orações de Sigmar"],
    },
    abilities: [
      {
        name: "Sacerdote",
        description:
          "O Sacerdote Guerreiro de Sigmar é um sacerdote e tem uma seleção muito limitada de magias comparado a outros conjuradores. No entanto, pode conjurar enquanto usa armaduras e escudos e conjurar em combate. O sacerdote começa com 3 magias das orações de sigmar.",
      },
      {
        name: "Equipamento",
        weapons: [
          "Adaga",
          "Machado",
          "Arma de Concussão",
          "Espada",
          "Arma de Duas Mãos",
          "Besta",
          "Besta de Mão",
          "Pistola",
        ],
        armor: ["Armadura Leve", "Armadura Pesada", "Escudo"],
        special: [],
      },
    ],
  },
  {
    name: "Fanático",
    stats: {
      move: 14,
      fight: "+1",
      shoot: "+0",
      armour: 10,
      will: "0",
      health: 10,
      cost: "Free",
    },
    abilities: [
      {
        name: "Equipamento",
        weapons: [
          "Adaga",
          "Machado",
          "Arma de Concussão",
          "Arma de Duas Mãos",
          "Arma de Haste",
          "Arco",
          "Arco Curto",
        ],
        armor: ["Armadura Leve", "Escudo"],
        special: [],
      },
    ],
  },
  {
    name: "Warhound",
    stats: {
      move: 18,
      fight: "+1",
      shoot: "+0",
      armour: 10,
      will: "0",
      health: 8,
      cost: "10 coroas",
    },
    abilities: [
      {
        name: "Equipamento",
        weapons: [],
        armor: [],
        special: ["Cães de Guerra atacam com dentes e garras"],
      },
      {
        name: "Cão de Guerra Treinado",
        description: "O cão de guerra tem a característica Animal.",
      },
    ],
  },
  {
    name: "Caçador de Bruxas",
    stats: {
      move: 6,
      fight: "+3",
      shoot: "+2",
      armour: 10,
      will: "+2",
      health: 12,
      cost: "100 coroas",
    },
    abilities: [
      {
        name: "Queimem a Bruxa!",
        description:
          "Caçadores de Bruxas têm +1 de dano e  +1 de Luta contra conjuradores.",
      },
      {
        name: "Equipamento",
        weapons: [
          "Adaga",
          "Machado",
          "Arma de Concussão",
          "Espada",
          "Arma de Duas Mãos",
          "Besta",
          "Besta de Mão",
          "Pistola",
        ],
        armor: ["Armadura Leve", "Armadura Pesada", "Escudo"],
        special: [],
      },
    ],
  },
  {
    name: "Flagelante",
    stats: {
      move: 14,
      fight: "+4",
      shoot: "+0",
      armour: 10,
      will: "+4",
      health: 10,
      cost: "100 coroas",
    },
    abilities: [
      {
        name: "Determinação Fanática",
        description: "Esse modelo tem a característica Determinação Fanática.",
      },
      {
        name: "Equipamento",
        weapons: ["Arma de Duas Mãos"],
        armor: [],
        special: [],
      },
    ],
  },
];

const inquisitionEdicts = [
  {
    name: "Édito de Condenação",
    when: "A qualquer momento durante a ativação do Inquisidor.",
    effect: `O Inquisidor pode escolher qualquer figura dentro de sua linha de visão. Até o final do turno, essa figura ganha Recompensa (X), com X sendo seu custo. Heróis valem 150 coroas. Figuras aliadas têm +1 de Luta contra essa figura enquanto este efeito durar.`,
  },
  {
    name: "Édito do Silenciamento",
    when: "Durante a ativação de qualquer conjurador.",
    effect: `Conjuradores inimigos dentro de 14" do Inquisidor rolam sua rolagem de conjuração com -4 até o fim desta ativação.`,
  },
  {
    name: "Edict da Queima de Bruxas",
    when: "Quando o Inquisidor causa pelo menos 3 de dano a um conjurador.",
    effect: "O conjurador recebe um marcador de Chamas.",
  },
  {
    name: "Edict da Rajada de Aço",
    when: "A qualquer momento durante a ativação do Inquisidor.",
    effect:
      "O Inquisidor recebe uma ação extra. Essa ação pode ser usada apenas para atacar com sua arma da mão secundária, sem bonus de Lutar com Duas Mãos.",
  },
  {
    name: "Édito de Acusação",
    when: "Quando uma figura declara carga contra Inquisidor.",
    effect: `Essa figura deve rolar um teste de Vontade com um CD igual à rolagem de ativação deste poder para completar sua carga. Se falhar, sua ação é cancelada e perdida. Édito de Acusação não pode ser usado contra Heróis e Campeões.`,
  },
  {
    name: "Édito do Caçador Inabalável",
    when: "Quando o Inquisidor acerta um ataque a distância e rola um  18, 19 ou 20 naturais.",
    effect: "Esse ataque é considerado um ataque crítico",
  },
  {
    name: "Édito do Fanatismo",
    when: "A qualquer momento durante a ativação do Inquisidor.",
    effect:
      "Escolha um membro do bando que tenha sido reduzido a 0 de Vida durante o jogo. Essa figura retorna para o tabuleiro, adjacente à figura que ativa este poder. A figura tem 1 de Vida e é considerada Ferida. Eles são tratados como um membro normal do bando em todos os outros aspectos. Qualquer figura pode ser retornada à mesa apenas uma vez por jogo através do uso de Édito do Fanatismo.",
  },
  {
    name: "Édito do Preconceito Extremo",
    when: "A qualquer momento durante a ativação do Inquisidor.",
    effect:
      "Escolha um Caçador de Bruxas ou Flagelante a 8cm do inquisidor. Essa figura ganha um marcador de Ódio.",
  },
  {
    name: "Edict da Iniciativa",
    when: "A qualquer momento.",
    effect: `O Inquisidor pode se mover imediatamente 5cm em qualquer direção, incluindo fora do combate. Nenhuma figura pode interceptá-lo durante este movimento. O Inquisidor pode declarar uma carga com esse movimento, mas não pode sair da mesa.`,
  },
  {
    name: "Édito do Confisco",
    when: "A qualquer momento durante a ativação do inquisidor, como uma ação.",
    effect: `Este poder atinge um fragmento de pedra-bruxa ou uma figura que esteja carregando tal marcador, dentro de 20cm do inquisidor. Se o fragmento não estiver sendo carregado, o Inquisidor pode mover o fragmento 10cm em qualquer direção. Se uma figura estiver carregando o fragmento alvo, então essa figura deve rolar um teste de Vontade (CD16). Se falhar, a figura imediatamente solta o fragmento e o Inquisidor pode move-lo até 10cm em qualquer direção.`,
  },
  {
    name: "Édito da Trégua",
    when: "Quando o Inquisidor vence um combate corpo a corpo, mesmo que não cause dano.",
    effect:
      "O Inquisidor não causa dano, mas pode escolher uma arma que o inimigo esteja carregando e desarmá-lo. A figura desarmada perde o uso dessa arma para o resto do jogo, mas recupera ela gratuitamente após o jogo.",
  },
  {
    name: "Édito da Repreensão",
    when: "Quando um ataque a distância é feito contra o Inquisidor.",
    effect:
      "O ataque a distância é automaticamente esquivado e a ação do atirador é perdida. Se uma figura inimiga estiver a 8cm do Inquisidor, essa figura sofre o ataque ao invés disso.",
  },
];

function WitchHuntersPage() {
  const navigate = useNavigate();

  const units = witchHuntersUnits.map((unit) => ({
    id: slugify(unit.name, { lower: true }),
    label: unit.name,
    type: "Unit",
  }));

  const edicts = inquisitionEdicts.map((power) => ({
    id: slugify(power.name, { lower: true }),
    label: power.name,
    type: "Inquisition Edict",
  }));

  const sections = [...units, ...edicts];

  return (
    <PageContainer>
      <WarbandIndex sections={sections} />
      <Header title="Witch Hunters" />

      <ContentSection>
        <ContentContainer>
          <div id="units">
            {witchHuntersUnits.map((unit, index) => (
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

          <div id="edicts">
            <PowerListTitle>Inquisition Edicts</PowerListTitle>

            <ParchmentText>
              The Inquisition Edicts are battlefield decrees that embody
              authority, zeal, and ruthless judgment. They are not mere tricks
              or tactics, but proclamations of faith and law that reshape the
              fight through fear, control, and fanatic conviction. Their design
              emphasizes{" "}
              <strong>
                targeted suppression, divine punishment, and the rallying of
                allies under uncompromising will
              </strong>
              .
              <br />
              <br />
              In short, the Inquisition Edicts are designed to transform the
              Inquisitor into a living embodiment of fanatic justice: a figure
              who bends allies and enemies alike to his unyielding vision,
              punishing heresy with fire, steel, and unbreakable will.
            </ParchmentText>

            {inquisitionEdicts.map((power, index) => (
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

export default WitchHuntersPage;
