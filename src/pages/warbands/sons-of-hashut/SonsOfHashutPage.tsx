import Header from "../../components/Header";
import UnitCard from "../../components/UnitCard";
import PowerCard from "../../components/PowerCard";
import slugify from "slugify";
import WarbandIndex from "../../components/WarbandIndex";
import {
  PageContainer,
  ContentSection,
  ContentContainer,
  PowerListTitle,
} from "../../components/PageComponents";

const sonsOfHashutUnits = [
  {
    name: "Sacerdote Artífice",
    role: "Herói",
    stats: {
      move: 10,
      fight: "+2",
      shoot: "0",
      armour: 11,
      will: "+4",
      health: 16,
      cost: "-",
    },
    spellAffinity: {
      aligned0: ["Orações de Hashut"],
    },
    abilities: [
      {
        name: "Sacerdote",
        description:
          "O Sacerdote-Artífice tem uma seleção limitada de magias, mais difíceis de conjurar que a média. No entanto, pode conjurar enquanto usa armadura ou escudo e em combate. Ele começa com 3 magias das Orações de Hashut.",
      },
      {
        name: "Ferreiro-Daemonico",
        description:
          "O Sacerdote-Artifice pode trocar uma de suas rolagens na tabela de Venda de Pedra-Bruxa por uma rolagem na tabela de Modificações de Construto. Essa rolagem pode ser substituida tanto nas rolagens de Mercado Negro, quando nas rolagens de venda.",
      },
      {
        name: "Crueldade Paciente",
        description:
          "Os anões do caos não podem sofrer penalidades na agilidade por uso de equipamentos.",
      },
      {
        name: "Equipamento Disponível",
        weapons: ["Adaga", "Machado", "Arma de Concussão", "Espada", "Pistola"],
        armor: ["Armadura Leve", "Armadura Pesada", "Escudo"],
        special: [
          "Pode comprar uma arma com o Modificador Obsidiana (+2 dano, -1 Impeto, quebra em rolagem natural de 1.) pelo preço base + 200 coroas",
        ],
      },
    ],
  },
  {
    name: "Centouro de Hashut",
    role: "Campeão",
    stats: {
      move: 14,
      fight: "+4",
      shoot: "+1",
      armour: 11,
      will: "+4",
      health: 20,
      cost: "-",
    },
    abilities: [
      {
        name: "Carga Violnta",
        description:
          "The equine build of the Bull Centaur makes his cargas como devastadoras como um bate-estaca. Ele tem a característica Chifres. No entanto, ele não pode escalar, e terreno acidentado custa 3 movimento para 1 centimetro de movimento em vez de 2.",
      },
      {
        name: "Poderes",
        description:
          "O Centouro de Hashut pode escolher poderes da lista de Doutrinas de Hashut. Ele começa com 3 poderes. Um dos poderes tem classe de ativação 3. Os outros têm classe de ativação 5.",
      },
      {
        name: "Equipamento Disponível",
        weapons: ["Adaga", "Machado", "Arma de Concussão", "Espada", "Pistola"],
        armor: ["Armadura Leve", "Armadura Pesada", "Escudo"],
        special: [
          "Pode comprar uma arma com o Modificador Obsidiana (+2 dano, -1 Impeto, quebra em rolagem natural de 1.) pelo preço base + 200 coroas",
        ],
      },
    ],
  },
  {
    name: "Hobgoblin",
    stats: {
      move: 18,
      fight: "0",
      shoot: "0",
      armour: 9,
      will: "-2",
      health: 10,
      cost: "free",
    },
    abilities: [
      {
        name: "Coward",
        description:
          "Hobgoblins são criaturas naturalmente covardes que são forçadas a lutar por seus mestres dábios do Caos. Como resultado, eles sofrem dano facilmente e, na primeira oportunidade, tentam escapar de seus captores. Ao rolar na tabela de Sobrevivência do Soldado, qualquer resultado menor que 15 resulta em um hobgoblim morto ou que escapou. Em um 16-20, eles fazem uma recuperação completa.",
      },
      {
        name: "Equipamento",
        weapons: ["Adaga", "Machado", "Espada", "Arco", "Arco Curto"],
        armor: ["Armadura Leve", "Escudo"],
        special: [],
      },
    ],
  },
  {
    name: "Guarda de Forja",
    stats: {
      move: 10,
      fight: "+3",
      shoot: "0",
      armour: 14,
      will: "0",
      health: 14,
      cost: "60 coroas",
    },
    abilities: [
      {
        name: "Crueldade Paciente",
        description:
          "Os anões do caos não podem sofrer penalidades na agilidade por uso de equipamentos.",
      },
      {
        name: "Equipamento Disponível",
        weapons: ["Adaga", "Machado", "Arma de Concussão", "Espada", "Pistola"],
        armor: ["Armadura Leve", "Armadura Pesada", "Escudo"],
        special: [
          "Pode comprar uma arma com o Modificador Obsidiana (+2 dano, -1 Impeto, quebra em rolagem natural de 1.) pelo preço base + 200 coroas",
        ],
      },
    ],
  },

  {
    name: "Carcereiro",
    stats: {
      move: 10,
      fight: "+3",
      shoot: "0",
      armour: 13,
      will: "1",
      health: 14,
      cost: "75 coroas",
    },
    abilities: [
      {
        name: "Crueldade Paciente",
        description:
          "Os anões do caos não podem sofrer penalidades na agilidade por uso de equipamentos.",
      },
      {
        name: "Escravistas",
        description: "Carcereiros tem Aterrorizante.",
      },
      {
        name: "Equipamento Disponível",
        weapons: ["Adaga", "Machado", "Arma de Concussão", "Espada", "Pistola"],
        armor: ["Armadura Leve", "Armadura Pesada", "Escudo"],
        special: [
          "Pode comprar uma arma com o Modificador Obsidiana (+2 dano, -1 Impeto, quebra em rolagem natural de 1.) pelo preço base + 200 coroas",
        ],
      },
    ],
  },
  {
    name: "Quebra-Hordas",
    stats: {
      move: 10,
      fight: "2",
      shoot: "2",
      armour: 13,
      will: "+1",
      health: 12,
      cost: "80 coroas",
    },
    abilities: [
      {
        name: "Crueldade Paciente",
        description:
          "Os anões do caos não podem sofrer penalidades na agilidade por uso de equipamentos.",
      },
      {
        name: "Equipamento Disponível",
        weapons: [
          "Adaga",
          "Machado",
          "Arma de Concussão",
          "Bacamarte dos Anões do Caos",
          "Pistola",
        ],
        armor: ["Armadura Leve", "Armadura Pesada"],
        special: [],
      },
    ],
  },
  {
    name: "Mestre da Fornalha",
    stats: {
      move: 10,
      fight: "1",
      shoot: "2",
      armour: 12,
      will: "+1",
      health: 12,
      cost: "90 coroas",
    },
    abilities: [
      {
        name: "Crueldade Paciente",
        description:
          "Os anões do caos não podem sofrer penalidades na agilidade por uso de equipamentos.",
      },
      {
        name: "Hellsmith",
        description:
          "Um sacerdote-artifice que tem um Mestre da Fornalha no seu bando ganha +1 a uma tentativa de conjurar Forja Daemonica durante a fase de Conjurar Ritual da sequência pós jogo. Este bônus só pode ser ganho uma vez, independentemente de quantos Mestres da Fornalha o bando tem.",
      },
      {
        name: "Equipamento Disponível",
        weapons: [
          "Adaga",
          "Machado",
          "Arma de Concussão",
          "Bacamarte dos Anões do Caos",
          "Pistola",
        ],
        armor: ["Armadura Leve", "Armadura Pesada"],
        special: [],
      },
    ],
  },
  {
    name: "Sabujo Infernal",
    stats: {
      move: 14,
      fight: "2",
      shoot: "0",
      armour: 13,
      will: "+1",
      health: 14,
      cost: "60 coroas",
    },
    abilities: [
      {
        name: "Construtos Infernais",
        description:
          "A Sabujo Infernal tem as características Daemonio e Construto, e não pode pegar fragmentos de pedra-bruxa ou ganhar experiência.",
      },
      {
        name: "Farol do Inferno",
        description:
          "O Sabujo Infernal concede um bonus de +2 para as rolagens de conjuração do Sacerdote-Artifice se estiver a menos de 16cm dele. Esse bonus só pode ser ganho uma vez, independentemente de quantos Sabujos Infernais estão no tabuleiro atualmente.",
      },
      {
        name: "Equipmeno",
        description: "None. Implementos Metálicos crueis e malícia.",
      },
    ],
  },
];

