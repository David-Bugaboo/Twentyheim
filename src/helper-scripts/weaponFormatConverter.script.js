import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Função slugify inline
function slugify(text, options = {}) {
  const defaultOptions = {
    lower: true,
    strict: false,
    trim: true,
  };

  const opts = { ...defaultOptions, ...options };

  if (!text) return "";

  let slug = text.toString();

  if (opts.lower) {
    slug = slug.toLowerCase();
  }

  slug = slug
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[àáâãäå]/g, "a")
    .replace(/[èéêë]/g, "e")
    .replace(/[ìíîï]/g, "i")
    .replace(/[òóôõö]/g, "o")
    .replace(/[ùúûü]/g, "u")
    .replace(/[ç]/g, "")
    .replace(/[ñ]/g, "n")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  if (opts.trim) {
    slug = slug.replace(/^-+|-+$/g, "");
  }

  return slug;
}

export const commonItemsData = [
  // MELEE WEAPONS
  {
    id: "melee-weapons",
    label: "Armas Corpo a Corpo",
    icon: "",
    items: [
      {
        roll: "1-4",
        id: "dagger",
        name: "Adaga",
        properties: [
          { label: "Tipo", value: "Arma Corpo a Corpo" },
          { label: "Modificador de Dano", value: "-1" },
          {
            label: "Leve",
            value:
              "A primeira arma com essa característica carregada por uma figura não consome um espaço de item. Pode ser usada na mão secundária para ganhar +1 de Ímpeto em lutas.",
          },
          { label: "Valor de compra", value: "primeira grátis/2 coroas" },
          { label: "Valor de venda", value: "0 coroa" },
        ],
        weaponProperties: ["Corpo a Corpo", "Dano -1", "Leve"],
        description:
          "Adagas e facas são extremamente comuns, e homens podem carregá-las em enclaves onde armas são normalmente proibidas. Muitos guerreiros em Mordheim morreram com uma adaga nas costas.",
      },
      {
        roll: "5-7",
        id: "axe",
        name: "Machado",
        properties: [
          { label: "Tipo", value: "Arma Corpo a Corpo" },
          { label: "Modificador de Dano", value: "0" },
          { label: "Valor de compra", value: "3 coroas" },
          { label: "Valor de venda", value: "1 coroa" },
        ],
        weaponProperties: ["Corpo a Corpo", "Dano 0"],
        description:
          "O machado é a arma tradicional dos lenhadores do Império, e também é usado como arma nas áreas rurais mais pobres. Machados têm uma lâmina pesada e, se balançado por um homem forte, podem causar muito dano.",
      },
      {
        roll: "8-10",
        id: "sword",
        name: "Espada",
        properties: [
          { label: "Tipo", value: "Arma Corpo a Corpo" },
          { label: "Modificador de Dano", value: "0" },
          {
            label: "Defensiva",
            value:
              "Inimigos causam -1 de dano no portador de uma arma com essa característica",
          },
          { label: "Valor de compra", value: "10 coroas" },
          { label: "Valor de venda", value: "6 coroas" },
        ],
        weaponProperties: ["Corpo a Corpo", "Dano 0", "Defensiva"],
        description:
          "A espada é frequentemente chamada de 'rei das armas'. A espada mais comum disponível, a espada larga do Império, é uma obra-prima pelos padrões de qualquer ferreiro: quatro pés completos de aço brilhante, de dois gumes e afiada como navalha. Espadas são armas muito mais eficazes que porretes e machados grosseiros, embora aprender a usar uma espada seja um processo longo e difícil. Leva anos para verdadeiramente dominar esta arma - a maioria dos guerreiros em Mordheim morre muito antes de chegar tão longe!",
      },
      {
        roll: "11-12",
        id: "two-handed-weapon",
        name: "Arma de Duas Mãos",
        properties: [
          { label: "Tipo", value: "Arma Corpo a Corpo" },
          { label: "Modificador de Dano", value: "+2" },
          { label: "Slots", value: "2" },
          {
            label: "Duas Mãos",
            value:
              "Uma arma com essa característica não pode ser usada junto de nenhuma outra arma ou escudos: seu peso exige toda a concentração e força do personagem.",
          },
          { label: "Valor de compra", value: "15 coroas" },
          { label: "Valor de venda", value: "6 coroas" },
        ],
        weaponProperties: ["Corpo a Corpo", "Dano +2", "Duas Mãos"],
        description:
          "Montantes que abrem cabeças, machados de batalha que acabam com zumbis, Zweihanders que atravessa couro como papel. Estas são armas para aqueles que não precisam de sutileza - apenas poder bruto. O peso da lâmina faz o trabalho; o guerreiro apenas direciona a destruição. Incluem espadas de duas mãos, machados de batalha, manguais grandes e martelos de duas mãos.",
      },
      {
        roll: "13-14",
        id: "staff",
        name: "Cajado",
        properties: [
          { label: "Tipo", value: "Arma Corpo a Corpo" },
          { label: "Modificador de Dano", value: "-1" },
          { label: "valor de compra", value: "2 coroa" },
          { label: "valor de venda", value: "1 coroas" },
          {
            label: "Defensiva",
            value:
              "Inimigos causam -1 de dano no portador de uma arma com essa característica.",
          },
        ],
        weaponProperties: ["Corpo a Corpo", "Dano -1", "Defensiva"],
        description:
          "A boa e velha vara de madeira nunca sai de moda, mesmo entre aqueles que não são malucos o suficiente para mexer com os ventos da magia. Resistente e comprida, é uma arma mais adequada para se proteger, já que sua construção madeireira raramente causa muita dor, principalmente em inimigos armadurados.",
      },
      {
        roll: "15-16",
        id: "concussion-weapon",
        name: "Martelo",
        properties: [
          { label: "Tipo", value: "Arma Corpo a Corpo" },
          { label: "Modificador de Dano", value: "0" },
          {
            label: "Concussiva (6)",
            value:
              "Uma arma com essa característica dá ao alvo de qualquer ataque bem-sucedido que cause mais que o valor entre parênteses de dano um marcador de Atordoamento.",
          },
          {
            label: "Desbalanceada",
            value:
              "Uma arma com essa característica nunca pode ser usada com uma arma leve na mão secundária, apenas escudos.",
          },
          { label: "Valor de compra", value: "5 coroas" },
          { label: "Valor de venda", value: "2 coroas" },
        ],
        weaponProperties: [
          "Corpo a Corpo",
          "Dano 0",
          "Concussiva (6)",
          "Desbalanceada",
        ],
        description:
          "Talvez o tipo mais simples de arma, estes instrumentos brutais e esmagadores variam de maças de ferro cru a martelos anões elaboradamente forjados feitos do melhor aço. Um golpe de uma maça pode facilmente esmagar um crânio ou deixar um homem inconsciente.",
      },
      {
        roll: "17-18",
        id: "polearm",
        name: "Alabarda",
        properties: [
          { label: "Tipo", value: "Arma Corpo a Corpo" },
          { label: "Modificador de Dano", value: "0" },
          {
            label: "Versátil",
            value:
              "Uma arma com essa característica pode ser usado com uma ou duas mãos. Se usada com duas mãos, causa +1 de dano.",
          },
          {
            label: "Desbalanceada",
            value:
              "Uma arma com essa característica nunca pode ser usada com uma arma leve na mão secundária, apenas escudos.",
          },
          { label: "Valor de compra", value: "10 coroas" },
          { label: "Valor de venda", value: "4 coroas" },
        ],
        weaponProperties: [
          "Corpo a Corpo",
          "Dano 0",
          "Versátil",
          "Desbalanceada",
        ],
        description:
          "O pão com manteiga do soldado imperial, as armas de haste mantiveram mais de um soldado verde vivo para ver outro dia. Incluem lanças, alabardas, piques e afins. Apesar de serem construídas de forma simples, essas armas são extremamente simples de usar, e têm resultados brutais. A praticidade de poder usá-las junto a um escudo, ou usar ambas as mãos para um impacto extra também a torna a arma favorita de muitos veteranos.",
      },
      {
        id: "elven-battle-glaive",
        name: "Glaive de Guerra Élfica",
        properties: [
          { label: "Tipo", value: "Arma Corpo a Corpo" },
          {
            label: "Exclusivo",
            value: "Guarda Marítima de Ulthuan e Elfos Silvanos de Athel Loren",
          },
          { label: "Modificador de Dano", value: "0" },
          {
            label: "Versátil",
            value:
              "Uma arma com essa característica pode ser usado com uma ou duas mãos. Se usada com duas mãos, causa +1 de dano. Mesmo se usada com uma mão, não pode se beneficiar de uma arma leve na mão secundária, apenas de escudos.",
          },
          {
            label: "Defensiva",
            value:
              "Inimigos causam -1 de dano no portador de uma arma com essa característica.",
          },
          { label: "Valor de compra", value: "30 coroas" },
          { label: "Valor de venda", value: "20 coroas" },
        ],
        description:
          "A elegância mortal dos elfos elevada à forma de uma arma de guerra, esta glaive combina a graça refinada da arte élfica com a brutalidade prática necessária para sobreviver em Mordheim. O cabo é entalhado em madeira naval antiga, cada sulco contando histórias de batalhas passadas. A lâmina curva é feita de ithilmar, mais leve que o comum mas igualmente letal. O portador pode brandi-la com uma ou duas mãos, adaptando-se ao fluxo da batalha. Quando empunhada com ambas as mãos, o peso e o impulso da arma se traduzem em golpes devastadores. Sua lâmina longa mantém inimigos à distância, permitindo que o guerreiro controle o campo de batalha. Em Mordheim, onde cada vantagem conta, a glaive élfica oferece versatilidade, alcance e a promessa de que nem mesmo a morte mais sombria pode eclipsar completamente a luz das terras distantes.",
      },
      {
        id: "dwarven-axe",
        name: "Machado Anão",
        properties: [
          { label: "Tipo", value: "Arma Corpo a Corpo" },
          {
            label: "Exclusivo",
            value: "Caçadores de Tesouro Anões e Filhos de Hashut",
          },
          { label: "Modificador de Dano", value: "0" },
          {
            label: "Leve",
            value:
              "A primeira arma com essa característica carregada por uma figura não consome um espaço de item. Pode ser usada na mão secundária para ganhar +1 de Ímpeto em lutas.",
          },
          { label: "Valor de compra", value: "15 coroas" },
          { label: "Valor de venda", value: "10 coroas" },
        ],
        description:
          "Machados anões são armas de cabo mais curto feitas de materiais mais leves (mas mais resistentes) que machados normais. Guerreiros Anões são especialmente treinados em seu uso e conseguem manejá-los com a mesma destreza que um guerreiro humano empunharia uma espada.",
      },
      {
        id: "dwarven-two-handed-weapon",
        name: "Arma de Duas Mãos Anã",
        properties: [
          { label: "Tipo", value: "Arma Corpo a Corpo" },
          {
            label: "Exclusivo",
            value: "Caçadores de Tesouro Anões e Filhos de Hashut",
          },
          { label: "Slots", value: "2" },
          { label: "Modificador de Dano", value: "0" },
          {
            label: "Duas Mãos",
            value:
              "Uma arma com essa característica não pode ser usada junto de nenhuma outra arma ou escudos: seu peso exige toda a concentração e força do personagem.",
          },
          {
            label: "Penetração de Armadura (1)",
            value:
              "Essa arma trata a armadura de inimigos que atinge como o valor entre parênteses menor.",
          },
          { label: "Valor de compra", value: "60 coroas" },
          { label: "Valor de venda", value: "40 coroas" },
        ],
        description:
          "Apenas um Runamestre Anão pode forjar uma arma pesada de gromril, um ferro meteórico raro. Uma lâmina feita deste metal manterá seu fio por mil anos, e cortará através do aço sem impedimento.",
      },
      {
        id: "skaven-fighting-claws",
        name: "Garras de Combate Skaven",
        properties: [
          { label: "Tipo", value: "Arma Corpo a Corpo" },
          { label: "Exclusivo", value: "Skaven" },
          { label: "Modificador de Dano", value: "-1" },
          {
            label: "Par",
            value:
              "Armas com essa característica devem sempre ser usadas em pares, ocupando ambas as mãos, mas provendo o bônus de +1 Ímpeto de lutar com duas armas se for leve. A figura equipada nunca pode desequipar apenas uma arma de par, e se perder a arma perde ambas.",
          },
          {
            label: "Leve",
            value:
              "A primeira arma com essa característica carregada por uma figura não consome um espaço de item. Pode ser usada na mão secundária para ganhar +1 de Ímpeto em lutas.",
          },
          {
            label: "Special",
            value:
              "Um modelo equipado com essa arma pode escalar sem gastar nenhum Agilidade extra.",
          },
          { label: "Valor de compra", value: "35 coroas pelo par" },
          { label: "Valor de venda", value: "8 coroas pelo par" },
        ],
        description:
          "As artes marciais praticadas pelo Clã Eshin empregam muitas armas incomuns. As mais famosas dessas são as Garras de Combate Eshin: lâminas de metal afiadas presas às patas de um guerreiro Skaven. É preciso um verdadeiro especialista para usá-las efetivamente, mas um adepto do Clã Eshin é um oponente temível quando armado desta forma.",
      },
      {
        id: "weeping-blades",
        name: "Lamentadoras",
        properties: [
          { label: "Tipo", value: "Arma Corpo a Corpo" },
          { label: "Exclusivo", value: "Skaven" },
          { label: "Modificador de Dano", value: "-1" },
          {
            label: "Par",
            value:
              "Armas com essa característica devem sempre ser usadas em pares, ocupando ambas as mãos, mas provendo o bônus de +1 Ímpeto de lutar com duas armas se for leve. A figura equipada nunca pode desequipar apenas uma arma de par, e se perder a arma perde ambas.",
          },
          {
            label: "Leve",
            value:
              "A primeira arma com essa característica carregada por uma figura não consome um espaço de item. Pode ser usada na mão secundária para ganhar +1 de Ímpeto em lutas.",
          },
          {
            label: "Venenosa",
            value:
              "Uma arma com essa característica envenena o alvo em um ataque bem-sucedido, mesmo se não causar dano.",
          },
          { label: "Valor de compra", value: "50 coroas pelo par" },
          { label: "Valor de venda", value: "15 coroas pelo par" },
        ],
        description:
          "Os adeptos do Clã Eshin usam armas chamadas Lâminas Lamentosas, espadas assassinas construídas com uma pequena quantidade de pedra-bruxa em sua estrutura. Uma Lâmina Lamentosa constantemente suga um veneno corrosivo mortal.",
      },
      {
        id: "sigmarite-warhammer",
        name: "Martelo de Guerra Sigmarita",
        properties: [
          { label: "Tipo", value: "Arma Corpo a Corpo" },
          { label: "Exclusivo", value: "Irmãs de Sigmar" },
          { label: "Modificador de Dano", value: "Nenhum (0)" },
          { label: "Valor de compra", value: "15 coroas" },
          {
            label: "Concussiva(4)",
            value:
              "Uma arma com essa característica dá ao alvo de qualquer ataque bem-sucedido que cause mais que o valor entre parênteses de dano um marcador de Atordoamento.",
          },
          {
            label: "Versátil",
            value:
              "Uma arma com essa característica pode ser usado com uma ou duas mãos. Se usada com duas mãos, causa +1 de dano.",
          },
          {
            label: "Abençoada (1)",
            value:
              "Essa arma ignora o numero entre parenteses de pontos de armadura do alvo, se esta tiver as caracteristicas Morto-Vivo ou Daemonio.",
          },
          {
            label: "Desbalanceada",
            value:
              "Uma arma com essa característica nunca pode ser usada com uma arma leve na mão secundária, apenas escudos.",
          },
          {
            label: "Valor de compra",
            value: "15 coroas",
          },
          { label: "Valor de venda", value: "12 coroas" },
        ],
        description:
          "Uma das armas tradicionais da Irmandade, o martelo de guerra ecoa Ghal-Maraz, o grande martelo do próprio Sigmar.",
      },
      {
        id: "sacrificial-dagger",
        name: "Adaga Sacrificial",
        properties: [
          { label: "Tipo", value: "Arma Corpo a Corpo" },
          { label: "Exclusivo", value: "Noivas de Khaine" },
          { label: "Modificador de Dano", value: "-1" },
          { label: "Valor de compra", value: "15 coroas" },
          {
            label: "Cruel",
            value:
              "Uma arma com essa característica conta como tendo causado um ataque crítico em uma rolagem natural de 19 ou 20. Essa característica só é aplicada se esta for a arma da mão principal.",
          },
          {
            label: "Leve",
            value:
              "A primeira arma com essa característica carregada por uma figura não consome um espaço de item. Pode ser usada na mão secundária para ganhar +1 de Ímpeto em lutas.",
          },
          {
            label: "Valor de compra",
            value: "10  coroas",
          },
          { label: "Valor de venda", value: "2  coroas" },
        ],
        description:
          "Uma lâmina sagrada forjada nos altares de Khaine, banhada no sangue de mil sacrificios. Cada vida ceifada por sua lâmina esfoladora cruel é um banquete para o deus sombrio, e um novo ingrediente nas poções da rainha bruxa. .",
      },
      {
        id: "steel-whip",
        name: "Chicote de Aço",
        properties: [
          { label: "Tipo", value: "Arma Corpo a Corpo" },
          { label: "Exclusivo", value: "Irmãs de Sigmar, Noivas de Khaine" },
          { label: "Modificador de Dano", value: "-1" },
          { label: "Valor de compra", value: "15 coroas" },
          {
            label: "Alcance(1)",
            value:
              "Uma arma com essa característica pode ser usada para fazer ataques à distância, até uma distância máxima de X, usando seu atributo Ímpeto. Adicionalmente, uma vez por turno, se um modelo se mover dentro de Xcm do portador dessa arma, ele pode fazer um ataque à distância +0 contra aquele alvo, usando quaisquer modificadores de dano e ímpeto que a arma possa vir a ter nesse ataque. Usar um em cada mão não permite usar essa reação duas vezes por turno.",
          },
          {
            label: "Valor de compra",
            value: "10  coroas",
          },
          { label: "Valor de venda", value: "2  coroas" },
        ],
        description:
          "Outra arma única da Irmandade é o chicote de aço, feito de correntes de aço farpadas. O chicote de aço é uma arma flexível e as Sacerdotisas o usam com grande perícia. Tentativas de aparar seus golpes são fúteis.",
      },
    ],
  },
  {
    id: "ranged-weapons",
    label: "Armas a Distância",
    icon: "",
    items: [
      {
        roll: "1-3",
        id: "sling",
        name: "Funda",
        properties: [
          { label: "Tipo", value: "Arma a Distância" },
          { label: "Alcance Máximo", value: "20cm" },
          { label: "Modificador de Dano", value: "-2" },
          {
            label: "Leve",
            value:
              "A primeira arma com essa característica carregada por uma figura não consome um espaço de item.",
          },
          {
            label: "Giros Brutais",
            value:
              "Uma figura equipada com uma funda pode gastar uma ação, que pode substituir a ação de movimento para girar sua funda com mais força. Aumente o alcance do próximo ataque a distancia em 6cm.",
          },
          {
            label: "Arma de Tecido",
            value:
              "Embora não possa ser usada para ganhar +1 de impeto em lutas, uma figura carregando uma arma na mão principal e uma funda na mão secundária ainda pode pode pegar Fragmentos de Pedra-Bruxa, mas não pode usar a funda para atirar enquanto estiver carregando o fragmento..",
          },
          { label: "Valor de compra", value: "2 coroas" },
          { label: "Valor de venda", value: "0 coroas" },
        ],
        description:
          "Fundas são raramente usadas, principalmente porque não são mais poderosas que arcos e têm um alcance menor. Uma funda é pouco mais que uma tira de pano ou couro em laço na qual uma pedra é colocada. A funda é girada ao redor da cabeça do fundeiro e a pedra da funda é então lançada em direção ao alvo. Embora essa arma seja desprezada pela maioria dos arqueiros, um fundeiro habilidoso pode matar um homem de uma distância considerável, e a munição é fácil de encontrar: pedras estão por toda parte e são gratuitas!",
      },
      {
        roll: "3-5",
        id: "throwing-weapon",
        name: "Arma Arremessável",
        properties: [
          { label: "Tipo", value: "Arma Corpo a Corpo e a Distância" },
          { label: "Alcance de Arremesso", value: "25cm" },
          { label: "Modificador de Dano", value: "0" },
          {
            label: "Especial",
            value: "Pode ser usada como arma de mão em combate corpo a corpo.",
          },
          { label: "Valor de compra", value: "5 coroas" },
          { label: "Valor de venda", value: "2 coroas" },
        ],
        weaponProperties: ["Híbrida", "Alcance 25cm", "Dano 0"],
        description:
          "Armas arremessáveis são ferramentas simples mas versáteis usadas por guerreiros que valorizam a adaptabilidade. Facas, dardos e machados de arremesso permitem que um combatente ataque a distância e depois continue a luta em corpo a corpo com a mesma arma. Embora não sejam tão poderosas quanto armas especializadas, sua versatilidade as torna populares entre mercenários e aventureiros que precisam viajar leve.",
      },
      {
        roll: "6-8",
        id: "shortbow",
        name: "Arco Curto",
        properties: [
          { label: "Tipo", value: "Arma a Distância" },
          { label: "Alcance Máximo", value: "40cm" },
          { label: "Modificador de Dano", value: "-1" },
          { label: "Requer", value: "Aljava" },
          { label: "Valor de compra", value: "5 coroas" },
          { label: "Valor de venda", value: "1 coroa" },
          {
            label: "Duas Mãos",
            value:
              "Uma arma com essa característica não pode ser usada junto de nenhuma outra arma ou escudos: seu peso exige toda a concentração e força do personagem.",
          },
        ],

        description:
          "Arcos curtos são arcos pequenos e de curto alcance que são baratos e requerem pouca força para usar. Alguns cavaleiros carregam um arco encurtado que é mais fácil de atirar montado do que um arco maior. Halflings também usam arcos curtos, pois lhes falta a força e altura necessárias para usar um arco longo.",
      },

      {
        roll: "9-10",
        id: "bow",
        name: "Arco",
        properties: [
          { label: "Tipo", value: "Arma a Distância" },
          { label: "Alcance Máximo", value: "60cm" },
          { label: "Modificador de Dano", value: "0" },
          { label: "Requer", value: "Aljava" },
          {
            label: "Duas Mãos",
            value:
              "Uma arma com essa característica não pode ser usada junto de nenhuma outra arma ou escudos: seu peso exige toda a concentração e força do personagem.",
          },
          { label: "Valor de compra", value: "10 coroas" },
          { label: "Valor de venda", value: "5 coroas" },
        ],
        weaponProperties: [
          "A Distância",
          "Alcance 60cm",
          "Dano 0",
          "Duas Mãos",
          "Requer Aljava",
        ],
        description:
          "O arco é carregado pela maioria das raças e usado extensivamente na guerra. É uma arma compacta mas poderosa, que é barata de fazer e fácil de manter.",
      },

      {
        roll: "11-12",
        id: "longbow",
        name: "Arco Longo",
        properties: [
          { label: "Tipo", value: "Arma a Distância" },
          { label: "Alcance Máximo", value: "75cm" },
          { label: "Modificador de Dano", value: "0" },

          {
            label: "Corda de Alta Tensão",
            value:
              "Devido a alta tensão necessária para disparar uma flecha, um usuário de arco longo precisa de todo folego. Figuras inimigas ganhamn +1 de bonus adicional para sua rolagem de impeto contra tiros feitos pelo portador desse arco caso ele tenha movido antes de atirar.",
          },
          {
            label: "Duas Mãos",
            value:
              "Uma arma com essa característica não pode ser usada junto de nenhuma outra arma ou escudos: seu peso exige toda a concentração e força do personagem.",
          },
          { label: "Requer", value: "Aljava" },
          { label: "Valor de compra", value: "15 coroas" },
          { label: "Valor de venda", value: "8 coroas" },
        ],
        description:
          "Um arco longo é feito de camadas alternadas de teixo ou olmo. Um arqueiro habilidoso pode acertar uma folha escolhida em uma árvore de trezentos passos com esta arma. O arco longo é favorecido por arqueiros experientes devido ao seu grande alcance e precisão.",
      },
      {
        roll: "13-14",
        id: "crossbow",
        name: "Besta",
        properties: [
          { label: "Tipo", value: "Arma a Distância" },
          { label: "Alcance Máximo", value: "60cm" },
          { label: "Modificador de Dano", value: "+2" },
          {
            label: "Recarga",
            value:
              "A Besta requer o uso de uma ação para recarregá-la e poder atirar novamente. Contudo, essa ação pode substituir a ação de Agilidade.",
          },
          {
            label: "Duas Mãos",
            value:
              "Uma arma com essa característica não pode ser usada junto de nenhuma outra arma ou escudos: seu peso exige toda a concentração e força do personagem.",
          },
          { label: "Requer", value: "Aljava" },
          { label: "Valor de compra", value: "25 coroas" },
          { label: "Valor de venda", value: "15 coroas" },
        ],
        description:
          "Uma besta consiste em um arco curto e forte montado em uma coronha de madeira ou aço. As bestas do Império são feitas de aço e frequentemente incluem um mecanismo de corda para puxar a corda. Leva muito tempo para preparar uma besta, mas um virote disparado de uma tem um alcance tremendo e pode penetrar armaduras facilmente. Bestas levam muito mais tempo que outros arcos para fazer, então são armas caras e relativamente raras. Ainda assim, são a arma preferida de muitos em Mordheim devido ao seu poder e longo alcance.",
      },
      {
        roll: "15-16",
        id: "hand-crossbow",
        name: "Besta de Mão",
        properties: [
          { label: "Tipo", value: "Arma a Distância" },
          { label: "Alcance Máximo", value: "25cm" },
          { label: "Modificador de Dano", value: "+1" },
          {
            label: "Recarga",
            value:
              "A Besta de Mão requer o uso de uma ação para recarregá-la e poder atirar novamente. Contudo, essa ação pode substituir a ação de Agilidade.",
          },
          {
            label: "Pistola",
            value:
              "Uma arma com essa característica é leve e prática, podendo ser usada com apenas uma mão. Ela conta como uma adaga em combate corpo a corpo, inclusive para Lutar com Duas Armas.",
          },
          { label: "Requer", value: "Aljava" },
          { label: "Valor de compra", value: "40 coroas" },
          { label: "Valor de venda", value: "20 coroas" },
        ],
        description:
          "Bestas de mão são obras-primas feitas por armeiros especialistas. São bestas em miniatura com todo o poder e precisão das verdadeiras. Como essas armas podem ser facilmente ocultadas, são a arma favorita de assassinos.",
      },
      {
        roll: "17-18",
        id: "repeater-crossbow",
        name: "Besta Repetidora",
        properties: [
          { label: "Tipo", value: "Arma a Distância" },
          { label: "Alcance Máximo", value: "60cm" },
          { label: "Modificador de Dano", value: "+1" },
          {
            label: "Recarga",
            value:
              "A Besta repetidora requer o uso de uma ação para recarregá-la e poder atirar novamente. Contudo, essa ação pode substituir a ação de Agilidade.",
          },
          {
            label: "Duas Mãos",
            value:
              "Uma arma com essa característica não pode ser usada junto de nenhuma outra arma ou escudos: seu peso exige toda a concentração e força do personagem.",
          },
          {
            label: "Capacidade (3)",
            value:
              "Uma arma com essa característica pode disparar um número de vezes igual ao número entre parênteses antes de precisar recarregar. Cada flecha ou bala deve ser recarregada individualmente com uma ação de recarga.",
          },
          {
            label: "Engenharia Complexa",
            value:
              "Uma arma com essa característica trava em casos específicos. Quando o portador rola um 1 natural em um ataque, a arma trava, e só pode ser usada novamente gastando uma ação, que pode substituir a ação de movimento.",
          },
          { label: "Requer", value: "Aljava" },
          { label: "Valor de compra", value: "80 coroas" },
          { label: "Valor de venda", value: "50 coroas" },
        ],
        description:
          "Bestas repetidoras são dispositivos extremamente complexos, caros de adquirir e difíceis de fazer. Embora isso as torne raras, elas certamente têm seus usos: podem fazer chover uma chuva mortal de virotes nos inimigos, e um guerreiro usando uma pode se mover bastante rápido e ainda assim disparar sua arma.",
      },
      {
        id: "blowgun",
        name: "Zarabatana",
        properties: [
          { label: "Tipo", value: "Arma a Distância" },
          { label: "Exclusivo", value: "Homens Lagarto, Skaven" },
          { label: "Alcance Máximo", value: "40cm" },
          { label: "Modificador de Dano", value: "-4" },
          {
            label: "Tóxica",
            value: "uma arma com essa característica causa dano Venenoso.",
          },
          { label: "Requer", value: "Bolsa de Dardos" },
          { label: "Valor de compra", value: "25 coroas" },
          { label: "Valor de venda", value: "12 coroas" },
        ],
        description:
          "A zarabatana é um tubo oco curto que pode ser usado para disparar dardos envenenados. Embora os dardos por si só sejam muito pequenos para causar dano significativo, o veneno usado pode causar agonia ardente e eventual morte. A outra vantagem de uma zarabatana é que ela é silenciosa, e um atirador bem escondido pode disparar os dardos sem ser detectado.",
      },
      {
        id: "elven-bow",
        name: "Arco Élfico",
        properties: [
          { label: "Tipo", value: "Arma a Distância" },
          {
            label: "Exclusivo",
            value: "Elfos Silvanos de Athel Loren, Guarda Marinha de Ulthuan",
          },
          { label: "Modificador de Dano", value: "0" },
          { label: "Alcance Máximo", value: "90cm" },
          { label: "Requer", value: "Aljava" },
          {
            label: "Duas Mãos",
            value:
              "Uma arma com essa característica não pode ser usada junto de nenhuma outra arma ou escudos: seu peso exige toda a concentração e força do personagem.",
          },
          {
            label: "Penetração de Armadura (1)",
            value:
              "Essa arma trata a armadura de inimigos que atinge como o valor entre parênteses menor.",
          },
          { label: "Valor de compra", value: "50 coroas" },
          { label: "Valor de venda", value: "30 coroas" },
        ],
        description:
          "Os arcos élficos são as mais finas armas de projétil de seu tipo. Construídos de ithilmar ou madeira das florestas élficas, com cordas tecidas do cabelo de donzelas élficas, os arcos élficos são muito superiores a qualquer arma de projétil feita por outras raças. Nas mãos de um arqueiro élfico, o arco élfico é uma arma verdadeiramente potente, seu longo alcance e poder de penetração o tornando muito superior a qualquer arco feito por humanos.",
      },
    ],
  },
  {
    id: "firearms",
    label: "Armas de Fogo",
    icon: "",
    items: [
      {
        roll: "1-4",
        id: "pistol",
        name: "Pistola",
        properties: [
          { label: "Tipo", value: "Arma de Fogo" },
          { label: "Alcance Máximo", value: "25cm" },
          { label: "Modificador de Dano", value: "+2" },
          {
            label: "Penetração de Armadura (2)",
            value:
              "Essa arma trata a armadura de inimigos que atinge como o valor entre parênteses menor.",
          },
          {
            label: "Coice Violento",
            value:
              "A explosão da pólvora faz a arma ter um recuo violento ao atirar. Ataques à distância com armas com essa característica são feitos a -1.",
          },
          {
            label: "Recarga",
            value:
              "A Pistola requer o uso de uma ação para recarregá-la e poder atirar novamente. Contudo, essa ação pode substituir a ação de Agilidade.",
          },
          {
            label: "Pistola",
            value:
              "Uma arma com essa característica é leve e prática, podendo ser usada com apenas uma mão. Ela conta como uma adaga em combate corpo a corpo, inclusive para Lutar com Duas Armas.",
          },
          {
            label: "Falha de Ignição (1)",
            value: `Quando o portador de uma arma com essa característica rola um numero natural dentre os numeros entre parenteses na rolagem de ataque a distancia, a arma tem uma falha na ignição. Role outro d20 para saber o resultado:\n
              1-5: A Arma apenas engasga. Deve gastar uma ação, que pode substituir a ação de movimento, para consertar.
              6-10: A arma falha de maneira espetacular. Não pode mais ser usada durante aquele jogo apenas.
              11-15: A polvora explode na arma, danificando o atirador. Ele sofre um ataque a distancia +1. A Arma é perdida para sempre.
              16-20: A polvora explode espetacularmente e reage com o chifre de pólvora do atirador, danificando o atirador. O atirador e todas as figuras a até 8cm dele sofrem um ataque a distancia +1. A Arma e o chifre de pólvora estão perdidos para sempre.
              `,
          },
          {
            label: "Trovejante(20)",
            value:
              "Ao rolar qualquer número dentro dos números entre parênteses na rolagem de dado, um encontro aleatório é imediatamente rolado na borda do mapa mais próxima da figura que rolou esse resultado na sua rolagem de ataque à distância.",
          },
          { label: "Requer", value: "Chifre de Pólvora" },
          { label: "Valor de compra", value: "50 coroas" },
          { label: "Valor de venda", value: "25 coroas" },
        ],
        description:
          "A pistola é uma pequena arma de pólvora negra disparada por um mecanismo de mola. A maioria das pistolas são caras, não confiáveis e mal construídas. Embora seja portátil e possa ser usada com uma mão, sua natureza primitiva a torna propensa a falhas de ignição e explosões catastróficas. Em Mordheim, ter uma pistola é um sinal de riqueza, mas também de loucura - quem confia em uma arma que pode explodir na sua cara?",
      },

      {
        roll: "5-6",
        id: "duelist-pistol",
        name: "Pistola do Duelista",
        properties: [
          { label: "Tipo", value: "Arma de Fogo" },
          { label: "Alcance Máximo", value: "25cm" },
          { label: "Modificador de Dano", value: "+2" },
          {
            label: "Penetração de Armadura (2)",
            value:
              "Essa arma trata a armadura de inimigos que atinge como o valor entre parênteses menor.",
          },

          {
            label: "Recarga",
            value:
              "Essa arma requer o uso de uma ação para recarregá-la e poder atirar novamente. Contudo, essa ação pode substituir a ação de Agilidade.",
          },
          {
            label: "Pistola do Duelista",
            value:
              "Uma arma com essa característica é leve e precisa, podendo ser usada com apenas uma mão. Ela conta como uma espada em combate corpo a corpo, inclusive para Lutar com Duas Armas.",
          },
          {
            label: "Falha de Ignição (1)",
            value: `Quando o portador de uma arma com essa característica rola um numero natural dentre os numeros entre parenteses na rolagem de ataque a distancia, a arma tem uma falha na ignição. Role outro d20 para saber o resultado:\n
              1-5: A Arma apenas engasga. Deve gastar uma ação, que pode substituir a ação de movimento, para consertar.
              6-10: A arma falha de maneira espetacular. Não pode mais ser usada durante aquele jogo apenas.
              11-15: A polvora explode na arma, danificando o atirador. Ele sofre um ataque a distancia +1. A Arma é perdida para sempre.
              16-20: A polvora explode espetacularmente e reage com o chifre de pólvora do atirador, danificando o atirador. O atirador e todas as figuras a até 8cm dele sofrem um ataque a distancia +1. A Arma e o chifre de pólvora estão perdidos para sempre.
              `,
          },
          {
            label: "Trovejante(20)",
            value:
              "Ao rolar qualquer número dentro dos números entre parênteses na rolagem de dado, um encontro aleatório é imediatamente rolado na borda do mapa mais próxima da figura que rolou esse resultado na sua rolagem de ataque à distância.",
          },
          { label: "Requer", value: "Chifre de Pólvora" },
          { label: "Valor de compra", value: "300 coroas" },
          { label: "Valor de venda", value: "150 coroas" },
        ],
        description:
          "Uma pistola de duelo é uma obra de arte, e um armeiro trabalha muito e arduamente para produzir um único exemplar. Elas são frequentemente carregadas por nobres imperiais para resolver disputas sobre amor e honra, e muitos nobres morreram ao amanhecer em um duelo por alguma queixa. As pistolas de duelo são armas proibitivamente caras e guerreiros comuns raramente as possuem. Mesmo que consigam roubar ou comprar uma, a munição é proibitivamente cara. Alguns dos guerreiros mais ricos em Mordheim carregam pistolas de duelo como símbolos de status, comandando grande respeito, admiração e inveja.",
      },

      {
        roll: "11-12",
        id: "arquebus",
        name: "Arcabuz",
        properties: [
          { label: "Tipo", value: "Arma de Fogo" },
          { label: "Slots", value: "2" },
          { label: "Alcance Máximo", value: "60cm" },
          { label: "Modificador de Dano", value: "+2" },
          {
            label: "Coice Violento",
            value:
              "A explosão da pólvora faz a arma ter um recuo violento ao atirar. Ataques à distância com armas com essa característica são feitos a -1.",
          },
          {
            label: "Penetração de Armadura (2)",
            value:
              "Essa arma trata a armadura de inimigos que atinge como o valor entre parênteses menor.",
          },
          {
            label: "Duas Mãos",
            value:
              "Uma arma com essa característica não pode ser usada junto de nenhuma outra arma ou escudos: seu peso exige toda a concentração e força do personagem.",
          },
          {
            label: "Recarga",
            value:
              "Essa arma requer o uso de uma ação para recarregá-la e poder atirar novamente. Contudo, essa ação pode substituir a ação de Agilidade.",
          },
          {
            label: "Construção Robusta",
            value:
              "Essa arma pode ser usada em combate corpo a corpo como uma arma de duas mãos, mas sem o bonus de +2 de dano que é comum a elas.",
          },
          {
            label: "Falha de Ignição (1)",
            value: `Quando o portador de uma arma com essa característica rola um numero natural dentre os numeros entre parenteses na rolagem de ataque a distancia, a arma tem uma falha na ignição. Role outro d20 para saber o resultado:\n
              1-5: A Arma apenas engasga. Deve gastar uma ação, que pode substituir a ação de movimento, para consertar.
              6-10: A arma falha de maneira espetacular. Não pode mais ser usada durante aquele jogo apenas.
              11-15: A polvora explode na arma, danificando o atirador. Ele sofre um ataque a distancia +1. A Arma é perdida para sempre.
              16-20: A polvora explode espetacularmente e reage com o chifre de pólvora do atirador, danificando o atirador. O atirador e todas as figuras a até 8cm dele sofrem um ataque a distancia +1. A Arma e o chifre de pólvora estão perdidos para sempre.
              `,
          },
          {
            label: "Trovejante(19-20)",
            value:
              "Ao rolar qualquer número dentro dos números entre parênteses na rolagem de dado, um encontro aleatório é imediatamente rolado na borda do mapa mais próxima da figura que rolou esse resultado na sua rolagem de ataque à distância.",
          },
          { label: "Requer", value: "Chifre de Pólvora" },
          { label: "Valor de compra", value: "100 coroas" },
          { label: "Valor de venda", value: "50 coroas" },
        ],
        description:
          "Um arcabuz é uma arma de fogo simples. A qualidade da construção varia desde os rústicos 'hakbuts' de madeira da escola de artilharia de Nuln, até as armas de fogo anãs mais sofisticadas que possuem alavancas e molas que seguram o pavio em chamas, e gatilhos que liberam o mecanismo de disparo. Os arcabuzes não são armas terrivelmente confiáveis: o cano ocasionalmente tende a explodir violentamente ou a pólvora falha em acender. Mas a arma tem um grande alcance e tremendo poder de penetração, fazendo troça até mesmo das armaduras mais espessas. Em Mordheim, arcabuzes são raros e caros, mas um bando que pode ostentar tal arma comandará respeito de todos os seus rivais.",
      },
      {
        roll: "13-14",
        id: "hochland-rifle",
        name: "Rifle de Caça de Hochland",
        properties: [
          { label: "Tipo", value: "Arma de Fogo" },
          { label: "Alcance Máximo", value: "120cm" },
          { label: "Slots", value: "3" },
          { label: "Modificador de Dano", value: "+2" },
          {
            label: "Penetração de Armadura (2)",
            value:
              "Essa arma trata a armadura de inimigos que atinge como o valor entre parênteses menor.",
          },
          {
            label: "Recarga",
            value:
              "Essa arma requer o uso de uma ação para recarregá-la e poder atirar novamente. Contudo, essa ação pode substituir a ação de Agilidade.",
          },
          {
            label: "Duas Mãos",
            value:
              "Uma arma com essa característica não pode ser usada junto de nenhuma outra arma ou escudos: seu peso exige toda a concentração e força do personagem.",
          },
          {
            label: "Tripé",
            value:
              "Uma figura só pode atirar com essa arma se esta estiver montada em um tripé. Montar o tripé gasta uma ação que pode substituir a ação de movimento. Desmontar não custa ações, mas deverá montar se quiser atirar de novo.",
          },
          {
            label: "Falha de Ignição (1)",
            value: `Quando o portador de uma arma com essa característica rola um numero natural dentre os numeros entre parenteses na rolagem de ataque a distancia, a arma tem uma falha na ignição. Role outro d20 para saber o resultado:\n
              1-5: A Arma apenas engasga. Deve gastar uma ação, que pode substituir a ação de movimento, para consertar.
              6-10: A arma falha de maneira espetacular. Não pode mais ser usada durante aquele jogo apenas.
              11-15: A polvora explode na arma, danificando o atirador. Ele sofre um ataque a distancia +1. A Arma é perdida para sempre.
              16-20: A polvora explode espetacularmente e reage com o chifre de pólvora do atirador, danificando o atirador. O atirador e todas as figuras a até 8cm dele sofrem um ataque a distancia +1. A Arma e o chifre de pólvora estão perdidos para sempre.
              `,
          },
          {
            label: "Trovejante(19-20)",
            value:
              "Ao rolar qualquer número dentro dos números entre parênteses na rolagem de dado, um encontro aleatório é imediatamente rolado na borda do mapa mais próxima da figura que rolou esse resultado na sua rolagem de ataque à distância.",
          },
          { label: "Requer", value: "Chifre de Pólvora" },
          { label: "Valor de compra", value: "400 coroas" },
          { label: "Valor de venda", value: "300 coroas" },
        ],
        description:
          "Hochland é uma província famosa por seus caçadores, e a arma preferida de sua nobreza quando vão caçar é um rifle de longo alcance. Eles são armas extremamente raras e preciosas, e apenas os armeiros mais experientes são capazes de fabricá-las. O Rifle de Caça de Hochland é a evolução natural do arcabuz, refinado pelos mestres armeiros da província para caça de grandes presas e combate à longa distância. Ao contrário dos arcabuzes rústicos, este rifle possui um cano raiado de precisão que elimina o coice violento e dobra o alcance efetivo. Sua construção especializada requer um tripé para estabilização, tornando-o uma arma de posição ideal para emboscadas e defesas.",
      },

      {
        roll: "17-18",
        id: "blunderbuss",
        name: "Bacamarte",
        properties: [
          { label: "Tipo", value: "Arma de Fogo" },
          { label: "Alcance Máximo", value: "35cm" },
          { label: "Slots", value: "1" },
          { label: "Especial", value: "Dispara em dispersão" },
          { label: "Recarga", value: "Requer 1 ação" },
          {
            label: "Penetração de Armadura (2)",
            value:
              "Essa arma trata a armadura de inimigos que atinge como o valor entre parênteses menor.",
          },
          {
            label: "Duas Mãos",
            value:
              "Uma arma com essa característica não pode ser usada junto de nenhuma outra arma ou escudos: seu peso exige toda a concentração e força do personagem.",
          },
          {
            label: "Recarga",
            value:
              "Essa arma requer o uso de uma ação para recarregá-la e poder atirar novamente. Contudo, essa ação pode substituir a ação de Agilidade.",
          },
          {
            label: "Coice Violento",
            value:
              "A explosão da pólvora faz a arma ter um recuo violento ao atirar. Ataques à distância com armas com essa característica são feitos a -1.",
          },
          {
            label: "Construção Robusta",
            value:
              "Essa arma pode ser usada em combate corpo a corpo, contando como uma Martelo.",
          },
          {
            label: "Tiro de Dispersão",
            value:
              "Quando o portador dessa arma atira contra um alvo, ele pode atirar em todos os alvos a até 3cm do alvo inicial. Role uma rolagem diferente para cada alvo, e considere o ponto de origem para terreno interposto e cobertura o alvo inicial. Rolagens além da primeira não causam Falha na Ignição.",
          },
          {
            label: "Falha de Ignição (1-2)",
            value: `Quando o portador de uma arma com essa característica rola um numero natural dentre os numeros entre parenteses na rolagem de ataque a distancia, a arma tem uma falha na ignição. Role outro d20 para saber o resultado:\n
              1-5: A Arma apenas engasga. Deve gastar uma ação, que pode substituir a ação de movimento, para consertar.
              6-10: A arma falha de maneira espetacular. Não pode mais ser usada durante aquele jogo apenas.
              11-15: A polvora explode na arma, danificando o atirador. Ele sofre um ataque a distancia +1. A Arma é perdida para sempre.
              16-20: A polvora explode espetacularmente e reage com o chifre de pólvora do atirador, danificando o atirador. O atirador e todas as figuras a até 8cm dele sofrem um ataque a distancia +1. A Arma e o chifre de pólvora estão perdidos para sempre.
              `,
          },
          {
            label: "Trovejante(19-20)",
            value:
              "Ao rolar qualquer número dentro dos números entre parênteses na rolagem de dado, um encontro aleatório é imediatamente rolado na borda do mapa mais próxima da figura que rolou esse resultado na sua rolagem de ataque à distância.",
          },
          { label: "Requer", value: "Chifre de Pólvora" },
          { label: "Valor de compra", value: "100 coroas" },
          { label: "Valor de venda", value: "75 coroas" },
        ],
        description:
          "Um bacamarte é uma arma primitiva de pólvora que dispara uma chuva de bolas de chumbo, parafusos enferrujados, pregos tortos e outros metais descartados. É uma arma poderosa, embora errática, e leva tanto tempo para carregar que a maioria dos guerreiros a descarta após o primeiro tiro. Quando disparado, o bacamarte transforma tudo à frente em carne rasgada e ossos estilhaçados - perfeito para becos estreitos, portas defendidas, e qualquer lugar onde inimigos se agrupam tolamente. Em Mordheim, o bacamarte é a arma do desesperado e do imprudente - quem usa uma arma que pode explodir a qualquer momento não tem muito a perder.",
      },
      {
        id: "chaos-dwarf-blunderbuss",
        name: "Bacamarte dos Anões do Caos",
        properties: [
          { label: "Tipo", value: "Arma de Fogo" },
          { label: "Exclusivo", value: "Filhos de Hashut" },
          { label: "Alcance Máximo", value: "40cm" },
          { label: "Slots", value: "2" },
          { label: "Especial", value: "Dispara em dispersão" },
          { label: "Recarga", value: "Requer 1 ação" },
          {
            label: "Penetração de Armadura (2)",
            value:
              "Essa arma trata a armadura de inimigos que atinge como o valor entre parênteses menor.",
          },
          {
            label: "Duas Mãos",
            value:
              "Uma arma com essa característica não pode ser usada junto de nenhuma outra arma ou escudos: seu peso exige toda a concentração e força do personagem.",
          },
          {
            label: "Recarga",
            value:
              "Essa arma requer o uso de uma ação para recarregá-la e poder atirar novamente. Contudo, essa ação pode substituir a ação de Agilidade.",
          },
          {
            label: "Coice Violento",
            value:
              "A explosão da pólvora faz a arma ter um recuo violento ao atirar. Ataques à distância com armas com essa característica são feitos a -1.",
          },
          {
            label: "Construção Robusta",
            value:
              "Essa arma pode ser usada em combate corpo a corpo, contando como uma Martelo.",
          },
          {
            label: "Tiro de Dispersão",
            value:
              "Quando o portador dessa arma atira contra um alvo, ele pode atirar em todos os alvos a até 3cm do alvo inicial. Role uma rolagem diferente para cada alvo, e considere o ponto de origem para terreno interposto e cobertura o alvo inicial. Rolagens além da primeira não causam Falha na Ignição.",
          },
          {
            label: "Falha de Ignição (1)",
            value: `Quando o portador de uma arma com essa característica rola um numero natural dentre os numeros entre parenteses na rolagem de ataque a distancia, a arma tem uma falha na ignição. Role outro d20 para saber o resultado:\n
              1-5: A Arma apenas engasga. Deve gastar uma ação, que pode substituir a ação de movimento, para consertar.
              6-10: A arma falha de maneira espetacular. Não pode mais ser usada durante aquele jogo apenas.
              11-15: A polvora explode na arma, danificando o atirador. Ele sofre um ataque a distancia +1. A Arma é perdida para sempre.
              16-20: A polvora explode espetacularmente e reage com o chifre de pólvora do atirador, danificando o atirador. O atirador e todas as figuras a até 8cm dele sofrem um ataque a distancia +1. A Arma e o chifre de pólvora estão perdidos para sempre.
              `,
          },
          {
            label: "Trovejante(19-20)",
            value:
              "Ao rolar qualquer número dentro dos números entre parênteses na rolagem de dado, um encontro aleatório é imediatamente rolado na borda do mapa mais próxima da figura que rolou esse resultado na sua rolagem de ataque à distância.",
          },
          { label: "Requer", value: "Chifre de Pólvora" },
          { label: "Valor de compra", value: "200 coroas" },
          { label: "Valor de venda", value: "100 coroas" },
        ],
        description:
          "Os Anões do Caos são conhecidos em batalha por usar um grande número desses infames bacamartes em suas tropas de infantaria. Eles empregam essa mesma tática em combate nas ruas de Mordheim. O Bacamarte dos Anões do Caos é uma versão refinada e brutalmente eficiente do bacamarte tradicional, forjada nas forjas infernais dos Anões do Caos. Ao contrário dos bacamartes primitivos feitos por humanos, esta versão anã possui um alcance superior e uma confiabilidade excepcional, resultado de séculos de experiência na forja de armas de fogo. Seus projéteis são cuidadosamente selecionados - fragmentos de metal afiados, pregos forjados e até pequenas lascas de obsidiana - criando uma tempestade de morte ainda mais devastadora.",
      },
      {
        id: "warplock-pistol",
        name: "Pistola de Gatilho-Bruxo",
        properties: [
          { label: "Tipo", value: "Arma de Fogo" },
          { label: "Exclusivo", value: "Skaven" },
          { label: "Alcance Máximo", value: "20cm" },
          { label: "Modificador de Dano", value: "+3" },
          {
            label: "Penetração de Armadura (3)",
            value:
              "Essa arma trata a armadura de inimigos que atinge como o valor entre parênteses menor.",
          },
          {
            label: "Recarga",
            value:
              "Essa arma requer o uso de uma ação para recarregá-la e poder atirar novamente. Contudo, essa ação pode substituir a ação de Agilidade.",
          },
          {
            label: "Pistol",
            value:
              "Uma arma com essa característica é leve e precisa, podendo ser usada com apenas uma mão. Ela conta como uma espada em combate corpo a corpo, inclusive para Lutar com Duas Armas.",
          },
          {
            label: "Falha de Ignição (1-3)",
            value: `Quando o portador de uma arma com essa característica rola um numero natural dentre os numeros entre parenteses na rolagem de ataque a distancia, a arma tem uma falha na ignição. Role outro d20 para saber o resultado:\n
              1-5: A Arma apenas engasga. Deve gastar uma ação, que pode substituir a ação de movimento, para consertar.
              6-10: A arma falha de maneira espetacular. Não pode mais ser usada durante aquele jogo apenas.
              11-15: A polvora explode na arma, danificando o atirador. Ele sofre um ataque a distancia +1. A Arma é perdida para sempre.
              16-20: A polvora explode espetacularmente e reage com o chifre de pólvora do atirador, danificando o atirador. O atirador e todas as figuras a até 8cm dele sofrem um ataque a distancia +1. A Arma e o chifre de pólvora estão perdidos para sempre.
              `,
          },
          {
            label: "Trovejante(18-20)",
            value:
              "Ao rolar qualquer número dentro dos números entre parênteses na rolagem de dado, um encontro aleatório é imediatamente rolado na borda do mapa mais próxima da figura que rolou esse resultado na sua rolagem de ataque à distância.",
          },
          { label: "Requer", value: "Chifre de Pólvora" },
          { label: "Valor de compra", value: "500 coroas" },
          { label: "Valor de venda", value: "250 coroas" },
        ],
        description:
          "As pistolas warplock são armas aterrorizantes, testemunho do gênio louco dos engenheiros do Clã Skryre. As pistolas warplock disparam munição feita de pedra-bruxa tratada magicamente e feridas causadas por pistolas warplock são horríveis de se contemplar e frequentemente causam infecções. Diferente das armas de pólvora tradicionais, ela utiliza cristais de warp refinados como munição, resultando em projéteis que pulsam com energia verde-sombria e causam dano excepcional. Seu alcance é reduzido devido à instabilidade da energia warp, mas sua penetração de armadura é superior a qualquer arma de fogo convencional. Em combate corpo a corpo, ela conta como uma espada, permitindo combinações mortais de tiro e lâmina.",
      },
    ],
  },
  {
    id: "armor",
    label: "Armaduras e Escudos",
    icon: "",
    items: [
      {
        roll: "1-10",
        id: "shield",
        name: "Escudo",
        properties: [
          { label: "Tipo", value: "Armadura" },
          { label: "Bônus de Armadura", value: "+1" },
          { label: "Preço de valor de compra", value: "5 coroas" },
          { label: "valor de compra", value: "2 coroas" },
        ],
        description:
          "Há dois tipos de escudo comuns aos guerreiros de Mordheim: o primeiro é feito de madeira, ocasionalmente reforçado com placas de metal. Este tipo básico de escudo, embora forte, tende a estilhaçar, mas isso às vezes pode salvar a vida do usuário quando a arma de seu inimigo fica presa, permitindo que ele contra-ataque enquanto seu inimigo luta para libertar sua arma. Escudos de metal são pesados e desajeitados, mas duram muito mais e podem aguentar pancadas. Um escudo típico do Império é redondo ou triangular, e carrega o emblema da província ou cidade de seu dono.",
      },
      {
        roll: "11-15",
        id: "light-armor",
        name: "Armadura Leve",
        properties: [
          { label: "Tipo", value: "Armadura" },
          { label: "Bônus de Armadura", value: "+1" },
          { label: "Preço de valor de compra", value: "10 coroas" },
          { label: "valor de compra", value: "3 coroas" },
        ],
        description:
          "A armadura leve abrange uma grande variedade de materiais, desde túnicas de couro endurecido até camisas de cota de malha forjadas de aço. Ela não oferece proteção completa contra flechas ou espadas, mas é melhor do que não ter nada. A armadura leve não inibe o Agilidade.",
      },
      {
        roll: "16-20",
        id: "heavy-armor",
        name: "Armadura Pesada",
        properties: [
          { label: "Tipo", value: "Armadura" },
          { label: "Bônus de Armadura", value: "+2" },
          { label: "Slots", value: "2" },
          { label: "Penalidade de Agilidade", value: "-2" },
          { label: "Preço de valor de compra", value: "25 coroas" },
          { label: "valor de compra", value: "12 coroas" },
        ],
        description:
          "A armadura pesada típica é feita de elos de metal e é chamada de cota de malha. Forjar cota de malha é um processo trabalhoso e demorado, pois o ferreiro deve juntar centenas, às vezes milhares, de elos de metal. Isso torna a cota de malha cara, mas este tipo de armadura fornece excelente proteção para qualquer um que possa pagar por ela. Há outros tipos de armadura pesada também, dos quais os mais conhecidos são as peitorais e caneleiras de aço usadas pelos cavaleiros templários das ordens templárias.",
      },
    ],
  },
  {
    id: "accessories",
    label: "Acessórios",
    icon: "",
    items: [
      {
        id: "quiver",
        name: "Aljava",
        properties: [
          { label: "Tipo", value: "Armazenamento de Munição" },
          { label: "Para", value: "Arcos e Bestas" },
          { label: "Espaços de Item", value: "1 espaço" },
          { label: "Preço de valor de compra", value: "5 coroas" },
          { label: "valor de compra", value: "2 coroas" },
        ],
        description:
          " A aljava é tão essencial quanto o arco - sem ela, você tem um pedaço de madeira curvada inútil. Cada flecha é morte potencial; cada virote, uma vida terminada. Necessária para usar armas a distância, a menos que use munição mágica. Ocupa um espaço de item.\n\nSem aljava, um arco é apenas uma clava cara e desajeitada. Todo arqueiro precisa de uma, e arqueiros experientes mantêm suas flechas afiadas, secas, e prontas para voar verdadeiro. A diferença entre ter munição e estar desarmado é a diferença entre caçador e caçado.",
      },
      {
        id: "dart-pouch",
        name: "Bolsa de Dardos",
        properties: [
          { label: "Tipo", value: "Armazenamento de Munição" },
          { label: "Para", value: "Zarabatana" },
          { label: "Espaços de Item", value: "1 espaço" },
          { label: "Preço de valor de compra", value: "5 coroas" },
          { label: "valor de compra", value: "2 coroas" },
        ],
        description:
          "A bolsa de dardos é essencial para quem usa zarabatanas - sem ela, você tem apenas um tubo oco inútil. Cada dardo é morte potencial, especialmente quando envenenado. Necessária para usar zarabatanas, a bolsa contém dardos afiados e venenosos, prontos para serem soprados através do tubo. Ocupa um espaço de item e é indispensável para assassinos silenciosos e caçadores furtivos em Mordheim.",
      },
      {
        id: "powder-horn",
        name: "Chifre de Polvora",
        properties: [
          { label: "Tipo", value: "Armazenamento de Munição" },
          { label: "Para", value: "Armas de Pólvora Negra" },
          { label: "Espaços de Item", value: "1 espaço" },
          { label: "Preço de valor de compra", value: "10 coroas" },
          { label: "valor de compra", value: "5 coroas" },
        ],
        description:
          "Pólvora - o ingrediente que transforma ferro morto em trovão vivo. Acessório necessário para armas de fogo. Contém a pólvora necessária para recarregar e disparar mosquetes, pistolas e bacarmartes. Ocupa um espaço de item.\n\nSem pólvora, uma arma de fogo é apenas metal caro e inútil - um Maça pior que um pedaço de pau. Mantenha sua pólvora seca - molhada, ela não vale nada. Exposta a faíscas ou chamas, ela explode e mata você antes dos inimigos. Cada veterano com armas de fogo tem histórias de tolos que aprenderam essa lição tarde demais.",
      },
    ],
  },
  {
    id: "lesser-potions",
    label: "Poções Menores",
    icon: "",
    items: [
      {
        id: "tears-of-shallya",
        name: "Lágrimas de Shallaya",
        properties: [
          { label: "Tipo", value: "Remédio" },
          { label: "valor de compra", value: "50 coroas" },
          { label: "valor de venda", value: "25 coroas" },
          { label: "Ingredientes", value: "25 coroas" },
          { label: "Uso", value: "Beber como uma ação" },
        ],
        description:
          "As Lágrimas de Shallaya são frascos de água da nascente sagrada em Couronne. Shallaya é a deusa da cura e misericórdia e diz-se que esta água possui propriedades curativas e é prova contra qualquer veneno. Quando bebida, a poção restaura até 5 pontos perdidos de Vigor. Não pode elevar Vigor acima do máximo inicial.\n\nEm uma cidade onde cada ferida pode ser a última, onde infecções matam tanto quanto espadas, as Lágrimas de Shallaya são mais valiosas que ouro. Guerreiros experientes guardam um frasco para emergências - a diferença entre sangrar até a morte em um beco sujo e viver para lutar outro dia.",
      },
      {
        id: "mandrake-root-elixir",
        name: "Elixir de Raiz de Mandrágora",
        properties: [
          { label: "Tipo", value: "Remédio" },
          { label: "valor de compra", value: "75 coroas" },
          { label: "valor de venda", value: "30 coroas" },
          { label: "Ingredientes", value: "30 coroas" },
          { label: "Uso", value: "Beber como uma ação" },
          {
            label: "Efeito",
            value:
              "A figura que bebe esta poção se torna imune a veneno, mas perde -2 de Vontade até o fim do jogo.",
          },
        ],
        description:
          "A raiz de mandrágora em formato humano cresce nos pântanos apodrecidos de Sylvania. É uma planta nociva e mortal que é altamente viciante e mata lentamente seus usuários, mas também lhes permite resistir a quase qualquer dor. A figura que bebe esta poção se torna imune a Marcadores de Veneno, mas perde -2 de Vontade até o fim do jogo.\n\nEm Mordheim, onde venenos e toxinas são comuns, o Elixir de Raiz de Mandrágo oferece proteção vital - mas com um preço que poucos estão dispostos a pagar.",
      },
      {
        id: "dwarf-stimulant",
        name: "Estimulante Anão",
        properties: [
          { label: "Tipo", value: "Remédio" },
          { label: "valor de compra", value: "75 coroas" },
          { label: "valor de venda", value: "30 coroas" },
          { label: "Ingredientes", value: "30 coroas" },
          { label: "Uso", value: "Beber como uma ação" },
          {
            label: "Efeito",
            value:
              "A figura que bebe esta poção recebe +1 de Precisão, +1 de Agilidade, -1 de Ímpeto e -1 de Vontade pelo resto do jogo.",
          },
        ],
        description:
          "Estimulantes anões usados por besteiros para dispararem mais rápido e com mais foco. Quando bebida, a figura que bebe recebe +1 de Precisão, +1 de Agilidade, -1 de Ímpeto e -1 de Vontade pelo resto do jogo.",
      },
      {
        id: "magnesium-powder",
        name: "Pólvora Branca",
        properties: [
          { label: "Tipo", value: "Pó" },
          { label: "valor de compra", value: "200 coroas" },
          { label: "valor de venda", value: "75 coroas" },
          { label: "Ingredientes", value: "30 coroas" },
          { label: "Uso", value: "Usa quando uma figura declara carga." },
          {
            label: "Efeito",
            value:
              "Quando uma figura declara carga contra o usuário, este pode lançar o pó lampejante. Aquela figura deve fazer um teste de Vontade (CD 14) ou perder sua ação de carga, não podendo tentar outra carga até o fim da próxima ativação.",
          },
        ],
        description:
          "Pó feito a partir de magnésio e pólvora cataiana, tendo uma alta volatilidade e poder de ignição. Contudo, sua explosão gera mais luz que fogo, causando um grande raio de luz que cega aqueles próximos.",
      },
      {
        id: "embalming-solution",
        name: "Solução de Embalsamar",
        properties: [
          { label: "Tipo", value: "Solução" },
          { label: "valor de compra", value: "500 coroas" },
          { label: "valor de venda", value: "200 coroas" },
          { label: "Ingredientes", value: "120 coroas" },
          { label: "Uso", value: "Fora de jogo, usado em uma figura morta." },
          {
            label: "Efeito",
            value:
              "Uma figura morta pode ser preservada por até 5 jogos. Durante esse período, um Sopro de Shallaya ou a magia Milagre podem trazer a figura de volta à vida, ao invés do período normal de imediatamente após a morte de uma figura.",
          },
        ],
        description:
          "Criada originalmente por sacerdotes de Morr, essa solução foi extremamente otimizada pelos alquimistas da tradição do metal, se tornando um preservante extremamente eficiente. Cadáveres embalsamados por essa solução já foram encontrados intactos depois de séculos.",
      },
      {
        id: "bugmans-ale",
        name: "Cerveja de Bugman",
        properties: [
          { label: "Tipo", value: "Bebida Alcoólica" },
          { label: "valor de compra", value: "100 coroas" },
          { label: "valor de venda", value: "40 coroas" },
          { label: "Ingredientes", value: "40 coroas" },
          { label: "Uso", value: "Beber como uma ação" },
          {
            label: "Efeito",
            value:
              "A figura que bebe esta poção recebe +5 Vontade pelo resto do jogo.",
          },
        ],
        description:
          "A cerveja lendária dos anões, tão rara quanto valiosa. Dourada como ouro velho, espumante, com gosto de malte defumado e cevada das profundezas. Dizem que Joseph Bugman aperfeiçoou a receita após gerações de mestres cervejeiros, cada geração adicionando um segredo. Quando bebida, coragem líquida enche o coração - não a estupidez bêbada de cerveja comum, mas determinação férrea e vontade inabalável. A figura que bebe ganha +5 Vontade pelo resto do jogo.\n\nEm Mordheim, onde terror arcano e medo mundano quebram homens igualmente, a Cerveja de Bugman é mais que bebida - é armadura para a alma.",
      },
      {
        id: "elven-elixir",
        name: "Vinho Élfico",
        properties: [
          { label: "Tipo", value: "Bebida Alcoólica" },
          { label: "valor de compra", value: "75 coroas" },
          { label: "valor de venda", value: "30 coroas" },
          { label: "Ingredientes", value: "30 coroas" },
          { label: "Uso", value: "Beber como uma ação" },
          {
            label: "Bonus",
            value:
              "Figura que beber vinho élfico se torna Imune a Medo até o fim do jogo.",
          },
        ],
        description:
          "Os vinhos élficos são conhecidos por serem os melhores do mundo, e alguns são até mesmo rumores de terem qualidades mágicas. Um Vinho Élfico fino pode expulsar dúvidas e medos, deixando uma sensação geral de bem-estar em um guerreiro. Feito de uvas que nunca viram sol humano, água de nascentes élficas, e segredos que mortais não entendem completamente. Quando bebido, o corpo torna-se leve - não flutuando, mas movendo-se com graça sobrenatural. A figura que bebe recebe +2 Agilidade pelo resto do jogo. Não pode elevar Agilidade acima de 9.\n\nEm Mordheim, velocidade é vida. Correr mais rápido que inimigos, alcançar tesouro primeiro, fugir antes de ser cercado. O Vinho Élfico dá essa vantagem - raro e caro, mas invaluável.",
      },
      {
        id: "malekiths-wine",
        name: "Vinho de Malekith",
        properties: [
          { label: "Tipo", value: "Bebida Alcoólica" },
          { label: "valor de compra", value: "200 coroas" },
          { label: "valor de venda", value: "80 coroas" },
          { label: "Ingredientes", value: "80 coroas" },
          { label: "Uso", value: "Beber como uma ação" },
          { label: "Uso", value: "Beber como uma ação" },
        ],
        description:
          " Nomeado após o Rei Feiticeiro dos Elfos Negros, este vinho extremamente ácido e pungente torna o usuário uma presença sombria no campo de batalha, o hedonismo transformado em uma ferramenta de guerra",
      },
      {
        id: "blessed-water",
        name: "Água Benta",
        properties: [
          { label: "Tipo", value: "Arma de Arremesso" },
          { label: "valor de compra", value: "350 coroas" },
          { label: "valor de venda", value: "120 coroas" },
          { label: "Ingredientes", value: "80 coroas" },
          { label: "Uso", value: "Beber ou arremessar como uma ação" },
          {
            label: "Efeito",
            value:
              "Beber: A figura que bebe é tratada como se tivesse bebido Lágrimas de Shallaya. Arremessar: É um ataque sagrado +8 contra uma figura Morto-Vivo ou Daemônio até 25cm e todas as figuras Morto-Vivo ou Daemônio a até 5cm dela. Trate a figura alvo como origem para calculo de terreno interposto e cobertura das outras figuras afetadas.",
          },
        ],
        description:
          "Preparado com essências do próprio tecido da realidade, ingredientes que existem meio aqui e meio alhures. Quando bebida, o mundo pisca - por um instante você está em dois lugares ao mesmo tempo, depois apenas no novo. A figura que bebe é tratada como se tivesse conjurado o feitiço Teletransporte.\n\nPara escapar de cercos impossíveis, atravessar muros intransponíveis, ou alcançar tesouros inacessíveis - o Elixir do Andarilho do Véu dobra espaço. Perigoso, caro, mas absolutamente inestimável nas situações certas.",
      },
      {
        id: "kislevite-cocktail",
        name: "Coquetel Kislevita",
        properties: [
          { label: "Tipo", value: "Arma de Arremesso" },
          { label: "valor de compra", value: "100 coroas" },
          { label: "valor de venda", value: "40 coroas" },
          { label: "Ingredientes", value: "40 coroas" },
          {
            label: "Uso",
            value: "Arremessar como uma ação de ataque à distância.",
          },
          {
            label: "Efeito",
            value:
              "É um ataque elemental +5 contra uma figura até 25cm e todas as figuras a até 5cm dela. Trate a figura alvo como origem para cálculo de terreno interposto e cobertura das outras figuras afetadas.",
          },
        ],
        description:
          "Feito com o coração gelado de Kislev e um sorriso caloroso — ideal para quando 'convidar alguém pra esquentar a conversa' precisa ser entendido literalmente.",
      },
      {
        id: "spiced-ale-of-araby",
        name: "Cerveja Temperada de Araby",
        properties: [
          { label: "Tipo", value: "Bebida Alcoólica" },
          { label: "valor de compra", value: "150 coroas" },
          { label: "valor de venda", value: "60 coroas" },
          { label: "Ingredientes", value: "60 coroas" },
          {
            label: "Use",
            value: "Beber como uma ação.",
          },
          {
            label: "Efeito",
            value:
              "Beber como uma ação. Até o fim do jogo, apenas uma vez, a figura que bebeu pode como ação cuspir fogo, causando um ataque à distância elemental +3 contra uma figura a até 15cm.",
          },
        ],
        description:
          "Dizem que os mercadores de Araby a tomam para 'aquecer o espírito'. Esquecem apenas de avisar que o espírito pega fogo também.",
      },
      {
        id: "brimstone-elixir",
        name: "Elixir de Enxofre",
        properties: [
          { label: "Tipo", value: "Remédio" },
          { label: "valor de compra", value: "150 coroas" },
          { label: "valor de venda", value: "60 coroas" },
          { label: "Ingredientes", value: "60 coroas" },
          { label: "Uso", value: "Beber como uma ação" },
        ],
        description:
          "Preparado com cristais elementais e essências de salamandras, esta poção envolve o bebedor em proteção contra fogo e elementos. Quando bebida, a pele fica levemente fria ao toque - fogo lava sobre você sem queimar, gelo toca sem congelar. A figura que bebe esta poção ignora os próximos 5 pontos de dano elemental que receber.\n\nContra magos de fogo, dragões cuspindo chamas, ou armadilhas alquímicas, o Elixir de Enxofre é salvação líquida. Não torna você invulnerável - mas cinco pontos podem ser a diferença entre carbonizado e sobrevivente.",
      },
      {
        id: "powdered-daemonbone",
        name: "Pó de Osso Daemôniaco.",
        properties: [
          { label: "Tipo", value: "Pó" },
          { label: "valor de compra", value: "100 coroas" },
          { label: "valor de venda", value: "40 coroas" },
          { label: "Ingredientes", value: "40 coroas" },
          { label: "Uso", value: "Polvilhar sobre arma como uma ação" },
          {
            label: "Efeito",
            value:
              "Arma sobre o qual o pó foi polvilhado conta como arma mágica até o fim do jogo.",
          },
        ],
        description:
          "Cheira a morte e carne queimada, mas essa é a coisa menos perturbadora sobre esse pó negro. Embora não seja feito literalmente de daemônios, ninguém sabe exatamente a origem desse pó, e por que ele faz objetos que cai sobre brilharem com uma aura fantasmagórica e enregelante. Use com precaução.",
      },
      {
        id: "mad-cap-mushroom",
        name: "Elixir de Cogumelo Louco",
        properties: [
          { label: "Tipo", value: "Remédio" },
          { label: "valor de compra", value: "200 coroas" },
          { label: "valor de venda", value: "80 coroas" },
          { label: "Ingredientes", value: "80 coroas" },
          { label: "Uso", value: "Beber como uma ação" },
          {
            label: "Efeito",
            value:
              "A figura que bebe esta poção recebe +2 de Ímpeto pelo resto do jogo, mas perde -2 de Vontade.",
          },
        ],
        description:
          "Os temidos cultos de Fanáticos Goblin das Montanhas da Borda do Mundo usam esses cogumelos alucinógenos para se levar a um estado frenético. Cheira a terra úmida e loucura. Quando bebido, fúria berserker inunda a mente - dor desaparece, medo evapora, apenas existe a necessidade primal de MATAR. A figura ganha +1 Ímpeto e recebe +1 modificador de dano adicional em qualquer ataque corpo a corpo bem-sucedido. Porém, a figura DEVE, se possível, usar todas suas ações todo turno para mover-se para combate e lutar com a figura inimiga mais próxima (incluindo figuras não controladas) em linha de visão e não atualmente em combate.\n\nO Elixir de Cogumelo Louco transforma guerreiros em máquinas de matar furiosas - devastadoras em combate, mas completamente descontroladas. Use quando precisar destruir inimigos, mas esteja preparado para perder todo controle tático.",
      },
      {
        id: "leadblood-elixir",
        name: "Elixir do Plumbo-Sangue",
        properties: [
          { label: "Tipo", value: "Remédio" },
          { label: "valor de compra", value: "250 coroas" },
          { label: "valor de venda", value: "100 coroas" },
          { label: "Ingredientes", value: "100 coroas" },
          { label: "Uso", value: "Beber como uma ação" },
          {
            label: "Efeito",
            value:
              "A figura que bebe esta poção recebe +2 de Armadura, mas perde 2 de agilidade até o fim do jogo.",
          },
        ],
        description:
          "Preparada com escamas de camaleão gigante e cristais de ilusão moídos, esta poção permite ao bebedor fundir-se com o ambiente. A pele muda de cor e textura para combinar com o fundo - não invisibilidade verdadeira, mas camuflagem perfeita. Nenhuma outra figura pode traçar linha de visão para esta figura se estiverem a mais de 30cm de distância. Assim, esta figura só pode ser alvo de ataque ou magia de outra figura que esteja a até 30cm.\n\nPara espreitar, emboscar, ou simplesmente sobreviver em ambiente hostil, a Poção de Pele Prismática é invaluável. Inimigos distantes simplesmente não o veem - você é parte da parede, do chão, das sombras.",
      },
      {
        id: "herbal-ointment",
        name: "Bálsamo Herbal",
        properties: [
          { label: "Tipo", value: "Remédio" },
          { label: "valor de compra", value: "30 coroas" },
          { label: "valor de venda", value: "10 coroas" },
          { label: "Ingredientes", value: "5 coroas" },
          { label: "Uso", value: "Usar como uma ação" },
          {
            label: "Efeito",
            value: "A figura que usa o Bálsamo Herbal recupera 3 de vida.",
          },
        ],
        description:
          "A figura que usa o Bálsamo Herbal recupera 3 de vida.\n\nEm Mordheim, onde cada ponto de vida pode significar a diferença entre sobreviver e morrer, o Bálsamo Herbal é um remédio simples mas eficaz - barato, fácil de encontrar, e capaz de salvar vidas quando mais necessário.",
      },
      {
        id: "black-lotus-vial",
        name: "Frasco de Lótus Negra",
        properties: [
          { label: "Tipo", value: "Veneno" },
          { label: "valor de compra", value: "500 coroas" },
          { label: "valor de venda", value: "200 coroas" },
          { label: "Ingredientes", value: "200 coroas" },
          {
            label: "Uso",
            value: "Aplicar em arma como uma ação",
          },
          {
            label: "Efeito",
            value:
              "A Arma em que o veneno for aplicado ganha a propriedade Tóxica até o fim do jogo.",
          },
        ],
        description:
          "Este é um veneno extraído dos Heldrakes, serpentes marinhas gigantescas que assolam o Oceano Ocidental e a costa de Naggaroth. O menor ferimento infectado pelo Veneno Sombrio causa dor excruciante, incapacitando até os mais corajosos dos homens. Líquido negro e viscoso em frasco pequeno, extraído das glândulas venenosas dessas figuras terríveis. Apenas uma gota é suficiente para causar agonia insuportável - aplicado em lâmina, o veneno espera pacientemente. Este veneno pegajoso pode ser usado para revestir qualquer arma exceto cajado, arco ou besta. Pode ser usado em uma flecha ou virote de besta. Na próxima vez que esta arma causar dano, a figura que receber o dano é envenenada (assumindo que não seja imune a veneno). A arma perde a habilidade de envenenar após o primeiro ataque que causar dano. Esta poção não é mágica e não é afetada por nada que cancele magia.\n\nAssassinos adoram o Veneno Sombrio - silencioso, letal, e legal o suficiente para não chamar atenção de caçadores de bruxas. Um corte pequeno, e a vítima morre lentamente enquanto o veneno trabalha.",
      },
      {
        id: "penumbra-carmesian",
        name: "Penumbra Carmesim",
        properties: [
          { label: "Tipo", value: "Remédio" },
          { label: "valor de compra", value: "250 coroas" },
          { label: "valor de venda", value: "120 coroas" },
          { label: "Ingredientes", value: "200 coroas" },
          {
            label: "Uso",
            value: "Aplicar em arma como uma ação",
          },
          {
            label: "Efeito",
            value: `A figura sobre o efeito de Penumbra Carmesim ganha +2 de Agilidade e +2 de Impeto e -3 de Vontade até o fim do jogo.
              
              `,
          },
        ],
        description:
          "Penumbra Carmesim é o nome dado pelos habitantes do Velho Mundo às folhas do carvalho de sangue da Estália. É uma droga extremamente viciante, mas concede aos seus usuários rapidez e força sobre-humanas. Quando consumida, a substância vermelha escura se espalha pelas veias, transformando o usuário em uma máquina de combate temporária. A figura sobre o efeito de Penumbra Carmesim ganha +2 de Agilidade e +1 de Ímpeto até o fim do jogo.\n\nEm Mordheim, onde cada vantagem pode significar a diferença entre vida e morte, a Penumbra Carmesim é uma aposta perigosa - poder imenso, mas com um preço que poucos estão dispostos a pagar.",
      },
    ],
  },
  {
    id: "greater-potions",
    label: "Poções",
    icon: "",
    items: [
      {
        roll: "1-2",
        id: "witchboon-potion",
        name: "Pedra-Bruxa Destilada",
        properties: [
          { label: "Tipo", value: "Poção" },
          { label: "valor de compra", value: "500 coroas" },
          { label: "valor de venda", value: "200 coroas" },
          { label: "Ingredientes", value: "200 coroas" },
          {
            label: "Uso",
            value: "Beber como uma ação (antes de conjurar magia)",
          },
          {
            label: "Efeito",
            value:
              "A figura que bebe esta poção recebe +4 à sua Rolagem de Conjuração mas sofre 2 de dano, além de quaisquer outros efeitos de conjurar a magia. Um conjurador pode usar apenas uma Pocao de Bencao Arcana por jogo. Esta poção não pode ser usada para conjurar magias Fora de Jogo.",
          },
        ],
        description:
          "Alquimistas sem escrúpulos aprenderam a destilar a essencia da pedra-bruxa encontrada em Mordheim. Um gole e qualquer habilidade mágica em uma figura se torna extremamente poderosa. Contudo, a toxicidade extrema da pedra-bruxa rapidamente cobra seu preço.",
      },
      {
        roll: "3-5",
        id: "Skyre Flask",
        name: "Frasco Pestilens",
        properties: [
          { label: "Tipo", value: "Poção" },
          { label: "valor de compra", value: "500 coroas" },
          { label: "valor de venda", value: "200 coroas" },
          { label: "Ingredientes", value: "200 coroas" },
          {
            label: "Uso",
            value: "Beber como uma ação enquanto carrega tesouro",
          },
          {
            label: "Efeito",
            value:
              "Esta figura não sofre mais penalidades a Agilidade, Ímpeto, ou natação por carregar este tesouro. Pode até carregar uma segunda ficha de tesouro. Se o efeito desta poção for cancelado enquanto a figura carrega dois tesouros, deve escolher um e imediatamente largá-lo. Se o tesouro encolhido for largado por qualquer razão, retorna ao seu tamanho normal.",
          },
        ],
        description:
          "Criação dos Skaven, esta poção encolhe objetos temporariamente - perfeita para roubar tesouros grandes. Uma figura que está carregando tesouro pode usar a poção para encolhê-lo até um tamanho que caiba no bolso. Para os esquemas de roubo e saque dos skaven, o Frasco Skyre é essencial. Carregar duas relíquias enormes como se fossem moedas? Sim-sim!",
      },
      {
        roll: "6-8",
        id: "greater-tears-of-shallya",
        name: "Lágrimas Maiores de Shallya",
        properties: [
          { label: "Tipo", value: "Poção" },
          { label: "valor de compra", value: "2.000 coroas" },
          { label: "valor de venda", value: "300 coroas" },
          { label: "Ingredientes", value: "750 coroas" },
          {
            label: "Uso",
            value: "Beber como uma ação (em jogo ou fora de jogo)",
          },
          {
            label: "Efeito",
            value:
              "A figura que bebe esta poção é imediatamente restaurada ao seu Vigor inicial e é curada de qualquer veneno ou reduções temporárias de atributos. Esta poção também pode ser usada após um jogo para curar a figura de quaisquer lesões permanentes.",
          },
        ],
        description:
          "A versão suprema da bênção de Shallya - rara além de palavras, preciosa além de medida. Onde as Lágrimas comuns curam feridas, as Lágrimas Maiores restauram completamente. Em Mordheim, onde lesões permanentes acabam com carreiras e venenos matam lentamente, as Lágrimas Maiores de Shallya são literalmente milagrosas. Caríssimas, mas capazes de desfazer até mesmo as piores maldições e ferimentos. Um frasco pode salvar uma vida inteira.",
      },
      {
        roll: "9-11",
        id: "mage-blood",
        name: "Sangue do Feiticeiro",
        properties: [
          { label: "Tipo", value: "Poção" },
          { label: "valor de compra", value: "1.500 coroas" },
          { label: "valor de venda", value: "200 coroas" },
          { label: "Ingredientes", value: "600 coroas" },
          {
            label: "Uso",
            value: "Beber como uma ação (antes de conjurar magia)",
          },
          {
            label: "Efeito",
            value:
              "Uma figura que bebe essa poção e conjura uma magia durante a mesma ativação pode tentar conjurar a mesma magia novamente, mas contra um alvo diferente. Se ambos as rolagens forem iguais, a figura rola nas tabelas de Maldição de Tzeentch e Dádivas de Tzeentch, mesmo se conjurar uma ou ambas as spells com sucesso.",
          },
        ],
        description:
          "Embora não seja literalmente sangue, essa poção é criada a partir da destilação de componentes carregados de energia mágica ou fortemente sincronizados ao reino do caos. Um gole transforma o usuário em um verdadeiro farol para os ventos da magia, e infelizmente, algumas coisas piores.",
      },
      {
        roll: "12-13",
        id: "ulgul-flask",
        name: "Frasco de Ulgul",
        properties: [
          { label: "Tipo", value: "Poção" },
          { label: "valor de compra", value: "1.500 coroas" },
          { label: "valor de venda", value: "300 coroas" },
          { label: "Ingredientes", value: "600 coroas" },
          { label: "Uso", value: "Estilhaçar no chão como uma ação" },
          {
            label: "Efeito",
            value:
              "Se uma figura estilhaça este frasco no chão, trevas antinaturais imediatamente caem sobre o campo de batalha. Linha de visão para todos é reduzida a 30cm pelo resto do jogo.",
          },
        ],
        description:
          "Frasco de vidro negro contendo uma porção de vento das sombras, Ulgul. O Frasco da Escuridão transforma qualquer combate em caos. Arqueiros ficam inúteis, magos não conseguem mirar, apenas combate corpo a corpo importa. Para warbands que prosperam em confusão e proximidade, esta poção é vantagem tática devastadora.",
      },
      {
        roll: "14-15",
        id: "ethereal-vacuum",
        name: "Vácuo de Morr",
        properties: [
          { label: "Tipo", value: "Poção Maior" },
          { label: "valor de compra", value: "2.000 coroas" },
          { label: "valor de venda", value: "200 coroas" },
          { label: "Ingredientes", value: "800 coroas" },
          { label: "Uso", value: "Abrir como uma ação" },
          {
            label: "Efeito",
            value:
              "Qualquer figura com a característica Etérea a 20cm do usuário dessa poção deve passar num teste de Vontade (CD20) ou ser sugada para dentro do frasco e aprisionada. Imediatamente remova a figura da mesa e conceda quaisquer pontos de experiência que teriam sido ganhos por matar tal figura.",
          },
        ],
        description:
          "O frasco de vida contendo essa solução parece vazio, embora possa se ver uma leve tremulação dentro dele. Uma solução transparente criada a partir de flores abençoadas dos jardins de Morr, esse liquido evapora imediatamente ao entrar em contato com ar, criando uma explosão que só afeta figuras Etéreas. Sempre carregada por caçadores de vampiros e caçadores de bruxas.",
      },
      {
        roll: "16-17",
        id: "kharadron-stone-pills",
        name: "Pilulas Rochosas de Kharadron",
        properties: [
          { label: "Tipo", value: "Poção Maior" },
          { label: "valor de compra", value: "—" },
          { label: "valor de venda", value: "400 coroas" },
          { label: "Ingredientes", value: "2.000 coroas" },
          { label: "Uso", value: "Beber como uma ação" },
          {
            label: "Efeito",
            value:
              "Uma figura que bebe esta poção é imune a dano de armas não-mágicas. Sempre que esta figura ativa, role um dado. Em 17+, os efeitos da poção terminam imediatamente.",
          },
        ],
        description:
          "Os anões de Kharadron também se destacam no campo da alquimia, recentemente canalizando a magias dos seus Sacerdotes-Runicos em poderosas pílulas capazes de tornar a pele de seu usuário em pedra. Contudo, poucos tem a força mental para manter esse poder, que na maioria dos guerreiros tende a se dissipar rapidamente.",
      },
      {
        roll: "18-19",
        id: "pariah-flask",
        name: "Frasco do Pária",
        properties: [
          { label: "Tipo", value: "Poção Maior" },
          { label: "valor de compra", value: "—" },
          { label: "valor de venda", value: "200 coroas" },
          { label: "Ingredientes", value: "1.000 coroas" },
          { label: "Uso", value: "Abrir como uma ação" },
        ],
        description: `Parias são seres humano que nascem sem alma, sem uma presença no reino do caos, 
          completamente invisiveis aos seus habitantes e inertes aos ventos da magia.
          Por conta de sua presença perturbardora, são perseguidos como hereges pelos
          caçadores de bruxa de sigmar, que trituram seus restos mortais e transformam
          em granadas para destruir a magia de seus inimigos.`,
      },
      {
        roll: "20",
        id: "breath-of-shallaya",
        name: "Breath of Shallaya",
        properties: [
          { label: "Tipo", value: "Poção Maior" },
          { label: "valor de compra", value: "—" },
          { label: "valor de venda", value: "1.000 coroas" },
          { label: "Ingredientes", value: "3.000 coroas" },
          { label: "Uso", value: "Fora de Jogo - usar após qualquer jogo" },
          {
            label: "Efeito",
            value:
              "Nunca pode ser comprado e apenas um tolo desesperado o venderia. Pode ser usado imediatamente após qualquer jogo. Se usado, uma figura que morreu durante aquele jogo é trazida de volta à vida. A figura não sofre efeitos negativos da morte e pode participar do próximo jogo.",
          },
        ],
        description:
          "A mais rara e valiosa de todas as poções - o segredo da ressurreição verdadeira. Líquido dourado que pulsa com vida pura, brilhando com luz própria. O Sopro de Shallaya é lenda viva. Morte desfeita, vida restaurada, aliados perdidos retornados. Em Mordheim, onde morte é permanente e brutal, possuir uma dessas poções é ter poder sobre a própria morte. Mais valioso que todo ouro da Cidade Amaldiçoada.",
      },
    ],
  },
  {
    id: "magic-items",
    label: "Relíquias",
    icon: "",
    items: [
      {
        roll: "1",
        id: "ulthuan-runestones",
        name: "Runestones de Ulthuan",
        properties: [
          { label: "Tipo", value: "Amuleto" },
          { label: "Preço de valor de compra", value: "300 coroas" },
          { label: "valor de compra", value: "150 coroas" },
          {
            label: "Bonus",
            value:
              "Uma vez por jogo, o portador pode adicionar +4 a uma Rolagem de Vontade para resistir a uma magia. A decisão de usar as runestones pode ser feita depois que o dado for rolado.",
          },
        ],
        description:
          "Os magos élficos de alto escalão são bem conhecidos como mestres da magia defensiva. Para auxiliá-los, eles desenvolveram várias runas místicas de poder. Eles frequentemente inscrevem essas runas em pedras semipreciosas, que podem ajudar a fortalecer as defesas mágicas de um Mago Élfico.",
      },
      {
        roll: "2",
        id: "elven-boots",
        name: "Botas Élficas",
        properties: [
          { label: "Tipo", value: "Botas" },
          { label: "Preço de valor de compra", value: "300 coroas" },
          { label: "valor de compra", value: "130 coroas" },
          { label: "Bonus", value: "O portador ganha +1 Agilidade." },
        ],
        description:
          "Item raro mas altamente valorizado, as botas élficas são feitas dos melhores materiais. Elas são leves e flexíveis, concedendo ao usuário velocidade quase sobrenatural que combina com a da raça feérica que as criou. .\n\nCom Botas Élficas, você corre mais rápido, salta mais longe, move-se com graça sobrenatural. Em Mordheim, velocidade extra pode significar alcançar tesouro primeiro - ou escapar de morte certa.",
      },
      {
        roll: "3",
        id: "blessed-stag-hide",
        name: "Pele Abençoada de Cervo",
        properties: [
          { label: "Tipo", value: "Manto" },
          { label: "valor de compra", value: "500 coroas" },
          { label: "valor de venda", value: "200 coroas" },
          {
            label: "Bonus",
            value:
              "para cada figura usando no bando, o jogador ganha +2 em rolagens de iniciativa para decidir a ordem do turno.",
          },
        ],
        description:
          "A pele de cervo é usada como manto e é um símbolo de honra uma vez abençoado pelos hierarcas de Taal. Esta pele sagrada foi consagrada pelos sacerdotes de Taal, o Deus da Caça, e carrega consigo a bênção divina da floresta. Aqueles que a vestem são reconhecidos como caçadores abençoados, protegidos pelos espíritos da natureza e honrados pelos seguidores de Taal.",
      },
      {
        roll: "4",
        id: "athel-loren-cloak",
        name: "Manto de Athel Lóren",
        properties: [
          { label: "Tipo", value: "Manto" },
          { label: "valor de compra", value: "500 coroas" },
          { label: "valor de venda", value: "200 coroas" },
          {
            label: "Bonus",
            value:
              "O portador ganha +2 em testes de Ímpeto contra ataques à distância por estar em cobertura.",
          },
        ],
        description:
          "Feito do cabelo de donzelas élficas e entrelaçado com folhas de árvores vivas, um manto élfico é uma maravilha de se contemplar. Um guerreiro vestindo tal manto se misturará com as sombras, tornando muito difícil atirar nele com armas de projétil. Mantos élficos raramente aparecem à venda, mas às vezes são recuperados de guerreiros mortos ou oferecidos pelos Elfos como recompensas para homens que os serviram de alguma forma.\n\n**Regras Especiais:** O portador ganha +2 em testes de Ímpeto contra ataques à distância por estar em cobertura, pois o manto o ajuda a se misturar com o ambiente e as sombras.",
      },
      {
        roll: "5",
        id: "rabbits-foot",
        name: "Pé de Coelho",
        properties: [
          { label: "Tipo", value: "Amuleto" },
          { label: "valor de compra", value: "500 coroas" },
          { label: "valor de venda", value: "200 coroas" },
          {
            label: "Bonus",
            value:
              "Uma vez por jogo, a figura carregando um Pé de Coelho pode rerrolar qualquer Rolagem de Conjuração, Rolagem de Atributo, Rolagem de Combate, ou Rolagem de Tiro.",
          },
        ],
        description:
          "A pata de coelho é um símbolo de boa sorte e frequentemente usada no pescoço em uma corda fina de couro por guerreiros supersticiosos. Uma vez por jogo, a figura carregando um Pé de Coelho pode rerrolar qualquer Rolagem de Conjuração, Rolagem de Atributo, Rolagem de Combate, ou Rolagem de Tiro.\n\nO Pé de Coelho torce o destino - não muito, apenas o suficiente para transformar falha em sucesso. Quando aquela rolagem crucial falha, esfregue o pé e role novamente.",
      },
      {
        roll: "6",
        id: "battle-wizard-gauntlets",
        name: "Manoplas do Mago de Batalha",
        properties: [
          { label: "Tipo", value: "Luvas" },
          { label: "valor de compra", value: "500 coroas" },
          { label: "valor de venda", value: "200 coroas" },
          {
            label: "Bonus",
            value:
              "Uma vez por jogo, um conjurador pode usar estas luvas para ganhar +5 em uma Rolagem de Conjuração. O conjurador deve declarar que está usando-as antes da Rolagem de Conjuração ser feita.",
          },
        ],
        description:
          "Uma vez por jogo, um conjurador pode usar estas luvas para ganhar +5 em uma Rolagem de Conjuração. O conjurador deve declarar que está usando-as antes da Rolagem de Conjuração ser feita.\n\nForjadas para magos que lutam na linha de frente, estas manoplas canalizam poder arcano adicional através das mãos. Quando você precisa garantir que aquela magia crítica funcione, as Manoplas do Mago de Batalha entregam.",
      },
      {
        roll: "7",
        id: "bracers-of-chamon",
        name: "Braceletes de Chamon",
        properties: [
          { label: "Tipo", value: "Luvas" },
          { label: "valor de compra", value: "300 coroas" },
          { label: "valor de venda", value: "150 coroas" },
          {
            label: "Bonus",
            value:
              "O portador ganha +1 modificador de dano em todos os ataques corpo a corpo bem-sucedidos.",
          },
        ],
        description:
          "Braceletes de ferro pesado enfeitiçados com a força da Tradição do Metal. Cada golpe cai com peso sobrenatural, esmagando ossos e amassando armadura. O portador ganha +1 modificador de dano em todos os ataques corpo a corpo bem-sucedidos.",
      },
      {
        roll: "8",
        id: "horn-of-ruin",
        name: "Chifre da Ruína",
        properties: [
          { label: "Tipo", value: "Acessório" },
          { label: "valor de compra", value: "300 coroas" },
          { label: "valor de venda", value: "150 coroas" },
          {
            label: "Bonus",
            value:
              "Uma vez por jogo, o portador pode usar uma ação para soprar o chifre. Escolha uma peça de terreno a até 30cm do portador. Aquela peça de terreno é removida da mesa. Figuras que estavam sob aquela peça de terreno caem da altura que estavam, tomando dano como adequado.",
          },
        ],
        description:
          "Esse Chifre de um Minotauro mutante emite um som antigo e terrível que faz pedra rachar e madeira apodrecer.",
      },
      {
        roll: "9",
        id: "ring-of-elven-grace",
        name: "Anel da Graça Élfica",
        properties: [
          { label: "Tipo", value: "Anel" },
          { label: "valor de compra", value: "200 coroas" },
          { label: "valor de venda", value: "100 coroas" },
          {
            label: "Bonus",
            value:
              "O portador deste anel nunca sofre dano de queda, não importa quão grande a distância da qual caiam/pulem.",
          },
        ],

        description:
          "Feito de fios trançados de ouro encantado com cânticos de elfos silvanos, um usuário desse anel pode saltar de telhados, cair de torres, despencar de escadas - e pousar suavemente como pluma. Gravidade se torna sugestão, não lei. O portador deste anel nunca sofre dano de queda, não importa quão grande a distância da qual caiam/pulem.",
      },
      {
        roll: "10",
        id: "ring-of-abysswalker",
        name: "Anel do Andarilho do Abismo",
        properties: [
          { label: "Tipo", value: "Anel" },
          { label: "valor de compra", value: "400 coroas" },
          { label: "valor de venda", value: "150 coroas" },
          {
            label: "Bonus",
            value:
              "Uma vez por jogo, o portador deste anel pode gastar uma ação para teletransportar até 20cm para qualquer lugar dentro de linha de visão, mas não para fora da mesa. Não pode ser usado para mover uma figura para dentro ou para fora de combate.",
          },
        ],
        description: `Esse anel de aço frio está talhado com runas pontudas e profanas, que fazem a cabeça doer ao ser lida.
          A mão que o usa rapidamente apodrece, mas ele oferece um grande poder para alguém que tenha a sanidade 
          para se aproveitar dele. Com um movimento de mão, um portal para o reino do caos se abre, e o portador 
          pode caminhar entre reinos para evitar as lâminas de seus inimigos.
          `,
      },
      {
        roll: "11",
        id: "holy-unholy-signet",
        name: "Sinete Sagrado/Profano",
        properties: [
          { label: "Tipo", value: "Anel" },
          { label: "valor de compra", value: "300 coroas" },
          { label: "valor de venda", value: "100 coroas" },
          {
            label: "Bonus",
            value: "Figura portadora ganha +1 de vontade.",
          },
        ],
        description:
          "Sinete gravado com símbolos de poder - sagrados ou profanos, dependendo de quem o forjou. Fortalece a fé do usuário, tornando sua mente impermeável ao medo e às palavras do inimigo.",
      },
      {
        roll: "12",
        id: "sea-dragon-cloak",
        name: "Manto de Dragão Marinho",
        properties: [{ label: "Tipo", value: "Manto" }],
        description:
          "Os Corsários Dark Elves usam mantos especiais feitos de Monstros Marinhos que habitam as profundezas dos oceanos. Estes mantos são resistentes e resilientes e oferecem aos Dark Elves uma quantidade muito boa de proteção. O portador ganha +4 Armadura contra todas as armas de mísseis e ataques de armas de fogo.\n\nFeito de escamas de dragão marinho entrelaçadas, este manto deflete flechas e balas como água sobre rocha. Contra ataques à distância, torna o portador quase invulnerável.",
      },
      {
        roll: "13",
        id: "hierophant-staff",
        name: "Cajado do Mago de Batalha",
        properties: [
          { label: "Tipo", value: "Conjuração" },
          { label: "valor de compra", value: "500 coroas" },
          { label: "valor de venda", value: "200 coroas" },
          {
            label: "Bonus",
            value:
              "Quando um conjurador segura esse cajado pela primeira vez, ele pode escolher uma magia específica que possa conjurar. Este cajado dá +1 à Rolagem de Conjuração para aquela magia específica. Essa magia nunca pode ser mudada.",
          },
        ],
        description: `Um cajado de pinho tratado com óleos alquímicos que permitem ao usuário sintonizar uma parte de seu poder mágico com a arma, se tornando um locus de poder arcano para o conjurador. `,
      },
      {
        roll: "14",
        id: "mageskull-staff",
        name: "Cajado do Magicrânio",
        properties: [
          { label: "Tipo", value: "Item de Poder(3)" },
          { label: "valor de compra", value: "1200 coroas" },
          { label: "valor de venda", value: "300 coroas" },
          {
            label: "Bonus",
            value:
              "Itens de poder podem ser usados para fortalecer magias do conjurador. Um conjurador pode forçar magias usando uma quantidade de pontos do item igual ao valor entre parênteses ao invés de vida. O item de poder recarrega entre jogos.",
          },
        ],
        description:
          "Um cajado simples de madeira sólida evernizada. Contudo, o crânio no seu topo pertence a um Feiticeiro executado por bruxaria. O poder contido nesse artefato macabro pode ser usado para inflar magias com poder arcano. ",
      },
      {
        roll: "15",
        id: "wyrdstone-lantern",
        name: "Lanterna de Pedra Bruxa",
        properties: [
          { label: "Tipo", value: "Item de Poder(1)" },
          { label: "valor de compra", value: "200 coroas" },
          { label: "valor de venda", value: "100 coroas" },
          {
            label: "Bonus",
            value:
              "Itens de poder podem ser usados para fortalecer magias do conjurador. Um conjurador pode forçar magias usando uma quantidade de pontos do item igual ao valor entre parênteses ao invés de vida. O item de poder recarrega entre jogos.",
          },
        ],
        description:
          "Uma lanterna de mão que pouco ajuda a enxergar devido a sua luz fraca a esverdeada. Contudo, um conjurador experiente pode extrair poder da Pedra-Bruxa contida em seu interior para fortalecer sua mente e magias.",
      },
      {
        roll: "16",
        id: "taal-collar",
        name: "Coleira de Taal",
        properties: [
          { label: "Tipo", value: "Acessório" },
          { label: "valor de compra", value: "400 coroas" },
          { label: "valor de venda", value: "250 coroas" },
          {
            label: "Bonus",
            value:
              "Uma figura com a característica animal pode carregar uma dessa reliquia, mesmo sem ter espaços de items. Figuras com a característica animal carregando esse item ganham +2 de Ímpeto, +2 de Armadura e +1 de Vontade.",
          },
        ],
        description:
          "Coleira de Couro saturada com a energia do deus selvagem Taal. Um animal que use essa coleira é fortalecido por essa energia, se tornando maior e mais selvagem.",
      },
      {
        roll: "17",
        id: "lustrian-prism",
        name: "Prisma Lustriano",
        properties: [
          { label: "Tipo", value: "Item de Poder(6)" },
          { label: "valor de compra", value: "600 coroas" },
          { label: "valor de venda", value: "250 coroas" },
          {
            label: "Bonus",
            value:
              "Itens de poder podem ser usados para fortalecer magias e a vontade do conjurador. Um conjurador pode forçar magias ou resistência a magias gastando uma quantidade de pontos do item igual ao valor entre parênteses ao invés de vida. O item de poder recarrega entre jogos.",
          },
        ],
        description:
          "Uma vez que tenham absorvido magia o suficiente, os prismas de kacheck se tornam verdadeiras baterias mágicas. Desde que seu uso foi sancionado pelas Universidades Impériais, os magos de batalha não precisam se preocupar tanto com durabilidade no campo de batalha.",
      },
      {
        roll: "18",
        id: "enchanted-vellum",
        name: "Velocino Arcano",
        properties: [
          { label: "Tipo", value: "Acessório" },
          { label: "valor de compra", value: "100 coroas" },
          { label: "valor de venda", value: "50 coroas" },
          {
            label: "Bonus",
            value:
              "Um conjurador cujo o bando tenha um Velocino Arcano em seu cofre pode tentar conjurar qualquer magia que saiba como se fosse uma magia Fora de Jogo(A). Caso obtenha sucesso, o conjurador escreve aquela magia no Velocino Arcano, e enquanto portar ele pode usar aquela magia uma vez por jogo sem precisar de rolagem de conjuração, considerando sua rolagem de conjuração como 14.",
          },
        ],

        description:
          "Uma vez por jogo, uma figura carregando esta varinha pode rolar dois dados ao tentar conjurar uma magia e escolher qual usar.\n\nO Cetro do Reitor não garante sucesso, mas dá segunda chance. Role duas vezes, escolha o melhor resultado - às vezes a diferença entre falha crítica e sucesso espetacular.",
      },
      {
        roll: "19",
        id: "the-book-of-grudges",
        name: "O Livro de Rancores",
        properties: [
          { label: "Tipo", value: "Acessório" },
          { label: "valor de compra", value: "600 coroas" },
          { label: "valor de venda", value: "250 coroas" },
          {
            label: "Bonus",
            value:
              "Uma figura carregando esse livro nunca conta como Ferida, e é imune a veneno ou qualquer efeito que reduza a quantidade de ações que a figura tem no turno. Essa figura tem -1 em suas rolagens de sobrevivência pós-jogo.",
          },
        ],

        description:
          "Esse livro encapado em couro de bode e repleto de adornos em gromril carrega em suas páginas o nome de todos aqueles que causaram sofrimento ao povo anão. Carregar esse livro enche o portador com o rancor ancestral do povo da montanha, tornando sua determinação imparável e zelosa. Contudo, esse rancor torna a figura mais propensa a ignorar ferimentos graves, aumentando a letalidade de cada combate.",
      },
      {
        roll: "20",
        id: "ring-of-fated-destiny",
        name: "Anel do Destino Inescapável",
        properties: [
          { label: "Tipo", value: "Acessório" },
          { label: "valor de compra", value: "500 coroas" },
          { label: "valor de venda", value: "250 coroas" },
          {
            label: "Bonus",
            value:
              "Cada vez que a figura carregando esse anel rolar um 20 natural em qualquer rolagem de dado, ela recupera 5 de vida. Cada vez que a figura que carrega esse anel rolar um 1 natural em qualquer rolagem natural, ela recebe 5 de dano.",
          },
        ],

        description:
          "A lenda conta de uma quantidade de veteranos das ruínas de Mordheim que se tornaram subitamente bem sucedidas, vistas com um reluzente anel de bronze entalhado em seu dedo. Mas todas essas histórias acabam invariávelmente da mesma forma: Um corpo abandonado em um beco qualquer, com um um anel enferrujado e arruinado em um dedo apodrecido. A sorte é uma vantagem inegável, mas qual será o preço cobrado?",
      },
    ],
  },
  {
    id: "magic-ranged-weapon",
    label: "Modificadores de Arma a Distancia",
    icon: "",
    items: [
      {
        roll: "1-4",
        id: "annointed",
        name: "Ungida",
        properties: [
          { label: "Tipo", value: "Modificador de Arma a Distancia" },
          { label: "valor de compra", value: "300 coroas" },
          { label: "valor de venda", value: "125 coroas" },
          { label: "Bonus", value: "+2 vontade" },
        ],
        description:
          "Abençoada por um Alto Sacerdote, seja ele um Pontifice-Herege ou um Justiciar de Sigmar, esta arma infunde seu usuário com a vontade divina de sua crença.",
      },
      {
        roll: "5-8",
        id: "elven",
        name: "Silvano",
        properties: [
          { label: "Tipo", value: "Modificador de Arma a Distancia" },
          { label: "valor de compra", value: "300 coroas" },
          { label: "valor de venda", value: "125 coroas" },
          { label: "Bonus", value: "+1 Precisão" },
        ],
        description:
          "Construída de madeira do Bosque Sagrado de Athel Loren, e com cordas tecidas do cabelo de donzelas élficas.",
      },
      {
        roll: "9-12",
        id: "dwarven",
        name: "Dwarven",
        properties: [
          { label: "Tipo", value: "Modificador de Arma a Distancia" },
          { label: "valor de compra", value: "600 coroas" },
          { label: "valor de venda", value: "250 coroas" },
          { label: "Bonus", value: "+1 de dano" },
        ],
        description:
          "Forjadas nas profundas forjas das Montanhas do Mundo, estas armas anãs são temperadas em fontes de magma e abençoadas por Runesmiths. Cada projétil carrega a força dos rancores anões consigo.",
      },
      {
        roll: "13-16",
        id: "sonic",
        name: "Sônica",
        properties: [
          { label: "Tipo", value: "Modificador de Arma a Distancia" },
          { label: "valor de compra", value: "500 coroas" },
          { label: "valor de venda", value: "200 coroas" },
          {
            label: "Bonus",
            value:
              "Uma figura atingida por um ataque feito por uma arma com o modificador Sônico recebe um marcador de Atordoamento se receber 5 ou mais de dano.",
          },
        ],
        description:
          "Infundida com magia sonora de Azyr, o Vento Celestial, esta arma sônica emite ondas de choque devastadoras.",
      },
      {
        roll: "17-20",
        id: "windpiercer",
        name: "Perfura-Vento",
        properties: [
          { label: "Tipo", value: "Modificador de Arma a Distancia" },
          { label: "valor de compra", value: "550 coroas" },
          { label: "valor de venda", value: "100 coroas" },
          {
            label: "Bonus",
            value:
              "Uma arma com esse modificador ganha 15cm de alcance adicional.",
          },
        ],
        description:
          "Forjada em Ulthuan, esta arma é usada pelos lendários Perfura-Vento da Guarda Marítima, sua madeira encantada canalizando os ventos ao seu redor para impulsionar suas flechas com um alcance ímpar.",
      },
    ],
  },
  {
    id: "magic-firearms",
    label: "Modificadores de Armas de Fogo",
    icon: "",
    items: [
      {
        roll: "1-4",
        id: "kharadronite",
        name: "Kharadronita",
        properties: [
          { label: "Tipo", value: "Modificador de Arma de Fogo" },
          { label: "valor de compra", value: "250 coroas" },
          { label: "valor de venda", value: "+125 coroas" },
          {
            label: "Bonus",
            value:
              "-2 números de Falha na Ignição. Armas com menos de 2 números não podem mais ter falha na ignição.",
          },
        ],
        description:
          "Arma de fogo montada pelos lendários Armeiros de Kharadron. Sua mecânica é impecável, e a mecânica de ignição forjada em Gromril garante uma arma a prova de falhas. Ou quase.",
      },
      {
        roll: "5-8",
        id: "double-barreled",
        name: "de Dois Canos",
        properties: [
          { label: "Tipo", value: "Modificador de Arma de Fogo" },
          { label: "valor de compra", value: "400 coroas" },
          { label: "valor de venda", value: "250 coroas" },
          {
            label: "Bonus",
            value:
              "Ganha a característica Capacidade(2), e ganha +2 números na característica Falha de Ignição.",
          },
        ],
        description:
          "Conhecendo a propensão dos Ostlanders por armas impressionantes (e sua pronta disposição para gastar quantias excessivas de dinheiro), um armeiro de Hochland decidiu soldar dois canos juntos em uma pistola e vendê-la pelo dobro do preço. A arma consegue armazenar uma bala em cada cano, permitindo um tiro extra antes de recarregar. Mas como tudo que vem de Ostland, a instabilidade é lendária.",
      },
      {
        roll: "9-12",
        id: "cathayan",
        name: "Cathaiano",
        properties: [
          { label: "Tipo", value: "Modificador de Arma a Distancia" },
          { label: "valor de compra", value: "600 coroas" },
          { label: "valor de venda", value: "250 coroas" },
          { label: "Bonus", value: "+1 de Precisão e causa dano mágico" },
        ],
        description:
          "Na distante cathay, armas de fogo já são lugar-comum entre os servos do trono dracônico. Com décadas a mais para refinar esse armamento, elas são extremamente precisas, com sigilos mágicos entalhados no interior do seu cano que fazem cada bala serem disparadas com a vontade do imperador-dragão. ",
      },
      {
        roll: "13-16",
        id: "scoped",
        name: "Telescópica",
        properties: [
          { label: "Tipo", value: "Modificador de Arma a Distancia" },
          { label: "valor de compra", value: "250 coroas" },
          { label: "valor de venda", value: "250 coroas" },
          {
            label: "Bonus",
            value:
              "Uma arma com esse modificador ganha 20cm de alcance adicional.",
          },
        ],
        description:
          "Tecnologia é tecnologia, foi o que os armeiros de nuln disseram. Recuperando as miras telescópicas das Jezzails dos Skaven, eles as adaptaram para suas próprias armas, permitindo um disparo preciso a uma distância muito maior.",
      },
      {
        roll: "17-20",
        id: "chainbladed",
        name: "com Baioneta Vaporserra",
        properties: [
          { label: "Tipo", value: "Modificador de Arma a Distancia" },
          { label: "valor de compra", value: "300 coroas" },
          { label: "valor de venda", value: "150 coroas" },
          {
            label: "Bonus",
            value:
              "Uma arma com esse modificador ganha +1 de dano quando usada em ataques corpo a corpo.",
          },
        ],
        description:
          "Kharadon não cansa de impressionar com suas formas criativas de matar orcs. Uma serra mecânica alimentada a vapor acoplada no cano da arma garante que as suas armas de fogo sejam tão letais de perto quanto a distância.",
      },
    ],
  },
  {
    id: "magic-weapons",
    label: "Modificadores de Arma",
    icon: "",
    items: [
      {
        roll: "1-4",
        id: "gromril",
        name: "De Gromril",
        properties: [
          { label: "Tipo", value: "Modificador de Arma" },
          { label: "valor de compra", value: "300 coroas" },
          { label: "valor de venda", value: "125 coroas" },
          { label: "Bonus", value: "+1 dano" },
        ],
        description:
          "Apenas um Runesmith Anão pode forjar uma arma de Gromril, um ferro meteórico raro. Uma lâmina feita deste metal manterá o fio por mil anos. +1 modificador de dano. Forjada do lendário metal anão Gromril, esta arma mágica corta mais profundo que aço comum.",
      },
      {
        roll: "5-8",
        id: "ithilmar-hand-weapon",
        name: "De Ithilmar",
        properties: [
          { label: "Tipo", value: "Modificador de Arma Corpo a Corpo" },
          { label: "valor de compra", value: "500 coroas" },
          { label: "valor de venda", value: "200 coroas" },
          { label: "Bonus", value: "+1 ímpeto e causa dano mágico" },
        ],
        description:
          "As lâminas élficas são forjadas do precioso Ithilmar, um metal extremamente leve mas resistente, encontrado apenas nos lendários reinos élficos. Algumas dessas armas ocasionalmente são encontradas no Velho Mundo e normalmente são despojos de guerra, tomadas pelos saqueadores Norses que pilham os assentamentos costeiros dos Elfos. +1 Ímpeto. Forjada do metal élfico Ithilmar, leve como pluma mas afiada como obsidiana. Move-se tão rápido que inimigos mal a veem.",
      },
      {
        roll: "9-12",
        id: "annointed",
        name: "Ungida",
        properties: [
          { label: "Tipo", value: "Modificador de Arma Corpo a Corpo" },
          { label: "valor de compra", value: "300 coroas" },
          { label: "valor de venda", value: "125 coroas" },
          { label: "Bonus", value: "+2 vontade" },
        ],
        description:
          "Abençoada por um Alto Sacerdote, seja ele um Pontifice-Herege ou um Justiciar de Sigmar, esta arma infunde seu usuário com a vontade divina de sua crença.",
      },
      {
        roll: "13-16",
        id: "goredrinker",
        name: "Sedenta por Visceras",
        properties: [
          { label: "Tipo", value: "Modificador de Arma a Distancia" },
          { label: "valor de compra", value: "300 coroas" },
          { label: "valor de venda", value: "125 coroas" },
          {
            label: "Bonus",
            value:
              "O portador dessa arma ganha uma ação extra sempre que rolar 20 natural em uma rolagem de ataque com essa arma.",
          },
        ],
        description:
          "As forjas sangrentas de khorne vomitam essas armas para aqueles que anseiam pelo sangue de seus inimigos. Seus usuários se tornam ainda mais frenéticos, nunca ficando satisfeitas com o sangue derramado.",
      },
      {
        roll: "17-20",
        id: "chemblade",
        name: "Quimioserra",
        properties: [
          { label: "Tipo", value: "Modificador de Arma a Distancia" },
          { label: "valor de compra", value: "650 coroas" },
          { label: "valor de venda", value: "150 coroas" },
          {
            label: "Bonus",
            value:
              "Armas com essa característica ganham Perfuração de Armadura(2) e Falha na Ignição(1).",
          },
        ],
        description:
          "Se inspirando nas baionetas de vaporserra dos anões de Kharadron, os alquimistas da tradição do metal usaram combustíveis químicos de alta volatilidade para alimentar uma serra mecânica semelhante. Embora seja ainda mais violenta que a serra anã, a volatilidade do combustível torna a arma uma aposta arriscada para o usuário.",
      },
    ],
  },
  {
    id: "magic-armor",
    label: "Armaduras e Escudos Mágicos",
    icon: "",
    items: [
      {
        roll: "1-4",
        id: "gromril",
        name: "de Gromril",
        properties: [
          { label: "Tipo", value: "Modificador de Armadura" },
          { label: "valor de compra", value: "+600 coroas" },
          { label: "valor de venda", value: "200 coroas" },
          { label: "Bonus", value: "+1 de armadura" },
        ],
        description:
          "O Gromril é o metal mais raro e resistente conhecido no Velho Mundo. Apenas pouquíssimos ferreiros anões conhecem o segredo de forjar Gromril, e uma armadura feita dele alcança um preço enorme. +1 Armadura. Armadura leve forjada do lendário metal anão Gromril, fornece proteção superior sem sacrificar mobilidade.",
      },
      {
        roll: "5-8",
        id: "dragon-scaled",
        name: "Dracônica",
        properties: [
          { label: "Tipo", value: "Modificador de Armadura" },
          { label: "valor de compra", value: "800 coroas" },
          { label: "valor de venda", value: "300 coroas" },
          { label: "Bonus", value: "Resistencia Elemental (5)" },
        ],
        description:
          "Esta armadura, saida direto das forjas de Cathay, absorve energia elemental e resiste ao fogo, gelo e raios. Cada escama foi cuidadosamente trabalhada pelos melhores artesãos Cathaianos, criando uma proteção que rivaliza com qualquer metal conhecido.",
      },
      {
        roll: "9-12",
        id: "ithilmar",
        name: "De Ithilmar",
        properties: [
          { label: "Tipo", value: "Modificador de Armadura" },
          { label: "valor de compra", value: "700 coroas" },
          { label: "valor de venda", value: "350 coroas" },
          { label: "Bonus", value: "+2 Movimento" },
        ],
        description:
          "Forjada do precioso metal élfico Ithilmar, esta armadura é incrivelmente leve mas surpreendentemente resistente. O metal élfico permite Agilidade gracioso e ágil, como se a armadura fosse uma segunda pele, permitindo ao portador mover-se com a velocidade e elegância dos Elfos.",
      },
      {
        roll: "13-16",
        id: "aqshy-infused",
        name: "Flamejante de Aqshy",
        properties: [
          { label: "Tipo", value: "Modificador de Armadura" },
          { label: "valor de compra", value: "800 coroas" },
          { label: "valor de venda", value: "350 coroas" },
          {
            label: "Bonus",
            value: "ganha a características Dano Automatico",
          },
        ],
        description:
          "Infundida com os ventos de magia de Aqshy, o Vento de Fogo, esta armadura pulsa com energia elemental ardente.  Essa armadura emite os ventos de Aqshy, carbonizando aqueles que ousam agredir seu usuário.",
      },
      {
        roll: "17-20",
        id: "prismatic",
        name: "Prismática",
        properties: [
          { label: "Tipo", value: "Modificador de Armadura" },
          { label: "valor de compra", value: "700 coroas" },
          { label: "valor de venda", value: "250 coroas" },
          {
            label: "Bonus",
            value: "Ganha a característica Reflecção de Magia.",
          },
        ],
        description:
          "As expedições para Lustria, apesar de extremamente caras, rendem aos cofres impériais minérios raríssimos. Um deles são os Prismas de Kashek, cristais belos e multifacetados que refletem magia lançada neles. Não foi surpresa para ninguém quando os anões de Kharadron conseguiram fazer uma liga metálica usando-os, criando uma armadura capaz de refletir magia de volta aos seus conjuradores.",
      },
    ],
  },
];

