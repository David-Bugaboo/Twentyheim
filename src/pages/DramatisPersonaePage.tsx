import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import UnitCard from "../components/UnitCard";
import slugify from "slugify";
import WarbandIndex from "../components/WarbandIndex";
import {
  PageContainer,
  ContentSection,
  NavigationSection,
  StyledNavigationButton,
  ContentContainer,
  ParchmentText,
  QuoteBox,
  QuoteAttribution,
} from "../components/PageComponents";

const dramatisPersonae = [
  {
    name: "Aenur, Sword of Twilight",
    stats: {
      move: 6,
      fight: "+6",
      shoot: "+2",
      armour: 14,
      will: "+4",
      health: 16,
      cost: "300gc",
    },
    abilities: [
      {
        name: "Equipment",
        description:
          "Ithilmar Two-Handed Weapon (+1 to Fight and count as magical weapon), Ithilmar armour (Heavy armour without -1 to Movement), Sea Dragon Cloak (+1 to armour against shooting attacks).",
      },
      {
        name: "Swordmaster",
        description:
          "As one of the legendary Swordmasters of Hoeth, Aenur may fight twice per activation.",
      },

      {
        name: "Arcane Edge",
        description:
          "Any attacks made by Aenur treats the enemy figure's armour as being 2 points lower. If the enemy figure is using magical armour, ignore this ability",
      },
      {
        name: "Lightning Parries",
        description:
          "Figures cannot gain bonuses to their fight rolls from supporting figures when fighting Aenur.",
      },
      {
        name: "Hiring Restrictions",
        description:
          "May be hired by any warband except Skaven, Undead, and Cult of the Possessed. Will Fight only once for each warband. The Warband must play at least 2 games without him before he can be hired again.",
      },
    ],
  },
  {
    name: "Bertha Bestraufrung",
    stats: {
      move: 5,
      fight: "+4",
      shoot: "+0",
      armour: 14,
      will: "+5",
      health: 18,
      cost: "-",
    },
    abilities: [
      {
        name: "Equipment",
        description:
          "2x Sigmarite Warhammers, Gromril armour (Heavy armour with +1 to armour).",
      },
      {
        name: "High Matriarch",
        description: `Leader of the Sisters of Sigmar. All Sisters in her warband gain +1 Will. She can cast every spell from the Thaumaturgy and ther Elemental Hammer and Elemental Sphere spells.
          As a priestess, she casts at a -4, but may cast while using armors and shields.`,
      },
      {
        name: "Blessed Warhammers",
        description:
          "Wields two blessed warhammers. Gains +1 Damage while wielding them this way, but cannot pickup trasure without storing one of them and losing this bonus.",
      },
      {
        name: "Righteous Fury",
        description:
          "Bertha gains +2 Fight and +2 Damage against figures with the Demon and Undead traits.",
      },
      {
        name: "Hiring Restrictions",
        description:
          "Bertha Bestraufrung will only join Sisters of Sigmar warbands. She will not ask for money, but will only fight once, against Cult of the Possessed or Vampire Courts warbands.",
      },
    ],
  },
  {
    name: "Johann the Knife",
    stats: {
      move: 8,
      fight: "+4",
      shoot: "+2",
      armour: 11,
      will: "+3",
      health: 14,
      cost: "250gc + 20% upkeep",
    },
    abilities: [
      {
        name: "Equipment",
        description: "Unlimited Daggers, Light armour.",
      },
      {
        name: "Anatomy Savant",
        description:
          "Johann has the Energy Drain trait against any figures that haven't activated yet during this turn.",
      },
      {
        name: "Knife Fighter",
        description:
          'Armed with multiple daggers. May throw up to 2 knives per activation (6" Shooting Attack with -1 damage and Poison trait) spending two actions or fight with two in melee (+1 Attack from Two-Weapon Fighting and Poison trait).',
      },
      {
        name: "Shadow Walker",
        description:
          'Figures may not draw line of sight to Johann while further than 16" away or in cover. Johann gains +3 move if every part of his movement is outside of line of sight of every enemy figure',
      },
      {
        name: "Addicted to Crimson Shade",
        description:
          "May pay Johann's upkeep cost in Crimson Shade instead of gold. His Will stat is 0 for each game where his upkeep is paid in Shade, but the upkeep cost is only 15gc.",
      },
      {
        name: "Hiring Restrictions",
        description:
          "May be hired by any warband except Skaven, Undead, and Cult of the Possessed. May be hired for one dose of Crimson Shade instead of gold if you have it.",
      },
    ],
  },
  {
    name: "Verskit, High Executioner of Clan Eshin",

    stats: {
      move: 8,
      fight: "+4",
      shoot: "+2",
      armour: 14,
      will: "+3",
      health: 20,
      cost: "350gc",
    },
    abilities: [
      {
        name: "Masterwork of Clan Enshin",
        description:
          "Each of Verskit Fighting Claws count as a Pistol. This pistol deals 3 damage and ignores 3 points of enemy armour instead of the normal for the pistol, and may be reloaded as normal. Verskit may fire his pistol and fight in the same action.",
      },
      {
        name: "The Flesh is Weak",
        description: "Verskit is immune to Fear, and have the Mind Lock trait.	",
      },
      {
        name: "Unblinking Eye",
        description:
          "Verskit mechanical eye may see thermal signatures through walls and his custom made Warplock Pistols chew through wood and stone like paper. Verskit do not need to have line of sight to shoot with his pistols. Cover and intervening terrain rules apply as normal.",
      },
      {
        name: "Equipment",
        description: "Skaven Fighting Claws, Light armour.",
      },
    ],
  },
  {
    name: "Hrothnar, The Vessel Champion",

    stats: {
      move: 6,
      fight: "+4",
      shoot: "0",
      armour: 13,
      will: "+4",
      health: 14,
      cost: "300gc+20% upkeep",
    },
    abilities: [
      {
        name: "Slave to Darkness",
        description:
          "Hrothnar is a Possessed champion of chaos, and therefore have the Demon trait. At the start of each game, he may choose two Daemonic Attributes. He have those Daemonic Attributes during the game.",
      },
      {
        name: "Shattered Seal",
        description:
          "If Hrothnar is reduced to 0 health, he gains 10 health back and gains Automatic Damage, Elemental Resistance (5), Immune to Critical Hits, Immune to Poison, Magic Attacks, Melt Weapon, Resistant to Missile Weapons",
      },
      {
        name: "Equipment",
        description: "Accursed Weapon, Heavy Armour, Shield.",
      },
    ],
  },
  {
    name: "Rotigus",
    stats: {
      move: 4,
      fight: "+5",
      shoot: "0",
      armour: 12,
      will: "+8",
      health: 18,
      cost: "2 specialist soldiers as sacrifice + 2 specialist soldiers as upkeep sacrifice.",
    },
    abilities: [
      {
        name: "Greater Demon of Nurgle",
        description:
          "Rotigus have the Demon, Immune to Control Demon, Immune to Critical Hits, Immune to Mind Control, Magic Attacks, Spell Reflection.",
      },
      {
        name: "Winds of Putrescence",
        description:
          "If a figure activates within 6” of this creature, the figure must make an immediate Will Roll (TN14) or suffer 4 points of damagea and become poisoned. Undead, constructs, and demons are immune to this damage and thus do not have to make a Will Roll.",
      },
      {
        name: "Equipment",
        description: "Accursed Weapon, Heavy Armour, Shield.",
      },
    ],
  },
];

