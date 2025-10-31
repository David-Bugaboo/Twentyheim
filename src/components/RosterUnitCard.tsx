import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GameText from "./GameText";
// import EquipmentTooltip from "./EquipmentTooltip";
import SkillPicker from "./SkillPicker";
import SkillCard from "./SkillCard";
import SpellPicker from "./SpellPicker";
import LoreSpellCard from "./LoreSpellCard";
import SpecialAbilitiesPicker, {
  type SpecialAbilityInstance,
} from "./SpecialAbilitiesPicker";
import AdvancementsPicker from "./AdvancementsPicker";
import InjuriesPicker from "./InjuriesPicker";
import EquipmentManager from "./EquipmentManager";
import { type UnitStats, type UnitAbility } from "./UnitCard";
import { type Figure } from "../pages/warband-builder/types/figure.type";
import SpecialAbilitiesCard from "./SpecialAbilitiesCard";
import ExperienceTrackerHero from "./ExperienceTrackerHero";
import ExperienceTrackerSoldier from "./ExperienceTrackerSoldier";

export interface AttributeBreakdown {
  base: number;
  advancement: number;
  injury: number;
  misc: number;
}

export interface RosterUnitStats {
  move: AttributeBreakdown;
  fight: AttributeBreakdown;
  shoot: AttributeBreakdown;
  armour: AttributeBreakdown;
  vontade: AttributeBreakdown;
  health: AttributeBreakdown;
  strength?: AttributeBreakdown;
}

interface RosterUnitCardProps {
  id: string;
  name: string;
  role?: string;
  quantity?: string;
  baseStats: UnitStats; // Stats originais da ficha (ou derivados do Figure)
  rosterStats: RosterUnitStats; // Breakdown calculado
  lore?: string;
  availability?: string | string[];
  qualidade?: string;
  spellAffinity?: {
    aligned0?: string[];
    aligned2?: string[];
  };
  abilities: UnitAbility[];
  figure?: Figure; // Nova estrutura fonte da unidade
  equipment?: {
    "hand-to-hand"?: Array<{ name: string; cost: string }>;
    ranged?: Array<{ name: string; cost: string }>;
    armor?: Array<{ name: string; cost: string }>;
    miscellaneous?: Array<{ name: string; cost: string }>;
    modifiers?: Array<{ name: string; cost: string }>;
  };
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
  onStatMiscChange: (attribute: keyof RosterUnitStats, value: number) => void;
  onAddEquipment?: (itemName: string, slot: string) => void;
  onRemoveEquipment?: (slot: string, itemName?: string) => void;
  // Cofre do Bando (stash)
  stashItems?: Array<{ name: string; cost?: string }>;
  onEquipFromStash?: (slot: string, itemName: string) => void;
  onUnequipToStash?: (slot: string, itemName?: string) => void;
  // Skills da figura
  availableSkills?: string[];
  selectedSkills?: Array<{
    id?: string;
    name: string;
    description: string;
    type?: string;
  }>;
  onAddSkill?: (skill: {
    name: string;
    description: string;
    type?: string;
  }) => void;
  onRemoveSkill?: (skillName: string) => void;
  // Adicionar tradição e lista de habilidades
  onAddTradition?: (traditionName: string) => void;
  onAddSkillCategory?: (category: string) => void;
  // Magias da figura
  selectedSpells?: Array<{
    id?: string;
    name: string;
    castingNumber: number;
    keywords: string[];
    effect: string;
  }>;
  onAddSpell?: (spell: {
    name: string;
    castingNumber: number;
    keywords: string[];
    effect: string;
  }) => void;
  onRemoveSpell?: (spellId: string) => void;
  onChangeSpellCastingNumber?: (spellId: string, newCN: number) => void;
  // Especiais
  onAddSpecialAbility?: (a: SpecialAbilityInstance) => void;
  onRemoveSpecialAbility?: (
    category: "nurgleBlessing" | "mutation" | "sacredMark",
    id: string
  ) => void;
  // XP da figura
  onChangeFigureXp?: (xp: number) => void;
  // Nome narrativo
  onChangeNarrativeName?: (name: string) => void;
  // Avanços
  selectedAdvancements?: string[];
  onAddAdvancement?: (adv: string) => void;
  onRemoveAdvancement?: (adv: string, index?: number) => void;
  // Ferimentos
  selectedInjuries?: string[];
  onAddInjury?: (injury: string) => void;
  onRemoveInjury?: (injury: string, index?: number) => void;
  // Equipamento escolhido para a unidade (lista única)
  onEquipFromStashFlat?: (itemName: string) => void;
  onUnequipToStashFlat?: (itemName: string) => void;
  maxSlots?: number;
  // Novo: editar modificadores direto do Figure
  onChangeFigureStatModifier?: (
    stat: keyof Figure["baseStats"],
    category: "injury" | "advancement" | "misc",
    value: number
  ) => void;
  onToggleInactive?: () => void;
  onPromoteHeroToLeader?: () => void;
}

