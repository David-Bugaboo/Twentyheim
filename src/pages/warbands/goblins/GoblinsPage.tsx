import goblinsData from "./data/goblins.data.json";
import QuickNavigation from "../../../components/QuickNavigation";
import MobileSection from "../../../components/MobileSection";
import HeaderH1 from "../../../components/HeaderH1";
import MobileText from "../../../components/MobileText";
import UnitCard from "../../../components/UnitCard";
import CollapsibleSection from "../../../components/CollapsibleSection";
import GenericTable from "../../../components/GenericTable";
import PageTitle from "../../../components/PageTitle";

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

const GoblinsPage: React.FC = () => {
  const leader = goblinsData.find((unit) => unit.role === "Líder") as Unit;
  const heroes = goblinsData.filter((unit) => unit.role === "Herói") as Unit[];
  const soldiers = goblinsData.filter((unit) => !unit.role) as Unit[];

  const navigationSections = [
    { id: "introducao", title: "Introdução", level: 0 },
    { id: "estrutura-do-bando", title: "Estrutura do Bando", level: 0 },
    { id: "animosidade", title: "Animosidade", level: 0 },
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
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="px-4 py-8 max-w-4xl mx-auto">
        <QuickNavigation sections={navigationSections} />

        <MobileSection id="introducao">
          <PageTitle>Forest Goblins</PageTitle>
          <MobileText>
            As tribos Forest Goblin habitam nas profundezas das Florestas que
            cercam Mordheim. Elas se adaptaram completamente ao seu entorno,
            aprendendo furtividade e camuflagem para evitar seus vizinhos.
          </MobileText>
          <MobileText>
            O ouro motiva os Forest Goblins como qualquer outro bando, embora
            por motivos diferentes. É inútil para eles como moeda, mas como
            recurso metálico, ainda assim é valioso. Em vez de usar ouro para
            comprar armas e armaduras, os Forest Goblins na verdade revestem seu
            equipamento de pedra com o metal. Isso levou líderes inescrupulosos
            a enviar seus subordinados em emboscadas certas, apenas para chegar
            mais tarde e coletar as pontas de flecha e pontas de lança dos
            restos de seus ex-subordinados.
          </MobileText>
          <MobileText>
            Os Forest Goblins são capazes de criar venenos com uma precisão que
            supera até mesmo os Elfos Sombrios. Seu ambiente natural abriga
            qualquer número de criaturas venenosas, incluindo as Caranguejeiras
            gigantes que, segundo rumores, eles incitam a combater seus
            inimigos. Revestindo suas armas com veneno mortal, os Goblins são
            capazes de derrubar qualquer inimigo, não importa o tamanho.
            Liderados por seu Chefim (geralmente o Goblin com a voz mais alta),
            eles aparecem do nada e atacam com ferocidade bestial antes de
            recuar para as árvores, deixando ferimentos como única prova de que
            estiveram lá.
          </MobileText>
        </MobileSection>

        <MobileSection id="estrutura-do-bando">
          <HeaderH1 id="estrutura-do-bando">Estrutura do Bando</HeaderH1>
          <MobileText>
            Um bando de Goblins deve incluir um mínimo de 3 modelos. Você tem
            500 coroas que pode usar para recrutar seu bando inicial. O número
            máximo de guerreiros no bando nunca pode exceder 20.
          </MobileText>
          <MobileText>
            • <strong>Chefim Goblin:</strong> Cada bando Forest Goblin deve ter um
            Chefim Goblin.
            <br />• <strong>Goblins Aluados:</strong> Seu bando pode incluir até 4
            Goblins Aluados.
            <br />• <strong>Goblin Veim:</strong> Seu bando pode incluir um Goblin Veim.
            <br />• <strong>Guerreiros Goblins:</strong> Qualquer número de modelos
            pode ser Guerreiros Goblins.
            <br />• <strong>Goblin dos Dente Vermeio:</strong> Seu bando pode incluir até 4
            Goblin dos Dente Vermeio.
            <br />• <strong>Joga-Predas:</strong> Seu bando pode incluir até 5
            Joga-Predas.
            <br />• <strong>Caranguejeira Gigante:</strong> Seu bando pode incluir uma
            Caranguejeira Gigante.
          </MobileText>
        </MobileSection>

        <MobileSection id="animosidade">
          <HeaderH1 id="animosidade">Animosidade</HeaderH1>
          <MobileText>
            Goblins não gostam de nada mais que uma boa briga, a ponto de
            não ligar muito pra quem caem na porrada! No início de cada turno,
            role um dado para cada figura com a regra Animosidade. Um resultado
            de 1-5 significa que o guerreiro se ofendeu com algo que um de seus
            colegas de bando fez ou disse. Não role para modelos que estão em
            combate corpo a corpo (eles já estão brigando!).
          </MobileText>
          <MobileText>
            Para descobrir o quão ofendido o modelo está, role outro dado e
            consulte a tabela a seguir para ver o que acontece:
          </MobileText>

          <CollapsibleSection title="Tabela de Animosidade">
            <GenericTable
              data={[
                {
                  Resultado: "1-5",
                  Ação: "TÔ OUVINDO VIU, ARROMBADO!",
                  Descrição:
                    "A figura decide que a figura aliada Goblin mais próxima insultou sua linhagem ou higiene pessoal e deve pagar o preço! Se houver uma figura aliada Orc ou Goblin no alcance, o guerreiro ofendido irá imediatamente declarar carga e lutar uma rodada de combate corpo a corpo contra a fonte de sua ira. Se não houver alvos ao alcance e o guerreiro estiver armado com arma a distância, ele atira no amigo mais próximo. Caso contrário, ele se comporta como se tivesse rolado 6-15.",
                },
                {
                  Resultado: "6-15",
                  Ação: "É O QUE, GALINHA?",
                  Descrição:
                    "A figura tem certeza de que ouviu um som ofensivo do Goblin amigo mais próximo. A figura perde sua próxima ativação xingando seu ofensor.",
                },
                {
                  Resultado: "16-20",
                  Ação: "TU ACHA QUE É O BONZÃO É ,CARAI?!",
                  Descrição:
                    "A figura imagina que seus companheiros estão rindo dele, e decidiu mostrar quem é o bonzão. Esta figura ganha uma ação extra que deve ser um movimento o mais rápido possível em direção ao modelo inimigo mais próximo, declarando carga se possível. A figura ainda pode usar uma ação de disparada com uma de suas duas ações normais.",
                },
              ]}
            />
          </CollapsibleSection>
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
              key={hero.id}
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
              key={soldier.id}
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
  );
};

export default GoblinsPage;
