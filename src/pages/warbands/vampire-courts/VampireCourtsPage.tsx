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

const vampireCourtsUnits = [
  {
    name: "Conde Vampiro",
    role: "Herói",
    stats: {
      move: 14,
      fight: "+3",
      shoot: "+2",
      armour: 10,
      will: "+5",
      health: 20,
      cost: "-",
    },
    abilities: [
      {
        name: "Poderes",
        description:
          "Os Vampiros começam com 5 poderes das Tradições da Linhagem. Um desses poderes é tem classe de dificuldade 3. Os outros têm classe de dificuldade 5.",
      },
      {
        name: "Morto-Vivo Superior",
        description:
          "Condes Vampiros tem as seguintes características: Morto-Vivo, Immune a Édito de Nagash, Ataques Mágicos, Mentes-Férreas, Vulnerabilidade a Orações, Visão Verdadeira, Resistência a Dano Normal, e Aterrorizante. Apesar de serem mortos vivos, ganham experiencia, e tem 5 espaços para equipamento como normal.",
      },
      {
        name: "Constituição de Morto-Vivo",
        description:
          "O Vampiro é morto-vivo e não pode ser curado por orações e remédios ou curar naturalmente entre jogos. Em vez disso, ele deve pagar 5 coroas para cada ponto de vida que ele recupera. Se um vampiro for reduzido a 0 pontos de vida durante um jogo e não tiver pelo menos 5 coroas na sua ficha de bando, ele será tratado como tendo rolado um resultado de Morto na tabela de Sobrevivência.",
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
          "Arco",
          "Arco Curto",
          "Besta",
        ],
        armor: ["Armadura Leve", "Escudo"],
        special: [],
      },
    ],
  },
  {
    name: "Necromante",
    role: "Campeão",
    stats: {
      move: 12,
      fight: "+1",
      shoot: "+0",
      armour: 10,
      will: "+4",
      health: 12,
      cost: "100 coroas",
    },
    spellAffinity: {
      aligned0: ["Tradição da Necromancia"],
      aligned2: [
        "Tradição da Morte",
        "Tradição das Sombras",
        "Tradição do Metal",
        "Tradição dos Céus",
      ],
    },
    abilities: [
      {
        name: "Conjurador",
        description:
          "Necromantes são conjuradores da Tradição da Necromancia. Eles começam o jogo com 4 magias, 3 das quais devem ser da'Tradição da Necromancia e a outra de qualquer uma das tradições associadas.",
      },
      {
        name: "Graverobber",
        description:
          "O necromante ganha 10 pontos de experiência para cada criatura sem as características Animal, Morto-Vivo, Daemônio e Construto que foi reduzida a 0 pontos de vida durante este jogo, independentemente de por quem.",
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
          "Arco",
          "Arco Curto",
          "Besta",
        ],
        armor: [],
        special: [],
      },
    ],
  },
  {
    name: "Zumbi Superior",
    stats: {
      move: 10,
      fight: "+1",
      shoot: "+0",
      armour: 12,
      will: "+0",
      health: 8,
      cost: "free",
    },
    abilities: [
      {
        name: "Equipamento Disponível",
        weapons: [],
        armor: [],
        special: ["Zombies grab and bite their poor victims"],
      },
      {
        name: "Morto-Vivo",
        description: "Zombies tem a característica Morto-Vivo.",
      },
      {
        name: "Acéfalo",
        description: "Zumbis não podem ganhar experiência.",
      },
    ],
  },

  {
    name: "Lobos Atrozes",
    stats: {
      move: 18,
      fight: "+2",
      shoot: "+0",
      armour: 10,
      will: "+2",
      health: 10,
      cost: "50 coroas",
    },
    abilities: [
      {
        name: "Besta Reanimada",
        description:
          "Lobos Atrozes tem as características Morto-Vivo e Aterrorizante.",
      },
      {
        name: "Equipamento Disponível",
        weapons: [],
        armor: [],
        special: ["Lobos Atrozes matam com suas garras e presas"],
      },
    ],
  },
  {
    name: "Escória",
    stats: {
      move: 14,
      fight: "+0",
      shoot: "+0",
      armour: 10,
      will: "0",
      health: 10,
      cost: "75 coroas",
    },
    abilities: [
      {
        name: "Sunjulgado",
        description:
          "Se essa figura participa de um jogo e não sofre os resultados Morto ou Seriamente Ferido em uma rolagem na tabela de sobrevivência, ela pode coletar o sangue dos mortos e feridos para seu mestre. Conte o numero de figuras reduzidas a 0 de vida durante esse jogo. Para cada uma dessas figuras, o vampiro recupera 1 de vida após o jogo, sem precisar pagar por isso. O Vampiro pode se beneficiar dessa habilidade de apenas uma figura, independente de quantas figuras existam com essa habilidade.",
      },
      {
        name: "Equipamento Disponível",
        weapons: ["Adaga", "Machado", "Funda", "Arco Curto"],
        armor: [],
        special: [],
      },
    ],
  },
  {
    name: "Carniçal",
    stats: {
      move: 14,
      fight: "+3",
      shoot: "+0",
      armour: 10,
      will: "+1",
      health: 12,
      cost: "75 coroas",
    },
    abilities: [
      {
        name: "Equipamento Disponível",
        weapons: [],
        armor: [],
        special: ["Carniçais atacam com suas garras e dentes"],
      },
      {
        name: "Fome insáciável",
        description: "Ghouls tem a característica Voraz.",
      },
      {
        name: "Terror dos Cemitérios",
        description:
          "Carniçais tem as características Morto-Vivo e Aterrorizante.",
      },
    ],
  },
];

