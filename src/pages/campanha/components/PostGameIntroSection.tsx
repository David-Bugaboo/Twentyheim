import CollapsibleSection from "../../../components/CollapsibleSection";
import MobileText from "../../../components/MobileText";

const PostGameIntroSection = () => {
  return (
    <CollapsibleSection id="sequencia-pos-jogo" title="Fase de Campanha">
      <MobileText className="mb-4">
        A batalha acabou. Os mortos jazem onde caíram. Os sobreviventes
        arrastam-se de volta aos acampamentos improvisados, sangrando, exaustos,
        mas vivos. Agora vem a parte que muitos esquecem: a contabilidade da
        carnificina. Quem sobreviveu? Quem morreu? O que foi ganho? O que foi
        perdido? Esta é a <strong>Fase de Campanha</strong> — onde batalhas
        se tornam história, e história se torna lenda... ou esquecimento.
      </MobileText>

      <div className="bg-[#2a1f1f] p-4 rounded-lg border border-[#382929] mb-6">
        <MobileText variant="quote" className="text-center">
          "Quando a fumaça se dissipa e o sangue seca, o verdadeiro trabalho
          começa. Contar os mortos. Dividir o saque. Preparar para a próxima
          vez. Porque em Mordheim, sempre há uma próxima vez."
        </MobileText>
      </div>
    </CollapsibleSection>
  );
};

export default PostGameIntroSection;
