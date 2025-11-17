export interface WarbandInfo {
  factionSlug: string;
  name: string;
  specialRules?: { label: string; value: string }[];
  showMutations?: boolean;
  showBlessings?: boolean;
  spellLores?: string[];
  skillLists?: string[];
  lore?: string; // HTML content
  bandStructure?: string; // HTML content
}

const warbandData: WarbandInfo[] = [
  // Exemplo de estrutura - adicione os dados reais aqui
  // {
  //   factionSlug: "sisters-of-sigmar",
  //   name: "Irmãs de Sigmar",
  //   specialRules: ["Regra especial 1", "Regra especial 2"],
  //   showMutations: false,
  //   showBlessings: true,
  //   spellLores: ["lore-of-light"],
  //   skillLists: ["warrior-priest"],
  //   lore: "<p>Lore do bando em HTML...</p>",
  // },

  {
    factionSlug: "saqueadores-homem-fera",
    name: "Saqueadores Homem-Fera",
    specialRules: [
      {
        label: "Animalescos",
        value:
          "Homens-Fera são criaturas temíveis do Caos que não interagem com outras raças, exceto para matá-las. Um bando de Homens-Fera nunca pode contratar Mercenários.",
      },
    ],
    showMutations: false,
    showBlessings: false,
    spellLores: ["rituais-do-caos"],
    skillLists: ["saqueadores-homem-fera"],
    lore: `
            <p>
              Os Homens-Fera são figuras brutais, selvagens e aberrantes que
              vivem nas florestas profundas. Qualquer um que viaje através desta
              natureza selvagem corre o risco de ser atacado por estes
              saqueadores imprevisíveis. Muitos daqueles que habitam nos bosques
              ao redor dos arredores de Mordheim afirmam que essas figuras vis
              do Caos superam a humanidade em número, embora tais afirmações
              sejam impossíveis de provar, pois os Homens-Fera não constroem
              cidades e não criam qualquer forma estruturada de sociedade.
           </p>

            <p>
              Ordem e organização são estranhos e odiados por eles, e eles vagam
              onde querem, pilhando e matando por qualquer coisa que precisem ou
              queiram. Eles voluntariamente se voltam uns contra os outros,
              atormentando os mais fracos entre eles por comida e diversão. Os
              Homens-Fera naturalmente formam bandos errantes, embora seja
              desconhecido se o fazem conscientemente ou meramente por instinto.
           </p>

            <p>
              "Eles são liderados pelo mais forte e mais feroz de sua espécie, e
              se algum membro do bando perceber uma fraqueza em seu líder, eles
              se voltarão contra ele em um desafio de liderança brutal que só
              pode resultar em um dos dois sendo morto e consumido pelo
              vencedor."
           </p>

            <p>
              Um pequeno bando é capaz de se mover rapidamente através da
              natureza selvagem sem ser notado, e pode cobrir centenas de milhas
              a cada estação enquanto viajam onde querem. Literalmente milhares
              desses pequenos bandos infestam as florestas sombrias do Velho
              Mundo, predando viajantes e fazendas.
           </p>

            <p>
              Um bando de Homens-Fera ataca sem aviso, e aldeões, comerciantes e
              viajantes vivem em constante medo de emboscada desses habitantes
              da floresta. Eles tentam se preparar para tal evento, e
              frequentemente apelam desesperadamente aos nobres para varrer as
              florestas com suas tropas estatais - no entanto, em tempos de
              agitação política, os nobres têm preocupações muito mais urgentes
              do que os apelos dos aldeões de baixo nascimento.
           </p>

            <p>
              "Cheios de malícia, os Homens-Fera têm um prazer particular em
              derrubar as estruturas cuidadosamente construídas e ordenadas dos
              homens. Eles derrubam cercas e reduzem edifícios a escombros,
              permitindo que sejam reclamados pela floresta."
           </p>

            <p>
              Forçados a se defender sozinhos, aldeões aterrorizados derrubam
              grandes faixas da floresta ao redor de seus assentamentos, e às
              vezes contratam os serviços de mercenários para protegê-los,
              barricando-se em casa quando ouvem rumores de um bando saqueador
              na área. No entanto, as purgas da floresta são quase sempre
              desesperançosas, pois os bandos de Homens-Fera geralmente se movem
              para longe de uma área que atacaram muito antes que qualquer
              retaliação organizada possa ser montada.
           </p>`,
    bandStructure: `

            <p>
              Um bando de Homens-Fera deve incluir um mínimo de 3 modelos. Você
              tem 500 coroas que pode usar para recrutar seu bando inicial. O
              número máximo de guerreiros no bando é 15, embora alguns edifícios
              no acampamento do bando possam aumentar isso.
           </p>

            <p>
              • <strong>Chefe Tribal Homem-Fera:</strong> Cada bando de
              Homens-Fera deve ter um Chefe: nem mais, nem menos!
              <br />• <strong>Xamã Homem-Fera:</strong> Seu bando pode incluir
              um único Xamã Homem-Fera (0-1).
              <br />• <strong>Bestigor:</strong> Seu bando pode incluir até dois
              Bestigors (0-2).
              <br />• <strong>Centigor:</strong> Seu bando pode incluir um único
              Centigor (0-1).
              <br />• <strong>Gor:</strong> Seu bando pode incluir até cinco Gor
              (0-5).
              <br />• <strong>Ungor:</strong> Seu bando pode incluir qualquer
              número de Ungor (ilimitado).
              <br />• <strong>Minotauro:</strong> Seu bando pode incluir um
              único Minotauro (0-1).
              <br />• <strong>Cães de Guerra do Caos:</strong> Seu bando pode
              incluir até cinco Cães de Guerra do Caos (0-5).
           </p>
          `,
  },
  {
    factionSlug: "circo-do-caos",
    name: "Circo do Caos",
    specialRules: [
      {
        label: "Companhia Perigosa",
        value:
          "Devido à sua natureza bastante doentia, uma banda do Circo do Caos teria muita dificuldade em manter qualquer mercenário vivo! Portanto, um Circo do Caos nunca pode contratar nenhum tipo de mercenário.",
      },
      {
        label: "Maculados",
        value:
          "O Circo do Caos conta como um bando de Culto dos Possuídos para propósitos de exploração e ferimentos graves.",
      },
    ],
    showMutations: false,
    showBlessings: true,
    spellLores: ["rituais-de-nurgle"],
    skillLists: [],
    lore: `<p>
              Ninguém sabe de onde veio o temido Circo do Caos. Alguns dizem que
              teria sido, em tempos antigos, uma caravana de ciganos do leste do
              Império, um povo itinerante que levava sua arte colorida de aldeia
              em aldeia. Se isso foi verdade no passado, o presente é muito mais
              sinistro e letal: ainda vaga pelos ermos do Império como um
              cortejo multicolorido de carroças, seus artistas vestidos com o
              luxo espalhafatoso de trupes itinerantes, levando versos e canções
              aos camponeses excitados.
           </p>
            <p>
              Ao chegar a um novo povoado, os saltimbancos erguem seu palco e
              encantam o povo com canções e peças sobre os dias sombrios do
              Império. Halterofilistas executam façanhas de força, malabaristas
              jogam bolas, facas e tochas flamejantes, enquanto o palhaço salta
              entre a plateia com sua bexiga de porco inflada, rindo e zombando.
           </p>
            <p>
              Apenas quando o espetáculo atinge o clímax blasfemo, com o sol se
              pondo, a verdade é revelada em toda sua glória pútrida: não são
              meros artistas, mas daemônios ciclópicos, com carne podre pendendo
              de ossos amarelados. As máscaras e maquiagens se mostram rostos
              verdadeiros, cobertos de pústulas e lesões variolentas. A alegria
              vira terror — e a matança começa.
           </p>`,
    bandStructure: `
            <p>
              Um bando do Circo do Caos deve incluir ao menos 3 modelos e pode
              ter até 15. Você tem 500 coroas de ouro para recrutar seu bando
              inicial.
           </p>
           

            <p>
             <br/>
              • <strong>Mestre de Cerimônias:</strong> Cada bando de
              Circo do Caos deve ter um Mestre de Cerimônias: nem mais, nem menos!
              
              <br />• <strong>Brutamontes:</strong> Seu bando pode incluir até dois
              Brutamontes (0-2).
              <br />• <strong>Apodrecidos:</strong> Seu bando pode incluir até dois
              Apodrecidos (0-2).
              <br />• <strong>Enfermos:</strong> Seu bando pode incluir até dois
              Enfermos (0-2).
              <br />• <strong>Cultistas:</strong> Seu bando pode incluir qualquer
              número de Cultistas (ilimitado).
              <br />• <strong>Nurguinhos:</strong> Seu bando pode incluir qualquer
              número de Nurguinhos (ilimitado).
              <br />• <strong>Carro da Praga:</strong> Seu bando pode incluir apenas um
              Carro da Praga (0-1).
              
           </p>
          `,
  },
  {
    factionSlug: "culto-dos-possuidos",
    name: "Culto dos Possuídos",
    specialRules: [],
    showMutations: true,
    showBlessings: false,
    spellLores: ["rituais-do-caos"],
    skillLists: [],
    lore: `<p>
              Nunca há escassez de homens dispostos a arriscar suas vidas por uma chance de poder real: homens cujas ambições estão além do escopo de seu direito de nascimento, ou cujas habilidades sobrenaturais ou deformidades físicas os colocam em constante perigo de perseguição. O que tais homens têm a perder se prometerem suas almas aos deuses sombrios do Caos! No rescaldo da destruição de Mordheim, todo tipo de mutante apareceu, enquanto muitos até então sem mácula sentem o despertar de poderes estranhos, os primeiros despertamentos de dons mágicos destinados a levá-los a uma morte ardente nas mãos dos Caçadores de Bruxas.
           </p>
            <p>
              Agora um líder apareceu, um novo Imperador Sombrio, que reivindica o senhorio da Cidade dos Condenados. Ele é chamado de Senhor das Sombras, Mestre dos Possuídos, e seguidores dos cultos do Caos se reúnem de todo o Império para prometer suas almas a ele. Embora ninguém saiba se ele é homem ou Daemon, todos o proclamam seu salvador e ansiosamente buscam fazer sua vontade.
           </p>
            <p>
              Como todos os estudantes das artes sombrias sabem, é pelo poder da magia que criaturas como Daemons e espíritos são capazes de perseguir o mundo mortal. A pedra-bruxa que prolifera em Mordheim concede vida antinatural a muitas coisas vis que por todos os direitos naturais nunca deveriam existir. Os Possuídos eram uma vez homens, mas ao se renderem completamente aos deuses sombrios, permitiram que Daemons possuíssem seus corpos. Sua aparência é horripilante – corrompidos por dentro, sua carne é torcida em uma nova forma monstruosa.
           </p>
            <p>
              Com o poder dos Possuídos atrás deles, os seguidores do Senhor das Sombras cresceram poderosos em Mordheim. No Massacre da Rua da Prata, o Culto dos Possuídos emboscou e destruiu uma grande força enviada para caçá-los. Agora as ruas de Mordheim pertencem ao Senhor das Sombras e seus servos. O ar contaminado não os afeta de forma alguma ou, mais provavelmente, nutre sua corrupção interior. Homens que se aventuram em Mordheim sozinhos são caçados e sacrificados aos deuses sombrios. Todos os bandos dos Possuídos coletam pedra-bruxa para o Senhor das Sombras, que permanece escondido no Poço, onde se diz que é guardado por Possuídos titânicos do tamanho de casas. Alguns fragmentos da pedra preciosa são mantidos pelos bandos e usados para criar mais dos Possuídos.
           </p>
            <p>
              Os líderes dos bandos de culto são chamados de Magisters e cada um lidera um grupo de cultistas: lacaios dos deuses sombrios do Caos. Estes são homens cuja fome por poder não conhece limites, que voluntariamente entregam seus corpos à possessão. Todos participam dos sacrifícios de sangue, rituais sombrios e adoração de Daemons – nada é muito baixo para eles! Esses humanos degenerados são acompanhados por outras criaturas tão vis quanto eles – coisas meio-homem meio-feras que se chamam de Gors, e que os homens se referem como Homens-Fera.
           </p>
            <p>
              Há poucas visões tão horripilantes quanto um bando de culto. Guerreiros enlouquecidos manchados de sangue e sujeira acenam com armas irregulares e cantam ritos blasfemos enquanto se lançam sobre seus inimigos. Muitos dificilmente são reconhecíveis como humanos, seus corpos são tão cicatrizados e desfigurados. O estigma da mutação é carregado pela maioria, mas os mais perturbadores de todos são os próprios Possuídos – carne fundida feita de homens, feras e metal movidos pela vontade implacável de um Daemon.
           </p>`,
    bandStructure: `
            <p>
              Um bando dos Possuídos deve incluir um mínimo de 3 modelos. Você tem 500 coroas de ouro para recrutar seu bando inicial. O número máximo de guerreiros no bando nunca pode exceder 15.
           </p>
            <p>
              <br/>
              • <strong>Magistrado do Caos:</strong> Cada bando dos Possuídos deve ter um Magistrado do Caos: nem mais, nem menos!
              <br />• <strong>Possuído:</strong> Seu bando pode incluir até dois Possuídos (0-2).
              <br />• <strong>Mutante:</strong> Seu bando pode incluir até dois Mutantes (0-2).
              <br />• <strong>Alma Sombria:</strong> Seu bando pode incluir até cinco Almas Sombrias (0-5).
              <br />• <strong>Cultista:</strong> Seu bando pode incluir qualquer número de Cultistas(ilimitado).
              <br />• <strong>Homem-Fera:</strong> Seu bando pode incluir até três Homens-Fera Gors (0-3).
           </p>
          `,
  },
  {
    factionSlug: "cacadores-de-tesouro-anoes",
    name: "Caçadores de Tesouro Anões",
    specialRules: [
      {
        label: "Cabeça Dura",
        value: "Anões são imunes a palavra-chave Concussiva(X).",
      },
      {
        label: "Devagar e Sempre",
        value:
          "Anões nunca sofrem penalidades de movimento por usar armadura ou equipamentos, mas também nunca ganham bônus pelo uso de equipamentos.",
      },
      {
        label: "Rancor Ancestral",
        value: "Todos os Anões tem a característica Ódio(Orcs e Goblins).",
      },
      {
        label: "Rivalidade com Elfos",
        value:
          "Anões mantêm um rancor antigo contra Elfos desde os dias em que as duas raças lutaram pela supremacia no Velho Mundo. Um bando de Anões nunca pode incluir qualquer tipo de Mercenário ou Lenda da raça elfo.",
      },
      {
        label: "Mineiros Incomparáveis",
        value:
          "Anões passam grande parte de suas vidas no subsolo procurando por minerais preciosos, e são os melhores do mundo nesse tipo de trabalho. Na cidade de Mordheim, eles aplicam habilidades similares na busca por pedra-bruxa. Ao verificar pedra-bruxa no final de uma partida, adicione +1 ao número de pedaços encontrados para um bando de Anões.",
      },
    ],
    showMutations: false,
    showBlessings: false,
    spellLores: [],
    skillLists: ["cacadores-de-tesouro-anoes"],
    lore: `<p>
              Anões são um povo soturno e excepcionalmente orgulhoso. Eles respeitam três coisas acima de tudo: idade, riqueza e habilidade. Não é surpresa então que esses guerreiros sombrios possam ser encontrados em Mordheim procurando por fama e fortuna.
           </p>
            <p>
              Ocasionalmente, um nobre Anão se encontrará em maus lençois. Seu domínio familiar pode ter sido invadido por Goblins ou Skaven, ou ele pode ter de alguma forma se desonrado e sido banido. Outros Anões conhecem esses guerreiros como os Despossuídos. Anões são uma raça orgulhosa e é contra a natureza de um Anão se perder no desespero. Em vez disso, um nobre que se encontra em tal situação desesperadora reunirá um grupo de seus amigos e parentes mais próximos e irá caçar tesouros, esperando acumular um tesouro grande o suficiente para estabelecer seu próprio domínio. Neste momento, a maior fonte de riqueza no Mundo Conhecido é rumorejada ser uma cidade no Império. A cidade é conhecida como Mordheim...
           </p>`,
    bandStructure: `
            <p>
              Um bando de Anões deve incluir um mínimo de 3 modelos. Você tem 500 coroas de ouro que pode usar para recrutar e equipar seu bando. O número máximo de guerreiros no bando é 12.
           </p>
            <p>
              <br/>
              • <strong>Nobre de Kharadron:</strong> Cada bando de Anões deve ter um Nobre de Kharadron: nem mais, nem menos!
              <br />• <strong>Engenheiro de Kharadron:</strong> Seu bando pode incluir até um Engenheiro de Kharadron (0-1).
              <br />• <strong>Caçador de Trolls:</strong> Seu bando pode incluir até dois Caçadores de Trolls (0-2).
              <br />• <strong>Irmão de Clã:</strong> Seu bando pode incluir qualquer número de Irmãos de Clã (ilimitado).
              <br />• <strong>Fuzileiro Anão:</strong> Seu bando pode incluir até cinco Fuzileiros Anões (0-5).
              <br />• <strong>Barbichas:</strong> Seu bando pode incluir qualquer número de Barbichas (ilimitado).
           </p>
          `,
  },
  {
    factionSlug: "mercenarios-reikland",
    name: "Mercenários de Reikland",
    specialRules: [],
    showMutations: false,
    showBlessings: false,
    spellLores: [],
    skillLists: [],
    lore: `<p>
              Reikland fica no coração do Império e sua maior cidade é Altdorf, lar do Grande Teogonista e sede do Templo de Sigmar. Reiklanders são devotos seguidores de Sigmar, o fundador, primeiro Imperador e deus patrono do Império. O Grande Príncipe de Reikland (como Siegfried, o governante de Reikland, se intitula) é apoiado em sua reivindicação ao trono pelo Grande Teogonista e é mais fortemente oposto pelo Conde de Middenheim e pelos Sacerdotes de Ulric.
           </p>
            <p>
              Por todo o Império, os Reiklanders são conhecidos por personificar a disciplina e lealdade do guerreiro profissional. Corajosos e bem versados nas artes da guerra, os Reiklanders desdenham roupas da moda e usam equipamentos de guerra bem feitos e práticos. Em batalha, eles frequentemente usam fitas coloridas como marcas de identificação ou autoridade. Eles são justamente orgulhosos de seu dinâmico e ambicioso Grande Príncipe e desprezam os outros pretendentes ao trono, especialmente o Conde de Middenheim, Mannfred Todbringer, a quem eles zombam chamando de "cãozinho de Ulric".
           </p>`,
    bandStructure: `
            <p>
              Um bando de Mercenários deve incluir um mínimo de 3 modelos. Você tem 500 coroas de ouro disponíveis para gastar. O número máximo de guerreiros no bando nunca pode exceder 15.
           </p>
            <p>
              <br/>
              • <strong>Capitão de Reikland:</strong> Cada bando de Mercenários de Reikland deve ter um Capitão de Reikland: nem mais, nem menos!
              <br />• <strong>Campeão de Reikland:</strong> Seu bando pode incluir até dois Campeões de Reikland (0-2).
              <br />• <strong>Recruta de Reikland:</strong> Seu bando pode incluir até dois Recrutas de Reikland (0-2).
              <br />• <strong>Soldado de Reikland:</strong> Seu bando pode incluir qualquer número de Soldados de Reikland (ilimitado).
              <br />• <strong>Atirador de Elite de Reikland:</strong> Seu bando pode incluir no máximo sete Atiradores de Elite de Reikland (0-7).
              <br />• <strong>Espadachim de Reikland:</strong> Seu bando pode incluir no máximo cinco Espadachins de Reikland (0-5).
           </p>
          `,
  },
  {
    factionSlug: "mercenarios-middenheim",
    name: "Mercenários de Middenheim",
    specialRules: [],
    showMutations: false,
    showBlessings: false,
    spellLores: [],
    skillLists: [],
    lore: `<p>
              Middenheim fica no topo de uma montanha cercada por uma grande floresta sombria no centro de Middenland. Também é conhecida como a Cidade do Lobo Branco, em homenagem a Ulric, o antigo deus dos lobos e do inverno. O Sacerdócio de Ulric ainda é forte em Middenheim, onde Ulric é venerado como patrono da cidade. A tradição de rivalidade entre Middenheim e Reikland remonta a centenas de anos, e o Conde de Middenheim, Mannfred Todbringer, é um dos principais pretendentes ao trono do Imperador. Como resultado, sempre houve muito atrito entre os Middenheimers e o Templo de Sigmar.
           </p>
            <p>
              Os Middenheimers são tipicamente homens grandes e robustos com uma reputação bem merecida por ferocidade. Muitos usam peles de lobo, que o costume decreta serem a marca daqueles que mataram uma das feras lupinas com suas próprias mãos. Esses guerreiros soturnos são famosamente destemidos. Eles frequentemente vão para a batalha com a cabeça descoberta, zombando daqueles que escolhem, por razões de bom senso, usar Elmos. Como os Middenheimers favorecem cabelos longos e barbas, sua falta de proteção para a cabeça os faz parecer especialmente ferozes quando se lançam sobre seus inimigos uivando seus gritos de batalha brutais.
           </p>`,
    bandStructure: `
            <p>
              Um bando de Mercenários deve incluir um mínimo de 3 modelos. Você tem 500 coroas de ouro disponíveis para gastar. O número máximo de guerreiros no bando nunca pode exceder 15.
           </p>
            <p>
              <br/>
              • <strong>Capitão de Middenheim:</strong> Cada bando de Mercenários de Middenheim deve ter um Capitão de Middenheim: nem mais, nem menos!
              <br />• <strong>Campeão de Middenheim:</strong> Seu bando pode incluir até dois Campeões de Middenheim (0-2).
              <br />• <strong>Recruta de Middenheim:</strong> Seu bando pode incluir até dois Recrutas de Middenheim (0-2).
              <br />• <strong>Sacerdote Lupino de Ulric:</strong> Seu bando pode incluir um único Sacerdote Lupino de Ulric (0-1).
              <br />• <strong>Soldado de Middenheim:</strong> Seu bando pode incluir qualquer número de Soldados de Middenheim (ilimitado).
              <br />• <strong>Atirador de Middenheim:</strong> Seu bando pode incluir no máximo sete Atiradores de Middenheim (0-7).
              <br />• <strong>Espadachim de Middenheim:</strong> Seu bando pode incluir no máximo cinco Espadachins de Middenheim (0-5).
              
           </p>
          `,
  },
  {
    factionSlug: "mercenarios-marienburg",
    name: "Mercenários de Marienburg",
    specialRules: [
      {
        label: "Contatos Comerciais",
        value:
          "Como comerciantes naturais com contatos nas guildas mercantis, os bandos de Marienburg recebem um bônus de +3 ao fazer a atividade Procurar no Mercado Negro durante a fase de campanha.",
      },
      {
        label: "Patrocínio Influente",
        value:
          "Para refletir sua enorme riqueza, os Marienburgers começam com 100 coroas de ouro extras (600 no total) ao lutar em uma campanha. Em um jogo único, eles têm permissão para gastar 20% a mais de coroas de ouro ao recrutar um bando. Por exemplo, em um jogo de 1.000 coroas de ouro, um bando de Marienburgers terá 1.200 coroas.",
      },
    ],
    showMutations: false,
    showBlessings: false,
    spellLores: [],
    skillLists: [],
    lore: `<p>
              Marienburg é a maior e mais próspera cidade comercial do Velho Mundo. Muitos a chamam de Cidade do Ouro, o que por si só transmite uma boa ideia da riqueza desta cidade cosmopolita em expansão. Em nenhum outro lugar pode ser encontrada a vasta gama de lojas vendendo mercadorias de lugares tão distantes quanto os reinos élficos de Ulthuan no oeste e a distante Cathay no leste. Os artesãos da cidade representam toda habilidade conhecida pelo homem, e algumas outras além, de modo que se diz que em Marienburg não há atividade que não possa ser rapidamente transformada em lucro.
           </p>
            <p>
              Muitas guildas mercantis têm sua sede em Marienburg, a mais importante de todas sendo a secreta Alta Ordem dos Comerciantes Livres Honrados, que representa a elite da sociedade mercantil. Este grande, rico e ambicioso corpo de homens se sente acorrentado pela velha ordem e está ansioso para tomar o poder para si. Sua campeã para o trono do Imperador é a Lady Magritta. Graças à influência invisível dos Comerciantes Livres em todo o Império, todos os Eleitores menores foram persuadidos a apoiar a reivindicação da Lady Magritta. Foi apenas a recusa do Grande Teogonista em coroá-la que negou a Marienburg o trono, criando uma cunha entre a Cidade do Ouro e o Templo de Sigmar.
           </p>
            <p>
              Bandos enviados a Mordheim são sumptuosamente vestidos e armados. Embora os Marienburgers sejam frequentemente ridicularizados como afeminados e efeminados, sua habilidade com armas e completa falta de escrúpulos lhes rendeu respeito relutante. Suas principais habilidades estão em duelos e no uso de venenos e outros métodos de luta clandestinos. Indivíduos mais ricos se vestem de forma extravagante e usam joias. No entanto, a maior parte da maioria dos bandos é recrutada entre os bandidos do cais, tripulações de navios e estivadores que favorecem uma aparência mais simples: casacos de couro, bandanas e espadas curtas que são fáceis de esconder.
           </p>`,
    bandStructure: `
            <p>
              Um bando de Mercenários deve incluir um mínimo de 3 modelos. Você tem 500 coroas de ouro disponíveis para gastar. O número máximo de guerreiros no bando nunca pode exceder 15.
           </p>
            <p>
              <br/>
              • <strong>Capitão de Marienburg:</strong> Cada bando de Mercenários de Marienburg deve ter um Capitão de Marienburg: nem mais, nem menos!
              <br />• <strong>Campeão de Marienburg:</strong> Seu bando pode incluir até dois Campeões de Marienburg (0-2).
              <br />• <strong>Recruta de Marienburg:</strong> Seu bando pode incluir até dois Recrutas de Marienburg (0-2).
              <br />• <strong>Soldado de Marienburg:</strong> Seu bando pode incluir qualquer número de Soldados de Marienburg (ilimitado).
              <br />• <strong>Atirador de Marienburg:</strong> Seu bando pode incluir no máximo sete Atiradores de Marienburg (0-7).
              <br />• <strong>Espadachim de Marienburg:</strong> Seu bando pode incluir no máximo cinco Espadachins de Marienburg (0-5).
           </p>
          `,
  },
  {
    factionSlug: "horda-orc",
    name: "Hordas Orcs",
    specialRules: [
      {
        label: "Companhia Desagradável",
        value:
          "Muitos Mercenários se recusam a trabalhar para Orcs, pois sabem que eles são tão propensos a comê-los quanto a lutar ao seu lado. Orcs só podem contratar os seguintes Mercenários: Gladiador, Guarda-Costas Ogros, Bruxos ou Capatazes Orcs Negros.",
      },
      {
        label: "Animosidade",
        value:
          "Orcs e Goblins não gostam de nada mais que uma boa briga, a ponto de não ligar muito pra quem caem na porrada! No início de cada turno, role um dado para cada figura com a regra Animosidade. Um resultado de 1-5 significa que o guerreiro se ofendeu com algo que um de seus colegas de bando fez ou disse. Não role para modelos que estão em combate corpo a corpo (eles já estão brigando!). O guerreiro deve imediatamente declarar uma carga contra a figura aliada mais próxima. Caso seja impossível declarar a carga, a figura gasta sua ativação inteira xingando aquele que o ofendeu!",
      },
    ],
    showMutations: false,
    showBlessings: false,
    spellLores: ["magia-da-waaaaagh"],
    skillLists: ["hordas-orc"],
    lore: `<p>
              Ô BICHO, NÓIS ORC GOSTA É DUMA XINXA, VIU? NÓIS NUM TEM NADA QUE DÊ MAIS GOSTO QUE METER PORRADA E LEVAR UM MONTE DE COISA PRA CASA! A VIDA DUM ORC É ISSO AÍ, UM ARRANCA-RABO ATRÁS DO OUTRO — SEJA COM OUTRO ORC MAIS FELA-DA-PUTA, SEJA COM QUALQUER OUTRO CABRA QUE APAREÇA NO CAMINHO!
           </p>
            <p>
              MORDHEIM, Ó, É O PARAÍSO, CABA! CHEIO DE INIMIGO PRA QUEBRAR E DE OURO PRA CATAR… É O LUGAR PERFEITO PRA UM ORC DA PESTE VIRAR CHEFAUM, VIU? ENTRE OS POVO TUDO DESSE MUNDÃO, NUM TEM QUEM GOSTE MAIS DUM SAQUE QUE NÓIS, OS ORC E OS GOBLINVÉI! POR ISSO MESMO, UM BOCADO DE BANDO DE ORC VEIO SE JUNTAR EM MORDHEIM, ATRÁS DESSAS PEDRA MALUCA AÍ, AS TAL DA PEDRA-BRUXA.
           </p>
            <p>
              MAS, VOU TE DIZER, NÓIS PREFERE É ESPERAR OS OUTRO ABESTADO CATAR E DEPOIS DAR UM BOTE NELES, VIU? DIVERSÃO DAS BOA! NO FIM DAS CONTA, O QUE IMPORTA É O MESMO PRA TODO MUNDO: PEGAR O MÁXIMO DE DINHEIRO E SAIR RINDO COM OS BOLSO CHEIO, CARAI!
           </p>`,
    bandStructure: `
            <p>
              Um bando orc deve incluir um mínimo de 3 modelos. Você tem 500 coroas que pode usar para recrutar e equipar seu bando. O número máximo de guerreiros no bando é 20.
           </p>
            <p>
              <br/>
              • <strong>Chefaum Orc:</strong> Cada bando orc deve ter um Chefaum: nem mais, nem menos!
              <br />• <strong>Orc Véio:</strong> Seu bando pode incluir até um Orc Véio (0-1).
              <br />• <strong>Orc Grandaum:</strong> Seu bando pode incluir até dois Orc Grandaum (0-2).
              <br />• <strong>Minino Orc:</strong> Seu bando pode incluir de um a cinco Minino Orc (1-5).
              <br />• <strong>Goblin:</strong> Seu bando pode incluir qualquer número de Goblins (ilimitado).
              <br />• <strong>Pé-Duro das Cavernas:</strong> Seu bando pode incluir até cinco Pé-Duros das Cavernas (0-5).
              <br />• <strong>Troll:</strong> Seu bando pode incluir até um Troll (0-1).
           </p>
          `,
  },
  {
    factionSlug: "irmas-de-sigmar",
    name: "Irmãs de Sigmar",
    specialRules: [],
    showMutations: false,
    showBlessings: false,
    spellLores: ["oracoes-de-sigmar"],
    skillLists: ["irmas-de-sigmar"],
    lore: `<p>
              Por séculos, a nobreza do Império enviou suas filhas problemáticas ou indisciplinadas para o Santo Convento da Ordem das Irmãs Misericordiosas de Sigmar, em Mordheim, para serem iniciadas na única ordem de sacerdotisas dedicada ao deus padroeiro do Império.
           </p>
            <p>
              As Irmãs de Sigmar, como são mais conhecidas, tradicionalmente viajaram por todo o Império cuidando dos doentes e pobres, atendendo às necessidades dos órfãos, curando os enfermos e tratando dos corpos feridos. Além das artes de cura, que praticam com profundo conhecimento de ervas e orações, seu conselho é frequentemente procurado por aqueles prestes a tomar decisões importantes, pois as Irmãs de Sigmar são famosas por sua habilidade em prever o volúvel curso do destino.
           </p>
            <p>
              Embora outrora muito amadas pelo povo, as Irmãs têm visto sua popularidade diminuir nos últimos anos. Caçadores de bruxas fanáticos as denunciaram como feiticeiras e hereges, e até mesmo nos campos elas têm sido atacadas e expulsas pelos próprios camponeses que procuram ajudar. Muitos sacerdotes de Sigmar desejam dissolver a ordem completamente, alegando que mulheres não têm o direito de ensinar a palavra sagrada de Sigmar.
           </p>
            <p>
              De todos os habitantes de Mordheim, apenas as Irmãs de Sigmar estavam preparadas para a destruição. A vidente Cassandora havia previsto o desastre, e durante suas vigílias noturnas as Donzelas de Sigmar ouviram a voz do próprio deus sussurrando em suas mentes sonhadoras. Assim, sabiam que estariam a salvo em sua fortaleza elevada acima da cidade, distante dos vapores poluídos, desde que estivessem prontas para suportar o fogo da Fúria de Sigmar.
           </p>
            <p>
              As Irmãs acreditam ter uma missão sagrada — um dever imposto pelo próprio Sigmar, ao qual devem se dedicar de corpo e alma. Seu dever divino é reunir os fragmentos de Pedra-Bruxa e escondê-los profundamente sob a Rocha de Sigmar, nos cofres do convento, onde, protegidos por camadas de granito sólido e pelas preces eternas da irmandade, não possam causar mal ao povo de Sigmar.
           </p>`,
    bandStructure: `
            <p>
              Um bando das Irmãs de Sigmar deve incluir um mínimo de 3 modelos. Você tem 500 coroas que pode usar para recrutar e equipar seu bando. O número máximo de guerreiros no bando é 15.
           </p>
            <p>
              <br/>
              • <strong>Matriarca Sigmarita:</strong> Cada bando deve ter uma Matriarca Sigmarita: nem mais, nem menos!
              <br />• <strong>Irmã Superior:</strong> Seu bando pode incluir até três Irmãs Superiores (0-3).
              <br />• <strong>Áugure:</strong> Seu bando pode incluir até um Áugure (0-1).
              <br />• <strong>Irmã Sigmarita:</strong> Seu bando pode incluir de uma a cinco Irmãs Sigmaritas (1-5).
              <br />• <strong>Noviça:</strong> Seu bando pode incluir até dez Noviças (0-10).
           </p>
          `,
  },
  {
    factionSlug: "skaven-do-cla-enshin",
    name: "Skaven do Clã Eshin",
    specialRules: [],
    showMutations: false,
    showBlessings: false,
    spellLores: ["magia-do-rato-chifrudo"],
    skillLists: ["skaven-do-cla-enshin"],
    lore: `<p>
              Os Skaven são uma raça de ratos humanóides que vivem em vastos túneis subterrâneos sob as cidades do Império. Eles são mestres da conspiração, da traição e da guerra suja. O Clã Eshin é o mais secreto e letal de todos os clãs Skaven, especializado em assassinato, espionagem e artes marciais sombrias.
           </p>
            <p>
              Os assassinos do Clã Eshin são treinados desde a infância nas artes da morte silenciosa. Eles dominam o uso de venenos, armas exóticas e técnicas de combate que fazem até mesmo os mais experientes guerreiros do Império tremerem. Sua habilidade em se mover nas sombras é lendária, e muitos acreditam que eles podem se tornar invisíveis à vontade.
           </p>
            <p>
              Em Mordheim, os Skaven do Clã Eshin veem uma oportunidade única de expandir sua influência e coletar fragmentos de Pedra-Bruxa para seus experimentos sombrios. Eles operam nas sombras, eliminando rivais e coletando informações valiosas sobre os outros bandos que se aventuram nas ruínas da cidade amaldiçoada.
           </p>
            <p>
              Os Skaven são conhecidos por sua natureza traiçoeira e egoísta. Cada membro do bando está constantemente tentando subir na hierarquia, muitas vezes às custas de seus próprios companheiros. Apenas a ameaça de punição severa mantém a ordem relativa dentro do bando.
           </p>`,
    bandStructure: `
            <p>
              Um bando Skaven deve incluir um mínimo de 3 modelos. Você tem 500 coroas que pode usar para recrutar e equipar seu bando. O número máximo de guerreiros no bando é 20.
           </p>
            <p>
              <br/>
              • <strong>Assassino:</strong> Cada bando Skaven deve ter um Assassino: nem mais, nem menos!
              <br />• <strong>Bruxo do Clã Eshin:</strong> Seu bando pode incluir até um Bruxo do Clã Eshin (0-1).
              <br />• <strong>Skaven Sombrio:</strong> Seu bando pode incluir até dois Skaven Sombrios (0-2).
              <br />• <strong>Espreitador Noturno:</strong> Seu bando pode incluir até dois Espreitadores Noturnos (0-2).
              <br />• <strong>Pestilento:</strong> Seu bando pode incluir qualquer número de Pestilentos (ilimitado).
              <br />• <strong>Rato Gigante:</strong> Seu bando pode incluir qualquer número de Ratos Gigantes (ilimitado).
              <br />• <strong>Ogro Rato:</strong> Seu bando pode incluir até um Ogro Rato (0-1).
           </p>
          `,
  },
  {
    factionSlug: "cortes-vampiricas-von-carstein",
    name: "Cortes Vampíricas Von Carstein",
    specialRules: [],
    showMutations: false,
    showBlessings: false,
    spellLores: ["tradicao-da-necromancia"],
    skillLists: ["habilidades-von-carstein"],
    lore: `<p>
              Os vampiros da linhagem Von Carstein são os vampiros fundadores. Esses monstros são os vampiros mais prevalentes dentro das fronteiras do Império. A maioria dos vampiros desta linhagem pode ser encontrada no escuro Condado de Sylvania, onde se diz que o próprio Conde-Votante é seu desumano e ancestral líder. Os vampiros da linha Von Carstein são notórios por sua arrogância e afetação, com gostos caros e maneiras impecáveis, mas são predadores absolutamente implacáveis. Os Von Carsteins ocasionalmente têm negócios com vampiros de outros clãs; os Necrarchs cujo conhecimento nas artes sombrias eles cobiçam e os Blood Dragons cujas habilidades marciais eles admiram. Eles são profundamente suspeitos da irmandade das Lahmians e mantêm os Strigoi com profundo desprezo, caçando-os se forem encontrados dentro das fronteiras de suas terras.
           </p>`,
    bandStructure: `
            <p>
              Um bando dos Cortes Vampíricos deve incluir um mínimo de 3 modelos. Você tem 500 coroas que pode usar para recrutar e equipar seu bando. O número máximo de guerreiros no bando é 15.
           </p>
            <p>
              <br/>
              • <strong>Conde Vampiro Von Carstein:</strong> Cada bando deve ter um Conde Vampiro Von Carstein: nem mais, nem menos!
              <br />• <strong>Necromante:</strong> Seu bando pode incluir até um Necromante (0-1).
              <br />• <strong>Escória:</strong> Seu bando pode incluir até três Escórias (0-3).
              <br />• <strong>Zumbi:</strong> Seu bando pode incluir qualquer número de Zumbis (ilimitado).
              <br />• <strong>Carniçal:</strong> Seu bando pode incluir qualquer número de Carniçais (ilimitado).
              <br />• <strong>Lobo Atroz:</strong> Seu bando pode incluir até cinco Lobos Atrozes (0-5).
           </p>
          `,
  },
  {
    factionSlug: "cortes-vampiricas-dragao-carmesim",
    name: "Cortes Vampíricas Dragão Carmesim",
    specialRules: [],
    showMutations: false,
    showBlessings: false,
    spellLores: ["tradicao-da-necromancia"],
    skillLists: ["habilidades-de-dragao-carmesim"],
    lore: `<p>
              Os vampiros Dragão Carmesim são supostamente descendentes do guerreiro ancestal Abhorash, Senhor do Sangue. Acima de todos os vampiros, estes são de longe os mais honrados e talvez os mais conectados com seu passado humano. Eles são renomados como guerreiros excepcionais e lutam com bravura e cavalheirismo surpreendentes. Os vampiros Dragão Carmesim são raros no Império, com a maioria de seu número vindo de Bretonnia e do quase Mítico Forte Sanguíneo, que se especula estar localizada em algum lugar nas Montanhas Cinzentas. Os Dragões Carmesim têm muito pouco a ver com os vampiros de outros clãs, pois permanecem desinteressados em suas disputas políticas e jogos de poder.
           </p>`,
    bandStructure: `
            <p>
              Um bando dos Cortes Vampíricos deve incluir um mínimo de 3 modelos. Você tem 500 coroas que pode usar para recrutar e equipar seu bando. O número máximo de guerreiros no bando é 15.
           </p>
            <p>
              <br/>
              • <strong>Conde Vampiro Dragão Carmesim:</strong> Cada bando deve ter um Conde Vampiro Dragão Carmesim: nem mais, nem menos!
              <br />• <strong>Necromante:</strong> Seu bando pode incluir até um Necromante (0-1).
              <br />• <strong>Escudeiro Vampírico:</strong> Seu bando pode incluir até três Escudeiros Vampíricos (0-3).
              <br />• <strong>Zumbi:</strong> Seu bando pode incluir qualquer número de Zumbis (ilimitado).
              <br />• <strong>Carniçal:</strong> Seu bando pode incluir qualquer número de Carniçais (ilimitado).
              <br />• <strong>Lobo Atroz:</strong> Seu bando pode incluir até cinco Lobos Atrozes (0-5).
           </p>
          `,
  },
  {
    factionSlug: "cortes-vampiricas-necrarcas",
    name: "Cortes Vampíricas Necrarcas",
    specialRules: [],
    showMutations: false,
    showBlessings: false,
    spellLores: ["tradicao-da-necromancia"],
    skillLists: ["habilidades-dos-necrarcas"],
    lore: `<p>
              Os temidos Necrarcas são maliciosos e deformados, e mais do que qualquer outro vampiro, eles se assemelham aos mortos com uma aparência emaciada e cadavérica. Os Necrarcas são incompreensíveis até mesmo para seus próprios irmãos mortos-vivos e a maioria parece completamente insana. Sua loucura é temperada por seu gênio inegável e domínio da magia necromântica. Enquanto os vampiros de outras linhagens buscam domínio sobre os reinos dos homens, os Necrarcas aspiram ver o fim de todas as coisas vivas, tal é seu ódio por tudo. Os Necrarcas são por natureza solitários e frequentemente vivem profundamente no subsolo ou em torres isoladas onde podem praticar suas magias nefastas sem interrupção. Ocasionalmente, no entanto, eles emergem de seus lugares sombrios no mundo para reunir novas vítimas, conhecimento e, é claro, Pedra-Bruxa para seus experimentos. Os vampiros Necrarch têm uma antipatia mal contida por seus parentes de outros clãs, mas lidarão com eles ocasionalmente quando for do seu benefício fazê-lo.
           </p>`,
    bandStructure: `
            <p>
              Um bando dos Cortes Vampíricos deve incluir um mínimo de 3 modelos. Você tem 500 coroas que pode usar para recrutar e equipar seu bando. O número máximo de guerreiros no bando é 15.
           </p>
            <p>
              <br/>
              • <strong>Conde Vampiro Necrarch:</strong> Cada bando deve ter um Conde Vampiro Necrarch: nem mais, nem menos!
              <br />• <strong>Necromante:</strong> Seu bando pode incluir até um Necromante (0-1).
              <br />• <strong>Escória:</strong> Seu bando pode incluir até três Escórias (0-3).
              <br />• <strong>Zumbi:</strong> Seu bando pode incluir qualquer número de Zumbis (ilimitado).
              <br />• <strong>Carniçal:</strong> Seu bando pode incluir qualquer número de Carniçais (ilimitado).
              <br />• <strong>Lobo Atroz:</strong> Seu bando pode incluir até cinco Lobos Atrozes (0-5).
           </p>
          `,
  },
  {
    factionSlug: "cortes-vampiricas-lahmia",
    name: "Cortes Vampíricas Lahmia",
    specialRules: [],
    showMutations: false,
    showBlessings: false,
    spellLores: ["tradicao-da-necromancia"],
    skillLists: ["habilidades-de-lahmia"],
    lore: `<p>
              De todos os vampiros, a irmandade Lâmia Delfina segue a cultura e prática dos dias antigos mais de perto. A linhagem Lâmia  difere dos outros clãs vampíricos por ser composta quase exclusivamente por fêmeas. Esta irmandade é renomada por escolher apenas as mais belas dos mortais para se juntar às suas fileiras. Elas são lideradas pela própria rainha original das trevas, Neferata, do Culto do Sangue, que habita em algum lugar nas regiões setentrionais das Montanhas da Borda do Mundo em um lugar chamado Pico de Prata. Histórias do palácio da Rainha da Noite são contadas há séculos e podem ser encontradas nas baladas de Bretonnia, nos escritos do Império e nos poemas de Tilea. As Lâmias Delfinas competem com os Von Carsteins em sua trama para arrancar o controle do mundo dos homens, embora sejam muito mais sutis em seus métodos, preferindo infiltrar-se nos escalões superiores da sociedade do que usar força das armas. Elas têm grande talento para arte e estadismo, e suas personalidades poderosas mantêm um charme irresistível para mortais. A irmandade Lâmia Delfina sempre tentará manipular vampiros de outras famílias para seus próprios fins.
           </p>`,
    bandStructure: `
            <p>
              Um bando dos Cortes Vampíricos deve incluir um mínimo de 3 modelos. Você tem 500 coroas que pode usar para recrutar e equipar seu bando. O número máximo de guerreiros no bando é 15.
           </p>
            <p>
              <br/>
              • <strong>Condessa Vampira Lâmia:</strong> Cada bando deve ter uma Condessa Vampia Lâmia: nem mais, nem menos!
              <br />• <strong>Necromante:</strong> Seu bando pode incluir até um Necromante (0-1).
              <br />• <strong>Escória:</strong> Seu bando pode incluir até três Escórias (0-3).
              <br />• <strong>Zumbi:</strong> Seu bando pode incluir qualquer número de Zumbis (ilimitado).
              <br />• <strong>Carniçal:</strong> Seu bando pode incluir qualquer número de Carniçais (ilimitado).
              <br />• <strong>Lobo Atroz:</strong> Seu bando pode incluir até cinco Lobos Atrozes (0-5).
           </p>
          `,
  },
  {
    factionSlug: "cortes-vampiricas-strigoi",
    name: "Cortes Vampíricas Strigoi",
    specialRules: [],
    showMutations: false,
    showBlessings: false,
    spellLores: ["tradicao-da-necromancia"],
    skillLists: ["habilidades-de-strigoi"],
    lore: `<p>
              Os vampiros Strigoi são conhecidos como os Amaldiçoados e são geralmente desprezados entre sua própria espécie. Há muito tempo na história desta linhagem, o pai desses vampiros foi amaldiçoado pelos outros vampiros e desde então existe um ódio sem fim entre eles. Os vampiros Strigoi são pouco mais que bestas - monstruosidades enormes, desajeitadas e cheias de ódio. Frequentemente, essas figuras solitárias fazem de cemitérios e necrotérios suas casas, onde matilhas de Carniçais devoradores de carne formam cortes grotescas ao redor deles. A maioria deles perdeu a mente em algum grau, mas ainda possuem os poderes inatos do vampiro e podem comandar os mortos-vivos. Os Strigoi constantemente são achados contemplando um tempo em que derrubarão o mundo dos homens e destruirão completamente seus parentes dos outros clãs.
           </p>`,
    bandStructure: `
            <p>
              Um bando dos Cortes Vampíricos deve incluir um mínimo de 3 modelos. Você tem 500 coroas que pode usar para recrutar e equipar seu bando. O número máximo de guerreiros no bando é 15.
           </p>
            <p>
              <br/>
              • <strong>Conde Vampiro Strigoi:</strong> Cada bando deve ter um Conde Vampiro Strigoi: nem mais, nem menos!
              <br />• <strong>Necromante:</strong> Seu bando pode incluir até um Necromante (0-1).
              <br />• <strong>Escória:</strong> Seu bando pode incluir até três Escórias (0-3).
              <br />• <strong>Atormentador:</strong> Seu bando pode incluir até três Atormentadores (0-3).
              <br />• <strong>Zumbi:</strong> Seu bando pode incluir qualquer número de Zumbis (ilimitado).
              <br />• <strong>Carniçal:</strong> Seu bando pode incluir qualquer número de Carniçais (ilimitado).
              <br />• <strong>Lobo Atroz:</strong> Seu bando pode incluir até cinco Lobos Atrozes (0-5).
           </p>
          `,
  },
  {
    factionSlug: "cacadores-de-bruxas",
    name: "Caçadores de Bruxas",
    specialRules: [
      {
        label: "Édito da Inquisição",
        value:
          "No começo do jogo, antes de posicionar as figuras dos jogadores, o jogador de um bando de Caçadores de Bruxas pode escolher uma figura com a característica Conjurador ou Sacerdote no bando inimigo. Caso aquela figura seja reduzida a 0 de vida durante essa jogo, o bando ganha 20 coroas e +1 de experiência para todas as suas figuras, com um bônus extra de +1 d experiência para a figura que reduziu o alvo dessa regra a 0 vida.",
      },
    ],
    showMutations: false,
    showBlessings: false,
    spellLores: ["oracoes-de-sigmar"],
    skillLists: [],
    lore: `<p>
              Os Caçadores de Bruxas são os defensores mais fanáticos da fé de Sigmar, dedicados à erradicação de toda magia e heresia do Império. Liderados por Inquisidores implacáveis, estes bandos são formados por sacerdotes marciais, caçadores especializados e fanáticos dispostos a morrer pela causa sagrada.
           </p>
            <p>
              Em Mordheim, os Caçadores de Bruxas veem uma oportunidade única de caçar os maiores hereges e feiticeiros do Império, enquanto investigam a origem da Pedra-Bruxa e seus efeitos corruptores. Sua missão é clara: purificar a cidade amaldiçoada de toda influência sobrenatural.
           </p>`,
    bandStructure: `
            <p>
              Um bando dos Caçadores de Bruxas deve incluir um mínimo de 3 modelos. Você tem 500 coroas que pode usar para recrutar e equipar seu bando. O número máximo de guerreiros no bando é 12.
           </p>
            <p>
              <br/>
              • <strong>Inquisidor:</strong> Cada bando dos Caçadores de Bruxas deve ter um Inquisidor – nem mais, nem menos!
              <br />• <strong>Sacerdote Marcial de Sigmar:</strong> Seu bando pode incluir até 1 Sacerdote Marcial de Sigmar (0-1).
              <br />• <strong>Caçador de Bruxas:</strong> Seu bando pode incluir até 2 Caçadores de Bruxas (0-2).
              <br />• <strong>Fanático:</strong> Seu bando pode incluir qualquer número de Fanáticos (ilimitado).
              <br />• <strong>Flagelante:</strong> Seu bando pode incluir até 5 Flagelantes (0-5).
              <br />• <strong>Cão de Guerra:</strong> Seu bando pode incluir até 5 Cães de Guerra (0-5).
           </p>
          `,
  },
];

export const resolveWarband = (factionSlug: string): WarbandInfo | null => {
  return warbandData.find(w => w.factionSlug === factionSlug) ?? null;
};
