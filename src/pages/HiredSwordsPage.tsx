import PageTitle from "../components/PageTitle";
import MobileText from "../components/MobileText";
import MobileSection from "../components/MobileSection";
import HeaderH1 from "../components/HeaderH1";
import HeaderH2 from "../components/HeaderH2";
import HeaderH3 from "../components/HeaderH3";
import CornerDecoration from "../components/CornerDecoration";
import UnitCard from "../components/UnitCard";
import slugify from "slugify";

const hiredSwords = [
  {
    name: "Mata Trolls Anão",
    role: "Herói",
    stats: {
      move: 4,
      fight: "+4",
      shoot: "0",
      armour: 11,
      will: "+4",
      health: 20,
      cost: "100 coroas",
      upkeep: "nível +10%",
    },
    abilities: [
      {
        name: "Jurado de Morte",
        description:
          "O Mata Trolls anão é Imune a Aterrorizante e tem a característica Mente-Férrea.",
      },
      {
        name: "Fúria Implacável",
        description:
          "No começo de cada uma de suas ativações, o Mata Trolls anão pode fazer um teste de vontade com CD 16. Se tiver sucesso, até o fim de sua ativação ele tem um dentre estes bônus: +4 de movimento, +2 de Ímpeto, +2 de Vontade.",
      },
    ],
  },
  {
    name: "Patrulheiro Asrai",
    stats: {
      move: 7,
      fight: "+2",
      shoot: "+2",
      armour: 9,
      will: "+5",
      health: 12,
      cost: "100 coroas",
      upkeep: "nível +10%",
    },
    abilities: [
      {
        name: "Movimento Gracioso",
        description:
          "Não gasta movimento extra ao se mover através de terreno difícil ou escalar. Pode pular sem movimento inicial. Tem a característica Furtividade(12)",
      },
      {
        name: "Batedor",
        description: `No começo do jogo, depois que todas as figuras foram posicionadas, e a iniciativa rolada, o Patrulheiro Asrai e até 3 figuras em contato de base com ele podem se mover até 8cm. As figuras devem terminar o movimento em contato de base. `,
      },
      {
        name: "Explorador Experiente",
        description: `Um bando com o Patrulheiro Asrai ganha +4 em qualquer rolagem de exploração.`,
      },
      {
        name: "Restrições de Contratação",
        description:
          "Só podem ser contratados por bandos de humanos, homens lagarto, elfos silvanos e altos elfos. Caçadores de tesouro anões podem contratar, mas pagam Nível + 20% de todo lucro obtido como manutenção devido a velhos rancores.",
      },
    ],
  },
  {
    name: "Batedor Nanico",
    stats: {
      move: 8,
      fight: "+0",
      shoot: "+3",
      armour: 9,
      will: "+4",
      health: 8,
      cost: "100 coroas",
      upkeep: "nível +5%",
    },
    abilities: [
      {
        name: "Agilidade dos Minúsculos",
        description:
          "Uma figura só pode fazer um ataque a distância contra um batedor nanico se ele for a figura mais próxima do atirador, ou se estiver em uma posição mais alta. Pode andar antes de atirar sem nenhuma penalidade.",
      },
      {
        name: "Mestre da Furtividade",
        description:
          "O bando do Batedor Nanico ganha +3 nas rolagens de iniciativa.",
      },
      {
        name: "Restrições de Contratação",
        description:
          "Pode ser contratado por qualquer bando que não seja Skaven, Mortos-Vivos, Culto dos Possuídos, e Orcs.",
      },
    ],
  },
  {
    name: "Guarda Costas Ogro",
    stats: {
      move: 5,
      fight: "+4",
      shoot: "0",
      armour: 12,
      will: "+2",
      health: 18,
      cost: "200",
      upkeep: "nível +20%",
    },
    abilities: [
      {
        name: "Besta Treinada",
        description:
          "O guarda-costas ogro tem as características Grande, Forte e Aterrorizante. Um ogro não pode fazer ativações em grupo mesmo com a Maestria do Tenente. Se um ogro não for ativado junto ao Héroi ou Campeão de um bando ele não pode ativar nesse turno.",
      },
      {
        name: "Protetor Poderoso",
        description:
          "O guarda-costas ogro pode interceptar figuras inimigas a até 5cm de distância. Quando um ogro vence uma luta, se houver um héroi ou campeão a até 8cm dele, ele pode empurrar a figura inimiga até 8cm ao invés dos 3cm normais.",
      },
      {
        name: "Restrições de Contratação",
        description:
          "O guarda-costas ogro pode ser contratado por qualquer bando exceto skaven.",
      },
    ],
  },
  {
    name: "Mercador de Araby",
    stats: {
      move: 6,
      fight: "+1",
      shoot: "+0",
      armour: 10,
      will: "+4",
      health: 10,
      cost: "100 coroas",
      upkeep: "nível +10%",
    },
    abilities: [
      {
        name: "Conexões no Mercado Negro",
        description:
          "Depois de cada jogo em que o Mercador de Araby não foi reduzido a 0 de vida, o bando pode rolar 2 dados extras quando fizer suas Rolagens de Mercado Negro. Ele adiciona um bônus de +3 a essas rolagens de dados extras.",
      },
      {
        name: "Mestre do Comércio",
        description: "O bando compra e vende itens com um desconto de 10%.",
      },
      {
        name: "Restrições de Contratação",
        description:
          "O Mercador de Araby pode ser contratado por bandos de mercenários, caçadores de bruxas, caçadores de tesouro anões, elfos silvanos e altos elfos.",
      },
    ],
  },
  {
    name: "Caça-Bestas",
    stats: {
      move: 6,
      fight: "+2",
      shoot: "+2",
      armour: 10,
      will: "+3",
      health: 12,
      cost: "100 coroas",
      upkeep: "nível +10%",
    },
    abilities: [
      {
        name: "Colecionador de Troféus",
        description: `O caçador de bestas ganha +1 de Ímpeto e +1 de Precisão quando lutar ou fizer ataque a distância contra uma criatura com a característica Animal ou Grande. Dobrando o bonus se a criatura 
        tiver ambas as habilidades. Quando o caçador de besas mata uma criatura com essas características, ele ganha 10 de XP e o bando ganha 10 coroas.
       `,
      },
      {
        name: "Armadilheiro",
        description: `O Caça-Bestas posiciona uma Área de Efeito de Armadilha Pequena em contato de base com ele. Ao posicionar a armadilha, a figura pode escolher entre posicionar uma armadilha de poço ou de espetos.
        \n Armadilha de Poço: A figura faz um teste de Movimento CD 28. Se não obtiver sucesso, seu movimento encerra e ela é reduzida a 0 ações.
        \n Armadilha de Espetos: A figura toma um ataque +1.
        \n O Caça-Bestas só pode ter 3 armadilhas montadas por vez. `,
      },
      {
        name: "Restrições de Contratação",
        description:
          "O Caça-Bestas pode ser contratado por qualquer bando que não seja Skaven, Cortes Vampiricas, Horda Orc, e Culto dos Possuídos.",
      },
    ],
  },
  {
    name: "Assassino Mercenário",
    stats: {
      move: 7,
      fight: "+2",
      shoot: "+0",
      armour: 10,
      will: "+4",
      health: 10,
      cost: "100 coroas",
      upkeep: "nível +10%",
    },
    abilities: [
      {
        name: "Laminas Envenenadas",
        description:
          "Se o assassino estiver usando apenas adagas, espadas, arcos, bestas de mão, ou bestas, ele tem a característica Venenoso.",
      },
      {
        name: "Apunhalador pelas Costas",
        description:
          "O assassino imperial tem Furtividade(12). Assassinos Imperials ganham um bonus de +1 em Ímpeto e Precisão sempre que fazem ataques com uma figura que também esteja em combate com outra figura.",
      },

      {
        name: "Restriçòes de Contratação",
        description:
          "O Assassino Mercenário pode ser contratado por qualquer bando que não seja Caçadores de Bruxas, Irmãs de Sigmar, Horda Orc, e Skaven.",
      },
    ],
  },
  {
    name: "Atirador Tileano",
    stats: {
      move: 6,
      fight: "2",
      shoot: "+2",
      armour: 10,
      will: "+3",
      health: 12,
      cost: "100coroas",
      upkeep: "nível +10%",
    },
    abilities: [
      {
        name: "Tiro Entre os Olhos",
        description: `Qualquer figura que receber um ataque a distância de um Atirador Tileano, cuja rolagem de ataque foi 18,19 ou 20 recebe um marcador de Atordoamento.`,
      },
      {
        name: "Mergulho da Gaivota",
        description: `O Atirador Tileano tem +2 de Precisão quando atirando de uma elevação maior que seu alvo.`,
      },
      {
        name: "Restrições de Contratação",
        description:
          "Pode ser contratado por qualquer bando exceto Skaven, Horda Orc e Cortes Vampíricas.",
      },
    ],
  },
  {
    name: "Bardo",
    stats: {
      move: 6,
      fight: "+2",
      shoot: "0",
      armour: 10,
      will: "+4",
      health: 12,
      cost: "100 coroas",
      upkeep: "nível +10%",
    },
    abilities: [
      {
        name: "Performance Inspiradora",
        description: `Todas as figuras dentro de 20cm do Bardo e em linha de visão dele ganham um bônus de +1 de Vontade. Um bardo só tem 3 espaços de items, e deve sempre carregar sua ferramenta artística em uma das mãos.`,
      },
      {
        name: "Fãs em todos os lugares",
        description: `O bando que tem um bardo pode rerolar um dado quando faz Rolagens de Mercado Negro.`,
      },
      {
        name: "Restrições de Contratação",
        description:
          "Pode ser contratado por qualquer bando que não seja Skaven, Orcs, Cortes Vampíricas, Culto dos Possuídos e Saqueadores Homem Besta.",
      },
    ],
  },
  {
    name: "Caçador de Recompensas",
    stats: {
      move: 6,
      fight: "+3",
      shoot: "+1",
      armour: 10,
      will: "+3",
      health: 14,
      cost: "100 coroas",
      upkeep: "nível +10%",
    },
    abilities: [
      {
        name: "Rastreador de Procurados",
        description: `No começo de cada jogo, antes das figuras serem posicionadas, o Caçador de Recompensas escolhe uma figura do bando inimigo. O caçador de recompensas ganha +2 de Movimento e +1 de Ímpeto e Precisão para declarar cargas ou atacar aquela figura. A figura escolhida ganha a característica recompensa(seu valor em coroas), mas sempre considera-se que sobrevive com um resultade de "Recuperação Completa" na tabela de sobrevivência.`,
      },
      {
        name: "Restrições de Contratação",
        description:
          "O Caçador de Recompensas pode ser contratado por qualquer bando que não seja Skaven, Horda Orc, Culto dos Possuídos e Saqueadores Homem Besta.",
      },
    ],
  },
];

