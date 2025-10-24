import PageTitle from "../../components/PageTitle";
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";
import HeaderH1 from "../../components/HeaderH1";
import HeaderH2 from "../../components/HeaderH2";
import QuickNavigation from "../../components/QuickNavigation";
import gameTermsData from "./data/game-terms.json";

function FiguresAndAttributesPage() {
  // Filtrar características de figura dos game terms
  const figureCharacteristics = gameTermsData.filter(
    (term) =>
      term.term.includes("Grande") ||
      term.term.includes("Furtividade") ||
      term.term.includes("Forte") ||
      term.term.includes("Aterrorizante") ||
      term.term.includes("Morto-Vivo") ||
      term.term.includes("Animal") ||
      term.term.includes("Anfíbio") ||
      term.term.includes("Voador") ||
      term.term.includes("Levitar") ||
      term.term.includes("Procurado") ||
      term.term.includes("Visão Verdadeira") ||
      term.term.includes("Regeneração") ||
      term.term.includes("Agarrar") ||
      term.term.includes("Dreno de Energia") ||
      term.term.includes("Toque Vampírico") ||
      term.term.includes("Caçador de Matilha") ||
      term.term.includes("Resistência Elemental") ||
      term.term.includes("Toque Ardente") ||
      term.term.includes("Chifres") ||
      term.term.includes("Construto") ||
      term.term.includes("Daemônio") ||
      term.term.includes("Vulnerabilidade Elemental") ||
      term.term.includes("Voraz") ||
      term.term.includes("Furtividade (X)")
  );

  const navigationSections = [
    { id: "intro", title: "Figuras e suas características", level: 0 },
    { id: "atributos", title: "Os Atributos", level: 0 },
    { id: "movimento", title: "Movimento", level: 1 },
    { id: "impeto", title: "Ímpeto", level: 1 },
    { id: "precisao", title: "Precisão", level: 1 },
    { id: "armadura", title: "Armadura", level: 1 },
    { id: "vontade", title: "Vontade", level: 1 },
    { id: "vigor", title: "Vida", level: 1 },
    { id: "valores-tipicos", title: "Valores Típicos", level: 0 },
    { id: "caracteristicas", title: "Características de Figura", level: 0 },
    ...figureCharacteristics.map((characteristic, index) => ({
      id: `characteristic-${index}`,
      title: characteristic.term,
      level: 1,
    })),
    { id: "especializacoes", title: "Especializações", level: 0 },
  ];

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <QuickNavigation sections={navigationSections} />
          <MobileSection>
            <div id="intro">
              <PageTitle>Figuras e suas características</PageTitle>
            </div>

            <MobileText>
              As miniaturas que representam os soldados do seu bando de
              desgarradados são sempre mencionadas pelas regras como "Figuras".
              A definição de quão competentes elas são em diferentes tarefas é
              definida pelos seus <strong>Atributos</strong>.
            </MobileText>

            <div id="atributos">
              <HeaderH1>Os Atributos</HeaderH1>
            </div>

            <div id="movimento">
              <HeaderH2>Movimento</HeaderH2>
            </div>
            <MobileText>
              <strong>Movimento</strong> determina a distância que uma figura
              pode se mover em um turno. Quanto maior o Movimento, mais terreno
              a figura pode cobrir, permitindo posicionamento tático superior,
              retiradas rápidas ou avanços agressivos. Figuras com alto
              Movimento são essenciais para manobras de flanco e capturar
              recursos.
            </MobileText>

            <div id="impeto">
              <HeaderH2>Ímpeto</HeaderH2>
            </div>
            <MobileText>
              <strong>Ímpeto</strong> representa a habilidade de combate corpo a
              corpo da figura. Este atributo é usado para ataques em combate,
              carga e outras ações que envolvem confronto direto, além de ações
              que exigem força ou acuidade física. Figuras com alto Ímpeto são
              devastadoras em combate próximo e capazes de quebrar formações
              inimigas com cargas brutais.
            </MobileText>

            <div id="precisao">
              <HeaderH2>Precisão</HeaderH2>
            </div>
            <MobileText>
              <strong>Precisão</strong> define a habilidade de combate à
              distância da figura. Usado para ataques com armas com arcos,
              bestas e pistolas, este atributo é crucial para figuras que
              preferem manter distância do inimigo. Arqueiros, besteiros e
              atiradores especializados dependem deste atributo para eliminar
              alvos de longe. Figuras com alta Precisão são capazes de
              transformar uma simples flecha em um instrumento de selar
              destinos.
            </MobileText>

            <div id="armadura">
              <HeaderH2>Armadura</HeaderH2>
            </div>
            <MobileText>
              <strong>Armadura</strong> representa a proteção física da figura
              contra ataques. Este atributo reduz o dano recebido e pode
              significar a diferença entre a vida e a morte no campo de batalha.
              Figuras bem blindadas podem resistir a ataques que devastariam
              soldados menos protegidos. Figuras com Armadura alto ignoram
              ataques de armas fracas e diminuem consideravelmente o impacto até
              de armas pesadas.
            </MobileText>

            <div id="vontade">
              <HeaderH2>Vontade</HeaderH2>
            </div>
            <MobileText>
              <strong>Vontade</strong> determina a sua força mental e
              inteligência. Este atributo é especialmente importante quando
              enfrentando magos, daemônios ou outras figuras que atacam a mente.
              Uma Vontade forte pode proteger contra feitiços devastadores. Uma
              figura com Vontade alta tem uma força mental considerável, podendo
              até mesmo resistir a possessão demoníaca.
            </MobileText>

            <div id="vigor">
              <HeaderH2>Vida</HeaderH2>
            </div>
            <MobileText>
              <strong>Vida</strong> representa quantos ferimentos uma figura
              pode sofrer antes de cair em combate. Figuras com Vida alta são
              capazes de suportar punição incalculável antes de cair, esgotando
              recursos dos bandos inimigos enquanto aliados mais frágeis
              realizam ações táticas pelo mapa. Uma figura que chegue a zero de
              vida é retirada da mesa, e a não ser que por alguma magia ou
              efeito, não pode mais participar daquela partida.
            </MobileText>

            <div id="valores-tipicos">
              <HeaderH1>Valores Típicos</HeaderH1>
            </div>
            <MobileText>
              Os valores dos atributos variam conforme o tipo de figura:
            </MobileText>

            <HeaderH2>Recrutas</HeaderH2>
            <MobileText>
              Figuras básicas com atributos modestos, geralmente entre +0 a +2,
              representando soldados inexperientes ou mal treinados.
            </MobileText>

            <HeaderH2>Veteranos e Heróis</HeaderH2>
            <MobileText>
              Figuras experientes com atributos melhorados, tipicamente entre +2
              a +4, representando guerreiros que sobreviveram a muitas batalhas.
            </MobileText>

            <HeaderH2>Figuras Sobrenaturais</HeaderH2>
            <MobileText>
              Daemônios, monstros e outras figuras podem ter atributos que
              excedem os valores normais, refletindo sua natureza sobrenatural e
              poder devastador.
            </MobileText>

            <div id="caracteristicas">
              <HeaderH1>Características de Figura</HeaderH1>
              <MobileText>
                As características são habilidades especiais que algumas figuras
                possuem, conferindo vantagens únicas em combate ou situações
                específicas. Essas características podem variar desde
                habilidades naturais até poderes sobrenaturais, e são
                fundamentais para entender as capacidades de cada tipo de figura
                em Mordheim.
              </MobileText>

              <div className="space-y-4 mt-6">
                {gameTermsData
                  .filter(
                    (term) =>
                      term.term.includes("Grande") ||
                      term.term.includes("Furtividade") ||
                      term.term.includes("Forte") ||
                      term.term.includes("Aterrorizante") ||
                      term.term.includes("Morto-Vivo") ||
                      term.term.includes("Animal") ||
                      term.term.includes("Anfíbio") ||
                      term.term.includes("Voador") ||
                      term.term.includes("Levitar") ||
                      term.term.includes("Procurado") ||
                      term.term.includes("Visão Verdadeira") ||
                      term.term.includes("Peçonhento") ||
                      term.term.includes("Peçonhenta") ||
                      term.term.includes("Regeneração") ||
                      term.term.includes("Agarrar") ||
                      term.term.includes("Dreno de Energia") ||
                      term.term.includes("Toque Vampírico") ||
                      term.term.includes("Caçador de Matilha") ||
                      term.term.includes("Resistência Elemental") ||
                      term.term.includes("Toque Ardente") ||
                      term.term.includes("Chifres") ||
                      term.term.includes("Construto") ||
                      term.term.includes("Daemônio") ||
                      term.term.includes("Vulnerabilidade Elemental") ||
                      term.term.includes("Voraz")
                  )
                  .map((term, index) => (
                    <div
                      key={index}
                      id={`characteristic-${index}`}
                      className="bg-green-900/20 border border-green-500/40 rounded-lg p-4"
                    >
                      <HeaderH2 className="text-green-300 mb-2">
                        {term.term}
                      </HeaderH2>
                      <div className="text-white text-sm">
                        {term.description}
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div id="especializacoes">
              <HeaderH1>Especializações</HeaderH1>
            </div>
            <MobileText>
              Muitas figuras possuem especializações que modificam como seus
              atributos funcionam. Um arqueiro especialista pode ter bônus em
              Precisão quando usando arcos, enquanto um berserker pode ter bônus
              em Ímpeto quando enfurecido. Essas especializações adicionam
              profundidade tática e personalidade única a cada figura.
            </MobileText>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default FiguresAndAttributesPage;
