export interface figure {
  id: string;
  baseFigureId: string;
  campaignName: string;
  injuriesModifiers: {
    move: number;
    fight: number;
    shoot: number;
    armour: number;
    Vontade: number;
    health: number;
  };
  advancementsModifiers: {
    move: number;
    fight: number;
    shoot: number;
    armour: number;
    Vontade: number;
    health: number;
  };
  miscModifiers: {
    move: number;
    fight: number;
    shoot: number;
    armour: number;
    Vontade: number;
    health: number;
  };
  equipmentModifiers: {
    move: number;
    fight: number;
    shoot: number;
    armour: number;
    Vontade: number;
    health: number;
  };
  availableSkills: string[];
  availableSpells: string[];
  mutations: string[];
  sacredMarks: string[];
  nurgleBlessings: string[];
  advancements: string[];
  injuries: string[];
  equipment: string[];
  magic: string[];
  extraSpecialRules: string[];
  xp: number;
}
