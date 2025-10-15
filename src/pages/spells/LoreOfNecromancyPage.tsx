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

export default function LoreOfNecromancyPage() {
  const navigate = useNavigate();

  const spells = [
    {
      name: "Erguer Mortos-Vivos",
      castingNumber: 8,
      range: "Fora de Jogo (A) OU Toque",
      effect:
        "O necromante murmura palavras que não deveriam ser pronunciadas, palavras que violam o descanso eterno. Magia negra flui através de ossos enterrados, músculos apodrecidos, espíritos presos. Cadáveres se contorcem. Ossos rangem. Olhos vazios se acendem com fogo espectral verde-doentio. O morto se ergue novamente - não vivo, mas animado por vontade profana. Não há mais alma ali, apenas obediência.\n\nO conjurador adiciona um crânio animado (+0 na classe de dificuldade), zumbi (+2 na classe de dificuldade), carniçal (+4 na classe de dificuldade) ou espectro (+6 na classe de dificuldade) ao seu bando como membro temporário. Se a magia for conjurada antes do jogo, o morto-vivo pode ser implantado normalmente. Se for conjurada durante um jogo, o morto-vivo emerge do solo em contato de base com o conjurador. Um bando só pode ter um morto-vivo erguido por vez. Se o morto-vivo for destruído ou sair da mesa, Erguer Mortos-Vivos pode ser conjurada novamente para profanar outro cadáver.",
    },
    {
      name: "Evocação de Vanhel",
      castingNumber: 8,
      range: "Linha de Visão",
      effect:
        "O necromante aponta para seu servo morto-vivo e despeja um pulso de energia negra através da ligação profana que os conecta. Músculos mortos se tensionam com força antinatural, ossos rangem ao se moverem mais rápido que deveriam. O cadáver animado se move com velocidade sobrenatural - não por vontade própria, mas porque seu mestre EXIGE. É como puxar as cordas de uma marionete com força brutal.\n\nEsta magia só pode ser conjurada em uma figura membro do bando do conjurador com o traço morto-vivo. Esta figura ativará no fim da fase atual em vez de em sua fase normal - forçada a agir pela vontade do necromante. Conjuradores não podem conjurar esta magia em si mesmos mesmo se de alguma forma ganhem o traço Morto-Vivo, nem em uma figura que já ativou no turno atual.",
    },
    {
      name: "Edito de Nagash",
      castingNumber: 12,
      range: "Linha de Visão",
      effect:
        "O necromante pronuncia as palavras proibidas do Grande Necromante, Nagash o Imortal. Estas são palavras de COMANDO ABSOLUTO sobre os mortos - uma linguagem que todos os mortos-vivos compreendem instintivamente, gravada em sua essência no momento de sua criação profana. Não há resistência, não há vontade própria - apenas a OBEDIÊNCIA inscrita em cada osso, cada fragmento de carne morta. A criatura morta-viva sente a autoridade ancestral e sua aliança se quebra como vidro.\n\nA criatura morta-viva alvo deve fazer uma Rolagem de Vontade imediata com Classe de Dificuldade igual à Rolagem de Conjuração. Se a rolagem falhar, a criatura morta-viva é arrancada de seu antigo mestre e torna-se um membro temporário do bando do conjurador. Este controle dura pelo resto do jogo ou até a magia ser cancelada. O conjurador pode gastar uma ação para liberar a criatura. Um conjurador só pode controlar uma criatura morta-viva por vez através desta magia.",
    },
    {
      name: "Toque da Devanescencia",
      castingNumber: 8,
      range: "Linha de Visão",
      effect:
        "O necromante imbuí a arma com a essência da própria morte - não a morte violenta, mas a morte lenta da entropia e decadência. A lâmina ou projétil fica envolto em uma aura verde-pálida que fede a mofo e túmulos. Quando atinge carne, não apenas corta - APODRECE. Metal enferruja instantaneamente, couro racha e se desfaz, carne necrose ao toque. A armadura não protege contra aquilo que já está morto.\n\nEsta magia pode ser conjurada em uma arma corpo a corpo ou uma peça de munição para uma arma de projétil. Se uma figura acertar com esta arma, trate seu oponente como tendo Armadura -4 (até um mínimo de 10) - a proteção simplesmente se desintegra.",
    },
    {
      name: "Garra do Túmulo",
      castingNumber: 10,
      range: "Linha de Visão",
      effect:
        "O solo sob a vítima se agita. Terra se move. E então - dedos ósseos IRROMPEM do chão como se algo enterrado há muito tempo decidisse que quer companhia. Uma mão esquelética, ainda suja de terra de cemitério, agarra o tornozelo com força mortal. Os dedos apertam com força impossível para ossos tão frágeis. A vítima está presa - não por correntes de metal, mas por garras do próprio túmulo.\n\nA figura não pode realizar quaisquer ações de movimento até escapar. Qualquer forma de movimento mágico, exceto a magia Salto, permite que uma figura escape da mão; caso contrário, a única forma de escapar é lutar contra a mão, que tem Ímpeto +0, Vigor 1. Se a mão sofrer um ponto de dano, ela se desintegra. Outras figuras em contato de base podem atacar a mão ou dar um bônus de apoio. Se a mão vencer a luta, ela PUXA, causando dano normalmente. Esta magia só pode ser conjurada contra um alvo que esteja em pé no chão. Criaturas Grandes não são afetadas - muito pesadas para uma única mão. Alcance máximo: 45cm.",
    },
    {
      name: "Compartilhar Alma",
      castingNumber: 10,
      range: "Linha de Visão",
      effect:
        "O necromante rasga um fragmento de sua própria alma e o FORÇA para dentro do cadáver vazio de seu servo. É uma violação de si mesmo - dolorosa, antinatural, mas necessária. O morto-vivo se torna uma extensão dele, um parasita em carne morta. E quando essa carne morde e destrói vida, a energia vital roubada flui de volta através da ligação profana - sustento arrancado dos vivos, drenado através dos mortos, alimentando o necromante. É vampirismo por procuração.\n\nEsta magia só pode ser conjurada em uma criatura morta-viva com atributo de Vontade de +2 ou menos que não esteja sob controle de outro Conjurador. Sempre que o alvo desta magia causar dano a uma criatura que não seja morto-vivo, constructo ou daemônio, o conjurador recupera 2 pontos de Vigor - vida roubada através de seu servo. Isto não pode levar o conjurador acima de seu Vigor inicial. Um conjurador pode ter no máximo 2 conjurações ativas por vez. O conjurador pode cancelar uma conjuração como ação gratuita. O conjurador não pode conjurar esta magia em si mesmo, mesmo se ganhar o traço Morto-Vivo.",
    },
  ];

  return (
    <PageContainer>
      <Header title="Tradição da Necromancia" />

      <ContentSection>
        <ContentContainer>
          <ParchmentText
            sx={{
              textAlign: "center",
              fontSize: "1.2rem",
              fontStyle: "italic",
              color: "#9ca3af",
              mb: 3,
            }}
          >
            A Arte Negra da Não-Morte
          </ParchmentText>

          <ParchmentText sx={{ mb: 4 }}>
            Necromancia é a arte profana de erguer e comandar os mortos. Aqueles
            que praticam esta tradição sombria podem animar cadáveres, controlar
            guerreiros esqueletos e até roubar a força vital dos vivos para se
            sustentarem. Os Necromantes do Velho Mundo são caçados onde quer que
            sejam encontrados, pois sua própria existência é uma afronta à ordem
            natural. No entanto, o poder que empunham os torna adversários
            formidáveis, comandando legiões de mortos-vivos que não conhecem
            medo e não sentem dor.
          </ParchmentText>

          <PowerListTitle>Feitiços da Tradição da Necromancia</PowerListTitle>

          {spells.map((spell, index) => (
            <SpellCard
              key={index}
              id={spell.name.toLowerCase().replace(/\s+/g, "-")}
              name={spell.name}
              school="Tradição da Necromancia"
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
