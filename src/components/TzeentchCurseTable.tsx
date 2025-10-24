import HeaderH2 from "./HeaderH2";
import MobileText from "./MobileText";
import GenericTable from "./GenericTable";

const curseResults = [
  {
    roll: "1-2",
    result:
      "Olhos de Bruxa: As pupilas do Conjurador ficam vermelho vivo, e são extremamente sensíveis à luz. Sua linha de visão é reduzida para um máximo de 30cm e você tem -3 Vontade contra magias da **Tradição da Luz** ou **Orações de Sigmar.**",
  },
  {
    roll: "3-4",
    result: "Loucura: O conjurador sofre -4 em rolagens de conjuração.",
  },
  {
    roll: "5-6",
    result: "Magia Selvagem: Toda figura a até 30cm sofre um ataque mágico +0.",
  },
  {
    roll: "7-8",
    result:
      "Visão Herética: Um Príncipe Daemônico mostra ao conjurador uma visão do reino do caos. Sua Vontade é reduzida para -3 pelo resto deste jogo.",
  },
  {
    roll: "9-10",
    result:
      "Possessão Daemônica: O conjurador é possuído por uma entidade Daemônica. O Conjurador age como uma figura descontrolada pelo resto do jogo.",
  },
  {
    roll: "11-12",
    result:
      "O Olho Definhante: O conjurador sofre 5 de dano e perde 5 de vigor máximo até o fim do jogo.",
  },
  {
    roll: "13-14",
    result:
      "Voz Fragmentada: O conjurador não pode conjurar magias pelo resto do jogo.",
  },
  {
    roll: "15-16",
    result:
      "Familiar Covarde: Um Diabrete é colocado em combate com o Conjurador.",
  },
  {
    roll: "17-18",
    result: "Ataque Aetérico: O conjurador sofre um ataque mágico +12.",
  },
  {
    roll: "19-20",
    result:
      "Incursão Daemônica: Um daemônio maior é colocado em combate com o conjurador. Este Daemônio ganha o traço Imune a Controle.",
  },
];

export default function TzeentchCurseTable() {
  return (
    <div className="mt-6">
      <HeaderH2 className="text-green-300 mb-4">
        A Maldição de Tzeentch
      </HeaderH2>

      <MobileText className="mb-4">
        Além disso, rolar um <strong>1</strong> em uma Rolagem de Conjuração de
        uma magia destas tradições desencadeia a{" "}
        <strong>Maldição de Tzeentch</strong>. O conjurador deve rolar na tabela
        abaixo para determinar o resultado catastrófico de sua falha.
      </MobileText>

      <GenericTable data={curseResults} scrollable={false} />
    </div>
  );
}
