import orcMobData from "./data/orc-mob.data.json";
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

const OrcMobPage: React.FC = () => {
  const leader = orcMobData.find(
    (unit) => unit.role === "Herói" && unit.name === "Chefaum Orc"
  ) as Unit;
  const heroes = orcMobData.filter(
    (unit) => unit.role === "Herói" && unit.name !== "Chefaum Orc"
  ) as Unit[];
  const soldiers = orcMobData.filter((unit) => !unit.role) as Unit[];

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
          <PageTitle>Bando Orc</PageTitle>
          <MobileText>
            Ô BICHO, NÓIS ORC GOSTA É DUMA XINXA, VIU? NÓIS NUM TEM NADA QUE DÊ
            MAIS GOSTO QUE METER PORRADA E LEVAR UM MONTE DE COISA PRA CASA! A
            VIDA DUM ORC É ISSO AÍ, UM ARRANCA-RABO ATRÁS DO OUTRO — SEJA COM
            OUTRO ORC MAIS FELA-DA-PUTA, SEJA COM QUALQUER OUTRO CABRA QUE
            APAREÇA NO CAMINHO!
          </MobileText>
          <MobileText>
            MORDHEIM, Ó, É O PARAÍSO, CABA! CHEIO DE INIMIGO PRA QUEBRAR E DE
            OURO PRA CATAR… É O LUGAR PERFEITO PRA UM ORC DA PESTE VIRAR
            CHEFAUM, VIU? ENTRE OS POVO TUDO DESSE MUNDÃO, NUM TEM QUEM GOSTE
            MAIS DUM SAQUE QUE NÓIS, OS ORC E OS GOBLINVÉI! POR ISSO MESMO, UM
            BOCADO DE BANDO DE ORC VEIO SE JUNTAR EM MORDHEIM, ATRÁS DESSAS
            PEDRA MALUCA AÍ, AS TAL DA PEDRA-BRUXA.
          </MobileText>
          <MobileText>
            MAS, VOU TE DIZER, NÓIS PREFERE É ESPERAR OS OUTRO ABESTADO CATAR E
            DEPOIS DAR UM BOTE NELES, VIU? DIVERSÃO DAS BOA! NO FIM DAS CONTA, O
            QUE IMPORTA É O MESMO PRA TODO MUNDO: PEGAR O MÁXIMO DE DINHEIRO E
            SAIR RINDO COM OS BOLSO CHEIO, CARAI!
          </MobileText>
        </MobileSection>

        <MobileSection id="estrutura-do-bando">
          <HeaderH1 id="estrutura-do-bando">Estrutura do Bando</HeaderH1>
          <MobileText>
            Um bando orc deve incluir um mínimo de 3 modelos. Você tem 500
            coroas que pode usar para recrutar e equipar seu bando. O número
            máximo de guerreiros no bando é 20.
          </MobileText>
          <MobileText>
            • <strong>Chefaum Orc:</strong> Cada bando orc deve ter um Chefaum –
            nem mais, nem menos!
            <br />• <strong>Orc Véio:</strong> Seu bando pode incluir até 1 Orc
            Véio.
            <br />• <strong>Orc Grandaum:</strong> Seu bando pode incluir até 2
            Orc Grandaum.
            <br />• <strong>Minino Orc:</strong> Seu bando pode incluir de 1 a 5
            Minino Orc.
            <br />• <strong>Goblin:</strong> Seu bando pode incluir qualquer
            número de Goblins.
            <br /> • <strong>Pé-Duro das Cavernas:</strong> Seu bando pode
            incluir até 5 Pé-Duros das Cavernas.
            <br />• <strong>Troll:</strong> Seu bando pode incluir até 1 Troll.
          </MobileText>
        </MobileSection>

        <MobileSection id="animosidade">
          <HeaderH1 id="animosidade">Animosidade</HeaderH1>
          <MobileText>
            Orcs e Goblins não gostam de nada mais que uma boa briga, a ponto de
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
                    "O guerreiro decide que a figura aliada Orc ou Goblin mais próximo insultou sua linhagem ou higiene pessoal e deve pagar o preço! Se houver uma figura aliada Orc ou Goblin no alcance, o guerreiro ofendido irá imediatamente declarar carga e lutar uma rodada de combate corpo a corpo contra a fonte de sua ira. Se não houver alvos ao alcance e o guerreiro estiver armado com arma a distância, ele atira no amigo mais próximo. Caso contrário, ele se comporta como se tivesse rolado 6-15.",
                },
                {
                  Resultado: "6-15",
                  Ação: "É O QUE, GALINHA?",
                  Descrição:
                    "O guerreiro tem certeza de que ouviu um som ofensivo do Orc ou Goblin amigo mais próximo, ele perde sua ativação xingando seu ofensor.",
                },
                {
                  Resultado: "16-20",
                  Ação: "TU ACHA QUE É O BONZÃO,CARAI?!",
                  Descrição:
                    "A figura imagina que seus companheiros estão rindo dele, e decidiu mostrar quem é o bonzão. Este modelo ganha uma ação extra que deve ser um movimento o mais rápido possível em direção ao modelo inimigo mais próximo, declarando carga se possível. A figura ainda pode usar uma ação de disparada com uma de suas duas ações normais.",
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

export default OrcMobPage;
