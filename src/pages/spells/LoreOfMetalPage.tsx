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

export default function LoreOfMetalPage() {
  const navigate = useNavigate();

  const spells = [
    {
      name: "Guarda de Aço",
      castingNumber: 10,
      range: "Linha de Visão",
      effect:
        "Você invoca orbes cintilantes de aço que rotacionam ao redor do corpo de um aliado e o protegem de ataques vindouros.\n\nO alvo recebe +2 Armadura pelo resto do jogo. Isto não pode levar uma figura acima de Armadura 14 (ou seja, figuras com Armadura 13 vão para Armadura 14). Múltiplas conjurações desta magia no mesmo alvo não têm efeito.",
    },
    {
      name: "Encantar Equipamento",
      castingNumber: 8,
      range: "Linha de Visão",
      effect:
        "Esta magia tem como alvo uma arma ou armadura à escolha do conjurador. Se conjurada em uma arma corpo a corpo, esta arma conta como uma arma mágica com +1 Ímpeto. Arcos e bestas contam como armas mágicas com +1 Precisão, mas os ataques feitos com elas não contam como ataques mágicos. Esta magia pode ser conjurada em uma única flecha ou virote de besta, caso em que aquela munição dá +1 Precisão e seu ataque conta como mágico, mas apenas para o próximo ataque a distância. Esta magia só pode ser conjurada uma vez em cada arma. Ao usar tanto uma arma de projétil mágica quanto munição mágica, o atirador pode escolher aplicar o bônus de uma ou outra, mas não ambas. Se conjurada em armadura, a armadura ganha +1 armadura.",
    },
    {
      name: "Maldição da Ferrugem",
      castingNumber: 12,
      range: "Linha de Visão",
      effect:
        "Você enferruja e corrói um equipamento dentro de linha de visão, tornando-o corroído e inútil.\n\nO conjurador seleciona e ataca a arma ou armadura de um alvo, fazendo-a deteriorar e desmoronar, tornando-a inútil pelo resto do jogo. Esta magia não tem efeito em armas mágicas (mesmo aquelas apenas temporariamente encantadas). Esta magia não tem efeito em criaturas (a menos que sejam especificamente identificadas como equipadas com uma arma). Pode ser usada contra um constructo, caso em que faz um ataque a distância mágico +7 contra ele.",
    },
    {
      name: "Flechas de Prata de Arha",
      castingNumber: 10,
      range: "Linha de Visão",
      effect:
        "Você cria várias flechas mágicas de prata e as arremessa em inimigos.\n\nEsta magia dispara flechas de prata conjuradas no alvo. O conjurador faz um ataque a distância +5 contra qualquer figura dentro de linha de visão a até 30cm. Isto não conta como um ataque mágico.",
    },
    {
      name: "Maldição do Chumbo",
      castingNumber: 10,
      range: "Linha de Visão",
      effect:
        "Você faz o sangue de um inimigo dentro de linha de visão ter o peso de chumbo.\n\nO alvo é reduzido a um máximo de uma ação por ativação (que pode ser qualquer ação, não precisa ser movimento). Ele pode fazer uma Rolagem de Vontade contra a Rolagem de Conjuração no fim de cada uma de suas ativações. Se bem-sucedida, a magia é cancelada.",
    },
    {
      name: "Alquimia",
      castingNumber: 12,
      range: "Linha de Visão",
      effect:
        "O conjurador cria uma Poção Menor de sua escolha que pode ser vendida, armazenada no cofre do bando ou dada a um membro do bando. Um Conjurador Herói (apenas um herói!) pode usar esta magia para criar uma Poção Maior. Primeiro, ele deve declarar que poção está tentando preparar e pagar o custo de ingredientes listado. O conjurador deve então rolar para conjurar Preparar Poção com -4 na Rolagem de Conjuração. Se bem-sucedida, a poção é criada e pode ser imediatamente atribuída a uma figura no bando, vendida ou armazenada no cofre do bando. Se malsucedida, a poção não é criada e o dinheiro gasto em ingredientes é perdido.",
    },
  ];

  return (
    <PageContainer>
      <Header title="Chamon - Tradição do Metal" />

      <ContentSection>
        <ContentContainer>
          <ParchmentText
            sx={{
              textAlign: "center",
              fontSize: "1.2rem",
              fontStyle: "italic",
              color: "#c0c0c0",
              mb: 3,
            }}
          >
            O Vento Amarelo da Transmutação e Lógica
          </ParchmentText>

          <ParchmentText sx={{ mb: 4 }}>
            A Tradição do Metal é a magia da transmutação, lógica, conhecimento
            aplicado, investigação empírica e experimentação. Mais comumente
            conhecida como alquimia, ela é baseada na manipulação de Chamon, o
            Vento Amarelo da Magia. Magistrados desta tradição são conhecidos
            como Magos Dourados ou Alquimistas e estão entre as pessoas mais
            eruditas do Império. Alquimistas fazem uso frequente de magia ritual
            e suas transmutações mais lendárias são feitiços deste tipo.
            Conforme crescem em poder, Magos Dourados tornam-se mais
            conservadores em suas atitudes, preferindo lidar com coisas
            tangíveis, pragmáticas e mensuráveis, ao invés de ideias novas
            fantasiosas. Espelhando esta consolidação, seus corpos tornam-se
            cada vez mais lentos e rígidos, as articulações travando e a pele
            crescendo grossa e calejada com um tom dourado. Muitos Magos anciãos
            recorrem a engenhocas para mover seus corpos congelados.
          </ParchmentText>

          <PowerListTitle>Feitiços da Tradição do Metal</PowerListTitle>

          {spells.map((spell, index) => (
            <SpellCard
              key={index}
              id={spell.name.toLowerCase().replace(/\s+/g, "-")}
              name={spell.name}
              school="Tradição do Metal"
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