class convertItemDataToEquipmentCard {
  convertedItemData = [];
  nonSpecialRules = [
    // Tipo
    "Tipo",
    "tipo",
    "TIPO",
    // Modificador de Dano
    "Modificador de Dano",
    "modificador de dano",
    "MODIFICADOR DE DANO",
    "Modificador de dano",
    "modificador de Dano",
    // Valor de compra
    "Valor de compra",
    "valor de compra",
    "VALOR DE COMPRA",
    "Valor de Compra",
    "valor de Compra",
    "Preço de valor de compra",
    "preço de valor de compra",
    "PREÇO DE VALOR DE COMPRA",
    // Valor de venda
    "Valor de venda",
    "valor de venda",
    "VALOR DE VENDA",
    "Valor de Venda",
    "valor de Venda",
    // Alcance máximo
    "Alcance máximo",
    "alcance máximo",
    "ALCANCE MÁXIMO",
    "Alcance Máximo",
    "alcance Máximo",
    // Exclusivo
    "Exclusivo",
    "exclusivo",
    "EXCLUSIVO",
    // Requer
    "Requer",
    "requer",
    "REQUER",
    // Bonus de armadura
    "Bonus de armadura",
    "bonus de armadura",
    "BONUS DE ARMADURA",
    "Bonus de Armadura",
    "bonus de Armadura",
    "Bonus",
    "bonus",
    "BONUS",
    // Penalidade de agilidade
    "Penalidade de agilidade",
    "penalidade de agilidade",
    "PENALIDADE DE AGILIDADE",
    "Penalidade de Agilidade",
    "penalidade de Agilidade",
    "Uso",
    "uso",
    "Para",
    "para",
    "Espaços de Item",
    "espaços de item",
  ];

