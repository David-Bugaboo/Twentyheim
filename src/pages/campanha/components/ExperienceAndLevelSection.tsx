import CollapsibleSection from "../../../components/CollapsibleSection";
import MobileText from "../../../components/MobileText";

function ExperienceAndLevelSection() {
  return (
    <CollapsibleSection id="experiencia-e-nivel" title="4. Experiência e Nível">
      <MobileText className="mb-4">
        Após cada batalha, os membros do bando ganham experiência baseada em
        suas ações e sobrevivência. Esta experiência pode ser usada para
        melhorar suas habilidades e capacidades.
      </MobileText>

      <div className="bg-[#2a1f1f] p-4 rounded-lg border border-[#382929] mb-6">
        <MobileText variant="heading" className="mb-3">
          Experiência de Heróis
        </MobileText>

        <MobileText className="mb-3">Heróis ganham experiência por:</MobileText>

        <MobileText className="mb-3 pl-4">
          • <strong>Sobreviver à batalha:</strong> +1 ponto
          <br />• <strong>Matar um inimigo:</strong> +1 ponto por inimigo
          <br />• <strong>Conjurar magias com sucesso:</strong> +1 ponto por
          magia
          <br />• <strong>Usar poderes com sucesso:</strong> +1 ponto por poder
          <br />• <strong>Pegar fragmentos de Pedra-bruxa:</strong> +2 pontos
        </MobileText>

        <MobileText>
          <strong>Subir de Nível:</strong> Quando um herói acumula 10 pontos de
          experiência, ele sobe de nível e pode escolher um avanço da lista
          apropriada.
        </MobileText>
      </div>

      <div className="bg-[#2a1f1f] p-4 rounded-lg border border-[#382929] mb-6">
        <MobileText variant="heading" className="mb-3">
          Experiência de Campeões
        </MobileText>

        <MobileText className="mb-3">
          Campeões ganham experiência de forma similar aos heróis, mas com
          algumas diferenças:
        </MobileText>

        <MobileText className="mb-3 pl-4">
          • <strong>Sobreviver à batalha:</strong> +1 ponto
          <br />• <strong>Matar um inimigo:</strong> +1 ponto por inimigo
          <br />• <strong>Usar poderes com sucesso:</strong> +1 ponto por poder
          <br />• <strong>Liderar soldados em combate:</strong> +1 ponto
        </MobileText>

        <MobileText>
          <strong>Subir de Nível:</strong> Campeões precisam de 15 pontos de
          experiência para subir de nível, mas têm acesso a avanços mais
          poderosos.
        </MobileText>
      </div>

      <div className="bg-[#2a1f1f] p-4 rounded-lg border border-[#382929] mb-6">
        <MobileText variant="heading" className="mb-3">
          Experiência de Soldados
        </MobileText>

        <MobileText className="mb-3">
          Soldados ganham experiência mais lentamente:
        </MobileText>

        <MobileText className="mb-3 pl-4">
          • <strong>Sobreviver à batalha:</strong> +1 ponto
          <br />• <strong>Matar um inimigo:</strong> +1 ponto por inimigo
          <br />• <strong>Pegar fragmentos de Pedra-bruxa:</strong> +1 ponto
        </MobileText>

        <MobileText>
          <strong>Subir de Nível:</strong> Soldados precisam de 20 pontos de
          experiência para subir de nível, mas podem se tornar soldados
          veteranos com habilidades especiais.
        </MobileText>
      </div>

      <div className="bg-[#2a1f1f] p-4 rounded-lg border border-[#382929] mb-6">
        <MobileText variant="heading" className="mb-3">
          Subir de Nível — Forjado pela Ruína
        </MobileText>

        <MobileText className="mb-3">
          Quando um modelo sobe de nível, ele pode escolher um avanço da lista
          apropriada para seu tipo e nível. Cada avanço melhora as capacidades
          do modelo de forma permanente.
        </MobileText>

        <MobileText variant="heading" className="mb-2">
          Opções de Avanço
        </MobileText>

        <MobileText className="mb-3 pl-4">
          • <strong>Aumentar Atributo:</strong> +1 em qualquer atributo
          <br />• <strong>Nova Habilidade:</strong> Aprender uma habilidade
          especial
          <br />• <strong>Novo Poder:</strong> Aprender um poder único
          <br />• <strong>Nova Magia:</strong> Aprender uma magia adicional
          <br />• <strong>Resistência:</strong> +1 em testes de resistência
        </MobileText>

        <MobileText variant="heading" className="mb-2">
          Limites Raciais de Atributos
        </MobileText>

        <MobileText className="mb-3">
          Cada raça tem limites máximos para seus atributos. Estes limites não
          podem ser ultrapassados através de avanços:
        </MobileText>

        <div className="bg-[#382929] p-3 rounded mb-3">
          <table className="w-full text-white text-sm">
            <thead>
              <tr className="bg-[#8b7355] text-[#d4af37] font-bold">
                <th className="p-2 text-left">Raça</th>
                <th className="p-2 text-left">Ímpeto Máx</th>
                <th className="p-2 text-left">Precisão Máx</th>
                <th className="p-2 text-left">Vigor Máx</th>
                <th className="p-2 text-left">Vontade Máx</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#382929]">
                <td className="p-2">Humano</td>
                <td className="p-2">6</td>
                <td className="p-2">6</td>
                <td className="p-2">6</td>
                <td className="p-2">6</td>
              </tr>
              <tr className="border-b border-[#382929]">
                <td className="p-2">Elfo</td>
                <td className="p-2">7</td>
                <td className="p-2">8</td>
                <td className="p-2">5</td>
                <td className="p-2">7</td>
              </tr>
              <tr className="border-b border-[#382929]">
                <td className="p-2">Anão</td>
                <td className="p-2">5</td>
                <td className="p-2">5</td>
                <td className="p-2">7</td>
                <td className="p-2">6</td>
              </tr>
              <tr>
                <td className="p-2">Orc</td>
                <td className="p-2">7</td>
                <td className="p-2">4</td>
                <td className="p-2">7</td>
                <td className="p-2">4</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </CollapsibleSection>
  );
}

export default ExperienceAndLevelSection;
