import Header from "../../components/Header";
import {
  PageContainer,
  ContentSection,
  ContentContainer,
  ParchmentText,
  PowerListTitle,
} from "../../components/PageComponents";
import { commonItemsData } from "./data/commonItemsData";
import EquipmentItemCard from "../../components/EquipmentItemCard";

export default function MagicItemsPage() {
  // Get magic items from commonItemsData
  const magicItems = commonItemsData.find((cat) => cat.id === "magic-items");

  return (
    <PageContainer>
      <Header title="Relíquias" />

      <ContentSection>
        <ContentContainer>
          <ParchmentText>
            Entre escombros e ossos, nas profundezas esquecidas de Mordheim, jazem fragmentos de eras mortas. Não armas comuns - relíquias. Anéis que torcem o destino, amuletos que bebem magia hostil, cajados entalhados por civilizações que o Império nem conhece o nome. Cada peça pulsa com poder que não deveria existir, encantamentos que sobreviveram quando seus criadores não sobreviveram.
          </ParchmentText>

          <ParchmentText>
            Estes artefatos não são ferramentas - são parasitas, simbiontes, legados. O Cetro de Pedra-Bruxa que você carrega foi arrancado de mãos mortas. O Anel de Proteção no seu dedo foi roubado de um cadáver que confiou nele demais. As Botas Élficas que aceleram seus passos foram fabricadas por artesãos que viraram pó há mil anos. Cada relíquia é fragmento de história cristalizado em metal, pedra e osso - e história em Mordheim geralmente termina em sangue.
          </ParchmentText>
        </ContentContainer>
      </ContentSection>

      {magicItems && (
        <ContentSection>
          <ContentContainer>
            <PowerListTitle>
              {magicItems.icon} {magicItems.label}
            </PowerListTitle>
            {magicItems.items.map((item) => (
              <EquipmentItemCard
                key={item.id}
                id={item.id}
                name={item.name}
                properties={item.properties}
                description={item.description}
              />
            ))}
          </ContentContainer>
        </ContentSection>
      )}
    </PageContainer>
  );
}
