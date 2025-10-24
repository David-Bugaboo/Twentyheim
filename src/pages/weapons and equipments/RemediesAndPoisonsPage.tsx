import MobileSection from "../../components/MobileSection";
import MobileText from "../../components/MobileText";
import HeaderH1 from "../../components/HeaderH1";
import EquipmentCard from "../../components/EquipmentCard";
import remediesAndPoisonsData from "./data/remedios-e-venenos.json";

import PageTitle from "../../components/PageTitle";

interface RemedyOrPoison {
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

export default function RemediesAndPoisonsPage() {
  const remediesAndPoisons = remediesAndPoisonsData as RemedyOrPoison[];

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <PageTitle>Remédios e Venenos</PageTitle>
          <MobileSection>
            <MobileText>
              Em Mordheim, onde cada ferimento pode ser fatal e cada vantagem é
              preciosa, remédios e venenos representam o lado sombrio da
              alquimia e da medicina. Desde poções curativas abençoadas pelas
              deusas até venenos mortais extraídos de figuras monstruosas, estes
              itens podem salvar ou condenar vidas.
            </MobileText>

            <HeaderH1>Tipos de Remédios e Venenos</HeaderH1>
            <MobileText>
              • <strong>Remédios:</strong> Poções e substâncias que curam
              feridas, restauram vitalidade ou conferem benefícios temporários.
              <br />• <strong>Venenos:</strong> Substâncias tóxicas aplicadas em
              armas para causar danos adicionais ou efeitos debilitantes.
              <br />• <strong>Drogas:</strong> Substâncias que alteram as
              capacidades físicas e mentais do usuário, geralmente com efeitos
              colaterais.
              <br />• <strong>Poções:</strong> Misturas alquímicas com efeitos
              mágicos ou medicinais específicos.
            </MobileText>

            <HeaderH1>Como Usar</HeaderH1>
            <MobileText>
              • <strong>Aplicação:</strong> A maioria dos venenos são aplicados
              em armas como ação, enquanto remédios são consumidos.
              <br />• <strong>Duração:</strong> Efeitos geralmente duram até o
              fim do jogo ou da batalha.
              <br />• <strong>Restrições:</strong> Alguns itens têm
              disponibilidade limitada a certos bandos ou raças.
              <br />• <strong>Efeitos Colaterais:</strong> Muitas substâncias
              têm consequências negativas além de seus benefícios.
            </MobileText>

            <HeaderH1>Remédios e Venenos Disponíveis</HeaderH1>

            {/* Remedies and Poisons List */}
            {remediesAndPoisons.map((item, index) => (
              <EquipmentCard
                key={item.id || index}
                name={item.name}
                type={item.type}
                damageModifier={item.damageModifier}
                cost={item.purchaseCost}
                spaces={item.slots}
                description={item.flavorText ? [item.flavorText] : []}
                exclusive={item.exclusive}
                requirements={item.requirements}
                specialRules={item.specialRules}
                rarity={item.rarity}
                availability={item.availability}
                effect={item.effect}
              />
            ))}

            <MobileText
              variant="quote"
              className="text-center text-lg leading-relaxed mt-8"
            >
              "Poções que curam feridas mortais, venenos que matam sem som,
              drogas que transformam covardes em heróis. A alquimia da
              sobrevivência em Mordheim."
            </MobileText>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}
