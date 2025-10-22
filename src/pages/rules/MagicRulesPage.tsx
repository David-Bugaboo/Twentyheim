import PageTitle from "../../components/PageTitle";
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";
import HeaderH1 from "../../components/HeaderH1";
import HeaderH2 from "../../components/HeaderH2";
import HeaderH3 from "../../components/HeaderH3";
import CornerDecoration from "../../components/CornerDecoration";
import AreaEffectCards from "../../components/AreaEffectCards";

function MagicRulesPage() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <CornerDecoration />
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <MobileSection>
            <PageTitle>Magia em Mordheim</PageTitle>
            <MobileText
              variant="quote"
              className="text-center italic text-lg leading-relaxed mb-6 p-4 bg-[#2a1f1f] border border-[#382929] rounded-lg"
            >
              "A força da Magia diminuiu desde os tempos antigos. Embora sejamos
              afortunados que exércitos de Daemônios não vaguem mais pela terra,
              também devemos perceber que as magias mais poderosas agora estão
              perdidas para nós. Apenas em artefatos como o Martelo de Sigmar
              restam traços do antigo poder."
              <br />
              <span className="text-sm text-[#d4af37] mt-2 block">
                — Maximilian, Hierofante da Ordem da Luz
              </span>
            </MobileText>
            <MobileText>
              Embora a magia no velho mundo permeie tudo, conjuradores são
              incomuns. Os mistérios arcanos são conhecidos apenas por poucos, e
              há muitas crenças falsas, ideias equivocadas e superstições
              estranhas sobre magia. O povo comum pode lhe contar todo tipo de
              coisas sobre magia, se são verdadeiras ou não, é outra questão…
            </MobileText>
            <HeaderH1>A Natureza da Magia</HeaderH1>
            <MobileText>
              Como os Magistrados veem, usar magia é dar forma à substância do
              Caos puro. Um Mago usa sua vontade e sua própria carne para formar
              um conduto entre este mundo e o reino imaterial (conhecido como
              Aethyr e o Reino do Caos), extraindo poder dos "ventos" da magia.
              Através de treinamento, força de vontade e talento inato, um
              Magistrado pode invocar fogo, criar ilusões ou transmutar chumbo
              em ouro. Ao mesmo tempo, ele pode trazer desastre, ou atrair a
              atenção de olhos invisíveis. Muitos sussurram que Demônios
              cavalgam os Ventos da Magia, sempre atentos para avistar aqueles
              que se demoram em seu domínio. Seja qual for a verdade disso, é
              comumente aceito que a magia é uma amante inconstante, com faces
              tanto cruéis quanto gentis.
            </MobileText>
            <HeaderH1>Os Ventos da Magia</HeaderH1>
            <MobileText>
              Assim como o emblema do Caos tem oito flechas, a magia também tem
              oito ventos. Eles sopram pelo mundo, carregando a energia do Caos
              com eles. Enquanto a magia bruta é unificada dentro do Reino do
              Caos, quando ela vem para este mundo, refrata-se em oito "cores",
              conhecidas coletivamente como os Ventos da Magia. Conjuradores
              ganham seu poder ao se conectar a esses Ventos da Magia. Alguns
              fazem isso juntando-se a uma Ordem dedicada ao estudo de uma cor
              da magia. Outros fazem isso através de oração, sorte ou instinto.
              Como estão brincando com a essência do próprio Caos, sejam quais
              forem seus métodos, todos os conjuradores arriscam suas vidas e
              até suas almas quando praticam magia.
            </MobileText>
            <MobileText>
              Existem quatro tipos principais de magia: arcana, divina, sombria
              e da WAAAAAAAGH!. Cada uma possui suas próprias características,
              riscos e métodos únicos de invocação.
            </MobileText>
            <HeaderH2>Magia Arcana</HeaderH2>
            <MobileText>
              A forma mais tradicional e estudada de magia.{" "}
              <strong>Conjuradores arcanos</strong>, tipicamente conhecidos como
              Magos, usam fórmulas mágicas complexas e força de vontade pessoal
              para comandar e controlar os Ventos da Magia. Eles acreditam que
              sua própria força interior alimenta seus feitiços, canalizando o
              poder bruto dos Ventos através de conhecimento esotérico e
              disciplina mental. A Magia Arcana é versátil e poderosa, mas
              requer anos de estudo e prática para dominar.
            </MobileText>
            <MobileText>
              Cada cor dos Ventos da Magia possui suas próprias especialidades:
              Chamon para metal e transformação, Ghur para bestas e natureza,
              Ghyran para vida e cura, Hysh para luz e purificação, Aqshy para
              fogo e paixão, Azyr para céu e profecia, Ulgu para sombras e
              ilusão, e Shyish para morte e necromancia.
            </MobileText>
            <HeaderH2>Magia Divina</HeaderH2>
            <MobileText>
              Baseada na fé e na conexão com divindades.{" "}
              <strong>Conjuradores divinos</strong>, tipicamente conhecidos como
              Sacerdotes, usam rituais religiosos, orações e devoção para
              trabalhar magia. Eles acreditam que seus feitiços são presentes
              dos Deuses em troca de devoção e oração. A Magia Divina tende a
              ser mais segura que a Magia Arcana porque é altamente ritualizada
              e estruturada, mas também é mais limitada em escopo.
            </MobileText>
            <MobileText>
              Cada divindade possui suas próprias especialidades: Sigmar para
              proteção e justiça, Ulric para força e inverno, Taal para natureza
              e caça, Morr para morte e sonhos, Verena para conhecimento e
              sabedoria, e Shallya para cura e misericórdia.
            </MobileText>
            <HeaderH2>Magia Sombria</HeaderH2>
            <MobileText>
              Um subconjunto perigoso da Magia Arcana, cujos praticantes estão
              dispostos a correr riscos pessoais ainda maiores por poder
              aumentado. Estes conjuradores mergulham nas profundezas mais
              escuras dos Ventos da Magia, fazendo pactos com daemônios,
              sacrificando vidas inocentes, ou se corrompendo com Pedra-bruxa. A
              Magia Sombria oferece poder imenso, mas a um preço terrível:
              corrupção da alma, mutação do corpo, e eventual transformação em
              algo que não é mais humano.
            </MobileText>
            <MobileText>
              Necromantes, Bruxas Sombrias, e Cultistas do Caos são exemplos de
              praticantes da Magia Sombria.
            </MobileText>
            <HeaderH2>Magia da WAAAAAAAGH!</HeaderH2>
            <MobileText>
              Única aos Orcs e Goblins, sendo uma forma de magia selvagem e
              instintiva. Os Xamãs Orcs não estudam magia como os Magos humanos
              - eles a sentem, a vivem, e a canalizam através de sua natureza
              brutal e violenta. A Magia da WAAAAAAAGH! é imprevisível,
              poderosa, e frequentemente explosiva.
            </MobileText>
            <MobileText>
              Ela se manifesta através de gritos de guerra, rituais de
              destruição, e a energia coletiva de uma horda de Orcs em frenesi
              de batalha. Quanto maior a horda, mais poderosa a magia se torna,
              mas também mais perigosa para o próprio Xamã.
            </MobileText>
            <HeaderH1>Anatomia de uma Magia</HeaderH1>
            <MobileText>
              Cada magia nesse jogo é descrita seguindo um padrão consistente,
              revelando os segredos necessários para sua invocação — ou os
              perigos que aguardam aqueles tolos o suficiente para tentar:
            </MobileText>
            <HeaderH3>NOME</HeaderH3>
            <MobileText>
              O nome pelo qual a magia é conhecida nas universidades do Império
              ou nos círculos menos prestigiados de feiticeiros profanos. Cada
              tradição mágica guarda seus próprios títulos arcanos, transmitidos
              através de gerações de mestres e aprendizes.
            </MobileText>
            <HeaderH3>TRADIÇÃO</HeaderH3>
            <MobileText>
              A escola mágica à qual o feitiço pertence — seja uma das Oito
              Tradições Arcanas dos Colégios Imperiais, as orações divinas dos
              deuses, ou os sussurros sombrios do Caos.
            </MobileText>
            <HeaderH3>CLASSE DE DIFICULDADE</HeaderH3>
            <MobileText>
              O número que determina quão árduo é canalizar os Ventos da Magia
              para manifestar este feitiço. Quanto maior o número, mais perigosa
              a tentativa — e maior a chance de atrair olhares indesejados do
              Imaterium.
            </MobileText>
            <HeaderH3>PALAVRAS-CHAVE</HeaderH3>
            <MobileText>
              Definem as regras específicas de como a magia funciona — quando e
              como pode ser usada, quem ou o que pode ser afetado, e sob quais
              circunstâncias a magia pode ser invocada. As palavras-chave
              determinam o comportamento mecânico da magia no jogo.
            </MobileText>
            <HeaderH1>LISTA DEPALAVRAS-CHAVE</HeaderH1>
            <HeaderH3>MISSIL MAGICO (TIPO) (X)</HeaderH3>
            <MobileText>
              Um míssil mágico funciona exatamente como um ataque a distância,
              mas usando a Rolagem de Conjuração + (X) ao invés de D20 +
              precisão. O Míssil Mágico causa dano (TIPO). Apesar do nome alguns
              mísseis mágicos causam dano normal.
            </MobileText>
            <HeaderH3>ÁREAS DE EFEITO (TIPO)</HeaderH3>
            <MobileText>
              Posicione o tipo de área de efeito em algum ponto no alcance da
              magia. Todas as figuras sob a área de efeito são afetadas pela
              magia. Na seção de <strong>Downloads</strong> você encontrará um
              arquivo PDF com todos os tipos de template para serem impressos e
              usados no jogo. Recomendo imprimi-los em papel comum e
              plastificá-los.
            </MobileText>
            <AreaEffectCards />
            <HeaderH3>LINHA DE VISÃO</HeaderH3>
            <MobileText>
              Pode afetar qualquer figura para qual o conjurador pode traçar de
              visão.
            </MobileText>
            <HeaderH3>ALCANCE (X)</HeaderH3>
            <MobileText>
              A Magia afete uma criatura a até (X)cm do conjurador.
            </MobileText>
            <HeaderH3>INVOCAÇÃO</HeaderH3>
            <MobileText>
              Essa magia invoca uma criatura, que deve ser posicionada a até
              14cm do jogador.
            </MobileText>
            <HeaderH3>PSICOLÓGICA</HeaderH3>
            <MobileText>
              Essa magia é um efeito que mexe com a mente da figura alvo.
              Palavra-chave relevante para interagir com efeitos de outras
              magias e habilidades.
            </MobileText>
            <HeaderH3>SAGRADA</HeaderH3>
            <MobileText>
              Essa magia é um efeito ganho através de fé e dedicação. Magias com
              essa palavra chave não são afetadas por habilidades e
              características que anulam, defletem ou oferecem resistência a
              magia.
            </MobileText>
            <HeaderH3>CONJURADOR APENAS</HeaderH3>
            Essa magia só pode ter o próprio conjurador como alvo.
            <HeaderH3>TOQUE</HeaderH3>A magia pode afetar o próprio conjurador
            ou qualquer figura que ele esteja em contato de base.{" "}
            <HeaderH3>ILUSÃO</HeaderH3>
            Magias que manipulam a percepção das figuras inimigas. Palavra-chave 
            relevante para interagir com efeito de outras magias e habilidades.
            
            
            <HeaderH3>RITUAL</HeaderH3>
            <MobileText>
              Essa magia pode ser usada durante a etapa de Conjurar Rituais da
              sequência pós-jogo. A magia não causa dano ou efeitos negativos
              por falhar na conjuração, mas não pode ser forçada.
            </MobileText>
            <MobileText
              variant="quote"
              className="text-center italic text-lg leading-relaxed mt-8"
            >
              "Em Mordheim, a magia não é apenas poder — é um pacto com o
              próprio Caos. Cada feitiço lançado é um passo mais próximo da
              ruína ou da glória. Escolha sabiamente, pois os Ventos da Magia
              não perdoam tolos."
            </MobileText>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default MagicRulesPage;
