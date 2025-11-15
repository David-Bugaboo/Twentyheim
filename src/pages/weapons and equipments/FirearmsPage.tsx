import { useEffect, useMemo, useState } from "react";
import { fetchEquipments } from "../../services/queries.service";
import type { EquipmentQueryResponse } from "../../services/queries.service";
import MobileSection from "../../components/MobileSection";
import MobileText from "../../components/MobileText";
import HeaderH1 from "../../components/HeaderH1";
import HeaderH2 from "../../components/HeaderH2";
import QuickNavigation from "../../components/QuickNavigation";
import PageTitle from "../../components/PageTitle";
import EquipmentDetailCard from "../../components/EquipmentDetailCard";
import GenericTable from "../../components/GenericTable";

export default function FirearmsPage() {
  const [firearms, setFirearms] = useState<EquipmentQueryResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let abort = false;
    const controller = new AbortController();

    const loadFirearms = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchEquipments(
          { category: "Arma de Fogo" },
          controller.signal
        );
        if (!abort) {
          setFirearms(data);
        }
      } catch (err) {
        if (!abort) {
          console.error("Erro ao carregar armas de fogo:", err);
          setError("Não foi possível carregar as armas de fogo.");
        }
      } finally {
        if (!abort) {
          setLoading(false);
        }
      }
    };

    void loadFirearms();

    return () => {
      abort = true;
      controller.abort();
    };
  }, []);

  const navigationSections = useMemo(() => {
    const baseSections = [
      { id: "intro", title: "Armas de Fogo", level: 0 },
      { id: "falha-ignicao", title: "Falha de Ignição", level: 0 },
      { id: "lista-equipamentos", title: "Lista de Armas de Fogo", level: 0 },
    ];
    return [
      ...baseSections,
      ...firearms.map((firearm, index) => ({
        id: `item-${firearm.slug || index}`,
        title: firearm.name || `Arma ${index + 1}`,
        level: 1,
      })),
    ];
  }, [firearms]);

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <PageTitle>Armas de Fogo</PageTitle>
          <QuickNavigation sections={navigationSections} loading={loading} />
          <MobileSection>
            <div id="intro">
              <MobileText>
                Em Mordheim, onde a magia e a tecnologia se misturam de forma
                perigosa, as armas de fogo representam o poder devastador da
                pólvora negra. Estas armas são raras, caras e extremamente
                perigosas - tanto para o inimigo quanto para quem as empunha.
                Cada disparo pode ser o último, seja pela explosão da arma ou
                pela ira dos deuses.
              </MobileText>
            </div>

            <HeaderH1>Atributos das Armas de Fogo</HeaderH1>
            <MobileText>
              <br />• <strong>Alcance:</strong> Indica a distância máxima em que
              a arma pode ser usada efetivamente. Acima do alcance máximo, a
              arma não pode ser usada.
              <br />• <strong>Modificador de Dano:</strong> Mostra quanto dano
              adicional a arma causa além da Força do portador. Um modificador
              de "+2" significa que a arma causa 2 pontos de dano a mais.
              <br />• <strong>Palavras-chave:</strong> Cada arma de fogo tem
              regras únicas, incluindo falhas de ignição, coice violento e
              penetração de armadura.
            </MobileText>

            <div id="falha-ignicao">
              <HeaderH1>Falha de Ignição</HeaderH1>
              <MobileText>
                As armas de fogo são perigosas e imprevisíveis. Quando uma arma
                de fogo falha, as consequências podem ser catastróficas tanto
                para o atirador quanto para aqueles ao seu redor.
              </MobileText>

              <HeaderH2 className="text-green-300 mt-6 mb-3">
                Como Funciona
              </HeaderH2>
              <MobileText>
                A Falha de Ignição é desencadeada quando um atirador rola um{" "}
                <strong>1 natural</strong> em uma rolagem de ataque a distância
                com uma arma de fogo. Cada vez que uma arma desencadeia uma
                falha na ignição, a faixa de falha aumenta em 1.
              </MobileText>

              <div className="mt-4 space-y-2">
                <MobileText>
                  <strong>Exemplo:</strong>
                </MobileText>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-300 ml-4">
                  <li>
                    <strong>Primeira falha:</strong> A arma falha em 1
                  </li>
                  <li>
                    <strong>Segunda falha:</strong> A arma falha em 1-2
                  </li>
                  <li>
                    <strong>Terceira falha:</strong> A arma falha em 1-3
                  </li>
                  <li>
                    <strong>E assim sucessivamente...</strong>
                  </li>
                </ul>
              </div>

              <HeaderH2 className="text-green-300 mt-6 mb-3">
                Tabela de Resultados
              </HeaderH2>
              <MobileText>
                Quando uma Falha de Ignição ocorre, role outro d20 para
                determinar o resultado:
              </MobileText>

              <div className="mt-4">
                <GenericTable
                  data={[
                    {
                      Rolagem: "1-5",
                      Resultado: "A Arma Apenas Engasga",
                      Efeito:
                        "A arma apenas engasga. Deve gastar uma ação, que pode substituir a ação de movimento, para consertar.",
                    },
                    {
                      Rolagem: "6-10",
                      Resultado: "Falha Espetacular",
                      Efeito:
                        "A arma falha de maneira espetacular. Não pode mais ser usada durante aquele jogo apenas.",
                    },
                    {
                      Rolagem: "11-15",
                      Resultado: "Explosão na Arma",
                      Efeito:
                        "A pólvora explode na arma, danificando o atirador. Ele sofre um ataque à distância +1. A Arma é perdida para sempre.",
                    },
                    {
                      Rolagem: "16-20",
                      Resultado: "Explosão Catastrófica",
                      Efeito:
                        "A pólvora explode espetacularmente e reage com o chifre de pólvora do atirador, danificando o atirador. O atirador e todas as figuras a até 8cm dele sofrem um ataque à distância +1. A Arma e o chifre de pólvora estão perdidos para sempre.",
                    },
                  ]}
                />
              </div>
            </div>

            <div id="lista-equipamentos">
              <HeaderH1>Armas Disponíveis</HeaderH1>

              {loading ? (
                <MobileText>Carregando armas de fogo...</MobileText>
              ) : error ? (
                <MobileText className="text-red-300">{error}</MobileText>
              ) : firearms.length === 0 ? (
                <MobileText>Nenhuma arma de fogo encontrada.</MobileText>
              ) : (
                <div className="space-y-4 mt-6">
                  {firearms.map(firearm => (
                    <div
                      key={firearm.slug || firearm.id}
                      id={`item-${firearm.slug || firearm.id}`}
                    >
                      <EquipmentDetailCard
                        equipment={firearm}
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
                "Pistolas que cospem fogo e fumaça, mosquetes que ecoam como
                trovão, canhões portáteis que destroem tudo em seu caminho. A
                tecnologia da morte."
              </MobileText>
            </div>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}
