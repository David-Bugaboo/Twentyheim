import React from "react";
import GameText from "./GameText";

const EquipmentTableExample: React.FC = () => {
  // Exemplos reais de warbands
  const examples = [
    {
      title: "Irmãs de Sigmar - Matriarca",
      text: "A Matriarca Sigmarita é uma sacerdotisa e tem uma seleção limitada de magias, mais difíceis de conjurar que a média. No entanto, pode conjurar enquanto usa armadura ou escudo e em combate. Ela começa com 3 magias das Orações de Sigmar. Equipamento Disponível: Adaga, Martelo, Martelo de Guerra Sigmarita, Chicote de Aço, Arma de Duas Mãos, Funda, Armadura Leve, Armadura Pesada, Escudo. Pode comprar Água Benta sem fazer rolagens de Mercado Negro.",
    },
    {
      title: "Anões Caçadores de Tesouro - Engenheiro",
      text: "O Engenheiro de Kharadron nunca perde agilidade devido ao uso de equipamentos. Equipamento Disponível: Adaga, Machado, Martelo, Espada, Machado Anão, Pistola, Besta, Arcabuz, Armadura Leve, Armadura Pesada, Escudo. Qualquer arma ou armadura pode ser transformada em arma De Gromril por 300 coroas.",
    },
    {
      title: "Filhos de Hashut - Anão do Caos",
      text: "Os anões do caos não podem sofrer penalidades na agilidade por uso de equipamentos. Equipamento Disponível: Adaga, Machado, Martelo, Espada, Pistola, Armadura Leve, Armadura Pesada, Escudo. Pode comprar uma arma com o Modificador Obsidiana (+2 dano, -1 Impeto, quebra em rolagem natural de 1.) pelo preço base + 200 coroas.",
    },
  ];

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <h2>Exemplos de Tabelas de Equipamentos</h2>
      <p style={{ marginBottom: "30px", color: "#666" }}>
        Estes são exemplos reais de como o "Equipamento Disponível" é
        renderizado como tabelas organizadas com tooltips interativos para cada
        equipamento.
      </p>

      {examples.map((example, index) => (
        <div key={index} style={{ marginBottom: "40px" }}>
          <h3 style={{ color: "#d4af37", marginBottom: "15px" }}>
            {example.title}
          </h3>
          <div
            style={{
              backgroundColor: "#f9f9f9",
              padding: "20px",
              borderRadius: "8px",
              border: "1px solid #ddd",
            }}
          >
            <GameText>{example.text}</GameText>
          </div>
        </div>
      ))}

      <div
        style={{
          backgroundColor: "#e8f4f8",
          padding: "20px",
          borderRadius: "8px",
          marginTop: "30px",
        }}
      >
        <h3 style={{ color: "#2c5aa0", marginTop: 0 }}>
          ✨ Funcionalidades Implementadas
        </h3>
        <ul style={{ margin: 0, paddingLeft: "20px" }}>
          <li>
            <strong>Detecção Automática:</strong> O componente detecta
            automaticamente texto contendo "Equipamento Disponível"
          </li>
          <li>
            <strong>Parsing Inteligente:</strong> Divide a lista por vírgulas e
            espaços, limpando espaços extras
          </li>
          <li>
            <strong>Layout em Tabela:</strong> Organiza os equipamentos em 2
            colunas para melhor visualização
          </li>
          <li>
            <strong>Tooltips Interativos:</strong> Cada equipamento tem tooltip
            com propriedades e descrição
          </li>
          <li>
            <strong>Design Consistente:</strong> Mantém o tema visual do jogo
            com cores e estilos apropriados
          </li>
          <li>
            <strong>Responsivo:</strong> Funciona bem em diferentes tamanhos de
            tela
          </li>
        </ul>
      </div>
    </div>
  );
};

export default EquipmentTableExample;
