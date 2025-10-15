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
      name: "Presságio de Amur",
      castingNumber: 8,
      range: "Linha de Visão",
      effect:
        "O astromante eleva seu olhar aos céus, lendo os padrões invisíveis que tecem o destino. O Vento Azul revela as possibilidades - múltiplos futuros se desdobram diante de sua visão interior, e ele escolhe o caminho mais favorável para seu aliado. É uma manipulação sutil da probabilidade, guiando os fios do destino. Contudo, forçar demais o destino pode tê-lo se voltando contra você - quando dois futuros igualmente desastrosos convergem, a magia falha catastroficamente.\n\nNa próxima vez que a figura alvo desta magia tiver que rolar um dado por qualquer razão, role dois dados e pegue o resultado maior - os astros favorecem o afortunado. Se um 1 for rolado em ambos os dados, as estrelas se alinham contra o alvo e ele sofre 10 pontos de dano - uma reversão cruel do destino.",
    },
    {
      name: "Augúrio",
      castingNumber: 10,
      range: "Fora de Jogo(D)",
      effect:
        "Sob o manto estrelado da noite, o astromante consulta as esferas celestiais. Cada constelação conta uma história, cada estrela cadente um presságio. Ao traçar as linhas entre os astros, ele vislumbra os tesouros que o destino reservou - mas a arte da adivinhação é imprecisa. Às vezes, quando dois futuros convergem perfeitamente, o próprio ato de observação colapsa as possibilidades, e o tesouro previsto desaparece como névoa matinal.\n\nO conjurador pode tentar conjurar esta magia antes de rolar por tesouro. Se bem-sucedida, o conjurador pode rolar dois dados e escolher qual manter ao fazer a primeira rolagem para determinar que tesouro foi encontrado - uma visão dupla do destino. Se ambos os dados rolarem o mesmo número, entretanto, o paradoxo temporal colapsa e a ficha é perdida - experiência ainda é ganha, mas nenhum tesouro é encontrado.",
    },
    {
      name: "Golpe de Relâmpago",
      castingNumber: 12,
      range: "Linha de Visão",
      effect:
        "O astromante aponta para o alvo e marca-o com um sigilo invisível - uma sentença celestial gravada na própria alma. Nuvens de tempestade se formam acima, escurecendo momentaneamente o céu. O raio não cai imediatamente - os céus esperam o momento propício, quando a vítima menos espera. Então, a justiça celestial descende em um relâmpago cegante, transformando armaduras de metal em condutores letais.\n\nNo fim da próxima ativação da figura alvo a até 50cm e linha de visão, após ela ter realizado todas as suas ações, os céus se vingam e faça um ataque +6 contra ela. Este é considerado um ataque não-mágico - é a própria natureza que ataca. Além disso, se a figura estiver usando armadura pesada, a ironia é cruel: subtraia 2 de sua Armadura para fins de determinar dano, pois o metal que deveria proteger agora conduz a fúria dos céus.",
    },
    {
      name: "Tempestade de Relâmpagos",
      castingNumber: 14,
      range: "Linha de Visão",
      effect:
        "O astromante ergue seu cajado e invoca não um único raio, mas a própria tempestade celestial. Nuvens negras se acumulam, carregadas com energia elétrica. O ar fica pesado, cabelos se arrepiam, e todos sentem a aproximação da fúria dos céus. A tempestade não cai imediatamente - ela se acumula, crescendo em poder. Quando finalmente se libera, é uma catarse de violência celestial: múltiplos raios caem em cascata, e a própria força do impacto arremessa corpos como folhas ao vento. O astromante deve manter sua concentração, pois perder o foco significa perder o controle da tempestade.\n\nColoque um marcador em qualquer lugar a até 50cm e linha de visão - o epicentro da tempestade vindoura. No início da próxima ativação do conjurador, os céus se abrem: todas as figuras a até 8cm daquele ponto **e com linha de visão para ele** sofrem um **ataque a distância +7**. Figuras recebem cobertura como se a linha de visão fosse traçada **do ponto alvo**. Todas as figuras que sofrem este ataque também são **arremessadas 8cm em uma direção aleatória** pela força do impacto, mesmo se estiverem em combate. Se o conjurador sair da mesa antes de sua próxima ativação, sua concentração se quebra e esta magia é **cancelada**.",
    },
    {
      name: "Estudar as Estrelas",
      castingNumber: 12,
      range: "Fora de Jogo (D)",
      effect:
        "Noite após noite, o astromante contempla as esferas celestiais através de lentes polidas e instrumentos de latão. Cada constelação é um livro, cada movimento planetário uma lição. As estrelas guardam conhecimentos antigos - padrões matemáticos que revelam as leis fundamentais do cosmos, segredos que levam mortais décadas para decifrar. Mas um Mago Celestial, sintonizado com Azyr, pode absorver em uma única noite o que levaria anos de estudo mundano. Contudo, tal clareza mental requer um corpo descansado - aqueles exaustos por batalha não conseguem a concentração necessária.\n\nO conjurador imediatamente ganha 40 pontos de experiência por conjurar esta magia para representar o conhecimento celestial absorvido. Esta experiência não conta contra o máximo que pode ser ganho em um jogo. Esta magia só pode ser conjurada após um jogo no qual o conjurador não foi reduzido a 0 Vigor - a mente ferida não pode contemplar os mistérios das estrelas.",
    },
    {
      name: "Profetizar Perdição",
      castingNumber: 8,
      range: "Linha de Visão",
      effect:
        "Esta é a face sombria da adivinhação - não prever o futuro, mas moldá-lo. O astromante olha através das possibilidades e escolhe o pior destino para seu inimigo, forçando-o a trilhar o caminho da desgraça. É uma maldição celestial, uma torção dos fios do destino. Os astros raramente favorecem aqueles assim marcados... mas ocasionalmente, quando dois vinte perfeitos convergem, o universo reconhece a tentativa de manipulação e recompensa a vítima com sorte extraordinária - um paradoxo cruel que beneficia aquele que deveria ter sido amaldiçoado.\n\nNa próxima vez que a figura alvo desta magia tiver que rolar um dado **por qualquer razão**, os astros conspiram contra ela e ela deve **rolar dois dados e usar o resultado menor** - sempre o pior destino. Se um **20 natural** for rolado em **ambos os dados**, o paradoxo se manifesta e o alvo em vez disso **ganha +1 em todas as rolagens de dado** pelo resto do jogo - tocado pela perfeição celestial.",
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
