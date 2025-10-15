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

export default function LoreOfLightPage() {
  const navigate = useNavigate();

  const spells = [
    {
      name: "Cura de Hysh",
      castingNumber: 8,
      range: "Linha de Visão",
      effect:
        "Luz branca e pura envolve o alvo em um abraço que é ao mesmo tempo confortante e incandescente. A luminescência penetra feridas, queimando impurezas e forçando a carne a se regenerar. Não é uma cura gentil - é ORDEM restaurada, células comandadas a se reconstruir, sangue obrigado a fluir novamente. A luz purifica tudo: feridas fecham-se, venenos evaporam, maldições se dissolvem. Mas luz tão pura não pode tocar o que já foi corrompido pela morte.\n\nEsta magia restaura até 5 pontos de Vigor perdido e remove quaisquer fichas de uma figura alvo a até 15cm. Esta magia não pode levar um modelo acima de seu Vigor inicial. Esta magia não tem efeito em mortos-vivos ou constructos - a luz não traz de volta o que já foi julgado.",
    },
    {
      name: "Exorcismo",
      castingNumber: 10,
      range: "Linha de Visão",
      effect:
        "O mago ergue a mão e pronuncia uma SENTENÇA. Luz incandescente jorra como lâminas, perfurando a essência imunda do daemon. Não há misericórdia, não há negociação - apenas JULGAMENTO. A pureza absoluta de Hysh é anátema para criaturas do Caos. Tentáculos de luz branca se enroscam ao redor do daemon, queimando sua forma etérea, forçando-o de volta através do véu da realidade. A criatura grita enquanto é desfeita, sua existência intolerável à luz da verdade.\n\nEsse daemônio deve passar em uma Rolagem de Vontade imediata com Classe de Dificuldade igual à Rolagem de Conjuração. Se o daemônio falhar na rolagem e sua Vontade atual for +4 ou menos, a sentença é absoluta - ele é imediatamente reduzido a 0 Vigor e BANIDO do tabuleiro. Se sua Vontade atual for +5 ou maior, a luz ainda queima - ele sofre dano igual a três vezes a quantidade pela qual falhou na Rolagem de Vontade.",
    },
    {
      name: "Olhos da Verdade",
      castingNumber: 10,
      range: "Apenas o Conjurador",
      effect:
        "Os olhos do mago se inflamam com luminescência dourada incandescente - não há NADA que possa se esconder da luz absoluta. Ilusões derretem como névoa ao sol. Invisibilidade se desfaz. Mentiras são expostas. A verdade não pede permissão - ela REVELA. Tudo que está oculto é arrastado à luz, quer queira quer não. Na presença de Hysh desencadeada, até as sombras são queimadas.\n\nO conjurador, e todas as figuras amigas a até 15cm do conjurador, podem ver figuras invisíveis e são imunes aos efeitos de magias de Sedução Sombria - a verdade protege. Além disso, se uma figura invisível estiver a até 15cm do conjurador, a luz a EXPÕE e a magia Invisibilidade é cancelada. Se um Soldado Ilusório estiver a até 15cm do conjurador, a falsidade não pode existir - ele é imediatamente removido da mesa.",
    },
    {
      name: "Olhar Radiante",
      castingNumber: 8,
      range: "Linha de Visão",
      effect:
        "O mago fixa seu olhar na vítima e a luz JULGA. Raios de luminescência branca perfuram os olhos do alvo, queimando diretamente em sua alma. A vítima vê seus pecados, suas falhas, suas fraquezas - tudo EXPOSTO sem piedade. O peso do julgamento é paralisante. Músculos se recusam a obedecer, vontade se esvai, e tudo que resta é ficar ali, congelado pela luz da verdade implacável.\n\nO alvo deve fazer uma Rolagem de Vontade imediata com Classe de Dificuldade igual à Rolagem de Conjuração. Se falhar, a sentença é pronunciada: ele não pode atacar, atirar ou conjurar magias de Linha de Visão. Seu atributo de Ímpeto é reduzido a +0 e sua Agilidade a 1 - paralisia quase total. No fim de cada turno, a figura pode tentar outra Rolagem de Vontade com o mesmo Classe de Dificuldade, lutando para se libertar do julgamento. Se bem-sucedida, a magia é cancelada.",
    },
    {
      name: "Manto Cintilante",
      castingNumber: 12,
      range: "Linha de Visão",
      effect:
        "O mago envolve o alvo em um manto de luz cintilante tão brilhante que é quase impossível olhar diretamente para ele. Raios luminosos refratam e dançam ao redor da figura, criando múltiplas imagens fantasmagóricas, ofuscando olhos e distorcendo percepções de distância. Arqueiros piscam e lacrimejam ao tentar mirar. A luz não apenas protege - ela ATACA os sentidos daqueles que ousam atirar contra o protegido, transformando cada tentativa de acertar em um exercício de frustração cegante.\n\nAtaques a distância contra a criatura alvo sofrem -2 Precisão - olhos queimam ao tentar focar na silhueta envolta em luz incandescente.",
    },
    {
      name: "Inspiração",
      castingNumber: 12,
      range: "Linha de Visão",
      effect:
        "O mago canaliza a luz da sabedoria pura diretamente na mente do alvo. É uma iluminação instantânea - CLAREZA absoluta que queima toda confusão, toda dúvida, toda manipulação. A mente se torna como cristal, transparente e inflexível. Tentativas de controle mental se despedaçam contra essa fortaleza de certeza. A vontade é FORJADA em luz incandescente, inquebrável e implacável.\n\nO alvo desta magia torna-se imune a magias com Psicologico no seu tipo de alvo - a mente iluminada não pode ser enganada. Quaisquer magias de Controle Mental atuais sobre a figura são QUEIMADAS e canceladas. A figura ganha +2 Vontade pelo resto do jogo - fortalecida pela luz da verdade.",
    },
    {
      name: "Círculo de Radiância",
      castingNumber: 12,
      range: "Toque",
      effect:
        "O mago traça um círculo sagrado no solo, e luz branca incandescente irrompe das runas - uma barreira de pureza absoluta. É um julgamento sem apelação: tudo que foi corrompido pela morte ou pelo Caos NÃO PODE PASSAR. A luz queima apenas ao toque, repelindo a impureza com força inflexível. Daemons gritam em agonia ao se aproximar. Mortos-vivos recuam instintivamente. O círculo não negocia, não cede - é uma SENTENÇA gravada em luz.\n\nCria um círculo com 8cm de diâmetro no qual nenhum daemônio ou criatura morta-viva pode entrar ou passar - a luz os REPELE. Se algo os forçar ao contato com o círculo, eles param em sua borda, incapazes de cruzar a barreira sagrada. Um conjurador só pode ter um círculo de radiância ativo por vez, mas não precisa permanecer dentro dele - a luz persiste. O conjurador pode cancelar esta magia no fim de qualquer turno. Caso contrário, role um dado no fim de cada turno: em 1-3 a luz se dissipa e a magia é cancelada.",
    },
  ];

  return (
    <PageContainer>
      <Header title="Hysh - Tradição da Luz" />

      <ContentSection>
        <ContentContainer>
          <ParchmentText
            sx={{
              textAlign: "center",
              fontSize: "1.2rem",
              fontStyle: "italic",
              color: "#fff8dc",
              mb: 3,
            }}
          >
            O Vento Branco da Pureza e Iluminação
          </ParchmentText>

          <ParchmentText sx={{ mb: 4 }}>
            A Tradição da Luz é a magia da iluminação física e mental. Baseada
            na manipulação de Hysh, o Vento Branco da Magia, esta tradição trata
            de verdade, sabedoria, poder radiante e energia que dá vida.
            Magistrados desta tradição são conhecidos como Hierofantes ou Magos
            da Luz e são sábios filósofos, curadores potentes e destemidos
            banidores de Daemônios. Conforme estes Magos crescem em poder,
            tendem ao intelectualismo seco e sagacidade, ao invés de humor. A
            cor escorre de sua pele e cabelo, tornando-se mais claros e
            semi-transparentes em alguns casos, enquanto os olhos tendem a uma
            brancura leitosa ou uma luminescência dourada. A maioria passa seu
            tempo livre lendo ou em contemplação solene.
          </ParchmentText>

          <PowerListTitle>Feitiços da Tradição da Luz</PowerListTitle>

          {spells.map((spell, index) => (
            <SpellCard
              key={index}
              id={spell.name.toLowerCase().replace(/\s+/g, "-")}
              name={spell.name}
              school="Tradição da Luz"
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
