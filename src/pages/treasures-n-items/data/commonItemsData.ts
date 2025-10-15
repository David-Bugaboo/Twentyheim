export interface EquipmentItem {
  id: string;
  name: string;
  properties: Array<{ label: string; value: string }>;
  description: string;
}

export interface EquipmentCategory {
  id: string;
  label: string;
  icon: string;
  items: EquipmentItem[];
}

export const commonItemsData: EquipmentCategory[] = [
  // MELEE WEAPONS
  {
    id: "melee-weapons",
    label: "Armas Corpo a Corpo",
    icon: "⚔️",
    items: [
      {
        id: "dagger",
        name: "Adaga",
        properties: [
          { label: "Tipo", value: "Arma Corpo a Corpo" },
          { label: "Modificador de Dano", value: "-1" },
          { label: "Espaços de Item", value: "Primeira adaga não ocupa espaço" },
        ],
        description:
          "Uma faca ou outra arma pequena - talvez uma lâmina fina escondida na bota, ou um punhal de misericórdia preso ao cinto. Nas ruas de Mordheim, a adaga é a última amiga de muitos - pequena demais para ser uma ameaça óbvia, mas afiada o suficiente para encontrar as juntas de uma armadura ou a garganta de um traidor. Adagas têm modificador de dano -1.\n\n**Importante:** A primeira adaga carregada por uma figura não ocupa um espaço de item. Assim, um mago pode carregar uma adaga, mais até cinco outros itens.\n\nTodo guerreiro experiente carrega pelo menos uma adaga escondida. Quando sua espada quebra, quando você está desarmado em um beco escuro, quando precisa cortar uma corda ou abrir uma tranca - a adaga nunca decepciona. Leve, discreta, letal.",
      },
      {
        id: "hand-weapon",
        name: "Arma de Uma Mão",
        properties: [
          { label: "Tipo", value: "Arma Corpo a Corpo" },
          { label: "Modificador de Dano", value: "Nenhum (0)" },
        ],
        description:
          "Espadas manchadas de sangue velho, machados entalhados com marcas de morte, maças que esmagaram crânios demais para contar. Nas ruas de Mordheim, estas são as ferramentas do ofício - confiáveis, testadas em batalha, e balanceadas para matar. Incluem espadas, cimitarras, machados de mão, maças, e até lanças leves. Essas armas não têm modificadores em combate.\n\nA arma de uma mão é o padrão em Mordheim - versátil o suficiente para qualquer situação, confiável o suficiente para apostar sua vida. Com a outra mão livre, você pode empunhar um escudo, uma segunda lâmina, ou agarrar um aliado caindo. Equilíbrio perfeito entre letalidade e adaptabilidade.",
      },
      {
        id: "two-handed-weapon",
        name: "Arma de Duas Mãos",
        properties: [
          { label: "Tipo", value: "Arma Corpo a Corpo" },
          { label: "Modificador de Dano", value: "+2" },
          { label: "Espaços de Item", value: "2 espaços" },
        ],
        description:
          "Montantes que clivam armaduras, machados de batalha que decapitam com um golpe, alabardas que perfuram placas de aço. Estas são armas para aqueles que não precisam de sutileza - apenas poder bruto. O peso da lâmina faz o trabalho; o guerreiro apenas direciona a destruição. Incluem espadas de duas mãos, machados de batalha, alabardas, manguals grandes e lanças pesadas.\n\nEssas armas causam +2 de dano - cada golpe é devastador. Por serem tão volumosas, ocupam dois espaços de item. Assim, um mago carregando uma arma de duas mãos pode carregar apenas até três outros itens.\n\nEm Mordheim, guerreiros com armas de duas mãos são temidos. Eles sacrificam defesa e mobilidade por poder de matar absoluto. Quando uma dessas lâminas cai, raramente há necessidade de um segundo golpe.",
      },
      {
        id: "staff",
        name: "Cajado",
        properties: [
          { label: "Tipo", value: "Arma Corpo a Corpo" },
          { label: "Modificador de Dano do Usuário", value: "-1" },
          {
            label: "Modificador de Dano do Oponente",
            value: "-1 (apenas corpo a corpo)",
          },
        ],
        description:
          "Madeira antiga gravada com runas, metal enfeitado com símbolos arcanos, ou simplesmente um pedaço de carvalho resistente. O cajado é a marca do conjurador - ferramenta de canalização, arma defensiva, e às vezes a única coisa entre um mago frágil e a morte. Cajados causam -1 de dano.\n\nEm combate corpo a corpo, o cajado é usado para desviar golpes tanto quanto para golpear. Também dá ao oponente um modificador de dano -1 - bloqueios e aparações que salvam vidas. O cajado não dá esse modificador contra ataques a distância. Esta categoria também inclui cajados mágicos.\n\nNas ruínas de Mordheim, conjuradores sem cajado não duram muito. A madeira absorve o impacto que carne frágil não poderia. Muitos magos veteranos têm cajados manchados de sangue e lasca dos de golpes que quase os mataram.",
      },
      {
        id: "unarmed",
        name: "Desarmado",
        properties: [{ label: "Penalidades", value: "-2 Ímpeto, -2 Dano" }],
        description:
          "Punhos sangrando, chutes desesperados, mordidas de pânico. Estar desarmado em Mordheim é estar a um passo da morte. Um guerreiro sem lâmina está nu, vulnerável, presa fácil. Se um modelo ficar sem armas, pode lutar normalmente mas sofre -2 Ímpeto e modificador de dano -2.\n\n**Nota Importante:** Criaturas que não têm armas listadas em suas notas lutam com armas naturais - garras, presas, tentáculos - e, portanto, nunca são contadas como desarmadas.\n\nNas ruínas, histórias são contadas de guerreiros desesperados que mataram com as mãos nuas. Mas são histórias raras, contadas sobre os mortos mais frequentemente que sobre os sobreviventes. Nunca deixe sua arma cair.",
      },
    ],
  },
  {
    id: "ranged-weapons",
    label: "Armas a Distância",
    icon: "🏹",
    items: [
      {
        id: "bow",
        name: "Arco",
        properties: [
          { label: "Tipo", value: "Arma a Distância" },
          { label: "Alcance Máximo", value: "60cm" },
          { label: "Modificador de Dano", value: "Nenhum (0)" },
          { label: "Requer", value: "Aljava" },
        ],
        description:
          "A arma que matou reis e mendigos igualmente. Dos telhados de Mordheim, arqueiros espreitam como predadores, flechas nocked e olhos atentos. Um arco bem cuidado é silencioso, letal, e não pergunta se o alvo viu a morte vindo. O jogo não faz distinção entre tipos de arco - arco longo, arco composto, arco curto - todos matam igualmente bem.\n\nArcos podem ser carregados e disparados em uma única ação - dispare, recue, dispare novamente.\n\nAlcance máximo de 60cm. Para usar um arco, uma figura também deve estar carregando uma aljava (que preenche outro espaço de item) ou algum tipo de munição mágica.\n\nNa Cidade Amaldiçoada, um bom arqueiro vale seu peso em ouro. Mata antes de ser visto, fere antes de ser alcançado. É a arma de escolha para aqueles inteligentes o suficiente para preferir distância à glória.",
      },
      {
        id: "crossbow",
        name: "Besta",
        properties: [
          { label: "Tipo", value: "Arma a Distância" },
          { label: "Alcance Máximo", value: "60cm" },
          { label: "Modificador de Dano", value: "+2" },
          { label: "Recarga", value: "Requer 1 ação" },
          { label: "Requer", value: "Aljava" },
        ],
        description:
          'A besta é a arma de quem quer penetrar armadura - o virote perfura placas que defleteriam flechas. O mecanismo clica ao ser carregado, um som sinistro que promete morte inevitável. Bestas levam uma ação para carregar e uma ação para disparar. Se desejar, pode substituir sua ação de movimento por uma ação de "recarga".\n\nBestas têm modificador de dano +2 - perfuração brutal.\n\nAlcance máximo de 60cm. Assume-se que todas as bestas começam o jogo carregadas e prontas para disparar. Requer aljava ou munição mágica.\n\nA besta é a escolha de soldados profissionais e caçadores de recompensa. O primeiro tiro geralmente é o último necessário - quando um virote de besta acerta, raramente há segundo tiro. Mas o tempo de recarga pode ser fatal em combates prolongados.',
      },
      {
        id: "hand-crossbow",
        name: "Besta de Mão",
        properties: [
          { label: "Tipo", value: "Arma a Distância / Arma Corpo a Corpo" },
          { label: "Alcance Máximo", value: "25cm" },
          { label: "Modificador de Dano", value: "+1" },
          { label: "Recarga", value: "Requer 1 ação (uma mão)" },
          { label: "Uso em Corpo a Corpo", value: "Conta como adaga" },
          { label: "Especial", value: "Não causa sobrecarga com Pedra-Bruxa" },
        ],
        description:
          'Pequena o suficiente para esconder sob um manto, poderosa o suficiente para matar a queima-roupa. A besta de mão é a favorita de assassinos, espiões e aqueles que valorizam surpresa sobre honra. Um clique silencioso, um virote envenenado, e o alvo cai antes de saber que foi mirado. Levam uma ação para carregar e uma ação para disparar, mas podem ser usadas e carregadas com apenas uma mão.\n\nModificador de dano +1 e alcance máximo de 25cm - feita para matar de perto.\n\nContam como adagas em combate corpo a corpo, inclusive para Lutar com Duas Armas. Não causam sobrecarga ao carregar fragmentos de Pedra-Bruxa - pequenas e leves o suficiente.\n\nAssume-se que começam o jogo carregadas.\n\nEm Mordheim, a besta de mão é a arma do pragmático - dispare primeiro, pergunte depois. Se o tiro falhar, a coronha serve perfeitamente como porrete improvisado.',
      },
      {
        id: "sling",
        name: "Funda",
        properties: [
          { label: "Tipo", value: "Arma a Distância" },
          { label: "Alcance Máximo", value: "20cm" },
          { label: "Modificador de Dano", value: "-2" },
          { label: "Espaços de Item", value: "Primeira funda não ocupa espaço" },
          { label: "Especial", value: "Pode ser usada na mão secundária" },
        ],
        description:
          "A arma do pobre, do desesperado, do esperto. Pastores as usam, crianças de rua as dominam, e veteranos que perderam tudo ainda têm uma guardada. A funda não impressiona, não amedronta, não mata com elegância. Mas mata quieta, de longe, e não precisa de nada além de pedras das ruínas. Modificador de dano -2, alcance 20cm.\n\nA funda segue as mesmas regras de uma adaga - a primeira não ocupa espaço de item. Pode ser usada na mão secundária junto com outra arma.\n\nUma figura com arma de mão ou adaga e funda na mão secundária pode carregar tesouros sem sobrecarga, mas não pode atirar com a funda enquanto carrega tesouro - mãos ocupadas.\n\nQualquer modelo pode usar uma funda. Em Mordheim, guerreiros experientes nunca menosprezam a funda - muitos cavaleiros orgulhosos caíram com uma pedra na têmpora, mortos por um inimigo que nem valia a pena ser nomeado.",
      },
      {
        id: "throwing-weapon",
        name: "Arma Arremessável",
        properties: [
          { label: "Tipo", value: "Arma Corpo a Corpo e a Distância" },
          { label: "Alcance de Arremesso", value: "25cm" },
          { label: "Modificador de Dano", value: "Nenhum (0)" },
          { label: "Corpo a Corpo", value: "Conta como arma de mão" },
        ],
        description:
          'Dardos, machados de arremesso, facas de equilíbrio - armas feitas para voar verdadeiro e perfurar profundo. Um guerreiro habilidoso pode matar a distância, então usar a mesma arma em corpo a corpo quando o inimigo se aproxima demais. Peso balanceado, ponta afiada, e a promessa de morte em duas formas. São tratadas como armas de uma mão quando usadas em combate corpo a corpo.\n\nPodem ser arremessadas até 25cm. Uma arma arremessada é tratada como ataque a distância padrão e segue todas as regras para arcos e bestas.\n\nQualquer magia ou efeito que cause penalidade a ataques de arco e besta também afeta dardos arremessados.\n\nNas ruínas, a arma arremessável é a escolha do adaptável - não o melhor a distância, não o melhor em corpo a corpo, mas funcional em ambos. Quando munição acaba e inimigos se aproximam, o mesmo dardo que perfurou um olho agora perfura um coração.',
      },
    ],
  },
  {
    id: "firearms",
    label: "Armas de Pólvora Negra",
    icon: "💥",
    items: [
      {
        id: "pistol",
        name: "Pistola",
        properties: [
          { label: "Tipo", value: "Arma de Fogo de Uma Mão" },
          { label: "Alcance Máximo", value: "25cm" },
          { label: "Modificador de Dano", value: "+2" },
          { label: "Perfuração de Armadura", value: "Ignora 2 pontos de armadura" },
          { label: "Recarga", value: "Requer 1 ação" },
          { label: "Uso em Corpo a Corpo", value: "Conta como adaga" },
          { label: "Requer", value: "Barril de Pólvora" },
        ],
        description:
          'A pistola é a arma do duelista, do capitão, do assassino civilizado. Um estalo ensurdecedor, uma nuvem de fumaça acre, e o alvo cai com um buraco fumegante no peito. Alcance de 25cm, causa +2 de dano e ignora 2 pontos de armadura - a bala não se importa com placas de aço.\n\nConta como adaga em combate corpo a corpo, inclusive para Lutar com Duas Armas. Requer uma ação para recarregar - despejar pólvora, empurrar bala, preparar pavio.\n\nEm Mordheim, a pistola é status e sobrevivência. Quando palavras falham e espadas são lentas demais, um tiro à queima-roupa resolve discussões permanentemente. Mantenha sua pólvora seca.',
      },
      {
        id: "musket",
        name: "Mosquete",
        properties: [
          { label: "Tipo", value: "Arma de Fogo de Duas Mãos" },
          { label: "Alcance Máximo", value: "60cm" },
          { label: "Modificador de Dano", value: "+2" },
          { label: "Perfuração de Armadura", value: "Ignora 2 pontos de armadura" },
          { label: "Recarga", value: "Requer 1 ação" },
          { label: "Uso em Corpo a Corpo", value: "Como arma de duas mãos (sem +2 dano)" },
          { label: "Requer", value: "Barril de Pólvora" },
        ],
        description:
          'O mosquete é o arauto da nova era - guerra industrializada, morte mecanizada. Um cano longo de ferro, pólvora negra como pecado, e balas de chumbo que não distinguem entre nobre e plebeu. O estrondo ecoa pelas ruínas como trovão, e homens caem com buracos nas armaduras que levaram anos para forjar. Causa +2 de dano e ignora 2 pontos de armadura. Alcance máximo de 60cm.\n\nUm modelo só pode carregar um mosquete e nunca pode carregar um escudo - a arma é grande demais. Pode ser usado em combate corpo a corpo como arma de duas mãos, mas sem o bônus de +2 dano - coronha não é lâmina.\n\nO mosquete é a arma de soldados profissionais e mercenários bem equipados. Lento para recarregar, desajeitado em corpo a corpo, mas devastador a distância. Em Mordheim, o crack de um mosquete geralmente significa que alguém não vai mais se levantar.',
      },
      {
        id: "blunderbuss",
        name: "Bacamarte",
        properties: [
          { label: "Tipo", value: "Arma de Fogo de Duas Mãos" },
          { label: "Alcance Máximo", value: "35cm" },
          { label: "Especial", value: "Dispara em dispersão" },
          { label: "Recarga", value: "Requer 1 ação" },
          { label: "Uso em Corpo a Corpo", value: "Como pistola (sem luta com duas armas)" },
          { label: "Requer", value: "Barril de Pólvora" },
        ],
        description:
          ' O bacamarte não mira - ele VARRE. Uma detonação que transforma tudo à frente em carne rasgada e ossos estilhaçados. Perfeito para becos estreitos, portas defendidas, e qualquer lugar onde inimigos se agrupam tolamente. Alcance máximo de 35cm.\n\nAo disparar um bacamarte, escolha sua figura alvo, então faça um ataque a distância contra aquele alvo e toda outra figura a até 3cm dele. Role contra o alvo inicial primeiro. Se for falha crítica, não role contra as outras figuras. Rolagens de 1 contra alvos adicionais não contam como falha crítica.\n\nPode ser usado em combate corpo a corpo como pistola, mas não conta para luta com duas armas.\n\nO bacamarte é a arma de abordagem e combate de rua - quando precisar limpar uma sala ou parar uma carga, nada funciona melhor. Sutil como uma avalanche, eficaz como a peste.'
        },
    ],
  },
  {
    id: "armor",
    label: "Armaduras e Escudos",
    icon: "🛡️",
    items: [
      {
        id: "shield",
        name: "Escudo",
        properties: [
          { label: "Tipo", value: "Equipamento Defensivo" },
          { label: "Bônus de Armadura", value: "+1" },
          { label: "Requisitos", value: "Arma de uma mão ou mão livre" },
        ],
        description:
          " Um escudo é a diferença entre um veterano e um cadáver - aqueles que desprezam defesa morrem jovens e estúpidos. Fornece +1 de armadura. Pode ser usado com armas de uma mão.\n\nBucklers pequenos, escudos redondos, pavises grandes - todos salvam vidas. Nas ruas de Mordheim, um guerreiro disciplinado carrega um escudo não por covardia, mas por inteligência. Mortos não coletam tesouro.",
      },
      {
        id: "light-armor",
        name: "Armadura Leve",
        properties: [
          { label: "Tipo", value: "Armadura" },
          { label: "Bônus de Armadura", value: "+1" },
          { label: "Penalidade de Movimento", value: "Nenhuma" },
        ],
        description:
          "Armadura leve não para espadas como armadura pesada, mas também não faz você andar como um golem enferrujado. Fornece +1 de armadura sem interferir com movimento.\n\nA escolha de batedores, ladinos, e guerreiros que valorizam velocidade. Em Mordheim, ser rápido significa não ser atingido - e não ser atingido é a melhor armadura de todas. Morrer protegido ou viver ágil - muitos escolhem a segunda.",
      },
      {
        id: "heavy-armor",
        name: "Armadura Pesada",
        properties: [
          { label: "Tipo", value: "Armadura" },
          { label: "Bônus de Armadura", value: "+2" },
          { label: "Penalidade de Movimento", value: "-1 Movimento" },
        ],
        description:
          "Cada peça pesa, cada junta range, mas quando lâminas quebram contra seu peito e flechas ricocheteiam de seu elmo, você agradece cada grama. Fornece +2 de armadura. Penalidade de -1 Movimento - andar lento é melhor que morrer rápido.\n\nArmadura pesada é o símbolo de veteranos e cavaleiros pesadamente blindados. Sacrifica velocidade por sobrevivência - uma troca que faz sentido quando você está na linha de frente, absorvendo golpes que matariam homens menores. Em Mordheim, aqueles em armadura completa andam devagar, mas andam por muito tempo.",
      },
    ],
  },
  {
    id: "accessories",
    label: "Acessórios",
    icon: "🎒",
    items: [
      {
        id: "quiver",
        name: "Aljava",
        properties: [
          { label: "Tipo", value: "Armazenamento de Munição" },
          { label: "Para", value: "Arcos e Bestas" },
          { label: "Espaços de Item", value: "1 espaço" },
        ],
        description:
          " A aljava é tão essencial quanto o arco - sem ela, você tem um pedaço de madeira curvada inútil. Cada flecha é morte potencial; cada virote, uma vida terminada. Necessária para usar armas a distância, a menos que use munição mágica. Ocupa um espaço de item.\n\nSem aljava, um arco é apenas uma clava cara e desajeitada. Todo arqueiro precisa de uma, e arqueiros experientes mantêm suas flechas afiadas, secas, e prontas para voar verdadeiro. A diferença entre ter munição e estar desarmado é a diferença entre caçador e caçado.",
      },
      {
        id: "powder-horn",
        name: "Chifre de Polvora",
        properties: [
          { label: "Tipo", value: "Armazenamento de Munição" },
          { label: "Para", value: "Armas de Pólvora Negra" },
          { label: "Espaços de Item", value: "1 espaço" },
        ],
        description:
          " Pólvora - o ingrediente que transforma ferro morto em trovão vivo. Acessório necessário para armas de fogo. Contém a pólvora necessária para recarregar e disparar mosquetes, pistolas e bacarmartes. Ocupa um espaço de item.\n\nSem pólvora, uma arma de fogo é apenas metal caro e inútil - um porrete pior que um pedaço de pau. Mantenha sua pólvora seca - molhada, ela não vale nada. Exposta a faíscas ou chamas, ela explode e mata você antes dos inimigos. Cada veterano com armas de fogo tem histórias de tolos que aprenderam essa lição tarde demais.",
      },
    ],
  },
  {
    id: "lesser-potions",
    label: "Poções Menores",
    icon: "⚗️",
    items: [
      {
        id: "tears-of-shallya",
        name: "Lágrimas de Shallya",
        properties: [
          { label: "Tipo", value: "Poção Menor" },
          { label: "Compra", value: "50 coroas" },
          { label: "Venda", value: "25 coroas" },
          { label: "Ingredientes", value: "25 coroas" },
          { label: "Uso", value: "Beber como uma ação" },
        ],
        description:
          "As Lágrimas de Shallya são a bênção da deusa da cura destilada em forma líquida - rara, preciosa, e talvez a única coisa em Mordheim que realmente cura ao invés de apenas mascarar a dor. Quando bebida, a poção restaura até 5 pontos perdidos de Vigor. Não pode elevar Vigor acima do máximo inicial.\n\nEm uma cidade onde cada ferida pode ser a última, onde infecções matam tanto quanto espadas, as Lágrimas de Shallya são mais valiosas que ouro. Guerreiros experientes guardam um frasco para emergências - a diferença entre sangrar até a morte em um beco sujo e viver para lutar outro dia.",
      },
      {
        id: "potion-of-ulric-strength",
        name: "Poção da Força de Ulric",
        properties: [
          { label: "Tipo", value: "Poção Menor" },
          { label: "Compra", value: "75 coroas" },
          { label: "Venda", value: "30 coroas" },
          { label: "Ingredientes", value: "30 coroas" },
          { label: "Uso", value: "Beber como uma ação" },
        ],
        description:
          " Feita com ingredientes do norte brutal - seiva de pinheiro negro, sangue de lobo, e orações a Ulric. Quando bebida, força selvagem corre pelas veias, músculos incham com poder primitivo. A figura que bebe esta poção recebe +1 Ímpeto pelo resto do jogo.\n\nA Poção da Força de Ulric transforma guerreiros comuns em predadores. Golpes que antes faltavam força agora quebram ossos. Em Mordheim, onde cada combate pode ser o último, essa vantagem marginal é frequentemente a diferença entre matar e morrer.",
      },
      {
        id: "potion-of-ironblood",
        name: "Poção de Sangue Férreo",
        properties: [
          { label: "Tipo", value: "Poção Menor" },
          { label: "Compra", value: "75 coroas" },
          { label: "Venda", value: "30 coroas" },
          { label: "Ingredientes", value: "30 coroas" },
          { label: "Uso", value: "Beber como uma ação" },
        ],
        description:
          "Preparada com limalha de ferro, sangue coagulado de criaturas blindadas, e ervas amargas. Quando bebida, a pele endurece perceptivelmente - não a ponto de brilhar como metal, mas o suficiente para deflectir golpes que antes perfurariam carne. A figura que bebe esta poção recebe +1 Armadura pelo resto do jogo.\n\nEm Mordheim, onde armadura adequada é cara e pesada, a Poção de Sangue Férreo é o escudo do homem pobre. Não é tão boa quanto placas de aço, mas é melhor que nada - e nada é o que a maioria tem.",
      },
      {
        id: "bugmans-ale",
        name: "Cerveja de Bugman",
        properties: [
          { label: "Tipo", value: "Poção Menor" },
          { label: "Compra", value: "100 coroas" },
          { label: "Venda", value: "40 coroas" },
          { label: "Ingredientes", value: "40 coroas" },
          { label: "Uso", value: "Beber como uma ação" },
        ],
        description:
          "A cerveja lendária dos anões, tão rara quanto valiosa. Dourada como ouro velho, espumante, com gosto de malte defumado e cevada das profundezas. Dizem que Joseph Bugman aperfeiçoou a receita após gerações de mestres cervejeiros, cada geração adicionando um segredo. Quando bebida, coragem líquida enche o coração - não a estupidez bêbada de cerveja comum, mas determinação férrea e vontade inabalável. A figura que bebe ganha +5 Vontade pelo resto do jogo.\n\nEm Mordheim, onde terror arcano e medo mundano quebram homens igualmente, a Cerveja de Bugman é mais que bebida - é armadura para a alma.",
      },
      {
        id: "elven-elixir",
        name: "Vinho Élfico",
        properties: [
          { label: "Tipo", value: "Poção Menor" },
          { label: "Compra", value: "75 coroas" },
          { label: "Venda", value: "30 coroas" },
          { label: "Ingredientes", value: "30 coroas" },
          { label: "Uso", value: "Beber como uma ação" },
        ],
        description:
          "Feito de uvas que nunca viram sol humano, água de nascentes élficas, e segredos que mortais não entendem completamente. Quando bebido, o corpo torna-se leve - não flutuando, mas movendo-se com graça sobrenatural. A figura que bebe recebe +2 Movimento pelo resto do jogo. Não pode elevar Movimento acima de 9.\n\nEm Mordheim, velocidade é vida. Correr mais rápido que inimigos, alcançar tesouro primeiro, fugir antes de ser cercado. O Vinho Élfico dá essa vantagem - raro e caro, mas invaluável.",
      },
      {
        id: "malekiths-wine",
        name: "Vinho de Malekith",
        properties: [
          { label: "Tipo", value: "Poção Menor" },
          { label: "Compra", value: "200 coroas" },
          { label: "Venda", value: "80 coroas" },
          { label: "Ingredientes", value: "80 coroas" },
          { label: "Uso", value: "Beber como uma ação" },
        ],
        description:
          " Nomeado após o Rei Feiticeiro dos Elfos Negros, esta poção é destilada de sombras e segredos - ingredientes que homens sãos não deveriam conhecer. Quando bebida, o corpo torna-se translúcido, quase invisível, fundindo-se com as sombras. A figura que bebe é tratada como se um feitiço de Invisibilidade tivesse sido conjurado sobre ela.\n\nEm Mordheim, ser invisível é poder absoluto. Assassinatos sem testemunhas, roubos sem risco, fuga sem perseguição. O Vinho de Malekith é caro e raro - mas para aqueles que precisam desaparecer, vale cada coroa.",
      },
      {
        id: "elixir-of-veilwalker",
        name: "Elixir do Andarilho do Véu",
        properties: [
          { label: "Tipo", value: "Poção Menor" },
          { label: "Compra", value: "200 coroas" },
          { label: "Venda", value: "80 coroas" },
          { label: "Ingredientes", value: "80 coroas" },
          { label: "Uso", value: "Beber como uma ação" },
        ],
        description:
          "Preparado com essências do próprio tecido da realidade, ingredientes que existem meio aqui e meio alhures. Quando bebida, o mundo pisca - por um instante você está em dois lugares ao mesmo tempo, depois apenas no novo. A figura que bebe é tratada como se tivesse conjurado o feitiço Teletransporte.\n\nPara escapar de cercos impossíveis, atravessar muros intransponíveis, ou alcançar tesouros inacessíveis - o Elixir do Andarilho do Véu dobra espaço. Perigoso, caro, mas absolutamente inestimável nas situações certas.",
      },
      {
        id: "kislevite-cocktail",
        name: "Coquetel Kislevita",
        properties: [
          { label: "Tipo", value: "Poção Menor" },
          { label: "Compra", value: "100 coroas" },
          { label: "Venda", value: "40 coroas" },
          { label: "Ingredientes", value: "40 coroas" },
          { label: "Uso", value: "Arremessar como uma ação (não ação de movimento)" },
        ],
        description:
          'Frasco de vidro fino cheio de líquido oleoso e volátil, vedado com cera. Inventado pelos guerreiros de Kislev para combater hordas do Caos, o coquetel explode em chamas ao quebrar. Um pavio curto aceso, um arremesso preciso, e inimigos queimam. Arremessar este coquetel segue todas as regras de conjurar o feitiço Granada, exceto que pode ser usado por não-conjuradores, nenhuma rolagem de Conjuração é necessária, e o ponto alvo deve estar a até 20cm. Uso desta poção não pode substituir uma ação de movimento.\n\nEm Mordheim, onde magia é perigosa e imprevisível, o Coquetel Kislevita oferece destruição explosiva sem risco arcano. Perfeito para limpar salas cheias de inimigos ou criar distrações ardentes.',
      },
      {
        id: "kharadron-ale",
        name: "Cerveja Kharadron",
        properties: [
          { label: "Tipo", value: "Poção Menor" },
          { label: "Compra", value: "150 coroas" },
          { label: "Venda", value: "60 coroas" },
          { label: "Ingredientes", value: "60 coroas" },
          { label: "Uso", value: "Beber como uma ação, depois usar ação restante para cuspir fogo" },
        ],
        description:
          'Laranja brilhante, borbulha violentamente, e cheira a pólvora e lúpulo. Bebê-la enche a boca com fogo líquido - literalmente. Uma figura que bebe esta poção e ainda tem uma ação restante na mesma ativação pode usar essa ação para fazer um ataque de tiro mágico elemental +3 contra uma figura a até 15cm - cuspa chamas como um dragão.\n\nOs Kharadron desenvolveram esta cerveja tanto como entretenimento quanto arma. Em Mordheim, é menos bebida e mais armamento arcano portátil. Beba, cuspa fogo, observe inimigos queimarem.',
      },
      {
        id: "brimstone-elixir",
        name: "Elixir de Enxofre",
        properties: [
          { label: "Tipo", value: "Poção Menor" },
          { label: "Compra", value: "150 coroas" },
          { label: "Venda", value: "60 coroas" },
          { label: "Ingredientes", value: "60 coroas" },
          { label: "Uso", value: "Beber como uma ação" },
        ],
        description:
          "Preparado com cristais elementais e essências de salamandras, esta poção envolve o bebedor em proteção contra fogo e elementos. Quando bebida, a pele fica levemente fria ao toque - fogo lava sobre você sem queimar, gelo toca sem congelar. A figura que bebe esta poção ignora os próximos 5 pontos de dano elemental que receber.\n\nContra magos de fogo, dragões cuspindo chamas, ou armadilhas alquímicas, o Elixir de Enxofre é salvação líquida. Não torna você invulnerável - mas cinco pontos podem ser a diferença entre carbonizado e sobrevivente.",
      },
      {
        id: "powdered-daemonbone",
        name: "Osso de Demônio em Pó",
        properties: [
          { label: "Tipo", value: "Poção Menor" },
          { label: "Compra", value: "100 coroas" },
          { label: "Venda", value: "40 coroas" },
          { label: "Ingredientes", value: "40 coroas" },
          { label: "Uso", value: "Polvilhar sobre arma como uma ação" },
        ],
        description:
          " Cheira a morte e carne queimada. Quando polvilhado sobre uma arma, o pó adere ao metal, fazendo runas fantasmagóricas brilharem fracamente. Aquela arma conta como arma mágica pelo resto do jogo. Pode ser polvilhado sobre flecha ou virote de besta, mas serão itens de uso único.\n\nEm Mordheim, criaturas imunes a armas comuns espreitam nas sombras - mortos-vivos, demônios, espíritos. Osso de Demônio em Pó transforma qualquer lâmina mundana em arma capaz de ferir o sobrenatural. Temporário, sim, mas suficiente para sobreviver.",
      },
      {
        id: "mad-cap-mushroom",
        name: "Elixir de Cogumelo Louco",
        properties: [
          { label: "Tipo", value: "Poção Menor" },
          { label: "Compra", value: "200 coroas" },
          { label: "Venda", value: "80 coroas" },
          { label: "Ingredientes", value: "80 coroas" },
          { label: "Uso", value: "Beber como uma ação" },
        ],
        description:
          "Cheira a terra úmida e loucura. Quando bebido, fúria berserker inunda a mente - dor desaparece, medo evapora, apenas existe a necessidade primal de MATAR. A figura ganha +1 Ímpeto e recebe +1 modificador de dano adicional em qualquer ataque corpo a corpo bem-sucedido. Porém, a figura DEVE, se possível, usar todas suas ações todo turno para mover-se para combate e lutar com a figura inimiga mais próxima (incluindo criaturas não controladas) em linha de visão e não atualmente em combate.\n\nO Elixir de Cogumelo Louco transforma guerreiros em máquinas de matar furiosas - devastadoras em combate, mas completamente descontroladas. Use quando precisar destruir inimigos, mas esteja preparado para perder todo controle tático.",
      },
      {
        id: "black-lotus-vial",
        name: "Frasco de Lótus Negra",
        properties: [
          { label: "Tipo", value: "Poção Menor" },
          { label: "Compra", value: "50 coroas" },
          { label: "Venda", value: "20 coroas" },
          { label: "Ingredientes", value: "20 coroas" },
          { label: "Uso", value: "Aplicar em arma como uma ação" },
        ],
        description:
          "Líquido negro e viscoso em frasco pequeno, extraído das pétalas venenosas da lendária Lótus Negra. Apenas uma gota é suficiente para matar - aplicado em lâmina, o veneno espera pacientemente. Este veneno pegajoso pode ser usado para revestir qualquer arma exceto cajado, arco ou besta. Pode ser usado em uma flecha ou virote de besta. Na próxima vez que esta arma causar dano, a figura que receber o dano é envenenada (assumindo que não seja imune a veneno). A arma perde a habilidade de envenenar após o primeiro ataque que causar dano. Esta poção não é mágica e não é afetada por nada que cancele magia.\n\nAssassinos adoram a Lótus Negra - silenciosa, letal, e legal o suficiente para não chamar atenção de caçadores de bruxas. Um corte pequeno, e a vítima morre lentamente enquanto o veneno trabalha.",
      },
      {
        id: "prismskin-brew",
        name: "Poção de Pele Prismática",
        properties: [
          { label: "Tipo", value: "Poção Menor" },
          { label: "Compra", value: "250 coroas" },
          { label: "Venda", value: "100 coroas" },
          { label: "Ingredientes", value: "100 coroas" },
          { label: "Uso", value: "Beber como uma ação" },
        ],
        description:
          'Preparada com escamas de camaleão gigante e cristais de ilusão moídos, esta poção permite ao bebedor fundir-se com o ambiente. A pele muda de cor e textura para combinar com o fundo - não invisibilidade verdadeira, mas camuflagem perfeita. Nenhuma outra figura pode traçar linha de visão para esta figura se estiverem a mais de 30cm de distância. Assim, esta figura só pode ser alvo de ataque ou magia de outra figura que esteja a até 30cm.\n\nPara espreitar, emboscar, ou simplesmente sobreviver em ambiente hostil, a Poção de Pele Prismática é invaluável. Inimigos distantes simplesmente não o veem - você é parte da parede, do chão, das sombras.',
      },
      {
        id: "witchsight-mead",
        name: "Hidromel da Visão Mistica",
        properties: [
          { label: "Tipo", value: "Poção Menor" },
          { label: "Compra", value: "150 coroas" },
          { label: "Venda", value: "60 coroas" },
          { label: "Ingredientes", value: "60 coroas" },
          { label: "Uso", value: "Beber como uma ação" },
        ],
        description:
          "A figura que bebe esta poção ignora os efeitos de Invisibilidade pelo resto do jogo. Além disso, se esta figura mover-se para combate com um Soldado Ilusório, o Soldado Ilusório é imediatamente removido da mesa.\n\nContra inimigos que dependem de truques visuais e enganos mágicos, o Hidromel da Visão Bruxa é a resposta perfeita. Veja através de mentiras arcanas, enxergue o invisível, destrua ilusões com um olhar.",
      },
      {
        id: "bottle-of-burrowing",
        name: "Extrato de Toupeir",
        properties: [
          { label: "Tipo", value: "Poção Menor" },
          { label: "Compra", value: "400 coroas" },
          { label: "Venda", value: "150 coroas" },
          { label: "Ingredientes", value: "150 coroas" },
          { label: "Uso", value: "Beber como uma ação" },
        ],
        description:
          "Esta poção permite ao bebedor mover-se através de matéria sólida. Paredes tornam-se água, pisos viram névoa - temporariamente, pelo menos. A figura que bebe pode usar quaisquer ações restantes na ativação para mover-se diretamente através de terreno. A figura não pode terminar sua ativação dentro de terreno, então deve ter movimento suficiente para atravessar completamente a peça de terreno.\n\nPara atravessar muros, escapar de armadilhas, ou alcançar tesouros protegidos por barreiras físicas, o Frasco de Escavação é inestimável. Caro, raro, mas absolutamente sem preço quando você precisa estar do outro lado de uma parede impenetrável.",
      },
      {
        id: "construct-oil",
        name: "Óleo de Constructo",
        properties: [
          { label: "Tipo", value: "Poção Menor" },
          { label: "Compra", value: "250 coroas" },
          { label: "Venda", value: "100 coroas" },
          { label: "Ingredientes", value: "100 coroas" },
          { label: "Uso", value: "Fora de Jogo - aplicar após qualquer jogo" },
        ],
        description:
          "Este óleo aprimora constructos mecânicos. Após qualquer jogo, um mago pode usar este óleo mágico em um constructo em sua warband, dando-lhe +1 permanente ao seu atributo de Movimento. Cada constructo pode receber o benefício de óleo de constructo apenas uma vez.\n\nConstructos - golems, autômatos, criações mecânicas - são naturalmente lentos. Óleo de Constructo os torna mais ágeis, permitindo que acompanhem guerreiros vivos. Investimento caro, mas permanente.",
      },
      {
        id: "embalming-solution",
        name: "Solução de Embalsamamento",
        properties: [
          { label: "Tipo", value: "Poção Menor" },
          { label: "Compra", value: "500 coroas" },
          { label: "Venda", value: "200 coroas" },
          { label: "Ingredientes", value: "200 coroas" },
          { label: "Uso", value: "Fora de Jogo - usar em figura morta após jogo" },
        ],
        description:
          "Esta solução pode ser usada em qualquer figura, exceto um héroi, que morreu no jogo anterior. A solução preserva perfeitamente o corpo da figura pelos próximos cinco jogos. Após cada um dos próximos cinco jogos, um mago pode usar uma poção elixir da vida ou o feitiço Cura Milagrosa na figura preservada. Enquanto preservada, a figura não conta como membro da warband para fins de cálculo de tamanho máximo da warband, mas contará se trazida de volta à vida. Um mago não pode contratar outro aprendiz se tiver um preservado. Se, após o quinto jogo, a figura preservada não foi trazida de volta à vida, está morta, e deve ser removida da Ficha de Mago.\n\nEm Mordheim, morte nem sempre é final - não se você tiver a Solução de Embalsamamento. Preserve aliados caídos enquanto busca meios de ressurreição. Tempo comprado, mas não infinito.",
      },
    ],
  },
  {
    id: "greater-potions",
    label: "Poções Maiores",
    icon: "",
    items: [
      {
        id: "witchboon-potion",
        name: "Poção da Benção Arcana",
        properties: [
          { label: "Tipo", value: "Poção Maior" },
          { label: "Compra", value: "500 coroas" },
          { label: "Venda", value: "200 coroas" },
          { label: "Ingredientes", value: "200 coroas" },
          { label: "Uso", value: "Beber como uma ação (antes de conjurar magia)" },
        ],
        description:
          "Esta poção sobrecarrega habilidades arcanas - mas a um custo. Poder demais para canalizar sem consequências. Na próxima vez que um conjurador conjurar uma magia após beber esta poção, adiciona +4 à sua Rolagem de Conjuração mas sofre 2 de dano, além de quaisquer outros efeitos de conjurar a magia. Um conjurador pode usar apenas uma Pocao de Bencao Arcana por jogo. Esta poção não pode ser usada para conjurar magias Fora de Jogo.\n\nQuando você PRECISA que aquela magia funcione - quando falhar significa morte - a Poção da Benção Bruxa garante sucesso. O preço é dor, mas dor é melhor que morte.",
      },
      {
        id: "ratling-flask",
        name: "Frasco Ratling",
        properties: [
          { label: "Tipo", value: "Poção Maior" },
          { label: "Compra", value: "500 coroas" },
          { label: "Venda", value: "200 coroas" },
          { label: "Ingredientes", value: "200 coroas" },
          { label: "Uso", value: "Beber como uma ação enquanto carrega tesouro" },
        ],
        description:
          "Criação dos Skaven, esta poção encolhe objetos temporariamente - perfeita para roubar tesouros grandes. Uma figura que está carregando tesouro pode usar a poção para encolhê-lo até um tamanho que caiba no bolso. Esta figura não sofre mais penalidades a Movimento, Ímpeto, ou natação por carregar este tesouro. Pode até carregar uma segunda ficha de tesouro. Se o efeito desta poção for cancelado enquanto a figura carrega dois tesouros, deve escolher um e imediatamente largá-lo. Se o tesouro encolhido for largado por qualquer razão, retorna ao seu tamanho normal.\n\nPara ladrões ambiciosos e saqueadores gananciosos, o Frasco Ratling é essencial. Carregar duas relíquias enormes como se fossem moedas? Sim-sim!",
      },
      {
        id: "greater-tears-of-shallya",
        name: "Lágrimas Maiores de Shallya",
        properties: [
          { label: "Tipo", value: "Poção Maior" },
          { label: "Compra", value: "2.000 coroas" },
          { label: "Venda", value: "300 coroas" },
          { label: "Ingredientes", value: "750 coroas" },
          { label: "Uso", value: "Beber como uma ação (em jogo ou fora de jogo)" },
        ],
        description:
          "A versão suprema da bênção de Shallya - rara além de palavras, preciosa além de medida. Onde as Lágrimas comuns curam feridas, as Lágrimas Maiores restauram completamente. Líquido cristalino que brilha com luz divina própria. Uma figura que bebe esta poção é imediatamente restaurada ao seu Vigor inicial e é curada de qualquer veneno ou reduções temporárias de atributos. Esta poção também pode ser usada após um jogo para curar a figura de quaisquer lesões permanentes.\n\nEm Mordheim, onde lesões permanentes acabam com carreiras e venenos matam lentamente, as Lágrimas Maiores de Shallya são literalmente milagrosas. Caríssimas, mas capazes de desfazer até mesmo as piores maldições e ferimentos. Um frasco pode salvar uma vida inteira.",
      },
      {
        id: "morrs-milk",
        name: "Leite de Morr",
        properties: [
          { label: "Tipo", value: "Poção Maior" },
          { label: "Compra", value: "2.000 coroas" },
          { label: "Venda", value: "300 coroas" },
          { label: "Ingredientes", value: "500 coroas" },
          { label: "Uso", value: "Fora de Jogo - apenas mago, antes de um jogo" },
        ],
        description:
          "Nomeado após Morr, deus dos sonhos e morte, este leite permite ao bebedor vislumbrar o futuro - talvez. Esta poção pode ser usada apenas por um mago imediatamente antes de um jogo. O mago deve imediatamente fazer uma Rolagem de Vontade (CD12). Se bem-sucedido, o mago ganha 50 pontos de experiência extra após o jogo. Isso não conta para o máximo de 300 pontos de experiência em um jogo. Se mal-sucedido, o mago tem 30 pontos de experiência deduzidos daqueles ganhos durante o jogo (isso não pode levar o total de experiência ganho no jogo abaixo de 0). Esses 30 pontos são deduzidos do máximo que pode ser ganho (significando que um mago que falha pode ganhar no máximo 270 pontos de experiência no jogo).\n\nLeite de Morr é aposta arriscada - visões de futuros possíveis que aceleram aprendizado, ou pesadelos que atrapalham foco. Para magos ambiciosos, o risco vale a recompensa.",
      },
      {
        id: "maelstrom-draught",
        name: "Gole do Maelstrom",
        properties: [
          { label: "Tipo", value: "Poção Maior" },
          { label: "Compra", value: "1.500 coroas" },
          { label: "Venda", value: "200 coroas" },
          { label: "Ingredientes", value: "600 coroas" },
          { label: "Uso", value: "Beber como uma ação (antes de conjurar magia)" },
        ],
        description:
          "Esta poção permite ao conjurador canalizar duas magias ao preço de uma. Se uma figura bebe esta poção e então conjura uma magia durante a mesma ativação, a figura pode tentar conjurar aquela magia duas vezes. As tentativas devem ser feitas uma logo após a outra. Cada tentativa pode ter um alvo separado, ambos devem ser declarados antes de quaisquer rolagens serem feitas.\n\nPara magos que precisam devastação absoluta - dois raios, duas bolas de fogo, duas invocações - o Gole do Maelstrom entrega. Caro e perigoso, mas quando você precisa de poder arcano dobrado, não há substituto.",
      },
      {
        id: "bottle-of-darkness",
        name: "Frasco da Escuridão",
        properties: [
          { label: "Tipo", value: "Poção Maior" },
          { label: "Compra", value: "1.500 coroas" },
          { label: "Venda", value: "300 coroas" },
          { label: "Ingredientes", value: "600 coroas" },
          { label: "Uso", value: "Estilhaçar no chão como uma ação" },
        ],
        description:
          'Frasco de vidro negro contendo escuridão líquida - não ausência de luz, mas escuridão tangível, viscosa, que se move como criatura viva. Se uma figura estilhaça este frasco no chão, trevas antinaturais imediatamente caem sobre o campo de batalha. Linha de visão para todos é reduzida a 30cm pelo resto do jogo.\n\nO Frasco da Escuridão transforma qualquer combate em caos. Arqueiros ficam inúteis, magos não conseguem mirar, apenas combate corpo a corpo importa. Para warbands que prosperam em confusão e proximidade, esta poção é vantagem tática devastadora.',
      },
      {
        id: "ethereal-vacuum",
        name: "Vácuo Etéreo",
        properties: [
          { label: "Tipo", value: "Poção Maior" },
          { label: "Compra", value: "2.000 coroas" },
          { label: "Venda", value: "200 coroas" },
          { label: "Ingredientes", value: "800 coroas" },
          { label: "Uso", value: "Abrir como uma ação" },
        ],
        description:
          ' Quando um personagem gasta uma ação para abrir este frasco, todas as criaturas com o traço Etéreo a até 20cm devem fazer uma Rolagem de Vontade (CD20). Se falharem, são sugadas para dentro do frasco e aprisionadas. Imediatamente remova a figura da mesa e conceda quaisquer pontos de experiência que teriam sido ganhos por matar tal criatura.\n\nContra fantasmas, espectros, e outros horrores incorpóreos, o Vácuo Etéreo é armamento especializado. Espíritos que não podem ser tocados são sugados para prisão extradimensional. Caro, mas essencial para caçadores do sobrenatural.',
      },
      {
        id: "potion-of-invulnerability",
        name: "Poção de Invulnerabilidade",
        properties: [
          { label: "Tipo", value: "Poção Maior" },
          { label: "Compra", value: "—" },
          { label: "Venda", value: "400 coroas" },
          { label: "Ingredientes", value: "2.000 coroas" },
          { label: "Uso", value: "Beber como uma ação" },
        ],
        description:
          "O Santo Graal da alquimia - invulnerabilidade verdadeira, ainda que temporária.Uma figura que bebe esta poção é imune a dano de armas não-mágicas. Sempre que esta figura ativa, role um dado. Em 17+, os efeitos da poção terminam imediatamente.\n\nCom a Poção de Invulnerabilidade, você pode caminhar através de chuva de flechas, ignorar lâminas de aço, rir de golpes que matariam outros. Mas a proteção é frágil - pode terminar a qualquer momento. Use sabiamente, aja rapidamente, e reze para que dure.",
      },
      {
        id: "bottle-of-null",
        name: "Frasco da Alma Pariah",
        properties: [
          { label: "Tipo", value: "Poção Maior" },
          { label: "Compra", value: "—" },
          { label: "Venda", value: "200 coroas" },
          { label: "Ingredientes", value: "1.000 coroas" },
          { label: "Uso", value: "Abrir como uma ação" },
        ],
        description:
          "Quando aberto, suga todo poder arcano do campo de batalha. Se uma figura abre este frasco, todas as magias em jogo são imediatamente canceladas. Isso não fará desaparecer criaturas invocadas, mas cancelará magias de Controle, incluindo a magia Controlar Demônio inerente a Invocar Demônio. Além disso, todos os conjuradores devem fazer uma Rolagem de Vontade (CD14) ou sofrer 1 ponto de dano.\n\nO Frasco do Nulo é o grande equalizador - quando o campo está saturado de magia inimiga, abra o frasco e observe todos os feitiços colapsarem. Conjuradores o temem, guerreiros mundanos o amam. Antimagia em forma líquida.",
      },
      {
        id: "elixir-of-life",
        name: "Elixir da Vida",
        properties: [
          { label: "Tipo", value: "Poção Maior" },
          { label: "Compra", value: "—" },
          { label: "Venda", value: "1.000 coroas" },
          { label: "Ingredientes", value: "3.000 coroas" },
          { label: "Uso", value: "Fora de Jogo - usar após qualquer jogo" },
        ],
        description:
          "A mais rara e valiosa de todas as poções - o segredo da ressurreição verdadeira. Líquido dourado que pulsa com vida pura, brilhando com luz própria. Nunca pode ser comprado e apenas um tolo desesperado o venderia. Pode ser usado imediatamente após qualquer jogo. Se usado, uma figura que morreu durante aquele jogo é trazida de volta à vida. A figura não sofre efeitos negativos da morte e pode participar do próximo jogo.\n\nO Elixir da Vida é lenda viva. Morte desfeita, vida restaurada, aliados perdidos retornados. Em Mordheim, onde morte é permanente e brutal, possuir um frasco do Elixir é ter poder sobre a própria morte. Mais valioso que todo ouro da Cidade Amaldiçoada.",
      },
    ],
  },
  {
    id: "magic-items",
    label: "Relíquias",
    icon: "✨",
    items: [
      {
        id: "holy-unholy-charm",
        name: "Amuleto Sagrado/Profano",
        properties: [
          { label: "Tipo", value: "Amuleto" },
        ],
        description:
          "Pequeno talismã gravado com runas de proteção - sagradas para alguns, profanas para outros. Uma vez por jogo, o portador pode adicionar +4 a uma Rolagem de Vontade para resistir a uma magia. A decisão de usar o amuleto pode ser feita depois que o dado for rolado.\n\nQuando magia hostil vem em sua direção, o amuleto pulsa com poder protetor - suficiente para desviar feitiços que normalmente o destruiriam.",
      },
      {
        id: "elven-boots",
        name: "Botas Élficas",
        properties: [
          { label: "Tipo", value: "Botas" },
        ],
        description: "Couro élfico leve como pluma, solado que não faz som. O portador ganha +1 Movimento.\n\nCom Botas Élficas, você corre mais rápido, salta mais longe, move-se com graça sobrenatural. Em Mordheim, velocidade extra pode significar alcançar tesouro primeiro - ou escapar de morte certa.",
      },
      {
        id: "jade-figurine",
        name: "Escultura de Slann",
        properties: [
          { label: "Tipo", value: "Estatueta Invocadora" },
        ],
        description:
          "Pequena estatueta de jade entalhada pelos antigos Slann de Lustria, pulsando com magia primitiva e poder bestial. Quando você encontra uma Escultura de Slann, role na Tabela de Esculturas de Slann para ver que animal ela representa. Uma figura pode gastar uma ação para arremessar a estatueta. Descarte a Escultura de Slann e coloque um animal daquele tipo em qualquer lugar a até 5cm da figura que a arremessou. O animal é tratado como membro da sua warband pelo resto do jogo, após o qual ele desaparece de volta para Lustria. Uma warband pode usar no máximo uma Escultura de Slann por jogo.\n\n**Tabela de Esculturas de Slann (d20):**\n1: Anaconda | 2-4: Morcego Bebedor de Sangue | 5: Crocodilo | 6-7: Vespa Gigante | 8: Preguiça Terrestre | 9-11: Serpente Grande | 12: Lagarto Grande | 13-15: Cabra Montesa | 16-17: Macaco Gritador | 18-19: Tartaruga Mordedora | 20: Tigre\n\nEm Mordheim, estas esculturas são tesouros raros - fragmentos do poder dos Homens-Lagarto, capazes de arrancar bestas de Lustria através do véu da realidade.",
      },
      {
        id: "idol-of-shallya",
        name: "Ídolo de Shallya",
        properties: [
          { label: "Tipo", value: "Ídolo" },
        ],
        description:
          "Pequeno ícone de metal representando Shallya, deusa da cura e misericórdia. A pequena estatueta brilha fracamente quando veneno se aproxima. Se uma figura carregando o Ídolo de Shallya ficar Envenenada, pode descartar o ídolo para remover o veneno. Isso é automático e não requer uma ação.\n\nO Ídolo de Shallya se sacrifica para salvar o portador - quando toxinas correm pelas veias, o ícone absorve o veneno em si mesmo, escurecendo e rachando até se despedaçar. Um milagre de uso único da deusa misericordiosa. Invaluável contra assassinos, víboras, e as muitas criaturas venenosas que espreitam em Mordheim.",
      },
      {
        id: "rabbits-foot",
        name: "Pé de Coelho",
        properties: [
          { label: "Tipo", value: "Pedra do Destino" },
        ],
        description:
          "Uma vez por jogo, a figura carregando um Pé de Coelho pode re-rolar qualquer Rolagem de Conjuração, Rolagem de Atributo, Rolagem de Combate, ou Rolagem de Tiro.\n\nO Pé de Coelho torce o destino - não muito, apenas o suficiente para transformar falha em sucesso. Quando aquela rolagem crucial falha, esfregue o pé e role novamente.",
      },
      {
        id: "battle-wizard-gauntlets",
        name: "Manoplas do Mago de Batalha",
        properties: [
          { label: "Tipo", value: "Luvas" },
        ],
        description:
          "Uma vez por jogo, um conjurador pode usar estas luvas para ganhar +5 em uma Rolagem de Conjuração. O conjurador deve declarar que está usando-as antes da Rolagem de Conjuração ser feita.\n\nForjadas para magos que lutam na linha de frente, estas manoplas canalizam poder arcano adicional através das mãos. Quando você precisa garantir que aquela magia crítica funcione, as Manoplas do Mago de Batalha entregam.",
      },
      {
        id: "ogre-bracers",
        name: "Braceletes de Ogro",
        properties: [
          { label: "Tipo", value: "Luvas" },
        ],
        description:
          "O portador ganha +1 modificador de dano em todos os ataques corpo a corpo bem-sucedidos.\n\nBraceletes de ferro pesado enfeitiçados com força bruta de ogro. Cada golpe cai com peso sobrenatural, esmagando ossos e amassando armadura.",
      },
      {
        id: "horn-of-ruin",
        name: "Chifre da Ruína",
        properties: [
          { label: "Tipo", value: "Chifre" },
        ],
        description:
          "Uma vez por jogo, o portador pode usar uma ação para soprar o chifre. Escolha uma peca de terreno a ate 30cm do portador. Aquela peca de terreno e removida da mesa. Criaturas que estavam sob aquela peca de terreno caem da altura que estavam, tomando dano como adequado.\n\nSom antigo e terrível que faz pedra rachar e madeira apodrecer. Quando o Chifre da Ruína soa, estruturas colapsam. Perfeito para derrubar paredes ou colapsar tetos sobre inimigos.",
      },
      {
        id: "ring-of-elven-grace",
        name: "Anel da Graça Élfica",
        properties: [
          { label: "Tipo", value: "Anel" },
        ],
        description:
          "O portador deste anel nunca sofre dano de queda, não importa quão grande a distância da qual caiam/pulem.\n\nCom o Anel da Graça Élfica, você pode saltar de telhados, cair de torres, despencar de escadas - e pousar suavemente como pluma. Gravidade se torna sugestão, não lei.",
      },
      {
        id: "ring-of-abysswalker",
        name: "Anel do Andarilho do Abismo",
        properties: [
          { label: "Tipo", value: "Anel" },
        ],
        description:
          'Uma vez por jogo, o portador deste anel pode gastar uma ação para teletransportar até 20cm para qualquer lugar dentro de linha de visão, mas não para fora da mesa. Não pode ser usado para mover uma figura para dentro ou para fora de combate.\n\nO Anel do Andarilho do Abismo pisca você através do espaço - perfeito para alcançar tesouros inacessíveis ou escapar de situações impossíveis.',
      },
      {
        id: "holy-unholy-signet",
        name: "Sinete Sagrado/Profano",
        properties: [
          { label: "Tipo", value: "Anel" },
        ],
        description: "O portador deste anel recebe +1 Vontade.\n\nSinete gravado com símbolos de poder - sagrados ou profanos, dependendo do portador. Fortalece a vontade, endurece a mente contra terror e magia.",
      },
      {
        id: "sea-dragon-cloak",
        name: "Manto de Dragão Marinho",
        properties: [
          { label: "Tipo", value: "Manto" },
        ],
        description:
          "O portador ganha +4 Armadura contra todas as armas de mísseis e ataques de armas de fogo.\n\nFeito de escamas de dragão marinho entrelaçadas, este manto deflecte flechas e balas como água sobre rocha. Contra ataques a distância, torna o portador quase invulnerável.",
      },
      {
        id: "hierophant-staff",
        name: "Cajado do Hierofante",
        properties: [
          { label: "Tipo", value: "Cajado" },
        ],
        description:
          "Quando este item é encontrado, role na Tabela de Magia Aleatória para identificar uma magia. Este cajado dá +1 à Rolagem de Conjuração para aquela magia específica. Note que, se comprar um cajado de conjuração, você deve pagar seu custo antes de rolar para identificar a magia.\n\nO Cajado do Hierofante é sintonizado com uma magia específica, canalizando-a com facilidade maior. Para conjuradores especializados, invaluável.",
      },
      {
        id: "wyrdstone-scepter",
        name: "Cetro de Pedra-Bruxa",
        properties: [
          { label: "Tipo", value: "Item de Poder" },
          { label: "Poder", value: "3" },
        ],
        description:
          "Itens de poder fornecem a um conjurador uma reserva adicional da qual podem extrair para potencializar uma magia ou Rolagem de Vontade da mesma forma que podem usar seu próprio Vigor. O número é a quantidade de poder que pode ser extraída do item antes da reserva secar. Assim, um cetro de poder (3) pode ser usado para aumentar uma única Rolagem de Conjuração em +3, três Rolagens em +1 cada, ou uma em +2 e outra em +1. Este poder pode ser usado em conjunto com o Vigor do conjurador. Cetros, anéis e varinhas de poder recarregam entre jogos.\n\nCetros de Pedra-Bruxa pulsam com magia bruta cristalizada. Quando você precisa de poder extra mas não pode arriscar seu próprio Vigor, o cetro fornece.",
      },
      {
        id: "wyrdstone-band",
        name: "Anel de Pedra-Bruxa",
        properties: [
          { label: "Tipo", value: "Item de Poder" },
          { label: "Poder", value: "2" },
        ],
        description:
          "Itens de poder fornecem a um conjurador uma reserva adicional da qual podem extrair para potencializar uma magia ou Rolagem de Vontade. O número é a quantidade de poder que pode ser extraída antes da reserva secar. Este poder pode ser usado em conjunto com o Vigor do conjurador. Anéis de poder recarregam entre jogos.\n\nAnéis de Pedra-Bruxa são menores que cetros mas igualmente úteis - duas cargas de poder arcano em forma portátil e discreta.",
      },
      {
        id: "elfbone-wand",
        name: "Varinha de Osso Élfico",
        properties: [
          { label: "Tipo", value: "Item de Poder" },
          { label: "Poder", value: "2" },
        ],
        description:
          "Itens de poder fornecem a um conjurador uma reserva adicional da qual podem extrair para potencializar uma magia ou Rolagem de Vontade. O número é a quantidade de poder que pode ser extraída antes da reserva secar. Este poder pode ser usado em conjunto com o Vigor do conjurador. Varinhas de poder recarregam entre jogos.\n\nVarinhas esculpidas de ossos de elfos mortos, gravadas com runas de poder. Macabro, mas eficaz - osso élfico conduz magia melhor que qualquer outro material.",
      },
      {
        id: "mage-skull",
        name: "Crânio de Mago",
        properties: [
          { label: "Tipo", value: "Item de Poder" },
          { label: "Poder", value: "6" },
        ],
        description:
          "Itens de poder fornecem a um conjurador uma reserva adicional da qual podem extrair para potencializar uma magia. O número é a quantidade de poder que pode ser extraída antes da reserva secar. Este poder pode ser usado em conjunto com o Vigor do conjurador. Crânios de poder NÃO recarregam entre jogos - uma vez esgotado com 6 pontos de poder adicional, está vazio e não pode nem ser vendido.\n\nCrânio de um mago poderoso, preservado e enfeitiçado. Reservatório massivo de poder, mas uso único. Quando você PRECISA de seis pontos de poder extra - para aquela magia impossível - o Crânio de Mago entrega. Depois, vira apenas osso inútil.",
      },
      {
        id: "rectors-scepter",
        name: "Cetro do Reitor",
        properties: [
          { label: "Tipo", value: "Varinha" },
        ],
        description:
          "Uma vez por jogo, uma figura carregando esta varinha pode rolar dois dados ao tentar conjurar uma magia e escolher qual usar.\n\nO Cetro do Reitor não garante sucesso, mas dá segunda chance. Role duas vezes, escolha o melhor resultado - às vezes a diferença entre falha crítica e sucesso espetacular.",
      },
    ],
  },
  {
    id: "magic-weapons",
    label: "Armas Mágicas",
    icon: "⚔️",
    items: [
      {
        id: "gromril-hand-weapon",
        name: "Arma de Uma Mão de Gromril",
        properties: [
          { label: "Tipo", value: "Arma de Uma Mão Mágica" },
          { label: "Compra", value: "300 coroas" },
          { label: "Venda", value: "125 coroas" },
        ],
        description: "+1 modificador de dano. Forjada do lendário metal anão Gromril, esta arma mágica corta mais profundo que aço comum.",
      },
      {
        id: "ithilmar-hand-weapon",
        name: "Arma de Uma Mão de Ithilmar",
        properties: [
          { label: "Tipo", value: "Arma de Uma Mão Mágica" },
          { label: "Compra", value: "500 coroas" },
          { label: "Venda", value: "200 coroas" },
        ],
        description: "+1 Ímpeto. Forjada do metal élfico Ithilmar, leve como pluma mas afiada como obsidiana. Move-se tão rápido que inimigos mal a veem.",
      },
      {
        id: "blessed-dessecrated-hand-weapon",
        name: "Arma de Uma Mão Abençoada/Profanada",
        properties: [
          { label: "Tipo", value: "Arma de Uma Mão Mágica" },
          { label: "Compra", value: "300 coroas" },
          { label: "Venda", value: "125 coroas" },
        ],
        description: "+2 Vontade. Abençoada por sacerdotes sagrados ou profanada em rituais sombrios, esta arma mágica fortalece a vontade do portador.",
      },
      {
        id: "gromril-two-handed-weapon",
        name: "Arma de Duas Mãos de Gromril",
        properties: [
          { label: "Tipo", value: "Arma de Duas Mãos Mágica" },
          { label: "Compra", value: "300 coroas" },
          { label: "Venda", value: "125 coroas" },
        ],
        description: "+1 modificador de dano. Montante massivo de Gromril anão, cada golpe cliva armadura como se fosse papel.",
      },
      {
        id: "ithilmar-two-handed-weapon",
        name: "Arma de Duas Mãos de Ithilmar",
        properties: [
          { label: "Tipo", value: "Arma de Duas Mãos Mágica" },
          { label: "Compra", value: "500 coroas" },
          { label: "Venda", value: "200 coroas" },
        ],
        description: "+1 Ímpeto. Arma de duas mãos de Ithilmar élfico, impossível mente leve para seu tamanho, permitindo golpes devastadores com velocidade sobrenatural.",
      },
      {
        id: "blessed-dessecrated-two-handed-weapon",
        name: "Arma de Duas Mãos Abençoada/Profanada",
        properties: [
          { label: "Tipo", value: "Arma de Duas Mãos Mágica" },
          { label: "Compra", value: "300 coroas" },
          { label: "Venda", value: "125 coroas" },
        ],
        description: "+2 Vontade. Grande lâmina abençoada ou profanada, canaliza poder divino ou sombrio, fortalecendo a vontade do portador.",
      },
      {
        id: "oak-greatbow",
        name: "Grande Arco de Carvalho",
        properties: [
          { label: "Tipo", value: "Arco Mágico" },
          { label: "Compra", value: "300 coroas" },
          { label: "Venda", value: "125 coroas" },
        ],
        description: "+1 modificador de dano. Arco longo feito de carvalho centenário encantado, suas flechas perfuram mais profundo que flechas comuns.",
      },
      {
        id: "elven-bow",
        name: "Arco Élfico",
        properties: [
          { label: "Tipo", value: "Arco Mágico" },
          { label: "Compra", value: "600 coroas" },
          { label: "Venda", value: "250 coroas" },
        ],
        description: "+1 Tiro. Arco élfico perfeitamente equilibrado, praticamente mira sozinho. Cada flecha voa verdadeiro como se guiada por magia.",
      },
      {
        id: "repeater-crossbow",
        name: "Besta Repetidora",
        properties: [
          { label: "Tipo", value: "Besta Mágica" },
          { label: "Compra", value: "300 coroas" },
          { label: "Venda", value: "125 coroas" },
        ],
        description: "+1 modificador de dano. Besta enfeitiçada que carrega e dispara virotes com velocidade sobrenatural.",
      },
      {
        id: "gromril-framed-crossbow",
        name: "Besta com Estrutura de Gromril",
        properties: [
          { label: "Tipo", value: "Besta Mágica" },
          { label: "Compra", value: "600 coroas" },
          { label: "Venda", value: "250 coroas" },
        ],
        description: "+1 Tiro. Estrutura de Gromril anão torna esta besta incrivelmente precisa, virotes voam perfeitamente em linha reta.",
      },
      {
        id: "stilleto-dagger",
        name: "Adaga Estilete",
        properties: [
          { label: "Tipo", value: "Adaga Mágica" },
          { label: "Compra", value: "400 coroas" },
          { label: "Venda", value: "200 coroas" },
        ],
        description: "+1 Ímpeto. Adaga fina e longa, perfeitamente balanceada, encontra juntas de armadura com facilidade assustadora.",
      },
      {
        id: "serrated-dagger",
        name: "Adaga Serrilhada",
        properties: [
          { label: "Tipo", value: "Adaga Mágica" },
          { label: "Compra", value: "400 coroas" },
          { label: "Venda", value: "150 coroas" },
        ],
        description: "+1 modificador de dano. Lâmina serrilhada que rasga carne e causa ferimentos horríveis.",
      },
      {
        id: "swordbreaker-knife",
        name: "Faca Quebra-Espadas",
        properties: [
          { label: "Tipo", value: "Adaga Mágica" },
          { label: "Compra", value: "500 coroas" },
          { label: "Venda", value: "200 coroas" },
        ],
        description: "+2 modificador de dano. Lâmina pesada e brutal que quebra armas inimigas e esmaga ossos.",
      },
      {
        id: "athel-loren-staff",
        name: "Cajado de Athel Loren",
        properties: [
          { label: "Tipo", value: "Cajado Mágico" },
          { label: "Compra", value: "300 coroas" },
          { label: "Venda", value: "125 coroas" },
        ],
        description: "+1 Ímpeto. Cajado élfico de madeira viva de Athel Loren, leve mas surpreendentemente resistente em combate.",
      },
    ],
  },
  {
    id: "magic-armor",
    label: "Armaduras e Escudos Mágicos",
    icon: "🛡️",
    items: [
      {
        id: "gromril-light-armour",
        name: "Armadura Leve de Gromril",
        properties: [
          { label: "Tipo", value: "Armadura Leve Mágica" },
          { label: "Compra", value: "600 coroas" },
          { label: "Venda", value: "200 coroas" },
        ],
        description: "+1 Armadura. Armadura leve forjada do lendário metal anão Gromril, fornece proteção superior sem sacrificar mobilidade.",
      },
      {
        id: "dragon-scaled-heavy-armour",
        name: "Armadura Pesada de Escamas de Dragão",
        properties: [
          { label: "Tipo", value: "Armadura Pesada Mágica" },
          { label: "Compra", value: "800 coroas" },
          { label: "Venda", value: "300 coroas" },
        ],
        description: "Absorção Elemental. Placas de escamas de dragão entrelaçadas, absorve dano elemental enquanto protege contra golpes mundanos.",
      },
      {
        id: "gromril-shield",
        name: "Escudo de Gromril",
        properties: [
          { label: "Tipo", value: "Escudo Mágico" },
          { label: "Compra", value: "700 coroas" },
          { label: "Venda", value: "250 coroas" },
        ],
        description: "+1 Armadura. Escudo forjado de Gromril anão, praticamente indestrutível, deflecte golpes que quebrariam escudos comuns.",
      },
      {
        id: "ring-of-warding",
        name: "Anel de Proteção",
        properties: [
          { label: "Tipo", value: "Anel Mágico" },
          { label: "Compra", value: "600 coroas" },
          { label: "Venda", value: "250 coroas" },
        ],
        description: "+1 Armadura. Anel enfeitiçado com runas protetoras, cria campo de força invisível ao redor do portador.",
      },
      {
        id: "white-wolf-pelt",
        name: "Pele de Lobo Branco",
        properties: [
          { label: "Tipo", value: "Acessório Mágico" },
          { label: "Compra", value: "600 coroas" },
          { label: "Venda", value: "250 coroas" },
        ],
        description: "+1 Armadura. Pele de lobo branco sagrado de Ulric, enfeitiçada para endurecer em combate, desviando golpes.",
      },
      {
        id: "wyrm-cloak",
        name: "Manto de Serpente",
        properties: [
          { label: "Tipo", value: "Manto Mágico" },
          { label: "Compra", value: "500 coroas" },
          { label: "Venda", value: "200 coroas" },
        ],
        description: "Absorção Elemental. Manto feito de escamas de serpente mágica, absorve energia elemental e protege contra fogo e gelo.",
      },
    ],
  },
];
