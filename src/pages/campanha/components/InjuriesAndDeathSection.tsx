import CollapsibleSection from "../../../components/CollapsibleSection";
import MobileText from "../../../components/MobileText";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const InjuriesAndDeathSection = () => {


  return (
    <CollapsibleSection
      id="ferimentos-e-morte"
      title="1. Ferimentos e Morte"
    
    >
      <MobileText className="mb-4">
        Para cada modelo que foi reduzido a 0 de Vigor durante o jogo, existe a
        possibilidade de que aquele modelo sofra ferimentos permanentes ou
        morra. Em Mordheim, cair não significa necessariamente morte — às vezes
        significa algo pior.
      </MobileText>

      <MobileText variant="heading" className="mb-3">
        Sobrevivência de Soldados
      </MobileText>

      <MobileText className="mb-3">
        Para cada soldado que caiu, role um d20:
      </MobileText>

      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: "#1a1a1a",
          border: "1px solid #382929",
          mb: 3,
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  backgroundColor: "#8b7355",
                  color: "#d4af37",
                  fontWeight: "bold",
                  textAlign: "center",
                  width: "20%",
                }}
              >
                d20
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "#8b7355",
                  color: "#d4af37",
                  fontWeight: "bold",
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
                  textAlign: "center",
                }}
              >
                1-4
              </TableCell>
              <TableCell sx={{ color: "#d4c4a8" }}>
                <strong>Morto.</strong> O soldado não sobreviveu. Simples assim.
                Remova-o da lista de campanha. Alguém terá que cavar uma cova...
                se houver tempo.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                sx={{
                  color: "#d4c4a8",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                5-8
              </TableCell>
              <TableCell sx={{ color: "#d4c4a8" }}>
                <strong>Gravemente Ferido.</strong> O soldado vive, mas mal. Não
                poderá ser usado no próximo jogo. O soldado ferido pode ser
                substituído temporariamente por qualquer figura de custo
                gratuito que o bando possa recrutar.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                sx={{
                  color: "#d4c4a8",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                9+
              </TableCell>
              <TableCell sx={{ color: "#d4c4a8" }}>
                <strong>Sobrevive.</strong> O soldado volta, talvez com novas
                cicatrizes e pesadelos, mas funcional. Em Mordheim, isso conta
                como sorte.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <MobileText variant="heading" className="mb-3">
        Sobrevivência de Heróis e Campeões
      </MobileText>

      <MobileText className="mb-3">
        Heróis e campeões são mais resistentes — ou mais teimosos — que soldados
        comuns. Mas até eles podem cair permanentemente. Role um d20{" "}
        <strong>+1</strong>:
      </MobileText>

      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: "#1a1a1a",
          border: "1px solid #382929",
          mb: 3,
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  backgroundColor: "#8b7355",
                  color: "#d4af37",
                  fontWeight: "bold",
                  textAlign: "center",
                  width: "20%",
                }}
              >
                d20
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "#8b7355",
                  color: "#d4af37",
                  fontWeight: "bold",
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
                  textAlign: "center",
                }}
              >
                1
              </TableCell>
              <TableCell sx={{ color: "#d4c4a8" }}>
                <strong>Morto.</strong> O líder caiu. Para sempre. Veja as
                regras de Novos Recrutas para substituí-lo.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                sx={{
                  color: "#d4c4a8",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                2-4
              </TableCell>
              <TableCell sx={{ color: "#d4c4a8" }}>
                <strong>Ferimento Permanente.</strong> A figura sofre um
                ferimento que nunca cicatriza completamente. Role na Tabela de
                Ferimentos Permanentes abaixo para determinar a natureza exata
                do ferimento. A figura retorna para o próximo jogo com Vigor
                completo — mas nunca mais será a mesma.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                sx={{
                  color: "#d4c4a8",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                5-6
              </TableCell>
              <TableCell sx={{ color: "#d4c4a8" }}>
                <strong>Gravemente Ferido.</strong> A figura recebeu ferimentos
                que levarão tempo para curar. O jogador escolhe: gastar{" "}
                <strong>75 coroas em ervas medicinais especializadas</strong> (e
                a figura joga o próximo jogo normalmente), ou a figura começa o
                próximo jogo com <strong>-5 de Vigor</strong>. Cura rápida custa
                caro.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                sx={{
                  color: "#d4c4a8",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                7-8
              </TableCell>
              <TableCell sx={{ color: "#d4c4a8" }}>
                <strong>Por um Triz.</strong> A figura escapa sem ferimentos
                maiores. Contudo, perde{" "}
                <strong>todos os itens que estava carregando</strong>. Perdidos
                nos escombros, roubados por saqueadores, ou simplesmente
                esquecidos no caos da retirada.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                sx={{
                  color: "#d4c4a8",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                9-20
              </TableCell>
              <TableCell sx={{ color: "#d4c4a8" }}>
                <strong>Recuperação Completa.</strong> Os ferimentos provam ser
                relativamente menores. A figura retorna para o próximo jogo com
                Vigor completo. Sorte. Resistência. Ou talvez os deuses ainda
                não terminaram com ela.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <MobileText variant="heading" className="mb-3">
        Tabela de Ferimentos Permanentes
      </MobileText>

      <MobileText className="mb-4">
        Quando uma figura recebe um ferimento permanente, ele deve ser listado
        nas anotações daquela figura na sua ficha de campanha. Estas são as
        cicatrizes que nunca curam, os lembretes físicos de que Mordheim não
        perdoa.
      </MobileText>

      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: "#1a1a1a",
          border: "1px solid #382929",
          mb: 3,
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  backgroundColor: "#8b7355",
                  color: "#d4af37",
                  fontWeight: "bold",
                  textAlign: "center",
                  width: "15%",
                }}
              >
                d20
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "#8b7355",
                  color: "#d4af37",
                  fontWeight: "bold",
                  width: "25%",
                }}
              >
                Ferimento
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "#8b7355",
                  color: "#d4af37",
                  fontWeight: "bold",
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
                  textAlign: "center",
                }}
              >
                1-2
              </TableCell>
              <TableCell sx={{ color: "#d4af37", fontWeight: "bold" }}>
                Dedos do Pé Perdidos
              </TableCell>
              <TableCell sx={{ color: "#d4c4a8" }}>
                -1 permanente em Movimento. Pode ser recebido duas vezes
                (cumulativo -2). Rolagem adicional deve ser rerolada. Difícil
                correr quando seus pés são só tocos.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                sx={{
                  color: "#d4c4a8",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                3-5
              </TableCell>
              <TableCell sx={{ color: "#d4af37", fontWeight: "bold" }}>
                Perna Destroçada
              </TableCell>
              <TableCell sx={{ color: "#d4c4a8" }}>
                -2 permanentes em Movimento. Pode ser recebido duas vezes
                (cumulativo -4). Rolagem adicional deve ser rerolada. Mancar é
                melhor que rastejar. Mal.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                sx={{
                  color: "#d4c4a8",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                6-10
              </TableCell>
              <TableCell sx={{ color: "#d4af37", fontWeight: "bold" }}>
                Braço Esmagado
              </TableCell>
              <TableCell sx={{ color: "#d4c4a8" }}>
                -1 permanente em Ímpeto. Pode ser recebido duas vezes
                (cumulativo -2). Rolagem adicional deve ser rerolada. O aço
                ainda pesa o mesmo. O braço é que não levanta igual.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                sx={{
                  color: "#d4c4a8",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                11-12
              </TableCell>
              <TableCell sx={{ color: "#d4af37", fontWeight: "bold" }}>
                Dedos Perdidos
              </TableCell>
              <TableCell sx={{ color: "#d4c4a8" }}>
                -1 permanente em Precisão. Pode ser recebido duas vezes
                (cumulativo -2). Rolagem adicional deve ser rerolada. Mirar é
                difícil quando você conta nos dedos e chega a sete.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                sx={{
                  color: "#d4c4a8",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                13-14
              </TableCell>
              <TableCell sx={{ color: "#d4af37", fontWeight: "bold" }}>
                Nunca Mais Tão Forte
              </TableCell>
              <TableCell sx={{ color: "#d4c4a8" }}>
                -2 permanentes em Vigor. Pode ser recebido duas vezes
                (cumulativo -4). Rolagem adicional deve ser rerolada. Os órgãos
                cicatrizam. Mas nunca da mesma forma.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                sx={{
                  color: "#d4c4a8",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                15-16
              </TableCell>
              <TableCell sx={{ color: "#d4af37", fontWeight: "bold" }}>
                Cicatrizes Psicológicas
              </TableCell>
              <TableCell sx={{ color: "#d4c4a8" }}>
                -1 permanente em Vontade. Pode ser recebido duas vezes
                (cumulativo -2). Rolagem adicional deve ser rerolada. Os
                pesadelos nunca param. As mãos nunca param de tremer.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                sx={{
                  color: "#d4c4a8",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                17-18
              </TableCell>
              <TableCell sx={{ color: "#d4af37", fontWeight: "bold" }}>
                Ferimento Persistente
              </TableCell>
              <TableCell sx={{ color: "#d4c4a8" }}>
                Gaste 20 coroas antes de cada jogo ou comece com -3 de Vigor.
                Pode ser recebido duas vezes (40 coroas ou -4 Vigor). Dor
                crônica tem preço crônico.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                sx={{
                  color: "#d4c4a8",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                19
              </TableCell>
              <TableCell sx={{ color: "#d4af37", fontWeight: "bold" }}>
                Maxilar Destroçado
              </TableCell>
              <TableCell sx={{ color: "#d4c4a8" }}>
                Herói ativa apenas 2 soldados (ao invés de 3). Campeão ativa
                apenas 1 soldado (ao invés de 2). Ordens murmuradas através de
                dentes quebrados raramente inspiram.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                sx={{
                  color: "#d4c4a8",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                20
              </TableCell>
              <TableCell sx={{ color: "#d4af37", fontWeight: "bold" }}>
                Olho Perdido
              </TableCell>
              <TableCell sx={{ color: "#d4c4a8" }}>
                -1 em Ímpeto quando alvo de ataque à distância. Duas vezes =
                cego permanentemente, retire da campanha. Difícil lutar nas
                sombras quando você não vê nem a luz.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <MobileText variant="heading" className="mb-3">
        Registrando Ferimentos Permanentes
      </MobileText>

      <MobileText>
        Quando uma figura recebe um ferimento que causa diminuição em um de seus
        atributos, escreva como <strong>atributo dividido</strong>. Por exemplo:
        um herói com Ímpeto +3 que sofre Braço Esmagado agora tem Ímpeto{" "}
        <strong>+3/+2</strong>. O primeiro número é a habilidade real (para
        determinar potencial máximo e nível). O segundo número é a capacidade
        física atual (para todas as rolagens). Lembre-se: em Mordheim, o que
        você era importa menos do que o que você é agora.
      </MobileText>
    </CollapsibleSection>
  );
};

export default InjuriesAndDeathSection;
