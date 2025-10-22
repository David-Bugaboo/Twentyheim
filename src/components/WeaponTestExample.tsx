import GameText from "./GameText";

// Exemplo de teste para verificar se os tooltips estão funcionando
function WeaponTestExample() {
  return (
    <div style={{ padding: "20px", maxWidth: "600px" }}>
      <h2>Teste de Tooltips de Armas</h2>

      <h3>Lista de Equipamento (como nas páginas dos warbands):</h3>
      <div
        style={{
          padding: "15px",
          backgroundColor: "#f8f8f8",
          borderRadius: "5px",
          border: "1px solid #ddd",
          marginBottom: "20px",
        }}
      >
        <GameText>
          Adaga, Machado, Arma de Concussão, Espada, Machado Anão, Pistola,
          Besta, Arcabuz, Armadura Leve, Armadura Pesada, Escudo.
        </GameText>
      </div>

      <h3>Texto com Contexto:</h3>
      <div
        style={{
          padding: "15px",
          backgroundColor: "#f8f8f8",
          borderRadius: "5px",
          border: "1px solid #ddd",
          marginBottom: "20px",
        }}
      >
        <GameText>
          O guerreiro empunha uma Espada e uma Adaga para lutar com duas mãos.
          Ele também carrega um Arco para ataques à distância e veste Armadura
          Leve com um Escudo para proteção. Suas armas incluem Machado, Arma de
          Concussão, Pistola, Besta e Arcabuz.
        </GameText>
      </div>

      <h3>Armaduras:</h3>
      <div
        style={{
          padding: "15px",
          backgroundColor: "#f8f8f8",
          borderRadius: "5px",
          border: "1px solid #ddd",
        }}
      >
        <GameText>
          O soldado usa Armadura Leve, o cavaleiro veste Armadura Pesada, e o
          guerreiro carrega um Escudo.
        </GameText>
      </div>

      <p style={{ marginTop: "20px", fontSize: "0.9rem", color: "#666" }}>
        <em>
          Passe o mouse sobre as palavras destacadas para ver os mini cards!
        </em>
      </p>
    </div>
  );
}

export default WeaponTestExample;

