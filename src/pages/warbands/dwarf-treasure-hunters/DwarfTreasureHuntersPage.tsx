import dwarfTreasureHuntersData from "./data/dwarf-treasure-hunters.data.json";
import QuickNavigation from "../../../components/QuickNavigation";
import MobileSection from "../../../components/MobileSection";
import HeaderH1 from "../../../components/HeaderH1";
import MobileText from "../../../components/MobileText";
import UnitCard from "../../../components/UnitCard";
import PageTitle from "../../../components/PageTitle";

interface Unit {
  id: string;
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

const DwarfTreasureHuntersPage: React.FC = () => {
  const leader = dwarfTreasureHuntersData.find(
    (unit) => unit.role === "Líder"
  ) as Unit;
  const heroes = dwarfTreasureHuntersData.filter(
    (unit) => unit.role === "Herói"
  ) as Unit[];
  const soldiers = dwarfTreasureHuntersData.filter(
    (unit) => !unit.role
  ) as Unit[];

  const navigationSections = [
    { id: "introducao", title: "Introdução", level: 0 },
    { id: "estrutura-do-bando", title: "Estrutura do Bando", level: 0 },
    {
      id: "lider",
      title: "Líder",
      level: 0,
      children: leader ? [{ id: leader.id, title: leader.name, level: 1 }] : [],
    },
    {
      id: "herois",
      title: "Heróis",
      level: 0,
      children: heroes.map((hero) => ({
        id: hero.id,
        title: hero.name,
        level: 1,
      })),
    },
    {
      id: "soldados",
      title: "Soldados",
      level: 0,
      children: soldiers.map((soldier) => ({
        id: soldier.id,
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
        <PageTitle>Caçadores de Tesouro Anões</PageTitle>
        <MobileSection id="introducao">
          <MobileText variant="quote">
            Os anões são um povo sombrio e excepcionalmente orgulhoso. Eles
            respeitam três coisas acima de tudo: idade, riqueza e habilidade.
            Não é surpresa então que esses guerreiros sombrios possam ser
            encontrados em Mordheim procurando por fama e fortuna.
          </MobileText>
          <MobileText>
            Ocasionalmente, um nobre anão se encontrará em tempos desesperados.
            Seu domínio familiar pode ter sido invadido por Goblins ou Skaven,
            ou ele pode de alguma forma ter se desonrado e sido banido. Outros
            anões conhecem esses guerreiros como os Despossuídos. Os anões são
            uma raça orgulhosa e é contra a natureza de um anão se perder no
            desespero. Em vez disso, um nobre que se encontra em tal situação
            desesperadora reunirá um grupo de seus amigos mais próximos e
            parentes e irá caçar tesouros, esperando acumular um tesouro grande
            o suficiente para estabelecer seu próprio domínio. Neste momento, a
            maior fonte de riqueza no Mundo Conhecido é rumorejada ser uma
            cidade no Império. A cidade é conhecida como Mordheim...
          </MobileText>
        </MobileSection>

        <MobileSection id="estrutura-do-bando">
          <HeaderH1 id="estrutura-do-bando">Estrutura do Bando</HeaderH1>
          <MobileText>
            Um bando anão deve incluir um mínimo de 3 modelos. Você tem 500
            coroas de ouro que pode usar para recrutar e equipar seu bando. O
            número máximo de guerreiros no bando é 12.
          </MobileText>
          <MobileText>
            • <strong>Nobre:</strong> Cada bando anão deve ter um Nobre – nem
            mais, nem menos!
            <br />• <strong>Engenheiro:</strong> Seu bando pode incluir até 1
            Engenheiro.
            <br />• <strong>Mata-Trolls:</strong> Seu bando pode incluir até 2
            Mata-Trolls.
            <br />• <strong>Irmãos de Clã:</strong> Seu bando pode incluir
            qualquer número de Irmãos de Clã.
            <br />• <strong>Trovejadores Anões:</strong> Seu bando pode incluir
            até 5 Trovejadores Anões.
            <br />• <strong>Barbas Curtas:</strong> Seu bando pode incluir
            qualquer número de Barbas Curtas.
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
              key={hero.id}
              id={hero.id}
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
              key={soldier.id}
              id={soldier.id}
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

export default DwarfTreasureHuntersPage;
