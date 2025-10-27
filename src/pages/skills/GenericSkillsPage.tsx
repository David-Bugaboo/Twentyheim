import MobileLayout from "../../components/MobileLayout";
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";

import HeaderH2 from "../../components/HeaderH2";

import SkillCard from "../../components/SkillCard";
import QuickNavigation from "../../components/QuickNavigation";
import combatSkillsData from "./data/combat.skills.json";
import PageTitle from "../../components/PageTitle";

interface Skill {
  id: string;
  name: string;
  type: string;
  description: string;
}

interface GenericSkillsPageProps {
  skillType: string;
  title: string;
  description: string;
  specialization: string;
}

function GenericSkillsPage({
  skillType,
  title,
  description,
  specialization,
}: GenericSkillsPageProps) {
  // Filtrar habilidades do tipo específico
  const skills = combatSkillsData.filter(
    (skill: Skill) => skill.type === skillType
  );

  const navigationSections = [
    { id: "intro", title: title, level: 0 },
    { id: "lista-habilidades", title: "Lista de Habilidades", level: 0 },
    ...skills.map((skill: Skill) => ({
      id: `skill-${skill.id}`,
      title: skill.name,
      level: 1,
    })),
    { id: "como-usar", title: "Como Usar as Habilidades", level: 0 },
    { id: "especializacao", title: "Especialização", level: 0 },
  ];

  return (
    <MobileLayout title={title} backButtonPath="/skills">
      <QuickNavigation sections={navigationSections} />
      <div className="space-y-6">
        <div id="intro">
          <PageTitle>{title}</PageTitle>
        </div>

        <MobileText>{description}</MobileText>

        <MobileSection>
          <div id="lista-habilidades">
            <HeaderH2>Lista de Habilidades</HeaderH2>
          </div>
          <MobileText className="mb-4">
            {skills.length} habilidade(s) disponível(is):
          </MobileText>

          <div className="space-y-4">
            {skills.map((skill: Skill) => (
              <div key={skill.id} id={`skill-${skill.id}`}>
                <SkillCard name={skill.name} description={skill.description} />
              </div>
            ))}
          </div>
        </MobileSection>

        <MobileSection>
          <div id="como-usar">
            <HeaderH2>Como Usar as Habilidades</HeaderH2>
          </div>
          <MobileText>
            <strong>Efeito:</strong> O benefício ou vantagem que a habilidade
            proporciona quando ativada.
            <br />
            <br />
            <strong>{skillType}:</strong> Essas habilidades são exclusivas para
            membros deste tipo específico, oferecendo vantagens únicas baseadas
            em suas especializações.
          </MobileText>
        </MobileSection>

        <MobileSection>
          <div id="especializacao">
            <HeaderH2>Especialização</HeaderH2>
          </div>
          <MobileText>{specialization}</MobileText>
        </MobileSection>
      </div>
    </MobileLayout>
  );
}

export default GenericSkillsPage;
