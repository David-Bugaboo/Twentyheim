import jsPDF from "jspdf";
import type { Warband } from "../../../../types/warband.entity";
import type { WarbandSoldier } from "../../../../types/warband-soldier.entity";
import type { BaseFigure } from "../../../../types/base-figure.entity";
import type { Faction } from "../../../../types/faction.entity";
import { formatDate, normalizeString } from "./helpers";
import { parseSpecialRules } from "./helpers";

type SoldierDataForPDF = {
  soldier: WarbandSoldier;
  baseFigure: BaseFigure | null;
  relations: {
    equipment: Array<{
      id?: string;
      equipment?: {
        name?: string;
        category?: string;
        description?: unknown;
        specialRules?: unknown;
      };
      equipmentSlug?: string;
      mainHandEquiped?: boolean;
      offHandEquiped?: boolean;
      armorEquiped?: boolean;
      helmetEquiped?: boolean;
      twoHandedEquiped?: boolean;
      modifier?: { name?: string };
      compatible?: boolean;
    }>;
    skills: Array<{
      id?: string;
      skill?: { name?: string; description?: string };
      skillSlug?: string;
    }>;
    spells: Array<{
      id?: string;
      spell?: {
        name?: string;
        description?: string;
        difficultyClass?: number | null;
        keywords?: string[] | null;
      };
      spellSlug?: string;
    }>;
    advancements: Array<{
      id?: string;
      advancement?: { name?: string; description?: string };
      advancementSlug?: string;
    }>;
    injuries: Array<{
      id?: string;
      injury?: { name?: string; description?: string };
      injurySlug?: string;
    }>;
    supernatural: Array<{
      id?: string;
      superNaturalAbility?: {
        name?: string;
        description?: string;
        category?: string;
      };
      superNaturalAbilitySlug?: string;
    }>;
  };
};

const safeString = (value: unknown): string => {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  if (Array.isArray(value)) return value.map(String).join(", ");
  return String(value);
};

const formatDescription = (desc: unknown): string => {
  if (!desc) return "";
  if (typeof desc === "string") return desc;
  if (Array.isArray(desc)) {
    return desc
      .map(item => {
        if (typeof item === "string") return item;
        return String(item);
      })
      .join("\n");
  }
  return String(desc);
};

