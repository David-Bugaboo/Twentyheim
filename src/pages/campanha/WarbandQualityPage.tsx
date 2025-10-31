import PageTitle from "../../components/PageTitle";
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";
import HeaderH1 from "../../components/HeaderH1";
import HeaderH2 from "../../components/HeaderH2";

import QuickNavigation from "../../components/QuickNavigation";
import GenericTable from "../../components/GenericTable";

function WarbandQualityPage() {
  const navigationSections = [
    { id: "intro", title: "Qualidade do Bando", level: 0 },
    { id: "calculo-basico", title: "Cálculo Básico", level: 0 },
    { id: "experiencia", title: "Experiência", level: 0 },
    { id: "criaturas-grandes", title: "Criaturas grandes", level: 0 },
    { id: "mercenarios", title: "Mercenários", level: 0 },
    { id: "lendas", title: "Lendas", level: 0 },
    { id: "recalculo", title: "Recálculo", level: 0 },
    { id: "exemplo", title: "Exemplo Prático", level: 0 },
  ];

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <QuickNavigation sections={navigationSections} />
          <MobileSection>
            <div id="intro">
              <PageTitle>Qualidade do Bando</PageTitle>
            </div>

            <MobileText>
              A qualidade de um bando é um valor numérico que representa o poder
              geral e experiência do grupo. Este valor é usado para determinar
              bônus de experiência em batalhas contra bandos mais poderosos e
              para balancear encontros entre diferentes bandos.
            </MobileText>

            <MobileText>
              <strong>Fórmula Básica:</strong> Para calcular a qualidade de um
              bando, multiplique a quantidade de figuras por 5 e some a
              experiência acumulada de cada criatura.
            </MobileText>

            <div id="calculo-basico">
              <HeaderH1>Cálculo Básico</HeaderH1>
            </div>

            <MobileText>
              <strong>Passo 1:</strong> Conte todas as figuras do seu bando
              (Líder, Heróis e Soldados)
            </MobileText>

            <MobileText>
              <strong>Passo 2:</strong> Multiplique esse número por 5
            </MobileText>

            <MobileText>
              <strong>Passo 3:</strong> Some toda a experiência acumulada de
              cada figura do bando
            </MobileText>

            <MobileText>
              <strong>Resultado:</strong> Este é o valor base da qualidade do
              seu bando
            </MobileText>

            <GenericTable
              data={[
                {
                  Componente: "Figuras do Bando",
                  Cálculo: "Número de figuras × 5",
                  Exemplo: "8 figuras × 5 = 40 pontos",
                },
                {
                  Componente: "Experiência Total",
                  Cálculo: "Soma de toda experiência",
                  Exemplo:
                    "Líder (12xp) + Heróis (8xp) + Soldados (15xp) = 35 pontos",
                },
                {
                  Componente: "Qualidade Base",
                  Cálculo: "Figuras + Experiência",
                  Exemplo: "40 + 35 = 75 pontos",
                },
              ]}
              scrollable={false}
            />

            <div id="experiencia">
              <HeaderH1>Experiência</HeaderH1>
            </div>

            <MobileText>
              Cada ponto de experiência que uma figura possui contribui
              diretamente para a qualidade do bando. Isso significa que bandos
              mais experientes têm qualidade maior, refletindo sua maior
              habilidade e eficácia em combate.
            </MobileText>

            <MobileText>
              <strong>Importante:</strong> Apenas figuras vivas e ativas no
              roster contam para o cálculo. Figuras mortas, feridas ou
              temporariamente indisponíveis não devem ser incluídas.
            </MobileText>

            <div id="criaturas-grandes">
              <HeaderH1>Criaturas grandes</HeaderH1>
            </div>

            <MobileText>
              Cada Figura com a característica Grande no grupo soma 20 pontos a
              qualidade do bando.
            </MobileText>

            <div id="mercenarios">
              <HeaderH1>Mercenários</HeaderH1>
            </div>

            <MobileText>
              Mercenários somam um valor extra à qualidade do bando além do
              cálculo básico. Cada mercenário tem um valor específico listado em
              sua entrada, que deve ser somado à qualidade total.
            </MobileText>

            <MobileText>
              <strong>Exemplos de valores de mercenários:</strong>
            </MobileText>

            <GenericTable
              data={[
                {
                  Mercenário: "Patrulheiro Elfo",
                  Valor: "8 pontos",
                },
                {
                  Mercenário: "Mata-Trolls Anão",
                  Valor: "12 pontos",
                },
                {
                  Mercenário: "Ogro Guarda-Costas",
                  Valor: "25 pontos",
                },
                {
                  Mercenário: "Rato Ogróide do Clã Skryre",
                  Valor: "25 pontos",
                },
              ]}
              scrollable={false}
            />

            <div id="lendas">
              <HeaderH1>Lendas</HeaderH1>
            </div>

            <MobileText>
              Lendas também somam valores específicos à qualidade do bando.
              Estes valores são geralmente maiores que os de mercenários comuns,
              refletindo seu poder e raridade excepcionais.
            </MobileText>

            <MobileText>
              <strong>Exemplos de valores de lendas:</strong>
            </MobileText>

            <GenericTable
              data={[
                {
                  Lenda: "Aenur, a Espada do Crepúsculo",
                  Valor: "100 pontos",
                },
                {
                  Lenda: "Bertha Bestraufrung",
                  Valor: "105 pontos",
                },
                {
                  Lenda: "Condessa Marianna Chevaux",
                  Valor: "90 pontos",
                },
                {
                  Lenda: "Johann, a Faca",
                  Valor: "60 pontos",
                },
              ]}
              scrollable={false}
            />

            <div id="recalculo">
              <HeaderH1>Recálculo</HeaderH1>
            </div>

            <MobileText>
              <strong>Sempre recalcule a qualidade do bando quando:</strong>
            </MobileText>

            <MobileText>
              • Uma figura ganha experiência e sobe de nível
            </MobileText>

            <MobileText>
              • Um mercenário é contratado ou deixa o bando
            </MobileText>

            <MobileText>• Uma lenda se junta ou deixa o bando</MobileText>

            <MobileText>• Uma figura morre ou é removida do bando</MobileText>

            <MobileText>
              • Uma figura é ferida e fica temporariamente indisponível
            </MobileText>

            <MobileText>
              <strong>Processo de Recálculo:</strong> Repita todo o processo de
              cálculo sempre que necessário. Não há atalhos - você deve
              recalcular completamente para garantir precisão.
            </MobileText>

            <div id="exemplo">
              <HeaderH1>Exemplo Prático</HeaderH1>
            </div>

            <MobileText>
              <strong>Bando de Exemplo:</strong>
            </MobileText>

            <MobileText>• 1 Líder (15 pontos de experiência)</MobileText>

            <MobileText>• 2 Heróis (8 e 12 pontos de experiência)</MobileText>

            <MobileText>
              • 4 Soldados (3, 5, 7 e 9 pontos de experiência)
            </MobileText>

            <MobileText>
              • 1 Patrulheiro Elfo mercenário (6 pontos de experiência)
            </MobileText>

            <MobileText>
              <strong>Cálculo:</strong>
            </MobileText>

            <MobileText>
              <strong>Passo 1:</strong> 7 figuras × 5 = 35 pontos
            </MobileText>

            <MobileText>
              <strong>Passo 2:</strong> Experiência total = 15 + 8 + 12 + 3 + 5
              + 7 + 9 + 6 = 65 pontos
            </MobileText>

            <MobileText>
              <strong>Passo 3:</strong> Qualidade base = 35 + 65 = 100 pontos
            </MobileText>

            <MobileText>
              <strong>Passo 4:</strong> Mercenário = 8 pontos + 6 pontos
              (experiência) = 14 pontos
            </MobileText>

            <MobileText>
              <strong>Qualidade Final:</strong> 100 + 14 = 114 pontos
            </MobileText>

            <HeaderH2>Dicas Importantes</HeaderH2>

            <MobileText>
              • Mantenha sempre um registro atualizado da qualidade do seu bando
            </MobileText>

            <MobileText>
              • Anote a qualidade após cada mudança significativa
            </MobileText>

            <MobileText>
              • Use a qualidade para determinar bônus de experiência do bando
              com o menor valor em batalhas
            </MobileText>

            <MobileText>
              • Compare com outros bandos para balancear encontros
            </MobileText>

            <MobileText
              variant="quote"
              className="text-center text-lg leading-relaxed mt-8 italic"
            >
              "A qualidade de um bando não se mede apenas pelo número de
              espadas, mas pela experiência acumulada em cada lâmina."
            </MobileText>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default WarbandQualityPage;