  convertItemType(item) {
    const type = item.properties.find(property =>
      property.label.toLowerCase().includes("tipo")
    );
    if (type) {
      return type.value;
    }
    return null;
  }

  getUser(item) {
    const usage = item.properties.find(property =>
      property.label.toLowerCase().includes("uso")
    );
    if (usage) {
      return usage.value;
    }
    return null;
  }

  getSlots(item) {
    const slots = item.properties.find(property =>
      property.label.toLowerCase().includes("slots")
    );
    if (slots) {
      return slots.value;
    }
    return null;
  }

  getRoll(item) {
    return item.roll || null;
  }

  getItemDamageModifier(item) {
    const damageModifier = item.properties.find(property =>
      property.label.toLowerCase().includes("modificador de dano")
    );
    if (damageModifier) {
      return damageModifier.value;
    }
    return null;
  }

  getItemPurchaseCost(item) {
    const purchaseCost = item.properties.find(property =>
      property.label.toLowerCase().includes("valor de compra")
    );
    if (purchaseCost) {
      return purchaseCost.value;
    }
    return null;
  }

  getItemSellValue(item) {
    const sellValue = item.properties.find(
      property =>
        property.label.toLowerCase().includes("valor de venda") ||
        property.label.toLowerCase().includes("preço de valor de compra")
    );
    if (sellValue) {
      return sellValue.value;
    }
    return null;
  }

