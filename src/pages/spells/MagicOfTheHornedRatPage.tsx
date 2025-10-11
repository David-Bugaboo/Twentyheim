import Header from "../../components/Header";
import SpellCard from "../../components/SpellCard";
import {
  PageContainer,
  ContentSection,
  ContentContainer,
  ParchmentText,
  PowerListTitle,
} from "../../components/PageComponents";
import { magicOfTheHornedRat } from "./data/magic-of-the-horned-rat.spells";

export const MagicOfTheHornedRatPage = () => {
  return (
    <PageContainer>
      <Header title="Magic of the Horned Rat" />
      <ContentSection>
        <ContentContainer>
          <PowerListTitle>Magic of the Horned Rat</PowerListTitle>

          <ParchmentText>
            A magia Skaven é um reflexo de sua sociedade - caótica, traiçoeira e
            devastadoramente eficaz. Os Grey Seers e Warlock Engineers dos clãs
            canalizam o poder profano do Horned Rat, combinando feitiçaria
            rápida e brutal com elementalismo destrutivo, manipulação
            dimensional e invocações demoníacas. Cada spell é imbuída com a
            essência corrupta da warpstone, trazendo não apenas poder mágico,
            mas também a maldição da mutação e loucura.
          </ParchmentText>

          <ParchmentText>
            Esta escola composta representa a síntese única da magia Skaven -
            desde os feitiços rápidos e sujos da escola Witch até os
            devastadores ataques elementais, passando pelas distorções
            dimensionais e invocações demoníacas que caracterizam a relação dos
            homens-rato com as forças do Caos. O Horned Rat abençoa seus filhos
            mais leais com poder terrível, mas sempre exige um preço em sanidade
            e carne.
          </ParchmentText>

          <PowerListTitle>
            Spells ({magicOfTheHornedRat.length} Total)
          </PowerListTitle>

          {magicOfTheHornedRat.map((spell, index) => (
            <SpellCard
              key={index}
              name={spell.name}
              school={spell.school}
              castingNumber={parseInt(spell.castingNumber)}
              range={spell.range}
              effect={spell.description}
            />
          ))}
        </ContentContainer>
      </ContentSection>
    </PageContainer>
  );
};
