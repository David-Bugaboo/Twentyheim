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
      castingNumber: 14,
      range: "Apenas o Conjurador",
      effect: 'Uma aura gélida emana do sacerdote, e o ar ao seu redor se torna tão frio que a respiração congela e os músculos se contraem. O hálito do inverno de Ulric paralisa os inimigos próximos com seu frio cortante. Todas as figuras inimigas a até 5cm do conjurador recebem -2 Ímpeto, seus movimentos tornando-se lentos e pesados como se estivessem presos em neve profunda.',
    },
    {
      name: "Fúria da Batalha",
      castingNumber: 14,
      range: "Linha de Visão",
      effect:
        "O sacerdote invoca a selvageria primordial do lobo de guerra sobre um aliado. Seus olhos brilham com fome bestial, e suas veias pulsam com força sobrenatural. A figura alvo ganha +1 Ímpeto e +1 Movimento pelo resto do jogo, movendo-se com a velocidade e ferocidade de um predador no auge da caçada. A fúria de Ulric não se acumula - múltiplas conjurações de Fúria da Batalha no mesmo alvo não têm efeito.",
    },
    {
      name: "Uivo do Lobo",
      castingNumber: 12,
      range: "Linha de Visão",
      effect:
        "O sacerdote solta um uivo sobrenatural que ecoa através das almas, despertando o instinto da matilha. Esta magia só pode ser conjurada em um membro do bando do conjurador ou uma criatura não controlada. A figura alvo será ativada no final da fase atual ao invés de em sua fase normal. Por exemplo, se um aprendiz conjurar esta magia em uma criatura não controlada, a criatura será ativada no final da fase de Aprendiz daquele jogador ao invés da fase de Criatura. Conjuradores não podem conjurar esta magia em si mesmos, nem em uma figura que já tenha sido ativada no turno atual.",
    },
    {
      name: "Coração do Lobo",
      castingNumber: 14,
      range: "Linha de Visão",
      effect:
        "O espírito feroz e destemido do lobo branco preenche o coração do alvo, banindo todo medo e hesitação. Seus olhos brilham com a coragem inabalável dos filhos de Ulric. O alvo desta oração torna-se imune a Medo pelo resto do jogo. A vontade da figura é fortalecida pelo espírito do predador, recebendo +2 Vontade pelo resto do jogo. Aqueles tocados pelo Lobo Branco não conhecem o terror.",
    },
    {
      name: "Tempestade de Gelo",
      castingNumber: 16,
      range: "Efeito de Área",
      effect:
        'O sacerdote ergue as mãos ao céu, e o próprio inverno responde ao seu chamado. Uma tempestade brutal de granizo e gelo cortante explode ao redor dele, despedaçando tudo em seu caminho. O conjurador faz um ataque a distância mágico elemental +0 contra cada figura inimiga (seja de um bando oponente ou criatura não controlada) a até 15cm e linha de visão. Isto pode incluir figuras inimigas em combate, embora as regras normais para atirar em combate sejam seguidas neste caso. Uma figura atingida por este ataque ganha um Token de Atordoamento, derrubada pela força do vendaval gélido.',
    },
    {
      name: "Martelada",
      castingNumber: 16,
      range: "Apenas o Conjurador",
      effect:
        "No calor da batalha, o sacerdote invoca a fúria devastadora de Ulric, transformando-se em um turbilhão de violência sagrada. Esta magia anula a regra normal de que uma magia não pode ser conjurada quando uma figura está em combate - ela só pode ser conjurada quando o conjurador está em combate. O conjurador recebe uma ação de Luta gratuita que deve ser usada imediatamente. O conjurador recebe +4 Ímpeto durante esta ação, seus golpes caindo como martelos de avalanche. Criaturas atingidas por este ataque ganham um Token de Atordoamento.",
    },
    {
      name: "Chamado de Ulric",
      castingNumber: 14,
      range: "Apenas o Conjurador",
      effect:
        "O sacerdote se entrega completamente ao espírito do Grande Lobo Branco, sua forma se contorcendo e transformando em uma besta divina. Pelos brancos como neve brotam de sua pele, presas afiadas crescem em sua boca, e garras mortais substituem suas mãos. O conjurador se transforma em um Grande Lobo Branco, ganhando +3 Ímpeto (não pode elevar o conjurador acima de +6 Ímpeto) e +2 Movimento. O conjurador não pode usar quaisquer itens. Em combate, o conjurador não sofre penalidade por estar desarmado e seus ataques são mágicos. O conjurador não pode conjurar magias enquanto em forma animal. O conjurador pode encerrar esta magia e retornar à sua forma normal como uma ação gratuita durante sua ativação.",
    },
    {
      name: "Glaciar",
      castingNumber: 14,
      range: "Linha de Visão",
      effect:
        'Do solo emerge uma massa colossal de gelo antigo, seus picos serrilhados e sua superfície traiçoeira. Cria uma Glaciar de 15cm de comprimento, 8cm de largura e 3cm de altura. O gelo irradia um frio sobrenatural que paralisa a vontade. Qualquer figura que deseje escalar sobre a glaciar deve primeiro fazer uma Rolagem de Vontade com CD 14. Se falharem, são dominados pelo terror gélido e sua ação atual termina imediatamente, seus membros congelados de medo.',
    },
    {
      name: "Nevasca",
      castingNumber: 12,
      range: "Efeito de Área",
      effect:
        "O sacerdote convoca uma nevasca implacável que transforma o campo de batalha em um inferno branco. Ventos uivantes carregam neve cegante, e o frio cortante congela cordas de arco e entorpece dedos. Todos os ataques a distância são feitos com -1 Precisão pelo resto do jogo. Esta magia pode ser conjurada múltiplas vezes, com cada conjuração adicional aumentando a penalidade em mais -1, até um máximo de -5. A tempestade se intensifica com cada invocação, até que nada possa ser visto através do manto branco.",
    },
    {
      name: "Dádiva de Ulric",
      castingNumber: 12,
      range: "Fora de Jogo (B)",
      effect:
        "O conjurador invoca um companheiro sagrado das terras gélidas do norte - um Grande Lobo Branco abençoado pelo próprio Ulric. A besta responde ao chamado, seus olhos brilhando com inteligência divina. Este Grande Lobo Branco é um companheiro animal que conta como soldado padrão. Tocado pela bênção do deus do inverno, ele recebe +3 Vontade permanente. Um conjurador só pode ter um Grande Lobo Branco por vez - apenas os mais dignos recebem tal honra.",
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
            Ulric, o Deus do Inverno, dos Lobos e da Guerra, é a divindade patrona
            ancestral das tribos do norte. Seus sacerdotes são guerreiros ferozes que
            encarnam a força selvagem do lobo e o frio impiedoso do inverno. Através
            de suas orações, podem convocar nevascas devastadoras, transformar-se em
            grandes lobos, e imbuir seus aliados com a fúria da batalha. As Orações
            de Ulric são um testemunho da força primordial e das duras realidades da
            sobrevivência no norte congelado. Apenas os fortes sobrevivem nas terras
            do Lobo Branco, onde a fraqueza significa morte certa.
          </ParchmentText>

          <PowerListTitle>Orações de Ulric</PowerListTitle>

          {spells.map((spell, index) => (
            <SpellCard
              key={index}
              id={spell.name.toLowerCase().replace(/\s+/g, "-")}
              name={spell.name}
              school="Orações de Ulric"
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

