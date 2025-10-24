import React from "react";
import UnitCard from "./UnitCard";

const BeastmenEquipmentExample: React.FC = () => {
  // Exemplo de unidade com a nova estrutura de equipamentos
  const exampleUnit = {
    name: "Líder Tribal Homem-Fera",
    role: "Herói",
    stats: {
      move: 14,
      fight: "+4",
      shoot: "0",
      armour: 10,
      Vontade: "+5",
      health: 14,
      cost: "-",
      lore: "Os chefes Beastmen conquistaram sua posição através de pura brutalidade. Ele levou os Homem-Fera a Mordheim, visando coletar o máximo de Pedra-Bruxa possível para fortalecer suas Rochas-Pastoras.",
    },
    abilities: [
      {
        name: "Poderes",
        description:
          "O Lider Tribal Homem-Fera pode escolher poderes das Dádivas da Besta Sanguinária. Ele começa com 5 poderes. Um desses poderes tem um número de ativação de 3. Os outros têm um número de ativação de 5.",
      },
      {
        name: "Guerreiro Bestial",
        description:
          "O Lider Tribal Homem-Fera tem as características Forte e Aterrorizante.",
      },
      {
        name: "Equipamento Disponível",
        weapons: [
          "Adaga",
          "Martelo",
          "Espada",
          "Alabarda",
          "Arma de Duas Mãos",
        ],
        armor: ["Armadura Leve", "Armadura Pesada", "Escudo"],
        special: [],
      },
    ],
  };

  const exampleUnitWithSpecial = {
    name: "Xamã Homem-Fera",
    role: "Campeão",
    stats: {
      move: 14,
      fight: "+1",
      shoot: "0",
      armour: 10,
      Vontade: "+5",
      health: 12,
      cost: "100 coroas",
      lore: "Os Xamãs Beastmen são profetas dos Deuses Sombrios e os mais respeitados de todos os Homem-Fera.",
    },
    abilities: [
      {
        name: "Magia",
        description:
          "O Feiticeiro Homem-Fera é um feiticeiro da Tradição do Caos. Ele começa com 4 spells, das quais 3 devem ser da Tradição do Caos e uma que deve vir de suas Tradições Associadas.",
      },
      {
        name: "Equipamento Disponível",
        weapons: [
          "Adaga",
          "Machado",
          "Martelo",
          "Espada",
          "Alabarda",
          "Arma de Duas Mãos",
          "Cajado",
        ],
        armor: [],
        special: [
          "Pode comprar Água Benta sem fazer rolagens de Mercado Negro",
        ],
      },
    ],
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <h2>Exemplo: Nova Estrutura de Equipamentos - Beastmen Raiders</h2>
      <p style={{ marginBottom: "30px", color: "#666" }}>
        Agora o "Equipamento Disponível" é organizado em categorias:{" "}
        <strong>Armas</strong>, <strong>Armaduras</strong> e{" "}
        <strong>Especial</strong>.
      </p>

      <div style={{ marginBottom: "40px" }}>
        <h3 style={{ color: "#d4af37", marginBottom: "15px" }}>
          Exemplo 1: Líder Tribal (com armas e armaduras)
        </h3>
        <UnitCard
          name={exampleUnit.name}
          role={exampleUnit.role}
          stats={exampleUnit.stats}
          abilities={exampleUnit.abilities}
        />
      </div>

      <div style={{ marginBottom: "40px" }}>
        <h3 style={{ color: "#d4af37", marginBottom: "15px" }}>
          Exemplo 2: Xamã (com itens especiais)
        </h3>
        <UnitCard
          name={exampleUnitWithSpecial.name}
          role={exampleUnitWithSpecial.role}
          stats={exampleUnitWithSpecial.stats}
          abilities={exampleUnitWithSpecial.abilities}
        />
      </div>

      <div
        style={{
          backgroundColor: "#e8f4f8",
          padding: "20px",
          borderRadius: "8px",
          marginTop: "30px",
        }}
      >
        <h3 style={{ color: "#2c5aa0", marginTop: 0 }}>
          ✨ Vantagens da Nova Estrutura
        </h3>
        <ul style={{ margin: 0, paddingLeft: "20px" }}>
          <li>
            <strong>Organização Clara:</strong> Equipamentos separados por
            categoria (Armas, Armaduras, Especial)
          </li>
          <li>
            <strong>Fácil Leitura:</strong> Cada categoria tem seu próprio
            título e formatação
          </li>
          <li>
            <strong>Flexibilidade:</strong> Pode ter apenas algumas categorias
            (ex: só armas, só especial)
          </li>
          <li>
            <strong>Itens Especiais:</strong> Categoria "Especial" para
            modificadores, remédios e itens únicos
          </li>
          <li>
            <strong>Consistência Visual:</strong> Mantém o tema dourado do jogo
          </li>
          <li>
            <strong>Estrutura de Dados:</strong> Arrays organizados que
            facilitam futuras funcionalidades
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BeastmenEquipmentExample;
