import { useEffect, useMemo, useRef, useState } from "react";
import PageTitle from "../../../components/PageTitle";
import MobileSection from "../../../components/MobileSection";
import MobileText from "../../../components/MobileText";
import EquipmentCard from "../../../components/EquipmentCard";
import HeaderH1 from "../../../components/HeaderH1";
import WarbandStash, { type StashItem } from "../../../components/WarbandStash";
import RosterUnitCard, {
  type AttributeBreakdown,
  type RosterUnitStats,
} from "../../../components/RosterUnitCard";
import { type UnitAbility, type UnitStats } from "../../../components/UnitCard";

// Datasheets por facção
import sistersData from "../../warbands/sisters-of-sigmar/data/sisters-of-sigmar.data.json";
import skavenData from "../../warbands/skaven/data/skaven.data.json";
import beastmenData from "../../warbands/beastman-raiders/beastmen-raiders.data.json";
import dwarfTreasureHuntersData from "../../warbands/dwarf-treasure-hunters/data/dwarf-treasure-hunters.data.json";
import cultPossessedData from "../../warbands/cult-of-the-possessed/data/cult-of-the-possessed-page.json";
import vampireCourtsData from "../../warbands/vampire-courts/data/vampire-courts.data.json";
import witchHuntersData from "../../warbands/witch-hunters/data/witch-hunters.data.json";
import lizardmenData from "../../warbands/lizardmen/data/lizardmen.data.json";
import orcMobData from "../../warbands/orc-mob/data/orc-mob.data.json";
import goblinsData from "../../warbands/goblins/data/goblins.data.json";
import sonsOfHashutData from "../../warbands/sons-of-hashut/data/sons-of-hashut.data.json";
import mercenariesData from "../../warbands/mercenaries/data/mercenaries.data.json";
import carnivalChaosData from "../../warbands/carnival-of-chaos/data/carnival-of-chaos.data.json";
import darkElfCorsairsData from "../../warbands/dark-elf-corsairs/data/dark-elf-corsairs.data.json";
// Mercenários e Lendas (campanha)
import hiredSwords from "../../campanha/data/hired-swords.data.json";
import legendsData from "../../campanha/data/lendas.data.json";
// Catálogos globais de equipamentos
import meleeDb from "../../../pages/weapons and equipments/data/armas-corpo-a-corpo-refactor.json";
import rangedDb from "../../../pages/weapons and equipments/data/armas-a-distancia-refactor.json";
import firearmsDb from "../../../pages/weapons and equipments/data/armas-de-fogo-refactor.json";
import armorDb from "../../../pages/weapons and equipments/data/armaduras-e-escudos-refactor.json";
import accessoriesDb from "../../../pages/weapons and equipments/data/acessorios-refactor.json";
import remediesPoisonsDb from "../../../pages/weapons and equipments/data/remedios-e-venenos.json";
import meleeMods from "../../../pages/weapons and equipments/data/modificadores-de-arma-refactor.json";
import rangedMods from "../../../pages/weapons and equipments/data/modificadores-de-arma-a-distancia-refactor.json";
import firearmsMods from "../../../pages/weapons and equipments/data/modificadores-de-armas-de-fogo-refactor.json";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../../../firebase.ts";
import {
  collection,
  doc,
  addDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { useAuth } from "../../../context/AuthContext";
import type { Equipment as FullEquipment } from "../types/equipment.type";
import { buildFigureFromBase } from "../types/figure.type";
import WarbandNotFoundPage from "./WarbandNotFoundPage";
import { toast } from "react-toastify";

type EditableUnit = {
  id: string;
  name: string;
  role?: string;
  quantity?: string;
  lore?: string;
  availability?: string | string[];
  qualidade?: string;
  stats: UnitStats;
  abilities: UnitAbility[];
  figure?: import("../types/figure.type").Figure;
  equipment?: {
    "hand-to-hand"?: Array<{ name: string; cost: string }>;
    ranged?: Array<{ name: string; cost: string }>;
    armor?: Array<{ name: string; cost: string }>;
    miscellaneous?: Array<{ name: string; cost: string }>;
    modifiers?: Array<{ name: string; cost: string }>;
  };
  // Seleções do usuário - agora estão diretamente no figure (skills, spells, advancements, injuries)
  chosenAbilities?: UnitAbility[];
  chosenEquipment?: Array<{
    name: string;
    category: string;
    cost?: string;
    data?: any;
  }>;
  chosenMagic?: string[]; // tradições/escolas selecionadas (deprecated)
  spellAffinity?: {
    aligned0?: string[];
    aligned2?: string[];
  };
  specialRules?: string[];
  injuries?: string;
  xpTrack?: boolean[]; // 30 casas
  totalXp?: number;
  // Breakdown de atributos para o RosterUnitCard
  statBreakdown?: {
    move?: AttributeBreakdown;
    fight?: AttributeBreakdown;
    shoot?: AttributeBreakdown;
    armour?: AttributeBreakdown;
    vontade?: AttributeBreakdown;
    health?: AttributeBreakdown;
    strength?: AttributeBreakdown;
  };
  // Equipamentos equipados nos slots específicos
  equippedItems?: {
    elmo?: string;
    escudo?: string;
    armadura?: string;
    "arma-corpo-a-corpo-1"?: string;
    "arma-corpo-a-corpo-2"?: string;
    "arma-distancia-1"?: string;
    "arma-distancia-2"?: string;
    "adaga-gratis"?: string;
    acessorios?: string[];
  };
};

// Remove recursivamente qualquer campo com valor undefined (Firestore não aceita)
const stripUndefinedDeep = (value: any): any => {
  if (Array.isArray(value)) {
    return value
      .map((v) => stripUndefinedDeep(v))
      .filter((v) => v !== undefined);
  }
  if (value && typeof value === "object") {
    const out: any = {};
    for (const [k, v] of Object.entries(value)) {
      if (v === undefined) continue;
      const cleaned = stripUndefinedDeep(v);
      if (cleaned !== undefined) out[k] = cleaned;
    }
    return out;
  }
  return value;
};

type WarbandSheet = {
  name: string;
  faction?: string;
  notes?: string;
  gold?: string;
  wyrdstone?: string;
  // Unificado: usamos somente vault com objetos Equipment completos
  vault?: FullEquipment[];
  units: EditableUnit[];
};

// Persistência via Firestore (sem localStorage)

// Helper para extrair número de uma string (ex: "+1" -> 1, "10" -> 10)
const extractNumber = (value: number | string | undefined): number => {
  if (typeof value === "number") return value;
  if (!value) return 0;
  const str = String(value).trim();
  const match = str.match(/([+-]?\d+)/);
  return match ? parseInt(match[1], 10) : 0;
};

// Converte UnitStats para RosterUnitStats com breakdown
const createRosterStats = (
  baseStats: UnitStats,
  statBreakdown?: EditableUnit["statBreakdown"]
): RosterUnitStats => {
  const createBreakdown = (
    key: keyof RosterUnitStats,
    baseValue: number | string
  ): AttributeBreakdown => {
    const existing = statBreakdown?.[key];
    return {
      base: extractNumber(baseValue),
      advancement: existing?.advancement || 0,
      injury: existing?.injury || 0,
      misc: existing?.misc || 0,
    };
  };

  return {
    move: createBreakdown("move", baseStats.move),
    fight: createBreakdown("fight", baseStats.fight),
    shoot: createBreakdown("shoot", baseStats.shoot),
    armour: createBreakdown("armour", baseStats.armour),
    vontade: createBreakdown("vontade", baseStats.Vontade),
    health: createBreakdown("health", baseStats.health),
    strength:
      baseStats.strength !== undefined ||
      baseStats.força !== undefined ||
      baseStats.For !== undefined
        ? createBreakdown(
            "strength",
            baseStats.strength ?? baseStats.força ?? baseStats.For ?? 0
          )
        : undefined,
  };
};

// Mapeia chosenEquipment para equippedItems (slots específicos)

function WarbandRosterPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const fixedFaction = params.get("faction") || "";
  const warbandId = params.get("id") || "";
  const userId = params.get("userId") || "";
  const { currentUser, loading } = useAuth();

  // Verifica se o usuário logado é o dono do warband
  const isAuthorized = currentUser && currentUser.uid === userId;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [notFound, setNotFound] = useState<boolean>(false);
  const dirtyRef = useRef<boolean>(false);

  const [sheet, setSheet] = useState<WarbandSheet>({
    name: "",
    faction: fixedFaction || "",
    notes: "",
    gold: "500",
    wyrdstone: "0",
    vault: [],
    units: [],
  });
  const hasLoadedRef = useRef<boolean>(false);
  const markDirty = () => {
    dirtyRef.current = true;
  };

  // Modal de seleção de equipamentos
  const [equipmentModal, setEquipmentModal] = useState<{
    open: boolean;
    unitId?: string;
    targetSubsection?: string;
  }>({ open: false, unitId: undefined });
  const [equipmentCategory, setEquipmentCategory] = useState<string>("");
  const [selectedEquipmentName, setSelectedEquipmentName] =
    useState<string>("");
  const EQUIP_TYPES: string[] = [
    "Arma Corpo a Corpo",
    "Arma a Distância",
    "Arma de Fogo",
    "Armadura",
    "Acessórios",
  ];

  // Warband Rating = (nº membros * 5) + soma(xp + qualidade de cada figura)
  const warbandRating = useMemo(() => {
    const activeUnits = (sheet.units || []).filter(
      (u: any) => !Boolean(u?.figure?.inactive)
    );
    const members = activeUnits.length;
    const sum = activeUnits.reduce((acc, u: any) => {
      const fig = u?.figure || {};
      const xp = Number(fig?.xp || 0);
      const quality = Number(fig?.qualidade || 0);
      return acc + xp + quality;
    }, 0);
    return members * 5 + sum;
  }, [sheet.units]);

  // ==== Mercenários e Lendas (dropdowns globais) ====
  const allFactionDatas: any[] = useMemo(
    () => [
      sistersData,
      skavenData,
      beastmenData,
      dwarfTreasureHuntersData,
      cultPossessedData,
      vampireCourtsData,
      witchHuntersData,
      lizardmenData,
      orcMobData,
      goblinsData,
      sonsOfHashutData,
      mercenariesData,
      carnivalChaosData,
      darkElfCorsairsData,
    ],
    []
  );

  const factionLabelAlt = useMemo(() => {
    const map: Record<string, string> = {
      "sisters-of-sigmar": "Irmãs de Sigmar",
      skaven: "Skaven",
      "beastman-raiders": "Saqueadores Homem-Fera",
      "dwarf-treasure-hunters": "Caçadores de Tesouro Anões",
      "cult-of-the-possessed": "Culto dos Possuídos",
      "vampire-courts": "Cortes Vampíricas",
      "witch-hunters": "Caçadores de Bruxas",
      lizardmen: "Reptilianos",
      "orc-mob": "Horda Orc",
      goblins: "Goblins",
      "sons-of-hashut": "Filhos de Hashut",
      mercenaries: "Mercenários",
      "carnival-of-chaos": "Circo do Caos",
      "dark-elf-corsairs": "Corsários Druchii",
    };
    return (
      map[String(sheet.faction || fixedFaction)] ||
      String(sheet.faction || fixedFaction)
    );
  }, [sheet.faction, fixedFaction]);

  const normalizeList = (data: any) =>
    Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : [];
  const extraPools = useMemo(
    () => [hiredSwords as any, legendsData as any],
    []
  );
  const flattenAllUnits = useMemo(
    () =>
      [
        ...allFactionDatas.flatMap((d) => normalizeList(d)),
        ...extraPools.flatMap((d) => normalizeList(d)),
      ].filter(Boolean),
    [allFactionDatas, extraPools]
  );

  const isEligibleForFaction = (unit: any, label: string) => {
    const av = unit?.availability;
    const ex = unit?.exclusions;
    const hasAll =
      Array.isArray(av) &&
      av.some((x: any) => String(x).toLowerCase() === "todos");
    const hasFaction =
      Array.isArray(av) && av.some((x: any) => String(x) === label);
    const excluded =
      Array.isArray(ex) && ex.some((x: any) => String(x) === label);
    return (hasFaction || hasAll) && !excluded;
  };

  const globalMercenaries = useMemo(
    () =>
      flattenAllUnits
        .filter((u) =>
          String(u?.role || "")
            .toLowerCase()
            .includes("merc")
        )
        .filter((u) => isEligibleForFaction(u, factionLabelAlt))
        .sort((a, b) => String(a.name).localeCompare(String(b.name), "pt-BR")),
    [flattenAllUnits, factionLabelAlt]
  );
  const globalLegends = useMemo(
    () =>
      flattenAllUnits
        .filter((u) =>
          String(u?.role || "")
            .toLowerCase()
            .includes("lenda")
        )
        .filter((u) => isEligibleForFaction(u, factionLabelAlt))
        .sort((a, b) => String(a.name).localeCompare(String(b.name), "pt-BR")),
    [flattenAllUnits, factionLabelAlt]
  );

  const [selectedMercId, setSelectedMercId] = useState<string>("");
  const [selectedLegendId, setSelectedLegendId] = useState<string>("");

  // Hooks para menu dropdown de unidades (movidos da IIFE)
  const [openMenus, setOpenMenus] = useState<Set<string>>(new Set());
  const menuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const addFigureFromBase = (base: any) => {
    if (!base) return;
    markDirty();
    const id = crypto.randomUUID();
    const fig = buildFigureFromBase(base);
    // Se for mercenário/lenda com itens fixos (stats.mercEquipment/mercItems), resolve e equipa
    const mercItemsRaw: any[] = (() => {
      if (Array.isArray(base?.stats?.mercEquipment))
        return base.stats.mercEquipment as any[];
      if (Array.isArray(base?.stats?.mercItems))
        return base.stats.mercItems as any[];
      if (typeof base?.stats?.mercEquipment === "string")
        return [base.stats.mercEquipment];
      if (typeof base?.stats?.mercItems === "string")
        return [base.stats.mercItems];
      return [];
    })();
    const splitter = /,|\||\/|\be\b|\bou\b/gi;
    const mercItems: string[] = (mercItemsRaw || [])
      .flatMap((x) => String(x).split(splitter))
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    let equippedFromMerc: any[] = [];
    if (mercItems.length > 0) {
      equippedFromMerc = mercItems
        .map((n) => resolveEquipmentByName(String(n)))
        .filter(Boolean) as any[];
      // Log nomes não resolvidos para depuração
      mercItems.forEach((n) => {
        const ok = equippedFromMerc.find(
          (e) => String(e.name).toLowerCase() === String(n).toLowerCase()
        );
        if (!ok) {
          try {
            // eslint-disable-next-line no-console
            console.warn("[Merc Equip] não resolvido:", n);
          } catch {}
        }
      });
      (fig as any).equiped = equippedFromMerc;
      (fig as any).equipmentLocked = true; // trava gerenciamento de equipamento
    }
    const newUnit: EditableUnit = {
      id,
      name: fig.name,
      role: fig.role,
      lore: "",
      figure: fig,
      stats: {
        move: fig.baseStats.move,
        fight: fig.baseStats.fight,
        shoot: fig.baseStats.shoot,
        armour: fig.baseStats.armour,
        Vontade: fig.baseStats.Vontade,
        health: fig.baseStats.health,
        cost: fig.baseStats.cost,
        startingXp: fig.xp,
        strength: fig.baseStats.strength,
        skills: fig.avaiableSkills || [],
        equipmentSlots: fig.equipmentSlots,
      } as any,
      abilities: [],
      equipment: base.equipment,
      chosenAbilities: [],
      chosenEquipment: [], // Não é mais usado - figure.equiped é a fonte de verdade
      chosenMagic: [],
      specialRules: (base.abilities || [])
        .map((a: any) => a?.name)
        .filter(Boolean),
    };
    setSheet((s) => ({ ...s, units: [...s.units, newUnit] }));
  };

  const handleToggleInactive = (unitId: string) => {
    markDirty();
    setSheet((prev) => ({
      ...prev,
      units: prev.units.map((u) => {
        if (u.id !== unitId) return u;
        const fig = (u as any).figure || {};
        return {
          ...u,
          figure: { ...fig, inactive: !Boolean(fig.inactive) },
        } as any;
      }),
    }));
  };

  // Redireciona se não autorizado após o loading
  useEffect(() => {
    if (loading) return; // Ainda carregando auth
    // Se não tem usuário logado OU userId na URL é diferente do usuário logado, redireciona
    if (!currentUser || !isAuthorized) {
      navigate("/warband-builder");
    }
  }, [loading, currentUser, isAuthorized, navigate]);

  // Carrega warband do Firestore (se id presente)
  useEffect(() => {
    // Se ainda está carregando a autenticação ou não tem IDs ou não está autorizado, não carrega
    if (loading || !warbandId || !userId || !isAuthorized) return;
    let first = true;
    setIsLoading(true);
    const ref = doc(db, "users", userId, "warbands", warbandId);
    const unsub = onSnapshot(ref, (snap) => {
      if (!snap.exists()) {
        setNotFound(true);
        setIsLoading(false);
        return;
      }
      const data: any = snap.data() || {};
      // Usamos somente o root do documento (ignoramos legado em data.sheet)
      const source = data;
      setSheet((prev) => {
        const nextBase = {
          ...prev,
          name: source.name ?? prev.name,
          faction: source.faction ?? prev.faction ?? fixedFaction,
          notes: source.notes ?? prev.notes,
          gold: source.gold ?? prev.gold,
          wyrdstone: source.wyrdstone ?? prev.wyrdstone,
          vault: Array.isArray(source.vault) ? source.vault : prev.vault,
        } as typeof prev;

        // Sempre monta units a partir de figures (fonte de verdade)
        if (Array.isArray(source.figures) && source.figures.length > 0) {
          const rebuilt = (source.figures as any[]).map((fig) => {
            const id = String(fig?.id || crypto.randomUUID());
            const role = fig?.role;
            // NOVA ARQUITETURA: não precisa mais de chosenEquipment ou chosen*
            // Todos os dados já estão dentro do figure (skills, spells, advancements, injuries)
            // figure.equiped já contém todos os objetos Equipment completos
            // Corrige narrativeName para lendas: sempre vazio (não têm narrative name)
            const correctedFigure = {
              ...fig,
              narrativeName: role === "Lenda" ? "" : fig?.narrativeName || "",
            };
            return {
              id,
              name: String(fig?.name || "Figura"),
              role: role,
              lore: "",
              figure: correctedFigure, // O figure já contém tudo (skills, spells, advancements, injuries)
              stats: {
                move: fig?.baseStats?.move ?? 10,
                fight: fig?.baseStats?.fight ?? 0,
                shoot: fig?.baseStats?.shoot ?? 0,
                armour: fig?.baseStats?.armour ?? 10,
                Vontade: fig?.baseStats?.Vontade ?? 0,
                health: fig?.baseStats?.health ?? 10,
                cost: fig?.baseStats?.cost ?? "-",
                startingXp: fig?.xp ?? 0,
                strength: fig?.baseStats?.strength ?? 0,
                skills: fig?.avaiableSkills || [],
                equipmentSlots: fig?.equipmentSlots ?? 5,
              },
              abilities: [],
              equipment: undefined,
              chosenAbilities: [],
              chosenEquipment: [], // Mantido vazio - não é mais usado
              chosenMagic: [],
              specialRules: [],
            } as any;
          });
          return { ...nextBase, units: rebuilt } as typeof prev;
        }

        return nextBase;
      });
      // Marca como hidratado após a primeira carga
      if (first) {
        first = false;
        // Sinaliza que já carregamos do Firestore para evitar overwrite inicial
        (hasLoadedRef as any).current = true;
        dirtyRef.current = false;
        setIsLoading(false);
        try {
          // eslint-disable-next-line no-console
          console.log("[Firestore Hydrated]");
        } catch {}
      }
    });
    return () => unsub();
  }, [warbandId, userId, loading, isAuthorized]);

  // Ativa escrita apenas após alguma interação do usuário
  useEffect(() => {
    const markDirty = () => {
      dirtyRef.current = true;
    };
    window.addEventListener("input", markDirty, {
      once: true,
      capture: true,
    } as any);
    window.addEventListener("change", markDirty, {
      once: true,
      capture: true,
    } as any);
    window.addEventListener("click", markDirty, {
      once: true,
      capture: true,
    } as any);
    return () => {
      window.removeEventListener("input", markDirty, { capture: true } as any);
      window.removeEventListener("change", markDirty, { capture: true } as any);
      window.removeEventListener("click", markDirty, { capture: true } as any);
    };
  }, []);

  // Persiste alterações no Firestore (debounce simples)
  useEffect(() => {
    if (!warbandId || !userId || !hasLoadedRef.current || !dirtyRef.current)
      return;
    const ref = doc(db, "users", userId, "warbands", warbandId);
    const h = setTimeout(() => {
      const payloadRaw: any = {
        // Persistimos flatten para facilitar consultas
        name: sheet.name,
        faction: sheet.faction,
        notes: sheet.notes ?? "",
        gold: sheet.gold ?? "0",
        crowns: (() => {
          const m = String(sheet.gold || "0").match(/(\d+)/);
          return m ? parseInt(m[1], 10) : 0;
        })(),
        wyrdstone: sheet.wyrdstone ?? "0",
        vault: (sheet.vault || []).map((e: any) => stripUndefinedDeep(e)),
        // Apenas figures (sem units) - os campos já estão dentro do figure
        figures: (sheet.units || [])
          .map((u: any) => u?.figure)
          .filter(Boolean)
          .map((f: any) => stripUndefinedDeep(f)),
      };
      const payload = stripUndefinedDeep(payloadRaw);
      try {
        // eslint-disable-next-line no-console
        console.log("[Firestore Persist]", { warbandId, payload });
        updateDoc(ref, payload).catch((e) => {
          // eslint-disable-next-line no-console
          console.error("[Firestore Persist][Error]", e);
        });
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error("[Firestore Persist][Exception]", e);
      }
    }, 500);
    return () => clearTimeout(h);
  }, [warbandId, userId, sheet]);

  // Fecha menus ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const shouldClose = Object.values(menuRefs.current).every(
        (ref) => ref && !ref.contains(target)
      );
      if (shouldClose) {
        setOpenMenus(new Set());
      }
    };

    if (openMenus.size > 0) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenus]);

  // Função auxiliar para extrair número de custo

  // Adicionar item ao cofre (vault) — sem mexer no ouro
  const handlePurchaseItem = (item: StashItem) => {
    markDirty();
    // popula vault com Equipment completo
    const eqObj = resolveEquipmentByName(item.name);
    if (!eqObj) return;
    // Aplica modificador (se fornecido): mantém objeto base intacto e adiciona campo modifier
    if (item.modifier && item.modifier.name) {
      // Resolve modificador completo a partir dos catálogos
      const modNameLc = String(item.modifier.name).toLowerCase();
      const allMods: any[] = [
        ...(meleeMods as any[]),
        ...(rangedMods as any[]),
        ...(firearmsMods as any[]),
      ];
      const mod =
        allMods.find((m) => String(m.name).toLowerCase() === modNameLc) ||
        (item.modifier as any);

      // Calcula multiplicador a partir da expressão do modificador
      const exprRaw = String(mod.purchaseCost || "");
      const expr = exprRaw.toLowerCase().replace(/\s+/g, "");
      let multiplier = 1;

      const mult = expr.match(/base\*(\d+(?:\.\d+)?)/);
      const add = expr.match(/base\+(\d+(?:\.\d+)?)/);
      if (mult) {
        multiplier = parseFloat(mult[1]);
      } else if (add) {
        // Para "base + X", calculamos um multiplicador equivalente
        // Mas na verdade isso é uma adição, não multiplicação
        // Vamos armazenar tanto o multiplicador quanto o addend
        const addend = parseFloat(add[1]);
        multiplier = 1; // Base sempre multiplicada por 1
        (eqObj as any).modifierAddend = addend; // Valor adicional
      } else if (!expr && typeof (mod as any).purchaseCost === "number") {
        // Custo fixo - não é multiplicador, é substituição
        multiplier = 1;
        (eqObj as any).modifierFixedCost = Number((mod as any).purchaseCost);
      }

      // NÃO modifica o nome original - apenas adiciona o modificador como metadata
      // O nome completo será montado na renderização: name + modifier.name
      (eqObj as any).modifier = {
        name: String(mod.name),
        effect: String(mod.effect || (item as any).modifier?.effect || ""),
        purchaseCost: exprRaw, // Mantém a expressão original do modificador
        multiplier: multiplier, // Multiplicador de custo
        rarity: mod.rarity ?? null, // Raridade do modificador
      };

      // NÃO adiciona special rule aqui - será adicionada na renderização do modal
    }
    try {
      // eslint-disable-next-line no-console
      console.log(
        "[Vault Add] Equipment object:",
        JSON.parse(JSON.stringify(eqObj))
      );
    } catch {
      // eslint-disable-next-line no-console
      console.log("[Vault Add] Equipment object:", eqObj);
    }
    const cleaned = stripUndefinedDeep(eqObj);
    setSheet({
      ...sheet,
      vault: [...((sheet.vault || []) as any[]), cleaned],
    });
  };

  // Handler para remover item do cofre (vender/devolver) — usa vault

  // === EQUIPAR/DES equipar A PARTIR DO COFRE ===
  // handleEquipFromStash (com slots) descontinuado após unificação

  // handleUnequipToStash (com slots) descontinuado

  // === FLAT EQUIPMENT FLOW (sem slots) ===
  /* const canEquipByRules = (
    unit: EditableUnit,
    item: { name: string; category: string }
  ) => {
    const hasArsenal = ((unit.figure as any)?.skills || []).some(
      (s: any) => s.name === "Mestre do Arsenal"
    );
    const hasSharpshooter = ((unit.figure as any)?.skills || []).some(
      (s: any) => s.name === "Mestre Atirador"
    );
    const eqList = (unit.equipment || {}) as any;
    const allowedMelee = (eqList["hand-to-hand"] || []).map((e: any) => e.name);
    const allowedRanged = (eqList.ranged || []).map((e: any) => e.name);
    const allowedArmor = (eqList.armor || []).map((e: any) => e.name);
    const cat = (item.category || "").toLowerCase();
    if (cat === "miscellaneous") return true;
    if (cat === "hand-to-hand")
      return hasArsenal || allowedMelee.includes(item.name);
    if (cat === "ranged")
      return hasSharpshooter || allowedRanged.includes(item.name);
    if (cat === "armor") return allowedArmor.includes(item.name);
    return false;
  }; */

  const handleEquipFromStashFlat = (unitId: string, itemName: string) => {
    markDirty();
    const unit = sheet.units.find((u) => u.id === unitId);
    if (!unit) return;
    const idx = (sheet.vault || []).findIndex((i: any) => i.name === itemName);
    if (idx === -1) return;
    let item:
      | { name: string; category: string; cost?: string; data?: any }
      | undefined;
    // monta item mínimo a partir dos catálogos
    item = {
      name: itemName,
      category: (() => {
        if ((meleeDb as any[]).some((w) => w.name === itemName))
          return "hand-to-hand";
        if ((rangedDb as any[]).some((w) => w.name === itemName))
          return "ranged";
        if ((firearmsDb as any[]).some((w) => w.name === itemName))
          return "ranged";
        if ((armorDb as any[]).some((w) => w.name === itemName)) return "armor";
        return "miscellaneous";
      })(),
      cost: "-",
    } as any;
    if (!item) {
      if ((meleeDb as any[]).some((w) => w.name === itemName))
        item = { name: itemName, category: "hand-to-hand" } as any;
      else if ((rangedDb as any[]).some((w) => w.name === itemName))
        item = { name: itemName, category: "ranged" } as any;
      else if ((firearmsDb as any[]).some((w) => w.name === itemName))
        item = { name: itemName, category: "ranged" } as any;
      else if ((armorDb as any[]).some((w) => w.name === itemName))
        item = { name: itemName, category: "armor" } as any;
      else item = { name: itemName, category: "miscellaneous" } as any;
    }
    if (!item) return;
    // Se já está equipado (mesmo nome), não adiciona nem remove do cofre

    // Não bloqueia mais quando excede os espaços; apenas indica no UI
    // resolve Equipment completo e move do vault
    const equipmentObj =
      (sheet.vault || [])[idx] || resolveEquipmentByName(itemName);
    setSheet((prev) => ({
      ...prev,
      units: prev.units.map((u) => {
        if (u.id !== unitId) return u;
        // NOVA ARQUITETURA: trabalha diretamente com figure.equiped
        // Não precisa mais de chosenEquipment - usa apenas figure.equiped
        const prevFig = (u as any).figure;
        if (!prevFig || !equipmentObj) return u;

        const nextUnit: any = {
          ...u,
          figure: {
            ...prevFig,
            equiped: [...((prevFig.equiped || []) as any[]), equipmentObj],
          },
        };
        return nextUnit as EditableUnit;
      }),
      vault: (prev.vault || []).filter((_, i) => i !== idx),
    }));
  };

  const handleUnequipToStashFlat = (unitId: string, itemName: string) => {
    markDirty();
    setSheet((prev) => ({
      ...prev,
      units: prev.units.map((u) => {
        if (u.id !== unitId) return u;
        // NOVA ARQUITETURA: trabalha diretamente com figure.equiped
        const prevFig = (u as any).figure;
        if (!prevFig) return u;

        const equippedList: any[] = (prevFig.equiped || []) as any[];
        // Busca pelo nome base (sem modificador)
        const removedEquipment = equippedList.find(
          (e: any) =>
            String(e?.name || "").toLowerCase() === itemName.toLowerCase()
        );

        if (!removedEquipment) return u;

        const nextUnit: any = {
          ...u,
          figure: {
            ...prevFig,
            equiped: equippedList.filter((e: any) =>
              removedEquipment.id
                ? e.id !== removedEquipment.id
                : String(e.name).toLowerCase() !== itemName.toLowerCase()
            ),
          },
        };
        return nextUnit as EditableUnit;
      }),
      // Volta o objeto ao vault (agora que foi removido de figure.equiped)
      vault: ((prev as any).vault || []).concat(
        (() => {
          // removedEquipment já foi capturado antes do filtro
          // Mas como já foi filtrado, precisamos buscar na lista original
          const u = prev.units.find((x) => x.id === unitId) as any;
          const equippedList: any[] = (u?.figure?.equiped || []) as any[];
          const found = equippedList.find(
            (e: any) =>
              String(e?.name || "").toLowerCase() === itemName.toLowerCase()
          );
          return found ? [found] : [];
        })()
      ),
    }));
  };

  // === HABILIDADES (skills) DA FIGURA ===
  const handleAddSkillToUnit = (
    unitId: string,
    skill: { id?: string; name: string; description: string; type?: string }
  ) => {
    markDirty();
    setSheet((prev) => ({
      ...prev,
      units: prev.units.map((u) => {
        if (u.id !== unitId) return u;
        const figure = (u as any).figure;
        if (!figure) return u;
        const existing = figure.skills || [];
        // Evita adicionar habilidades duplicadas
        if (existing.some((s: any) => s.name === skill.name)) return u;
        // Adiciona a skill diretamente ao figure.skills
        const newSkill = {
          name: skill.name,
          description: skill.description,
          id: skill.id || crypto.randomUUID(), // Mantém id para remoção
          type: skill.type, // Mantém type se houver
        } as any;
        return {
          ...u,
          figure: {
            ...figure,
            skills: [...existing, newSkill],
          },
        } as any;
      }),
    }));
  };

  const handleRemoveSkillFromUnit = (unitId: string, skillName: string) => {
    markDirty();
    setSheet((prev) => ({
      ...prev,
      units: prev.units.map((u) =>
        u.id === unitId
          ? {
              ...u,
              figure: {
                ...(u as any).figure,
                skills: (((u as any).figure?.skills || []) as any[]).filter(
                  (s: any) => s.name !== skillName
                ),
              },
            }
          : u
      ),
    }));
  };

  // Adiciona uma tradição (em aligned0) à unidade
  const handleAddTraditionToUnit = (unitId: string, traditionName: string) => {
    setSheet((prev) => ({
      ...prev,
      units: prev.units.map((u) => {
        if (u.id !== unitId) return u;
        const current = u.spellAffinity?.aligned0 || [];
        if (current.includes(traditionName)) return u;
        const updated = {
          ...(u.spellAffinity || {}),
          aligned0: [...current, traditionName],
        };
        return { ...u, spellAffinity: updated };
      }),
    }));
  };

  // Adiciona uma lista de habilidades ao stats.skills da unidade
  const handleAddSkillCategoryToUnit = (unitId: string, category: string) => {
    const value = category.trim();
    if (!value) return;
    setSheet((prev) => ({
      ...prev,
      units: prev.units.map((u) => {
        if (u.id !== unitId) return u;
        const skillsArr = Array.isArray(u.stats.skills)
          ? [...(u.stats.skills as string[])]
          : [];
        if (skillsArr.includes(value)) return u;
        return { ...u, stats: { ...u.stats, skills: [...skillsArr, value] } };
      }),
    }));
  };

  // === MAGIAS (spells) DA FIGURA ===
  const handleAddSpellToUnit = (
    unitId: string,
    spell: {
      name: string;
      castingNumber: number;
      keywords: string[];
      effect: string;
    }
  ) => {
    setSheet((prev) => ({
      ...prev,
      units: prev.units.map((u) => {
        if (u.id !== unitId) return u;
        const figure = (u as any).figure;
        if (!figure) return u;
        const existing = figure.spells || [];
        if (existing.some((s: any) => s.name === spell.name)) return u;
        const instance = { id: crypto.randomUUID(), ...spell } as any;
        return {
          ...u,
          figure: {
            ...figure,
            spells: [...existing, instance],
          },
        } as any;
      }),
    }));
  };

  const handleRemoveSpellFromUnit = (unitId: string, spellId: string) => {
    setSheet((prev) => ({
      ...prev,
      units: prev.units.map((u) =>
        u.id === unitId
          ? {
              ...u,
              figure: {
                ...(u as any).figure,
                spells: (((u as any).figure?.spells || []) as any[]).filter(
                  (s: any) => s.id !== spellId
                ),
              },
            }
          : u
      ),
    }));
  };

  const handleUpdateSpellCastingNumber = (
    unitId: string,
    spellId: string,
    newCastingNumber: number
  ) => {
    setSheet((prev) => ({
      ...prev,
      units: prev.units.map((u) => {
        if (u.id !== unitId) return u;
        const figure = (u as any).figure;
        if (!figure) return u;
        const updated = (figure.spells || []).map((s: any) =>
          s.id === spellId ? { ...s, castingNumber: newCastingNumber } : s
        );
        return {
          ...u,
          figure: {
            ...figure,
            spells: updated,
          },
        } as any;
      }),
    }));
  };

  // === EXPERIÊNCIA (XP) DA FIGURA ===
  const handleUpdateFigureXp = (unitId: string, newXp: number) => {
    // Limite depende do papel: Líder/Herói = 90, demais = 30
    setSheet((prev) => ({
      ...prev,
      units: prev.units.map((u) => {
        if (u.id !== unitId) return u;
        const fig = (u as any).figure || {};
        const roleStr = (fig?.role || "").toString().toLowerCase();
        const isHero =
          roleStr.includes("líder") ||
          roleStr.includes("lider") ||
          roleStr.includes("her");
        const limit = isHero ? 90 : 30;
        const xpVal = Math.max(
          0,
          Math.min(limit, Number.isFinite(newXp) ? newXp : 0)
        );
        const nextFigure = { ...fig, xp: xpVal };
        try {
          // eslint-disable-next-line no-console
          console.log(
            "[Figure Updated]",
            JSON.parse(JSON.stringify(nextFigure))
          );
        } catch {}
        return { ...u, figure: nextFigure } as any;
      }),
    }));
  };

  const handleUpdateNarrativeName = (unitId: string, newName: string) => {
    setSheet((prev) => ({
      ...prev,
      units: prev.units.map((u) => {
        if (u.id !== unitId) return u;
        const fig = (u as any).figure || {};
        const nextFigure = { ...fig, narrativeName: newName };
        try {
          // eslint-disable-next-line no-console
          console.log(
            "[Figure Updated]",
            JSON.parse(JSON.stringify(nextFigure))
          );
        } catch {}
        return { ...u, figure: nextFigure } as any;
      }),
    }));
  };

  // === HABILIDADES ESPECIAIS (bênçãos/mutações/marcas) ===
  const handleAddSpecialAbilityToUnit = (
    unitId: string,
    ability: {
      id: string;
      category: "nurgleBlessing" | "mutation" | "sacredMark";
      name: string;
      description?: string;
      cost?: string;
    }
  ) => {
    setSheet((prev) => ({
      ...prev,
      units: prev.units.map((u) => {
        if (u.id !== unitId) return u;
        const fig = (u as any).figure || {};
        const key =
          ability.category === "nurgleBlessing"
            ? "nurgleBlessings"
            : ability.category === "mutation"
            ? "mutations"
            : "sacredMarks";
        const nextList = [
          ...(((fig as any)[key] || []) as any[]),
          {
            id: ability.id,
            name: ability.name,
            description: ability.description,
            cost: ability.cost,
          },
        ];
        const nextFigure = { ...fig, [key]: nextList };
        try {
          // eslint-disable-next-line no-console
          console.log(
            "[Figure Updated]",
            JSON.parse(JSON.stringify(nextFigure))
          );
        } catch {}
        return { ...u, figure: nextFigure } as any;
      }),
    }));
  };

  const handleRemoveSpecialAbilityFromUnit = (
    unitId: string,
    category: "nurgleBlessing" | "mutation" | "sacredMark",
    id: string
  ) => {
    setSheet((prev) => ({
      ...prev,
      units: prev.units.map((u) => {
        if (u.id !== unitId) return u;
        const fig = (u as any).figure || {};
        const key =
          category === "nurgleBlessing"
            ? "nurgleBlessings"
            : category === "mutation"
            ? "mutations"
            : "sacredMarks";
        const filtered = (((fig as any)[key] || []) as any[]).filter(
          (x: any) => x.id !== id
        );
        const nextFigure = { ...fig, [key]: filtered };
        try {
          // eslint-disable-next-line no-console
          console.log(
            "[Figure Updated]",
            JSON.parse(JSON.stringify(nextFigure))
          );
        } catch {}
        return { ...u, figure: nextFigure } as any;
      }),
    }));
  };

  const getGlobalItemsByType = (type: string, unit?: EditableUnit) => {
    if (type === "Arma Corpo a Corpo") {
      return (meleeDb as any[])
        .filter((w) => String(w.type || "").includes("Corpo"))
        .map((w) => ({ name: w.name, cost: w.cost || "-" }));
    }
    if (type === "Arma a Distância") {
      return (rangedDb as any[])
        .filter((w) => String(w.type || "").includes("Distância"))
        .map((w) => ({ name: w.name, cost: w.cost || "-" }));
    }
    if (type === "Arma de Fogo") {
      return (firearmsDb as any[]).map((w) => ({
        name: w.name,
        cost: w.purchaseCost || w.sellCost || "-",
      }));
    }
    if (unit) {
      const eq: any = unit.equipment || {};
      if (type === "Armadura") {
        return (eq.armor || eq.armour || []).map((i: any) => ({
          name: i.name,
          cost: i.cost,
        }));
      }
      if (type === "Acessórios") {
        const misc = eq.miscellaneous || eq.accessories || eq.acessories || [];
        return misc.map((i: any) => ({ name: i.name, cost: i.cost }));
      }
    }
    return [];
  };

  const handleFigureStatModifierChange = (
    unitId: string,
    stat: keyof NonNullable<EditableUnit["figure"]>["baseStats"],
    category: "injury" | "advancement" | "misc",
    value: number
  ) => {
    setSheet((prev) => ({
      ...prev,
      units: prev.units.map((u) => {
        if (u.id !== unitId) return u;
        const fig = u.figure as any;
        if (!fig) return u;
        const targetKey =
          category === "injury"
            ? "injuryStatsModifiers"
            : category === "advancement"
            ? "advancementsStatsModifiers"
            : "miscStatsModifiers";
        const nextFigure = {
          ...fig,
          [targetKey]: {
            ...fig[targetKey],
            [stat]: value,
          },
        };
        try {
          // Loga a figura completa após a alteração
          // eslint-disable-next-line no-console
          console.log(
            "[Figure Updated]",
            JSON.parse(JSON.stringify(nextFigure))
          );
        } catch (e) {
          // eslint-disable-next-line no-console
          console.log("[Figure Updated]", nextFigure);
        }
        return { ...u, figure: nextFigure } as EditableUnit;
      }),
    }));
  };

  const removeUnit = (id: string) => {
    // Remove a figura retornando seus equipamentos para o cofre (vault)
    setSheet((s) => {
      const unit = s.units.find((u) => u.id === id) as any;
      const figEquip: any[] = (unit?.figure?.equiped || []) as any[];
      const nextVault = [...((s.vault || []) as any[]), ...figEquip];
      return {
        ...s,
        vault: nextVault,
        units: s.units.filter((u) => u.id !== id),
      } as any;
    });
  };

  const killUnit = (id: string) => {
    // Remove a figura e descarta os equipamentos
    setSheet((s) => ({ ...s, units: s.units.filter((u) => u.id !== id) }));
  };

  const promoteUnitToHero = (id: string) => {
    // Transforma uma unidade sem role em Herói (atualiza unit.role e figure.role)
    setSheet((s) => ({
      ...s,
      units: s.units.map((u) => {
        if (u.id !== id) return u;
        const nextFig = { ...(u as any).figure, role: "Herói" } as any;
        return { ...u, role: "Herói", figure: nextFig } as any;
      }),
    }));
  };

  const promoteHeroToLeader = (id: string) => {
    // Promove um Herói para Líder: muda role e adiciona a habilidade Líder
    markDirty();
    setSheet((s) => {
      return {
        ...s,
        units: s.units.map((u) => {
          if (u.id !== id) return u;
          const figure = (u as any).figure;
          if (!figure) return u;

          // Cria a habilidade Líder
          const leaderSkill = {
            id: "líder",
            name: "Líder",
            description:
              "Essa figura pode ativar até 3 outras figuras a 8cm de distância dela. As figuras agem imediatamente após essa figura em qualquer ordem.",
            type: "Especial",
          };

          // Verifica se já tem a habilidade Líder nas skills
          const hasLeaderSkill =
            (figure.skills || []).some(
              (s: any) => s?.name === "Líder" || s?.id === "líder"
            ) || false;

          // Atualiza o figure: muda role e adiciona skill se necessário
          const updatedSkills = hasLeaderSkill
            ? figure.skills || []
            : [...(figure.skills || []), leaderSkill];

          // Adiciona a habilidade Líder em specialRules
          const leaderSpecialRule = {
            name: "Líder",
            description:
              "Essa figura pode ativar até 3 outras figuras a 8cm de distância dela. As figuras agem imediatamente após essa figura em qualquer ordem.",
          };

          // Verifica se já tem a regra especial Líder
          const hasLeaderInSpecialRules =
            (figure.specialRules || []).some((r: any) => r?.name === "Líder") ||
            false;

          // Atualiza specialRules adicionando Líder se não tiver
          const updatedSpecialRules = hasLeaderInSpecialRules
            ? figure.specialRules || []
            : [...(figure.specialRules || []), leaderSpecialRule];

          const nextFig = {
            ...figure,
            role: "Líder",
            skills: updatedSkills,
            specialRules: updatedSpecialRules,
          } as any;

          return {
            ...u,
            role: "Líder",
            figure: nextFig,
          } as any;
        }),
      };
    });
  };

  const updateUnit = (id: string, patch: Partial<EditableUnit>) => {
    setSheet((s) => ({
      ...s,
      units: s.units.map((u) => (u.id === id ? { ...u, ...patch } : u)),
    }));
  };

  const exportJson = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(sheet, null, 2));
    const a = document.createElement("a");
    a.href = dataStr;
    a.download = `${sheet.name || "bando"}.json`;
    a.click();
  };

  const importFromFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        setSheet(parsed);
      } catch {}
    };
    reader.readAsText(file);
  };

  // Filtros disponíveis para futuras seções (não usados no layout atual)
  // const leader = useMemo(() => sheet.units.find((u) => u.role === "Líder"), [sheet.units]);
  // const heroes = useMemo(() => sheet.units.filter((u) => u.role === "Herói"), [sheet.units]);
  // const others = useMemo(() => sheet.units.filter((u) => !u.role), [sheet.units]);

  // Helpers para adicionar/remover escolhas

  const listAllEquipmentOptions = (unit: EditableUnit) => {
    const eq = unit.equipment || {};
    const entries: Array<{ name: string; category: string; cost?: string }> =
      [];
    (
      Object.keys(eq) as Array<keyof NonNullable<EditableUnit["equipment"]>>
    ).forEach((cat) => {
      const arr = (eq as any)[cat] as
        | Array<{ name: string; cost: string }>
        | undefined;
      if (arr && Array.isArray(arr)) {
        arr.forEach((item) =>
          entries.push({
            name: item.name,
            category: String(cat),
            cost: item.cost,
          })
        );
      }
    });
    return entries;
  };

  const addEquipmentToUnit = (
    unit: EditableUnit,
    itemName: string,
    targetSubsection?: string
  ) => {
    const all = listAllEquipmentOptions(unit);
    const item = all.find((i) => i.name === itemName);
    if (!item) return;
    const current = unit.chosenEquipment || [];
    // Verifica duplicata exata
    if (
      current.some((i) => i.name === item.name && i.category === item.category)
    )
      return;
    // Se targetSubsection foi especificado, verifica se já existe item nessa subseção (exceto Acessórios)
    if (targetSubsection && targetSubsection !== "Acessórios") {
      const existingInSubsection = current.find(
        (i) => classifyEquipmentSubsection(i) === targetSubsection
      );
      if (existingInSubsection) {
        // Substitui o item existente na subseção
        const filtered = current.filter(
          (i) => classifyEquipmentSubsection(i) !== targetSubsection
        );
        updateUnit(unit.id, { chosenEquipment: [...filtered, item] });
        return;
      }
    }
    updateUnit(unit.id, { chosenEquipment: [...current, item] });
  };

  // Handlers para RosterUnitCard
  const handleStatMiscChange = (
    unitId: string,
    attribute: keyof RosterUnitStats,
    value: number
  ) => {
    const unit = sheet.units.find((u) => u.id === unitId);
    if (!unit) return;
    const currentBreakdown = unit.statBreakdown || {};
    updateUnit(unitId, {
      statBreakdown: {
        ...currentBreakdown,
        [attribute]: {
          ...(currentBreakdown[attribute] || {
            base: 0,
            advancement: 0,
            injury: 0,
            misc: 0,
          }),
          misc: value,
        },
      },
    });
  };

  const isShieldName = (name: string) => {
    const n = name.toLowerCase();
    return (
      n.includes("escudo") ||
      n.includes("shield") ||
      n.includes("bróquel") ||
      n.includes("broquel") ||
      n.includes("pavise") ||
      n.includes("paves")
    );
  };

  const isHelmetName = (name: string) => {
    const n = name.toLowerCase();
    return n.includes("elmo") || n.includes("helmet") || n.includes("capacete");
  };

  // Resolve um item pelo nome nos catálogos e retorna um Equipment completo
  const resolveEquipmentByName = (name: string): FullEquipment | null => {
    const normalize = (s: any) =>
      String(s || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}+/gu, "")
        .trim();
    const target = normalize(name);
    const catalogs: any[][] = [
      meleeDb as any[],
      rangedDb as any[],
      firearmsDb as any[],
      armorDb as any[],
      accessoriesDb as any[],
      remediesPoisonsDb as any[],
    ];
    let found: any | null = null;
    let typeStr = "";
    for (const list of catalogs) {
      const f = list.find((x: any) => normalize(x?.name) === target);
      if (f) {
        found = f;
        // tenta inferir tipo
        if (list === (meleeDb as any)) typeStr = String(f.type || "Melee");
        else if (list === (rangedDb as any) || list === (firearmsDb as any))
          typeStr = String(f.type || "Ranged");
        else if (list === (armorDb as any)) typeStr = String(f.type || "Armor");
        else typeStr = String(f.type || "Misc");
        break;
      }
    }
    if (!found) return null;
    try {
      // eslint-disable-next-line no-console
      console.log("[Catalog Equipment]", JSON.parse(JSON.stringify(found)));
    } catch {
      // eslint-disable-next-line no-console
      console.log("[Catalog Equipment]", found);
    }
    const toNumber = (v: any): number | undefined => {
      if (typeof v === "number") return v;
      const p = parseInt(String(v), 10);
      return Number.isFinite(p) ? p : undefined;
    };
    const toRules = (arr: any): { label: string; value: string }[] => {
      if (!Array.isArray(arr)) return [];
      return arr
        .map((r) => {
          if (r && typeof r === "object" && (r.label || r.value))
            return {
              label: String(r.label || r.name || ""),
              value: String(r.value || r.effect || ""),
            };
          return null;
        })
        .filter(Boolean) as any[];
    };
    const eq: FullEquipment = {
      // Sempre cria um id único por instância
      id: crypto.randomUUID(),
      name: String(found.name),
      type: String(typeStr || found.type || "Item"),
      damageModifier: toNumber(found.damageModifier),
      purchaseCost: String(
        found.purchaseCost || found.sellCost || found.cost || "-"
      ),
      armorBonus: toNumber(found.armorBonus) || 0,
      movePenalty: toNumber(found.movePenalty),
      slots:
        toNumber(found.slots) ||
        toNumber(found.spaces) ||
        toNumber(found.equipmentSpaces) ||
        1,
      requirements: found.requirements ?? null,
      specialRules: toRules(found.specialRules),
      modifier: {
        name: String(found.strength ? "Força" : found.modifier?.name || ""),
        effect: String(found.effect || found.modifier?.effect || ""),
      },
    };
    // Preserva id do catálogo (quando existir) para referência futura
    (eq as any).templateId = found.id || null;
    return eq;
  };

  // === AVANÇOS ===
  const applyAdvancementDelta = (
    unit: EditableUnit,
    key: keyof NonNullable<EditableUnit["statBreakdown"]>,
    delta: number
  ): EditableUnit => {
    const current = unit.statBreakdown || {};
    const prev = (current as any)[key] || {
      base: 0,
      advancement: 0,
      injury: 0,
      misc: 0,
    };
    const next = { ...prev, advancement: (prev.advancement || 0) + delta };
    return { ...unit, statBreakdown: { ...current, [key]: next } };
  };

  const handleAddAdvancementToUnit = (unitId: string, adv: string) => {
    setSheet((prev) => ({
      ...prev,
      units: prev.units.map((u) => {
        if (u.id !== unitId) return u;
        const figure = (u as any).figure;
        if (!figure) return u;
        const list = figure.advancements || [];
        const newAdvancement = {
          name: adv,
          effect: "", // Pode ser preenchido depois se necessário
        } as any;
        let updatedUnit = {
          ...u,
          figure: {
            ...figure,
            advancements: [...list, newAdvancement],
          },
        } as any;
        const norm = adv.toLowerCase();
        if (norm.includes("ímpeto"))
          updatedUnit = applyAdvancementDelta(updatedUnit, "fight", 1);
        else if (norm.includes("precis"))
          updatedUnit = applyAdvancementDelta(updatedUnit, "shoot", 1);
        else if (norm.includes("armadura"))
          updatedUnit = applyAdvancementDelta(updatedUnit, "armour", 1);
        else if (norm.includes("vigor"))
          updatedUnit = applyAdvancementDelta(updatedUnit, "health", 2);
        else if (norm.includes("agilidade"))
          updatedUnit = applyAdvancementDelta(updatedUnit, "move", 2);
        else if (norm.includes("vontade"))
          updatedUnit = applyAdvancementDelta(updatedUnit, "vontade", 1);
        else if (norm.includes("força"))
          updatedUnit = applyAdvancementDelta(updatedUnit, "strength", 1);
        // O Moleque Tem Talento! -> vira Herói (se já não for Líder)
        if (norm.includes("moleque") && norm.includes("talento")) {
          const currentRole = String(
            (updatedUnit.figure as any)?.role || ""
          ).toLowerCase();
          if (currentRole !== "líder" && currentRole !== "lider") {
            updatedUnit = {
              ...updatedUnit,
              figure: {
                ...updatedUnit.figure,
                role: "Herói" as any,
              },
            };
          }
        }
        return updatedUnit;
      }),
    }));
  };

  const handleRemoveAdvancementFromUnit = (
    unitId: string,
    adv: string,
    index?: number
  ) => {
    setSheet((prev) => ({
      ...prev,
      units: prev.units.map((u) => {
        if (u.id !== unitId) return u;
        const figure = (u as any).figure;
        if (!figure) return u;
        const list = [...(figure.advancements || [])];
        const idx =
          index !== undefined
            ? index
            : list.findIndex((x: any) => x.name === adv || x === adv);
        if (idx >= 0) list.splice(idx, 1);
        let updatedUnit = {
          ...u,
          figure: {
            ...figure,
            advancements: list,
          },
        } as any;
        const norm = adv.toLowerCase();
        if (norm.includes("ímpeto"))
          updatedUnit = applyAdvancementDelta(updatedUnit, "fight", -1);
        else if (norm.includes("precis"))
          updatedUnit = applyAdvancementDelta(updatedUnit, "shoot", -1);
        else if (norm.includes("armadura"))
          updatedUnit = applyAdvancementDelta(updatedUnit, "armour", -1);
        else if (norm.includes("vigor"))
          updatedUnit = applyAdvancementDelta(updatedUnit, "health", -2);
        else if (norm.includes("agilidade"))
          updatedUnit = applyAdvancementDelta(updatedUnit, "move", -2);
        else if (norm.includes("vontade"))
          updatedUnit = applyAdvancementDelta(updatedUnit, "vontade", -1);
        else if (norm.includes("força"))
          updatedUnit = applyAdvancementDelta(updatedUnit, "strength", -1);
        return updatedUnit;
      }),
    }));
  };

  // === INJURIES ===
  const handleAddInjuryToUnit = (unitId: string, injury: string) => {
    setSheet((prev) => ({
      ...prev,
      units: prev.units.map((u) => {
        if (u.id !== unitId) return u;
        const figure = (u as any).figure;
        if (!figure) return u;
        const list = figure.injuries || [];
        const newInjury = {
          name: injury,
          description: "", // Pode ser preenchido depois se necessário
        } as any;
        let updatedUnit = {
          ...u,
          figure: {
            ...figure,
            injuries: [...list, newInjury],
          },
        } as any;
        const norm = injury.toLowerCase();
        // Penalidades numéricas simples
        if (
          norm.includes("perna") &&
          norm.includes("-2") &&
          norm.includes("mov")
        ) {
          updatedUnit = {
            ...updatedUnit,
            statBreakdown: {
              ...(updatedUnit.statBreakdown || {}),
              move: {
                base: 0,
                advancement: updatedUnit.statBreakdown?.move?.advancement || 0,
                injury: (updatedUnit.statBreakdown?.move?.injury || 0) - 2,
                misc: updatedUnit.statBreakdown?.move?.misc || 0,
              },
            },
          } as any;
        } else if (norm.includes("tórax") || norm.includes("torax")) {
          updatedUnit = {
            ...updatedUnit,
            statBreakdown: {
              ...(updatedUnit.statBreakdown || {}),
              health: {
                base: 0,
                advancement:
                  updatedUnit.statBreakdown?.health?.advancement || 0,
                injury: (updatedUnit.statBreakdown?.health?.injury || 0) - 2,
                misc: updatedUnit.statBreakdown?.health?.misc || 0,
              },
            },
          } as any;
        } else if (norm.includes("cego") || norm.includes("olho")) {
          updatedUnit = {
            ...updatedUnit,
            statBreakdown: {
              ...(updatedUnit.statBreakdown || {}),
              shoot: {
                base: 0,
                advancement: updatedUnit.statBreakdown?.shoot?.advancement || 0,
                injury: (updatedUnit.statBreakdown?.shoot?.injury || 0) - 2,
                misc: updatedUnit.statBreakdown?.shoot?.misc || 0,
              },
            },
          } as any;
        } else if (norm.includes("nervosa") || norm.includes("vontade")) {
          updatedUnit = {
            ...updatedUnit,
            statBreakdown: {
              ...(updatedUnit.statBreakdown || {}),
              vontade: {
                base: 0,
                advancement:
                  updatedUnit.statBreakdown?.vontade?.advancement || 0,
                injury: (updatedUnit.statBreakdown?.vontade?.injury || 0) - 1,
                misc: updatedUnit.statBreakdown?.vontade?.misc || 0,
              },
            },
          } as any;
        } else if (norm.includes("mão") || norm.includes("mao")) {
          updatedUnit = {
            ...updatedUnit,
            statBreakdown: {
              ...(updatedUnit.statBreakdown || {}),
              fight: {
                base: 0,
                advancement: updatedUnit.statBreakdown?.fight?.advancement || 0,
                injury: (updatedUnit.statBreakdown?.fight?.injury || 0) - 1,
                misc: updatedUnit.statBreakdown?.fight?.misc || 0,
              },
            },
          } as any;
        }
        return updatedUnit;
      }),
    }));
  };

  const handleRemoveInjuryFromUnit = (
    unitId: string,
    injury: string,
    index?: number
  ) => {
    setSheet((prev) => ({
      ...prev,
      units: prev.units.map((u) => {
        if (u.id !== unitId) return u;
        const figure = (u as any).figure;
        if (!figure) return u;
        const list = [...(figure.injuries || [])];
        const idx =
          index !== undefined
            ? index
            : list.findIndex((x: any) => x.name === injury || x === injury);
        if (idx >= 0) list.splice(idx, 1);
        let updatedUnit = {
          ...u,
          figure: {
            ...figure,
            injuries: list,
          },
        } as any;
        const norm = injury.toLowerCase();
        if (
          norm.includes("perna") &&
          norm.includes("-2") &&
          norm.includes("mov")
        ) {
          updatedUnit = applyAdvancementDelta(updatedUnit, "move", +2); // reverte a penalidade usando channel de advancement
        } else if (norm.includes("tórax") || norm.includes("torax")) {
          updatedUnit = applyAdvancementDelta(updatedUnit, "health", +2);
        } else if (norm.includes("cego") || norm.includes("olho")) {
          updatedUnit = applyAdvancementDelta(updatedUnit, "shoot", +2);
        } else if (norm.includes("nervosa") || norm.includes("vontade")) {
          updatedUnit = applyAdvancementDelta(updatedUnit, "vontade", +1);
        } else if (norm.includes("mão") || norm.includes("mao")) {
          updatedUnit = applyAdvancementDelta(updatedUnit, "fight", +1);
        }
        return updatedUnit;
      }),
    }));
  };

  // Classificação em sub-seções solicitadas
  const classifyEquipmentSubsection = (item: {
    name: string;
    category: string;
    cost?: string;
  }) => {
    const n = (item.name || "").toLowerCase();
    const c = (item.category || "").toLowerCase();
    // Escudo
    if (c === "armor" && (n.includes("escudo") || n.includes("shield")))
      return "Escudo";
    // Elmo
    if (
      c === "armor" &&
      (n.includes("elmo") || n.includes("helmet") || n.includes("capacete"))
    )
      return "Elmo";
    // Adaga grátis
    if (
      n.includes("adaga") &&
      (item.cost || "").toLowerCase().includes("grátis")
    )
      return "Adaga grátis";
    // Armadura (exclui escudos e elmos)
    if (c === "armor") return "Armadura";
    // Acessórios
    if (c === "miscellaneous") return "Acessórios";
    // Armas à distância
    if (c === "ranged") {
      // distribuir entre 1 e 2 de forma estável pelo nome
      return n.charCodeAt(0) % 2 === 0
        ? "Arma a Distância 1"
        : "Arma a Distância 2";
    }
    // Armas corpo a corpo
    if (c === "hand-to-hand") {
      return n.charCodeAt(0) % 2 === 0
        ? "Arma Corpo a Corpo 1"
        : "Arma Corpo a Corpo 2";
    }
    return "Acessórios";
  };

  // Mapa facções e seleção
  const allFactions = useMemo(
    () => [
      {
        key: "mercenaries",
        label: "Mercenários",
        data: mercenariesData as any[],
      },
      {
        key: "sisters-of-sigmar",
        label: "Irmãs de Sigmar",
        data: sistersData as any[],
      },
      { key: "skaven", label: "Skaven", data: skavenData as any[] },
      {
        key: "beastman-raiders",
        label: "Saqueadores Homem-Fera",
        data: beastmenData as any[],
      },
      {
        key: "dwarf-treasure-hunters",
        label: "Caçadores de Tesouro Anões",
        data: dwarfTreasureHuntersData as any[],
      },
      {
        key: "cult-of-the-possessed",
        label: "Culto dos Possuídos",
        data: cultPossessedData as any[],
      },
      {
        key: "vampire-courts",
        label: "Cortes Vampíricas",
        data: vampireCourtsData as any[],
      },
      {
        key: "witch-hunters",
        label: "Caçadores de Bruxas",
        data: witchHuntersData as any[],
      },
      { key: "lizardmen", label: "Reptilianos", data: lizardmenData as any[] },
      { key: "orc-mob", label: "Horda Orc", data: orcMobData as any[] },
      { key: "goblins", label: "Goblins", data: goblinsData as any[] },
      {
        key: "sons-of-hashut",
        label: "Filhos de Hashut",
        data: sonsOfHashutData as any[],
      },
      {
        key: "carnival-of-chaos",
        label: "Circo do Caos",
        data: carnivalChaosData as any[],
      },
      {
        key: "dark-elf-corsairs",
        label: "Corsários Druchii",
        data: darkElfCorsairsData as any[],
      },
    ],
    []
  );

  const selectedFaction = useMemo(
    () => allFactions.find((f) => f.key === (sheet.faction || "")),
    [allFactions, sheet.faction]
  );

  // Rótulo extenso da facção na ficha
  const factionLabel = useMemo(() => {
    const found = allFactions.find((f) => f.key === (sheet.faction || ""));
    return found?.label || sheet.faction || "";
  }, [allFactions, sheet.faction]);

  // Elemento do modal de adicionar equipamento (evita IIFE dentro do JSX)
  const equipmentModalEl = (() => {
    if (!equipmentModal.open || !equipmentModal.unitId) return null;
    const unit = sheet.units.find((x) => x.id === equipmentModal.unitId);
    if (!unit) return null;
    const eq = (unit.equipment || {}) as any;
    const eqNormalized: any = { ...eq };
    if (eq.acessories && !eq.miscellaneous)
      eqNormalized.miscellaneous = eq.acessories;
    if (eq.accessories && !eq.miscellaneous)
      eqNormalized.miscellaneous = eq.accessories;

    return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
        <div className="bg-[#1a1a1a] border border-gray-700 rounded w-full max-w-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-white font-semibold">
              Adicionar Equipamento
            </div>
            <button
              className="text-gray-300 hover:text-white"
              onClick={() =>
                setEquipmentModal({
                  open: false,
                  unitId: undefined,
                  targetSubsection: undefined,
                })
              }
            >
              Fechar
            </button>
          </div>
          <div className="mb-3">
            <label className="text-xs text-gray-400 block mb-1">Tipo</label>
            {(() => {
              const slot = (
                equipmentModal.targetSubsection || ""
              ).toLowerCase();
              const isMelee = slot.startsWith("arma-corpo-a-corpo");
              const isRanged = slot.startsWith("arma-distancia");
              const isAcc = slot === "acessorios";
              const isArmorSlot =
                slot === "armadura" || slot === "elmo" || slot === "escudo";
              if (isMelee || isRanged || isAcc || isArmorSlot) {
                return (
                  <input
                    className="bg-[#1f1f1f] border border-gray-600 rounded px-3 py-2 text-white w-full opacity-70"
                    value={
                      isMelee
                        ? "Arma Corpo a Corpo"
                        : isRanged
                        ? "Arma a Distância / Fogo"
                        : isAcc
                        ? "Acessórios / Remédios e Venenos"
                        : "Armadura"
                    }
                    readOnly
                  />
                );
              }
              return (
                <select
                  className="bg-[#1f1f1f] border border-gray-600 rounded px-3 py-2 text-white w-full"
                  value={equipmentCategory || EQUIP_TYPES[0]}
                  onChange={(e) => {
                    setEquipmentCategory(e.target.value);
                    setSelectedEquipmentName("");
                  }}
                >
                  {EQUIP_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              );
            })()}
          </div>
          <div className="mb-3">
            <label className="text-xs text-gray-400 block mb-1">Item</label>
            {(() => {
              const slot = (
                equipmentModal.targetSubsection || ""
              ).toLowerCase();
              let items: Array<{ name: string; cost?: string }> = [];
              if (slot.startsWith("arma-corpo-a-corpo")) {
                items = getGlobalItemsByType("Arma Corpo a Corpo", unit) as any;
              } else if (slot === "adaga-gratis") {
                items = (
                  getGlobalItemsByType("Arma Corpo a Corpo", unit) as any[]
                ).filter(
                  (i) =>
                    String(i.name).toLowerCase().includes("adaga") ||
                    String(i.name).toLowerCase().includes("dagger")
                );
              } else if (slot.startsWith("arma-distancia")) {
                const r = getGlobalItemsByType("Arma a Distância", unit) as any;
                const f = getGlobalItemsByType("Arma de Fogo", unit) as any;
                items = [...r, ...f];
              } else if (slot === "acessorios") {
                const a = getGlobalItemsByType("Acessórios", unit) as any;
                const rv = getGlobalItemsByType(
                  "Remédios e Venenos",
                  unit
                ) as any;
                items = [...a, ...rv];
              } else if (
                slot === "elmo" ||
                slot === "armadura" ||
                slot === "escudo"
              ) {
                const armorItems = getGlobalItemsByType(
                  "Armadura",
                  unit
                ) as any[];
                if (slot === "elmo") {
                  items = armorItems.filter((i) => isHelmetName(i.name));
                } else if (slot === "escudo") {
                  items = armorItems.filter((i) => isShieldName(i.name));
                } else {
                  items = armorItems.filter(
                    (i) => !isShieldName(i.name) && !isHelmetName(i.name)
                  );
                }
              } else {
                items = getGlobalItemsByType(
                  equipmentCategory || EQUIP_TYPES[0],
                  unit
                ) as any;
              }
              return (
                <select
                  className="bg-[#1f1f1f] border border-gray-600 rounded px-3 py-2 text-white w-full"
                  value={selectedEquipmentName}
                  onChange={(e) => setSelectedEquipmentName(e.target.value)}
                  disabled={items.length === 0}
                >
                  <option value="">Selecionar item…</option>
                  {items.map((item) => (
                    <option key={item.name} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              );
            })()}
          </div>
          <div className="border border-gray-700 rounded p-3 mb-3 bg-[#171717]">
            {(() => {
              const type = equipmentCategory || EQUIP_TYPES[0];
              const list = getGlobalItemsByType(type, unit) as Array<{
                name: string;
                cost?: string;
              }>;
              const selected = list.find(
                (i) => i.name === selectedEquipmentName
              );
              if (!selected) {
                return (
                  <div className="text-xs text-gray-400 text-center">
                    Selecione um item para visualizar
                  </div>
                );
              }

              let data: any = null;
              if (type === "Arma de Fogo") {
                data = (firearmsDb as any[]).find(
                  (w) => w.name === selected.name
                );
              } else if (type === "Arma Corpo a Corpo") {
                data = (meleeDb as any[]).find((w) => w.name === selected.name);
              } else if (type === "Arma a Distância") {
                data = (rangedDb as any[]).find(
                  (w) => w.name === selected.name
                );
              }

              if (!data) {
                return (
                  <div className="flex items-center justify-between">
                    <div className="text-gray-200">
                      <div className="text-sm font-semibold">
                        {selected.name}
                      </div>
                      {selected.cost && (
                        <div className="text-xs text-gray-400">
                          {selected.cost}
                        </div>
                      )}
                    </div>
                    <button
                      className="px-3 py-1 rounded bg-blue-900/40 border border-blue-500/40 text-white text-xs hover:bg-blue-900/60 disabled:opacity-50"
                      disabled={!selectedEquipmentName}
                      onClick={() => {
                        if (selectedEquipmentName) {
                          addEquipmentToUnit(
                            unit,
                            selectedEquipmentName,
                            equipmentModal.targetSubsection
                          );
                          setEquipmentModal({ open: false, unitId: undefined });
                        }
                      }}
                    >
                      Confirmar
                    </button>
                  </div>
                );
              }

              const cardProps = {
                name: data.name || selected.name,
                type: data.type || type,
                damageModifier: data.damageModifier || null,
                maxRange:
                  data.maxRange ||
                  (typeof data.maxRange === "number"
                    ? String(data.maxRange)
                    : null),
                exclusive: data.exclusive || null,
                cost: data.purchaseCost || data.cost || null,
                spaces: data.slots || null,
                strength: data.strength || null,
                armorBonus: data.armorBonus || null,
                movePenalty: data.movePenalty || null,
                requirements: data.requirements || null,
                rarity: data.rarity ?? null,
                availability: data.availability || null,
                effect: data.effect || null,
                specialRules: data.specialRules || null,
              } as any;

              return (
                <div>
                  <EquipmentCard {...cardProps} />
                  <div className="flex justify-end">
                    <button
                      className="px-3 py-1 rounded bg-blue-900/40 border border-blue-500/40 text-white text-xs hover:bg-blue-900/60 disabled:opacity-50"
                      disabled={!selectedEquipmentName}
                      onClick={() => {
                        if (selectedEquipmentName) {
                          addEquipmentToUnit(
                            unit,
                            selectedEquipmentName,
                            equipmentModal.targetSubsection
                          );
                          setEquipmentModal({ open: false, unitId: undefined });
                        }
                      }}
                    >
                      Confirmar
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </div>
    );
  })();

  // Mostra loading enquanto authContext está carregando
  if (loading) {
    return (
      <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
        <div className="py-4">
          <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
            <MobileSection>
              <PageTitle>Carregando usuário…</PageTitle>
              <div className="flex items-center justify-center py-12">
                <div className="h-10 w-10 rounded-full border-4 border-green-500/40 border-t-green-400 animate-spin" />
              </div>
            </MobileSection>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
        <div className="py-4">
          <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
            <MobileSection>
              <PageTitle>Carregando bando…</PageTitle>
              <div className="flex items-center justify-center py-12">
                <div className="h-10 w-10 rounded-full border-4 border-green-500/40 border-t-green-400 animate-spin" />
              </div>
            </MobileSection>
          </div>
        </div>
      </div>
    );
  }

  if (notFound) {
    return <WarbandNotFoundPage />;
  }

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <MobileSection>
            <PageTitle>Ficha do Bando</PageTitle>

            {/* Exportar PDF (printer-friendly) */}
            {(() => {
              const handleExportPdf = () => {
                try {
                  const safe = (v: any): string =>
                    v === null || v === undefined ? "" : String(v);

                  const resolveModifier = (e: any): any => {
                    if (!e?.modifier || !e?.modifier?.name) return null;
                    const modNameLc = String(e.modifier.name).toLowerCase();
                    const allMods: any[] = [
                      ...(meleeMods as any[]),
                      ...(rangedMods as any[]),
                      ...(firearmsMods as any[]),
                    ];
                    return (
                      allMods.find(
                        (m) => String(m.name).toLowerCase() === modNameLc
                      ) || e.modifier
                    );
                  };

                  const buildEquipmentName = (e: any): string => {
                    const baseName = safe(e?.name);
                    if (e?.modifier?.name) {
                      return `${baseName} (${safe(e.modifier.name)})`;
                    }
                    return baseName;
                  };

                  const buildEquipmentCards = (equiped: any[]): string => {
                    if (!equiped || equiped.length === 0) return "";
                    const cardsHtml = equiped
                      .map((e: any) => {
                        const mod = resolveModifier(e);
                        const equipName = buildEquipmentName(e);
                        const rules = Array.isArray(e?.specialRules)
                          ? e.specialRules
                              .map((r: any) => {
                                if (r?.label && r?.value)
                                  return `<div><strong>${safe(
                                    r.label
                                  )}:</strong> ${safe(r.value)}</div>`;
                                if (r?.term && r?.description)
                                  return `<div><strong>${safe(
                                    r.term
                                  )}:</strong> ${safe(r.description)}</div>`;
                                return "";
                              })
                              .join("")
                          : "";
                        const modEffect =
                          mod?.effect || e?.modifier?.effect || "";
                        const allRules = modEffect
                          ? rules +
                            `<div><strong>Modificador:</strong> ${safe(
                              modEffect
                            )}</div>`
                          : rules;

                        return `
                          <div class="equip-card">
                            <div class="equip-title">${equipName}</div>
                            <div class="equip-grid">
                              <div><strong>Tipo:</strong> ${safe(e?.type)}</div>
                              <div><strong>Custo:</strong> ${safe(
                                e?.purchaseCost || e?.cost
                              )}</div>
                              <div><strong>Espaços:</strong> ${safe(
                                e?.slots || e?.spaces
                              )}</div>
                              ${
                                e?.damageModifier != null
                                  ? `<div><strong>Mod. Dano:</strong> ${safe(
                                      e?.damageModifier
                                    )}</div>`
                                  : ""
                              }
                              ${
                                e?.armorBonus != null
                                  ? `<div><strong>Bônus Armadura:</strong> ${safe(
                                      e?.armorBonus
                                    )}</div>`
                                  : ""
                              }
                              ${
                                e?.movePenalty != null
                                  ? `<div><strong>Penal. Movimento:</strong> ${safe(
                                      e?.movePenalty
                                    )}</div>`
                                  : ""
                              }
                            </div>
                            ${
                              e?.effect
                                ? `<div><strong>Efeito:</strong> ${safe(
                                    e?.effect
                                  )}</div>`
                                : ""
                            }
                            ${allRules}
                          </div>
                        `;
                      })
                      .join("");
                    return `
                      <div class="equipment-section">
                        <div class="section-title">Cards de Equipamentos</div>
                        <div class="equip-grid-page">${cardsHtml}</div>
                      </div>
                    `;
                  };

                  const buildUnitHtml = (u: any): string => {
                    const fig = u?.figure || {};
                    const stats = u?.stats || {};
                    const skills = (fig.skills || [])
                      .map((s: any) => s?.name || s)
                      .filter(Boolean);
                    const spells = (fig.spells || [])
                      .map((s: any) => s?.name || s)
                      .filter(Boolean);
                    const injuries = (fig.injuries || [])
                      .map((i: any) => i?.name || i)
                      .filter(Boolean);
                    const advancements = (fig.advancements || [])
                      .map((a: any) => a?.name || a)
                      .filter(Boolean);
                    const equiped = (fig.equiped || [])
                      .map((e: any) => e?.name || e)
                      .filter(Boolean);
                    const equipedFull = (fig.equiped || []) as any[];
                    const specialAbilities = [
                      ...(Array.isArray(fig.nurgleBlessings)
                        ? fig.nurgleBlessings
                        : []),
                      ...(Array.isArray(fig.mutations) ? fig.mutations : []),
                      ...(Array.isArray(fig.sacredMarks)
                        ? fig.sacredMarks
                        : []),
                    ]
                      .map((a: any) => a?.name || a)
                      .filter(Boolean);
                    const specialRules = Array.isArray(u?.abilities)
                      ? (u.abilities as any[])
                          .map((r: any) => ({
                            name: r?.name || "",
                            description: r?.description || "",
                          }))
                          .filter((r) => r.name)
                      : Array.isArray((fig as any).specialRules)
                      ? ((fig as any).specialRules as any[])
                          .map((r: any) => ({
                            name: r?.name || "",
                            description: r?.description || "",
                          }))
                          .filter((r) => r.name)
                      : [];

                    return `
                      <div class="card">
                        <div class="card-header">
                          <div>
                            <div class="title">${
                              safe(fig?.narrativeName)
                                ? safe(fig?.narrativeName) + ", "
                                : ""
                            }${safe(u?.name)}</div>
                            <div class="subtitle">${safe(
                              u?.role || fig?.role || ""
                            )} ${safe(u?.quantity || "")}</div>
                          </div>
                          <div class="right-info">
                            <div><strong>Facção:</strong> ${safe(
                              sheet.faction
                            )}</div>
                            <div><strong>Custo:</strong> ${safe(
                              stats?.cost
                            )}</div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col">
                            <div class="section-title">Atributos</div>
                            <table class="table">
                              <tr><td>Movimento</td><td>${safe(
                                stats?.move
                              )}</td></tr>
                              <tr><td>Ímpeto</td><td>${safe(
                                stats?.fight
                              )}</td></tr>
                              <tr><td>Precisão</td><td>${safe(
                                stats?.shoot
                              )}</td></tr>
                              <tr><td>Armadura</td><td>${safe(
                                stats?.armour
                              )}</td></tr>
                              <tr><td>Vontade</td><td>${safe(
                                stats?.Vontade
                              )}</td></tr>
                              <tr><td>Vigor</td><td>${safe(
                                stats?.health
                              )}</td></tr>
                              ${
                                stats?.strength !== undefined
                                  ? `<tr><td>Força</td><td>${safe(
                                      stats?.strength
                                    )}</td></tr>`
                                  : ""
                              }
                            </table>
                          </div>
                          <div class="col">
                            <div class="section-title">Equipamentos</div>
                            <ul class="list">${
                              equiped
                                .map((n: string) => `<li>${n}</li>`)
                                .join("") || "<li>-</li>"
                            }</ul>
                            <div class="section-title">Habilidades</div>
                            <ul class="list">${
                              skills
                                .map((n: string) => `<li>${n}</li>`)
                                .join("") || "<li>-</li>"
                            }</ul>
                            <div class="section-title">Habilidades Especiais</div>
                            <ul class="list">${
                              specialAbilities
                                .map((n: string) => `<li>${n}</li>`)
                                .join("") || "<li>-</li>"
                            }</ul>
                          </div>
                          <div class="col">
                            <div class="section-title">Magias</div>
                            <ul class="list">${
                              spells
                                .map((n: string) => `<li>${n}</li>`)
                                .join("") || "<li>-</li>"
                            }</ul>
                            <div class="section-title">Ferimentos</div>
                            <ul class="list">${
                              injuries
                                .map((n: string) => `<li>${n}</li>`)
                                .join("") || "<li>-</li>"
                            }</ul>
                          </div>
                        </div>
                        ${
                          advancements && advancements.length
                            ? `
                        <div class="section-title">Avanços</div>
                        <ul class="list">${advancements
                          .map((n: string) => `<li>${n}</li>`)
                          .join("")}</ul>
                        `
                            : ""
                        }
                        ${
                          specialRules.length
                            ? `
                        <div class="section-title">Regras Especiais</div>
                        <div class="rules-block">
                          ${specialRules
                            .map(
                              (r) =>
                                `<div class="rule-item"><strong>${safe(
                                  r.name
                                )}:</strong> ${safe(r.description)}</div>`
                            )
                            .join("")}
                        </div>`
                            : ""
                        }
                      </div>
                      ${buildEquipmentCards(equipedFull)}
                    `;
                  };

                  const buildAllDetailPages = (): string => {
                    const blocks: string[] = [];
                    (sheet.units || []).forEach((u: any) => {
                      const fig = u?.figure || {};
                      const unitName = safe(u?.name);
                      const unitRole = safe(u?.role || fig?.role || "");

                      // Habilidades
                      const skills = (fig.skills || []).map((s: any) => ({
                        name: s?.name || s,
                        description: s?.description || "",
                      }));
                      const skillsHtml = skills.length
                        ? skills
                            .map(
                              (k: any) => `
                              <div class="equip-card">
                                <div class="equip-title">${safe(k.name)}</div>
                                <div>${safe(k.description)}</div>
                              </div>`
                            )
                            .join("")
                        : '<div class="muted">Sem habilidades</div>';

                      // Magias
                      const spells = (fig.spells || []).map((s: any) => ({
                        name: s?.name || s,
                        effect: s?.effect || "",
                        cn: s?.castingNumber || s?.cn || "",
                        keywords: Array.isArray(s?.keywords) ? s.keywords : [],
                      }));
                      const spellsHtml = spells.length
                        ? spells
                            .map(
                              (sp: any) => `
                              <div class="equip-card">
                                <div class="equip-title">${safe(sp.name)}</div>
                                <div><strong>CD:</strong> ${safe(
                                  String(sp.cn)
                                )}</div>
                                ${
                                  Array.isArray(sp.keywords) &&
                                  sp.keywords.length
                                    ? `<div><strong>Palavras-chave:</strong> ${sp.keywords
                                        .map((x: any) => safe(x))
                                        .join(", ")}</div>`
                                    : ""
                                }
                                <div>${safe(sp.effect)}</div>
                              </div>`
                            )
                            .join("")
                        : '<div class="muted">Sem magias</div>';

                      // Habilidades Especiais
                      const specialAbilities = [
                        ...(Array.isArray(fig.nurgleBlessings)
                          ? fig.nurgleBlessings
                          : []),
                        ...(Array.isArray(fig.mutations) ? fig.mutations : []),
                        ...(Array.isArray(fig.sacredMarks)
                          ? fig.sacredMarks
                          : []),
                      ].map((a: any) => ({
                        name: a?.name || a,
                        description: a?.description || "",
                      }));
                      const specHtml = specialAbilities.length
                        ? specialAbilities
                            .map(
                              (a) => `
                              <div class="equip-card">
                                <div class="equip-title">${safe(a.name)}</div>
                                <div>${safe(a.description)}</div>
                              </div>`
                            )
                            .join("")
                        : '<div class="muted">Sem habilidades especiais</div>';

                      blocks.push(`
                        <div class="page-break"></div>
                        <div class="card">
                          <div class="card-header">
                            <div class="title">Cartas de ${unitName}</div>
                            <div class="subtitle">${unitRole}</div>
                          </div>
                          <div class="section-title">Habilidades</div>
                          <div class="equip-grid-page">${skillsHtml}</div>
                          <div class="section-title">Magias</div>
                          <div class="equip-grid-page">${spellsHtml}</div>
                          <div class="section-title">Habilidades Especiais</div>
                          <div class="equip-grid-page">${specHtml}</div>
                        </div>
                      `);
                    });
                    return blocks.join("");
                  };

                  // Todos os cards de figura juntos primeiro
                  const unitsHtml = (sheet.units || [])
                    .map((u: any) => buildUnitHtml(u))
                    .join("");

                  // Depois todos os detalhes agrupados
                  const detailPagesHtml = buildAllDetailPages();

                  const html = `<!DOCTYPE html>
                    <html>
                      <head>
                        <meta charset="utf-8" />
                        <meta name="viewport" content="width=device-width, initial-scale=1" />
                        <title>${safe(sheet?.name || "Bando")}</title>
                        <style>
                          @media print {
                            .page-break { page-break-before: always; }
                          }
                          body { background: #ffffff; color: #000; font-family: Arial, Helvetica, sans-serif; margin: 20px; }
                          .header { margin-bottom: 16px; }
                          .header .h1 { font-size: 22px; font-weight: 700; }
                          .muted { color: #333; }
                          .card { border: 1px solid #000; padding: 12px; margin-bottom: 16px; background: #fff; }
                          .card-header { display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid #000; padding-bottom: 6px; margin-bottom: 8px; }
                          .title { font-size: 18px; font-weight: 700; }
                          .subtitle { font-size: 12px; }
                          .row { display: flex; gap: 12px; }
                          .col { flex: 1; }
                          .section-title { font-weight: 700; margin: 8px 0 4px; border-bottom: 1px solid #000; }
                          .section-separator { page-break-before: always; margin: 20px 0; }
                          .section-header { font-size: 20px; font-weight: 700; text-align: center; border-bottom: 2px solid #000; padding-bottom: 8px; }
                          .equipment-section { margin-top: 12px; }
                          .table { width: 100%; border-collapse: collapse; }
                          .table td { border-bottom: 1px solid #000; padding: 2px 4px; font-size: 12px; }
                          .list { margin: 0; padding-left: 16px; font-size: 12px; }
                          .rules-block { margin-top: 8px; font-size: 12px; }
                          .rule-item { margin-bottom: 4px; }
                          .equip-grid-page { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; margin-top: 8px; }
                          .equip-card { border: 1px solid #000; padding: 8px; background: #fff; }
                          .equip-title { font-weight: 700; margin-bottom: 4px; }
                          .equip-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 4px; font-size: 12px; }
                        </style>
                      </head>
                      <body>
                        <div class="header">
                          <div class="h1">${safe(sheet?.name || "Bando")}</div>
                          <div><strong>Facção:</strong> ${safe(
                            sheet.faction
                          )} &nbsp; | &nbsp; <strong>Warband Rating:</strong> ${safe(
                    String(warbandRating)
                  )}</div>
                          <div><strong>Coroas:</strong> ${safe(
                            sheet.gold
                          )} &nbsp; | &nbsp; <strong>Pedra-Bruxa:</strong> ${safe(
                    sheet.wyrdstone
                  )}</div>
                        </div>
                        ${unitsHtml}
                        <div class="page-break"></div>
                        <div class="section-separator">
                          <h2 class="section-header">Cartas Detalhadas de Habilidades e Magias</h2>
                        </div>
                        ${detailPagesHtml}
                        <script>
                          window.onload = function() {
                            setTimeout(function(){ window.print(); }, 100);
                          };
                        </script>
                      </body>
                    </html>`;

                  const w = window.open("", "_blank");
                  if (!w) return;
                  w.document.open();
                  w.document.write(html);
                  w.document.close();
                } catch (e) {
                  // eslint-disable-next-line no-console
                  console.error(e);
                }
              };

              const handleShare = async () => {
                try {
                  // Cria snapshot do warband
                  const payloadRaw: any = {
                    name: sheet.name,
                    faction: sheet.faction,
                    notes: sheet.notes ?? "",
                    gold: sheet.gold ?? "0",
                    wyrdstone: sheet.wyrdstone ?? "0",
                    vault: (sheet.vault || []).map((e: any) =>
                      stripUndefinedDeep(e)
                    ),
                    figures: (sheet.units || [])
                      .map((u: any) => u?.figure)
                      .filter(Boolean)
                      .map((f: any) => stripUndefinedDeep(f)),
                    ownerName:
                      currentUser?.displayName ||
                      currentUser?.email ||
                      "Usuário",
                    createdAt: new Date(),
                  };
                  const payload = stripUndefinedDeep(payloadRaw);

                  const col = collection(db, "warband-snapshots");
                  const docRef = await addDoc(col, payload);

                  const shareUrl = `${window.location.origin}/share/warband/${docRef.id}`;

                  // Copia para clipboard
                  await navigator.clipboard.writeText(shareUrl);

                  toast.success("Link copiado para a área de transferência!");
                } catch (e) {
                  console.error("Erro ao compartilhar bando:", e);
                  toast.error("Erro ao compartilhar bando. Tente novamente.");
                }
              };

              return (
                <div className="mt-4 mb-4 flex gap-3">
                  <button
                    onClick={handleExportPdf}
                    className="px-4 py-2 rounded bg-green-900/20 border border-green-500/40 hover:bg-green-800/30 hover:border-green-400/60 text-white transition-colors duration-200 font-semibold"
                  >
                    📄 Exportar PDF (Printer-friendly)
                  </button>
                  <button
                    onClick={handleShare}
                    className="px-4 py-2 rounded bg-blue-900/20 border border-blue-500/40 hover:bg-blue-800/30 hover:border-blue-400/60 text-white transition-colors duration-200 font-semibold"
                  >
                    🔗 Compartilhar Bando
                  </button>
                </div>
              );
            })()}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <label className="flex flex-col gap-2">
                <span className="text-sm text-gray-300">Nome do Bando</span>
                <input
                  className="bg-[#1f1f1f] border border-gray-600 rounded px-3 py-2 text-white"
                  value={sheet.name}
                  onChange={(e) => setSheet({ ...sheet, name: e.target.value })}
                  placeholder="Ex.: Circo do Caos"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-sm text-gray-300">Facção</span>
                <div className="bg-[#1f1f1f] border border-gray-600 rounded px-3 py-2 text-white opacity-90 select-none">
                  {factionLabel}
                </div>
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className="flex flex-col gap-2">
                  <span className="text-sm text-gray-300">Coroas</span>
                  <input
                    className="bg-[#1f1f1f] border border-gray-600 rounded px-3 py-2 text-white"
                    value={sheet.gold}
                    onChange={(e) =>
                      setSheet({ ...sheet, gold: e.target.value })
                    }
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-sm text-gray-300">Pedra-Bruxa</span>
                  <input
                    className="bg-[#1f1f1f] border border-gray-600 rounded px-3 py-2 text-white"
                    value={sheet.wyrdstone}
                    onChange={(e) =>
                      setSheet({ ...sheet, wyrdstone: e.target.value })
                    }
                  />
                </label>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <div className="inline-flex items-center gap-2 bg-[#1f1f1f] border border-gray-600 rounded px-3 py-2">
                <span className="text-sm text-gray-300">Warband Rating:</span>
                <span
                  className="text-lg font-bold"
                  style={{ color: "#8fbc8f" }}
                >
                  {warbandRating}
                </span>
              </div>
            </div>

            <label className="flex flex-col gap-2 mt-4">
              <span className="text-sm text-gray-300">Anotações</span>
              <textarea
                className="bg-[#1f1f1f] border border-gray-600 rounded px-3 py-2 text-white min-h-[100px]"
                value={sheet.notes}
                onChange={(e) => setSheet({ ...sheet, notes: e.target.value })}
                placeholder="Notas gerais do bando, progresso da campanha etc."
              />
            </label>

            <div className="mt-6 border-t border-gray-700 pt-6">
              <h3
                className="text-lg font-bold mb-3"
                style={{ color: "#8fbc8f" }}
              >
                Adicionar Figura do Bando
              </h3>
              <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                <select
                  className="bg-[#161616] border border-gray-600 rounded px-3 py-2 text-white flex-1 w-full sm:w-auto"
                  value={selectedMercId}
                  onChange={(e) => setSelectedMercId(e.target.value)}
                >
                  <option value="">Selecionar figura do bando...</option>
                  {selectedFaction?.data?.map((u: any) => (
                    <option key={u.id} value={u.id}>
                      {u.name} - {u.role || "Soldado"} - {u.stats.cost}
                    </option>
                  ))}
                </select>
                <button
                  className="px-3 py-2 rounded bg-green-600 hover:bg-green-700 text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto whitespace-nowrap"
                  disabled={!selectedMercId}
                  onClick={() => {
                    const base = selectedFaction?.data?.find(
                      (u: any) => u.id === selectedMercId
                    );
                    addFigureFromBase(base);
                  }}
                >
                  Adicionar
                </button>
              </div>
            </div>

            {/* Adicionar Mercenários */}
            <div className="mt-6 border-t border-gray-700 pt-6">
              <h3
                className="text-lg font-bold mb-3"
                style={{ color: "#8fbc8f" }}
              >
                Adicionar Mercenário
              </h3>
              <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                <select
                  className="bg-[#161616] border border-gray-600 rounded px-3 py-2 text-white flex-1 w-full sm:w-auto"
                  value={selectedMercId}
                  onChange={(e) => setSelectedMercId(e.target.value)}
                >
                  <option value="">Selecionar mercenário...</option>
                  {globalMercenaries.map((u: any) => (
                    <option key={u.id} value={u.id}>
                      {u.name}
                    </option>
                  ))}
                </select>
                <button
                  className="px-3 py-2 rounded bg-green-600 hover:bg-green-700 text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto whitespace-nowrap"
                  disabled={!selectedMercId}
                  onClick={() => {
                    const base = globalMercenaries.find(
                      (u: any) => u.id === selectedMercId
                    );
                    addFigureFromBase(base);
                    setSelectedMercId("");
                  }}
                >
                  Adicionar
                </button>
              </div>
            </div>

            {/* Adicionar Lendas */}
            <div className="mt-6 border-t border-gray-700 pt-6">
              <h3
                className="text-lg font-bold mb-3"
                style={{ color: "#8fbc8f" }}
              >
                Adicionar Lenda
              </h3>
              <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                <select
                  className="bg-[#161616] border border-gray-600 rounded px-3 py-2 text-white flex-1 w-full sm:w-auto"
                  value={selectedLegendId}
                  onChange={(e) => setSelectedLegendId(e.target.value)}
                >
                  <option value="">Selecionar lenda...</option>
                  {globalLegends.map((u: any) => (
                    <option key={u.id} value={u.id}>
                      {u.name}
                    </option>
                  ))}
                </select>
                <button
                  className="px-3 py-2 rounded bg-green-600 hover:bg-green-700 text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto whitespace-nowrap"
                  disabled={!selectedLegendId}
                  onClick={() => {
                    const base = globalLegends.find(
                      (u: any) => u.id === selectedLegendId
                    );
                    addFigureFromBase(base);
                    setSelectedLegendId("");
                  }}
                >
                  Adicionar
                </button>
              </div>
            </div>

            {/* Cofre do Bando (unificado com vault) */}
            <WarbandStash
              stash={
                (sheet.vault || []).map((e: any) => ({
                  id: e.id,
                  name: e.name,
                  category: e.type || e.category || "",
                  cost: String(e.purchaseCost || e.sellCost || "-"),
                  data: e,
                  modifier: e.modifier
                    ? { name: e.modifier.name, effect: e.modifier.effect }
                    : undefined,
                })) as any
              }
              gold={sheet.gold || "0"}
              onPurchase={handlePurchaseItem}
              onSell={() => {}}
              onUndo={(index) => {
                markDirty();
                const newVault = (sheet.vault || []).filter(
                  (_, i) => i !== index
                );
                setSheet({ ...sheet, vault: newVault });
              }}
              onRemoveVaultItemById={(id) => {
                markDirty();
                setSheet({
                  ...sheet,
                  vault: (sheet.vault || []).filter((e: any) => e.id !== id),
                });
              }}
              factionKey={sheet.faction || ""}
              factionLabel={factionLabel}
            />

            <div className="flex gap-3 mt-4 flex-wrap">
              <label className="px-4 py-2 rounded bg-blue-900/40 border border-blue-500/40 text-white hover:bg-blue-900/60 cursor-pointer">
                Importar JSON
                <input
                  type="file"
                  accept="application/json"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) importFromFile(file);
                  }}
                />
              </label>
              <button
                onClick={exportJson}
                className="px-4 py-2 rounded bg-gray-700 border border-gray-500 text-white hover:bg-gray-600"
              >
                Exportar JSON
              </button>
              <button
                onClick={() =>
                  setSheet({
                    name: "",
                    faction: "",
                    notes: "",
                    gold: "500",
                    wyrdstone: "0",
                    units: [],
                  })
                }
                className="px-4 py-2 rounded bg-red-900/40 border border-red-500/40 text-white hover:bg-red-900/60"
              >
                Limpar
              </button>
            </div>

            <div className="mt-8">
              <HeaderH1>Figuras</HeaderH1>
              <div className="mt-2 inline-flex items-center gap-2 bg-[#1f1f1f] border border-gray-600 rounded px-3 py-2">
                <span className="text-sm text-gray-300">Warband Rating:</span>
                <span
                  className="text-lg font-bold"
                  style={{ color: "#8fbc8f" }}
                >
                  {warbandRating}
                </span>
              </div>
              <MobileText className="text-sm text-gray-400 mb-3">
                Gerencie suas figuras do bando usando os cards abaixo.
              </MobileText>

              {(() => {
                // Função para ordenar unidades na ordem: Líder, Lendas, Heróis, Mercenários, Soldados
                const getRoleOrder = (role: string | undefined): number => {
                  const roleLower = (role || "").toString().toLowerCase();
                  if (roleLower === "líder" || roleLower === "lider") return 1;
                  if (roleLower === "lenda") return 2;
                  if (
                    roleLower === "héroi" ||
                    roleLower === "heroi" ||
                    roleLower === "herói"
                  )
                    return 3;
                  if (
                    roleLower.includes("mercen") ||
                    roleLower.includes("mercenário")
                  )
                    return 4;
                  if (roleLower === "soldado" || roleLower === "") return 5;
                  return 6; // Outros roles vão para o final
                };

                const sortUnits = (units: typeof sheet.units) => {
                  return [...units].sort((a, b) => {
                    const roleA = a.role || (a as any)?.figure?.role || "";
                    const roleB = b.role || (b as any)?.figure?.role || "";
                    const orderA = getRoleOrder(roleA);
                    const orderB = getRoleOrder(roleB);

                    // Se a ordem for diferente, ordena pela ordem
                    if (orderA !== orderB) {
                      return orderA - orderB;
                    }

                    // Se a ordem for a mesma, mantém ordem original (ou ordena por nome)
                    const nameA = (a.name || "").toString();
                    const nameB = (b.name || "").toString();
                    return nameA.localeCompare(nameB);
                  });
                };

                const active = sortUnits(
                  sheet.units.filter(
                    (u) => !Boolean((u as any)?.figure?.inactive)
                  )
                );
                const inactive = sortUnits(
                  sheet.units.filter((u) =>
                    Boolean((u as any)?.figure?.inactive)
                  )
                );

                const renderList = (list: typeof sheet.units) => (
                  <div className="space-y-6">
                    {list.map((u) => {
                      // equippedItems não é mais usado - mantido apenas para compatibilidade
                      const equipped = u.equippedItems || {
                        acessorios: [],
                      };
                      const rosterStats = createRosterStats(
                        u.stats,
                        u.statBreakdown
                      );

                      const isMenuOpen = openMenus.has(u.id);
                      const toggleMenu = () => {
                        const newSet = new Set(openMenus);
                        if (isMenuOpen) {
                          newSet.delete(u.id);
                        } else {
                          newSet.add(u.id);
                        }
                        setOpenMenus(newSet);
                      };

                      return (
                        <div key={u.id} className="relative">
                          <div className="absolute top-2 right-2 z-10">
                            <div
                              className="relative"
                              ref={(el) => {
                                menuRefs.current[u.id] = el;
                              }}
                            >
                              <button
                                onClick={toggleMenu}
                                className="px-3 py-1 rounded bg-gray-700 border border-gray-500 text-white hover:bg-gray-600 text-xs flex items-center gap-1"
                                title="Menu de ações"
                              >
                                <span>⚙</span>
                                <span>Ações</span>
                              </button>
                              {isMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-[#2a2a2a] border border-gray-600 rounded shadow-lg z-50">
                                  <div className="py-1">
                                    {(() => {
                                      const roleValue =
                                        u.role ||
                                        (u as any)?.figure?.role ||
                                        "";
                                      const roleStr = roleValue
                                        .toString()
                                        .toLowerCase();
                                      const nameStr = (u.name || "")
                                        .toString()
                                        .toLowerCase();
                                      const isMerc =
                                        roleStr.includes("mercen") ||
                                        nameStr.includes("mercen");
                                      const isSoldier = roleStr === "soldado";
                                      const isPromotable =
                                        (!roleStr || isSoldier) && !isMerc;
                                      // Verifica se é Herói de múltiplas formas
                                      const isHero =
                                        roleValue === "Héroi" ||
                                        roleValue === "Herói" ||
                                        roleStr === "héroi" ||
                                        roleStr === "heroi" ||
                                        roleStr.includes("héroi") ||
                                        roleStr.includes("heroi");
                                      return (
                                        <>
                                          {isPromotable ? (
                                            <button
                                              onClick={() => {
                                                promoteUnitToHero(u.id);
                                                toggleMenu();
                                              }}
                                              className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center gap-2"
                                            >
                                              <span>⭐</span>
                                              <span>Promover a Herói</span>
                                            </button>
                                          ) : null}
                                          {isHero ? (
                                            <button
                                              onClick={() => {
                                                promoteHeroToLeader(u.id);
                                                toggleMenu();
                                              }}
                                              className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center gap-2"
                                            >
                                              <span>👑</span>
                                              <span>Promover a Líder</span>
                                            </button>
                                          ) : null}
                                        </>
                                      );
                                    })()}
                                    <button
                                      onClick={() => {
                                        handleToggleInactive(u.id);
                                        toggleMenu();
                                      }}
                                      className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center gap-2"
                                    >
                                      <span>
                                        {Boolean((u as any)?.figure?.inactive)
                                          ? "✓"
                                          : "✗"}
                                      </span>
                                      <span>
                                        {Boolean((u as any)?.figure?.inactive)
                                          ? "Ativar"
                                          : "Inativar"}
                                      </span>
                                    </button>
                                    <button
                                      onClick={() => {
                                        removeUnit(u.id);
                                        toggleMenu();
                                      }}
                                      className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center gap-2"
                                    >
                                      <span>🗑️</span>
                                      <span>Remover</span>
                                    </button>
                                    <button
                                      onClick={() => {
                                        killUnit(u.id);
                                        toggleMenu();
                                      }}
                                      className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-900/30 flex items-center gap-2"
                                    >
                                      <span>💀</span>
                                      <span>Matar</span>
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          <RosterUnitCard
                            id={u.id}
                            name={u.name}
                            role={u.role}
                            quantity={u.quantity}
                            baseStats={u.stats}
                            rosterStats={rosterStats}
                            lore={u.lore}
                            availability={u.availability}
                            qualidade={u.qualidade}
                            figure={u.figure as any}
                            spellAffinity={u.spellAffinity}
                            abilities={u.abilities || []}
                            equipment={u.equipment}
                            equippedItems={equipped}
                            onPromoteHeroToLeader={
                              u.role === "Herói" ||
                              (u as any)?.figure?.role === "Herói"
                                ? () => promoteHeroToLeader(u.id)
                                : undefined
                            }
                            stashItems={
                              (sheet.vault || []).map((e: any) => ({
                                name: e.name,
                                category: String(e.type || e.category || ""),
                                data: e,
                              })) as any
                            }
                            maxSlots={
                              Number(
                                (u.stats as any)?.equipmentSlots ??
                                  (u.stats as any)?.equipmentSpaces ??
                                  5
                              ) || 5
                            }
                            availableSkills={(u.stats.skills || []) as string[]}
                            selectedSkills={(u.figure as any)?.skills || []}
                            selectedAdvancements={
                              ((u.figure as any)?.advancements || []).map(
                                (a: any) => (typeof a === "string" ? a : a.name)
                              ) as string[]
                            }
                            onAddSkillCategory={(cat) =>
                              handleAddSkillCategoryToUnit(u.id, cat)
                            }
                            selectedSpells={(u.figure as any)?.spells || []}
                            onAddTradition={(t) =>
                              handleAddTraditionToUnit(u.id, t)
                            }
                            onAddSkill={(skill) =>
                              handleAddSkillToUnit(u.id, skill)
                            }
                            selectedInjuries={
                              ((u.figure as any)?.injuries || []).map(
                                (i: any) => (typeof i === "string" ? i : i.name)
                              ) as string[]
                            }
                            onAddInjury={(i) => handleAddInjuryToUnit(u.id, i)}
                            onRemoveInjury={(injuryName, idx) =>
                              handleRemoveInjuryFromUnit(u.id, injuryName, idx)
                            }
                            onRemoveSkill={(skill) =>
                              handleRemoveSkillFromUnit(u.id, skill)
                            }
                            onAddSpell={(spell) =>
                              handleAddSpellToUnit(u.id, spell)
                            }
                            onRemoveSpell={(spellId) =>
                              handleRemoveSpellFromUnit(u.id, spellId)
                            }
                            onChangeSpellCastingNumber={(spellId, newCN) =>
                              handleUpdateSpellCastingNumber(
                                u.id,
                                spellId,
                                newCN
                              )
                            }
                            onChangeNarrativeName={(nv) =>
                              handleUpdateNarrativeName(u.id, nv)
                            }
                            onChangeFigureXp={(xp) =>
                              handleUpdateFigureXp(u.id, xp)
                            }
                            onAddSpecialAbility={(a) =>
                              handleAddSpecialAbilityToUnit(u.id, a as any)
                            }
                            onRemoveSpecialAbility={(category, id) =>
                              handleRemoveSpecialAbilityFromUnit(
                                u.id,
                                category as any,
                                id
                              )
                            }
                            onStatMiscChange={(attribute, value) =>
                              handleStatMiscChange(u.id, attribute, value)
                            }
                            onEquipFromStashFlat={(item) =>
                              handleEquipFromStashFlat(u.id, item)
                            }
                            onUnequipToStashFlat={(item) =>
                              handleUnequipToStashFlat(u.id, item)
                            }
                            onAddAdvancement={(a) =>
                              handleAddAdvancementToUnit(u.id, a)
                            }
                            onRemoveAdvancement={(a, idx) =>
                              handleRemoveAdvancementFromUnit(u.id, a, idx)
                            }
                            onChangeFigureStatModifier={(
                              stat,
                              category,
                              value
                            ) =>
                              handleFigureStatModifierChange(
                                u.id,
                                stat as any,
                                category,
                                value
                              )
                            }
                            onToggleInactive={() => handleToggleInactive(u.id)}
                          />
                        </div>
                      );
                    })}
                  </div>
                );

                return (
                  <>
                    {active.length > 0 && renderList(active)}
                    {inactive.length > 0 && (
                      <div className="mt-10">
                        <HeaderH1>Inativos</HeaderH1>
                        {renderList(inactive)}
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          </MobileSection>
        </div>
      </div>
      {equipmentModalEl}
    </div>
  );
}

export default WarbandRosterPage;
