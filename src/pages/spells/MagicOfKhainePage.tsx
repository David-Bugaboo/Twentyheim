import Header from "../../components/Header";
import SpellCard from "../../components/SpellCard";
import {
  PageContainer,
  ContentSection,
  ContentContainer,
  ParchmentText,
  PowerListTitle,
} from "../../components/PageComponents";
import { magicOfKhaine } from "./data/magic-of-khaine.spells";

export const MagicOfKhainePage = () => {
  return (
    <PageContainer>
      <Header title="Magic of Khaine" />
      <ContentSection>
        <ContentContainer>
          <PowerListTitle>Magic of Khaine</PowerListTitle>

          <ParchmentText>
            A magia das Brides of Khaine é tão sangrenta e graciosa quanto as
            próprias sacerdotisas-assassinas. Cada spell é uma dança de morte,
            uma oferenda ao Deus Sangrento tecida com feitiçaria dark elf,
            ilusionismo mortal, manipulação do destino e invocações demoníacas.
            As Brides não simplesmente lançam magias - elas as performam como
            rituais sagrados, cada movimento uma prece, cada palavra uma
            invocação ao Senhor do Assassinato.
          </ParchmentText>

          <ParchmentText>
            Esta tradição combina a sutileza letal da feitiçaria witch com o
            poder bruto do ilusionismo e manipulação dimensional. As
            sacerdotisas de Khaine são mestras em confundir, enganar e depois
            destruir seus inimigos, usando magias que refletem a natureza dual
            de seu deus - o sangue e a lâmina, a beleza e a morte. Cada spell
            carrega a marca de Khaine, exigindo sacrifício e derramamento de
            sangue, mas concedendo poder proporcional à devoção demonstrada.
          </ParchmentText>

          <PowerListTitle>Spells ({magicOfKhaine.length} Total)</PowerListTitle>

          {magicOfKhaine.map((spell, index) => (
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
