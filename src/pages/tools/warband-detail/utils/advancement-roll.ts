export type AdvancementRollResult = {
  roll: number;
  options: Array<{
    slug: string;
    name: string;
    description?: string | null;
  }>;
};

/**
 * Rola um d20 e retorna as opções de avanço baseado nas tabelas
 * @param usesHeroLeaderTable - Se true, usa tabela de heróis/líderes (1-4: habilidades/magias)
 * @param allAdvancements - Lista de todos os avanços disponíveis
 */
export const rollAdvancement = (
  usesHeroLeaderTable: boolean,
  allAdvancements: Array<{ slug: string; name: string; description?: string | null }>
): AdvancementRollResult => {
  const roll = Math.floor(Math.random() * 20) + 1; // 1-20

  const findOptions = (...slugs: string[]) =>
    slugs
      .map(slug => allAdvancements.find(adv => adv.slug === slug))
      .filter(
        (adv): adv is { slug: string; name: string; description?: string | null } =>
          adv !== undefined
      );

  if (usesHeroLeaderTable) {
    if (roll >= 1 && roll <= 4) {
      // Tabela especial de habilidades/magias
      return {
        roll,
        options: findOptions("nova-habilidade", "nova-magia", "fortalecer-magia"),
      };
    }
    if (roll >= 5 && roll <= 8) {
      return { roll, options: findOptions("1-forca", "1-impeto") };
    }
    if (roll >= 9 && roll <= 12) {
      return { roll, options: findOptions("1-precisao", "2-movimento") };
    }
    if (roll >= 13 && roll <= 16) {
      return { roll, options: findOptions("1-armadura", "2-vida") };
    }
    return { roll, options: findOptions("2-vida", "1-vontade") };
  }

  // Tabela de soldados / demais figuras
  if (roll >= 1 && roll <= 4) {
    return { roll, options: findOptions("1-forca", "1-impeto") };
  }
  if (roll >= 5 && roll <= 8) {
    return { roll, options: findOptions("1-precisao", "2-movimento") };
  }
  if (roll >= 9 && roll <= 12) {
    return { roll, options: findOptions("1-armadura", "2-vida") };
  }
  if (roll >= 13 && roll <= 16) {
    return { roll, options: findOptions("2-vida", "1-vontade") };
  }
  return { roll, options: findOptions("o-moleque-tem-talento") };
};

