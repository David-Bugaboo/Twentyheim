import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import WarbandIndex from "../components/WarbandIndex";
import {
  PageContainer,
  ContentSection,
  NavigationSection,
  StyledNavigationButton,
  ContentContainer,
  QuoteBox,
  QuoteAttribution,
  ParchmentText,
  PowerListTitle,
} from "../components/PageComponents";

function RulesPage() {
  const navigate = useNavigate();

  const sections = [
    {
      id: "atributos-e-rolagens",
      label: "Atributos e Rolagens",
      type: "Seção",
    },
    { id: "criacao-de-bando", label: "Criação de Bando", type: "Seção" },
    { id: "sistema-de-combate", label: "Sistema de Combate", type: "Seção" },
    { id: "acoes", label: "Ações", type: "Seção" },
    { id: "acao-de-movimento", label: "Ação de Movimento", type: "Ação" },
    { id: "acao-de-disparada", label: "Ação de Disparada", type: "Ação" },
    { id: "acao-de-luta", label: "Ação de Luta", type: "Ação" },
    { id: "acao-de-tiro", label: "Ação de Tiro", type: "Ação" },
    { id: "acao-de-conjuracao", label: "Ação de Conjuração", type: "Ação" },
    { id: "acao-de-poder", label: "Ação de Poder", type: "Ação" },
    { id: "acao-de-pegar", label: "Ação de Pegar", type: "Ação" },
    { id: "acao-de-usar-item", label: "Ação de Usar Item", type: "Ação" },
    { id: "acoes-especiais", label: "Ações Especiais", type: "Ação" },
    { id: "a-campanha", label: "A Campanha", type: "Seção" },
    { id: "ferimentos-e-morte", label: "Ferimentos e Morte", type: "Campanha" },
    {
      id: "magias-e-poderes-fora-de-jogo",
      label: "Magias e Poderes Fora de Jogo",
      type: "Campanha",
    },
    {
      id: "enviar-lideres-as-ruinas",
      label: "Enviar Líderes às Ruínas",
      type: "Campanha",
    },
    {
      id: "experiencia-e-nivel",
      label: "Experiência e Nível",
      type: "Campanha",
    },
    {
      id: "vendendo-pedra-bruxa",
      label: "Vendendo Pedra-bruxa",
      type: "Campanha",
    },
    { id: "gastar-tesouro", label: "Gastar Tesouro", type: "Campanha" },
  ];

  return (
    <PageContainer>
      <WarbandIndex sections={sections} />
      <Header title="As Regras da Ruína" />

      <ContentSection>
        <ContentContainer>
          <QuoteBox>
            "Já se passaram quase vinte séculos desde que Sigmar Heldenhammer
            purificou nossas terras das hordas monstruosas que ali habitavam.
            Assim foi fundado o maior de todos os reinos dos homens — o Império.
            Hoje nossos pensamentos se voltam mais uma vez para o Senhor dos
            Exércitos, Sigmar, o Pai dos Homens, enquanto o milênio vira e o
            tempo de sua segunda vinda se aproxima. Nos templos por toda nossa
            terra, as multidões se reúnem para conhecer os muitos e maravilhosos
            eventos que certamente se desenrolarão com o retorno do deus vivo ao
            seu povo."
            <QuoteAttribution>
              — O Cronista de Ostermark, registro do ano 1999
            </QuoteAttribution>
          </QuoteBox>

          <ParchmentText sx={{ mt: 4, mb: 3 }}>
            Mordheim não é lugar para os fracos. Suas ruas destroçadas são um
            labirinto de morte onde apenas os mais espertos, mais rápidos ou
            mais afortunados sobrevivem para contar a história. Estas regras não
            são apenas diretrizes de jogo — são os princípios imutáveis que
            governam a existência nesta cidade condenada.
          </ParchmentText>

          <ParchmentText sx={{ mb: 4 }}>
            Cada rolagem de dado é um momento de destino. Cada decisão pode ser
            a diferença entre glória e esquecimento. Aqui, nas sombras de
            edifícios desmoronados e sob o brilho sinistro da Pedra-bruxa, as
            regras da civilização deram lugar às leis mais antigas da guerra e
            da sobrevivência.
          </ParchmentText>

          {/* Seções de Regras - A serem preenchidas */}
          <Box sx={{ mt: 6 }}>
            <PowerListTitle sx={{ mb: 3, fontSize: "1.8rem" }}>
              Índice de Regras
            </PowerListTitle>

            <ParchmentText
              sx={{
                mb: 2,
                p: 3,
                borderLeft: "4px solid #8b7355",
                backgroundColor: "rgba(139, 115, 85, 0.1)",
              }}
            >
              <em style={{ color: "#d4af37" }}>
                "Conhecer as regras é sobreviver. Dominá-las é conquistar."
              </em>
            </ParchmentText>

            {/* Atributos e Rolagens */}
            <Box sx={{ mt: 4, mb: 6 }} id="atributos-e-rolagens">
              <PowerListTitle sx={{ fontSize: "1.8rem", mb: 3 }}>
                Atributos e Rolagens
              </PowerListTitle>

              <ParchmentText sx={{ mb: 3 }}>
                Em Mordheim, o destino é decidido pelo rolar de dados. Cada
                combate, cada disparo, cada magia conjurada - tudo depende de
                rolagens contra números frios e implacáveis. Sobreviver requer
                entender não apenas as regras, mas os próprios ossos que as
                governam.
              </ParchmentText>

              {/* O Dado */}
              <Box
                sx={{
                  mt: 4,
                  mb: 3,
                  p: 3,
                  backgroundColor: "rgba(139, 115, 85, 0.1)",
                  borderLeft: "4px solid #d4af37",
                }}
              >
                <ParchmentText
                  sx={{
                    fontSize: "1.2rem",
                    fontWeight: 600,
                    mb: 2,
                    color: "#d4af37",
                  }}
                >
                  O Dado de Vinte Faces
                </ParchmentText>
                <ParchmentText>
                  Sempre que o jogo especificar uma <strong>rolagem</strong>,
                  você rola um <strong>d20</strong> (dado de 20 lados). Este
                  único dado determina sucesso e falha, vida e morte. Um 20
                  natural é triunfo absoluto. Um 1 natural é desastre
                  catastrófico. Entre eles, toda a gama de possibilidades
                  mortais.
                </ParchmentText>
              </Box>

              {/* Atributos */}
              <Box
                sx={{
                  mt: 4,
                  mb: 3,
                  p: 3,
                  backgroundColor: "rgba(139, 115, 85, 0.1)",
                  borderLeft: "4px solid #d4af37",
                }}
              >
                <ParchmentText
                  sx={{
                    fontSize: "1.2rem",
                    fontWeight: 600,
                    mb: 2,
                    color: "#d4af37",
                  }}
                >
                  Os Atributos
                </ParchmentText>
                <ParchmentText sx={{ mb: 2 }}>
                  Cada guerreiro em Mordheim é definido por seus{" "}
                  <strong>atributos</strong> - números que separam veteranos de
                  cadáveres, heróis de tolos:
                </ParchmentText>
                <ParchmentText sx={{ ml: 3, mb: 1 }}>
                  • <strong>Agilidade:</strong> Quantos centímetros você se move
                  por ação. A diferença entre alcançar cobertura e sangrar no
                  meio da rua.
                </ParchmentText>
                <ParchmentText sx={{ ml: 3, mb: 1 }}>
                  • <strong>Ímpeto:</strong> Modificador adicionado a rolagens
                  de combate corpo a corpo. Separa veteranos de recrutas.
                </ParchmentText>
                <ParchmentText sx={{ ml: 3, mb: 1 }}>
                  • <strong>Precisão:</strong> Modificador adicionado a rolagens
                  de ataque a distância. Mata antes de ser alcançado.
                </ParchmentText>
                <ParchmentText sx={{ ml: 3, mb: 1 }}>
                  • <strong>Armadura:</strong> Número alvo que ataques devem
                  superar para causar dano. Quanto maior, mais difícil perfurar
                  sua pele.
                </ParchmentText>
                <ParchmentText sx={{ ml: 3, mb: 1 }}>
                  • <strong>Vontade:</strong> Modificador para resistir terror,
                  magia, e a tentação de fugir. Mente forte em corpo que pode
                  não durar.
                </ParchmentText>
                <ParchmentText sx={{ ml: 3, mb: 1 }}>
                  • <strong>Vigor:</strong> Quanto dano você aguenta antes de
                  cair. Quando chega a zero, você tomba.
                </ParchmentText>
              </Box>

              {/* Como Rolar */}
              <Box
                sx={{
                  mt: 4,
                  mb: 3,
                  p: 3,
                  backgroundColor: "rgba(139, 115, 85, 0.1)",
                  borderLeft: "4px solid #d4af37",
                }}
              >
                <ParchmentText
                  sx={{
                    fontSize: "1.2rem",
                    fontWeight: 600,
                    mb: 2,
                    color: "#d4af37",
                  }}
                >
                  Rolagens de Atributo
                </ParchmentText>
                <ParchmentText sx={{ mb: 2 }}>
                  Quando o jogo pedir para rolar um atributo, o processo é
                  simples mas mortal:
                </ParchmentText>
                <ParchmentText
                  sx={{
                    mb: 2,
                    ml: 2,
                    fontFamily: '"Courier New", monospace',
                    color: "#d4af37",
                    fontSize: "1.1rem",
                  }}
                >
                  <strong>Rolagem = d20 + Atributo</strong>
                </ParchmentText>
                <ParchmentText sx={{ mb: 2 }}>
                  Em geral, essas rolagens são feitas contra uma{" "}
                  <strong>Classe de Dificuldade (CD)</strong>. Se sua rolagem{" "}
                  <strong>superar ou igualar</strong> esse número, você tem
                  sucesso. Se ficar abaixo, você falha.
                </ParchmentText>
                <ParchmentText sx={{ fontStyle: "italic", color: "#c4a870" }}>
                  <strong>Exemplo:</strong> Um guerreiro com Vontade 12 precisa
                  resistir a característica Aterrorizante (CD 14). Ele rola um 5
                  no 1d20. Sua rolagem total é 5 + 12 = 17. Como 17 supera 14,
                  ele resiste ao terror e completa sua carga. Se tivesse rolado
                  1, sua rolagem seria 1 + 12 = 13 - insuficiente. Ele fugiria
                  em pânico.
                </ParchmentText>
              </Box>

              {/* Rolagens Opostas */}
              <Box
                sx={{
                  mt: 4,
                  mb: 3,
                  p: 3,
                  backgroundColor: "rgba(139, 115, 85, 0.1)",
                  borderLeft: "4px solid #d4af37",
                }}
              >
                <ParchmentText
                  sx={{
                    fontSize: "1.2rem",
                    fontWeight: 600,
                    mb: 2,
                    color: "#d4af37",
                  }}
                >
                  Rolagem Contestada
                </ParchmentText>
                <ParchmentText>
                  Algumas situações colocam guerreiros diretamente uns contra os
                  outros. Em <strong>rolagens contestadas</strong>, ambos os
                  lados rolam 1d20 + atributo relevante. O resultado maior
                  vence. Em caso de empate, nada acontece - golpes bloqueados,
                  esforços anulados, destino indeciso.
                </ParchmentText>
              </Box>

              <ParchmentText
                sx={{
                  mt: 3,
                  p: 3,
                  border: "2px solid rgba(139, 115, 85, 0.4)",
                  borderRadius: "4px",
                  backgroundColor: "rgba(28, 24, 18, 0.4)",
                  fontStyle: "italic",
                  textAlign: "center",
                  color: "#c4a870",
                }}
              >
                "Os dados não mentem. Role alto ou morra."
                <br />
                <br />— Gunther, o Veterano
              </ParchmentText>
            </Box>

            {/* Criação de Bando */}
            <Box sx={{ mt: 4, mb: 6 }} id="criacao-de-bando">
              <PowerListTitle sx={{ fontSize: "1.8rem", mb: 3 }}>
                Criação de Bando
              </PowerListTitle>

              <ParchmentText sx={{ mb: 3 }}>
                Então você deseja liderar almas condenadas pelas ruínas de
                Mordheim? Que admirável... ou que tolo. Cada capitão, antes de
                sua primeira expedição às ruas malditas, recebe uma bolsa de{" "}
                <strong>500 coroas de ouro</strong> — sangue-dinheiro suficiente
                para comprar esperança, armar desespero, e talvez, apenas
                talvez, sobreviver à primeira noite. Use-as sabiamente, pois em
                Mordheim, cada coroa pode ser a diferença entre glória e uma
                vala comum.
              </ParchmentText>

              {/* O Líder */}
              <Box
                sx={{
                  mt: 4,
                  mb: 3,
                  p: 3,
                  backgroundColor: "rgba(139, 115, 85, 0.1)",
                  borderLeft: "4px solid #d4af37",
                }}
              >
                <PowerListTitle sx={{ fontSize: "1.3rem", mb: 2, mt: 0 }}>
                  1. O Líder — Seu Fardo e Sua Maldição
                </PowerListTitle>

                <ParchmentText sx={{ mb: 2 }}>
                  Todo bando precisa de um líder — o tolo que aceita o peso de
                  guiar outros para a morte. Primeiro, escolha seu{" "}
                  <Box
                    component="span"
                    onClick={() => navigate("/warbands")}
                    sx={{
                      color: "#d4af37",
                      cursor: "pointer",
                      textDecoration: "underline",
                      "&:hover": { color: "#f4cf57" },
                    }}
                  >
                    bando na página de Bandos
                  </Box>
                  . Seu herói vem automaticamente — gratuito, mas nunca de
                  graça. Ele será o primeiro a enfrentar o perigo, e
                  frequentemente o último a cair.
                </ParchmentText>

                <ParchmentText sx={{ mb: 2 }}>
                  <strong>Equipamento do Herói:</strong> Todo herói tem{" "}
                  <strong>5 espaços de equipamento</strong>. Escolha suas
                  ferramentas de sobrevivência da lista de equipamentos
                  disponíveis na ficha do herói. Uma lâmina afiada? Armadura
                  pesada? Uma poção para enganar a morte? Decida o que vale
                  mais: proteção ou mobilidade, ataque ou defesa. Lembre-se: em
                  Mordheim, a ferramenta errada no momento errado é apenas mais
                  peso morto.
                </ParchmentText>

                <ParchmentText>
                  <strong>Magias e Poderes:</strong> Se seu herói tem o dom (ou
                  a maldição) da magia ou poderes especiais, consulte sua ficha.
                  Ela dirá quais listas estão disponíveis e quantos feitiços ou
                  habilidades você pode conhecer. Escolha com cuidado — em
                  Mordheim, conhecimento é poder, mas também alvo.
                </ParchmentText>
              </Box>

              {/* O Campeão */}
              <Box
                sx={{
                  mt: 4,
                  mb: 3,
                  p: 3,
                  backgroundColor: "rgba(139, 115, 85, 0.1)",
                  borderLeft: "4px solid #c4a870",
                }}
              >
                <PowerListTitle sx={{ fontSize: "1.3rem", mb: 2, mt: 0 }}>
                  2. O Campeão — Luxo ou Necessidade?
                </PowerListTitle>

                <ParchmentText sx={{ mb: 2 }}>
                  Tecnicamente opcional. Praticamente essencial. Um campeão é
                  seu braço direito, seu segundo em comando, aquele que grita
                  ordens quando você está ocupado demais sangrando.{" "}
                  <strong>Altamente recomendado</strong>, pois um campeão não
                  apenas aumenta drasticamente o poder do seu bando, mas também
                  pode <strong>ativar soldados junto consigo</strong> —
                  transformando massa disforme em força de combate coordenada.
                </ParchmentText>

                <ParchmentText sx={{ mb: 2 }}>
                  Gaste as coroas indicadas na ficha do campeão. Ele vem com{" "}
                  <strong>4 espaços de equipamento</strong> — um a menos que seu
                  herói, mas ainda assim o suficiente para transformá-lo em uma
                  máquina de matar. Escolha seu equipamento sabiamente.
                </ParchmentText>

                <ParchmentText>
                  Assim como o herói, se o campeão tiver acesso a poderes ou
                  magias, consulte sua ficha para saber quais listas e
                  quantidades estão disponíveis. Nem todo campeão é um místico —
                  alguns preferem resolver problemas com aço ao invés de sílabas
                  arcanas.
                </ParchmentText>
              </Box>

              {/* Os Soldados */}
              <Box
                sx={{
                  mt: 4,
                  mb: 3,
                  p: 3,
                  backgroundColor: "rgba(139, 115, 85, 0.1)",
                  borderLeft: "4px solid #8b4513",
                }}
              >
                <PowerListTitle sx={{ fontSize: "1.3rem", mb: 2, mt: 0 }}>
                  3. Os Soldados — Carne para o Moedor
                </PowerListTitle>

                <ParchmentText sx={{ mb: 2 }}>
                  Por último, mas não menos descartável, vêm os soldados. A
                  manteiga no pão do seu bando. Alguns são veteranos
                  endurecidos, outros mal sabem segurar uma espada sem cortar os
                  próprios dedos. Você pode recrutar até{" "}
                  <strong>8 soldados</strong>, gastando suas coroas restantes.
                </ParchmentText>

                <ParchmentText sx={{ mb: 2 }}>
                  <strong>Limite Crítico:</strong> Desses 8, apenas{" "}
                  <strong>4 podem ser soldados especializados</strong> (aqueles
                  com treinamento especial, equipamento melhor, ou habilidades
                  únicas). Os outros quatro devem ser soldados básicos — a ralé,
                  a massa, aqueles cujos nomes você provavelmente nem se
                  lembrará quando caírem.
                </ParchmentText>

                <ParchmentText>
                  Cada soldado custa as coroas listadas em sua ficha e vem com
                  seu equipamento padrão. Continue comprando até seu tesouro
                  secar ou seus números estarem completos. Quando o ouro acabar
                  ou os oito soldados estiverem recrutados,{" "}
                  <strong>seu bando está formado</strong>.
                </ParchmentText>
              </Box>

              {/* Pronto para Mordheim */}
              <Box
                sx={{
                  mt: 4,
                  p: 3,
                  backgroundColor: "rgba(20, 18, 14, 0.5)",
                  border: "2px solid #d4af37",
                  borderRadius: "4px",
                }}
              >
                <ParchmentText
                  sx={{ fontStyle: "italic", textAlign: "center" }}
                >
                  <strong style={{ color: "#d4af37", fontSize: "1.2rem" }}>
                    Pronto para as Ruínas
                  </strong>
                  <br />
                  <br />
                  Com seu tesouro gasto e seu bando reunido, você está pronto
                  para encarar Mordheim. Que Sigmar tenha piedade — ou que
                  Ranald lhe conceda sorte. Nas ruas destroçadas que aguardam,
                  você precisará de ambos.
                </ParchmentText>
              </Box>

              {/* Conto do Veterano */}
              <Box
                sx={{
                  mt: 5,
                  p: 4,
                  backgroundColor: "rgba(75, 0, 0, 0.2)",
                  border: "3px double #8b4513",
                  borderRadius: "4px",
                }}
              >
                <PowerListTitle
                  sx={{
                    fontSize: "1.5rem",
                    mb: 3,
                    mt: 0,
                    color: "#d4af37",
                    textAlign: "center",
                  }}
                >
                  Conto do Veterano: A Primeira Leva de Klaus
                </PowerListTitle>

                <ParchmentText sx={{ fontStyle: "italic", mb: 2 }}>
                  Klaus "Mão-de-Ferro" despejou as 500 coroas sobre a mesa
                  esfarrapada da taverna. Mercenário veterano, ele sabia o valor
                  de cada moeda — especialmente quando a morte esperava nas
                  ruínas.
                </ParchmentText>

                <ParchmentText sx={{ fontStyle: "italic", mb: 2 }}>
                  "Mercenários," ele murmurou, escolhendo seu bando. Como
                  capitão, ele era a pedra angular do seu Bando — sem custo em
                  coroas, mas com todo o peso da liderança. Cinco espaços de
                  equipamento. Espada e escudo, armadura leve, capacete — tudo
                  gratuito, parte do arsenal disponível. Duas garrafas de vinho
                  barato para preencher os espaços restantes — não eram
                  equipamento, mas acalmavam os nervos.
                </ParchmentText>

                <ParchmentText sx={{ fontStyle: "italic", mb: 2 }}>
                  O campeão custou-lhe caro — 100 coroas por um sergento
                  veterano chamado Gottfried. Quatro espaços de equipamento.
                  Machado de duas mãos e armadura leve — também gratuitos,
                  escolhidos da lista disponível. "Ele lidera até três assim
                  como eu," Klaus pensou. "Vale cada maldita coroa."
                </ParchmentText>

                <ParchmentText sx={{ fontStyle: "italic", mb: 2 }}>
                  Restavam 400 coroas. Primeiro, dois atiradores (120 coroas
                  total) e dois besteiros (150 coroas total) — quatro soldados
                  especializados, o limite permitido. Depois, um armeiro (75
                  coroas) — buchas de canhão. Por fim, três recrutas —
                  gratuitos, como permite o bando de mercenários. Oito soldados.
                  O máximo alcançado.
                </ParchmentText>

                <ParchmentText sx={{ fontStyle: "italic" }}>
                  Klaus olhou para seu bando reunido na taverna sombria. Dez
                  homens no total, com 55 coroas restantes no cofre — mal
                  suficiente para uma noite de bebida, mas o suficiente para
                  emergências. "Amanhã," ele disse, "entramos em Mordheim."
                  Ninguém respondeu. Os veteranos sabiam a verdade. Os
                  sangues-jovens ainda tinham esperança. Mas as 500 coroas
                  iniciais tinham sido gastas com sabedoria. O bando estava
                  formado. A morte os aguardava.
                </ParchmentText>
              </Box>
            </Box>

            <Box sx={{ mt: 4, mb: 6 }} id="sistema-de-combate">
              <PowerListTitle sx={{ fontSize: "1.8rem", mb: 3 }}>
                Sistema de Combate
              </PowerListTitle>

              <ParchmentText sx={{ mb: 4 }}>
                Nas ruínas de Mordheim, a morte não espera ordens. Ela vem
                quando vem — rápida para alguns, cruel para outros. Mas até o
                caos precisa de estrutura, e assim temos as regras do combate.
                Quem age primeiro frequentemente vive para contar a história.
                Quem hesita... bem, os mortos não contam histórias.
              </ParchmentText>

              {/* Ordem do Turno */}
              <Box
                sx={{
                  mt: 4,
                  mb: 3,
                  p: 3,
                  backgroundColor: "rgba(139, 115, 85, 0.1)",
                  borderLeft: "4px solid #d4af37",
                }}
              >
                <PowerListTitle sx={{ fontSize: "1.3rem", mb: 2, mt: 0 }}>
                  Ordem do Turno — Quem Vive, Quem Morre
                </PowerListTitle>

                <ParchmentText sx={{ mb: 2 }}>
                  No início de cada jogo, antes que a primeira gota de sangue
                  seja derramada, cada jogador lança um <strong>d20</strong> e
                  anota o resultado. Esta é a{" "}
                  <strong>rolagem de iniciativa</strong> — um número frio que
                  determina se você será caçador ou presa.
                </ParchmentText>

                <ParchmentText sx={{ mb: 2 }}>
                  Anote seu resultado com cuidado. O jogador com o{" "}
                  <strong>maior resultado</strong> será o primeiro a agir,
                  seguido pelo segundo maior, depois o terceiro, e assim por
                  diante. Esta ordem é absoluta — o destino já lançou os dados.
                </ParchmentText>

                <ParchmentText>
                  Esta ordem se mantém durante todo o turno, definindo quem move
                  primeiro, quem ataca primeiro, quem talvez sobreviva primeiro.
                </ParchmentText>
              </Box>

              {/* Ativação */}
              <Box
                sx={{
                  mt: 4,
                  mb: 3,
                  p: 3,
                  backgroundColor: "rgba(139, 115, 85, 0.1)",
                  borderLeft: "4px solid #c4a870",
                }}
              >
                <PowerListTitle sx={{ fontSize: "1.3rem", mb: 2, mt: 0 }}>
                  Ativação — O Ritual da Morte
                </PowerListTitle>

                <ParchmentText sx={{ mb: 2 }}>
                  Os jogadores <strong>ativam uma miniatura</strong> por vez,
                  seguindo rigorosamente a ordem de iniciativa. Mas liderança
                  tem seus privilégios — e suas responsabilidades.
                </ParchmentText>

                <ParchmentText sx={{ mb: 2 }}>
                  <strong>Ativando com o Herói:</strong> Quando você ativa seu
                  herói, ele não precisa agir sozinho. Você pode ativar até{" "}
                  <strong>3 soldados</strong> que estejam a até{" "}
                  <strong>8 cm</strong> dele. Estes soldados agem sob seu
                  comando direto, tornando-se extensões da vontade do líder.
                </ParchmentText>

                <ParchmentText sx={{ mb: 2 }}>
                  <strong>Ativando com o Campeão:</strong> Quando você ativa seu
                  campeão, ele pode liderar com menor alcance — até{" "}
                  <strong>2 soldados</strong> a até <strong>8 cm</strong> dele.
                  Menos homens, mas ainda uma força letal quando bem coordenada.
                </ParchmentText>

                <ParchmentText sx={{ mb: 2 }}>
                  <strong>Ordem de Ativação em Grupo:</strong> Quando múltiplas
                  figuras são ativadas juntas, elas agem em sequência. Cada
                  figura completa <strong>toda sua ativação</strong> —
                  movimento, ataques, ações especiais — antes de passar para a
                  próxima. O líder age, depois o primeiro soldado, depois o
                  segundo, e assim por diante. Uma dança mortal em passos
                  coordenados.
                </ParchmentText>

                <ParchmentText>
                  Quando o jogador terminar sua ativação, incluindo todos os
                  soldados ativados junto aos seus superiores, o{" "}
                  <strong>próximo jogador na ordem de iniciativa</strong> ativa,
                  seguindo as mesmas regras. E assim o ciclo continua.
                </ParchmentText>
              </Box>

              {/* Fim do Turno */}
              <Box
                sx={{
                  mt: 4,
                  mb: 3,
                  p: 3,
                  backgroundColor: "rgba(139, 115, 85, 0.1)",
                  borderLeft: "4px solid #8b4513",
                }}
              >
                <PowerListTitle sx={{ fontSize: "1.3rem", mb: 2, mt: 0 }}>
                  Fim do Turno — E Recomeça
                </PowerListTitle>

                <ParchmentText sx={{ mb: 2 }}>
                  Quando todos os jogadores tiverem ativado suas figuras, as{" "}
                  <strong>criaturas neutras</strong> (se houver) são ativadas —
                  bestas, demônios menores, ou outras aberrações que não servem
                  a nenhum mestre mortal. Elas agem segundo suas próprias
                  regras, seus próprios instintos famintos.
                </ParchmentText>

                <ParchmentText sx={{ mb: 2 }}>
                  Então, o turno acaba. Os mortos são contados. Os feridos
                  gemem. E o ciclo recomeça.
                </ParchmentText>

                <ParchmentText>
                  No <strong>próximo turno</strong>, a iniciativa é{" "}
                  <strong>rolada novamente</strong>. Nada é garantido em
                  Mordheim — nem mesmo a ordem em que você morre. Um novo d20,
                  uma nova ordem, uma nova chance de sobreviver... ou não.
                </ParchmentText>
              </Box>

              {/* Box de Resumo */}
              <Box
                sx={{
                  mt: 4,
                  p: 3,
                  backgroundColor: "rgba(20, 18, 14, 0.5)",
                  border: "2px solid #d4af37",
                  borderRadius: "4px",
                }}
              >
                <PowerListTitle
                  sx={{ fontSize: "1.1rem", mb: 2, mt: 0, color: "#d4af37" }}
                >
                  Resumo do Ciclo de Turno
                </PowerListTitle>
                <ParchmentText sx={{ mb: 1 }}>
                  1. <strong>Início do Turno:</strong> Role iniciativa (d20)
                </ParchmentText>
                <ParchmentText sx={{ mb: 1 }}>
                  2. <strong>Ativação em Ordem:</strong> Jogadores ativam na
                  ordem de iniciativa
                </ParchmentText>
                <ParchmentText sx={{ mb: 1 }}>
                  3. <strong>Herói:</strong> Pode ativar até 3 soldados a 8 cm
                </ParchmentText>
                <ParchmentText sx={{ mb: 1 }}>
                  4. <strong>Campeão:</strong> Pode ativar até 2 soldados a 8 cm
                </ParchmentText>
                <ParchmentText sx={{ mb: 1 }}>
                  5. <strong>Criaturas Neutras:</strong> Ativam após todos os
                  jogadores
                </ParchmentText>
                <ParchmentText>
                  6. <strong>Fim do Turno:</strong> Reinicie o ciclo (role
                  iniciativa novamente)
                </ParchmentText>
              </Box>
            </Box>

            <Box sx={{ mt: 4, mb: 6 }} id="acoes">
              <PowerListTitle sx={{ fontSize: "1.8rem", mb: 3 }}>
                Ações — O Que Separa Vivos dos Mortos
              </PowerListTitle>

              <ParchmentText sx={{ mb: 3 }}>
                Em Mordheim, cada momento conta. Cada decisão pode ser sua
                última. Quando uma figura é ativada, ela tem um breve lampejo de
                tempo para agir — para mover, atacar, conjurar, ou simplesmente
                sobreviver mais um instante. Este é o momento em que heróis são
                feitos... ou enterrados.
              </ParchmentText>

              {/* Regra Geral de Ações */}
              <Box
                sx={{
                  mt: 4,
                  mb: 4,
                  p: 3,
                  backgroundColor: "rgba(139, 115, 85, 0.1)",
                  borderLeft: "4px solid #d4af37",
                }}
              >
                <PowerListTitle sx={{ fontSize: "1.3rem", mb: 2, mt: 0 }}>
                  A Regra das Duas Ações
                </PowerListTitle>

                <ParchmentText sx={{ mb: 2 }}>
                  Cada figura, exceto em situações especiais ditadas pelo
                  destino ou pela magia, pode tomar <strong>duas ações</strong>{" "}
                  durante sua ativação. Duas escolhas. Duas chances de fazer a
                  diferença entre vitória e morte.
                </ParchmentText>

                <ParchmentText sx={{ mb: 2 }}>
                  <strong>A Primeira Ação:</strong> Normalmente, uma dessas
                  ações <strong>deve ser uma Ação de Movimento</strong>. Afinal,
                  ficar parado em Mordheim é apenas outra forma de suicídio.
                  Movimento é vida. Imobilidade é morte.
                </ParchmentText>

                <ParchmentText sx={{ mb: 2 }}>
                  <strong>A Segunda Ação:</strong> Pode ser qualquer tipo de
                  ação — atacar, atirar, conjurar, pegar tesouros amaldiçoados,
                  ou até se mover novamente se o desespero assim exigir.
                </ParchmentText>

                <ParchmentText>
                  <strong>Exceção — Ações Especiais como Movimento:</strong>{" "}
                  Alguns efeitos especificam que podem ser usados como "ação de
                  movimento". Nestes casos raros, o jogador pode tomar essa ação
                  especial no lugar do movimento obrigatório, seguida de
                  qualquer outra ação normal. Uma brecha nas regras, uma
                  oportunidade para os espertos.
                </ParchmentText>
              </Box>

              {/* Tipos de Ações */}
              <Box sx={{ mt: 5, mb: 3 }}>
                <PowerListTitle sx={{ fontSize: "1.5rem", mb: 3 }}>
                  Tipos de Ação
                </PowerListTitle>

                <ParchmentText
                  sx={{ mb: 4, fontStyle: "italic", color: "#c4a870" }}
                >
                  "Cada ação é uma aposta com a morte. Escolha sabiamente."
                </ParchmentText>

                {/* Ação de Movimento */}
                <Box sx={{ mb: 4 }} id="acao-de-movimento">
                  <PowerListTitle sx={{ fontSize: "1.2rem", mb: 2 }}>
                    Ação de Movimento
                  </PowerListTitle>

                  <ParchmentText sx={{ mb: 3 }}>
                    A figura pode se mover das seguintes formas durante seu
                    turno:
                  </ParchmentText>

                  {/* Movimento */}
                  <Box
                    sx={{
                      mt: 3,
                      mb: 3,
                      pl: 2,
                      borderLeft: "2px solid #8b7355",
                    }}
                  >
                    <ParchmentText sx={{ mb: 1 }}>
                      <strong>Movimento:</strong> A miniatura pode se mover uma
                      distância de até seu{" "}
                      <strong>atributo de Movimento em centímetros</strong>.
                      Durante este movimento, ela pode se virar quanto quiser,
                      fazer qualquer tipo de curva, e atravessa automaticamente
                      qualquer obstáculo com menos de 1 cm de altura. Contudo,
                      esse movimento deve ser <strong>horizontal</strong>.
                    </ParchmentText>
                  </Box>

                  {/* Escalar */}
                  <Box
                    sx={{
                      mt: 3,
                      mb: 3,
                      pl: 2,
                      borderLeft: "2px solid #8b7355",
                    }}
                  >
                    <ParchmentText sx={{ mb: 1 }}>
                      <strong>Escalar:</strong> Uma miniatura pode escalar
                      superfícies verticais como muros e paredes. Para tal, ela
                      se move a uma distância de até 1 cm do que está escalando,
                      ao longo de seu comprimento vertical, gastando{" "}
                      <strong>
                        2 cm de movimento para cada 1 cm de escalada
                      </strong>
                      . Uma figura que termine seu movimento escalando cai no
                      chão ao final do movimento, seguindo as regras normais de
                      queda. Uma figura escalando pode declarar uma carga contra
                      uma figura que esteja na borda de uma plataforma ou
                      telhado plano conectado ao que esteja escalando, contanto
                      que consiga ficar a 1 cm daquela figura, sem objetos entre
                      ambos. Ao resolver a luta subsequente, a figura escalando
                      então cai, sem opção de se manter em combate.
                    </ParchmentText>
                    <ParchmentText
                      sx={{
                        fontStyle: "italic",
                        fontSize: "0.95rem",
                        color: "#a89968",
                      }}
                    >
                      Gregor agarrou as pedras irregulares da torre em ruínas,
                      puxando-se para cima com força bruta. Gastou 6 cm de
                      movimento para escalar apenas 3 cm de muro — cada
                      centímetro vertical uma batalha contra a gravidade. No
                      topo, vislumbrou o arqueiro inimigo. Sem pensar, lançou-se
                      sobre ele numa carga desesperada. A luta foi breve,
                      violenta. Depois, Gregor caiu, 6 cm direto para o chão
                      pedregoso. A queda foi dolorida, mas valeu a pena.
                    </ParchmentText>
                  </Box>

                  {/* Pular */}
                  <Box
                    sx={{
                      mt: 3,
                      mb: 3,
                      pl: 2,
                      borderLeft: "2px solid #8b7355",
                    }}
                  >
                    <ParchmentText sx={{ mb: 1 }}>
                      <strong>Pular:</strong> Uma figura pode declarar um pulo.
                      Ela pode se mover uma distância horizontal, vertical ou
                      ambos de até <strong>11 cm</strong>, mas deve ter se
                      movido normalmente a distância que deseja pular antes de
                      declarar um pulo. Se uma criatura termina seu pulo no ar,
                      ela cai ao final do movimento, seguindo regras de queda.
                    </ParchmentText>
                    <ParchmentText
                      sx={{
                        fontStyle: "italic",
                        fontSize: "0.95rem",
                        color: "#a89968",
                      }}
                    >
                      Klaus correu pelos escombros, ganhando impulso. Oito
                      centímetros de corrida furiosa antes de saltar sobre o
                      abismo de 8 cm entre os edifícios. Por um momento, pairou
                      no ar, suspenso entre vida e morte. Aterrizou do outro
                      lado com um baque, rolando para absorver o impacto. Atrás
                      dele, seus perseguidores hesitaram na beira do prédio
                      anterior.
                    </ParchmentText>
                  </Box>

                  {/* Carga */}
                  <Box
                    sx={{
                      mt: 3,
                      mb: 3,
                      pl: 2,
                      borderLeft: "2px solid #8b7355",
                    }}
                  >
                    <ParchmentText sx={{ mb: 1 }}>
                      <strong>Carga:</strong> Uma figura pode no início do seu
                      movimento declarar uma carga contra uma figura. Ela então
                      se move até que sua base toque a base daquela figura. A
                      figura pode fazer curvas normalmente, mas só pode declarar
                      carga contra uma figura que enxergue no começo da sua
                      ativação.
                    </ParchmentText>
                    <ParchmentText
                      sx={{
                        fontStyle: "italic",
                        fontSize: "0.95rem",
                        color: "#a89968",
                      }}
                    >
                      O inquisidor viu o necromante através da névoa pútrida.
                      "Arrependa-se, sacrilegioso!" rugiu, e suas pernas
                      trovejaram sobre os escombros. Doze centímetros de fúria
                      pura, contornando destroços e cadáveres até que sua base
                      bateu contra a do necromante. O impacto sozinho quase
                      derrubou o herege.
                    </ParchmentText>
                  </Box>

                  {/* Queda */}
                  <Box
                    sx={{
                      mt: 3,
                      mb: 3,
                      pl: 2,
                      borderLeft: "2px solid #8b7355",
                    }}
                  >
                    <ParchmentText sx={{ mb: 1 }}>
                      <strong>Queda:</strong> Uma figura pode cair até{" "}
                      <strong>8 cm sem tomar nenhum tipo de dano</strong>. Se
                      cair mais que isso, tome de dano{" "}
                      <strong>metade da distância caída</strong>.
                    </ParchmentText>
                    <ParchmentText
                      sx={{
                        fontStyle: "italic",
                        fontSize: "0.95rem",
                        color: "#a89968",
                      }}
                    >
                      O besteiro cambaleou na beirada do telhado e caiu. Doze
                      centímetros de queda livre. Bateu no chão com um estalo
                      horrível — 6 pontos de dano (12/2). Seus ossos quebraram
                      como gravetos secos. Mas a adrenalina o manteve lutando.
                    </ParchmentText>
                  </Box>

                  {/* Terreno Acidentado */}
                  <Box
                    sx={{
                      mt: 3,
                      mb: 3,
                      pl: 2,
                      borderLeft: "2px solid #8b7355",
                    }}
                  >
                    <ParchmentText sx={{ mb: 1 }}>
                      <strong>Terreno Acidentado:</strong> Criatura gasta{" "}
                      <strong>2 cm de movimento para cada 1 cm</strong> que se
                      move em terreno acidentado. Criaturas montadas além disso
                      rolam na tabela de "Opa garoto!".
                    </ParchmentText>
                    <ParchmentText
                      sx={{
                        fontStyle: "italic",
                        fontSize: "0.95rem",
                        color: "#a89968",
                      }}
                    >
                      O soldado mergulhou nos escombros — pedras soltas, vigas
                      quebradas, corpos em decomposição. Cada passo era uma
                      armadilha. Seu movimentogan de 16 cm minguou para míseros
                      8 cm através da ruína. Atrás dele, o cavaleiro montado
                      tentou seguir, mas seu cavalo tropeçou nas pedras
                      irregulares.
                    </ParchmentText>
                  </Box>

                  {/* Natação */}
                  <Box
                    sx={{
                      mt: 3,
                      mb: 3,
                      pl: 2,
                      borderLeft: "2px solid #8b7355",
                    }}
                  >
                    <ParchmentText sx={{ mb: 1 }}>
                      <strong>Natação:</strong> Figura deve rolar um teste de
                      Ímpeto (CD 5). Adicione modificadores de natação de acordo
                      com a tabela específica. Se tiver sucesso, pode ativar
                      normalmente, embora tratando a água como terreno
                      acidentado. Se falhar, perde a ativação e toma dano igual
                      ao quanto falhou o teste.
                    </ParchmentText>
                    <ParchmentText
                      sx={{
                        fontStyle: "italic",
                        fontSize: "0.95rem",
                        color: "#a89968",
                      }}
                    >
                      Johann pulou no esgoto fétido. Rolou Ímpeto — resultado 3,
                      falhou por 2. A água podre encheu seus pulmões. Dois
                      pontos de dano enquanto se debatia, incapaz de se mover.
                      Seu corpo afundou nas águas negras, sua ativação
                      desperdiçada.
                    </ParchmentText>
                  </Box>

                  {/* FUJA! */}
                  <Box
                    sx={{
                      mt: 3,
                      mb: 3,
                      pl: 2,
                      borderLeft: "2px solid #8b7355",
                    }}
                  >
                    <ParchmentText sx={{ mb: 1 }}>
                      <strong>FUJA!:</strong> Uma figura pode gastar sua
                      primeira ação do turno para tomar uma ação de fuga
                      desesperada. Ao tomar essa ação, ela se move até{" "}
                      <strong>8 cm</strong>, independente de quaisquer
                      penalidades de movimento e terreno. A ativação da figura
                      então termina imediatamente.
                    </ParchmentText>
                    <ParchmentText
                      sx={{
                        fontStyle: "italic",
                        fontSize: "0.95rem",
                        color: "#a89968",
                      }}
                    >
                      O aprendiz viu o demônio avançar. Terror puro. "FUJA!" sua
                      mente gritou. Ele correu — através de escombros, água
                      podre, fogo, tudo. Oito centímetros de puro desespero,
                      ignorando cada obstáculo. Então parou, ofegante, sem
                      fôlego para mais nada. Sua ativação acabou. Tudo que
                      restava era esperar que o demônio não o alcançasse.
                    </ParchmentText>
                  </Box>

                  {/* Combinando Movimentos */}
                  <Box
                    sx={{
                      mt: 4,
                      p: 3,
                      backgroundColor: "rgba(212, 175, 55, 0.1)",
                      border: "2px solid #d4af37",
                      borderRadius: "4px",
                    }}
                  >
                    <PowerListTitle sx={{ fontSize: "1.1rem", mb: 2, mt: 0 }}>
                      Combinando Movimentos
                    </PowerListTitle>

                    <ParchmentText sx={{ mb: 2 }}>
                      As diferentes formas de movimento podem ser{" "}
                      <strong>combinadas durante a mesma ação</strong>. Uma
                      unidade criativa (ou desesperada) pode declarar uma carga
                      e escalar um muro para chegar ao seu alvo, ou pular um
                      espaço entre duas varandas durante um movimento normal, ou
                      atravessar terreno acidentado enquanto corre para uma
                      carga.
                    </ParchmentText>

                    <ParchmentText
                      sx={{ fontStyle: "italic", color: "#a89968" }}
                    >
                      O skaven farejou a coisa-homem no andar superior.
                      Guinchando baixo, correu 8 cm através dos escombros,
                      depois escalou 3 cm de parede (gastando 6 cm de
                      movimento), e finalmente saltou 5 cm até a varanda onde o
                      humano se escondia. Tudo em uma única ação. A coisa-homem
                      nem teve tempo de gritar. Sim-sim, criatividade é
                      sobrevivência.
                    </ParchmentText>
                  </Box>
                </Box>

                {/* Ação de Disparada */}
                <Box sx={{ mb: 4 }} id="acao-de-disparada">
                  <PowerListTitle sx={{ fontSize: "1.2rem", mb: 2 }}>
                    Ação de Disparada
                  </PowerListTitle>

                  <ParchmentText sx={{ mb: 2 }}>
                    Uma figura pode gastar sua segunda ação do turno para se
                    mover novamente, seguindo as mesmas regras de movimento
                    descritas acima, mas tendo apenas{" "}
                    <strong>metade do seu valor de movimento normal</strong>.
                  </ParchmentText>

                  <ParchmentText
                    sx={{
                      fontStyle: "italic",
                      fontSize: "0.95rem",
                      color: "#a89968",
                      pl: 2,
                      borderLeft: "2px solid #8b7355",
                    }}
                  >
                    O mensageiro correu 16 cm através da praça arruinada. Não
                    era suficiente. Ainda podia ouvir os cultistas atrás dele.
                    Usou sua segunda ação para disparar novamente — mais 8 cm de
                    movimento desesperado. Seus pulmões ardiam, suas pernas
                    tremiam, mas ele estava vivo. Por enquanto.
                  </ParchmentText>
                </Box>

                {/* Ação de Luta */}
                <Box sx={{ mb: 4 }} id="acao-de-luta">
                  <PowerListTitle sx={{ fontSize: "1.2rem", mb: 2 }}>
                    Ação de Luta
                  </PowerListTitle>

                  <ParchmentText sx={{ mb: 2 }}>
                    O momento da verdade. Aço contra aço, força contra força,
                    vida contra morte. Uma figura pode declarar{" "}
                    <strong>
                      luta contra uma figura que esteja em combate
                    </strong>{" "}
                    com ela. Note: uma figura só pode entrar em combate com
                    outra através de uma <strong>ação de carga</strong> ou{" "}
                    <strong>habilidades especiais</strong>.
                  </ParchmentText>

                  {/* A Rolagem */}
                  <Box
                    sx={{
                      mt: 3,
                      mb: 3,
                      pl: 2,
                      borderLeft: "2px solid #8b7355",
                    }}
                  >
                    <PowerListTitle sx={{ fontSize: "1.1rem", mb: 2, mt: 0 }}>
                      A Rolagem de Luta
                    </PowerListTitle>

                    <ParchmentText sx={{ mb: 2 }}>
                      A figura que está usando sua ação de luta rola{" "}
                      <strong>Ímpeto (d20)</strong>, adicionando quaisquer
                      modificadores relevantes vindos de traits, magias, poderes
                      e itens. A outra figura então também rola Ímpeto da mesma
                      forma, com seus modificadores incluídos.
                    </ParchmentText>

                    <ParchmentText sx={{ mb: 2 }}>
                      A figura com a <strong>maior rolagem GANHA A LUTA</strong>{" "}
                      e causa dano. Simples. Brutal. Definitivo.
                    </ParchmentText>

                    <ParchmentText>
                      <strong>Em caso de empate:</strong> Ambas as figuras
                      causam dano uma à outra. Ninguém sai ileso quando aço
                      encontra aço em perfeita simetria mortal.
                    </ParchmentText>
                  </Box>

                  {/* Causando Dano */}
                  <Box
                    sx={{
                      mt: 3,
                      mb: 3,
                      pl: 2,
                      borderLeft: "2px solid #8b7355",
                    }}
                  >
                    <PowerListTitle sx={{ fontSize: "1.1rem", mb: 2, mt: 0 }}>
                      Causando Dano
                    </PowerListTitle>

                    <ParchmentText>
                      Para causar dano, pegue a <strong>rolagem de luta</strong>{" "}
                      da figura que ganhou, adicionando modificadores de dano de
                      armas, magias, poderes, habilidades e itens mágicos. Então{" "}
                      <strong>subtraia esse valor da Armadura</strong> da figura
                      que perdeu a luta. Ela toma esse resultado como dano. Se o
                      resultado for zero ou negativo, nenhum dano é causado — o
                      ataque apenas resvalou no seu alvo, sem maiores efeitos.
                    </ParchmentText>
                  </Box>

                  {/* Após a Luta */}
                  <Box
                    sx={{
                      mt: 3,
                      mb: 3,
                      pl: 2,
                      borderLeft: "2px solid #8b7355",
                    }}
                  >
                    <PowerListTitle sx={{ fontSize: "1.1rem", mb: 2, mt: 0 }}>
                      Após a Luta
                    </PowerListTitle>

                    <ParchmentText>
                      Ao final do combate, a figura que ganhou escolhe:{" "}
                      <strong>continuar em combate</strong> (mantendo as bases
                      tocando) ou{" "}
                      <strong>
                        empurrar a figura perdedora 3 cm para trás
                      </strong>
                      , movendo-a essa distância. Uma figura pode ser empurrada
                      para cair, mas não pode ser empurrada para fora do mapa ou
                      para encostar na base de uma figura inimiga.
                    </ParchmentText>
                  </Box>

                  {/* Exemplo de Combate */}
                  <Box
                    sx={{
                      mt: 4,
                      p: 3,
                      backgroundColor: "rgba(75, 0, 0, 0.15)",
                      border: "2px solid #8b4513",
                      borderRadius: "4px",
                    }}
                  >
                    <PowerListTitle
                      sx={{
                        fontSize: "1.1rem",
                        mb: 2,
                        mt: 0,
                        color: "#d4af37",
                      }}
                    >
                      Exemplo: Mercenário vs Orc
                    </PowerListTitle>

                    <ParchmentText
                      sx={{ fontStyle: "italic", fontSize: "0.95rem", mb: 2 }}
                    >
                      Gottfried havia completado uma carga contra um Orc Boy no
                      turno anterior. Agora, bases tocando, cara a cara com três
                      metros de músculo verde e fedor, ele declara uma ação de
                      luta. Sua Zweihander pesa em suas mãos — pelo menos a
                      espada era confiável. O orc, menos.
                    </ParchmentText>

                    <ParchmentText
                      sx={{ fontStyle: "italic", fontSize: "0.95rem", mb: 2 }}
                    >
                      <strong>Gottfried rola:</strong> d20 = 14, +2 de Ímpeto do
                      machado = <strong>16 total</strong>
                      <br />
                      <strong>O Orc rola:</strong> d20 = 10, +3 de Ímpeto ={" "}
                      <strong>13 total</strong>
                      <br />
                      <em style={{ color: "#a89968" }}>
                        O orc berrou "WAAAGH!" com toda confiança de quem nunca
                        aprendeu matemática. Gottfried sorriu. Tristemente.
                      </em>
                    </ParchmentText>

                    <ParchmentText
                      sx={{ fontStyle: "italic", fontSize: "0.95rem", mb: 2 }}
                    >
                      Gottfried vence! Agora calcula o dano: 16 (sua rolagem) +2
                      (arma de duas mãos) = 18. Subtrai a Armadura do Orc (12):{" "}
                      <strong>6 pontos de dano</strong>. A Zweihander corta
                      fundo na couraça improvisada do pele-verde. Sangue verde
                      jorra — a cor favorita de Gottfried, ultimamente. O orc
                      grita um xingamento gultural.
                    </ParchmentText>

                    <ParchmentText
                      sx={{ fontStyle: "italic", fontSize: "0.95rem" }}
                    >
                      Gottfried escolhe empurrar. O orc é arremessado 3 cm para
                      trás, cambaleando como bêbado. Mas o maldito ainda está de
                      pé. Ainda respira. Orcs são irritantemente difíceis de
                      matar — algo sobre crânios grossos e cérebros pequenos
                      tornando-os resistentes a trauma e ser um maldito cogumelo
                      vivo. A luta não acabou, apenas pausou. Gottfried suspira.
                      "Sempre duas lapadas pra matar vocês hein?"
                    </ParchmentText>
                  </Box>

                  {/* Cair em Cima! */}
                  <Box
                    sx={{
                      mt: 4,
                      mb: 3,
                      p: 3,
                      backgroundColor: "rgba(139, 115, 85, 0.15)",
                      border: "2px solid #d4af37",
                      borderRadius: "4px",
                    }}
                  >
                    <PowerListTitle sx={{ fontSize: "1.3rem", mb: 2, mt: 0 }}>
                      Cair em Cima! — A Vantagem dos Números
                    </PowerListTitle>

                    <ParchmentText sx={{ mb: 3 }}>
                      Em Mordheim, honra é um luxo. Lutar limpo é coisa de
                      tolos. Quando uma figura está em combate com{" "}
                      <strong>mais de uma figura inimiga</strong>, ou tem{" "}
                      <strong>figuras aliadas no mesmo combate</strong>, bônus
                      são aplicados. Porque laminas nunca são demais.
                    </ParchmentText>

                    <Box
                      sx={{
                        mb: 3,
                        p: 2,
                        backgroundColor: "rgba(212, 175, 55, 0.1)",
                        borderRadius: "4px",
                      }}
                    >
                      <ParchmentText sx={{ mb: 2 }}>
                        <strong style={{ color: "#d4af37" }}>
                          Figuras de Suporte (+2):
                        </strong>{" "}
                        Cada figura aliada que também esteja em combate com a
                        figura alvo E não esteja em combate com outra figura
                        concede <strong>+2</strong>. Este bônus é cumulativo,
                        então três figuras de suporte elegíveis concedem +6 de
                        modificador.
                      </ParchmentText>

                      <ParchmentText sx={{ mb: 2 }}>
                        <strong style={{ color: "#d4af37" }}>
                          Cancelamento de Bônus:
                        </strong>{" "}
                        Note que apenas uma figura por combate pode receber
                        modificador de figuras de suporte. Se ambas as figuras
                        são elegíveis para +2, eles se cancelam e ambas lutam
                        com +0. Similarmente, se uma é elegível para +4 e a
                        outra para +2, a primeira luta com +2 e a segunda com
                        +0.
                      </ParchmentText>

                      <ParchmentText>
                        <strong style={{ color: "#d4af37" }}>
                          Limite Máximo:
                        </strong>{" "}
                        Uma figura nunca pode ganhar mais de <strong>+6</strong>{" "}
                        de figuras de suporte. Mesmo cercada por vinte aliados,
                        apenas três podem efetivamente ajudar no combate — muito
                        mais que isso e todos só atrapalham uns aos outros.
                      </ParchmentText>
                    </Box>

                    {/* Exemplo de Supporting Figures */}
                    <Box
                      sx={{
                        mt: 3,
                        p: 3,
                        backgroundColor: "rgba(75, 0, 0, 0.15)",
                        border: "2px solid #8b4513",
                        borderRadius: "4px",
                      }}
                    >
                      <ParchmentText
                        sx={{ fontStyle: "italic", fontSize: "0.95rem", mb: 2 }}
                      >
                        Três mercenários cercam um único Orc Nob. Klaus ataca,
                        enquanto seus dois companheiros também estão em combate
                        com o pele-verde (mas não lutando com outras figuras).
                      </ParchmentText>

                      <ParchmentText
                        sx={{ fontStyle: "italic", fontSize: "0.95rem", mb: 2 }}
                      >
                        <strong>Klaus recebe +4</strong> (dois aliados × +2
                        cada).
                        <br />
                        <strong>O Orc recebe +0</strong> (sem aliados).
                        <br />
                        Klaus rola d20 = 8, +3 de Ímpeto, +4 de suporte ={" "}
                        <strong>15</strong>
                        <br />
                        Orc rola d20 = 12, +3 de Ímpeto = <strong>15</strong>
                      </ParchmentText>

                      <ParchmentText
                        sx={{ fontStyle: "italic", fontSize: "0.95rem" }}
                      >
                        Empate — 15 contra 15. Ambos se chocam, aço contra aço.
                        Ambos calculam dano. Klaus: 15 +2 (Arma de duas mãos) =
                        17 - 12 (Armadura Pesada) ={" "}
                        <strong>5 de dano no orc</strong>. O Orc: 15 (Arma de
                        Mão) = 15 - 11 (Armadura Leve) ={" "}
                        <strong>4 de dano em Klaus</strong>. O orc rosna,
                        sangrando. Klaus cospe sangue, também sangrando. Cercado
                        mas não dominado, o pele-verde sorri com presas
                        ensanguentadas. Klaus murmura para seus homens,
                        segurando as costelas: "Próxima vez, um de vocês também
                        ataca. Três espadas são um cabra desse a menos... e
                        minhas costelas agradecem.". Apesar de ter repreendido
                        seus homens, no fundo ele sabe que sem o suporte deles,
                        o Orc teria machucado mais que suas costelas. Bem mais.
                      </ParchmentText>
                    </Box>
                  </Box>
                </Box>

                {/* Ação de Tiro */}
                <Box sx={{ mb: 4 }} id="acao-de-tiro">
                  <PowerListTitle sx={{ fontSize: "1.2rem", mb: 2 }}>
                    Ação de Tiro
                  </PowerListTitle>

                  <ParchmentText sx={{ mb: 2 }}>
                    A covardia tem seu lugar — especialmente quando esse lugar é
                    fora do alcance de machados orcs. A figura que usa a ação de
                    tiro seleciona uma de suas{" "}
                    <strong>armas à distância</strong>, e então seleciona uma
                    figura dentro do <strong>alcance daquela arma</strong> que
                    ela consiga enxergar.
                  </ParchmentText>

                  {/* A Rolagem de Tiro */}
                  <Box
                    sx={{
                      mt: 3,
                      mb: 3,
                      pl: 2,
                      borderLeft: "2px solid #8b7355",
                    }}
                  >
                    <PowerListTitle sx={{ fontSize: "1.1rem", mb: 2, mt: 0 }}>
                      A Rolagem de Tiro
                    </PowerListTitle>

                    <ParchmentText sx={{ mb: 2 }}>
                      A figura atiradora rola <strong>Precisão (d20)</strong>,
                      adicionando quaisquer modificadores advindos de feitiços,
                      poderes, itens ou traits. A figura alvo então rola{" "}
                      <strong>Ímpeto (d20)</strong>, adicionando quaisquer
                      modificadores relevantes — incluindo os da tabela de
                      defesa contra tiro abaixo.
                    </ParchmentText>

                    <ParchmentText sx={{ mb: 2 }}>
                      Se a rolagem de Precisão for <strong>maior</strong> que a
                      de Ímpeto do alvo, causa dano seguindo as mesmas regras do
                      combate corpo a corpo. Em caso de <strong>empate</strong>{" "}
                      ou caso a rolagem de Ímpeto seja maior,{" "}
                      <strong>nenhum dano é causado</strong> — a flecha erra, o
                      virote desvia, a bala se perde nas sombras.
                    </ParchmentText>
                  </Box>

                  {/* Tabela de Modificadores */}
                  <Box
                    sx={{
                      mt: 4,
                      mb: 3,
                      p: 3,
                      backgroundColor: "rgba(139, 115, 85, 0.15)",
                      border: "2px solid #8b7355",
                      borderRadius: "4px",
                    }}
                  >
                    <PowerListTitle sx={{ fontSize: "1.1rem", mb: 3, mt: 0 }}>
                      Tabela de Modificadores de Defesa Contra Tiro
                    </PowerListTitle>

                    <Box sx={{ mb: 2 }}>
                      <ParchmentText sx={{ mb: 1 }}>
                        <strong style={{ color: "#d4af37" }}>
                          Terreno Intermediário (+1):
                        </strong>{" "}
                        Cada peça de terreno entre o atirador e o alvo concede
                        +1. Cumulativo — três peças de terreno concedem +3. Note
                        que se o alvo está em contato com uma peça de terreno,
                        ela conta como cobertura ao invés de terreno
                        intermediário. Se o atirador está em contato com
                        terreno, não conta como intermediário (mas pode bloquear
                        linha de visão). Outras figuras contam como terreno
                        intermediário.
                      </ParchmentText>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <ParchmentText sx={{ mb: 1 }}>
                        <strong style={{ color: "#d4af37" }}>
                          Cobertura Leve (+2):
                        </strong>{" "}
                        O alvo está em contato com cobertura sólida (rochas,
                        muros, madeira grossa, outras figuras) que obscurece até
                        metade de seu corpo, ou com cobertura leve (arbustos,
                        vegetação rasteira) que quase completamente obscurece
                        seu corpo.
                      </ParchmentText>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <ParchmentText sx={{ mb: 1 }}>
                        <strong style={{ color: "#d4af37" }}>
                          Cobertura Pesada (+4):
                        </strong>{" "}
                        O alvo está em contato com cobertura sólida que quase
                        completamente obscurece seu corpo.
                      </ParchmentText>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <ParchmentText sx={{ mb: 1 }}>
                        <strong style={{ color: "#d4af37" }}>
                          Tiro Apressado (+1):
                        </strong>{" "}
                        O atirador se moveu anteriormente durante esta ativação.
                        Difícil mirar quando seus pulmões ainda ardem da
                        corrida.
                      </ParchmentText>
                    </Box>

                    <Box>
                      <ParchmentText>
                        <strong style={{ color: "#d4af37" }}>
                          Alvo Grande (-2):
                        </strong>{" "}
                        O alvo é particularmente alto ou incomumente largo.
                        Normalmente se aplica apenas a criaturas com o trait
                        Grande. Algumas coisas são difíceis de errar.
                      </ParchmentText>
                    </Box>
                  </Box>

                  {/* Exemplo de Tiro */}
                  <Box
                    sx={{
                      mt: 4,
                      p: 3,
                      backgroundColor: "rgba(75, 0, 0, 0.15)",
                      border: "2px solid #8b4513",
                      borderRadius: "4px",
                    }}
                  >
                    <PowerListTitle
                      sx={{
                        fontSize: "1.1rem",
                        mb: 2,
                        mt: 0,
                        color: "#d4af37",
                      }}
                    >
                      Exemplo: Besteiro vs Necromante
                    </PowerListTitle>

                    <ParchmentText
                      sx={{ fontStyle: "italic", fontSize: "0.95rem", mb: 2 }}
                    >
                      Hans, o besteiro, espiou através das ruínas. Lá — o
                      necromante, 60 cm à frente, parcialmente atrás de um muro
                      quebrado. Hans já havia se movido 8 cm neste turno para
                      conseguir linha de visão. Não ideal, mas quando é?
                    </ParchmentText>

                    <ParchmentText
                      sx={{ fontStyle: "italic", fontSize: "0.95rem", mb: 2 }}
                    >
                      <strong>Hans rola Precisão:</strong> d20 = 13, +2
                      (Precisão) = <strong>15 total</strong>
                      <br />
                      <strong>Necromante rola Ímpeto:</strong> d20 = 9, +0
                      (Ímpeto), +2 (cobertura leve do muro), +1 (tiro apressado
                      de Hans) = <strong>12 total</strong>
                    </ParchmentText>

                    <ParchmentText
                      sx={{ fontStyle: "italic", fontSize: "0.95rem", mb: 2 }}
                    >
                      Hans vence! Calcula dano: 15 +2 (besta) = 17 - 10
                      (armadura do necromante) ={" "}
                      <strong>7 pontos de dano</strong>. O virote perfura o
                      ombro do conjurador. Ele grita — surpreendentemente agudo
                      para alguém que lida com mortos.
                    </ParchmentText>

                    <ParchmentText
                      sx={{ fontStyle: "italic", fontSize: "0.95rem" }}
                    >
                      Hans sorri. Depois franze a testa. O necromante ainda está
                      de pé, segurando o ombro perfurado, olhos brilhando com
                      ódio e magia sombria. "Ele devia ter ficado mais perto do
                      muro," Hans pensa. "Ele, não eu. Não arredo pé daqui."
                    </ParchmentText>
                  </Box>
                </Box>

                {/* Ação de Conjuração */}
                <Box sx={{ mb: 4 }} id="acao-de-conjuracao">
                  <PowerListTitle sx={{ fontSize: "1.2rem", mb: 2 }}>
                    Ação de Conjuração
                  </PowerListTitle>

                  <ParchmentText sx={{ mb: 3 }}>
                    Brincando com os ventos do Caos. Canalizando poder que
                    deveria permanecer adormecido. Algumas almas tolas ou
                    desesperadas possuem o dom — ou maldição — da magia. E em
                    Mordheim, onde a Pedra-bruxa contamina cada pedra, esse
                    poder é ainda mais perigoso... e tentador.
                  </ParchmentText>

                  {/* O Ritual */}
                  <Box
                    sx={{
                      mt: 3,
                      mb: 3,
                      pl: 2,
                      borderLeft: "2px solid #8b7355",
                    }}
                  >
                    <PowerListTitle sx={{ fontSize: "1.1rem", mb: 2, mt: 0 }}>
                      O Ritual da Conjuração
                    </PowerListTitle>

                    <ParchmentText sx={{ mb: 2 }}>
                      Uma figura capaz de conjurar magias escolhe uma de suas
                      magias conhecidas. Ela então rola um <strong>d20</strong>{" "}
                      — a rolagem de conjuração. Este único número determina se
                      ela canaliza poder divino ou abraça o desastre.
                    </ParchmentText>

                    <ParchmentText sx={{ mb: 2 }}>
                      A figura deve rolar <strong>mais</strong> que a{" "}
                      <strong>Classe de Dificuldade (CD)</strong> da magia. Se o
                      fizer, a magia é conjurada com sucesso — poder flui,
                      realidade se curva, o impossível se manifesta. Se
                      falhar... bem, aí é que as coisas ficam interessantes.
                    </ParchmentText>

                    <ParchmentText>
                      <strong>Consequências da Falha:</strong> Cada tradição
                      mágica tem suas próprias consequências por falhar. Magos
                      arcanos arriscam a corrupção do Caos. Sacerdotes podem
                      sofrer a ira de seus deuses. Necromantes... necromantes
                      aprendem que os mortos não perdoam facilmente. Cheque as
                      consequências específicas na descrição da tradição mágica
                      que está sendo utilizada.
                    </ParchmentText>
                  </Box>

                  {/* Forçar */}
                  <Box
                    sx={{
                      mt: 4,
                      mb: 3,
                      p: 3,
                      backgroundColor: "rgba(139, 115, 85, 0.15)",
                      border: "2px solid #8b4513",
                      borderRadius: "4px",
                    }}
                  >
                    <PowerListTitle sx={{ fontSize: "1.1rem", mb: 2, mt: 0 }}>
                      Forçar — Sangue pelo Poder
                    </PowerListTitle>

                    <ParchmentText sx={{ mb: 2 }}>
                      Às vezes, a magia não vem facilmente. Às vezes, os ventos
                      não sopram na direção que você precisa. E às vezes, a
                      única opção é <strong>forçar</strong> — arrancar poder com
                      a própria essência vital.
                    </ParchmentText>

                    <ParchmentText sx={{ mb: 2 }}>
                      <strong>Forçar:</strong> Aumente a rolagem de conjuração
                      em <strong>+1 para cada 1 ponto de vida gasto</strong>.
                      Você pode gastar quantos pontos quiser, transformando sua
                      própria vitalidade em poder arcano. Sangue por magia. Vida
                      por resultado.
                    </ParchmentText>

                    <ParchmentText sx={{ mb: 2 }}>
                      <strong>Limite do Forçar:</strong> Forçar{" "}
                      <strong>nunca pode fazer</strong> uma rolagem de
                      conjuração ser <strong>maior que 18</strong>. Há um limite
                      para quanto poder o corpo mortal pode canalizar, não
                      importa quanto sangue você ofereça. Alguns tolos tentaram
                      ultrapassar este limite. Seus corpos retorcidos ainda
                      decoram certas ruínas, avisos silenciosos de ambição além
                      da capacidade.
                    </ParchmentText>

                    <ParchmentText>
                      Uma barganha que os desesperados fazem... e que os mortos
                      lamentam.
                    </ParchmentText>
                    <br />
                    <ParchmentText
                      sx={{
                        fontStyle: "italic",
                        fontSize: "0.95rem",
                        color: "#a89968",
                        pl: 2,
                        borderLeft: "2px solid #8b7355",
                      }}
                    >
                      Bergson von Blutgarn rolou 12 para conjurar Bola de Fogo
                      (CD 14). Falhou por 2. Mas ele não podia falhar — não
                      agora, não com o cultista avançado enquanto espuma pela
                      boca. Ele <strong>Forçou</strong> gastando 3 pontos de
                      vida. Sua rolagem subiu para 15. Sucesso. A bola de fogo
                      explodiu, consumindo o miserável. O aprendiz caiu de
                      joelhos, pálido, sangrando pelo nariz. Mas vivo. Às vezes,
                      o preço vale a pena.
                    </ParchmentText>
                  </Box>

                  {/* Exemplo de Conjuração */}
                  <Box
                    sx={{
                      mt: 4,
                      p: 3,
                      backgroundColor: "rgba(75, 0, 0, 0.15)",
                      border: "2px solid #8b4513",
                      borderRadius: "4px",
                    }}
                  >
                    <PowerListTitle
                      sx={{
                        fontSize: "1.1rem",
                        mb: 2,
                        mt: 0,
                        color: "#d4af37",
                      }}
                    >
                      Exemplo: Mago da Luz vs As Sombras
                    </PowerListTitle>

                    <ParchmentText
                      sx={{ fontStyle: "italic", fontSize: "0.95rem", mb: 2 }}
                    >
                      Maximilian levantou seu cajado, palavras de poder
                      formando-se em seus lábios. A escuridão de Mordheim
                      pressionava contra ele, mas ele conhecia a luz. "Vade
                      Retro, Cramunhão!", ele declarou, conjurando contra o
                      demônio à sua frente. CD 16 — não era fácil.
                    </ParchmentText>

                    <ParchmentText
                      sx={{ fontStyle: "italic", fontSize: "0.95rem", mb: 2 }}
                    >
                      <strong>Maximilian rola:</strong> d20 = 17
                      <br />
                      <em style={{ color: "#a89968" }}>
                        Sucesso. Por um fio. Mas sucesso.
                      </em>
                    </ParchmentText>

                    <ParchmentText
                      sx={{ fontStyle: "italic", fontSize: "0.95rem", mb: 2 }}
                    >
                      Luz sagrada explode do cajado, envolvendo o demônio em
                      chamas purificadoras. A criatura grita — um som que não
                      deveria existir neste mundo. O feitiço funciona conforme
                      descrito na tradição da Luz.
                    </ParchmentText>

                    <ParchmentText
                      sx={{ fontStyle: "italic", fontSize: "0.95rem" }}
                    >
                      Maximilian respira fundo, suor escorrendo por seu rosto.
                      Por pouco. Se tivesse rolado 16 ou menos... bem, melhor
                      não pensar nisso. Em Mordheim, cada conjuração é um jogo
                      com a morte. E a morte nunca esquece os apostadores.
                    </ParchmentText>
                  </Box>
                </Box>

                {/* Ação de Poder */}
                <Box sx={{ mb: 4 }} id="acao-de-poder">
                  <PowerListTitle sx={{ fontSize: "1.2rem", mb: 2 }}>
                    Ação de Poder
                  </PowerListTitle>

                  <ParchmentText sx={{ mb: 3 }}>
                    Não é magia — é algo mais visceral. Mais brutal. O auge da
                    habilidade marcial, técnica refinada até a perfeição, ou
                    pura força de vontade manifestada em feitos sobre-humanos.
                    Mas grandeza tem seu preço, e esse preço é pago em dor.
                  </ParchmentText>

                  {/* O Ato de Ativar */}
                  <Box
                    sx={{
                      mt: 3,
                      mb: 3,
                      pl: 2,
                      borderLeft: "2px solid #8b7355",
                    }}
                  >
                    <PowerListTitle sx={{ fontSize: "1.1rem", mb: 2, mt: 0 }}>
                      Ativando Poderes
                    </PowerListTitle>

                    <ParchmentText sx={{ mb: 2 }}>
                      Uma figura que pode usar poderes utiliza essa ação para
                      ativá-los. A figura rola um <strong>d20</strong> — a
                      rolagem de ativação. Se essa rolagem for{" "}
                      <strong>maior</strong> que a{" "}
                      <strong>Classe de Dificuldade (CD)</strong> do poder, o
                      poder é ativado com sucesso. Caso contrário, o poder
                      falha. Simples. Direto. Doloroso.
                    </ParchmentText>
                  </Box>

                  {/* Stress */}
                  <Box
                    sx={{
                      mt: 4,
                      mb: 3,
                      p: 3,
                      backgroundColor: "rgba(139, 115, 85, 0.15)",
                      border: "2px solid #8b4513",
                      borderRadius: "4px",
                    }}
                  >
                    <PowerListTitle sx={{ fontSize: "1.1rem", mb: 2, mt: 0 }}>
                      Stress — O Preço da Excelência
                    </PowerListTitle>

                    <ParchmentText sx={{ mb: 2 }}>
                      Ativar um poder é usar o auge da habilidade marcial do
                      personagem, e a carga mental e física é grande. Músculos
                      rasgam. Nervos queimam. Ossos rangem sob pressão
                      impossível.
                    </ParchmentText>

                    <ParchmentText sx={{ mb: 2 }}>
                      <strong>Ao tentar ativar um poder:</strong> O jogador toma{" "}
                      <strong>1 ponto de dano</strong> automaticamente. O
                      esforço de tentar já cobra seu tributo.
                    </ParchmentText>

                    <ParchmentText>
                      <strong>Caso falhe em ativar o poder:</strong> Toma mais{" "}
                      <strong>2 pontos de dano</strong>, para um total de{" "}
                      <strong>3 pontos</strong>. Falha não apenas nega o efeito
                      — ela machuca. Profundamente.
                    </ParchmentText>
                  </Box>

                  {/* Natureza Especial */}
                  <Box
                    sx={{
                      mt: 3,
                      mb: 3,
                      pl: 2,
                      borderLeft: "2px solid #8b7355",
                    }}
                  >
                    <PowerListTitle sx={{ fontSize: "1.1rem", mb: 2, mt: 0 }}>
                      Uma Ação Especial
                    </PowerListTitle>

                    <ParchmentText>
                      Esta ação é especial: ela <strong>não gasta</strong> uma
                      das ações do jogador por padrão, a não ser que um poder
                      específico exija uma ação para aplicar seus efeitos. Você
                      pode ativar um poder e ainda mover, atacar, ou realizar
                      outras ações. O corpo grita em protesto, mas obedece.
                    </ParchmentText>
                  </Box>

                  {/* Forçar Poderes */}
                  <Box
                    sx={{
                      mt: 3,
                      mb: 3,
                      pl: 2,
                      borderLeft: "2px solid #8b7355",
                    }}
                  >
                    <PowerListTitle sx={{ fontSize: "1.1rem", mb: 2, mt: 0 }}>
                      Forçar Poderes
                    </PowerListTitle>

                    <ParchmentText>
                      Assim como magias, poderes podem ser{" "}
                      <strong>Forçados</strong>. Aumente a rolagem de ativação
                      em <strong>+1 para cada 1 ponto de vida gasto</strong>. A
                      rolagem nunca pode exceder <strong>18</strong>. Sangue por
                      sucesso. Vida por vitória. O preço é o mesmo, apenas a
                      moeda que muda.
                    </ParchmentText>
                  </Box>

                  {/* Stress Acumulado */}
                  <Box
                    sx={{
                      mt: 4,
                      mb: 3,
                      p: 3,
                      backgroundColor: "rgba(139, 115, 85, 0.15)",
                      border: "2px solid #d4af37",
                      borderRadius: "4px",
                    }}
                  >
                    <PowerListTitle sx={{ fontSize: "1.1rem", mb: 2, mt: 0 }}>
                      Stress Acumulado — O Limite da Carne
                    </PowerListTitle>

                    <ParchmentText sx={{ mb: 2 }}>
                      Um jogador pode usar essa ação{" "}
                      <strong>uma vez por ativação de cada figura</strong> no
                      jogo, podendo usar vários poderes no mesmo turno — um a
                      cada ativação. Mas à medida que o stress se acumula, os
                      poderes ficam mais difíceis de ativar. O corpo tem
                      limites.
                    </ParchmentText>

                    <ParchmentText sx={{ mb: 2 }}>
                      <strong>Penalidade Progressiva:</strong> Cada poder além
                      do primeiro usado no turno tem sua CD aumentada em{" "}
                      <strong>+3 para cada outro poder</strong> ativado antes
                      dele:
                    </ParchmentText>

                    <ParchmentText sx={{ pl: 3, mb: 2 }}>
                      • <strong>Primeiro poder:</strong> CD normal
                      <br />• <strong>Segundo poder:</strong> CD +3
                      <br />• <strong>Terceiro poder:</strong> CD +6
                      <br />• <strong>Quarto poder:</strong> CD +9
                      <br />• <strong>Quinto poder:</strong> CD +12
                      <br />• <strong>Sexto poder:</strong> CD +15
                    </ParchmentText>

                    <ParchmentText>
                      <strong>Limite Absoluto:</strong> Quando a penalidade
                      chegar a <strong>+15</strong>, poderes não podem mais ser
                      ativados neste turno. O corpo simplesmente se recusa.
                      Carne e osso têm limites que nem a vontade mais feroz pode
                      ultrapassar.
                    </ParchmentText>
                  </Box>

                  {/* Exemplo de Poder */}
                  <Box
                    sx={{
                      mt: 4,
                      p: 3,
                      backgroundColor: "rgba(75, 0, 0, 0.15)",
                      border: "2px solid #8b4513",
                      borderRadius: "4px",
                    }}
                  >
                    <PowerListTitle
                      sx={{
                        fontSize: "1.1rem",
                        mb: 2,
                        mt: 0,
                        color: "#d4af37",
                      }}
                    >
                      Exemplo: Klaus Empurra os Limites
                    </PowerListTitle>

                    <ParchmentText
                      sx={{ fontStyle: "italic", fontSize: "0.95rem", mb: 2 }}
                    >
                      Klaus, na primeira ativação, usa "Muralha de Escudos!" (CD
                      3). Rola 15 — sucesso fácil. Toma 1 de dano pelo esforço.
                      Seus homens erguem escudos em formação perfeita.
                    </ParchmentText>

                    <ParchmentText
                      sx={{ fontStyle: "italic", fontSize: "0.95rem", mb: 2 }}
                    >
                      Segunda ativação: "Ataquem, malditos!" (CD 3, agora CD 6
                      pelo +3). Rola 8 — sucesso. Mais 1 de dano. Seu bando
                      avança coordenado. Klaus sente os músculos protestando.
                    </ParchmentText>

                    <ParchmentText
                      sx={{ fontStyle: "italic", fontSize: "0.95rem", mb: 2 }}
                    >
                      Terceira ativação: "Afiem as lâminas!" (CD 3, agora CD 9
                      pelo +6). Rola 7 — falha. 3 pontos de dano. Klaus cospe
                      sangue, garganta rasgada de tanto gritar ordens. O poder
                      não ativa. Seus homens não recebem o bônus.
                    </ParchmentText>

                    <ParchmentText
                      sx={{ fontStyle: "italic", fontSize: "0.95rem" }}
                    >
                      Total de dano: 5 pontos em três ativações. Klaus
                      cambaleia, segurando o peito. "Não posso continuar assim,"
                      ele pensa, sabendo que provavelmente continuará. Em
                      Mordheim, você sempre continua até não poder mais.
                    </ParchmentText>
                  </Box>
                </Box>

                {/* Ação de Pegar */}
                <Box sx={{ mb: 4 }} id="acao-de-pegar">
                  <PowerListTitle sx={{ fontSize: "1.2rem", mb: 2 }}>
                    Ação de Pegar — Fragmentos de Pedra-bruxa
                  </PowerListTitle>

                  <ParchmentText sx={{ mb: 3 }}>
                    A razão pela qual todos estão aqui. A maldição verde que
                    atrai tolos, desesperados e gananciosos para as ruínas. Os
                    fragmentos de Pedra-bruxa — pedaços do próprio cometa que
                    aniquilou esta cidade condenada. Não são pequenas lascas,
                    apesar do nome "fragmentos" — são{" "}
                    <strong>grandes pedaços</strong> do cometa, pesados,
                    pulsantes de energia corrupta, e terrivelmente valiosos.
                  </ParchmentText>

                  {/* Pegando o Fragmento */}
                  <Box
                    sx={{
                      mt: 3,
                      mb: 3,
                      pl: 2,
                      borderLeft: "2px solid #8b7355",
                    }}
                  >
                    <PowerListTitle sx={{ fontSize: "1.1rem", mb: 2, mt: 0 }}>
                      O Ato de Pegar
                    </PowerListTitle>

                    <ParchmentText sx={{ mb: 2 }}>
                      Uma figura pode gastar uma ação para pegar um fragmento de
                      Pedra-bruxa do chão. O momento em que a ganância supera o
                      bom senso. Porém, há restrições — afinal, pegar tesouros
                      amaldiçoados enquanto inimigos observam raramente termina
                      bem.
                    </ParchmentText>

                    <ParchmentText>
                      <strong>Restrição de Proximidade:</strong> Uma figura{" "}
                      <strong>não pode usar essa ação</strong> se um inimigo
                      está a menos de <strong>3 cm do fragmento</strong>. Tente
                      pegar pedras brilhantes enquanto alguém está querendo te
                      matar e veja como termina.
                    </ParchmentText>
                  </Box>

                  {/* O Peso da Ganância */}
                  <Box
                    sx={{
                      mt: 3,
                      mb: 3,
                      pl: 2,
                      borderLeft: "2px solid #8b7355",
                    }}
                  >
                    <PowerListTitle sx={{ fontSize: "1.1rem", mb: 2, mt: 0 }}>
                      O Peso da Ganância
                    </PowerListTitle>

                    <ParchmentText sx={{ mb: 2 }}>
                      Enquanto estiver carregando o fragmento, a figura tem
                      apenas <strong>metade do seu movimento normal</strong>{" "}
                      (arredonde para baixo). O cometa é pesado. A ganância,
                      mais pesada ainda.
                    </ParchmentText>

                    <ParchmentText sx={{ mb: 2 }}>
                      <strong>Sobrecarga:</strong> Uma figura que esteja usando
                      qualquer coisa que não seja uma{" "}
                      <strong>arma de mão</strong> ou <strong>adaga</strong>{" "}
                      fica sobrecarregada carregando o fragmento, sofrendo{" "}
                      <strong>-2</strong> em Ímpeto, Precisão, rolagens de
                      conjuração e Vontade. Carregar uma espada de duas mãos e
                      um pedaço de cometa? Possível. Sábio? Discutível.
                    </ParchmentText>

                    <ParchmentText>
                      <strong>Exceções e Restrições:</strong> Figuras com uma{" "}
                      <strong>adaga na mão secundária não podem pegar</strong>{" "}
                      fragmentos de Pedra-bruxa. Contudo, figuras com uma{" "}
                      <strong>funda ou escudo</strong> podem (seguindo regras
                      normais de sobrecarga se aplicável).
                    </ParchmentText>
                  </Box>

                  {/* Escapando com o Tesouro */}
                  <Box
                    sx={{
                      mt: 3,
                      mb: 3,
                      pl: 2,
                      borderLeft: "2px solid #8b7355",
                    }}
                  >
                    <PowerListTitle sx={{ fontSize: "1.1rem", mb: 2, mt: 0 }}>
                      A Grande Fuga
                    </PowerListTitle>

                    <ParchmentText>
                      Uma figura carregando um fragmento de Pedra-bruxa pode{" "}
                      <strong>sair do mapa</strong>, capturando-a para seu
                      bando. A figura e o fragmento não voltam para o jogo — ela
                      fugiu com o tesouro, levando sua ganância (e o cometa
                      amaldiçoado) para longe das ruínas. Missão cumprida.
                      Sobrevivência garantida. Corrupção... bem, isso é problema
                      para amanhã.
                    </ParchmentText>
                  </Box>

                  {/* Exemplo de Pegar */}
                  <Box
                    sx={{
                      mt: 4,
                      p: 3,
                      backgroundColor: "rgba(75, 0, 0, 0.15)",
                      border: "2px solid #8b4513",
                      borderRadius: "4px",
                    }}
                  >
                    <PowerListTitle
                      sx={{
                        fontSize: "1.1rem",
                        mb: 2,
                        mt: 0,
                        color: "#d4af37",
                      }}
                    >
                      Exemplo: A Ganância de Wilhelm
                    </PowerListTitle>

                    <ParchmentText
                      sx={{ fontStyle: "italic", fontSize: "0.95rem", mb: 2 }}
                    >
                      Wilhelm viu o fragmento brilhando entre os escombros.
                      Verde. Pulsante. Valioso. O orc mais próximo estava a 10
                      cm — longe o suficiente. Ele gastou sua ação para pegá-lo,
                      agarrando o pedaço de cometa. Era pesado. Mais pesado do
                      que parecia.
                    </ParchmentText>

                    <ParchmentText
                      sx={{ fontStyle: "italic", fontSize: "0.95rem", mb: 2 }}
                    >
                      Wilhelm carregava uma espada de duas mãos. Agora, com a
                      Pedra-bruxa na outra mão, estava sobrecarregado. Seu
                      movimento de 16 cm caiu para 8 cm. Pior: -2 em Ímpeto,
                      Precisão, Conjuração e Vontade. Cada passo era uma luta.
                      Cada respiração, um esforço.
                    </ParchmentText>

                    <ParchmentText
                      sx={{ fontStyle: "italic", fontSize: "0.95rem" }}
                    >
                      Mas Wilhelm sorriu. A borda do mapa estava a 18 cm. Três
                      turnos, talvez quatro, e ele poderia sair — fragmento em
                      mãos, riqueza garantida. Claro, havia aquele orc. E aquele
                      outro orc. E... ele parou de contar. "Um problema de cada
                      vez," murmurou, arrastando-se através das ruínas, metade
                      da velocidade mas o dobro da determinação.
                    </ParchmentText>
                  </Box>
                </Box>

                {/* Ação de Usar Item */}
                <Box sx={{ mb: 4 }} id="acao-de-usar-item">
                  <PowerListTitle sx={{ fontSize: "1.2rem", mb: 2 }}>
                    Ação de Usar Item
                  </PowerListTitle>

                  <ParchmentText sx={{ mb: 3 }}>
                    Poções preparadas em alambiques esquecidos. Artefatos
                    mágicos imbuídos de poder antigo. Pergaminhos rabiscados com
                    runas que ardem nos olhos. Em Mordheim, estes tesouros podem
                    salvar vidas... ou destruí-las espetacularmente.
                  </ParchmentText>

                  <Box
                    sx={{
                      mt: 3,
                      mb: 3,
                      pl: 2,
                      borderLeft: "2px solid #8b7355",
                    }}
                  >
                    <ParchmentText sx={{ mb: 2 }}>
                      Alguns <strong>itens mágicos e poções</strong> especificam
                      que precisam de ações para serem bebidos, ativados ou
                      utilizados. Esta é a ação usada para tal fim. Simples,
                      direto, e frequentemente a diferença entre vida e morte.
                    </ParchmentText>

                    <ParchmentText>
                      Consulte a descrição específica do item para saber seus
                      efeitos, duração, e quaisquer consequências de uso. Alguns
                      itens são benignos. Outros... bem, em Mordheim, até as
                      curas podem ter preço.
                    </ParchmentText>
                  </Box>

                  {/* Exemplo de Usar Item */}
                  <Box
                    sx={{
                      mt: 4,
                      p: 3,
                      backgroundColor: "rgba(75, 0, 0, 0.15)",
                      border: "2px solid #8b4513",
                      borderRadius: "4px",
                    }}
                  >
                    <PowerListTitle
                      sx={{
                        fontSize: "1.1rem",
                        mb: 2,
                        mt: 0,
                        color: "#d4af37",
                      }}
                    >
                      Exemplo: Poção do Desespero
                    </PowerListTitle>

                    <ParchmentText
                      sx={{ fontStyle: "italic", fontSize: "0.95rem", mb: 2 }}
                    >
                      Klaus estava sangrando. Muito. O corte do cutelo orc havia
                      atingido fundo — apenas 4 pontos de vida restantes. Ele
                      enfiou a mão no cinto e puxou a poção que comprou na
                      taverna: "Lágrimas de Shallya", o vendedor dissera.
                      Cheirava a ervas mortas e esperança falsa.
                    </ParchmentText>

                    <ParchmentText
                      sx={{ fontStyle: "italic", fontSize: "0.95rem", mb: 2 }}
                    >
                      Klaus gastou uma ação para beber. O líquido queimou sua
                      garganta. Depois, calor — a ferida parou de sangrar, a dor
                      diminuiu. Recuperou 5 pontos de vida. Não era milagre, mas
                      em Mordheim, você aceita o que pode conseguir.
                    </ParchmentText>

                    <ParchmentText
                      sx={{ fontStyle: "italic", fontSize: "0.95rem" }}
                    >
                      "Valeu cada coroa," Klaus murmurou, jogando o frasco vazio
                      nos escombros. Então pegou sua espada novamente. O orc
                      ainda estava lá. E Klaus, agora, tinha vida suficiente
                      para outro round. Às vezes, a alquimia funciona.
                    </ParchmentText>
                  </Box>
                </Box>

                {/* Ações Especiais */}
                <Box sx={{ mb: 4 }} id="acoes-especiais">
                  <PowerListTitle sx={{ fontSize: "1.2rem", mb: 2 }}>
                    Ações Especiais
                  </PowerListTitle>

                  <ParchmentText sx={{ mb: 3 }}>
                    Nem toda ação se encaixa perfeitamente nas categorias acima.
                    Algumas figuras possuem truques únicos, técnicas
                    especializadas, ou habilidades que desafiam a normalidade.
                    Estas são as <strong>ações especiais</strong> — capacidades
                    únicas concedidas por habilidades, traits, magias ou
                    equipamentos específicos.
                  </ParchmentText>

                  <Box
                    sx={{
                      mt: 3,
                      mb: 3,
                      pl: 2,
                      borderLeft: "2px solid #8b7355",
                    }}
                  >
                    <ParchmentText sx={{ mb: 2 }}>
                      <strong>Ações Definidas por Habilidades:</strong> Quando
                      uma habilidade, trait ou item concede uma "ação especial",
                      ela especifica exatamente o que pode ser feito, quando
                      pode ser usado, e quais seus efeitos. Estas ações seguem
                      suas próprias regras, escritas em suas descrições.
                    </ParchmentText>

                    <ParchmentText>
                      Algumas ações especiais substituem ações normais (como
                      movimento ou tiro). Outras são completamente únicas.
                      Sempre leia a descrição completa — em Mordheim, os
                      detalhes matam.
                    </ParchmentText>
                  </Box>

                  {/* Exemplo de Ação Especial */}
                  <Box
                    sx={{
                      mt: 4,
                      p: 3,
                      backgroundColor: "rgba(75, 0, 0, 0.15)",
                      border: "2px solid #8b4513",
                      borderRadius: "4px",
                    }}
                  >
                    <PowerListTitle
                      sx={{
                        fontSize: "1.1rem",
                        mb: 2,
                        mt: 0,
                        color: "#d4af37",
                      }}
                    >
                      Exemplo: Ação de Mirar do Skink Zarabataneiro
                    </PowerListTitle>

                    <ParchmentText
                      sx={{ fontStyle: "italic", fontSize: "0.95rem", mb: 2 }}
                    >
                      Tik-Taq, o skink zarabataneiro, espreitava nas sombras,
                      sua zarabatana firmemente segura. O cultista estava a 40
                      cm — alcance perfeito, mas o alvo se movia entre os
                      escombros. Tik-Taq não era apressado. Skinks nunca são.
                    </ParchmentText>

                    <ParchmentText
                      sx={{ fontStyle: "italic", fontSize: "0.95rem", mb: 2 }}
                    >
                      Ele usou sua primeira ação para <strong>Mirar</strong> —
                      uma ação especial concedida por sua habilidade de
                      zarabataneiro. Respiração controlada. Foco absoluto.
                      Cálculo da distância, vento, e o movimento do alvo. Quando
                      sua segunda ação veio, ele disparou com{" "}
                      <strong>Ignorando terrenos entre ele e o alvo</strong> .
                    </ParchmentText>

                    <ParchmentText
                      sx={{ fontStyle: "italic", fontSize: "0.95rem" }}
                    >
                      O dardo envenenado voou. Silencioso. Certeiro. O cultista
                      caiu antes mesmo de saber que estava morto. Tik-Taq
                      assentiu para si mesmo. Paciência, como sempre, vence
                      pressa. Os sangue-quente nunca entendem isso.
                    </ParchmentText>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* A CAMPANHA - Nova Superseção */}
            <Box
              sx={{
                mt: 8,
                mb: 6,
                pt: 5,
                borderTop: "4px double #d4af37",
              }}
              id="a-campanha"
            >
              <PowerListTitle
                sx={{ fontSize: "2rem", mb: 4, textAlign: "center" }}
              >
                A Campanha
              </PowerListTitle>

              <Box
                sx={{
                  mb: 5,
                  p: 4,
                  backgroundColor: "rgba(20, 18, 14, 0.6)",
                  border: "3px solid #8b4513",
                  borderRadius: "4px",
                }}
              >
                <ParchmentText
                  sx={{
                    fontStyle: "italic",
                    fontSize: "1.1rem",
                    textAlign: "center",
                  }}
                >
                  "Uma batalha é sobrevivência. Uma campanha é destino. Em
                  Mordheim, cada jogo não é apenas luta — é história sendo
                  escrita em sangue, ouro e Pedra-bruxa. Seu bando evolui,
                  enfraquece, cresce ou morre. Esta é a verdadeira natureza de
                  Mordheim: não uma única batalha, mas uma guerra sem fim contra
                  a ruína, o tempo, e a própria maldição da cidade."
                </ParchmentText>
              </Box>

              <ParchmentText sx={{ mb: 4 }}>
                Mordheim não é travada em uma única tarde de sangue. É uma série
                de batalhas, cada uma deixando cicatrizes, cada uma forjando
                lendas ou criando cadáveres. Uma campanha é a crônica do seu
                bando — de seus primeiros passos hesitantes nas ruínas até sua
                glória eventual... ou extinção inevitável.
              </ParchmentText>

              {/* Sequência Pós Jogo */}
              <Box sx={{ mt: 5, mb: 6 }}>
                <PowerListTitle sx={{ fontSize: "1.8rem", mb: 3 }}>
                  Sequência Pós Jogo
                </PowerListTitle>

                <ParchmentText sx={{ mb: 4 }}>
                  A batalha acabou. Os mortos jazem onde caíram. Os
                  sobreviventes arrastam-se de volta aos acampamentos
                  improvisados, sangrando, exaustos, mas vivos. Agora vem a
                  parte que muitos esquecem: a contabilidade da carnificina.
                  Quem sobreviveu? Quem morreu? O que foi ganho? O que foi
                  perdido? Esta é a <strong>Sequência Pós Jogo</strong> — onde
                  batalhas se tornam história, e história se torna lenda... ou
                  esquecimento.
                </ParchmentText>

                <Box
                  sx={{
                    mb: 4,
                    p: 3,
                    backgroundColor: "rgba(139, 115, 85, 0.1)",
                    borderRadius: "4px",
                  }}
                >
                  <ParchmentText sx={{ fontStyle: "italic", color: "#c4a870" }}>
                    "Quando a fumaça se dissipa e o sangue seca, o verdadeiro
                    trabalho começa. Contar os mortos. Dividir o saque. Preparar
                    para a próxima vez. Porque em Mordheim, sempre há uma
                    próxima vez."
                  </ParchmentText>
                </Box>

                {/* 1. Ferimentos e Morte */}
                <Box sx={{ mb: 6 }} id="ferimentos-e-morte">
                  <PowerListTitle sx={{ fontSize: "1.3rem", mb: 3 }}>
                    1. Ferimentos e Morte
                  </PowerListTitle>

                  <ParchmentText sx={{ mb: 4 }}>
                    Para cada modelo que foi reduzido a 0 de Vigor durante o
                    jogo, existe a possibilidade de que aquele modelo sofra
                    ferimentos permanentes ou morra. Em Mordheim, cair não
                    significa necessariamente morte — às vezes significa algo
                    pior.
                  </ParchmentText>

                  {/* Tabela de Soldados */}
                  <Box
                    sx={{
                      mb: 4,
                      p: 3,
                      backgroundColor: "rgba(139, 115, 85, 0.1)",
                      border: "2px solid #8b4513",
                      borderRadius: "4px",
                    }}
                  >
                    <PowerListTitle sx={{ fontSize: "1.1rem", mb: 2, mt: 0 }}>
                      Sobrevivência de Soldados
                    </PowerListTitle>

                    <ParchmentText sx={{ mb: 2 }}>
                      Para cada soldado que caiu, role um d20:
                    </ParchmentText>

                    <TableContainer
                      component={Paper}
                      sx={{
                        backgroundColor: "rgba(28, 24, 18, 0.8)",
                        border: "2px solid #8b7355",
                      }}
                    >
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell
                              sx={{
                                backgroundColor: "rgba(139, 115, 85, 0.5)",
                                color: "#d4af37",
                                fontWeight: "bold",
                                fontSize: "0.9rem",
                                borderBottom: "2px solid #8b7355",
                                textAlign: "center",
                                width: "20%",
                              }}
                            >
                              d20
                            </TableCell>
                            <TableCell
                              sx={{
                                backgroundColor: "rgba(139, 115, 85, 0.5)",
                                color: "#d4af37",
                                fontWeight: "bold",
                                fontSize: "0.9rem",
                                borderBottom: "2px solid #8b7355",
                              }}
                            >
                              Resultado
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                fontWeight: "bold",
                                borderBottom: "1px solid #8b7355",
                                textAlign: "center",
                              }}
                            >
                              1-4
                            </TableCell>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                borderBottom: "1px solid #8b7355",
                              }}
                            >
                              <strong>Morto.</strong> O soldado não sobreviveu.
                              Simples assim. Remova-o da lista de campanha.
                              Alguém terá que cavar uma cova... se houver tempo.
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                fontWeight: "bold",
                                borderBottom: "1px solid #8b7355",
                                textAlign: "center",
                              }}
                            >
                              5-8
                            </TableCell>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                borderBottom: "1px solid #8b7355",
                              }}
                            >
                              <strong>Gravemente Ferido.</strong> O soldado
                              vive, mas mal. Não poderá ser usado no próximo
                              jogo. O soldado ferido pode ser substituído
                              temporariamente por qualquer figura de custo
                              gratuito que o bando possa recrutar.
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                fontWeight: "bold",
                                borderBottom: "none",
                                textAlign: "center",
                              }}
                            >
                              9+
                            </TableCell>
                            <TableCell
                              sx={{ color: "#d4c4a8", borderBottom: "none" }}
                            >
                              <strong>Sobrevive.</strong> O soldado volta,
                              talvez com novas cicatrizes e pesadelos, mas
                              funcional. Em Mordheim, isso conta como sorte.
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>

                  {/* Tabela de Heróis e Campeões */}
                  <Box
                    sx={{
                      mb: 4,
                      p: 3,
                      backgroundColor: "rgba(139, 115, 85, 0.1)",
                      border: "2px solid #d4af37",
                      borderRadius: "4px",
                    }}
                  >
                    <PowerListTitle sx={{ fontSize: "1.1rem", mb: 2, mt: 0 }}>
                      Sobrevivência de Heróis e Campeões
                    </PowerListTitle>

                    <ParchmentText sx={{ mb: 3 }}>
                      Heróis e campeões são mais resistentes — ou mais teimosos
                      — que soldados comuns. Mas até eles podem cair
                      permanentemente. Role um d20:
                    </ParchmentText>

                    <TableContainer
                      component={Paper}
                      sx={{
                        backgroundColor: "rgba(28, 24, 18, 0.8)",
                        border: "2px solid #8b7355",
                      }}
                    >
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell
                              sx={{
                                backgroundColor: "rgba(139, 115, 85, 0.5)",
                                color: "#d4af37",
                                fontWeight: "bold",
                                fontSize: "0.9rem",
                                borderBottom: "2px solid #8b7355",
                                textAlign: "center",
                                width: "20%",
                              }}
                            >
                              d20
                            </TableCell>
                            <TableCell
                              sx={{
                                backgroundColor: "rgba(139, 115, 85, 0.5)",
                                color: "#d4af37",
                                fontWeight: "bold",
                                fontSize: "0.9rem",
                                borderBottom: "2px solid #8b7355",
                              }}
                            >
                              Resultado
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                fontWeight: "bold",
                                borderBottom: "1px solid #8b7355",
                                textAlign: "center",
                              }}
                            >
                              1
                            </TableCell>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                borderBottom: "1px solid #8b7355",
                              }}
                            >
                              <strong>Morto.</strong> O líder caiu. Para sempre.
                              Veja as regras de Novos Recrutas para
                              substituí-lo.
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                fontWeight: "bold",
                                borderBottom: "1px solid #8b7355",
                                textAlign: "center",
                              }}
                            >
                              2-4
                            </TableCell>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                borderBottom: "1px solid #8b7355",
                              }}
                            >
                              <strong>Ferimento Permanente.</strong> A figura
                              sofre um ferimento que nunca cicatriza
                              completamente. Role na Tabela de Ferimentos
                              Permanentes abaixo para determinar a natureza
                              exata do ferimento. A figura retorna para o
                              próximo jogo com Vigor completo — mas nunca mais
                              será a mesma.
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                fontWeight: "bold",
                                borderBottom: "1px solid #8b7355",
                                textAlign: "center",
                              }}
                            >
                              5-6
                            </TableCell>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                borderBottom: "1px solid #8b7355",
                              }}
                            >
                              <strong>Gravemente Ferido.</strong> A figura
                              recebeu ferimentos que levarão tempo para curar. O
                              jogador escolhe: gastar{" "}
                              <strong>
                                75 coroas em ervas medicinais especializadas
                              </strong>{" "}
                              (e a figura joga o próximo jogo normalmente), ou a
                              figura começa o próximo jogo com{" "}
                              <strong>-5 de Vigor</strong>. Cura rápida custa
                              caro.
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                fontWeight: "bold",
                                borderBottom: "1px solid #8b7355",
                                textAlign: "center",
                              }}
                            >
                              7-8
                            </TableCell>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                borderBottom: "1px solid #8b7355",
                              }}
                            >
                              <strong>Por um Triz.</strong> A figura escapa sem
                              ferimentos maiores. Contudo, perde{" "}
                              <strong>
                                todos os itens que estava carregando
                              </strong>
                              . Perdidos nos escombros, roubados por
                              saqueadores, ou simplesmente esquecidos no caos da
                              retirada.
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                fontWeight: "bold",
                                borderBottom: "none",
                                textAlign: "center",
                              }}
                            >
                              9-20
                            </TableCell>
                            <TableCell
                              sx={{ color: "#d4c4a8", borderBottom: "none" }}
                            >
                              <strong>Recuperação Completa.</strong> Os
                              ferimentos provam ser relativamente menores. A
                              figura retorna para o próximo jogo com Vigor
                              completo. Sorte. Resistência. Ou talvez os deuses
                              ainda não terminaram com ela.
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>

                  {/* Ferimentos Permanentes */}
                  <Box
                    sx={{
                      mt: 5,
                      mb: 4,
                      p: 4,
                      backgroundColor: "rgba(75, 0, 0, 0.2)",
                      border: "3px solid #8b4513",
                      borderRadius: "4px",
                    }}
                  >
                    <PowerListTitle
                      sx={{
                        fontSize: "1.3rem",
                        mb: 3,
                        mt: 0,
                        color: "#d4af37",
                      }}
                    >
                      Tabela de Ferimentos Permanentes
                    </PowerListTitle>

                    <ParchmentText sx={{ mb: 3, fontStyle: "italic" }}>
                      Quando uma figura recebe um ferimento permanente, ele deve
                      ser listado nas anotações daquela figura na sua ficha de
                      campanha. Estas são as cicatrizes que nunca curam, os
                      lembretes físicos de que Mordheim não perdoa.
                    </ParchmentText>

                    <TableContainer
                      component={Paper}
                      sx={{
                        backgroundColor: "rgba(28, 24, 18, 0.8)",
                        border: "2px solid #8b7355",
                      }}
                    >
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell
                              sx={{
                                backgroundColor: "rgba(139, 115, 85, 0.5)",
                                color: "#d4af37",
                                fontWeight: "bold",
                                fontSize: "1rem",
                                borderBottom: "2px solid #8b7355",
                                width: "15%",
                              }}
                            >
                              d20
                            </TableCell>
                            <TableCell
                              sx={{
                                backgroundColor: "rgba(139, 115, 85, 0.5)",
                                color: "#d4af37",
                                fontWeight: "bold",
                                fontSize: "1rem",
                                borderBottom: "2px solid #8b7355",
                              }}
                            >
                              Ferimento
                            </TableCell>
                            <TableCell
                              sx={{
                                backgroundColor: "rgba(139, 115, 85, 0.5)",
                                color: "#d4af37",
                                fontWeight: "bold",
                                fontSize: "1rem",
                                borderBottom: "2px solid #8b7355",
                              }}
                            >
                              Efeito
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                fontWeight: "bold",
                                borderBottom: "1px solid #8b7355",
                              }}
                            >
                              1-2
                            </TableCell>
                            <TableCell
                              sx={{
                                color: "#d4af37",
                                fontWeight: "bold",
                                borderBottom: "1px solid #8b7355",
                              }}
                            >
                              Dedos do Pé Perdidos
                            </TableCell>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                borderBottom: "1px solid #8b7355",
                              }}
                            >
                              -1 permanente em Movimento. Pode ser recebido duas
                              vezes (cumulativo -2). Rolagem adicional deve ser
                              rerolada. Difícil correr quando seus pés são só
                              tocos.
                            </TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                fontWeight: "bold",
                                borderBottom: "1px solid #8b7355",
                              }}
                            >
                              3-5
                            </TableCell>
                            <TableCell
                              sx={{
                                color: "#d4af37",
                                fontWeight: "bold",
                                borderBottom: "1px solid #8b7355",
                              }}
                            >
                              Perna Destroçada
                            </TableCell>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                borderBottom: "1px solid #8b7355",
                              }}
                            >
                              -2 permanentes em Movimento. Pode ser recebido
                              duas vezes (cumulativo -4). Rolagem adicional deve
                              ser rerolada. Mancar é melhor que rastejar. Mal.
                            </TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                fontWeight: "bold",
                                borderBottom: "1px solid #8b7355",
                              }}
                            >
                              6-10
                            </TableCell>
                            <TableCell
                              sx={{
                                color: "#d4af37",
                                fontWeight: "bold",
                                borderBottom: "1px solid #8b7355",
                              }}
                            >
                              Braço Esmagado
                            </TableCell>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                borderBottom: "1px solid #8b7355",
                              }}
                            >
                              -1 permanente em Ímpeto. Pode ser recebido duas
                              vezes (cumulativo -2). Rolagem adicional deve ser
                              rerolada. O aço ainda pesa o mesmo. O braço é que
                              não levanta igual.
                            </TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                fontWeight: "bold",
                                borderBottom: "1px solid #8b7355",
                              }}
                            >
                              11-12
                            </TableCell>
                            <TableCell
                              sx={{
                                color: "#d4af37",
                                fontWeight: "bold",
                                borderBottom: "1px solid #8b7355",
                              }}
                            >
                              Dedos Perdidos
                            </TableCell>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                borderBottom: "1px solid #8b7355",
                              }}
                            >
                              -1 permanente em Precisão. Pode ser recebido duas
                              vezes (cumulativo -2). Rolagem adicional deve ser
                              rerolada. Mirar é difícil quando você conta nos
                              dedos e chega a sete.
                            </TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                fontWeight: "bold",
                                borderBottom: "1px solid #8b7355",
                              }}
                            >
                              13-14
                            </TableCell>
                            <TableCell
                              sx={{
                                color: "#d4af37",
                                fontWeight: "bold",
                                borderBottom: "1px solid #8b7355",
                              }}
                            >
                              Nunca Mais Tão Forte
                            </TableCell>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                borderBottom: "1px solid #8b7355",
                              }}
                            >
                              -2 permanentes em Vigor. Pode ser recebido duas
                              vezes (cumulativo -4). Rolagem adicional deve ser
                              rerolada. Os órgãos cicatrizam. Mas nunca da mesma
                              forma.
                            </TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                fontWeight: "bold",
                                borderBottom: "1px solid #8b7355",
                              }}
                            >
                              15-16
                            </TableCell>
                            <TableCell
                              sx={{
                                color: "#d4af37",
                                fontWeight: "bold",
                                borderBottom: "1px solid #8b7355",
                              }}
                            >
                              Cicatrizes Psicológicas
                            </TableCell>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                borderBottom: "1px solid #8b7355",
                              }}
                            >
                              -1 permanente em Vontade. Pode ser recebido duas
                              vezes (cumulativo -2). Rolagem adicional deve ser
                              rerolada. Os pesadelos nunca param. As mãos nunca
                              param de tremer.
                            </TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                fontWeight: "bold",
                                borderBottom: "1px solid #8b7355",
                              }}
                            >
                              17-18
                            </TableCell>
                            <TableCell
                              sx={{
                                color: "#d4af37",
                                fontWeight: "bold",
                                borderBottom: "1px solid #8b7355",
                              }}
                            >
                              Ferimento Persistente
                            </TableCell>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                borderBottom: "1px solid #8b7355",
                              }}
                            >
                              Gaste 20 coroas antes de cada jogo ou comece com
                              -3 de Vigor. Pode ser recebido duas vezes (40
                              coroas ou -4 Vigor). Dor crônica tem preço
                              crônico.
                            </TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                fontWeight: "bold",
                                borderBottom: "1px solid #8b7355",
                              }}
                            >
                              19
                            </TableCell>
                            <TableCell
                              sx={{
                                color: "#d4af37",
                                fontWeight: "bold",
                                borderBottom: "1px solid #8b7355",
                              }}
                            >
                              Maxilar Destroçado
                            </TableCell>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                borderBottom: "1px solid #8b7355",
                              }}
                            >
                              Herói ativa apenas 2 soldados (ao invés de 3).
                              Campeão ativa apenas 1 soldado (ao invés de 2).
                              Ordens murmuradas através de dentes quebrados
                              raramente inspiram.
                            </TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                fontWeight: "bold",
                                borderBottom: "none",
                              }}
                            >
                              20
                            </TableCell>
                            <TableCell
                              sx={{
                                color: "#d4af37",
                                fontWeight: "bold",
                                borderBottom: "none",
                              }}
                            >
                              Olho Perdido
                            </TableCell>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                borderBottom: "none",
                              }}
                            >
                              -1 em Ímpeto quando alvo de ataque à distância.
                              Duas vezes = cego permanentemente, retire da
                              campanha. Difícil lutar nas sombras quando você
                              não vê nem a luz.
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>

                  {/* Nota sobre Stats Divididas */}
                  <Box
                    sx={{
                      mt: 4,
                      p: 3,
                      backgroundColor: "rgba(212, 175, 55, 0.1)",
                      border: "2px solid #d4af37",
                      borderRadius: "4px",
                    }}
                  >
                    <PowerListTitle sx={{ fontSize: "1.1rem", mb: 2, mt: 0 }}>
                      Registrando Ferimentos Permanentes
                    </PowerListTitle>

                    <ParchmentText>
                      Quando uma figura recebe um ferimento que causa diminuição
                      em um de seus atributos, escreva como{" "}
                      <strong>atributo dividido</strong>. Por exemplo: um herói
                      com Ímpeto +3 que sofre Braço Esmagado agora tem Ímpeto{" "}
                      <strong>+3/+2</strong>. O primeiro número é a habilidade
                      real (para determinar potencial máximo e nível). O segundo
                      número é a capacidade física atual (para todas as
                      rolagens). Lembre-se: em Mordheim, o que você era importa
                      menos do que o que você é agora.
                    </ParchmentText>
                  </Box>
                </Box>

                {/* 2. Magias e Poderes Fora de Jogo */}
                <Box sx={{ mb: 6 }} id="magias-e-poderes-fora-de-jogo">
                  <PowerListTitle sx={{ fontSize: "1.3rem", mb: 3 }}>
                    2. Magias e Poderes Fora de Jogo
                  </PowerListTitle>

                  <ParchmentText sx={{ mb: 3 }}>
                    Nem toda magia é conjurada no calor da batalha. Algumas
                    magias e poderes são rituais lentos, cuidadosos, realizados
                    no silêncio relativo após a carnificina. Estas são as{" "}
                    <strong>magias e poderes Fora de Jogo (A)</strong> —
                    marcados com o designador <strong>(A)</strong> em suas
                    descrições.
                  </ParchmentText>

                  <Box
                    sx={{
                      mb: 3,
                      p: 3,
                      backgroundColor: "rgba(139, 115, 85, 0.1)",
                      borderLeft: "4px solid #8b7355",
                    }}
                  >
                    <ParchmentText sx={{ mb: 2 }}>
                      <strong>Quando Podem Ser Usadas:</strong> Estas magias e
                      poderes podem ser tentadas apenas{" "}
                      <strong>após um jogo</strong>, durante esta fase da
                      Sequência Pós Jogo. O momento de calma (relativa) para
                      trabalhos mais delicados ou extensos.
                    </ParchmentText>

                    <ParchmentText sx={{ mb: 2 }}>
                      <strong>Limitação de Uso:</strong> Os usuários dessas
                      magias e poderes podem tentar usar cada uma apenas{" "}
                      <strong>uma vez</strong> nesta fase. Uma tentativa. Um
                      resultado. Acerte ou erre, mas não há segunda chance até o
                      próximo jogo.
                    </ParchmentText>

                    <ParchmentText sx={{ mb: 2 }}>
                      <strong>Não Podem Ser Forçadas:</strong> Estas magias e
                      poderes <strong>não podem ser Forçados</strong>. Você não
                      pode gastar vida adicional para melhorar a rolagem. O
                      ritual é o que é — sangue extra não ajuda quando você tem
                      tempo para fazer direito.
                    </ParchmentText>

                    <ParchmentText>
                      <strong>Sem Dano por Falha:</strong> Nenhum dano é tomado
                      por falhar em usar estas magias ou poderes. O custo da
                      falha é apenas tempo desperdiçado e oportunidade perdida.
                      Pequeno consolo, mas melhor que sangrar.
                    </ParchmentText>
                  </Box>

                  {/* Exemplo */}
                  <Box
                    sx={{
                      mt: 4,
                      p: 3,
                      backgroundColor: "rgba(75, 0, 0, 0.15)",
                      border: "2px solid #8b4513",
                      borderRadius: "4px",
                    }}
                  >
                    <ParchmentText
                      sx={{ fontStyle: "italic", fontSize: "0.95rem" }}
                    >
                      Após a batalha, Maximilian retornou ao acampamento. Seus
                      homens cuidavam dos feridos. Ele, por sua vez, abriu seu
                      grimório e tentou "Ritual de Cura Maior" (A) — uma magia
                      que só funciona fora de combate. Rolou 14 contra CD 12.
                      Sucesso. Sem dano tomado, sem forçar necessário. Apenas
                      tempo, conhecimento, e as palavras certas. Um dos soldados
                      gravemente feridos recuperou-se quase completamente.
                    </ParchmentText>
                  </Box>
                </Box>

                {/* 3. Enviar Líderes às Ruínas */}
                <Box sx={{ mb: 6 }} id="enviar-lideres-as-ruinas">
                  <PowerListTitle sx={{ fontSize: "1.3rem", mb: 3 }}>
                    3. Enviar Líderes às Ruínas
                  </PowerListTitle>

                  <ParchmentText sx={{ mb: 3 }}>
                    A batalha acabou, mas Mordheim nunca dorme. Entre os
                    confrontos sangrentos, há oportunidades para os corajosos —
                    ou tolos — explorarem as ruínas. Tesouros esquecidos.
                    Encontros inesperados. Horrores escondidos. Esta é a fase
                    onde líderes ganham lendas... ou encontram fins esquecidos.
                  </ParchmentText>

                  <Box
                    sx={{
                      mb: 3,
                      p: 3,
                      backgroundColor: "rgba(139, 115, 85, 0.1)",
                      borderLeft: "4px solid #8b7355",
                    }}
                  >
                    <PowerListTitle sx={{ fontSize: "1.1rem", mb: 2, mt: 0 }}>
                      O Ritual da Exploração
                    </PowerListTitle>

                    <ParchmentText sx={{ mb: 2 }}>
                      O bando pode enviar seu <strong>herói e campeão</strong>{" "}
                      para explorar as ruínas. Para cada líder enviado, role{" "}
                      <strong>2d20</strong> e confira na{" "}
                      <Box
                        component="span"
                        onClick={() => navigate("/exploration")}
                        sx={{
                          color: "#d4af37",
                          cursor: "pointer",
                          textDecoration: "underline",
                          "&:hover": { color: "#f4cf57" },
                        }}
                      >
                        Tabela de Eventos de Exploração
                      </Box>
                      . O que o destino reserva? Riqueza? Ruína? Ambos?
                    </ParchmentText>

                    <ParchmentText sx={{ mb: 2 }}>
                      Resolva o evento rolado completamente — suas recompensas,
                      seus perigos, suas consequências. Cada evento é uma
                      pequena história dentro da história maior. Alguns concedem
                      tesouros. Outros concedem cicatrizes. A maioria concede
                      ambos.
                    </ParchmentText>

                    <ParchmentText>
                      <strong>Os Soldados:</strong> Soldados vão junto com seus
                      líderes, sendo coordenados para ajudá-los na exploração.
                      Eles carregam tochas, vigiam becos escuros, e morrem
                      primeiro quando as coisas dão errado. Contudo, soldados{" "}
                      <strong>não fazem rolagens</strong> — eles estão lá para
                      suporte, não protagonismo. Os líderes lideram. Os soldados
                      seguem. E às vezes sangram.
                    </ParchmentText>
                  </Box>

                  {/* Exemplo */}
                  <Box
                    sx={{
                      mt: 4,
                      p: 3,
                      backgroundColor: "rgba(75, 0, 0, 0.15)",
                      border: "2px solid #8b4513",
                      borderRadius: "4px",
                    }}
                  >
                    <PowerListTitle
                      sx={{
                        fontSize: "1.1rem",
                        mb: 2,
                        mt: 0,
                        color: "#d4af37",
                      }}
                    >
                      Exemplo: Klaus Explora
                    </PowerListTitle>

                    <ParchmentText
                      sx={{ fontStyle: "italic", fontSize: "0.95rem", mb: 2 }}
                    >
                      Klaus decidiu explorar. Levou dois soldados — Johann e
                      Wilhelm — como suporte. Rolou 2d20: 8 e 12, total 20.
                      Consultou a tabela de exploração: "Encontro com Mercadores
                      Sombrios". O evento especificava um teste de Vontade CD
                      12.
                    </ParchmentText>

                    <ParchmentText
                      sx={{ fontStyle: "italic", fontSize: "0.95rem", mb: 2 }}
                    >
                      Klaus rolou. Os soldados apenas observaram — eles não
                      fazem rolagens em exploração. Klaus passou no teste.
                      Conseguiu comprar uma poção rara por metade do preço.
                      Johann e Wilhelm carregaram a poção de volta. Trabalho
                      honesto para homens desonestos.
                    </ParchmentText>

                    <ParchmentText
                      sx={{ fontStyle: "italic", fontSize: "0.95rem" }}
                    >
                      Depois, Klaus enviou Gottfried, seu campeão. Mais 2d20: 3
                      e 19, total 22. Outro evento. Outro risco. Gottfried levou
                      um soldado diferente. A exploração é individual — cada
                      líder tem sua própria história para contar. Ou não contar,
                      se as coisas derem muito errado.
                    </ParchmentText>
                  </Box>
                </Box>

                {/* 4. Experiência e Nível */}
                <Box sx={{ mb: 6 }} id="experiencia-e-nivel">
                  <PowerListTitle sx={{ fontSize: "1.3rem", mb: 3 }}>
                    4. Experiência e Nível
                  </PowerListTitle>

                  <ParchmentText sx={{ mb: 4 }}>
                    Aqueles que sobrevivem aprendem. Aqueles que aprendem
                    prosperam. Após cada jogo, heróis, campeões e soldados
                    ganham experiência — o conhecimento duramente conquistado
                    que separa veteranos de cadáveres. Cada cicatriz ensina.
                    Cada vitória fortalece. Cada sobrevivência conta.
                  </ParchmentText>

                  {/* Experiência de Heróis */}
                  <Box
                    sx={{
                      mb: 4,
                      p: 3,
                      backgroundColor: "rgba(139, 115, 85, 0.1)",
                      border: "2px solid #d4af37",
                      borderRadius: "4px",
                    }}
                  >
                    <PowerListTitle sx={{ fontSize: "1.1rem", mb: 3, mt: 0 }}>
                      Experiência de Heróis
                    </PowerListTitle>

                    <TableContainer
                      component={Paper}
                      sx={{
                        backgroundColor: "rgba(28, 24, 18, 0.8)",
                        border: "2px solid #8b7355",
                      }}
                    >
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell
                              sx={{
                                backgroundColor: "rgba(139, 115, 85, 0.5)",
                                color: "#d4af37",
                                fontWeight: "bold",
                                fontSize: "0.9rem",
                                borderBottom: "2px solid #8b7355",
                                textAlign: "center",
                                width: "20%",
                              }}
                            >
                              XP
                            </TableCell>
                            <TableCell
                              sx={{
                                backgroundColor: "rgba(139, 115, 85, 0.5)",
                                color: "#d4af37",
                                fontWeight: "bold",
                                fontSize: "0.9rem",
                                borderBottom: "2px solid #8b7355",
                              }}
                            >
                              Por
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                fontWeight: "bold",
                                borderBottom: "1px solid #8b7355",
                                textAlign: "center",
                              }}
                            >
                              +40
                            </TableCell>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                borderBottom: "1px solid #8b7355",
                              }}
                            >
                              Por cada jogo em que o herói sobrevive. Viver já é
                              vitória.
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                fontWeight: "bold",
                                borderBottom: "1px solid #8b7355",
                                textAlign: "center",
                              }}
                            >
                              +60
                            </TableCell>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                borderBottom: "1px solid #8b7355",
                              }}
                            >
                              Se o herói ou seu bando captura o fragmento
                              central de Pedra-bruxa. O maior prêmio para o
                              maior risco.
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                fontWeight: "bold",
                                borderBottom: "1px solid #8b7355",
                                textAlign: "center",
                              }}
                            >
                              +40
                            </TableCell>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                borderBottom: "1px solid #8b7355",
                              }}
                            >
                              Para cada fragmento de Pedra-bruxa normal
                              capturado pelo herói ou seu bando. Ganância
                              recompensada.
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                fontWeight: "bold",
                                borderBottom: "1px solid #8b7355",
                                textAlign: "center",
                              }}
                            >
                              +5
                              <br />
                              +20
                              <br />
                              +10
                            </TableCell>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                borderBottom: "1px solid #8b7355",
                              }}
                            >
                              Para cada criatura ou membro de bando inimigo que
                              o herói pessoalmente retire do jogo.{" "}
                              <strong>+20 XP se for herói inimigo</strong>,{" "}
                              <strong>+10 XP se for campeão inimigo</strong>.
                              Matar líderes vale mais que matar massa.
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                fontWeight: "bold",
                                borderBottom: "1px solid #8b7355",
                                textAlign: "center",
                              }}
                            >
                              +5
                            </TableCell>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                borderBottom: "1px solid #8b7355",
                              }}
                            >
                              Para cada tentativa falhada de conjurar um feitiço
                              que resulte em dano ao herói. Até falhas ensinam.
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                fontWeight: "bold",
                                borderBottom: "none",
                                textAlign: "center",
                              }}
                            >
                              +10
                            </TableCell>
                            <TableCell
                              sx={{ color: "#d4c4a8", borderBottom: "none" }}
                            >
                              Para cada feitiço conjurado com sucesso pelo
                              herói. Poder controlado é lição aprendida.
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>

                  {/* Experiência de Campeões */}
                  <Box
                    sx={{
                      mb: 4,
                      p: 3,
                      backgroundColor: "rgba(139, 115, 85, 0.1)",
                      border: "2px solid #c4a870",
                      borderRadius: "4px",
                    }}
                  >
                    <PowerListTitle sx={{ fontSize: "1.1rem", mb: 3, mt: 0 }}>
                      Experiência de Campeões
                    </PowerListTitle>

                    <TableContainer
                      component={Paper}
                      sx={{
                        backgroundColor: "rgba(28, 24, 18, 0.8)",
                        border: "2px solid #8b7355",
                      }}
                    >
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell
                              sx={{
                                backgroundColor: "rgba(139, 115, 85, 0.5)",
                                color: "#d4af37",
                                fontWeight: "bold",
                                fontSize: "0.9rem",
                                borderBottom: "2px solid #8b7355",
                                textAlign: "center",
                                width: "20%",
                              }}
                            >
                              XP
                            </TableCell>
                            <TableCell
                              sx={{
                                backgroundColor: "rgba(139, 115, 85, 0.5)",
                                color: "#d4af37",
                                fontWeight: "bold",
                                fontSize: "0.9rem",
                                borderBottom: "2px solid #8b7355",
                              }}
                            >
                              Por
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                fontWeight: "bold",
                                borderBottom: "1px solid #8b7355",
                                textAlign: "center",
                              }}
                            >
                              +60
                            </TableCell>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                borderBottom: "1px solid #8b7355",
                              }}
                            >
                              Por sobreviver ao jogo. Campeões precisam
                              trabalhar mais duro para provar seu valor.
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                fontWeight: "bold",
                                borderBottom: "1px solid #8b7355",
                                textAlign: "center",
                              }}
                            >
                              +5
                              <br />
                              +20
                              <br />
                              +10
                            </TableCell>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                borderBottom: "1px solid #8b7355",
                              }}
                            >
                              Para cada criatura ou membro de bando inimigo que
                              o campeão pessoalmente retire do jogo.{" "}
                              <strong>+20 XP se for herói inimigo</strong>,{" "}
                              <strong>+10 XP se for campeão inimigo</strong>. A
                              mesma matemática sangrenta.
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                fontWeight: "bold",
                                borderBottom: "1px solid #8b7355",
                                textAlign: "center",
                              }}
                            >
                              +5
                            </TableCell>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                borderBottom: "1px solid #8b7355",
                              }}
                            >
                              Para cada tentativa falhada de conjurar um feitiço
                              que resulte em dano ao campeão. Aprender através
                              da dor.
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                fontWeight: "bold",
                                borderBottom: "none",
                                textAlign: "center",
                              }}
                            >
                              +10
                            </TableCell>
                            <TableCell
                              sx={{ color: "#d4c4a8", borderBottom: "none" }}
                            >
                              Para cada feitiço conjurado com sucesso pelo
                              campeão. Menos que heróis ganham, mas ainda assim
                              ganham.
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>

                  {/* Experiência de Soldados */}
                  <Box
                    sx={{
                      mb: 4,
                      p: 3,
                      backgroundColor: "rgba(139, 115, 85, 0.1)",
                      border: "2px solid #8b4513",
                      borderRadius: "4px",
                    }}
                  >
                    <PowerListTitle sx={{ fontSize: "1.1rem", mb: 3, mt: 0 }}>
                      Experiência de Soldados
                    </PowerListTitle>

                    <TableContainer
                      component={Paper}
                      sx={{
                        backgroundColor: "rgba(28, 24, 18, 0.8)",
                        border: "2px solid #8b7355",
                      }}
                    >
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell
                              sx={{
                                backgroundColor: "rgba(139, 115, 85, 0.5)",
                                color: "#d4af37",
                                fontWeight: "bold",
                                fontSize: "0.9rem",
                                borderBottom: "2px solid #8b7355",
                                textAlign: "center",
                                width: "20%",
                              }}
                            >
                              XP
                            </TableCell>
                            <TableCell
                              sx={{
                                backgroundColor: "rgba(139, 115, 85, 0.5)",
                                color: "#d4af37",
                                fontWeight: "bold",
                                fontSize: "0.9rem",
                                borderBottom: "2px solid #8b7355",
                              }}
                            >
                              Por
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                fontWeight: "bold",
                                borderBottom: "1px solid #8b7355",
                                textAlign: "center",
                              }}
                            >
                              +50
                            </TableCell>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                borderBottom: "1px solid #8b7355",
                              }}
                            >
                              Por sobreviver ao jogo. Para soldados, cada dia
                              acima da terra é triunfo.
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                fontWeight: "bold",
                                borderBottom: "1px solid #8b7355",
                                textAlign: "center",
                              }}
                            >
                              +60
                            </TableCell>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                borderBottom: "1px solid #8b7355",
                              }}
                            >
                              Se esta figura capturou o fragmento central de
                              Pedra-bruxa. Glória rara para os comuns.
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                fontWeight: "bold",
                                borderBottom: "1px solid #8b7355",
                                textAlign: "center",
                              }}
                            >
                              +40
                            </TableCell>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                borderBottom: "1px solid #8b7355",
                              }}
                            >
                              Para cada fragmento de Pedra-bruxa capturado por
                              esta criatura. A ganância tem suas recompensas.
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                fontWeight: "bold",
                                borderBottom: "none",
                                textAlign: "center",
                              }}
                            >
                              +5
                              <br />
                              +20
                              <br />
                              +10
                            </TableCell>
                            <TableCell
                              sx={{ color: "#d4c4a8", borderBottom: "none" }}
                            >
                              Para cada criatura ou membro de bando inimigo que
                              o soldado pessoalmente retire do jogo.{" "}
                              <strong>+20 XP se for herói inimigo</strong>,{" "}
                              <strong>+10 XP se for campeão inimigo</strong>.
                              Mesmo soldados podem derrubar gigantes... às
                              vezes.
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>

                  {/* Nota sobre XP */}
                  <Box
                    sx={{
                      mt: 4,
                      p: 3,
                      backgroundColor: "rgba(212, 175, 55, 0.1)",
                      border: "2px solid #d4af37",
                      borderRadius: "4px",
                    }}
                  >
                    <ParchmentText sx={{ fontStyle: "italic" }}>
                      "Experiência não é apenas números em papel. É o tremor na
                      mão que sabe quando um golpe vem. É o instinto que te faz
                      pular antes da lâmina cair. É a diferença entre novatos
                      que morrem e veteranos que sobrevivem. Conte sua
                      experiência. Acumule-a. Cada ponto foi pago em sangue —
                      seu ou de outros."
                    </ParchmentText>
                  </Box>

                  {/* Subir de Nível */}
                  <Box
                    sx={{
                      mt: 5,
                      mb: 4,
                      p: 4,
                      backgroundColor: "rgba(139, 115, 85, 0.15)",
                      border: "3px solid #d4af37",
                      borderRadius: "4px",
                    }}
                  >
                    <PowerListTitle sx={{ fontSize: "1.3rem", mb: 3, mt: 0 }}>
                      Subir de Nível — Forjado pela Ruína
                    </PowerListTitle>

                    <ParchmentText sx={{ mb: 3 }}>
                      Ao alcançar <strong>100 de XP</strong>, uma figura pode
                      subir de nível. Cem pontos de experiência duramente
                      conquistados se transformam em poder tangível. A figura se
                      torna mais forte, mais hábil, mais letal. Ou simplesmente
                      aprende a não morrer tão facilmente. Ambos são valiosos.
                    </ParchmentText>

                    <ParchmentText sx={{ mb: 3 }}>
                      Ao subir de nível, a figura ganha{" "}
                      <strong>um avanço</strong>. Uma melhoria permanente. Uma
                      evolução comprada com sangue e sobrevivência. Escolha
                      sabiamente — estas escolhas definem se você se tornará
                      lenda ou apenas mais um nome esquecido. Mesmo que uma
                      figura suba dois niveis em uma unica sequencia pós jogo,
                      cada um dos avanços só pode ser escolhido uma vez. Um
                      soldado nunca pode subir mais de 10 niveis.
                    </ParchmentText>

                    <PowerListTitle sx={{ fontSize: "1.1rem", mb: 2 }}>
                      Opções de Avanço
                    </PowerListTitle>

                    <Box sx={{ pl: 2, mb: 2 }}>
                      <ParchmentText>
                        <strong>1. Aumentar um Atributo:</strong> Aumente um dos
                        atributos da figura (+1 Movimento, +1 Ímpeto, +1
                        Precisão, +1 Armadura, +1 Vontade ou +2 Vigor) seguindo
                        os limites raciais de cada raça na tabela abaixo. Mesmo
                        que uma figura consiga fazer dois avanços de uma vez,
                        ela só pode aumentar atributos uma vez. Mais forte. Mais
                        rápido. Mais resistente.
                      </ParchmentText>
                    </Box>

                    {/* Tabela de Limites Raciais */}
                    <Box
                      sx={{
                        mt: 3,
                        mb: 3,
                        p: 3,
                        backgroundColor: "rgba(20, 18, 14, 0.5)",
                        border: "2px solid #8b7355",
                        borderRadius: "4px",
                      }}
                    >
                      <PowerListTitle sx={{ fontSize: "1.1rem", mb: 2, mt: 0 }}>
                        Limites Raciais de Atributos
                      </PowerListTitle>

                      <ParchmentText sx={{ mb: 2, fontSize: "0.9rem" }}>
                        Cada raça tem seus limites naturais. Anões nunca serão
                        rápidos. Elfos nunca serão robustos. Orcs nunca serão
                        atiradores. A genética é destino, mesmo em Mordheim.
                      </ParchmentText>

                      <TableContainer
                        component={Paper}
                        sx={{
                          backgroundColor: "rgba(28, 24, 18, 0.8)",
                          border: "2px solid #8b7355",
                        }}
                      >
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell
                                sx={{
                                  backgroundColor: "rgba(139, 115, 85, 0.5)",
                                  color: "#d4af37",
                                  fontWeight: "bold",
                                  fontSize: "0.9rem",
                                  borderBottom: "2px solid #8b7355",
                                  textAlign: "center",
                                }}
                              >
                                Raça
                              </TableCell>
                              <TableCell
                                sx={{
                                  backgroundColor: "rgba(139, 115, 85, 0.5)",
                                  color: "#d4af37",
                                  fontWeight: "bold",
                                  fontSize: "0.9rem",
                                  borderBottom: "2px solid #8b7355",
                                  textAlign: "center",
                                }}
                              >
                                Movimento
                              </TableCell>
                              <TableCell
                                sx={{
                                  backgroundColor: "rgba(139, 115, 85, 0.5)",
                                  color: "#d4af37",
                                  fontWeight: "bold",
                                  fontSize: "0.9rem",
                                  borderBottom: "2px solid #8b7355",
                                  textAlign: "center",
                                }}
                              >
                                Ímpeto
                              </TableCell>
                              <TableCell
                                sx={{
                                  backgroundColor: "rgba(139, 115, 85, 0.5)",
                                  color: "#d4af37",
                                  fontWeight: "bold",
                                  fontSize: "0.9rem",
                                  borderBottom: "2px solid #8b7355",
                                  textAlign: "center",
                                }}
                              >
                                Precisão
                              </TableCell>
                              <TableCell
                                sx={{
                                  backgroundColor: "rgba(139, 115, 85, 0.5)",
                                  color: "#d4af37",
                                  fontWeight: "bold",
                                  fontSize: "0.9rem",
                                  borderBottom: "2px solid #8b7355",
                                  textAlign: "center",
                                }}
                              >
                                Vigor
                              </TableCell>
                              <TableCell
                                sx={{
                                  backgroundColor: "rgba(139, 115, 85, 0.5)",
                                  color: "#d4af37",
                                  fontWeight: "bold",
                                  fontSize: "0.9rem",
                                  borderBottom: "2px solid #8b7355",
                                  textAlign: "center",
                                }}
                              >
                                Vontade
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow>
                              <TableCell
                                sx={{
                                  color: "#d4af37",
                                  fontWeight: "bold",
                                  borderBottom: "1px solid #8b7355",
                                  textAlign: "center",
                                }}
                              >
                                Humano
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: "#d4c4a8",
                                  borderBottom: "1px solid #8b7355",
                                  textAlign: "center",
                                }}
                              >
                                8
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: "#d4c4a8",
                                  borderBottom: "1px solid #8b7355",
                                  textAlign: "center",
                                }}
                              >
                                +5
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: "#d4c4a8",
                                  borderBottom: "1px solid #8b7355",
                                  textAlign: "center",
                                }}
                              >
                                +5
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: "#d4c4a8",
                                  borderBottom: "1px solid #8b7355",
                                  textAlign: "center",
                                }}
                              >
                                20
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: "#d4c4a8",
                                  borderBottom: "1px solid #8b7355",
                                  textAlign: "center",
                                }}
                              >
                                +8
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell
                                sx={{
                                  color: "#d4af37",
                                  fontWeight: "bold",
                                  borderBottom: "1px solid #8b7355",
                                  textAlign: "center",
                                }}
                              >
                                Anão
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: "#d4c4a8",
                                  borderBottom: "1px solid #8b7355",
                                  textAlign: "center",
                                }}
                              >
                                4
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: "#d4c4a8",
                                  borderBottom: "1px solid #8b7355",
                                  textAlign: "center",
                                }}
                              >
                                +6
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: "#d4c4a8",
                                  borderBottom: "1px solid #8b7355",
                                  textAlign: "center",
                                }}
                              >
                                +3
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: "#d4c4a8",
                                  borderBottom: "1px solid #8b7355",
                                  textAlign: "center",
                                }}
                              >
                                26
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: "#d4c4a8",
                                  borderBottom: "1px solid #8b7355",
                                  textAlign: "center",
                                }}
                              >
                                +10
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell
                                sx={{
                                  color: "#d4af37",
                                  fontWeight: "bold",
                                  borderBottom: "1px solid #8b7355",
                                  textAlign: "center",
                                }}
                              >
                                Elfo
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: "#d4c4a8",
                                  borderBottom: "1px solid #8b7355",
                                  textAlign: "center",
                                }}
                              >
                                10
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: "#d4c4a8",
                                  borderBottom: "1px solid #8b7355",
                                  textAlign: "center",
                                }}
                              >
                                +6
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: "#d4c4a8",
                                  borderBottom: "1px solid #8b7355",
                                  textAlign: "center",
                                }}
                              >
                                +6
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: "#d4c4a8",
                                  borderBottom: "1px solid #8b7355",
                                  textAlign: "center",
                                }}
                              >
                                18
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: "#d4c4a8",
                                  borderBottom: "1px solid #8b7355",
                                  textAlign: "center",
                                }}
                              >
                                +12
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell
                                sx={{
                                  color: "#d4af37",
                                  fontWeight: "bold",
                                  borderBottom: "1px solid #8b7355",
                                  textAlign: "center",
                                }}
                              >
                                Orc
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: "#d4c4a8",
                                  borderBottom: "1px solid #8b7355",
                                  textAlign: "center",
                                }}
                              >
                                6
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: "#d4c4a8",
                                  borderBottom: "1px solid #8b7355",
                                  textAlign: "center",
                                }}
                              >
                                +6
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: "#d4c4a8",
                                  borderBottom: "1px solid #8b7355",
                                  textAlign: "center",
                                }}
                              >
                                +0
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: "#d4c4a8",
                                  borderBottom: "1px solid #8b7355",
                                  textAlign: "center",
                                }}
                              >
                                22
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: "#d4c4a8",
                                  borderBottom: "1px solid #8b7355",
                                  textAlign: "center",
                                }}
                              >
                                +6
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell
                                sx={{
                                  color: "#d4af37",
                                  fontWeight: "bold",
                                  borderBottom: "1px solid #8b7355",
                                  textAlign: "center",
                                }}
                              >
                                Skaven
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: "#d4c4a8",
                                  borderBottom: "1px solid #8b7355",
                                  textAlign: "center",
                                }}
                              >
                                12
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: "#d4c4a8",
                                  borderBottom: "1px solid #8b7355",
                                  textAlign: "center",
                                }}
                              >
                                +5
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: "#d4c4a8",
                                  borderBottom: "1px solid #8b7355",
                                  textAlign: "center",
                                }}
                              >
                                +6
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: "#d4c4a8",
                                  borderBottom: "1px solid #8b7355",
                                  textAlign: "center",
                                }}
                              >
                                18
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: "#d4c4a8",
                                  borderBottom: "1px solid #8b7355",
                                  textAlign: "center",
                                }}
                              >
                                +5
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell
                                sx={{
                                  color: "#d4af37",
                                  fontWeight: "bold",
                                  borderBottom: "1px solid #8b7355",
                                  textAlign: "center",
                                }}
                              >
                                Skink
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: "#d4c4a8",
                                  borderBottom: "1px solid #8b7355",
                                  textAlign: "center",
                                }}
                              >
                                9
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: "#d4c4a8",
                                  borderBottom: "1px solid #8b7355",
                                  textAlign: "center",
                                }}
                              >
                                +5
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: "#d4c4a8",
                                  borderBottom: "1px solid #8b7355",
                                  textAlign: "center",
                                }}
                              >
                                +6
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: "#d4c4a8",
                                  borderBottom: "1px solid #8b7355",
                                  textAlign: "center",
                                }}
                              >
                                24
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: "#d4c4a8",
                                  borderBottom: "1px solid #8b7355",
                                  textAlign: "center",
                                }}
                              >
                                +6
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell
                                sx={{
                                  color: "#d4af37",
                                  fontWeight: "bold",
                                  borderBottom: "1px solid #8b7355",
                                  textAlign: "center",
                                }}
                              >
                                Saurus
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: "#d4c4a8",
                                  borderBottom: "1px solid #8b7355",
                                  textAlign: "center",
                                }}
                              >
                                8
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: "#d4c4a8",
                                  borderBottom: "1px solid #8b7355",
                                  textAlign: "center",
                                }}
                              >
                                +6
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: "#d4c4a8",
                                  borderBottom: "1px solid #8b7355",
                                  textAlign: "center",
                                }}
                              >
                                +2
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: "#d4c4a8",
                                  borderBottom: "1px solid #8b7355",
                                  textAlign: "center",
                                }}
                              >
                                26
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: "#d4c4a8",
                                  borderBottom: "1px solid #8b7355",
                                  textAlign: "center",
                                }}
                              >
                                +6
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell
                                sx={{
                                  color: "#d4af37",
                                  fontWeight: "bold",
                                  borderBottom: "none",
                                  textAlign: "center",
                                }}
                              >
                                Vampiro
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: "#d4c4a8",
                                  borderBottom: "none",
                                  textAlign: "center",
                                }}
                              >
                                8
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: "#d4c4a8",
                                  borderBottom: "none",
                                  textAlign: "center",
                                }}
                              >
                                +7
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: "#d4c4a8",
                                  borderBottom: "none",
                                  textAlign: "center",
                                }}
                              >
                                +7
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: "#d4c4a8",
                                  borderBottom: "none",
                                  textAlign: "center",
                                }}
                              >
                                30
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: "#d4c4a8",
                                  borderBottom: "none",
                                  textAlign: "center",
                                }}
                              >
                                +12
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>

                      <ParchmentText
                        sx={{ mt: 2, fontSize: "0.85rem", fontStyle: "italic" }}
                      >
                        <em>
                          Note: Vampiros superam limites mortais. Skaven correm
                          como ratos. Anões são lentos como pedras. Cada raça
                          carrega suas bênçãos e maldições na própria carne.
                        </em>
                      </ParchmentText>
                    </Box>

                    <Box sx={{ pl: 2, mb: 2 }}>
                      <ParchmentText>
                        <strong>2. Melhorar um Poder:</strong> Diminua a CD de
                        um poder conhecido em 1 (mínimo CD 2). Não pode reduzir
                        a CD de um poder que aprender nessa sequencia pós jogo.
                        Torna o impossível mais fácil. A prática aperfeiçoa, até
                        em Mordheim.
                      </ParchmentText>
                    </Box>

                    <Box sx={{ pl: 2, mb: 2 }}>
                      <ParchmentText>
                        <strong>3. Melhorar uma Magia:</strong> Diminua a CD de
                        uma magia conhecida em 1 (mínimo CD 5). Não pode reduzir
                        a CD de uma magia que aprender nessa sequencia pós jogo.
                        Palavras que antes queimavam agora fluem mais suaves.
                      </ParchmentText>
                    </Box>

                    <Box sx={{ pl: 2, mb: 2 }}>
                      <ParchmentText>
                        <strong>4. Aprender um Poder:</strong> Aprenda um novo
                        poder da lista associada para sua figura. Novos truques
                        para velhos cães de guerra. Esse poder começa com CD 6.
                        Uma figura só pode aprender um poder a cada 5 niveis.
                      </ParchmentText>
                    </Box>

                    <Box sx={{ pl: 2, mb: 2 }}>
                      <ParchmentText>
                        <strong>5. Aprender uma Magia:</strong> Aprenda uma nova
                        magia de uma tradição disponível para sua figura. Mais
                        ferramentas no arsenal arcano. Uma figura só pode
                        aprender uma magia a cada 5 niveis.
                      </ParchmentText>
                    </Box>

                    <Box sx={{ pl: 2 }}>
                      <ParchmentText>
                        <strong>6. Aprender um Truque de Combate:</strong>{" "}
                        <em>(Apenas soldados acima de nível 5)</em> Aprenda uma
                        habilidade especial de combate da tabela abaixo. Quando
                        soldados comuns vivem tempo suficiente, eles param de
                        ser comuns. Um Truque de Combate só pode ser aprendido a
                        cada 5 níveis, começando com nível 5, para um máximo de
                        2 truques de combate no nível 10.
                      </ParchmentText>
                    </Box>

                    {/* Tabela de Truques de Combate */}
                    <Box
                      sx={{
                        mt: 4,
                        mb: 3,
                        p: 3,
                        backgroundColor: "rgba(20, 18, 14, 0.5)",
                        border: "2px solid #8b4513",
                        borderRadius: "4px",
                      }}
                    >
                      <PowerListTitle sx={{ fontSize: "1.1rem", mb: 2, mt: 0 }}>
                        Tabela de Truques de Combate
                      </PowerListTitle>

                      <ParchmentText sx={{ mb: 3, fontSize: "0.9rem" }}>
                        Veteranos desenvolvem truques — pequenas técnicas que
                        separam os vivos dos mortos. Cada truque pode ser usado{" "}
                        <strong>apenas uma vez por batalha</strong>. Escolha o
                        momento certo. Não há segunda chance.
                      </ParchmentText>

                      <TableContainer
                        component={Paper}
                        sx={{
                          backgroundColor: "rgba(28, 24, 18, 0.8)",
                          border: "2px solid #8b7355",
                        }}
                      >
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell
                                sx={{
                                  backgroundColor: "rgba(139, 115, 85, 0.5)",
                                  color: "#d4af37",
                                  fontWeight: "bold",
                                  fontSize: "0.85rem",
                                  borderBottom: "2px solid #8b7355",
                                  textAlign: "center",
                                }}
                              >
                                Truque
                              </TableCell>
                              <TableCell
                                sx={{
                                  backgroundColor: "rgba(139, 115, 85, 0.5)",
                                  color: "#d4af37",
                                  fontWeight: "bold",
                                  fontSize: "0.85rem",
                                  borderBottom: "2px solid #8b7355",
                                  textAlign: "center",
                                }}
                              >
                                Efeito
                              </TableCell>
                              <TableCell
                                sx={{
                                  backgroundColor: "rgba(139, 115, 85, 0.5)",
                                  color: "#d4af37",
                                  fontWeight: "bold",
                                  fontSize: "0.85rem",
                                  borderBottom: "2px solid #8b7355",
                                  textAlign: "center",
                                }}
                              >
                                Quando Declarar
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow>
                              <TableCell
                                sx={{
                                  color: "#d4af37",
                                  fontWeight: "bold",
                                  borderBottom: "1px solid #8b7355",
                                  textAlign: "center",
                                }}
                              >
                                Ataque Furioso
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: "#d4c4a8",
                                  borderBottom: "1px solid #8b7355",
                                }}
                              >
                                +3 Ímpeto para um ataque
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: "#d4c4a8",
                                  borderBottom: "1px solid #8b7355",
                                }}
                              >
                                Antes das rolagens serem feitas
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell
                                sx={{
                                  color: "#d4af37",
                                  fontWeight: "bold",
                                  borderBottom: "1px solid #8b7355",
                                  textAlign: "center",
                                }}
                              >
                                Ripostar
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: "#d4c4a8",
                                  borderBottom: "1px solid #8b7355",
                                }}
                              >
                                +1 Ímpeto para um ataque
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: "#d4c4a8",
                                  borderBottom: "1px solid #8b7355",
                                }}
                              >
                                Após as rolagens serem feitas
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell
                                sx={{
                                  color: "#d4af37",
                                  fontWeight: "bold",
                                  borderBottom: "1px solid #8b7355",
                                  textAlign: "center",
                                }}
                              >
                                Golpe de Misericórdia
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: "#d4c4a8",
                                  borderBottom: "1px solid #8b7355",
                                }}
                              >
                                +2 Dano para qualquer ataque corpo a corpo que
                                causou ao menos 1 ponto de dano
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: "#d4c4a8",
                                  borderBottom: "1px solid #8b7355",
                                }}
                              >
                                Após o dano ser calculado
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell
                                sx={{
                                  color: "#d4af37",
                                  fontWeight: "bold",
                                  borderBottom: "1px solid #8b7355",
                                  textAlign: "center",
                                }}
                              >
                                Mão Firme
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: "#d4c4a8",
                                  borderBottom: "1px solid #8b7355",
                                }}
                              >
                                +3 Precisão para um ataque
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: "#d4c4a8",
                                  borderBottom: "1px solid #8b7355",
                                }}
                              >
                                Antes das rolagens serem feitas
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell
                                sx={{
                                  color: "#d4af37",
                                  fontWeight: "bold",
                                  borderBottom: "1px solid #8b7355",
                                  textAlign: "center",
                                }}
                              >
                                Olhos de Águia
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: "#d4c4a8",
                                  borderBottom: "1px solid #8b7355",
                                }}
                              >
                                +1 Precisão para um ataque
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: "#d4c4a8",
                                  borderBottom: "1px solid #8b7355",
                                }}
                              >
                                Após as rolagens serem feitas
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell
                                sx={{
                                  color: "#d4af37",
                                  fontWeight: "bold",
                                  borderBottom: "1px solid #8b7355",
                                  textAlign: "center",
                                }}
                              >
                                Firmar
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: "#d4c4a8",
                                  borderBottom: "1px solid #8b7355",
                                }}
                              >
                                +3 Armadura para um ataque
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: "#d4c4a8",
                                  borderBottom: "1px solid #8b7355",
                                }}
                              >
                                Antes das rolagens serem feitas
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell
                                sx={{
                                  color: "#d4af37",
                                  fontWeight: "bold",
                                  borderBottom: "1px solid #8b7355",
                                  textAlign: "center",
                                }}
                              >
                                Esquivar
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: "#d4c4a8",
                                  borderBottom: "1px solid #8b7355",
                                }}
                              >
                                +1 Armadura para um ataque
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: "#d4c4a8",
                                  borderBottom: "1px solid #8b7355",
                                }}
                              >
                                Após as rolagens serem feitas
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell
                                sx={{
                                  color: "#d4af37",
                                  fontWeight: "bold",
                                  borderBottom: "1px solid #8b7355",
                                  textAlign: "center",
                                }}
                              >
                                Nervos de Aço
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: "#d4c4a8",
                                  borderBottom: "1px solid #8b7355",
                                }}
                              >
                                +4 Vontade para uma rolagem de Vontade
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: "#d4c4a8",
                                  borderBottom: "1px solid #8b7355",
                                }}
                              >
                                Antes da rolagem ser feita
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell
                                sx={{
                                  color: "#d4af37",
                                  fontWeight: "bold",
                                  borderBottom: "1px solid #8b7355",
                                  textAlign: "center",
                                }}
                              >
                                Coração de Ferro
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: "#d4c4a8",
                                  borderBottom: "1px solid #8b7355",
                                }}
                              >
                                +2 Vontade para uma rolagem de Vontade
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: "#d4c4a8",
                                  borderBottom: "1px solid #8b7355",
                                }}
                              >
                                Após a rolagem ser feita
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell
                                sx={{
                                  color: "#d4af37",
                                  fontWeight: "bold",
                                  borderBottom: "none",
                                  textAlign: "center",
                                }}
                              >
                                Corrida Frenética
                              </TableCell>
                              <TableCell
                                sx={{ color: "#d4c4a8", borderBottom: "none" }}
                              >
                                +2 Movimento pelo resto do turno
                              </TableCell>
                              <TableCell
                                sx={{ color: "#d4c4a8", borderBottom: "none" }}
                              >
                                Na ativação
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>

                      <ParchmentText
                        sx={{ mt: 2, fontSize: "0.85rem", fontStyle: "italic" }}
                      >
                        <em>
                          "Truques não fazem o guerreiro. Mas veteranos sem
                          truques raramente se tornam veteranos mais velhos. Em
                          Mordheim, cada pequena vantagem é a diferença entre um
                          túmulo e uma taverna."
                        </em>
                      </ParchmentText>
                    </Box>
                  </Box>

                  {/* Exemplo de Progressão */}
                  <Box
                    sx={{
                      mt: 4,
                      p: 3,
                      backgroundColor: "rgba(75, 0, 0, 0.15)",
                      border: "2px solid #8b4513",
                      borderRadius: "4px",
                    }}
                  >
                    <PowerListTitle
                      sx={{
                        fontSize: "1.1rem",
                        mb: 2,
                        mt: 0,
                        color: "#d4af37",
                      }}
                    >
                      Exemplo: A Ascensão de Gottfried
                    </PowerListTitle>

                    <ParchmentText
                      sx={{ fontStyle: "italic", fontSize: "0.95rem", mb: 2 }}
                    >
                      Gottfried, o campeão, acumulou 100 XP após três jogos
                      sangrentos. Sobrevivências (180 XP), duas mortes de
                      soldados inimigos (10 XP), e uma morte de campeão inimigo
                      (10 XP). Mais que suficiente. Ele subiu para nível 2.
                    </ParchmentText>

                    <ParchmentText
                      sx={{ fontStyle: "italic", fontSize: "0.95rem", mb: 2 }}
                    >
                      Klaus, seu capitão, estudou as opções. Aumentar Ímpeto?
                      Aprender novo poder? No fim, escolheu{" "}
                      <strong>Melhorar um Poder</strong> — "Muralha de Escudos"
                      que tinha CD 3 agora ficaria mais fácil... não, esperem. A
                      CD já estava no mínimo. Klaus mudou de ideia.
                    </ParchmentText>

                    <ParchmentText
                      sx={{ fontStyle: "italic", fontSize: "0.95rem" }}
                    >
                      <strong>Aumentar Ímpeto</strong>, decidiu finalmente. De
                      +2 para +3. Gottfried sorriu, testando o peso de sua
                      Zweihander. Parecia mais leve agora. Ou talvez ele
                      estivesse mais forte. Em Mordheim, a diferença importa
                      pouco. O resultado é o que conta.
                    </ParchmentText>
                  </Box>
                </Box>

                {/* 5. Vendendo Pedra-Bruxa */}
                <Box sx={{ mb: 6 }} id="vendendo-pedra-bruxa">
                  <PowerListTitle sx={{ fontSize: "1.3rem", mb: 3 }}>
                    5. Vendendo Pedra-Bruxa
                  </PowerListTitle>

                  <ParchmentText sx={{ mb: 3 }}>
                    O momento da verdade. A razão pela qual sangue foi
                    derramado. O bando venderá a Pedra-bruxa que obteve durante
                    o jogo e sua exploração. Cada fragmento verde e pulsante
                    será trocado por ouro, itens, ou — com muita sorte —
                    tesouros que valem mais que ouro.
                  </ParchmentText>

                  <ParchmentText sx={{ mb: 4 }}>
                    Para cada fragmento de Pedra-bruxa obtido, role{" "}
                    <strong>uma vez</strong> na tabela abaixo. A rolagem é
                    necessária porque a oferta e demanda é{" "}
                    <strong>altamente flutuante</strong>. Em uma semana, a
                    Pedra-bruxa vale seu peso em ouro. Em outra, a saturação
                    dela no mercado ou notícias de algum nobre corrompido por
                    suas energias reduzem grandemente seu valor. Mercadores são
                    inconstantes. Mercados, mais ainda.
                  </ParchmentText>

                  {/* Tabela de Venda de Pedra-Bruxa */}
                  <Box
                    sx={{
                      mb: 4,
                      p: 3,
                      backgroundColor: "rgba(139, 115, 85, 0.1)",
                      border: "2px solid #d4af37",
                      borderRadius: "4px",
                    }}
                  >
                    <PowerListTitle sx={{ fontSize: "1.1rem", mb: 3, mt: 0 }}>
                      Tabela de Venda de Pedra-Bruxa
                    </PowerListTitle>

                    <TableContainer
                      component={Paper}
                      sx={{
                        backgroundColor: "rgba(28, 24, 18, 0.8)",
                        border: "2px solid #8b7355",
                      }}
                    >
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell
                              sx={{
                                backgroundColor: "rgba(139, 115, 85, 0.5)",
                                color: "#d4af37",
                                fontWeight: "bold",
                                fontSize: "0.9rem",
                                borderBottom: "2px solid #8b7355",
                                textAlign: "center",
                                width: "30%",
                              }}
                            >
                              Rolagem (d20)
                            </TableCell>
                            <TableCell
                              sx={{
                                backgroundColor: "rgba(139, 115, 85, 0.5)",
                                color: "#d4af37",
                                fontWeight: "bold",
                                fontSize: "0.9rem",
                                borderBottom: "2px solid #8b7355",
                              }}
                            >
                              Recompensa
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                fontWeight: "bold",
                                borderBottom: "1px solid #8b7355",
                                textAlign: "center",
                              }}
                            >
                              1
                            </TableCell>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                borderBottom: "1px solid #8b7355",
                              }}
                            >
                              20 coroas
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                fontWeight: "bold",
                                borderBottom: "1px solid #8b7355",
                                textAlign: "center",
                              }}
                            >
                              2
                            </TableCell>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                borderBottom: "1px solid #8b7355",
                              }}
                            >
                              30 coroas
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                fontWeight: "bold",
                                borderBottom: "1px solid #8b7355",
                                textAlign: "center",
                              }}
                            >
                              3
                            </TableCell>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                borderBottom: "1px solid #8b7355",
                              }}
                            >
                              40 coroas
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                fontWeight: "bold",
                                borderBottom: "1px solid #8b7355",
                                textAlign: "center",
                              }}
                            >
                              4
                            </TableCell>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                borderBottom: "1px solid #8b7355",
                              }}
                            >
                              50 coroas
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                fontWeight: "bold",
                                borderBottom: "1px solid #8b7355",
                                textAlign: "center",
                              }}
                            >
                              5
                            </TableCell>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                borderBottom: "1px solid #8b7355",
                              }}
                            >
                              75 coroas
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                fontWeight: "bold",
                                borderBottom: "1px solid #8b7355",
                                textAlign: "center",
                              }}
                            >
                              6
                            </TableCell>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                borderBottom: "1px solid #8b7355",
                              }}
                            >
                              75 coroas
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                fontWeight: "bold",
                                borderBottom: "1px solid #8b7355",
                                textAlign: "center",
                              }}
                            >
                              7
                            </TableCell>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                borderBottom: "1px solid #8b7355",
                              }}
                            >
                              100 coroas
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                fontWeight: "bold",
                                borderBottom: "1px solid #8b7355",
                                textAlign: "center",
                              }}
                            >
                              8
                            </TableCell>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                borderBottom: "1px solid #8b7355",
                              }}
                            >
                              100 coroas
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                fontWeight: "bold",
                                borderBottom: "1px solid #8b7355",
                                textAlign: "center",
                              }}
                            >
                              9
                            </TableCell>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                borderBottom: "1px solid #8b7355",
                              }}
                            >
                              Poção
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                fontWeight: "bold",
                                borderBottom: "1px solid #8b7355",
                                textAlign: "center",
                              }}
                            >
                              10
                            </TableCell>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                borderBottom: "1px solid #8b7355",
                              }}
                            >
                              Poção + 10 coroas
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                fontWeight: "bold",
                                borderBottom: "1px solid #8b7355",
                                textAlign: "center",
                              }}
                            >
                              11
                            </TableCell>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                borderBottom: "1px solid #8b7355",
                              }}
                            >
                              Poção + 30 coroas
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                fontWeight: "bold",
                                borderBottom: "1px solid #8b7355",
                                textAlign: "center",
                              }}
                            >
                              12
                            </TableCell>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                borderBottom: "1px solid #8b7355",
                              }}
                            >
                              Poção (2×)
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                fontWeight: "bold",
                                borderBottom: "1px solid #8b7355",
                                textAlign: "center",
                              }}
                            >
                              13
                            </TableCell>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                borderBottom: "1px solid #8b7355",
                              }}
                            >
                              Equipamento Obra-Prima
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                fontWeight: "bold",
                                borderBottom: "1px solid #8b7355",
                                textAlign: "center",
                              }}
                            >
                              14
                            </TableCell>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                borderBottom: "1px solid #8b7355",
                              }}
                            >
                              Equipamento Obra-Prima
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                fontWeight: "bold",
                                borderBottom: "1px solid #8b7355",
                                textAlign: "center",
                              }}
                            >
                              15
                            </TableCell>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                borderBottom: "1px solid #8b7355",
                              }}
                            >
                              Equipamento Obra-Prima + 10 coroas
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                fontWeight: "bold",
                                borderBottom: "1px solid #8b7355",
                                textAlign: "center",
                              }}
                            >
                              16
                            </TableCell>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                borderBottom: "1px solid #8b7355",
                              }}
                            >
                              Equipamento Obra-Prima + 30 coroas
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                fontWeight: "bold",
                                borderBottom: "1px solid #8b7355",
                                textAlign: "center",
                              }}
                            >
                              17
                            </TableCell>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                borderBottom: "1px solid #8b7355",
                              }}
                            >
                              Relíquia
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                fontWeight: "bold",
                                borderBottom: "1px solid #8b7355",
                                textAlign: "center",
                              }}
                            >
                              18
                            </TableCell>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                borderBottom: "1px solid #8b7355",
                              }}
                            >
                              Relíquia + 10 coroas
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                fontWeight: "bold",
                                borderBottom: "1px solid #8b7355",
                                textAlign: "center",
                              }}
                            >
                              19
                            </TableCell>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                borderBottom: "1px solid #8b7355",
                              }}
                            >
                              Relíquia + 30 coroas
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                fontWeight: "bold",
                                borderBottom: "1px solid #8b7355",
                                textAlign: "center",
                              }}
                            >
                              20
                            </TableCell>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                borderBottom: "1px solid #8b7355",
                              }}
                            >
                              Mapa de Mordheim
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                fontWeight: "bold",
                                borderBottom: "1px solid #8b7355",
                                textAlign: "center",
                              }}
                            >
                              21
                            </TableCell>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                borderBottom: "1px solid #8b7355",
                              }}
                            >
                              Mapa de Mordheim + 20 coroas
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell
                              sx={{
                                color: "#d4c4a8",
                                fontWeight: "bold",
                                borderBottom: "none",
                                textAlign: "center",
                              }}
                            >
                              22
                            </TableCell>
                            <TableCell
                              sx={{ color: "#d4c4a8", borderBottom: "none" }}
                            >
                              Mapa de Mordheim + 50 coroas
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>

                    <ParchmentText
                      sx={{ mt: 2, fontSize: "0.85rem", fontStyle: "italic" }}
                    >
                      <em>
                        Note: Para Poções, Equipamento Obra-Prima e Relíquias,
                        role nas tabelas apropriadas para determinar o item
                        específico recebido. A tabela contém links para as
                        páginas do tipo de item que foi rolado — as tabelas
                        específicas e regras detalhadas de cada categoria estão
                        nessas páginas.
                      </em>
                    </ParchmentText>
                  </Box>

                  {/* Exemplo de Venda */}
                  <Box
                    sx={{
                      mt: 4,
                      p: 3,
                      backgroundColor: "rgba(75, 0, 0, 0.15)",
                      border: "2px solid #8b4513",
                      borderRadius: "4px",
                    }}
                  >
                    <PowerListTitle
                      sx={{
                        fontSize: "1.1rem",
                        mb: 2,
                        mt: 0,
                        color: "#d4af37",
                      }}
                    >
                      Exemplo: O Mercado Flutuante
                    </PowerListTitle>

                    <ParchmentText
                      sx={{ fontStyle: "italic", fontSize: "0.95rem", mb: 2 }}
                    >
                      Klaus retornou com três fragmentos de Pedra-bruxa. Três
                      homens morreram por eles. Ele levou os fragmentos ao
                      mercado negro, onde mercadores de olhos famintos aguardam.
                    </ParchmentText>

                    <ParchmentText
                      sx={{ fontStyle: "italic", fontSize: "0.95rem", mb: 2 }}
                    >
                      <strong>Primeiro fragmento:</strong> Rola d20 = 7.
                      100coroas! Um conde desesperado pagou bem.
                      <br />
                      <strong>Segundo fragmento:</strong> Rola d20 = 2.
                      30coroas. Mercado saturado.
                      <br />
                      <strong>Terceiro fragmento:</strong> Rola d20 = 17.
                      Relíquia! Um mercador ofereceu um amuleto antigo ao invés
                      de ouro.
                    </ParchmentText>

                    <ParchmentText
                      sx={{ fontStyle: "italic", fontSize: "0.95rem" }}
                    >
                      Total: 130coroas e uma relíquia. Klaus olhou para os três
                      fragmentos que custaram três vidas. "Vale a pena?" um
                      soldado perguntou. Klaus não respondeu. A resposta é
                      sempre a mesma: depende de você estar vivo para gastar.
                    </ParchmentText>
                  </Box>
                </Box>

                {/* 6. Gastar Tesouro */}
                <Box sx={{ mb: 6 }} id="gastar-tesouro">
                  <PowerListTitle sx={{ fontSize: "1.3rem", mb: 3 }}>
                    6. Gastar Tesouro
                  </PowerListTitle>

                  <ParchmentText sx={{ mb: 4 }}>
                    Ouro ganho. Itens adquiridos. Agora vem a parte onde o suado
                    dinheiro — comprado com sangue, suor e provável traição — é
                    investido de volta no bando. Cada coroa gasta é uma aposta
                    no futuro. Recrutar mais homens? Melhorar a base? Comprar
                    aquele amuleto suspeito do mercador ainda mais suspeito?
                    Escolhas. Sempre escolhas. E em Mordheim, escolhas erradas
                    matam tão certeiro quanto lâminas.
                  </ParchmentText>

                  <PowerListTitle sx={{ fontSize: "1.1rem", mb: 3 }}>
                    Opções de Gasto
                  </PowerListTitle>

                  {/* Contratar Recrutas */}
                  <Box
                    sx={{
                      mb: 3,
                      p: 3,
                      backgroundColor: "rgba(139, 115, 85, 0.1)",
                      borderLeft: "4px solid #8b7355",
                    }}
                  >
                    <PowerListTitle sx={{ fontSize: "1rem", mb: 2, mt: 0 }}>
                      1. Contratar Recrutas
                    </PowerListTitle>
                    <ParchmentText>
                      Substitua os mortos. Reforce os números. Cada soldado tem
                      seu custo listado na ficha do bando. Pague as coroas,
                      adicione o nome à lista, e reze para que este dure mais
                      que o último. Lembre-se: você pode ter no máximo 8
                      soldados, com apenas 4 sendo especializados. Novos
                      soldados são adicionados no nivel 1. Carne é barata. Carne
                      treinada, nem tanto.
                    </ParchmentText>
                  </Box>

                  {/* Contratar Novo Campeão */}
                  <Box
                    sx={{
                      mb: 3,
                      p: 3,
                      backgroundColor: "rgba(139, 115, 85, 0.1)",
                      borderLeft: "4px solid #8b7355",
                    }}
                  >
                    <PowerListTitle sx={{ fontSize: "1rem", mb: 2, mt: 0 }}>
                      2. Contratar um Novo Campeão
                    </PowerListTitle>
                    <ParchmentText sx={{ mb: 2 }}>
                      Se seu campeão caiu (permanentemente, não apenas
                      temporariamente ferido), você pode contratar um
                      substituto. Pague o custo listado na ficha do bando.
                    </ParchmentText>

                    <ParchmentText sx={{ mb: 2 }}>
                      <strong>
                        Líderes Experientes Atraem Asseclas Experientes:
                      </strong>{" "}
                      Um campeão recém-contratado entra no bando com o{" "}
                      <strong>nível do Herói ÷ 3</strong> (arredondado para
                      baixo). Um herói lendário atrai veteranos, não novatos. O
                      jogador então faz os <strong>avanços apropriados</strong>{" "}
                      para cada nível além do 1, mas não pode pegar o mesmo
                      avanço mais que duas vezes nesse processo.
                    </ParchmentText>
                  </Box>

                  {/* Requisitar Novo Herói */}
                  <Box
                    sx={{
                      mb: 3,
                      p: 3,
                      backgroundColor: "rgba(139, 115, 85, 0.1)",
                      borderLeft: "4px solid #8b7355",
                    }}
                  >
                    <PowerListTitle sx={{ fontSize: "1rem", mb: 2, mt: 0 }}>
                      3. Requisitar Novo Herói
                    </PowerListTitle>

                    <ParchmentText sx={{ mb: 2 }}>
                      O impensável aconteceu. Seu herói morreu. O líder caiu. O
                      bando está sem cabeça, cambaleando no limite da
                      dissolução. Mas há uma última chance: requisitar um novo
                      herói.
                    </ParchmentText>

                    <ParchmentText sx={{ mb: 2 }}>
                      O jogador simplesmente ganha um{" "}
                      <strong>novo herói no mesmo nível do anterior</strong>.
                      Legados atraem sucessores. Faça os{" "}
                      <strong>avanços apropriados</strong> para cada nível além
                      do 1, mas não pode pegar o mesmo avanço mais de duas vezes
                      nesse processo.
                    </ParchmentText>

                    <ParchmentText sx={{ mb: 2 }}>
                      <strong>Começando do Zero:</strong> O novo herói{" "}
                      <strong>não tem os itens</strong> do anterior — esses
                      foram perdidos com o corpo, roubados, ou simplesmente
                      desapareceram no caos. Também não possui quaisquer{" "}
                      <strong>bônus narrativos</strong> ganhos pelo antigo herói
                      através de eventos ou recompensas especiais. Ele tem
                      apenas nível, atributos, e as escolhas que você faz agora.
                    </ParchmentText>

                    <ParchmentText>
                      É um recomeço. Não tão devastador quanto perder tudo, mas
                      doloroso o suficiente. Em Mordheim, até vitórias custam
                      caro. E reze para nunca precisar usar essa regra.
                    </ParchmentText>

                    {/* Deserção Total */}
                    <Box
                      sx={{
                        mt: 3,
                        p: 3,
                        backgroundColor: "rgba(75, 0, 0, 0.2)",
                        border: "2px solid #8b4513",
                        borderRadius: "4px",
                      }}
                    >
                      <PowerListTitle
                        sx={{
                          fontSize: "1rem",
                          mb: 2,
                          mt: 0,
                          color: "#d4af37",
                        }}
                      >
                        Deserção Total — Quando Tudo Desmorona
                      </PowerListTitle>

                      <ParchmentText sx={{ mb: 2 }}>
                        Se <strong>herói e campeão morrerem</strong> no mesmo
                        jogo, a liderança colapsa completamente.{" "}
                        <strong>Todos os soldados debandam</strong>. Sem líderes
                        para seguir, sem pagamento garantido, sem razão para
                        ficar — eles simplesmente vão embora na calada da noite.
                      </ParchmentText>

                      <ParchmentText sx={{ mb: 2 }}>
                        O novo herói fica <strong>sem soldados</strong>, devendo
                        recontratar com as coroas que o bando ainda possui no
                        tesouro. Começar do nível anterior ajuda, mas começar
                        sozinho... não tanto.
                      </ParchmentText>

                      <ParchmentText>
                        <strong>Desertores Levam Tudo:</strong> Soldados
                        desertores levam os <strong>itens mágicos</strong> que
                        carregavam. Relíquias, armas encantadas, poções raras —
                        tudo desaparece com eles nas sombras. Lealdade tem
                        limites. E quando ambos os líderes caem, esse limite foi
                        atingido.
                      </ParchmentText>
                    </Box>
                  </Box>

                  {/* Comprar Itens Mágicos */}
                  <Box
                    sx={{
                      mb: 3,
                      p: 3,
                      backgroundColor: "rgba(139, 115, 85, 0.1)",
                      borderLeft: "4px solid #8b7355",
                    }}
                  >
                    <PowerListTitle sx={{ fontSize: "1rem", mb: 2, mt: 0 }}>
                      4. Comprar Itens Mágicos
                    </PowerListTitle>

                    <ParchmentText sx={{ mb: 2 }}>
                      Mercadores sombrios vendem mais que Pedra-bruxa. Relíquias
                      antigas. Armas encantadas. Poções de efeitos duvidosos. Se
                      você tem coroas suficientes e contatos suficientemente
                      suspeitos, pode negociar com eles.
                    </ParchmentText>

                    <ParchmentText sx={{ mb: 2 }}>
                      <strong>Determinando Disponibilidade:</strong> O jogador
                      deve rolar <strong>4 vezes</strong> na tabela de Venda de
                      Pedra-bruxa acima, descartando resultados de coroas e Mapa
                      de Mordheim (seus contatos o ignoraram...). Para cada
                      resultado válido, role nas tabelas dos itens indicados. O
                      jogador pode <strong>comprar cada um dos itens</strong>{" "}
                      rolados dessa maneira pelo seu{" "}
                      <strong>preço de compra</strong> listado.
                    </ParchmentText>

                    <ParchmentText sx={{ mb: 2 }}>
                      <strong>Vendendo Itens:</strong> Nessa etapa, o jogador
                      também pode vender seus itens mágicos. Para cada item que
                      deseja vender, role um <strong>d20</strong>. Em um{" "}
                      <strong>12+</strong>, ele encontra um comprador e ganha o{" "}
                      <strong>preço de venda</strong> do item. Menos que isso, o
                      mercador ri na sua cara ou oferece metade de uma coroa e
                      um cuspe. Mercado é mercado.
                    </ParchmentText>
                  </Box>

                  {/* Rearmar */}
                  <Box
                    sx={{
                      mb: 3,
                      p: 3,
                      backgroundColor: "rgba(139, 115, 85, 0.1)",
                      borderLeft: "4px solid #c4a870",
                    }}
                  >
                    <PowerListTitle sx={{ fontSize: "1rem", mb: 2, mt: 0 }}>
                      Rearmar
                    </PowerListTitle>

                    <ParchmentText sx={{ mb: 2 }}>
                      <strong>Recuperação Automática:</strong> Itens não mágicos
                      perdidos durante o jogo por efeito de magias, poderes ou
                      qualquer outro efeito são{" "}
                      <strong>recuperados de graça</strong> entre os jogos.
                      Espadas são reforjadas. Armaduras são remendadas. O
                      equipamento comum é substituível.
                    </ParchmentText>

                    <ParchmentText>
                      <strong>Trocar Equipamento:</strong> Heróis e campeões
                      também podem{" "}
                      <strong>trocar seus itens não mágicos</strong> à vontade
                      entre jogos. Contudo, apenas equipamentos presentes na{" "}
                      <strong>lista da sua ficha</strong> são permitidos. Você
                      não pode de repente pegar uma besta se seu herói não tem
                      acesso a bestas.
                    </ParchmentText>
                  </Box>

                  {/* Expandir Base */}
                  <Box
                    sx={{
                      mb: 3,
                      p: 3,
                      backgroundColor: "rgba(139, 115, 85, 0.1)",
                      borderLeft: "4px solid #8b7355",
                    }}
                  >
                    <PowerListTitle sx={{ fontSize: "1rem", mb: 2, mt: 0 }}>
                      5. Expandir Base
                    </PowerListTitle>

                    <ParchmentText sx={{ mb: 2 }}>
                      Todo bando precisa de refúgio. Algum lugar para dormir
                      entre as expedições, guardar tesouros, e esconder-se dos
                      outros bandos igualmente desesperados. Se você tem uma
                      base, pode investi-la para torná-la melhor.
                    </ParchmentText>

                    <ParchmentText sx={{ mb: 2 }}>
                      O jogador pode comprar uma{" "}
                      <strong>expansão de base</strong> por sequência pós jogo.
                      Apenas uma — construção leva tempo, mesmo em Mordheim.
                      Gaste as coroas, adicione a estrutura, ganhe os
                      benefícios.
                    </ParchmentText>

                    <ParchmentText>
                      <strong>Restrição de Mudança:</strong> Você{" "}
                      <strong>não pode comprar uma expansão</strong> se tiver
                      acabado de se mudar para a base na sequência pós jogo. Mal
                      desempacotou as malas e já quer reformar? Paciência.
                      Primeiro se estabeleça. Depois construa. Consulte as
                      regras de Base e Melhorias para custos e benefícios
                      específicos.
                    </ParchmentText>
                  </Box>

                  {/* Nota sobre Gasto */}
                  <Box
                    sx={{
                      mt: 4,
                      p: 3,
                      backgroundColor: "rgba(212, 175, 55, 0.1)",
                      border: "2px solid #d4af37",
                      borderRadius: "4px",
                    }}
                  >
                    <ParchmentText sx={{ fontStyle: "italic" }}>
                      "Gastar sabiamente é viver mais tempo. Gastar tolamente é
                      morrer rico. Em Mordheim, ambos são opções válidas —
                      depende apenas de quanto você valoriza acordar amanhã. O
                      tesouro não compra imortalidade, mas compra melhores
                      chances. E às vezes, chances são tudo que temos."
                    </ParchmentText>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Nota Final Atmosférica */}
          <Box
            sx={{
              mt: 6,
              p: 4,
              backgroundColor: "rgba(20, 18, 14, 0.6)",
              border: "2px solid #8b4513",
              borderRadius: "4px",
            }}
          >
            <ParchmentText sx={{ fontStyle: "italic", color: "#d4c4a8" }}>
              "Lembre-se: em Mordheim, as regras existem não para trazer ordem,
              mas para dar estrutura ao caos. Elas definem como lutamos, como
              morremos, e — se formos afortunados — como sobrevivemos mais um
              dia nas ruas amaldiçoadas desta cidade condenada. Que Sigmar tenha
              piedade de sua alma... pois Mordheim certamente não terá."
            </ParchmentText>
          </Box>
        </ContentContainer>
      </ContentSection>

      <NavigationSection>
        <Box sx={{ maxWidth: "600px", width: "100%" }}>
          <StyledNavigationButton
            onClick={() => navigate("/")}
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
          >
            Voltar ao Início
          </StyledNavigationButton>
        </Box>
      </NavigationSection>
    </PageContainer>
  );
}

export default RulesPage;
