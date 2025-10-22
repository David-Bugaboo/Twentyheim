import PageTitle from "../../../components/PageTitle";
import MobileText from "../../../components/MobileText";
import MobileSection from "../../../components/MobileSection";
import HeaderH1 from "../../../components/HeaderH1";
import HeaderH2 from "../../../components/HeaderH2";

function RulesIntroPage() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <MobileSection>
            <PageTitle>Introdução</PageTitle>

            <MobileText>
              20Heim é um jogo criado para representar as violentas escaramuças
              entre bandos brigando pelas preciosas Pedra-Bruxa. É um jogo que
              surgiu a partir do amor do seu criador pela história do Velho
              Mundo e o tom narrativo Inalcançável de Mordheim. O jogo visa
              trazer jogadores mais jovens para as ruas da cidade dos
              condenados, com regras mais limpas, balanceadas, acessíveis e
              usando um motor d20, que com a ascensão do RPG de mesa se tornou
              um sinônimo de jogabilidade ágil e descomplicado. O jogo também é
              uma carta de amor a Frostgrave, uma das bases de seu gamedesign,
              um jogo incrível, leve e descomplicado. Buscando trazer a base
              dada pelo Incrível McCullough para o velho mundo, 20Heim surgiu.
              Espero que todos possam se divertir jogando.
            </MobileText>

            <HeaderH1>O que é 20Heim?</HeaderH1>
            <MobileText>
              20Heim é um jogo de guerra, onde jogadores controlam bandos de
              mercenários, bandidos, assassinos ou pior lutando pela dominância
              sobre o recurso mais importante neste local destruído: a
              Pedra-Bruxa. Escaramuças sangrentas, batalhas em que bandos rivais
              serão obrigados a se aliar para enfrentar ameaças terríveis e até
              mesmo momentos de extase ao enviar seus hérois para explorar as
              ruínas da cidade dos condenados o aguardam ao embarcar em uma
              campanha de 20Heim.
            </MobileText>

            <HeaderH1>O que é necessário para jogar?</HeaderH1>

            <HeaderH2>Dados</HeaderH2>
            <MobileText>
              Em 20Heim, os sucesso ou fracasso das ações são determinados por
              rolagens de dados. cada jogador idealmente deve ter pelo menos um{" "}
              <strong>dado de 20 lados</strong>, para fazer suas próprias
              rolagens. Ter mais de um desses dados é recomendado, para marcar
              vida de soldados, para o qual até mesmo um contador de vida de
              Magic: The Gathering pode ser usado. Nas páginas de regras nos
              referimos a este dado como <strong>d20</strong>.
            </MobileText>

            <HeaderH2>Trena</HeaderH2>
            <MobileText>
              Uma <strong>trena, régua ou fita métrica</strong> é essencial para
              medir distâncias em 20Heim. O jogo usa medições precisas para
              determinar alcances de ataques, movimentação e outras ações
              táticas. Recomenda-se alguma forma de medida flexível que permita
              fazer as medições necessárias nas ruas sinuosas de Mordheim. As
              distâncias são medidas em centímetros, tornando a precisão
              fundamental para o sucesso tático.
            </MobileText>

            <HeaderH2>Miniaturas</HeaderH2>
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
              Bestiarium Minis, Mr. Modulork, Printable Heroes entre outros são
              excelentes fontes de miniaturas. As miniaturas da Citadel também
              são uma excelente opção, apesar do seu preço elevado.
            </MobileText>

            <HeaderH2>Terrenos</HeaderH2>
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
              narrativas épicas. Empresas como Mantic Games, TTCombat, irmãos
              Grimm Terrain e Deadly Print Studio oferecem excelentes opções de
              terrenos temáticos para Mordheim.
            </MobileText>

            <MobileText
              variant="quote"
              className="text-center text-lg leading-relaxed mt-8"
            >
              "Nas ruínas de Mordheim, a morte é barata, mas a glória é eterna.
              Que sorte guie seus passos, pois a Cidade dos Condenados não
              perdoa os incautos."
            </MobileText>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default RulesIntroPage;
