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

export default function LoreOfHeavensPage() {
  const navigate = useNavigate();

  const spells = [
    {
      name: "Primeiro Portento de Amur",
      castingNumber: 8,
      keywords: ["Linha de Visão"],
      effect:
        "Na próxima vez que a figura alvo desta magia tiver que rolar um dado por qualquer razão, role dois dados e pegue o resultado maior - os astros favorecem o afortunado. Se um 1 for rolado em ambos os dados, as estrelas se alinham contra o alvo e ele sofre 10 pontos de dano - uma reversão cruel do destino.",
    },
    {
      name: "Segundo Portento de Amur",
      castingNumber: 12,
      keywords: ["Linha de Visão"],
      effect:
        "Se esta magia for conjurada com sucesso, a figura recebe um marcador de presságio. Até o fim do jogo, qualquer rolagem de dado feita por ela ela pode ter seu resultado trocado pela rolagem de conjuração da conjuração dessa magia que deu seu marcador. O Marcador é então consumido. Uma figura só pode ter um marcador de presságio.",
    },
    {
      name: "Augúrio",
      castingNumber: 10,
      keywords: ["Ritual"],
      effect:
        "Sob o manto estrelado da noite, o astromante consulta as esferas celestiais. Cada constelação conta uma história, cada estrela cadente um presságio. Ao traçar as linhas entre os astros, ele vislumbra os tesouros que o destino reservou - mas a arte da adivinhação é imprecisa. Às vezes, quando dois futuros convergem perfeitamente, o próprio ato de observação colapsa as possibilidades, e o tesouro previsto desaparece como névoa matinal.\n\nO conjurador pode tentar conjurar esta magia antes de rolar por tesouro. Se bem-sucedida, o conjurador pode rolar dois dados e escolher qual manter ao fazer a primeira rolagem para determinar que tesouro foi encontrado - uma visão dupla do destino. Se ambos os dados rolarem o mesmo número, entretanto, o paradoxo temporal colapsa e a ficha é perdida - experiência ainda é ganha, mas nenhum tesouro é encontrado.",
    },
    {
      name: "Relampago",
      castingNumber: 14,
      keywords: ["Linha de Visão"],
      effect:
        "Trace uma linha reta de 1cm de espessura da base do conjurador até um ponto na linha de visão do mesmo. Qualquer figura cruzada por essa linha reta e fora de cobertura recebe um ataque mágico elétrico +4. Esse ataque tem penetração de armadura(2) contra criaturas de armadura pesada.",
    },
    {
      name: "Tempestade de Relâmpagos",
      castingNumber: 14,
      keywords: ["Alcance(50cm)", "Área de Efeito (Zona Média)"],
      effect:
         "No início da próxima ativação do conjurador, todas as figuras dentro da área de efeito sofrem um ataque elétrico a distância +7. Figuras não podem receber cobertura para esse ataque. Todas as figuras usando armadura tomam esse ataque como se tivesse Penetração de Armadura (2). A área de efeito então desaparece.",
    },
    {
      name: "Estudar as Estrelas",
      castingNumber: 12,
      keywords: ["Ritual"],
      effect:
        "Noite após noite, o astromante contempla as esferas celestiais através de lentes polidas e instrumentos de latão. Cada constelação é um livro, cada movimento planetário uma lição. As estrelas guardam conhecimentos antigos - padrões matemáticos que revelam as leis fundamentais do cosmos, segredos que levam mortais décadas para decifrar. Mas um Mago Celestial, sintonizado com Azyr, pode absorver em uma única noite o que levaria anos de estudo mundano. Contudo, tal clareza mental requer um corpo descansado - aqueles exaustos por batalha não conseguem a concentração necessária.\n\nO conjurador imediatamente ganha 40 pontos de experiência por conjurar esta magia para representar o conhecimento celestial absorvido. Esta experiência não conta contra o máximo que pode ser ganho em um jogo. Esta magia só pode ser conjurada após um jogo no qual o conjurador não foi reduzido a 0 Vigor - a mente ferida não pode contemplar os mistérios das estrelas.",
    },
    {
      name: "Amaldiçoar",
      castingNumber: 8,
      keywords: ["Linha de Visão"],
      effect:
        "O alvo sofre -2 em todas as rolagens de dado. No fim de cada turno, o alvo pode fazer uma Rolagem de Vontade com o Número Alvo igual à Rolagem de Conjuração (com -2, é claro). Se bem-sucedida, esta magia é cancelada. Amaldiçoar não pode ser conjurada em uma figura já sofrendo os efeitos dessa magia.",
    },
    {
      name: "Profetizar Perdição",
      castingNumber: 8,
      keywords: ["Linha de Visão"],
      effect:
        "Na próxima vez que a figura alvo desta magia tiver que rolar um dado por qualquer razão, os astros conspiram contra ela e ela deve rolar dois dados e usar o resultado menor - sempre o pior destino. Se um 20 natural for rolado em ambos os dados, o paradoxo se manifesta e o alvo em vez disso ganha +1 em todas as rolagens de dado pelo resto do jogo - tocado pela perfeição celestial.",
    },
    {
      name: "Estouro da Ventania",
      castingNumber: 8,
      keywords: ["Linha de Visão", "Míssil Mágico (Normal) (+4)"],
      effect:
        "Ataque a criatura alvo com o Míssil Mágico, que tem Penetração de Armadura(X). Além disso, além de qualquer dano causado por este ataque, mova a figura alvo para trás em linha reta longe do conjurador um número de centimetros igual a duas vezes o dano causado ou até a figura atingir uma peça de terreno com mais de 1cm de altura.",
    },
    {
      name: "Poeira Estelar",
      castingNumber: 10,
      keywords: ["Linha de Visão"],
      effect:
        "Uma luz brilhante e cintilante envolve a figura alvo. Pelo resto do jogo, todos os ataques a distância contra esta figura de qualquer fonte são com +3. Múltiplas conjurações de Poeira Estelar no mesmo alvo não têm efeito.",
    },
    {
      name: "Desalinhamento Astral",
      castingNumber: 12,
      keywords: ["Alcance(30cm)", "Reação"],
      effect:
        "Essa é uma magia de reação cujo gatilho é outra figura alvo conjurar uma magia. Se sua rolagem de conjuração for maior que o daquela figura (incluindo com forçar), aquela magia é imediatamente anulada. O Conjurador dessa magia pode então conjurar a magia anulada uma vez até o fim do jogo.",
    },
  ];

  return (
    <PageContainer>
      <Header title="Azyr - Tradição dos Céus" />

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
            O Vento Azul do Destino e Fortuna
          </ParchmentText>

          <ParchmentText sx={{ mb: 4 }}>
            A Tradição dos Céus é a magia do céu e das estrelas, de presságios,
            destino e o movimento dos corpos celestes. Mais comumente conhecida
            como Astromancia, ela é baseada na manipulação de Azyr, o Vento Azul
            da Magia. Magistrados desta tradição são conhecidos como Magos
            Celestiais e são famosos oráculos, adivinhos e mestres dos céus e
            estrelas. Conforme crescem em poder, Magos Celestiais tornam-se cada
            vez mais sobrenaturais e oníricos. Seus olhos tornam-se azul
            brilhante, e seus cabelos tendem ao branco. Cheios de movimentos
            lentos e graciosos, Magos Celestiais raramente se apressam.
          </ParchmentText>

          <PowerListTitle>Feitiços da Tradição dos Céus</PowerListTitle>

          {spells.map((spell, index) => (
            <SpellCard
              key={index}
              id={spell.name.toLowerCase().replace(/\s+/g, "-")}
              name={spell.name}
              school="Tradição dos Céus"
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
          onClick={() => navigate("/magic/arcane-lores")}
        >
          Voltar para Tradições Arcanas
        </StyledNavigationButton>
      </NavigationSection>
    </PageContainer>
  );
}
