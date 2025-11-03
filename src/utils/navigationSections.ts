/**
 * Helper para criar seções de navegação de forma segura
 * Lida com dados que ainda estão carregando (null/undefined)
 */

interface Unit {
  id?: string;
  name: string;
  role?: string;
  [key: string]: any; // Permite outras propriedades
}

interface NavigationSection {
  id: string;
  title: string;
  level: number;
  children?: Array<{
    id: string;
    title: string;
    level: number;
  }>;
}

/**
 * Cria seções de navegação para páginas de warband
 * Retorna seções básicas se os dados ainda não estão carregados
 */
export function createWarbandNavigationSections(
  data: Unit[] | null | undefined,
  baseSections: Array<{ id: string; title: string; level: number }> = []
): NavigationSection[] {
  // Se os dados ainda não estão carregados, retorna apenas as seções básicas
  if (!data || !Array.isArray(data) || data.length === 0) {
    return baseSections;
  }

  const leader = data.find((unit) => unit.role === "Líder") as Unit | undefined;
  const heroes = (data.filter((unit) => unit.role === "Herói") || []) as Unit[];
  const soldiers = (data.filter((unit) => !unit.role) || []) as Unit[];

  // Helper para obter o ID da unidade (usa id se disponível, senão gera de name)
  const getUnitId = (unit: Unit): string => {
    if (unit.id) return unit.id;
    return unit.name.toLowerCase().replace(/\s+/g, "-");
  };

  return [
    ...baseSections,
    {
      id: "lider",
      title: "Líder",
      level: 0,
      children: leader
        ? [
            {
              id: getUnitId(leader),
              title: leader.name,
              level: 1,
            },
          ]
        : [],
    },
    {
      id: "herois",
      title: "Heróis",
      level: 0,
      children: heroes.map((hero) => ({
        id: getUnitId(hero),
        title: hero.name,
        level: 1,
      })),
    },
    {
      id: "soldados",
      title: "Soldados",
      level: 0,
      children: soldiers.map((soldier) => ({
        id: getUnitId(soldier),
        title: soldier.name,
        level: 1,
      })),
    },
  ];
}

/**
 * Helper genérico para criar seções de navegação seguras
 */
export function createSafeNavigationSections(
  sections: NavigationSection[] | null | undefined
): NavigationSection[] {
  if (!sections || !Array.isArray(sections)) {
    return [];
  }
  return sections;
}

