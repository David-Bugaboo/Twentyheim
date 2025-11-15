import { useEffect, useMemo, useState } from "react";
import { fetchEquipments } from "../../services/queries.service";
import type { EquipmentQueryResponse } from "../../services/queries.service";
import MobileSection from "../../components/MobileSection";
import MobileText from "../../components/MobileText";
import HeaderH1 from "../../components/HeaderH1";
import QuickNavigation from "../../components/QuickNavigation";
import PageTitle from "../../components/PageTitle";
import EquipmentDetailCard from "../../components/EquipmentDetailCard";

export default function RemediesAndPoisonsPage() {
  const [items, setItems] = useState<EquipmentQueryResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let abort = false;
    const controller = new AbortController();

    const loadItems = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchEquipments(
          { category: "Remédios e Venenos" },
          controller.signal
        );
        if (!abort) {
          setItems(data);
        }
      } catch (err) {
        if (!abort) {
          console.error("Erro ao carregar remédios e venenos:", err);
          setError("Não foi possível carregar os remédios e venenos.");
        }
      } finally {
        if (!abort) {
          setLoading(false);
        }
      }
    };

    void loadItems();

    return () => {
      abort = true;
      controller.abort();
    };
  }, []);

  const navigationSections = useMemo(() => {
    const baseSections = [
      { id: "intro", title: "Remédios e Venenos", level: 0 },
      { id: "tipos", title: "Tipos de Remédios e Venenos", level: 0 },
      { id: "como-usar", title: "Como Usar", level: 0 },
      { id: "lista-itens", title: "Remédios e Venenos Disponíveis", level: 0 },
    ];
    return [
      ...baseSections,
      ...items.map((item, index) => ({
        id: `item-${item.slug || index}`,
        title: item.name || `Item ${index + 1}`,
        level: 1,
      })),
    ];
  }, [items]);

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <PageTitle>Remédios e Venenos</PageTitle>
          <QuickNavigation sections={navigationSections} loading={loading} />
          <MobileSection>
            <div id="intro">
              <MobileText>
                Em Mordheim, onde cada ferimento pode ser fatal e cada vantagem
                é preciosa, remédios e venenos representam o lado sombrio da
                alquimia e da medicina. Desde poções curativas abençoadas pelas
                deusas até venenos mortais extraídos de figuras monstruosas,
                estes itens podem salvar ou condenar vidas.
              </MobileText>
            </div>

            <div id="tipos">
              <HeaderH1>Tipos de Remédios e Venenos</HeaderH1>
              <MobileText>
                • <strong>Remédios:</strong> Poções e substâncias que curam
                feridas, restauram vitalidade ou conferem benefícios
                temporários.
                <br />• <strong>Venenos:</strong> Substâncias tóxicas aplicadas
                em armas para causar danos adicionais ou efeitos debilitantes.
                <br />• <strong>Drogas:</strong> Substâncias que alteram as
                capacidades físicas e mentais do usuário, geralmente com efeitos
                colaterais.
                <br />• <strong>Poções:</strong> Misturas alquímicas com efeitos
                mágicos ou medicinais específicos.
              </MobileText>
            </div>

            <div id="como-usar">
              <HeaderH1>Como Usar</HeaderH1>
              <MobileText>
                • <strong>Aplicação:</strong> A maioria dos venenos são
                aplicados em armas como ação, enquanto remédios são consumidos.
                <br />• <strong>Duração:</strong> Efeitos geralmente duram até o
                fim do jogo ou da batalha.
                <br />• <strong>Restrições:</strong> Alguns itens têm
                disponibilidade limitada a certos bandos ou raças.
                <br />• <strong>Efeitos Colaterais:</strong> Muitas substâncias
                têm consequências negativas além de seus benefícios.
              </MobileText>
            </div>

            <div id="lista-itens">
              <HeaderH1>Remédios e Venenos Disponíveis</HeaderH1>

              {loading ? (
                <MobileText>Carregando remédios e venenos...</MobileText>
              ) : error ? (
                <MobileText className="text-red-300">{error}</MobileText>
              ) : items.length === 0 ? (
                <MobileText>Nenhum remédio ou veneno encontrado.</MobileText>
              ) : (
                <div className="space-y-4 mt-6">
                  {items.map(item => (
                    <div
                      key={item.slug || item.id}
                      id={`item-${item.slug || item.id}`}
                    >
                      <EquipmentDetailCard
                        equipment={item}
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
                "Poções que curam feridas mortais, venenos que matam sem som,
                drogas que transformam covardes em heróis. A alquimia da
                sobrevivência em Mordheim."
              </MobileText>
            </div>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}
