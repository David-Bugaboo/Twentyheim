import React from "react";
import sonsOfHashutData from "./data/sons-of-hashut.data.json";
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
  lore?: string;
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

const SonsOfHashutPage: React.FC = () => {
  const leader = sonsOfHashutData.find((unit) => unit.role === "Líder") as Unit;
  const heroes = sonsOfHashutData.filter(
    (unit) => unit.role === "Herói"
  ) as Unit[];
  const soldiers = sonsOfHashutData.filter((unit) => !unit.role) as Unit[];

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
            <PageTitle>Filhos de Hashut</PageTitle>
            <MobileText>
              Os Filhos de Hashut são anões do Caos que adoram o deus touro
              Hashut, o Senhor do Fogo e da Forja. Eles são mestres da
              metalurgia e da criação de armas e armaduras, mas sua devoção ao
              Caos os corrompeu completamente. Eles veem a Pedra-Bruxa como uma
              ferramenta divina para forjar armas ainda mais poderosas.
            </MobileText>
            <MobileText>
              Os anões do Caos são conhecidos por sua crueldade paciente e sua
              habilidade em trabalhar metais infernais. Eles constroem fornalhas
              gigantescas nas montanhas do Mundo Morto, onde forjam armas e
              armaduras para os exércitos do Caos. Sua devoção a Hashut os torna
              imunes aos efeitos debilitantes de equipamentos pesados,
              permitindo que carreguem armaduras e armas que outros não
              conseguiriam.
            </MobileText>
            <MobileText>
              Em Mordheim, os Filhos de Hashut veem uma oportunidade única de
              coletar fragmentos de Pedra-Bruxa para seus experimentos de forja
              daemônica. Eles são implacáveis em sua busca por materiais raros e
              não hesitam em escravizar ou eliminar qualquer um que se
              interponha em seu caminho.
            </MobileText>
          </MobileSection>

          <MobileSection id="estrutura-do-bando">
            <HeaderH1 id="estrutura-do-bando">Estrutura do Bando</HeaderH1>
            <MobileText>
              Um bando dos Filhos de Hashut deve incluir um mínimo de 3 modelos.
              Você tem 500 coroas que pode usar para recrutar e equipar seu
              bando. O número máximo de guerreiros no bando é 14.
            </MobileText>
            <MobileText>
              • <strong>Feiticeiro Aprendiz:</strong> Cada bando dos Filhos de
              Hashut deve ter um Feiticeiro Aprendiz – nem mais, nem menos!
              <br />• <strong>Centouro de Hashut:</strong> Seu bando pode
              incluir até 1 Centouro de Hashut.
              <br />• <strong>Campeão Anão do Caos:</strong> Seu bando pode
              incluir até 2 Campeões Anões do Caos.
              <br />• <strong>Hobgoblins:</strong> Seu bando deve incluir pelo
              menos 4 Hobgoblins.
              <br />• <strong>Guarda de Forja:</strong> Seu bando pode incluir
              até 6 Guardas de Forja.
              <br />• <strong>Quebra-Hordas:</strong> Seu bando pode incluir até
              3 Quebra-Hordas.
            </MobileText>
          </MobileSection>

          <MobileSection id="lider">
            <HeaderH1 id="lider">Líder</HeaderH1>
            {leader && (
              <UnitCard
                id={leader.id}
                name={leader.name}
                role={leader.role}
                quantity={leader.quantity}
                lore={leader.lore}
                qualidade={(leader as any).qualidade || 0}
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
                id={hero.id}
                name={hero.name}
                role={hero.role}
                quantity={hero.quantity}
                lore={hero.lore}
                qualidade={(hero as any).qualidade || 0}
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
                id={soldier.id}
                name={soldier.name}
                quantity={soldier.quantity}
                lore={soldier.lore}
                qualidade={(soldier as any).qualidade || 0}
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

export default SonsOfHashutPage;
