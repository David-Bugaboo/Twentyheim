import React from "react";
import witchHuntersData from "./data/witch-hunters.data.json";
import QuickNavigation from "../../../components/QuickNavigation";
import MobileSection from "../../../components/MobileSection";
import MobileText from "../../../components/MobileText";
import HeaderH1 from "../../../components/HeaderH1";
import UnitCard from "../../../components/UnitCard";
import PageTitle from "../../../components/PageTitle";

interface Unit {
  id?: string;
  name: string;
  role?: string;
  quantity?: string;
  stats: {
    move: number;
    fight: string;
    shoot: string;
    armour: number;
    Vontade: string;
    health: number;
    cost: string;
    skills?: string[];
  };
  spellAffinity?: {
    aligned0?: string[];
    aligned2?: string[];
  };
  abilities: Array<{
    name: string;
    description: string;
  }>;
  equipment?: {
    "hand-to-hand"?: Array<{ name: string; cost: string }>;
    ranged?: Array<{ name: string; cost: string }>;
    armor?: Array<{ name: string; cost: string }>;
    miscellaneous?: Array<{ name: string; cost: string }>;
    modifiers?: Array<{ name: string; cost: string }>;
  };
}

const WitchHuntersPage: React.FC = () => {
  const leader = witchHuntersData.find((unit) => unit.role === "Líder") as Unit;
  const heroes = witchHuntersData.filter(
    (unit) => unit.role === "Herói"
  ) as Unit[];
  const soldiers = witchHuntersData.filter((unit) => !unit.role) as Unit[];

  const navigationSections = [
    { id: "introducao", title: "Introdução", level: 0 },
    { id: "estrutura-do-bando", title: "Estrutura do Bando", level: 0 },
    {
      id: "lider",
      title: "Líder",
      level: 0,
      children: leader
        ? [
            {
              id: leader.name.toLowerCase().replace(/\s+/g, "-"),
              title: leader.name,
              level: 1,
            },
          ]
        : [],
    },
    {
      id: "herois",
      title: "Heróis",
      level: 0,
      children: heroes.map((hero) => ({
        id: hero.name.toLowerCase().replace(/\s+/g, "-"),
        title: hero.name,
        level: 1,
      })),
    },
    {
      id: "soldados",
      title: "Soldados",
      level: 0,
      children: soldiers.map((soldier) => ({
        id: soldier.name.toLowerCase().replace(/\s+/g, "-"),
        title: soldier.name,
        level: 1,
      })),
    },
  ];

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <QuickNavigation sections={navigationSections} />
          <MobileSection id="introducao">
            <PageTitle>Caçadores de Bruxas</PageTitle>
            <MobileText>
              Os Caçadores de Bruxas são os defensores mais fanáticos da fé de
              Sigmar, dedicados à erradicação de toda magia e heresia do
              Império. Liderados por Inquisidores implacáveis, estes bandos são
              formados por sacerdotes marciais, caçadores especializados e
              fanáticos dispostos a morrer pela causa sagrada.
            </MobileText>
            <MobileText>
              Em Mordheim, os Caçadores de Bruxas veem uma oportunidade única de
              caçar os maiores hereges e feiticeiros do Império, enquanto
              investigam a origem da Pedra-Bruxa e seus efeitos corruptores. Sua
              missão é clara: purificar a cidade amaldiçoada de toda influência
              sobrenatural.
            </MobileText>
          </MobileSection>

          <MobileSection id="estrutura-do-bando">
            <HeaderH1 id="estrutura-do-bando">Estrutura do Bando</HeaderH1>
            <MobileText>
              Um bando dos Caçadores de Bruxas deve incluir um mínimo de 3
              modelos. Você tem 500 coroas que pode usar para recrutar e equipar
              seu bando. O número máximo de guerreiros no bando é 12.
            </MobileText>
            <MobileText>
              • <strong>Inquisidor:</strong> Cada bando dos Caçadores de Bruxas
              deve ter um Inquisidor – nem mais, nem menos!
              <br />• <strong>Sacerdote Marcial de Sigmar:</strong> Seu bando
              pode incluir até 1 Sacerdote Marcial de Sigmar.
              <br />• <strong>Caçador de Bruxas:</strong> Seu bando pode incluir
              até 2 Caçadores de Bruxas.
              <br />• <strong>Fanático:</strong> Seu bando pode incluir qualquer
              número de Fanáticos.
              <br />• <strong>Flagelante:</strong> Seu bando pode incluir até 5
              Flagelantes.
              <br />• <strong>Cão de Guerra:</strong> Seu bando pode incluir até
              5 Warhounds.
            </MobileText>
          </MobileSection>

          <MobileSection id="lider">
            <HeaderH1 id="lider">Líder</HeaderH1>
            {leader && (
              <UnitCard
                id={leader.name.toLowerCase().replace(/\s+/g, "-")}
                name={leader.name}
                role={leader.role}
                quantity={leader.quantity}
                stats={leader.stats}
                spellAffinity={leader.spellAffinity}
                abilities={leader.abilities}
                equipment={leader.equipment}
              />
            )}
          </MobileSection>

          <MobileSection id="herois">
            <HeaderH1 id="herois">Heróis</HeaderH1>
            {heroes.map((hero) => (
              <UnitCard
                key={hero.name}
                id={hero.name.toLowerCase().replace(/\s+/g, "-")}
                name={hero.name}
                role={hero.role}
                quantity={hero.quantity}
                stats={hero.stats}
                spellAffinity={hero.spellAffinity}
                abilities={hero.abilities}
                equipment={hero.equipment}
              />
            ))}
          </MobileSection>

          <MobileSection id="soldados">
            <HeaderH1 id="soldados">Soldados</HeaderH1>
            {soldiers.map((soldier) => (
              <UnitCard
                key={soldier.name}
                id={soldier.name.toLowerCase().replace(/\s+/g, "-")}
                name={soldier.name}
                quantity={soldier.quantity}
                stats={soldier.stats}
                abilities={soldier.abilities}
                equipment={soldier.equipment}
              />
            ))}
          </MobileSection>
        </div>
      </div>
    </div>
  );
};

export default WitchHuntersPage;
