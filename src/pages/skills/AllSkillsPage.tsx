import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchSkillLists } from "../../services/queries.service";
import type { SkillListQueryResponse } from "../../services/queries.service";
import MobileSection from "../../components/MobileSection";
import MobileText from "../../components/MobileText";
import PageTitle from "../../components/PageTitle";
import QuickNavigation from "../../components/QuickNavigation";
import GameText from "../../components/GameText";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const AllSkillsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [skillLists, setSkillLists] = useState<SkillListQueryResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const urlSlug = searchParams.get("list");
  const [selectedListSlug, setSelectedListSlug] = useState<string>(
    urlSlug || ""
  );

  useEffect(() => {
    let abort = false;
    const controller = new AbortController();

    const loadSkillLists = async () => {
      setLoading(true);
      setError(null);
      try {
        const lists = await fetchSkillLists(controller.signal);
        if (!abort) {
          setSkillLists(lists);
          if (lists.length > 0) {
            // Se houver um slug na URL e ele existir nas listas, usa ele. Caso contrário, usa o primeiro.
            const initialSlug =
              urlSlug && lists.some(l => l.slug === urlSlug)
                ? urlSlug
                : lists[0].slug;
            setSelectedListSlug(initialSlug);
          }
        }
      } catch (err) {
        if (!abort) {
          console.error("Erro ao carregar listas de habilidades:", err);
          setError("Não foi possível carregar as listas de habilidades.");
        }
      } finally {
        if (!abort) {
          setLoading(false);
        }
      }
    };

    void loadSkillLists();

    return () => {
      abort = true;
      controller.abort();
    };
  }, [urlSlug]);

  // Atualiza o selectedListSlug quando o parâmetro da URL mudar
  useEffect(() => {
    if (urlSlug && skillLists.some(list => list.slug === urlSlug)) {
      setSelectedListSlug(urlSlug);
    }
  }, [urlSlug, skillLists]);

  const filteredLists = useMemo(() => {
    if (!selectedListSlug) return skillLists;
    return skillLists.filter(list => list.slug === selectedListSlug);
  }, [skillLists, selectedListSlug]);

  const navigationSections = useMemo(() => {
    const baseSections = [
      { id: "introducao", title: "Todas as Habilidades", level: 0 },
    ];
    return baseSections;
  }, []);

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <QuickNavigation sections={navigationSections} loading={loading} />

          <MobileSection id="introducao">
            <PageTitle>Todas as Habilidades</PageTitle>
            <MobileText>
              Esta página exibe todas as habilidades disponíveis, organizadas
              por lista de habilidades. Use o filtro abaixo para visualizar
              apenas uma lista específica.
            </MobileText>

            {loading ? (
              <MobileText>Carregando habilidades...</MobileText>
            ) : error ? (
              <MobileText className="text-red-300">{error}</MobileText>
            ) : (
              <div className="space-y-6">
                {/* Dropdown de filtro */}
                <FormControl fullWidth size="small">
                  <InputLabel
                    sx={{
                      color: "#86efac",
                      "&.Mui-focused": {
                        color: "#86efac",
                      },
                    }}
                  >
                    Filtrar por Lista de Habilidades
                  </InputLabel>
                  <Select
                    value={selectedListSlug || ""}
                    onChange={e => {
                      const newSlug = e.target.value as string;
                      setSelectedListSlug(newSlug);
                      // Atualiza o parâmetro da URL quando o dropdown mudar
                      if (newSlug) {
                        setSearchParams({ list: newSlug });
                      } else {
                        setSearchParams({});
                      }
                    }}
                    label="Filtrar por Lista de Habilidades"
                    sx={{
                      color: "#86efac",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(134, 239, 172, 0.3)",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(134, 239, 172, 0.5)",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#86efac",
                      },
                      "& .MuiSvgIcon-root": {
                        color: "#86efac",
                      },
                      backgroundColor: "#0b0e0c",
                    }}
                  >
                    <MenuItem
                      value=""
                      sx={{
                        color: "#86efac",
                        backgroundColor: "#0b0e0c",
                        "&:hover": {
                          backgroundColor: "rgba(134, 239, 172, 0.1)",
                        },
                      }}
                    >
                      Todas as Listas
                    </MenuItem>
                    {skillLists.map(list => (
                      <MenuItem
                        key={list.slug}
                        value={list.slug}
                        sx={{
                          color: "#86efac",
                          backgroundColor: "#0b0e0c",
                          "&:hover": {
                            backgroundColor: "rgba(134, 239, 172, 0.1)",
                          },
                          "&.Mui-selected": {
                            backgroundColor: "rgba(134, 239, 172, 0.2)",
                            "&:hover": {
                              backgroundColor: "rgba(134, 239, 172, 0.3)",
                            },
                          },
                        }}
                      >
                        {list.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* Listas de habilidades */}
                {filteredLists.length === 0 ? (
                  <MobileText>
                    Nenhuma lista de habilidades encontrada.
                  </MobileText>
                ) : (
                  <div className="space-y-6">
                    {filteredLists.map(list => (
                      <div key={list.slug} id={`skill-list-${list.slug}`}>
                        <h3 className="mb-3 font-semibold text-green-200 text-lg">
                          {list.name}
                        </h3>
                        {list.description && (
                          <div className="mb-4 text-green-100">
                            <GameText>{list.description}</GameText>
                          </div>
                        )}
                        {list.skills && list.skills.length > 0 ? (
                          <div className="space-y-2">
                            <h4 className="font-semibold text-green-300 text-sm uppercase tracking-wide mb-3">
                              Habilidades
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {list.skills.map(skill => (
                                <div
                                  key={skill.slug || skill.id}
                                  className="rounded border border-green-800/40 bg-[#101010] p-2"
                                >
                                  <div className="flex flex-col gap-2">
                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                      <h4 className="text-md font-semibold text-green-200">
                                        {skill.name}
                                      </h4>
                                    </div>
                                    {skill.description && (
                                      <div className="text-xs text-gray-300">
                                        <GameText component="div">
                                          {skill.description}
                                        </GameText>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <MobileText className="text-gray-400">
                            Nenhuma habilidade cadastrada nesta lista.
                          </MobileText>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </MobileSection>
        </div>
      </div>
    </div>
  );
};

export default AllSkillsPage;
