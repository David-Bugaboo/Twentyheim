import MobileSection from "../../components/MobileSection";
import MobileText from "../../components/MobileText";
import HeaderH1 from "../../components/HeaderH1";
import EquipmentCard from "../../components/EquipmentCard";
import firearmsData from "./data/armas-de-fogo-refactor.json";
import headerImage from "../../assets/header-art/874ab363-3678-45ab-84a8-7ffd64527398.png";
import MobileHeroHeader from "../../components/MobileHeroHeader";

interface Firearm {
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
  maxRange?: string;
  specialRules: Array<{
    label: string;
    value: string;
  }>;
}

export default function FirearmsPage() {
  const firearms = firearmsData as Firearm[];

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <MobileHeroHeader title="Armas de Fogo" imageUrl={headerImage} />
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <MobileSection>
            <MobileText>
              Em Mordheim, onde a magia e a tecnologia se misturam de forma
              perigosa, as armas de fogo representam o poder devastador da
              pólvora negra. Estas armas são raras, caras e extremamente
              perigosas - tanto para o inimigo quanto para quem as empunha. Cada
              disparo pode ser o último, seja pela explosão da arma ou pela ira
              dos deuses.
            </MobileText>

            <HeaderH1>Atributos das Armas de Fogo</HeaderH1>
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
              <br />• <strong>Requisitos:</strong> Todas as armas de fogo
              precisam de um Chifre de Pólvora para funcionar.
              <br />• <strong>Propriedades Especiais:</strong> Cada arma de fogo
              tem regras únicas, incluindo falhas de ignição, coice violento e
              penetração de armadura.
            </MobileText>

            <HeaderH1>Armas Disponíveis</HeaderH1>

            {/* Firearms List */}
            {firearms.map((firearm, index) => (
              <EquipmentCard
                key={firearm.id || index}
                name={firearm.name}
                type={firearm.type}
                damageModifier={firearm.damageModifier}
                cost={firearm.purchaseCost}
                spaces={firearm.slots}
                description={firearm.flavorText ? [firearm.flavorText] : []}
                exclusive={firearm.exclusive}
                requirements={firearm.requirements}
                specialRules={firearm.specialRules}
                rarity={firearm.rarity}
                availability={firearm.availability}
                maxRange={firearm.maxRange}
              />
            ))}

            <MobileText
              variant="quote"
              className="text-center text-lg leading-relaxed mt-8"
            >
              "Pistolas que cospem fogo e fumaça, mosquetes que ecoam como
              trovão, canhões portáteis que destroem tudo em seu caminho. A
              tecnologia da morte."
            </MobileText>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}
