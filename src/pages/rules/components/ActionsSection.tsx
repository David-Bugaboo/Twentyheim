import CollapsibleSection from "../../../components/CollapsibleSection";
import MobileText from "../../../components/MobileText";

function ActionsSection() {
  return (
    <CollapsibleSection
      id="acoes"
      title="Ações — O Que Separa Vivos dos Mortos"
    >
      <MobileText className="mb-4">
        Em Mordheim, cada momento conta. Cada decisão pode ser sua última.
        Quando uma figura é ativada, ela tem um breve lampejo de tempo para agir
        — para mover, atacar, conjurar, ou simplesmente sobreviver mais um
        instante. Este é o momento em que heróis são feitos... ou enterrados.
      </MobileText>

      <div className="bg-[#2a1f1f] p-4 rounded-lg border border-[#382929] mb-6">
        <MobileText variant="heading" className="mb-3">
          A Regra das Duas Ações
        </MobileText>

        <MobileText className="mb-3">
          Cada figura, exceto em situações especiais ditadas pelo destino ou
          pela magia, pode tomar <strong>duas ações</strong> durante sua
          ativação. Duas escolhas. Duas chances de fazer a diferença entre
          vitória e morte.
        </MobileText>

        <MobileText className="mb-3">
          <strong>A Primeira Ação:</strong> Normalmente, uma dessas ações{" "}
          <strong>deve ser uma Ação de Movimento</strong>. Afinal, ficar parado
          em Mordheim é apenas outra forma de suicídio. Movimento é vida.
          Imobilidade é morte.
        </MobileText>

        <MobileText className="mb-3">
          <strong>A Segunda Ação:</strong> Pode ser qualquer tipo de ação —
          atacar, atirar, conjurar, pegar tesouros amaldiçoados, ou até se mover
          novamente se o desespero assim exigir.
        </MobileText>

        <MobileText>
          <strong>Exceção — Ações Especiais como Movimento:</strong> Alguns
          efeitos especificam que podem ser usados como "ação de movimento".
          Nestes casos raros, o jogador pode tomar essa ação especial no lugar
          do movimento obrigatório, seguida de qualquer outra ação normal. Uma
          brecha nas regras, uma oportunidade para os espertos.
        </MobileText>
      </div>

      <MobileText variant="heading" className="mt-6 mb-3">
        Tipos de Ação
      </MobileText>

      <MobileText variant="quote" className="mb-4">
        "Cada ação é uma aposta com a morte. Escolha sabiamente."
      </MobileText>

      <MobileText variant="heading" className="mt-6 mb-3">
        Ação de Movimento
      </MobileText>

      <MobileText className="mb-4">
        A figura pode se mover das seguintes formas durante seu turno:
      </MobileText>

      <MobileText variant="heading" className="mt-4 mb-2">
        Movimento
      </MobileText>
      <MobileText className="mb-4">
        A miniatura pode se mover uma distância de até seu{" "}
        <strong>atributo de Movimento em centímetros</strong>. Durante este
        movimento, ela pode se virar quanto quiser, fazer qualquer tipo de
        curva, e atravessa automaticamente qualquer obstáculo com menos de 1 cm
        de altura. Contudo, esse movimento deve ser <strong>horizontal</strong>.
      </MobileText>

      <MobileText variant="heading" className="mt-4 mb-2">
        Escalar
      </MobileText>
      <MobileText className="mb-3">
        Uma miniatura pode escalar superfícies verticais como muros e paredes.
        Para tal, ela se move a uma distância de até 1 cm do que está escalando,
        ao longo de seu comprimento vertical, gastando{" "}
        <strong>2 cm de movimento para cada 1 cm de escalada</strong>. Uma
        figura que termine seu movimento escalando cai no chão ao final do
        movimento, seguindo as regras normais de queda. Uma figura escalando
        pode declarar uma carga contra uma figura que esteja na borda de uma
        plataforma ou telhado plano conectado ao que esteja escalando, contanto
        que consiga ficar a 1 cm daquela figura, sem objetos entre ambos. Ao
        resolver a luta subsequente, a figura escalando então cai, sem opção de
        se manter em combate.
      </MobileText>
      <MobileText className="italic text-[#a89968] mb-4">
        Gregor agarrou as pedras irregulares da torre em ruínas, puxando-se para
        cima com força bruta. Gastou 6 cm de movimento para escalar apenas 3 cm
        de muro — cada centímetro vertical uma batalha contra a gravidade. No
        topo, vislumbrou o arqueiro inimigo. Sem pensar, lançou-se sobre ele
        numa carga desesperada. A luta foi breve, violenta. Depois, Gregor caiu,
        6 cm direto para o chão pedregoso. A queda foi dolorida, mas valeu a
        pena.
      </MobileText>

      <MobileText variant="heading" className="mt-4 mb-2">
        Pular
      </MobileText>
      <MobileText className="mb-3">
        Uma figura pode declarar um pulo. Ela pode se mover uma distância
        horizontal, vertical ou ambos de até <strong>11 cm</strong>, mas deve
        ter se movido normalmente a distância que deseja pular antes de declarar
        um pulo. Se uma criatura termina seu pulo no ar, ela cai ao final do
        movimento, seguindo regras de queda.
      </MobileText>
      <MobileText className="italic text-[#a89968] mb-4">
        Klaus correu pelos escombros, ganhando impulso. Oito centímetros de
        corrida furiosa antes de saltar sobre o abismo de 8 cm entre os
        edifícios. Por um momento, pairou no ar, suspenso entre vida e morte.
        Aterrizou do outro lado com um baque, rolando para absorver o impacto.
        Atrás dele, seus perseguidores hesitaram na beira do prédio anterior.
      </MobileText>

      <MobileText variant="heading" className="mt-4 mb-2">
        Carga
      </MobileText>
      <MobileText className="mb-3">
        Uma figura pode no início do seu movimento declarar uma carga contra uma
        figura. Ela então se move até que sua base toque a base daquela figura.
        A figura pode fazer curvas normalmente, mas só pode declarar carga
        contra uma figura que enxergue no começo da sua ativação.
      </MobileText>
      <MobileText className="italic text-[#a89968] mb-4">
        O inquisidor viu o necromante através da névoa pútrida. "Arrependa-se,
        sacrilegioso!" rugiu, e suas pernas trovejaram sobre os escombros. Doze
        centímetros de fúria pura, contornando destroços e cadáveres até que sua
        base bateu contra a do necromante. O impacto sozinho quase derrubou o
        herege.
      </MobileText>

      <MobileText variant="heading" className="mt-4 mb-2">
        Queda
      </MobileText>
      <MobileText className="mb-3">
        Uma figura pode cair até{" "}
        <strong>8 cm sem tomar nenhum tipo de dano</strong>. Se cair mais que
        isso, tome de dano <strong>metade da distância caída</strong>.
      </MobileText>
      <MobileText className="italic text-[#a89968] mb-4">
        O besteiro cambaleou na beirada do telhado e caiu. Doze centímetros de
        queda livre. Bateu no chão com um estalo horrível — 6 pontos de dano
        (12/2). Seus ossos quebraram como gravetos secos. Mas a adrenalina o
        manteve lutando.
      </MobileText>

      <MobileText variant="heading" className="mt-4 mb-2">
        Terreno Acidentado
      </MobileText>
      <MobileText className="mb-3">
        Criatura gasta <strong>2 cm de movimento para cada 1 cm</strong> que se
        move em terreno acidentado. Criaturas montadas além disso rolam na
        tabela de "Opa garoto!".
      </MobileText>
      <MobileText className="italic text-[#a89968] mb-4">
        O soldado mergulhou nos escombros — pedras soltas, vigas quebradas,
        corpos em decomposição. Cada passo era uma armadilha. Seu movimentogan
        de 16 cm minguou para míseros 8 cm através da ruína. Atrás dele, o
        cavaleiro montado tentou seguir, mas seu cavalo tropeçou nas pedras
        irregulares.
      </MobileText>

      <MobileText variant="heading" className="mt-4 mb-2">
        Natação
      </MobileText>
      <MobileText className="mb-3">
        Figura deve rolar um teste de Ímpeto (CD 5). Adicione modificadores de
        natação de acordo com a tabela específica. Se tiver sucesso, pode ativar
        normalmente, embora tratando a água como terreno acidentado. Se falhar,
        perde a ativação e toma dano igual ao quanto falhou o teste.
      </MobileText>
      <MobileText className="italic text-[#a89968] mb-4">
        Johann pulou no esgoto fétido. Rolou Ímpeto — resultado 3, falhou por 2.
        A água podre encheu seus pulmões. Dois pontos de dano enquanto se
        debatia, incapaz de se mover. Seu corpo afundou nas águas negras, sua
        ativação desperdiçada.
      </MobileText>

      <MobileText variant="heading" className="mt-4 mb-2">
        FUJA!
      </MobileText>
      <MobileText className="mb-3">
        Uma figura pode gastar sua primeira ação do turno para tomar uma ação de
        fuga desesperada. Ao tomar essa ação, ela se move até{" "}
        <strong>8 cm</strong>, independente de quaisquer penalidades de
        movimento e terreno. A ativação da figura então termina imediatamente.
      </MobileText>
      <MobileText className="italic text-[#a89968] mb-4">
        O aprendiz viu o demônio avançar. Terror puro. "FUJA!" sua mente gritou.
        Ele correu — através de escombros, água podre, fogo, tudo. Oito
        centímetros de puro desespero, ignorando cada obstáculo. Então parou,
        ofegante, sem fôlego para mais nada. Sua ativação acabou. Tudo que
        restava era esperar que o demônio não o alcançasse.
      </MobileText>

      <div className="bg-[#2a1f1f] p-4 rounded-lg border border-[#382929] mb-6">
        <MobileText variant="heading" className="mb-3">
          Combinando Movimentos
        </MobileText>

        <MobileText className="mb-3">
          As diferentes formas de movimento podem ser{" "}
          <strong>combinadas durante a mesma ação</strong>. Uma unidade criativa
          (ou desesperada) pode declarar uma carga e escalar um muro para chegar
          ao seu alvo, ou pular um espaço entre duas varandas durante um
          movimento normal, ou atravessar terreno acidentado enquanto corre para
          uma carga.
        </MobileText>

        <MobileText className="italic text-[#a89968]">
          O skaven farejou a coisa-homem no andar superior. Guinchando baixo,
          correu 8 cm através dos escombros, depois escalou 3 cm de parede
          (gastando 6 cm de movimento), e finalmente saltou 5 cm até a varanda
          onde o humano se escondia. Tudo em uma única ação. A coisa-homem nem
          teve tempo de gritar. Sim-sim, criatividade é sobrevivência.
        </MobileText>
      </div>

      <MobileText variant="heading" className="mt-6 mb-3">
        Ação de Disparada
      </MobileText>

      <MobileText className="mb-3">
        Uma figura pode gastar sua segunda ação do turno para se mover
        novamente, seguindo as mesmas regras de movimento descritas acima, mas
        tendo apenas <strong>metade do seu valor de movimento normal</strong>.
      </MobileText>

      <MobileText className="italic text-[#a89968] mb-4">
        O mensageiro correu 16 cm através da praça arruinada. Não era
        suficiente. Ainda podia ouvir os cultistas atrás dele. Usou sua segunda
        ação para disparar novamente — mais 8 cm de movimento desesperado. Seus
        pulmões ardiam, suas pernas tremiam, mas ele estava vivo. Por enquanto.
      </MobileText>

      <MobileText variant="heading" className="mt-6 mb-3">
        Ação de Luta
      </MobileText>

      <MobileText className="mb-4">
        O momento da verdade. Aço contra aço, força contra força, vida contra
        morte. Uma figura pode declarar{" "}
        <strong>luta contra uma figura que esteja em combate</strong> com ela.
        Note: uma figura só pode entrar em combate com outra através de uma{" "}
        <strong>ação de carga</strong> ou <strong>habilidades especiais</strong>
        .
      </MobileText>

      <MobileText variant="heading" className="mt-4 mb-2">
        A Rolagem de Luta
      </MobileText>

      <MobileText className="mb-3">
        A figura que está usando sua ação de luta rola{" "}
        <strong>Ímpeto (d20)</strong>, adicionando quaisquer modificadores
        relevantes vindos de traits, magias, poderes e itens. A outra figura
        então também rola Ímpeto da mesma forma, com seus modificadores
        incluídos.
      </MobileText>

      <MobileText className="mb-3">
        A figura com a <strong>maior rolagem GANHA A LUTA</strong> e causa dano.
        Simples. Brutal. Definitivo.
      </MobileText>

      <MobileText className="mb-4">
        <strong>Em caso de empate:</strong> Ambas as figuras causam dano uma à
        outra. Ninguém sai ileso quando aço encontra aço em perfeita simetria
        mortal.
      </MobileText>

      <div className="bg-[#2a1f1f] p-4 rounded-lg border border-[#382929] mb-6">
        <MobileText variant="heading" className="mb-3">
          LUTAR COM DUAS MÃOS
        </MobileText>

        <MobileText className="mb-3">
          Uma figura que esteja usando uma arma com a característica leve na sua
          mão secundária, e uma arma corpo a corpo de uma mão na principal,
          ganha <strong>+1 de ímpeto</strong> ao lutar, mas não pode pegar
          fragmentos de pedra-bruxa por estar com ambas as mãos ocupadas.
          Quaisquer bônus de dano de armas de mão secundária são ignoradas, mas
          danos para vontade ou ímpeto são sempre levados em conta.
        </MobileText>
      </div>

      <MobileText variant="heading" className="mt-4 mb-2">
        Causando Dano
      </MobileText>

      <MobileText className="mb-4">
        Para causar dano, pegue a <strong>rolagem de luta</strong> da figura que
        ganhou, adicionando modificadores de dano de armas, magias, poderes,
        habilidades e itens mágicos. Então{" "}
        <strong>subtraia esse valor da Armadura</strong> da figura que perdeu a
        luta. Ela toma esse resultado como dano. Se o resultado for zero ou
        negativo, nenhum dano é causado — o ataque apenas resvalou no seu alvo,
        sem maiores efeitos.
      </MobileText>

      <div className="bg-[#2a1f1f] p-4 rounded-lg border border-[#382929] mb-6">
        <MobileText variant="heading" className="mb-3">
          DANO CRÍTICO
        </MobileText>

        <MobileText className="mb-3">
          Se uma figura ganhar uma luta ao rolar um <strong>20 natural</strong>{" "}
          no dado, ela causa <strong>+5 de dano</strong> no seu ataque. Se ambas
          as figuras em um combate rolarem um 20 natural, os críticos se anulam
          e elas causam dano normal uma a outra.
        </MobileText>
      </div>

      <MobileText variant="heading" className="mt-4 mb-2">
        Após a Luta
      </MobileText>

      <MobileText className="mb-4">
        Ao final do combate, a figura que ganhou escolhe:{" "}
        <strong>continuar em combate</strong> (mantendo as bases tocando) ou{" "}
        <strong>empurrar a figura perdedora 3 cm para trás</strong>, movendo-a
        essa distância. Uma figura pode ser empurrada para cair, mas não pode
        ser empurrada para fora do mapa ou para encostar na base de uma figura
        inimiga.
      </MobileText>

      <div className="bg-[#2a1f1f] p-4 rounded-lg border border-[#382929] mb-6">
        <MobileText variant="heading" className="mb-3">
          Exemplo: Mercenário vs Orc
        </MobileText>

        <MobileText className="italic text-[#a89968] mb-3">
          Gottfried havia completado uma carga contra um Orc Boy no turno
          anterior. Agora, bases tocando, cara a cara com três metros de músculo
          verde e fedor, ele declara uma ação de luta. Sua Zweihander pesa em
          suas mãos — pelo menos a espada era confiável. O orc, menos.
        </MobileText>

        <MobileText className="italic text-[#a89968] mb-3">
          <strong>Gottfried rola:</strong> d20 = 14, +2 de Ímpeto do machado ={" "}
          <strong>16 total</strong>
          <br />
          <strong>O Orc rola:</strong> d20 = 10, +3 de Ímpeto ={" "}
          <strong>13 total</strong>
          <br />
          <em style={{ color: "#a89968" }}>
            O orc berrou "WAAAGH!" com toda confiança de quem nunca aprendeu
            matemática. Gottfried sorriu. Tristemente.
          </em>
        </MobileText>

        <MobileText className="italic text-[#a89968] mb-3">
          Gottfried vence! Agora calcula o dano: 16 (sua rolagem) +2 (arma de
          duas mãos) = 18. Subtrai a Armadura do Orc (12):{" "}
          <strong>6 pontos de dano</strong>. A Zweihander corta fundo na couraça
          improvisada do pele-verde. Sangue verde jorra — a cor favorita de
          Gottfried, ultimamente. O orc grita um xingamento gultural.
        </MobileText>

        <MobileText className="italic text-[#a89968]">
          Gottfried escolhe empurrar. O orc é arremessado 3 cm para trás,
          cambaleando como bêbado. Mas o maldito ainda está de pé. Ainda
          respira. Orcs são irritantemente difíceis de matar — algo sobre
          crânios grossos e cérebros pequenos tornando-os resistentes a trauma e
          ser um maldito cogumelo vivo. A luta não acabou, apenas pausou.
          Gottfried suspira. "Sempre duas lapadas pra matar vocês hein?"
        </MobileText>
      </div>

      <div className="bg-[#2a1f1f] p-4 rounded-lg border border-[#382929] mb-6">
        <MobileText variant="heading" className="mb-3">
          Cair em Cima! — A Vantagem dos Números
        </MobileText>

        <MobileText className="mb-4">
          Em Mordheim, honra é um luxo. Lutar limpo é coisa de tolos. Quando uma
          figura está em combate com <strong>mais de uma figura inimiga</strong>
          , ou tem <strong>figuras aliadas no mesmo combate</strong>, bônus são
          aplicados. Porque laminas nunca são demais.
        </MobileText>

        <div className="bg-[#382929] p-3 rounded mb-4">
          <MobileText className="mb-3">
            <strong style={{ color: "#d4af37" }}>
              Figuras de Suporte (+2):
            </strong>{" "}
            Cada figura aliada que também esteja em combate com a figura alvo E
            não esteja em combate com outra figura concede <strong>+2</strong>.
            Este bônus é cumulativo, então três figuras de suporte elegíveis
            concedem +6 de modificador.
          </MobileText>

          <MobileText className="mb-3">
            <strong style={{ color: "#d4af37" }}>Cancelamento de Bônus:</strong>{" "}
            Note que apenas uma figura por combate pode receber modificador de
            figuras de suporte. Se ambas as figuras são elegíveis para +2, eles
            se cancelam e ambas lutam com +0. Similarmente, se uma é elegível
            para +4 e a outra para +2, a primeira luta com +2 e a segunda com
            +0.
          </MobileText>

          <MobileText>
            <strong style={{ color: "#d4af37" }}>Limite Máximo:</strong> Uma
            figura nunca pode ganhar mais de <strong>+6</strong> de figuras de
            suporte. Mesmo cercada por vinte aliados, apenas três podem
            efetivamente ajudar no combate — muito mais que isso e todos só
            atrapalham uns aos outros.
          </MobileText>
        </div>

        <div className="bg-[#382929] p-3 rounded">
          <MobileText className="italic text-[#a89968] mb-3">
            Três mercenários cercam um único Orc Nob. Klaus ataca, enquanto seus
            dois companheiros também estão em combate com o pele-verde (mas não
            lutando com outras figuras).
          </MobileText>

          <MobileText className="italic text-[#a89968] mb-3">
            <strong>Klaus recebe +4</strong> (dois aliados × +2 cada).
            <br />
            <strong>O Orc recebe +0</strong> (sem aliados).
            <br />
            Klaus rola d20 = 8, +3 de Ímpeto, +4 de suporte ={" "}
            <strong>15</strong>
            <br />
            Orc rola d20 = 12, +3 de Ímpeto = <strong>15</strong>
          </MobileText>

          <MobileText className="italic text-[#a89968]">
            Empate — 15 contra 15. Ambos se chocam, aço contra aço. Ambos
            calculam dano. Klaus: 15 +2 (Arma de duas mãos) = 17 - 12 (Armadura
            Pesada) = <strong>5 de dano no orc</strong>. O Orc: 15 (Arma de Mão)
            = 15 - 11 (Armadura Leve) = <strong>4 de dano em Klaus</strong>. O
            orc rosna, sangrando. Klaus cospe sangue, também sangrando. Cercado
            mas não dominado, o pele-verde sorri com presas ensanguentadas.
            Klaus murmura para seus homens, segurando as costelas: "Próxima vez,
            um de vocês também ataca. Três espadas são um cabra desse a menos...
            e minhas costelas agradecem.". Apesar de ter repreendido seus
            homens, no fundo ele sabe que sem o suporte deles, o Orc teria
            machucado mais que suas costelas. Bem mais.
          </MobileText>
        </div>
      </div>

      <MobileText variant="heading" className="mt-6 mb-3">
        Ação de Tiro
      </MobileText>

      <MobileText className="mb-4">
        A covardia tem seu lugar — especialmente quando esse lugar é fora do
        alcance do inimigo. A figura que usa a ação de tiro seleciona uma de
        suas <strong>armas à distância</strong>, e então seleciona uma figura
        dentro do <strong>alcance daquela arma</strong> que ela consiga
        enxergar.
      </MobileText>

      <MobileText variant="heading" className="mt-4 mb-2">
        A Rolagem de Tiro
      </MobileText>

      <MobileText className="mb-3">
        A figura atiradora rola <strong>Precisão (d20)</strong>, adicionando
        quaisquer modificadores advindos de feitiços, poderes, itens ou traits.
        A figura alvo então rola <strong>Ímpeto (d20)</strong>, adicionando
        quaisquer modificadores relevantes — incluindo os da tabela de defesa
        contra tiro abaixo.
      </MobileText>

      <MobileText className="mb-4">
        Se a rolagem de Precisão for <strong>maior</strong> que a de Ímpeto do
        alvo, causa dano seguindo as mesmas regras do combate corpo a corpo. Em
        caso de <strong>empate</strong> ou caso a rolagem de Ímpeto seja maior,{" "}
        <strong>nenhum dano é causado</strong> — a flecha erra, o virote desvia,
        a bala se perde nas sombras.
      </MobileText>

      <div className="bg-[#2a1f1f] p-4 rounded-lg border border-[#382929] mb-6">
        <MobileText variant="heading" className="mb-3">
          Tabela de Modificadores de Defesa Contra Tiro
        </MobileText>

        <MobileText className="mb-3">
          <strong style={{ color: "#d4af37" }}>
            Terreno Intermediário (+1):
          </strong>{" "}
          Cada peça de terreno entre o atirador e o alvo concede +1. Cumulativo
          — três peças de terreno concedem +3. Note que se o alvo está em
          contato com uma peça de terreno, ela conta como cobertura ao invés de
          terreno intermediário. Se o atirador está em contato com terreno, não
          conta como intermediário (mas pode bloquear linha de visão). Outras
          figuras contam como terreno intermediário.
        </MobileText>

        <MobileText className="mb-3">
          <strong style={{ color: "#d4af37" }}>Cobertura Leve (+2):</strong> O
          alvo está em contato com cobertura sólida (rochas, muros, madeira
          grossa, outras figuras) que obscurece até metade de seu corpo, ou com
          cobertura leve (arbustos, vegetação rasteira) que quase completamente
          obscurece seu corpo.
        </MobileText>

        <MobileText className="mb-3">
          <strong style={{ color: "#d4af37" }}>Cobertura Pesada (+4):</strong> O
          alvo está em contato com cobertura sólida que quase completamente
          obscurece seu corpo.
        </MobileText>

        <MobileText className="mb-3">
          <strong style={{ color: "#d4af37" }}>Tiro Apressado (+1):</strong> O
          atirador se moveu anteriormente durante esta ativação. Difícil mirar
          quando seus pulmões ainda ardem da corrida.
        </MobileText>

        <MobileText>
          <strong style={{ color: "#d4af37" }}>Alvo Grande (-2):</strong> O alvo
          é particularmente alto ou incomumente largo. Normalmente se aplica
          apenas a criaturas com o trait Grande. Algumas coisas são difíceis de
          errar.
        </MobileText>
      </div>

      <div className="bg-[#2a1f1f] p-4 rounded-lg border border-[#382929] mb-6">
        <MobileText variant="heading" className="mb-3">
          Exemplo: Besteiro vs Necromante
        </MobileText>

        <MobileText className="italic text-[#a89968] mb-3">
          Hans, o besteiro, espiou através das ruínas. Lá — o necromante, 60 cm
          à frente, parcialmente atrás de um muro quebrado. Hans já havia se
          movido 8 cm neste turno para conseguir linha de visão. Não ideal, mas
          quando é?
        </MobileText>

        <MobileText className="italic text-[#a89968] mb-3">
          <strong>Hans rola Precisão:</strong> d20 = 13, +2 (Precisão) ={" "}
          <strong>15 total</strong>
          <br />
          <strong>Necromante rola Ímpeto:</strong> d20 = 9, +0 (Ímpeto), +2
          (cobertura leve do muro), +1 (tiro apressado de Hans) ={" "}
          <strong>12 total</strong>
        </MobileText>

        <MobileText className="italic text-[#a89968] mb-3">
          Hans vence! Calcula dano: 15 +2 (besta) = 17 - 10 (armadura do
          necromante) = <strong>7 pontos de dano</strong>. O virote perfura o
          ombro do conjurador. Ele grita — surpreendentemente agudo para alguém
          que lida com mortos.
        </MobileText>

        <MobileText className="italic text-[#a89968]">
          Hans sorri. Depois franze a testa. O necromante ainda está de pé,
          segurando o ombro perfurado, olhos brilhando com ódio e magia sombria.
          "Ele devia ter ficado mais perto do muro," Hans pensa. "Ele, não eu.
          Não arredo pé daqui."
        </MobileText>
      </div>

      <MobileText variant="heading" className="mt-6 mb-3">
        Ação de Conjuração
      </MobileText>

      <MobileText className="mb-4">
        Brincando com os ventos do Caos. Canalizando poder que deveria
        permanecer adormecido. Algumas almas tolas ou desesperadas possuem o dom
        — ou maldição — da magia. E em Mordheim, onde a Pedra-bruxa contamina
        cada pedra, esse poder é ainda mais perigoso... e tentador.
      </MobileText>

      <MobileText variant="heading" className="mt-4 mb-2">
        O Ritual da Conjuração
      </MobileText>

      <MobileText className="mb-3">
        Uma figura capaz de conjurar magias escolhe uma de suas magias
        conhecidas. Ela então rola um <strong>d20</strong> — a rolagem de
        conjuração. Este único número determina se ela canaliza poder divino ou
        abraça o desastre.
      </MobileText>

      <MobileText className="mb-3">
        A figura deve rolar <strong>mais</strong> que a{" "}
        <strong>Classe de Dificuldade (CD)</strong> da magia. Se o fizer, a
        magia é conjurada com sucesso — poder flui, realidade se curva, o
        impossível se manifesta. Se falhar... bem, aí é que as coisas ficam
        interessantes.
      </MobileText>

      <MobileText className="mb-4">
        <strong>Consequências da Falha:</strong> Cada tradição mágica tem suas
        próprias consequências por falhar. Magos arcanos arriscam a corrupção do
        Caos. Sacerdotes podem sofrer a ira de seus deuses. Necromantes...
        necromantes aprendem que os mortos não perdoam facilmente. Cheque as
        consequências específicas na descrição da tradição mágica que está sendo
        utilizada.
      </MobileText>

      <div className="bg-[#2a1f1f] p-4 rounded-lg border border-[#382929] mb-6">
        <MobileText variant="heading" className="mb-3">
          Forçar — Sangue pelo Poder
        </MobileText>

        <MobileText className="mb-3">
          Às vezes, a magia não vem facilmente. Às vezes, os ventos não sopram
          na direção que você precisa. E às vezes, a única opção é{" "}
          <strong>forçar</strong> — arrancar poder com a própria essência vital.
        </MobileText>

        <MobileText className="mb-3">
          <strong>Forçar:</strong> Aumente a rolagem de conjuração em{" "}
          <strong>+1 para cada 1 ponto de vida gasto</strong>. Você pode gastar
          quantos pontos quiser, transformando sua própria vitalidade em poder
          arcano. Sangue por magia. Vida por resultado.
        </MobileText>

        <MobileText className="mb-3">
          <strong>Limite do Forçar:</strong> Forçar{" "}
          <strong>nunca pode fazer</strong> uma rolagem de conjuração ser{" "}
          <strong>maior que 18</strong>. Há um limite para quanto poder o corpo
          mortal pode canalizar, não importa quanto sangue você ofereça. Alguns
          tolos tentaram ultrapassar este limite. Seus corpos retorcidos ainda
          decoram certas ruínas, avisos silenciosos de ambição além da
          capacidade.
        </MobileText>

        <MobileText className="mb-3">
          Uma barganha que os desesperados fazem... e que os mortos lamentam.
        </MobileText>

        <MobileText className="italic text-[#a89968]">
          Bergson von Blutgarn rolou 12 para conjurar Bola de Fogo (CD 14).
          Falhou por 2. Mas ele não podia falhar — não agora, não com o cultista
          avançado enquanto espuma pela boca. Ele <strong>Forçou</strong>{" "}
          gastando 3 pontos de vida. Sua rolagem subiu para 15. Sucesso. A bola
          de fogo explodiu, consumindo o miserável. O aprendiz caiu de joelhos,
          pálido, sangrando pelo nariz. Mas vivo. Às vezes, o preço vale a pena.
        </MobileText>
      </div>

      <div className="bg-[#2a1f1f] p-4 rounded-lg border border-[#382929] mb-6">
        <MobileText variant="heading" className="mb-3">
          Exemplo: Mago da Luz vs As Sombras
        </MobileText>

        <MobileText className="italic text-[#a89968] mb-3">
          Maximilian levantou seu cajado, palavras de poder formando-se em seus
          lábios. A escuridão de Mordheim pressionava contra ele, mas ele
          conhecia a luz. "Vade Retro, Cramunhão!", ele declarou, conjurando
          contra o demônio à sua frente. CD 16 — não era fácil.
        </MobileText>

        <MobileText className="italic text-[#a89968] mb-3">
          <strong>Maximilian rola:</strong> d20 = 17
          <br />
          <em style={{ color: "#a89968" }}>
            Sucesso. Por um fio. Mas sucesso.
          </em>
        </MobileText>

        <MobileText className="italic text-[#a89968] mb-3">
          Luz sagrada explode do cajado, envolvendo o demônio em chamas
          purificadoras. A criatura grita — um som que não deveria existir neste
          mundo. O feitiço funciona conforme descrito na tradição da Luz.
        </MobileText>

        <MobileText className="italic text-[#a89968]">
          Maximilian respira fundo, suor escorrendo por seu rosto. Por pouco. Se
          tivesse rolado 16 ou menos... bem, melhor não pensar nisso. Em
          Mordheim, cada conjuração é um jogo com a morte. E a morte nunca
          esquece os apostadores.
        </MobileText>
      </div>

      <MobileText variant="heading" className="mt-6 mb-3">
        Ação de Poder
      </MobileText>

      <MobileText className="mb-4">
        Não é magia — é algo mais visceral. Mais brutal. O auge da habilidade
        marcial, técnica refinada até a perfeição, ou pura força de vontade
        manifestada em feitos sobre-humanos. Mas grandeza tem seu preço, e esse
        preço é pago em dor.
      </MobileText>

      <MobileText variant="heading" className="mt-4 mb-2">
        Ativando Poderes
      </MobileText>

      <MobileText className="mb-4">
        Uma figura que pode usar poderes utiliza essa ação para ativá-los. A
        figura rola um <strong>d20</strong> — a rolagem de ativação. Se essa
        rolagem for <strong>maior</strong> que a{" "}
        <strong>Classe de Dificuldade (CD)</strong> do poder, o poder é ativado
        com sucesso. Caso contrário, o poder falha. Simples. Direto. Doloroso.
      </MobileText>

      <div className="bg-[#2a1f1f] p-4 rounded-lg border border-[#382929] mb-6">
        <MobileText variant="heading" className="mb-3">
          Stress — O Preço da Excelência
        </MobileText>

        <MobileText className="mb-3">
          Ativar um poder é usar o auge da habilidade marcial do personagem, e a
          carga mental e física é grande. Músculos rasgam. Nervos queimam. Ossos
          rangem sob pressão impossível.
        </MobileText>

        <MobileText className="mb-3">
          <strong>Ao tentar ativar um poder:</strong> O jogador toma{" "}
          <strong>1 ponto de dano</strong> automaticamente. O esforço de tentar
          já cobra seu tributo.
        </MobileText>

        <MobileText>
          <strong>Caso falhe em ativar o poder:</strong> Toma mais{" "}
          <strong>2 pontos de dano</strong>, para um total de{" "}
          <strong>3 pontos</strong>. Falha não apenas nega o efeito — ela
          machuca. Profundamente.
        </MobileText>
      </div>

      <MobileText variant="heading" className="mt-4 mb-2">
        Uma Ação Especial
      </MobileText>

      <MobileText className="mb-4">
        Esta ação é especial: ela <strong>não gasta</strong> uma das ações do
        jogador por padrão, a não ser que um poder específico exija uma ação
        para aplicar seus efeitos. Você pode ativar um poder e ainda mover,
        atacar, ou realizar outras ações. O corpo grita em protesto, mas
        obedece.
      </MobileText>

      <MobileText variant="heading" className="mt-4 mb-2">
        Forçar Poderes
      </MobileText>

      <MobileText className="mb-4">
        Assim como magias, poderes podem ser <strong>Forçados</strong>. Aumente
        a rolagem de ativação em{" "}
        <strong>+1 para cada 1 ponto de vida gasto</strong>. A rolagem nunca
        pode exceder <strong>18</strong>. Sangue por sucesso. Vida por vitória.
        O preço é o mesmo, apenas a moeda que muda.
      </MobileText>

      <div className="bg-[#2a1f1f] p-4 rounded-lg border border-[#382929] mb-6">
        <MobileText variant="heading" className="mb-3">
          Stress Acumulado — O Limite da Carne
        </MobileText>

        <MobileText className="mb-3">
          Um jogador pode usar essa ação{" "}
          <strong>uma vez por ativação de cada figura</strong> no jogo, podendo
          usar vários poderes no mesmo turno — um a cada ativação. Mas à medida
          que o stress se acumula, os poderes ficam mais difíceis de ativar. O
          corpo tem limites.
        </MobileText>

        <MobileText className="mb-3">
          <strong>Penalidade Progressiva:</strong> Cada poder além do primeiro
          usado no turno tem sua CD aumentada em{" "}
          <strong>+3 para cada outro poder</strong> ativado antes dele:
        </MobileText>

        <MobileText className="mb-3">
          • <strong>Primeiro poder:</strong> CD normal
          <br />• <strong>Segundo poder:</strong> CD +3
          <br />• <strong>Terceiro poder:</strong> CD +6
          <br />• <strong>Quarto poder:</strong> CD +9
          <br />• <strong>Quinto poder:</strong> CD +12
          <br />• <strong>Sexto poder:</strong> CD +15
        </MobileText>

        <MobileText>
          <strong>Limite Absoluto:</strong> Quando a penalidade chegar a{" "}
          <strong>+15</strong>, poderes não podem mais ser ativados neste turno.
          O corpo simplesmente se recusa. Carne e osso têm limites que nem a
          vontade mais feroz pode ultrapassar.
        </MobileText>
      </div>

      <div className="bg-[#2a1f1f] p-4 rounded-lg border border-[#382929] mb-6">
        <MobileText variant="heading" className="mb-3">
          Exemplo: Klaus Empurra os Limites
        </MobileText>

        <MobileText className="italic text-[#a89968] mb-3">
          Klaus, na primeira ativação, usa "Muralha de Escudos!" (CD 3). Rola 15
          — sucesso fácil. Toma 1 de dano pelo esforço. Seus homens erguem
          escudos em formação perfeita.
        </MobileText>

        <MobileText className="italic text-[#a89968] mb-3">
          Segunda ativação: "Ataquem, malditos!" (CD 3, agora CD 6 pelo +3).
          Rola 8 — sucesso. Mais 1 de dano. Seu bando avança coordenado. Klaus
          sente os músculos protestando.
        </MobileText>

        <MobileText className="italic text-[#a89968] mb-3">
          Terceira ativação: "Afiem as lâminas!" (CD 3, agora CD 9 pelo +6).
          Rola 7 — falha. 3 pontos de dano. Klaus cospe sangue, garganta rasgada
          de tanto gritar ordens. O poder não ativa. Seus homens não recebem o
          bônus.
        </MobileText>

        <MobileText className="italic text-[#a89968]">
          Total de dano: 5 pontos em três ativações. Klaus cambaleia, segurando
          o peito. "Não posso continuar assim," ele pensa, sabendo que
          provavelmente continuará.
        </MobileText>
      </div>

      <MobileText variant="heading" className="mt-6 mb-3">
        Ação de Pegar — Fragmentos de Pedra-bruxa
      </MobileText>

      <MobileText className="mb-4">
        A razão pela qual todos estão aqui. A maldição verde que atrai tolos,
        desesperados e gananciosos para as ruínas. Os fragmentos de Pedra-bruxa
        — pedaços do próprio cometa que aniquilou esta cidade condenada. Não são
        pequenas lascas, apesar do nome "fragmentos" — são{" "}
        <strong>grandes pedaços</strong> do cometa, pesados, pulsantes de
        energia corrupta, e terrivelmente valiosos.
      </MobileText>

      <MobileText variant="heading" className="mt-4 mb-2">
        O Ato de Pegar
      </MobileText>

      <MobileText className="mb-3">
        Uma figura pode gastar uma ação para pegar um fragmento de Pedra-bruxa
        do chão. O momento em que a ganância supera o bom senso. Porém, há
        restrições — afinal, pegar tesouros amaldiçoados enquanto inimigos
        observam raramente termina bem.
      </MobileText>

      <MobileText className="mb-4">
        <strong>Restrição de Proximidade:</strong> Uma figura{" "}
        <strong>não pode usar essa ação</strong> se um inimigo está a menos de{" "}
        <strong>3 cm do fragmento</strong>. Tente pegar pedras brilhantes
        enquanto alguém está querendo te matar e veja como termina.
      </MobileText>

      <MobileText variant="heading" className="mt-4 mb-2">
        O Peso da Ganância
      </MobileText>

      <MobileText className="mb-3">
        Enquanto estiver carregando o fragmento, a figura tem apenas{" "}
        <strong>metade do seu movimento normal</strong> (arredonde para baixo).
        O cometa é pesado. A ganância, mais pesada ainda.
      </MobileText>

      <MobileText className="mb-3">
        <strong>Sobrecarga:</strong> Uma figura que esteja usando qualquer coisa
        que não seja uma <strong>arma de mão</strong> ou <strong>adaga</strong>{" "}
        fica sobrecarregada carregando o fragmento, sofrendo <strong>-2</strong>{" "}
        em Ímpeto, Precisão, rolagens de conjuração e Vontade. Carregar uma
        espada de duas mãos e um pedaço de cometa? Possível. Sábio? Discutível.
      </MobileText>

      <MobileText className="mb-4">
        <strong>Exceções e Restrições:</strong> Figuras com uma{" "}
        <strong>adaga na mão secundária não podem pegar</strong> fragmentos de
        Pedra-bruxa. Contudo, figuras com uma <strong>funda ou escudo</strong>{" "}
        podem (seguindo regras normais de sobrecarga se aplicável).
      </MobileText>

      <MobileText variant="heading" className="mt-4 mb-2">
        A Grande Fuga
      </MobileText>

      <MobileText className="mb-4">
        Uma figura carregando um fragmento de Pedra-bruxa pode{" "}
        <strong>sair do mapa</strong>, capturando-a para seu bando. A figura e o
        fragmento não voltam para o jogo — ela fugiu com o tesouro, levando sua
        ganância (e o cometa amaldiçoado) para longe das ruínas. Missão
        cumprida. Sobrevivência garantida. Corrupção... bem, isso é problema
        para amanhã.
      </MobileText>

      <div className="bg-[#2a1f1f] p-4 rounded-lg border border-[#382929] mb-6">
        <MobileText variant="heading" className="mb-3">
          Exemplo: A Ganância de Wilhelm
        </MobileText>

        <MobileText className="italic text-[#a89968] mb-3">
          Wilhelm viu o fragmento brilhando entre os escombros. Verde. Pulsante.
          Valioso. O orc mais próximo estava a 10 cm — longe o suficiente. Ele
          gastou sua ação para pegá-lo, agarrando o pedaço de cometa. Era
          pesado. Mais pesado do que parecia.
        </MobileText>

        <MobileText className="italic text-[#a89968] mb-3">
          Wilhelm carregava uma espada de duas mãos. Agora, com a Pedra-bruxa na
          outra mão, estava sobrecarregado. Seu movimento de 16 cm caiu para 8
          cm. Pior: -2 em Ímpeto, Precisão, Conjuração e Vontade. Cada passo era
          uma luta. Cada respiração, um esforço.
        </MobileText>

        <MobileText className="italic text-[#a89968]">
          Mas Wilhelm sorriu. A borda do mapa estava a 18 cm. Três turnos,
          talvez quatro, e ele poderia sair — fragmento em mãos, riqueza
          garantida. Claro, havia aquele orc. E aquele outro orc. E... ele parou
          de contar. "Um problema de cada vez," murmurou, arrastando-se através
          das ruínas, metade da velocidade mas o dobro da determinação.
        </MobileText>
      </div>

      <MobileText variant="heading" className="mt-6 mb-3">
        Ação de Usar Item
      </MobileText>

      <MobileText className="mb-4">
        Poções preparadas em alambiques esquecidos. Artefatos mágicos imbuídos
        de poder antigo. Pergaminhos rabiscados com runas que ardem nos olhos.
        Em Mordheim, estes tesouros podem salvar vidas... ou destruí-las
        espetacularmente.
      </MobileText>

      <MobileText className="mb-4">
        Alguns <strong>itens mágicos e poções</strong> especificam que precisam
        de ações para serem bebidos, ativados ou utilizados. Esta é a ação usada
        para tal fim. Simples, direto, e frequentemente a diferença entre vida e
        morte.
      </MobileText>

      <MobileText className="mb-4">
        Consulte a descrição específica do item para saber seus efeitos,
        duração, e quaisquer consequências de uso. Alguns itens são benignos.
        Outros... bem, em Mordheim, até as curas podem ter preço.
      </MobileText>

      <div className="bg-[#2a1f1f] p-4 rounded-lg border border-[#382929] mb-6">
        <MobileText variant="heading" className="mb-3">
          Exemplo: Poção do Desespero
        </MobileText>

        <MobileText className="italic text-[#a89968] mb-3">
          Klaus estava sangrando. Muito. O corte do cutelo orc havia atingido
          fundo — apenas 4 pontos de vida restantes. Ele enfiou a mão no cinto e
          puxou a poção que comprou na taverna: "Lágrimas de Shallya", o
          vendedor dissera. Cheirava a ervas mortas e esperança falsa.
        </MobileText>

        <MobileText className="italic text-[#a89968] mb-3">
          Klaus gastou uma ação para beber. O líquido queimou sua garganta.
          Depois, calor — a ferida parou de sangrar, a dor diminuiu. Recuperou 5
          pontos de vida. Não era milagre, mas em Mordheim, você aceita o que
          pode conseguir.
        </MobileText>

        <MobileText className="italic text-[#a89968]">
          "Valeu cada coroa," Klaus murmurou, jogando o frasco vazio nos
          escombros. Então pegou sua espada novamente. O orc ainda estava lá. E
          Klaus, agora, tinha vida suficiente para outro round. Às vezes, a
          alquimia funciona.
        </MobileText>
      </div>

      <MobileText variant="heading" className="mt-6 mb-3">
        Ações Especiais
      </MobileText>

      <MobileText className="mb-4">
        Nem toda ação se encaixa perfeitamente nas categorias acima. Algumas
        figuras possuem truques únicos, técnicas especializadas, ou habilidades
        que desafiam a normalidade. Estas são as{" "}
        <strong>ações especiais</strong> — capacidades únicas concedidas por
        habilidades, traits, magias ou equipamentos específicos.
      </MobileText>

      <MobileText className="mb-4">
        <strong>Ações Definidas por Habilidades:</strong> Quando uma habilidade,
        trait ou item concede uma "ação especial", ela especifica exatamente o
        que pode ser feito, quando pode ser usado, e quais seus efeitos. Estas
        ações seguem suas próprias regras, escritas em suas descrições.
      </MobileText>

      <MobileText className="mb-4">
        Algumas ações especiais substituem ações normais (como movimento ou
        tiro). Outras são completamente únicas. Sempre leia a descrição completa
        — em Mordheim, os detalhes matam.
      </MobileText>

      <div className="bg-[#2a1f1f] p-4 rounded-lg border border-[#382929] mb-6">
        <MobileText variant="heading" className="mb-3">
          Exemplo: Ação de Mirar do Skink Zarabataneiro
        </MobileText>

        <MobileText className="italic text-[#a89968] mb-3">
          Tik-Taq, o skink zarabataneiro, espreitava nas sombras, sua zarabatana
          firmemente segura. O cultista estava a 40 cm — alcance perfeito, mas o
          alvo se movia entre os escombros. Tik-Taq não era apressado. Skinks
          nunca são.
        </MobileText>

        <MobileText className="italic text-[#a89968] mb-3">
          Ele usou sua primeira ação para <strong>Mirar</strong> — uma ação
          especial concedida por sua habilidade de zarabataneiro. Respiração
          controlada. Foco absoluto. Cálculo da distância, vento, e o movimento
          do alvo. Quando sua segunda ação veio, ele disparou com{" "}
          <strong>Ignorando terrenos entre ele e o alvo</strong> .
        </MobileText>

        <MobileText className="italic text-[#a89968]">
          O dardo envenenado voou. Silencioso. Certeiro. O cultista caiu antes
          mesmo de saber que estava morto. Tik-Taq assentiu para si mesmo.
          Paciência, como sempre, vence pressa. Os sangue-quente nunca entendem
          isso.
        </MobileText>
      </div>
    </CollapsibleSection>
  );
}

export default ActionsSection;
