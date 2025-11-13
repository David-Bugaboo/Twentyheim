

export type InjuryRollResult = {
  roll: number;
  result: {
    type: "injury" | "no-action" | "sub-roll" | "multiple-rolls" | "death";
    injurySlug?: string;
    name: string;
    description: string;
    subRollType?: "arm" | "insanity" | "leg" | null;
  };
  subRoll?: {
    roll: number;
    injurySlug?: string;
    name: string;
    description: string;
  } | null;
};

/**
 * Mapeia o resultado do d20 para o tipo de ferimento
 */
const getInjuryResult = (roll: number): Omit<InjuryRollResult, "subRoll"> => {
  switch (roll) {
    case 1:
      return {
        roll,
        result: {
          type: "death",
          name: "Morto",
          description:
            "A figura está morta, e seu corpo foi abandonado nos becos sombrios de Mordheim, para nunca mais ser encontrado. Todas as armas e equipamentos que ele carregava estão perdidos. Remova-o da ficha do bando.",
        },
      };
    case 2:
      return {
        roll,
        result: {
          type: "multiple-rolls",
          name: "Múltiplos Ferimentos",
          description:
            "Role mais 3 vezes nessa tabela. Re-role qualquer resultado de Morto, Capturado e Múltiplos Ferimentos.",
        },
      };
    case 3:
      return {
        roll,
        result: {
          type: "injury",
          injurySlug: "fratura-exposta-na-perna",
          name: "Fratura Exposta na Perna",
          description:
            "A perna da figura está quebrada de uma forma horrível. Ele sofre uma penalidade de -2 em seu atributo de Movimento a partir de agora.",
        },
      };
    case 4:
      return {
        roll,
        result: {
          type: "sub-roll",
          subRollType: "arm",
          name: "Ferimento no Braço",
          description: "Role o dado novamente:",
        },
      };
    case 5:
      return {
        roll,
        result: {
          type: "sub-roll",
          subRollType: "insanity",
          name: "Insanidade",
          description: "Role o dado novamente:",
        },
      };
    case 6:
      return {
        roll,
        result: {
          type: "sub-roll",
          subRollType: "leg",
          name: "Perna Esmagada",
          description: "Role o dado novamente:",
        },
      };
    case 7:
      return {
        roll,
        result: {
          type: "injury",
          injurySlug: "costelas-quebradas",
          name: "Costelas Quebradas",
          description:
            "A figura sofreu um ferimento grave no peito. Sua vida máxima é reduzida permanentemente em -2.",
        },
      };
    case 8:
      return {
        roll,
        result: {
          type: "injury",
          injurySlug: "cego-de-um-olho",
          name: "Cego de Um Olho",
          description:
            "A figura sobrevive, mas perde a visão em um olho; determine aleatoriamente qual. Um personagem que perde um olho tem sua Precisão reduzida em -2. Se a figura for posteriormente cegado no olho bom restante, ele deve se aposentar do bando.",
        },
      };
    case 9:
      return {
        roll,
        result: {
          type: "injury",
          injurySlug: "ferimento-infectado",
          name: "Ferimento Infectado",
          description:
            "A figura sobrevive, mas sua ferida o impedirá de lutar se você rolar 1-5 em um dado no início de qualquer batalha. Role no início de cada batalha a partir de agora.",
        },
      };
    case 10:
      return {
        roll,
        result: {
          type: "injury",
          injurySlug: "trauma",
          name: "Trauma",
          description:
            "O sistema nervoso da figura foi danificado. Sua Vontade é reduzida em -1.",
        },
      };
    case 11:
      return {
        roll,
        result: {
          type: "injury",
          injurySlug: "dedo-quebrado",
          name: "Dedo Quebrado",
          description:
            "Um ou mais dedos da figura foram irreversívelmente quebrados. Seu Ímpeto é reduzido permanentemente em -1.",
        },
      };
    case 12:
      return {
        roll,
        result: {
          type: "injury",
          injurySlug: "ferimento-profundo",
          name: "Ferimento Profundo",
          description:
            "A figura sofreu um ferimento sério e deve perder os próximos 2 jogos enquanto se recupera. Ele não pode fazer nada enquanto se recupera, incluindo atividades.",
        },
      };
    case 13:
      return {
        roll,
        result: {
          type: "no-action",
          name: "Roubado",
          description:
            "A figura consegue escapar, mas todas as suas armas, armaduras e equipamentos estão perdidos.",
        },
      };
    case 14:
      return {
        roll,
        result: {
          type: "no-action",
          name: "Recuperação Completa",
          description:
            "A figura foi nocauteado ou sofreu um ferimento leve do qual se recupera completamente.",
        },
      };
    case 15:
      return {
        roll,
        result: {
          type: "no-action",
          name: "Inimizade Amarga",
          description:
            "A figura se recupera fisicamente, mas está psicologicamente marcado por sua experiência. A partir de agora, a figura ganha a característica Ódio contra o seguinte (role um D20): 1-10: O indivíduo que reduziu a figura a 0 de vida. Se foi um Soldado, ele odeia o líder do bando daquele soldado. 11-15: O líder do bando que o reduziu a 0 de vida. 16-19: Todas as figuras do bando que o reduziu a 0 de vida. 20: Todos os bandos daquela mesmo tipo.",
        },
      };
    case 16:
      return {
        roll,
        result: {
          type: "no-action",
          name: "Capturado",
          description:
            "A figura recupera a consciência e se encontra preso pelo bando que jogou contra. Ele pode ser resgatado por um preço definido pelo captor ou trocado por um membro de bando inimigo que está sendo mantido prisioneiro.",
        },
      };
    case 17:
      return {
        roll,
        result: {
          type: "no-action",
          name: "Caleijado",
          description:
            "A figura sobrevive e se torna insensível aos horrores de Mordheim. A partir de agora, ele é Imune a Aterrorizante.",
        },
      };
    case 18:
      return {
        roll,
        result: {
          type: "injury",
          injurySlug: "cicatrizes-horriveis",
          name: "Cicatrizes Horríveis",
          description: "A figura ganha a característica Aterrorizante.",
        },
      };
    case 19:
      return {
        roll,
        result: {
          type: "no-action",
          name: "Vendido as Arenas Clandestinas",
          description:
            "A figura acorda nas notórias Arenas Clandestinas do Covil dos Saqueadores e deve lutar contra um Gladiador. A figura rola um teste de Ímpeto ou Precisão CD 15. Se a figura perder, role um dado. Em 1-10 ele morreu, em 11-20 ele foi ferido. Se a figura obtiver sucesso no teste, ele ganha 50 coroas de ouro, +50 de Experiência e está livre para se juntar novamente ao seu bando com todas as suas armas e equipamentos.",
        },
      };
    case 20:
      return {
        roll,
        result: {
          type: "no-action",
          name: "Supreendentemente Sobrevive",
          description:
            "A figura sobrevive e se junta novamente ao seu bando. Ela ganha +50 de Experiência.",
        },
      };
    default:
      return {
        roll,
        result: {
          type: "no-action",
          name: "Resultado Desconhecido",
          description: "Resultado não reconhecido.",
        },
      };
  }
};

