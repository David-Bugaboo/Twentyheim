import CollapsibleSection from "../../../components/CollapsibleSection";
import MobileText from "../../../components/MobileText";

function InjuriesAndDeathSection() {
  return (
    <CollapsibleSection id="ferimentos-e-morte" title="1. Ferimentos e Morte">
      <MobileText className="mb-4">
        Para cada modelo que foi reduzido a 0 de Vigor durante o jogo, existe a
        possibilidade de que aquele modelo sofra ferimentos permanentes ou
        morra. Em Mordheim, cair não significa necessariamente morte — às vezes
        significa algo pior.
      </MobileText>

      <div className="bg-[#2a1f1f] p-4 rounded-lg border border-[#382929] mb-6">
        <MobileText variant="heading" className="mb-3">
          Sobrevivência de Soldados
        </MobileText>

        <MobileText className="mb-3">
          Para cada soldado que foi reduzido a 0 de Vigor, role um d20 e
          consulte a tabela abaixo:
        </MobileText>

        <div className="bg-[#382929] p-3 rounded mb-4">
          <table className="w-full text-white text-sm">
            <thead>
              <tr className="bg-[#8b7355] text-[#d4af37] font-bold">
                <th className="p-2 text-left">Rolagem</th>
                <th className="p-2 text-left">Resultado</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#382929]">
                <td className="p-2">1-10</td>
                <td className="p-2">Morte</td>
              </tr>
              <tr className="border-b border-[#382929]">
                <td className="p-2">11-15</td>
                <td className="p-2">Ferimento Permanente</td>
              </tr>
              <tr>
                <td className="p-2">16-20</td>
                <td className="p-2">Recuperação Completa</td>
              </tr>
            </tbody>
          </table>
        </div>

        <MobileText className="mb-3">
          <strong>Morte:</strong> O soldado morreu. Remova-o permanentemente do
          seu bando. Em Mordheim, a morte é barata e comum.
        </MobileText>

        <MobileText className="mb-3">
          <strong>Ferimento Permanente:</strong> O soldado sobreviveu, mas com
          sequelas. Role na tabela de ferimentos permanentes e aplique o
          resultado. Ele permanece no bando, mas pode ter suas capacidades
          reduzidas.
        </MobileText>

        <MobileText>
          <strong>Recuperação Completa:</strong> O soldado se recuperou
          completamente. Ele volta ao jogo na próxima batalha sem penalidades.
        </MobileText>
      </div>

      <div className="bg-[#2a1f1f] p-4 rounded-lg border border-[#382929] mb-6">
        <MobileText variant="heading" className="mb-3">
          Sobrevivência de Heróis e Campeões
        </MobileText>

        <MobileText className="mb-3">
          Heróis e campeões são mais resistentes que soldados comuns. Para cada
          herói ou campeão que foi reduzido a 0 de Vigor, role um d20 e consulte
          a tabela abaixo:
        </MobileText>

        <div className="bg-[#382929] p-3 rounded mb-4">
          <table className="w-full text-white text-sm">
            <thead>
              <tr className="bg-[#8b7355] text-[#d4af37] font-bold">
                <th className="p-2 text-left">Rolagem</th>
                <th className="p-2 text-left">Resultado</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#382929]">
                <td className="p-2">1-5</td>
                <td className="p-2">Morte</td>
              </tr>
              <tr className="border-b border-[#382929]">
                <td className="p-2">6-15</td>
                <td className="p-2">Ferimento Permanente</td>
              </tr>
              <tr>
                <td className="p-2">16-20</td>
                <td className="p-2">Recuperação Completa</td>
              </tr>
            </tbody>
          </table>
        </div>

        <MobileText className="mb-3">
          <strong>Morte:</strong> O herói ou campeão morreu. Esta é uma perda
          significativa para o bando. Você pode requisitar um novo herói
          seguindo as regras específicas.
        </MobileText>

        <MobileText className="mb-3">
          <strong>Ferimento Permanente:</strong> O herói sobreviveu, mas com
          sequelas. Role na tabela de ferimentos permanentes e aplique o
          resultado. Ele permanece no bando, mas pode ter suas capacidades
          reduzidas.
        </MobileText>

        <MobileText>
          <strong>Recuperação Completa:</strong> O herói se recuperou
          completamente. Ele volta ao jogo na próxima batalha sem penalidades.
        </MobileText>
      </div>

      <div className="bg-[#2a1f1f] p-4 rounded-lg border border-[#382929] mb-6">
        <MobileText variant="heading" className="mb-3">
          Registrando Ferimentos Permanentes
        </MobileText>

        <MobileText className="mb-3">
          Quando um modelo sofre um ferimento permanente, role um d20 e consulte
          a tabela abaixo:
        </MobileText>

        <div className="bg-[#382929] p-3 rounded mb-4">
          <table className="w-full text-white text-sm">
            <thead>
              <tr className="bg-[#8b7355] text-[#d4af37] font-bold">
                <th className="p-2 text-left">Rolagem</th>
                <th className="p-2 text-left">Ferimento</th>
                <th className="p-2 text-left">Efeito</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#382929]">
                <td className="p-2">1-2</td>
                <td className="p-2">Ferimento na Cabeça</td>
                <td className="p-2">-1 Vontade</td>
              </tr>
              <tr className="border-b border-[#382929]">
                <td className="p-2">3-4</td>
                <td className="p-2">Ferimento no Braço</td>
                <td className="p-2">-1 Ímpeto</td>
              </tr>
              <tr className="border-b border-[#382929]">
                <td className="p-2">5-6</td>
                <td className="p-2">Ferimento na Perna</td>
                <td className="p-2">-1 Movimento</td>
              </tr>
              <tr className="border-b border-[#382929]">
                <td className="p-2">7-8</td>
                <td className="p-2">Ferimento no Tórax</td>
                <td className="p-2">-1 Vigor</td>
              </tr>
              <tr className="border-b border-[#382929]">
                <td className="p-2">9-10</td>
                <td className="p-2">Ferimento no Olho</td>
                <td className="p-2">-1 Precisão</td>
              </tr>
              <tr>
                <td className="p-2">11-20</td>
                <td className="p-2">Ferimento Menor</td>
                <td className="p-2">Nenhum efeito</td>
              </tr>
            </tbody>
          </table>
        </div>

        <MobileText>
          <strong>Nota:</strong> Ferimentos permanentes são cumulativos. Um
          modelo pode ter múltiplos ferimentos, cada um com seus próprios
          efeitos. Em Mordheim, a sobrevivência tem seu preço.
        </MobileText>
      </div>
    </CollapsibleSection>
  );
}

export default InjuriesAndDeathSection;
