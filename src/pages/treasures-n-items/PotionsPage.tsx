import Header from "../../components/Header";
import {
  PageContainer,
  ContentSection,
  ContentContainer,
  ParchmentText,
  PowerListTitle,
} from "../../components/PageComponents";
import {
  Box,
} from "@mui/material";
import { commonItemsData } from "./data/commonItemsData";
import EquipmentItemCard from "../../components/EquipmentItemCard";

export default function PotionsPage() {
  // Get potion categories from commonItemsData
  const lesserPotions = commonItemsData.find((cat) => cat.id === "lesser-potions");
  const greaterPotions = commonItemsData.find((cat) => cat.id === "greater-potions");

  return (
    <PageContainer>
      <Header title="Poções e Elixires" />

      <ContentSection>
        <ContentContainer>
          <ParchmentText>
            Nas sombras de Mordheim, alquimistas destemidos e aprendizes desesperados destilam essências arcanas em frascos de vidro negro. Cada poção é uma promessa em forma líquida - poder momentâneo, cura milagrosa, ou morte súbita. Os mais sábios aprendem a distinguir o brilho de um elixir da vida do veneno que queima como fogo infernal.
          </ParchmentText>

          <ParchmentText>
            Estas misturas não são simples remédios herbais. São fragmentos líquidos de magia, destilações de poder bruto capturadas em âmbar e cristal. Um frasco pode transformar um covarde em herói por minutos preciosos. Outro pode preservar vida mesmo após a morte reclamar seu tributo. Mas todo poder tem seu preço, e os alquimistas de Mordheim pagam em cicatrizes e sanidade.
          </ParchmentText>
        </ContentContainer>
      </ContentSection>

      {/* LESSER POTIONS */}
      {lesserPotions && (
        <ContentSection>
          <ContentContainer>
            <PowerListTitle>
              {lesserPotions.icon} {lesserPotions.label}
            </PowerListTitle>
            <ParchmentText>
              Poções Menores são relativamente comuns nas ruínas de Mordheim, encontradas em laboratórios abandonados, mercados negros e nos cintos de aventureiros mortos. Qualquer alquimista competente pode prepará-las com os ingredientes certos.
            </ParchmentText>

            {lesserPotions.items.map((potion) => (
              <EquipmentItemCard
                key={potion.id}
                id={potion.id}
                name={potion.name}
                properties={potion.properties}
                description={potion.description}
              />
            ))}
          </ContentContainer>
        </ContentSection>
      )}

      {/* GREATER POTIONS */}
      {greaterPotions && (
        <ContentSection>
          <ContentContainer>
            <PowerListTitle>
              {greaterPotions.icon} {greaterPotions.label}
            </PowerListTitle>
            <ParchmentText>
              Poções Maiores são obras-primas da alquimia arcana - raras, poderosas e perigosas. Algumas são tão valiosas que não podem ser compradas com ouro comum. Outras são tão instáveis que apenas os mais desesperados ou loucos ousam usá-las. Cada uma representa semanas de trabalho e ingredientes que poucos podem obter.
            </ParchmentText>

            {greaterPotions.items.map((potion) => (
              <EquipmentItemCard
                key={potion.id}
                id={potion.id}
                name={potion.name}
                properties={potion.properties}
                description={potion.description}
              />
            ))}
          </ContentContainer>
        </ContentSection>
      )}

      <ContentSection>
        <ContentContainer>
          <ParchmentText>
            <strong>Nota do Mestre:</strong> Poções marcadas com "—" no preço de compra nunca podem ser compradas em mercados comuns - apenas encontradas, roubadas, ou fabricadas com grande custo e risco. O Elixir da Vida, em particular, é lenda mesmo entre mestres alquimistas, e apenas um tolo desesperado venderia tal tesouro.
          </ParchmentText>
        </ContentContainer>
      </ContentSection>
    </PageContainer>
  );
}
