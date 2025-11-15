import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchSpellLoreBySlug } from "../../services/queries.service";
import type { SpellLoreQueryResponse } from "../../services/queries.service";
import PageTitle from "../../components/PageTitle";
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";
import QuickNavigation from "../../components/QuickNavigation";
import GameText from "../../components/GameText";
import MagicTermTooltip from "../../components/MagicTermTooltip";

function GenericLorePage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [spellLore, setSpellLore] = useState<SpellLoreQueryResponse | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setError("Slug da tradição mágica não fornecido");
      setLoading(false);
      return;
    }

    let abort = false;
    const controller = new AbortController();

    const loadSpellLore = async () => {
      setLoading(true);
      setError(null);
      try {
        const lore = await fetchSpellLoreBySlug(slug, controller.signal);
        if (!abort) {
          setSpellLore(lore);
        }
      } catch (err) {
        if (!abort) {
          console.error("Erro ao carregar tradição mágica:", err);
          setError("Não foi possível carregar a tradição mágica.");
        }
      } finally {
        if (!abort) {
          setLoading(false);
        }
      }
    };

    void loadSpellLore();

    return () => {
      abort = true;
      controller.abort();
    };
  }, [slug]);

  const navigationSections = useMemo(() => {
    const baseSections = [
      {
        id: "introducao",
        title: spellLore?.name || "Tradição Mágica",
        level: 0,
      },
    ];
    if (spellLore?.spells) {
      return [
        ...baseSections,
        ...spellLore.spells.map((spell, index) => ({
          id: `spell-${spell.slug || index}`,
          title: spell.name || `Magia ${index + 1}`,
          level: 1,
        })),
      ];
    }
    return baseSections;
  }, [spellLore]);

  if (loading) {
    return (
      <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
        <div className="py-4">
          <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
            <MobileSection>
              <PageTitle>Carregando...</PageTitle>
              <MobileText>
                Por favor, aguarde enquanto carregamos as magias.
              </MobileText>
            </MobileSection>
          </div>
        </div>
      </div>
    );
  }

  if (error || !spellLore) {
    return (
      <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
        <div className="py-4">
          <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
            <MobileSection>
              <PageTitle>Erro</PageTitle>
              <MobileText>
                {error || "Tradição mágica não encontrada"}
              </MobileText>
              <button
                onClick={() => navigate("/magic")}
                className="mt-4 px-4 py-2 bg-green-900/20 border border-green-500/40 hover:bg-green-800/30 hover:border-green-400/60 text-white rounded-lg transition-colors duration-200"
              >
                Voltar para Magia
              </button>
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
          <QuickNavigation sections={navigationSections} loading={loading} />
          <MobileSection id="introducao">
            <PageTitle>{spellLore.name}</PageTitle>
            {spellLore.description && (
              <MobileText>
                <GameText>{spellLore.description}</GameText>
              </MobileText>
            )}

            {spellLore.spells && spellLore.spells.length > 0 ? (
              <div className="space-y-2 mt-6">
                <h4 className="font-semibold text-blue-300 text-sm uppercase tracking-wide mb-3">
                  Magias
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {spellLore.spells.map(spell => (
                    <div
                      key={spell.slug || spell.id}
                      id={`spell-${spell.slug || spell.id}`}
                      className="rounded border border-blue-800/40 bg-[#101010] p-2"
                    >
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h4 className="text-md font-semibold text-blue-200">
                            {spell.name}
                          </h4>
                        </div>
                        {spell.description && (
                          <div className="text-xs text-gray-300">
                            <GameText component="div">
                              {spell.description}
                            </GameText>
                          </div>
                        )}
                        {typeof spell.difficultyClass === "number" ? (
                          <div className="text-[11px] text-blue-300">
                            Dificuldade: {spell.difficultyClass}
                          </div>
                        ) : null}
                        {Array.isArray(spell.keywords) &&
                        spell.keywords.length > 0 ? (
                          <div className="text-[11px] text-blue-200 flex flex-wrap items-center gap-1">
                            <span>Palavras-chave:</span>
                            {spell.keywords.map((keyword, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center"
                              >
                                <MagicTermTooltip component="span">
                                  {keyword.trim()}
                                </MagicTermTooltip>
                                {spell.keywords &&
                                  index < spell.keywords.length - 1 && (
                                    <span>,</span>
                                  )}
                              </span>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <MobileText className="mt-6">
                Nenhuma magia encontrada para esta tradição.
              </MobileText>
            )}
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default GenericLorePage;