const bloodlineTraditions = [
  {
    name: "Tradição do Glamour",
    when: "Quando uma criatura luta contra o vampiro.",
    effect:
      "A criatura deve fazer uma rolagem de Vontade contra um CD igual a rolagem de ativação deste poder. O ataque não acontece e a ação é perdida.",
  },
  {
    name: "Tradição do Sanguessuga",
    when: "Quando o Vampiro vence um combate e causa pelo menos 3 de dano.",
    effect:
      "O Vampiro recupera 3 de vida e a figura que sofreu o dano ganha um marcador de sangramento. Se a figura já tiver um marcador de sangramento, o vampiro recupera 2 de vida extra.",
  },
  {
    name: "Tradição da Forma de Névoa",
    when: "Em qualquer momento durante a ativação do vampiro.",
    effect: `O vampiro se transforma parcialmente em névoa até o inicio da sua próxima ativação. Enquanto estiver na forma de névoa, ninguém pode traçar linha de visão para essa figura se estiver a mais de 30cm de distância. Além disso, ele ganha +2 de Ímpeto ao fazer uma rolagem de Luta contra qualquer ataque a distância, até ser atingido por um ataque a distância ou até o final do turno, o que acontecer primeiro.`,
  },
  {
    name: "Tradição do Enxame Estridente",
    when: "Em qualquer momento durante a ativação do vampiro.",
    effect:
      "O vampiro se transforma em um enxame de ratos vorazes. Durante sua próxima ação de movimento, o vampiro pode se mover através do terreno como se não estivesse lá, mas não pode terminar seu movimento dentro de uma peça de terreno. Além disso, a criatura nunca sofre nenhum penalidade de movimento para escalar ou mover sobre terreno irregular. O vampiro pode se mover através de figuras inimigas (mas não pode terminar seu movimento dentro delas), e quando faz isso, não pode ser interceptado, causando 2 de dano a qualquer criatura que ele atravesse.",
  },
  {
    name: "Tradição do Predador Lunar",
    when: "Em qualquer momento durante a ativação do vampiro.",
    effect: `O vampiro se transforma em um Lobo Atroz enorme. O vampiro ganha as características Grande e Forte, e ganha 4 de agilidade, mas não beneficia de armadura e armas enquanto transformado, inclusive mágicas. O Vampiro não pode carregar tesouros, mas não conta como um animal. Qualquer Lobo Atroz de 15cm de distância do vampiro ganha +2 de Vontade enquanto ele estiver transformado.`,
  },
  {
    name: "Tradição da Tirania",
    when: "Em qualquer momento durante a ativação do vampiro.",
    effect: `O vampiro pode ativar junto a sim figuras a até 16cm ao invés de 8cm.`,
  },
  {
    name: "Tradição da Fúria Sanguínea",
    when: "Quando o vampiro luta.",
    effect:
      "O vampiro ganha Dreno de Energia durante esse ataque apenas. Contudo, se perder a luta, recebe um marcador de Atordoamento.",
  },
  {
    name: "Tradição da Hipnose",
    when: "Em qualquer momento durante a ativação do vampiro, como uma ação.",
    effect: `um soldado alvo a até 30cm deve rolar um teste de vontade com CD igual a rolagem de ativação deste poder. Se a criatura falhar, até o inicio da sua próxima ativação ela se torna um membro temporário deste bando. A figura não pode fazer ações auto-deprecativas como cair propositalmente ou sair da mesa, mas pode lutar e atirar normalmente. Quando essa figura causa dano, o vampiro recupera 2 de vida. A criatura deve rolar Vontade contra a rolagem de ativação desse poder sempre que sofrer dano.`,
  },
  {
    name: "Tradição do Ancestral Caído",
    when: "Em qualquer momento durante a ativação do vampiro.",
    effect:
      "The vampiro se transforma em um Morcego Atroz. Ele ganha Voador, Agarrar e Toque Vampírico, mas não se beneficias de armas e armaduras, inclusive mágicas enquanto estiver transformado. Figuras atacadas pelo vampiro nessa forma que recebam pelo menos 4 de dano ganham um marcador de sangramento.",
  },
  {
    name: "Tradição da Espiral Sanguínea",
    when: "Em qualquer momento durante a ativação do vampiro.",
    effect: `Qualquer criatura com marcadores de sangramento a até 22cm do vampiro sofre um ataque mágico de +3. Para cada criatura atingida por um desses ataques, o vampiro recupera 2 de vida. Criaturas atingidas por esse ataque removem seus marcadores de sangramento.`,
  },
  {
    name: "Tradição of Sedução",
    when: "Em qualquer momento durante a ativação do vampiro.",
    effect: `um soldado alvo a até 30cm deve rolar um teste de vontade com CD igual a rolagem de ativação deste poder. Se a criatura falhar, ela deixa de lado qualquer fragmento de pedra-bruxa que estiver carregando e se move sua movimentação completa em direção ao vampiro, sempre terminando a 3cm de distância. Ela pode ser forçada a lutar ou cair durante esse movimento, mas não pode entrar em combate. Uma criatura com um marcador de sangramento tem um -3 no teste de vontade contra esse poder. Esse é um efeito psicológico.`,
  },
  {
    name: "Tradição do Coração Empalado",
    when: "Quando o vampiro vence um combate com um rolagem de 18, 19 ou 20 sem modificadores.",
    effect:
      "Esse ataque é considerado um crítico. A figura que recebeu o ataque ganha um marcador de sangramento.",
  },
];

