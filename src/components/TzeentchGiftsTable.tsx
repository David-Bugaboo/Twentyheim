import HeaderH2 from "./HeaderH2";
import MobileText from "./MobileText";
import GenericTable from "./GenericTable";

const giftResults = [
  {
    roll: "1",
    result:
      "Corpo de Obsidiana. A carne da figura se transforma em obsidiana preta. Ela ganha +2 Armadura, mas seu Vigor é reduzido pela metade, arredondando para cima.",
  },
  {
    roll: "2",
    result:
      "Alma Sombria. Esta figura tem sua alma substituída por um daemônio menor e ganha o traço Daemônio mas mantém quaisquer espaços de itens que possuía anteriormente.",
  },
  {
    roll: "3",
    result:
      "Pele de Pergaminho. Esta figura sangra profusamente dos menores ferimentos. Ela conta como Ferida sempre que estiver abaixo do Vigor completo.",
  },
  {
    roll: "4",
    result:
      "Definhar. Esta figura teve a maior parte de sua carne deteriorada como se tivesse envelhecido em um minuto. A figura sofre um -2 Vigor permanente.",
  },
  {
    roll: "5",
    result:
      "Destino Ominoso. Sempre que esta figura rolar na Tabela de Sobrevivência, ela deve rolar dois dados e pegar o resultado menor.",
  },
  {
    roll: "6",
    result:
      "Aparência Cadavérica. Esta figura ganha o traço Morto-Vivo, mas mantém quaisquer espaços de itens que possui atualmente.",
  },
  {
    roll: "7",
    result:
      "Carne de Cera. A carne desta figura se transforma em cera de vela pútrida. Esta figura recebe um -1 Armadura permanente.",
  },
  {
    roll: "8",
    result:
      "Ossos de Obsidiana. O esqueleto da figura se transforma em obsidiana vítrea. Sempre que esta figura rolar 'Gravemente Ferido' na Tabela de Sobrevivência, ela sofre um -1 Vigor permanente.",
  },
  {
    roll: "9",
    result:
      "Alergia. Esta figura é alérgica ao sangue de outras criaturas. Se ela danificar outra figura em combate corpo a corpo, ela é envenenada.",
  },
  {
    roll: "10",
    result:
      "Alma Destrancada. Se esta figura rolar um '1' natural em qualquer rolagem durante o jogo, ela é possuída por um Daemônio e conta como uma criatura descontrolada. Isto dura pelo resto do turno no qual o '1' foi rolado e todo o próximo turno. Depois disso, a insanidade passa, e a possessão termina e a figura retorna à sua aliança normal.",
  },
  {
    roll: "11",
    result: "Pernas Inchadas. Esta figura sofre dano dobrado de quedas.",
  },
  {
    roll: "12",
    result:
      "Visão Atormentada. Esta figura sofre -1 em todas as Rolagens de Vontade para resistir ou superar magias.",
  },
  {
    roll: "13",
    result:
      "Alma Volátil. Esta figura é permanentemente possuída por um Daemônio de Khorne ansioso pela matança. Se o jogador controlador rolar um '1' natural em uma Rolagem de Iniciativa, o demônio ruge de raiva, e todas as figuras a até 5cm, incluindo o conjurador, imediatamente sofrem um ataque de tiro mágico +1.",
  },
  {
    roll: "14",
    result:
      "Nervos Estilhaçados. Se esta figura sofrer 5 ou mais pontos de dano de uma única fonte, ela sofre -1 Ímpeto e -1 Dano pelo resto do jogo. Esta penalidade só pode ser sofrida uma vez por jogo.",
  },
  {
    roll: "15",
    result:
      "Arauto de Nurgle. Esta figura se transforma em meio-humano, meio-mosca. Ela sofre -1 Agilidade, -1 Ímpeto, -1 Armadura e -2 Vigor, mas se torna imune a dano de queda.",
  },
  {
    roll: "16",
    result:
      "Dádiva de Nurgle. Esta figura se torna extremamente gorda. Ela sofre -2 Agilidade mas ganha +1 Vigor.",
  },
  {
    roll: "17",
    result:
      "Pele de Vidro. A figura não tem pigmento na pele, então sua pele é completamente branca, e seus olhos são rosa. Esta figura tem uma linha de visão máxima de 45cm.",
  },
  {
    roll: "18",
    result:
      "Órgãos Externos. Os pulmões desta figura estão do lado de fora, aumentando a probabilidade de um golpe causar dano crítico. Se seu oponente rolar um '19' natural em combate corpo a corpo ou em um ataque de Tiro, trate isto como um '20', causando um acerto crítico.",
  },
  {
    roll: "19",
    result:
      "Sangue Ralo. Esta figura tem reações violentas ao veneno. Sempre que sofrer dano de um ataque envenenado, ela imediatamente sofre 3 pontos de dano adicionais.",
  },
  {
    roll: "20",
    result:
      "Horror Sem Face. O rosto desta figura é completamente liso e desprovido de características, ainda assim todos os seus sentidos permanecem intactos. Ela sofre -3 Vontade. Apenas figuras a até 3cm dela podem ativar durante as Fases de Herói ou Campeão.",
  },
];

export default function TzeentchGiftsTable() {
  return (
    <div className="mt-6">
      <HeaderH2 className="text-greeb-400 mb-4">Dádivas de Tzeentch</HeaderH2>

      <MobileText className="mb-4">
        Pior que estes efeitos é o fato de que o poder descontrolado do caos
        distorce a carne de seu usuário. Quando a Maldição de Tzeentch é
        desencadeada, role também na tabela de Dádivas de Tzeentch abaixo:
      </MobileText>

      <GenericTable data={giftResults} scrollable={false} />
    </div>
  );
}
