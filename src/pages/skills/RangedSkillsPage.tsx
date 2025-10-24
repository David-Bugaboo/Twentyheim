import GenericSkillsPage from "./GenericSkillsPage";

function RangedSkillsPage() {
  return (
    <GenericSkillsPage
      skillType="Atirador"
      title="Habilidades de Atirador"
      description="As habilidades de atirador são especializadas em combate à distância, oferecendo vantagens táticas para guerreiros que preferem manter distância do inimigo. Essas habilidades focam em melhorar a precisão, alcance e eficácia dos ataques à distância."
      specialization="Essas habilidades são ideais para heróis que preferem combate à distância e utilizam armas de longo alcance como arcos, bestas e armas de fogo. Habilidades de precisão como 'Disparo de Precisão' e 'Tiro Habilidoso' são excelentes para acertar alvos difíceis. Habilidades de mobilidade como 'Tiro Rápido' permitem manter distância enquanto causam dano. 'Olhos de Falcão' oferece alcance adicional, e 'Pistoleiro' é especializada em armas de fogo, oferecendo vantagens específicas para usuários de pistolas."
    />
  );
}

export default RangedSkillsPage;