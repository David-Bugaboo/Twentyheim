import MobileSection from "../../components/MobileSection";
import MobileText from "../../components/MobileText";
import HeaderH1 from "../../components/HeaderH1";
import EquipmentCard from "../../components/EquipmentCard";
import armorAndShieldsData from "./data/armaduras-e-escudos-refactor.json";
import PageTitle from "../../components/PageTitle";

interface ArmorAndShield {
  roll: string | null;
  id: string;
  name: string;
  type: string;
  damageModifier: string | null;
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
  specialRules: Array<{
    label: string;
    value: string;
  }>;
}

export default function ArmorAndShieldsPage() {
  const armors = armorAndShieldsData as ArmorAndShield[];

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <PageTitle>Armaduras e Escudos</PageTitle>
          <MobileSection>
            <MobileText>
              Em Mordheim, onde cada ferimento pode ser fatal e cada proteção é
              preciosa, as armaduras e escudos são fundamentais para a
              sobrevivência. Cada peça de proteção tem suas próprias
              características, oferecendo diferentes níveis de proteção ao custo
              de mobilidade ou peso.
            </MobileText>

            <HeaderH1>Atributos das Armaduras</HeaderH1>
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

            <HeaderH1>Armaduras Disponíveis</HeaderH1>

            {/* Armor List */}
            {armors.map((armor, index) => (
              <EquipmentCard
                key={armor.id || index}
                name={armor.name}
                type={armor.type}
                damageModifier={armor.damageModifier}
                cost={armor.purchaseCost}
                spaces={armor.slots}
                description={armor.flavorText ? [armor.flavorText] : []}
                exclusive={armor.exclusive}
                requirements={armor.requirements}
                specialRules={armor.specialRules}
                rarity={armor.rarity}
                availability={armor.availability}
                armorBonus={armor.armorBonus}
                movePenalty={armor.movePenalty}
              />
            ))}

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
