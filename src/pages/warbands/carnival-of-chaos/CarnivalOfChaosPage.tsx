import carnivalData from "./data/carnival-of-chaos.data.json";
import QuickNavigation from "../../../components/QuickNavigation";
import MobileSection from "../../../components/MobileSection";
import HeaderH1 from "../../../components/HeaderH1";
import MobileText from "../../../components/MobileText";
import UnitCard from "../../../components/UnitCard";
import PageTitle from "../../../components/PageTitle";
import GenericTable from "../../../components/GenericTable";
import blessingsOfNurgle from "./data/blessings-of-nurgle.json";

interface Unit {
  id: string;
  name: string;
  role?: string;
  quantity?: string;
  lore?: string;
  stats: {
    move: number | string;
    fight: string;
    shoot: string;
    armour: number | string;
    Vontade: string;
    health: number | string;
    cost: string;
    quantity?: string;
    skills?: string[];
    startingXp?: number;
    strength?: string | number;
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

const CarnivalOfChaosPage: React.FC = () => {
  const leader = carnivalData.find((unit) => unit.role === "Líder") as Unit;
  const heroes = carnivalData.filter((unit) => unit.role === "Herói") as Unit[];
  const soldiers = carnivalData.filter((unit) => !unit.role) as Unit[];

  const navigationSections = [
    { id: "introducao", title: "Introdução", level: 0 },
    { id: "bencaos-de-nurgle", title: "Bençãos de Nurgle", level: 0 },
    { id: "regras-especiais", title: "Regras Especiais", level: 0 },
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
      title: "Soldados & Entidades",
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
            <PageTitle>Circo do Caos</PageTitle>
            <MobileText>
              Ninguém sabe de onde veio o temido Circo do Caos. Alguns dizem que
              teria sido, em tempos antigos, uma caravana de ciganos do leste do
              Império, um povo itinerante que levava sua arte colorida de aldeia
              em aldeia. Se isso foi verdade no passado, o presente é muito mais
              sinistro e letal: ainda vaga pelos ermos do Império como um
              cortejo multicolorido de carroças, seus artistas vestidos com o
              luxo espalhafatoso de trupes itinerantes, levando versos e canções
              aos camponeses excitados.
            </MobileText>
            <MobileText>
              Ao chegar a um novo povoado, os saltimbancos erguem seu palco e
              encantam o povo com canções e peças sobre os dias sombrios do
              Império. Halterofilistas executam façanhas de força, malabaristas
              jogam bolas, facas e tochas flamejantes, enquanto o palhaço salta
              entre a plateia com sua bexiga de porco inflada, rindo e zombando.
            </MobileText>
            <MobileText>
              Apenas quando o espetáculo atinge o clímax blasfemo, com o sol se
              pondo, a verdade é revelada em toda sua glória pútrida: não são
              meros artistas, mas daemônios ciclópicos, com carne podre pendendo
              de ossos amarelados. As máscaras e maquiagens se mostram rostos
              verdadeiros, cobertos de pústulas e lesões variolentas. A alegria
              vira terror — e a matança começa.
            </MobileText>
          </MobileSection>

          <MobileSection id="bencaos-de-nurgle">
            <HeaderH1>Bençãos de Nurgle</HeaderH1>
            <MobileText className="mb-3">
              Escolhas de bençãos disponíveis para Apodrecidos e outros
              seguidores de Nurgle deste bando.
            </MobileText>
            <MobileText className="mb-3">
              Aqueles que cultuam o fétido altar do Senhor da Decadência sofrem
              de terríveis doenças e putrefação — dons conhecidos como as
              <strong> Bençãos de Nurgle</strong>.
            </MobileText>
            <MobileText className="mb-3">
              <strong>Elegibilidade e momento de compra:</strong> Bençãos de
              Nurgle podem ser compradas apenas para{" "}
              <strong>Apodrecidos</strong>, e somente no momento em que são{" "}
              <strong>contratados</strong>. Não é permitido comprar novas
              Bençãos para um modelo após a contratação.
            </MobileText>
            <MobileText className="mb-3">
              <strong>Quantidade:</strong> qualquer Apodrecido pode possuir
              <strong> uma ou mais</strong> Bençãos.
            </MobileText>
            <MobileText className="mb-4">
              <strong>Custo cumulativo:</strong> a <strong>primeira</strong>
              Benção é comprada pelo <strong>preço indicado</strong>; a
              <strong> segunda</strong> e as <strong>subsequentes</strong>
              custam <strong>o dobro</strong> do valor listado.
            </MobileText>
            <GenericTable
              data={(blessingsOfNurgle as any[]).map((b) => ({
                Benção: b.name,
                Custo: b.cost,
                Efeito: b.description,
              }))}
            />
          </MobileSection>

          <MobileSection id="regras-especiais">
            <HeaderH1>Regras Especiais</HeaderH1>
            <MobileText>
              <strong>Perigoso de Conhecer:</strong> devido à sua natureza
              pestilenta, um bando do Circo do Caos nunca pode contratar
              mercenários.
            </MobileText>
            <MobileText>
              <strong>Maculados:</strong> o Circo do Caos conta como um bando
              dos Possuídos para propósitos de exploração e ferimentos graves.
            </MobileText>
          </MobileSection>

          <MobileSection id="estrutura-do-bando">
            <HeaderH1>Estrutura do Bando</HeaderH1>
            <MobileText>
              Um bando do Circo do Caos deve incluir ao menos 3 modelos e pode
              ter até 15. Você tem 500 coroas de ouro para recrutar seu bando
              inicial.
            </MobileText>
            <MobileText>
              - <strong>Mestre de Cerimônias:</strong> exatamente 1.
              <br />- <strong>Brutamontes:</strong> até 2.
              <br />- <strong>Apodrecidos:</strong> até 2.
              <br />- <strong>Enfermos:</strong> até 2.
              <br />- <strong>Cultistas:</strong> qualquer número.
              <br />- <strong>Nurguinhos:</strong> qualquer número.
            </MobileText>
          </MobileSection>

          <MobileSection id="lider">
            <HeaderH1>Líder</HeaderH1>
            {leader && (
              <UnitCard
                id={leader.id}
                name={leader.name}
                role={leader.role}
                lore={leader.lore}
                qualidade={(leader as any).qualidade || 0}
                stats={leader.stats}
                abilities={leader.abilities}
                equipment={leader.equipment}
                spellAffinity={leader.spellAffinity}
              />
            )}
          </MobileSection>

          <MobileSection id="herois">
            <HeaderH1>Heróis</HeaderH1>
            {heroes.map((hero) => (
              <UnitCard
                key={hero.id}
                id={hero.id}
                name={hero.name}
                role={hero.role}
                lore={hero.lore}
                qualidade={(hero as any).qualidade || 0}
                stats={hero.stats}
                abilities={hero.abilities}
                equipment={hero.equipment}
                spellAffinity={hero.spellAffinity}
              />
            ))}
          </MobileSection>

          <MobileSection id="soldados">
            <HeaderH1>Soldados & Entidades</HeaderH1>
            {soldiers.map((unit) => (
              <UnitCard
                key={unit.id}
                id={unit.id}
                name={unit.name}
                lore={unit.lore}
                qualidade={(unit as any).qualidade || 0}
                stats={unit.stats}
                abilities={unit.abilities}
                equipment={unit.equipment}
                spellAffinity={unit.spellAffinity}
              />
            ))}
          </MobileSection>
        </div>
      </div>
    </div>
  );
};

export default CarnivalOfChaosPage;
