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

export default function PrayersOfHashutPage() {
  const navigate = useNavigate();

  const spells = [
    {
      name: "Investida Magmática",
      castingNumber: 12,
      range: "Linha de Visão",
      effect:
        "Esta magia só pode ser conjurada em um membro do bando do conjurador. Mova imediatamente a figura alvo até 25cm em qualquer direção horizontal. Este movimento deve ser em linha reta. Não pode curvar em cantos. Se o alvo estiver carregando tesouro, este movimento é reduzido para 13cm. Este movimento não pode tirar uma figura da mesa ou colocá-la em combate. A figura alvo pode se mover através de outras figuras, causando 2 pontos de dano elemental ao fazê-lo. Uma figura só pode sofrer este dano uma vez por turno. O alvo da magia não pode realizar outras ações neste turno, pois passará reformando, mas pode realizar ações anteriormente.",
    },
    {
      name: "Nuvem de Cinzas",
      castingNumber: 12,
      range: "Linha de Visão",
      effect:
        "O Sacerdote-Feiticeiro invoca uma Nuvem de fumaça vulcânica dos poços da terra. Coloque uma linha de neblina, 15cm de comprimento, 8cm de altura, e 3cm de espessura em qualquer lugar da mesa, desde que alguma parte dela esteja dentro da linha de visão do conjurador e toda ela esteja dentro de 60cm. Figuras podem se mover através da neblina sem penalidade, mas linha de visão não pode ser traçada através dela. No início de cada novo turno, role um dado. Em um resultado de 1-4 a neblina se dissipa e é removida da mesa.",
    },
    {
      name: "Chamas de Azgorh",
      castingNumber: 16,
      range: "Reação",
      effect:
        "O Sacerdote-Feiticeiro exala as chamas da fundição amaldiçoada sobre aqueles que ousam se aproximar dele. Esta magia pode ser conjurada sempre que uma figura inimiga se aproximar a até 3cm do conjurador. O conjurador faz um ataque a distância profano +3 contra o alvo. Se a magia causar pelo menos um ponto de dano, o alvo é movido 3cm diretamente para longe do conjurador, seu movimento termina, e quaisquer ações adicionais que tinha são perdidas.",
    },
    {
      name: "Erupção",
      castingNumber: 16,
      range: "Efeito de Área",
      effect:
        "O conjurador faz o vulcão esotérico de Hashut entrar em erupção sob a terra, causando um terremoto massivo. Toda figura a até 20cm do conjurador (mas não o conjurador) deve fazer uma Rolagem de Movimento imediata (NA20). Criaturas Grandes ganham +2 nesta rolagem. Se a figura falhar, é derrubada. Enquanto derrubada, uma figura tem -2 Ímpeto, -2 Precisão, e -2 em todas as Rolagens de Conjuração e não pode realizar uma ação de movimento. Uma figura pode se levantar simplesmente gastando uma ação de movimento. Isto requer a ação de movimento completa.",
    },
    {
      name: "Correntes de Ébano",
      castingNumber: 14,
      range: "Linha de Visão",
      effect:
        "O Sacerdote-Feiticeiro invoca faixas negras de ferro negro do chão. Faixas de Ébano emergem do chão e agarram o tornozelo do alvo. A figura não pode realizar ações de movimento até escapar. Qualquer forma de movimento mágico, exceto a magia Salto, permite que uma figura escape das faixas; caso contrário, a única forma de escapar é lutar contra as faixas, que têm Ímpeto +0, Vigor 1. Se as faixas sofrerem um ponto de dano, desaparecem, e o alvo fica livre. Outras figuras em contato de base podem atacar as faixas ou dar um bônus de apoio. Se as faixas vencerem o combate, causam dano normalmente. Criaturas Grandes não são afetadas por esta magia. O alcance máximo para esta magia é 45cm.",
    },
    {
      name: "Pele Magmática",
      castingNumber: 14,
      range: "Apenas o Conjurador",
      effect:
        "A pele do conjurador torna-se uma casca de pedra magmática que absorve os próximos 3 pontos de dano que o conjurador normalmente sofreria em combate ou de um ataque a distância. Enquanto a magia estiver em efeito, qualquer arma corpo a corpo mágica é destruída em um resultado de 1 na Rolagem de Ímpeto. Uma vez que 3 pontos tenham sido absorvidos a magia é cancelada. Um conjurador pode ter apenas um Escudo Elemental ativo por vez.",
    },
    {
      name: "Rugido da Perdição",
      castingNumber: 14,
      range: "Apenas o Conjurador",
      effect:
        "A cabeça do Sacerdote-Feiticeiro se transforma em um Aspecto do Deus Touro, Hashut. Chifres Massivos e Torcidos brotam de suas têmporas e ele arrota fogo de suas narinas. Um berro infernal é emitido, e todos os inimigos do Pai Sombrio tremem. Todas as figuras inimigas a até 5cm do conjurador recebem -2 Ímpeto.",
    },
    {
      name: "Aço Piretico",
      castingNumber: 12,
      range: "Linha de Visão",
      effect:
        "O conjurador faz uma arma explodir em chamas amaldiçoadas. Esta arma agora é considerada profana e causa +2 de dano. Se conjurada em uma arma a distância, como um arco, besta, ou dardo, o bônus só se aplica ao próximo ataque feito com aquela arma.",
    },
    {
      name: "Maldição do Enxofre",
      castingNumber: 14,
      range: "Linha de Visão",
      effect:
        "Um inimigo alvo dentro de linha de visão é amaldiçoado, e seu sangue corre frio e seco, como cinzas. A figura alvo deve fazer uma Rolagem de Vontade imediata com Número Alvo igual à Rolagem de Conjuração. Se falhar, não recebe ações em sua próxima ativação. Além disso, a figura sofre -3 Ímpeto (até um mínimo de +0) e não pode ter nenhuma magia que a mova conjurada sobre ela até após realizar sua próxima ação de movimento. Criaturas Grandes recebem +8 em sua Rolagem de Vontade para resistir a esta magia.",
    },
    {
      name: "Forjaria Daemônica",
      castingNumber: 14,
      range: "Fora de Jogo (B)",
      effect:
        "O Sacerdote-Feiticeiro usa seu conhecimento de engenharia para forjar maravilhas da arte mecânica, e as infunde com horrores dos poços da existência. Assume-se que o conjurador construiu um constructo antes de usar esta magia para animá-lo. Se a magia for conjurada com sucesso, o constructo imediatamente se torna um membro permanente do bando, tomando o lugar de um soldado. Um conjurador deve declarar o tipo de constructo que está tentando animar (Pyredrone, Forge Fiend, ou Brass Bull). Quanto maior o constructo, mais difícil é animá-lo, então os seguintes modificadores são aplicados à Rolagem de Conjuração: Pyredrone -0, Forge Fiend -3, Brassbull -6. Não há limite para o número de constructos em um bando além dos limites normais para soldados. Esta magia pode ser potencializada mesmo sendo conjurada Fora de Jogo, e pode ser potencializada além de 20. O conjurador começará o próximo jogo perdendo os pontos de vigor usados na potencialização.",
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
            🔥 O Pai Sombrio do Fogo e da Indústria
          </ParchmentText>

          <ParchmentText sx={{ mb: 4 }}>
            Hashut, o Pai das Trevas, é a divindade patrona dos Anões do Caos.
            Seus sacerdotes-feiticeiros empunham o poder destrutivo da fúria
            vulcânica e do metal derretido. Através de suas orações sombrias,
            podem invocar nuvens de cinza, causar erupções, e animar constructos
            de latão e chama. As Orações de Hashut são um testemunho do poder
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
              range={spell.range}
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
