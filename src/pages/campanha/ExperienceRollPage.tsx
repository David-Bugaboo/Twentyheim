import PageTitle from "../../components/PageTitle";
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";
import HeaderH1 from "../../components/HeaderH1";
import HeaderH2 from "../../components/HeaderH2";
import HeaderH3 from "../../components/HeaderH3";
import HeaderH4 from "../../components/HeaderH4";
import WarningBox from "../../components/WarningBox";
import GenericTable from "../../components/GenericTable";
import CornerDecoration from "../../components/CornerDecoration";

function ExperienceRollPage() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <CornerDecoration />
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <MobileSection>
            <PageTitle>Experiência e Nível</PageTitle>

            <MobileText>
              Após cada batalha, os membros do bando ganham experiência baseada
              em suas ações e sobrevivência. Esta experiência pode ser usada
              para melhorar suas habilidades e capacidades.
            </MobileText>

            <HeaderH1>Experiência de Heróis</HeaderH1>
            <MobileText>
              Heróis ganham experiência em um ritmo elevado, e tem um potencial
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

            <HeaderH1>Experiência de Campeões</HeaderH1>
            <MobileText>
              Campeões ganham experiência de forma similar aos heróis, mas de
              forma um pouco mais lenta. Eles só podem subir até o nivel 20.
            </MobileText>
            <MobileText>
              • <strong>Sobreviver à batalha:</strong> +40 EXP
              <br />• <strong>Matar um inimigo:</strong> +5 EXP POR INIMIGO
              <br />• <strong>Conjurar magias com sucesso (CD 6+):</strong> +5XP
              POR MAGIA ATÉ UM LIMITE DE 50XP
              <br />•{" "}
              <strong>
                Cada fragmento de pedra-bruxa capturada pelo campeão ou seu
                bando:
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
                  Resultado: "O rapaz tem talento!",
                },
              ]}
              scrollable={false}
            />

            <HeaderH2>Aumento de Atributo</HeaderH2>
            <MobileText>
              Aumente seu atributo indicado no valor indicado. Note que cada
              raça tem limites de aumento de atributo que devem ser respeitados.
              Caso uma figura role em um atributo que já tenha chegado ao limite
              racial, rerole o resultado.
            </MobileText>

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
              mesma sequência pós-jogo.
            </MobileText>

            <HeaderH2>Aprender novo Poder</HeaderH2>
            <MobileText>
              Aprenda um novo poder da lista de poderes da figura. O poder é
              aprendido com CD 7.
            </MobileText>

            <HeaderH2>Melhorar CD de Poder</HeaderH2>
            <MobileText>
              Diminua o CD de um dos poderes aprendidos pela figura. O
              conjurador não pode melhorar o CD de um poder que aprendeu nessa
              mesma sequência pós-jogo.
            </MobileText>

            <HeaderH2>O Rapaz tem Talento!</HeaderH2>
            <MobileText>
              O soldado aprende uma Maestria de Combate! Embora não tenham
              rolagem de ativação, custos ou gasto de vida, eles só podem ser
              usados uma vez por jogo.
            </MobileText>

            <HeaderH2>Tabela de Maestrias de Combate</HeaderH2>
            <GenericTable
              data={[
                {
                  Maestria: "Maestria da Fúria",
                  Efeito: "+3 Ímpeto para um ataque",
                  "Quando Declarar":
                    "Antes das rolagens serem feitas serem feitas em uma luta",
                },
                {
                  Maestria: "Maestria de Ripostar",
                  Efeito: "+1 Ímpeto para um ataque",
                  "Quando Declarar":
                    "Depois das rolagens serem feitas em uma luta.",
                },
                {
                  Maestria: "Maestria do Carrasco",
                  Efeito:
                    "+2 Dano para qualquer ataque corpo a corpo que causou pelo menos 1 ponto de dano",
                  "Quando Declarar":
                    "Depois do dano de um ataque corpo a corpo ser calculado",
                },
                {
                  Maestria: "Maestria do Sentinela",
                  Efeito: "+3 Precisão para um ataque",
                  "Quando Declarar":
                    "Antes das rolagens de ataque a distância serem feitas",
                },
                {
                  Maestria: "Maestria do Caçador",
                  Efeito: "+1 Precisão para um ataque",
                  "Quando Declarar":
                    "Depois das rolagens de ataque a distância serem feitas",
                },
                {
                  Maestria: "Maestria do Lanceiro",
                  Efeito: "+3 Armadura para um ataque",
                  "Quando Declarar":
                    "Antes das rolagens de ataque corpo a corpo serem feitas",
                },
                {
                  Maestria: "Maestria da Esquiva",
                  Efeito: "+1 Armadura para um ataque",
                  "Quando Declarar":
                    "Depois das rolagens de ataque corpo a corpo serem feitas",
                },
                {
                  Maestria: "Maestria da Coragem",
                  Efeito: "+4 Vontade para uma rolagem de Vontade",
                  "Quando Declarar": "Antes da rolagem de Vontade ser feita",
                },
                {
                  Maestria: "Maestria da Frieza",
                  Efeito: "+2 Vontade para uma rolagem de Vontade",
                  "Quando Declarar": "Depois da rolagem de Vontade ser feita",
                },
                {
                  Maestria: "Maestria do Batedor",
                  Efeito: "+4 Movimento pelo resto do turno",
                  "Quando Declarar": "Na ativação do soldado.",
                },
                {
                  Maestria: "Maestria do Tenente",
                  Efeito:
                    "Pode ativar até 3 soldados a 8cm junto a si, como um Héroi ou Campeão. Pode declarar ativações em grupo.",
                  "Quando Declarar": "Na ativação do soldado.",
                },
              ]}
              scrollable={false}
            />
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default ExperienceRollPage;
