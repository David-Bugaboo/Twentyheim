import { useEffect, useMemo, useState } from "react";
import { fetchEquipments } from "../../services/queries.service";
import type { EquipmentQueryResponse } from "../../services/queries.service";
import MobileSection from "../../components/MobileSection";
import MobileText from "../../components/MobileText";
import HeaderH1 from "../../components/HeaderH1";
import QuickNavigation from "../../components/QuickNavigation";
import PageTitle from "../../components/PageTitle";
import EquipmentDetailCard from "../../components/EquipmentDetailCard";

export default function RangedWeaponsPage() {
  const [weapons, setWeapons] = useState<EquipmentQueryResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let abort = false;
    const controller = new AbortController();

    const loadWeapons = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchEquipments(
          { category: "Arma a Distância" },
          controller.signal
        );
        if (!abort) {
          setWeapons(data);
        }
      } catch (err) {
        if (!abort) {
          console.error("Erro ao carregar armas a distância:", err);
          setError("Não foi possível carregar as armas a distância.");
        }
      } finally {
        if (!abort) {
          setLoading(false);
        }
      }
    };

    void loadWeapons();

    return () => {
      abort = true;
      controller.abort();
    };
  }, []);

  const navigationSections = useMemo(() => {
    const baseSections = [
      { id: "intro", title: "Armas a Distância", level: 0 },
      { id: "lista-armas", title: "Lista de Armas a Distância", level: 0 },
    ];
    return [
      ...baseSections,
      ...weapons.map((weapon, index) => ({
        id: `weapon-${weapon.slug || index}`,
        title: weapon.name || `Arma ${index + 1}`,
        level: 1,
      })),
    ];
  }, [weapons]);

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <PageTitle>Armas a Distância</PageTitle>
          <QuickNavigation sections={navigationSections} loading={loading} />
          <MobileSection>
            <div id="intro">
              <MobileText>
                Em Mordheim, onde o combate corpo a corpo pode ser mortal, as
                armas a distância oferecem uma vantagem crucial. Arcos, bestas,
                fundas e outras armas de projétil permitem que os guerreiros
                ataquem seus inimigos antes que eles possam se aproximar.
              </MobileText>
            </div>

            <HeaderH1>Atributos das Armas a Distância</HeaderH1>
            <MobileText>
              • <strong>Alcance:</strong> Indica a distância máxima em que a
              arma pode ser usada efetivamente. Acima do alcance máximo, a arma
              não pode ser usada.
              <br />• <strong>Modificador de Dano:</strong> Mostra quanto dano
              adicional a arma causa além da Força do portador. Um modificador
              de "+2" significa que a arma causa 2 pontos de dano a mais.
              <br />• <strong>Espaços:</strong> Indica quantos espaços de
              equipamento a arma ocupa. Lembre-se que Heróis têm 5 espaços e
              Subordinados têm 4 espaços.
              <br />• <strong>Requisitos:</strong> Algumas armas precisam de
              equipamentos adicionais, como aljavas para arcos e bestas.
              <br />• <strong>Propriedades Especiais:</strong> Cada arma pode
              ter regras especiais que modificam como ela funciona em combate.
            </MobileText>

            <div id="lista-armas">
              <HeaderH1>Armas Disponíveis</HeaderH1>

              {loading ? (
                <MobileText>Carregando armas a distância...</MobileText>
              ) : error ? (
                <MobileText className="text-red-300">{error}</MobileText>
              ) : weapons.length === 0 ? (
                <MobileText>Nenhuma arma a distância encontrada.</MobileText>
              ) : (
                <div className="space-y-4 mt-6">
                  {weapons.map(weapon => (
                    <div
                      key={weapon.slug || weapon.id}
                      id={`weapon-${weapon.slug || weapon.id}`}
                    >
                      <EquipmentDetailCard
                        equipment={weapon}
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
                "Arcos que enviam flechas mortais, bestas que perfuram
                armaduras, fundas que arremessam pedras fatais. A morte que vem
                de longe."
              </MobileText>
            </div>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}
