import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import CollapsibleSection from "../../../components/CollapsibleSection";
import MobileText from "../../../components/MobileText";


const SellingWyrdstoneSection = () => {
  

  return (
    <CollapsibleSection
      id="vendendo-pedra-bruxa"
      title="5. Vendendo Pedra-Bruxa"
    
    >
      <MobileText className="mb-4">
        O momento da verdade. A razão pela qual sangue foi derramado. O bando
        venderá a Pedra-bruxa que obteve durante o jogo e sua exploração. Cada
        fragmento verde e pulsante será trocado por ouro, itens, ou — com muita
        sorte — tesouros que valem mais que ouro.
      </MobileText>

      <MobileText className="mb-4">
        Para cada fragmento de Pedra-bruxa obtido, role <strong>uma vez</strong>{" "}
        na tabela abaixo. A rolagem é necessária porque a oferta e demanda é{" "}
        <strong>altamente flutuante</strong>. Em uma semana, a Pedra-bruxa vale
        seu peso em ouro. Em outra, a saturação dela no mercado ou notícias de
        algum nobre corrompido por suas energias reduzem grandemente seu valor.
        Mercadores são inconstantes. Mercados, mais ainda.
      </MobileText>

      {/* Tabela de Venda de Pedra-Bruxa */}

      <MobileText variant="heading" className="mb-3">
        Tabela de Venda de Pedra-Bruxa
      </MobileText>

      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: "rgba(28, 24, 18, 0.8)",
          border: "2px solid #8b7355",
          mb: 3,
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
                sx={{ color: "#d4c4a8", borderBottom: "1px solid #8b7355" }}
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
                sx={{ color: "#d4c4a8", borderBottom: "1px solid #8b7355" }}
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
                sx={{ color: "#d4c4a8", borderBottom: "1px solid #8b7355" }}
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
                sx={{ color: "#d4c4a8", borderBottom: "1px solid #8b7355" }}
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
                sx={{ color: "#d4c4a8", borderBottom: "1px solid #8b7355" }}
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
                sx={{ color: "#d4c4a8", borderBottom: "1px solid #8b7355" }}
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
                sx={{ color: "#d4c4a8", borderBottom: "1px solid #8b7355" }}
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
                sx={{ color: "#d4c4a8", borderBottom: "1px solid #8b7355" }}
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
                sx={{ color: "#d4c4a8", borderBottom: "1px solid #8b7355" }}
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
                sx={{ color: "#d4c4a8", borderBottom: "1px solid #8b7355" }}
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
                sx={{ color: "#d4c4a8", borderBottom: "1px solid #8b7355" }}
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
                sx={{ color: "#d4c4a8", borderBottom: "1px solid #8b7355" }}
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
                sx={{ color: "#d4c4a8", borderBottom: "1px solid #8b7355" }}
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
                sx={{ color: "#d4c4a8", borderBottom: "1px solid #8b7355" }}
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
                sx={{ color: "#d4c4a8", borderBottom: "1px solid #8b7355" }}
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
                sx={{ color: "#d4c4a8", borderBottom: "1px solid #8b7355" }}
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
                sx={{ color: "#d4c4a8", borderBottom: "1px solid #8b7355" }}
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
                sx={{ color: "#d4c4a8", borderBottom: "1px solid #8b7355" }}
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
                sx={{ color: "#d4c4a8", borderBottom: "1px solid #8b7355" }}
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
                sx={{ color: "#d4c4a8", borderBottom: "1px solid #8b7355" }}
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
                sx={{ color: "#d4c4a8", borderBottom: "1px solid #8b7355" }}
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
              <TableCell sx={{ color: "#d4c4a8", borderBottom: "none" }}>
                Mapa de Mordheim + 50 coroas
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <MobileText className="italic text-[#b89d9d] text-sm">
        Note: Para Poções, Equipamento Obra-Prima e Relíquias, role nas tabelas
        apropriadas para determinar o item específico recebido. A tabela contém
        links para as páginas do tipo de item que foi rolado — as tabelas
        específicas e regras detalhadas de cada categoria estão nessas páginas.
      </MobileText>

      {/* Exemplo de Venda */}
      <div className="bg-[#2a1f1f] p-4 rounded-lg border border-[#382929] mb-6">
        <MobileText variant="heading" className="mb-3 text-[#d4af37]">
          Exemplo: O Mercado Flutuante
        </MobileText>

        <MobileText className="italic text-[#b89d9d] mb-3">
          Klaus retornou com três fragmentos de Pedra-bruxa. Três homens
          morreram por eles. Ele levou os fragmentos ao mercado negro, onde
          mercadores de olhos famintos aguardam.
        </MobileText>

        <MobileText className="italic text-[#b89d9d] mb-3">
          <strong>Primeiro fragmento:</strong> Rola d20 = 7. 100 coroas! Um
          conde desesperado pagou bem.
          <br />
          <strong>Segundo fragmento:</strong> Rola d20 = 2. 30 coroas. Mercado
          saturado.
          <br />
          <strong>Terceiro fragmento:</strong> Rola d20 = 17. Relíquia! Um
          mercador ofereceu um amuleto antigo ao invés de ouro.
        </MobileText>

        <MobileText className="italic text-[#b89d9d]">
          Total: 130 coroas e uma relíquia. Klaus olhou para os três fragmentos
          que custaram três vidas. "Vale a pena?" um soldado perguntou. Klaus
          não respondeu. A resposta é sempre a mesma: depende de você estar vivo
          para gastar.
        </MobileText>
      </div>
    </CollapsibleSection>
  );
};

export default SellingWyrdstoneSection;
