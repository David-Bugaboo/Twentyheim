import PageTitle from "../../../components/PageTitle";
import MobileText from "../../../components/MobileText";
import MobileSection from "../../../components/MobileSection";
import HeaderH1 from "../../../components/HeaderH1";
import HeaderH2 from "../../../components/HeaderH2";
import QuickNavigation from "../../../components/QuickNavigation";
function RulesIntroPage() {
  const navigationSections = [
    { id: "intro", title: "Introdução", level: 0 },
    { id: "what-is", title: "O que é 20Heim?", level: 0 },
    { id: "requirements", title: "O que é necessário para jogar?", level: 0 },
    { id: "dice", title: "Dados", level: 1 },
    { id: "ruler", title: "Trena", level: 1 },
    { id: "miniatures", title: "Miniaturas", level: 1 },
    { id: "terrain", title: "Terrenos", level: 1 },
    { id: "explore", title: "Explore as Regras", level: 0 },
  ];

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <QuickNavigation sections={navigationSections} />
          <MobileSection>
            <div id="intro">
              <PageTitle>Introdução</PageTitle>
            </div>

            <MobileText
              variant="quote"
              className="text-center italic text-lg leading-relaxed mb-6 p-4 bg-green-900/20 border border-green-500/40 rounded-lg"
            >
              "Já se passaram quase vinte séculos desde que Sigmar Heldenhammer
              expulsou de nossas terras as hordas monstruosas que ali habitavam.
              Assim foi fundado o maior de todos os reinos dos homens — o
              Império. Hoje nossos pensamentos se voltam mais uma vez para
              Sigmar, o Deus das Batalhas: Sigmar, o Pai dos Homens, conforme o
              milênio se aproxima e o tempo de sua segunda vinda se aproxima.
              Nos templos por toda nossa terra as multidões se reúnem para
              testemunhar os muitos e maravilhosos eventos que certamente se
              desdobrarão com o retorno do deus vivo ao seu povo."
              <br />
              <span className="text-sm text-green-300 mt-2 block">
                — O Cronista de Ostermark - entrada para o ano de 1999
              </span>
            </MobileText>

            <MobileText>
              20Heim é um jogo criado para representar as violentas escaramuças
              entre bandos brigando pelas preciosas Pedra-Bruxa. É um jogo que
              surgiu a partir do amor do seu criador pela história do Velho
              Mundo e o tom narrativo inalcançável de Mordheim. O jogo visa
              trazer jogadores mais jovens para as ruas da cidade dos
              condenados, com regras mais limpas, balanceadas, acessíveis e
              usando um motor d20, que com a ascensão do RPG de mesa se tornou
              um sinônimo de jogabilidade ágil e descomplicada. O jogo também é
              uma carta de amor a Frostgrave, uma das bases de seu game design,
              um jogo incrível, leve e descomplicado. Buscando trazer a base
              dada pelo incrível McCullough para o velho mundo, 20Heim surgiu.
              Espero que todos possam se divertir jogando.
            </MobileText>

            <div id="what-is">
              <HeaderH1>O que é 20Heim?</HeaderH1>
            </div>
            <MobileText>
              20Heim é um jogo de guerra, onde jogadores controlam bandos de
              mercenários, bandidos, assassinos ou pior, lutando pela dominância
              sobre o recurso mais importante neste local destruído: a
              Pedra-Bruxa. Escaramuças sangrentas, batalhas em que bandos rivais
              serão obrigados a se aliar para enfrentar ameaças terríveis e até
              mesmo momentos de êxtase ao enviar seus heróis para explorar as
              ruínas da cidade dos condenados o aguardam ao embarcar em uma
              campanha de 20Heim.
            </MobileText>

            <div id="requirements">
              <HeaderH1>O que é necessário para jogar?</HeaderH1>
            </div>

            <div id="dice">
              <HeaderH2>Dados</HeaderH2>
            </div>
            <MobileText>
              Em 20Heim, o sucesso ou fracasso das ações são determinados por
              rolagens de dados. Cada jogador idealmente deve ter pelo menos um{" "}
              <strong>dado de 20 lados</strong> para fazer suas próprias
              rolagens. Ter mais de um desses dados é recomendado para marcar a
              vida de soldados, para o qual até mesmo um contador de vida de
              Magic: The Gathering pode ser usado. Nas páginas de regras nos
              referimos a este dado como <strong>d20</strong>.
            </MobileText>

            <div id="ruler">
              <HeaderH2>Trena</HeaderH2>
            </div>
            <MobileText>
              Uma <strong>trena, régua ou fita métrica</strong> é essencial para
              medir distâncias em 20Heim. O jogo usa medições precisas para
              determinar alcances de ataques, movimentação e outras ações
              táticas. Recomenda-se alguma forma de medida flexível que permita
              fazer as medições necessárias nas ruas sinuosas de Mordheim. As
              distâncias são medidas em centímetros, tornando a precisão
              fundamental para o sucesso tático.
            </MobileText>

            <div id="miniatures">
              <HeaderH2>Miniaturas</HeaderH2>
            </div>
            <MobileText>
              <strong>Miniaturas</strong> são o coração visual de 20Heim. Cada
              modelo representa um membro do seu bando, desde veteranos
              experientes até feiticeiros corrompidos pelo caos. As miniaturas
              devem ser tridimensionais para permitir o cálculo correto de linha
              de visão e cobertura. Materiais aceitos incluem: impressão 3D,
              plástico, metal, resina ou até mesmo bases de papel com figuras em
              pé — o importante é que cada modelo seja claramente identificável
              e permita medir distâncias precisas entre bases. Recomenda-se que
              cada bando tenha miniaturas distintas para facilitar a
              identificação durante o jogo. Patreons como One Page Rules,
              Bestiarium Minis, Mr. Modulork, Printable Heroes, entre outros,
              são excelentes fontes de miniaturas. As miniaturas da Citadel
              também são uma excelente opção, apesar do seu preço elevado.
            </MobileText>

            <div id="terrain">
              <HeaderH2>Terrenos</HeaderH2>
            </div>
            <MobileText>
              <strong>Terrenos</strong> são fundamentais para criar a atmosfera
              sombria de Mordheim. A mesa deve representar uma cidade em ruínas
              com suas características únicas: passarelas quebradas, janelas
              escuras, vielas mortais e estruturas em colapso. Materiais
              recomendados incluem MDF cortado a laser, papercraft, kits
              plásticos, impressão 3D ou até mesmo terrenos artesanais feitos de
              isopor e outros materiais reciclados. O importante é que a mesa
              conte a história da Cidade dos Condenados, proporcionando
              cobertura tática, pontos de vista elevados e cenários que inspirem
              narrativas épicas. Empresas como Mantic Games, TTCombat, Irmãos
              Grimm Terrain e Deadly Print Studio oferecem excelentes opções de
              terrenos temáticos para Mordheim.
            </MobileText>

            <div id="terrain">
              <HeaderH2>Jogando</HeaderH2>
            </div>
            <MobileText>
              Para jogar 20Heim, os jogadores precisam primeiro{" "}
              <a href="/rules/warband-creation">Montar seus Bandos</a>. Com seus
              bandos montados, eles então escolhem um{" "}
              <a href="/scenarios">Cenário</a> para jogar. Caso os jogadores não
              consigam chegar a um consenso, role um d20, e a maior rolagem
              escolhe o cenário. Com isso teoricamente os jogadores teriam tudo
              que era necessário para jogar. Estude as regras de como prosseguir
              com sua partida seguindo os links na barra de navegação.
            </MobileText>

            <div id="explore">
              <HeaderH1>Explore as Regras</HeaderH1>
            </div>
            <MobileText className="mb-4">
              Agora que você sabe o que é necessário para jogar, explore as
              diferentes seções das regras para entender completamente o jogo.
            </MobileText>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default RulesIntroPage;
