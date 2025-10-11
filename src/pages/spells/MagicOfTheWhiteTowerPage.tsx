import Header from "../../components/Header";
import SpellCard from "../../components/SpellCard";
import {
  PageContainer,
  ContentSection,
  ContentContainer,
  ParchmentText,
  PowerListTitle,
} from "../../components/PageComponents";
import { magicOfTheWhiteTower } from "./data/high-magic-of-ulthuan.spells";

export const MagicOfTheWhiteTowerPage = () => {
  return (
    <PageContainer>
      <Header title="Magic of the White Tower" />
      <ContentSection>
        <ContentContainer>
          <PowerListTitle>Magic of the White Tower</PowerListTitle>

          <ParchmentText>
            A Magic of the White Tower representa o ápice absoluto do
            conhecimento arcano élfico. Praticada pelos Loremasters de Hoeth,
            esta tradição combina todas as escolas clássicas de magia e as artes
            perdidas numa síntese perfeita de teoria e prática mágica. Milênios
            de estudo, debate filosófico e experimentação cuidadosa resultaram
            numa compreensão dos Ventos da Magia que nenhuma outra raça pode
            igualar.
          </ParchmentText>

          <ParchmentText>
            Ao contrário de outras tradições que se especializam em aspectos
            específicos da magia, os Loremasters estudam todas as facetas da
            arte arcana com igual dedicação. Cronomancia, elementalismo,
            encantamento, ilusionismo, sigilos, adivinhação, feitiçaria e as
            artes perdidas do astromancismo, distorcionismo e fatacastrismo -
            todas estas disciplinas são dominadas pelos mestres da Torre Branca,
            criando uma versatilidade mágica sem paralelo.
          </ParchmentText>

          <PowerListTitle>
            Spells ({magicOfTheWhiteTower.length} Total)
          </PowerListTitle>

          {magicOfTheWhiteTower.map((spell, index) => (
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
