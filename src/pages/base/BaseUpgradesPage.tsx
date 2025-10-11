import Header from "../../components/Header";
import {
  PageContainer,
  ContentSection,
  ContentContainer,
  ParchmentText,
  PowerListTitle,
} from "../../components/PageComponents";

export default function BaseUpgradesPage() {
  return (
    <PageContainer>
      <Header title="Base Upgrades" />

      <ContentSection>
        <ContentContainer>
          <ParchmentText>
            À medida que uma warband prospera, sua base pode ser expandida e
            melhorada com diversas facilidades. Cada upgrade representa um
            investimento significativo de ouro e recursos, mas oferece
            benefícios permanentes que ajudam a warband a crescer mais forte.
          </ParchmentText>

          <PowerListTitle>Tipos de Upgrades</PowerListTitle>

          <ParchmentText>
            <strong>• Biblioteca Arcana:</strong> Facilita o aprendizado de
            novas spells e reduz o custo de grimórios.
          </ParchmentText>

          <ParchmentText>
            <strong>• Oficina de Forja:</strong> Permite reparos e melhorias em
            equipamentos.
          </ParchmentText>

          <ParchmentText>
            <strong>• Laboratório de Alquimia:</strong> Permite a criação de
            poções e elixires com maior eficiência.
          </ParchmentText>

          <ParchmentText>
            <strong>• Enfermaria:</strong> Acelera a recuperação de feridos e
            reduz o risco de mortes permanentes.
          </ParchmentText>

          <ParchmentText>
            <strong>• Sala de Treino:</strong> Permite que soldados treinem e
            melhorem suas habilidades entre batalhas.
          </ParchmentText>

          <ParchmentText>
            <strong>• Cofre Reforçado:</strong> Aumenta a capacidade de
            armazenamento de tesouros e itens mágicos.
          </ParchmentText>

          <ParchmentText>
            <em>
              Regras detalhadas e custos dos upgrades serão adicionados em
              breve...
            </em>
          </ParchmentText>
        </ContentContainer>
      </ContentSection>
    </PageContainer>
  );
}

