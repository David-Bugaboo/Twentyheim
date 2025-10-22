import PageTitle from "../../components/PageTitle";
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";
import HeaderH1 from "../../components/HeaderH1";
import HeaderH2 from "../../components/HeaderH2";
import HeaderH3 from "../../components/HeaderH3";
import WarningBox from "../../components/WarningBox";
import GenericTable from "../../components/GenericTable";
import CornerDecoration from "../../components/CornerDecoration";
import HeaderH4 from "../../components/HeaderH4";

function PostGamePage() {
  // Dados para tabelas
  const soldierSurvivalData = [
    { "Die Roll": "1-4", Result: "Morto" },
    { "Die Roll": "5-8", Result: "Gravemente Ferido" },
    { "Die Roll": "9+", Result: "Recuperação Completa" },
  ];

  const leaderSurvivalData = [
    { "Die Roll": "1-2", Result: "Morto" },
    { "Die Roll": "3-4", Result: "Ferimento Permanente" },
    { "Die Roll": "5-6", Result: "Gravemente Ferido" },
    { "Die Roll": "7-8", Result: "Por Um Triz" },
    { "Die Roll": "9+", Result: "Recuperação Completa" },
  ];

  const permanentInjuriesData = [
    { "Die Roll": "1-2", Injury: "Dedos Arrancados" },
    { "Die Roll": "3-6", Injury: "Perna Esmagada" },
    { "Die Roll": "7-10", Injury: "Braço Esmagado" },
    { "Die Roll": "11-12", Injury: "Dedos Arrancados" },
    { "Die Roll": "13-14", Injury: "Danos Internos" },
    { "Die Roll": "15-16", Injury: "Trauma" },
    {
      "Die Roll": "17-18",
      Injury: "Chaga Aberta",
    },
    { "Die Roll": "19", Injury: "Mandíbula Esmagada" },
    { "Die Roll": "20", Injury: "Caolho" },
  ];

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <CornerDecoration />
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <MobileSection>
            <PageTitle>A Campanha</PageTitle>
            <MobileText>
              Mordheim não é travada em uma única tarde de sangue. É uma série
              de batalhas, cada uma deixando cicatrizes, cada uma forjando
              lendas ou criando cadáveres. Uma campanha é a crônica do seu bando
              — de seus primeiros passos hesitantes nas ruínas até sua glória
              eventual... ou extinção inevitável.
            </MobileText>
            <HeaderH1>Sequência Pós Jogo</HeaderH1>
            <MobileText>
              A batalha acabou. Os mortos jazem onde caíram. Os sobreviventes
              arrastam-se de volta aos acampamentos improvisados, sangrando,
              exaustos, mas vivos. Agora vem a parte que muitos esquecem: a
              contabilidade da carnificina. Quem sobreviveu? Quem morreu? O que
              foi ganho? O que foi perdido? Esta é a{" "}
              <strong>Sequência Pós Jogo</strong> — onde batalhas se tornam
              história, e história se torna lenda... ou esquecimento.
            </MobileText>
            <HeaderH2>1. Ferimentos e Morte</HeaderH2>
            <MobileText>
              Para cada modelo que foi reduzido a 0 de Vigor durante o jogo,
              existe a possibilidade de que aquele modelo sofra ferimentos
              permanentes ou morra. Em Mordheim, cair não significa
              necessariamente morte — às vezes significa algo pior.
            </MobileText>
            <HeaderH3>Sobrevivência de Soldados</HeaderH3>
            <MobileText>
              Soldados que foram reduzidos a 0 de vida rolam na tabela de
              sobrevivência do soldado:
            </MobileText>
            <GenericTable data={soldierSurvivalData} scrollable={false} />
            <MobileText>
              <strong>MORTO:</strong> O soldado foi morto e deve ser removido da
              ficha do bando. Qualquer item que este soldado carregava é
              perdido.
            </MobileText>
            <MobileText>
              <strong>GRAVEMENTE FERIDO:</strong> O soldado está ferido. Ele
              podem permanecer no bando, mas não pode participar do próximo jogo
              enquanto estão se recuperando de seus ferimentos. Após esse jogo
              jogo, eles retorna para o próximo jogo com saúde completa.
            </MobileText>
            <MobileText>
              <strong>RECUPERAÇÃO COMPLETA:</strong> O soldado se recupera
              rapidamente de seu sofrimento e retornará para o próximo jogo com
              saúde completa.
            </MobileText>
            <HeaderH3>Sobrevivência de Heróis e Campeões</HeaderH3>
            <MobileText>
              Heróis e campeões rolam na tabela de sobrevivência de líder:
            </MobileText>
            <GenericTable data={leaderSurvivalData} scrollable={false} />
            <MobileText>
              <strong>MORTO:</strong> A figura não sobrevive aos seus
              ferimentos. Veja a seção sobre recrutar novos membros do bando em
              'Gastando Tesouro' para o que fazer quando seu mago ou aprendiz
              morre.
            </MobileText>
            <MobileText>
              <strong>FERIMENTO PERMANENTE:</strong> A figura sofre um ferimento
              que nunca cicatriza completamente. Role na tabela de ferimentos
              permanentes abaixo para determinar a natureza exata do ferimento.
              Caso contrário, a figura retorna para o próximo jogo com saúde
              completa.
            </MobileText>
            <MobileText>
              <strong>GRAVEMENTE FERIDO:</strong> A figura recebeu um ferimento
              maior que levará tempo para curar. O jogador tem uma escolha. Eles
              pode jogar o próximo jogo sem a figura ferida, ou pode pagar 150
              coroas por tratamento médico. Se o bando não tiver o valor
              apropriado, ele pode entrar em dívida para pagar esta taxa.
              Entretanto, o bando não pode gastar nenhuma quantidade de coroas
              até que esta dívida seja paga completamente.
            </MobileText>
            <MobileText>
              <strong>ROUBADO:</strong> A figura escapa sem ferimento maior, mas
              perde todos os itens que estava carregando.
            </MobileText>
            <MobileText>
              <strong>RECUPERAÇÃO COMPLETA:</strong> Os ferimentos da figura
              provaram ser relativamente menores, e ela retorna com força total
              no próximo jogo.
            </MobileText>
            <HeaderH3>Registrando Ferimentos Permanentes</HeaderH3>
            <MobileText>
              Quando um modelo sofre um ferimento permanente, role um d20 e
              consulte a tabela abaixo:
            </MobileText>
            <GenericTable data={permanentInjuriesData} scrollable={false} />
            <HeaderH3>Descrições dos Ferimentos Permanentes</HeaderH3>
            <MobileText>
              <strong>DEDOS ARRANCADOS:</strong> As lâminas foram precisas — ou
              cruéis. Onde antes havia carne viva e movimento, restam tocos
              inchados e o eco de uma dor fantasma. A figura nunca mais manejará
              uma arma de arremesso com a mesma precisão; os deuses zombam
              daqueles que tentam puxar um gatilho sem dedos. -1 permanente em
              BS. Pode ser recebido duas vezes (-2 BS). Re-rolar resultados
              adicionais.
            </MobileText>
            <MobileText>
              <strong>ALEIJADO:</strong> Os ossos da perna foram esmagados por
              martelos de guerra ou pelas garras de criaturas monstruosas. A
              figura manca permanentemente, arrastando a perna ferida pelas
              ruínas. Ela sofre uma penalidade permanente de -4 em Movimento.
              Este ferimento pode ser recebido duas vezes, com efeito cumulativo
              de -8 em Movimento. Qualquer resultado adicional de Perna Esmagada
              deve ser re-rolado.
            </MobileText>
            <MobileText>
              <strong>JOÃO SEM BRAÇO:</strong> O golpe quebrou ossos e
              esperança. O membro balança inerte, frio, sem resposta — um peso
              morto preso a um corpo que se recusa a morrer. Mesmo levantar uma
              lâmina agora é um ato de penitência. -1 permanente em WS. Pode ser
              recebido duas vezes (-2 WS). Re-rolar resultados adicionais.
            </MobileText>
            <MobileText>
              <strong>INTESTINOS SOLTOS:</strong> A lâmina entrou fundo demais —
              e saiu levando parte de quem você era. O ventre nunca se fechou
              por completo; às vezes, na pressa da batalha, a figura precisa
              empurrar as vísceras de volta com a própria mão. O cheiro de
              sangue velho e bile a acompanha como um cão fiel, e cada movimento
              parece ameaçar abrir novamente o que nunca cicatrizou. -1
              permanente em Vida. Pode ser recebido duas vezes (-2 Vida).
              Re-rolar resultados adicionais.
            </MobileText>
            <MobileText>
              <strong>TRAUMA:</strong> Há coisas em Mordheim que não podem ser
              esquecidas. O olhar da figura perdeu o foco humano, como se visse
              algo além do mundo dos vivos. Às vezes fala sozinha. Às vezes com
              alguém que não está lá. -1 permanente em Vontade. Pode ser
              recebido duas vezes (-2 Vontade). Re-rolar resultados adicionais.
            </MobileText>
            <MobileText>
              <strong>FERIMENTO INFECTADO:</strong> A carne apodrece ao redor da
              ferida, inchada e pútrida. Vermes se aninham sob a pele, e o fedor
              anuncia a presença da morte antes que ela chegue. Os curandeiros
              chamam de “febre da ruína”, e poucos sobrevivem tempo o bastante
              para dar um segundo nome a ela. Sem cuidados constantes — ou algum
              pacto sombrio — o corpo se consome lentamente. Deve gastar 30
              coroas antes de cada jogo em remédios, sangrias ou encantamentos
              menores, ou começar cada jogo com -3 de Vida. Se for recebida
              novamente, o custo sobe para 40 coroas e a penalidade para -4 de
              Vida. Re-rolar resultados adicionais.
            </MobileText>
            <MobileText>
              <strong>CARA RACHADA:</strong>O golpe partiu o rosto como argila
              seca. Dentes viraram fragmentos, ossos se fundiram em ângulos
              impossíveis, e o simples ato de falar é uma tortura de estalos e
              sangue. A voz da figura tornou-se um murmúrio arrastado e grotesco
              — poucos a entendem, e menos ainda a obedecem. Sempre que esta
              figura ativa, ela pode ativar no máximo dois soldados junto de si
              (em vez dos três normais). Se este ferimento for recebido uma
              segunda vez, o número de soldados que podem ser ativados junto ao
              ferido é reduzido para um. Qualquer resultado adicional de
              Mandíbula Esmigalhada deve ser re-rolado.
            </MobileText>
            <MobileText>
              <strong>CAOLHO:</strong> Um dos olhos foi arrancado, esmagado ou
              queimado. O mundo agora é metade sombra, metade ameaça. Os tiros
              vêm de todos os lados, e o inimigo parece sempre mais rápido.
              Efeito: Sofre -1 em rolagens de combate sempre que é alvo de
              ataques à distância. Se receber este ferimento duas vezes, a
              figura fica cega e deve ser retirada permanentemente (conta como
              morta).
            </MobileText>
            <MobileText>
              <strong>Nota:</strong> Ferimentos permanentes são cumulativos. Um
              modelo pode ter múltiplos ferimentos, cada um com seus próprios
              efeitos. Em Mordheim, sobreviver não é sempre uma benção.
            </MobileText>
            <HeaderH2>2. Rituais</HeaderH2>
            <MobileText>
              Magias com a tag RITUAL e poderes com a palavra-chave OFÍCIO tem
              efeitos que se estendem para além das batalhas. Estes efeitos são
              aplicados durante a sequência pós-jogo, podendo afetar a
              recuperação, o crescimento, ou o destino do bando. Conjure a magia
              ou ative o poder como normal, sem consequencias para a falha, mas
              sem poder forçar para melhorar a rolagem. Uma figura pode tentar
              ativar cada magia ou poder com as palavras-chave adequadas uma vez
              apenas.
            </MobileText>
            <HeaderH2>3. Enviar Líderes às Ruínas</HeaderH2>
            <MobileText>
              Heróis e campeões podem ser enviados para explorar as ruínas de
              Mordheim em busca de tesouros, conhecimento, ou poder. Esta é uma
              atividade arriscada, mas potencialmente recompensadora.
            </MobileText>
            <HeaderH3>Quem pode explorar</HeaderH3>
            <MobileText>
              Apenas heróis e campeões podem explorar as ruínas de Mordheim. Não
              que o resto do bando fique bebendo e raparigando enquanto os seus
              líderes se matam nas ruinas: Eles estão explorando junto, como
              suporte aos seus superiores.
            </MobileText>
            <HeaderH3>Atividades de Exploração</HeaderH3>
            <HeaderH4>Adentrar as Ruínas</HeaderH4>
            <MobileText>
              Se enviar seu héroi ou campeão para tentar a sorte nas ruínas,
              jogue um d20, e consulte a tabela de eventos na página Eventos de
              Exploração e confira que destino aguarda seu estimado líder. Caso
              envia ambos os líderes do bando, role 1d20 adicional e some o
              resultado ao primeiro. A tabela tem resultados de 1-40, garantindo
              que as melhores probabilidades só acontençam se ambos sairem rumo
              a cidade.
            </MobileText>
            <HeaderH4>Procurar no Mercado Negro</HeaderH4>
            <MobileText>
              Para cada um dos lideres enviada para essa atividade, role 4d20 e
              anote os resultados. Compare então com a{" "}
              <strong>Tabela de Saque</strong>, ignorando quaisquer resultados
              que forneça apenas coroas. Role nas subtabelas adequadas para cada
              resultado possível. Essa rolagem é chamada de{" "}
              <strong>Rolagem de Mercado Negro</strong>. Os items que forem
              rolados dessa forma podem ser comprados durante a fase de Gastar
              Coroas. Se uma rolagem indicar um item + uma quantidade de coroas,
              o item que for rolado nas subtabelas pode ser comprado com aquele
              valor em desconto.
            </MobileText>
            <HeaderH4>Vender Pedra-Bruxa e Items Mágicos</HeaderH4>
            <MobileText>
              Em um lugar arrasado como a cidade dos condenados, encontrar
              compradores com dinheiro suficiente para aliviar seus cofres de
              toda aquela pedra-bruxa ou reliquias que você recolheu dos mortos
              não é nada fácil. Se o jogador enviar o Héroi ou Campeão nessa
              atividade de exploração, ele pode vender qualquer numero de
              fragmentos de pedra-bruxa e items mágicos. Para cada fragmento
              vendido, role na
              <strong>Tabela de Saque</strong>, visto que o valor da pedra
              flutua absurdamente de acordo com os estranhos rumores que surgem
              sob seus efeitos. Role nas subtabelas adequadas se preciso. Seu
              bando ganha todos aqueles items, e pode vender ainda nessa
              atividade de exploração. Para cada item mágico vendido, ganhe
              metade do valor daquele item em coroas, arredondado para cima
              sempre. Enviar ambos os líderes nessa atividade de exploração não
              tem efeitos adicionais.
            </MobileText>
            <HeaderH2>4. Experiência e Nível</HeaderH2>
            <MobileText>
              Após cada batalha, os membros do bando ganham experiência baseada
              em suas ações e sobrevivência. Esta experiência pode ser usada
              para melhorar suas habilidades e capacidades.
            </MobileText>
            <HeaderH3>Experiência de Heróis</HeaderH3>
            <MobileText>
              Heróis ganham experiência em um ritmo elevado, e tem um potencial
              imenso, podendo subir até o nível 40.
            </MobileText>
            <MobileText>
              • <strong>Sobreviver à batalha:</strong> +60 EXP
              <br />• <strong>Matar um inimigo:</strong> +5 EXP POR INIMIGO
              <br />• <strong>Conjurar magias com sucesso:</strong> +10XP POR
              MAGIA ATÉ UM LIMITE DE 50XP
              <br />•{" "}
              <strong>Falhar em conjurar uma magia e receber dano:</strong> +5XP
              POR MAGIA ATÉ UM LIMITE DE 50XP
              <br />•{" "}
              <strong>
                Cada fragmento de pedra-bruxa capturada pelo héroi ou seu bando:
              </strong>{" "}
              +40XP pontos para cada fragmento capturado
              <br />•{" "}
              <strong>
                Criaturas não controladas reduzidas a 0 de vida pelo héroi ou
                soldados ativados junto a ele:
              </strong>{" "}
              +10XP pontos
            </MobileText>
            <HeaderH3>Experiência de Campeões</HeaderH3>
            <MobileText>
              Campeões ganham experiência de forma similar aos heróis, mas de
              forma um pouco mais lenta. Eles só podem subir até o nivel 20.
            </MobileText>
            • <strong>Sobreviver à batalha:</strong> +40 EXP
            <br />• <strong>Matar um inimigo:</strong> +5 EXP POR INIMIGO
            <br />• <strong>Conjurar magias com sucesso (CD 6+):</strong> +5XP
            POR MAGIA ATÉ UM LIMITE DE 50XP
            <br />•{" "}
            <strong>
              Cada fragmento de pedra-bruxa capturada pelo campeão ou seu bando:
            </strong>{" "}
            +20XP pontos para cada fragmento capturado
            <br />•{" "}
            <strong>
              Criaturas não controladas reduzidas a 0 de vida pelo héroi ou
              soldados ativados junto a ele:
            </strong>{" "}
            +5XP pontos
            <br />•{" "}
            <strong>
              Héroi ou Bando capturaram o Fragmento de Pedra-Bruxa central:
            </strong>{" "}
            +60XP
            <HeaderH3>Experiência de Soldados</HeaderH3>
            <MobileText>
              Soldados ganham experiência mais lentamente, e só podem subir até
              o nivel 10.
            </MobileText>
            <MobileText>
              • <strong>Sobreviver à batalha:</strong> +30 XP
              <br />• <strong>Matar um inimigo:</strong> +5XP por inimigo, +10
              bônus se matar um héroi ou campeão inimigo.
              <br />• <strong>
                Capturar um fragmento de pedra-bruxa:
              </strong>{" "}
              +30XP para cada fragmento capturado
              <br />•{" "}
              <strong>Capturar o fragmento de pedra-bruxa central:</strong>{" "}
              +40XP
            </MobileText>
            <WarningBox title="Limite de Experiência" type="info">
              <MobileText>
                Hérois e Campeões não podem ganhar mais do que 300XP por
                partida. Soldados não podem ganhar mais que 100XP por partida.
              </MobileText>
            </WarningBox>
            <HeaderH3>Subir de Nível</HeaderH3>
            <MobileText>
              Quando uma figura acumula 100 pontos de experiência ela pode subir
              de nível! note que uma figura só pode subir de nível qualquer
              quantidade vezes que sua experiência acumulada permita. Ao
              escolher subir de nível a figura deve rolar na tabela de avanço
              abaixo para determinar o que vai ganhar pelo seu novo nível. As
              experiências nas vielas sinuosas da cidade dos condenados moldam
              seu bando de formas que você não pode prever...
            </MobileText>
            <HeaderH4>Tabela de Avanço de Hérois e Campeões</HeaderH4>
            <MobileText>Role 1d20 e consulte a tabela abaixo:</MobileText>
            <GenericTable
              data={[
                {
                  "Rolagem de Dado": "1-8",
                  Resultado:
                    "Novo Poder, Nova Magia ou Melhorar CD de Poder ou Magia.",
                },
                { "Rolagem de Dado": "9-10", Resultado: "+1 Ímpeto" },
                { "Rolagem de Dado": "11-12", Resultado: "+1 Precisão" },
                { "Rolagem de Dado": "13-14", Resultado: "+2 de Vida" },
                { "Rolagem de Dado": "15-16", Resultado: "+2 de Movimento" },
                { "Rolagem de Dado": "17-18", Resultado: "+1 Vontade" },
                {
                  "Rolagem de Dado": "19-20",
                  Resultado:
                    "Novo Poder, Nova Magia ou Melhorar CD de Poder ou Magia.",
                },
              ]}
              scrollable={false}
            />
            <MobileText>
              <HeaderH4>Tabela de Avanço de Soldados</HeaderH4>
              <MobileText>Role 1d20 e consulte a tabela abaixo:</MobileText>
              <GenericTable
                data={[
                  { "Rolagem de Dado": "1-6", Resultado: "+1 Ímpeto" },
                  { "Rolagem de Dado": "7-8", Resultado: "+1 Precisão" },
                  { "Rolagem de Dado": "9-12", Resultado: "+2 de Movimento" },
                  { "Rolagem de Dado": "13-14", Resultado: "+2 de Vida" },
                  { "Rolagem de Dado": "15-16", Resultado: "+1 Vontade" },
                  {
                    "Rolagem de Dado": "17-20",
                    Resultado: "O rapaz tem talento!",
                  },
                ]}
                scrollable={false}
              />
            </MobileText>
            <HeaderH4>Aumento de Atributo</HeaderH4>
            <MobileText>
              Aumente seu atributo indicado no valor indicado. Note que cada
              raça tem limites de aumento de atributo que devem ser respeitados.
              Caso uma figura role em um atributo que já tenha chegado ao limite
              racial, rerole o resultado.
            </MobileText>
            <HeaderH4>Aprender nova Magia</HeaderH4>
            <MobileText>
              Aprenda uma nova magia das Tradições disponíveis para o
              conjurador. Se for a tradição principal do conjurador apenas
              adicione a magia a ficha do personagem. Caso seja uma tradição
              associada, adicione a magia com CD +4.
            </MobileText>
            <HeaderH4>Melhorar CD de Magia</HeaderH4>
            <MobileText>
              Diminua o CD de uma das magias aprendidas pelo conjurador em 1. O
              conjurador não pode melhorar o CD de uma magia que aprendeu nessa
              mesma sequência pós-jogo.
            </MobileText>
            <HeaderH4>Aprender novo Poder</HeaderH4>
            <MobileText>
              Aprenda um novo poder da lista de poderes da figura. O poder é
              aprendido com CD 7.
            </MobileText>
            <HeaderH4>Melhorar CD de Poder</HeaderH4>
            <MobileText>
              Diminua o CD de um dos poderes aprendidos pela figura. O
              conjurador não pode melhorar o CD de um poder que aprendeu nessa
              mesma sequência pós-jogo.
            </MobileText>
            <HeaderH4>O Rapaz tem Talento!</HeaderH4>
            <MobileText>
              O soldado aprende uma Maestria de Combate! Embora não tenham
              rolagem de ativação, custos ou gasto de vida, eles só podem ser
              usados uma vez por jogo.
            </MobileText>
            <HeaderH4>Tabela de Maestrias de Combate</HeaderH4>
            <GenericTable
              data={[
                {
                  Maestria: "Maestria da Fúria",
                  Efeito: "+3 Ímpeto para um ataque",
                  "Quando Declarar":
                    "Antes das rolagens serem feitas serem feitas em uma luta",
                },
                {
                  Maestria: "Maestria de Ripostar",
                  Efeito: "+1 Ímpeto para um ataque",
                  "Quando Declarar":
                    "Depois das rolagens serem feitas em uma luta.",
                },
                {
                  Maestria: "Maestria do Carrasco",
                  Efeito:
                    "+2 Dano para qualquer ataque corpo a corpo que causou pelo menos 1 ponto de dano",
                  "Quando Declarar":
                    "Depois do dano de um ataque corpo a corpo ser calculado",
                },
                {
                  Maestria: "Maestria do Sentinela",
                  Efeito: "+3 Precisão para um ataque",
                  "Quando Declarar":
                    "Antes das rolagens de ataque a distância serem feitas",
                },
                {
                  Maestria: "Maestria do Caçador",
                  Efeito: "+1 Precisão para um ataque",
                  "Quando Declarar":
                    "Depois das rolagens de ataque a distância serem feitas",
                },
                {
                  Maestria: "Maestria do Lanceiro",
                  Efeito: "+3 Armadura para um ataque",
                  "Quando Declarar":
                    "Antes das rolagens de ataque corpo a corpo serem feitas",
                },
                {
                  Maestria: "Maestria da Esquiva",
                  Efeito: "+1 Armadura para um ataque",
                  "Quando Declarar":
                    "Depois das rolagens de ataque corpo a corpo serem feitas",
                },
                {
                  Maestria: "Maestria da Coragem",
                  Efeito: "+4 Vontade para uma rolagem de Vontade",
                  "Quando Declarar": "Antes da rolagem de Vontade ser feita",
                },
                {
                  Maestria: "Maestria da Frieza",
                  Efeito: "+2 Vontade para uma rolagem de Vontade",
                  "Quando Declarar": "Depois da rolagem de Vontade ser feita",
                },
                {
                  Maestria: "Maestria do Batedor",
                  Efeito: "+4 Movimento pelo resto do turno",
                  "Quando Declarar": "Na ativação do soldado.",
                },
                {
                  Maestria: "Maestria do Tenente",
                  Efeito:
                    "Pode ativar até 3 soldados a 8cm junto a si, como um Héroi ou Campeão. Pode declarar ativações em grupo.",
                  "Quando Declarar": "Na ativação do soldado.",
                },
              ]}
              scrollable={false}
            />
            <HeaderH2>5. Gastando Coroas</HeaderH2>
            <MobileText>
              Se você enviou um héroi ou campeão para vender seus fragmentos de
              pedra-bruxa, ou um deles conseguiu um bom saque explorando as
              ruínas, esse é o momento de gastar suas coroas.
            </MobileText>
            <HeaderH3>Rearmar-se</HeaderH3>
            <MobileText>
              Quaisquer número de items comuns podem ser comprados pelos seus
              custos normais. Se o jogador não tiver uma <strong>Base</strong>,
              não tem onde armazenar items que não possam ser carregados por
              algum membro do bando.
            </MobileText>
            <HeaderH3>Comprar Itens Mágicos</HeaderH3>
            <MobileText>
              Se o jogador tiver enviado seu héroi, campeão ou ambos para
              procurar itens mágicos no mercado negro, ele pode comprar os items
              rolados nesse evento de exploração, com os descontos descritos nas
              regras do evento.Se o jogador não tiver uma <strong>Base</strong>,
              não tem onde armazenar items que não possam ser carregados por
              algum membro do bando.
            </MobileText>
            <HeaderH3>Repor Héroi</HeaderH3>
            <MobileText>
              Se o Héroi do bando morreu durante a fase de ferimentos, ele é
              reposto gratuitamente. As figuras que encabeçam sua facção não
              estão interessadas no fim do seu bando e mandam uma nova figura
              para liderar esse bando de renegados. O Héroi chega no mesmo nível
              do héroi anterior, e o jogador deve rolar os avanços para cada
              nível além do primeiro, e escolher poderes magias e afins, e então
              gastar coroas para equipá-lo.
            </MobileText>
            <HeaderH3>Repor Campeão</HeaderH3>
            <MobileText>
              Se o campeão do bando morreu durante a fase de ferimentos, você
              pode contratar um novo campeão por 100gc. Contudo, ele chega no
              bando com o nível do Héroi - 20, para um minimo de zero. Role
              avanços para cada nivel além do primeiro, e escolha poderes ou
              magias, e então gastar coroas para equipá-lo.
            </MobileText>
            <HeaderH3>Repor Campeão</HeaderH3>
            <MobileText>
              O jogador pode contratar novos soldados, pelo custo em coroas
              indicado em sua ficha, respeitando os limites de cada tipo de
              soldado e o limite de figuras no bando. Depois, deve gastar coroas
              para equipá-los como normal. Novos soldados sempre começam no
              nível 1.
            </MobileText>
            <HeaderH3>Expansões para a base</HeaderH3>
            <MobileText>
              Caso o bando tenha uma base, o jogador pode gastar coroas para
              comprar expansões para sua base. Note que os efeitos de uma
              expansão só podem ser usados na sequencia pós-jogo seguinte.
              Construção demora, mais ainda quando Skavens apunhalam seus
              pedreiros a cada uma hora.
            </MobileText>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default PostGamePage;
