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
        "O conjurador ergue os mortos sob seu controle, negando o descanso sagrado dos falecidos. O conjurador adiciona um crânio animado (+0 na classe de dificuldade), zumbi (+2 na classe de dificuldade), carniçal (+4 na classe de dificuldade) ou espectro (+6 na classe de dificuldade) ao seu bando como membro temporário. Se a magia for conjurada antes do jogo, o morto-vivo pode ser implantado normalmente. Se for conjurada durante um jogo, o morto-vivo aparece em contato de base com o conjurador. Um bando só pode ter um morto-vivo erguido por vez. Se o morto-vivo for morto ou sair da mesa, Erguer Mortos-Vivos pode ser conjurada novamente para criar outro.",
    },
    {
      name: "Evocação de Vanhel",
      castingNumber: 8,
      range: "Linha de Visão",
      effect:
        "Você energiza um Morto-Vivo sob seu controle. Esta magia só pode ser conjurada em uma figura membro do bando do conjurador com o traço morto-vivo. Esta figura ativará no fim da fase atual em vez de em sua fase normal. Por exemplo, se um campeão conjurar esta magia em uma criatura descontrolada, a criatura ativará no fim da Fase de Campeão daquele jogador em vez de durante sua fase de criatura. Conjuradores não podem conjurar esta magia em si mesmos mesmo se de alguma forma ganhem o traço Morto-Vivo, nem em uma figura que já ativou no turno atual.",
    },
    {
      name: "Edito de Nagash",
      castingNumber: 12,
      range: "Linha de Visão",
      effect:
        "As palavras do próprio Nagash trazem qualquer morto-vivo sob o controle de seu declamante. A criatura morta-viva alvo deve fazer uma Rolagem de Vontade imediata com Número Alvo igual à Rolagem de Conjuração. Se a rolagem falhar, a criatura morta-viva torna-se um membro temporário do bando do conjurador. Este controle dura pelo resto do jogo ou até a magia ser cancelada. O conjurador pode gastar uma ação para cancelar esta magia. Um conjurador só pode controlar uma criatura morta-viva por vez.",
    },
    {
      name: "Toque da Devanescencia",
      castingNumber: 8,
      range: "Linha de Visão",
      effect:
        "Esta magia pode ser conjurada em uma arma corpo a corpo ou uma peça de munição para uma arma de projétil, transformando-a em um receptáculo de decadência. Se uma figura acertar com esta arma, trate seu oponente como tendo Armadura -4 (até um mínimo de 10).",
    },
    {
      name: "Garra do Túmulo",
      castingNumber: 10,
      range: "Linha de Visão",
      effect:
        "Uma mão esquelética sai do chão e agarra o tornozelo do alvo. A figura não pode realizar quaisquer ações de movimento até escapar. Qualquer forma de movimento mágico, exceto a magia Salto, permite que uma figura escape da mão; caso contrário, a única forma de escapar é lutar contra a mão, que tem Ímpeto +0, Vigor 1. Se a mão sofrer um ponto de dano, ela desaparece e o alvo está livre. Outras figuras em contato de base podem atacar a mão ou dar um bônus de apoio. Se a mão vencer a luta, ela causa dano normalmente. Esta magia só pode ser conjurada contra um alvo que esteja em pé no chão. Criaturas Grandes não são afetadas por esta magia. O alcance máximo para esta magia é 45cm.",
    },
    {
      name: "Compartilhar Alma",
      castingNumber: 10,
      range: "Linha de Visão",
      effect:
        "O necromante coloca fragmentos de sua alma nos corpos ocos de seus servos mortos-vivos. Esta magia só pode ser conjurada em uma criatura morta-viva com atributo de Vontade de +2 ou menos que não esteja sob controle de outro Conjurador. Se esta criatura for controlada por outro conjurador, esta magia é cancelada. Sempre que o alvo desta magia causar dano a uma criatura que não seja morto-vivo, constructo ou daemônio, o conjurador desta magia recupera 2 pontos de Vigor. Isto não pode levar o conjurador acima de seu Vigor inicial. Um conjurador pode ter no máximo 2 conjurações desta magia ativas por vez. O conjurador pode cancelar uma conjuração desta magia a qualquer momento como uma ação gratuita. O conjurador não pode conjurar esta magia em si mesmo, mesmo se de alguma forma ganhar o traço Morto-Vivo.",
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