const RosterUnitCard: React.FC<RosterUnitCardProps> = ({
  id,
  name,
  role,
  quantity,
  baseStats,
  // rosterStats,
  lore,
  availability,
  qualidade,
  spellAffinity,
  abilities,
  figure,
  equipment,
  // equippedItems não é mais usado na UI
  // onStatMiscChange,
  // onRemoveEquipment não usado na UI nova
  availableSkills,
  selectedSkills,
  onAddSkill,
  onRemoveSkill,
  selectedSpells,
  onAddSpell,
  onRemoveSpell,
  onChangeSpellCastingNumber,
  onAddSpecialAbility,
  onRemoveSpecialAbility,
  onChangeFigureXp,
  onChangeNarrativeName,
  // onAddTradition,
  // onAddSkillCategory,
  stashItems,
  selectedAdvancements,
  onAddAdvancement,
  onRemoveAdvancement,
  selectedInjuries,
  onAddInjury,
  onRemoveInjury,
  onEquipFromStashFlat,
  onUnequipToStashFlat,
  maxSlots,
  onChangeFigureStatModifier,
}) => {
  const navigate = useNavigate();

  const getTotal = (breakdown: AttributeBreakdown): number => {
    return (
      breakdown.base + breakdown.advancement + breakdown.injury + breakdown.misc
    );
  };

  const handleSkillClick = () => {
    // Mesma lógica do UnitCard

    // ... simplificado, pode usar a mesma lógica do UnitCard
    navigate("/skills");
  };

  // sem navegação de magia aqui

  const costDisplay = (() => {
    const raw = (baseStats?.cost ?? figure?.baseStats?.cost) as
      | string
      | number
      | undefined;
    if (raw === undefined || raw === null) return "";
    const str = String(raw).trim();
    if (str === "-" || str === "—") return "";
    return str;
  })();

  const figStatOrder: Array<keyof Figure["baseStats"]> = [
    "move",
    "fight",
    "shoot",
    "armour",
    "Vontade",
    "health",
    "strength",
  ];

  const toFigureBreakdown = (
    stat: keyof Figure["baseStats"]
  ): AttributeBreakdown => {
    const b = Number((figure?.baseStats as any)?.[stat] || 0);
    const adv = Number(
      (figure?.advancementsStatsModifiers as any)?.[stat] || 0
    );
    const inj = Number((figure?.injuryStatsModifiers as any)?.[stat] || 0);
    const misc = Number((figure?.miscStatsModifiers as any)?.[stat] || 0);
    return { base: b, advancement: adv, injury: inj, misc };
  };

  const isInactive = Boolean((figure as any)?.inactive);

  // Estado para modal de edição de atributos
  const [editingStat, setEditingStat] = useState<
    keyof Figure["baseStats"] | null
  >(null);
  const [tempModifiers, setTempModifiers] = useState<{
    advancement: number;
    injury: number;
    misc: number;
  }>({ advancement: 0, injury: 0, misc: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Fecha o menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const openEditModal = (stat: keyof Figure["baseStats"]) => {
    const b = toFigureBreakdown(stat);
    setTempModifiers({
      advancement: b.advancement,
      injury: b.injury,
      misc: b.misc,
    });
    setEditingStat(stat);
  };

  const closeEditModal = () => {
    if (editingStat && onChangeFigureStatModifier) {
      onChangeFigureStatModifier(
        editingStat,
        "advancement",
        tempModifiers.advancement
      );
      onChangeFigureStatModifier(editingStat, "injury", tempModifiers.injury);
      onChangeFigureStatModifier(editingStat, "misc", tempModifiers.misc);
    }
    setEditingStat(null);
  };

  return (
    <div
      id={id}
      className={
        "mb-4 border border-gray-700 rounded-lg overflow-hidden bg-[#1a1a1a] text-white " +
        (isInactive ? " opacity-60 grayscale" : "")
      }
    >
      {/* Header */}
      <div className="w-full p-6 pt-8">
        <h3
          className="text-2xl font-bold text-center mt-4"
          style={{ fontFamily: '"Cinzel", serif', color: "#8fbc8f" }}
        >
          {/* Lendas não têm narrative name - sempre mostra só o name */}
          {figure?.role === "Lenda"
            ? name
            : figure?.narrativeName
            ? `${figure.narrativeName}, ${name}`
            : name}
        </h3>
        {/* Campo de nome narrativo */}
        {figure?.role !== "Lenda" && (
          <div className="mt-3 flex justify-center">
            <input
              type="text"
              placeholder="Nome narrativo"
              className="bg-[#1f1f1f] border border-gray-600 rounded px-3 py-1 text-white text-sm w-full max-w-sm text-center"
              value={figure?.narrativeName || ""}
              onChange={(e) =>
                onChangeNarrativeName && onChangeNarrativeName(e.target.value)
              }
            />
          </div>
        )}
        {(role === "Herói" ||
          role === "Líder" ||
          quantity ||
          costDisplay ||
          baseStats.upkeep) && (
          <div className="flex justify-center items-center gap-3 mt-3 flex-wrap">
            {role && (role === "Herói" || role === "Líder") && (
              <span className="bg-gray-600 text-white px-2 py-1 rounded text-sm">
                {role}
              </span>
            )}
            {quantity && (
              <span className="bg-gray-500 text-white px-2 py-1 rounded text-xs">
                {quantity}
              </span>
            )}
            {costDisplay && (
              <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">
                {costDisplay}
              </span>
            )}
            {baseStats.upkeep && (
              <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">
                Manutenção: {baseStats.upkeep}
              </span>
            )}
          </div>
        )}

        {/* Avanços (Lendas não ganham avanços) */}
        {(() => {
          const roleStr = (figure?.role || "").toString().toLowerCase();
          if (roleStr.includes("lenda") || (figure as any)?.noXP) return null;
          return (
            <div className="mb-6">
              <h4
                className="text-lg font-bold mb-3"
                style={{ color: "#8fbc8f" }}
              >
                AVANÇOS
              </h4>
              {(() => {
                const roleStr = (figure?.role || "").toString().toLowerCase();
                const isHeroLike =
                  roleStr.includes("líder") ||
                  roleStr.includes("lider") ||
                  roleStr.includes("her") ||
                  roleStr.includes("merc") ||
                  roleStr.includes("lenda");

                const statIncreases = [
                  "+1 Ímpeto",
                  "+1 Precisão",
                  "+1 Armadura",
                  "+2 Vigor",
                  "+2 Movimento",
                  "+1 Vontade",
                  "+1 Força",
                ];

                const options = isHeroLike
                  ? [
                      "Nova Habilidade",
                      "Nova Magia",
                      "Diminuir CD de Magia",
                      ...statIncreases,
                    ]
                  : ["O Moleque Tem Talento!", ...statIncreases];

                return (
                  <AdvancementsPicker
                    options={options}
                    selected={selectedAdvancements || []}
                    onAdd={(a) => onAddAdvancement && onAddAdvancement(a)}
                  />
                );
              })()}
              {selectedAdvancements && selectedAdvancements.length > 0 && (
                <div className="mt-3 space-y-3">
                  {selectedAdvancements.map((a, idx) => {
                    const advDesc: Record<string, string> = {
                      "Nova Habilidade":
                        "Escolha e adicione uma nova habilidade à figura.",
                      "Nova Magia":
                        "Escolha e adicione uma nova magia à figura.",
                      "Diminuir CD de Magia":
                        "Reduza em 1 o Número de Conjuração (CD) de uma magia conhecida.",
                      "+1 Ímpeto":
                        "Aumenta permanentemente o atributo Ímpeto em +1.",
                      "+1 Precisão":
                        "Aumenta permanentemente a Precisão em +1.",
                      "+1 Armadura":
                        "Aumenta permanentemente a Armadura base em +1.",
                      "+2 Vigor": "Aumenta permanentemente o Vigor em +2.",
                      "+2 Movimento":
                        "Aumenta permanentemente o Movimento em +2.",
                      "+1 Vontade": "Aumenta permanentemente a Vontade em +1.",
                      "+1 Força": "Aumenta permanentemente a Força em +1.",
                      "O Moleque Tem Talento!":
                        "Promoção: transforme um soldado promissor em herói conforme as regras da sua facção.",
                    };
                    const desc = advDesc[a] || "";
                    return (
                      <div
                        key={`${a}-${idx}`}
                        className="relative bg-[#2a2a2a] rounded p-3 border border-gray-700"
                      >
                        <div className="text-white font-semibold">{a}</div>
                        {desc && (
                          <div className="text-sm text-gray-300 mt-1">
                            {desc}
                          </div>
                        )}
                        {onRemoveAdvancement && (
                          <button
                            onClick={() => onRemoveAdvancement(a, idx)}
                            className="absolute top-2 right-2 px-2 py-1 rounded bg-red-600 hover:bg-red-700 text-white text-xs"
                          >
                            Remover
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })()}

        {/* Ferimentos (somente Heróis / Líderes / Lendas) */}
        {(() => {
          const roleStr = (figure?.role || "").toString().toLowerCase();
          const showInjuries =
            roleStr.includes("líder") ||
            roleStr.includes("lider") ||
            roleStr.includes("her") ||
            roleStr.includes("lenda");
          if (!showInjuries) return null;
          return (
            <div className="mb-6">
              <h4
                className="text-lg font-bold mb-3"
                style={{ color: "#8fbc8f" }}
              >
                FERIMENTOS
              </h4>
              <InjuriesPicker
                selected={selectedInjuries || []}
                onAdd={(i) => onAddInjury && onAddInjury(i)}
              />
              {selectedInjuries && selectedInjuries.length > 0 && (
                <div className="mt-3 space-y-3">
                  {selectedInjuries.map((injuryName, idx) => {
                    const descMap: Record<string, string> = {
                      // Correspondências com o InjuriesPicker
                      "Ferimento na Perna": "-2 permanentes em Movimento.",
                      "Ombro Deslocado": "Perde o Próximo Jogo se recuperando.",
                      "Antebraço Esmagado":
                        "Braço Amputado. Só pode usar uma arma por vez e sem a característica Duas Mãos.",
                      "Insanidade(Estupidez)":
                        "O Personagem ganha a característica Estupidez.",
                      "Insanidade(Fúria)":
                        "O Personagem ganha a característica Fúria.",
                      "Perna Deslocada": "Perde o próximo jogo se recuperando.",
                      "Fratura Exposta na Perna":
                        "Não pode mais usar a ação de disparada e a ação de carga não dobra mais o movimento.",
                      "Costelas Quebradas": "-4 permanentes em Vida.",
                      "Cego de Um Olho":
                        "-2 permanentes em Precisão. Se rolar de novo, é removido do bando.",
                      "Ferimento Infectado":
                        "Rola um d20 antes de cada partida. Em um resultado de 1-5, não pode participar aquela partida.",
                      Trauma: "-1 permanente em Vontade.",
                      "Mão Esmigalhada": "-1 permanente em Ímpeto.",
                      "Ferimento Profundo":
                        "Perde os próximos 3 jogos se recuperando. Não pode fazer atividades na fase de campanha enquanto se recupera.",
                    };
                    let desc = descMap[injuryName] || "";
                    if (!desc) {
                      const paren = injuryName.match(/\(([^)]+)\)/);
                      if (paren && paren[1]) desc = paren[1];
                    }
                    return (
                      <div
                        key={`${injuryName}-${idx}`}
                        className="relative bg-[#2a2a2a] rounded p-3 border border-gray-700"
                      >
                        <div className="text-white font-semibold">
                          {injuryName}
                        </div>
                        {desc && (
                          <div className="text-sm text-gray-300 mt-1">
                            {desc}
                          </div>
                        )}
                        {onRemoveInjury && (
                          <button
                            onClick={() => onRemoveInjury(injuryName, idx)}
                            className="absolute top-2 right-2 px-2 py-1 rounded bg-green-700 hover:bg-green-600 text-white text-xs"
                          >
                            Curar
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })()}
      </div>

      {/* Content */}
      <div className="px-6 pt-6 pb-6 border-t border-gray-600">
        {/* Lore */}
        {(lore || baseStats.lore) && (
          <div className="mb-6">
            <p className="text-gray-300 leading-relaxed italic">
              {lore || baseStats.lore}
            </p>
          </div>
        )}

        {/* Availability and Qualidade */}
        {(availability || qualidade) && (
          <div className="mb-6 space-y-2">
            {availability && (
              <p className="text-gray-300">
                <strong>Disponibilidade:</strong>{" "}
                {Array.isArray(availability)
                  ? availability.join(", ")
                  : availability}
              </p>
            )}
            {qualidade && (
              <p className="text-gray-300">
                <strong>Qualidade:</strong> {qualidade}
              </p>
            )}
          </div>
        )}

        {/* Experiência (Lendas não ganham XP) */}
        {(() => {
          const role = (figure?.role || "").toString().toLowerCase();
          if (role.includes("lenda") || (figure as any)?.noXP) return null;
          return (
            <div className="mb-6">
              <h4
                className="text-lg font-bold mb-3"
                style={{ color: "#8fbc8f" }}
              >
                EXPERIÊNCIA
              </h4>
              {(() => {
                const role = (figure?.role || "").toString().toLowerCase();
                const isHero =
                  role.includes("líder") ||
                  role.includes("lider") ||
                  role.includes("her");
                return isHero ? (
                  <ExperienceTrackerHero
                    xp={figure?.xp ?? 0}
                    onChange={(v) => onChangeFigureXp && onChangeFigureXp(v)}
                  />
                ) : (
                  <ExperienceTrackerSoldier
                    xp={figure?.xp ?? 0}
                    onChange={(v) => onChangeFigureXp && onChangeFigureXp(v)}
                  />
                );
              })()}
            </div>
          );
        })()}

        {/* Stats com Figure - layout simplificado com modal */}
        <div className="mb-6">
          <h4 className="text-lg font-bold mb-3" style={{ color: "#8fbc8f" }}>
            ATRIBUTOS E MODIFICADORES
          </h4>
          <div className="bg-[#2a2a2a] p-4 rounded space-y-2">
            {figStatOrder.map((skey) => {
              if (
                skey === "strength" &&
                figure?.baseStats?.strength === undefined
              )
                return null;
              const b = toFigureBreakdown(skey);
              const total = getTotal(b);
              const label =
                skey === "move"
                  ? "Movimento"
                  : skey === "fight"
                  ? "Ímpeto"
                  : skey === "shoot"
                  ? "Precisão"
                  : skey === "armour"
                  ? "Armadura"
                  : skey === "Vontade"
                  ? "Vontade"
                  : skey === "health"
                  ? "Vigor"
                  : "Força";
              const showPlus =
                skey === "fight" || skey === "shoot" || skey === "Vontade";
              return (
                <div
                  key={String(skey)}
                  className="flex items-center justify-between py-2 border-b border-gray-600 last:border-b-0"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-gray-300 font-semibold">{label}</span>
                    <span className="text-xs text-gray-400">
                      (Base: {b.base})
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">
                      {showPlus && total >= 0 ? `+${total}` : `${total}`}
                    </span>
                    <button
                      type="button"
                      onClick={() => openEditModal(skey)}
                      className="text-gray-400 hover:text-green-300 transition-colors flex items-center justify-center font-bold text-lg"
                      title="Editar modificadores"
                    >
                      ±
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Habilidades - Oculto para Soldados; Para Lendas, só mostra se tiver skills */}
        {figure?.role !== "Soldado" &&
          (figure?.role !== "Lenda" ||
            (selectedSkills && selectedSkills.length > 0)) && (
            <div className="mb-6">
              <h4
                className="text-lg font-bold mb-3"
                style={{ color: "#8fbc8f" }}
              >
                HABILIDADES DISPONÍVEIS
              </h4>
              {/* Removido: botões para adicionar lista de habilidades (acesso total via picker) */}
              <div className="bg-[#2a2a2a] p-4 rounded">
                {baseStats.skills && baseStats.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {baseStats.skills.map((skill, index) => (
                      <button
                        key={index}
                        onClick={() => handleSkillClick()}
                        className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded text-sm transition-colors duration-200 cursor-pointer"
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                )}
                {/* SkillPicker só aparece se não for Lenda */}
                {figure?.role !== "Lenda" && onAddSkill && (
                  <SkillPicker
                    allowedSkills={
                      (availableSkills && availableSkills.length
                        ? availableSkills
                        : baseStats.skills && baseStats.skills.length
                        ? (baseStats.skills as string[])
                        : (figure?.avaiableSkills as string[]) ||
                          []) as string[]
                    }
                    selectedSkills={selectedSkills || []}
                    onAdd={(s) => onAddSkill && onAddSkill(s)}
                  />
                )}

                {/* Exibe as habilidades selecionadas como SkillCards */}
                {selectedSkills && selectedSkills.length > 0 && (
                  <div className="mt-4">
                    <h5 className="font-bold mb-3" style={{ color: "#8fbc8f" }}>
                      HABILIDADES SELECIONADAS
                    </h5>
                    <div className="space-y-3">
                      {selectedSkills.map((skill, index) => (
                        <div key={index}>
                          <SkillCard
                            name={skill.name}
                            description={skill.description}
                            footer={
                              onRemoveSkill ? (
                                <button
                                  onClick={() => onRemoveSkill(skill.name)}
                                  className="w-full sm:w-auto px-3 py-1.5 rounded bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm whitespace-nowrap"
                                >
                                  Remover
                                </button>
                              ) : undefined
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        {/* Magias - Oculto para Soldados; Para Lendas, só mostra se tiver spells */}
        {figure?.role !== "Soldado" &&
          (figure?.role !== "Lenda" ||
            (selectedSpells && selectedSpells.length > 0)) && (
            <div className="mb-6">
              <h4
                className="text-lg font-bold mb-3"
                style={{ color: "#8fbc8f" }}
              >
                TRADIÇÕES MÁGICAS
              </h4>
              <div className="bg-[#2a2a2a] p-4 rounded">
                {/* Removido: botão para adicionar tradição (acesso total via picker) */}
                {Array.isArray((figure as any)?.avaiableSpells) &&
                (figure as any).avaiableSpells.length > 0 ? (
                  <div className="mb-3">
                    <div className="text-sm text-gray-300 mb-1">
                      Escolas Disponíveis
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {((figure as any).avaiableSpells as string[]).map(
                        (t, idx) => (
                          <span
                            key={`as-${idx}`}
                            className="bg-gray-600 text-white px-3 py-1 rounded text-sm"
                          >
                            {t}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                ) : null}
                {(() => {
                  const a0 = (spellAffinity && spellAffinity.aligned0) || [];
                  const a2 = (spellAffinity && spellAffinity.aligned2) || [];
                  if ((a0 && a0.length) || (a2 && a2.length)) {
                    return (
                      <div className="mb-3">
                        <div className="text-sm text-gray-300 mb-1">
                          Afinidades do Usuário
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {a0.map((t, idx) => (
                            <span
                              key={`a0-${idx}`}
                              className="inline-flex items-center bg-[#1a1a1a] border border-green-600/60 text-green-300 text-xs rounded px-2 py-1"
                              title="Afinidade Primária"
                            >
                              {t}
                            </span>
                          ))}
                          {a2.map((t, idx) => (
                            <span
                              key={`a2-${idx}`}
                              className="inline-flex items-center bg-[#1a1a1a] border border-yellow-600/60 text-yellow-300 text-xs rounded px-2 py-1"
                              title="Afinidade Secundária"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  }
                  return null;
                })()}
                {/* SpellPicker só aparece se não for Lenda */}
                {figure?.role !== "Lenda" && onAddSpell && (
                  <SpellPicker
                    aligned0={
                      spellAffinity ? spellAffinity.aligned0 : undefined
                    }
                    aligned2={
                      spellAffinity ? spellAffinity.aligned2 : undefined
                    }
                    selectedSpells={selectedSpells || []}
                    onAdd={(spell) => onAddSpell(spell)}
                  />
                )}
                {selectedSpells && selectedSpells.length > 0 && (
                  <div className="mt-4">
                    <h5 className="font-bold mb-3" style={{ color: "#8fbc8f" }}>
                      MAGIAS SELECIONADAS
                    </h5>
                    <div className="space-y-3">
                      {selectedSpells.map((spell, index) => (
                        <div key={spell.id || index}>
                          <LoreSpellCard
                            name={spell.name}
                            castingNumber={spell.castingNumber}
                            keywords={spell.keywords}
                            effect={spell.effect}
                            footer={
                              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                                <input
                                  type="number"
                                  className="w-full sm:w-16 bg-[#1a1a1a] border border-gray-600 rounded px-2 py-1.5 text-white text-center text-xs sm:text-sm"
                                  value={spell.castingNumber}
                                  onChange={(e) =>
                                    onChangeSpellCastingNumber &&
                                    onChangeSpellCastingNumber(
                                      spell.id || String(index),
                                      parseInt(e.target.value) || 0
                                    )
                                  }
                                  title="CD da magia"
                                />
                                {onRemoveSpell && (
                                  <button
                                    onClick={() =>
                                      onRemoveSpell(spell.id || String(index))
                                    }
                                    className="w-full sm:w-auto px-3 py-1.5 rounded bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm whitespace-nowrap"
                                  >
                                    Remover
                                  </button>
                                )}
                              </div>
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        {/* Habilidades Especiais - Oculto para Soldados e Lendas */}
        {figure?.role !== "Soldado" && figure?.role !== "Lenda" && (
          <div className="mb-6">
            <h4 className="text-lg font-bold mb-3" style={{ color: "#8fbc8f" }}>
              HABILIDADES ESPECIAIS
            </h4>
            <div className="bg-[#2a2a2a] p-4 rounded">
              {onAddSpecialAbility && (
                <SpecialAbilitiesPicker onAdd={onAddSpecialAbility} />
              )}
              {figure && (
                <div className="mt-2">
                  <div className="space-y-4">
                    {["nurgleBlessings", "mutations", "sacredMarks"].map(
                      (k) => {
                        const list = (figure as any)[k] || [];
                        const labelMap: any = {
                          nurgleBlessings: "Bênçãos de Nurgle",
                          mutations: "Mutações",
                          sacredMarks: "Marcas Sagradas",
                        };
                        const catMap: any = {
                          nurgleBlessings: "nurgleBlessing",
                          mutations: "mutation",
                          sacredMarks: "sacredMark",
                        };
                        if (!list.length) return null;
                        return (
                          <div key={k}>
                            <div className="text-sm text-gray-300 mb-2">
                              {labelMap[k]}
                            </div>
                            <div className="space-y-3">
                              {list.map((it: any) => (
                                <SpecialAbilitiesCard
                                  key={it.id || it.name}
                                  name={it.name}
                                  cost={it.cost}
                                  description={it.description}
                                  footer={
                                    onRemoveSpecialAbility && it.id ? (
                                      <button
                                        onClick={() =>
                                          onRemoveSpecialAbility(
                                            catMap[k],
                                            it.id
                                          )
                                        }
                                        className="w-full sm:w-auto px-3 py-1.5 rounded bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm whitespace-nowrap"
                                      >
                                        Remover
                                      </button>
                                    ) : undefined
                                  }
                                />
                              ))}
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Seção de Equipamento - Oculto se equipmentSlots === 0 */}
        {(figure?.equipmentSlots ?? maxSlots ?? 5) > 0 && (
          <>
            {figure?.avaiableEquipment &&
              figure.avaiableEquipment.length > 0 && (
                <div className="mb-6">
                  <h4
                    className="text-lg font-bold mb-3"
                    style={{ color: "#8fbc8f" }}
                  >
                    EQUIPAMENTOS DISPONÍVEIS
                  </h4>
                  <div className="bg-[#2a2a2a] p-4 rounded">
                    <div className="flex flex-wrap gap-2">
                      {figure.avaiableEquipment.map((name, idx) => (
                        <span
                          key={`${name}-${idx}`}
                          className="inline-flex items-center gap-2 bg-[#1a1a1a] border border-gray-600 text-white text-xs rounded px-2 py-1"
                        >
                          {name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

            <EquipmentManager
              unitId={id}
              unitName={name}
              equipment={equipment}
              abilities={abilities}
              equippedItems={(figure?.equiped as any[]) || []}
              stashItems={stashItems as any}
              onEquipFromStashFlat={(_uid, item) =>
                onEquipFromStashFlat && onEquipFromStashFlat(item)
              }
              onUnequipToStashFlat={(_uid, item) =>
                onUnequipToStashFlat && onUnequipToStashFlat(item)
              }
              maxSlots={maxSlots}
              availableEquipmentNames={
                (figure?.avaiableEquipment as string[]) || []
              }
              equipmentLocked={Boolean((figure as any)?.equipmentLocked)}
              figureSkills={(figure?.skills || []) as any}
            />
          </>
        )}

        {/* Abilities / Regras Especiais */}
        {(abilities && abilities.length > 0) ||
        (Array.isArray((figure as any)?.specialRules) &&
          (figure as any).specialRules.length > 0) ? (
          <div className="mb-6">
            <h4 className="text-lg font-bold mb-3" style={{ color: "#8fbc8f" }}>
              Regras Especiais
            </h4>
            <div className="bg-[#2a2a2a] p-4 rounded space-y-3">
              {abilities && abilities.length > 0
                ? abilities.map((ability, index) => (
                    <div
                      key={index}
                      className="border-b border-gray-600 pb-3 last:border-b-0"
                    >
                      <h5
                        className="font-bold mb-1"
                        style={{ color: "#8fbc8f" }}
                      >
                        {ability.name}
                      </h5>
                      {ability.description && (
                        <GameText
                          component="p"
                          className="text-gray-300 text-sm leading-relaxed"
                        >
                          {ability.description}
                        </GameText>
                      )}
                    </div>
                  ))
                : ((figure as any).specialRules as any[]).map((r, idx) => (
                    <div
                      key={idx}
                      className="border-b border-gray-600 pb-3 last:border-b-0"
                    >
                      <h5
                        className="font-bold mb-1"
                        style={{ color: "#8fbc8f" }}
                      >
                        {r?.name}
                      </h5>
                      {r?.description && (
                        <GameText
                          component="p"
                          className="text-gray-300 text-sm leading-relaxed"
                        >
                          {r.description}
                        </GameText>
                      )}
                    </div>
                  ))}
            </div>
          </div>
        ) : null}
      </div>

      {/* Modal de edição de modificadores de atributo */}
      {editingStat && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={closeEditModal}
        >
          <div
            className="bg-[#2a2a2a] border border-gray-600 rounded-lg p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold" style={{ color: "#8fbc8f" }}>
                Editar Modificadores -{" "}
                {(() => {
                  const label =
                    editingStat === "move"
                      ? "Movimento"
                      : editingStat === "fight"
                      ? "Ímpeto"
                      : editingStat === "shoot"
                      ? "Precisão"
                      : editingStat === "armour"
                      ? "Armadura"
                      : editingStat === "Vontade"
                      ? "Vontade"
                      : editingStat === "health"
                      ? "Vigor"
                      : "Força";
                  return label;
                })()}
              </h3>
              <button
                type="button"
                onClick={closeEditModal}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Fechar"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Avanço
                </label>
                <input
                  type="number"
                  className="w-full bg-[#1a1a1a] border border-gray-600 rounded px-3 py-2 text-white"
                  value={tempModifiers.advancement}
                  onChange={(e) =>
                    setTempModifiers({
                      ...tempModifiers,
                      advancement: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Ferida
                </label>
                <input
                  type="number"
                  className="w-full bg-[#1a1a1a] border border-gray-600 rounded px-3 py-2 text-white"
                  value={tempModifiers.injury}
                  onChange={(e) =>
                    setTempModifiers({
                      ...tempModifiers,
                      injury: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Misc
                </label>
                <input
                  type="number"
                  className="w-full bg-[#1a1a1a] border border-gray-600 rounded px-3 py-2 text-white"
                  value={tempModifiers.misc}
                  onChange={(e) =>
                    setTempModifiers({
                      ...tempModifiers,
                      misc: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>

              <div className="pt-4 border-t border-gray-600">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-400">Total:</span>
                  <span className="text-lg font-bold">
                    {(() => {
                      const b = toFigureBreakdown(editingStat);
                      const total =
                        b.base +
                        tempModifiers.advancement +
                        tempModifiers.injury +
                        tempModifiers.misc;
                      const showPlus =
                        editingStat === "fight" ||
                        editingStat === "shoot" ||
                        editingStat === "Vontade";
                      return showPlus && total >= 0 ? `+${total}` : `${total}`;
                    })()}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition-colors"
                >
                  Aplicar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RosterUnitCard;
