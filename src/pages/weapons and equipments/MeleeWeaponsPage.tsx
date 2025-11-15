import { useEffect, useMemo, useState } from "react";
import { fetchEquipments } from "../../services/queries.service";
import type { EquipmentQueryResponse } from "../../services/queries.service";
import MobileSection from "../../components/MobileSection";
import MobileText from "../../components/MobileText";
import HeaderH1 from "../../components/HeaderH1";
import QuickNavigation from "../../components/QuickNavigation";
import PageTitle from "../../components/PageTitle";
import EquipmentDetailCard from "../../components/EquipmentDetailCard";

export default function MeleeWeaponsPage() {
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
          { category: "Arma Corpo a Corpo" },
          controller.signal
        );
        if (!abort) {
          setWeapons(data);
        }
      } catch (err) {
        if (!abort) {
          console.error("Erro ao carregar armas corpo a corpo:", err);
          setError("Não foi possível carregar as armas corpo a corpo.");
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
      { id: "intro", title: "Armas Corpo a Corpo", level: 0 },
      { id: "lista-armas", title: "Lista de Armas Corpo a Corpo", level: 0 },
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
          <PageTitle>Armas Corpo a Corpo</PageTitle>
          <QuickNavigation sections={navigationSections} loading={loading} />
          <MobileSection>
            <div id="intro">
              <MobileText>
                Em Mordheim, onde as ruas estreitas e os edifícios em ruínas
                forçam combates próximos, as armas corpo a corpo são
                fundamentais para a sobrevivência. Cada arma tem suas próprias
                características, vantagens e desvantagens, moldando o estilo de
                combate de quem as empunha.
              </MobileText>
            </div>

            <HeaderH1>Atributos das Armas</HeaderH1>
            <MobileText>
              • <strong>Modificador de Dano:</strong> Mostra quanto dano
              adicional a arma causa além da Força do portador. Um modificador
              de "+2" significa que a arma causa 2 pontos de dano a mais.
              <br />• <strong>Espaços:</strong> Indica quantos espaços de
              equipamento a arma ocupa. Lembre-se que Heróis têm 5 espaços e
              Subordinados têm 4 espaços.
              <br />• <strong>Propriedades Especiais:</strong> Cada arma pode
              ter regras especiais que modificam como ela funciona em combate.
            </MobileText>

            <div id="lista-armas">
              <HeaderH1>Armas Disponíveis</HeaderH1>

              {loading ? (
                <MobileText>Carregando armas corpo a corpo...</MobileText>
              ) : error ? (
                <MobileText className="text-red-300">{error}</MobileText>
              ) : weapons.length === 0 ? (
                <MobileText>Nenhuma arma corpo a corpo encontrada.</MobileText>
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
                "Lâminas que cortam carne e ossos, maças que esmagam crânios,
                lanças que perfuram corações. O arsenal do combate direto onde
                cada golpe pode ser o último."
              </MobileText>
            </div>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}
