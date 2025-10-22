import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";
import HeaderH1 from "../../components/HeaderH1";
import HeaderH2 from "../../components/HeaderH2";
import HeaderH3 from "../../components/HeaderH3";
import CornerDecoration from "../../components/CornerDecoration";

function PostGameSequencePage() {
  const navigate = useNavigate();

  const postGameSteps = [
    {
      id: "experience-roll",
      title: "Rolagem de Experiência",
      description:
        "Calcule a experiência ganha por cada figura baseada em suas ações durante a batalha.",
      route: "/post-game/experience-roll",
    },
    {
      id: "survival-test",
      title: "Teste de Sobrevivência",
      description:
        "Figuras feridas fazem testes para determinar se sobrevivem, sofrem lesões ou morrem.",
      route: "/post-game/survival-test",
    },
    {
      id: "healing",
      title: "Cura de Ferimentos",
      description:
        "Cure ferimentos temporários e lesões permanentes através de vários métodos.",
      route: "/post-game/healing",
    },
    {
      id: "rituals",
      title: "Rituais",
      description:
        "Conjure magias rituais e ative poderes de ofício para efeitos duradouros no bando.",
      route: "/post-game/rituals",
    },
    {
      id: "rewards",
      title: "Coleta de Recompensas",
      description:
        "Receba coroas, tesouros e equipamentos baseados em objetivos cumpridos.",
      route: "/post-game/rewards",
    },
    {
      id: "wyrdstone-selling",
      title: "Venda de Pedra-Bruxa",
      description:
        "Venda fragmentos de Pedra-Bruxa aos nobres do Império com preços baseados no tamanho do bando.",
      route: "/post-game/wyrdstone-selling",
    },
    {
      id: "black-market",
      title: "Rolagens de Mercado Negro",
      description:
        "Compre e venda equipamentos, contrate mercenários no mercado negro.",
      route: "/post-game/black-market",
    },
    {
      id: "advancements",
      title: "Avanços e Habilidades",
      description:
        "Figuras com experiência suficiente podem avançar e aprender novas habilidades.",
      route: "/post-game/advancements",
    },
    {
      id: "hiring",
      title: "Contratação de Mercenários",
      description:
        "Contrate mercenários encontrados durante exploração para fortalecer o bando.",
      route: "/post-game/hiring",
    },
    {
      id: "maintenance",
      title: "Manutenção do Bando",
      description:
        "Pague custos de manutenção para manter o bando funcionando.",
      route: "/post-game/maintenance",
    },
    {
      id: "exploration",
      title: "Exploração",
      description:
        "Explore novos locais para encontrar tesouros, contatos e oportunidades.",
      route: "/post-game/exploration",
    },
    {
      id: "update-stats",
      title: "Atualização de Estatísticas",
      description:
        "Atualize todas as estatísticas do bando e prepare para a próxima batalha.",
      route: "/post-game/update-stats",
    },
  ];

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <CornerDecoration />
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <MobileSection>
            <PageTitle>Sequência Pós-Jogo</PageTitle>

            <MobileText>
              A sequência pós-jogo é uma parte fundamental do Mordheim, onde seu
              bando cresce, evolui e se prepara para futuras batalhas. Cada
              passo é importante para o desenvolvimento e manutenção do seu
              bando.
            </MobileText>

            <HeaderH1>Ordem Recomendada</HeaderH1>
            <MobileText>
              Embora a ordem possa variar dependendo das circunstâncias, a
              sequência recomendada garante que todas as fases sejam cobertas
              adequadamente:
            </MobileText>

            <div className="space-y-4 mt-6">
              {postGameSteps.map((step, index) => (
                <div
                  key={step.id}
                  className="bg-[#1a1a1a] border border-[#333] rounded-lg p-4 hover:border-[#555] transition-colors cursor-pointer"
                  onClick={() => navigate(step.route)}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-[#d4af37] text-black rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <HeaderH3 className="text-[#d4af37] mb-2">
                        {step.title}
                      </HeaderH3>
                      <MobileText className="text-sm">
                        {step.description}
                      </MobileText>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <HeaderH1>Dicas Gerais</HeaderH1>

            <HeaderH2>Planejamento</HeaderH2>
            <MobileText>
              • <strong>Orçamento:</strong> Planeje seus gastos antes de começar
              <br />• <strong>Prioridades:</strong> Determine quais aspectos são
              mais importantes
              <br />• <strong>Recursos:</strong> Considere todos os recursos
              disponíveis
            </MobileText>

            <HeaderH2>Eficiência</HeaderH2>
            <MobileText>
              • <strong>Sequência:</strong> Siga a ordem recomendada quando
              possível
              <br />• <strong>Decisões:</strong> Tome decisões informadas
              baseadas nas necessidades do bando
              <br />• <strong>Registros:</strong> Mantenha registros detalhados
              de todas as mudanças
            </MobileText>

            <HeaderH2>Adaptação</HeaderH2>
            <MobileText>
              • <strong>Flexibilidade:</strong> Adapte a sequência às
              necessidades específicas
              <br />• <strong>Circunstâncias:</strong> Considere as
              circunstâncias específicas do bando
              <br />• <strong>Oportunidades:</strong> Aproveite oportunidades
              únicas quando aparecerem
            </MobileText>

            <HeaderH1>Exemplo de Sequência</HeaderH1>
            <MobileText className="italic text-[#c4a870]">
              O bando "Garras de Ferro" completa sua sequência pós-jogo:
              Primeiro, calculam a experiência (João ganha 5 XP). Em seguida,
              fazem testes de sobrevivência (2 figuras sobrevivem, 1 sofre
              lesão). Curam ferimentos (gastam 30 coroas). Coletam recompensas
              (ganham 200 coroas). Visitam o mercado negro (compram equipamentos
              por 100 coroas). João avança de nível (aumenta Ímpeto). Contratam
              um mercenário (120 coroas). Pagam manutenção (50 coroas). Exploram
              (encontram tesouro). Finalmente, atualizam todas as estatísticas.
              Total: 200 coroas ganhas, 300 coroas gastas, bando mais forte e
              pronto para a próxima batalha.
            </MobileText>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default PostGameSequencePage;
