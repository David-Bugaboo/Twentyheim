import CollapsibleSection from "../../../components/CollapsibleSection";
import MobileText from "../../../components/MobileText";

function ExplorationSection() {
  return (
    <CollapsibleSection id="Exploração" title="3. Enviar Líderes">
      <MobileText className="mb-4">
        Heróis e campeões podem ser enviados para explorar as ruínas de
        Mordheim, Buscando mercadores de items raros, guerreiros experientes ou
        mais coroas e pedra bruxa.
      </MobileText>

      <div className="bg-[#2a1f1f] p-4 rounded-lg border border-[#382929] mb-6">
        <MobileText variant="heading" className="mb-3">
          Explorar Ruinas
        </MobileText>
        <MobileText className="mb-3">
          O jogador pode enviar o Héroi ou Campeão do seu warband para explorar as ruínas.
        </MobileText>

        <MobileText>
          <strong>Riscos:</strong> Explorar as ruínas é perigoso. O líder pode
          sofrer ferimentos, encontrar inimigos, ou até mesmo morrer. Mas os
          tesouros que podem ser encontrados valem o risco.
        </MobileText>
      </div>
    </CollapsibleSection>
  );
}

export default ExplorationSection;
