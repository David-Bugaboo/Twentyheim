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

export default function LoreOfHashutPage() {
  const navigate = useNavigate();

  const spells = [
    {
      name: "Investida Magmática",
      castingNumber: 10,
      keywords: ["Linha de Visão"],
      effect:
        "nEsta magia só pode ser conjurada em um membro do bando do conjurador. Mova imediatamente a figura alvo até 25cm em qualquer direção horizontal - impulsionada por magma. Este movimento deve ser em linha reta. Não pode curvar. Se o alvo estiver carregando tesouro, este movimento é reduzido para 13cm - o peso extra dificulta. Este movimento não pode tirar uma figura da mesa ou colocá-la em combate. A figura alvo pode se mover através de outras figuras, causando 2 pontos de dano elemental ao fazê-lo - queima quem toca. Uma figura só pode sofrer este dano uma vez por turno. O alvo não pode realizar outras ações neste turno - precisa esfriar.",
    },
    {
      name: "Nuvem de Cinzas",
      castingNumber: 8,
      keywords: ["Linha de Visão", "Área de Efeito(Muro)"],
      effect:
        "A área de efeito deve estar completamente dentro da linha de visão do conjurador. Uma figura pode se mover normalmente por dentro da área de efeito, e ela não serve como cobertura, mas bloqueia linha de visão. No início de cada novo turno, role um dado. Em 1-4 as cinzas vulcânicas se dissipa e é removida da mesa.",
    },
    {
      name: "Chamas de Azgorh",
      castingNumber: 12,
      keywords: ["Reação"],
      effect:
        "Esta magia é uma reação que pode ser conjurada sempre que uma figura inimiga se aproximar a até 3cm do conjurador. O conjurador faz um ataque a distância flamejante +3 contra o alvo. Se a magia causar pelo menos um ponto de dano, o alvo é movido 3cm diretamente para longe do conjurador pelo impacto das chamas, seu movimento termina abruptamente, e quaisquer ações adicionais que tinha são perdidas.",
    },
    {
      name: "Erupção",
      castingNumber: 12,
      keywords: ["Área de Efeito(Explosão Grande)"],
      effect:
        "Centralize a Área de Efeito do conjurador. Todas as figuras na área de efeito devem fazer uma Rolagem de Movimento imediata (CD 30). Criaturas Grandes ganham +2 nesta rolagem - mais estáveis. Se a figura falhar, ganha um Marcador de Derrubada.",
    },
    {
      name: "Correntes de Ébano",
      castingNumber: 10,
      keywords: ["Linha de Visão"],
      effect:
        "Faixas de Ébano emergem do chão e agarram o tornozelo do alvo. A figura não pode realizar ações de movimento até escapar - presa como escravo. Qualquer forma de movimento mágico, exceto a magia Salto, permite escape; caso contrário, deve lutar contra as faixas, que têm Ímpeto +0, Vigor 1. Se as faixas sofrerem um ponto de dano, se quebram e o alvo fica livre. Outras figuras em contato podem atacar as faixas ou dar apoio. Se as faixas vencerem o combate, causam dano - apertam e esmagam. Criaturas Grandes não são afetadas - correntes não as seguram. Alcance máximo: 45cm.",
    },
    {
      name: "Pele Magmática",
      castingNumber: 14,
      keywords: ["Apenas o Conjurador"],
      effect:
        "A pele do conjurador torna-se uma casca de pedra magmática que absorve os próximos 3 pontos de dano que o conjurador normalmente sofreria em combate ou de um ataque a distância. Enquanto a magia estiver em efeito, qualquer arma corpo a corpo mágica é destruída em um resultado de 1 na Rolagem de Ímpeto. Uma vez que 3 pontos tenham sido absorvidos, a casca racha e a magia é cancelada. Um conjurador pode estar sob o efeito de apenas uma magia Pele Magmática por vez.",
    },
    {
      name: "Rugido da Perdição",
      castingNumber: 10,
      keywords: ["Área de Efeito(Zona Pequena)"],
      effect:
        "A área de efeito é centralizada no conjurador e se move junto a ele. Todas as figuras inimigas na área de efeito recebem -2 Vontade.",
    },
    {
      name: "Golpe Vulcânico",
      castingNumber: 10,
      keywords: ["Linha de Visão"],
      effect:
        "Esta magia é conjurada sobre uma arma. Na próxima vez que a figura empunhando esta arma vencer uma rodada de combate e causar pelo menos 1 ponto de dano, esta arma inflige 5 pontos adicionais de dano elemental flamejante. Se conjurada em uma arma normal, que é então usada contra uma criatura Imune a Armas Normais, esta arma causará apenas os 5 pontos de dano elemental flamejante. Se conjurada em um arco ou besta, a magia se aplica apenas ao próximo ataque.",
    },
    {
      name: "Maldição do Enxofre",
      castingNumber: 10,
      keywords: ["Linha de Visão"],
      effect:
        "A figura alvo deve fazer uma Rolagem de Vontade imediata com CD igual à Rolagem de Conjuração. Se falhar, não recebe ações em sua próxima ativação - paralisia completa. Além disso, a figura sofre -3 Ímpeto (até mínimo de +0) e não pode ter nenhuma magia que a mova conjurada sobre ela até após realizar sua próxima ação de movimento. Criaturas Grandes recebem +8 em sua Rolagem de Vontade para resistir a esta magia - massa corporal maior resiste melhor.",
    },
    {
      name: "Forjaria Daemônica",
      castingNumber: 10,
      keywords: ["Ritual"],
      effect:
        "Se conjurada com sucesso, o uma máquina infernal torna-se membro permanente do bando, tomando lugar de um soldado. Deve declarar o tipo: Cão das Fornalhas, Sabujo Infernal, ou Touro de Bronze. Quanto maior for a máquina infernal, mais difícil é prender o daemon: Cão das Fornalhas -0, Sabujo Infernal -3, Touro de Bronze -6 na Rolagem de Conjuração. Não há limite para número de constructos além dos limites normais para soldados.",
    },
    {
      name: "Possuir Máquina",
      castingNumber: 12,
      keywords: ["Linha de Visão"],
      effect:
        "Escolha um construto dentro da linha de visão. O construto alvo deve fazer uma Rolagem de Vontade imediata com Número Alvo igual à Rolagem de Conjuração. Se a rolagem falhar, o construto torna-se um membro temporário do bando do conjurador e ganha a característica Daemônio. Este controle dura pelo resto do jogo ou até a magia ser cancelada. O conjurador pode gastar uma ação para cancelar esta magia. Um conjurador pode controlar apenas um construto por vez através desta magia.",
    },
    {
      name: "Ferver Metal",
      castingNumber: 12,
      keywords: ["Linha de Visão", "Míssil Mágico(Flamejante)(+5)"],
      effect:
        "Ataque a figura alvo que seja um constructo, que use armas ou armaduras ou  carregue fragmento de pedra bruxa com o míssil mágico. Esse míssil mágico ignora qualquer armadura usada pela alvo, e tem um modificador de dano +2 contra construtos e figuras vestindo armadura pesada. Uma figura carregando um fragmento de pedra bruxa derruba-o imediatamente.  ",
    },
  ];

  return (
    <PageContainer>
      <Header title="Orações de Hashut" />

      <ContentSection>
        <ContentContainer>
          <ParchmentText
            sx={{
              textAlign: "center",
              fontSize: "1.2rem",
              fontStyle: "italic",
              color: "#ff6b35",
              mb: 3,
            }}
          >
            O Pai Sombrio do Fogo e da Indústria
          </ParchmentText>

          <ParchmentText sx={{ mb: 4 }}>
            Hashut, o Pai das Trevas, é a divindade patrona dos Anões do Caos.
            Seus sacerdotes-feiticeiros empunham o poder destrutivo da fúria
            vulcânica e do metal derretido. Através de suas orações sombrias,
            podem invocar nuvens de cinza, causar erupções, e animar constructos
            de latão e chama. A Tradição de Hashut é um testemunho do poder
            brutal e industrial dos Anões do Caos e do domínio de seu deus sobre
            o fogo e a escravidão.
          </ParchmentText>

          <PowerListTitle>Orações de Hashut</PowerListTitle>

          {spells.map((spell, index) => (
            <SpellCard
              key={index}
              id={spell.name.toLowerCase().replace(/\s+/g, "-")}
              name={spell.name}
              school="Orações de Hashut"
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
