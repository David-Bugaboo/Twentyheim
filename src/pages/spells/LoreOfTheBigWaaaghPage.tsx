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

export default function LoreOfTheBigWaaaghPage() {
  const navigate = useNavigate();

  const spells = [
    {
      name: "DURO COMO PREDA",
      castingNumber: 16,
      range: "Linha de Visão",
      effect:
        "O Xamã berra umas palavra esquisita e a energia verde do WAAAGH! gruda no pele do muleque. Oxe, o cabra fica duro que só vendo! A pele engrossa que nem couro de bode véi, os músculo tudo incha, e os osso fica mais pesado que bigorna de ferreiro. Qualé, tenta bater agora pra vê se amolece!\n\nO alvo recebe +3 Armadura pro resto do jogo - fica duro que só. Mas num passa de Armadura 15 não (tipo, se tiver 13 vai pra 14). E óia, jogar essa magia no mesmo cabra de novo num adianta não, viu? Já tá duro que é o que dá.",
    },
    {
      name: "LASCA COCO",
      castingNumber: 18,
      range: "Linha de Visão",
      effect:
        'O Xamã aponta pro inimigo e libera uma bola de energia verde que VUM direto na moleira do coitado! Rapaz, é uma porrada mental que deixa o cabra abestado! O muleque fica tonto, tonto, vendo estrela, sem saber se é dia ou se é noite. O coco quase LASCA de verdade, visse? Fica todo atordoado, sem prestar em nada.\n\nO conjurador faz um ataque a distância mágico elemental +7 contra um alvo a até 40cm e linha de visão. Se acertar, o desgraçado ganha um marcador de Atordoamento - ficou lelé da cuca!',
    },
    {
      name: "BORA MANCHU",
      castingNumber: 16,
      range: "Linha de Visão",
      effect:
        "O Xamã urra bem alto: 'UMBORA PEGAR ESSE CORNO, RAPAZIADAAAA!', rapaz, os cabra fica tudo doido, viu? Os ói brilha verde, os dente range, e uma vontade de meter a peia que só vendo! Fica tudo empiladíssim, querendo é QUEBRAR o inimigo no meio! É o poder do WAAAGH! deixando os cabra tudo agoniado pra briga!\n\nO alvo recebe +3 Ímpeto - fica brigão que só ele! Mas óia, gritar isso de novo pro mesmo cabra num adianta não. Já tá empiladão que chega."
    },
    {
      name: "A PORRADA",
      castingNumber: 20,
      range: "Linha de Visão",
      effect:
        'O Xamã invoca o PÉ GIGANTE de Padim Gork (ou será de Mork? Sei lá, os dois é foda memo!) que DESCE DO CÉU e ESTORA o inimigo! Macho do céu, é uma pisada que amassa é tudo, carai! O chão CHACOALHA, o ar É TORADO, e os home tudo voa pros lado que nem saco de bosta! Até quem tá perto do coitado toma na cara também - a pancada é tão forte que espalha pra todo mundo!\n\nO conjurador faz um ataque a distância mágico elemental +6 contra um alvo a até 40cm. Esse ataque causa +5 de dano - é PORRADÃO memo! Além disso, toda figura em contato com o alvo também toma um ataque a distância mágico elemental +2 que causa +5 de dano. Qualquer figura que sofrer dano desses ataque é imediatamente movida 10cm em direção aleatória - saiu voando, viu?',
    },
    {
      name: "MARRADA",
      castingNumber: 18,
      range: "Linha de Visão",
      effect:
        "O Xamã baixa a cabeça e CORRE que nem macho doido! Mas pera aí - ele num tá correndo de verdade não. É tipo uma marrada DI MINTIRINHA que voa pelo ar! Uma cabeçada invisível voa direto pro inimigo e TOME! Meta uma marrada dessas no capacete de qualquer um e vê o que acontece - o metal amassa, a armadura racha, e o cabra sai voando pra trás que nem foi chutado por jegue brabo!\n\nFaça um ataque a distância não-mágico +6 contra o alvo. Se acertar, o alvo imediatamente sofre -3 Armadura (mínimo de 10) só pra esse ataque - a marrada amassou tudo! Além disso, além de qualquer dano sofrido, o alvo é empurrado pra trás em linha reta, se afastando do conjurador, uma quantidade de centímetros igual ao dano sofrido vezes 2, ou até bater num terreno maior que 3cm de altura.",
    },
    {
      name: "PAPOCA QUENGO",
      castingNumber: 24,
      range: "Linha de Visão",
      effect:
        'ESSA É A MAGIA MAIS MASSA DO XAMÃ! O velho aponta e PAPOCA o quengo do inimigo com o PODER DA MENTE! Oxe, a cabeça do cabra É TORADA que nem um sapoti podre! É fei demais! Mas se alua, viu? Fazer isso é um trabai de cornopro Xamã também - ele perde um tiquim de vida só de tentar. E se o coco papocar memo, pode escolher outro pra estourar também se tiver alguém pertim!\n\nAlvo a até 20cm deve fazer Rolagem de Vontade com CD igual à Rolagem de Conjuração ou é IMEDIATAMENTE reduzido a 0 Vigor - estourou o quengo! Todo mundo pode potencializar a Rolagem de Vontade pra resistir, até quem num é feiticeiro. O Xamã perde 1 Vigor SÓ DE TENTAR essa magia (mesmo se funcionar), além de qualquer perda por falha ou potencialização. Num funciona em morto-vivo ou constructo não. Se uma criatura morrer com essa magia, o Xamã pode escolher outro alvo a até 8cm do primeiro - e PAPOCA o quengo dele também!',
    },
    {
      name: "QUEIMA QUENGARAL",
      castingNumber: 18,
      range: "Fora de Jogo (B)",
      effect:
        "O Xamã fica berrando e pulando que nem maluco antes da briga começar, enchendo a cuca dos muleque com energia do WAAAGH! 'BORA QUE BORA, CAMBADA! NOIS VAMO QUEBRAR ESSES GALADO NA PEIA! QUEIMA QUENGARAAAAAL' Os verde fica tudo com gastura, agoniado, querendo é se meter no mei da xinxa! Isso deixa os cabra tudo mais rápido que num sei o que.\n\nSe o Xamã tiver na mesa, o bando dele adiciona +4 nas Rolagem de Iniciativa só pra determinar o jogador primário. Essa magia conta como ativa no Xamã durante o jogo e pode ser cancelada por qualquer coisa que cancele magia.",
    },
    {
      name: "SOL QUENTE DA DESGRACA",
      castingNumber: 18,
      range: "Linha de Visão",
      effect:
        'O Xamã faz uma bola de FOGO VERDE que é quente que nem sol do meio-dia, só que pior! Ele arremessa essa bola ardente no inimigo e ela papoca que é um carai! Todo mundo perto toma quintura também - é calor qie nem presta, macho. Mas óia, tem que ter visão limpa do desgraçado. Se tiver outro na frente atrapalhando, num dá pra jogar não.\n\nO conjurador seleciona um inimigo a até 40cm e linha de visão e arremessa uma esfera de fogo puro. O alvo e toda figura a até 3cm e linha de visão do alvo imediatamente sofrem um ataque a distância mágico elemental +7 - QUEIMA TUDO! Role o ataque separado pra cada figura. Trate o alvo como origem do ataque pra determinar cobertura pros outros. Essa magia num pode mirar em inimigo que tá nem que seja um cadim escondido por outra figura.',
    },
    {
      name: "PORRADA NA PLEURA, CARAI",
      castingNumber: 14,
      range: "Linha de Visão",
      effect:
        "O Xamã cospe na arma do muleque e ela fica BRILHANDO! 'VAI LÁ E METE LOGO NA PLEURA DELE, CABRA!' A arma fica carregada com energia bruta do WAAAGH! - não é pra cortar não, é pra ESMAGAR direto onde dói mais! Mira na moleira, na costela, no figado - onde for que a armadura num tá protegendo direito!\n\nEssa magia pode ser conjurada numa arma corpo a corpo. Na próxima vez que a figura acertar com essa arma, trate o oponente como tendo Armadura -5 (mínimo de 10) - a porrada ignora a proteção!",
    },
    {
      name: "PEIXEIRA DE PADIM GORK",
      castingNumber: 16,
      range: "Linha de Visão",
      effect:
        "O Xamã benze a arma com a energia verde do WAAAGH! e ela vira praticamente a PEIXEIRA do próprio Padim Gork! A lâmina brilha que nem raio verde, fica sedenta, querendo é CORTAR! Quando o cabra acerta o inimigo com essa belezura, meu amigo, a arma NUM APENAS corta - ela EXPLODE com poder divino ork! É talho e porrada junto, tudo de uma vez!\n\nEssa magia é conjurada numa arma corpo a corpo. Na próxima vez que a figura empunhando essa arma vencer uma rodada de combate e causar pelo menos 1 ponto de dano, essa arma inflige 5 pontos ADICIONAIS de dano mágico elemental - é o poder de Gork memo! Se conjurada numa arma normal usada contra criatura Imune a Armas Normais, a arma causará só os 5 pontos de dano mágico elemental.",
    },
    {
      name: "ÓIADA DE PADIM MORK",
      castingNumber: 14,
      range: "Linha de Visão",
      effect:
        "O Xamã olha fixo pra frente e os ZÓI DELE BRILHA VERDE QUE NEM LAMPARINA! Aí sai um RAIO VERDÃO dos óião do velho que torra tudo que tá na frente! É a bizoiada de Padim Mork, rapaz - quando Mork tá olhando pra você, é melhor se tu sair do mei, viu? O raio passa reto queimando todo corno que tá na linha de tiro. Manchu, é tipo um relâmpago verde que num desvia de nada!\n\nTrace uma linha reta do conjurador até qualquer ponto na mesa. Faça um ataque a distância mágico elemental +6 contra qualquer figura ao longo dessa linha que NÃO esteja completamente escondida por cobertura - o raio pega tudim!",
    },
    {
      name: "PEIA DE PADIM GORK",
      castingNumber: 18,
      range: "Linha de Visão",
      effect:
        'Uma MÃO GIGANTE INVISÍVEL de Padim Gork aparece do nada e DÁ UM TAPA no inimigo! Rapaz, é uma mãozada que manda o cabra pra casa do carai! Mas o miserávi pode tentar resistir. Se ele for cabra de vontade forte, consegue ficar no lugar. Mas se num conseguir... vish, sai voando que nem pipa sem linha!\n\nEssa magia pode ter como alvo qualquer figura a até 30cm. Mova essa figura 10cm em direção aleatória - levou um tapão! Uma figura pode fazer Rolagem de Vontade com CD igual à Rolagem de Conjuração pra resistir. Se tiver sucesso, num move não - o cabra é zovudo! Criatura descontrolada sempre vai tentar essa Rolagem de Vontade.',
    },
    {
      name: "ESTAUTA DA WAAAAAAGH!",
      castingNumber: 22,
      range: "Fora de Jogo (B) ou Toque",
      effect:
        'O Xamã pega uma pedra e começa a RABISCAR ela toda com desenho feio e ranho verde! Faz uns símbolo todo torto de Gork e Mork, cospe nela, MIJA nela (é sério memo, viu?), e fica berrando WAAAGH até a pedra ficar CARREGADA de energia. Pode ser parede de prédio, caverna, penhasco, estátua, ou só uma pedra memo. Aí a pedra vira tipo uma bateria mágica verde arretada! Enquanto o Xamã tá pertinho dela, os feitiço dele fica MAIS FORTE - cada pinguinho de vida que ele usa rende DOBRADO! E olha que doido: o Xamã pode até VER através da pedra pra jogar magia de longe, como se tivesse lá!\n\nEnquanto o conjurador tiver a até 30cm dessa pedra, pode potencializar feitiços e Rolagens de Vontade numa base 1-pra-2 (um Vigor por DOIS ponto na rolagem) ao invés do 1-pra-1 normal - rende dobrado, sô! Além disso, o Xamã pode traçar linha de visão DA PEDRA pra efeito de feitiço. Um Xamã pode ter DUAS dessas pedra ativa ao mesmo tempo, mas tem que tá pelo menos 90cm uma da outra - senão as energia se atropela. Pode cancelar a magia quando quiser. As pedra pode ser quebrada mas é imune a ataque não-mágico - tem que ser magia memo pra quebrar. Trate a pedra como Ímpeto +0, Armadura 22, Vigor 1. Se conjurada antes do jogo, pode botar a pedra em qualquer lugar da zona de implantação do Xamã.',
    },
  ];

  return (
    <PageContainer>
      <Header title="Tradição do Grande WAAAGH!" />

      <ContentSection>
        <ContentContainer>
          <ParchmentText
            sx={{
              textAlign: "center",
              fontSize: "1.2rem",
              fontStyle: "italic",
              color: "#6b8e23",
              mb: 3,
            }}
          >
            💚 O PODER DE GORK E MORK!
          </ParchmentText>

          <ParchmentText sx={{ mb: 4 }}>
            A Tradição do Grande WAAAGH! é a magia brutona e primitiva dos Pele-Verde,
            viu? É alimentada pela energia psíquica coletiva de Gork (que é brutão mas
            esperto) e Mork (que é esperto mas brutão). Quando os Ork e Goblin se junta
            tudo num bando só, a energia do WAAAGH! vai crescendo, crescendo, até que
            os Xamã consegue pegar ela e transformar ela numa puta duma magia! É porrada
            psíquica que esmaga quengo, joga inimigo pros lado que nem boneca de pano,
            e deixa os cabra ainda mais casca grossa! WAAAGH!
          </ParchmentText>

          <PowerListTitle>Feitiços da Tradição do Grande WAAAGH!</PowerListTitle>

          {spells.map((spell, index) => (
            <SpellCard
              key={index}
              id={spell.name.toLowerCase().replace(/\s+/g, "-")}
              name={spell.name}
              school="Tradição do Grande WAAAGH!"
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
          onClick={() => navigate("/magic/greenskin-lores")}
        >
          Voltar para Tradições Peles-Verdes
        </StyledNavigationButton>
      </NavigationSection>
    </PageContainer>
  );
}

