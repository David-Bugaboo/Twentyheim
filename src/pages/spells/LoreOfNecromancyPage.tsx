import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import SpellCard from "../../components/SpellCard";
import {
  PageContainer,
  ContentSection,
  NavigationSection,
  StyledNavigationButton,
  ContentContainer,
  ParchmentText,
  PowerListTitle,
} from "../../components/PageComponents";

export default function LoreOfNecromancyPage() {
  const navigate = useNavigate();

  const spells = [
    {
      name: "Erguer Mortos-Vivos",
      castingNumber: 8,
      keywords: ["Ritual", " Toque"],
      effect:
        "O conjurador adiciona um crânio animado (+0 na classe de dificuldade), zumbi (+2 na classe de dificuldade), carniçal (+4 na classe de dificuldade) ou espectro (+6 na classe de dificuldade) ao seu bando como membro temporário. Se a magia for conjurada antes do jogo, o morto-vivo pode ser posicinado normalmente. Se for conjurada durante um jogo, o morto-vivo emerge do solo em contato de base com o conjurador. Um bando só pode ter um morto-vivo erguido por essa magia por vez. Se o morto-vivo for destruído ou sair da mesa, Erguer Mortos-Vivos pode ser conjurada novamente para profanar outro cadáver.",
    },
    {
      name: "Evocação de Vanhel",
      castingNumber: 8,
      keywords: ["Linha de Visão"],
      effect:
        " Esta figura ativará no fim da fase atual em vez de em sua fase normal - forçada a agir pela vontade do necromante. Conjuradores não podem conjurar esta magia em si mesmos mesmo se de alguma forma ganhem o traço Morto-Vivo, nem em uma figura que já ativou no turno atual.",
    },
    {
      name: "Edito de Nagash",
      castingNumber: 12,
      keywords: ["Linha de Visão"],
      effect:
        "O necromante pronuncia as palavras proibidas do Grande Necromante, Nagash o Imortal. Estas são palavras de COMANDO ABSOLUTO sobre os mortos - uma linguagem que todos os mortos-vivos compreendem instintivamente, gravada em sua essência no momento de sua criação profana. Não há resistência, não há vontade própria - apenas a OBEDIÊNCIA inscrita em cada osso, cada fragmento de carne morta. A criatura morta-viva sente a autoridade ancestral e sua aliança se quebra como vidro.\n\nA criatura morta-viva alvo deve fazer uma Rolagem de Vontade imediata com Classe de Dificuldade igual à Rolagem de Conjuração. Se a rolagem falhar, a criatura morta-viva é arrancada de seu antigo mestre e torna-se um membro temporário do bando do conjurador. Este controle dura pelo resto do jogo ou até a magia ser cancelada. O conjurador pode gastar uma ação para liberar a criatura. Um conjurador só pode controlar uma criatura morta-viva por vez através desta magia.",
    },
    {
      name: "Construir Filactéria",
      castingNumber: 14,
      keywords: ["Ritual"],
      effect:
        "O necromante deve gastar 50gc em materiais rituais. Este dinheiro é gasto independentemente do sucesso da conjuração.  O necromante que conjure essa magia com sucesso usa rituais profanos e ancestrais para criar um receptáculo de ossos dessecrados, pronto para receber um fragmento de sua alma que ele arranca prontamente. Este receptáculo, chamado de filactéria, é geralmente armazenado em uma cripta ou laboratório do necromante.\n\nEnquanto o necromante possui a filácteria, ele inicia cada jogo com sua vida reduzida em 2 (escreva como estatística dividida). Ele não pode curar além desta estatística efetiva enquanto a filactéria existir, embora possa destruí-lo entre jogos se desejar. Se o necromante for morto durante o teste de sobrevivência pós-jogo, o fragmento da sua alma na filactéria reconstrói seu corpo, como era antes da morte. O necromante não ganha experiência do jogo em que morreu, perde imediatamente 2 níveis e os avanços advindosa deles e sofre uma redução permanente de 2 pontos em sua estatística de Vida real, mas está vivo e livre para participar do próximo jogo (e pode tentar criar outra filactéria).\n\nUma filactéria sempre reconstrói o necromante como no início do primeiro turno do jogo em que ele morreu. Se o necromante entrar em um jogo com uma lesão permanente, será reconstruindo com a mesma lesão. Um necromante com uma filacteria que sofre uma lesão permanente na sequência pós jogo pode escolher cometer suicídio para ativar seu filacteria, permitindo que seu corpo seja reconstruído em um estado anterior à lesão. Se fizer isso, sua Vontade é reduzida em 1 e ele perde mais um nível além das penalidades acima (totalizando -3 níveis, -2 Saúde, -1 Vontade e nenhuma experiência daquele jogo). Um necromante pode possuir quantas filacterias desejar, mas cada uma imporá -2 na saúde máxima.",
    },
    {
      name: "Garra do Túmulo",
      castingNumber: 10,
      keywords: ["Linha de Visão"],
      effect:
        "A figura não pode realizar quaisquer ações de movimento até escapar. Qualquer forma de movimento mágico, exceto a magia Salto, permite que uma figura escape da mão; caso contrário, a única forma de escapar é lutar contra a mão, que tem Ímpeto +0, Vigor 1. Se a mão sofrer um ponto de dano, ela se desintegra. Outras figuras em contato de base podem atacar a mão ou dar um bônus de apoio. Se a mão vencer a luta, ela PUXA, causando dano normalmente. Esta magia só pode ser conjurada contra um alvo que esteja em pé no chão. Criaturas Grandes não são afetadas - muito pesadas para uma única mão. Alcance máximo: 45cm.",
    },
    {
      name: "Compartilhar Alma",
      castingNumber: 10,
      keywords: ["Linha de Visão"],
      effect:
        "Esta magia só pode ser conjurada em uma criatura morta-viva com atributo de Vontade de +2 ou menos que não esteja sob controle de outro Conjurador. Sempre que o alvo desta magia causar dano a uma criatura que não seja morto-vivo, Construto ou daemônio, o conjurador recupera 2 pontos de Vigor - vida roubada através de seu servo. Isto não pode levar o conjurador acima de seu Vigor inicial. Um conjurador pode ter no máximo 2 conjurações ativas por vez. O conjurador pode cancelar uma conjuração como ação gratuita. O conjurador não pode conjurar esta magia em si mesmo, mesmo se ganhar o traço Morto-Vivo.",
    },
    {
      name: "Vortex da Desencarnação",
      castingNumber: 8,
      keywords: ["Alcance(30)", "Área de Efeito(Zona Média)"],
      effect:
        "O conjurador posicionada a Área de Efeito em um ponto alvo. Todas as figuras mortas-vivas nessa área devem rolar um teste de Vontade conta CD igual a rolagem de conjuração dessa magia. Se a figura tem 0 de Will e falhar nesse teste ela é automaticamente reduzida a 0 de Vigor e removida do jogo. Se falha mas tem Vontade maior que 0, toma 3x quanto falhou no teste de dano.",
    },
    {
      name: "Face do Defunto",
      castingNumber: 8,
      keywords: ["Conjurador Apenas"],
      effect:
        "O Conjurador ganha a característica Aterrorizante até o fim do jogo.",
    },
    {
      name: "Rigor Mortis",
      castingNumber: 10,
      keywords: ["Linha de Visão"],
      effect:
        "O alvo recebe +2 Armadura pelo resto do jogo. Isto não pode levar uma figura acima da Armadura 14 (ou seja, figuras com Armadura 13 vão para Armadura 14). Múltiplas conjurações de Rigor Mortis no mesmo alvo não têm efeito.",
    },
    {
      name: "Forma Espectral",
      castingNumber: 10,
      keywords: ["Conjurador Apenas"],
      effect:
        "O conjurador arranca sua alma do corpo e se torna um espectro até o fim do jogo (ou até o início de sua próxima ativação). Ele pode se mover através do terreno como se não estivesse lá e ignora todas as penalidades de movimento do terreno, incluindo escalada. A figura não pode coletar tesouro e deixa cair qualquer tesouro que estivesse carregando. Apenas outra figura etérea pode forçar combate com a figura. A figura ainda luta normalmente, mas só pode causar dano se estiver usando uma arma mágica. A figura é imune a armas não-mágicas. Se um conjurador conjurar esta magia com sucesso novamente no turno seguinte, ele ganha os benefícios acima normalmente, mas automaticamente sofre 5 de dano.",
    },
    {
      name: "Ritual do Despertar",
      castingNumber: 14,
      keywords: ["Ritual"],
      effect: `Escolha qualquer soldado que não seja morto-vivo, construto, animal ou daêmonio que tenha que tenha rolado um resultado de Morto na tabela de sobrevivência após o último jogo contra o bando do conjurador. O soldado revive como um regressado do bando do conjurador. O Regressado tem todas as estatísticas e habilidades do soldado original, exceto sua Vontade que se torna 0. Ele também perde
        seus níveis e avanços de nível e equipamentos mágicos, mas mantem quaisquer items mundanos que tinha ao morrer. O Regressado é um Morto-Vivo, e está sujeito a todas as magias e efeitos que afetam mortos-vivos. Se um Regressado for reduzido a 0 de vida, ele rola sobrevivência normalmente, mas se tiver um resultado de morto, 
        o necromante pode conjurar o Ritual do Despertar novamente para ressuscitar o Regressado, que se levantado dessa forma não perde seus níveis e avanços. Não existe um limite no número de regressados que um bando pode ter
        `,
    },
  ];

  return (
    <PageContainer>
      <Header title="Tradição da Necromancia" />

      <ContentSection>
        <ContentContainer>
          <ParchmentText
            sx={{
              textAlign: "center",
              fontSize: "1.2rem",
              fontStyle: "italic",
              color: "#9ca3af",
              mb: 3,
            }}
          >
            A Arte Negra da Não-Morte
          </ParchmentText>

          <ParchmentText sx={{ mb: 4 }}>
            Necromancia é a arte profana de erguer e comandar os mortos. Aqueles
            que praticam esta tradição sombria podem animar cadáveres, controlar
            guerreiros esqueletos e até roubar a força vital dos vivos para se
            sustentarem. Os Necromantes do Velho Mundo são caçados onde quer que
            sejam encontrados, pois sua própria existência é uma afronta à ordem
            natural. No entanto, o poder que empunham os torna adversários
            formidáveis, comandando legiões de mortos-vivos que não conhecem
            medo e não sentem dor.
          </ParchmentText>

          <PowerListTitle>Feitiços da Tradição da Necromancia</PowerListTitle>

          {spells.map((spell, index) => (
            <SpellCard
              key={index}
              id={spell.name.toLowerCase().replace(/\s+/g, "-")}
              name={spell.name}
              school="Tradição da Necromancia"
              castingNumber={spell.castingNumber}
              keywords={spell.keywords}
              effect={spell.effect}
            />
          ))}
        </ContentContainer>
      </ContentSection>

      <NavigationSection>
        <StyledNavigationButton
          variant="contained"
          onClick={() => navigate("/magic/dark-lores")}
        >
          Voltar para Tradições Sombrias
        </StyledNavigationButton>
      </NavigationSection>
    </PageContainer>
  );
}
