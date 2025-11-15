import { useEffect, useMemo, useState } from "react";
import { fetchEquipments } from "../../services/queries.service";
import type { EquipmentQueryResponse } from "../../services/queries.service";
import MobileSection from "../../components/MobileSection";
import MobileText from "../../components/MobileText";
import HeaderH1 from "../../components/HeaderH1";
import QuickNavigation from "../../components/QuickNavigation";
import PageTitle from "../../components/PageTitle";
import EquipmentDetailCard from "../../components/EquipmentDetailCard";

export default function ArmorAndShieldsPage() {
  const [armors, setArmors] = useState<EquipmentQueryResponse[]>([]);
  const [helmets, setHelmets] = useState<EquipmentQueryResponse[]>([]);
  const [shields, setShields] = useState<EquipmentQueryResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let abort = false;
    const controller = new AbortController();

    const loadEquipments = async () => {
      setLoading(true);
      setError(null);
      try {
        const [armorsData, helmetsData, shieldsData] = await Promise.all([
          fetchEquipments({ category: "Armadura" }, controller.signal),
          fetchEquipments({ category: "Elmo" }, controller.signal),
          fetchEquipments({ category: "Escudo" }, controller.signal),
        ]);
        if (!abort) {
          setArmors(armorsData);
          setHelmets(helmetsData);
          setShields(shieldsData);
        }
      } catch (err) {
        if (!abort) {
          console.error("Erro ao carregar armaduras e escudos:", err);
          setError("Não foi possível carregar as armaduras e escudos.");
        }
      } finally {
        if (!abort) {
          setLoading(false);
        }
      }
    };

    void loadEquipments();

    return () => {
      abort = true;
      controller.abort();
    };
  }, []);

  const navigationSections = useMemo(() => {
    const baseSections = [
      { id: "intro", title: "Armaduras e Escudos", level: 0 },
      { id: "atributos", title: "Atributos das Armaduras", level: 0 },
    ];

    if (armors.length > 0) {
      baseSections.push({
        id: "armaduras",
        title: "Armaduras Disponíveis",
        level: 0,
      });
    }

    if (helmets.length > 0) {
      baseSections.push({
        id: "elmos",
        title: "Elmos Disponíveis",
        level: 0,
      });
    }

    if (shields.length > 0) {
      baseSections.push({
        id: "escudos",
        title: "Escudos Disponíveis",
        level: 0,
      });
    }

    return baseSections;
  }, [armors.length, helmets.length, shields.length]);

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <QuickNavigation sections={navigationSections} />
          <MobileSection>
            <div id="intro">
              <PageTitle>Armaduras e Escudos</PageTitle>
            </div>
            <MobileText>
              Em Mordheim, onde cada ferimento pode ser fatal e cada proteção é
              preciosa, as armaduras e escudos são fundamentais para a
              sobrevivência. Cada peça de proteção tem suas próprias
              características, oferecendo diferentes níveis de proteção ao custo
              de mobilidade ou peso.
            </MobileText>

            <div id="atributos">
              <HeaderH1>Atributos das Armaduras</HeaderH1>
            </div>
            <MobileText>
              • <strong>Bônus de Armadura:</strong> Mostra quanto de proteção
              adicional a armadura oferece. Um bônus de "+2" significa que a
              armadura adiciona 2 pontos à armadura base da figura.
              <br />• <strong>Penalidade de Movimento:</strong> Indica se a
              armadura reduz a velocidade de movimento da figura.
              <br /> • <strong>Espaços:</strong> Indica quantos espaços de
              equipamento a armadura ocupa. Lembre-se de que heróis têm 5
              espaços e subordinados têm 4 espaços.
              <br />• <strong>Propriedades Especiais:</strong> Cada armadura
              pode ter regras especiais que modificam como ela funciona em
              combate.
            </MobileText>

            {loading ? (
              <MobileText>Carregando armaduras e escudos...</MobileText>
            ) : error ? (
              <MobileText className="text-red-300">{error}</MobileText>
            ) : (
              <>
                {armors.length > 0 && (
                  <div id="armaduras">
                    <HeaderH1>Armaduras Disponíveis</HeaderH1>
                    <div className="space-y-4 mt-6">
                      {armors.map(armor => (
                        <div
                          key={armor.slug || armor.id}
                          id={`armor-${armor.slug || armor.id}`}
                        >
                          <EquipmentDetailCard
                            equipment={armor}
                            showAvailability={true}
                            showExclusions={true}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {helmets.length > 0 && (
                  <div id="elmos">
                    <HeaderH1>Elmos Disponíveis</HeaderH1>
                    <div className="space-y-4 mt-6">
                      {helmets.map(helmet => (
                        <div
                          key={helmet.slug || helmet.id}
                          id={`helmet-${helmet.slug || helmet.id}`}
                        >
                          <EquipmentDetailCard
                            equipment={helmet}
                            showAvailability={true}
                            showExclusions={true}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {shields.length > 0 && (
                  <div id="escudos">
                    <HeaderH1>Escudos Disponíveis</HeaderH1>
                    <div className="space-y-4 mt-6">
                      {shields.map(shield => (
                        <div
                          key={shield.slug || shield.id}
                          id={`shield-${shield.slug || shield.id}`}
                        >
                          <EquipmentDetailCard
                            equipment={shield}
                            showAvailability={true}
                            showExclusions={true}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {armors.length === 0 &&
                  helmets.length === 0 &&
                  shields.length === 0 && (
                    <MobileText>
                      Nenhuma armadura, elmo ou escudo encontrado.
                    </MobileText>
                  )}
              </>
            )}

            <MobileText
              variant="quote"
              className="text-center text-lg leading-relaxed mt-8"
            >
              "Couro endurecido, cota de malha, placas de aço forjado. A
              proteção que separa os vivos dos mortos em Mordheim."
            </MobileText>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}