export const exportWarbandToPDF = async (
  warband: Warband,
  _faction: Faction | null,
  soldiersData: SoldierDataForPDF[]
): Promise<void> => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - 2 * margin;
  let yPos = margin;

  const addPageIfNeeded = (requiredHeight: number) => {
    if (yPos + requiredHeight > pageHeight - margin) {
      doc.addPage();
      yPos = margin;
      return true;
    }
    return false;
  };

  const addSection = (title: string, content: () => void): void => {
    addPageIfNeeded(10);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text(title, margin, yPos);
    yPos += 5;
    doc.setFont("helvetica", "normal");
    content();
    yPos += 3;
  };

  const drawSeparator = (): void => {
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.3);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 5;
  };

  // Nome do bando (simples, sem quebrar página)
  if (warband.name) {
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(warband.name, margin, yPos);
    yPos += 8;
  }

  // Para cada figura
  for (let i = 0; i < soldiersData.length; i++) {
    const soldierData = soldiersData[i];
    const { soldier, baseFigure, relations } = soldierData;

    // Linha separadora entre figuras (exceto na primeira)
    if (i > 0) {
      addPageIfNeeded(10);
      drawSeparator();
    }

    addPageIfNeeded(30);

    const figureName = soldier.campaignName?.trim()
      ? `${soldier.campaignName}, ${baseFigure?.name ?? "Figura"}`
      : (baseFigure?.name ?? "Figura");

    // Cabeçalho da figura
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(figureName, margin, yPos);
    yPos += 6;
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");

    const infoLines: string[] = [];
    if (baseFigure?.role) infoLines.push(`Papel: ${baseFigure.role}`);
    if (baseFigure?.quality) infoLines.push(`Qualidade: ${baseFigure.quality}`);
    if (baseFigure?.upkeep) {
      const upkeep =
        typeof baseFigure.upkeep === "number"
          ? baseFigure.upkeep
          : typeof baseFigure.upkeep === "string"
            ? parseFloat((baseFigure.upkeep as string).replace(",", ".")) || 0
            : 0;
      infoLines.push(`Manutenção: ${upkeep}`);
    }
    infoLines.push(`Adicionado em: ${formatDate(soldier.createdAt)}`);

    infoLines.forEach(line => {
      doc.text(line, margin, yPos);
      yPos += 4;
    });

    yPos += 3;

    // Atributos
    if (baseFigure) {
      addSection("Atributos", () => {
        doc.setFontSize(9);
        const attributes = [
          { key: "movement", label: "Movimento", value: baseFigure.movement },
          { key: "fight", label: "Ímpeto", value: baseFigure.fight },
          { key: "shoot", label: "Precisão", value: baseFigure.shoot },
          { key: "armour", label: "Armadura", value: baseFigure.armour },
          { key: "strength", label: "Força", value: baseFigure.strength },
          { key: "will", label: "Vontade", value: baseFigure.will },
          { key: "health", label: "Vida", value: baseFigure.health },
        ];

        let xOffset = margin;
        let rowY = yPos;
        attributes.forEach(attr => {
          if (xOffset + 30 > pageWidth - margin) {
            xOffset = margin;
            rowY += 5;
            addPageIfNeeded(5);
          }
          doc.text(`${attr.label}: ${safeString(attr.value)}`, xOffset, rowY);
          xOffset += 30;
        });
        yPos = rowY + 5;
      });
    }

    // Experiência e Avanços
    if (soldier.experience !== null && soldier.experience !== undefined) {
      addSection("Experiência & Avanços", () => {
        doc.setFontSize(9);
        doc.text(
          `Experiência Atual: ${safeString(soldier.experience)}`,
          margin,
          yPos
        );
        yPos += 4;
        if (baseFigure?.startingXp) {
          doc.text(
            `XP Inicial: ${safeString(baseFigure.startingXp)}`,
            margin,
            yPos
          );
          yPos += 4;
        }
        doc.text(
          `Avanços Registrados: ${relations.advancements.length}`,
          margin,
          yPos
        );
        yPos += 5;

        if (relations.advancements.length > 0) {
          doc.setFont("helvetica", "bold");
          doc.text("Avanços:", margin, yPos);
          yPos += 4;
          doc.setFont("helvetica", "normal");
          relations.advancements.forEach(adv => {
            const name =
              adv.advancement?.name ?? adv.advancementSlug ?? "Avanço";
            doc.text(`• ${name}`, margin + 3, yPos);
            yPos += 4;
            if (adv.advancement?.description) {
              const descLines = doc.splitTextToSize(
                formatDescription(adv.advancement.description),
                contentWidth - 6
              );
              descLines.forEach((line: string) => {
                doc.text(line, margin + 6, yPos);
                yPos += 3.5;
              });
            }
            addPageIfNeeded(10);
          });
        }
      });
    }

    // Equipamentos Equipados
    const equippedItems = relations.equipment.filter(
      item =>
        item.mainHandEquiped ||
        item.offHandEquiped ||
        item.armorEquiped ||
        item.helmetEquiped ||
        item.twoHandedEquiped
    );

    if (equippedItems.length > 0) {
      addSection("Itens Equipados", () => {
        doc.setFontSize(9);
        equippedItems.forEach((item, index) => {
          if (index > 0) {
            yPos += 2;
          }
          const itemName = item.equipment?.name ?? item.equipmentSlug ?? "Item";
          const slots: string[] = [];
          if (item.mainHandEquiped) slots.push("Mão Principal");
          if (item.offHandEquiped) slots.push("Mão Secundária");
          if (item.armorEquiped) slots.push("Armadura");
          if (item.helmetEquiped) slots.push("Elmo");
          if (item.twoHandedEquiped) slots.push("Duas Mãos");

          doc.setFont("helvetica", "bold");
          doc.text(`• ${itemName}`, margin, yPos);
          yPos += 4;
          doc.setFont("helvetica", "normal");

          if (item.equipment?.category) {
            doc.text(`Categoria: ${item.equipment.category}`, margin + 3, yPos);
            yPos += 3.5;
          }
          doc.text(`Slots: ${slots.join(", ")}`, margin + 3, yPos);
          yPos += 3.5;
          if (item.modifier?.name) {
            doc.text(`Modificador: +${item.modifier.name}`, margin + 3, yPos);
            yPos += 3.5;
          }
          if (item.equipment?.description) {
            const descLines = doc.splitTextToSize(
              formatDescription(item.equipment.description),
              contentWidth - 6
            );
            descLines.forEach((line: string) => {
              doc.text(line, margin + 3, yPos);
              yPos += 3.5;
            });
          }
          if (item.equipment?.specialRules) {
            const rules = parseSpecialRules(item.equipment.specialRules);
            if (rules.length > 0) {
              doc.setFont("helvetica", "bold");
              doc.text(`Regras Especiais:`, margin + 3, yPos);
              yPos += 3.5;
              doc.setFont("helvetica", "normal");
              rules.forEach(rule => {
                doc.text(`${rule.label}: ${rule.value}`, margin + 6, yPos);
                yPos += 3.5;
              });
            }
          }
          addPageIfNeeded(20);
        });
      });
    }

    // Inventário (itens desequipados)
    const unequippedItems = relations.equipment.filter(
      item =>
        !item.mainHandEquiped &&
        !item.offHandEquiped &&
        !item.armorEquiped &&
        !item.helmetEquiped &&
        !item.twoHandedEquiped
    );

    if (unequippedItems.length > 0) {
      addSection("Inventário", () => {
        doc.setFontSize(9);
        unequippedItems.forEach((item, index) => {
          if (index > 0) {
            yPos += 2;
          }
          const itemName = item.equipment?.name ?? item.equipmentSlug ?? "Item";
          doc.setFont("helvetica", "bold");
          doc.text(`• ${itemName}`, margin, yPos);
          yPos += 4;
          doc.setFont("helvetica", "normal");

          if (item.equipment?.category) {
            doc.text(`Categoria: ${item.equipment.category}`, margin + 3, yPos);
            yPos += 3.5;
          }
          doc.text(
            `Compatível: ${item.compatible ? "Sim" : "Não"}`,
            margin + 3,
            yPos
          );
          yPos += 3.5;
          if (item.modifier?.name) {
            doc.text(`Modificador: +${item.modifier.name}`, margin + 3, yPos);
            yPos += 3.5;
          }
          if (item.equipment?.description) {
            const descLines = doc.splitTextToSize(
              formatDescription(item.equipment.description),
              contentWidth - 6
            );
            descLines.forEach((line: string) => {
              doc.text(line, margin + 3, yPos);
              yPos += 3.5;
            });
          }
          if (item.equipment?.specialRules) {
            const rules = parseSpecialRules(item.equipment.specialRules);
            if (rules.length > 0) {
              doc.setFont("helvetica", "bold");
              doc.text(`Regras Especiais:`, margin + 3, yPos);
              yPos += 3.5;
              doc.setFont("helvetica", "normal");
              rules.forEach(rule => {
                doc.text(`${rule.label}: ${rule.value}`, margin + 6, yPos);
                yPos += 3.5;
              });
            }
          }
          addPageIfNeeded(20);
        });
      });
    }

    // Habilidades
    if (relations.skills.length > 0) {
      addSection("Habilidades", () => {
        doc.setFontSize(9);
        relations.skills.forEach((skill, index) => {
          if (index > 0) {
            yPos += 2;
          }
          const name = skill.skill?.name ?? skill.skillSlug ?? "Habilidade";
          doc.setFont("helvetica", "bold");
          doc.text(`• ${name}`, margin, yPos);
          yPos += 4;
          doc.setFont("helvetica", "normal");
          if (skill.skill?.description) {
            const descLines = doc.splitTextToSize(
              formatDescription(skill.skill.description),
              contentWidth - 6
            );
            descLines.forEach((line: string) => {
              doc.text(line, margin + 3, yPos);
              yPos += 3.5;
            });
          }
          addPageIfNeeded(15);
        });
      });
    }

    // Magias
    if (relations.spells.length > 0) {
      addSection("Magias", () => {
        doc.setFontSize(9);
        relations.spells.forEach((spell, index) => {
          if (index > 0) {
            yPos += 2;
          }
          const name = spell.spell?.name ?? spell.spellSlug ?? "Magia";
          doc.setFont("helvetica", "bold");
          doc.text(`• ${name}`, margin, yPos);
          yPos += 4;
          doc.setFont("helvetica", "normal");
          if (spell.spell?.description) {
            const descLines = doc.splitTextToSize(
              formatDescription(spell.spell.description),
              contentWidth - 6
            );
            descLines.forEach((line: string) => {
              doc.text(line, margin + 3, yPos);
              yPos += 3.5;
            });
          }
          if (
            spell.spell?.difficultyClass !== null &&
            spell.spell?.difficultyClass !== undefined
          ) {
            doc.text(
              `Dificuldade: ${spell.spell.difficultyClass}`,
              margin + 3,
              yPos
            );
            yPos += 3.5;
          }
          if (spell.spell?.keywords && spell.spell.keywords.length > 0) {
            doc.text(
              `Palavras-chave: ${spell.spell.keywords.join(", ")}`,
              margin + 3,
              yPos
            );
            yPos += 3.5;
          }
          addPageIfNeeded(15);
        });
      });
    }

    // Ferimentos
    if (relations.injuries.length > 0) {
      addSection("Ferimentos", () => {
        doc.setFontSize(9);
        relations.injuries.forEach((injury, index) => {
          if (index > 0) {
            yPos += 2;
          }
          const name = injury.injury?.name ?? injury.injurySlug ?? "Ferimento";
          doc.setFont("helvetica", "bold");
          doc.text(`• ${name}`, margin, yPos);
          yPos += 4;
          doc.setFont("helvetica", "normal");
          if (injury.injury?.description) {
            const descLines = doc.splitTextToSize(
              formatDescription(injury.injury.description),
              contentWidth - 6
            );
            descLines.forEach((line: string) => {
              doc.text(line, margin + 3, yPos);
              yPos += 3.5;
            });
          }
          addPageIfNeeded(15);
        });
      });
    }

    // Mutações
    const mutations = relations.supernatural.filter(item => {
      const category = item.superNaturalAbility?.category ?? "";
      return (
        normalizeString(category).includes("mutação") ||
        normalizeString(item.superNaturalAbilitySlug ?? "").includes("mutação")
      );
    });

    if (mutations.length > 0) {
      addSection("Mutações", () => {
        doc.setFontSize(9);
        mutations.forEach((mutation, index) => {
          if (index > 0) {
            yPos += 2;
          }
          const name =
            mutation.superNaturalAbility?.name ??
            mutation.superNaturalAbilitySlug ??
            "Mutação";
          doc.setFont("helvetica", "bold");
          doc.text(`• ${name}`, margin, yPos);
          yPos += 4;
          doc.setFont("helvetica", "normal");
          if (mutation.superNaturalAbility?.description) {
            const descLines = doc.splitTextToSize(
              formatDescription(mutation.superNaturalAbility.description),
              contentWidth - 6
            );
            descLines.forEach((line: string) => {
              doc.text(line, margin + 3, yPos);
              yPos += 3.5;
            });
          }
          addPageIfNeeded(15);
        });
      });
    }

    // Bênçãos de Nurgle
    const blessings = relations.supernatural.filter(item => {
      const category = item.superNaturalAbility?.category ?? "";
      return (
        normalizeString(category).includes("benção") ||
        normalizeString(category).includes("bencao") ||
        normalizeString(item.superNaturalAbilitySlug ?? "").includes(
          "benção"
        ) ||
        normalizeString(item.superNaturalAbilitySlug ?? "").includes("bencao")
      );
    });

    if (blessings.length > 0) {
      addSection("Bênçãos de Nurgle", () => {
        doc.setFontSize(9);
        blessings.forEach((blessing, index) => {
          if (index > 0) {
            yPos += 2;
          }
          const name =
            blessing.superNaturalAbility?.name ??
            blessing.superNaturalAbilitySlug ??
            "Bênção";
          doc.setFont("helvetica", "bold");
          doc.text(`• ${name}`, margin, yPos);
          yPos += 4;
          doc.setFont("helvetica", "normal");
          if (blessing.superNaturalAbility?.description) {
            const descLines = doc.splitTextToSize(
              formatDescription(blessing.superNaturalAbility.description),
              contentWidth - 6
            );
            descLines.forEach((line: string) => {
              doc.text(line, margin + 3, yPos);
              yPos += 3.5;
            });
          }
          addPageIfNeeded(15);
        });
      });
    }

    // Marcas Sagradas
    const sacredMarks = relations.supernatural.filter(item => {
      const category = item.superNaturalAbility?.category ?? "";
      return (
        normalizeString(category).includes("marca sagrada") ||
        normalizeString(item.superNaturalAbilitySlug ?? "").includes("marca")
      );
    });

    if (sacredMarks.length > 0) {
      addSection("Marcas Sagradas", () => {
        doc.setFontSize(9);
        sacredMarks.forEach((mark, index) => {
          if (index > 0) {
            yPos += 2;
          }
          const name =
            mark.superNaturalAbility?.name ??
            mark.superNaturalAbilitySlug ??
            "Marca Sagrada";
          doc.setFont("helvetica", "bold");
          doc.text(`• ${name}`, margin, yPos);
          yPos += 4;
          doc.setFont("helvetica", "normal");
          if (mark.superNaturalAbility?.description) {
            const descLines = doc.splitTextToSize(
              formatDescription(mark.superNaturalAbility.description),
              contentWidth - 6
            );
            descLines.forEach((line: string) => {
              doc.text(line, margin + 3, yPos);
              yPos += 3.5;
            });
          }
          addPageIfNeeded(15);
        });
      });
    }

    // Regras Especiais
    const baseFigureRules = baseFigure?.specialRules
      ? parseSpecialRules(baseFigure.specialRules)
      : [];
    const soldierExtraRules = soldier.extraSpecialRules
      ? parseSpecialRules(soldier.extraSpecialRules)
      : [];
    const allRules = [...baseFigureRules, ...soldierExtraRules];

    if (allRules.length > 0) {
      addSection("Regras Especiais", () => {
        doc.setFontSize(9);
        allRules.forEach((rule, index) => {
          if (index > 0) {
            yPos += 2;
          }
          doc.setFont("helvetica", "bold");
          doc.text(`• ${rule.label}`, margin, yPos);
          yPos += 4;
          doc.setFont("helvetica", "normal");
          if (rule.value) {
            const valueLines = doc.splitTextToSize(
              formatDescription(rule.value),
              contentWidth - 6
            );
            valueLines.forEach((line: string) => {
              doc.text(line, margin + 3, yPos);
              yPos += 3.5;
            });
          }
          addPageIfNeeded(15);
        });
      });
    }

    // Notas
    if (soldier.notes) {
      addSection("Notas", () => {
        doc.setFontSize(9);
        const notesLines = doc.splitTextToSize(
          formatDescription(soldier.notes),
          contentWidth
        );
        notesLines.forEach((line: string) => {
          doc.text(line, margin, yPos);
          yPos += 3.5;
        });
      });
    }

    yPos += 5;
  }

  // Salvar PDF
  const fileName = `${warband.name?.replace(/[^a-z0-9]/gi, "_") ?? "bando"}_${new Date().toISOString().split("T")[0]}.pdf`;
  doc.save(fileName);
};
