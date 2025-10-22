import CollapsibleSection from "../../../components/CollapsibleSection";
import MobileText from "../../../components/MobileText";
import MovementActionSection from "./MovementActionSection";
import ChargeActionSection from "./ChargeActionSection";
import CombatActionSection from "./CombatActionSection";
import ShootingActionSection from "./ShootingActionSection";
import SpellcastingActionSection from "./SpellcastingActionSection";
import PowerActionSection from "./PowerActionSection";
import WyrdstoneActionSection from "./WyrdstoneActionSection";
import OtherActionsSection from "./OtherActionsSection";

function ActionsSection() {
  return (
    <CollapsibleSection
      id="acoes"
      title="Ações — O Que Separa Vivos dos Mortos"
    >
      <MobileText className="mb-4">
        Em Mordheim, cada momento conta. Cada decisão pode ser sua última.
        Quando uma figura é ativada, ela tem um breve lampejo de tempo para agir
        — para mover, atacar, conjurar, ou simplesmente sobreviver mais um
        instante. Este é o momento em que heróis são feitos... ou enterrados.
      </MobileText>

      <div className="bg-[#2a1f1f] p-4 rounded-lg border border-[#382929] mb-6">
        <MobileText variant="heading" className="mb-3">
          A Regra das Duas Ações
        </MobileText>

        <MobileText className="mb-3">
          Cada figura, exceto em situações especiais ditadas pelo destino ou
          pela magia, pode tomar <strong>duas ações</strong> durante sua
          ativação. Duas escolhas. Duas chances de fazer a diferença entre
          vitória e morte.
        </MobileText>

        <MobileText className="mb-3">
          Normalmente, uma dessas ações{" "}
          <strong>deve ser uma Ação de Movimento</strong>. Afinal, ficar parado
          em Mordheim é apenas outra forma de suicídio. Mover é viver! A sua
          outra ação pode ser qualquer uma das ações descritas nessa seção.
        </MobileText>

        <MobileText className="mb-3">
          Lembre-se, apesar da ação de movimento ser obrigatória, não importa se
          ela é a primeira ou segunda ação. Uma figura pode se mover, e então
          conjurar uma magia, ou atirar primeiro para não perder sua mira.
        </MobileText>

        <MobileText>
          <strong>Exceção — Ações Especiais como Movimento:</strong> Alguns
          efeitos especificam que podem ser usados como "ação de movimento".
          Nestes casos raros, o jogador pode tomar essa ação especial no lugar
          do movimento obrigatório, seguida de qualquer outra ação normal. Uma
          brecha nas regras, uma oportunidade para os espertos.
        </MobileText>
      </div>

      <MobileText variant="heading" className="mt-6 mb-3">
        Tipos de Ação
      </MobileText>
      <MobileText variant="quote" className="mb-4">
        "Cada ação é uma aposta com a morte. Escolha sabiamente."
      </MobileText>

      <MovementActionSection />
      <ChargeActionSection />
      <CombatActionSection />
      <ShootingActionSection />
      <SpellcastingActionSection />
      <PowerActionSection />
      <WyrdstoneActionSection />
      <OtherActionsSection />
    </CollapsibleSection>
  );
}

export default ActionsSection;
