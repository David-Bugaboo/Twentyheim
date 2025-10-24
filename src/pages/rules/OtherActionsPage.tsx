import PageTitle from "../../components/PageTitle";
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";
import HeaderH1 from "../../components/HeaderH1";
import WarningBox from "../../components/WarningBox";
import QuickNavigation from "../../components/QuickNavigation";

function OtherActionsPage() {
  const navigationSections = [
    { id: "intro", title: "Outras Ações", level: 0 },
    { id: "usar-item", title: "Ação de Usar Item", level: 0 },
    { id: "acoes-especiais", title: "Ações Especiais", level: 0 },
    {
      id: "exemplo-mirar",
      title: "Exemplo: Ação de Mirar do Lagarto Atirador",
      level: 1,
    },
    { id: "resumo", title: "Resumo das Outras Ações", level: 1 },
  ];

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <QuickNavigation sections={navigationSections} />
          <MobileSection>
            <div id="intro">
              <PageTitle>Outras Ações</PageTitle>
            </div>

            <MobileText>
              Nem toda ação se encaixa perfeitamente nas categorias
              tradicionais. Algumas figuras possuem truques únicos, técnicas
              especializadas, ou habilidades que desafiam a normalidade. Estas
              são as <strong>ações especiais</strong> — capacidades únicas
              concedidas por habilidades, traits, magias ou equipamentos
              específicos.
            </MobileText>

            <div id="usar-item">
              <HeaderH1>Ação de Usar Item</HeaderH1>
            </div>
            <MobileText>
              Remédios preparados em alambiques esquecidos podem salvar vidas...
              ou destruí-las espetacularmente.
            </MobileText>
            <MobileText>
              Alguns <strong>acessórios e poções</strong> especificam que
              precisam de ações para serem bebidos, ativados ou utilizados. Esta
              é a ação usada para tal fim. Simples, direto, e frequentemente a
              diferença entre vida e morte.
            </MobileText>
            <MobileText>
              Consulte a descrição específica do item para saber seus efeitos,
              duração, e quaisquer consequências de uso. Alguns itens são
              puramente benignos. Outros... bem, em Mordheim, até as curas podem
              ter preço.
            </MobileText>

            <div id="acoes-especiais">
              <HeaderH1>Ações Especiais</HeaderH1>
            </div>
            <MobileText>
              Nem toda ação se encaixa perfeitamente nas categorias acima.
              Algumas figuras possuem truques únicos, técnicas especializadas,
              ou habilidades que desafiam a normalidade. Estas são as{" "}
              <strong>ações especiais</strong> — capacidades únicas concedidas
              por habilidades, traits, magias ou equipamentos específicos.
            </MobileText>

            <MobileText>
              <strong>Ações Definidas por Habilidades:</strong> Quando uma
              habilidade, trait ou item concede uma "ação especial", ela
              especifica exatamente o que pode ser feito, quando pode ser usado,
              e quais seus efeitos. Estas ações seguem suas próprias regras,
              escritas em suas descrições.
            </MobileText>

            <MobileText>
              Algumas ações especiais substituem ações normais (como movimento
              ou tiro). Outras são completamente únicas. Sempre leia a descrição
              completa — em Mordheim, os detalhes matam.
            </MobileText>

            <div id="exemplo-mirar">
              <WarningBox
                title="Exemplo: Ação de Mirar do Lagarto Atirador"
                type="info"
              >
                <MobileText
                  variant="quote"
                  className="text-center italic text-sm leading-relaxed mb-3"
                >
                  Tik-Taq, o Lagarto Atirador, espreitava nas sombras, sua
                  zarabatana firmemente segura. O cultista estava a 40 cm —
                  alcance perfeito, mas o alvo se movia entre os escombros.
                  Tik-Taq não era apressado. Lagartos nunca são.
                </MobileText>

                <MobileText
                  variant="quote"
                  className="text-center italic text-sm leading-relaxed mb-3"
                >
                  Ele usou sua primeira ação para <strong>Mirar</strong> — uma
                  ação especial concedida por sua habilidade de zarabataneiro.
                  Respiração controlada. Foco absoluto. Cálculo da distância,
                  vento, e o movimento do alvo. Quando sua segunda ação veio,
                  ele disparou{" "}
                  <strong>Ignorando terrenos entre ele e o alvo</strong>.
                </MobileText>

                <MobileText
                  variant="quote"
                  className="text-center italic text-sm leading-relaxed"
                >
                  O dardo envenenado voou. Silencioso. Certeiro. O cultista caiu
                  antes mesmo de saber que estava morto. Tik-Taq assentiu para
                  si mesmo. Paciência, como sempre, vence pressa. Os
                  sangue-quente nunca entendem isso.
                </MobileText>
              </WarningBox>
            </div>

            <div id="resumo">
              <WarningBox title="Resumo das Outras Ações" type="info">
                <MobileText>
                  • <strong>Usar Item:</strong> Ativar poções, itens mágicos e
                  equipamentos especiais
                </MobileText>
                <MobileText>
                  • <strong>Ações Especiais:</strong> Habilidades únicas de
                  figuras específicas
                </MobileText>
                <MobileText>
                  • <strong>Regras Específicas:</strong> Cada ação especial tem
                  suas próprias regras
                </MobileText>
                <MobileText>
                  • <strong>Substituição:</strong> Podem substituir ações
                  normais ou ser únicas
                </MobileText>
                <MobileText>
                  • <strong>Leia a Descrição:</strong> Sempre consulte a
                  descrição completa da ação
                </MobileText>
              </WarningBox>
            </div>

            <MobileText
              variant="quote"
              className="text-center italic text-lg leading-relaxed mt-8"
            >
              "Em Mordheim, até as ações mais simples podem ter consequências
              inesperadas. A diferença entre vida e morte muitas vezes está nos
              detalhes que outros ignoram."
            </MobileText>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default OtherActionsPage;
