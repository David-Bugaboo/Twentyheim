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

function HiredSwordsPage() {
  const [mercenaries, setMercenaries] = useState<BaseFigure[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedMercenaries, setExpandedMercenaries] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    let abort = false;
    const controller = new AbortController();

    const loadMercenaries = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchBaseFigures(
          { role: "MERCENARIO" },
          controller.signal
        );
        if (!abort) {
          setMercenaries(data);
        }
      } catch (err) {
        if (!abort) {
          console.error("Erro ao carregar mercenários:", err);
          setError("Não foi possível carregar os mercenários.");
        }
      } finally {
        if (!abort) {
          setLoading(false);
        }
      }
    };

    void loadMercenaries();

    return () => {
      abort = true;
      controller.abort();
    };
  }, []);

  const toggleMercenary = (mercenaryId: string) => {
    setExpandedMercenaries(prev => ({
      ...prev,
      [mercenaryId]: !prev[mercenaryId],
    }));
  };

  const navigationSections = useMemo(() => {
    const baseSections = [
      { id: "intro", title: "Espadas Contratadas", level: 0 },
      { id: "recrutamento", title: "Recrutando Mercenários", level: 0 },
      { id: "taxa-contratacao", title: "Taxa de Contratação", level: 0 },
      { id: "lesoes", title: "Ferimentos", level: 0 },
      { id: "experiencia", title: "Mercenários e Experiência", level: 0 },
    ];
    return [
      ...baseSections,
      ...mercenaries.map(mercenary => ({
        id: mercenary.id || mercenary.slug,
        title: mercenary.name,
        level: 1,
      })),
    ];
  }, [mercenaries]);

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <QuickNavigation sections={navigationSections} loading={loading} />
          <MobileSection>
            <div id="intro">
              <PageTitle>Espadas Contratadas</PageTitle>
            </div>

            <MobileText>
              Esta seção introduz mercenários profissionais do derramamento de
              sangue – aos jogos de campanha de 20heim. Tavernas nos
              assentamentos e favelas ao redor de Mordheim são bons centros de
              recrutamento para guerreiros cuja única lealdade é o dinheiro.
            </MobileText>

            <MobileText>
              Um jogador pode recrutar Mercenários quando criar seu bando, ou
              durante a fase de campanha após um jogo.
            </MobileText>

            <MobileText>
              Mercenários não contam para o número máximo de figuras ou Heróis
              que um bando pode ter e não afetam sua renda da venda de
              Pedra-bruxa. No entanto, Mercen;arios contam como parte do bando
              para fins de testes de debandada, etc., enquanto em batalha. Um
              jogador não pode comprar armas ou equipamentos extras para uma
              Mercenário, e não pode vender as armas ou equipamentos dele. Para
              refletir sua raridade, você só pode ter um de cada tipo de
              Nercenário em seu bando. Você não pode usar a Liderança de nenhuma
              das Espadas Contratadas para testes de Debacle.
            </MobileText>

            <div id="recrutamento">
              <HeaderH1>Recrutando Mercenários</HeaderH1>
            </div>

            <MobileText>
              Para recrutar uma Mercenário, você deve primeiro verificar se ela
              está disponível para seu tipo de bando. Cada mercenário tem
              restrições de disponibilidade listadas em sua entrada. Alguns são
              disponíveis para todos os bandos, enquanto outros têm restrições
              específicas baseadas na natureza do seu bando.
            </MobileText>

            <div className="mt-4 space-y-3">
              <div className="rounded border border-green-800/30 bg-[#0f1a14] p-4">
                <ol className="space-y-3 list-decimal list-inside text-sm text-gray-200">
                  <li>
                    <strong className="text-green-300">
                      Verifique a disponibilidade:
                    </strong>{" "}
                    <span className="text-gray-300">
                      Verifique se o mercenário está disponível para seu tipo de
                      bando
                    </span>
                  </li>
                  <li>
                    <strong className="text-green-300">
                      Pague a taxa de contratação inicial:
                    </strong>{" "}
                    <span className="text-gray-300">
                      Pague o custo de contratação do mercenário
                    </span>
                  </li>
                  <li>
                    <strong className="text-green-300">
                      Adicione ao bando:
                    </strong>{" "}
                    <span className="text-gray-300">
                      Adicione o mercenário ao seu bando como um soldado
                    </span>
                  </li>
                </ol>
              </div>
            </div>

            <div id="taxa-contratacao">
              <HeaderH1>Taxa de Contratação</HeaderH1>
            </div>

            <MobileText>
              Quando um bando recruta um Mercenário, você deve pagar sua taxa de
              contratação. Subsequentemente, após cada batalha que ele lutar,
              incluindo a primeira, você deve pagar sua taxa de manutenção se
              quiser que ele permaneça com o bando. Se o Mercenário for morto,
              ou você não precisar mais de seus serviços, não precisa pagar
              nenhuma manutenção! Esses custos são indicados nas entradas para
              cada Mercenário.
            </MobileText>

            <MobileText>
              O dinheiro pago aos Mercenários vem do tesouro do bando da mesma
              forma que comprar novas armas ou recrutar novos guerreiros. Se
              você não tiver ouro suficiente para pagar pelo Mercenário, ou
              quiser gastá-lo em outras coisas, ela deixa o bando. Qualquer
              experiência que ela tenha ganhado será perdida, mesmo se você
              contratar um novo mercenário do mesmo tipo.
            </MobileText>

            <div id="lesoes">
              <HeaderH1>Ferimentos</HeaderH1>
            </div>

            <MobileText>
              Se uma Mercenário sair de ação durante o jogo, role para suas
              lesões como você rolaria para um Soldado após uma batalha.
            </MobileText>

            <div id="experiencia">
              <HeaderH1>Mercenários e Experiência</HeaderH1>
            </div>

            <MobileText>
              Mercenários ganham experiência exatamente da mesma forma que
              Soldados e seguem as regras para ganho de nível dos mercenários.
              Consulte os <a href="/scenarios">cenários</a> para descobrir
              quanta experiência os Mercenários ganham após cada jogo.
              Mercenários sempre começam com 0 de experiência.
            </MobileText>

            <MobileText>
              Uma vez que a Mercenário ganhe experiência suficiente para subir
              de nível, role na tabela de Avanço de Heróis, e não de Soldado.
              Habilidades disponíveis para as Espadas Contratadas estão listadas
              sob suas entradas.
            </MobileText>

            <div id="experiencia">
              <HeaderH1>Qualidade do Bando</HeaderH1>
            </div>

            <MobileText>
              Sempre que um mercenário for contratado ou subir de nível,
              <a href="/rules/warband-quality">
                recalcule a classificação do bando
              </a>
            </MobileText>

            {loading ? (
              <MobileText>Carregando mercenários...</MobileText>
            ) : error ? (
              <MobileText className="text-red-300">{error}</MobileText>
            ) : mercenaries.length === 0 ? (
              <MobileText>Nenhum mercenário encontrado.</MobileText>
            ) : (
              <>
                <HeaderH2>Detalhes dos Mercenários</HeaderH2>

                <div className="space-y-3">
                  {mercenaries.map(mercenary => {
                    const isExpanded =
                      expandedMercenaries[mercenary.id] ?? false;
                    const supernaturalAccess = getSupernaturalAccess(
                      mercenary,
                      []
                    );
                    const naturalAttacks = Array.isArray(
                      mercenary.naturalAttacks
                    )
                      ? (mercenary.naturalAttacks ?? [])
                      : [];
                    const figureId = mercenary.id || mercenary.slug;

                    return (
                      <div
                        key={mercenary.id}
                        id={figureId}
                        className="rounded border border-green-800/40 bg-[#101010] px-5 py-3 text-sm text-gray-200"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <div className="font-semibold text-green-200">
                              {mercenary.name}
                            </div>
                            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-400">
                              <span className="uppercase text-green-400">
                                {mercenary.role}
                              </span>
                              {" · "}
                              <span>
                                {formatCrownsValue(mercenary.cost)}
                                {mercenary.quality != null &&
                                Number(mercenary.quality) > 0 ? (
                                  <span className="ml-2 text-green-300">
                                    · Qualidade: {String(mercenary.quality)}
                                  </span>
                                ) : null}
                              </span>
                              {mercenary.upkeep != null &&
                              Number(mercenary.upkeep) !== 0 ? (
                                <span className="text-amber-200">
                                  Manutenção:{" "}
                                  {formatCrownsValue(mercenary.upkeep)}
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
                            onClick={() => toggleMercenary(mercenary.id)}
                            className="rounded border border-green-700/40 bg-green-900/20 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-green-200 transition hover:border-green-500/60 hover:bg-green-900/40"
                            aria-expanded={isExpanded}
                          >
                            {isExpanded ? "Recolher" : "Expandir"}
                          </button>
                        </div>

                        {isExpanded ? (
                          <div className="mt-3 space-y-3 text-xs text-gray-400">
                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-2">
                              {FIGURE_STATS.filter(
                                stat => stat.key !== "quality"
                              ).map(stat => {
                                const rawValue = (
                                  mercenary as unknown as Record<
                                    string,
                                    unknown
                                  >
                                )[stat.key];
                                const displayValue =
                                  rawValue === undefined || rawValue === null
                                    ? "-"
                                    : String(rawValue);
                                return (
                                  <StatRow
                                    key={`${mercenary.id}-${stat.key}`}
                                    label={stat.label}
                                    value={displayValue}
                                  />
                                );
                              })}
                            </div>

                            {/* Special Rules */}
                            {mercenary.specialRules &&
                            parseSpecialRules(mercenary.specialRules).length >
                              0 ? (
                              <div className="rounded border border-green-800/30 bg-[#0f1a14] p-3 text-green-100">
                                <p className="mb-2 font-semibold uppercase tracking-wide text-green-300">
                                  Regras Especiais
                                </p>
                                <div className="space-y-2">
                                  {parseSpecialRules(
                                    mercenary.specialRules
                                  ).map((entry, index) => (
                                    <div
                                      key={`${mercenary.id}-rule-${index}`}
                                      className="rounded bg-green-900/20 px-3 py-2 text-[11px] text-green-100"
                                    >
                                      <span className="block font-semibold text-green-200">
                                        {entry.label}
                                      </span>
                                      <div className="mt-1 block whitespace-pre-wrap text-green-100">
                                        <GameText>{entry.value}</GameText>
                                      </div>
                                    </div>
                                  ))}
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
                                      key={`${mercenary.id}-natural-${index}`}
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
                                                key={`${mercenary.id}-natural-${index}-rule-${ruleIndex}`}
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
                              const skillLists = mercenary.skillLists ?? [];
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
                                          key={`${mercenary.id}-skill-list-${index}`}
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
                              const spellLores = mercenary.spellLores ?? [];
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
                                          key={`${mercenary.id}-spell-lore-${index}`}
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

export default HiredSwordsPage;
