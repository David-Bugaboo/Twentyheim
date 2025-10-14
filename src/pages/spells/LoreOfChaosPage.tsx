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
        "O conjurador invoca um diabrete na mesa em qualquer lugar dentro de linha de visão do conjurador, mas não mais próximo que 8cm de qualquer outra figura. O diabrete segue as regras normais para criaturas descontroladas e ativará na próxima fase de Criatura. Se o conjurador conjurar esta magia uma segunda vez, o primeiro diabrete imediatamente desaparece.",
    },
    {
      name: "Raio da Perdição",
      castingNumber: 10,
      range: "Linha de Visão",
      effect:
        "Você canaliza energia pura de Caos em um inimigo.\n\nFaça um ataque mágico +7 imediato contra um alvo dentro de linha de visão. Este ataque trata a armadura do alvo como se nenhuma armadura ou escudo estivesse sendo usado. Armaduras e Escudos Mágicos ignoram esta redução de armadura.",
    },
    {
      name: "Tentação do Caos",
      castingNumber: 10,
      range: "Linha de Visão",
      effect:
        "Você enfeitiça um personagem dentro de linha de visão e o dobra à sua vontade.\n\nA figura alvo deve fazer uma Rolagem de Vontade imediata com Número Alvo igual à Rolagem de Conjuração. Se falhar, o alvo temporariamente se junta ao bando do conjurador, ativando normalmente. Após a figura ativar a cada turno, ela deve fazer outra Rolagem de Vontade com Número Alvo igual à Rolagem de Conjuração. Se bem-sucedida, a magia é cancelada e a figura retorna à sua aliança normal. Um conjurador só pode ter uma magia Sedução do Caos ativa por vez. Uma figura sob Sedução do Caos não pode propositalmente realizar qualquer ação que cause dano imediato, mas pode ser movida para combate e pode atacar uma figura inimiga. Uma figura sob Sedução do Caos não pode sair da mesa. Um conjurador pode cancelar uma Sedução do Caos ativa no fim de qualquer turno. Esta magia não tem efeito em Heróis e Campeões.",
    },
    {
      name: "Subjugar Daemônio",
      castingNumber: 10,
      range: "Linha de Visão",
      effect:
        "O daemônio alvo deve fazer uma Rolagem de Vontade imediata com Número Alvo igual à Rolagem de Conjuração. Se falhar, ele se torna um membro temporário do bando do conjurador. Este controle dura pelo resto do jogo ou até a magia ser cancelada. O conjurador pode gastar uma ação para cancelar esta magia. Um conjurador só pode controlar um daemônio por vez.",
    },
    {
      name: "Invocação Daemônica",
      castingNumber: 12,
      range: "Toque",
      effect:
        "Imediatamente coloque um daemônio na mesa a até 3cm do conjurador. Ele não pode ser colocado diretamente em combate. Este daemônio é considerado sob os efeitos de uma magia Subjulgar Daemônio pelo mesmo conjurador, e assim esta magia não pode ser conjurada se o conjurador já estiver controlando um daemônio. O tipo de daemônio invocado depende da quantidade pela qual o conjurador teve sucesso em sua Rolagem de Conjuração: 0-5 diabrete, 6-12 daemônio menor, 13+ daemônio maior. Se um conjurador rolar um 1 ao tentar conjurar esta magia, ele invoca um daemônio descontrolado e deve colocar este daemônio em combate com o conjurador. Role um dado para determinar o tipo: 1-10 diabrete, 11-17 daemônio menor, 18+ daemônio maior. Um conjurador não pode potencializar uma rolagem de 1 ao conjurar esta magia, mas não há outro limite para potencializar esta magia. Pode ser potencializada acima de 18.",
    },
    {
      name: "Receptáculo Daemônico",
      castingNumber: 12,
      range: "Linha de Visão",
      effect:
        "Esta magia só pode ser conjurada em um membro permanente ou temporário do próprio bando do conjurador, exceto o próprio conjurador, ou daemônios. O alvo é possuído por um daemônio e ganha +2 Ímpeto, +1 Armadura e -2 Vontade e conta como um daemônio (ou seja, será afetado por Banir, Subjulgar Daemônio, Círculo de Proteção, etc.). Esta figura não pode ser parte de uma ativação em grupo. Se removida do jogo por qualquer razão (como ser atingida por uma magia Exorcismo), verifique a sobrevivência do personagem normalmente. Um conjurador só pode ter uma magia Receptáculo Daemônico ativa por vez.",
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
