import Header from "../../components/Header";
import SpellCard from "../../components/SpellCard";
import {
  PageContainer,
  ContentSection,
  ContentContainer,
  ParchmentText,
  PowerListTitle,
} from "../../components/PageComponents";
import { magicOfTheWaagh } from "./data/magic-of-the-waagh.spells";

export const MagicOfTheWaaghPage = () => {
  return (
    <PageContainer>
      <Header title="Magic of the Waagh!" />
      <ContentSection>
        <ContentContainer>
          <PowerListTitle>Magic of the Waagh!</PowerListTitle>

          <ParchmentText>
            A magia Orc não é sutil nem refinada - é uma explosão bruta de poder
            psíquico coletivo canalizado através dos Shamans da tribo. Quando os
            Orcs se reúnem para guerra, suas mentes primitivas mas poderosas
            criam um campo de energia psíquica conhecido como Waagh!. Os Shamans
            aprendem a canalizar esta energia verde e caótica, moldando-a em
            feitiços devastadores de pura destruição e força bruta.
          </ParchmentText>

          <ParchmentText>
            Esta tradição mágica combina elementalismo destrutivo com xamanismo
            primitivo, manipulação dimensional instintiva e invocações
            demoníacas casuais. Os Orcs não se preocupam com teoria mágica ou
            controle refinado - eles simplesmente liberam a Waagh! e deixam que
            ela faça o que faz naturalmente: quebrar, esmagar e destruir.
            Paradoxalmente, esta abordagem brutalmente simples resulta numa
            forma de magia surpreendentemente eficaz, alimentada pela crença
            coletiva de que "se os boyz acham que funciona, funciona!".
          </ParchmentText>

          <PowerListTitle>
            Spells ({magicOfTheWaagh.length} Total)
          </PowerListTitle>

          {magicOfTheWaagh.map((spell, index) => (
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
