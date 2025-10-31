import { useRef } from "react";
import PageTitle from "../../components/PageTitle";
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";
import HeaderH1 from "../../components/HeaderH1";
import HeaderH2 from "../../components/HeaderH2";

import GenericTable from "../../components/GenericTable";
import WarningBox from "../../components/WarningBox";

function ExplorationEventsPage() {
  // Refs para cada seção de evento
  const duplos1_4 = useRef<HTMLDivElement>(null);
  const duplos5_8 = useRef<HTMLDivElement>(null);
  const duplos9_12 = useRef<HTMLDivElement>(null);
  const duplos13_16 = useRef<HTMLDivElement>(null);
  const duplos17_19 = useRef<HTMLDivElement>(null);
  const duplos20 = useRef<HTMLDivElement>(null);
  const triplos1_4 = useRef<HTMLDivElement>(null);
  const triplos5_8 = useRef<HTMLDivElement>(null);
  const triplos9_12 = useRef<HTMLDivElement>(null);
  const triplos13_16 = useRef<HTMLDivElement>(null);
  const triplos17_19 = useRef<HTMLDivElement>(null);
  const triplos20 = useRef<HTMLDivElement>(null);
  const quadruplos1_4 = useRef<HTMLDivElement>(null);
  const quadruplos5_8 = useRef<HTMLDivElement>(null);
  const quadruplos9_12 = useRef<HTMLDivElement>(null);
  const quadruplos9_12_armoreiro = useRef<HTMLDivElement>(null);
  const quadruplos13_16 = useRef<HTMLDivElement>(null);
  const quadruplos20 = useRef<HTMLDivElement>(null);
  const quintuplos1_4 = useRef<HTMLDivElement>(null);
  const quintuplos5_8 = useRef<HTMLDivElement>(null);
  const quintuplos9_12 = useRef<HTMLDivElement>(null);
  const quintuplos13_16 = useRef<HTMLDivElement>(null);
  const quintuplos17_19 = useRef<HTMLDivElement>(null);
  const quintuplos20 = useRef<HTMLDivElement>(null);
  const sextuplos1_4 = useRef<HTMLDivElement>(null);
  const sextuplos5_8 = useRef<HTMLDivElement>(null);
  const sextuplos9_12 = useRef<HTMLDivElement>(null);
  const sextuplos13_16 = useRef<HTMLDivElement>(null);
  const sextuplos17_19 = useRef<HTMLDivElement>(null);
  const sextuplos20 = useRef<HTMLDivElement>(null);

  const explorationEvents = [
    {
      Evento: (
        <div
          onClick={() =>
            duplos1_4.current?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            })
          }
          className="text-green-400 hover:text-green-300 underline cursor-pointer"
        >
          O Poço
        </div>
      ),
      "Tipo de rolagem": "Duplos",
      números: "1-4",
    },
    {
      Evento: (
        <div
          onClick={() =>
            duplos5_8.current?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            })
          }
          className="text-green-400 hover:text-green-300 underline cursor-pointer"
        >
          Cadáver
        </div>
      ),
      "Tipo de rolagem": "Duplos",
      números: "5-8",
    },
    {
      Evento: (
        <div
          onClick={() =>
            duplos9_12.current?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            })
          }
          className="text-green-400 hover:text-green-300 underline cursor-pointer"
        >
          Fugitivo
        </div>
      ),
      "Tipo de rolagem": "Duplos",
      números: "9-12",
    },
    {
      Evento: (
        <div
          onClick={() =>
            duplos13_16.current?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            })
          }
          className="text-green-400 hover:text-green-300 underline cursor-pointer"
        >
          Carroça Virada
        </div>
      ),
      "Tipo de rolagem": "Duplos",
      números: "13-16",
    },
    {
      Evento: (
        <div
          onClick={() =>
            duplos17_19.current?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            })
          }
          className="text-green-400 hover:text-green-300 underline cursor-pointer"
        >
          Loja Arruínada
        </div>
      ),
      "Tipo de rolagem": "Duplos",
      números: "17-19",
    },
    {
      Evento: (
        <div
          onClick={() =>
            duplos20.current?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            })
          }
          className="text-green-400 hover:text-green-300 underline cursor-pointer"
        >
          Gueto
        </div>
      ),
      "Tipo de rolagem": "Duplos",
      números: "20",
    },
    {
      Evento: (
        <div
          onClick={() =>
            triplos1_4.current?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            })
          }
          className="text-green-400 hover:text-green-300 underline cursor-pointer"
        >
          Taverna
        </div>
      ),
      "Tipo de rolagem": "Triplos",
      números: "1-4",
    },
    {
      Evento: (
        <div
          onClick={() =>
            triplos5_8.current?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            })
          }
          className="text-green-400 hover:text-green-300 underline cursor-pointer"
        >
          Oficina de Ferreiro
        </div>
      ),
      "Tipo de rolagem": "Triplos",
      números: "5-8",
    },
    {
      Evento: (
        <div
          onClick={() =>
            triplos9_12.current?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            })
          }
          className="text-green-400 hover:text-green-300 underline cursor-pointer"
        >
          Prisioneiros
        </div>
      ),
      "Tipo de rolagem": "Triplos",
      números: "9-12",
    },
    {
      Evento: (
        <div
          onClick={() =>
            triplos13_16.current?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            })
          }
          className="text-green-400 hover:text-green-300 underline cursor-pointer"
        >
          Loja de Caça
        </div>
      ),
      "Tipo de rolagem": "Triplos",
      números: "13-16",
    },
    {
      Evento: (
        <div
          onClick={() =>
            triplos17_19.current?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            })
          }
          className="text-green-400 hover:text-green-300 underline cursor-pointer"
        >
          Salão de Comércio
        </div>
      ),
      "Tipo de rolagem": "Triplos",
      números: "17-19",
    },
    {
      Evento: (
        <div
          onClick={() =>
            triplos20.current?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            })
          }
          className="text-green-400 hover:text-green-300 underline cursor-pointer"
        >
          Pagando uma Dívida
        </div>
      ),
      "Tipo de rolagem": "Triplos",
      números: "20",
    },
    {
      Evento: (
        <div
          onClick={() =>
            quadruplos1_4.current?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            })
          }
          className="text-green-400 hover:text-green-300 underline cursor-pointer"
        >
          Oficina de Engenheiro Militar
        </div>
      ),
      "Tipo de rolagem": "Quadruplos",
      números: "1-4",
    },
    {
      Evento: (
        <div
          onClick={() =>
            quadruplos5_8.current?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            })
          }
          className="text-green-400 hover:text-green-300 underline cursor-pointer"
        >
          Altar Santo
        </div>
      ),
      "Tipo de rolagem": "Quadruplos",
      números: "5-8",
    },
    {
      Evento: (
        <div
          onClick={() =>
            quadruplos9_12.current?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            })
          }
          className="text-green-400 hover:text-green-300 underline cursor-pointer"
        >
          Prefeitura
        </div>
      ),
      "Tipo de rolagem": "Quadruplos",
      números: "9-12",
    },
    {
      Evento: (
        <div
          onClick={() =>
            quadruplos9_12_armoreiro.current?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            })
          }
          className="text-green-400 hover:text-green-300 underline cursor-pointer"
        >
          Armoreiro
        </div>
      ),
      "Tipo de rolagem": "Quadruplos",
      números: "13-16",
    },
    {
      Evento: (
        <div
          onClick={() =>
            quadruplos13_16.current?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            })
          }
          className="text-green-400 hover:text-green-300 underline cursor-pointer"
        >
          Cemitério
        </div>
      ),
      "Tipo de rolagem": "Quadruplos",
      números: "17-19",
    },
    {
      Evento: (
        <div
          onClick={() =>
            quadruplos20.current?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            })
          }
          className="text-green-400 hover:text-green-300 underline cursor-pointer"
        >
          Catacumbas
        </div>
      ),
      "Tipo de rolagem": "Quadruplos",
      números: "20",
    },
    {
      Evento: (
        <div
          onClick={() =>
            quintuplos1_4.current?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            })
          }
          className="text-green-400 hover:text-green-300 underline cursor-pointer"
        >
          Mansão do Banqueiro
        </div>
      ),
      "Tipo de rolagem": "Quintuplos",
      números: "1-4",
    },
    {
      Evento: (
        <div
          onClick={() =>
            quintuplos5_8.current?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            })
          }
          className="text-green-400 hover:text-green-300 underline cursor-pointer"
        >
          Laboratório de Alquímia
        </div>
      ),
      "Tipo de rolagem": "Quintuplos",
      números: "5-8",
    },
    {
      Evento: (
        <div
          onClick={() =>
            quintuplos9_12.current?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            })
          }
          className="text-green-400 hover:text-green-300 underline cursor-pointer"
        >
          Joalheiro
        </div>
      ),
      "Tipo de rolagem": "Quintuplos",
      números: "9-12",
    },
    {
      Evento: (
        <div
          onClick={() =>
            quintuplos13_16.current?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            })
          }
          className="text-green-400 hover:text-green-300 underline cursor-pointer"
        >
          Mansão do Mercador
        </div>
      ),
      "Tipo de rolagem": "Quintuplos",
      números: "13-16",
    },
    {
      Evento: (
        <div
          onClick={() =>
            quintuplos17_19.current?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            })
          }
          className="text-green-400 hover:text-green-300 underline cursor-pointer"
        >
          Prédio Rachado
        </div>
      ),
      "Tipo de rolagem": "Quintuplos",
      números: "17-19",
    },
    {
      Evento: (
        <div
          onClick={() =>
            quintuplos20.current?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            })
          }
          className="text-green-400 hover:text-green-300 underline cursor-pointer"
        >
          Entrada das Catacumbas
        </div>
      ),
      "Tipo de rolagem": "Quintuplos",
      números: "20",
    },
    {
      Evento: (
        <div
          onClick={() =>
            sextuplos1_4.current?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            })
          }
          className="text-green-400 hover:text-green-300 underline cursor-pointer"
        >
          O Abismo
        </div>
      ),
      "Tipo de rolagem": "Sextuplos",
      números: "1-4",
    },
    {
      Evento: (
        <div
          onClick={() =>
            sextuplos5_8.current?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            })
          }
          className="text-green-400 hover:text-green-300 underline cursor-pointer"
        >
          Tesouro Oculto
        </div>
      ),
      "Tipo de rolagem": "Sextuplos",
      números: "5-8",
    },
    {
      Evento: (
        <div
          onClick={() =>
            sextuplos9_12.current?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            })
          }
          className="text-green-400 hover:text-green-300 underline cursor-pointer"
        >
          Oficina Anã
        </div>
      ),
      "Tipo de rolagem": "Sextuplos",
      números: "9-12",
    },
    {
      Evento: (
        <div
          onClick={() =>
            sextuplos13_16.current?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            })
          }
          className="text-green-400 hover:text-green-300 underline cursor-pointer"
        >
          Bando Massacrado
        </div>
      ),
      "Tipo de rolagem": "Sextuplos",
      números: "13-16",
    },
    {
      Evento: (
        <div
          onClick={() =>
            sextuplos17_19.current?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            })
          }
          className="text-green-400 hover:text-green-300 underline cursor-pointer"
        >
          As Arenas Clandestinas
        </div>
      ),
      "Tipo de rolagem": "Sextuplos",
      números: "17-19",
    },
    {
      Evento: (
        <div
          onClick={() =>
            sextuplos20.current?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            })
          }
          className="text-green-400 hover:text-green-300 underline cursor-pointer"
        >
          O Condomínio a Beira do Lago
        </div>
      ),
      "Tipo de rolagem": "Sextuplos",
      números: "20",
    },
  ];

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <MobileSection>
            <PageTitle>Eventos de Exploração</PageTitle>

            <MobileText>
              Durante a exploração das ruínas de Mordheim, os heróis podem
              desencadear eventos especiais quando rolam números iguais nos
              dados de exploração. Estes eventos podem trazer grandes
              recompensas, mas também grandes perigos.
            </MobileText>

            <HeaderH1>Como Funcionam os Eventos</HeaderH1>
            <MobileText>
              Quando um herói rola dois ou mais números iguais durante a
              exploração, um evento é desencadeado. O tipo de evento depende da
              faixa de números rolados. Cada evento apresenta escolhas e
              consequências únicas.
            </MobileText>

            <WarningBox title="Arrendondando" type="warning">
              <MobileText>
                Sempre que um evento recompensar 1d20/X, arredonde para baixo,
                mas sempre mantendo um mínimo de 1.
              </MobileText>
            </WarningBox>

            <HeaderH2>Tabela de Eventos de Exploração</HeaderH2>
            <GenericTable data={explorationEvents} />

            <div id="descricoes-eventos">
              <HeaderH1>Descrições dos Eventos</HeaderH1>
            </div>

            <div id="duplos-1-4-1-4" ref={duplos1_4}>
              <HeaderH2>Duplos (1-4,1-4) - O Poço</HeaderH2>
              <MobileText>
                Escolha um de seus Heróis e faça um teste de Vontade CD 12. Se
                tiver sucesso, ele encontra um fragmento de Pedra-Bruxa no fundo
                do poço. Se falhar, o Herói engole água contaminada e não
                participa do próximo jogo.
              </MobileText>
            </div>

            <div id="duplos-5-8-5-8" ref={duplos5_8}>
              <HeaderH2>Duplos (5-8,5-8) - Loja</HeaderH2>
              <MobileText>
                A loja da Guilda dos Mercadores foi completamente saqueada.
                Mesmo assim, ainda há itens espalhados pela sala única e
                comprida, misturados com os escombros. Alguns são úteis, como
                panelas e frigideiras de ferro fundido e rolos de tecido fino.
                Todo tipo de itens menores estão espalhados - o tipo de
                bugiganga que não tem mais utilidade em uma cidade devastada com
                poucos habitantes.
              </MobileText>
              <MobileText>
                Após uma busca minuciosa você encontra saque no valor de D20/5
                (arredonde para baixo) coroas de ouro. Se rolar 18, 19 ou 20,
                você também encontrará um Amuleto da Sorte.
              </MobileText>
            </div>

            <div id="duplos-9-12-9-12" ref={duplos9_12}>
              <HeaderH2>Duplos (9-12,9-12) - Cadáver</HeaderH2>
              <MobileText>
                Você encontra um cadáver fresco. Uma adaga lascada está cravada
                em suas costas. Surpreendentemente, suas posses não foram
                roubadas.
              </MobileText>
              <MobileText>
                Para ver o que você encontra ao revistar o cadáver, role um D20:
              </MobileText>
              <MobileText>
                <strong>1-7:</strong> 1D20/3 coroas de ouro
                <br />
                <strong>8-12:</strong> Adaga
                <br />
                <strong>13-15:</strong> Machado
                <br />
                <strong>16-18:</strong> Espada
                <br />
                <strong>19-20:</strong> Armadura Leve
              </MobileText>
            </div>

            <div id="duplos-13-16-13-16" ref={duplos13_16}>
              <HeaderH2>Duplos (13-16,13-16) - Fugitivo</HeaderH2>
              <MobileText>
                Seu bando encontra um dos sobreviventes de Mordheim, que perdeu
                sua sanidade junto com todas as suas posses mundanas.
              </MobileText>
              <MobileText>
                <strong>Bandos Skaven</strong> podem vender o fugitivo para
                agentes do Clã Eshin (que usarão o homem como comida ou
                escravidão) e ganhar 1d20/2 (arredonde para baixo) coroas de
                ouro.
              </MobileText>
              <MobileText>
                <strong>
                  Cultos dos Possuídos, Saqueadores Homem-Fera, Filhos de Hashut
                  ou Corsários Druchii
                </strong>{" "}
                podem sacrificar o infeliz pela glória de seus deuses profanos.
                O líder do bando ganhará +50 de Experiência.
              </MobileText>
              <MobileText>
                <strong>Bandos Mortos-Vivos</strong> podem matar o homem e
                ganhar um Zumbi sem custo.
              </MobileText>
              <MobileText>
                <strong>Qualquer outro bando</strong> pode interrogar o homem e
                ganhar insight sobre a cidade. Na próxima vez que rolar na
                tabela de Exploração, role um dado a mais do que normalmente
                permitido, e descarte qualquer um dos dados.
              </MobileText>
            </div>

            <div id="duplos-17-19-17-19" ref={duplos17_19}>
              <HeaderH2>Duplos (17-19,17-19) - Carroça Virada</HeaderH2>
              <MobileText>
                Presa em um portão arruinado está uma carroça virada - o tipo
                coberto que nobres usam para viajar da cidade para suas casas de
                veraneio. Como qualquer pessoa importante fugiu há muito tempo,
                o que ela está fazendo aqui? Os cavalos se soltaram, ou alguém
                os libertou?
              </MobileText>
              <MobileText>Role um D20 para ver o que você encontra:</MobileText>
              <MobileText>
                <strong>1-8:</strong> Mapa de Mordheim (veja Acessórios)
                <br />
                <strong>8-15:</strong> Uma bolsa com 1d20/2 (arredonde para
                baixo) coroas de ouro
                <br />
                <strong>16-20:</strong> Espada e adaga cravejadas de joias.
                Estes podem ser mantidos ou vendidos pelo dobro do valor de uma
                espada e adaga normais.
              </MobileText>
            </div>

            <div id="duplos-20-20" ref={duplos20}>
              <HeaderH2>Duplos (20-20) - Casas Arruinadas</HeaderH2>
              <MobileText>
                A rua consiste em casas arruinadas, que estão inclinadas em
                ângulos alarmantes. Não há muito que valha a pena saquear aqui.
              </MobileText>
              <MobileText>
                Você encontra saque no valor de 1d20/3 coroas de ouro entre as
                ruínas.
              </MobileText>
            </div>

            <div id="triplos-1-4-1-4-1-4" ref={triplos1_4}>
              <HeaderH2>Triplos (1-4,1-4,1-4) - Taverna</HeaderH2>
              <MobileText>
                A ruína de uma taverna é reconhecível por sua placa ainda
                pendurada na parede. A parte superior do edifício está
                arruinada, mas as adegas são escavadas na rocha e ainda estão
                cheias de barris. Há canecas e copos quebrados por toda parte.
              </MobileText>
              <MobileText>
                Você poderia facilmente vender os barris por um bom preço.
                Infelizmente seus homens também estão interessados no conteúdo!
                O líder do bando deve fazer um teste de Vontade CD 14. Se
                passar, o bando ganha 1d20 coroas de ouro em vinhos e cervejas
                que podem ser vendidos imediatamente.
              </MobileText>
              <MobileText>
                Se falhar, os homens bebem a maior parte do álcool apesar das
                ameaças e xingamentos de seu líder. Você tem 1d20/3 coroas de
                ouro em álcool restantes quando o bando chega ao acampamento.
              </MobileText>
              <MobileText>
                Bandos Mortos-Vivos, Caçadores de Bruxas e Irmãs de Sigmar
                passam automaticamente neste teste, pois não são tentados por
                coisas mundanas como álcool.
              </MobileText>
            </div>

            <div id="triplos-5-8-5-8-5-8" ref={triplos5_8}>
              <HeaderH2>Triplos (5-8,5-8,5-8) - Oficina de Ferreiro</HeaderH2>
              <MobileText>
                A fornalha e a bigorna tombada tornam óbvio que tipo de trabalho
                era feito aqui. A maior parte do ferro e das ferramentas foi
                saqueada há muito tempo. Carvão e escória cobrem o chão, mas
                ainda podem haver armas a serem encontradas entre os escombros.
              </MobileText>
              <MobileText>
                Role um D6 para determinar o que você encontra:
              </MobileText>
              <MobileText>
                <strong>1-4:</strong> Espada
                <br />
                <strong>5-8:</strong> Arma de Duas Mãos
                <br />
                <strong>9-12:</strong> Mangual
                <br />
                <strong>13-16:</strong> 1d20/3 Alabardas
                <br />
                <strong>17-18:</strong> Lança
                <br />
                <strong>19-29:</strong> 1d20/2 coroas de ouro em metal (adicione
                o valor ao seu tesouro)
              </MobileText>
            </div>

            <div
              id="triplos-9-12-9-12-9-12"
              style={{ scrollMarginTop: "80px" }}
            >
              <HeaderH2>Triplos (9-12,9-12,9-12) - Prisioneiros</HeaderH2>
              <MobileText>
                Um som abafado vem de um dos edifícios. Dentro você encontra um
                grupo de pessoas bem vestidas que foram trancadas em um porão.
                Talvez sejam prisioneiros capturados por cultistas, prontos para
                serem sacrificados durante Geheimnisnacht.
              </MobileText>
              <MobileText>
                <strong>
                  Culto dos Possuídos, Saqueadores Homem-Fera, Filhos de Hashut
                  ou Corsários Druchii
                </strong>{" "}
                podem sacrificar as vítimas (sem dúvida terminando o trabalho
                dos captores). Todos os Heróis do bando ganham +50 XP.
              </MobileText>
              <MobileText>
                <strong>Bandos Mortos-Vivos</strong> podem matar cruelmente os
                prisioneiros e ganhar 3 Zumbis sem custo.
              </MobileText>
              <MobileText>
                <strong>Skaven</strong> podem vender os prisioneiros para
                escravidão por 1d20/2 coroas de ouro.
              </MobileText>
              <MobileText>
                <strong>Outros bandos</strong> podem escoltar os prisioneiros
                para fora da cidade. Por seus problemas, são recompensados com
                1D20/4 coroas de ouro. Além disso, um dos prisioneiros decide
                que deseja se juntar ao bando. Se você puder equipar o novo
                recruta com armas e armaduras, pode adicionar um novo Soldado
                humano ao seu bando. (usa estatísticas de um Recruta dos
                mercenários.)
              </MobileText>
            </div>

            <div
              id="triplos-13-16-13-16-13-16"
              style={{ scrollMarginTop: "80px" }}
            >
              <HeaderH2>
                Triplos (13-16,13-16,13-16) - Loja de Artigos de Caça
              </HeaderH2>
              <MobileText>
                Esta cabana foi uma vez a oficina de um flecheiro - um
                fabricante de arcos e flechas. Há feixes de madeira de teixo e
                varas de salgueiro por toda parte.
              </MobileText>
              <MobileText>
                Role um 1d20 para ver o que você encontra:
              </MobileText>
              <MobileText>
                <strong>1-7:</strong> 1D20/3 Arcos Curtos
                <br />
                <strong>8-12:</strong> 1D20/3 Arcos
                <br />
                <strong>13-15:</strong> 1D20/3 Arcos Longos
                <br />
                <strong>14-16:</strong> Aljava de Flechas de Caça
                <br />
                <strong>17-20:</strong> 1D20/3 Bestas
              </MobileText>
            </div>

            <div
              id="triplos-17-19-17-19-17-19"
              style={{ scrollMarginTop: "80px" }}
            >
              <HeaderH2>
                Triplos (17-19,17-19,17-19) - Salão de Comércio
              </HeaderH2>
              <MobileText>
                O salão de comércio foi erguido sobre pilares, com a bolsa de
                grãos enquadrada acima do mercado aberto. O andar superior foi
                gravemente danificado, mas o mercado coberto ainda oferece um
                bom abrigo. Os restos do último dia de mercado ainda estão
                espalhados nos paralelepípedos. A maior parte disso é cerâmica
                quebrada e panelas de ferro.
              </MobileText>
              <MobileText>
                Você encontra vários itens no valor total de 1d20/2 coroas de
                ouro.
              </MobileText>
            </div>

            <div id="triplos-20-20-20" ref={triplos20}>
              <HeaderH2>Triplos (20,20,20) - Pagando uma Dívida</HeaderH2>
              <MobileText>
                Enquanto você está retornando ao seu acampamento, encontra um de
                seus velhos conhecidos. Ele veio para pagar uma dívida ou favor
                antigo.
              </MobileText>
              <MobileText>
                Você ganha os serviços de qualquer um Mercenário (escolha entre
                os disponíveis para seu bando) pela duração do próximo jogo,
                gratuitamente. Após a batalha ele partirá, ou você pode
                continuar pagando por sua manutenção normalmente.
              </MobileText>
            </div>

            <div id="quadruplos-1-4-1-4-1-4-1-4" ref={quadruplos1_4}>
              <HeaderH2>
                Quádruplos (1,4,1-4,1-4,1-4) - Oficina de Engenheiro Militar
              </HeaderH2>
              <MobileText>
                Você encontra a oficina de um engenheiro militar anão. Suas
                portas foram arrombadas e os quartos saqueados, mas algumas das
                caixas-fortes de ferro sobreviveram intactas.
              </MobileText>
              <MobileText>Role um D20 para ver o que você encontra:</MobileText>
              <MobileText>
                <strong>1-4:</strong> Bacamarte
                <br />
                <strong>4-8:</strong> Cinto de Pistolas
                <br />
                <strong>9-12:</strong> Cinto de Pistolas com o modificador de
                Duelista
                <br />
                <strong>13-16-:</strong> 1D20/3 Arcabuzes
                <br />
                <strong>17-19:</strong> 1D20/3 Frascos de Pólvora Superior
                <br />
                <strong>20:</strong> Rifle de Caça de Hochland
              </MobileText>
            </div>

            <div id="quadruplos-5-8-5-8-5-8-5-8" ref={quadruplos5_8}>
              <HeaderH2>Quádruplos (5-8,5-8,5-8,5-8) - Santuário</HeaderH2>
              <MobileText>
                Seu bando tropeça em um santuário arruinado, que está tão
                danificado que é difícil dizer qual deus era adorado dentro de
                suas paredes. Algumas imagens permanecem nas paredes de gesso
                pintado, mas foram desfiguradas por hereges. Fragmentos de
                estátuas quebradas estão entre as ruínas. Alguns itens parecem
                estar cobertos de folha de ouro, a maior parte da qual foi
                arrancada.
              </MobileText>
              <MobileText>
                Seu bando pode saquear o santuário e ganhar 1d20 coroas de ouro
                em saque.
              </MobileText>
              <MobileText>
                <strong>
                  Irmãs de Sigmar ou Caçadores de Bruxas ou um bando de
                  Mercenários de Middenheim
                </strong>{" "}
                podem salvar algumas das relíquias sagradas do santuário. Eles
                ganharão 1d20 coroas de ouro de seus patronos, e uma bênção dos
                deuses. Uma de suas figuras (escolhida pelo jogador) agora será
                abençoada e ganhará Ódio(Cortes Vampiricas, Culto dos Possuídos,
                Saqueadores Homem-Fera, Filhos de Hashut, Corsários Druchii).
              </MobileText>
            </div>

            <div id="quadruplos-9-12-9-12-9-12-9-12" ref={quadruplos9_12}>
              <HeaderH2>Quádruplos (9-12,9-12,9-12,9-12) - Prefeitura</HeaderH2>
              <MobileText>
                Esta casa de três andares era a sede da administração da cidade.
                A rua agora está em ruínas, mas este prédio permanece em grande
                parte intacta. Explorando-a você descobre que o sótão é tão
                íngreme que você consegue pular entre os prédios da rua sem
                maiores dificuldades
              </MobileText>
              <MobileText>
                Seu bando encontra 1d20 coroas de ouro em saque.
              </MobileText>
            </div>

            <div
              id="quadruplos-9-12-9-12-9-12-9-12-armoreiro"
              ref={quadruplos9_12_armoreiro}
            >
              <HeaderH2>Quádruplos (9-12,9-12,9-12,9-12) - Armoreiro</HeaderH2>
              <MobileText>
                Um peitoral pendurado em um poste chamou sua atenção para este
                lugar, obviamente muito alto para ser facilmente saqueado. A
                oficina está arruinada e a forja foi quebrada. Remexendo na
                fuligem, você encontra várias peças de armadura pela metade.
              </MobileText>
              <MobileText>Role um D20 para ver o que você encontra:</MobileText>
              <MobileText>
                <strong>1-10:</strong> 1D20/3 Escudos
                <br />
                <strong>11-13:</strong> 1D20/3 Elmos
                <br />
                <strong>14-16:</strong> 1D20/3 Armaduras Leves
                <br />
                <strong>=17-18:</strong> 1D20/3 Armaduras Pesadas
                <br />
                <strong>19-20:</strong> Armadura de Ithilmar
              </MobileText>
            </div>

            <div id="quadruplos-13-16-13-16-13-16-13-16" ref={quadruplos13_16}>
              <HeaderH2>
                Quádruplos (13-16,13-16,13-16,13-16) - Cemitério
              </HeaderH2>
              <MobileText>
                Você encontra um cemitério antigo, repleto de sepulcros que
                estão cobertos de erva daninha. Os monumentos aos mortos são
                grotescos e decorados com gárgulas esculpidas. Parece que
                algumas das criptas já foram arrombadas por ladrões de túmulos.
              </MobileText>
              <MobileText>
                <strong>
                  Qualquer bando exceto Caçadores de Bruxas e Irmãs de Sigmar
                </strong>{" "}
                pode saquear as criptas e túmulos e ganhar 1d20x5 coroas de ouro
                em saque.
              </MobileText>
              <MobileText>
                Se você saquear o cemitério, na próxima vez que jogar contra
                Irmãs de Sigmar ou Caçadores de Bruxas, todo o bando inimigo
                terá a característica Ódio contra todos os modelos em seu bando.
              </MobileText>
              <MobileText>
                <strong>Caçadores de Bruxas e Irmãs de Sigmar</strong> podem
                selar os túmulos. Eles serão recompensados por sua piedade com
                50 pontos de Experiência para cada héroi do bando.
              </MobileText>
            </div>

            <div id="quadruplos-20-20-20-20" ref={quadruplos20}>
              <HeaderH2>Quádruplos (20,20,20,20) - Catacumbas</HeaderH2>
              <MobileText>
                Você encontra uma entrada para as catacumbas e túneis abaixo de
                Mordheim.
              </MobileText>
              <MobileText>
                Você pode usar os novos túneis que encontrou no próximo jogo que
                jogar. Posicione até três figuras (nada com a característica
                Grande ou Possuídos) em qualquer lugar do campo de batalha no
                nível do solo. Eles são posicionados no final do primeiro turno
                de jogo e não podem ser posicionados dentro de 20cm de qualquer
                modelo inimigo.
              </MobileText>
              <MobileText>
                Isso representa suas figuras fazendo seu caminho através dos
                túneis, infiltrando-se nas linhas inimigas e emergindo
                subitamente de baixo da terra.
              </MobileText>
            </div>

            <div id="quintuplos-1-4-1-4-1-4-1-4-1-4" ref={quintuplos1_4}>
              <HeaderH2>
                Quíntuplos (1-4,1-4,1-4,1-4,1-4) - Casa do Agiota
              </HeaderH2>
              <MobileText>
                Uma mansão grandiosa, construída solidamente em pedra,
                sobreviveu ao cataclisma notavelmente bem. Um brasão esculpido
                adorna a verga acima da porta, embora tenha sido danificado por
                saqueadores e os símbolos agora são irreconhecíveis. A própria
                porta foi arrombada a machadadas e está pendurada nas
                dobradiças.
              </MobileText>
              <MobileText>
                Dentro, escondido entre os escombros, você encontra 1d20x10
                coroas de ouro para adicionar ao seu tesouro.
              </MobileText>
            </div>

            <div id="quintuplos-5-8-5-8-5-8-5-8-5-8" ref={quintuplos5_8}>
              <HeaderH2>
                Quíntuplos (5-8,5-8,5-8,5-8,5-8) - Laboratório de Alquimista
              </HeaderH2>
              <MobileText>
                Uma escada estreita leva para baixo até uma moradia subterrânea
                que era uma Oficina de Alquimista. A placa ainda balança sob o
                vento contaminado da cidade de uma dobradiça acima da entrada.
                Parece que este era um prédio muito antigo que permaneceu em uso
                por séculos, embora não tenha sobrevivido muito bem à destruição
                do cometa. O chão de pedra tem símbolos estranhos entalhados e
                há gráficos e símbolos astrológicos pintados nas paredes.
              </MobileText>
              <MobileText>
                Nas ruínas você encontra saque no valor de 1d20 coroas de ouro e
                um caderno velho e batido. Um de seus Heróis pode estudar o
                caderno do Alquimista, e a sabedoria extra que ele ganha
                permitirá que ele escolha entre habilidades da lista Acadêmica
                sempre que ganhar uma nova habilidade, além daquelas normalmente
                disponíveis para ele.
              </MobileText>
            </div>

            <div id="quintuplos-9-12-9-12-9-12-9-12-9-12" ref={quintuplos9_12}>
              <HeaderH2>
                Quíntuplos (9-12,9-12,9-12,9-12,9-12) - Joalheiro
              </HeaderH2>
              <MobileText>
                As casas no bairro dos joalheiros foram todas completamente
                saqueadas. Até os escombros foram vasculhados em busca de restos
                de ouro e pedras preciosas. Mas ainda assim, algumas miúdezas
                valiosas podem ter sido esquecidos.
              </MobileText>
              <MobileText>Role um D20 para ver o que você encontra:</MobileText>
              <MobileText>
                <strong>1-7:</strong> Pedras de quartzo no valor de 1d20 coroas
                de ouro
                <br />
                <strong>8-12:</strong> Ametista no valor de 20 coroas de ouro
                <br />
                <strong>13-17:</strong> Colar no valor de 50 coroas de ouro
                <br />
                <strong>18-20:</strong> Um rubi no valor de 1d20x15 coroas de
                ouro
              </MobileText>
              <MobileText>
                Se seu bando não vender as pedras preciosas, um de seus Heróis
                pode mantê-las e exibi-las orgulhosamente. Ele ganhará +3 nas
                rolagens de procurar no mercado negro e procurar mercenários,
                pois mercadores se aglomeram em torno de um guerreiro obviamente
                rico.
              </MobileText>
            </div>

            <div
              id="quintuplos-13-16-13-16-13-16-13-16-13-16"
              ref={quintuplos13_16}
            >
              <HeaderH2>
                Quíntuplos (13-16,13-16,13-16,13-16,13-16) - Casa do Mercador
              </HeaderH2>
              <MobileText>
                A casa do mercador fica à beira-mar. Tem um depósito de pedra
                abobadado que ainda está lotado de barris e fardos de tecido. As
                comidas foram saqueadas ou devoradas há muito tempo e ratazanas
                enormes infestam os fardos apodrecidos. Subindo as escadas estão
                os aposentos, construídos solidamente em madeira, embora
                severamentedanificados. Você acha que ainda pode subir até eles,
                mas precisará ter cuidado onde pisa!
              </MobileText>
              <MobileText>
                Dentro você encontra vários objetos valiosos que podem ser
                vendidos por 2D6x5 coroas de ouro. Se rolar um duplo, em vez de
                encontrar dinheiro você encontra o símbolo da Ordem dos
                Comerciantes Livres. Um Herói em posse deste ganha a habilidade
                Negociar.
              </MobileText>
            </div>

            <div
              id="quintuplos-17-19-17-19-17-19-17-19-17-19"
              ref={quintuplos17_19}
            >
              <HeaderH2>
                Quíntuplos (17-19,17-19,17-19,17-19,17-19) - Prédio Rachado
              </HeaderH2>
              <MobileText>
                O cometa destruiu este prédio quase completamente, tornando-o
                inseguro para todos, exceto os mais ousados. Contudo seu faro
                para pedra-bruxa o atrai para esse lugar.
              </MobileText>
              <MobileText>
                Você encontra 3 fragmentos de Pedra-Bruxa entre as ruínas. Além
                disso, além disso, faça um teste de vontade CD 10. Se passar, um
                cão de guerra que guardava a propriedade se junta ao seu bando.
              </MobileText>
            </div>

            <div id="quintuplos-20-20-20-20-20" ref={quintuplos20}>
              <HeaderH2>
                Quíntuplos (20,20,20,20,20) - Entrada das Catacumbas
              </HeaderH2>
              <MobileText>
                Você encontra uma entrada bem escondida para as catacumbas
                escuras que se estendem por quilômetros sob a cidade de
                Mordheim. Embora a entrada pareça aterrorizante, os túneis
                economizarão horas em suas buscas pela cidade.
              </MobileText>
              <MobileText>
                Você pode usar estes túneis para explorar Mordheim com mais
                eficiência. A partir de agora, você pode re-rolar um dado de
                exploração. Anote isso na ficha do seu bando.
              </MobileText>
            </div>

            <div id="sextuplos-1-4-1-4-1-4-1-4-1-4-1-4" ref={sextuplos1_4}>
              <HeaderH2>
                Sêxtuplos (1-4,1-4,1-4,1-4,1-4,1-4) - O Abismo
              </HeaderH2>
              <MobileText>
                Você encontrou o Abismo, a enorme cratera criada pelo cometa.
                Uma nuvem negra ainda para sob ela, mas você pode ver
                Pedra-Bruxa brilhando por toda parte. Este é o domínio do Lorde
                das Sombras, o senhor dos Possuídos, e ninguém é bem-vindo aqui
                - nem mesmo seus próprios seguidores!
              </MobileText>
              <MobileText>
                Se desejar, você pode enviar um de seus Heróis para procurar por
                Pedra-Bruxa escondida aqui. Role um D20. Em uma rolagem de 1-5,
                o Herói é devorado pelos guardiões do Abismo e nunca mais é
                visto. Em uma rolagem de 6 ou mais, ele retorna com 6 fragmentos
                de Pedra-Bruxa.
              </MobileText>
            </div>

            <div id="sextuplos-5-8-5-8-5-8-5-8-5-8-5-8" ref={sextuplos5_8}>
              <HeaderH2>
                Sêxtuplos (5-8,5-8,5-8.5-8,5-8,5-8) - Tesouro Oculto
              </HeaderH2>
              <MobileText>
                Nas profundezas de Mordheim, você encontra um baú escondido,
                ostentando o brasão de uma das famílias nobres da cidade.
              </MobileText>
              <MobileText>
                Quando você abre o baú, encontra os seguintes itens. Role para
                cada item da lista separadamente (além das coroas de ouro) para
                ver se você o encontrou:
              </MobileText>
              <MobileText>
                <strong>3 Pedaços de Pedra-Bruxa:</strong> 12+
                <br />
                <strong>100 coroas de ouro:</strong> Automático
                <br />
                <strong>Relíquia Sagrada:</strong> 14+
                <br />
                <strong>Armadura Pesada:</strong> 14+
                <br />
                <strong>3 Gemas no valor de 10 coroas cada:</strong> 12+
                <br />
                <strong>Manto Élfico:</strong> 16+
                <br />
                <strong>Tomo Sagrado:</strong> 16+
                <br />
                <strong>Artefato Mágico:</strong> 18+
              </MobileText>
            </div>

            <div
              id="sextuplos-9-12-9-12-9-12-9-12-9-12-9-12"
              ref={sextuplos9_12}
            >
              <HeaderH2>
                Sêxtuplos (9-12,9-12,9-12,9-12,9-12,9-12) - Oficina Anã
              </HeaderH2>
              <MobileText>
                Você encontra uma oficina de pedra solidamente construída. Uma
                inscrição rúnica indica que esta pode ter sido uma Oficina de um
                ferreiro anão.
              </MobileText>
              <MobileText>
                Role um 1D20 para ver o que você encontra:
              </MobileText>
              <MobileText>
                <strong>1:</strong> 3 Armas de Duas Mãos
                <br />
                <strong>2:</strong> 3 Armaduras Pesadas
                <br />
                <strong>3:</strong> Machado de Gromril
                <br />
                <strong>4:</strong> Martelo de Gromril
                <br />
                <strong>5:</strong> Arma de Duas Mãos de Gromril
                <br />
                <strong>6:</strong> Armadura de Gromril
              </MobileText>
            </div>

            <div
              id="sextuplos-13-16-13-16-13-16-13-16-13-16-13-16"
              ref={sextuplos13_16}
            >
              <HeaderH2>
                Sêxtuplos (13-16,13-16,13-16,13-16,13-16,13-16) - Bando
                Massacrado
              </HeaderH2>
              <MobileText>
                Você encontra os corpos de um bando inteiro. Cadáveres
                retorcidos estão espalhados entre as ruínas, dilacerados por
                alguma figura monstruosa. Você vê uma forma enorme, que parece
                uma figura Possuída, cambaleando para longe.
              </MobileText>
              <MobileText>
                Após dar aos mortos seus ritos finais (Irmãs de Sigmar ou
                Caçadores de Bruxas), comê-los (Skaven ou Mortos-Vivos) ou
                saqueá-los (qualquer outro!), você encontra os seguintes itens.
                Role para cada item separadamente para ver se você o encontrou:
              </MobileText>
              <MobileText>
                <strong>60 coroas de ouro:</strong> Automático
                <br />
                <strong>3 Armaduras Leves:</strong> 10+
                <br />
                <strong>Armadura Pesada:</strong> 14+
                <br />
                <strong>6 Adagas:</strong> Automático
                <br />
                <strong>Mapa de Mordheim:</strong> 10+
                <br />
                <strong>3 Alabardas:</strong> 16+
                <br />
                <strong>3 Espadas:</strong> 8+
                <br />
                <strong>3 Escudos:</strong> 4+
                <br />
                <strong>3 Arcos:</strong> 10+
                <br />
                <strong>3 Elmos:</strong> 4+
              </MobileText>
            </div>

            <div
              id="sextuplos-17-19-17-19-17-19-17-19-17-19-17-19"
              ref={sextuplos17_19}
            >
              <HeaderH2>
                Sêxtuplos (17-19,17-19,17-19,17-19,17-19,17-19) - As Arenas de
                Combate
              </HeaderH2>
              <MobileText>
                Durante tempos melhores, Mordheim era famosa por seus duelistas
                e gladiadores. Você encontrou uma das arenas usadas para treinar
                estes guerreiros. O lugar está cheio de material de treinamento
                e armas de madeira.
              </MobileText>
              <MobileText>
                Você encontra um manual de treinamento, que pode vender por 100
                coroas de ouro ou deixar um de seus Heróis ler. O conhecimento
                extra que seu Herói obtém ao ler o manual lhe dá direito a
                escolher entre habilidades de Combate sempre que ganhar uma nova
                habilidade, e seu Ímpeto pode agora ser aumentado por um ponto
                extra acima de seu máximo racial normal.
              </MobileText>
            </div>

            <div id="sextuplos-20-20-20-20-20-20" ref={sextuplos20}>
              <HeaderH2>
                Sêxtuplos (20,20,20,20,20,20) - Vila a Beira-Mar
              </HeaderH2>
              <MobileText>
                Você encontra uma casa fina que está parcialmente arruinada. Foi
                completamente saqueada e todos os móveis tiveram sua madeira
                nobre e decorações de metal precioso arrancadas. Fragmentos de
                cerâmica quebrada da mais fina qualidade estão espalhados pelo
                chão.
              </MobileText>
              <MobileText>
                Role um D20. Se rolar 1-7, você encontra itens e dinheiro no
                valor de 1d20x10 coroas de ouro para adicionar ao seu tesouro.
                Em uma rolagem de 8-15, você encontra 5 frascos de Sombra
                Carmesim. Em uma rolagem de 16-20 você encontra um artefato
                mágico escondido cuidadosamente oculto em uma adega escondida ou
                atrás de uma porta secreta. Role na tabela de Artefatos Mágicos.
              </MobileText>

              <HeaderH1>Artefatos Mágicos</HeaderH1>
              <MobileText>
                Quando um resultado na tabela de Exploração indica que você
                encontrou um artefato mágico, role um D20 e use esta tabela para
                determinar qual item você encontra. Em uma campanha, nenhum
                destes itens pode aparecer mais de uma vez, então se você
                encontrar um item mágico que já está na posse de outra pessoa,
                role novamente - mesmo que o guerreiro que o carregava tenha
                sido morto.
              </MobileText>
            </div>

            <div id="artefato-1">
              <HeaderH2>1 - As ferramentas de escalada de Pieter</HeaderH2>
              <MobileText>
                Pieter, o mestre ladrão da Guilda das Sombras, era o mais famoso
                de todos os criminosos de Mordheim. Ele ganhou o apelido de
                'Aranha' por seus roubos ousados. O segredo de seu sucesso era
                um par de botas encantadas e uma corda mágica que ele havia
                adquirido de terras distantes de Araby.
              </MobileText>
              <MobileText>
                Um modelo usando essas ferramentas nunca recebe penalidades ou
                redução no seu atributo movimento devido a qualquer tipo de
                terreno (incluindo vertical) ou por ações de disparada.
                Adicionalmente, ganha +4 de Movimento.
              </MobileText>
            </div>

            <div id="artefato-2">
              <HeaderH2>2 - A Misericórdia do Conde de Ventimiglia</HeaderH2>
              <MobileText>
                Esta adaga foi usada pelo notório cavalheiro-pirata tileano
                conhecido como o 'Corsário Negro'. Alega-se que ele a encontrou
                em ruínas élficas antigas e a lenda também diz que a lâmina da
                adaga não pode ser danificada de forma alguma.
              </MobileText>
              <MobileText>
                A adaga é tratada como uma espada. Ela causa um ataque crítico
                em uma rolagem de ataque de 18+ e seu crítico causa 8 de dano
                extra ao invés de 5. Causa dano mágico.
              </MobileText>
            </div>

            <div id="artefato-3">
              <HeaderH2>3 - A Armadura de Placas de Att'la</HeaderH2>
              <MobileText>
                Esta armadura foi dada como presente pelo Lorde Anão Kurgan ao
                senhor da guerra Att'la no tempo de Sigmar Heldenhammer.
              </MobileText>
              <MobileText>
                A Armadura de Placas de Att'la é um conjunto de Armadura de
                Gromril com as seguintes três runas inscritas nele:
              </MobileText>
              <MobileText>
                <strong>Runa do Devorador de Magias:</strong> O Herói usando
                esta armadura é imune a todas as magias.
                <br />
                <strong>Runa de Passagem:</strong> O Herói pode se mover através
                de peças de terrenos e outras miniaturas, contanto que não
                termine o movimento sobre elas (isso não significa que ele pode
                ver através delas).
                <br />
                <strong>Runa de Fortitude:</strong> O Herói ganha +4 de vida
                máxima.
              </MobileText>
            </div>

            <div id="artefato-4">
              <HeaderH2>4 - Arco do Espírito Caçador</HeaderH2>
              <MobileText>
                Este arco foi um presente para o Conde Steinhardt dos lordes
                élficos da Floresta das Sombras.
              </MobileText>
              <MobileText>
                Qualquer flecha disparada usando este arco mágico ignora
                qualquer tipo de terreno interposto e cobertura, visto que
                transforma as flechas disparadas em flechasa espectrais.
                Adicionalmente, esse arco sempre considera apenas a armadura
                base do alvo para cálculo do dano.
              </MobileText>
            </div>

            <div id="artefato-5">
              <HeaderH2>5 - Capuz do Executor</HeaderH2>
              <MobileText>
                Recuperado de um navio élfico escuro naufragado, este capuz
                carrega runas malignas brilhantes que enchem o usuário com raiva
                irracional.
              </MobileText>
              <MobileText>
                Um guerreiro usando este capuz amaldiçoado recupera sua vida
                inteira sempre que reduz uma figura a 0 de vida. Adicionalmente,
                sempre que ele reduz uma figura com 0 de vida, ganha +1 de
                Ímpeto até o fim do jogo, cumulativamente. Se o usuário não
                terminar sua aivação em combate, ele recebe um marcador de
                Atordoamento.
              </MobileText>
            </div>

            <div id="artefato-6">
              <HeaderH2>6 - O Olho Onividente de Numas</HeaderH2>
              <MobileText>
                Esta joia foi recuperada das ruínas de Numas, longe ao sul. Ela
                dá a seu portador pesadelos horríveis que predizem seu futuro.
              </MobileText>
              <MobileText>
                O portador do Olho Onividente pode ver todos os modelos na mesa,
                mesmo que não possa traçar linha de visão. Ele pode guiar seus
                companheiros de bando através das ruínas (isso permite que você
                role dois dados de exploração para o portador na fase de
                campanha ao rolar na tabela de Exploração). O portador também
                ganha +2 de Ímpeto para se defender de ataques a distância e em
                lutas fora da sua ativação, pois pode sentir os ataques antes
                que sejam feitos.
              </MobileText>
              <MobileText>
                Todos as figuras com a característica Animal ganham a
                característica Ódio contra o portador.
              </MobileText>
            </div>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default ExplorationEventsPage;
