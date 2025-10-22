import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import SpellCard from "../../components/SpellCard";
import {
  PageContainer,
  ContentSection,
  NavigationSection,
  StyledNavigationButton,
  ContentContainer,
  ParchmentText,
  PowerListTitle,
} from "../../components/PageComponents";

export default function PrayersOfUlricPage() {
  const navigate = useNavigate();

  const spells = [
    {
      name: "Congelamento Invernal",
      castingNumber: 10,
      keywords: ["Area de Efeito(Zona Média)"],
      effect:
        "Centralize  a Área de Efeito no Conjurador e mova a área junto a ele. Todas as figuras inimigas na área de efeito recebem -2 Ímpeto, seus movimentos tornando-se lentos e pesados como se estivessem presos em neve profunda.",
    },
    {
      name: "Fúria da Batalha",
      castingNumber: 12,
      keywords: ["Linha de Visão"],
      effect:
        "A figura alvo ganha +1 Ímpeto e +1 Movimento pelo resto do jogo. múltiplas conjurações de Fúria da Batalha no mesmo alvo não têm efeito.",
    },
    {
      name: "Uivo do Lobo",
      castingNumber: 8,
      keywords: ["Linha de Visão"],
      effect:
        "A figura aliada alvo será ativada imediatamente após o sacerdote.",
    },
    {
      name: "Coração do Lobo",
      castingNumber: 12,
      keywords: ["Linha de Visão"],
      effect:
        "O alvo desta oração torna-se imune a Aterrorizante pelo resto do jogo. A vontade da figura é fortalecida pelo espírito do predador, recebendo +2 Vontade pelo resto do jogo.",
    },
    {
      name: "Fúria Invernal",
      castingNumber: 14,
      keywords: ["Área de Efeito(Explosão Média)"],
      effect:
        "Centraliza a Área de Efeito no conjurador. Todas as figuras inimigas na área de efeito sofrem um ataque gélido +0. Figuras atingidas ganham um marcador de congelamento.",
    },
    {
      name: "Impacto Gélido",
      castingNumber: 14,
      keywords: ["Apenas o Conjurador"],
      effect:
        "Essa magia só pode ser conjurada em combate. O conjurador recebe uma ação de Luta gratuita que deve ser usada imediatamente. O conjurador recebe +4 Ímpeto durante esta ação, seus golpes caindo como martelos de avalanche. Criaturas atingidas por este ataque ganham um Marcador de Atordoamento.",
    },
    {
      name: "Invocar Avalanche",
      castingNumber: 12,
      keywords: ["Linha de Visão", "Área de Efeito(Explosão Grande)"],
      effect:
        "Todas as criaturas na área de efeito devem fazer um teste de Vontade com CD igual a conjuração dessa magia. Se falharem, são empurrados para o centro da área de efeito em linha reta. Figuras que colidirem em terrenos com mais de 3cm de altura interrompem o movimento e ganham um marcador de Atordoamento. ",
    },
    {
      name: "Convocar Geleira",
      castingNumber: 10,
      keywords: ["Linha de Visão", "Área de Efeito(Muro)"],
      effect:
        "A ärea de efeito deve ser posicionada totalmente dentro da linha de visão do conjurador. A área de efeito bloqueia linha de visão e pode ser usada como cobertura. Quando uma criatura tenta escalar essa Área de Efeito, ela deve rolar um teste de Vontade contra a Rolagem de Conjuração dessa magia. Se falhar, sua ativação termina imediatamente e quaisquer outra ação é perdido.",
    },
    {
      name: "Nevasca",
      castingNumber: 12,
      keywords: ["Área de Efeito(CAMPO INTEIRO)"],
      effect:
        "Todos os ataques com arco e besta são feitos com -1 Precisão pelo resto do jogo. Esta magia pode ser conjurada múltiplas vezes (e por múltiplos conjuradores), com cada conjuração adicional aumentando a penalidade em mais -1, até um máximo de -5.",
    },
    {
      name: "Dádiva de Ulric",
      castingNumber: 12,
      keywords: ["Ritual"],
      effect:
        "O Conjurador invoca um Grande Lobo Branco como membro permanente do bando, que usa as estatísticas de um lobo, com +2 de Ímpeto, +2 de Armadura e +3 de Vontade, e conta como um soldado do bando. Um conjurador só pode ter um Grande Lobo Branco por vez.",
    },
    {
      name: "Enregelar",
      castingNumber: 10,
      keywords: ["Linha de Visão"],
      effect:
        "A figura alvo é ganha um marcador de congelamento. Ela pode fazer um teste de Vontade com CD igual a conjuração dessa magia. Se passar, ela remove o Marcador de Congelamento.",
    },
    {
      name: "Selvageria Lupina",
      castingNumber: 10,
      keywords: ["Conjurador Apenas"],
      effect:
        "O conjurador pode ativar mais duas vezes durante esse turno, mas essas ativações não podem consecutivas. O conjurador não pode ativar soldados junto a si ou fazer parte de uma ativação em grupo nessas fases. O conjurador pode realizar uma ação em cada uma dessas duas fases e pode tomar qualquer ação - não está limitado ao movimento. Se o conjurador se moveu em alguma ativação anterior durante o turno, qualquer ação de movimento adicional é com metade da velocidade. Se um conjurador conjurar esta magia em turnos consecutivos, ele sofre imediatamente 8 pontos de dano.",
    },
  ];

  return (
    <PageContainer>
      <Header title="Orações de Ulric" />

      <ContentSection>
        <ContentContainer>
          <ParchmentText
            sx={{
              textAlign: "center",
              fontSize: "1.2rem",
              fontStyle: "italic",
              color: "#87ceeb",
              mb: 3,
            }}
          >
            🐺 A Bênção Selvagem do Lobo Branco
          </ParchmentText>

          <ParchmentText sx={{ mb: 4 }}>
            Ulric, o Deus do Inverno, dos Lobos e da Guerra, é a divindade
            patrona ancestral das tribos do norte. Seus sacerdotes são
            guerreiros ferozes que encarnam a força selvagem do lobo e o frio
            impiedoso do inverno. Através de suas orações, podem convocar
            nevascas devastadoras, transformar-se em grandes lobos, e imbuir
            seus aliados com a fúria da batalha. As Orações de Ulric são um
            testemunho da força primordial e das duras realidades da
            sobrevivência no norte congelado. Apenas os fortes sobrevivem nas
            terras do Lobo Branco, onde a fraqueza significa morte certa.
          </ParchmentText>

          <PowerListTitle>Orações de Ulric</PowerListTitle>

          {spells.map((spell, index) => (
            <SpellCard
              key={index}
              id={spell.name.toLowerCase().replace(/\s+/g, "-")}
              name={spell.name}
              school="Orações de Ulric"
              castingNumber={spell.castingNumber}
              keywords={spell.keywords}
              effect={spell.effect}
            />
          ))}
        </ContentContainer>
      </ContentSection>

      <NavigationSection>
        <StyledNavigationButton
          variant="contained"
          onClick={() => navigate("/magic/divine-lores")}
        >
          Voltar para Tradições Divinas
        </StyledNavigationButton>
      </NavigationSection>
    </PageContainer>
  );
}
