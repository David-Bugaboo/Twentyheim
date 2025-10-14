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

export default function LoreOfShadowsPage() {
  const navigate = useNavigate();

  const spells = [
    {
      name: "Manto de Sombras",
      castingNumber: 12,
      range: "Linha de Visão",
      effect:
        "Você se envolve em sombras, tornando-se difícil de detectar.\n\nFiguras não podem traçar linha de visão para a figura alvo de mais de 25cm de distância se ela estiver em qualquer tipo de cobertura.",
    },
    {
      name: "Mortalha de Escuridão",
      castingNumber: 8,
      range: "Linha de Visão",
      effect:
        "Você cria uma área giratória de escuridão impenetrável em todo o campo de batalha.\n\n. No turno em que a magia é conjurada, a linha de visão máxima para o jogo é reduzida para 40cm. A cada turno depois disto, a linha de visão máxima diminui mais 5cm, até um mínimo de 30cm.",
    },
    {
      name: "Manto da Invisibilidade",
      castingNumber: 12,
      range: "Toque",
      effect:
        "Você se envolve com magia e desaparece de vista.\n\nA figura alvo torna-se invisível. Nenhuma figura pode mover-se para combate com a figura invisível, nem pode ter como alvo com qualquer ataque ou magia (embora ainda possa ser afetada por efeitos de área, como o raio de explosão de uma magia Granada). Se a figura invisível mover-se para combate, conjurar uma magia, ou pegar uma ficha de tesouro, a magia Invisibilidade é cancelada. Esta magia pode ser conjurada em uma figura já carregando tesouro, tornando ambos invisíveis. Neste caso, se a figura largar o tesouro, a magia é cancelada.",
    },
    {
      name: "Ilusão",
      castingNumber: 12,
      range: "Fora de Jogo (A) OU Toque",
      effect:
        "Você cria uma ilusão que é uma simulação quase perfeita da realidade, completa com visão, som e cheiro.\n\nUm soldado ilusório torna-se um membro temporário do bando para a próxima batalha (se conjurada Fora de Jogo) ou até o fim do jogo (se conjurada durante uma batalha). Este soldado pode ser de qualquer tipo encontrado no bando. Este soldado não pode pegar tesouro, nem pode causar dano, mas de outra forma conta como um soldado regular para todos os outros fins – ele pode engajar em combate, embora não causando dano se vencer (ainda teria a opção de empurrar seu oponente, entretanto), dar apoio a outras figuras em combate, etc. Se o soldado ilusório sofrer dano de qualquer tipo, ele é removido. Um bando só pode ter um soldado ilusório a qualquer momento. O jogador deve revelar qual membro de seu bando é o soldado ilusório. Soldados ilusórios não começam com itens, equipamento especial ou modelos extras dados pelas habilidades do soldado escolhido.",
    },
    {
      name: "Aspecto Medonho",
      castingNumber: 12,
      range: "Linha de Visão",
      effect:
        "Você se faz parecer uma criatura de pesadelo de puro pavor.\n\nO alvo desta magia imediatamente larga quaisquer fichas de tesouro que esteja carregando. O conjurador pode mover a figura até 8cm em qualquer direção desde que isto não mova a figura para combate ou cause dano imediato (ex: cair mais de 8cm). O alvo desta magia pode fazer uma Rolagem de Vontade com Número Alvo igual à Rolagem de Conjuração. Se bem-sucedida, a magia não tem efeito. Você tem o traço Medo contra aquela criatura até o fim do jogo.",
    },
    {
      name: "Facas de Sombra",
      castingNumber: 10,
      range: "Linha de Visão",
      effect:
        "Você conjura várias facas de sombra e as arremessa em inimigos.\n\nFaça um ataque a distância envenenado +3 imediato contra a figura alvo. Este é um ataque não-mágico.",
    },
  ];

  return (
    <PageContainer>
      <Header title="Ulgu - Tradição das Sombras" />

      <ContentSection>
        <ContentContainer>
          <ParchmentText
            sx={{
              textAlign: "center",
              fontSize: "1.2rem",
              fontStyle: "italic",
              color: "#9370db",
              mb: 3,
            }}
          >
            O Vento Cinza do Engano e Ilusão
          </ParchmentText>

          <ParchmentText sx={{ mb: 4 }}>
            A Tradição das Sombras é a magia do ocultamento, ilusão, confusão e
            ocasionalmente morte invisível. Ela é baseada na manipulação de
            Ulgu, o Vento Cinza da Magia. Magistrados desta tradição são
            conhecidos como Magos Cinzentos e são um grupo enigmático. Estão tão
            envoltos em engano que seus verdadeiros sentimentos e agendas
            raramente são conhecidos. Magos Cinzentos são às vezes conhecidos
            como ilusionistas ou Magos trapaceiros. Conforme Magos Cinzentos
            crescem em poder, assumem uma presença enigmática e uma aparência
            lupina. Com longos cabelos cinzentos e fibrosos e uma postura magra
            e de pés leves, começam a parecer quase malandros, não fossem seus
            olhos cinza tempestade. Mesmo com estas características distintivas,
            as pessoas acham difícil descrever um poderoso Mago das Sombras,
            pois seus rostos parecem tornar-se vagos e indistintos. Alguns
            afirmam que eles mudam sutilmente para se adequar aos arredores, mas
            isto parece inverossímil demais, mesmo para Altos Magistrados.
          </ParchmentText>

          <PowerListTitle>Feitiços da Tradição das Sombras</PowerListTitle>

          {spells.map((spell, index) => (
            <SpellCard
              key={index}
              id={spell.name.toLowerCase().replace(/\s+/g, "-")}
              name={spell.name}
              school="Tradição das Sombras"
              castingNumber={spell.castingNumber}
              range={spell.range}
              effect={spell.effect}
            />
          ))}
        </ContentContainer>
      </ContentSection>

      <NavigationSection>
        <StyledNavigationButton
          variant="contained"
          onClick={() => navigate("/magic/arcane-lores")}
        >
          Voltar para Tradições Arcanas
        </StyledNavigationButton>
      </NavigationSection>
    </PageContainer>
  );
}
