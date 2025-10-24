import GenericSkillsPage from "./GenericSkillsPage";

function CombatSkillsPage() {
  return (
    <GenericSkillsPage
      skillType="Combate"
      title="Habilidades de Combate"
      description="As habilidades de combate são especializadas em combate corpo a corpo, oferecendo vantagens táticas e defensivas para guerreiros experientes. Essas habilidades focam em melhorar a eficácia no combate direto e a sobrevivência em situações perigosas."
      specialization="Essas habilidades são ideais para heróis que preferem combate direto e enfrentam inimigos em combate corpo a corpo regularmente. Habilidades defensivas como 'Aparar' e 'Teia de Ferro' são excelentes para sobreviver a situações perigosas, enquanto habilidades ofensivas como 'Golpe para Ferir' e 'Desarmar' oferecem vantagens táticas significativas. 'Mestre do Combate' é ideal para heróis que frequentemente enfrentam múltiplos inimigos."
    />
  );
}

export default CombatSkillsPage;
