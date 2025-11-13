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

  if (usesHeroLeaderTable && roll >= 1 && roll <= 4) {
    // Tabela de habilidades/magias (1-4)
    const options = [
      allAdvancements.find(adv => adv.slug === "nova-habilidade"),
      allAdvancements.find(adv => adv.slug === "nova-magia"),
      allAdvancements.find(adv => adv.slug === "fortalecer-magia"),
    ].filter(
      (adv): adv is { slug: string; name: string; description?: string | null } =>
        adv !== undefined
    );
    return { roll, options };
  }

  // Tabela de aumento de atributo
  if (roll >= 1 && roll <= 4) {
    // +1 Força ou +1 Ímpeto
    const options = [
      allAdvancements.find(adv => adv.slug === "1-forca"),
      allAdvancements.find(adv => adv.slug === "1-impeto"),
    ].filter(
      (adv): adv is { slug: string; name: string; description?: string | null } =>
        adv !== undefined
    );
    return { roll, options };
  } else if (roll >= 5 && roll <= 8) {
    // +1 Precisão ou +2 Movimento
    const options = [
      allAdvancements.find(adv => adv.slug === "1-precisao"),
      allAdvancements.find(adv => adv.slug === "2-movimento"),
    ].filter(
      (adv): adv is { slug: string; name: string; description?: string | null } =>
        adv !== undefined
    );
    return { roll, options };
  } else if (roll >= 9 && roll <= 12) {
    // +1 Armadura ou +2 Vida
    const options = [
      allAdvancements.find(adv => adv.slug === "1-armadura"),
      allAdvancements.find(adv => adv.slug === "2-vida"),
    ].filter(
      (adv): adv is { slug: string; name: string; description?: string | null } =>
        adv !== undefined
    );
    return { roll, options };
  } else if (roll >= 13 && roll <= 16) {
    // +2 Vida ou +1 Vontade
    const options = [
      allAdvancements.find(adv => adv.slug === "2-vida"),
      allAdvancements.find(adv => adv.slug === "1-vontade"),
    ].filter(
      (adv): adv is { slug: string; name: string; description?: string | null } =>
        adv !== undefined
    );
    return { roll, options };
  } else {
    // 17-20: O Moleque Tem Talento!
    const options = [
      allAdvancements.find(adv => adv.slug === "o-moleque-tem-talento"),
    ].filter(
      (adv): adv is { slug: string; name: string; description?: string | null } =>
        adv !== undefined
    );
    return { roll, options };
  }
};

