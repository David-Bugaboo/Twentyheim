import { useEffect, useMemo, useState } from "react";
import { fetchEquipments } from "../../services/queries.service";
import type { EquipmentQueryResponse } from "../../services/queries.service";
import MobileSection from "../../components/MobileSection";
import MobileText from "../../components/MobileText";
import HeaderH1 from "../../components/HeaderH1";
import QuickNavigation from "../../components/QuickNavigation";
import PageTitle from "../../components/PageTitle";
import EquipmentDetailCard from "../../components/EquipmentDetailCard";

export default function AccessoriesPage() {
  const [accessories, setAccessories] = useState<EquipmentQueryResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let abort = false;
    const controller = new AbortController();

    const loadAccessories = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchEquipments(
          { category: "Acessórios" },
          controller.signal
        );
        if (!abort) {
          setAccessories(data);
        }
      } catch (err) {
        if (!abort) {
          console.error("Erro ao carregar acessórios:", err);
          setError("Não foi possível carregar os acessórios.");
        }
      } finally {
        if (!abort) {
          setLoading(false);
        }
      }
    };

    void loadAccessories();

    return () => {
      abort = true;
      controller.abort();
    };
  }, []);

  const navigationSections = useMemo(() => {
    const baseSections = [
      { id: "intro", title: "Acessórios", level: 0 },
      { id: "tipos", title: "Tipos de Acessórios", level: 0 },
      { id: "como-usar", title: "Como Usar Acessórios", level: 0 },
      { id: "lista-acessorios", title: "Acessórios Disponíveis", level: 0 },
    ];
    return [
      ...baseSections,
      ...accessories.map((accessory, index) => ({
        id: `accessory-${accessory.slug || index}`,
        title: accessory.name || `Acessório ${index + 1}`,
        level: 1,
      })),
    ];
  }, [accessories]);

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <PageTitle>Acessórios</PageTitle>
          <QuickNavigation sections={navigationSections} loading={loading} />
          <MobileSection>
            <div id="intro">
              <MobileText>
                Em Mordheim, onde cada vantagem pode significar a diferença
                entre a vida e a morte, os acessórios representam as
                ferramentas, itens mágicos e equipamentos especiais que podem
                dar a um guerreiro a vantagem crucial que ele precisa. Desde
                amuletos abençoados até ferramentas de artesão, cada acessório
                tem seu propósito único.
              </MobileText>
            </div>

            <div id="tipos">
              <HeaderH1>Tipos de Acessórios</HeaderH1>
              <MobileText>
                • <strong>Amuletos:</strong> Itens mágicos que conferem
                proteção, sorte ou outras bênçãos sobrenaturais.
                <br />• <strong>Ferramentas:</strong> Equipamentos práticos que
                auxiliam em tarefas específicas ou conferem vantagens táticas.
                <br />• <strong>Armazenamento:</strong> Itens necessários para
                carregar munição e outros suprimentos essenciais.
                <br />• <strong>Iluminação:</strong> Tochas, lanternas e outras
                fontes de luz para navegar nas sombras de Mordheim.
                <br />• <strong>Servos:</strong> Figuras ou assistentes que
                auxiliam seus mestres em batalha.
                <br />• <strong>Livros e Tomos:</strong> Conhecimento proibido
                ou sagrado que confere poderes especiais.
              </MobileText>
            </div>

            <div id="como-usar">
              <HeaderH1>Como Usar Acessórios</HeaderH1>
              <MobileText>
                • <strong>Restrições:</strong> Alguns acessórios só podem ser
                equipados por heróis ou figuras específicas.
                <br /> • <strong>Limitações:</strong> Apenas um tipo de
                acessório pode ser carregado por vez (ex.: apenas 1 amuleto, 1
                anel, 1 manto).
                <br />• <strong>Duração:</strong> Alguns acessórios são
                descartados após o uso, outros são permanentes.
                <br />• <strong>Efeitos Únicos:</strong> Cada acessório tem
                propriedades especiais que podem ser ativadas durante o jogo.
              </MobileText>
            </div>

            <div id="lista-acessorios">
              <HeaderH1>Acessórios Disponíveis</HeaderH1>

              {loading ? (
                <MobileText>Carregando acessórios...</MobileText>
              ) : error ? (
                <MobileText className="text-red-300">{error}</MobileText>
              ) : accessories.length === 0 ? (
                <MobileText>Nenhum acessório encontrado.</MobileText>
              ) : (
                <div className="space-y-4 mt-6">
                  {accessories.map(accessory => (
                    <div
                      key={accessory.slug || accessory.id}
                      id={`accessory-${accessory.slug || accessory.id}`}
                    >
                      <EquipmentDetailCard
                        equipment={accessory}
                        showAvailability={true}
                        showExclusions={true}
                      />
                    </div>
                  ))}
                </div>
              )}

              <MobileText
                variant="quote"
                className="text-center text-lg leading-relaxed mt-8"
              >
                "Acessórios, ferramentas, consumíveis e itens especiais. Tudo o
                que um guerreiro precisa além de suas armas para sobreviver na
                cidade amaldiçoada."
              </MobileText>
            </div>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}