  getItemMaxRange(item) {
    const maxRange = item.properties.find(property =>
      property.label.toLowerCase().includes("alcance máximo")
    );
    if (maxRange) {
      return maxRange.value;
    }
  }

  getItemExclusive(item) {
    const exclusive = item.properties.find(property =>
      property.label.toLowerCase().includes("exclusivo")
    );
    if (exclusive) {
      return exclusive.value;
    }
    return null;
  }

  getItemFlavorText(item) {
    return item.description;
  }

  getItemEffect(item) {
    const effect = item.properties.find(property =>
      property.label.toLowerCase().includes("bonus")
    );
    if (effect) {
      return effect.value;
    }
    return null;
  }

  getItemArmorBonus(item) {
    const armorBonus = item.properties.find(property =>
      property.label.toLowerCase().includes("bônus de armadura")
    );
    if (armorBonus) {
      return armorBonus.value;
    }
    return null;
  }

  getMovePenalty(item) {
    const movePenalty = item.properties.find(property =>
      property.label.toLowerCase().includes("Penalidade de Agilidadee")
    );
    if (movePenalty) {
      return movePenalty.value;
    }
    return null;
  }

  getItemRequirements(item) {
    const requirements = item.properties.find(property =>
      property.label.toLowerCase().includes("requer")
    );
    if (requirements) {
      return requirements.value;
    }
    return null;
  }

