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

            

            <HeaderH1>Subir de Nível</HeaderH1>
            <MobileText>
              Figuras sobem de nível a medida que acumulam experiência através de batalhas, ou até mesmo ao serem contratados se forem Hérois. Líderes ganham um novo nível a cada 2 pontos de experiência que ganham. a cada 5 níveis ganhos, o valor de experiência necessário para subir de nível aumenta em 1. Por exemplo, uma figura subindo do nível 5 para o 6 precisaria de 3 de experiência para subir de nível ao invés de 2. do nível 10 para o 11 precisaria de 4 ao invés de 3 e assim sucessivamente. Líderes e Hérois podem subir até o nivel 20.
            </MobileText>
<MobileText>
              Soldados sobem de nível a cada 1 de experiência ganha. A cada nível ganho, a quantidade de experiência necessária para subir de nível aumenta em 1. Um soldado precisaria de 3 de experiência para subir do nível 2 para o 3, 4 de experiência para subir do nível 3 para o 4 e assim sucessivamente. Um soldado pode subir até o nível 4.
            </MobileText>

<MobileText>
              Quando uma figura sobe de nível, role em uma das tabelas de Avanço, a depender se a figura for um Líder, Héroi ou Soldado.
</MobileText>

            <HeaderH2>Tabela de Avanço de Heróis e Campeões</HeaderH2>
            <MobileText>Role 1d20 e consulte a tabela abaixo:</MobileText>
            <GenericTable
              data={[
                {
                  "Rolagem de Dado": "1-8",
                  Resultado:
                    "Nova Habilidade",
                },
                { "Rolagem de Dado": "9-10", Resultado: "+1 Ímpeto" },
                { "Rolagem de Dado": "11-12", Resultado: "+1 Precisão" },
                { "Rolagem de Dado": "13-14", Resultado: "+2 de Vida" },
                { "Rolagem de Dado": "15-16", Resultado: "+2 de Movimento" },
                { "Rolagem de Dado": "17-18", Resultado: "+1 Vontade" },
                {
                  "Rolagem de Dado": "19-20",
                  Resultado:
                    "Nova Habilidade",
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
              racial, re-role o resultado.
            </MobileText>

            <HeaderH3>Limites Raciais de Atributos</HeaderH3>
            <GenericTable data={raceLimits} scrollable={true} />

            <HeaderH2>Aprender nova Magia</HeaderH2>
            <MobileText>
              Esse avanço pode ser ganho no lugar do avanço "Ganhar Habilidade" para figuras capazes de conjurar magias ou orações. Adicione uma nova magia da tradição indicada na ficha da figura ou da tradição Magia Menor.
            </MobileText>

            <HeaderH2>Aprender nova Habilidade</HeaderH2>
            <MobileText>
              Aprenda uma nova habilidade dentre as listas de habilidades da
              figura. Adicione a habilidade na ficha da figura.
            </MobileText>

            
            <HeaderH2>O Rapaz tem Talento!</HeaderH2>
            <MobileText>
              O soldado se torna um herói! Ele continua usando sua mesma ficha e
              continua sendo o que era antes (um Barba Curta continua sendo um
              Barba Curta) e mantém seu nível, mas agora pode fazer todas as atividades que um
              herói pode e ganha experiência e sobe de nível como herói. Escolha duas listas de
              habilidades entre as que heróis do bando têm acesso e ganhe acesso a elas.
            </MobileText>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default ExperienceRollPage;
