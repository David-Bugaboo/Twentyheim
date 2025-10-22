import { commonItemsData } from "../pages/weapons and equipments/data/commonItemsData";

// Equipamento Superior - Nova Tabela principal (d20) distribuindo categorias
export function generateEquipSupCategoryD20Table() {
  const table = [
    {
      "Rolagem 1": "1-5",
      "Tipo de Equipamento Superior": "Arma Corpo a Corpo",
    },
    { "Rolagem 1": "6-10", "Tipo de Equipamento Superior": "Arma à Distância" },
    { "Rolagem 1": "11-15", "Tipo de Equipamento Superior": "Arma de Fogo" },
    { "Rolagem 1": "16-20", "Tipo de Equipamento Superior": "Armadura" },
  ];

  return table;
}

type EquipCategory = "melee" | "ranged" | "firearms" | "armor";

function resolveCategoryId(category: EquipCategory) {
  switch (category) {
    case "melee":
      return "melee-weapons";
    case "ranged":
      return "ranged-weapons";
    case "firearms":
      return "firearms";
    case "armor":
      return "armor";
  }
}

// Gera sub-tabela baseada nos campos "roll" dos itens de uma categoria
export function generateEquipSupSubtable(category: EquipCategory) {
  const categoryId = resolveCategoryId(category);
  const cat = commonItemsData.find((c) => c.id === categoryId);
  const rows: { roll: string; item: string }[] = [];

  // Primeiro, coletar todos os itens válidos (sem "Exclusivo")
  const validItems: any[] = [];
  (cat?.items || []).forEach((it: any) => {
    const hasExclusive = (it.properties || []).some(
      (prop: any) => prop.label === "Exclusivo"
    );
    if (!hasExclusive) {
      validItems.push(it);
    }
  });

  // Gerar exatamente 20 entradas
  for (let i = 1; i <= 20; i++) {
    if (i <= validItems.length) {
      // Usar itens existentes
      const item = validItems[i - 1];
      rows.push({
        roll: i.toString(),
        item: item.name,
      });
    } else if (i >= 17 && category !== "armor") {
      // Regra especial para armas (17-20)
      rows.push({
        roll: i.toString(),
        item: "Escolha de Warband / Rolagem Extra",
      });
    } else {
      // Preencher com entrada genérica se necessário
      rows.push({
        roll: i.toString(),
        item: "Item Genérico",
      });
    }
  }

  return rows;
}

