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

export default function LoreOfBeastsPage() {
  const navigate = useNavigate();

  const spells = [
    {
      name: "Asas do Falcão Planante",
      castingNumber: 8,
      range: "Linha de Visão",
      effect:
        "Asas irrompem das costas de uma figura alvo, que são fortes o suficiente para erguê-lo pelos ares.\n\nEsta magia só pode ser conjurada em um membro do bando do conjurador. Mova imediatamente a figura alvo até 25cm em qualquer direção, incluindo verticalmente. Este movimento deve ser em linha reta ou em arco. Não pode curvar em cantos. Se este movimento deixar a figura acima do solo, ela imediatamente cai, sofrendo dano normalmente. Se o alvo estiver carregando tesouro, este movimento é reduzido para 13cm. Este movimento não pode tirar uma figura da mesa ou colocá-la em combate. O alvo desta magia não pode realizar outras ações neste turno, embora possa ter realizado ações anteriormente.",
    },
    {
      name: "Bestialidade Libertada",
      castingNumber: 10,
      range: "Linha de Visão",
      effect:
        "Você desencadeia a selvageria primitiva de seus aliados. Esta magia não funciona em animais (eles já são bestas!).\n\nO alvo recebe +2 Ímpeto. Múltiplas desta magia no mesmo alvo não têm efeito.",
    },
    {
      name: "Voz do Domador",
      castingNumber: 10,
      range: "Linha de Visão",
      effect:
        "Esta magia pode ser conjurada em qualquer criatura animal, sauriana ou aquática que não esteja atualmente sob controle de nenhum bando. A criatura deve fazer uma Rolagem de Vontade para resistir. Se a criatura falhar na Rolagem de Vontade, o Guardião pode imediatamente fazê-la realizar uma ação. Se a criatura não estiver em combate, essa ação deve ser movimento. O Guardião pode forçar o animal a fazer qualquer movimento legal, contanto que esse movimento não cause dano direto à criatura (ex: queda, andar no fogo). Se a criatura estiver em combate, o Guardião pode fazê-la atacar qualquer figura com a qual esteja em combate, ou pode compeli-la a usar uma ação de movimento para sair do combate.",
    },
    {
      name: "Troca-Peles",
      castingNumber: 10,
      range: "Apenas o Conjurador",
      effect:
        "O conjurador se transforma em: um Lobo (+0 na classe de dificuldade), um Cervo (+2 na classe de dificuldade) ou um Urso (+4 na classe de dificuldade). Todos os atributos do conjurador se tornam os atributos daquela criatura, exceto Vontade e Vigor, que permanecem inalterados. Enquanto em forma animal, o conjurador é afetado por quaisquer magias, efeitos e bônus contra animais. O conjurador não pode usar nenhum item. O conjurador não pode conjurar magias enquanto em forma animal. O conjurador pode terminar esta magia e retornar à sua forma normal como uma ação gratuita durante sua ativação. O conjurador pode mudar para uma forma animal diferente conjurando a magia novamente.",
    },
    {
      name: "Um Festim de Corvos",
      castingNumber: 10,
      range: "Linha de Visão",
      effect:
        "A figura alvo é atacada por um bando de corvos vorazes que irritam e distraem. O bando de corvos tem um raio de 3cm centrado na, e se movendo com, a figura alvo. Afeta todas as figuras, incluindo a figura alvo, total ou parcialmente dentro deste raio. Enquanto sendo incomodada pelos corvos, uma figura tem -4 Ímpeto e -4 Precisão (até um mínimo de +0) e -2 em Rolagens de Conjuração. Depois que esta figura ativar a cada turno, ela pode fazer uma Rolagem de Vontade com Número Alvo igual à Rolagem de Conjuração. Se bem-sucedida, a magia é cancelada. Outras figuras dentro do raio podem simplesmente se afastar para escapar. Uma figura só pode ser afetada por uma magia de Bando de Corvos por vez, seja como alvo ou por estar dentro do raio de 3cm. Criaturas Grandes, mortos-vivos e constructos são imunes a esta magia.",
    },
    {
      name: "Convocação Selvagem",
      castingNumber: 10,
      range: "Fora de Jogo (A)",
      effect:
        "O conjurador invoca um companheiro animal de sua escolha entre as seguintes opções para se tornar um membro permanente de seu bando: urso, leopardo das neves, sapo de gelo ou lobo atroz. Todos os Companheiros Animais contam como soldados padrão. Companheiros animais têm mais força de vontade que exemplos selvagens de sua espécie e recebem um +3 Vontade permanente. Um conjurador só pode ter um companheiro animal por vez.",
    },
  ];

  return (
    <PageContainer>
      <Header title="Ghur - Tradição das Bestas" />

      <ContentSection>
        <ContentContainer>
          <ParchmentText
            sx={{
              textAlign: "center",
              fontSize: "1.2rem",
              fontStyle: "italic",
              color: "#cd853f",
              mb: 3,
            }}
          >
            O Vento Marrom da Selvageria e Ferocidade
          </ParchmentText>

          <ParchmentText sx={{ mb: 4 }}>
            A Tradição das Bestas é a mais feral das feitiçarias. É a magia dos
            animais e da selvageria primitiva. Ela é baseada na manipulação de
            Ghur, o Vento Marrom da Magia. Magistrados desta tradição são
            conhecidos como Magos Âmbar e eles se apegam aos lugares selvagens
            que são a fonte de sua força. Conforme ganham poder, Magos Âmbar
            tornam-se cada vez mais distantes e inquietos com a sociedade humana
            — seus pelos crescendo densamente, unhas irregulares e dentes
            pontiagudos espelhando a natureza selvagem de suas almas.
          </ParchmentText>

          <PowerListTitle>Feitiços da Tradição das Bestas</PowerListTitle>

          {spells.map((spell, index) => (
            <SpellCard
              key={index}
              id={spell.name.toLowerCase().replace(/\s+/g, "-")}
              name={spell.name}
              school="Tradição das Bestas"
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
