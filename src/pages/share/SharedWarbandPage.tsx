import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import MobileSection from "../../components/MobileSection";
import MobileText from "../../components/MobileText";
import SkillCard from "../../components/SkillCard";
import LoreSpellCard from "../../components/LoreSpellCard";
import HeaderH1 from "../../components/HeaderH1";
import GameText from "../../components/GameText";
import EquipmentCard from "../../components/EquipmentCard";
import { db } from "../../firebase.ts";
import { doc, onSnapshot } from "firebase/firestore";
import { type Figure } from "../warband-builder/types/figure.type";

// Modificadores para o PDF
import meleeMods from "../weapons and equipments/data/modificadores-de-arma-refactor.json";
import rangedMods from "../weapons and equipments/data/modificadores-de-arma-refactor.json";
import firearmsMods from "../weapons and equipments/data/modificadores-de-armas-de-fogo-refactor.json";

interface Unit {
  id: string;
  name: string;
  role?: string;
  stats: any;
  figure: Figure;
  abilities: any[];
}

function SharedWarbandPage() {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [sheet, setSheet] = useState<any>(null);
  const [collapsedUnits, setCollapsedUnits] = useState<{
    [key: string]: boolean;
  }>({});
  const [collapsedAdvancements, setCollapsedAdvancements] = useState<{
    [key: string]: boolean;
  }>({});
  const [collapsedInjuries, setCollapsedInjuries] = useState<{
    [key: string]: boolean;
  }>({});
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewData, setPreviewData] = useState<any | null>(null);

  useEffect(() => {
    if (!id) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    const ref = doc(db, "warband-snapshots", id);
    const unsub = onSnapshot(ref, (snap) => {
      if (!snap.exists()) {
        setNotFound(true);
        setLoading(false);
        return;
      }
      const data = snap.data();

      // Monta units a partir de figures
      const units: Unit[] = [];
      if (Array.isArray(data.figures) && data.figures.length > 0) {
        data.figures.forEach((fig: any) => {
          const unit: Unit = {
            id: String(fig?.id || crypto.randomUUID()),
            name: String(fig?.name || "Figura"),
            role: fig?.role,
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
            figure: fig as Figure,
          };
          units.push(unit);
        });
      }

      setSheet({
        name: data.name || "",
        faction: data.faction || "",
        notes: data.notes || "",
        gold: data.gold || "0",
        wyrdstone: data.wyrdstone || "0",
        vault: Array.isArray(data.vault) ? data.vault : [],
        units,
        ownerName: data.ownerName || "Desconhecido",
      });
      setLoading(false);
    });

    return () => unsub();
  }, [id]);

  const warbandRating = useMemo(() => {
    const activeUnits = (sheet?.units || []).filter(
      (u: any) => !Boolean((u as Unit)?.figure?.inactive)
    );
    const members = activeUnits.length;
    const sum = activeUnits.reduce((acc: number, u: any) => {
      const fig = (u as Unit).figure || {};
      const xp = Number(fig?.xp || 0);
      const quality = Number(fig?.qualidade || 0);
      return acc + xp + quality;
    }, 0);
    return members * 5 + sum;
  }, [sheet?.units]);

  const factionLabel = useMemo(() => {
    const map: Record<string, string> = {
      mercenaries: "Mercenários",
      "sisters-of-sigmar": "Irmãs de Sigmar",
      skaven: "Skaven",
      "beastman-raiders": "Saqueadores Homem-Fera",
      "dwarf-treasure-hunters": "Caçadores de Tesouro Anões",
      lizardmen: "Reptilianos",
      "orc-mob": "Horda Orc",
      goblins: "Goblins",
      "sons-of-hashut": "Filhos de Hashut",
      "vampire-courts": "Cortes Vampíricas",
      "cult-of-the-possessed": "Culto dos Possuídos",
      "carnival-of-chaos": "Circo do Caos",
      "dark-elf-corsairs": "Corsários Druchii",
    };
    return map[sheet?.faction || ""] || sheet?.faction || "";
  }, [sheet?.faction]);

  // Função para parsear valores numéricos de strings
  const parseNumeric = (v: any): number => {
    if (typeof v === "number") return v;
    const s = v == null ? "" : String(v);
    const m = s.match(/-?\d+/);
    return m ? parseInt(m[0], 10) : 0;
  };

  // Função para calcular modificadores dinamicamente a partir de advancements e injuries
  const calculateModifiers = (u: Unit) => {
    const calcAdv = {
      move: 0,
      fight: 0,
      shoot: 0,
      armour: 0,
      Vontade: 0,
      strength: 0,
      health: 0,
    };
    const calcInj = {
      move: 0,
      fight: 0,
      shoot: 0,
      armour: 0,
      Vontade: 0,
      strength: 0,
      health: 0,
    };

    // Calcula modificadores de advancements
    if (u.figure?.advancements && Array.isArray(u.figure.advancements)) {
      for (const adv of u.figure.advancements) {
        const name = String(adv?.name || "").toLowerCase();
        if (name.includes("ímpeto")) {
          calcAdv.fight += 1;
        } else if (name.includes("precis")) {
          calcAdv.shoot += 1;
        } else if (name.includes("armadura")) {
          calcAdv.armour += 1;
        } else if (name.includes("vida")) {
          calcAdv.health += 2;
        } else if (name.includes("movimento")) {
          calcAdv.move += 2;
        } else if (name.includes("vontade")) {
          calcAdv.Vontade += 1;
        } else if (name.includes("força")) {
          calcAdv.strength += 1;
        }
      }
    }

    // Calcula modificadores de injuries
    if (u.figure?.injuries && Array.isArray(u.figure.injuries)) {
      for (const inj of u.figure.injuries) {
        const name = String(inj?.name || "");
        if (name === "Ferimento na Perna") {
          calcInj.move -= 2;
        } else if (name === "Costelas Quebradas") {
          calcInj.health -= 2;
        } else if (name === "Cego de Um Olho") {
          calcInj.shoot -= 2;
        } else if (name === "Trauma") {
          calcInj.Vontade -= 1;
        } else if (name === "Mão Esmigalhada") {
          calcInj.fight -= 1;
        }
      }
    }

    return { advancement: calcAdv, injury: calcInj };
  };

  // Helper para calcular total de stats
  const getTotalStat = (u: Unit, statKey: keyof Figure["baseStats"]) => {
    const base = Number((u.figure?.baseStats as any)?.[statKey] || 0);
    const mods = calculateModifiers(u);
    const adv = mods.advancement[statKey as keyof typeof mods.advancement] || 0;
    const inj = mods.injury[statKey as keyof typeof mods.injury] || 0;
    const misc = Number((u.figure?.miscStatsModifiers as any)?.[statKey] || 0);
    let total = base + adv + inj + misc;

    // Para armadura, adiciona bônus de equipamentos
    if (statKey === "armour" && u.figure?.equiped) {
      let equipmentArmorBonus = 0;
      for (const equip of u.figure.equiped) {
        equipmentArmorBonus += parseNumeric(equip.armorBonus);
      }
      total += equipmentArmorBonus;
      // Limita a 17
      total = Math.min(total, 17);
    }

    // Para movimento, subtrai penalidade de equipamentos
    if (statKey === "move" && u.figure?.equiped) {
      // Verifica se a figura tem a regra especial "Devagar e Sempre" ou "Crueldade Paciente"
      const specialRules = (u.figure as any)?.specialRules || [];
      const hasIgnoreMovementPenalty = specialRules.some(
        (rule: any) =>
          rule?.name === "Devagar e Sempre" ||
          rule?.name === "Crueldade Paciente"
      );

      // Apenas aplica penalidade se não tiver a regra especial
      if (!hasIgnoreMovementPenalty) {
        let equipmentMovementPenalty = 0;
        for (const equip of u.figure.equiped) {
          equipmentMovementPenalty += parseNumeric(equip.movePenalty);
        }
        total += equipmentMovementPenalty;
      }
      // Garante que não fique negativo
      total = Math.max(total, 0);
    }

    return total;
  };

  // Função para normalizar dados de equipamento para EquipmentCard
  const normalizeToEquipmentCard = (raw: any) => {
    if (!raw) return null;
    const toStr = (v: any) =>
      v === undefined || v === null ? null : String(v);
    const toArr = (v: any) => (Array.isArray(v) ? v : v ? [String(v)] : []);

    const baseName = String(raw.name || "");
    const modifier = raw.modifier;
    const nameWithMod = modifier?.name
      ? `${baseName} ${modifier.name}`
      : baseName;

    const toSpecialRules = (
      sr: any
    ): Array<{ label: string; value: string }> => {
      if (!Array.isArray(sr)) return [];
      const out: Array<{ label: string; value: string }> = [];
      for (const item of sr) {
        if (!item) continue;
        if (typeof item === "string") {
          out.push({ label: "Regra Especial", value: item });
        } else if (item.label || item.value) {
          out.push({
            label: String(item.label || "Regra Especial"),
            value: String(item.value || ""),
          });
        }
      }
      return out.filter((r) => r.value);
    };

    const base = {
      name: toStr(nameWithMod),
      type: toStr(raw.type || raw.category),
      damageModifier: toStr(
        raw.damageModifier || raw.damage || raw.modificadorDeDano
      ),
      maxRange: toStr(raw.maxRange || raw.range || raw.alcance),
      exclusive: toStr(raw.exclusive),
      specialProperties: Array.isArray(raw.specialProperties)
        ? raw.specialProperties
        : undefined,
      cost: (() => {
        const baseCostStr = String(
          raw.cost || raw.purchaseCost || raw.sellCost || "0"
        );
        const baseCostMatch = baseCostStr.match(/(\d+(?:\.\d+)?)/);
        const baseCost = baseCostMatch ? parseFloat(baseCostMatch[1]) : 0;
        const multiplier = raw.modifier?.multiplier ?? 1;
        const modifierAddend = raw.modifierAddend ?? 0;
        const modifierFixedCost = raw.modifierFixedCost;

        let finalCost = baseCost;
        if (modifierFixedCost != null) {
          finalCost = modifierFixedCost;
        } else {
          finalCost = baseCost * multiplier + modifierAddend;
        }

        return finalCost % 1 === 0
          ? `${Math.round(finalCost)} coroas`
          : `${finalCost} coroas`;
      })(),
      spaces: toStr(
        raw.spaces || raw.equipmentSpaces || raw.espacos || raw.slots
      ),
      description: toArr(raw.description || raw.descricao),
      strength: toStr(
        raw.strength || raw.requisitoDeForca || raw.requisitosDeForca
      ),
      armorBonus: toStr(
        raw.armorBonus || raw.armourBonus || raw.armadura || raw.bonusArmadura
      ),
      movePenalty: toStr(raw.movePenalty || raw.penalidadeMovimento),
      requirements: toStr(raw.requirements || raw.requisitos),
      rarity: raw.rarity ?? null,
      availability: Array.isArray(raw.availability)
        ? raw.availability
        : undefined,
      effect: toStr(raw.effect || raw.efeito),
      specialRules: (() => {
        const baseRules = toSpecialRules((raw as any).specialRules);
        const modifier = raw.modifier;
        if (modifier?.name && modifier?.effect) {
          baseRules.push({
            label: `Modificador — ${modifier.name}`,
            value: String(modifier.effect),
          });
        }
        return baseRules;
      })(),
    };
    return base;
  };

  const openPreview = (item: any) => {
    const normalized = normalizeToEquipmentCard(item);
    if (normalized) {
      setPreviewData(normalized);
      setPreviewOpen(true);
    }
  };

  if (loading) {
    return (
      <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
        <div className="py-4">
          <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
            <MobileSection>
              <div className="text-center py-12">
                <PageTitle>Carregando bando…</PageTitle>
                <div className="flex items-center justify-center py-12">
                  <div className="h-10 w-10 rounded-full border-4 border-green-500/40 border-t-green-400 animate-spin" />
                </div>
              </div>
            </MobileSection>
          </div>
        </div>
      </div>
    );
  }

  if (notFound || !sheet) {
    return (
      <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
        <div className="py-4">
          <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48 max-w-3xl mx-auto">
            <MobileSection>
              <div className="text-center py-12">
                <PageTitle>Bando Não Encontrado</PageTitle>
                <MobileText className="mt-4 text-gray-400">
                  O bando compartilhado não existe ou foi excluído.
                </MobileText>
              </div>
            </MobileSection>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <MobileSection>
            <PageTitle>Bando de {sheet.ownerName}</PageTitle>
            <MobileText className="text-green-400 text-sm mb-4">
              📎 Visualização Compartilhada (Somente Leitura)
            </MobileText>

            {/* Exportar PDF */}
            {(() => {
              const handleExportPdf = () => {
                try {
                  const safe = (v: any): string =>
                    v === null || v === undefined ? "" : String(v);

                  const parseNumeric = (v: any): number => {
                    if (typeof v === "number") return v;
                    const s = v == null ? "" : String(v);
                    const m = s.match(/-?\d+/);
                    return m ? parseInt(m[0], 10) : 0;
                  };

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

                  const buildUnitHtml = (u: Unit): string => {
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

                    // Extrai special rules antes para poder usar no cálculo de movimento
                    const specialRules = Array.isArray(
                      (fig as any).specialRules
                    )
                      ? ((fig as any).specialRules as any[])
                          .map((r: any) => ({
                            name: r?.name || "",
                            description: r?.description || "",
                          }))
                          .filter((r) => r.name)
                      : [];

                    // Calcula armadura total incluindo bônus de equipamentos
                    let armourTotal = stats?.armour || 0;
                    let moveTotal = stats?.move || 0;
                    if (equipedFull && equipedFull.length > 0) {
                      let equipmentArmorBonus = 0;
                      let equipmentMovementPenalty = 0;

                      // Verifica se a figura tem a regra especial "Devagar e Sempre" ou "Crueldade Paciente"
                      const hasIgnoreMovementPenalty = specialRules.some(
                        (rule: any) =>
                          rule?.name === "Devagar e Sempre" ||
                          rule?.name === "Crueldade Paciente"
                      );

                      for (const equip of equipedFull) {
                        equipmentArmorBonus += parseNumeric(equip.armorBonus);
                        // Apenas aplica penalidade se não tiver a regra especial
                        if (!hasIgnoreMovementPenalty) {
                          equipmentMovementPenalty += parseNumeric(
                            equip.movePenalty
                          );
                        }
                      }
                      armourTotal = Math.min(
                        armourTotal + equipmentArmorBonus,
                        17
                      );
                      moveTotal = Math.max(
                        moveTotal + equipmentMovementPenalty,
                        0
                      );
                    }
                    const finalStats = {
                      ...stats,
                      armour: armourTotal,
                      move: moveTotal,
                    };

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
                            )}</div>
                          </div>
                          <div class="right-info">
                            <div><strong>Facção:</strong> ${safe(
                              sheet.faction
                            )}</div>
                            <div><strong>Custo:</strong> ${safe(
                              finalStats?.cost
                            )}</div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col">
                            <div class="section-title">Atributos</div>
                            <table class="table">
                              <tr><td>Movimento</td><td>${safe(
                                finalStats?.move
                              )}</td></tr>
                              <tr><td>Ímpeto</td><td>${safe(
                                finalStats?.fight
                              )}</td></tr>
                              <tr><td>Precisão</td><td>${safe(
                                finalStats?.shoot
                              )}</td></tr>
                              <tr><td>Armadura</td><td>${safe(
                                finalStats?.armour
                              )}</td></tr>
                              <tr><td>Vontade</td><td>${safe(
                                finalStats?.Vontade
                              )}</td></tr>
                              <tr><td>Vigor</td><td>${safe(
                                finalStats?.health
                              )}</td></tr>
                              ${
                                finalStats?.strength !== undefined
                                  ? `<tr><td>Força</td><td>${safe(
                                      finalStats?.strength
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
                    (sheet.units || []).forEach((u: Unit) => {
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
                    .map((u: Unit) => buildUnitHtml(u))
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

              return (
                <div className="mt-4 mb-4 flex gap-3">
                  <button
                    onClick={handleExportPdf}
                    className="px-4 py-2 rounded bg-green-900/20 border border-green-500/40 hover:bg-green-800/30 hover:border-green-400/60 text-white transition-colors duration-200 font-semibold"
                  >
                    📄 Exportar PDF (Printer-friendly)
                  </button>
                </div>
              );
            })()}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <label className="flex flex-col gap-2">
                <span className="text-sm text-gray-300">Nome do Bando</span>
                <input
                  className="bg-[#1f1f1f] border border-gray-600 rounded px-3 py-2 text-white opacity-90"
                  value={sheet.name}
                  readOnly
                  disabled
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
                    className="bg-[#1f1f1f] border border-gray-600 rounded px-3 py-2 text-white opacity-90"
                    value={sheet.gold}
                    readOnly
                    disabled
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-sm text-gray-300">Pedra-Bruxa</span>
                  <input
                    className="bg-[#1f1f1f] border border-gray-600 rounded px-3 py-2 text-white opacity-90"
                    value={sheet.wyrdstone}
                    readOnly
                    disabled
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
                className="bg-[#1f1f1f] border border-gray-600 rounded px-3 py-2 text-white min-h-[100px] opacity-90"
                value={sheet.notes}
                readOnly
                disabled
                placeholder="Notas gerais do bando, progresso da campanha etc."
              />
            </label>

            <div className="mt-8">
              <HeaderH1>Figuras</HeaderH1>
              <MobileText className="text-sm text-gray-400 mb-3">
                Visualização somente leitura das figuras do bando.
              </MobileText>

              {(() => {
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
                  return 6;
                };

                const sortUnits = (units: Unit[]) => {
                  return [...units].sort((a, b) => {
                    const roleA = a.role || a?.figure?.role || "";
                    const roleB = b.role || b?.figure?.role || "";
                    const orderA = getRoleOrder(roleA);
                    const orderB = getRoleOrder(roleB);

                    if (orderA !== orderB) {
                      return orderA - orderB;
                    }

                    const nameA = (a.name || "").toString();
                    const nameB = (b.name || "").toString();
                    return nameA.localeCompare(nameB);
                  });
                };

                const active = sortUnits(
                  sheet.units.filter(
                    (u: any) => !Boolean((u as Unit)?.figure?.inactive)
                  )
                );

                return (
                  <div className="space-y-6">
                    {active.map((u: Unit) => {
                      const fig = u.figure || {};
                      const isInactive = Boolean(fig.inactive);
                      const narrativeName = fig?.narrativeName || "";
                      const roleStr = (fig?.role || "")
                        .toString()
                        .toLowerCase();
                      const isLenda = roleStr.includes("lenda");
                      const isHero =
                        roleStr.includes("hero") || roleStr.includes("heroi");
                      const isLider =
                        roleStr.includes("lider") || roleStr.includes("líder");
                      const showXP = !isLenda && !(fig as any)?.noXP;

                      const isCollapsed = collapsedUnits[u.id] ?? false;
                      return (
                        <div
                          key={u.id}
                          className={
                            "mb-4 border border-gray-700 rounded-lg overflow-hidden bg-[#1a1a1a] text-white " +
                            (isInactive ? " opacity-60 grayscale" : "")
                          }
                        >
                          <div className="w-full p-6 pt-8">
                            <div
                              className="flex items-center justify-between cursor-pointer hover:bg-[#252525] transition-colors p-2 rounded"
                              onClick={() =>
                                setCollapsedUnits({
                                  ...collapsedUnits,
                                  [u.id]: !isCollapsed,
                                })
                              }
                            >
                              <h3
                                className="text-2xl font-bold text-center mt-4 flex-1"
                                style={{
                                  fontFamily: '"Cinzel", serif',
                                  color: "#8fbc8f",
                                }}
                              >
                                {isLenda
                                  ? u.name
                                  : narrativeName
                                  ? `${narrativeName}, ${u.name}`
                                  : u.name}
                              </h3>
                              <button
                                className="text-white text-2xl transition-transform"
                                style={{
                                  transform: isCollapsed
                                    ? "rotate(0deg)"
                                    : "rotate(180deg)",
                                }}
                              >
                                ▼
                              </button>
                            </div>
                            {u.role && (isHero || isLider) && (
                              <div className="flex justify-center items-center gap-3 mt-3 flex-wrap">
                                <span className="bg-gray-600 text-white px-2 py-1 rounded text-sm">
                                  {u.role}
                                </span>
                                {u.stats?.cost && (
                                  <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">
                                    {u.stats.cost}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>

                          {!isCollapsed && (
                            <div className="px-6 pb-6">
                              {/* Avanços */}
                              {showXP &&
                                fig.advancements &&
                                Array.isArray(fig.advancements) &&
                                fig.advancements.length > 0 &&
                                (() => {
                                  const isAdvCollapsed =
                                    collapsedAdvancements[u.id] ?? true;
                                  return (
                                    <div className="mb-6">
                                      <div
                                        className="flex items-center justify-between cursor-pointer hover:bg-[#252525] transition-colors p-2 rounded"
                                        onClick={() =>
                                          setCollapsedAdvancements({
                                            ...collapsedAdvancements,
                                            [u.id]: !isAdvCollapsed,
                                          })
                                        }
                                      >
                                        <h4
                                          className="text-lg font-bold"
                                          style={{ color: "#8fbc8f" }}
                                        >
                                          AVANÇOS
                                        </h4>
                                        <button
                                          className="text-white text-lg transition-transform"
                                          style={{
                                            transform: isAdvCollapsed
                                              ? "rotate(0deg)"
                                              : "rotate(180deg)",
                                          }}
                                        >
                                          ▼
                                        </button>
                                      </div>
                                      {!isAdvCollapsed && (
                                        <div className="mt-3 space-y-3">
                                          {fig.advancements.map((a, idx) => {
                                            const advDesc: Record<
                                              string,
                                              string
                                            > = {
                                              "Nova Habilidade":
                                                "Aprenda uma nova habilidade dentre as listas de habilidades da figura. Adicione a habilidade na ficha da figura.",
                                              "Nova Magia":
                                                "Esse avanço pode ser ganho no lugar de 'Aprender nova Habilidade' para figuras capazes de conjurar magias ou orações. Adicione uma nova magia da tradição indicada na ficha da figura ou da tradição Magia Menor.",
                                              "Fortalecer Magia":
                                                "Esse avanço pode ser ganho no lugar de 'Aprender nova Habilidade' para figuras capazes de conjurar magias ou orações. Escolha uma magia que a figura sabe. Aquela magia tem sua Classe de Dificuldade diminuída em 1.",
                                              "+1 Ímpeto":
                                                "Aumente seu atributo de Ímpeto em +1. Note que cada raça tem limites de aumento de atributo que devem ser respeitados.",
                                              "+1 Precisão":
                                                "Aumente seu atributo de Precisão em +1. Note que cada raça tem limites de aumento de atributo que devem ser respeitados.",
                                              "+1 Armadura":
                                                "Aumente seu atributo de Armadura em +1. Note que cada raça tem limites de aumento de atributo que devem ser respeitados.",
                                              "+2 Vida":
                                                "Aumente seu atributo de Vida em +2. Note que cada raça tem limites de aumento de atributo que devem ser respeitados.",
                                              "+2 Movimento":
                                                "Aumente seu atributo de Movimento em +2. Note que cada raça tem limites de aumento de atributo que devem ser respeitados.",
                                              "+1 Vontade":
                                                "Aumente seu atributo de Vontade em +1. Note que cada raça tem limites de aumento de atributo que devem ser respeitados.",
                                              "+1 Força":
                                                "Aumente seu atributo de Força em +1. Note que cada raça tem limites de aumento de atributo que devem ser respeitados.",
                                              "O Moleque Tem Talento!":
                                                "O soldado se torna um herói! Ele continua usando sua mesma ficha e continua sendo o que era antes (um Barba Curta continua sendo um Barba Curta) e mantém seu nível, mas agora pode fazer todas as atividades que um herói pode e ganha experiência e sobe de nível como herói. Escolha duas listas de habilidades entre as que heróis do bando têm acesso e ganhe acesso a elas.",
                                            };
                                            const advName =
                                              typeof a === "string"
                                                ? a
                                                : a.name || "";
                                            const desc = advDesc[advName] || "";
                                            return (
                                              <div
                                                key={idx}
                                                className="relative bg-[#2a2a2a] rounded p-3 border border-gray-700"
                                              >
                                                <div className="text-white font-semibold">
                                                  {advName}
                                                </div>
                                                {desc && (
                                                  <div className="text-sm text-gray-300 mt-1">
                                                    {desc}
                                                  </div>
                                                )}
                                              </div>
                                            );
                                          })}
                                        </div>
                                      )}
                                    </div>
                                  );
                                })()}

                              {/* Ferimentos */}
                              {(isHero || isLider || isLenda) &&
                                fig.injuries &&
                                Array.isArray(fig.injuries) &&
                                fig.injuries.length > 0 &&
                                (() => {
                                  const isInjCollapsed =
                                    collapsedInjuries[u.id] ?? true;
                                  return (
                                    <div className="mb-6">
                                      <div
                                        className="flex items-center justify-between cursor-pointer hover:bg-[#252525] transition-colors p-2 rounded"
                                        onClick={() =>
                                          setCollapsedInjuries({
                                            ...collapsedInjuries,
                                            [u.id]: !isInjCollapsed,
                                          })
                                        }
                                      >
                                        <h4
                                          className="text-lg font-bold"
                                          style={{ color: "#8fbc8f" }}
                                        >
                                          FERIMENTOS
                                        </h4>
                                        <button
                                          className="text-white text-lg transition-transform"
                                          style={{
                                            transform: isInjCollapsed
                                              ? "rotate(0deg)"
                                              : "rotate(180deg)",
                                          }}
                                        >
                                          ▼
                                        </button>
                                      </div>
                                      {!isInjCollapsed && (
                                        <div className="mt-3 space-y-3">
                                          {fig.injuries.map(
                                            (injuryName, idx) => {
                                              const descMap: Record<
                                                string,
                                                string
                                              > = {
                                                "Ferimento na Perna":
                                                  "-2 permanentes em Movimento.",
                                                "Ombro Deslocado":
                                                  "Perde o Próximo Jogo se recuperando.",
                                                "Antebraço Esmagado":
                                                  "Braço Amputado. Só pode usar uma arma por vez e sem a característica Duas Mãos.",
                                                "Insanidade(Estupidez)":
                                                  "O Personagem ganha a característica Estupidez.",
                                                "Insanidade(Fúria)":
                                                  "O Personagem ganha a característica Fúria.",
                                                "Perna Deslocada":
                                                  "Perde o próximo jogo se recuperando.",
                                                "Fratura Exposta na Perna":
                                                  "Não pode mais usar a ação de disparada e a ação de carga não dobra mais o movimento.",
                                                "Costelas Quebradas":
                                                  "-4 permanentes em Vida.",
                                                "Cego de Um Olho":
                                                  "-2 permanentes em Precisão. Se rolar de novo, é removido do bando.",
                                                "Ferimento Infectado":
                                                  "Rola um d20 antes de cada partida. Em um resultado de 1-5, não pode participar aquela partida.",
                                                Trauma:
                                                  "-1 permanente em Vontade.",
                                                "Mão Esmigalhada":
                                                  "-1 permanente em Ímpeto.",
                                                "Ferimento Profundo":
                                                  "Perde os próximos 3 jogos se recuperando. Não pode fazer atividades na fase de campanha enquanto se recupera.",
                                              };
                                              const injName =
                                                typeof injuryName === "string"
                                                  ? injuryName
                                                  : injuryName.name || "";
                                              let desc = descMap[injName] || "";
                                              if (!desc) {
                                                const paren =
                                                  injName.match(/\(([^)]+)\)/);
                                                if (paren && paren[1])
                                                  desc = paren[1];
                                              }
                                              return (
                                                <div
                                                  key={idx}
                                                  className="relative bg-[#2a2a2a] rounded p-3 border border-gray-700"
                                                >
                                                  <div className="text-white font-semibold">
                                                    {injName}
                                                  </div>
                                                  {desc && (
                                                    <div className="text-sm text-gray-300 mt-1">
                                                      {desc}
                                                    </div>
                                                  )}
                                                </div>
                                              );
                                            }
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  );
                                })()}

                              {/* Content */}
                              <div className="pt-6 border-t border-gray-600">
                                {/* XP */}
                                {showXP && (
                                  <div className="mb-6">
                                    <h4
                                      className="text-lg font-bold mb-3"
                                      style={{ color: "#8fbc8f" }}
                                    >
                                      EXPERIÊNCIA
                                    </h4>
                                    {isHero || isLider ? (
                                      <div className="bg-[#2a2a2a] p-4 rounded">
                                        <div className="text-center text-3xl font-bold text-white">
                                          {fig.xp || 0}
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="bg-[#2a2a2a] p-4 rounded">
                                        <div className="text-center text-2xl font-bold text-white">
                                          {fig.xp || 0}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                )}

                                {/* Stats */}
                                <div className="mb-6">
                                  <h4
                                    className="text-lg font-bold mb-3"
                                    style={{ color: "#8fbc8f" }}
                                  >
                                    ATRIBUTOS
                                  </h4>
                                  <div className="bg-[#2a2a2a] p-4 rounded space-y-2">
                                    {[
                                      { key: "move", label: "Movimento" },
                                      { key: "fight", label: "Ímpeto" },
                                      { key: "shoot", label: "Precisão" },
                                      { key: "armour", label: "Armadura" },
                                      { key: "Vontade", label: "Vontade" },
                                      { key: "health", label: "Vigor" },
                                      { key: "strength", label: "Força" },
                                    ].map(({ key, label }) => {
                                      if (
                                        key === "strength" &&
                                        (fig.baseStats?.strength ===
                                          undefined ||
                                          fig.baseStats?.strength === null)
                                      )
                                        return null;
                                      const total = getTotalStat(
                                        u,
                                        key as keyof Figure["baseStats"]
                                      );
                                      const showPlus =
                                        key === "fight" ||
                                        key === "shoot" ||
                                        key === "Vontade";
                                      return (
                                        <div
                                          key={key}
                                          className="flex items-center justify-between py-2 border-b border-gray-600 last:border-b-0"
                                        >
                                          <span className="text-gray-300 font-semibold">
                                            {label}
                                          </span>
                                          <span className="text-lg font-bold">
                                            {showPlus && total >= 0
                                              ? `+${total}`
                                              : `${total}`}
                                          </span>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>

                                {/* Skills */}
                                {fig.role !== "Soldado" &&
                                  fig.skills &&
                                  Array.isArray(fig.skills) &&
                                  fig.skills.length > 0 && (
                                    <div className="mb-6">
                                      <h4
                                        className="text-lg font-bold mb-3"
                                        style={{ color: "#8fbc8f" }}
                                      >
                                        HABILIDADES
                                      </h4>
                                      <div className="space-y-3">
                                        {fig.skills.map((skill, idx) => {
                                          const skillObj: any =
                                            typeof skill === "string"
                                              ? { name: skill }
                                              : skill;
                                          return (
                                            <div key={idx}>
                                              <SkillCard
                                                name={skillObj.name || ""}
                                                description={
                                                  skillObj.description || ""
                                                }
                                                footer={undefined}
                                              />
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  )}

                                {/* Spells */}
                                {fig.role !== "Soldado" &&
                                  fig.spells &&
                                  Array.isArray(fig.spells) &&
                                  fig.spells.length > 0 && (
                                    <div className="mb-6">
                                      <h4
                                        className="text-lg font-bold mb-3"
                                        style={{ color: "#8fbc8f" }}
                                      >
                                        MAGIAS
                                      </h4>
                                      <div className="space-y-3">
                                        {fig.spells.map((spell, idx) => {
                                          const spellObj: any =
                                            typeof spell === "string"
                                              ? { name: spell }
                                              : spell;
                                          return (
                                            <div key={idx}>
                                              <LoreSpellCard
                                                name={spellObj.name || ""}
                                                castingNumber={
                                                  spellObj.castingNumber ||
                                                  spellObj.cn ||
                                                  0
                                                }
                                                keywords={
                                                  spellObj.keywords || []
                                                }
                                                effect={spellObj.effect || ""}
                                                footer={undefined}
                                              />
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  )}

                                {/* Special Abilities */}
                                {fig.role !== "Soldado" &&
                                  fig.role !== "Lenda" &&
                                  [
                                    ...(Array.isArray(fig.nurgleBlessings)
                                      ? fig.nurgleBlessings
                                      : []),
                                    ...(Array.isArray(fig.mutations)
                                      ? fig.mutations
                                      : []),
                                    ...(Array.isArray(fig.sacredMarks)
                                      ? fig.sacredMarks
                                      : []),
                                  ].length > 0 && (
                                    <div className="mb-6">
                                      <h4
                                        className="text-lg font-bold mb-3"
                                        style={{ color: "#8fbc8f" }}
                                      >
                                        HABILIDADES ESPECIAIS
                                      </h4>
                                      <div className="space-y-4">
                                        {[
                                          {
                                            key: "nurgleBlessings",
                                            label: "Bênçãos de Nurgle",
                                          },
                                          {
                                            key: "mutations",
                                            label: "Mutações",
                                          },
                                          {
                                            key: "sacredMarks",
                                            label: "Marcas Sagradas",
                                          },
                                        ].map(({ key, label }) => {
                                          const list = (fig as any)[key] || [];
                                          if (!list.length) return null;
                                          return (
                                            <div key={key}>
                                              <div className="text-sm text-gray-300 mb-2">
                                                {label}
                                              </div>
                                              <div className="space-y-3">
                                                {list.map(
                                                  (it: any, idx: number) => {
                                                    const abName =
                                                      typeof it === "string"
                                                        ? it
                                                        : it?.name || "";
                                                    const abDesc =
                                                      typeof it === "string"
                                                        ? ""
                                                        : it?.description || "";
                                                    return (
                                                      <div
                                                        key={idx}
                                                        className="bg-[#2a2a2a] rounded p-3 border border-gray-700"
                                                      >
                                                        <div className="text-white font-semibold">
                                                          {abName}
                                                        </div>
                                                        {abDesc && (
                                                          <div className="text-sm text-gray-300 mt-1">
                                                            {abDesc}
                                                          </div>
                                                        )}
                                                      </div>
                                                    );
                                                  }
                                                )}
                                              </div>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  )}

                                {/* Equipment */}
                                {(fig.equipmentSlots ?? 0) > 0 &&
                                  fig.equiped &&
                                  Array.isArray(fig.equiped) &&
                                  fig.equiped.length > 0 && (
                                    <div className="mb-6">
                                      <h4
                                        className="text-lg font-bold mb-3"
                                        style={{ color: "#8fbc8f" }}
                                      >
                                        EQUIPAMENTOS
                                      </h4>
                                      <div className="bg-[#2a2a2a] p-4 rounded">
                                        <div className="space-y-2">
                                          {fig.equiped.map((eq, idx) => {
                                            const eqObj =
                                              typeof eq === "string"
                                                ? { name: eq }
                                                : eq;
                                            const eqName = eqObj?.name || "";
                                            const eqMod =
                                              typeof eq === "object" &&
                                              eq?.modifier?.name
                                                ? ` ${eq.modifier.name}`
                                                : "";
                                            return (
                                              <div
                                                key={idx}
                                                className="flex items-center justify-between py-2 border-b border-gray-600 last:border-b-0"
                                              >
                                                <button
                                                  type="button"
                                                  onClick={() =>
                                                    openPreview(eqObj)
                                                  }
                                                  className="text-white hover:text-green-300 transition-colors cursor-pointer"
                                                >
                                                  {eqName}
                                                  {eqMod}
                                                </button>
                                              </div>
                                            );
                                          })}
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                {/* Special Rules */}
                                {(u.abilities?.length > 0 ||
                                  (Array.isArray((fig as any)?.specialRules) &&
                                    (fig as any).specialRules.length > 0)) && (
                                  <div className="mb-6">
                                    <h4
                                      className="text-lg font-bold mb-3"
                                      style={{ color: "#8fbc8f" }}
                                    >
                                      REGRAS ESPECIAIS
                                    </h4>
                                    <div className="bg-[#2a2a2a] p-4 rounded space-y-3">
                                      {u.abilities && u.abilities.length > 0
                                        ? u.abilities.map((ability, index) => (
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
                                        : (
                                            (fig as any).specialRules as any[]
                                          ).map((r, idx) => (
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
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </div>
          </MobileSection>
        </div>
      </div>

      {/* Modal de preview de equipamento */}
      {previewOpen && previewData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="max-w-xl w-full relative">
            <button
              type="button"
              className="absolute -top-2 -right-2 bg-gray-800 text-white rounded-full w-9 h-9 border border-gray-600 hover:bg-gray-700"
              onClick={() => setPreviewOpen(false)}
              aria-label="Fechar"
            >
              ✕
            </button>
            <EquipmentCard {...previewData} />
          </div>
        </div>
      )}
    </div>
  );
}

export default SharedWarbandPage;
