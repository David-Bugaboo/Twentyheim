import React from "react";
import GameText from "./GameText";

const EquipmentTestExample: React.FC = () => {
  const testText =
    "Equipamento Disponível: Adaga, Machado, Espada, Arma de Duas Mãos, Funda, Armadura Leve, Armadura Pesada, Escudo. Pode comprar Água Benta sem fazer rolagens de Mercado Negro.";

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h2>Teste de Tabela de Equipamentos</h2>

      <h3>
        Exemplo de texto com Equipamento Disponível (renderizado como tabela):
      </h3>
      <div
        style={{
          backgroundColor: "#f5f5f5",
          padding: "15px",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <GameText>{testText}</GameText>
      </div>

      <h3>Funcionalidades:</h3>
      <ul>
        <li>
          ✅ Lista de equipamentos é automaticamente convertida em uma tabela
          organizada
        </li>
        <li>
          ✅ Equipamentos são organizados em 2 colunas para melhor visualização
        </li>
        <li>
          ✅ Passe o mouse sobre os nomes dos equipamentos para ver os tooltips
        </li>
        <li>✅ Clique nos equipamentos para manter o tooltip aberto</li>
        <li>
          ✅ Os tooltips mostram as propriedades e descrições dos equipamentos
        </li>
        <li>✅ Design consistente com o tema do jogo</li>
      </ul>

      <h3>Como funciona:</h3>
      <p>
        O componente GameText detecta automaticamente quando o texto contém
        "Equipamento Disponível" e transforma a lista de equipamentos em uma
        tabela organizada com tooltips interativos.
      </p>
    </div>
  );
};

export default EquipmentTestExample;
