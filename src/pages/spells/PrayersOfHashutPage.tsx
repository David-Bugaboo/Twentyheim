import Header from "../../components/Header";
import SpellCard from "../../components/SpellCard";
import {
  PageContainer,
  ContentSection,
  ContentContainer,
  ParchmentText,
  PowerListTitle,
} from "../../components/PageComponents";
import { prayersOfHashut } from "./data/prayers-of-hashut.spells";

export const PrayersOfHashutPage = () => {
  return (
    <PageContainer>
      <Header title="Prayers of Hashut" />
      <ContentSection>
        <ContentContainer>
          <PowerListTitle>Prayers of Hashut</PowerListTitle>

          <ParchmentText>
            As invocações a Hashut, o Pai das Trevas e Senhor das Forjas
            Infernais, concedem aos Chaos Dwarfs poder sobre fogo, metal e
            construtos. Os Sons of Hashut não são meros sacerdotes - são
            forjamestres demoníacos que canalizam a essência ígnea de seu deus
            através de runas de poder gravadas em metal vivo. Cada oração é um
            pacto com as chamas eternas, cada invocação uma promessa de
            escravidão e sofrimento em troca de poder tecnomágico sem paralelo.
          </ParchmentText>

          <ParchmentText>
            Diferente das orações aos deuses do Império, as invocações a Hashut
            carregam o preço da corrupção e da crueldade. Os Chaos Dwarfs não
            pedem bênçãos - eles exigem poder, e Hashut responde com fogo
            infernal, possessão demoníaca de metal, e runas que fundem magia e
            engenharia numa síntese blasfema. Estas orações não causam dano ao
            conjurador por falha, mas cada uso aproxima a alma do invocador das
            fornalhas eternas de seu deus sombrio, transformando-os lentamente
            em estátuas de pedra viva.
          </ParchmentText>

          <PowerListTitle>
            Prayers ({prayersOfHashut.length} Total)
          </PowerListTitle>

          {prayersOfHashut.map((spell, index) => (
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
