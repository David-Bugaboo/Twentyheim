import { useEffect, useMemo, useState } from "react";
import { fetchModifiers } from "../../services/queries.service";
import type { ModifierQueryResponse } from "../../services/queries.service";
import MobileSection from "../../components/MobileSection";
import MobileText from "../../components/MobileText";
import HeaderH1 from "../../components/HeaderH1";
import QuickNavigation from "../../components/QuickNavigation";
import PageTitle from "../../components/PageTitle";
import GameText from "../../components/GameText";

export default function ModifiersPage() {
  const [modifiers, setModifiers] = useState<ModifierQueryResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let abort = false;
    const controller = new AbortController();

    const loadModifiers = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchModifiers(undefined, controller.signal);
        if (!abort) {
          setModifiers(data);
        }
      } catch (err) {
        if (!abort) {
          console.error("Erro ao carregar modificadores:", err);
          setError("Não foi possível carregar os modificadores.");
        }
      } finally {
        if (!abort) {
          setLoading(false);
        }
      }
    };

    void loadModifiers();

    return () => {
      abort = true;
      controller.abort();
    };
  }, []);

  // Agrupar modificadores por categoria
  const groupedModifiers = useMemo(() => {
    const groups: Record<string, ModifierQueryResponse[]> = {};
    modifiers.forEach(modifier => {
      const category = modifier.category || "Outros";
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(modifier);
    });
    return groups;
  }, [modifiers]);

  const navigationSections = useMemo(() => {
    const baseSections = [
      { id: "intro", title: "Modificadores de Equipamento", level: 0 },
      { id: "como-funcionam", title: "Como Funcionam os Modificadores", level: 0 },
    ];
    const categorySections = Object.keys(groupedModifiers).map(category => ({
      id: `category-${category.toLowerCase().replace(/\s+/g, "-")}`,
      title: category,
      level: 1,
    }));
    return [...baseSections, ...categorySections];
  }, [groupedModifiers]);

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <PageTitle>Modificadores de Equipamento</PageTitle>
          <QuickNavigation sections={navigationSections} loading={loading} />
          <MobileSection>
            <div id="intro">
              <MobileText>
                Em Mordheim, onde cada vantagem pode significar a diferença entre
                a vida e a morte, os modificadores de equipamento representam o
                refinamento supremo da tecnologia e da magia. Estes aprimoramentos
                transformam armas e armaduras comuns em artefatos de poder
                extraordinário, criados pelos melhores artesãos e ferreiros do
                mundo.
              </MobileText>
            </div>

            <div id="como-funcionam">
              <HeaderH1>Como Funcionam os Modificadores</HeaderH1>
              <MobileText>
                • <strong>Aplicação:</strong> Modificadores são aplicados a armas
                ou armaduras existentes, modificando suas propriedades base.
                <br />• <strong>Custo:</strong> O custo é calculado multiplicando
                o preço base do equipamento pelo multiplicador do modificador.
                <br />• <strong>Espaços:</strong> Cada modificador ocupa 1 espaço
                de equipamento adicional.
                <br />• <strong>Efeitos:</strong> Modificadores podem alterar
                dano, alcance, penetração de armadura, movimento e outras
                propriedades.
                <br />• <strong>Restrições:</strong> Alguns modificadores têm
                disponibilidade limitada a certos bandos ou raças.
              </MobileText>
            </div>

            {loading ? (
              <MobileText>Carregando modificadores...</MobileText>
            ) : error ? (
              <MobileText className="text-red-300">{error}</MobileText>
            ) : Object.keys(groupedModifiers).length === 0 ? (
              <MobileText>Nenhum modificador encontrado.</MobileText>
            ) : (
              <div className="space-y-6 mt-6">
                {Object.entries(groupedModifiers).map(([category, items]) => (
                  <div
                    key={category}
                    id={`category-${category.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    <HeaderH1>{category}</HeaderH1>
                    {items.length > 0 && (
                      <MobileText className="mb-4">
                        {category === "Modificador de Arma Corpo a Corpo" &&
                          "Aprimoramentos para lâminas, maças, lanças e outras armas de combate próximo."}
                        {category === "Modificador de Arma à Distância" &&
                          "Melhorias para arcos, bestas e outras armas de projétil."}
                        {category === "Modificador de Arma de Fogo" &&
                          "Melhorias para pistolas, arcabuzes e outras armas de pólvora."}
                        {category === "Modificador de Armadura" &&
                          "Aprimoramentos para armaduras, escudos e elmos."}
                      </MobileText>
                    )}
                    <div className="space-y-4">
                      {items.map(modifier => (
                        <div
                          key={modifier.slug || modifier.id}
                          className="space-y-3 rounded border border-green-800/40 bg-[#0c0f0d] p-4 text-sm text-gray-200"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <h3 className="text-lg font-semibold text-green-200">
                              {modifier.name}
                              <span className="ml-2 text-sm font-normal text-cyan-300">
                                (x{modifier.multiplier} preço base)
                              </span>
                            </h3>
                            <span className="text-xs uppercase text-green-400">
                              {modifier.category ?? "Sem categoria"}
                            </span>
                          </div>

                          {modifier.effect ? (
                            <div className="space-y-1 rounded border border-green-800/30 bg-[#111815] p-3 text-xs text-green-100">
                              <p className="text-xs font-semibold uppercase tracking-wide text-green-300">
                                Efeito
                              </p>
                              <div className="text-green-100">
                                <GameText component="div">{modifier.effect}</GameText>
                              </div>
                            </div>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <MobileText
              variant="quote"
              className="text-center text-lg leading-relaxed mt-8"
            >
              "Da forja dos Anões ao trabalho élfico, dos segredos de Cathay às
              criações dos Engenheiros de Nuln. Cada modificador é uma obra de
              arte que transforma o comum no extraordinário."
            </MobileText>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}
