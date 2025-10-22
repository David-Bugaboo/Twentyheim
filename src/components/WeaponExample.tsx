import { WeaponTooltipCard } from "./WeaponTooltipCard";
import GameText from "./GameText";

// Exemplo de uso do novo sistema de tooltips para armas
function WeaponExample() {
  return (
    <div>
      <h2>Exemplo de Tooltips Avançados para Armas</h2>

      <p>
        Aqui estão alguns exemplos de como usar o novo sistema de tooltips para
        armas:
      </p>

      <div style={{ marginBottom: "20px" }}>
        <h3>Armas Corpo a Corpo:</h3>
        <p>
          O guerreiro empunha uma{" "}
          <WeaponTooltipCard weaponName="Espada">Espada</WeaponTooltipCard> e
          uma <WeaponTooltipCard weaponName="Adaga">Adaga</WeaponTooltipCard>{" "}
          para lutar com duas mãos.
        </p>
        <p>
          O mago usa um{" "}
          <WeaponTooltipCard weaponName="Cajado">Cajado</WeaponTooltipCard> para
          se defender.
        </p>
        <p>
          O berserker brande uma{" "}
          <WeaponTooltipCard weaponName="Arma de Duas Mãos">
            Arma de Duas Mãos
          </WeaponTooltipCard>
          .
        </p>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h3>Armas a Distância:</h3>
        <p>
          O arqueiro usa um{" "}
          <WeaponTooltipCard weaponName="Arco">Arco</WeaponTooltipCard> para
          atacar à distância.
        </p>
        <p>
          O besteiros carrega uma{" "}
          <WeaponTooltipCard weaponName="Besta">Besta</WeaponTooltipCard>{" "}
          pesada.
        </p>
        <p>
          O assassino usa uma{" "}
          <WeaponTooltipCard weaponName="Besta de Mão">
            Besta de Mão
          </WeaponTooltipCard>{" "}
          para ataques furtivos.
        </p>
        <p>
          O guerreiro tribal arremessa{" "}
          <WeaponTooltipCard weaponName="Arma Arremessável">
            Armas Arremessáveis
          </WeaponTooltipCard>
          .
        </p>
        <p>
          O pastor usa uma{" "}
          <WeaponTooltipCard weaponName="Funda">Funda</WeaponTooltipCard>{" "}
          simples.
        </p>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h3>Armas de Fogo:</h3>
        <p>
          O mosqueteiro carrega um{" "}
          <WeaponTooltipCard weaponName="Arcabuz">Arcabuz</WeaponTooltipCard>{" "}
          pesado.
        </p>
        <p>
          O duelista empunha uma{" "}
          <WeaponTooltipCard weaponName="Pistola">Pistola</WeaponTooltipCard>.
        </p>
        <p>
          O caçador usa um{" "}
          <WeaponTooltipCard weaponName="Bacamarte">
            Bacamarte
          </WeaponTooltipCard>{" "}
          para caça.
        </p>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h3>Armaduras e Escudos:</h3>
        <p>
          O soldado usa{" "}
          <WeaponTooltipCard weaponName="Armadura Leve">
            Armadura Leve
          </WeaponTooltipCard>
          .
        </p>
        <p>
          O cavaleiro veste{" "}
          <WeaponTooltipCard weaponName="Armadura Pesada">
            Armadura Pesada
          </WeaponTooltipCard>
          .
        </p>
        <p>
          O guerreiro carrega um{" "}
          <WeaponTooltipCard weaponName="Escudo">Escudo</WeaponTooltipCard>.
        </p>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h3>Integração Automática com GameText:</h3>
        <p>
          O sistema funciona automaticamente quando você usa o componente{" "}
          <code>GameText</code>:
        </p>
        <div
          style={{
            padding: "15px",
            backgroundColor: "#f8f8f8",
            borderRadius: "5px",
            border: "1px solid #ddd",
          }}
        >
          <GameText>
            O guerreiro empunha uma Espada e uma Adaga para lutar com duas mãos.
            Ele também carrega um Arco para ataques à distância e veste Armadura
            Leve com um Escudo para proteção.
          </GameText>
        </div>
        <p style={{ fontSize: "0.9rem", color: "#666", marginTop: "8px" }}>
          <em>
            Passe o mouse sobre as palavras em negrito para ver os mini cards!
          </em>
        </p>
      </div>

      <div
        style={{
          marginTop: "30px",
          padding: "15px",
          backgroundColor: "#f5f5f5",
          borderRadius: "5px",
        }}
      >
        <h4 style={{ marginBottom: "0.25rem" }}>Como usar:</h4>
        <p>
          Para usar o novo sistema de tooltips para armas, importe o componente{" "}
          <code>WeaponTooltipCard</code> e envolva o nome da arma com ele:
        </p>
        <pre
          style={{
            backgroundColor: "#e8e8e8",
            padding: "10px",
            borderRadius: "3px",
          }}
        >
          {`import { WeaponTooltipCard } from './WeaponTooltipCard';

// Uso básico
<WeaponTooltipCard weaponName="Espada">Espada</WeaponTooltipCard>

// O tooltip mostrará um mini card com:
// - Nome da arma e tipo
// - Estatísticas (dano, alcance, mãos, espaços)
// - Propriedades em chips coloridos
// - Descrição completa
// - Design elegante com bordas douradas`}
        </pre>

        <h4 style={{ marginBottom: "0.25rem" }}>Integração Automática:</h4>
        <p>
          O sistema também funciona automaticamente com o componente{" "}
          <code>GameText</code>:
        </p>
        <pre
          style={{
            backgroundColor: "#e8e8e8",
            padding: "10px",
            borderRadius: "3px",
          }}
        >
          {`// Texto com armas será automaticamente convertido
<GameText>
  O guerreiro empunha uma Espada e uma Adaga.
</GameText>

// Armaduras também funcionam
<GameText>
  O soldado usa Armadura Leve e um Escudo.
</GameText>`}
        </pre>
      </div>
    </div>
  );
}

export default WeaponExample;
