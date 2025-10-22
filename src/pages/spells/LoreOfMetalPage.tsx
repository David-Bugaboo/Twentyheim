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
      keywords: ["Linha de Visão"],
      effect:
        "O alquimista manipula o Vento Amarelo para condensar partículas metálicas suspensas no ar ao redor do alvo. Processo de formação: orbes de liga de aço se materializam através de transmutação controlada, estabelecendo padrão orbital defensivo. Densidade molecular aumentada proporciona proteção física mensurável contra impactos cinéticos.\n\nO alvo recebe +2 Armadura pelo resto do jogo. Limite superior: Armadura 14 (figuras com Armadura 13 são elevadas para Armadura 14). Múltiplas aplicações no mesmo alvo não produzem efeito cumulativo - redundância de sistema.",
    },
    {
      name: "Lei da Lógica",
      castingNumber: 8,
      keywords: ["Linha de Visão"],
      effect:
        "A figura alvo recebe +5 em testes de atributo que não envolvem combate ou resistir a magia, poderes e items até o fim do jogo.",
    },
    {
      name: "Refinamento Molecular",
      castingNumber: 8,
      keywords: ["Linha de Visão"],
      effect:
        "Esta magia tem como alvo uma arma ou armadura escolhida pelo conjurador. Se conjurada em uma arma corpo a corpo, esta arma conta como uma arma mágica com +1 Ímpeto. Arcos e bestas contam como armas mágicas com +1 Precisão, mas os ataques feitos com elas não contam como ataques mágicos. Esta magia pode ser conjurada em uma única flecha ou virote de besta, caso em que essa munição dá +1 Precisão e seu ataque conta como mágico, mas apenas para o próximo ataque a distância. Esta magia pode ser conjurada apenas uma vez em cada arma. Ao usar tanto uma arma mágica de projétil quanto munição mágica, o atirador pode escolher aplicar o bônus de um ou outro, mas não ambos. Esta magia só pode ser conjurada em uma figura usando armadura. se conjurada em uma armadura, esta agoraconta como armadura mágica e concede +1 Armadura pelo resto do jogo. Múltiplas conjurações desta magia no mesmo alvo não têm efeito.",
    },
    {
      name: "Maldição da Ferrugem",
      castingNumber: 12,
      keywords: ["Linha de Visão"],
      effect:
        "Aceleração controlada de oxidação: o alquimista catalisa reação química de corrosão no metal alvo. Taxa de deterioração: 100-1000x velocidade natural. Processo observado: formação rápida de óxido ferroso, desintegração estrutural, falha catastrófica de material.\n\nAlvo selecionado: arma ou armadura. Resultado: item torna-se não-funcional pelo resto do jogo. Exceção: itens com infusão mágica permanente demonstram resistência completa ao processo (incluindo encantamentos temporários). Nota: procedimento não afeta organismos vivos diretamente (exceto se portando arma identificável). Aplicação em Construto: ataque a distância mágico +7 - corrosão sistêmica.",
    },
    {
      name: "Flechas de Prata de Arha",
      castingNumber: 10,
      keywords: ["Alcance(30)", "Missil Mágico(Normal)(+5) "],
      effect:
        "ataque a figura alvo com o Míssil Mágico. Apesar de seu dano ser normal, ele conta como mágico contra mortos vivos e lobisomens devido a prata.",
    },
    {
      name: "Transmutação em Chumbo",
      castingNumber: 10,
      keywords: ["Linha de Visão"],
      effect:
        "O alvo é reduzido a um máximo de uma ação por ativação até o fim do jogo (que pode ser qualquer ação, não precisa ser movimento). Ele pode fazer uma Rolagem de Vontade contra a Rolagem de Conjuração no fim de cada uma de suas ativações. Se bem-sucedida, a magia é cancelada. Adicionalmente, pode como uma ação remover sua armadura, perdendo o bônus de armaduras mas cancelando o efeito da magia.",
    },
    {
      name: "Transmutação Alquímica",
      castingNumber: 12,
      keywords: ["Linha de Visão"],
      effect:
        "Síntese de compostos: o alquimista executa procedimento laboratorial acelerado para produzir solução alquímica. Método padrão: criação de Poção Menor (seleção de fórmula a critério do operador). Produto pode ser: comercializado, armazenado em repositório, ou distribuído a membro de equipe.\n\nProcedimento avançado (restrito a Conjuradores Herói): síntese de Poção Maior. Requisitos: (1) declaração de fórmula específica, (2) aquisição de reagentes (custo conforme especificado), (3) execução de processo com modificador de dificuldade -4 na Rolagem de Conjuração. Resultado positivo: composto sintetizado com sucesso, disponível para uso imediato/armazenamento/venda. Resultado negativo: reação falha, reagentes consumidos sem produção de produto - perda total de investimento em materiais.",
    },
    {
      name: "Transmutação da Mente Instável",
      castingNumber: 12,
      keywords: ["Linha de Visão"],
      effect:
        "Se a magia for conjurada com sucesso, cancela quaisquer efeito de magias ou poderes com a palavra-chave Psicológico na figura alvo.",
    },
    {
      name: "Transmutação da Permanência",
      castingNumber: 14,
      keywords: ["Ritual"],
      effect:
        "Se o ritual for conjurado com sucesso, os bonus dados a uma arma ou armadura com Refinamento Molecular se tornam permanentes.",
    },
    {
      name: "Lei do Ouro",
      castingNumber: 16,
      keywords: ["Alcance(40)"],
      effect:
        "O portador de um item mágico alvo faz um teste de vontade com CD igual à Rolagem de Conjuração. Se falhar, o item mágico alvo não tem mais nenhum efeito ou bônus até o fim do jogo. No começo de cada ativação, o portador do item pode refazer o teste de Vontade. Se passar, ele cancela o efeito dessa magia.",
    },
    {
      name: "Manipular Minério",
      castingNumber: 16,
      keywords: ["Linha de Visão"],
      effect:
        "O conjurador manipula os minérios dos fragmentos de pedra-bruxa movendo eles rumo a si. O conjurador pode mover qualquer fragmento de pedra-bruxa até 10cm desde que esteja no chão, permaneça em linha de visão e evite qualquer terreno. Esta magia não tem efeito em qualquer fragmento de pedra-bruxa que tenha requisitos especiais para ser coletado.",
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
