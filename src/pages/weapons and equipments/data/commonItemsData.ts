export interface EquipmentItem {
  roll?: string;
  id: string;
  name: string;
  properties: Array<{
    label: string;
    value: string;
  }>;
  weaponProperties?: string[];
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
    ],
  },
  // RANGED WEAPONS
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
          { label: "Alcance", value: "20cm" },
          { label: "Modificador de Dano", value: "-1" },
          { label: "Valor de compra", value: "1 coroa" },
          { label: "Valor de venda", value: "0 coroa" },
        ],
        weaponProperties: ["Distância", "Alcance 20cm", "Dano -1"],
        description:
          "A funda é uma das armas mais antigas conhecidas pelo homem. Simples de fazer e usar, é uma arma de alcance eficaz nas mãos de um usuário experiente. Fundas são comuns entre pastores e camponeses, que as usam para afastar predadores de seus rebanhos.",
      },
      {
        roll: "4-6",
        id: "bow",
        name: "Arco",
        properties: [
          { label: "Tipo", value: "Arma a Distância" },
          { label: "Alcance", value: "30cm" },
          { label: "Modificador de Dano", value: "0" },
          { label: "Valor de compra", value: "5 coroas" },
          { label: "Valor de venda", value: "3 coroas" },
        ],
        weaponProperties: ["Distância", "Alcance 30cm", "Dano 0"],
        description:
          "O arco é uma arma de alcance eficaz e silenciosa, perfeita para caça e guerra. Arqueiros treinados podem causar dano devastador a longas distâncias, tornando-se uma ameaça constante para qualquer inimigo.",
      },
      {
        roll: "7-9",
        id: "crossbow",
        name: "Besta",
        properties: [
          { label: "Tipo", value: "Arma a Distância" },
          { label: "Alcance", value: "30cm" },
          { label: "Modificador de Dano", value: "+1" },
          { label: "Valor de compra", value: "15 coroas" },
          { label: "Valor de venda", value: "9 coroas" },
        ],
        weaponProperties: ["Distância", "Alcance 30cm", "Dano +1"],
        description:
          "A besta é uma arma poderosa que combina a precisão do arco com a força de um projétil pesado. Embora seja mais lenta para recarregar, seu poder de penetração é superior ao de qualquer arco.",
      },
    ],
  },
  // ARMOR
  {
    id: "armor",
    label: "Armaduras e Escudos",
    icon: "",
    items: [
      {
        roll: "1-2",
        id: "leather-armor",
        name: "Armadura de Couro",
        properties: [
          { label: "Tipo", value: "Armadura" },
          { label: "Proteção", value: "+1 Armadura" },
          { label: "Valor de compra", value: "5 coroas" },
          { label: "Valor de venda", value: "3 coroas" },
        ],
        weaponProperties: ["Armadura", "+1 Armadura"],
        description:
          "Armadura de couro simples, oferecendo proteção básica contra ataques. Comum entre mercenários e aventureiros iniciantes.",
      },
      {
        roll: "3-4",
        id: "chainmail",
        name: "Cota de Malha",
        properties: [
          { label: "Tipo", value: "Armadura" },
          { label: "Proteção", value: "+2 Armadura" },
          { label: "Valor de compra", value: "15 coroas" },
          { label: "Valor de venda", value: "9 coroas" },
        ],
        weaponProperties: ["Armadura", "+2 Armadura"],
        description:
          "Cota de malha de ferro, oferecendo boa proteção contra cortes e perfurações. Pesa mais que couro, mas oferece melhor defesa.",
      },
      {
        roll: "5-6",
        id: "shield",
        name: "Escudo",
        properties: [
          { label: "Tipo", value: "Escudo" },
          { label: "Proteção", value: "+1 Armadura" },
          { label: "Valor de compra", value: "3 coroas" },
          { label: "Valor de venda", value: "1 coroa" },
        ],
        weaponProperties: ["Escudo", "+1 Armadura"],
        description:
          "Escudo de madeira ou metal, oferecendo proteção adicional contra ataques. Pode ser usado junto com armadura para proteção extra.",
      },
    ],
  },
  // ACCESSORIES
  {
    id: "accessories",
    label: "Acessórios",
    icon: "",
    items: [
      {
        roll: "1-2",
        id: "rope",
        name: "Corda",
        properties: [
          { label: "Tipo", value: "Acessório" },
          { label: "Uso", value: "Escalada e amarração" },
          { label: "Valor de compra", value: "1 coroa" },
          { label: "Valor de venda", value: "0 coroa" },
        ],
        weaponProperties: ["Acessório", "Escalada"],
        description:
          "Corda resistente útil para escalar, descer ou amarrar objetos. Essencial para exploradores e aventureiros.",
      },
      {
        roll: "3-4",
        id: "lantern",
        name: "Lanterna",
        properties: [
          { label: "Tipo", value: "Acessório" },
          { label: "Uso", value: "Iluminação" },
          { label: "Valor de compra", value: "2 coroas" },
          { label: "Valor de venda", value: "1 coroa" },
        ],
        weaponProperties: ["Acessório", "Iluminação"],
        description:
          "Lanterna com óleo para iluminar áreas escuras. Essencial para explorar ruínas e masmorras.",
      },
    ],
  },
];
