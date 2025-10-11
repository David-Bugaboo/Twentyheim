import Header from "../../components/Header";
import {
  PageContainer,
  ContentSection,
  ContentContainer,
  ParchmentText,
  PowerListTitle,
} from "../../components/PageComponents";
import SpellCard from "../../components/SpellCard";
import { chaosRituals } from "./data/chaos-rituals.spells";

export default function ChaosRitualsPage() {
  return (
    <PageContainer>
      <Header title="Chaos Rituals" />

      <ContentSection>
        <ContentContainer>
          <ParchmentText>
            Nas sombras mais profundas de Wyrdgrave, cultistas loucos e feiticeiros corruptos
            praticam rituais proibidos, invocando o poder bruto do Caos. Estes rituais não
            são mera magia - são pactos com entidades que não deveriam existir, rasgos na
            própria realidade, e tentativas desesperadas de controlar forças que destroem
            a sanidade.
          </ParchmentText>

          <ParchmentText>
            Os praticantes destes rituais caminham uma linha perigosa entre poder e
            perdição. Cada invocação arranca pedaços de suas almas, cada possessão os
            aproxima da loucura, e cada demônio convocado pode facilmente se voltar contra
            seu mestre. Mas para aqueles loucos o suficiente para ousar, o poder é
            inimaginável.
          </ParchmentText>

          <ParchmentText>
            <strong>Atenção:</strong> Chaos Rituals é uma escola extremamente perigosa.
            Falhas críticas ao conjurar estas magias frequentemente resultam em demônios
            descontrolados atacando o próprio conjurador. Use com cautela extrema.
          </ParchmentText>
        </ContentContainer>
      </ContentSection>

      <ContentSection>
        <ContentContainer>
          <PowerListTitle>Chaos Rituals</PowerListTitle>
          {chaosRituals.map((spell, index) => (
            <SpellCard
              key={index}
              name={spell.name}
              school={spell.school}
              castingNumber={parseInt(spell.castingNumber)}
              range={spell.range}
              effect={spell.description	}
            />
          ))}
        </ContentContainer>
      </ContentSection>
    </PageContainer>
  );
}

