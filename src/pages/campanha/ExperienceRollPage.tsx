import PageTitle from "../../components/PageTitle";
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";
import HeaderH1 from "../../components/HeaderH1";
import HeaderH2 from "../../components/HeaderH2";
import HeaderH3 from "../../components/HeaderH3";

import GenericTable from "../../components/GenericTable";

function ExperienceRollPage() {
   const raceLimits = [
    {
      Raça: "Humanos",
      Mov: "20",
      Imp: "+5",
      For: "1",
      Prec: "+5",
      Arm: 11,
      Vont: "+8",
      Vida: "24",
    },
    {
      Raça: "Elfo",
      Mov: "20",
      Imp: "+6",
      For: "1",
      Prec: "+6",
      Arm: "11",
      Vont: "+9",
      Vida: "22",
    },
    {
      Raça: "Anão",
      Mov: "10",
      Imp: "6",
      For: "1",
      Arm: "13",
      Prec: "5",
      Vont: "+9",
      Vida: "24",
    },
    {
      Raça: "Ogro",
      Mov: "24",
      Imp: "+6",
      For: "+2",
      Prec: "+4",
      Arm: "14",
      Vont: "+8",
      Vida: "32",
    },
    {
      Raça: "Nanico",
      Mov: "26",
      Imp: "+3",
      For: "0",
      Prec: "+6",
      Arm: "11",
      Vont: "+9",
      Vida: "24",
    },
    {
      Raça: "Possuído",
      Mov: "26",
      Imp: "+8",
      For: "3",
      Prec: "-",
      Arm: "15",
      Vont: "+9",
      Vida: "28",
    },
    {
      Raça: "Vampiro",
      Mov: "30",
      Imp: "+7",
      For: "4",
      Prec: "+5",
      Arm: "15",
      Vont: "+9",
      Vida: "28",
    },
    {
      Raça: "Skaven",
      Mov: "24",
      Imp: "+5",
      For: "1",
      Prec: "+5",
      Arm: "11",
      Vont: "+6",
      Vida: "24",
    },
    {
      Raça: "Carniçal",
      Mov: "24",
      Imp: "+5",
      For: "1",
      Arm: "13",
      Prec: "+1",
      Vont: "+6",
      Vida: "24",
    },
    {
      Raça: "Saurídeo",
      Mov: "20",
      Imp: "+6",
      For: "2",
      Prec: "-",
      Arm: "14",
      Vont: "+9",
      Vida: "24",
    },
    {
      Raça: "Gecko",
      Mov: "30",
      Imp: "+4",
      For: "1",
      Prec: "+5",
      Arm: "11",
      Vont: "+7",
      Vida: "24",
    },
    {
      Raça: "Goblin",
      Mov: "16",
      Imp: "+5",
      For: "1",
      Prec: "+6",
      Arm: "11",
      Vont: "+7",
      Vida: "18",
    },
    {
      Raça: "Orc",
      Mov: "18",
      Imp: "+5",
      For: "1",
      Prec: "+5",
      Arm: "13",
      Vont: "+8",
      Vida: "24",
    },
    {
      Raça: "Black Orc",
      Mov: "18",
      Imp: "+6",
      Prec: "+5",
      Arm: "13",
      Vont: "+9",
      Vida: "24",
    },
    {
      Raça: "Centouro de Hashut",
      Mov: "36",
      Imp: "+7",
      For: "2",
      Prec: "+2",
      Arm: "15",
      Vont: "+8",
      Vida: "28",
    },
    {
      Raça: "Ungor",
      Mov: "32",
      Imp: "+6",
      For: "1",
      Arm: "13",
      Prec: "+5",
      Vont: "+6",
      Vida: "24",
    },
    {
      Raça: "Centigor",
      Mov: "30",
      Imp: "7",
      For: "1",
      Prec: "6",
      Arm: "15",
      Vont: "+8",
      Vida: "28",
    },
    {
      Raça: "Gors",
      Mov: "28",
      Imp: "+6",
      For: "1",
      Prec: "+4",
      Arm: "13",
      Vont: "9",
      Vida: "28",
    },
  ];
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <MobileSection>
            <PageTitle>Experiência e Avanços</PageTitle>

            <MobileText>
              Após cada batalha, os membros do bando ganham experiência baseada
              em suas ações e sobrevivência. Esta experiência pode ser usada
              para melhorar suas habilidades e capacidades. Figuras ganham +1 de
              experiência para cada jogo em que sobrevivem e para cada fragmento
              de Pedra-Bruxa que capturam pessoalmente. Cenários tem recompensas
              de experiência dadas para ações específicas.
            </MobileText>

            <HeaderH1>Bônus de Azarão</HeaderH1>
            <MobileText>
              Quando um bando luta contra um bando inimigo com uma classificação
              maior, cada figura ganha pontos de Experiência extras conforme
              mostrado na tabela abaixo. Quanto maior a classificação do bando
              oponente, mais pontos o azarão ganha.
            </MobileText>

            <GenericTable
              data={[
                {
                  "Diferença de Qualidade": "0-50 pontos",
                  "Bônus de Experiência": "Nenhum",
                },
                {
                  "Diferença de Qualidade": "51-75 pontos",
                  "Bônus de Experiência": "+1 ponto de experiência",
                },
                {
                  "Diferença de Qualidade": "76-100 pontos",
                  "Bônus de Experiência": "+2 pontos de experiência",
                },
                {
                  "Diferença de Qualidade": "101-150 pontos",
                  "Bônus de Experiência": "+3 pontos de experiência",
                },
                {
                  "Diferença de Qualidade": "151-300 pontos",
                  "Bônus de Experiência": "+4 pontos de experiência",
                },
                {
                  "Diferença de Qualidade": "301+ pontos",
                  "Bônus de Experiência": "+5 pontos de experiência",
                },
              ]}
              scrollable={false}
            />

            <HeaderH1>Recalcular a Qualidade do Bando</HeaderH1>
            <MobileText>
              Sempre que uma ou mais figuras ganham experiência,{" "}
              <a href="/rules/warband-quality">
                recalcule a classificação do bando
              </a>
              .
            </MobileText>

            <MobileText>
              <strong>Exemplo:</strong> Se um bando com classificação 500 pontos
              luta contra um bando com 650 pontos, a diferença é de 150 pontos.
              O bando com menor classificação ganha +4 pontos de experiência
              extras para cada figura que participou da batalha.
            </MobileText>

            <HeaderH1>Ganhar um avanço</HeaderH1>
            <MobileText>
              Figuras ganham avanços a medida que acumulam experiência através
              de batalhas, ou até mesmo no ato de serem contratados se forem
              Líderes ou Heróis.
            </MobileText>
            <MobileText>
              Figuras marcam uma caixa de experiência no seu espaço na ficha do
              bando para cada ponto de experiência ganha. Quando marcarem uma
              caixa destacada, ganham um avanço.
            </MobileText>
            <MobileText>
              Quando uma figura ganhar um avanço, role em uma das tabelas de
              Avanço, a depender se a figura for um Líder, Herói ou Soldado.
              Role sempre de forma que todos os jogadores possam testemunhar as
              rolagens.
            </MobileText>

            <HeaderH2>Tabela de Avanço de Heróis e Campeões</HeaderH2>
            <MobileText>Role 1d20 e consulte a tabela abaixo:</MobileText>
            <GenericTable
              data={[
                {
                  "Rolagem de Dado": "1-4",
                  Resultado: "Aprender nova Habilidade, Aprender Nova Magia, Fortalecer Magia",
                },
                {
                  "Rolagem de Dado": "5-8",
                  Resultado: "+1 Força ou +1 de Ímpeto",
                },
                {
                  "Rolagem de Dado": "9-12",
                  Resultado: "+1 Precisão ou +2 Movimento",
                },
                {
                  "Rolagem de Dado": "13-16",
                  Resultado: "+1 Armadura ou +2 de Vida ",
                },
                {
                  "Rolagem de Dado": "17-20",
                  Resultado: "+2 de Vida ou +1 de Vontade",
                },
              ]}
              scrollable={false}
            />

            <HeaderH2>Tabela de Avanço de Soldados</HeaderH2>
            <MobileText>Role 1d20 e consulte a tabela abaixo:</MobileText>
            <GenericTable
              data={[
                {
                  "Rolagem de Dado": "1-4",
                  Resultado: "+1 Força ou +1 de Ímpeto",
                },
                {
                  "Rolagem de Dado": "5-8",
                  Resultado: "+1 Precisão ou +2 Movimento",
                },
                {
                  "Rolagem de Dado": "9-12",
                  Resultado: "+1 Armadura ou +2 de Vida ",
                },
                {
                  "Rolagem de Dado": "13-16",
                  Resultado: "+2 de Vida ou +1 de Vontade",
                },
                {
                  "Rolagem de Dado": "17-20",
                  Resultado: "O Moleque Tem Talento!",
                },
              ]}
              scrollable={false}
            />

            <HeaderH2>Aumento de Atributo</HeaderH2>
            <MobileText>
              Aumente seu atributo indicado no valor indicado. Note que cada
              raça tem limites de aumento de atributo que devem ser respeitados.
              Caso uma figura role em um atributo que já tenha chegado ao limite
              racial, re-role o resultado. Se o jogador rolar um avanço de
              atributo cujo limite racial foi atingido, re-role o avanço.
            </MobileText>

            <HeaderH3>Limites Raciais de Atributos</HeaderH3>
            <GenericTable data={raceLimits} scrollable={true} />

            <HeaderH2>Aprender nova Magia</HeaderH2>
            <MobileText>
              Esse avanço pode ser ganho no lugar do avanço "Aprender nova
              Habilidade" para figuras capazes de conjurar magias ou orações.
              Adicione uma nova magia da tradição indicada na ficha da figura ou
              da tradição Magia Menor.
            </MobileText>

            <HeaderH2>Fortalecer Magia</HeaderH2>
            <MobileText>
              Esse avanço pode ser ganho no lugar do avanço "Aprender nova
              Habilidade" para figuras capazes de conjurar magias ou orações.
              Escolha uma magia que a figura sabe. Aquela magia tem sua classe
              de dificuldade diminuida em 1.
            </MobileText>

            <HeaderH2>Aprender nova Habilidade</HeaderH2>
            <MobileText>
              Aprenda uma nova habilidade dentre as listas de habilidades da
              figura. Adicione a habilidade na ficha da figura.
            </MobileText>

            <HeaderH2>O Moleque Tem Talento!</HeaderH2>
            <MobileText>
              O soldado se torna um herói! Ele continua usando sua mesma ficha e
              continua sendo o que era antes (um Barba Curta continua sendo um
              Barba Curta) e mantém seu nível, mas agora pode fazer todas as
              atividades que um herói pode e ganha experiência e sobe de nível
              como herói. Escolha duas listas de habilidades entre as que heróis
              do bando têm acesso e ganhe acesso a elas.
            </MobileText>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default ExperienceRollPage;
