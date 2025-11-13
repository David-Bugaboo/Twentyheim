import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchWarbandById, fetchFactionBySlug } from "../../../../services/warbands.service";
import type { Warband } from "../../../../types/warband.entity";
import type { Faction } from "../../../../types/faction.entity";

type UseWarbandDataProps = {
  warbandId: string | undefined;
};

export const useWarbandData = ({ warbandId }: UseWarbandDataProps) => {
  const navigate = useNavigate();
  const [warband, setWarband] = useState<Warband | null>(null);
  const [faction, setFaction] = useState<Faction | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSoldierId, setSelectedSoldierId] = useState<string | null>(null);

  const loadWarband = useCallback(
    async (id: string) => {
      setLoading(true);
      try {
        const warbandData = await fetchWarbandById(id);
        setWarband(warbandData);

        const warbandSoldiers = warbandData.warbandSoldiers ?? [];
        setSelectedSoldierId(prev => {
          if (!warbandSoldiers.length) {
            return null;
          }

          if (prev && warbandSoldiers.some(soldier => soldier.id === prev)) {
            return prev;
          }

          return warbandSoldiers[0].id;
        });

        const factionSlug =
          warbandData.faction?.slug ?? warbandData.factionSlug ?? null;
        if (factionSlug) {
          const factionData = await fetchFactionBySlug(factionSlug);
          setFaction(factionData);
        } else {
          setFaction(null);
        }
      } catch (error) {
        console.error(error);
        toast.error("Não foi possível carregar o bando.");
        navigate("/tools/warband-manager", { replace: true });
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  useEffect(() => {
    if (!warbandId) return;
    void loadWarband(warbandId);
  }, [warbandId, loadWarband]);

  return {
    warband,
    faction,
    loading,
    selectedSoldierId,
    setSelectedSoldierId,
    loadWarband,
  };
};

