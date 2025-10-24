import GenericSkillsPage from "./GenericSkillsPage";

function StrengthSkillsPage() {
  return (
    <GenericSkillsPage
      skillType="Força"
      title="Habilidades de Força"
      description="As habilidades de força são especializadas em poder físico, resistência e intimidação, oferecendo vantagens para guerreiros que dependem de força bruta e presença intimidante. Essas habilidades focam em causar mais dano, resistir a ataques e controlar o campo de batalha."
      specialization="Essas habilidades são ideais para heróis que dependem de força física e presença intimidante, oferecendo vantagens em combate direto e controle tático. Habilidades ofensivas como 'Golpe Poderoso' e 'Halterofilista' são excelentes para causar mais dano através de força bruta. Habilidades defensivas como 'Resiliente' oferecem resistência significativa a dano. Habilidades de controle como 'Intimidação' e 'Carga Imparável' permitem controlar o movimento inimigo e dominar o campo de batalha através de presença física."
    />
  );
}

export default StrengthSkillsPage;
