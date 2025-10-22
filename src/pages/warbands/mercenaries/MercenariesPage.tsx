import MobileLayout from "../../components/MobileLayout";
import MobileText from "../../components/MobileText";
import MobileHeroHeader from "../../components/MobileHeroHeader";
import CollapsibleSection from "../../components/CollapsibleSection";
import UnitCard from "../../components/UnitCard";
import PowerCard from "../../components/PowerCard";
import slugify from "slugify";
import { useRef } from "react";
import headerImage from "../../assets/header-art/21ef8615dda8ffc145957aff5273c244_upscayl_4x_high-fidelity-4x.png";

const mercenariesUnits = [
  {
    name: "Capitão Mercenário",
    role: "Herói",
    stats: {
      move: 14,
      fight: "+3",
      shoot: "+2",
      armour: 10,
      will: "+4",
      health: 18,
      cost: "-",
    },
    abilities: [
      {
        name: "Poderes",
        description:
          "O Capitão Mercenário começa com 5 poderes da lista de Táticas de Cão de Guerra. Todos os poderes tem Classe de Dificuldade 3.",
      },
      {
        name: "Equipamento Disponível",
        weapons: [
          "Adaga",
          "Machado",
          "Arma de Concussão",
          "Espada",
          "Arma de Haste",
          "Arma de Duas Mãos",
          "Besta",
          "Pistola",
          "Pistola do Duelista",
          "Arco",
        ],
        armor: ["Armadura Leve", "Armadura Pesada", "Escudo"],
        special: [],
      },
    ],
  },
  {
    name: "Sergeant",
    role: "Campeão",
    stats: {
      move: 14,
      fight: "+2",
      shoot: "+2",
      armour: 10,
      will: "+3",
      health: 12,
      cost: "100 coroas",
    },
    abilities: [
      {
        name: "Poderes",
        description:
          "O Sergeant começa com 5 poderes da lista de Táticas de Cão de Guerra. Um tem Classe de Dificuldade 3. Os outros têm Classe de Dificuldade 5.",
      },
      {
        name: "Equipamento Disponível",
        weapons: [
          "Adaga",
          "Machado",
          "Arma de Concussão",
          "Espada",
          "Arma de Haste",
          "Arma de Duas Mãos",
          "Besta",
          "Pistola",
          "Pistola do Duelista",
          "Arco",
        ],
        armor: ["Armadura Leve", "Armadura Pesada", "Escudo"],
        special: [],
      },
    ],
  },
  {
    name: "Sacerdote Lupino de Ulric",
    role: "Champion (Middenheim apenas)",
    stats: {
      move: 18,
      fight: "+3",
      shoot: "0",
      armour: 11,
      will: "+4",
      health: 14,
      cost: "120 coroas",
    },
    spellAffinity: {
      aligned0: ["Orações de Ulric"],
    },
    abilities: [
      {
        name: "Sacerdote",
        description:
          "O Sacerdote Lupino de Ulric é um sacerdote e tem uma seleção limitada de magias, mais difíceis de conjurar que a média, comparado a outros conjuradores, no entanto, pode conjurar enquanto usa armadura ou escudo e em combate. Ele começa com 3 magias das Orações de Ulric.",
      },
      {
        name: "Pele do Lobo Branco",
        description:
          "O Sacerdote Lupino de Ulric utiliza um manto abençoado feito da pele de um Grande Lobo Branco. Ele ganha +1 de Armadura, já contabilizado na sua ficha. Esse manto não pode ser removido ou destruido por magias e efeitos.",
      },
      {
        name: "Equipamento",
        description: "Arma de Duas Mãos, Arma de Haste",
      },
    ],
  },
  {
    name: "Recruta",
    stats: {
      move: 14,
      fight: "2",
      shoot: "0",
      armour: 10,
      will: "-1",
      health: 10,
      cost: "Free",
    },
    abilities: [
      {
        name: "Equipamento Disponível",
        weapons: [
          "Adaga",
          "Machado",
          "Arma de Concussão",
          "Espada",
          "Arma de Haste",
          "Arma de Duas Mãos",
          "Besta",
          "Pistola",
          "Pistola do Duelista",
          "Arco",
        ],
        armor: ["Armadura Leve", "Armadura Pesada", "Escudo"],
        special: [],
      },
    ],
  },
  {
    name: "Soldado",
    stats: {
      move: 14,
      fight: "+3",
      shoot: "0",
      armour: 10,
      will: "+1",
      health: 12,
      cost: "50 coroas",
    },
    abilities: [
      {
        name: "Equipamento Disponível",
        weapons: [
          "Adaga",
          "Machado",
          "Arma de Concussão",
          "Espada",
          "Arma de Haste",
          "Arma de Duas Mãos",
          "Besta",
          "Pistola",
          "Pistola do Duelista",
          "Arco",
        ],
        armor: ["Armadura Leve", "Armadura Pesada", "Escudo"],
        special: [],
      },
    ],
  },

  {
    name: "Atirador",
    stats: {
      move: 14,
      fight: "+2",
      shoot: "+2",
      armour: 10,
      will: "+1",
      health: 10,
      cost: "50 coroas",
    },
    abilities: [
      {
        name: "Equipamento Disponível",
        weapons: [
          "Adaga",
          "Machado",
          "Arma de Concussão",
          "Espada",
          "Besta",
          "Pistola",
          "Arco",
          "Arco Longo",
          "Bacamarte",
          "Arcabuz",
          "Rifle de Caça de Hochland",
        ],
        armor: ["Armadura Leve", "Escudo"],
        special: [],
      },
    ],
  },
  {
    name: "Espadachim",
    stats: {
      move: 14,
      fight: "+4",
      shoot: "+0",
      armour: 11,
      will: "+1",
      health: 12,
      cost: "90 coroas",
    },
    abilities: [
      {
        name: "Arte da Esgrima",
        description:
          "Os Espadachins treinaram para lutar contra mais de um oponente ao mesmo tempo, e assim seus oponentes nunca podem reivindicar mais que +2 para figuras de apoio, não importa quantas figuras amigas estão realmente em combate com o espadachim. Além disso, se o espadachim vencer um combate corpo a corpo contra um oponente que está usando armadura leve ou pesada, o ataque ganha a característica Penetração de Armadura(1).",
      },
      {
        name: "Equipamento Disponível",
        weapons: ["Espada"],
        armor: ["Armadura Leve", "Armadura Pesada"],
        special: [],
      },
    ],
  },
  {
    name: "Wolfhound",
    role: "Middenheim apenas",
    stats: {
      move: 18,
      fight: "+1",
      shoot: "+0",
      armour: 10,
      will: "+1",
      health: 10,
      cost: "10 coroas",
    },
    abilities: [
      {
        name: "Equipamento",
        description:
          "O Wolfhound não pode usar equipamentos, atacando com presas e garras.",
      },
      {
        name: "Beast Hybrid",
        description: "O Wolfhound tem a característica Animal.",
      },
    ],
  },
];

