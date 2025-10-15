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

export default function PrayersOfSigmarPage() {
  const navigate = useNavigate();

  const spells = [
    {
      name: "Martelo de Sigmar",
      castingNumber: 14,
      range: "Linha de Visão",
      effect:
        "O sacerdote invoca a força divina do próprio Ghal Maraz sobre uma arma escolhida. O poder sagrado do Heldenhammer percorre a lâmina com energia divina. Na próxima vez que a figura empunhando esta arma vencer uma rodada de combate e causar pelo menos 1 ponto de dano, a arma inflige 5 pontos adicionais de dano mágico elemental. Se conjurada em uma arma normal usada contra uma criatura Imune a Armas Normais, a arma causará apenas os 5 pontos de dano mágico elemental. Se conjurada em um arco ou besta, a magia só se aplica ao próximo ataque, desaparecendo após o disparo.",
    },
    {
      name: "Armadura da Retidão",
      castingNumber: 12,
      range: "Linha de Visão",
      effect:
        "A luz dourada de Sigmar envolve o alvo como uma couraça espiritual reluzente, protegendo-o contra os golpes dos inimigos. O alvo desta oração recebe +2 Armadura pelo resto do jogo. As bênçãos de Sigmar não se acumulam com proteções já poderosas - esta magia não tem efeito em um alvo que já possua Armadura 14 ou superior. Múltiplas conjurações de Armadura da Retidão na mesma figura não têm efeito.",
    },
    {
      name: "Mão Curadora",
      castingNumber: 10,
      range: "Toque",
      effect:
        "O sacerdote canaliza a misericórdia do deus-guerreiro através de suas mãos, fechando ferimentos com pura luz divina. Um toque sagrado restaura até 5 pontos de Vigor perdidos a uma figura alvo ou ao próprio conjurador. A carne se regenera, ossos se reconstroem, e o sangue flui novamente. Esta magia não pode elevar o Vigor de um modelo acima de seu valor inicial. Os mortos-vivos e constructos, desprovidos de alma ou carne verdadeira, não podem ser curados por esta bênção.",
    },
    {
      name: "Farol da Coragem",
      castingNumber: 16,
      range: "Linha de Visão",
      effect:
        "Uma aura radiante de determinação inabalável emana do alvo, queimando como uma chama dourada em sua alma. O poder de Sigmar fortalece a mente contra toda forma de manipulação sobrenatural. O alvo desta oração torna-se imune a magias de Controle Mental e Sugestão pelo resto do jogo, e quaisquer magias de Controle Mental atuais sobre a figura são canceladas. A vontade da figura é fortalecida pela fé, recebendo +2 Vontade pelo resto do jogo.",
    },
    {
      name: "Cometa de Cauda Dupla",
      castingNumber: 18,
      range: "Linha de Visão",
      effect:
        "O sacerdote invoca o presságio mais sagrado do Império - um cometa flamejante desaba dos céus em uma explosão cataclísmica de luz divina! O conjurador faz um ataque a distância mágico elemental +3 contra um alvo a até 40cm. Este ataque causa +4 de dano. Além disso, todas as figuras em contato com a figura alvo também sofrem um ataque a distância mágico elemental +1 que causa +4 de dano. Qualquer figura que sofra dano destes ataques é imediatamente movida 5cm em uma direção aleatória, arremessada pela força do impacto celestial.",
    },
    {
      name: "Fogo Espiritual",
      castingNumber: 12,
      range: "Linha de Visão",
      effect:
        "Chamas brancas e puras brotam das mãos do sacerdote, queimando não a carne, mas a própria essência espiritual do inimigo. O conjurador faz um ataque a distância elemental +3 contra uma figura alvo a até 40cm e linha de visão. O ataque causa +2 de dano. Se este ataque for feito contra um Daemon, as chamas sagradas se intensificam em um rugido purificador - o ataque se torna um ataque a distância sagrado +7 com o mesmo bônus de dano, banindo a criatura imunda de volta ao Caos.",
    },
    {
      name: "Flagelo dos Ímpios",
      castingNumber: 14,
      range: "Linha de Visão",
      effect:
        "O sacerdote ergue seu símbolo sagrado ao alto e proclama um julgamento divino. Ondas de luz purificadora varrem o campo de batalha, queimando a carne corrupta dos servos do Caos. Todos os daemons dentro da linha de visão do conjurador devem passar em uma Rolagem de Vontade imediata com Número Alvo igual à Rolagem de Conjuração. Se um daemon falhar na rolagem e sua Vontade atual for +4 ou menos, é imediatamente reduzido a 0 Vigor e removido da mesa, banido atrás do véu da realidade. Se sua Vontade atual for +5 ou superior, sofre dano igual a três vezes a quantidade pela qual falhou na Rolagem de Vontade.",
    },
    {
      name: "Desfazer o Arcano",
      castingNumber: 16,
      range: "Linha de Visão",
      effect:
        "Com uma palavra de poder, o sacerdote rasga os fios da magia que tecem os feitiços dos inimigos. A luz de Sigmar corta através das energias arcanas como uma lâmina através de seda. Esta oração imediatamente cancela o efeito contínuo de qualquer conjuração de qualquer magia. Não pode des-invocar uma criatura permanentemente convocada, mas pode cancelar o controle de uma criatura que seja membro temporário de um bando, libertando-a da influência sobrenatural.",
    },
    {
      name: "Tempestade de Fogo Espiritual",
      castingNumber: 16,
      range: "Efeito de Área",
      effect:
        "O sacerdote lança os braços ao céu e invoca uma conflagração santa que varre todo o campo de batalha. Chamas brancas e douradas explodem do solo, purificando toda a área com fogo divino. Todo daemon na mesa deve fazer uma Rolagem de Vontade contra a Rolagem de Conjuração desta magia ou sofrer 3 pontos de dano sagrado. Além disso, o poder residual desta bênção contamina as energias sombrias - qualquer tentativa de conjurar magias que invoquem ou criem criaturas mortas-vivas ou daemons sofre -4 na Rolagem de Conjuração pelo resto do jogo (não cumulativo). Canalizar tanto poder divino cobra seu preço - o sacerdote sofre 1 ponto de dano cada vez que esta magia é conjurada com sucesso.",
    },
    {
      name: "Ira Justiceira",
      castingNumber: 12,
      range: "Linha de Visão",
      effect:
        "O sacerdote abençoa um guerreiro com a fúria santa de Sigmar, enchendo suas veias com o poder do Martelo de Guerra. Seus olhos brilham com determinação divina, e seus golpes ganham força sobrenatural. A figura alvo ganha +1 Ímpeto pelo resto do jogo. A fúria de Sigmar não se multiplica desnecessariamente - múltiplas conjurações de Ira Justiceira no mesmo alvo não têm efeito.",
    },
  ];

  return (
    <PageContainer>
      <Header title="Orações de Sigmar" />

      <ContentSection>
        <ContentContainer>
          <ParchmentText
            sx={{
              textAlign: "center",
              fontSize: "1.2rem",
              fontStyle: "italic",
              color: "#daa520",
              mb: 3,
            }}
          >
            ⚔️ A Proteção Divina do Heldenhammer
          </ParchmentText>

          <ParchmentText sx={{ mb: 4 }}>
            Sigmar Heldenhammer, o fundador do Império e o maior rei-guerreiro da
            humanidade, ascendeu à divindade e agora vigia seu povo das alturas
            celestiais. Seus sacerdotes são clérigos-guerreiros que empunham poder
            divino para esmagar os inimigos da humanidade, proteger os inocentes e
            banir as criaturas das trevas. As Orações de Sigmar são uma força poderosa
            contra o Caos, os mortos-vivos e todos aqueles que ameaçam o Império. Com
            martelo e fé, os devotos de Sigmar trazem a luz da justiça aos lugares
            mais sombrios do Velho Mundo.
          </ParchmentText>

          <PowerListTitle>Orações de Sigmar</PowerListTitle>

          {spells.map((spell, index) => (
            <SpellCard
              key={index}
              id={spell.name.toLowerCase().replace(/\s+/g, "-")}
              name={spell.name}
              school="Orações de Sigmar"
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