function HiredSwordsPage() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <CornerDecoration />
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <MobileSection>
            <PageTitle>Mercenários de Mordheim</PageTitle>

            <MobileText
              variant="quote"
              className="text-center italic text-lg leading-relaxed mb-6 p-4 bg-[#2a1f1f] border border-[#382929] rounded-lg"
            >
              "O ouro compra espadas, mas não pode comprar lealdade. Estes
              mercenários vêm e vão como sombras, lutando por quem paga mais.
              Hoje eles estão ao seu lado. Amanhã? Quem sabe."
              <br />
              <span className="text-sm text-[#d4af37] mt-2 block">
                — Capitão Hermann Todbringer, Mercenários de Reikland
              </span>
            </MobileText>

            <MobileText>
              A Cidade Amaldiçoada atrai guerreiros de todo o Velho Mundo.
              Mercenários, párias e caçadores de fortuna vêm em busca de ouro,
              glória ou redenção nas ruas amaldiçoadas de Mordheim. Estes
              Mercenários lutam por moedas ao invés de convicção, sua lealdade
              durando apenas enquanto o ouro continuar fluindo.
            </MobileText>

            <HeaderH1>Regras dos Mercenários</HeaderH1>

            <HeaderH2>Requisitos de Espaços no Bando</HeaderH2>
            <MobileText>
              Mercenários são guerreiros profissionais que ocupam espaço valioso
              na hierarquia do seu bando.
            </MobileText>

            <HeaderH3>Regras de Espaços de Especialista:</HeaderH3>
            <MobileText>
              • <strong>Mercenários</strong> ocupam{" "}
              <strong>um espaço de Especialista</strong> no seu bando e contam
              como um modelo
              <br />• <strong>Dramatis Personae</strong> ocupam{" "}
              <strong>dois espaços de Especialista</strong>, mas ainda contam
              como apenas um modelo para o limite de 10 modelos do bando
              <br />• Ambos contam contra o limite de especialistas do seu bando
              e total de modelos
            </MobileText>

            <HeaderH2>Processo de Contratação</HeaderH2>
            <MobileText>
              Mercenários podem ser recrutados se um bando os encontrar através
              de eventos de exploração.
            </MobileText>

            <HeaderH3>Passos da Contratação:</HeaderH3>
            <MobileText>
              • <strong>Cumprir Condições de Contratação:</strong> Seu bando
              deve cumprir quaisquer condições específicas listadas para esse
              indivíduo (alinhamento, tipo de bando, desafios especiais, etc.)
              <br />• <strong>Pagar o Custo de Contratação:</strong> Se as
              condições forem atendidas, você pode imediatamente pagar o custo
              de contratação listado no cartão do Mercenário para recrutá-lo
              <br />• <strong>Adicionar ao Bando:</strong> O novo recruta se
              junta ao seu bando imediatamente e pode ser usado no seu próximo
              jogo
              <br />• <strong>Restrições de Contratação:</strong> Cada
              Mercenário lista quais bandos podem contratá-los. Alguns podem não
              trabalhar com certas facções devido a tensões raciais, conflitos
              morais, ou outras razões
            </MobileText>

            <HeaderH2>Custos de Manutenção</HeaderH2>
            <MobileText>
              Diferentemente de guerreiros regulares, Mercenários exigem
              pagamento por seus serviços contínuos. Eles são mercenários em
              primeiro lugar, e sairão se o pagamento não for atendido.
            </MobileText>

            <HeaderH3>Pagar Manutenção:</HeaderH3>
            <MobileText>
              • A manutenção deve ser paga <strong>entre cada jogo</strong>{" "}
              (durante a fase pós-jogo antes da próxima batalha)
              <br />• O custo de manutenção está listado no cartão de cada
              Mercenário (exemplo: "10% manutenção" significa 10% do custo de
              contratação, arredondado para cima)
              <br />• Se você não puder ou escolher não pagar a manutenção, o
              Mercenário <strong>deixa seu bando permanentemente</strong>
              <br />• Alguns indivíduos podem aceitar pagamento alternativo
              (Pedra-Bruxa, Sombra Carmesim, itens mágicos, etc.) como notado em
              suas habilidades
              <br />• A manutenção representa pagamento, subornos, manutenção de
              equipamentos, e outros custos de manter um mercenário satisfeito
            </MobileText>

            <HeaderH2>Experiência e Progressão</HeaderH2>
            <MobileText>
              Mercenários já são guerreiros experientes no auge de suas
              habilidades. Diferentemente de membros regulares do bando, eles
              não crescem ou aprendem através da batalha.
            </MobileText>

            <HeaderH3>Restrições de Progressão:</HeaderH3>
            <MobileText>
              • Mercenários <strong>não podem ganhar experiência</strong> de
              batalhas
              <br />• Eles <strong>
                não podem aprender novas habilidades
              </strong>{" "}
              ou aumentar suas características
              <br />• Eles chegam totalmente treinados e saem da mesma forma
              <br />• Suas habilidades e estatísticas são fixas e não podem ser
              modificadas (exceto por efeitos temporários durante a batalha)
              <br />• Isso é balanceado por sua disponibilidade imediata e alto
              nível de habilidade
            </MobileText>

            <HeaderH2>Disponibilidade</HeaderH2>
            <MobileText>
              Diferentemente dos Dramatis Personae (indivíduos únicos nomeados),
              Mercenários representam tipos de mercenários ao invés de
              indivíduos específicos.
            </MobileText>

            <HeaderH3>Regras de Múltiplas Contratações:</HeaderH3>
            <MobileText>
              •{" "}
              <strong>
                O mesmo tipo de Mercenário pode servir múltiplos bandos
              </strong>{" "}
              simultaneamente
              <br />• Não há exclusividade — se você contratar um "Mata Trolls
              Anão," outro jogador também pode contratar um Mata Trolls Anão
              diferente
              <br />• Cada um representa um indivíduo diferente dessa profissão,
              não uma pessoa única
              <br />• Isso é diferente dos Dramatis Personae, que são indivíduos
              únicos e podem servir apenas um bando por vez
            </MobileText>

            <MobileText className="italic text-[#c4a870]">
              Exemplo: Seu bando contratou um "Patrulheiro Élfico" — isso
              representa um dos muitos patrulheiros élficos vagando por
              Mordheim. Outro jogador também pode contratar um Patrulheiro
              Élfico; estes são diferentes indivíduos com a mesma profissão e
              treinamento.
            </MobileText>

            <HeaderH1>Mercenários Disponíveis</HeaderH1>

            {hiredSwords.map((unit) => (
              <div
                key={slugify(unit.name, { lower: true })}
                id={slugify(unit.name, { lower: true })}
              >
                <UnitCard
                  name={unit.name}
                  stats={unit.stats}
                  abilities={unit.abilities}
                />
              </div>
            ))}
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default HiredSwordsPage;
