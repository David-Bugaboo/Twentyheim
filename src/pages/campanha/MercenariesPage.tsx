import PageTitle from "../../components/PageTitle";
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";
import HeaderH1 from "../../components/HeaderH1";
import HeaderH2 from "../../components/HeaderH2";
import QuickNavigation from "../../components/QuickNavigation";
import GenericTable from "../../components/GenericTable";
import UnitCard, {
  type NaturalAttack as UnitNaturalAttack,
} from "../../components/UnitCard";
import hiredSwordsData from "./data/hired-swords.data.json";

function HiredSwordsPage() {
  const navigationSections = [
    { id: "intro", title: "Espadas Contratadas", level: 0 },
    { id: "recrutamento", title: "Recrutando Mercenários", level: 0 },
    { id: "taxa-contratacao", title: "Taxa de Contratação", level: 0 },
    { id: "lesoes", title: "Ferimentos", level: 0 },
    { id: "experiencia", title: "Mercenários e Experiência", level: 0 },
    { id: "lista-mercenarios", title: "Lista de Mercenários", level: 0 },
  ];

  // Criar tabela de mercenários
  const mercenariesTable = hiredSwordsData.map((mercenary) => ({
    Nome: mercenary.name,
    Custo: mercenary.stats.cost,
    Manutenção: mercenary.stats.upkeep,
    Qualidade: mercenary.qualidade,
    Disponibilidade: Array.isArray(mercenary.availability)
      ? mercenary.availability.join(", ")
      : mercenary.availability,
  }));

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <QuickNavigation sections={navigationSections} />
          <MobileSection>
            <div id="intro">
              <PageTitle>Espadas Contratadas</PageTitle>
            </div>

            <MobileText>
              Esta seção introduz mercenários profissionais do derramamento de
              sangue – aos jogos de campanha de 20heim. Tavernas nos
              assentamentos e favelas ao redor de Mordheim são bons centros de
              recrutamento para guerreiros cuja única lealdade é o dinheiro.
            </MobileText>

            <MobileText>
              Um jogador pode recrutar Mercenários quando criar seu bando, ou
              durante a fase de campanha após um jogo.
            </MobileText>

            <MobileText>
              Mercenários não contam para o número máximo de figuras ou Heróis
              que um bando pode ter e não afetam sua renda da venda de
              Pedra-bruxa. No entanto, Mercen;arios contam como parte do bando
              para fins de testes de debandada, etc., enquanto em batalha. Um
              jogador não pode comprar armas ou equipamentos extras para uma
              Mercenário, e não pode vender as armas ou equipamentos dele. Para
              refletir sua raridade, você só pode ter um de cada tipo de
              Nercenário em seu bando. Você não pode usar a Liderança de nenhuma
              das Espadas Contratadas para testes de Debacle.
            </MobileText>

            <div id="recrutamento">
              <HeaderH1>Recrutando Mercenários</HeaderH1>
            </div>

            <MobileText>
              Para recrutar uma Mercenário, você deve primeiro verificar se ela
              está disponível para seu tipo de bando. Cada mercenário tem
              restrições de disponibilidade listadas em sua entrada. Alguns são
              disponíveis para todos os bandos, enquanto outros têm restrições
              específicas baseadas na natureza do seu bando.
            </MobileText>

            <MobileText>
              <strong>Processo de Recrutamento:</strong>
            </MobileText>

            <MobileText>
              1. Verifique a disponibilidade do mercenário para seu tipo de
              bando
            </MobileText>

            <MobileText>2. Pague a taxa de contratação inicial</MobileText>

            <MobileText>
              3. Adicione o mercenário ao seu bando como um soldado.
            </MobileText>

            <div id="taxa-contratacao">
              <HeaderH1>Taxa de Contratação</HeaderH1>
            </div>

            <MobileText>
              Quando um bando recruta um Mercenário, você deve pagar sua taxa de
              contratação. Subsequentemente, após cada batalha que ele lutar,
              incluindo a primeira, você deve pagar sua taxa de manutenção se
              quiser que ele permaneça com o bando. Se o Mercenário for morto,
              ou você não precisar mais de seus serviços, não precisa pagar
              nenhuma manutenção! Esses custos são indicados nas entradas para
              cada Mercenário.
            </MobileText>

            <MobileText>
              O dinheiro pago aos Mercenários vem do tesouro do bando da mesma
              forma que comprar novas armas ou recrutar novos guerreiros. Se
              você não tiver ouro suficiente para pagar pelo Mercenário, ou
              quiser gastá-lo em outras coisas, ela deixa o bando. Qualquer
              experiência que ela tenha ganhado será perdida, mesmo se você
              contratar um novo mercenário do mesmo tipo.
            </MobileText>

            <div id="lesoes">
              <HeaderH1>Ferimentos</HeaderH1>
            </div>

            <MobileText>
              Se uma Mercenário sair de ação durante o jogo, role para suas
              lesões como você rolaria para um Soldado após uma batalha.
            </MobileText>

            <div id="experiencia">
              <HeaderH1>Mercenários e Experiência</HeaderH1>
            </div>

            <MobileText>
              Mercenários ganham experiência exatamente da mesma forma que
              Soldados e seguem as regras para ganho de nível dos mercenários.
              Consulte os <a href="/scenarios">cenários</a> para descobrir
              quanta experiência os Mercenários ganham após cada jogo.
              Mercenários sempre começam no nível 1.
            </MobileText>

            <MobileText>
              Uma vez que a Mercenário ganhe experiência suficiente para subir
              de nível, role na tabela de Avanço de Heróis, e não de Soldado.
              Habilidades disponíveis para as Espadas Contratadas estão listadas
              sob suas entradas.
            </MobileText>

            <div id="experiencia">
              <HeaderH1>Qualidade do Bando</HeaderH1>
            </div>

            <MobileText>
              Sempre que um mercenário for contratado ou subir de nível,
              <a href="/rules/warband-quality">
                recalcule a classificação do bando
              </a>
            </MobileText>

            <div id="lista-mercenarios">
              <HeaderH1>Lista de Mercenários</HeaderH1>
            </div>

            <GenericTable data={mercenariesTable} scrollable={true} />

            <HeaderH2>Detalhes dos Mercenários</HeaderH2>

            {hiredSwordsData.map((mercenary) => {
              const naturalAttacks = Array.isArray(
                (mercenary as { naturalAttacks?: UnitNaturalAttack[] })
                  .naturalAttacks
              )
                ? (mercenary as { naturalAttacks?: UnitNaturalAttack[] })
                    .naturalAttacks
                : undefined;

              return (
              <div key={mercenary.id}>
                <UnitCard
                  id={mercenary.id}
                  name={mercenary.name}
                  role={mercenary.role}
                  stats={mercenary.stats}
                  lore={mercenary.lore}
                  availability={mercenary.availability}
                  qualidade={
                    mercenary.qualidade
                      ? String(mercenary.qualidade)
                      : undefined
                  }
                  spellAffinity={
                    "spellAffinity" in mercenary
                      ? (mercenary as any).spellAffinity
                      : undefined
                  }
                  abilities={mercenary.abilities}
                  naturalAttacks={naturalAttacks}
                />
              </div>
            );
            })}

            <MobileText
              variant="quote"
              className="text-center text-lg leading-relaxed mt-8 italic"
            >
              "Em Mordheim, cada moeda compra uma lâmina, mas nem toda lâmina
              vale o preço pago."
            </MobileText>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default HiredSwordsPage;
