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
import EquipmentItemCard from "../../components/EquipmentItemCard";
import {
  PageContainer,
  ContentSection,
  NavigationSection,
  StyledNavigationButton,
  ParchmentText,
  ContentContainer,
  PowerListTitle,
} from "../../components/PageComponents";
import { commonItemsData } from "./data/commonItemsData";
import { generateMagicArsenalD20Table } from "../../data/generateArsenalData";

export default function MagicArsenalPage() {
  const navigate = useNavigate();

  // Get magic weapons and armor from commonItemsData
  const magicWeapons = commonItemsData.find((cat) => cat.id === "magic-weapons");
  const magicArmor = commonItemsData.find((cat) => cat.id === "magic-armor");

  return (
    <PageContainer>
      <Header title="Arsenal Mágico — Armas e Armaduras" />
      <ContentSection>
        <ContentContainer>
          <ParchmentText
            sx={{
              textAlign: "center",
              mb: 4,
              fontSize: "1.2rem",
              fontStyle: "italic",
              color: "#d4af37",
            }}
          >
            Aço e Placas Tocadas por Magia — O Arsenal Completo
          </ParchmentText>

          <ParchmentText sx={{ mb: 4 }}>
            Nos arsenais e armarias da Velha Mordheim, mestres ferreiros e magos de batalha trabalhavam juntos para criar os melhores implementos de guerra que o Império já viu. Espadas que podiam clivar pedra. Armaduras que desviavam flechas como chuva. Botas que permitiam guerreiros correrem pelas paredes. Elmos que concediam visão além da vista.
            <br />
            <br />
            Quando o cometa caiu em 1999 IC, estes tesouros foram espalhados, corrompidos, e aprimorados pelo toque da pedra-bruxa. Agora jazem nas ruínas — alguns ainda brilhando com sua glória original, outros torcidos em algo mais sombrio. Cada lâmina exige sangue. Cada peça de armadura carrega uma maldição. Mas em Mordheim, os desesperados não podem se dar ao luxo de serem exigentes.
          </ParchmentText>

          {/* ARSENAL d20 TABLE */}
          <Box sx={{ mb: 6 }}>
            <ParchmentText
              sx={{
                fontSize: "1.6rem",
                fontWeight: 700,
                textAlign: "center",
                color: "#d4af37",
                mb: 3,
                fontFamily: '"Cinzel", serif',
              }}
            >
              ⚔️🛡️ Tabela de Armas e Armaduras Mágicas (d20)
            </ParchmentText>

            <TableContainer
              component={Paper}
              sx={{
                backgroundColor: "rgba(28, 24, 18, 0.9)",
                border: "3px solid #8B4513",
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.4)",
                mb: 3,
                overflowX: "auto",
              }}
            >
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow
                    sx={{
                      backgroundColor: "rgba(212, 175, 55, 0.2)",
                      borderBottom: "2px solid #d4af37",
                    }}
                  >
                    <TableCell
                      align="center"
                      sx={{
                        color: "#d4af37",
                        fontWeight: 700,
                        fontSize: { xs: "0.9rem", sm: "1.1rem" },
                        fontFamily: '"Cinzel", serif',
                        borderRight: "1px solid #8B4513",
                        width: "80px",
                      }}
                    >
                      d20
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#d4af37",
                        fontWeight: 700,
                        fontSize: { xs: "0.9rem", sm: "1.1rem" },
                        fontFamily: '"Cinzel", serif',
                        borderRight: "1px solid #8B4513",
                      }}
                    >
                      Arma/Armadura Mágica
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#d4af37",
                        fontWeight: 700,
                        fontSize: { xs: "0.9rem", sm: "1.1rem" },
                        fontFamily: '"Cinzel", serif',
                        borderRight: "1px solid #8B4513",
                        width: { xs: "120px", sm: "180px" },
                      }}
                    >
                      Efeitos
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#d4af37",
                        fontWeight: 700,
                        fontSize: { xs: "0.9rem", sm: "1.1rem" },
                        fontFamily: '"Cinzel", serif',
                        width: { xs: "100px", sm: "150px" },
                      }}
                    >
                      Preço
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {generateMagicArsenalD20Table().map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        "&:nth-of-type(odd)": {
                          backgroundColor: "rgba(28, 24, 18, 0.5)",
                        },
                        "&:nth-of-type(even)": {
                          backgroundColor: "rgba(28, 24, 18, 0.7)",
                        },
                        "&:hover": {
                          backgroundColor:
                            "rgba(212, 175, 55, 0.15) !important",
                        },
                        transition: "all 0.2s",
                      }}
                    >
                      <TableCell
                        align="center"
                        sx={{
                          color: "#DAA520",
                          fontWeight: 700,
                          fontSize: { xs: "0.9rem", sm: "1rem" },
                          borderRight: "1px solid #8B4513",
                          fontFamily: '"Cinzel", serif',
                        }}
                      >
                        {row.roll}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "#d4c5a0",
                          fontSize: { xs: "0.85rem", sm: "0.95rem" },
                          fontFamily: '"Crimson Text", serif',
                          borderRight: "1px solid #8B4513",
                        }}
                      >
                        {row.item}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "#d4c5a0",
                          fontSize: { xs: "0.85rem", sm: "0.95rem" },
                          fontFamily: '"Crimson Text", serif',
                          borderRight: "1px solid #8B4513",
                        }}
                      >
                        {row.effect}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "#DAA520",
                          fontSize: { xs: "0.8rem", sm: "0.9rem" },
                          fontFamily: '"Crimson Text", serif',
                        }}
                      >
                        {row.price}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <ParchmentText
              sx={{
                textAlign: "center",
                fontStyle: "italic",
                color: "#d4af37",
                fontSize: "0.9rem",
              }}
            >
              Role 1d20 para determinar que tipo de arma ou armadura mágica foi encontrada. Preços no formato: Compra / Venda
            </ParchmentText>
          </Box>

          {/* CATEGORY CHOICE BOX */}
          <Box
            sx={{
              mt: 4,
              mb: 4,
              p: 3,
              border: "3px solid #8B7355",
              borderRadius: "6px",
              backgroundColor: "rgba(139, 115, 85, 0.1)",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
            }}
          >
            <ParchmentText
              sx={{
                fontSize: "1.3rem",
                fontWeight: 700,
                color: "#d4af37",
                mb: 2,
                textAlign: "center",
                fontFamily: '"Cinzel", serif',
              }}
            >
              Escolha de Item por Categoria
            </ParchmentText>

            <ParchmentText sx={{ mb: 2 }}>
              Se uma entrada na tabela especificar apenas uma <strong>classe de item</strong> (ex: "Arma a distância"), o jogador pode escolher <strong>qualquer item específico daquela categoria</strong>. Todos terão o mesmo preço e bônus listados na tabela.
            </ParchmentText>

            <ParchmentText sx={{ fontStyle: "italic", color: "#c4a870", mb: 1 }}>
              <strong>Exemplo:</strong>
            </ParchmentText>

            <ParchmentText sx={{ ml: 3, color: "#d4c5a0" }}>
              • Ao rolar <em>"Arma a distância obra-prima"</em>, o jogador pode escolher entre um <strong>Arco</strong>, <strong>Besta</strong>, ou <strong>Arma Arremessável</strong>. Todos terão +1 de dano e custarão 300/125 coroas.
            </ParchmentText>
          </Box>

          {/* WARBAND SPECIFIC EQUIPMENT BOX */}
          <Box
            sx={{
              mb: 6,
              p: 3,
              border: "3px solid #DAA520",
              borderRadius: "6px",
              backgroundColor: "rgba(212, 175, 55, 0.1)",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
            }}
          >
            <ParchmentText
              sx={{
                fontSize: "1.3rem",
                fontWeight: 700,
                color: "#d4af37",
                mb: 2,
                textAlign: "center",
                fontFamily: '"Cinzel", serif',
              }}
            >
              ⚔️ Equipamento Exclusivo de Warband
            </ParchmentText>

            <ParchmentText sx={{ mb: 2 }}>
              Uma warband pode trocar uma rolagem nesta tabela por um <strong>equipamento equivalente exclusivo</strong> do seu bando com o <strong>mesmo bônus</strong>.
            </ParchmentText>

            <ParchmentText sx={{ fontStyle: "italic", color: "#c4a870", mb: 1 }}>
              <strong>Exemplos:</strong>
            </ParchmentText>

            <ParchmentText sx={{ ml: 3, mb: 1, color: "#d4c5a0" }}>
              • Uma warband <strong>Skaven</strong> rola uma <em>Adaga Serrilhada (+1 dano)</em>. Pode ao invés ganhar um par de <strong>Garras de Combate Skaven</strong> com +1 de dano.
            </ParchmentText>

            <ParchmentText sx={{ ml: 3, color: "#d4c5a0" }}>
              • Uma warband da <strong>Guarda Marítima de Ulthuan</strong> rola um <em>Cajado de Madeira Loreana (+1 Ímpeto)</em>. Pode ao invés ganhar uma <strong>Glaive de Guerra Élfica</strong> com +1 de Ímpeto.
            </ParchmentText>

            <ParchmentText sx={{ mt: 2, fontSize: "0.9rem", fontStyle: "italic", textAlign: "center", color: "#9d8f7a" }}>
              O equipamento trocado deve ter o mesmo bônus mecânico do item rolado e ser temático para a warband.
            </ParchmentText>
          </Box>

          {/* DIVIDER */}
          <Box
            sx={{
              height: "2px",
              background:
                "linear-gradient(to right, transparent, #d4af37, transparent)",
              mb: 5,
            }}
          />
        </ContentContainer>
      </ContentSection>

      {/* WEAPONS SECTION */}
      {magicWeapons && (
        <ContentSection>
          <ContentContainer>
            <Box
              sx={{
                mb: 6,
                p: 4,
                border: "3px solid #d4af37",
                borderRadius: "8px",
                backgroundColor: "rgba(212, 175, 55, 0.08)",
              }}
            >
              <PowerListTitle>
                {magicWeapons.icon} {magicWeapons.label}
              </PowerListTitle>

              {magicWeapons.items.map((item) => (
                <EquipmentItemCard
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  properties={item.properties}
                  description={item.description}
                />
              ))}
            </Box>
          </ContentContainer>
        </ContentSection>
      )}

      {/* ARMOR SECTION */}
      {magicArmor && (
        <ContentSection>
          <ContentContainer>
            <Box
              sx={{
                mb: 6,
                p: 4,
                border: "3px solid #d4af37",
                borderRadius: "8px",
                backgroundColor: "rgba(212, 175, 55, 0.08)",
              }}
            >
              <PowerListTitle>
                {magicArmor.icon} {magicArmor.label}
              </PowerListTitle>

              {magicArmor.items.map((item) => (
                <EquipmentItemCard
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  properties={item.properties}
                  description={item.description}
                />
              ))}
            </Box>
          </ContentContainer>
        </ContentSection>
      )}

      <ContentSection>
        <ContentContainer>
          <ParchmentText
            sx={{
              mt: 6,
              p: 4,
              border: "3px solid #DAA520",
              borderRadius: "6px",
              backgroundColor: "rgba(212, 175, 55, 0.05)",
              fontStyle: "italic",
              textAlign: "center",
            }}
          >
            "Na Cidade dos Amaldiçoados, seu equipamento é sua vida. Uma boa espada pode clivar demônios. Boa armadura pode desviar a própria morte. Mas lembre-se — em Mordheim, todo item mágico tem um preço. Alguns exigem ouro. Outros exigem sangue. E alguns... exigem sua alma."
            <br />
            <br />— Marcus, o Veterano, Comandante da Legião Perdida
          </ParchmentText>
        </ContentContainer>
      </ContentSection>
      <NavigationSection>
        <StyledNavigationButton
          variant="contained"
          onClick={() => navigate("/")}
        >
          Voltar ao Início
        </StyledNavigationButton>
      </NavigationSection>
    </PageContainer>
  );
}
