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

export default function PrayersOfSigmarPage() {
  const navigate = useNavigate();

  const spells = [
    {
      name: "Martelo de Sigmar",
      castingNumber: 12,
      keywords: ["Invocação"],
      effect:
        "O Sacerdote invoca um fragmento de Ghal Maraz. Represente como qualquer figura adequada em uma base de 25mm. O Fragmento conta como uma figura com Vida 5, Armadura 20 e Movimento 14. O sacerdote pode fazer ataques corpo a corpo e conjurar magias a partir do fragmento (embora ele deva declarar e completar cargas normalmente), gastando sua ação. O sacerdote pode como uma ação, mover o martelo até seu valor de movimento. O martelo tem a característica Levitar. ",
    },
    {
      name: "Armadura da Retidão",
      castingNumber: 12,
      range: "Toque",
      effect:
        "O alvo desta oração recebe +1 Armadura e +1 Vontade pelo resto do jogo. Esta magia não tem efeito em um alvo que já possua Armadura 15 ou superior. Múltiplas conjurações de Armadura da Retidão na mesma figura não têm efeito.",
    },
    {
      name: "Mão Curadora",
      castingNumber: 8,
      keywords: ["Toque"],
      effect:
        "O sacerdote canaliza a misericórdia do deus-guerreiro através de suas mãos, fechando ferimentos com pura luz divina. Um toque sagrado restaura até 5 pontos de Vigor perdidos a uma figura alvo ou ao próprio conjurador. A carne se regenera, ossos se reconstroem, e o sangue flui novamente. Esta magia não pode elevar o Vigor de um modelo acima de seu valor inicial. Os mortos-vivos e constructos, desprovidos de alma ou carne verdadeira, não podem ser curados por esta bênção.",
    },
    {
      name: "Farol da Coragem",
      castingNumber: 14,
      keywords: ["Linha de Visão"],
      effect:
        "O alvo desta oração ganha a característica Mente-Ferréa, e qualquer magia com as palavras chave Controle e Ilusão afetando-o são imediatamente canceladas. A vontade da figura é fortalecida pela fé, recebendo +2 Vontade pelo resto do jogo.",
    },
    {
      name: "Cometa de Cauda Dupla",
      castingNumber: 14,
      keywords: ["Alcance(40cm)", "Área e Efeito(Explosão Pequena)"],
      effect:
        "A área de efeito é centralizada numa figura inimiga alvo. O conjurador ataca todas as figuras na área de efeito sofrem um ataque distância sagrado +4, que tem modificador de dano +4. Daemônios atingidos por essa magia sofrem um dano crítico em uma rolagem de 18, 19 ou 20 do ataque que sofrem.",
    },
    {
      name: "Fogo Espiritual",
      castingNumber: 12,
      keywords: ["Alcance(40cm)", "Míssil Mágico(Sagrado)(+3)"],
      effect:
        "Ataque a figura alvo com o míssil mágico. Se estiver atacando um daemônio, o míssil mágico é um Missil Mágico (Sagrado)(+7) e tem um modificador de dano +4. ",
    },
    {
      name: "Estandarte de Sigmar",
      castingNumber: 14,
      keywords: ["Área e Efeito(Cone)"],
      effect:
        "Daemônios na área de efeito rolam um teste de Vontade contra a CD igual à Rolagem de Conjuração. Se falharem e tiverem Vontade 2 ou menor, são imediatamente reduzidos a 0 de vida e removidos do tabuleiro. Se falharam e tem Vontade 3 ou maior, recebem dano igual a 3 vezes por quanto falharam o teste.",
    },
    {
      name: "Marretar o Arcano",
      castingNumber: 12,
      keywords: ["Área de Efeito(Explosão Média)"],
      effect:
        "Centralize a Área de Efeito no Conjurador. Todas os efeitos de magiae  Áreas de Efeito de Zona dentro da área de efeito dessa magia são imediatamente canceladas",
    },
    {
      name: "Tempestade de Fogo Espiritual",
      castingNumber: 12,
      keywords: ["Área de Efeito(CAMPO INTEIRO)"],
      effect:
        "Toda figura Daemon na mesa deve fazer uma teste de Vontade contra a Rolagem de Conjuração desta magia ou sofrer 3 pontos de dano sagrado. Qualquer tentativa de conjurar magias não-oração com a palavra chance Invocação  sofre -4 na Rolagem de Conjuração pelo resto do jogo (não cumulativo). O sacerdote sofre 1 ponto de dano cada vez que esta magia é conjurada com sucesso.",
    },
    {
      name: "Ira Justiceira",
      castingNumber: 14,
      keywords: ["Linha de Visão"],
      effect:
        "A figura alvo ganha +1 Ímpeto e +1 de dano em ataques corpo a corpo e seus ataques contam como Sagrado até o fim do jogo. Essa magia pode ser conjurada novamente na mesma figura, para um bonus máximo de +3 no ímpeto e +3 no dano.",
    },
  ];

  return (
    <PageContainer>
      <Header title="Orações de Sigmar" />

      <ContentSection>
        <ContentContainer>
          <ParchmentText
            sx={{
              textAlign: "center",
              fontSize: "1.2rem",
              fontStyle: "italic",
              color: "#daa520",
              mb: 3,
            }}
          >
            A Proteção Divina do Heldenhammer
          </ParchmentText>

          <ParchmentText sx={{ mb: 4 }}>
            Sigmar Heldenhammer, o fundador do Império e o maior rei-guerreiro
            da humanidade, ascendeu à divindade e agora vigia seu povo das
            alturas celestiais. Seus sacerdotes são clérigos-guerreiros que
            empunham poder divino para esmagar os inimigos da humanidade,
            proteger os inocentes e banir as criaturas das trevas. As Orações de
            Sigmar são uma força poderosa contra o Caos, os mortos-vivos e todos
            aqueles que ameaçam o Império. Com martelo e fé, os devotos de
            Sigmar trazem a luz da justiça aos lugares mais sombrios do Velho
            Mundo.
          </ParchmentText>

          <PowerListTitle>Orações de Sigmar</PowerListTitle>

          {spells.map((spell, index) => (
            <SpellCard
              key={index}
              id={spell.name.toLowerCase().replace(/\s+/g, "-")}
              name={spell.name}
              school="Orações de Sigmar"
              castingNumber={spell.castingNumber}
              keywords={spell.keywords || []}
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
