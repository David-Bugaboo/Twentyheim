import React from "react";
import CollapsibleSection from "../../../components/CollapsibleSection";
import MobileText from "../../../components/MobileText";
import { useSectionRef } from "../../../context/table-of-contents.context";

const RulesIntroSection: React.FC = () => {
  const ref = useSectionRef("/rules", "introducao");

  return (
    <CollapsibleSection id="introducao" title="Introdução" ref={ref}>
      <div className="bg-[#2a1f1f] p-4 rounded-lg border border-[#382929]">
        <MobileText variant="quote" className="text-center">
          "Welcome to Mordheim, City of the Damned!"
        </MobileText>
        <MobileText variant="small" className="text-center mt-2 text-[#b89d9d]">
          — Registro apócrifo encontrado nas ruínas do Distrito do Mercado
        </MobileText>
      </div>

      <MobileText>
        Mordheim é a cidade onde a esperança se perde nas sombras e a ambição é
        paga em sangue. Aqui, entre torres quebradas e becos onde a luz teme
        entrar, bandos rivais se enfrentam por pedaços da Pedra‑bruxa — a
        amaldiçoada wyrdstone — prometendo riqueza, poder e uma morte rápida a
        quem ousar tocá‑la. Este jogo retrata esse curto e brutal período no
        qual incontáveis escaramuças incendiaram as ruas, e cada encruzilhada se
        tornou um campo de batalha.
      </MobileText>

      <MobileText>
        Esta é uma experiência de caça, coragem e desespero. Você conduzirá um
        bando através da Cidade dos Condenados, buscando glória… e descobrindo,
        muitas vezes, apenas o gosto metálico do arrependimento.
      </MobileText>

      <MobileText variant="heading" className="mt-2">
        O que preciso para jogar
      </MobileText>
      <MobileText>
        • Pelo menos um <strong>dado de 20 lados</strong> (1d20), fácil de
        encontrar em lojas de RPG, eventos e na internet.
      </MobileText>
      <MobileText>
        • Uma <strong>trena</strong> para medir distâncias — as ruas de Mordheim
        exigem precisão.
      </MobileText>
      <MobileText>
        • <strong>Miniaturas</strong> que representem seu bando: impressão 3D,
        plástico, metal, bases de papel — tudo vale, contanto que sejam
        tridimensionais para permitir linha de visão verdadeira.
      </MobileText>
      <MobileText>
        • <strong>Terrenos</strong> que componham uma cidade em ruínas:
        passarelas quebradas, janelas escuras, vielas mortais. MDF, papercraft,
        kits plásticos — o que importa é a mesa contar a história da Cidade dos
        Condenados.import DivineLoresPage from './../../spells/DivineLoresPage';
      </MobileText>

      <MobileText variant="heading" className="mt-2">
        Medindo Linha de Visão
      </MobileText>
      <MobileText>
        Para definir se uma figura tem linha de visão para outra, tente traçar
        uma linha imaginária de qualquer ponto da figura que está tentando
        enxergar para qualquer parte da figura que ele tenta enxergar. Se a
        linha não encontrar nenhuma parte da figura que está tentando enxergar,
        então a figura não tem linha de visão para a outra figura. Se encontrar,
        ela tem. Se você enxergar apenas uma pequena parte da figura, como a
        ponta de usa asa ou chifre, desconsidere essa parte. Use bom senso e
        cavalheirismo para definir um limite saudável para essa regra.
      </MobileText>

      <MobileText variant="heading" className="mt-2">
        Medindo Linha de Visão
      </MobileText>
      <MobileText>
        Muitos efeitos no jogo e ataques a distância exigem{" "}
        <strong>linha de visão</strong> para ser aplicados. Para definir se uma
        figura tem linha de visão para outra, tente traçar uma linha imaginária
        de qualquer ponto da figura que está tentando enxergar para qualquer
        parte da figura que ele tenta enxergar. Se a linha não encontrar nenhuma
        parte daquela, então a figura não tem linha de visão para a outra
        figura. Se encontrar, ela tem. Se você enxergar apenas uma pequena parte
        da figura, como a ponta de usa asa ou chifre, desconsidere essa parte.
        Use bom senso e cavalheirismo para definir um limite saudável para essa
        regra.
      </MobileText>

      <MobileText variant="heading" className="mt-2">
        Rolagens
      </MobileText>
      <MobileText>
        Sempre que as regras pedirem uma rolagem, role <strong>1d20</strong>. Em
        testes de atributo, role <strong>1d20</strong> e some o atributo
        indicado. As rolagens normalmente são feitas contra uma{" "}
        <strong>Classe de Dificuldade</strong> (CD): se o resultado for maior ou
        igual à CD, você tem sucesso; caso contrário, falha — e Mordheim cobra
        por cada erro.
      </MobileText>

      <MobileText variant="heading" className="mt-2">
        Rolagem Contestada
      </MobileText>
      <MobileText>
        Algumas situações colocam guerreiros diretamente uns contra os outros.
        Em <strong>rolagens contestadas</strong>, ambos os lados rolam 1d20 +
        atributo relevante. O resultado maior vence. Em caso de empate, cada
        ação específica o resultado.
      </MobileText>

      <MobileText variant="heading" className="mt-2">
        Atributos
      </MobileText>
      <MobileText>
        Os atributos descrevem a capacidade dos personagens — heróis orgulhosos
        ou mercenários famintos — de sobreviver à cidade.
      </MobileText>
      <MobileText>
        • <strong>Ímpeto</strong>: força física, iniciativa, graça, velocidade
        de combate e reflexos.
      </MobileText>
      <MobileText>
        • <strong>Precisão</strong>: domínio de tiros letais à distância, mesmo
        sob pressão.
      </MobileText>
      <MobileText>
        • <strong>Armadura</strong>: o quão resistente a ferimentos a criatura
        é.
      </MobileText>
      <MobileText>
        • <strong>Vontade</strong>: fortaleza da mente — inteligência,
        determinação e intuição.
      </MobileText>
      <MobileText>
        • <strong>Vigor</strong>: resistência e fôlego, a diferença entre cair e
        permanecer em combate.
      </MobileText>

      <MobileText variant="heading" className="mt-2">
        Preparando a Partida
      </MobileText>
      <MobileText variant="subheading" className="mt-2">
        1) O Tabuleiro
      </MobileText>
      <MobileText>
        Uma partida de Mordheim v20 é jogada em um tabuleiro quadrado de
        90x90cm. Essas dimensões permitem jogar com tranquilidade na maioria dos
        tamanhos de mesa presentes nas casas brasileiras. Caso os jogadores
        desejem um jogo mais lento, podem optar por usar um tabuleiro de
        120cmx120cm. Isso gerará partidas mais longas ou diminuirá a letalidade
        inerente de jogos com mais de dois jogadores, mas pode ser exatamente o
        que seu bando busca. Jogar em tabuleiros menores que 90x90cm é possível,
        mas oferecerá uma vantagem considerável a bandos focados em combate
        corpo-a-corpo. Embora não seja estritamente necessário, um{" "}
        <strong>playmat</strong> é uma excelente recomendação, visto que as
        imagens impressas nela podem melhorar a imersão do jogo e a superficie
        do playmat ajuda a nivelar imperfeições da mesa usada para o jogo e
        evitar danos nas bases. Após delimitar um espaço adequado para jogar,
        com ou sem playmat, o próximo passo é posicionar cenários.
      </MobileText>

      <MobileText variant="subheading" className="mt-2">
        2) Cenários
      </MobileText>
      <MobileText>
        Os jogadores devem posicionar cenários de forma colaborativa,
        priorizando criar um cenário bonito, narrativo e verticalizado. Mordheim
        é repleta de becos tortutosos, ruínas, escombros e outros horrores,
        então tente passar essa idéia com o posicionamento dos cenários. É
        interessante ter várias construções com plataformas, andares e níveis,
        permitindo que a partida extraia o máximo das mecânicas de movimentação
        do jogo. Além disso, é importante que ao traçar uma linha imaginária de
        qualquer ponto de uma borda da mesa a borda oposta, esta linha seja
        completamente obstruída, garantindo cobertura e esconderijo para os
        bandos que explorarão as ruínas nesta escaramuça.
      </MobileText>

      <div className="mt-4 mb-4">
        <img
          src="/src/assets/terrain-layout-example.png"
          alt="Exemplo de disposição de terreno em Mordheim - mesa com edifícios de papercraft, ruínas, igreja central e miniaturas posicionadas"
          className="w-full rounded-lg border border-[#382929] shadow-lg"
        />
        <MobileText variant="small" className="text-center mt-2 text-[#b89d9d]">
          Exemplo de disposição de terreno: mesa com edifícios de papercraft,
          ruínas, igreja central e miniaturas posicionadas para uma escaramuça
          em Mordheim
        </MobileText>

        <MobileText variant="subheading" className="mt-2">
          3) Posicionar Fragmentos de Pedra-Bruxa
        </MobileText>
        <br></br>
        <MobileText>
          Agora você tem uma bela seção arruinada de Mordheim para derramar o
          sangue dos tolos que ousarem te enfrentar. Agora, você precisa de
          algum motivo para derramar suas vísceras no pavimento, certo? Esse
          motivo são os fragmentos de pedra-bruxa. Valiosos, Venenosos e
          viciantes, esses fragmentos são o sangue das veias da economia de
          Mordheim, e os bandos batalhando aqui hoje buscam dominância sobre
          esse recurso. Os fragmentos podem ser representados por qualquer coisa
          com aproximadamente 25mm de diametro. Uma ficha de papel, pedras
          pintadas de verde em cima de uma base de 25mm ou até mesmo pequenas
          peças de impressão 3D que representem esses pedaços do cometa maldito
          que destruiu Mordheim. Esses marcadores sempre são referidos daqui
          para frente como Fragmentos de Pedra-Bruxa. O primeiro fragmento deve
          ser posicionado no centro da mesa, ou no mais próximo possivel do
          centro. Então, cada jogador posiciona um fragmento dentro de 20cm do
          tesouro central, mas a mais de 15cm de qualquer outro fragmento.
          Então, cada jogador posiciona ums segundo fragmento a mais de 15cm de
          outros framentos e a mais de 23cm de qualquer borda do tabuleiro. Eles
          não precisam ser necessariamente posicionados na altura do chão, e
          podem ser postos em telhados ou plataformas.
        </MobileText>

        <div className="mt-4 mb-4">
          <img
            src="/src/assets/wyrdstone-fragment-example.png"
            alt="Exemplo de fragmento de Pedra-bruxa - pedra escura com formações cristalinas verdes luminosas emanando energia mágica"
            className="w-full max-w-md mx-auto rounded-lg border border-[#382929] shadow-lg"
          />
          <MobileText
            variant="small"
            className="text-center mt-2 text-[#b89d9d]"
          >
            Exemplo de fragmento de Pedra-bruxa: pedra escura com formações
            cristalinas verdes luminosas, representando a energia mágica e
            venenosa da wyrdstone
          </MobileText>

          <MobileText variant="subheading" className="mt-2">
            4) Posicionar Figuras
          </MobileText>
          <br></br>
          <MobileText>
            Com todos esses passos concluídos, falta apenas posicionar as
            figuras de cada bando no mapa. Cada jogador rola um d20, e o jogador
            com a maior rolagem escolhe qual borda da mesa será a sua. A segunda
            maior rolagem escolhe outra borda (em uma partida de 2 jogadores,
            deve necessiariamente pegar a borda oposta), e assim sucessivamente.
            Os jogador que teve a maior rolagem posiciona todas as suas figuras, seguido 
            pelo jogador com a segunda maior rolagem, e assim sucessivamente. As figuras 
            devem ser todas posicionadas a até 15cm da sua borda da mesa.
          </MobileText>

          <MobileText variant="subheading" className="mt-2">
            5) Jogar!
          </MobileText>
          <br></br>
          <MobileText>
            Com tudo resolvido, só falta uma coisa: jogar, deixando os dados e suas jogadas contarem uma história épica na cidade dos codnenados! Boa Sorte, e siga as regras dispostas na seção abaixo
            para jogar sua partida!
          </MobileText>
        </div>
      </div>
    </CollapsibleSection>
  );
};
export default RulesIntroSection;
