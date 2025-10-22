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
import Header from "../../components/Header";
import {
  PageContainer,
  ContentSection,
  ContentContainer,
  ParchmentText,
  PowerListTitle,
  NavigationSection,
  StyledNavigationButton,
} from "../../components/PageComponents";

export default function BaseUpgradesPage() {
  const navigate = useNavigate();

  const expansions = [
    {
      name: "Canil",
      effect:
        "O bando pode contratar um único cão de guerra. Este cão de guerra não conta contra o limite de 8 soldados, dando a você uma 11ª figura no bando. Um cão de guerra contratado dessa forma custa 20 coroas.",
      cost: "400 coroas",
    },
    {
      name: "Pombaria",
      effect:
        "O bando agora pode abrigar pássaros mensageiros de qualquer tipo. A facilidade de comunicação torna os soldados 10 coroas mais baratos para contratar.",
      cost: "50 coroas",
    },
    {
      name: "Equipamento de Patrulha",
      effect:
        "Permite ao bando enviar patrulhas de reconhecimento para Mordheim. Tal conhecimento estratégico dá ao bando +5 em uma rolagem de iniciativa uma vez por jogo.",
      cost: "250 coroas",
    },
    {
      name: "Altar Sombrio",
      effect:
        "Um Altar Sombrio permite ao conjurador tentar invocar um demônio antes de um jogo, efetivamente adicionando uma opção Fora de Jogo (B) às magias Invocação Demoníaca e Vincular Demônio. O conjurador primeiro tenta conjurar Invocação Demoníaca, seguido de Vincular Demônio. Se ambas as magias forem bem-sucedidas, um demônio se junta ao bando como membro temporário pelas regras de Invocar Demônio. Este demônio não conta para o tamanho máximo do bando. O mago não pode conjurar Vincular Demônio ou Invocação Demoníaca enquanto este demônio estiver em jogo.",
      cost: "300 coroas",
    },
    {
      name: "Faca Sacrificial",
      effect:
        "Concede +1 às Rolagens de Conjuração para magias Vincular Demônio conjuradas Fora de Jogo.",
      cost: "100 coroas",
    },
    {
      name: "Candelabro Demoníaco",
      effect:
        "Concede +1 às Rolagens de Conjuração para magias Invocação Demoníaca conjuradas Fora de Jogo.",
      cost: "100 coroas",
    },
    {
      name: "Enfermaria",
      effect:
        "Após cada jogo, o jogador pode re-rolar a rolagem de sobrevivência para qualquer membro do bando. Adicionalmente, o custo de 75gp do resultado de sobrevivencia Gravemente Ferido de Hérois e Campeões é reduzido para 35gp",
      cost: "600 coroas",
    },
    {
      name: "Quartel",
      effect:
        "Uma base com quartel pode ter um soldado especialista a mais que o normal permitido, tendo 5 soldados especialistas ao invés dos 4 normais.",
      cost: "1000 coroas",
    },
    {
      name: "Fundição Anã",
      effect:
        "Uma Fundição Anã permite que um único soldado especialista do bando receba uma arma obra-prima. Escolha entre +1 Precisão, +1 Ímpeto ou +1 Dano. A arma ganha isso como bônus. O bônus dura apenas um jogo.",
      cost: "600 coroas",
    },
    {
      name: "Strategium",
      effect:
        "Uma base equipada com um strategium permite ao herói do bando analisar minuciosamente suas vitórias e refletir sobre suas derrotas. Um herói com um Strategium em sua base ganha +10 experiência após cada jogo.",
      cost: "600 coroas",
    },
    {
      name: "Salão Ritual",
      effect:
        "Uma base equipada com um Salão Ritual permite aos conjuradores estudar e testar suas novas magias e encantamentos. Um conjurador com um Salão Ritual em sua base ganha +5 experiência após cada jogo.",
      cost: "600 coroas",
    },
    {
      name: "Covil do Catador",
      effect:
        "Se o item de um membro do bando for perdido devido a um resultado de morto ou por um triz na tabela de Sobrevivência, aquele item não é perdido. Você só pode recuperar um item dessa forma, independente de quantos resultados de morto ou por um triz você teve entre um jogo. Cada vez que você compra esta melhoria novamente, você contrata um catador extra e pode recuperar um item adicional.",
      cost: "600 coroas",
    },
    {
      name: "Oficina Anã",
      effect:
        "APENAS CAÇADORES DE TESOURO ANÕES E FILHOS DE HASHUT. Ganha +2 de bônus ao conjurar Forja Demoníaca ou ativar Obra-Prima do Homem de Ferro.",
      cost: "300 coroas",
    },
    {
      name: "Salão Mecânico Anão",
      effect:
        "APENAS CAÇADORES DE TESOURO ANÕES E FILHOS DE HASHUT. O bando pode selecionar uma modificação da Tabela de Modificação de Constructos após cada jogo e comprar aquela modificação com 50% de desconto. Este desconto não pode acumular com outros descontos.",
      cost: "400 coroas",
    },
    {
      name: "Caixão de Madeira Profana",
      effect:
        "APENAS CORTES VAMPÍRICAS. Vampiros podem recuperar até 5 pontos de vida gratuitamente antes dos jogos. Eles também nunca precisam perder um jogo, ou pagar uma taxa, quando estão Gravemente Feridos, e pagam 10 coroas a menos se tiverem Ferimentos Persistentes.",
      cost: "300 coroas",
    },
    {
      name: "Estábulo",
      effect:
        "Permite ao bando manter uma montaria. A montaria e seu cavaleiro sempre contam como uma única figura e, portanto, não contam contra o limite do bando.",
      cost: "300 coroas",
    },
    {
      name: "Alambique",
      effect:
        "Reduz o custo de componentes de poção em 20 coroas ao tentar criar uma Poção Superior. Poções podem ser vendidas por 10% a mais.",
      cost: "300 coroas",
    },
  ];

  return (
    <PageContainer>
      <Header title="Melhorias e Expansões de Base" />

      <ContentSection>
        <ContentContainer>
          <ParchmentText sx={{ mb: 4 }}>
            Uma vez que um bando estabeleceu uma base, ele pode comprar
            expansões para melhorar suas operações. Estas melhorias fornecem
            vários benefícios, desde armazenamento adicional até instalações de
            treinamento especializadas. Cada expansão representa um investimento
            significativo, mas oferece benefícios permanentes que ajudam o bando
            a se tornar mais forte.
          </ParchmentText>

          <Box
            sx={{
              p: 3,
              mb: 4,
              backgroundColor: "rgba(212, 175, 55, 0.05)",
              border: "2px solid rgba(139, 115, 85, 0.3)",
              borderRadius: "6px",
            }}
          >
            <PowerListTitle sx={{ mt: 0 }}>Importante</PowerListTitle>
            <ParchmentText>
              Ao mudar-se para uma nova base, todas as melhorias de base
              existentes são <strong>perdidas</strong>. Planeje suas expansões
              cuidadosamente, pois elas representam um investimento
              significativo que será perdido se você mudar a localização de sua
              base.
            </ParchmentText>
          </Box>

          <PowerListTitle>Expansões Disponíveis</PowerListTitle>

          <TableContainer
            component={Paper}
            sx={{
              mb: 4,
              backgroundColor: "rgba(28, 24, 18, 0.9)",
              border: "2px solid #8B4513",
            }}
          >
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    backgroundColor: "rgba(212, 175, 55, 0.2)",
                    borderBottom: "2px solid #d4af37",
                  }}
                >
                  <TableCell
                    sx={{
                      color: "#d4af37",
                      fontWeight: 700,
                      fontSize: "1.1rem",
                      fontFamily: '"Cinzel", serif',
                      width: "200px",
                    }}
                  >
                    Expansão
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#d4af37",
                      fontWeight: 700,
                      fontSize: "1.1rem",
                      fontFamily: '"Cinzel", serif',
                    }}
                  >
                    Efeito
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: "#d4af37",
                      fontWeight: 700,
                      fontSize: "1.1rem",
                      fontFamily: '"Cinzel", serif',
                      width: "120px",
                    }}
                  >
                    Custo
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {expansions.map((expansion, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:nth-of-type(odd)": {
                        backgroundColor: "rgba(28, 24, 18, 0.5)",
                      },
                      "&:nth-of-type(even)": {
                        backgroundColor: "rgba(28, 24, 18, 0.7)",
                      },
                    }}
                  >
                    <TableCell
                      sx={{
                        color: "#DAA520",
                        fontWeight: 700,
                        fontSize: "1rem",
                        fontFamily: '"Cinzel", serif',
                        verticalAlign: "top",
                        pt: 2,
                      }}
                    >
                      {expansion.name}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#d4c5a0",
                        fontSize: "0.95rem",
                        fontFamily: '"Crimson Text", serif',
                        lineHeight: 1.6,
                      }}
                    >
                      {expansion.effect}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: "#d4af37",
                        fontWeight: 600,
                        fontSize: "0.95rem",
                        fontFamily: '"Cinzel", serif',
                        verticalAlign: "top",
                        pt: 2,
                      }}
                    >
                      {expansion.cost}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box
            sx={{
              p: 3,
              backgroundColor: "rgba(139, 69, 19, 0.1)",
              border: "2px solid rgba(139, 69, 19, 0.3)",
              borderRadius: "6px",
            }}
          >
            <PowerListTitle sx={{ mt: 0 }}>
              Melhorias Específicas de Facção
            </PowerListTitle>
            <ParchmentText sx={{ mb: 2 }}>
              Algumas expansões são exclusivas para bandos específicos:
            </ParchmentText>
            <ParchmentText>
              • <strong>Oficina Anã</strong> e{" "}
              <strong>Salão Mecânico Anão</strong> - Disponíveis apenas para
              Caçadores de Tesouro Anões e Filhos de Hashut
              <br />• <strong>Caixão de Madeira Profana</strong> - Exclusivo
              para Cortes Vampíricas
              <br />
              <br />
              Estas melhorias especializadas refletem as capacidades e
              necessidades únicas de cada bando, fornecendo benefícios poderosos
              adaptados ao seu estilo de jogo.
            </ParchmentText>
          </Box>
        </ContentContainer>
      </ContentSection>

      <NavigationSection>
        <StyledNavigationButton
          variant="contained"
          onClick={() => navigate("/base")}
        >
          Voltar ao Gerenciamento de Base
        </StyledNavigationButton>
      </NavigationSection>
    </PageContainer>
  );
}