/**
 * Processa uma sub-rolagem baseada no tipo
 */
const processSubRoll = (
  subRollType: "arm" | "insanity" | "leg",
  subRoll: number
): { injurySlug?: string; name: string; description: string } => {
  if (subRollType === "arm") {
    if (subRoll >= 1 && subRoll <= 5) {
      return {
        injurySlug: "antebraco-esmagado",
        name: "Antebraço Esmagado",
        description:
          "O braço deve ser amputado. A figura só poderá usar uma única arma sem a característica Duas Mãos a partir de agora.",
      };
    } else {
      return {
        injurySlug: "ombro-deslocado",
        name: "Ombro Deslocado",
        description: "A figura não joga o próximo jogo.",
      };
    }
  }

  if (subRollType === "insanity") {
    if (subRoll >= 1 && subRoll <= 5) {
      return {
        injurySlug: "insanidade-estupidez",
        name: "Insanidade(Estupidez)",
        description: "A figura ganha a característica estupidez.",
      };
    } else {
      return {
        injurySlug: "insanidade-furia",
        name: "Insanidade (Fúria)",
        description: "A figura ganha a característica Fúria.",
      };
    }
  }

  if (subRollType === "leg") {
    if (subRoll >= 1 && subRoll <= 5) {
      return {
        injurySlug: "femur-quebrado",
        name: "Fêmur Quebrado",
        description:
          "A figura não pode mais tomar ações de disparada ou escalar.",
      };
    } else {
      return {
        injurySlug: "joelho-deslocado",
        name: "Joelho Deslocado",
        description: "A figura não pode participar do próximo jogo.",
      };
    }
  }

  return {
    name: "Erro",
    description: "Tipo de sub-rolagem não reconhecido.",
  };
};

/**
 * Rola um d20 e retorna o resultado do ferimento
 */
export const rollInjury = (): InjuryRollResult => {
  const roll = Math.floor(Math.random() * 20) + 1; // 1-20
  const result = getInjuryResult(roll);

  // Se precisa de sub-rolagem, faz a sub-rolagem
  if (result.result.type === "sub-roll" && result.result.subRollType) {
    const subRoll = Math.floor(Math.random() * 20) + 1;
    const subResult = processSubRoll(
      result.result.subRollType,
      subRoll
    );

    return {
      ...result,
      subRoll: {
        roll: subRoll,
        ...subResult,
      },
    };
  }

  return {
    ...result,
    subRoll: null,
  };
};

