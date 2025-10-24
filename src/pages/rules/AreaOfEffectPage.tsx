import PageTitle from "../../components/PageTitle";
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";
import HeaderH1 from "../../components/HeaderH1";
import HeaderH2 from "../../components/HeaderH2";
import QuickNavigation from "../../components/QuickNavigation";
import AreaEffectCards from "../../components/AreaEffectCards";

function AreaOfEffectPage() {
  const navigationSections = [
    { id: "intro", title: "Áreas de Efeito", level: 0 },
    { id: "o-que-sao", title: "O que são Áreas de Efeito?", level: 0 },
    { id: "tipos", title: "Tipos de Áreas de Efeito", level: 0 },
    {
      id: "regras-gerais",
      title: "Regras Gerais para Áreas de Efeito",
      level: 0,
    },
    { id: "posicionamento", title: "Posicionamento", level: 1 },
    { id: "figuras-afetadas", title: "Figuras Afetadas", level: 1 },
    { id: "duracao", title: "Duração", level: 1 },
    { id: "consideracoes-taticas", title: "Considerações Táticas", level: 0 },
    {
      id: "posicionamento-estrategico",
      title: "Posicionamento Estratégico",
      level: 1,
    },
    { id: "controle-campo", title: "Controle de Campo", level: 1 },
    { id: "combinacoes-efeitos", title: "Combinações de Efeitos", level: 1 },
    { id: "downloads", title: "Downloads e Templates", level: 0 },
  ];

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <QuickNavigation sections={navigationSections} />
          <MobileSection>
            <div id="intro">
              <PageTitle>Áreas de Efeito</PageTitle>
            </div>

            <div id="o-que-sao">
              <HeaderH1>O que são Áreas de Efeito?</HeaderH1>
            </div>
            <MobileText>
              Áreas de Efeito são determinações fixas do tamanho da área afetada
              por efeitos que as utilizem. Elas representam zonas de influência
              que se espalham pelo campo de batalha, afetando múltiplas figuras
              simultaneamente.
            </MobileText>

            <MobileText>
              Cada tipo de Área de Efeito possui características únicas: algumas
              são instantâneas e desaparecem após afetar suas vítimas, enquanto
              outras permanecem no campo de batalha como manifestações
              duradouras do efeito. O tamanho, formato e duração de uma Área de
              Efeito são determinados pelo efeito específico e pelas regras do
              jogo.
            </MobileText>

            <div id="tipos">
              <HeaderH1>Tipos de Áreas de Efeito</HeaderH1>
            </div>
            <MobileText>
              Existem seis tipos principais de Áreas de Efeito em 20Heim, cada
              uma com suas próprias regras e aplicações táticas. Dominar o uso
              de cada tipo é essencial para qualquer conjurador que deseje
              maximizar a eficácia de suas magias.
            </MobileText>

            <AreaEffectCards />

            <div id="regras-gerais">
              <HeaderH1>Regras Gerais para Áreas de Efeito</HeaderH1>
            </div>

            <div id="posicionamento">
              <HeaderH2>Posicionamento</HeaderH2>
            </div>
            <MobileText>
              Áreas de Efeito devem ser posicionadas dentro do alcance do
              efeito, conforme especificado na descrição da habilidade ou poder.
              O usuário escolhe o ponto exato onde a área será manifestada, mas
              deve respeitar as limitações de alcance e linha de visão quando
              aplicáveis.
            </MobileText>

            <div id="figuras-afetadas">
              <HeaderH2>Figuras Afetadas</HeaderH2>
            </div>
            <MobileText>
              Todas as figuras cuja base esteja completamente ou parcialmente
              sob a Área de Efeito são afetadas pelo efeito. Isso inclui aliados
              e inimigos, a menos que o efeito especifique o contrário.
            </MobileText>

            <div id="duracao">
              <HeaderH2>Duração</HeaderH2>
            </div>
            <MobileText>
              Áreas de Efeito instantâneas (como Explosões e Cones) desaparecem
              imediatamente após afetar as figuras. Áreas permanentes (como
              Zonas, Muros e Pilares) permanecem no campo de batalha até serem
              canceladas por algo específico ou até o final do jogo.
            </MobileText>

            <div id="consideracoes-taticas">
              <HeaderH1>Considerações Táticas</HeaderH1>
            </div>

            <div id="posicionamento-estrategico">
              <HeaderH2>Posicionamento Estratégico</HeaderH2>
            </div>
            <MobileText>
              O posicionamento correto de Áreas de Efeito pode ser a diferença
              entre vitória e derrota. Explosões devem ser posicionadas para
              maximizar o número de inimigos afetados, enquanto Zonas protetivas
              devem cobrir posições estratégicas importantes.
            </MobileText>

            <div id="controle-campo">
              <HeaderH2>Controle de Campo</HeaderH2>
            </div>
            <MobileText>
              Áreas de Efeito permanentes são ferramentas poderosas para
              controlar o movimento inimigo. Muros podem bloquear rotas de
              avanço, enquanto Zonas de perigo podem forçar o inimigo a tomar
              rotas alternativas ou arriscar os efeitos da área.
            </MobileText>

            <div id="combinacoes-efeitos">
              <HeaderH2>Combinações de Efeitos</HeaderH2>
            </div>
            <MobileText>
              Usuários experientes aprendem a combinar diferentes tipos de Áreas
              de Efeito para criar sinergias devastadoras. Uma Zona de gelo que
              reduz o movimento seguida por uma Explosão de fogo pode ser
              devastadora contra grupos de inimigos.
            </MobileText>

            <div id="downloads">
              <HeaderH1>Downloads e Templates</HeaderH1>
            </div>
            <MobileText>
              Na seção de Downloads você encontrará um arquivo PDF com todos os
              tipos de template para serem impressos e usados no jogo.
              Recomendamos imprimi-los em papel comum e plastificá-los. Isso
              garante que as áreas sejam claramente visíveis e fáceis de
              posicionar no campo de batalha.
            </MobileText>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default AreaOfEffectPage;
