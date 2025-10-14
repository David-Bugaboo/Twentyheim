export const pactSacrifices = [
  {
    name: "Sangria Ritual",
    description:
      "O Ritualista deve oferecer parte de seu próprio sangue ao Daemônio. Ele começa cada jogo com -4 Vigor.",
  },
  {
    name: "Oferendas de Pedra-Bruxa",
    description:
      "O Ritualista deve oferecer um Fragmento de Pedra-Bruxa após cada jogo. Depois de um jogo, o ritualista deve selecionar um Fragmento de Pedra-Bruxa adquirido durante o jogo e descartá-lo. O Ritualista pode sempre escolher qual fragmento descartar, mas a escolha deve ser feita antes de qualquer rolagem na tabela de tesouro. Se um Ritualista não ganhar Fragmentos de Pedra-Bruxa durante um jogo, ele deve oferecer 50 coroas em vez disso (note que um ritualista nunca pode escolher oferecer as 50 coroas em vez de um Fragmento de Pedra-Bruxa). Se ele não puder fazer nenhum dos dois, seu pacto é quebrado.",
  },
  {
    name: "Congregação Negra",
    description:
      "Um membro do bando deve permanecer na base do ritualista para realizar devoções. Pode ser qualquer membro do bando exceto cães de guerra, mortos-vivos e constructos. Não precisa ser o mesmo membro do bando todas as vezes. Não pode ser um membro do bando que deve de outra forma perder o próximo jogo enquanto se recupera de um ferimento.",
  },
  {
    name: "Essência da Alma",
    description:
      "O ritualista deve oferecer uma parte de sua habilidade de conjuração. Antes do jogo, determine aleatoriamente uma magia conhecida pelo ritualista. Ele não pode conjurar esta magia antes, durante ou depois do próximo jogo.",
  },
  {
    name: "Devoção Inabalável",
    description:
      "O ritualista começa cada jogo com uma oração silenciosa. O ritualista pode realizar apenas uma ação por turno pelo resto do jogo.",
  },
];

export const pactBoons = [
  {
    name: "Pacto de Nurgle",
    description:
      "A primeira vez que o Ritualista seria reduzido a 0 vigor, ele é reduzido a 1 vigor em vez disso.",
  },
  {
    name: "Pacto de Tzeentch",
    description:
      "O ritualista ganha um atributo daemônico menor aleatório. Role uma vez na Tabela de Atributos Daemônicos Menores (Note que resultados de Apunhalador, Camaleônico, Levitação ou Teletransporte devem ser rolados novamente). Uma vez que um atributo tenha sido determinado, o ritualista pode escolher rolar novamente, mas deve aceitar o segundo resultado. Uma vez que um resultado tenha sido determinado, o ritualista ganha os efeitos do atributo (simplesmente substitua a palavra 'daemônio' pela palavra 'ritualista' na descrição do atributo). Embora muitos desses atributos mudem a aparência física do ritualista, eles não são permanentes. Se o pacto entre o ritualista e o daemônio for quebrado, esta bênção será perdida. Além disso, se o atributo resultar em um aumento de atributo, ele deve ser escrito como um atributo dividido. Este aumento não se aplica ao aprendiz, mas também não se aplica ao avanço máximo do ritualista naquele atributo. Assim, é possível para um ritualista ter Ímpeto +5 e um atributo daemônico que lhe dá +1 Ímpeto, para um total de Ímpeto +5/+6.",
  },
  {
    name: "Pacto de Slaanesh",
    description:
      "Ao rolar por tesouro após um jogo, o ritualista pode rolar novamente qualquer resultado em uma tabela de tesouro. Se ele escolher fazer isso, deve aceitar o segundo resultado. Um ritualista pode rolar por todo seu tesouro antes de selecionar qual resultado descartar e rolar novamente.",
  },
  {
    name: "Pacto de Khorne",
    description:
      "Um ritualista que conjure com sucesso Subjulgar Daemônio durante um jogo pode escolher aprisionar aquele daemônio dentro de uma arma de qualquer tipo. Imediatamente remova o daemônio do jogo. Aquela arma mágica não conta para o limite de itens do ritualista durante o jogo, e é armazenada no cofre do ritualista após o jogo. Uma arma de Selo Daemônico é uma arma mágica que causa +1 de dano, causa dano mágico e pode ser descartada para fornecer um bônus de +3 para qualquer rolagem de Ímpeto ou Precisão. A decisão de usar a Arma de Selo Daemônico deve ser feita antes da rolagem. Apenas uma Arma de Selo Daemônico pode ser usada para qualquer rolagem específica, mesmo se duas armas de Selo Daemônico estiverem sendo carregadas.",
  },
  {
    name: "Pacto do Caos Indiviso",
    description:
      "Uma vez por jogo, o jogador controlando este ritualista pode rolar novamente qualquer rolagem de dado feita por qualquer membro de seu bando, incluindo rolagens de iniciativa. Não pode ser usado para rolagens feitas por criaturas aleatórias, outros bandos, ou outros efeitos aleatórios. Só pode ser usado durante um jogo e não pode ser guardado de um jogo para o próximo. Quando um dado é rolado novamente, a rolagem anterior é perdida, e a nova rolagem deve ser aceita. Nunca é possível rolar novamente uma rolagem que já foi rolada novamente.",
  },
];
