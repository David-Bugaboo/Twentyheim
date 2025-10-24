import PageTitle from "../../components/PageTitle";
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";
import HeaderH1 from "../../components/HeaderH1";
import GenericTable from "../../components/GenericTable";

function WyrdstoneSellingPage() {
  // Dados para a tabela de vendas de Pedra-Bruxa
  const wyrdstoneSellingData = [
    {
      "Fragmentos Vendidos": "1",
      "1-3 Guerreiros": 45,
      "4-6 Guerreiros": 40,
      "7-9 Guerreiros": 35,
      "10-12 Guerreiros": 30,
      "13-15 Guerreiros": 30,
      "16+ Guerreiros": 25,
    },
    {
      "Fragmentos Vendidos": "2",
      "1-3 Guerreiros": 60,
      "4-6 Guerreiros": 55,
      "7-9 Guerreiros": 50,
      "10-12 Guerreiros": 45,
      "13-15 Guerreiros": 40,
      "16+ Guerreiros": 35,
    },
    {
      "Fragmentos Vendidos": "3",
      "1-3 Guerreiros": 75,
      "4-6 Guerreiros": 70,
      "7-9 Guerreiros": 65,
      "10-12 Guerreiros": 60,
      "13-15 Guerreiros": 55,
      "16+ Guerreiros": 50,
    },
    {
      "Fragmentos Vendidos": "4",
      "1-3 Guerreiros": 90,
      "4-6 Guerreiros": 80,
      "7-9 Guerreiros": 70,
      "10-12 Guerreiros": 65,
      "13-15 Guerreiros": 60,
      "16+ Guerreiros": 55,
    },
    {
      "Fragmentos Vendidos": "5",
      "1-3 Guerreiros": 110,
      "4-6 Guerreiros": 100,
      "7-9 Guerreiros": 90,
      "10-12 Guerreiros": 80,
      "13-15 Guerreiros": 70,
      "16+ Guerreiros": 65,
    },
    {
      "Fragmentos Vendidos": "6",
      "1-3 Guerreiros": 120,
      "4-6 Guerreiros": 110,
      "7-9 Guerreiros": 100,
      "10-12 Guerreiros": 90,
      "13-15 Guerreiros": 80,
      "16+ Guerreiros": 70,
    },
    {
      "Fragmentos Vendidos": "7",
      "1-3 Guerreiros": 145,
      "4-6 Guerreiros": 130,
      "7-9 Guerreiros": 120,
      "10-12 Guerreiros": 110,
      "13-15 Guerreiros": 100,
      "16+ Guerreiros": 90,
    },
    {
      "Fragmentos Vendidos": "8+",
      "1-3 Guerreiros": 155,
      "4-6 Guerreiros": 140,
      "7-9 Guerreiros": 130,
      "10-12 Guerreiros": 120,
      "13-15 Guerreiros": 110,
      "16+ Guerreiros": 100,
    },
  ];

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <MobileSection>
            <PageTitle>Venda de Pedra-Bruxa</PageTitle>

            <MobileText>
              A Pedra-Bruxa é tremendamente valiosa e está em constante demanda
              pelos nobres do Império. Isso significa que encontrar compradores
              para a Pedra-Bruxa do seu bando não é difícil. Você não precisa
              vender toda sua Pedra-Bruxa imediatamente após a batalha – você
              pode querer acumulá-la e vendê-la depois, pois vender Pedra-Bruxa
              em quantidades menores aumentará a demanda e elevará o preço.
              Infelizmente, as demandas de administrar um bando frequentemente
              significam que você terá que vender a maior parte de sua
              Pedra-Bruxa assim que a encontrar.
            </MobileText>

            <HeaderH1>Custos de Manutenção</HeaderH1>
            <MobileText>
              O bando deve gastar uma grande porção de sua renda em necessidades
              básicas como comida, bebida, reparo de armas, novas flechas e
              munições, bem como celebrações! Um líder de bando também é
              esperado para compartilhar qualquer lucro feito vendendo
              Pedra-Bruxa entre seus homens, o que significa que quanto mais
              dinheiro o bando faz com essas vendas, maior é a parte para os
              homens.
            </MobileText>

            <HeaderH1>Tabela de Vendas</HeaderH1>
            <MobileText>
              Quanto mais modelos há no bando, mais custa mantê-lo e maior é o
              nível de qualquer lucro feito que deve ser compartilhado entre os
              homens. O número indicado na tabela a seguir é o lucro em coroas
              de ouro ganho após deduzir os custos de manutenção do bando. O
              lucro é adicionado ao tesouro do bando.
            </MobileText>

            <GenericTable data={wyrdstoneSellingData} scrollable={true} />
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default WyrdstoneSellingPage;
