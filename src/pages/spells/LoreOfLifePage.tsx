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

export default function LoreOfLifePage() {
  const navigate = useNavigate();

  const spells = [
    {
      name: "Sangue da Terra",
      castingNumber: 8,
      range: "Linha de Visão",
      effect:
        "Você absorve energia da terra sob seus pés para fortalecer um aliado.\n\nEscolha um alvo a até 30cm. Esta magia concede ao alvo +2 Vigor pelo resto do jogo. Isto pode levar uma figura acima de seu Vigor inicial. Uma figura só pode ter uma magia Sangue da Terra conjurada sobre ela por jogo.",
    },
    {
      name: "Portal dos Dolmens",
      castingNumber: 10,
      range: "Apenas o Conjurador",
      effect:
        "Você desaparece na terra e reaparece em qualquer lugar dentro de linha de visão.\n\nO conjurador imediatamente se move para aquele local, mas não pode realizar outras ações neste turno após conjurar esta magia. Esta magia não pode ser usada para entrar em combate ou para sair da mesa.",
    },
    {
      name: "Gêiser",
      castingNumber: 12,
      range: "Linha de Visão",
      effect:
        "Você faz um gêiser de água jorrar do chão em qualquer ponto dentro de linha de visão a até 30cm do conjurador.\n\nEste Geyser é um pilar circular de água fervente de 5cm de diâmetro, 8cm de altura. Este pilar não pode ser colocado em contato com uma figura. Sempre que uma figura se mover em contato com este gêiser, ou ativar enquanto em contato com ele, ela sofre um ataque mágico elemental +3. O pilar bloqueia linha de visão. No fim de cada turno, role um dado. Em 1-2 o gêiser cessa e deve ser removido da mesa.",
    },
    {
      name: "Parede de Espinhos",
      castingNumber: 8,
      range: "Linha de Visão",
      effect:
        "Cria uma linha de espinhos densos de 15cm de comprimento, 3cm de largura e 3cm de altura. Os espinhos não bloqueiam linha de visão, mas podem contar como terreno interveniente. Qualquer figura que deseje escalar sobre os espinhos deve primeiro fazer uma Rolagem de Vontade com Número Alvo de 14. Se falhar, sua ação atual termina imediatamente.",
    },
    {
      name: "Maldição dos Espinhos",
      castingNumber: 10,
      range: "Linha de Visão",
      effect:
        "O alvo desta magia é enredado em ervas daninhas e vinhas cheias de espinhos duros como aço. Cada vez que o alvo é ativado, ele deve fazer uma Rolagem de Ímpeto com Número Alvo de 15 (criaturas com o traço 'Grande' recebem +4 nesta rolagem). Se o alvo falhar, ele pode realizar apenas uma ação durante sua próxima ativação, que não pode ser movimento, e sofre dano. Este dano é considerado não-mágico. Uma vez que o alvo tenha feito sua Rolagem de Ímpeto com sucesso, ele escapou das vinhas e não está mais enredado.",
    },
    {
      name: "Nascente",
      castingNumber: 10,
      range: "Linha de Visão",
      effect:
        "Você concentra o poder da magia da vida em uma área para criar uma nascente natural.\n\nTodo solo a até 8cm de um ponto alvo se torna água profunda.",
    },
  ];

  return (
    <PageContainer>
      <Header title="Ghyran - Tradição da Vida" />

      <ContentSection>
        <ContentContainer>
          <ParchmentText
            sx={{
              textAlign: "center",
              fontSize: "1.2rem",
              fontStyle: "italic",
              color: "#90ee90",
              mb: 3,
            }}
          >
            O Vento Verde do Crescimento e Vitalidade
          </ParchmentText>

          <ParchmentText sx={{ mb: 4 }}>
            A Tradição da Vida é a magia da natureza, da terra crescente e das
            estações. Ela é baseada na manipulação de Ghyran, o Vento Verde da
            Magia. Magistrados desta tradição são conhecidos como Magos de Jade
            e sentem-se mais em casa no campo. Eles visitam cidades quando
            devem, mas preferem estar cercados pela majestade e poder da selva.
            Magos de Jade poderosos andam descalços, para estarem em contato
            constante com a terra. Conforme progridem em sua Ordem, assumem
            aspectos das estações, ficando cansados no Inverno, sóbrios no
            Outono, excitados na Primavera e vibrantes no Verão. Seus cabelos e
            unhas crescem muito rápido, e raramente sofrem de doenças.
          </ParchmentText>

          <PowerListTitle>Feitiços da Tradição da Vida</PowerListTitle>

          {spells.map((spell, index) => (
            <SpellCard
              key={index}
              id={spell.name.toLowerCase().replace(/\s+/g, "-")}
              name={spell.name}
              school="Tradição da Vida"
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
