import Header from "../../components/Header";
import {
  PageContainer,
  ContentSection,
  ContentContainer,
  ParchmentText,
  PowerListTitle,
} from "../../components/PageComponents";

export default function TheStablePage() {
  return (
    <PageContainer>
      <Header title="The Stable" />

      <ContentSection>
        <ContentContainer>
          <ParchmentText>
            Para warbands que desejam incorporar criaturas de guerra, um
            estábulo adequado é essencial. Seja para abrigar cavalos de guerra,
            lobos gigantes, squigs saltadores, ou bestas ainda mais exóticas, o
            estábulo fornece os cuidados necessários para manter estas criaturas
            prontas para batalha.
          </ParchmentText>

          <PowerListTitle>Função do Estábulo</PowerListTitle>

          <ParchmentText>
            Um estábulo bem mantido permite que a warband:
          </ParchmentText>

          <ParchmentText>
            <strong>• Abrigar Montarias:</strong> Cavalos, lobos, cold ones, e
            outras criaturas podem ser mantidas prontas para uso.
          </ParchmentText>

          <ParchmentText>
            <strong>• Recuperação de Criaturas:</strong> Criaturas feridas em
            batalha podem se recuperar entre jogos.
          </ParchmentText>

          <ParchmentText>
            <strong>• Treinamento de Animais:</strong> Animal companions e war
            beasts podem ser treinados para melhorar suas capacidades.
          </ParchmentText>

          <ParchmentText>
            <strong>• Criação Especial:</strong> Algumas warbands podem usar o
            estábulo para propósitos únicos - Skaven podem criar rat ogres,
            Beastmen podem abrigar chaos spawns, e necromantes podem animar
            bestas mortas-vivas.
          </ParchmentText>

          <ParchmentText>
            <em>
              Regras detalhadas para estábulos e criaturas serão adicionadas em
              breve...
            </em>
          </ParchmentText>
        </ContentContainer>
      </ContentSection>
    </PageContainer>
  );
}

