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
import { useNavigate } from "react-router-dom";

export default function BasesPage() {
  const navigate = useNavigate();

  const bases = [
    {
      name: "Estalagem",
      effect:
        "Esta velha estalagem tem muito espaço para abrigar soldados e seus equipamentos. O jogador pode manter um soldado extra em seu bando. Contudo, este soldado extra não pode ser usado em um jogo e deve permanecer na base. Mesmo com uma estalagem, um bando ainda está limitado a oito soldados em um jogo. O jogador pode mudar qual soldado fica na estalagem a cada jogo, o que é útil se um soldado deve perder um jogo devido a ferimentos.",
    },
    {
      name: "Templo em Ruínas",
      effect:
        "As ruínas deste edifício outrora sagrado ainda têm os aparatos para realizar rituais sagrados (ou profanos). Se o bando tiver um Sacerdote, ele ganha uma relíquia Sagrada-Profana uma vez entre cada jogo. Orações Fora de Jogo recebem +3 em suas rolagens de conjuração no templo.",
    },
    {
      name: "Mausoléu",
      effect:
        "Não é o lugar mais confortável para dormir, mas está cheio de 'suprimentos'. Um bando com um necromante ganha +3 em qualquer conjuração de Erguer Mortos-Vivos fora de jogo.",
    },
    {
      name: "Observatório",
      effect:
        "Este observatório imperial meio arruinado permite ao jogador explorar e mapear Mordheim facilmente. A torre concede +2 à iniciativa e às rolagens de conjuração de qualquer magia que permita ao jogador re-rolar na tabela de tesouro.",
    },
    {
      name: "Banco",
      effect:
        "Este banco permaneceu relativamente intocado e muitos de seus cofres ainda estão selados. Após cada jogo, o bando pode tentar abrir um cofre. Role um dado. Se o resultado for 2–16, adicione essa quantidade de coroas de ouro ao tesouro do bando. Se um 17–18 for rolado, adicione 100 coroas a esse número. Se um 19–20 for rolado, o bando encontra um Cofre Nobre — determine o conteúdo deste cofre da mesma forma que rolar por um Fragmento de Pedra-bruxa capturado durante um jogo.",
    },
    {
      name: "Cervejaria Anã",
      effect:
        "Ainda há alguma vida naqueles velhos barris, e o bando tira total vantagem. Todos os soldados começam cada jogo com +1 Vontade. Além disso, o bando ganha 20 coroas adicionais após cada jogo através da venda do estoque excedente. Uma figura morta-viva nunca se beneficia desses bônus, exceto vampiros.",
    },
    {
      name: "Universidade",
      effect:
        "Este é um dos muitos campi universitários espalhados pela cidade. Os volumes contidos neste caíram às ravagens do clima e do tempo. Alguns textos valiosos sobreviveram, contudo. Após cada jogo, o bando pode rolar um dado. Em um 15–18, eles escolhem uma magia ou poder que uma figura do bando seja capaz de usar. Ganhe +2 na rolagem para ativar. Em um 19–20, eles ganham +5 na rolagem para ativar aquele poder ou magia.",
    },
    {
      name: "Campo de Treinamento",
      effect:
        "Um campo de treinamento praticamente intacto para a guarda da cidade e seus magos de batalha. Um Herói ganha 20 pontos de experiência após cada jogo treinando seu corpo e mente aqui. Isso não conta contra o máximo de 300 pontos de experiência por jogo.",
    },
  ];

  return (
    <PageContainer>
      <Header title="Bases de Bando" />

      <ContentSection>
        <ContentContainer>
          <ParchmentText sx={{ mb: 4 }}>
            Um bando pode escolher se mudar para uma base sempre que encontrar
            tal base em um evento de exploração. Mudar-se para uma base é
            gratuito, mas melhorias de base são perdidas ao fazer isso. Cada
            base fornece benefícios únicos que podem influenciar
            significativamente as capacidades e estratégias do seu bando entre
            jogos.
          </ParchmentText>

          <PowerListTitle>Bases Disponíveis</PowerListTitle>

          <ParchmentText sx={{ mb: 3 }}>
            Ao explorar Mordheim, bandos podem descobrir várias estruturas que
            podem servir como sua base de operações. Cada base oferece vantagens
            únicas adaptadas a diferentes estilos de jogo e composições de
            bando.
          </ParchmentText>

          <TableContainer
            component={Paper}
            sx={{
              mb: 5,
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
                    Base
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
                </TableRow>
              </TableHead>
              <TableBody>
                {bases.map((base, index) => (
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
                      {base.name}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#d4c5a0",
                        fontSize: "0.95rem",
                        fontFamily: '"Crimson Text", serif',
                        lineHeight: 1.6,
                      }}
                    >
                      {base.effect}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box
            sx={{
              p: 3,
              mt: 4,
              backgroundColor: "rgba(212, 175, 55, 0.05)",
              border: "2px solid rgba(139, 115, 85, 0.3)",
              borderRadius: "6px",
            }}
          >
            <PowerListTitle sx={{ mt: 0 }}>Notas Importantes</PowerListTitle>
            <ParchmentText sx={{ mb: 2 }}>
              • Mudar-se para uma nova base é <strong>gratuito</strong>, mas
              todas as melhorias de base existentes são{" "}
              <strong>perdidas</strong>
              <br />• Benefícios de base se aplicam <strong>
                entre jogos
              </strong>{" "}
              e não são transferidos para cenários de combate
              <br />• Cada base pode ser aprimorada com{" "}
              <strong>expansões</strong> que fornecem benefícios adicionais
            </ParchmentText>

            <StyledNavigationButton
              onClick={() => navigate("/base/upgrades")}
              variant="outlined"
              fullWidth
              sx={{ mt: 2 }}
            >
              Ver Expansões e Melhorias de Base
            </StyledNavigationButton>
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
