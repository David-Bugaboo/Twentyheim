import MobileSection from "../../components/MobileSection";
import MobileText from "../../components/MobileText";
import HeaderH1 from "../../components/HeaderH1";
import HeaderH2 from "../../components/HeaderH2";
import EquipmentCard from "../../components/EquipmentCard";
import QuickNavigation from "../../components/QuickNavigation";
import rangedWeaponsData from "./data/armas-a-distancia-refactor.json";
import PageTitle from "../../components/PageTitle";
import gameTermsData from "../rules/data/game-terms.json";

interface RangedWeapon {
  roll: string | null;
  id: string;
  name: string;
  type: string;
  damageModifier: string;
  purchaseCost: string;
  sellCost?: string;
  exclusive: string | null;
  flavorText: string;
  user: string | null;
  armorBonus: string | null;
  movePenalty: string | null;
  slots: string;
  effect: string | null;
  requirements: string | null;
  rarity?: number;
  availability?: string[];
  maxRange?: string;
  specialRules: Array<{
    label: string;
    value: string;
  }>;
}

export default function RangedWeaponsPage() {
  const weapons = rangedWeaponsData as RangedWeapon[];

  const navigationSections = [
    { id: "intro", title: "Armas a Distância", level: 0 },
    { id: "palavras-chave", title: "Palavras-chave de Armas", level: 0 },
    { id: "lista-armas", title: "Lista de Armas a Distância", level: 0 },
    ...weapons.map((weapon, index) => ({
      id: `weapon-${index}`,
      title: weapon.name,
      level: 1,
    })),
  ];

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <PageTitle>Armas a Distância</PageTitle>
          <QuickNavigation sections={navigationSections} />
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

            <div id="palavras-chave">
              <HeaderH1>Palavras-chave de Armas</HeaderH1>
              <MobileText>
                As armas a distância possuem características especiais que
                afetam seu uso em combate. Conhecer essas palavras-chave é
                essencial para entender como cada arma funciona.
              </MobileText>

              <div className="space-y-4 mt-6">
                {gameTermsData
                  .filter(
                    (term) =>
                      term.term.includes("Leve") ||
                      term.term.includes("Versátil") ||
                      term.term.includes("Par") ||
                      term.term.includes("Tóxica") ||
                      term.term.includes("Concussiva") ||
                      term.term.includes("Abençoada") ||
                      term.term.includes("Defensiva") ||
                      term.term.includes("Giros Brutais") ||
                      term.term.includes("Arma de Tecido") ||
                      term.term.includes("Hibrida") ||
                      term.term.includes("Corda de Alta Tensão") ||
                      term.term.includes("Recarga") ||
                      term.term.includes("Pistola") ||
                      term.term.includes("Capacidade") ||
                      term.term.includes("Engenharia Complexa") ||
                      term.term.includes("Coice Violento") ||
                      term.term.includes("Falha de Ignição") ||
                      term.term.includes("Trovejante") ||
                      term.term.includes("Construção Robusta") ||
                      term.term.includes("Tripé") ||
                      term.term.includes("Tiro de Dispersão")
                  )
                  .map((term, index) => (
                    <div
                      key={index}
                      id={`keyword-${index}`}
                      className="bg-green-900/20 border border-green-500/40 rounded-lg p-4"
                    >
                      <HeaderH2 className="text-green-300 mb-2">
                        {term.term}
                      </HeaderH2>
                      <div className="text-white text-sm">
                        {term.description}
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div id="lista-armas">
              <HeaderH1>Armas Disponíveis</HeaderH1>
            </div>

            {/* Weapons List */}
            {weapons.map((weapon, index) => (
              <div key={weapon.id || index} id={`weapon-${index}`}>
                <EquipmentCard
                  key={weapon.id || index}
                  name={weapon.name}
                  type={weapon.type}
                  damageModifier={weapon.damageModifier}
                  cost={weapon.purchaseCost}
                  spaces={weapon.slots}
                  description={weapon.flavorText ? [weapon.flavorText] : []}
                  exclusive={weapon.exclusive}
                  requirements={weapon.requirements}
                  specialRules={weapon.specialRules}
                  rarity={weapon.rarity}
                  availability={weapon.availability}
                  maxRange={weapon.maxRange}
                />
              </div>
            ))}

            <MobileText
              variant="quote"
              className="text-center text-lg leading-relaxed mt-8"
            >
              "Arcos que enviam flechas mortais, bestas que perfuram armaduras,
              fundas que arremessam pedras fatais. A morte que vem de longe."
            </MobileText>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}
