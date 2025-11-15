import { useEffect, useMemo, useState } from "react";
import { fetchBaseFigures } from "../../services/queries.service";
import type { BaseFigure } from "../../types/base-figure.entity";
import PageTitle from "../../components/PageTitle";
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";
import HeaderH1 from "../../components/HeaderH1";
import HeaderH2 from "../../components/HeaderH2";
import QuickNavigation from "../../components/QuickNavigation";
import { StatRow } from "../tools/warband-detail/components/CommonComponents";
import { FIGURE_STATS } from "../tools/warband-detail/types";
import {
  parseSpecialRules,
  getSkillListLabel,
  getSpellLoreLabel,
  formatCrownsValue,
} from "../tools/warband-detail/utils/helpers";
import { getSupernaturalAccess } from "../tools/warband-detail/utils/supernatural-helpers";
import GameText from "../../components/GameText";

function LegendsPage() {
  const [legends, setLegends] = useState<BaseFigure[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedLegends, setExpandedLegends] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    let abort = false;
    const controller = new AbortController();

    const loadLegends = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchBaseFigures(
          { role: "LENDA" },
          controller.signal
        );
        if (!abort) {
          setLegends(data);
        }
      } catch (err) {
        if (!abort) {
          console.error("Erro ao carregar lendas:", err);
          setError("Não foi possível carregar as lendas.");
        }
      } finally {
        if (!abort) {
          setLoading(false);
        }
      }
    };

    void loadLegends();

    return () => {
      abort = true;
      controller.abort();
    };
  }, []);

  const toggleLegend = (legendId: string) => {
    setExpandedLegends(prev => ({
      ...prev,
      [legendId]: !prev[legendId],
    }));
  };

  const navigationSections = useMemo(() => {
    const baseSections = [
      { id: "intro", title: "Dramatis Personae", level: 0 },
      { id: "procurando-lendas", title: "Procurando Lendas", level: 0 },
      { id: "taxa-contratacao", title: "Taxa de Contratação", level: 0 },
      {
        id: "experiencia-ferimentos",
        title: "Experiência, Ferimentos e Equipamento",
        level: 0,
      },
    ];
    return [
      ...baseSections,
      ...legends.map(legend => ({
        id: legend.id || legend.slug,
        title: legend.name,
        level: 1,
      })),
    ];
  }, [legends]);

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <QuickNavigation sections={navigationSections} loading={loading} />
          <MobileSection>
            <div id="intro">
              <PageTitle>Lendas</PageTitle>
            </div>

            <MobileText>
              Esta seção detalha alguns dos mais estranhos e famosos (ou
              infames) personagens encontrados em Mordheim e nos assentamentos
              em volta. Ocasionalmente, esses guerreiros se juntam às forças de
              um bando (geralmente exigindo Pedra-bruxa ou um saco de ouro como
              pagamento).
            </MobileText>

            <MobileText>
              Os seguintes personagens (conhecidos como 'Lendas') são difíceis
              de encontrar e caros para contratar – você deve ter sorte e ser
              rico para atrair sua atenção.
            </MobileText>

            <MobileText>
              Esta lista não inclui, de forma alguma, todos os guerreiros
              famosos e assassinos de coração frio que você poderia encontrar na
              Cidade dos Condenados. Existem famosos caçadores de ouro Anões,
              Burgomestres da Guilda dos Mercadores, Theodor, o atirador de
              Hochland, e muitos outros. Na verdade, esperamos que os
              personagens detalhados aqui inspirem os jogadores a inventar
              lendas próprias.
            </MobileText>

            <MobileText>
              <strong>Restrições:</strong> Uma lenda só pode existir em um bando
              por vez! Eles são hérois únicos, e não podem estar em dois lugares
              ao mesmo tempo.
            </MobileText>

            <div id="procurando-lendas">
              <HeaderH1>Procurando Lendas</HeaderH1>
            </div>

            <MobileText>
              na etapa de atividades da fase de campanha, você pode enviar
              qualquer número de seus Heróis para procurar uma lenda. Heróis que
              foram reduzidos a 0 de vida na última batalha não podem se juntar
              à busca porque estão se recuperando de seus ferimentos.
            </MobileText>

            <MobileText>
              Decida qual lenda você está procurando e quantos Heróis foram
              enviados para procurá-la. Role um D20 para cada Herói. Se qualquer
              dado tiver um resultado maior que 16, o Herói encontrou a lenda.
            </MobileText>

            <div className="mt-4 space-y-3">
              <div className="rounded border border-green-800/30 bg-[#0f1a14] p-4">
                <ol className="space-y-3 list-decimal list-inside text-sm text-gray-200">
                  <li>
                    <strong className="text-green-300">
                      Decida qual lenda procurar:
                    </strong>{" "}
                    <span className="text-gray-300">
                      Escolha uma lenda específica da lista
                    </span>
                  </li>
                  <li>
                    <strong className="text-green-300">
                      Envie Heróis para procurar:
                    </strong>{" "}
                    <span className="text-gray-300">
                      Apenas Heróis podem procurar (não feridos)
                    </span>
                  </li>
                  <li>
                    <strong className="text-green-300">
                      Role 1D20 por buscador:
                    </strong>{" "}
                    <span className="text-gray-300">
                      Cada Herói rola um dado e deve tirar mais que 16.
                    </span>
                  </li>
                  <li>
                    <strong className="text-green-300">
                      Verifique sucesso:
                    </strong>{" "}
                    <span className="text-gray-300">
                      Se rolar abaixo da Iniciativa = encontrou
                    </span>
                  </li>
                  <li>
                    <strong className="text-green-300">
                      Pague taxa de contratação:
                    </strong>{" "}
                    <span className="text-gray-300">
                      Se encontrou e pode pagar
                    </span>
                  </li>
                </ol>
              </div>
            </div>

            <div id="taxa-contratacao">
              <HeaderH1>Taxa de Contratação</HeaderH1>
            </div>

            <MobileText>
              O bando deve pagar a taxa de contratação da lenda quando ela for
              recrutada, e após cada batalha que ela lutar, incluindo a
              primeira, você deve pagar uma taxa de manutenção. Essas taxas são
              indicadas nas suas fichas. Se você não tiver coras suficientes
              para pagar pela lenda, ela deixa o bando.
            </MobileText>

            <div id="experiencia-ferimentos">
              <HeaderH1>Experiência, Ferimentos e Equipamento</HeaderH1>
            </div>

            <MobileText>
              <strong>Equipamento:</strong> As lendas têm seu próprio
              equipamento. Apenas elas podem usar este equipamento; não pode ser
              dado a outros guerreiros. Além disso, você não pode comprar armas
              ou equipamentos extras para uma lenda.
            </MobileText>

            <MobileText>
              <strong>Experiência:</strong> As lendas não ganham pontos de
              Experiência, embora sofram ferimentos sérios, assim como Heróis,
              se forem postas fora de ação.
            </MobileText>

            <MobileText>
              <strong>Qualidade do Bando:</strong> A descrição de cada lenda diz
              quanto adicionar à qualidade do seu bando por incluí-las.
              <a href="/rules/warband-quality">
                Recalcule a qualidade do bando
              </a>{" "}
              sempre que uma lenda for contratada.
            </MobileText>

            {loading ? (
              <MobileText>Carregando lendas...</MobileText>
            ) : error ? (
              <MobileText className="text-red-300">{error}</MobileText>
            ) : legends.length === 0 ? (
              <MobileText>Nenhuma lenda encontrada.</MobileText>
            ) : (
              <>
                <HeaderH2>Detalhes das Lendas</HeaderH2>

                <div className="space-y-3">
                  {legends.map(legend => {
                    const isExpanded = expandedLegends[legend.id] ?? false;
                    const supernaturalAccess = getSupernaturalAccess(
                      legend,
                      []
                    );
                    const naturalAttacks = Array.isArray(legend.naturalAttacks)
                      ? (legend.naturalAttacks ?? [])
                      : [];
                    const figureId = legend.id || legend.slug;

                    return (
                      <div
                        key={legend.id}
                        id={figureId}
                        className="rounded border border-green-800/40 bg-[#101010] px-5 py-3 text-sm text-gray-200"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <div className="font-semibold text-green-200">
                              {legend.name}
                            </div>
                            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-400">
                              <span className="uppercase text-green-400">
                                {legend.role}
                              </span>
                              {" · "}
                              <span>
                                {formatCrownsValue(legend.cost)}
                                {legend.quality != null &&
                                Number(legend.quality) > 0 ? (
                                  <span className="ml-2 text-green-300">
                                    · Qualidade: {String(legend.quality)}
                                  </span>
                                ) : null}
                              </span>
                              {legend.upkeep != null &&
                              Number(legend.upkeep) !== 0 ? (
                                <span className="text-amber-200">
                                  Manutenção: {formatCrownsValue(legend.upkeep)}
                                </span>
                              ) : null}
                              {(supernaturalAccess.mutations ||
                                supernaturalAccess.sacredMarks ||
                                supernaturalAccess.blessings) && (
                                <div className="flex flex-wrap gap-1">
                                  {supernaturalAccess.mutations ? (
                                    <span
                                      className="rounded-full border border-purple-500/40 bg-purple-900/30 px-2 py-1 text-[10px] text-purple-200"
                                      style={{
                                        backgroundColor:
                                          "rgba(147, 51, 234, 0.2)",
                                        borderColor: "rgba(147, 51, 234, 0.4)",
                                        color: "rgba(196, 181, 253, 1)",
                                      }}
                                    >
                                      Mutação
                                    </span>
                                  ) : null}
                                  {supernaturalAccess.sacredMarks ? (
                                    <span
                                      className="rounded-full border border-blue-500/40 bg-blue-900/30 px-2 py-1 text-[10px] text-blue-200"
                                      style={{
                                        backgroundColor:
                                          "rgba(59, 130, 246, 0.2)",
                                        borderColor: "rgba(59, 130, 246, 0.4)",
                                        color: "rgba(147, 197, 253, 1)",
                                      }}
                                    >
                                      Marca Sagrada
                                    </span>
                                  ) : null}
                                  {supernaturalAccess.blessings ? (
                                    <span
                                      className="rounded-full border border-lime-500/40 bg-lime-900/30 px-2 py-1 text-[10px] text-lime-200"
                                      style={{
                                        backgroundColor:
                                          "rgba(34, 197, 94, 0.2)",
                                        borderColor: "rgba(34, 197, 94, 0.4)",
                                        color: "rgba(134, 239, 172, 1)",
                                      }}
                                    >
                                      Benção de Nurgle
                                    </span>
                                  ) : null}
                                </div>
                              )}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => toggleLegend(legend.id)}
                            className="rounded border border-green-700/40 bg-green-900/20 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-green-200 transition hover:border-green-500/60 hover:bg-green-900/40"
                            aria-expanded={isExpanded}
                          >
                            {isExpanded ? "Recolher" : "Expandir"}
                          </button>
                        </div>

                        {isExpanded ? (
                          <div className="mt-3 space-y-3 text-xs text-gray-400">
                            {/* Lore */}
                            {legend.lore ? (
                              <div className="rounded border border-blue-800/30 bg-[#0f141a] p-3 text-blue-100">
                                <p className="mb-2 font-semibold uppercase tracking-wide text-blue-300">
                                  Lore
                                </p>
                                <div className="whitespace-pre-wrap text-blue-100">
                                  <GameText>{legend.lore}</GameText>
                                </div>
                              </div>
                            ) : null}

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-2">
                              {FIGURE_STATS.filter(
                                stat => stat.key !== "quality"
                              ).map(stat => {
                                const rawValue = (
                                  legend as unknown as Record<string, unknown>
                                )[stat.key];
                                const displayValue =
                                  rawValue === undefined || rawValue === null
                                    ? "-"
                                    : String(rawValue);
                                return (
                                  <StatRow
                                    key={`${legend.id}-${stat.key}`}
                                    label={stat.label}
                                    value={displayValue}
                                  />
                                );
                              })}
                            </div>

                            {/* Special Rules */}
                            {legend.specialRules &&
                            parseSpecialRules(legend.specialRules).length >
                              0 ? (
                              <div className="rounded border border-green-800/30 bg-[#0f1a14] p-3 text-green-100">
                                <p className="mb-2 font-semibold uppercase tracking-wide text-green-300">
                                  Regras Especiais
                                </p>
                                <div className="space-y-2">
                                  {parseSpecialRules(legend.specialRules).map(
                                    (entry, index) => (
                                      <div
                                        key={`${legend.id}-rule-${index}`}
                                        className="rounded bg-green-900/20 px-3 py-2 text-[11px] text-green-100"
                                      >
                                        <span className="block font-semibold text-green-200">
                                          {entry.label}
                                        </span>
                                        <div className="mt-1 block whitespace-pre-wrap text-green-100">
                                          <GameText>{entry.value}</GameText>
                                        </div>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            ) : null}

                            {/* Natural Attacks */}
                            {naturalAttacks.length > 0 ? (
                              <div className="rounded border border-amber-800/30 bg-[#181207] p-3 text-amber-100">
                                <p className="mb-2 font-semibold uppercase tracking-wide text-amber-300">
                                  Ataques Naturais
                                </p>
                                <div className="space-y-3">
                                  {naturalAttacks.map((attack, index) => (
                                    <div
                                      key={`${legend.id}-natural-${index}`}
                                      className="rounded border border-amber-700/30 bg-[#1f1406] px-3 py-2 text-xs text-amber-100"
                                    >
                                      <div className="flex flex-wrap items-center justify-between gap-2">
                                        <span className="font-semibold text-amber-200">
                                          {attack.name}
                                        </span>
                                        <span className="text-[11px] uppercase text-amber-300">
                                          {attack.type}
                                        </span>
                                      </div>
                                      <div className="mt-1 flex flex-wrap gap-3 text-[11px] text-amber-200">
                                        <span>
                                          <strong>Dano:</strong>{" "}
                                          {attack.damage ?? "-"}
                                        </span>
                                        {attack.range ? (
                                          <span>
                                            <strong>Alcance:</strong>{" "}
                                            {attack.range}
                                          </span>
                                        ) : null}
                                      </div>
                                      {Array.isArray(attack.specialRules) &&
                                      attack.specialRules.length > 0 ? (
                                        <div className="mt-2 space-y-1">
                                          {attack.specialRules.map(
                                            (rule, ruleIndex) => (
                                              <div
                                                key={`${legend.id}-natural-${index}-rule-${ruleIndex}`}
                                                className="text-[11px] text-amber-100"
                                              >
                                                <span className="font-semibold text-amber-200">
                                                  {rule.label || rule.title}:
                                                </span>{" "}
                                                {rule.value ? (
                                                  <GameText
                                                    component="span"
                                                    className="text-amber-100"
                                                  >
                                                    {rule.value}
                                                  </GameText>
                                                ) : null}
                                              </div>
                                            )
                                          )}
                                        </div>
                                      ) : null}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ) : null}

                            {/* Skill Lists */}
                            {(() => {
                              const skillLists = legend.skillLists ?? [];
                              const hasSkillLists =
                                Array.isArray(skillLists) &&
                                skillLists.length > 0;

                              if (!hasSkillLists) return null;

                              return (
                                <div className="space-y-2 text-[11px]">
                                  <p className="mb-1 uppercase font-semibold tracking-wide text-green-300">
                                    Listas de Habilidades
                                  </p>
                                  <div className="flex flex-wrap items-center gap-2">
                                    {skillLists.map((entry, index) => {
                                      const label = getSkillListLabel(entry);
                                      return (
                                        <span
                                          key={`${legend.id}-skill-list-${index}`}
                                          className="rounded-full border border-green-600/40 bg-green-900/30 px-2 py-1 text-xs text-green-200"
                                        >
                                          {label}
                                        </span>
                                      );
                                    })}
                                  </div>
                                </div>
                              );
                            })()}

                            {/* Spell Lores */}
                            {(() => {
                              const spellLores = legend.spellLores ?? [];
                              const hasSpellLores =
                                Array.isArray(spellLores) &&
                                spellLores.length > 0;

                              if (!hasSpellLores) return null;

                              return (
                                <div className="space-y-2 text-[11px]">
                                  <p className="mb-1 uppercase font-semibold tracking-wide text-green-300">
                                    Tradições Mágicas
                                  </p>
                                  <div className="flex flex-wrap items-center gap-2">
                                    {spellLores.map((entry, index) => {
                                      const label = getSpellLoreLabel(entry);
                                      return (
                                        <span
                                          key={`${legend.id}-spell-lore-${index}`}
                                          className="rounded-full border border-green-600/40 bg-green-900/30 px-2 py-1 text-xs text-green-200"
                                        >
                                          {label}
                                        </span>
                                      );
                                    })}
                                  </div>
                                </div>
                              );
                            })()}
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default LegendsPage;