const doctrinesOfHashut = [
  {
    name: "Doutrina do Rachapedra",
    when: "Em qualquer ponto da ativação do Centouro de Hashut, como uma ação.",
    effect:
      "Todas as figuras a até 5cm do centouro sofrem um ataque +4. Qualquer figura atingida recebe um marcador de Atordoamento. A área de efeito do poder se torna terreno acidentado, mas não afeta a movimentação do Centouro.",
  },
  {
    name: "Doutrina do Massacre Espiral",
    when: "Quando o Centouro de Hashut completa uma carga contra mais de uma figura.",
    effect:
      "Se o centouro de hashut luta, ele luta com todas as figuras contra quem ele completou a carga. O Centouro pode ignorar o primeiro dano tomado por perder uma luta nesse turno.",
  },
  {
    name: "Doutrina do Atropelamento",
    when: "No início da ação de movimento do Centouro de Hashut.",
    effect:
      "O centouro de hashut deve mover toda todo o seu valor de agilidade em centimetros durante esse turno. Ele pode atravessar terreno e figuras, mas não pode terminar sua movimentação dentro delas, e deve mover em uma linha reta. Ele luta com todas as figuras que ele atravessa, incluindo figuras aliadas, ganhando a característica Forte durante essas lutas.",
  },
  {
    name: "Doutrina do Cometa",
    when: "Em qualquer ponto da ativação do Centouro de Hashut.",
    effect:
      "O Centouro de Hashut pode usar uma ação de movimento para fazer um movimento de 'Pulo' em vez de um movimento normal. Quando o Centouro de Hashut termina este movimento, todas as criaturas a até 7.5cm dele sofrem um ataque +5. Qualquer criatura atingida por este ataque recebe um marcador de Atordoamento.",
  },
  {
    name: "Doutrina do Racha-Homem",
    when: "Quando o Centouro de Hashut vence uma luta com um resultado natural de 18, 19 ou 20.",
    effect:
      "O ataque é tratado como um ataque crítico. A figura alvo recebe um marcador de Atordoamento.",
  },
  {
    name: "Doctrine da Destruição",
    when: "Quando o Centouro de Hashut vence uma luta e causa pelo menos 1 ponto de dano.",
    effect:
      "O ataque causa 3 pontos de dano a mais além do dano normal que ele causaria.",
  },
  {
    name: "Doutrina do Dobra-Laminas",
    when: "Quando uma figura inimiga causa um ataque crítico contra o Centouro de Hashut.",
    effect:
      "O ataque não é tratado como um ataque crítico, e causa dano normal.",
  },
  {
    name: "Doutrina do Alma Vulcânica",
    when: "Quando o Centouro de Hashut faz uma rolagem de estatística de luta (Qualquer rolagem de luta com um número alvo).",
    effect:
      "Adicione +5 à rolagem do Centouro de Hashut. Alternativamente, um Centouro de Hashut pode usar esta habilidade quando ele vence uma luta para causar +1 ponto de dano.",
  },
  {
    name: "Doutrina do Quebra-Colina",
    when: "Quando o Centouro de Hashut vence uma luta e causa pelo menos 1 ponto de dano.",
    effect:
      "Esta habilidade pode ser utilizada a qualquer momento que o Centouro de Hashut vence uma luta. O Centouro de Hashut causa +1 ponto de dano e, adicionalmente, pode escolher empurrar seu oponente até 10cm em vez do normal de 3cm. Este empurrão pode mover a figura através ou sobre terreno ou sobre outras figuras.",
  },
  {
    name: "Doutrina da Chama Insaciável",
    when: "Quando o Centouro de Hashut é reduzido a 0 pontos de vigor.",
    effect: "O Centouro de Hashut é reduzido a 1 ponto de vigor em vez disso.",
  },
];

