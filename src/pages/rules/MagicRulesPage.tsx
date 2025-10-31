import PageTitle from "../../components/PageTitle";
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";
import HeaderH1 from "../../components/HeaderH1";
import HeaderH2 from "../../components/HeaderH2";
import HeaderH3 from "../../components/HeaderH3";
import QuickNavigation from "../../components/QuickNavigation";
import TzeentchCurseTable from "../../components/TzeentchCurseTable";
import WrathOfGodsTable from "../../components/WrathOfGodsTable";
import TzeentchGiftsTable from "../../components/TzeentchGiftsTable";
import { useNavigate } from "react-router-dom";

function MagicRulesPage() {
  const navigate = useNavigate();

  const navigationSections = [
    { id: "intro", title: "Magia em Mordheim", level: 0 },
    { id: "natureza-magia", title: "A Natureza da Magia", level: 0 },
    { id: "ventos-magia", title: "Os Ventos da Magia", level: 0 },
    { id: "tipos-magia", title: "Tipos de Magia", level: 0 },
    { id: "magia-arcana", title: "Magia Arcana", level: 1 },
    { id: "magia-divina", title: "Magia Divina", level: 1 },
    { id: "magia-sombria", title: "Magia Sombria", level: 1 },
    { id: "anatomia-magia", title: "Anatomia de uma Magia", level: 0 },
    { id: "palavras-chave", title: "Lista de Palavras-chave", level: 0 },
  ];

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <QuickNavigation sections={navigationSections} />
          <MobileSection>
            <div id="intro">
              <PageTitle>Magia em Mordheim</PageTitle>
            </div>
            <MobileText
              variant="quote"
              className="text-center italic text-lg leading-relaxed mb-6 p-4 bg-green-900/20 border border-green-500/40 rounded-lg text-white"
            >
              "A força da Magia diminuiu desde os tempos antigos. Embora sejamos
              afortunados que exércitos de Daemônios não vaguem mais pela terra,
              também devemos perceber que as magias mais poderosas agora estão
              perdidas para nós. Apenas em artefatos como o Martelo de Sigmar
              restam traços do antigo poder."
              <br />
              <span className="text-sm text-white mt-2 block">
                — Maximilian, Hierofante da Ordem da Luz
              </span>
            </MobileText>
            <MobileText>
              Embora a magia no Velho Mundo permeie tudo, conjuradores são
              incomuns. Os mistérios arcanos são conhecidos apenas por poucos, e
              há muitas crenças falsas, ideias equivocadas e superstições
              estranhas sobre magia. O povo comum pode lhe contar todo tipo de
              coisas sobre magia, se são verdadeiras ou não, é outra questão…
            </MobileText>
            <div id="natureza-magia">
              <HeaderH1>A Natureza da Magia</HeaderH1>
            </div>
            <MobileText>
              Como os Magistrados veem, usar magia é dar forma à substância do
              Caos puro. Um Mago usa sua vontade e sua própria carne para formar
              um conduto entre este mundo e o reino imaterial (conhecido como
              Aethyr e o Reino do Caos), extraindo poder dos "ventos" da magia.
              Através de treinamento, força de vontade e talento inato, um
              Magistrado pode invocar fogo, criar ilusões ou transmutar chumbo
              em ouro. Ao mesmo tempo, ele pode trazer desastre, ou atrair a
              atenção de olhos invisíveis. Muitos sussurram que daemônios
              cavalgam os Ventos da Magia, sempre atentos para avistar aqueles
              que se demoram em seu domínio. Seja qual for a verdade disso, é
              comumente aceito que a magia é uma amante inconstante, com faces
              tanto cruéis quanto gentis.
            </MobileText>
            <div id="ventos-magia">
              <HeaderH1>Os Ventos da Magia</HeaderH1>
            </div>
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
            <div id="tipos-magia">
              <HeaderH1>Tipos de Magia</HeaderH1>
            </div>
            <MobileText>
              Existem dois tipos principais de magia: arcana e divina.{" "}
              <strong>Conjuradores arcanos</strong>, tipicamente conhecidos como
              Magos, usam fórmulas mágicas e força de vontade pessoal para
              comandar e controlar os Ventos da Magia. Esses conjuradores não
              podem conjurar magias se estiverem usando Armaduras e Escudos, ou
              em combate, devido ao foco mental absoluto e a liberdade de
              movimentos necessários para executar as sequências de gestos e
              encantamentos necessários para conjurar magia.{" "}
              <strong>Conjuradores divinos</strong>, tipicamente conhecidos como
              Sacerdotes, usam fé e rituais religiosos para trabalhar magia.
              Assim, os Magos acreditam que sua própria força interior alimenta
              seus feitiços, enquanto os Sacerdotes acreditam que seus feitiços
              são presentes dos Deuses em troca de devoção e oração. A Magia
              Divina tende a ser mais segura que a Magia Arcana porque é
              altamente ritualizada. Sacerdotes usam magia de uma forma mais
              intuitiva, e portanto podem conjurar magia mesmo usando Armadura e
              Escudos, devido a não necessidade de usar encantamentos completos
              e gestos específicos.
            </MobileText>
            <MobileText>
              Toda magia tem seus riscos, no entanto, como é amplamente
              demonstrado pela Magia Sombria. Esta é um subconjunto da Magia
              Arcana, cujos praticantes estão dispostos a correr riscos pessoais
              ainda maiores por poder aumentado. Conjuradores das sombras usam
              as mesmas regras de conjuradores arcanos, mas com riscos extras.
            </MobileText>
            <div id="magia-arcana">
              <HeaderH2>Magia Arcana</HeaderH2>
            </div>
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
              <strong>Maldição de Tzeentch:</strong> Um mago que rola um 1
              natural em sua rolagem de conjuração deve rolar na Tabela de
              Maldição de Tzeentch e aplicar o resultado imediatamente. Este é o
              preço de brincar com os Ventos da Magia — às vezes, o Caos retorna
              em formas terríveis e imprevisíveis.
            </MobileText>
            <TzeentchCurseTable />
            <MobileText>
              Cada cor dos Ventos da Magia possui suas próprias especialidades:
              Chamon para metal e transformação, Ghur para bestas e natureza,
              Ghyran para vida e cura, Hysh para luz e purificação, Aqshy para
              fogo e paixão, Azyr para céu e profecia, Ulgu para sombras e
              ilusão, e Shyish para morte e necromancia.
            </MobileText>
            <MobileText className="mb-3 mt-4">
              <strong>Tradições Arcanas Disponíveis:</strong>
            </MobileText>
            <div className="space-y-3 mb-6">
              <button
                onClick={() => navigate("/magic/magic-of-the-old-ones")}
                className="w-full px-4 py-2 rounded-md transition-all duration-150 bg-green-900/20 border border-green-500/40 hover:bg-green-800/30 hover:border-green-400/60 text-white text-sm"
              >
                Magia dos Anciões
              </button>
              <button
                onClick={() => navigate("/magic/magic-of-the-goblins")}
                className="w-full px-4 py-2 rounded-md transition-all duration-150 bg-green-900/20 border border-green-500/40 hover:bg-green-800/30 hover:border-green-400/60 text-white text-sm"
              >
                Magia dos Goblins
              </button>
              <button
                onClick={() => navigate("/magic/magic-of-the-waaaaagh")}
                className="w-full px-4 py-2 rounded-md transition-all duration-150 bg-green-900/20 border border-green-500/40 hover:bg-green-800/30 hover:border-green-400/60 text-white text-sm"
              >
                Magia da Waaaaaagh!
              </button>
            </div>
            <div id="magia-divina">
              <HeaderH2>Magia Divina</HeaderH2>
            </div>
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
              <strong>Ira dos Deuses:</strong> Um sacerdote que rola um 1
              natural em sua rolagem de conjuração deve rolar na Tabela de Ira
              dos Deuses e aplicar o resultado imediatamente. Esta tabela é
              menos hostil que a Maldição de Tzeentch, mas ainda pode ser
              desastrosa.
            </MobileText>
            <WrathOfGodsTable />
            <MobileText>
              Cada divindade possui suas próprias especialidades: Sigmar para
              proteção e justiça, Ulric para força e inverno, Taal para natureza
              e caça, Morr para morte e sonhos, Verena para conhecimento e
              sabedoria, e Shallya para cura e misericórdia.
            </MobileText>
            <MobileText className="mb-3 mt-4">
              <strong>Orações Disponíveis:</strong>
            </MobileText>
            <div className="space-y-3 mb-6">
              <button
                onClick={() => navigate("/magic/prayers-of-sigmar")}
                className="w-full px-4 py-2 rounded-md transition-all duration-150 bg-green-900/20 border border-green-500/40 hover:bg-green-800/30 hover:border-green-400/60 text-white text-sm"
              >
                Orações de Sigmar
              </button>
              <button
                onClick={() => navigate("/magic/prayers-of-ulric")}
                className="w-full px-4 py-2 rounded-md transition-all duration-150 bg-green-900/20 border border-green-500/40 hover:bg-green-800/30 hover:border-green-400/60 text-white text-sm"
              >
                Orações de Ulric
              </button>
            </div>
            <div id="magia-sombria">
              <HeaderH2>Magia Sombria</HeaderH2>
            </div>
            <MobileText>
              Um subconjunto perigoso da Magia Arcana, cujos praticantes estão
              dispostos a correr riscos pessoais ainda maiores por poder
              aumentado. Estes conjuradores mergulham nas profundezas mais
              escuras dos Ventos da Magia, fazendo pactos com daemônios,
              sacrificando vidas inocentes, ou se corrompendo com Pedra-Bruxa. A
              Magia Sombria oferece poder imenso, mas a um preço terrível:
              corrupção da alma, mutação do corpo, e eventual transformação em
              algo que não é mais humano.
            </MobileText>
            <MobileText>
              Necromantes, Bruxas Sombrias, e Cultistas do Caos são exemplos de
              praticantes da Magia Sombria.
            </MobileText>
            <MobileText>
              <strong>Magica Corruptiva:</strong> Um conjurador de Magia Sombria
              que rola um 1 natural em sua rolagem de conjuração não apenas deve
              rolar na Tabela de Maldição de Tzeentch, mas também deve rolar na
              Tabela de Dádivas de Tzeentch. O poder descontrolado do Caos
              distorce tanto corpo quanto alma — o preço do poder das sombras é
              a própria essência da humanidade.
            </MobileText>
            <TzeentchGiftsTable />
            <MobileText className="mb-3 mt-4">
              <strong>Tradições Sombrias Disponíveis:</strong>
            </MobileText>
            <div className="space-y-3 mb-6">
              <button
                onClick={() => navigate("/magic/rituals-of-chaos")}
                className="w-full px-4 py-2 rounded-md transition-all duration-150 bg-green-900/20 border border-green-500/40 hover:bg-green-800/30 hover:border-green-400/60 text-white text-sm"
              >
                Rituais do Caos
              </button>
              <button
                onClick={() => navigate("/magic/rituals-of-hashut")}
                className="w-full px-4 py-2 rounded-md transition-all duration-150 bg-green-900/20 border border-green-500/40 hover:bg-green-800/30 hover:border-green-400/60 text-white text-sm"
              >
                Rituais de Hashut
              </button>
              <button
                onClick={() => navigate("/magic/lore-of-necromancy")}
                className="w-full px-4 py-2 rounded-md transition-all duration-150 bg-green-900/20 border border-green-500/40 hover:bg-green-800/30 hover:border-green-400/60 text-white text-sm"
              >
                Tradição da Necromancia
              </button>
              <button
                onClick={() => navigate("/magic/lore-of-the-horned-rat")}
                className="w-full px-4 py-2 rounded-md transition-all duration-150 bg-green-900/20 border border-green-500/40 hover:bg-green-800/30 hover:border-green-400/60 text-white text-sm"
              >
                Tradição do Rato Chifrudo
              </button>
              <button
                onClick={() => navigate("/magic/druchii-magic")}
                className="w-full px-4 py-2 rounded-md transition-all duration-150 bg-green-900/20 border border-green-500/40 hover:bg-green-800/30 hover:border-green-400/60 text-white text-sm"
              >
                Magia Druchii
              </button>
            </div>
            <div id="anatomia-magia">
              <HeaderH1>Anatomia de uma Magia</HeaderH1>
            </div>
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
            <div id="palavras-chave">
              <HeaderH1>LISTA DE PALAVRAS-CHAVE</HeaderH1>
            </div>
            <HeaderH3>MÍSSIL MÁGICO (TIPO) (X)</HeaderH3>
            <MobileText>
              Um míssil mágico funciona exatamente como um ataque a distância,
              mas usando a Rolagem de Conjuração + (X) ao invés de d20 +
              Precisão. O Míssil Mágico causa dano (TIPO). Apesar do nome,
              alguns mísseis mágicos causam dano normal.
            </MobileText>
            <HeaderH3>ÁREAS DE EFEITO (TIPO)</HeaderH3>
            <MobileText>
              Posicione o tipo de área de efeito em algum ponto no alcance da
              magia. Todas as figuras sob a área de efeito são afetadas pela
              magia. Para informações detalhadas sobre todos os tipos de Áreas
              de Efeito, incluindo templates e regras específicas, consulte a
              página dedicada.
            </MobileText>
            <div className="mt-4 mb-6 flex justify-center">
              <button
                onClick={() => navigate("/rules/area-of-effect")}
                className="w-full md:w-1/2 bg-green-900/20 border border-green-500/40 hover:bg-green-800/30 hover:border-green-400/60 text-white px-6 py-3 rounded-lg transition-colors duration-200 font-bold"
              >
                📐 Ver Áreas de Efeito Detalhadas
              </button>
            </div>
            <HeaderH3>LINHA DE VISÃO</HeaderH3>
            <MobileText>
              Pode afetar qualquer figura para qual o conjurador pode traçar de
              visão.
            </MobileText>
            <HeaderH3>ALCANCE (X)</HeaderH3>
            <MobileText>
              A Magia afeta uma figura a até (X)cm do conjurador.
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
            <MobileText>
              Essa magia só pode ter o próprio conjurador como alvo.
            </MobileText>
            <HeaderH3>TOQUE</HeaderH3>
            <MobileText>
              A magia pode afetar o próprio conjurador ou qualquer figura que
              ele esteja em contato de base.
            </MobileText>
            <HeaderH3>ILUSÃO</HeaderH3>
            <MobileText>
              Magias que manipulam a percepção das figuras inimigas.
              Palavra-chave relevante para interagir com efeitos de outras
              magias e habilidades.
            </MobileText>
            <HeaderH3>CONCENTRAÇÃO</HeaderH3>
            <MobileText>
              Essa magia requer que a figura se mantenha concentrando sobre ela.
              Uma figura pode concentrar qualquer número de magias ao mesmo
              tempo, mas apenas uma de cada tipo por vez. Uma figura deve rolar
              um teste de Vontade com CD igual classe de dificuldade da magia
              que está concentrando (chamado de{" "}
              <strong>Teste de Concentração</strong>) no começo de cada uma de
              suas ativações, sempre que sofre dano, adicionando o dano sofrido
              a CD, sempre que recebe um marcador de atordoamento (com a
              penalidade de -2 em rolagens de dado causado pelo marcador de
              atordoamento) e sempre que é movido por uma força externa,
              adicionando a quantidade de centímetros que foi movido a CD. A
              figura faz esse teste nessas condições para cada magia que esteja
              concentrando, e o efeito de magias para qual ele falha o Teste de
              Concentração é cancelado.
            </MobileText>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default MagicRulesPage;
