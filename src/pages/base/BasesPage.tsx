import Header from "../../components/Header";
import {
  PageContainer,
  ContentSection,
  ContentContainer,
  ParchmentText,
  PowerListTitle,
} from "../../components/PageComponents";

export default function BasesPage() {
  return (
    <PageContainer>
      <Header title="Bases" />

      <ContentSection>
        <ContentContainer>
          <ParchmentText>
            Cada warband precisa de uma base de operações - um lugar para
            descansar entre expedições, armazenar tesouros, e planejar a próxima
            incursão nas ruínas amaldiçoadas. A escolha da base pode influenciar
            significativamente as capacidades e estratégias da warband.
          </ParchmentText>

          <PowerListTitle>Tipos de Bases</PowerListTitle>

          <ParchmentText>
            <strong>• Taverna Abandonada:</strong> Um refúgio comum que oferece
            abrigo básico e espaço para armazenamento.
          </ParchmentText>

          <ParchmentText>
            <strong>• Torre em Ruínas:</strong> Oferece posição defensiva e
            espaço para estudo arcano.
          </ParchmentText>

          <ParchmentText>
            <strong>• Catacumbas Antigas:</strong> Ideal para necromantes e
            aqueles que traficam com os mortos.
          </ParchmentText>

          <ParchmentText>
            <strong>• Templo Profanado:</strong> Um lugar de poder religioso,
            corrompido ou purificado conforme a natureza da warband.
          </ParchmentText>

          <ParchmentText>
            <em>Conteúdo detalhado das bases será adicionado em breve...</em>
          </ParchmentText>
        </ContentContainer>
      </ContentSection>
    </PageContainer>
  );
}

