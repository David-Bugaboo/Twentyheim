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
        "O sacerdote-feiticeiro invoca o poder das forjas vulcânicas, e magma líquido explode sob os pés do alvo como um gêiser de fogo. A figura é arremessada para frente em linha reta, envolta em chamas alaranjadas, deixando um rastro de calor incandescente. Quem estiver no caminho dessa investida ardente é queimado pelo contato com o corpo superaquecido. A figura chega no destino fumegante, seu metal brilhando vermelho-quente, precisando de um momento para esfriar.\n\nEsta magia só pode ser conjurada em um membro do bando do conjurador. Mova imediatamente a figura alvo até 25cm em qualquer direção horizontal - impulsionada por magma. Este movimento deve ser em linha reta. Não pode curvar. Se o alvo estiver carregando tesouro, este movimento é reduzido para 13cm - o peso extra dificulta. Este movimento não pode tirar uma figura da mesa ou colocá-la em combate. A figura alvo pode se mover através de outras figuras, causando 2 pontos de dano elemental ao fazê-lo - queima quem toca. Uma figura só pode sofrer este dano uma vez por turno. O alvo não pode realizar outras ações neste turno - precisa esfriar.",
    },
    {
      name: "Nuvem de Cinzas",
      castingNumber: 12,
      range: "Linha de Visão",
      effect:
        "O sacerdote invoca as exalações tóxicas das fundições amaldiçoadas. Do chão surge uma nuvem densa de cinzas vulcânicas e fumaça industrial - resíduos das forjas infernais onde escravos trabalham até a morte. A nuvem é espessa, acre, sufocante. Cheira a enxofre, carvão queimado e carne carbonizada. Nada pode ser visto através da cortina negra. Eventualmente a nuvem se dissipa, levada por ventos, mas enquanto persiste é um muro perfeito de obscuridade tóxica.\n\nColoque uma linha de neblina de 15cm de comprimento, 8cm de altura, e 3cm de espessura em qualquer lugar da mesa, desde que alguma parte esteja dentro da linha de visão do conjurador e toda ela esteja dentro de 60cm. Figuras podem se mover através da neblina sem penalidade, mas linha de visão não pode ser traçada através dela. No início de cada novo turno, role um dado. Em 1-4 a neblina se dissipa e é removida da mesa.",
    },
    {
      name: "Chamas de Azgorh",
      castingNumber: 16,
      range: "Reação",
      effect:
        "Tolos que se aproximam do servo de Hashut aprendem a dor das forjas. O sacerdote-feiticeiro exala chamas profanas diretamente da boca - não fogo natural, mas as chamas negras de Azgorh, a Cidade das Fornalhas Amaldiçoadas. Fogo que queima com fuligem e ódio, impregnado com o sofrimento de mil escravos queimados vivos. A vítima é empurrada para trás pela explosão de calor infernal, queimada e repelida simultaneamente.\n\nEsta magia pode ser conjurada sempre que uma figura inimiga se aproximar a até 3cm do conjurador - uma defesa automática de fogo. O conjurador faz um ataque a distância profano +3 contra o alvo. Se a magia causar pelo menos um ponto de dano, o alvo é movido 3cm diretamente para longe do conjurador pelo impacto das chamas, seu movimento termina abruptamente, e quaisquer ações adicionais que tinha são perdidas - recuou queimado.",
    },
    {
      name: "Erupção",
      castingNumber: 16,
      range: "Efeito de Área",
      effect:
        "O sacerdote bate seu cajado no chão e invoca a ira vulcânica do Pai Sombrio. O solo treme violentamente. Rachaduras se abrem. Calor imenso emana de baixo. É como se o próprio vulcão esotérico de Hashut despertasse sob a terra, rugindo sua fúria. O terremoto é catastrófico - pedras caem, edifícios balançam, e todos ao redor são derrubados pela força telúrica. Apenas o sacerdote permanece de pé, protegido pela vontade de seu deus. Os outros rastejam no chão, vulneráveis, indefesos.\n\nToda figura a até 20cm do conjurador (mas não o conjurador - ele é protegido) deve fazer uma Rolagem de Movimento imediata (CD 20). Criaturas Grandes ganham +2 nesta rolagem - mais estáveis. Se a figura falhar, é derrubada. Enquanto derrubada: -2 Ímpeto, -2 Precisão, e -2 em todas as Rolagens de Conjuração, e não pode realizar ação de movimento. Uma figura pode se levantar gastando uma ação de movimento completa.",
    },
    {
      name: "Correntes de Ébano",
      castingNumber: 14,
      range: "Linha de Visão",
      effect:
        "Do solo emergem correntes de ferro negro forjadas nas fundições infernais de Hashut - as mesmas correntes que prendem milhões de escravos nas minas escuras. O metal é ébano puro, negro como pecado, pesado como culpa. As correntes brotam do chão e se enroscam ao redor dos tornozelos da vítima com força esmagadora. São grilhões da escravidão materializada - quem é preso por elas sente o peso de toda opressão, toda servidão forçada. A única libertação é quebrar as correntes através da violência.\n\nFaixas de Ébano emergem do chão e agarram o tornozelo do alvo. A figura não pode realizar ações de movimento até escapar - presa como escravo. Qualquer forma de movimento mágico, exceto a magia Salto, permite escape; caso contrário, deve lutar contra as faixas, que têm Ímpeto +0, Vigor 1. Se as faixas sofrerem um ponto de dano, se quebram e o alvo fica livre. Outras figuras em contato podem atacar as faixas ou dar apoio. Se as faixas vencerem o combate, causam dano - apertam e esmagam. Criaturas Grandes não são afetadas - correntes não as seguram. Alcance máximo: 45cm.",
    },
    {
      name: "Pele Magmática",
      castingNumber: 14,
      range: "Apenas o Conjurador",
      effect:
        "A pele do sacerdote se transforma. Carne mortal endurece em rocha vulcânica negra rachada, com veias de magma incandescente brilhando através das fendas. O corpo torna-se a própria forja - superaquecido, rígido, imune à dor. Golpes simplesmente ricocheteiam da superfície pétrea. Mas o calor extremo tem seu preço - armas que tocam essa pele incandescente podem derreter ou quebrar, destruídas pelo calor da forja viva.\n\nA pele do conjurador torna-se uma casca de pedra magmática que absorve os próximos 3 pontos de dano que o conjurador normalmente sofreria em combate ou de um ataque a distância - proteção vulcânica. Enquanto a magia estiver em efeito, qualquer arma corpo a corpo mágica é destruída em um resultado de 1 na Rolagem de Ímpeto - derretida pelo calor. Uma vez que 3 pontos tenham sido absorvidos, a casca racha e a magia é cancelada. Um conjurador pode ter apenas um Escudo Elemental ativo por vez.",
    },
    {
      name: "Rugido da Perdição",
      castingNumber: 14,
      range: "Apenas o Conjurador",
      effect:
        "A cabeça do sacerdote-feiticeiro se contorce e muta. Ossos estalam, pele racha, e da carne emergem chifres massivos de latão fundido. O rosto se alonga, narinas se alargam, e de dentro vem o calor das forjas eternas. O sacerdote torna-se momentaneamente um aspecto de Hashut, o Deus Touro. Ele berra - não uma voz mortal, mas um rugido que ecoa das profundezas do inferno industrial. Fogo jorra de suas narinas. O som é ensurdecedor, aterrorizante. Inimigos tremem, membros enfraquecem, coragem evapora diante da manifestação divina.\n\nTodas as figuras inimigas a até 5cm do conjurador recebem -2 Ímpeto - aterrorizadas pela presença do Touro Sombrio.",
    },
    {
      name: "Aço Pirético",
      castingNumber: 12,
      range: "Linha de Visão",
      effect:
        "O sacerdote abençoa a arma com fogo profano das forjas de Hashut. O metal explode em chamas negras e alaranjadas - não calor comum, mas o fogo das fundições amaldiçoadas onde almas são queimadas como combustível. A arma brilha como ferro recém-saído da forja, mas nunca esfria. Cada golpe não apenas corta - queima com chamas infernais que aderem à carne e não se apagam facilmente. É benção e maldição - poder destrutivo concedido pelo Pai Sombrio.\n\nEsta arma agora é considerada profana e causa +2 de dano - impregnada com fogo infernal. Se conjurada em uma arma a distância (arco, besta, ou dardo), o bônus só se aplica ao próximo ataque - a munição queima uma vez antes de se consumir em cinzas.",
    },
    {
      name: "Maldição do Enxofre",
      castingNumber: 14,
      range: "Linha de Visão",
      effect:
        "O sacerdote aponta e pronuncia uma maldição. A vítima sente calor infernal queimando de dentro para fora. O sangue que deveria ser líquido torna-se espesso, pesado, seco como cinzas. Veias parecem cheias de areia quente. Músculos se recusam a responder. É como se o corpo inteiro tivesse sido deixado tempo demais na forja - desidratado, ressecado, enfraquecido. A vítima mal consegue se mover, paralisada pelo calor interno que seca tudo. Apenas após forçar o corpo a se mover a maldição começa a se dissipar.\n\nA figura alvo deve fazer uma Rolagem de Vontade imediata com CD igual à Rolagem de Conjuração. Se falhar, não recebe ações em sua próxima ativação - paralisia completa. Além disso, a figura sofre -3 Ímpeto (até mínimo de +0) e não pode ter nenhuma magia que a mova conjurada sobre ela até após realizar sua próxima ação de movimento. Criaturas Grandes recebem +8 em sua Rolagem de Vontade para resistir a esta magia - massa corporal maior resiste melhor.",
    },
    {
      name: "Forjaria Daemônica",
      castingNumber: 14,
      range: "Fora de Jogo (B)",
      effect:
        "Esta é a arte mais obscena dos servos de Hashut - fundir engenharia com horror daemônico. O sacerdote-feiticeiro trabalha nas forjas, moldando metal com precisão mecânica. Mas enquanto martela, ele murmura nomes proibidos. Enquanto funde o latão, ele derrama sangue nos moldes. A máquina toma forma - engrenagens, pistões, placas de armadura. Então vem o ritual final: prender um daemon dentro do metal, forçar a essência do Caos a animar engrenagens sem vida. O constructo desperta - não vivo, mas consciente. Horrível fusão de tecnologia e pesadelo.\n\nAssume-se que o conjurador construiu um constructo antes de usar esta magia para animá-lo. Se conjurada com sucesso, o constructo torna-se membro permanente do bando, tomando lugar de um soldado. Deve declarar o tipo: Pyredrone, Forge Fiend, ou Brass Bull. Quanto maior o constructo, mais difícil é prender o daemon: Pyredrone -0, Forge Fiend -3, Brass Bull -6 na Rolagem de Conjuração. Não há limite para número de constructos além dos limites normais para soldados. Esta magia pode ser potencializada mesmo Fora de Jogo, e pode ser potencializada além de 20. O conjurador começará o próximo jogo perdendo os pontos de vigor usados na potencialização - o preço da ambição.",
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