// Tabela de Armas Corpo a Corpo Superiores (combinando armas + modificadores)
export function generateModifiedMeleeWeaponTable(type: string) {
  var table: {
    Resultado: number;
    "Rolagem 2": string;
    "Rolagem 3": string;
    ref?: React.RefObject<any>;
  }[] = [];

  if (type === "melee") {
    table = [
      { Resultado: 1, "Rolagem 2": "Adaga", "Rolagem 3": "de Gromril" },
      { Resultado: 2, "Rolagem 2": "Adaga", "Rolagem 3": "de Gromril" },
      { Resultado: 3, "Rolagem 2": "Adaga", "Rolagem 3": "de Gromril" },
      { Resultado: 4, "Rolagem 2": "Machado", "Rolagem 3": "de Gromril" },
      { Resultado: 5, "Rolagem 2": "Machado", "Rolagem 3": " de Ithilmar" },
      { Resultado: 6, "Rolagem 2": "Machado", "Rolagem 3": "de Ithilmar" },
      {
        Resultado: 7,
        "Rolagem 2": "Arma de Concussão",
        "Rolagem 3": "de Ithilmar",
      },
      {
        Resultado: 8,
        "Rolagem 2": "Arma de Concussão",
        "Rolagem 3": "de Ithilmar",
      },
      { Resultado: 9, "Rolagem 2": "Espada", "Rolagem 3": "Ungida" },
      { Resultado: 10, "Rolagem 2": "Espada", "Rolagem 3": "Ungida" },
      {
        Resultado: 11,
        "Rolagem 2": "Arma de Duas Mãos",
        "Rolagem 3": "Ungida",
      },
      {
        Resultado: 12,
        "Rolagem 2": "Arma de Duas Mãos",
        "Rolagem 3": "Ungida",
      },
      {
        Resultado: 13,
        "Rolagem 2": "Cajado",
        "Rolagem 3": "Sedenta por Viceras",
      },
      {
        Resultado: 14,
        "Rolagem 2": "Cajado",
        "Rolagem 3": "Sedenta por Visceras",
      },
      {
        Resultado: 15,
        "Rolagem 2": "Cajado",
        "Rolagem 3": "Sedenta por Visceras",
      },
      {
        Resultado: 16,
        "Rolagem 2": "Arma de Haste",
        "Rolagem 3": "Sedenta por Visceras",
      },
      {
        Resultado: 17,
        "Rolagem 2": "Arma de Haste",
        "Rolagem 3": "Quimioserra",
      },
      {
        Resultado: 18,
        "Rolagem 2": "ESCOLHA ARMA (incluindo exclusivo do bando)",
        "Rolagem 3": "Quimioserra",
      },
      {
        Resultado: 19,
        "Rolagem 2": "ESCOLHA ARMA (incluindo exclusivo do bando)",
        "Rolagem 3": "Quimioserra",
      },
      {
        Resultado: 20,
        "Rolagem 2": "GANHE UM EQUIPAMENTO SUPERIOR CORPO A CORPO EXTRA",
        "Rolagem 3": "GANHE UM EQUIPAMENTO SUPERIOR CORPO A CORPO EXTRA",
      },
    ];
  }
  if (type === "ranged") {
    table = [
      { Resultado: 1, "Rolagem 2": "Funda", "Rolagem 3": "Silvano(a)" },
      { Resultado: 2, "Rolagem 2": "Funda", "Rolagem 3": "Silvano(a)" },
      { Resultado: 3, "Rolagem 2": "Funda", "Rolagem 3": "Silvano(a)" },
      {
        Resultado: 4,
        "Rolagem 2": "Arma de Arremesso",
        "Rolagem 3": "Silvano(a)",
      },
      {
        Resultado: 5,
        "Rolagem 2": "Arma de Arremesso",
        "Rolagem 3": " Anão(ã)",
      },
      {
        Resultado: 6,
        "Rolagem 2": "Arma de Arremesso",
        "Rolagem 3": " Anão(ã)",
      },
      { Resultado: 7, "Rolagem 2": "Arco Curto", "Rolagem 3": " Anão(ã)" },
      { Resultado: 8, "Rolagem 2": "Arco Curto", "Rolagem 3": "Anão(ã)" },
      { Resultado: 9, "Rolagem 2": "Arco Curto", "Rolagem 3": "Sônico(a)" },
      { Resultado: 10, "Rolagem 2": "Arco", "Rolagem 3": "Sônico(a)" },
      { Resultado: 11, "Rolagem 2": "Arco", "Rolagem 3": "Sônico(a)" },
      { Resultado: 12, "Rolagem 2": "Arco Longo", "Rolagem 3": "Sônico(a)" },
      { Resultado: 13, "Rolagem 2": "Arco Longo", "Rolagem 3": "Ungido(a)" },
      { Resultado: 14, "Rolagem 2": "Besta", "Rolagem 3": "Ungido(a)" },
      { Resultado: 15, "Rolagem 2": "Besta", "Rolagem 3": "Ungido(a)" },
      { Resultado: 16, "Rolagem 2": "Besta de Mão", "Rolagem 3": "Ungido(a)" },
      {
        Resultado: 17,
        "Rolagem 2": "Besta de Mão",
        "Rolagem 3": "Perfura-Vento",
      },
      {
        Resultado: 18,
        "Rolagem 2": "ESCOLHA ARMA (incluindo exclusivo do bando)",
        "Rolagem 3": "Perfura-Vento",
      },
      {
        Resultado: 19,
        "Rolagem 2": "ESCOLHA ARMA (incluindo exclusivo do bando)",
        "Rolagem 3": "Perfura-Vento",
      },
      {
        Resultado: 20,
        "Rolagem 2": "GANHE UM EQUIPAMENTO SUPERIOR A DISTÂNCIA EXTRA",
        "Rolagem 3": "GANHE UM EQUIPAMENTO SUPERIOR A DISTÂNCIA EXTRA",
      },
    ];
  }
  if (type === "firearms") {
    table = [
      { Resultado: 1, "Rolagem 2": "Pistola", "Rolagem 3": "Kharadronico(a)" },
      { Resultado: 2, "Rolagem 2": "Pistola", "Rolagem 3": "Kharadronico(a)" },
      { Resultado: 3, "Rolagem 2": "Pistola", "Rolagem 3": "Kharadronico(a)" },
      { Resultado: 4, "Rolagem 2": "Pistola", "Rolagem 3": "Kharadronico(a)" },
      { Resultado: 5, "Rolagem 2": "Pistola", "Rolagem 3": " de Dois Canos" },
      {
        Resultado: 6,
        "Rolagem 2": "Pistola do Duelista",
        "Rolagem 3": " de Dois Canos",
      },
      {
        Resultado: 7,
        "Rolagem 2": "Pistola do Duelista",
        "Rolagem 3": " de Dois Canos",
      },
      {
        Resultado: 8,
        "Rolagem 2": "Pistola do Duelista",
        "Rolagem 3": "de Dois Canos",
      },
      {
        Resultado: 9,
        "Rolagem 2": "Pistola do Duelista",
        "Rolagem 3": "Cathaiano(a)",
      },
      { Resultado: 10, "Rolagem 2": "Arcabuz", "Rolagem 3": "Cathaiano(a)" },
      { Resultado: 11, "Rolagem 2": "Arcabuz", "Rolagem 3": "Cathaiano(a)" },
      { Resultado: 12, "Rolagem 2": "Arcabuz", "Rolagem 3": "Cathaiano(a)" },
      {
        Resultado: 13,
        "Rolagem 2": "Arcabuz",
        "Rolagem 3": "com Baioneta Vaporserra",
      },
      {
        Resultado: 14,
        "Rolagem 2": "Bacamarte",
        "Rolagem 3": "com Baioneta Vaporserra",
      },
      {
        Resultado: 15,
        "Rolagem 2": "Bacamarte",
        "Rolagem 3": "com Baioneta Vaporserra",
      },
      {
        Resultado: 16,
        "Rolagem 2": "Bacamarte",
        "Rolagem 3": "com Baioneta Vaporserra",
      },
      {
        Resultado: 17,
        "Rolagem 2": "Bacamarte",
        "Rolagem 3": "Telescópico(a)",
      },
      {
        Resultado: 18,
        "Rolagem 2": "ESCOLHA ARMA (incluindo exclusivo do bando)",
        "Rolagem 3": "Telescópico(a)",
      },
      {
        Resultado: 19,
        "Rolagem 2": "ESCOLHA ARMA (incluindo exclusivo do bando)",
        "Rolagem 3": "Telescópico(a)",
      },
      {
        Resultado: 20,
        "Rolagem 2": "GANHE UMA ARMA DE FOGO SUPERIOR EXTRA",
        "Rolagem 3": "GANHE UMA ARMA DE FOGO SUPERIOR EXTRA",
      },
    ];
  }
  if (type === "armor") {
    table = [
      { Resultado: 1, "Rolagem 2": "Escudo", "Rolagem 3": "de Gromril" },
      { Resultado: 2, "Rolagem 2": "Escudo", "Rolagem 3": "de Gromril" },
      { Resultado: 3, "Rolagem 2": "Escudo", "Rolagem 3": "de Gromril" },
      { Resultado: 4, "Rolagem 2": "Escudo", "Rolagem 3": "de Gromril" },
      { Resultado: 5, "Rolagem 2": "Escudo", "Rolagem 3": "Dracônica" },
      { Resultado: 6, "Rolagem 2": "Escudo", "Rolagem 3": "Dracônica" },
      { Resultado: 7, "Rolagem 2": "Escudo", "Rolagem 3": "Dracônica" },
      { Resultado: 8, "Rolagem 2": "Escudo", "Rolagem 3": "Dracônica" },
      { Resultado: 9, "Rolagem 2": "Escudo", "Rolagem 3": "de Ithilmar" },
      { Resultado: 10, "Rolagem 2": "Escudo", "Rolagem 3": "de Ithilmar" },
      {
        Resultado: 11,
        "Rolagem 2": "Armadura Leve",
        "Rolagem 3": "de Ithilmar",
      },
      {
        Resultado: 12,
        "Rolagem 2": "Armadura Leve",
        "Rolagem 3": "de Ithilmar",
      },
      {
        Resultado: 13,
        "Rolagem 2": "Armadura Leve",
        "Rolagem 3": "Flamejante de Aqshy",
      },
      {
        Resultado: 14,
        "Rolagem 2": "Armadura Leve",
        "Rolagem 3": "Flamejante de Aqshy",
      },
      {
        Resultado: 15,
        "Rolagem 2": "Armadura Leve",
        "Rolagem 3": "Flamejante de Aqshy",
      },
      {
        Resultado: 16,
        "Rolagem 2": "Armadura Pesada",
        "Rolagem 3": "Flamejante de Aqshy",
      },
      {
        Resultado: 17,
        "Rolagem 2": "Armadura Pesada",
        "Rolagem 3": "Prismático(a)",
      },
      {
        Resultado: 18,
        "Rolagem 2": "Armadura Pesada",
        "Rolagem 3": "Prismática(a)",
      },
      {
        Resultado: 19,
        "Rolagem 2": "Armadura Pesada",
        "Rolagem 3": "Prismática(a)",
      },
      {
        Resultado: 20,
        "Rolagem 2": "GANHE UMA ARMADURA SUPERIOR EXTRA",
        "Rolagem 3": "GANHE UMA ARMADURA SUPERIOR EXTRA",
      },
    ];
  }

  return table;
}
