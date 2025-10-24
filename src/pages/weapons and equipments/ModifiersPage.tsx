import MobileSection from "../../components/MobileSection";
import MobileText from "../../components/MobileText";
import HeaderH1 from "../../components/HeaderH1";
import EquipmentCard from "../../components/EquipmentCard";
import meleeModifiersData from "./data/modificadores-de-arma-refactor.json";
import rangedModifiersData from "./data/modificadores-de-arma-a-distancia-refactor.json";

import firearmModifiersData from "./data/modificadores-de-armas-de-fogo-refactor.json";

import PageTitle from "../../components/PageTitle";

interface Modifier {
  roll?: string | null;
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

export default function ModifiersPage() {
  const meleeModifiers = meleeModifiersData as Modifier[];
  const rangedModifiers = rangedModifiersData as Modifier[];

  const firearmModifiers = firearmModifiersData as Modifier[];



  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <PageTitle>Modificadores de Equipamento</PageTitle>
          <MobileSection>
            <MobileText>
              Em Mordheim, onde cada vantagem pode significar a diferença entre
              a vida e a morte, os modificadores de equipamento representam o
              refinamento supremo da tecnologia e da magia. Estes aprimoramentos
              transformam armas e armaduras comuns em artefatos de poder
              extraordinário, criados pelos melhores artesãos e ferreiros do
              mundo.
            </MobileText>

            <HeaderH1>Como Funcionam os Modificadores</HeaderH1>
            <MobileText>
              • <strong>Aplicação:</strong> Modificadores são aplicados a armas
              ou armaduras existentes, modificando suas propriedades base.
              <br />• <strong>Custo:</strong> O custo é calculado multiplicando
              o preço base do equipamento pelo multiplicador do modificador.
              <br />• <strong>Espaços:</strong> Cada modificador ocupa 1 espaço
              de equipamento adicional.
              <br />• <strong>Efeitos:</strong> Modificadores podem alterar
              dano, alcance, penetração de armadura, movimento e outras
              propriedades.
              <br />• <strong>Restrições:</strong> Alguns modificadores têm
              disponibilidade limitada a certos bandos ou raças.
            </MobileText>

            <HeaderH1>Modificadores de Armas Corpo a Corpo</HeaderH1>
            <MobileText className="mb-4">
              Aprimoramentos para lâminas, maças, lanças e outras armas de
              combate próximo.
            </MobileText>

            {meleeModifiers.map((modifier, index) => (
              <EquipmentCard
                key={modifier.id || index}
                name={modifier.name}
                type={modifier.type}
                damageModifier={modifier.damageModifier}
                cost={modifier.purchaseCost}
                spaces={modifier.slots}
                description={modifier.flavorText ? [modifier.flavorText] : []}
                exclusive={modifier.exclusive}
                requirements={modifier.requirements}
                specialRules={modifier.specialRules}
                rarity={modifier.rarity}
                availability={modifier.availability}
                effect={modifier.effect}
              />
            ))}

            <HeaderH1>Modificadores de Armas a Distância</HeaderH1>
            <MobileText className="mb-4">
              Melhorias para arcos, bestas e outras armas de projétil.
            </MobileText>

            {rangedModifiers.map((modifier, index) => (
              <EquipmentCard
                key={modifier.id || index}
                name={modifier.name}
                type={modifier.type}
                damageModifier={modifier.damageModifier}
                cost={modifier.purchaseCost}
                spaces={modifier.slots}
                description={modifier.flavorText ? [modifier.flavorText] : []}
                exclusive={modifier.exclusive}
                requirements={modifier.requirements}
                specialRules={modifier.specialRules}
                rarity={modifier.rarity}
                availability={modifier.availability}
                effect={modifier.effect}
              />
            ))}

            

            <HeaderH1>Modificadores de Armas de Fogo</HeaderH1>
            <MobileText className="mb-4">
              Melhorias para pistolas, arcabuzes e outras armas de pólvora.
            </MobileText>

            {firearmModifiers.map((modifier, index) => (
              <EquipmentCard
                key={modifier.id || index}
                name={modifier.name}
                type={modifier.type}
                damageModifier={modifier.damageModifier}
                cost={modifier.purchaseCost}
                spaces={modifier.slots}
                description={modifier.flavorText ? [modifier.flavorText] : []}
                exclusive={modifier.exclusive}
                requirements={modifier.requirements}
                specialRules={modifier.specialRules}
                rarity={modifier.rarity}
                availability={modifier.availability}
                effect={modifier.effect}
              />
            ))}

            <MobileText
              variant="quote"
              className="text-center text-lg leading-relaxed mt-8"
            >
              "Da forja dos Anões ao trabalho élfico, dos segredos de Cathay às
              criações dos Engenheiros de Nuln. Cada modificador é uma obra de
              arte que transforma o comum no extraordinário."
            </MobileText>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}
