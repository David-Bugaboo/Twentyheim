import MobileSection from "../../components/MobileSection";
import MobileText from "../../components/MobileText";
import HeaderH1 from "../../components/HeaderH1";
import EquipmentCard from "../../components/EquipmentCard";
import rangedWeaponsData from "./data/armas-a-distancia-refactor.json";
import headerImage from "../../assets/header-art/874ab363-3678-45ab-84a8-7ffd64527398.png";
import MobileHeroHeader from "../../components/MobileHeroHeader";

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

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <MobileHeroHeader title="Armas a Distância" imageUrl={headerImage} />
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <MobileSection>
            <MobileText>
              Em Mordheim, onde o combate corpo a corpo pode ser mortal, as
              armas a distância oferecem uma vantagem crucial. Arcos, bestas,
              fundas e outras armas de projétil permitem que os guerreiros
              ataquem seus inimigos antes que eles possam se aproximar.
            </MobileText>

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

            <HeaderH1>Armas Disponíveis</HeaderH1>

            {/* Weapons List */}
            {weapons.map((weapon, index) => (
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
