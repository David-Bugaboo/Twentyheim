import PageTitle from "../../components/PageTitle";
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";
import HeaderH2 from "../../components/HeaderH2";
import QuickNavigation from "../../components/QuickNavigation";
// import GenericTable from "../../components/GenericTable";
import UnitCard from "../../components/UnitCard";
import daemonsData from "./data/daemons.data.json";
import LoreSpellCard from "../../components/LoreSpellCard";

function DarkGodsInvocationPage() {
  const navigationSections = [
    { id: "intro", title: "Invocação dos Deuses Sombrios", level: 0 },
    {
      id: "chaos-gods",
      title: "Magisters do Caos e os Quatro Grandes Deuses",
      level: 1,
    },
    {
      id: "summoning-daemons",
      title: "Venha, Daemônio, Pois Te Invoco!",
      level: 1,
    },
    { id: "daemonic-bridge", title: "Incantação da Ponte Daemônica", level: 1 },
    { id: "daemon-profiles", title: "Daemônios do Caos", level: 1 },
    { id: "special-rules", title: "Regras Especiais", level: 1 },
    { id: "daemonette", title: "Daemonette", level: 2 },
    { id: "pink-horror", title: "Horror Rosa", level: 2 },
    { id: "plaguebearer", title: "Portador de Peste", level: 2 },
    {
      id: "god-specific-spells",
      title: "Feitiços Específicos dos Deuses",
      level: 1,
    },
    { id: "seduction-of-slaanesh", title: "Sedução de Slaanesh", level: 2 },
    { id: "fires-of-tzeentch", title: "Chamas de Tzeentch", level: 2 },
    {
      id: "father-nurgle-pestilence",
      title: "Pestilência do Pai Nurgle",
      level: 2,
    },
  ];

  // Mantido apenas como referência anterior; não é mais usado.
  /* const daemonProfilesTable = [
    {
      Perfil: "Daemonette",
      Agilidade: "4",
      Ímpeto: "6",
      Precisão: "5",
      Força: "4",
      Armadura: "3",
      Vigor: "1",
      Vontade: "6",
      Ataques: "3",
      Liderança: "10",
    },
    {
      Perfil: "Portador de Peste",
      Agilidade: "4",
      Ímpeto: "5",
      Precisão: "5",
      Força: "4",
      Armadura: "3",
      Vigor: "1",
      Vontade: "6",
      Ataques: "2",
      Liderança: "10",
    },
    {
      Perfil: "Horror Rosa",
      Agilidade: "4",
      Ímpeto: "6",
      Precisão: "5",
      Força: "4",
      Armadura: "3",
      Vigor: "1",
      Vontade: "6",
      Ataques: "3",
      Liderança: "10",
    },
    {
      Perfil: "Horror Azul",
      Agilidade: "4",
      Ímpeto: "3",
      Precisão: "3",
      Força: "3",
      Armadura: "3",
      Vigor: "1",
      Vontade: "7",
      Ataques: "1",
      Liderança: "10",
    },
  ]; */

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <QuickNavigation sections={navigationSections} />
          <MobileSection>
            <div id="intro">
              <PageTitle>Invocações dos Deuses Sombrios</PageTitle>
            </div>

            <div id="chaos-gods" className="mt-8">
              <HeaderH2>
                Ritualistas do Caos e os Quatro Grandes Deuses
              </HeaderH2>
              <MobileText variant="quote" className="mb-6 italic">
                Agrupem-se ao redor de mim, filhos da noite, e ouçam a sabedoria
                de Slaanesh, a audaciosa princesa do Caos, e o Senhor do Prazer
                na Dor. Sua atenção pode ser atraída por orgias que celebram as
                alegrias da carne; nada é devasso demais para aqueles que buscam
                seu escrutínio divino. Os raros indivíduos que ele favorece
                crescerão fortes de corpo, belos de face e fortes de mente. Mas
                a Princesa do Caos não é a única governante do Reino do Caos.
              </MobileText>

              <MobileText className="mb-4">
                Há Tzeentch, o Senhor da Mudança e deus patrono dos magos, pois
                os ventos da magia estão sempre em movimento. Ele é o grande
                corruptor, pois se deleita em torcer tanto o espírito quanto o
                corpo dos mortais em novas e fascinantes formas. Seus seguidores
                são feiticeiros e manipuladores, conspiradores sem igual,
                moldando o mundo sob a orientação de seu mestre.
              </MobileText>

              <MobileText className="mb-4">
                Tzeentch está sempre em guerra com Nurgle, o Senhor do
                Apodrecimento. Nurgle envia pragas e contágios ao mundo para
                matar os súditos das manipulações de Tzeentch para que o mundo
                possa crescer novamente. Ele envia suas criações através de
                humanos e Skaven, pois não há nada que ele aprecie mais do que o
                longo crepúsculo da vida, a chama da doença persistindo nas
                brasas moribundas dos seres sencientes. Nurgle é o deus da
                estagnação e deterioração, enquanto Tzeentch desfruta da
                centelha da vida e das mudanças súbitas que ela traz ao mundo.
              </MobileText>

              <MobileText className="mb-6">
                Então há Khorne, o deus raivoso do derramamento de sangue e do
                massacre. Cego pela sua ira como está, ele despreza os caminhos
                feiticeiros e não é de nossa preocupação.
              </MobileText>
            </div>

            <div id="summoning-daemons" className="mt-8">
              <HeaderH2>Venha, Daemônio!</HeaderH2>

              <MobileText className="mb-4">
                Trazer Daemônios do Reino do Caos para o campo de batalha requer
                tanto encantamentos mágicos quanto sacrifício adequado de itens
                preciosos, especialmente sangue. No jogo isso é representado por
                um Feitiço invocado pelo Ritualista para realmente invocar o
                Daemônio, e um custo de contratação como o dos mercenários para
                representar o sacrifício.
              </MobileText>

              <MobileText className="mb-4">
                Conjuradores dos Rituais do Caos têm uma teia de contatos
                sombrios com outros de sua espécie. O feitiço de invocação é
                assumido como disponível para todos os Conjuradores dos Rituais
                do Caos através de seus contatos se forem loucos o suficiente
                para usá-lo. Ele não precisa ser aprendido através de um avanço
                como outros feitiços.
              </MobileText>
            </div>

            <div id="daemonic-bridge" className="mt-8">
              <HeaderH2>Ritual da Ponte Daemônica</HeaderH2>
              <div className="mt-4 mb-6">
                <LoreSpellCard
                  name="Ritual da Ponte Daemônica"
                  castingNumber={14}
                  keywords={["Área de Efeito(Zona Pequena)"]}
                  effect="O Conjurador posiciona a Área de Efeito em qualquer ponto em contato de base com ele mesmo. Caso o Conjurador saiba alguns dos Rituais dos Deuses Sombrios, o daemônio correspondente surge dentro da área de efeito, ficando em jogo uma quantidade de turnos igual a por quanto o teste de conjuração superou a classe de dificuldade da magia. O daemônio é um membro temporário do bando e segue todas as regras normais, inclusive podendo ser ativado com a regra líder."
                />
              </div>
            </div>

            <div id="god-specific-spells" className="mt-8">
              <HeaderH2>
                Rituais dos Deuses do Caos
              </HeaderH2>
              <MobileText className="mb-4">
                Quando um conjurador da tradição Rituais do Caos aprender as 6
                magias da sua tradição, caso ele role o avanço "Aprender
                Habilidade", ele pode ao invés disso aprender um dos feitiços
                dos Deuses do Caos, e apenas um. Assume-se que o conjurador
                esteve buscando a atenção de seu Deus o tempo todo, mas para
                facilitar o jogo você não precisa decidir sobre aliança a um
                Deus específico até ter a chance de aprender o feitiço - a menos
                que queira dedicar seu bando a um dos deuses desde o início, é
                claro.
              </MobileText>

              <MobileText className="mb-6">
                Pode valer a pena mencionar que a capacidade de lançar esses
                feitiços não é de forma alguma a verdadeira Marca do Caos.
                Arqui-Hereges e Campeões do Caos Verdadeiros são seres muito
                mais poderosos do que um mero Magistrado habitando em Mordheim.
              </MobileText>
            </div>

            <div id="seduction-of-slaanesh" className="mt-8">
              <HeaderH2>Os Rituais</HeaderH2>
              <div className="mt-4 mb-6">
                <LoreSpellCard
                  name="Sedução de Slaanesh"
                  castingNumber={12}
                  keywords={["Alcance(25cm)", "Psicológica"]}
                  effect="A figura alvo rola um teste de Vontade contra o teste de conjuração da magia. Se o alvo falhar, ele age imediatamente após o conjurador, e tem sua ações controladas por ele. Quando sua ativação terminar, ganha dois marcadores de Atordoamento imediatamente."
                  colorScheme="purple"
                />
              </div>
            </div>

            <div id="fires-of-tzeentch" className="mt-8">
              <div className="mb-6">
                <LoreSpellCard
                  name="Raio da Perdição"
                  castingNumber={12}
                  keywords={[
                    "Alcance(30cm)",
                    "Míssil Mágico(Mágico Flamejante)(+6)",
                  ]}
                  effect="Ataque a figura Alvo com o míssil mágico. O Míssil ignora quaisquer bônus de armaduras equipadas pelo alvo. Um alvo reduzido a zero de vida por essa magia rola na tabela Dádivas de Tzeentch e ganha aquela mutação permanentemente. "
                  colorScheme="blue"
                />
              </div>
            </div>

            <div id="father-nurgle-pestilence" className="mt-8">
              <div className="mb-6">
                <LoreSpellCard
                  name="Pestilência do Pai Nurgle"
                  castingNumber={12}
                  keywords={["Área de Efeito(Zona Pequena)"]}
                  effect="Centralize a Área de Efeito no Conjurador e mova-a junto com ele. Qualquer modelo inimigo dentro dessa área tem -4 em Ímpeto, -4 em Precisão e -2 em testes de conjuração. Role um dado para cada figura reduzida a 0 de vida dentro da área de efeito no final do jogo. Em uma rolagem de 15+, aquela figura contrai a Necrose de Nurgle."
                  colorScheme="green"
                />
              </div>
            </div>

            <div id="daemon-profiles" className="mt-8">
              <HeaderH2>Daemônios do Caos</HeaderH2>
              <MobileText className="mb-4">
                Embora nenhum Daemônio dê qualquer valor ao ouro brilhante, o
                dinheiro é gasto na aquisição de velas feitas de cera misturada
                com sangue, giz feito de chifres de Homem-Fera em pó e materiais
                similares necessários para o desenho adequado do círculo de
                invocação. Daemônios também devem ser aplacados com sacrifício,
                que pode ser comprado com dinheiro mundano. Não há manutenção;
                Daemônios devem ser invocados para cada batalha separadamente.
              </MobileText>

              <MobileText className="mb-4">
                <strong>Pagamento:</strong> Os materiais de invocação custam 30
                Coroas e são um item comum para bandos Culto dos Possuídos,
                Filhos de Hashut e Saqueadores Homem-Fera. Os materiais são
                destruídos quando o Daemônio aparece e são suficientes apenas
                para uma invocação. Os materiais necessários para a invocação
                não são gastos se a magia de invocação falhar.
              </MobileText>

              <MobileText className="mb-4">
                <strong>Controle:</strong> Qualquer conjurador só tem força de
                vontade suficiente para invocar um Daemônio por batalha.
              </MobileText>

              <MobileText className="mb-4">
                <strong>Qualidade:</strong> Ter um conjurador capaz de conjurar
                Daemônios aumenta a qualidade do bando em 30 pontos.
              </MobileText>

              <MobileText className="mb-6">
                Note que a capacidade de invocar um - ou seja, a posse dos
                materiais de invocação e ter uma das magias de invocação
                demoniaca (exceto o Ritual da Ponte Demoniaca, claro) - é
                suficiente, independentemente de o feitiço ser sequer conjurado.
              </MobileText>

              <MobileText className="mb-6">
                Daemônios são seres de magia pura, trazidos e vinculados ao
                mundo material por feitiços, sacrifício ou os extremos da emoção
                humana. A menos que sejam nutridos de alguma forma, eles só
                podem ficar por um tempo, pois manter uma forma material requer
                luta constante do Daemônio. Diz-se que há tantos daemônios
                diferentes quanto gotas de água no Mar do Caos, e semelhantes às
                gotas os Daemônios estão constantemente se fundindo e se
                dividindo, formando um redemoinho de seres semi-sencientes no
                Reino do Caos.
              </MobileText>
              <div className="space-y-6"></div>
            </div>

            <div id="daemonette" className="mt-8">
              <HeaderH2>Daemonette, Daemônio Menor de Slaanesh</HeaderH2>
              <MobileText className="mb-4">
                Daemonettes podem ser invocadas por um feitiço de Ritual da
                Ponte Daemônica, caso o conjurador saiba a magia Sedução de
                Slaneesh.
              </MobileText>
              {(() => {
                const d = (daemonsData as any[]).find(
                  (x) => x.id === "daemonnete"
                );
                if (!d) return null;
                return (
                  <div className="bg-purple-900/20 border border-purple-500/40 rounded-lg p-2">
                    <UnitCard
                      id={d.id}
                      name={d.name}
                      role={d.role}
                      stats={d.stats}
                      abilities={d.abilities}
                    />
                  </div>
                );
              })()}
            </div>

            <div id="pink-horror" className="mt-8">
              <HeaderH2>Horror Rosa, Daemônio Menor de Tzeentch</HeaderH2>
              <MobileText className="mb-4">
                Horrores podem ser invocados por um feitiço de Ritual da Ponte
                Daemônica, caso o conjurador saiba a magia Raio da Perdição.
              </MobileText>
              {(() => {
                const d = (daemonsData as any[]).find(
                  (x) => x.id === "pink-horror"
                );
                if (!d) return null;
                return (
                  <div className="bg-blue-900/20 border border-blue-500/40 rounded-lg p-2">
                    <UnitCard
                      id={d.id}
                      name={d.name}
                      role={d.role}
                      stats={d.stats}
                      abilities={d.abilities}
                    />
                  </div>
                );
              })()}
              {(() => {
                const d = (daemonsData as any[]).find(
                  (x) => x.id === "blue-horror"
                );
                if (!d) return null;
                return (
                  <div className="bg-blue-900/20 border border-blue-500/40 rounded-lg p-2">
                    <UnitCard
                      id={d.id}
                      name={d.name}
                      role={d.role}
                      stats={d.stats}
                      abilities={d.abilities}
                    />
                  </div>
                );
              })()}
              {(() => {
                const d = (daemonsData as any[]).find(
                  (x) => x.id === "brimstone-horror"
                );
                if (!d) return null;
                return (
                  <div className="bg-blue-900/20 border border-blue-500/40 rounded-lg p-2">
                    <UnitCard
                      id={d.id}
                      name={d.name}
                      role={d.role}
                      stats={d.stats}
                      abilities={d.abilities}
                    />
                  </div>
                );
              })()}
            </div>

            <div id="plaguebearer" className="mt-8">
              <HeaderH2>Enfermo, Daemônio Menor de Nurgle</HeaderH2>
              <MobileText className="mb-4">
                Enfermos podem ser invocados por um feitiço de Ritual da Ponte
                Daemônica, caso o conjurador saiba a magia Pestilência do Pai
                Nurgle.
              </MobileText>
              {(() => {
                const d = (daemonsData as any[]).find(
                  (x) => x.id === "plaguebearer"
                );
                if (!d) return null;
                return (
                  <div className="bg-green-900/20 border border-green-500/40 rounded-lg p-2">
                    <UnitCard
                      id={d.id}
                      name={d.name}
                      role={d.role}
                      stats={d.stats}
                      abilities={d.abilities}
                    />
                  </div>
                );
              })()}
            </div>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default DarkGodsInvocationPage;
