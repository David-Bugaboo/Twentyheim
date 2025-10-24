import PageTitle from "../../components/PageTitle";
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";
import HeaderH1 from "../../components/HeaderH1";
import HeaderH2 from "../../components/HeaderH2";
import HeaderH3 from "../../components/HeaderH3";

import WarningBox from "../../components/WarningBox";
import GenericTable from "../../components/GenericTable";


function ExperienceRollPage() {
  const raceLimits = [
    {
      Raça: "Humanos",
      Mov: "16",
      Imp: "6",
      Prec: "6",
      Vont: "9",
      Vida: "24",
    },
    {
      Raça: "Elfo",
      Mov: "20",
      Imp: "7",
      Prec: "7",
      Vont: "10",
      Vida: "22",
    },
    {
      Raça: "Anão",
      Mov: "10",
      Imp: "7",
      Prec: "6",
      Vont: "10",
      Vida: "24",
    },
    {
      Raça: "Ogro",
      Mov: "16",
      Imp: "6",
      Prec: "5",
      Vont: "9",
      Vida: "30",
    },
    {
      Raça: "Nanico",
      Mov: "18",
      Imp: "5",
      Prec: "7",
      Vont: "10",
      Vida: "24",
    },
    {
      Raça: "Possuído",
      Mov: "24",
      Imp: "8",
      Prec: "0",
      Vont: "10",
      Vida: "26",
    },
    {
      Raça: "Vampiro",
      Mov: "24",
      Imp: "8",
      Prec: "6",
      Vont: "10",
      Vida: "26",
    },
    {
      Raça: "Skaven",
      Mov: "24",
      Imp: "6",
      Prec: "6",
      Vont: "7",
      Vida: "20",
    },
    {
      Raça: "Carniçal",
      Mov: "16",
      Imp: "5",
      Prec: "2",
      Vont: "7",
      Vida: "24",
    },
    {
      Raça: "Saurídeo",
      Mov: "16",
      Imp: "6",
      Prec: "0",
      Vont: "10",
      Vida: "24",
    },
    {
      Raça: "Gecko",
      Mov: "24",
      Imp: "5",
      Prec: "6",
      Vont: "8",
      Vida: "24",
    },
    {
      Raça: "Goblin",
      Mov: "16",
      Imp: "5",
      Prec: "6",
      Vont: "7",
      Vida: "18",
    },
    {
      Raça: "Orc",
      Mov: "16",
      Imp: "6",
      Prec: "6",
      Vont: "9",
      Vida: "24",
    },
    {
      Raça: "Black Orc",
      Mov: "16",
      Imp: "7",
      Prec: "6",
      Vont: "9",
      Vida: "24",
    },
    {
      Raça: "Orc",
      Mov: "16",
      Imp: "7",
      Prec: "3",
      Vont: "9",
      Vida: "24",
    },
    {
      Raça: "Centouro de Hashut",
      Mov: "30",
      Imp: "7",
      Prec: "6",
      Vont: "9",
      Vida: "26",
    },
    {
      Raça: "Ungor",
      Mov: "20",
      Imp: "6",
      Prec: "6",
      Vont: "7",
      Vida: "20",
    },
    {
      Raça: "Centigor",
      Mov: "30",
      Imp: "7",
      Prec: "6",
      Vont: "9",
      Vida: "26",
    },
    {
      Raça: "Gors",
      Mov: "30",
      Imp: "7",
      Prec: "6",
      Vont: "9",
      Vida: "26",
    },
    {
      Raça: "Minotaur",
      Mov: "16",
      Imp: "7",
      Prec: "6",
      Vont: "9",
      Vida: "26",
    },
  ];
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <MobileSection>
            <PageTitle>Experiência e Nível</PageTitle>

            <MobileText>
              Após cada batalha, os membros do bando ganham experiência baseada
              em suas ações e sobrevivência. Esta experiência pode ser usada
              para melhorar suas habilidades e capacidades.
            </MobileText>

            <HeaderH1>Experiência de Líderes</HeaderH1>
            <MobileText>
              Líderes ganham experiência em um ritmo elevado, e tem um potencial
              imenso, podendo subir até o nível 40.
            </MobileText>
            <MobileText>
              • <strong>Sobreviver à batalha:</strong> +60 EXP
              <br />• <strong>Matar um inimigo:</strong> +5 EXP POR INIMIGO
              <br />• <strong>Conjurar magias com sucesso:</strong> +10XP POR
              MAGIA ATÉ UM LIMITE DE 50XP
              <br />•{" "}
              <strong>Falhar em conjurar uma magia e receber dano:</strong> +5XP
              POR MAGIA ATÉ UM LIMITE DE 50XP
              <br />•{" "}
              <strong>
                Cada fragmento de pedra-bruxa capturada pelo héroi ou seu bando:
              </strong>{" "}
              +40XP pontos para cada fragmento capturado
              <br />•{" "}
              <strong>
                Criaturas não controladas reduzidas a 0 de vida pelo héroi ou
                soldados ativados junto a ele:
              </strong>{" "}
              +10XP pontos
            </MobileText>

            <HeaderH1>Experiência de Hérois</HeaderH1>
            <MobileText>
              Hérois ganham experiência de forma similar aos líderes, mas de
              forma um pouco mais lenta. Eles só podem subir até o nivel 20.
            </MobileText>
            <MobileText>
              • <strong>Sobreviver à batalha:</strong> +40 EXP
              <br />• <strong>Matar um inimigo:</strong> +5 EXP POR INIMIGO
              <br />• <strong>Conjurar magias com sucesso (CD 6+):</strong> +5XP
              POR MAGIA ATÉ UM LIMITE DE 50XP
              <br />•{" "}
              <strong>
                Cada fragmento de pedra-bruxa capturada pelo héroi ou seu bando:
              </strong>{" "}
              +20XP pontos para cada fragmento capturado
              <br />•{" "}
              <strong>
                Criaturas não controladas reduzidas a 0 de vida pelo héroi ou
                soldados ativados junto a ele:
              </strong>{" "}
              +5XP pontos
              <br />•{" "}
              <strong>
                Héroi ou Bando capturaram o Fragmento de Pedra-Bruxa central:
              </strong>{" "}
              +60XP
            </MobileText>

            <HeaderH1>Experiência de Soldados</HeaderH1>
            <MobileText>
              Soldados ganham experiência mais lentamente, e só podem subir até
              o nivel 10.
            </MobileText>
            <MobileText>
              • <strong>Sobreviver à batalha:</strong> +30 XP
              <br />• <strong>Matar um inimigo:</strong> +5XP por inimigo, +10
              bônus se matar um héroi ou campeão inimigo.
              <br />• <strong>
                Capturar um fragmento de pedra-bruxa:
              </strong>{" "}
              +30XP para cada fragmento capturado
              <br />•{" "}
              <strong>Capturar o fragmento de pedra-bruxa central:</strong>{" "}
              +40XP
            </MobileText>

            <WarningBox title="Limite de Experiência" type="info">
              <MobileText>
                Hérois e Campeões não podem ganhar mais do que 300XP por
                partida. Soldados não podem ganhar mais que 100XP por partida.
              </MobileText>
            </WarningBox>

            <HeaderH1>Subir de Nível</HeaderH1>
            <MobileText>
              Quando uma figura acumula 100 pontos de experiência ela pode subir
              de nível! note que uma figura só pode subir de nível qualquer
              quantidade vezes que sua experiência acumulada permita. Ao
              escolher subir de nível a figura deve rolar na tabela de avanço
              abaixo para determinar o que vai ganhar pelo seu novo nível. As
              experiências nas vielas sinuosas da cidade dos condenados moldam
              seu bando de formas que você não pode prever...
            </MobileText>

            <HeaderH2>Tabela de Avanço de Hérois e Campeões</HeaderH2>
            <MobileText>Role 1d20 e consulte a tabela abaixo:</MobileText>
            <GenericTable
              data={[
                {
                  "Rolagem de Dado": "1-8",
                  Resultado:
                    "Novo Poder, Nova Magia ou Melhorar CD de Poder ou Magia.",
                },
                { "Rolagem de Dado": "9-10", Resultado: "+1 Ímpeto" },
                { "Rolagem de Dado": "11-12", Resultado: "+1 Precisão" },
                { "Rolagem de Dado": "13-14", Resultado: "+2 de Vida" },
                { "Rolagem de Dado": "15-16", Resultado: "+2 de Movimento" },
                { "Rolagem de Dado": "17-18", Resultado: "+1 Vontade" },
                {
                  "Rolagem de Dado": "19-20",
                  Resultado:
                    "Novo Poder, Nova Magia ou Melhorar CD de Poder ou Magia.",
                },
              ]}
              scrollable={false}
            />

            <HeaderH2>Tabela de Avanço de Soldados</HeaderH2>
            <MobileText>Role 1d20 e consulte a tabela abaixo:</MobileText>
            <GenericTable
              data={[
                { "Rolagem de Dado": "1-6", Resultado: "+1 Ímpeto" },
                { "Rolagem de Dado": "7-8", Resultado: "+1 Precisão" },
                { "Rolagem de Dado": "9-12", Resultado: "+2 de Movimento" },
                { "Rolagem de Dado": "13-14", Resultado: "+2 de Vida" },
                { "Rolagem de Dado": "15-16", Resultado: "+1 Vontade" },
                {
                  "Rolagem de Dado": "17-20",
                  Resultado: "O Moleque tem Talento!",
                },
              ]}
              scrollable={false}
            />

            <HeaderH2>Aumento de Atributo</HeaderH2>
            <MobileText>
              Aumente seu atributo indicado no valor indicado. Note que cada
              raça tem limites de aumento de atributo que devem ser respeitados.
              Caso uma figura role em um atributo que já tenha chegado ao limite
              racial, rerole o resultado. Soldados só podem aumentar cada
              atributo uma unica vez.
            </MobileText>

            <HeaderH3>Limites Raciais de Atributos</HeaderH3>
            <GenericTable data={raceLimits} scrollable={true} />

            <HeaderH2>Aprender nova Magia</HeaderH2>
            <MobileText>
              Aprenda uma nova magia das Tradições disponíveis para o
              conjurador. Se for a tradição principal do conjurador apenas
              adicione a magia a ficha do personagem. Caso seja uma tradição
              associada, adicione a magia com CD +4.
            </MobileText>

            <HeaderH2>Melhorar CD de Magia</HeaderH2>
            <MobileText>
              Diminua o CD de uma das magias aprendidas pelo conjurador em 1. O
              conjurador não pode melhorar o CD de uma magia que aprendeu nessa
              mesma Fase de Campanha-jogo.
            </MobileText>

            <HeaderH2>Aprender nova Habilidade</HeaderH2>
            <MobileText>
              Aprenda uma nova habilidade dentre as listas de habilidades da
              figura. O poder é aprendido com CD 7.
            </MobileText>

            <HeaderH2>Melhorar CD de Poder</HeaderH2>
            <MobileText>
              Diminua o CD de uma das habilidades aprendidos pela figura. O
              conjurador não pode melhorar o CD de uma habilidade que aprendeu
              nessa mesma Fase de Campanha-jogo.
            </MobileText>

            <HeaderH2>O Rapaz tem Talento!</HeaderH2>
            <MobileText>
              O soldado se torna um héroi! Ele continua usando sua mesma ficha e
              continua sendo o que era antes (um Barba Curta continua sendo um
              Barba Curta), mas agora pode fazer todas as atividades que um
              héroi pode e ganhar experiência como héroi. Escolha duas listas de
              habilidades entre as que hérois do bando tem acesso e ganhe 1
              poder dentre elas, com Classe de Dificuldade 7.
            </MobileText>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default ExperienceRollPage;
