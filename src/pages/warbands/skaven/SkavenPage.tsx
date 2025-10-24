import React from "react";
import skavenData from "./data/skave,data.json";
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

const SkavenPage: React.FC = () => {
  const leader = skavenData.find((unit) => unit.role === "Líder") as Unit;
  const heroes = skavenData.filter(
    (unit) => unit.role === "Herói" || unit.role === "Héroi"
  ) as Unit[];
  const soldiers = skavenData.filter((unit) => !unit.role) as Unit[];

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
          <PageTitle>Skaven do Clã Eshin</PageTitle>
          <MobileText>
            Os Skaven são uma raça de ratos humanóides que vivem em vastos
            túneis subterrâneos sob as cidades do Império. Eles são mestres da
            conspiração, da traição e da guerra suja. O Clã Eshin é o mais
            secreto e letal de todos os clãs Skaven, especializado em
            assassinato, espionagem e artes marciais sombrias.
          </MobileText>
          <MobileText>
            Os assassinos do Clã Eshin são treinados desde a infância nas artes
            da morte silenciosa. Eles dominam o uso de venenos, armas exóticas e
            técnicas de combate que fazem até mesmo os mais experientes
            guerreiros do Império tremerem. Sua habilidade em se mover nas
            sombras é lendária, e muitos acreditam que eles podem se tornar
            invisíveis à vontade.
          </MobileText>
          <MobileText>
            Em Mordheim, os Skaven do Clã Eshin veem uma oportunidade única de
            expandir sua influência e coletar fragmentos de pedra-bruxa para
            seus experimentos sombrios. Eles operam nas sombras, eliminando
            rivais e coletando informações valiosas sobre os outros bandos que
            se aventuram nas ruínas da cidade amaldiçoada.
          </MobileText>
          <MobileText>
            Os Skaven são conhecidos por sua natureza traiçoeira e egoísta. Cada
            membro do bando está constantemente tentando subir na hierarquia,
            muitas vezes às custas de seus próprios companheiros. Apenas a
            ameaça de punição severa mantém a ordem relativa dentro do bando.
          </MobileText>
        </MobileSection>

        <MobileSection id="estrutura-do-bando">
          <HeaderH1 id="estrutura-do-bando">Estrutura do Bando</HeaderH1>
          <MobileText>
            Um bando Skaven deve incluir um mínimo de 3 modelos. Você tem 500
            coroas de ouro que pode usar para recrutar e equipar seu bando. O
            número máximo de guerreiros no bando é 20.
          </MobileText>
          <MobileText>
            • <strong>Assassino:</strong> Cada bando Skaven deve ter um
            Assassino – nem mais, nem menos!
            <br />• <strong>Bruxo do Clã Eshin:</strong> Seu bando pode incluir
            até 1 Bruxo do Clã Eshin.
            <br />• <strong>Skaven Sombrio:</strong> Seu bando pode incluir até
            2 Skaven Sombrios.
            <br />• <strong>Espreitadores Noturnos:</strong> Seu bando pode
            incluir até 2 Espreitadores Noturnos.
            <br />• <strong>Pestilentos:</strong> Seu bando pode incluir
            qualquer número de Pestilentos.
            <br />• <strong>Rato Gigante:</strong> Seu bando pode incluir
            qualquer número de Ratos Gigantes.
            <br />• <strong>Ogro Rato:</strong> Seu bando pode incluir até 1
            Ogro Rato.
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

export default SkavenPage;
