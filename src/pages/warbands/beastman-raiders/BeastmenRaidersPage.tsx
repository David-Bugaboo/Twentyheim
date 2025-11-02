import React from "react";
import MobileSection from "../../../components/MobileSection";
import MobileText from "../../../components/MobileText";
import HeaderH1 from "../../../components/HeaderH1";
import HeaderH2 from "../../../components/HeaderH2";
import UnitCard from "../../../components/UnitCard";
import QuickNavigation from "../../../components/QuickNavigation";
import homemFerasData from "./beastmen-raiders.data.json";
import PageTitle from "../../../components/PageTitle";

const HomemFerasRaidersPage: React.FC = () => {
  // Separar unidades por categoria
  const leader = homemFerasData.find((unit) => unit.role === "Líder");
  const heroes = homemFerasData.filter((unit) => unit.role === "Herói");
  const soldiers = homemFerasData.filter((unit) => !unit.role);

  // Seções para navegação rápida
  const navigationSections = [
    { id: "introducao", title: "Introdução", level: 0 },
    { id: "estrutura-bando", title: "Estrutura do Bando", level: 0 },
    { id: "regras-especiais", title: "Regras Especiais", level: 0 },
    {
      id: "lider",
      title: "Líder",
      level: 0,
      children: leader
        ? [
            {
              id: leader.id,
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
    { id: "tradicoes-magicas", title: "Tradições Mágicas", level: 0 },
  ];

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <QuickNavigation sections={navigationSections} />

      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <PageTitle>Saqueadores Homem-Fera</PageTitle>

          <MobileSection id="introducao">
            <MobileText>
              Os Homens-Fera são figuras brutais, selvagens e aberrantes que
              vivem nas florestas profundas. Qualquer um que viaje através desta
              natureza selvagem corre o risco de ser atacado por estes
              saqueadores imprevisíveis. Muitos daqueles que habitam nos bosques
              ao redor dos arredores de Mordheim afirmam que essas figuras vis
              do Caos superam a humanidade em número, embora tais afirmações
              sejam impossíveis de provar, pois os Homens-Fera não constroem
              cidades e não criam qualquer forma estruturada de sociedade.
            </MobileText>

            <MobileText>
              Ordem e organização são estranhos e odiados por eles, e eles vagam
              onde querem, pilhando e matando por qualquer coisa que precisem ou
              queiram. Eles voluntariamente se voltam uns contra os outros,
              atormentando os mais fracos entre eles por comida e diversão. Os
              Homens-Fera naturalmente formam bandos errantes, embora seja
              desconhecido se o fazem conscientemente ou meramente por instinto.
            </MobileText>

            <MobileText
              variant="quote"
              className="text-center text-lg leading-relaxed mt-8"
            >
              "Eles são liderados pelo mais forte e mais feroz de sua espécie, e
              se algum membro do bando perceber uma fraqueza em seu líder, eles
              se voltarão contra ele em um desafio de liderança brutal que só
              pode resultar em um dos dois sendo morto e consumido pelo
              vencedor."
            </MobileText>

            <MobileText>
              Um pequeno bando é capaz de se mover rapidamente através da
              natureza selvagem sem ser notado, e pode cobrir centenas de milhas
              a cada estação enquanto viajam onde querem. Literalmente milhares
              desses pequenos bandos infestam as florestas sombrias do Velho
              Mundo, predando viajantes e fazendas.
            </MobileText>

            <MobileText>
              Um bando de Homens-Fera ataca sem aviso, e aldeões, comerciantes e
              viajantes vivem em constante medo de emboscada desses habitantes
              da floresta. Eles tentam se preparar para tal evento, e
              frequentemente apelam desesperadamente aos nobres para varrer as
              florestas com suas tropas estatais - no entanto, em tempos de
              agitação política, os nobres têm preocupações muito mais urgentes
              do que os apelos dos aldeões de baixo nascimento.
            </MobileText>

            <MobileText
              variant="quote"
              className="text-center text-lg leading-relaxed mt-8"
            >
              "Cheios de malícia, os Homens-Fera têm um prazer particular em
              derrubar as estruturas cuidadosamente construídas e ordenadas dos
              homens. Eles derrubam cercas e reduzem edifícios a escombros,
              permitindo que sejam reclamados pela floresta."
            </MobileText>

            <MobileText>
              Forçados a se defender sozinhos, aldeões aterrorizados derrubam
              grandes faixas da floresta ao redor de seus assentamentos, e às
              vezes contratam os serviços de mercenários para protegê-los,
              barricando-se em casa quando ouvem rumores de um bando saqueador
              na área. No entanto, as purgas da floresta são quase sempre
              desesperançosas, pois os bandos de Homens-Fera geralmente se movem
              para longe de uma área que atacaram muito antes que qualquer
              retaliação organizada possa ser montada.
            </MobileText>

            <HeaderH1 id="estrutura-bando">Estrutura do Bando</HeaderH1>

            <MobileText>
              Um bando de Homens-Fera deve incluir um mínimo de 3 modelos. Você
              tem 500 coroas que pode usar para recrutar seu bando inicial. O
              número máximo de guerreiros no bando é 15, embora alguns edifícios
              no acampamento do bando possam aumentar isso.
            </MobileText>

            <MobileText>
              • <strong>Chefe Tribal Homem-Fera:</strong> Cada bando de
              Homens-Fera deve ter um Chefe: nem mais, nem menos!
              <br />• <strong>Xamã Homem-Fera:</strong> Seu bando pode incluir
              um único Xamã Homem-Fera (0-1).
              <br />• <strong>Bestigor:</strong> Seu bando pode incluir até dois
              Bestigors (0-2).
              <br />• <strong>Centigor:</strong> Seu bando pode incluir um único
              Centigor (0-1).
              <br />• <strong>Gor:</strong> Seu bando pode incluir até cinco Gor
              (0-5).
              <br />• <strong>Ungor:</strong> Seu bando pode incluir qualquer
              número de Ungor (ilimitado).
              <br />• <strong>Minotauro:</strong> Seu bando pode incluir um
              único Minotauro (0-1).
              <br />• <strong>Cães de Guerra do Caos:</strong> Seu bando pode
              incluir até cinco Cães de Guerra do Caos (0-5).
            </MobileText>
          </MobileSection>

          <MobileSection id="regras-especiais">
            <HeaderH1>Regras Especiais</HeaderH1>
            <MobileText>
              <strong>Animalescos:</strong> Homens-Fera são criaturas temíveis
              do Caos que não interagem com outras raças, exceto para matá-las.
              Um bando de Homens-Fera nunca pode contratar Mercenários a menos
              que isso seja especificamente declarado na descrição do
              Mercenário.
            </MobileText>
          </MobileSection>

          {/* Líder */}
          {leader && (
            <MobileSection id="lider">
              <HeaderH2>Líder</HeaderH2>
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
            </MobileSection>
          )}

          {/* Heróis */}
          {heroes.length > 0 && (
            <MobileSection id="herois">
              <HeaderH2>Heróis</HeaderH2>
              {heroes.map((hero) => (
                <div key={hero.id} id={hero.id}>
                  <UnitCard
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
                </div>
              ))}
            </MobileSection>
          )}

          {/* Soldados */}
          {soldiers.length > 0 && (
            <MobileSection id="soldados">
              <HeaderH2>Soldados</HeaderH2>
              {soldiers.map((soldier) => (
                <div key={soldier.id} id={soldier.id}>
                  <UnitCard
                    id={soldier.id}
                    name={soldier.name}
                    role={soldier.role}
                    quantity={soldier.quantity}
                    lore={soldier.lore}
                    qualidade={(soldier as any).qualidade || 0}
                    stats={soldier.stats}
                    spellAffinity={soldier.spellAffinity}
                    abilities={soldier.abilities}
                    equipment={soldier.equipment}
                  />
                </div>
              ))}
            </MobileSection>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomemFerasRaidersPage;
