import CollapsibleSection from "../../../components/CollapsibleSection";
import MobileText from "../../../components/MobileText";

function MagicAndPowersSection() {
  return (
    <CollapsibleSection
      id="magias-e-poderes-fora-de-jogo"
      title="2. Magias e Poderes Fora de Jogo"
    >
      <MobileText className="mb-4">
        Algumas magias e poderes têm efeitos que se estendem além da batalha.
        Estes efeitos são aplicados durante a sequência pós-jogo, podendo afetar
        a recuperação, o crescimento, ou o destino do bando.
      </MobileText>

      <div className="bg-[#2a1f1f] p-4 rounded-lg border border-[#382929] mb-6">
        <MobileText className="mb-3">
          <strong>Magias de Cura:</strong> Magias que curam ferimentos podem ser
          usadas após a batalha para reduzir ou eliminar ferimentos permanentes
          sofridos pelos membros do bando.
        </MobileText>

        <MobileText className="mb-3">
          <strong>Poderes de Proteção:</strong> Alguns poderes podem proteger o
          bando de certos efeitos negativos durante a sequência pós-jogo.
        </MobileText>

        <MobileText>
          <strong>Magias de Maldição:</strong> Magias malévolas podem ter
          efeitos duradouros que afetam o bando inimigo mesmo após a batalha.
        </MobileText>
      </div>
    </CollapsibleSection>
  );
}

export default MagicAndPowersSection;
