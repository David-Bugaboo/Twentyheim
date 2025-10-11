import Header from "../../components/Header";
import SpellCard from "../../components/SpellCard";
import {
  PageContainer,
  ContentSection,
  ContentContainer,
  ParchmentText,
  PowerListTitle,
} from "../../components/PageComponents";
import { prayersOfUlric } from "./data/prayers-of-ulric.spells";

export const PrayersOfUlricPage = () => {
  return (
    <PageContainer>
      <Header title="Prayers of Ulric" />
      <ContentSection>
        <ContentContainer>
          <PowerListTitle>Prayers of Ulric</PowerListTitle>

          <ParchmentText>
            As orações a Ulric, o Deus do Inverno, dos Lobos e da Guerra,
            concedem poder aos fiéis que enfrentam as noites mais escuras e os
            invernos mais brutais. As Sisters of Sigmar, em sua guerra contra o
            Caos e a corrupção, aprenderam a invocar não apenas a luz de Sigmar,
            mas também a fúria gélida de Ulric. Estas orações trazem a força dos
            lobos brancos das montanhas, a proteção do inverno eterno e a
            clareza implacável da tempestade de neve.
          </ParchmentText>

          <ParchmentText>
            Diferente da magia arcana, as orações não manipulam os Ventos da
            Magia - são manifestações diretas do poder divino através da fé
            inabalável. As sacerdotisas que invocam Ulric não sofrem dano por
            falha nos casts nem precisam de grimórios, mas sua força depende
            inteiramente da pureza de sua devoção e retidão de propósito. Estas
            bênçãos do Deus Lobo concedem cura, proteção, fúria lupina e o poder
            devastador das tempestades de inverno.
          </ParchmentText>

          <PowerListTitle>
            Prayers ({prayersOfUlric.length} Total)
          </PowerListTitle>

          {prayersOfUlric.map((spell, index) => (
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
