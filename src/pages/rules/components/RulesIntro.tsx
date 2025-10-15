import MobileSection from "../../../components/MobileSection";
import MobileText from "../../../components/MobileText";


function RulesIntro() {
  return (
    <MobileSection>
      <div className="bg-[#2a1f1f] p-4 rounded-lg border border-[#382929] mb-4">
        <MobileText variant="quote" className="text-center">
          "Já se passaram quase vinte séculos desde que Sigmar Heldenhammer
          purificou nossas terras das hordas monstruosas que ali habitavam. Assim
          foi fundado o maior de todos os reinos dos homens — o Império. Hoje
          nossos pensamentos se voltam mais uma vez para o Senhor dos Exércitos,
          Sigmar, o Pai dos Homens, enquanto o milênio vira e o tempo de sua
          segunda vinda se aproxima. Nos templos por toda nossa terra, as
          multidões se reúnem para conhecer os muitos e maravilhosos eventos que
          certamente se desenrolarão com o retorno do deus vivo ao seu povo."
        </MobileText>
        <MobileText variant="small" className="text-center mt-2">
          — O Cronista de Ostermark, registro do ano 1999
        </MobileText>
      </div>

      <MobileText className="mb-4">
        Mordheim não é lugar para os fracos. Suas ruas destroçadas são um
        labirinto de morte onde apenas os mais espertos, mais rápidos ou mais
        afortunados sobrevivem para contar a história. Estas regras não são
        apenas diretrizes de jogo — são os princípios imutáveis que governam a
        existência nesta cidade condenada.
      </MobileText>

      <MobileText className="mb-4">
        Cada rolagem de dado é um momento de destino. Cada decisão pode ser a
        diferença entre glória e esquecimento. Aqui, nas sombras de edifícios
        desmoronados e sob o brilho sinistro da Pedra-bruxa, as regras de
        Mordheim se desenrolam como uma sinfonia de caos e sobrevivência.
      </MobileText>
    </MobileSection>
  );
}

export default RulesIntro;