  getItemSpecialRules(item) {
    const specialRules = [];
    for (const property of item.properties) {
      if (!this.nonSpecialRules.includes(property.label)) {
        specialRules.push(property);
      }
    }
    return specialRules;
  }

  convertItemDataToEquipmentCard(item) {
    const equipmentCard = {
      roll: this.getRoll(item),
      id: slugify(item.name),
      name: item.name,
      type: this.convertItemType(item),
      damageModifier: this.getItemDamageModifier(item),
      purchaseCost: this.getItemPurchaseCost(item),
      sellCost: this.getItemSellValue(item),
      maxRange: this.getItemMaxRange(item),
      exclusive: this.getItemExclusive(item),
      flavorText: this.getItemFlavorText(item),
      user: this.getUser(item),
      armorBonus: this.getItemArmorBonus(item),
      movePenalty: this.getMovePenalty(item),
      slots: this.getSlots(item) || "1",
      effect: this.getItemEffect(item),
      armorBonus: this.getItemArmorBonus(item),
      movePenalty: this.getMovePenalty(item),
      requirements: this.getItemRequirements(item),
      specialRules: this.getItemSpecialRules(item),
    };
    return equipmentCard;
  }

  returnConversionResult(category) {
    for (const item of category.items) {
      this.convertedItemData.push(this.convertItemDataToEquipmentCard(item));
    }
    return this.convertedItemData;
  }
}

async function writeJSON(jsonData, categoryName) {
  const _fileName = fileURLToPath(import.meta.url);
  const _dirName = path.dirname(_fileName);
  const fileName = slugify(categoryName);
  try {
    fs.writeFileSync(
      path.join(`${_dirName}/data`, `${fileName}-refactor.json`),
      JSON.stringify(jsonData)
    );
  } catch (error) {
    console.error("Erro ao escrever arquivo:", error);
  }
}

for (const data of commonItemsData) {
  const converterInstance = new convertItemDataToEquipmentCard();

  const conversionResult = converterInstance.returnConversionResult(data);
  writeJSON(conversionResult, data.label);
}
