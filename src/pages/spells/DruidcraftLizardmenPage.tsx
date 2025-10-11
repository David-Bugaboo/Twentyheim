import Header from "../../components/Header";
import SpellCard from "../../components/SpellCard";
import MysticBrandCard from "../../components/MysticBrandCard";
import {
  PageContainer,
  ContentSection,
  ContentContainer,
  ParchmentText,
  PowerListTitle,
} from "../../components/PageComponents";
import { druidcraftOfTheOldOnes } from "./data/magics-of-old-ones.spells";

export const DruidcraftLizardmenPage = () => {
  const mysticBrands = [
    {
      name: "Mark of Rage",
      type: "Burning" as const,
      effect:
        "The bearer gains +2 Move, but only if that movement ends with him in combat.",
    },
    {
      name: "Mark of the Berserker",
      type: "Burning" as const,
      effect:
        "The bearer gains +2 Fight whenever he is in combat with multiple foes.",
    },
    {
      name: "Mark of the Blood",
      type: "Burning" as const,
      effect:
        "The bearer does +2 damage in hand-to-hand combat, unless it already has a two-handed weapon. In that case it does an additional +1 damage (for a total of +3 damage).",
    },
    {
      name: "Mark of the Chain",
      type: "Burning" as const,
      effect:
        "The bearer gains +3 Will when rolling to resist spells or break the control of a spell.",
    },
    {
      name: "Mark of the Fang",
      type: "Burning" as const,
      effect: "The bearer of this mark gains +1 Fight.",
    },
    {
      name: "Mark of Endurance",
      type: "Devotional" as const,
      effect:
        "The bearer is never treated as Wounded, no matter their current Health, and is immune to poison.",
    },
    {
      name: "Mark of Life",
      type: "Devotional" as const,
      effect: "The bearer gains +2 Fight and +1 Armour when fighting undead.",
    },
    {
      name: "Mark of Protection",
      type: "Devotional" as const,
      effect:
        "The bearer may sacrifice this mark in order to prevent up to 3 points of damage.",
    },
    {
      name: "Mark of Sight",
      type: "Devotional" as const,
      effect:
        "The bearer is immune to the spells Invisibility, Beauty, and Monstrous Form.",
    },
    {
      name: "Mark of the Shield",
      type: "Devotional" as const,
      effect: "The bearer gains +1 Armour.",
    },
  ];

  return (
    <PageContainer>
      <Header title="Druidcraft of the Lizardmen" />
      <ContentSection>
        <ContentContainer>
          <PowerListTitle>Druidcraft of the Lizardmen</PowerListTitle>

          <ParchmentText>
            Os Slann Mage-Priests e Skink Priestmages dos Lizardmen canalizam as
            forças primordiais da natureza através de um entendimento ancestral
            do mundo. Suas magias druídicas conectam-se diretamente aos
            espíritos da terra, das bestas e dos elementos, permitindo-lhes
            comandar as forças selvagens de Lustria com precisão e poder.
            Diferente de outros praticantes de magia que manipulam os Ventos da
            Magia, os druidas dos Lizardmen extraem poder dos próprios espíritos
            do mundo, tornando suas magias mais estáveis, porém menos explosivas
            em poder bruto.
          </ParchmentText>

          <ParchmentText>
            Esta escola de magia é exclusiva dos spellcasters Lizardmen e
            representa sua conexão profunda com o mundo natural e as forças
            primordiais que o governam. Cada spell é uma invocação aos espíritos
            da natureza, seja para comandar bestas, moldar a terra, controlar as
            águas ou invocar as tempestades.
          </ParchmentText>

          <PowerListTitle>
            Spells ({druidcraftOfTheOldOnes.length} Total)
          </PowerListTitle>

          {druidcraftOfTheOldOnes.map((spell, index) => (
            <SpellCard
              key={index}
              name={spell.name}
              school={"Druidcraft of the Old Ones"}
              castingNumber={parseInt(spell.castingNumber)}
              range={spell.range}
              effect={spell.description}
            />
          ))}

          <PowerListTitle>
            Mystic Brands ({mysticBrands.length} Total)
          </PowerListTitle>

          <ParchmentText>
            Mystic Brands são símbolos mágicos temporários inscritos na carne de
            seres vivos sencientes para conceder-lhes acesso limitado ao poder
            de entidades extra-planares. Estas marcas místicas tomam um item
            slot e podem ser aplicadas através do spell Tribal Marks. Nenhum
            guerreiro pode ter mais de uma Mystic Brand ao mesmo tempo.
          </ParchmentText>

          <ParchmentText>
            <strong>Burning Marks:</strong> Marcas grandes e dolorosas que
            concedem poder ao custo de estabilidade mental. Qualquer figura que
            role 1 natural em um Will Roll fica temporariamente insana. Pode ser
            sacrificada para causar +1 dano adicional (sofre 2 de dano).
          </ParchmentText>

          <ParchmentText>
            <strong>Devotional Marks:</strong> Marcas delicadas e artísticas que
            concedem +1 em todos os Will rolls. Podem ser sacrificadas para
            adicionar +3 a qualquer Will roll (não cumulativo com o +1
            permanente).
          </ParchmentText>

          {mysticBrands.map((brand, index) => (
            <MysticBrandCard
              key={index}
              name={brand.name}
              type={brand.type}
              effect={brand.effect}
            />
          ))}
        </ContentContainer>
      </ContentSection>
    </PageContainer>
  );
};