function DramatisPersonaePage() {
  const navigate = useNavigate();

  const sections = [
    {
      id: "general-rules",
      label: "General Rules",
      type: "Rules",
    },
    ...dramatisPersonae.map((unit) => ({
      id: slugify(unit.name, { lower: true }),
      label: unit.name,
      type: "Units",
    })),
    {
      id: "special-rules",
      label: "Special Rules",
      type: "Rules",
    },
  ];

  return (
    <PageContainer>
      <Header title="Dramatis Personae" />

      <ContentSection>
        <ContentContainer>
          <QuoteBox>
            <Typography
              sx={{
                fontFamily: '"Crimson Text", serif',
                fontSize: "1.2rem",
                fontStyle: "italic",
                color: "#d4c4a8",
                mb: 1,
              }}
            >
              "Os tocos e cinzas gordurosas das piras cobriam o campo comum até
              onde a vista alcançava e a fumaça das fogueiras de bruxas pairava
              pelas ruas. Seu fedor encheu nossas bocas por dias."
            </Typography>
            <QuoteAttribution>— Diário de Selestian Bran</QuoteAttribution>
          </QuoteBox>

          <div id="general-rules">
            <ParchmentText sx={{ marginTop: "2rem", marginBottom: "2rem" }}>
              <strong style={{ color: "#d4af37", fontSize: "1.6rem" }}>
                Regras de Dramatis Personae
              </strong>
              <p>
                Dramatis Personae são indivíduos únicos, guerreiros lendários e
                canalhas infames cujas reputações os precedem por todo o
                Império. Ao contrário das Espadas Alugadas comuns, esses
                personagens excepcionais têm seus próprios objetivos,
                personalidades e histórias. Eles não podem ser simplesmente
                comprados — devem ser encontrados através do destino ou
                circunstâncias especiais.
              </p>
              <br />
              <p>
                Cada Dramatis Personae possui habilidades únicas que excedem em
                muito guerreiros normais. Eles não contam para o limite máximo
                de modelos do seu bando, mas aumentam significativamente a
                classificação do seu bando. A maioria não pode ganhar
                experiência ou evoluir — eles já estão no auge de suas
                habilidades. Alguns têm condições especiais de contratação, e
                alguns não podem ser contratados de forma alguma, aparecendo
                apenas através de eventos ou cenários específicos.
              </p>
              <br />
              <br />
              <strong style={{ color: "#d4af37", fontSize: "1.3rem" }}>
                Requisitos de Espaço no Bando
              </strong>
              <br />
              <br />
              Dramatis Personae são indivíduos poderosos que ocupam espaço
              valioso na hierarquia do seu bando.
              <br />
              <br />
              <strong style={{ color: "#c4a870" }}>
                Regras de Espaço de Especialista:
              </strong>
              <br />• <strong>Dramatis Personae</strong> ocupam{" "}
              <strong>dois espaços de Especialista</strong> no seu bando, mas
              ainda contam como apenas <strong>um modelo</strong> para o limite
              de 10 modelos do bando
              <br />• <strong>Espadas Alugadas</strong> ocupam{" "}
              <strong>um espaço de Especialista</strong> e contam como um modelo
              <br />• Ambos contam contra o limite de especialistas do seu bando
              <br />
              <br />
              <strong style={{ color: "#d4af37", fontSize: "1.3rem" }}>
                Exclusividade dos Dramatis Personae
              </strong>
              <br />
              <br />
              Ao contrário das Espadas Alugadas comuns, Dramatis Personae são{" "}
              <strong>indivíduos únicos</strong> que só podem servir um bando
              por vez. Seu status lendário significa que não podem estar em
              múltiplos lugares ao mesmo tempo, e sua presença é uma questão de
              destino e oportunidade.
              <br />
              <br />
              <strong style={{ color: "#c4a870" }}>
                Regras de Serviço Único:
              </strong>
              <br />• Um Dramatis Personae{" "}
              <strong>não pode estar em dois bandos diferentes</strong>{" "}
              simultaneamente
              <br />• Se um evento de Dramatis Personae é rolado na tabela de
              Exploração enquanto esse indivíduo já está servindo outro bando,{" "}
              <strong>role novamente o evento</strong>
              <br />• Uma vez que um Dramatis Personae deixa um bando
              (manutenção não paga, morre, ou completa seu serviço), eles ficam
              disponíveis para outros bandos novamente
              <br />• <strong>Espadas Alugadas não têm essa limitação</strong> —
              o mesmo tipo de Espada Alugada pode servir múltiplos bandos
              simultaneamente
              <br />
              <br />
              <em style={{ color: "#c4a870" }}>
                Exemplo: Se "Aenur, Espada do Crepúsculo" está atualmente
                servindo seu bando e outro jogador rola seu evento, ele deve
                rolar novamente esse evento. No entanto, se você tem um "Matador
                de Trolls Anão" como Espada Alugada, outro jogador também pode
                contratar um Matador de Trolls Anão — há muitos matadores em
                Mordheim.
              </em>
              <br />
              <br />
              <strong style={{ color: "#d4af37", fontSize: "1.3rem" }}>
                Pagamento e Manutenção
              </strong>
              <br />
              <br />
              Cada Dramatis Personae tem sua própria estrutura de pagamento e
              condições. Alguns exigem coroas de ouro, outros demandam Pedra-bruxa,
              itens mágicos, ou até condições especiais a serem
              cumpridas.
              <br />
              <br />
              <strong style={{ color: "#c4a870" }}>Regras de Pagamento:</strong>
              <br />• <strong>Custo Inicial de Contratação:</strong> O preço (ou
              condições) necessário para contratar inicialmente o indivíduo.
              Pode ser ouro, itens, ou completar um cenário específico
              <br />• <strong>Manutenção:</strong> Alguns Dramatis Personae
              exigem pagamento após cada batalha para permanecer com seu bando.
              Se a manutenção não for paga, eles partem permanentemente (a menos
              que sua descrição declare o contrário)
              <br />• <strong>Pagamento Especial:</strong> Alguns indivíduos
              aceitam formas alternativas de pagamento.
              <br />• <strong>Sem Manutenção:</strong> Alguns Dramatis Personae
              servem de graça uma vez contratados, enquanto outros ficam apenas
              por uma única batalha.
              <br />
              <br />
            </ParchmentText>
          </div>

          {/* Game Terms Section */}
          <Box sx={{ mb: 4 }}>
            <WarbandIndex sections={sections} />
          </Box>

          {dramatisPersonae.map((unit) => (
            <div
              key={slugify(unit.name, { lower: true })}
              id={slugify(unit.name, { lower: true })}
            >
              <UnitCard
                name={unit.name}
                stats={unit.stats}
                abilities={unit.abilities}
              />
            </div>
          ))}
        </ContentContainer>
      </ContentSection>

      <NavigationSection>
        <Box sx={{ maxWidth: "600px", width: "100%" }}>
          <StyledNavigationButton
            onClick={() => navigate("/")}
            variant="outlined"
            fullWidth
            sx={{
              backgroundColor: "rgba(20, 18, 14, 0.6)",
              "&:hover": {
                backgroundColor: "rgba(28, 24, 18, 0.8)",
              },
            }}
          >
            Return to Home
          </StyledNavigationButton>
        </Box>
      </NavigationSection>
    </PageContainer>
  );
}

export default DramatisPersonaePage;
