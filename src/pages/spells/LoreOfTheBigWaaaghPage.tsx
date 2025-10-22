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

export default function LoreOfTheBigWaaaghPage() {
  const navigate = useNavigate();

  const spells = [
    {
      name: "DURO COMO PREDA",
      castingNumber: 16,
      keywords: ["Linha de Visão"],
      effect:
        "O alvo recebe +3 Armadura pelo resto do jogo. Isto não pode levar uma figura acima da Armadura 15 (ou seja, figuras com Armadura 14 vão para Armadura 15). Múltiplas conjurações de DURO COMO PREDA no mesmo alvo não têm efeito.",
    },
    {
      name: "LASCA COCO",
      castingNumber: 18,
      keywords: ["Linha de Visão", "Missil Mágico(Mágico)(+7)"],
      effect:
        "Atire o Míssil Mágico contra a figura alvo. Se a criatura alvo for atingida, ganha um Marcador de Atordoamento.",
    },
    {
      name: "BORA MANCHU",
      castingNumber: 16,
      keywords: ["Linha de Visão"],
      effect:
        "A figura aliada alvo recebe +3 de Ímpeto pelo resto do jogo. Multiplas conjurações de BORA MANCHU no mesmo alvo não tem efeito.",
    },
    {
      name: "A PISADA: O PEZÃO DE PADIM GORK",
      castingNumber: 20,
      range: ["Alcance(60cm)", "Área de Efeito(Explosão Grande)"],
      effect:
        "O conjurador posiciona a Área de Efeito em um ponto alvo em que a Área de Efeito fique totalmente em linha de visão do conjurador. No inicio da próxima ativação do conjurador, criaturas na Área de Efeito tomam um Ataque Normal +7. Criaturas acertadas pelo ataca são lançadas 8cm em uma direção aleatória, recebendo um marcador de atordoamento se encostarem na borda do tabuleiro ou uma peça de terreno mais alta que 2cm. ",
    },
    {
      name: "MARRADA",
      castingNumber: 18,
      keywords: ["Linha de Visão", "Míssil Mágico(Normal)(+6)"],
      effect: `Faça um ataque a distância não-mágico +6 contra o alvo. Se acertar, o alvo imediatamente sofre -4 Armadura (mínimo de 10) só pra esse ataque. além de qualquer dano sofrido, o alvo é empurrado pra trás em linha reta, se afastando do conjurador, uma quantidade de centímetros igual ao dano sofrido vezes 2, ou até bater num terreno maior que 3cm de altura.`,
    },
    {
      name: "PAPOCA QUENGO",
      castingNumber: 24,
      range: "Linha de Visão",
      effect:
        "Alvo a até 20cm deve fazer um teste de Vontade com CD igual à Rolagem de Conjuração ou é IMEDIATAMENTE reduzido a 0 Vigor. Qualquer figura pode forçar esse teste de Vontade, sacrificando pontos de vida para aumentá-lo. O Xamã perde 1 de vida em todas as tentativas de conjuração dessa magia, além do valor de dano tomado por falha. Se uma criatura for reduzida a 0 de Vigor por conta dessa magia, o Xamã pode escolher outro alvo a até 8cm do primeiro e tentar conjurar a magia novamente contra ele, mas a magia custará 2 de vida para conjurar. A cadeia acaba quando não tem mais figuras a 8cm de um alvo ou o conjurador falhar na rolagem de conjuração.",
    },
    {
      name: "QUEIMA QUENGARAL",
      castingNumber: 16,
      range: "Ritual",
      effect:
        "Se o Xamã estiver na mesa, o bando dele adiciona +4 nas Rolagens de Iniciativa só pra determinar a ordem do turno. Essa magia conta como ativa no Xamã durante o jogo e pode ser cancelada por qualquer efeito que cancele magias.",
    },
    {
      name: "SOL QUENTE DA DESGRACA",
      castingNumber: 18,
      range: ["Alcance(40cm)", "Área de Efeito(Explosão Média)"],
      effect:
        "Centralize a Área de Efeito em uma figura alvo. Todas as figuras na área de efeito sofrem um ataque a distância flamejante +9. Role o ataque separado para cada figura, e considere a figura alvo como ponto de origem para calcular cobertura e terreno interposto. Figuras que sofram dano do ataque ganham um Marcador de Chamas.",
    },
    {
      name: "PORRADA NA PLEURA, CARAI",
      castingNumber: 16,
      range: ["Linha de Visão"],
      effect:
        "Essa magia pode ser conjurada numa arma corpo a corpo. Na próxima vez que a figura acertar com essa arma, trate o oponente como tendo Armadura -5 (mínimo de 10) - a porrada ignora a proteção!",
    },
    {
      name: "PEIXEIRA DE PADIM GORK",
      castingNumber: 16,
      range: ["Linha de Visão"],
      effect:
        "Escolha uma arma alma. Na próxima vez que a figura empunhando essa arma vencer uma rodada de combate e causar pelo menos 1 ponto de dano, essa arma inflige 5 pontos adicionais de dano mágico mágico - Se conjurada numa arma normal usada contra criatura Imune a Armas Normais, a arma causará só os 5 pontos de dano mágico.",
    },
    {
      name: "ÓIADA DE PADIM MORK",
      castingNumber: 14,
      range: ["Linha de Visão"],
      effect:
        "Trace uma linha reta de 3cm de diâmetro do conjurador até qualquer ponto alvo. Qualquer figura ao longo dessa linha que não esteja completamente escondida por cobertura toma um ataque flamejante +6. ",
    },
    {
      name: "PUNHO DE PADIM MORK",
      castingNumber: 18,
      keywords: ["Linha de Visão", "Míssil Mágico(Normal)(+10)"],
      effect: "Ataque a figura alvo com um Míssil Mágico.",
    },
    {
      name: "LEVANTAR IDOLO DE PADIM GORK E PADIM MORK",
      castingNumber: 22,
      keywords: ["Ritual", "Toque"],
      effect:
        "O conjurador extrai a frenesi mental dos orcs e a materializa em uma grande estátua de sucata de Gork e Mork. Adicione um Marcador de Estátua para marcar a posição da mesma na mesa, com o tamanho de uma Área de Efeito de Explosão Média. Enquanto o conjurador estiver a até 30cm deste ídolo, pode potencializar todos os seus feitiços e Rolagens de Vontade numa base 1-para-2 (um Vigor por 2 aumentos na rolagem) ao invés do 1-para-1 que é normal para conjuradores. Além disso, o conjurador pode usar o ídolo para traçar linha de visão e alcance para suas magias. Um conjurador pode ter doiss desses ídolos ativos a qualquer momento, mas elas devem estar a pelo menos 90cm de distância. Um conjurador pode cancelar qualquer conjuração desta magia a qualquer momento. Ídolos de Gork e Mork podem ser destruídas mas são imunes a ataques não-mágicos. Trate uma Estátua da Waaaaagh! como Ímpeto +0, Armadura 22, Vigda 1. Se esta magia for conjurada com sucesso como ritual, o conjurador pode colocar a estátua como uma figura do bando durante o posicionamento de figuras.",
    },
    {
      name: "PADIM MORK QUER VOCÊ!",
      castingNumber: 14,
      keywords: ["Linha de Visão"],
      effect:
        "A figura alvo sofre um ataque imediato +10. Ao invés de sofrer dano deste ataque, o alvo é movido 2cm diretamente para longe do conjurador para cada ponto de dano que teria sofrido. Se isso empurrar o alvo para a borda da mesa ou uma peça de terreno com mais de 1,5cm de altura , ele para imediatamente e ganha um Marcador de Atordoamento. Outras figuras não param (ou são atingidas por) uma figura empurrada - assume-se que elas saem do caminho. Se esta magia for conjurada de baixo de uma figura, ela será empurrada para cima. Se o alvo for empurrado para cima ou para fora de uma altura, sofre dano de queda normalmente. Esta magia pode empurrar uma figura para fora do combate, e como não é um ataque a distância, o alvo não é randomizado.",
    },
    {
      name: "MÃO DE PADIM GORK!",
      castingNumber: 14,
      keywords: ["Linha de Visão"],
      effect:
        "Esta magia só pode ser conjurada em um membro do bando do conjurador. Imediatamente mova a figura alvo até 25cm em qualquer direção, incluindo verticalmente. Este movimento deve ser em linha reta ou em arco. Não pode curvar ao redor de cantos. Se este movimento deixar a figura acima do chão, ela imediatamente cai, sofrendo dano normalmente. Se o alvo estiver carregando tesouro, este movimento é reduzido para 12,5cm. Este movimento não pode levar uma figura para fora da mesa ou para contato de base com outra figura, mas pode ser usado para retirar uma figura de combate. O alvo da magia MÃO DE GORK não pode realizar outras ações neste turno, embora possa ter realizado ações anteriormente.",
    },
  ];

  return (
    <PageContainer>
      <Header title="Tradição do Grande WAAAGH!" />

      <ContentSection>
        <ContentContainer>
          <ParchmentText
            sx={{
              textAlign: "center",
              fontSize: "1.2rem",
              fontStyle: "italic",
              color: "#6b8e23",
              mb: 3,
            }}
          >
            💚 O PODER DE GORK E MORK!
          </ParchmentText>

          <ParchmentText sx={{ mb: 4 }}>
            A Tradição do Grande WAAAGH! é a magia brutona e primitiva dos
            Pele-Verde, viu? É alimentada pela energia psíquica coletiva de Gork
            (que é brutão mas esperto) e Mork (que é esperto mas brutão). Quando
            os Ork e Goblin se junta tudo num bando só, a energia do WAAAGH! vai
            crescendo, crescendo, até que os Xamã consegue pegar ela e
            transformar ela numa puta duma magia! É porrada psíquica que esmaga
            quengo, joga inimigo pros lado que nem boneca de pano, e deixa os
            cabra ainda mais casca grossa! WAAAGH!
          </ParchmentText>

          <PowerListTitle>
            Feitiços da Tradição do Grande WAAAGH!
          </PowerListTitle>

          {spells.map((spell, index) => (
            <SpellCard
              key={index}
              id={spell.name.toLowerCase().replace(/\s+/g, "-")}
              name={spell.name}
              school="Tradição do Grande WAAAGH!"
              castingNumber={spell.castingNumber}
              keywords={
                Array.isArray(spell.keywords)
                  ? spell.keywords
                  : Array.isArray(spell.range)
                  ? spell.range
                  : [spell.range || ""]
              }
              effect={spell.effect}
            />
          ))}
        </ContentContainer>
      </ContentSection>

      <NavigationSection>
        <StyledNavigationButton
          variant="contained"
          onClick={() => navigate("/magic/greenskin-lores")}
        >
          Voltar para Tradições Peles-Verdes
        </StyledNavigationButton>
      </NavigationSection>
    </PageContainer>
  );
}