const wardogTactics = [
  {
    name: "Peguem eles, vermes!",
    when: "A qualquer momento durante a ativação do Capitão ou Sargento.",
    effect:
      "Escolha uma figura a até 15cm do usuário desse poder. Aquela figura ativa imediatamente, independente da ordem de ativação e distância do usuário, como se tivesse ativado junto ao usuário.",
  },
  {
    name: "Parede de Escudo, agora!",
    when: `Quando o Capitão ou Sargento ou qualquer figura a até 8cm do ativador desse poder é alvo de um ataque a distância.`,
    effect: `O ativador do poder e até 3 figuras até 8cm dele ganham +3 de Armadura até a próxima luta ou ataque a distância que receberem ou até o final do turno, o que acontecer primeiro.`,
  },
  {
    name: "Vou vender qualquer desgraçado com a espada limpa para os escravagistas!",
    when: "No começo da ativação do Capitão ou sargento.",
    effect:
      "Cada criatura que ativar junto ao ativador desse poder ganha +1 de Impeto ou Precisão apenas para a primeira luta ou ataque a distância que fizerem. Escolha o bonus individualmente para cada figura.",
  },
  {
    name: "Montar Baionetas!",
    when: `A qualquer momento uma figura inimiga completa uma carga contra uma figura aliada equipada com uma arma a distância e a até 8cm do Capitão ou Sargento.`,
    effect: "A figura aliada ganha +2 de Impeto apenas para essa luta.",
  },
  {
    name: "Quadrado de Piques, agora!",
    when: `A qualquer momento uma figura inimiga completa uma carga contra uma figura aliada equipada com uma arma de duas mãos ou arma de haste e a até 8cm do Capitão ou Sargento.`,
    effect:
      "A figura que completou a carga recebe 3 de dano. Qualquer efeito que aumente dano ou Impeto ao completar carga é negado.",
  },
  {
    name: "Afiem as espadas!",
    when: "No começo da ativação do Capitão ou Sargento.",
    effect:
      "Qualquer figura que ativar junto ao usuário desse poder ganha +1 de Impeto e +1 de Dano até sua próxima luta.",
  },
  {
    name: "Aí, Aí, Primeiros Socorros aqui!",
    when: "A qualquer momento durante a ativação do Capitão ou Sargento.",
    effect: `Qualquer figura que ativar junto ao usuário do poder perde quaisquer marcadores prejudiciais que tenham.`,
  },
  {
    name: "Prego neles, meninos!",
    when: "No começo da ativação do Capitão ou Sargento.",
    effect: `Qualquer figura que ativar junto ao usuário desse poder e fizer um ataque a distância com um Bacamarte atira no alvo principal e em figuras a até 3cm ao invés dos 1cm normais. A Falha na ignição do bacamarte fica no 1-6.`,
  },
  {
    name: "Marchem, vagabundos!",
    when: "No começo da ativação do Capitão ou Sargento.",
    effect:
      "Qualquer figura que ativar junto ao usuário desse poder ganha +4 de Agilidade até sua próxima ação de movimento.",
  },
  {
    name: "Fuzilem esse merda!",
    when: "No começo da ativação do Capitão ou Sargento.",
    effect: `O ativador do poder escolhe uma figura inimiga a até 15cm de distância e linha de visão. Qualquer figura que ativar junto ao usuário desse poder ganha +2 de Precisão até seu próximo ataque a distância contra aquela figura, mas -2 de Precisão contra qualquer outra figura.`,
  },
  {
    name: "Montem os tripés!",
    when: "No começo da ativação do Capitão ou Sargento.",
    effect:
      "Qualquer figura que ativar junto ao usuário desse poder pode usar uma ação, que pode substituir a ação de movimento, para montar um tripé. A próxima vez que fizerem um ataque a distância, eles podem ignorar o primeiro pedaço de terreno intermediário (não cobertura) entre eles e seu alvo.",
  },
  {
    name: "Pelotão de Fuzilamento, alinhar!",
    when: "No começo da ativação do Capitão ou Sargento.",
    effect: `Qualquer figura que ativar junto ao usuário desse poder pode escolher gastar ambas suas ações para entrar em Overwatch. Em qualquer momento durante o movimento de uma figura inimiga, se ela se move dentro de 8cm de uma figura que entrou em Overwatch, a figura que entrou em Overwatch pode fazer um ataque a distância contra ela sem gastar ações.`,
  },
  {
    name: "Desce o Goró, hoje nós lutamos bêbados!",
    when: "No começo da ativação do Capitão ou Sargento.",
    effect:
      "Qualquer figura que ativar junto ao usuário desse poder é Imune a Aterrorizante até o final do turno.",
  },
];