function SonsOfHashutPage() {
  const units = sonsOfHashutUnits.map((unit) => ({
    id: slugify(unit.name, { lower: true }),
    label: unit.name,
    type: "Unit",
  }));

  const doctrines = doctrinesOfHashut.map((doctrine) => ({
    id: slugify(doctrine.name, { lower: true }),
    label: doctrine.name,
    type: "Doctrine",
  }));

  const sections = [...units, ...doctrines];

  return (
    <PageContainer>
      <WarbandIndex sections={sections} />
      <Header title="Sons of Hashut" />

      <ContentSection>
        <ContentContainer>
          <div id="units">
            {sonsOfHashutUnits.map((unit, index) => (
              <div key={index} id={slugify(unit.name, { lower: true })}>
                <UnitCard
                  name={unit.name}
                  role={unit.role}
                  stats={unit.stats}
                  abilities={unit.abilities}
                  {...(unit.spellAffinity && {
                    spellAffinity: unit.spellAffinity,
                  })}
                />
              </div>
            ))}
          </div>

          <div id="doctrines">
            <PowerListTitle>Doctrines of Hashut</PowerListTitle>
            {doctrinesOfHashut.map((doctrine, index) => (
              <div key={index} id={slugify(doctrine.name, { lower: true })}>
                <PowerCard
                  name={doctrine.name}
                  when={doctrine.when}
                  effect={doctrine.effect}
                />
              </div>
            ))}
          </div>
        </ContentContainer>
      </ContentSection>
    </PageContainer>
  );
}

export default SonsOfHashutPage;
