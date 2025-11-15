import React from "react";
import { Sidebar } from "./Sidebar";
import { SoldierDetailSection } from "./SoldierDetailSection";
import type { WarbandSoldier } from "../../../../types/warband-soldier.entity";
import type { BaseFigure } from "../../../../types/base-figure.entity";
import type { EquipmentToWarbandSoldier } from "../../../../types/equipment-to-warband-soldier.entity";
import type { SkillToWarbandSoldier } from "../../../../types/skill-to-warband-soldier.entity";
import type { SpellToWarbandSoldier } from "../../../../types/spell-to-warband-soldier.entity";
import type { InjuryToWarbandSoldier } from "../../../../types/injury-to-warband-soldier.entity";
import type { SuperNaturalAbilityToWarbandSoldier } from "../../../../types/super-natural-ability-to-warband-soldier.entity";
import type { ExtraSkillListToWarbandSoldier } from "../../../../types/extra-skill-list-to-warband-soldier.entity";
import type { ExtraSpellLoreToWarbandSoldier } from "../../../../types/extra-spell-lore-to-warband-soldier.entity";
import type { AdvancementToWarbandSoldier } from "../../../../types/advancement-to-warband-soldier.entity";
import type { EquipmentToVault } from "../../../../types/equipment-to-vault.entity";

type SoldierRelations = {
  equipment: EquipmentToWarbandSoldier[];
  skills: SkillToWarbandSoldier[];
  spells: SpellToWarbandSoldier[];
  advancements: AdvancementToWarbandSoldier[];
  injuries: InjuryToWarbandSoldier[];
  supernatural: SuperNaturalAbilityToWarbandSoldier[];
};

type SoldierDetailSidebarProps = {
  open: boolean;
  onClose: () => void;
  selectedSoldier: WarbandSoldier | null;
  selectedBaseFigure: BaseFigure | null;
  factionSlug: string | null;
  relations: SoldierRelations;
  equipableVaultItems: EquipmentToVault[];
  soldierExtraSkillLists: ExtraSkillListToWarbandSoldier[];
  soldierExtraSpellLores: ExtraSpellLoreToWarbandSoldier[];
  warbandId: string | null;
  onReload: () => Promise<void>;
  heroSkillOptions: Array<{ slug: string; name: string }>;
  onPromoteHero: (soldierId: string, skillsListSlugs: string[]) => void;
  onPromoteLeader: (soldierId: string) => void;
  promoteHeroLoading: boolean;
  promoteLeaderLoading: boolean;
  hasLeaderInWarband: boolean;
  promotionRequest: {
    soldierId: string;
    type: "hero" | "leader";
  } | null;
  onClearPromotionRequest: () => void;
};

export const SoldierDetailSidebar: React.FC<SoldierDetailSidebarProps> = ({
  open,
  onClose,
  selectedSoldier,
  selectedBaseFigure,
  factionSlug,
  relations,
  equipableVaultItems,
  soldierExtraSkillLists,
  soldierExtraSpellLores,
  warbandId,
  onReload,
  heroSkillOptions,
  onPromoteHero,
  onPromoteLeader,
  promoteHeroLoading,
  promoteLeaderLoading,
  hasLeaderInWarband,
  promotionRequest,
  onClearPromotionRequest,
}) => {
  const title = selectedSoldier?.campaignName?.trim()
    ? `Detalhes — ${selectedSoldier.campaignName.trim()}`
    : selectedBaseFigure?.name
      ? `Detalhes — ${selectedBaseFigure.name}`
      : "Detalhes da Figura";

  return (
    <Sidebar open={open} onClose={onClose} title={title}>
      <SoldierDetailSection
        selectedSoldier={selectedSoldier}
        selectedBaseFigure={selectedBaseFigure}
        factionSlug={factionSlug}
        relations={relations}
        equipableVaultItems={equipableVaultItems}
        soldierExtraSkillLists={soldierExtraSkillLists}
        soldierExtraSpellLores={soldierExtraSpellLores}
        warbandId={warbandId}
        onReload={async () => {
          await onReload();
        }}
        heroSkillOptions={heroSkillOptions}
        onPromoteHero={onPromoteHero}
        onPromoteLeader={onPromoteLeader}
        promoteHeroLoading={promoteHeroLoading}
        promoteLeaderLoading={promoteLeaderLoading}
        hasLeaderInWarband={hasLeaderInWarband}
        promotionRequest={promotionRequest}
        onClearPromotionRequest={onClearPromotionRequest}
      />
    </Sidebar>
  );
};
