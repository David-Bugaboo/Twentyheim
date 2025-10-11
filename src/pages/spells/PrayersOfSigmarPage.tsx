import Header from "../../components/Header";
import SpellCard from "../../components/SpellCard";
import {
  PageContainer,
  ContentSection,
  ContentContainer,
  ParchmentText,
  PowerListTitle,
} from "../../components/PageComponents";
import { prayersOfSigmar } from "./data/prayers-of-sigmar.spells";

export const PrayersOfSigmarPage = () => {
  return (
    <PageContainer>
      <Header title="Prayers of Sigmar" />
      <ContentSection>
        <ContentContainer>
          <PowerListTitle>Prayers of Sigmar</PowerListTitle>

          <ParchmentText>
            As orações a Sigmar, o Deus-Imperador e Salvador da Humanidade, são
            as armas espirituais dos Witch Hunters em sua cruzada implacável
            contra as forças das trevas. Estas invocações trazem a luz celestial
            de Sigmar, a justiça divina dos santos e o poder destrutivo dos
            cometas gêmeos que marcaram seu nascimento. Cada oração é uma
            declaração de fé absoluta e um repúdio total ao Caos, heresia e
            corrupção.
          </ParchmentText>

          <ParchmentText>
            Os Witch Hunters não são magos - são guerreiros santos armados com
            fé inabalável e autoridade divina. Suas orações não requerem
            grimórios nem causam dano por falha, pois são bênçãos concedidas
            diretamente por Sigmar aos seus servos mais devotos. Proteção
            sagrada, destruição elemental dos impuros, e milagres de cura fluem
            através daqueles que dedicam suas vidas à erradicação do mal. Cada
            prayer é uma prova da presença contínua de Sigmar no mundo mortal.
          </ParchmentText>

          <PowerListTitle>
            Prayers ({prayersOfSigmar.length} Total)
          </PowerListTitle>

          {prayersOfSigmar.map((spell, index) => (
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
