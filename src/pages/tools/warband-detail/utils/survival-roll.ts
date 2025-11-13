export type SurvivalRollResult = {
  roll: number;
  isDead: boolean;
};

/**
 * Rola um d20 para sobrevivência
 * 1-6: morre
 * 7-20: está bem
 */
export const rollSurvival = (): SurvivalRollResult => {
  const roll = Math.floor(Math.random() * 20) + 1; // 1-20
  return {
    roll,
    isDead: roll >= 1 && roll <= 6,
  };
};

