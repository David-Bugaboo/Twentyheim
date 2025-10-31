import HeaderH2 from "./HeaderH2";
import MobileText from "./MobileText";
import GenericTable from "./GenericTable";

const wrathOfGodsData = [
  {
    roll: "1-2",
    result:
      "Deus Morto: O sacerdote consegue conjurar a magia, mas recebe um marcador de Atordoamento.",
  },
  {
    roll: "3-4",
    result:
      "Teste de Fé: O sacerdote é despedido por seu Deus por ser indigno. Ele perde sua próxima ativação e deve fazer um teste de Vontade com CD 12 ou perder sua ativação novamente na próxima rodada.",
  },
  {
    roll: "5-6",
    result:
      "Loucura Divina: O sacerdote fica confuso pelo poder divino. O mesmo deve mover-se em direção da figura inimiga mais próxima e atacar até cair ou a outra figurar cair.",
  },
  {
    roll: "7-8",
    result:
      "Deus Furioso: O sacerdote fica impossibilitado de conjurar magias pelo restante do jogo. Pode ainda se mover e usar habilidades, mas não pode conjurar magia.",
  },
  {
    roll: "9-10",
    result:
      "Terra Sagrada: Um rugido do céu ensurdece o sacerdote por 2 turnos. Durante este tempo, ele não pode usar habilidades que sejam 'ouvidas' por outros.",
  },
  {
    roll: "11-12",
    result:
      "Fulminação Divina: O sacerdote recebe um raio de fogo do céu. Sofre 2 pontos de dano sagrado.",
  },
  {
    roll: "13-14",
    result:
      "O Capricho dos Deuses: Os deuses decidiram que a magia falhou e não há nada que o sacerdote possa fazer.",
  },
  {
    roll: "15-16",
    result:
      "Maldição Menor: O sacerdote perde a vontade de lutar. Sofre uma penalidade de -2 em todas as rolagens de dado pelo restante do jogo.",
  },
  {
    roll: "17-18",
    result:
      "Seu Pecado é Imperdoável!: O sacerdote sofre 3 pontos de dano sagrado e ganha uma ficha de Atordoamento.",
  },
  {
    roll: "19-20",
    result:
      "Interferência Daemônica: A oração do sacerdote é respondida mas não por seu Deus. Role na tabela Maldição de Tzeentch.",
  },
];

const WrathOfGodsTable = () => {
  return (
    <div className="bg-green-900/20 border border-green-500/40 rounded-lg p-4 my-6">
      <HeaderH2 className="text-green-300 mb-4">Ira dos Deuses</HeaderH2>
      <MobileText className="mb-4">
        A Ira dos Deuses é uma tabela menos hostil que a de Maldição de
        Tzeentch, mas ainda pode ser desastrosa. Quando um sacerdote rola um{" "}
        <strong>1</strong> em uma Rolagem de Conjuração, role nesta tabela para
        determinar a consequência:
      </MobileText>
      <GenericTable data={wrathOfGodsData} scrollable={false} />
    </div>
  );
};

export default WrathOfGodsTable;
