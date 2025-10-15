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
        "O alquimista manipula o Vento Amarelo para condensar partículas metálicas suspensas no ar ao redor do alvo. Processo de formação: orbes de liga de aço se materializam através de transmutação controlada, estabelecendo padrão orbital defensivo. Densidade molecular aumentada proporciona proteção física mensurável contra impactos cinéticos.\n\nO alvo recebe +2 Armadura pelo resto do jogo. Limite superior: Armadura 14 (figuras com Armadura 13 são elevadas para Armadura 14). Múltiplas aplicações no mesmo alvo não produzem efeito cumulativo - redundância de sistema.",
    },
    {
      name: "Encantar Equipamento",
      castingNumber: 8,
      range: "Linha de Visão",
      effect:
        "Procedimento: infusão de Chamon em estrutura molecular do equipamento alvo. Resultado observado varia conforme substrato material. Armas corpo a corpo: aumento na eficiência de corte (+1 Ímpeto). Armas de projétil: realinhamento de trajetória balística (+1 Precisão, ataques não classificados como mágicos). Munição individual (flecha/virote): mesma calibração de precisão, ativação única, ataque conta como mágico. Limitação: uma aplicação por item. Nota: efeitos de arma e munição não são cumulativos - operador seleciona um. Armadura: reforço estrutural (+1 armadura).",
    },
    {
      name: "Maldição da Ferrugem",
      castingNumber: 12,
      range: "Linha de Visão",
      effect:
        "Aceleração controlada de oxidação: o alquimista catalisa reação química de corrosão no metal alvo. Taxa de deterioração: 100-1000x velocidade natural. Processo observado: formação rápida de óxido ferroso, desintegração estrutural, falha catastrófica de material.\n\nAlvo selecionado: arma ou armadura. Resultado: item torna-se não-funcional pelo resto do jogo. Exceção: itens com infusão mágica permanente demonstram resistência completa ao processo (incluindo encantamentos temporários). Nota: procedimento não afeta organismos vivos diretamente (exceto se portando arma identificável). Aplicação em constructo: ataque a distância mágico +7 - corrosão sistêmica.",
    },
    {
      name: "Flechas de Prata de Arha",
      castingNumber: 10,
      range: "Linha de Visão",
      effect:
        "Transmutação de matéria: conversão de partículas ambientes em projéteis de prata argentum (Ag, número atômico 47). Propriedades: densidade 10.49 g/cm³, ductilidade alta, condutividade térmica superior. Aceleração: força mágica propele projéteis transmutados em trajetória balística calculada.\n\nMétodo de ataque: ataque a distância +5 contra alvo dentro de linha de visão (alcance máximo: 30cm). Classificação: não-mágico (projéteis físicos, apesar de origem transmutativa).",
    },
    {
      name: "Maldição do Chumbo",
      castingNumber: 10,
      range: "Linha de Visão",
      effect:
        "Transmutação metálica aplicada a fluidos corporais: conversão parcial de elementos sanguíneos em plumbum (Pb, número atômico 82, densidade 11.34 g/cm³). Efeito observado: aumento significativo de viscosidade sanguínea, redução de mobilidade celular, fadiga muscular exponencial. Sistema nervoso afetado por toxicidade metálica temporária.\n\nResultado mensurável: alvo limitado a uma ação por ativação (qualquer tipo). Procedimento de reversão: Rolagem de Vontade vs Rolagem de Conjuração ao fim de cada ativação. Sucesso = cancelamento de efeito (metabolismo expurga metal transmutado).",
    },
    {
      name: "Alquimia",
      castingNumber: 12,
      range: "Linha de Visão",
      effect:
        "Síntese de compostos: o alquimista executa procedimento laboratorial acelerado para produzir solução alquímica. Método padrão: criação de Poção Menor (seleção de fórmula a critério do operador). Produto pode ser: comercializado, armazenado em repositório, ou distribuído a membro de equipe.\n\nProcedimento avançado (restrito a Conjuradores Herói): síntese de Poção Maior. Requisitos: (1) declaração de fórmula específica, (2) aquisição de reagentes (custo conforme especificado), (3) execução de processo com modificador de dificuldade -4 na Rolagem de Conjuração. Resultado positivo: composto sintetizado com sucesso, disponível para uso imediato/armazenamento/venda. Resultado negativo: reação falha, reagentes consumidos sem produção de produto - perda total de investimento em materiais.",
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
