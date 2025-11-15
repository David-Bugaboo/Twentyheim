import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchWarbandById, fetchFactionBySlug } from "../../../../services/warbands.service";
import type { Warband } from "../../../../types/warband.entity";
import type { Faction } from "../../../../types/faction.entity";
import { useAuth } from "../../../../context/AuthContext";
import axios from "axios";

type UseWarbandDataProps = {
  warbandId: string | undefined;
};

export const useWarbandData = ({ warbandId }: UseWarbandDataProps) => {
  const navigate = useNavigate();
  const { loading: authLoading } = useAuth();
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
        
        // Verificar se é um erro 401 (não autorizado)
        const isUnauthorized = axios.isAxiosError(error) && error.response?.status === 401;
        
        if (isUnauthorized) {
          // Verificar se há token no localStorage
          const token = localStorage.getItem("twentyheim_token");
          if (token) {
            // Se há token mas ainda deu 401, pode ser que o token ainda não foi configurado
            // Aguardar um pouco e tentar novamente apenas uma vez
            await new Promise(resolve => setTimeout(resolve, 500));
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
              setLoading(false);
              return;
            } catch (retryError) {
              console.error("Retry failed:", retryError);
            }
          }
        }
        
        toast.error("Não foi possível carregar o bando.");
        navigate("/tools/warband-manager", { replace: true });
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  useEffect(() => {
    if (!warbandId || authLoading) return;
    void loadWarband(warbandId);
  }, [warbandId, loadWarband, authLoading]);

  return {
    warband,
    faction,
    loading,
    selectedSoldierId,
    setSelectedSoldierId,
    loadWarband,
  };
};

