import PageTitle from "../../components/PageTitle";
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";
import HeaderH1 from "../../components/HeaderH1";
import HeaderH2 from "../../components/HeaderH2";
import HeaderH3 from "../../components/HeaderH3";

function FiguresAndAttributesPage() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <MobileSection>
            <PageTitle>Figuras e seus características</PageTitle>

            <MobileText>
              As miniaturas que representam os soldados do seu bando de
              desgarradados são sempre mencionadas pelas regras como "Modelos".
              A definição do quão competentes elas são em diferentes tarefas são
              definididas pelas suas <strong>características</strong>. As
              habilidades serão nomeadas por extenso nessa página, mas em todas
              as outras páginas do jogo serão abreviadas para suas singlas em
              inglês, por uma questão de familiaridade com o sistema original.
            </MobileText>

            <HeaderH1>As Seis Características</HeaderH1>

            <HeaderH2>Movimento [Movement] (M)</HeaderH2>
            <MobileText>
              <strong>Movimento</strong> determina a distância que uma figura
              pode se mover em um turno. Quanto maior o Movimento, mais terreno
              a figura pode cobrir, permitindo posicionamento tático superior,
              retiradas rápidas ou avanços agressivos. Figuras com alto M são
              essenciais para manobras de flanco e capturar recursos.
            </MobileText>

            <HeaderH2>Habilidade de Combate [Weapon Skill] (Ímpeto)</HeaderH2>
            <MobileText>
              <strong>Habilidade de Combate</strong> representa a habilidade de
              combate corpo a corpo da figura. Este atributo é usado para
              ataques em combate, carga e outras ações que envolvem confronto
              direto, além de ações que exigem força ou acuidade fisica. Figuras
              com alto Ímpeto são devastadoras em combate próximo e capazes de
              quebrar formações inimigas com cargas brutais.
            </MobileText>

            <HeaderH2>
              Habilidade Balística [Ballistic Skill] (Precisão)
            </HeaderH2>
            <MobileText>
              <strong>Habilidade Balística</strong> define a habilidade de
              combate à distância da figura. Usado para ataques com armas com
              arcos, bestas e pistolas, este atributo é crucial para figuras que
              preferem manter distância do inimigo. Arqueiros, besteiros e
              atiradores especializados dependem deste atributo para eliminar
              alvos de longe. Figuras com alto Precisão são capazes de
              transformar uma simples flecha em um instrumento de selar
              destinos.
            </MobileText>

            <HeaderH2>Resistência [Toughness] (T)</HeaderH2>
            <MobileText>
              <strong>Resistência</strong> representa a proteção física da
              figura contra ataques. Este atributo reduz o dano recebido e pode
              significar a diferença entre a vida e a morte no campo de batalha.
              Figuras bem blindadas podem resistir a ataques que devastariam
              soldados menos protegidos. Figuras com T alto ignoram ataques de
              armas fracas e diminuem consideravelmente o impacto até de armas
              pesadas.
            </MobileText>

            <HeaderH2>Liderança [Leadership] (Ld)</HeaderH2>
            <MobileText>
              <strong>Liderança</strong> determina a habilidade da figura de
              projetar sua vontade sobre os outros ou usá-la para se proteger de
              efeitos que afetem sua mente. Este atributo é especialmente
              importante quando enfrentando magos, daemônios ou outras criaturas
              que atacam a mente. Uma Vontade forte pode proteger contra
              feitiços devastadores. Uma criatura com Ld alto tem uma força
              mental considerável, podendo até mesmo resistir a possessão
              demoníaca.
            </MobileText>

            <HeaderH2>Ferimentos [Wounds] (W)</HeaderH2>
            <MobileText>
              <strong>Ferimentos</strong> Representa quantos ferimentos uma
              figura pode sofrer antes de cair em combate. Figuras com W alto
              são capazes de suportar punição incalculável antes de cair,
              esgotando recursos dos bandos inimigos enquanto aliados mais
              frágeis realizam ações táticas pelo mapa. Uma figura que chegue a
              zero wounds é retirada da mesa, e a não ser que por alguma magia
              ou efeito, não pode mais participar daquela partida.
            </MobileText>

            <HeaderH1>Valores Típicos</HeaderH1>
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

            <HeaderH2>Criaturas Sobrenaturais</HeaderH2>
            <MobileText>
              Daemônios, monstros e outras criaturas podem ter atributos que
              excedem os valores normais, refletindo sua natureza sobrenatural e
              poder devastador.
            </MobileText>

            <HeaderH1>Especializações</HeaderH1>
            <MobileText>
              Muitas figuras possuem especializações que modificam como seus
              atributos funcionam. Um arqueiro especialista pode ter bônus em
              Precisão quando usando arcos, enquanto um berserker pode ter bônus
              em Ímpeto quando enfurecido. Essas especializações adicionam
              profundidade tática e personalidade única a cada figura.
            </MobileText>

            <MobileText
              variant="quote"
              className="text-center text-lg leading-relaxed mt-8"
            >
              "Conhecer seus atributos é conhecer suas forças. Conhecer os
              atributos do inimigo é conhecer suas fraquezas. A vitória pertence
              àquele que melhor compreende ambos."
            </MobileText>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default FiguresAndAttributesPage;
