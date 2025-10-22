import PageTitle from "../../components/PageTitle";
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";
import HeaderH1 from "../../components/HeaderH1";
import HeaderH2 from "../../components/HeaderH2";
import HeaderH3 from "../../components/HeaderH3";
import CornerDecoration from "../../components/CornerDecoration";

function UpdateStatsPage() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <CornerDecoration />
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <MobileSection>
            <PageTitle>Atualização de Estatísticas</PageTitle>

            <MobileText>
              A fase final da sequência pós-jogo envolve atualizar todas as estatísticas do bando, registrar mudanças e preparar para a próxima batalha. Esta é uma fase crucial para manter o controle do crescimento do seu bando.
            </MobileText>

            <HeaderH1>O Que Atualizar</HeaderH1>

            <HeaderH2>Experiência</HeaderH2>
            <MobileText>
              • <strong>Registrar XP:</strong> Anote a experiência ganha por cada figura
              <br />• <strong>Totalizar XP:</strong> Some a experiência total de cada figura
              <br />• <strong>Verificar Avanços:</strong> Identifique figuras que podem avançar
            </MobileText>

            <HeaderH2>Características</HeaderH2>
            <MobileText>
              • <strong>Aumentos:</strong> Aplique aumentos de características de avanços
              <br />• <strong>Lesões:</strong> Registre lesões permanentes
              <br />• <strong>Cura:</strong> Aplique efeitos de cura
            </MobileText>

            <HeaderH2>Habilidades</HeaderH2>
            <MobileText>
              • <strong>Novas Habilidades:</strong> Registre habilidades aprendidas
              <br />• <strong>Melhorias:</strong> Aplique melhorias em habilidades existentes
              <br />• <strong>Especializações:</strong> Registre especializações
            </MobileText>

            <HeaderH1>Inventário</HeaderH1>

            <HeaderH2>Equipamentos</HeaderH2>
            <MobileText>
              • <strong>Novos Itens:</strong> Adicione equipamentos comprados ou encontrados
              <br />• <strong>Vendas:</strong> Remova itens vendidos
              <br />• <strong>Manutenção:</strong> Registre custos de manutenção
            </MobileText>

            <HeaderH2>Recursos</HeaderH2>
            <MobileText>
              • <strong>Coroas:</strong> Atualize o total de coroas disponíveis
              <br />• <strong>Pedra-Bruxa:</strong> Registre pedra-bruxa encontrada
              <br />• <strong>Itens Mágicos:</strong> Atualize inventário de itens mágicos
            </MobileText>

            <HeaderH1>Composição do Bando</HeaderH1>

            <HeaderH2>Membros</HeaderH2>
            <MobileText>
              • <strong>Novos Recrutas:</strong> Adicione novos membros
              <br />• <strong>Mercenários:</strong> Registre mercenários contratados
              <br />• <strong>Perdas:</strong> Remova figuras mortas ou que deixaram o bando
            </MobileText>

            <HeaderH2>Hierarquia</HeaderH2>
            <MobileText>
              • <strong>Promoções:</strong> Registre mudanças de posição
              <br />• <strong>Liderança:</strong> Atualize estrutura de comando
              <br />• <strong>Especializações:</strong> Registre especializações de membros
            </MobileText>

            <HeaderH1>Registros de Campanha</HeaderH1>

            <HeaderH2>Histórico de Batalhas</HeaderH2>
            <MobileText>
              • <strong>Resultados:</strong> Registre vitórias e derrotas
              <br />• <strong>Objetivos:</strong> Anote objetivos cumpridos
              <br />• <strong>Consequências:</strong> Registre consequências de batalhas
            </MobileText>

            <HeaderH2>Reputação</HeaderH2>
            <MobileText>
              • <strong>Mudanças:</strong> Registre mudanças na reputação
              <br />• <strong>Contatos:</strong> Atualize rede de contatos
              <br />• <strong>Inimigos:</strong> Registre inimigos feitos
            </MobileText>

            <HeaderH1>Preparação para Próxima Batalha</HeaderH1>

            <HeaderH2>Verificações</HeaderH2>
            <MobileText>
              • <strong>Equipamentos:</strong> Verifique se todos têm equipamentos adequados
              <br />• <strong>Ferimentos:</strong> Confirme que todos estão curados
              <br />• <strong>Manutenção:</strong> Verifique se todos os custos foram pagos
            </MobileText>

            <HeaderH2>Planejamento</HeaderH2>
            <MobileText>
              • <strong>Estratégia:</strong> Planeje estratégias para próxima batalha
              <br />• <strong>Objetivos:</strong> Defina objetivos para próxima batalha
              <br />• <strong>Recursos:</strong> Planeje uso de recursos disponíveis
            </MobileText>

            <HeaderH1>Exemplo de Atualização</HeaderH1>
            <MobileText className="italic text-[#c4a870]">
              O bando "Garras de Ferro" atualiza suas estatísticas: João ganhou 5 XP e pode avançar, aumentando seu Ímpeto de +3 para +4. Eles compraram uma espada mágica por 150 coroas e contrataram um mercenário por 120 coroas. Sua reputação aumentou devido à vitória na última batalha. Eles agora têm 200 coroas restantes e estão prontos para a próxima batalha.
            </MobileText>

            <HeaderH1>Dicas Importantes</HeaderH1>
            <MobileText>
              • <strong>Organização:</strong> Mantenha registros organizados e atualizados
              <br />• <strong>Verificação:</strong> Verifique todos os cálculos e registros
              <br />• <strong>Planejamento:</strong> Use as informações para planejar futuras ações
              <br />• <strong>Histórico:</strong> Mantenha um histórico detalhado do crescimento do bando
            </MobileText>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default UpdateStatsPage;