function VampireCourtsPage() {
  const navigate = useNavigate();

  const units = vampireCourtsUnits.map((unit) => ({
    id: slugify(unit.name, { lower: true }),
    label: unit.name,
    type: "Unit",
  }));

  const traditions = bloodlineTraditions.map((power) => ({
    id: slugify(power.name, { lower: true }),
    label: power.name,
    type: "Tradition",
  }));

  const bloodlines = [
    {
      id: "vampiric-bloodline",
      label: "Vampiric Bloodlines",
      type: "Bloodline",
    },
  ];

  const sections = [...bloodlines, ...units, ...traditions];

  return (
    <PageContainer>
      <WarbandIndex sections={sections} />
      <Header title="Vampire Courts" />

      <ContentSection>
        <ContentContainer>
          <div id="vampiric-bloodline">
            <ParchmentText sx={{ marginTop: "2rem" }}>
              <strong style={{ color: "#d4af37", fontSize: "1.6rem" }}>
                Vampiric Bloodlines
              </strong>
              <br />
              <br />
              When creating a Vampire Courts warband, you must choose one of the
              following vampiric bloodlines. This choice defines your Vampire's
              unique characteristics and affects your entire warband.
              <br />
              <br />
              <strong style={{ color: "#d4af37", fontSize: "1.3rem" }}>
                Blood Dragon
              </strong>
              <br />
              <br />
              The Blood Dragons are a martial bloodline of vampires who pride
              themselves on their prowess in battle. They are fearsome warriors
              who disdain the use of ranged weapons, preferring to meet their
              enemies face to face in honorable combat. Their martial discipline
              inspires even their lowliest followers to fight with greater
              ferocity.
              <br />
              <br />
              <strong style={{ color: "#c4a870" }}>Special Rules:</strong>
              <br />• <strong>Martial Prowess:</strong> The Vampire gains +2
              Fight
              <br />• <strong>Honorable Combat:</strong> The Vampire cannot use
              missile weapons
              <br />• <strong>Disciplined Dregs:</strong> Dregs gain +1 Fight
              <br />• <strong>No Skeleton Archers:</strong> Cannot hire Skeleton
              Archers
              <br />
              <br />
              <strong style={{ color: "#d4af37", fontSize: "1.3rem" }}>
                Lahmian
              </strong>
              <br />
              <br />
              The Lahmian bloodline descends from the ancient queen Neferata,
              mistress of seduction and manipulation. These vampires rely on
              supernatural beauty and mental dominance rather than brute force,
              bending the will of mortals and making enemies hesitate before
              striking. They move with unnatural grace and prefer subtlety to
              heavy armour and weapons.
              <br />
              <br />
              <strong style={{ color: "#c4a870" }}>Special Rules:</strong>
              <br />• <strong>Supernatural Grace:</strong> The Vampire gains +2
              Move and +2 Will, but loses -2 Fight and -2 Health
              <br />• <strong>Mesmerizing Presence:</strong> The Lahmian appears
              stunningly beautiful in the eyes of all living creatures who
              behold it. Any figure that wishes to attack her must first make a
              Will roll with a Target Number of 15. If the roll fails, the
              figure may not attack, but may select another action instead. The
              Will roll also applies to anyone wishing to cast a spell that
              would cause an attack on or potential damage to the Lahmian.
              Undead and constructs are immune to this effect.
              <br />• <strong>Light and Deadly:</strong> The Vampire cannot wear
              armour and can only use daggers as weapons
              <br />• <strong>Cult of Seduction:</strong> Dregs are hired at 50
              coroas (instead of 75 coroas), but Ghouls are hired at 200 coroas
              (instead of 150 coroas) and Dire Wolves at 75 coroas (instead of
              50 coroas)
              <br />
              <br />
              <strong style={{ color: "#d4af37", fontSize: "1.3rem" }}>
                Strigoi
              </strong>
              <br />
              <br />
              The Strigoi are degenerate vampires who have abandoned
              civilization entirely, devolving into bestial predators. They are
              monstrous creatures of incredible strength and ferocity, fighting
              with savage fury and bare claws. Their feral nature extends to
              their followers, with newly turned ghouls serving as their primary
              foot soldiers.
              <br />
              <br />
              <strong style={{ color: "#c4a870" }}>Special Rules:</strong>
              <br />• <strong>Bestial Monster:</strong> The Vampire gains +2
              Fight, +2 Move, +2 armour and +2 Health, and gains Savage
              <br />• <strong>Feral Nature:</strong> The Vampire cannot use
              equipment and gains Large
              <br />• <strong>Newborn Ghouls:</strong> Strigoi vampires may hire
              Newborn Ghouls instead of Zombies. Newborn Ghouls change the
              Zombie stats to: Fight +2, armour 10, Will +2, Move 6 and Health
              12
              <br />• <strong>Ghoul Court:</strong> Ghouls are hired at 100
              coroas (instead of 150 coroas)
              <br />• <strong>Hated by the Living:</strong> Necromancers are
              hired at 125 coroas (instead of 100 coroas), Dregs are hired at
              100 coroas.
              <br />
              <br />
              <strong style={{ color: "#d4af37", fontSize: "1.3rem" }}>
                Necrarch
              </strong>
              <br />
              <br />
              The Necrarchs are scholarly vampires who have dedicated their
              eternal unlives to the study of necromancy and dark magic. They
              are powerful spellcasters who eschew physical combat in favor of
              commanding the winds of magic, drawing upon multiple schools of
              arcane knowledge to devastating effect. Their obsession with magic
              leaves little time for recruiting common followers.
              <br />
              <br />
              <strong style={{ color: "#c4a870" }}>Special Rules:</strong>
              <br />• <strong>Mestre Conjurador:</strong> O Vampiro não gain
              powers from the Bloodline Traditions list, instead being a Mestre
              Conjurador O Vampiro pode conjurar magias das Necromancy,
              Spiritualist, Fatecaster and Witch schools. It starts the game
              with 8 spells from any of these lists. (Spell Affinity: Primary
              School +0: Necromancer | Aligned +2: Spiritualist, Fatecaster,
              Witch | Neutral +4: Chronomancer, Summoner, Illusionist, Sigilist
              | Opposed +6: Elementalist, Soothsayer | Anathema: Astromancer,
              Thaumaturge, Sonancer)
              <br />• <strong>Hatred Against the Living:</strong> Necrarchs 100
              coroas instead of 75 coroas to hire Dregs.
              <br />• <strong>Weak Constitution:</strong> Necrarchs start with
              -1 Fight, -1 Shoot and -2 Health, but gain +2 Will.
              <br />
              <br />
              <strong style={{ color: "#d4af37", fontSize: "1.3rem" }}>
                Von Carstein
              </strong>
              <br />
              <br />
              The Von Carstein bloodline represents vampiric nobility at its
              finest, combining aristocratic bearing with formidable combat
              ability. These vampires are natural leaders who command their
              undead legions with iron will and tactical brilliance. Their
              presence on the battlefield inspires their followers and extends
              their sphere of influence far beyond that of lesser vampires.
              <br />
              <br />
              <strong style={{ color: "#c4a870" }}>Special Rules:</strong>
              <br />• <strong>Vampiric Aristocracy:</strong> The Vampire gains
              +2 Will, +1 Fight and +1 Shoot
              <br />• <strong>Extended Command:</strong> Von Carsteins can
              activate figures within 6" of them during the Hero's Phase
              (instead of the normal 3" from Master of Undeath)
            </ParchmentText>
          </div>

          <div id="units">
            {vampireCourtsUnits.map((unit, index) => (
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

          <div id="traditions">
            <PowerListTitle>Bloodline Traditions</PowerListTitle>

            <ParchmentText>
              Bloodline Traditions embody the monstrous legacy of vampiric power
              — ancient curses, feral transformations, and unholy dominion over
              both blood and will. Their design emphasizes the vampire as the
              warband's terrifying centerpiece, bending the battlefield through
              personal might and supernatural presence.
              <br />
              <br />
              In short: Bloodline Traditions are designed to make the vampire
              feel like a gothic monster-king — a predator, shapeshifter, and
              tyrant in one body. Their identity is singular and theatrical,
              ensuring every activation feels like a scene from a vampire
              legend: blood spilled, wills broken, and darkness unleashed.
            </ParchmentText>

            {bloodlineTraditions.map((power, index) => (
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

export default VampireCourtsPage;