function MercenariesPage() {
  const tableOfContents = [
    {
      id: "origens",
      label: "Origens Mercenárias",
      type: "Section",
      ref: useRef(null),
    },
    {
      id: "unidades",
      label: "Unidades",
      type: "Section",
      ref: useRef(null),
    },
    {
      id: "taticas",
      label: "Táticas de Cão de Guerra",
      type: "Section",
      ref: useRef(null),
    },
  ];

  return (
    <>
      <MobileHeroHeader imageUrl={headerImage} title="Mercenários" />

      <MobileLayout
        title="Mercenários — Cães de Guerra do Império"
        backButtonPath="/warbands"
        tableOfContents={tableOfContents}
      >
        <br />

        <MobileText className="mb-4">
          Os Mercenários são soldados profissionais que vendem suas habilidades
          de combate ao melhor pagador. No mundo sombrio de Mordheim, onde a
          Pedra-Bruxa vale mais que ouro, estes guerreiros endurecidos são
          atraídos pela promessa de riquezas e glória. Eles vêm de todas as
          províncias do Império, cada um trazendo suas próprias tradições
          militares e táticas de combate.
        </MobileText>

        <MobileText className="mb-4">
          Liderados por Capitães experientes e Sargentos veteranos, estes bandos
          combinam disciplina militar com brutalidade pragmática. Suas Táticas
          de Cão de Guerra transformam grupos de soldados individuais em uma
          unidade coesa e implacável, capaz de dominar o campo de batalha
          através de coordenação tática e agressão coletiva.
        </MobileText>

        <MobileText className="mb-4">
          Com sua versatilidade em combate, equipamentos profissionais e
          experiência em guerra, os Mercenários são uma força formidável em
          Mordheim, capazes de se adaptar a qualquer situação de combate e
          superar adversários através de tática e determinação.
        </MobileText>

        <span
          id="origens"
          ref={tableOfContents.find((item) => item.id === "origens")?.ref}
        />
        <CollapsibleSection title="Origens Mercenárias" id="origens">
          <MobileText className="mb-4" variant="heading">
            Reikland
          </MobileText>

          <MobileText className="mb-4">
            Reikland está no coração do Império e sua maior cidade é Altdorf,
            lar do Grande Teogonista e sede do Templo de Sigmar. Os Reiklanders
            são seguidores devotos de Sigmar, o fundador, primeiro Imperador e
            deus patrono do Império.
          </MobileText>

          <MobileText className="mb-4">
            Por todo o Império, os Reiklanders são comumente considerados como
            encarnando a disciplina e lealdade do guerreiro profissional.
            Corajosos e versados nas artes da guerra, os Reiklanders desprezam
            roupas da moda em favor de equipamentos bem feitos e práticos.
          </MobileText>

          <MobileText className="mb-4">
            <strong>Regras Especiais:</strong>
            <br />• <strong>Disciplina Militar:</strong> O Capitão pode ativar
            soldados a até 15cm de si mesmo ao invés dos 8cm usuais
            <br />• <strong>Treinamento Marcial:</strong> Todos os Atiradores
            ganham +1 em sua estatística de Tiro
          </MobileText>

          <MobileText className="mb-4" variant="heading">
            Middenheim
          </MobileText>

          <MobileText className="mb-4">
            Middenheim fica no topo de uma montanha cercada por floresta escura
            no centro de Middenland, e também é conhecida como a Cidade do Lobo
            Branco, em homenagem a Ulric, o antigo deus dos lobos e do inverno.
          </MobileText>

          <MobileText className="mb-4">
            Os Middenheimers são tipicamente homens grandes e bem construídos
            com uma reputação bem merecida por ferocidade. Muitos usam peles de
            lobo que o costume decreta serem a marca daqueles que mataram um
            lobo com suas próprias mãos.
          </MobileText>

          <MobileText className="mb-4">
            <strong>Regras Especiais:</strong>
            <br />• <strong>Prowess Física:</strong> O Capitão e Sargento
            começam com +1 em sua estatística de Luta, mas -1 em sua estatística
            de Tiro
            <br />• <strong>Abençoado pelo Lobo:</strong> O bando pode contratar
            Lobos por 10 moedas de ouro
            <br />• <strong>Fé de Ulric:</strong> Bandos de Middenheim
            substituem o Sargento pelo Sacerdote Lupino de Ulric
          </MobileText>

          <MobileText className="mb-4" variant="heading">
            Marienburg
          </MobileText>

          <MobileText className="mb-4">
            Marienburg é a maior e mais próspera cidade comercial do Velho
            Mundo. Muitos a chamam de Cidade do Ouro, o que por si só transmite
            uma boa ideia da riqueza desta cidade cosmopolita em expansão.
          </MobileText>

          <MobileText className="mb-4">
            Os bandos enviados a Mordheim são luxuosamente vestidos e armados.
            Embora os Marienburgers sejam frequentemente ridicularizados como
            afetados e efeminados, sua habilidade com armas e completa
            impiedosidade lhes rendeu respeito relutante.
          </MobileText>

          <MobileText className="mb-4">
            <strong>Regras Especiais:</strong>
            <br />• <strong>Contatos Comerciais:</strong> Podem rolar um dado
            extra ao fazer rolagens de Mercado Negro
            <br />• <strong>Riqueza de Marienburg:</strong> Começam com 100
            coroas de ouro extras em campanha (600 coroas total), ou +20% em
            jogos únicos
          </MobileText>

          <MobileText className="mb-4" variant="heading">
            Ostermark
          </MobileText>

          <MobileText className="mb-4">
            Os Ostermarkers estão acostumados com probabilidades difíceis e
            lutando sozinhos para defender suas fazendas contra mercenários e
            outros bandidos. Seus anos de isolamento e autossuficiência os
            tornaram guerreiros resistentes.
          </MobileText>

          <MobileText className="mb-4">
            <strong>Regras Especiais:</strong>
            <br />• <strong>Resistente:</strong> O Soldado, Capitão e Sargento
            começam com +1 de Vontade
            <br />• <strong>Cão de Fazenda:</strong> O bando pode contratar Cães
            de Guerra pagando o mesmo que Caçadores de Bruxas. Estes cães de
            guerra são ainda mais severos e têm +2 de Vontade
          </MobileText>
        </CollapsibleSection>

        <span
          id="unidades"
          ref={tableOfContents.find((item) => item.id === "unidades")?.ref}
        />
        <CollapsibleSection title="Unidades" id="unidades">
          <div className="space-y-4">
            {mercenariesUnits.map((unit, index) => (
              <div key={index} id={slugify(unit.name, { lower: true })}>
                <CollapsibleSection
                  title={unit.role ? `${unit.name} (${unit.role})` : unit.name}
                  defaultExpanded={true}
                >
                  <UnitCard
                    name={unit.name}
                    role={unit.role}
                    stats={unit.stats}
                    abilities={unit.abilities}
                    {...(unit.spellAffinity && {
                      spellAffinity: unit.spellAffinity,
                    })}
                  />
                </CollapsibleSection>
              </div>
            ))}
          </div>
        </CollapsibleSection>

        <span
          id="taticas"
          ref={tableOfContents.find((item) => item.id === "taticas")?.ref}
        />
        <CollapsibleSection title="Táticas de Cão de Guerra" id="taticas">
          <MobileText className="mb-4">
            As Táticas de Cão de Guerra representam a disciplina brutal dos
            bandos mercenários movidos por sobrevivência, medo e agressão pura.
            Seu design enfatiza{" "}
            <strong>sinergia coletiva sobre poder individual</strong>, com
            habilidades que se propagam pelo bando e transformam lutadores
            dispersos em uma única unidade rosnante.
          </MobileText>

          <MobileText className="mb-4">
            Em resumo, as Táticas de Cão de Guerra são projetadas para fazer o
            bando lutar como um único organismo — menos elegante que outros, mas
            brutalmente eficaz através de momentum compartilhado e agressão
            impiedosa.
          </MobileText>

          <div className="space-y-4">
            {wardogTactics.map((power, index) => (
              <div key={index} id={slugify(power.name, { lower: true })}>
                <PowerCard
                  name={power.name}
                  when={power.when}
                  effect={power.effect}
                />
              </div>
            ))}
          </div>
        </CollapsibleSection>
      </MobileLayout>
    </>
  );
}

export default MercenariesPage;
