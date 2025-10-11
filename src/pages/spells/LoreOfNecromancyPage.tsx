import Header from "../../components/Header";
import SpellCard from "../../components/SpellCard";
import {
  PageContainer,
  ContentSection,
  ContentContainer,
  ParchmentText,
  PowerListTitle,
} from "../../components/PageComponents";
import { loreOfNecromancy } from "./data/lore-of-necromancy.spells";

export const LoreOfNecromancyPage = () => {
  return (
    <PageContainer>
      <Header title="Lore of Necromancy" />
      <ContentSection>
        <ContentContainer>
          <PowerListTitle>Lore of Necromancy</PowerListTitle>

          <ParchmentText>
            O Lore of Necromancy é a tradição mágica sinistra dos Vampire
            Courts, refinada através de séculos de não-vida e estudo obsessivo.
            Os vampiros não são meros necromantes - são mestres da morte que
            combinam o controle absoluto sobre os mortos-vivos com manipulação
            temporal, espiritualismo negro e adivinhação fatídica. Esta escola
            representa o ápice da magia morta-viva, onde a linha entre vida e
            morte se torna completamente irrelevante.
          </ParchmentText>

          <ParchmentText>
            A essência desta tradição vai além da simples animação de cadáveres.
            Os vampiros entendem a morte como uma forma de existência superior,
            e suas magias refletem esta filosofia - manipulando o tempo para
            apressar o fim, comandando espíritos etéreos, alterando o destino
            dos vivos e roubando a própria essência vital. Cada spell é um
            lembrete de que a morte não é o fim, mas apenas o começo de uma
            eternidade sombria.
          </ParchmentText>

          <PowerListTitle>
            Spells ({loreOfNecromancy.length} Total)
          </PowerListTitle>

          {loreOfNecromancy.map((spell, index) => (
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
