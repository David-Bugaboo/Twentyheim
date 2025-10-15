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

export default function LoreOfChaosPage() {
  const navigate = useNavigate();

  const spells = [
    {
      name: "Invocar Diabrete",
      castingNumber: 8,
      range: "Linha de Visão",
      effect:
        "O conjurador rasga o véu entre os mundos com palavras blasfemas, e uma pequena abertura para o Reino do Caos se manifesta. De dentro da fenda vem um diabrete, uma criatura menor mas ainda assim corrupta, seus olhos ardendo com malícia sobrenatural.\n\nO conjurador invoca um diabrete na mesa em qualquer lugar dentro de linha de visão do conjurador, mas não mais próximo que 8cm de qualquer outra figura. O diabrete segue as regras normais para criaturas descontroladas e ativará na próxima fase de Criatura. Se o conjurador conjurar esta magia uma segunda vez, o primeiro diabrete é puxado de volta para o Caos e imediatamente desaparece em uma nuvem de enxofre.",
    },
    {
      name: "Raio da Perdição",
      castingNumber: 10,
      range: "Linha de Visão",
      effect:
        "O feiticeiro ergue as mãos e energia bruta do Caos irrompe de suas palmas - uma descarga de pura entropia que corrói matéria e alma. O ar sibilha e estala com poder imundo enquanto o raio negro atravessa o espaço, corroendo armaduras como ferrugem instantânea.\n\nFaça um ataque mágico +7 imediato contra um alvo dentro de linha de visão. Este ataque trata a armadura do alvo como se nenhuma armadura ou escudo estivesse sendo usado - o metal se desintegra, o couro apodrece. Apenas Armaduras e Escudos Mágicos resistem a esta corrupção, ignorando esta redução de armadura.",
    },
    {
      name: "Tentação do Caos",
      castingNumber: 10,
      range: "Linha de Visão - Psicologico",
      effect:
        "O feiticeiro sussurra promessas sombrias que atravessam a distância como névoa venenosa. Poder ilimitado... vingança contra seus inimigos... seus desejos mais profundos realizados. A vítima sente a corrupção infiltrando-se em sua mente, sussurros sedutores que prometem tudo e custam apenas sua alma.\n\nA figura alvo deve fazer uma Rolagem de Vontade imediata com Classe de Dificuldade igual à Rolagem de Conjuração. Se falhar, a corrupção toma conta e o alvo temporariamente se junta ao bando do conjurador, ativando normalmente. Após a figura ativar a cada turno, ela deve fazer outra Rolagem de Vontade com Classe de Dificuldade igual à Rolagem de Conjuração, lutando contra os sussurros. Se bem-sucedida, a magia é cancelada e a figura retorna à sua aliança normal, tremendo com o horror do que quase fez. Um conjurador só pode ter uma magia Tentação do Caos ativa por vez. Uma figura sob Tentação do Caos não pode propositalmente realizar qualquer ação que cause dano imediato a si mesma, mas pode ser movida para combate e pode atacar uma figura inimiga. Uma figura sob Tentação do Caos não pode sair da mesa. Um conjurador pode cancelar uma Tentação do Caos ativa no fim de qualquer turno. Esta magia não tem efeito em Heróis e Campeões - suas vontades são fortes demais.",
    },
    {
      name: "Subjugar Daemônio",
      castingNumber: 10,
      range: "Linha de Visão",
      effect:
        "O feiticeiro projeta sua vontade sobre a criatura do Caos, travando uma batalha mental no plano etéreo. É uma disputa perigosa - os daemônios não se submetem facilmente, e muitos feiticeiros tiveram suas mentes despedaçadas ao tentar dominar o que não deveria ser controlado.\n\nO daemônio alvo deve fazer uma Rolagem de Vontade imediata com Classe de Dificuldade igual à Rolagem de Conjuração. Se falhar, sua essência é temporariamente presa à vontade do conjurador e ele se torna um membro temporário do bando. Este controle precário dura pelo resto do jogo ou até a magia ser cancelada. O conjurador pode gastar uma ação para liberar a criatura, cancelando esta magia. Um conjurador só pode controlar um daemônio por vez - a mente mortal não suporta dominar mais de uma entidade do warp.",
    },
    {
      name: "Invocação Daemônica",
      castingNumber: 12,
      range: "Toque",
      effect:
        "O feiticeiro traça símbolos profanos no ar e pronuncia nomes que não deveriam ser falados. A realidade se rasga, e algo do outro lado responde ao chamado. É um ritual perigoso - cada invocação arrisca trazer algo que o conjurador não pode controlar, e os anais estão cheios de feiticeiros arrogantes devorados por suas próprias convocações.\n\nImediatamente coloque um daemônio na mesa a até 3cm do conjurador. Ele não pode ser colocado diretamente em combate. Este daemônio é considerado sob os efeitos de uma magia Subjulgar Daemônio pelo mesmo conjurador, e assim esta magia não pode ser conjurada se o conjurador já estiver controlando um daemônio. O tipo de daemônio invocado depende da quantidade pela qual o conjurador teve sucesso em sua Rolagem de Conjuração: 0-5 diabrete, 6-12 daemônio menor, 13+ daemônio maior. Se um conjurador rolar um 1 ao tentar conjurar esta magia, o ritual falha catastroficamente - ele invoca um daemônio descontrolado e deve colocar este daemônio em combate com o conjurador. Role um dado para determinar o tipo: 1-10 diabrete, 11-17 daemônio menor, 18+ daemônio maior. Um conjurador não pode potencializar uma rolagem de 1 ao conjurar esta magia, mas não há outro limite para potencializar esta magia. Pode ser potencializada acima de 18.",
    },
    {
      name: "Receptáculo Daemônico",
      castingNumber: 12,
      range: "Linha de Visão",
      effect:
        "O feiticeiro força a essência de um daemônio para dentro do corpo de um mortal vivo. A vítima grita enquanto sua carne se contorce, músculos inchando com força antinatural, pele escurecendo com marcas de corrupção. Olhos antes humanos agora brilham com fogo do inferno. O daemônio habita a carne mortal como um parasita terrível, concedendo poder mas corrompendo a alma.\n\nEsta magia só pode ser conjurada em um membro permanente ou temporário do próprio bando do conjurador, exceto o próprio conjurador, ou daemônios. O alvo é possuído por um daemônio e ganha +2 Ímpeto, +1 Armadura e -2 Vontade e conta como um daemônio (ou seja, será afetado por Banir, Subjulgar Daemônio, Círculo de Proteção, etc.). Esta figura não pode ser parte de uma ativação em grupo. Se removida do jogo por qualquer razão (como ser atingida por uma magia Exorcismo), o daemônio é expulso e verifique a sobrevivência do personagem normalmente. Um conjurador só pode ter uma magia Receptáculo Daemônico ativa por vez.",
    },
  ];

  return (
    <PageContainer>
      <Header title="Tradição do Caos" />

      <ContentSection>
        <ContentContainer>
          <ParchmentText
            sx={{
              textAlign: "center",
              fontSize: "1.2rem",
              fontStyle: "italic",
              color: "#a78bfa",
              mb: 3,
            }}
          >
            A Arte Sombria da Invocação Daemônica
          </ParchmentText>

          <ParchmentText sx={{ mb: 4 }}>
            A Tradição do Caos é a magia da mudança, destruição, tentação e
            decadência. Ela é baseada na manipulação de Dhar, também conhecida
            como magia sombria. Os praticantes da magia do Caos são conhecidos
            por muitos nomes — feiticeiro, bruxo e cultista para citar apenas
            alguns. Como todos os seguidores do Caos, estes magos são inimigos
            da civilização e tudo que ela representa. Eles buscam a derrubada do
            Império e todas as nações do Velho Mundo e sua visão do futuro é de
            escuridão, sangue e mudança sem fim.
          </ParchmentText>

          <PowerListTitle>Feitiços da Tradição do Caos</PowerListTitle>

          {spells.map((spell, index) => (
            <SpellCard
              key={index}
              id={spell.name.toLowerCase().replace(/\s+/g, "-")}
              name={spell.name}
              school="Tradição do Caos"
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
          onClick={() => navigate("/magic/dark-lores")}
        >
          Voltar para Tradições Sombrias
        </StyledNavigationButton>
      </NavigationSection>
    </PageContainer>
  );
}
