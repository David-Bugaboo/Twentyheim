import sistersOfSigmarData from "./data/sisters-of-sigmar.data.json";
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
    quantity?: string;
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

const SistersOfSigmarPage: React.FC = () => {
  const leader = sistersOfSigmarData.find(
    (unit) => unit.role === "Líder"
  ) as Unit;
  const heroes = sistersOfSigmarData.filter(
    (unit) => unit.role === "Herói"
  ) as Unit[];
  const soldiers = sistersOfSigmarData.filter((unit) => !unit.role) as Unit[];

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
       
        <MobileSection id="introducao">
        <PageTitle>Irmãs de Sigmar</PageTitle>
         
          <MobileText>
            Por séculos, a nobreza do Império enviou suas filhas problemáticas
            ou indisciplinadas para o Santo Convento da Ordem das Irmãs
            Misericordiosas de Sigmar, em Mordheim, para serem iniciadas na
            única ordem de sacerdotisas dedicada ao deus padroeiro do Império.
          </MobileText>
          <MobileText>
            As Irmãs de Sigmar, como são mais conhecidas, tradicionalmente
            viajaram por todo o Império cuidando dos doentes e pobres, atendendo
            às necessidades dos órfãos, curando os enfermos e tratando dos
            corpos feridos. Além das artes de cura, que praticam com profundo
            conhecimento de ervas e orações, seu conselho é frequentemente
            procurado por aqueles prestes a tomar decisões importantes, pois as
            Irmãs de Sigmar são famosas por sua habilidade em prever o volúvel
            curso do destino.
          </MobileText>
          <MobileText>
            Embora outrora muito amadas pelo povo, as Irmãs têm visto sua
            popularidade diminuir nos últimos anos. Caçadores de bruxas
            fanáticos as denunciaram como feiticeiras e hereges, e até mesmo nos
            campos elas têm sido atacadas e expulsas pelos próprios camponeses
            que procuram ajudar. Muitos sacerdotes de Sigmar desejam dissolver a
            ordem completamente, alegando que mulheres não têm o direito de
            ensinar a palavra sagrada de Sigmar.
          </MobileText>
          <MobileText>
            De todos os habitantes de Mordheim, apenas as Irmãs de Sigmar
            estavam preparadas para a destruição. A vidente Cassandora havia
            previsto o desastre, e durante suas vigílias noturnas as Donzelas de
            Sigmar ouviram a voz do próprio deus sussurrando em suas mentes
            sonhadoras. Assim, sabiam que estariam a salvo em sua fortaleza
            elevada acima da cidade, distante dos vapores poluídos, desde que
            estivessem prontas para suportar o fogo da Fúria de Sigmar.
          </MobileText>
          <MobileText>
            As Irmãs acreditam ter uma missão sagrada — um dever imposto pelo
            próprio Sigmar, ao qual devem se dedicar de corpo e alma. Seu dever
            divino é reunir os fragmentos de pedra bruxolenta (wyrdstone) e
            escondê-los profundamente sob a Rocha de Sigmar, nos cofres do
            convento, onde, protegidos por camadas de granito sólido e pelas
            preces eternas da irmandade, não possam causar mal ao povo de
            Sigmar.
          </MobileText>
        </MobileSection>

        <MobileSection id="estrutura-do-bando">
          <HeaderH1 id="estrutura-do-bando">Estrutura do Bando</HeaderH1>
          <MobileText>
            Um bando das Irmãs de Sigmar deve incluir um mínimo de 3 modelos.
            Você tem 500 coroas de ouro que pode usar para recrutar e equipar
            seu bando. O número máximo de guerreiros no bando é 15.
          </MobileText>
          <MobileText>
            • <strong>Matriarca Sigmarita:</strong> Cada bando deve ter uma
            Matriarca – nem mais, nem menos!
            <br />• <strong>Irmã Superior:</strong> Seu bando pode incluir até 3
            Irmãs Superiores.
            <br />• <strong>Áugure:</strong> Seu bando pode incluir até 1
            Áugure.
            <br />• <strong>Irmã Sigmarita:</strong> Seu bando pode incluir de 1
            a 5 Irmãs Sigmaritas.
            <br />• <strong>Irmã Hospitalária:</strong> Seu bando pode incluir
            até 2 Irmãs Hospitalárias.
            <br />• <strong>Noviças:</strong> Seu bando pode incluir até 10
            Noviças.
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

export default SistersOfSigmarPage;
