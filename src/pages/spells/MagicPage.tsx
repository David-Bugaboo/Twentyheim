import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "../../components/Header";
import {
  PageContainer,
  ContentSection,
  NavigationSection,
  StyledNavigationButton,
  ContentContainer,
  ParchmentText,
  PowerListTitle,
  QuoteBox,
  QuoteAttribution,
} from "../../components/PageComponents";

export default function MagicPage() {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <Header title="Magia em Mordheim" />

      <ContentSection>
        <ContentContainer>
          <QuoteBox>
            "A força da Magia diminuiu desde os tempos antigos. Embora sejamos
            afortunados que exércitos de Daemônios não vaguem mais pela terra,
            também devemos perceber que as magias mais poderosas agora estão
            perdidas para nós. Apenas em artefatos como o Martelo de Sigmar
            restam traços do antigo poder."
            <QuoteAttribution>
              Maximilian, Hierofante da Ordem da Luz
            </QuoteAttribution>
          </QuoteBox>

          <ParchmentText sx={{ mb: 3 }}>
            Embora a magia no velho mundo permeie tudo, conjuradores são
            incomuns. Os mistérios arcanos são conhecidos apenas por poucos, e
            há muitas crenças falsas, ideias equivocadas e superstições
            estranhas sobre magia. O povo comum pode lhe contar todo tipo de
            coisas sobre magia, se são verdadeiras ou não, é outra questão…
          </ParchmentText>

          <PowerListTitle>A Natureza da Magia</PowerListTitle>

          <ParchmentText sx={{ mb: 3 }}>
            Como os Magistrados veem, usar magia é dar forma à substância do
            Caos puro. Um Mago usa sua vontade e sua própria carne para formar
            um conduto entre este mundo e o reino imaterial (conhecido como
            Aethyr e o Reino do Caos), extraindo poder dos "ventos" da magia.
            Através de treinamento, força de vontade e talento inato, um
            Magistrado pode invocar fogo, criar ilusões ou transmutar chumbo em
            ouro. Ao mesmo tempo, ele pode trazer desastre, ou atrair a atenção
            de olhos invisíveis. Muitos sussurram que Demônios cavalgam os
            Ventos da Magia, sempre atentos para avistar aqueles que se demoram
            em seu domínio. Seja qual for a verdade disso, é comumente aceito
            que a magia é uma amante inconstante, com faces tanto cruéis quanto
            gentis.
          </ParchmentText>

          <PowerListTitle>Os Ventos da Magia</PowerListTitle>

          <ParchmentText sx={{ mb: 3 }}>
            Assim como o emblema do Caos tem oito flechas, a magia também tem
            oito ventos. Eles sopram pelo mundo, carregando a energia do Caos
            com eles. Enquanto a magia bruta é unificada dentro do Reino do
            Caos, quando ela vem para este mundo, refrata-se em oito "cores",
            conhecidas coletivamente como os Ventos da Magia. Conjuradores
            ganham seu poder ao se conectar a esses Ventos da Magia. Alguns
            fazem isso juntando-se a uma Ordem dedicada ao estudo de uma cor da
            magia. Outros fazem isso através de oração, sorte ou instinto. Como
            estão brincando com a essência do próprio Caos, sejam quais forem
            seus métodos, todos os conjuradores arriscam suas vidas e até suas
            almas quando praticam magia.
            <br />
            Existem dois tipos principais de magia: arcana e divina.{" "}
            <strong>Conjuradores arcanos</strong>, tipicamente conhecidos como
            Magos, usam fórmulas mágicas e força de vontade pessoal para
            comandar e controlar os Ventos da Magia.
            <strong> Conjuradores divinos</strong>, tipicamente conhecidos como
            Sacerdotes, usam fé e rituais religiosos para trabalhar magia.
            Assim, Magos acreditam que sua própria força interior alimenta seus
            feitiços, enquanto Sacerdotes acreditam que seus feitiços são
            presentes dos Deuses em troca de devoção e oração. Magia Divina
            tende a ser mais segura que Magia Arcana porque é altamente
            ritualizada. Toda magia tem seus riscos, no entanto, como é
            amplamente demonstrado pela Magia Sombria. Esta é um subconjunto da
            Magia Arcana, cujos praticantes estão dispostos a correr riscos
            pessoais ainda maiores por poder aumentado.
          </ParchmentText>

          <PowerListTitle sx={{ mt: 5 }}>Anatomia de uma Magia</PowerListTitle>

          <ParchmentText sx={{ mb: 3 }}>
            Cada magia nesse jogo é descrita seguindo um padrão consistente,
            revelando os segredos necessários para sua invocação — ou os perigos
            que aguardam aqueles tolos o suficiente para tentar:
          </ParchmentText>

          <Box
            sx={{
              p: 3,
              mb: 3,
              backgroundColor: "rgba(28, 24, 18, 0.6)",
              border: "1px solid rgba(212, 175, 55, 0.3)",
              borderRadius: "6px",
            }}
          >
            <ParchmentText sx={{ fontWeight: 700, color: "#d4af37", mb: 1 }}>
              NOME
            </ParchmentText>
            <ParchmentText sx={{ mb: 2, fontSize: "0.95rem" }}>
              O nome pelo qual a magia é conhecida nas universidades do Império
              ou nos círculos menos prestigiados de feiticeiros profanos. Cada
              tradição mágica guarda seus próprios títulos arcanos, transmitidos
              através de gerações de mestres e aprendizes.
            </ParchmentText>

            <ParchmentText sx={{ fontWeight: 700, color: "#d4af37", mb: 1 }}>
              TRADIÇÃO
            </ParchmentText>
            <ParchmentText sx={{ mb: 2, fontSize: "0.95rem" }}>
              A escola mágica à qual o feitiço pertence — seja uma das Oito
              Tradições Arcanas dos Colégios Imperiais, as orações divinas dos
              deuses, ou os sussurros sombrios do Caos.
            </ParchmentText>

            <ParchmentText sx={{ fontWeight: 700, color: "#d4af37", mb: 1 }}>
              CLASSE DE DIFICULDADE
            </ParchmentText>
            <ParchmentText sx={{ mb: 2, fontSize: "0.95rem" }}>
              O número que determina quão árduo é canalizar os Ventos da Magia
              para manifestar este feitiço. Quanto maior o número, mais perigosa
              a tentativa — e maior a chance de atrair olhares indesejados do
              Imaterium.
            </ParchmentText>

            <ParchmentText sx={{ fontWeight: 700, color: "#d4af37", mb: 1 }}>
              ALVOS
            </ParchmentText>
            <ParchmentText sx={{ fontSize: "0.95rem" }}>
              Define quando e como a magia pode ser usada — quem ou o que pode
              ser afetado pelos efeitos do feitiço, e sob quais circunstâncias a
              magia pode ser invocada.
            </ParchmentText>
          </Box>

          <PowerListTitle>Tipos de Alvos</PowerListTitle>

          <ParchmentText sx={{ mb: 3 }}>
            O tipo de alvo determina quando e como uma magia pode ser invocada.
            Alguns feitiços possuem múltiplos tipos de alvos, permitindo ao
            conjurador escolher qual aplicar em uma dada situação — um luxo raro
            em meio ao caos da batalha.
          </ParchmentText>

          <Box
            sx={{
              p: 2.5,
              mb: 2.5,
              backgroundColor: "rgba(28, 24, 18, 0.6)",
              border: "1px solid rgba(139, 0, 0, 0.4)",
              borderRadius: "6px",
            }}
          >
            <ParchmentText
              sx={{
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "#ff6b6b",
                fontFamily: '"Cinzel", serif',
                mb: 1,
              }}
            >
              EFEITO DE ÁREA
            </ParchmentText>
            <ParchmentText sx={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
              Estas magias afetam uma área determinada — seja o espaço dentro de
              uma certa distância de um ponto alvo, ou a mesa inteira caso o
              conjurador seja poderoso (ou insano) o suficiente. Para magias de
              Efeito de Área que geram um ataque, faça uma rolagem de ataque
              separada contra cada alvo. Os gritos dos atingidos ecoam pelas
              ruínas como um coro macabro.
            </ParchmentText>
          </Box>

          <Box
            sx={{
              p: 2.5,
              mb: 2.5,
              backgroundColor: "rgba(28, 24, 18, 0.6)",
              border: "1px solid rgba(147, 51, 234, 0.4)",
              borderRadius: "6px",
            }}
          >
            <ParchmentText
              sx={{
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "#a78bfa",
                fontFamily: '"Cinzel", serif',
                mb: 1,
              }}
            >
              LINHA DE VISÃO
            </ParchmentText>
            <ParchmentText sx={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
              Magias deste tipo podem ser conjuradas em qualquer alvo que esteja
              dentro da linha de visão do conjurador — incluindo o próprio
              conjurador, caso ele seja desesperado o suficiente. Lembre-se, a
              linha de visão nunca pode se estender além de 60cm, pois mesmo os
              Ventos da Magia se dispersam na névoa corrupta que permeia
              Wyrdgrave.
            </ParchmentText>
          </Box>

          <Box
            sx={{
              p: 2.5,
              mb: 2.5,
              backgroundColor: "rgba(28, 24, 18, 0.6)",
              border: "1px solid rgba(34, 139, 34, 0.4)",
              borderRadius: "6px",
            }}
          >
            <ParchmentText
              sx={{
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "#90EE90",
                fontFamily: '"Cinzel", serif',
                mb: 1,
              }}
            >
              FORA DE JOGO (D ou A)
            </ParchmentText>
            <ParchmentText sx={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
              Estas magias não podem ser conjuradas durante uma partida. Em vez
              disso, são rituais realizados em momentos de relativa calma —{" "}
              <strong>(D)</strong> após uma expedição às ruínas, quando os
              sobreviventes retornam à sua base ensanguentados mas vivos, ou{" "}
              <strong>(A)</strong> antes de uma incursão, enquanto preparativos
              sombrios são feitos. O mago e o aprendiz podem tentar conjurar
              cada magia Fora de Jogo uma vez antes ou depois de cada partida.
              Estas magias não podem ser potencializadas, nem causam dano por
              falha. Nenhuma experiência é ganha por conjurá-las — o ritual em
              si é sua própria recompensa... ou maldição.
            </ParchmentText>
          </Box>

          <Box
            sx={{
              p: 2.5,
              mb: 2.5,
              backgroundColor: "rgba(28, 24, 18, 0.6)",
              border: "1px solid rgba(255, 215, 0, 0.4)",
              borderRadius: "6px",
            }}
          >
            <ParchmentText
              sx={{
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "#FFD700",
                fontFamily: '"Cinzel", serif',
                mb: 1,
              }}
            >
              APENAS O CONJURADOR
            </ParchmentText>
            <ParchmentText sx={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
              Estas magias afetam apenas a figura que as conjurou e nunca podem
              ser lançadas sobre outra pessoa. São feitiços que alteram a
              própria essência do conjurador, entrelaçando seu corpo e alma com
              os Ventos da Magia de formas que nenhum outro poderia suportar.
            </ParchmentText>
          </Box>

          <Box
            sx={{
              p: 2.5,
              mb: 4,
              backgroundColor: "rgba(28, 24, 18, 0.6)",
              border: "1px solid rgba(212, 175, 55, 0.4)",
              borderRadius: "6px",
            }}
          >
            <ParchmentText
              sx={{
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "#d4af37",
                fontFamily: '"Cinzel", serif',
                mb: 1,
              }}
            >
              TOQUE
            </ParchmentText>
            <ParchmentText sx={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
              O conjurador deve estar em contato de base com o alvo da magia —
              próximo o suficiente para sentir o calor de sua respiração, ver o
              medo em seus olhos, ou tocar a ferida que busca curar.
              Conjuradores podem lançar estas magias sobre si mesmos, desde que
              suas mãos ainda obedeçam aos seus comandos.
            </ParchmentText>
          </Box>
        </ContentContainer>
      </ContentSection>

      <NavigationSection>
        <Box sx={{ maxWidth: "700px", width: "100%" }}>
          <PowerListTitle>Tradições Mágicas</PowerListTitle>

          <StyledNavigationButton
            onClick={() => navigate("/magic/arcane-lores")}
            variant="outlined"
            fullWidth
            sx={{ mb: 3, py: 3, fontSize: "1.2rem" }}
          >
            Tradições Arcanas
          </StyledNavigationButton>

          <StyledNavigationButton
            onClick={() => navigate("/magic/divine-lores")}
            variant="outlined"
            fullWidth
            sx={{ mb: 3, py: 3, fontSize: "1.2rem" }}
          >
            Tradições Divinas
          </StyledNavigationButton>

          <StyledNavigationButton
            onClick={() => navigate("/magic/dark-lores")}
            variant="outlined"
            fullWidth
            sx={{ mb: 3, py: 3, fontSize: "1.2rem" }}
          >
            Tradições Sombrias
          </StyledNavigationButton>

          <StyledNavigationButton
            onClick={() => navigate("/magic/greenskin-lores")}
            variant="outlined"
            fullWidth
            sx={{ mb: 3, py: 3, fontSize: "1.2rem" }}
          >
            Tradições Peles-Verdes
          </StyledNavigationButton>

          <StyledNavigationButton
            variant="contained"
            onClick={() => navigate("/")}
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
