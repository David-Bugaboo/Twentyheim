import MobileSection from "../../components/MobileSection";
import MobileText from "../../components/MobileText";
import HeaderH1 from "../../components/HeaderH1";
import EquipmentCard from "../../components/EquipmentCard";
import accessoriesData from "./data/acessorios-refactor.json";
import PageTitle from "../../components/PageTitle";

interface Accessory {
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

export default function AccessoriesPage() {
  const accessories = accessoriesData as Accessory[];

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <PageTitle>Acessórios</PageTitle>
          <MobileSection>
            <MobileText>
              Em Mordheim, onde cada vantagem pode significar a diferença entre a
              vida e a morte, os acessórios representam as ferramentas, itens
              mágicos e equipamentos especiais que podem dar a um guerreiro a
              vantagem crucial que ele precisa. Desde amuletos abençoados até
              ferramentas de artesão, cada acessório tem seu propósito único.
            </MobileText>

            <HeaderH1>Tipos de Acessórios</HeaderH1>
            <MobileText>
              • <strong>Amuletos:</strong> Itens mágicos que conferem proteção,
              sorte ou outras bênçãos sobrenaturais.
              <br />• <strong>Ferramentas:</strong> Equipamentos práticos que
              auxiliam em tarefas específicas ou conferem vantagens táticas.
              <br />• <strong>Armazenamento:</strong> Itens necessários para
              carregar munição e outros suprimentos essenciais.
              <br />• <strong>Iluminação:</strong> Tochas, lanternas e outras
              fontes de luz para navegar nas sombras de Mordheim.
              <br />• <strong>Servos:</strong> Criaturas ou assistentes que
              auxiliam seus mestres em batalha.
              <br />• <strong>Livros e Tomos:</strong> Conhecimento proibido ou
              sagrado que confere poderes especiais.
            </MobileText>

            <HeaderH1>Como Usar Acessórios</HeaderH1>
            <MobileText>
              • <strong>Restrições:</strong> Alguns acessórios só podem ser
              equipados por heróis ou figuras específicas.
              <br />• <strong>Limitações:</strong> Apenas um tipo de acessório
              pode ser carregado por vez (ex: apenas 1 amuleto, 1 anel, 1 manto).
              <br />• <strong>Duração:</strong> Alguns acessórios são descartados
              após o uso, outros são permanentes.
              <br />• <strong>Efeitos Únicos:</strong> Cada acessório tem
              propriedades especiais que podem ser ativadas durante o jogo.
            </MobileText>

            <HeaderH1>Acessórios Disponíveis</HeaderH1>

            {/* Accessories List */}
            {accessories.map((accessory, index) => (
              <EquipmentCard
                key={accessory.id || index}
                name={accessory.name}
                type={accessory.type}
                damageModifier={accessory.damageModifier}
                cost={accessory.purchaseCost}
                spaces={accessory.slots}
                description={accessory.flavorText ? [accessory.flavorText] : []}
                exclusive={accessory.exclusive}
                requirements={accessory.requirements}
                specialRules={accessory.specialRules}
                rarity={accessory.rarity}
                availability={accessory.availability}
                effect={accessory.effect}
              />
            ))}

            <MobileText
              variant="quote"
              className="text-center text-lg leading-relaxed mt-8"
            >
              "Acessórios, ferramentas, consumíveis e itens especiais. Tudo que
              um guerreiro precisa além de suas armas para sobreviver na cidade
              amaldiçoada."
            </MobileText>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}
