import PageTitle from "../../components/PageTitle";
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";
import HeaderH1 from "../../components/HeaderH1";
import HeaderH2 from "../../components/HeaderH2";
import HeaderH3 from "../../components/HeaderH3";
import WarningBox from "../../components/WarningBox";
import CornerDecoration from "../../components/CornerDecoration";

function MovementActionsPage() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <CornerDecoration />
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <MobileSection>
            <PageTitle>Ações de Movimento</PageTitle>

            <MobileText>
              A figura pode se mover das seguintes formas durante seu turno:
            </MobileText>

            <WarningBox title="Restrição: Figuras em Combate" type="warning">
              <MobileText>
                <strong>Uma figura em combate não pode se mover</strong> através
                de ações de movimento normais. Figuras em combate só podem se
                mover através de movimentos especiais após a luta (empurrar a
                figura inimiga 3cm e então se mover ou sair de combate, se
                afastando 3cm para longe da figura inimiga) ou através de
                habilidades especiais.
              </MobileText>
            </WarningBox>

            <HeaderH1>Movimento Normal</HeaderH1>
            <MobileText>
              A miniatura pode se mover uma distância de até seu{" "}
              <strong>atributo de M em centímetros</strong>. Durante este
              movimento, ela pode se virar quanto quiser, fazer qualquer tipo de
              curva, e atravessa automaticamente qualquer obstáculo com menos de
              2 cm de altura. Contudo, esse movimento deve ser estritamente{" "}
              <strong>horizontal</strong>. Esse movimento não pode ser usado
              para entrar em contato de base com uma figura inimiga.
            </MobileText>

            <HeaderH1>Escalar</HeaderH1>
            <MobileText>
              Uma miniatura pode escalar superfícies verticais como muros e
              paredes. Para tal, ela se move ao longo de seu comprimento
              vertical da parede ou obstáculo, gastando{" "}
              <strong>2 cm de movimento para cada 1 cm de escalada</strong>. Uma
              figura que termine seu movimento escalando cai no chão ao final do
              movimento, seguindo as regras normais de queda. Esse movimento não
              pode ser usado para entrar em contato de base com uma figura
              inimiga.
            </MobileText>

            <MobileText
              variant="quote"
              className="text-center italic text-lg leading-relaxed mt-4"
            >
              "Gregor agarrou as pedras irregulares da torre em ruínas,
              puxando-se para cima com força bruta. Gastou 6 cm de movimento
              para escalar apenas 3 cm de muro — cada centímetro vertical uma
              batalha contra a gravidade. No topo, vislumbrou o arqueiro
              inimigo. Sem pensar, lançou-se sobre ele numa carga desesperada. A
              luta foi breve, violenta. Depois, Gregor caiu, 6 cm direto para o
              chão pedregoso. A queda foi dolorida, mas valeu a pena."
            </MobileText>

            <HeaderH1>Pular</HeaderH1>
            <MobileText>
              Uma figura pode declarar um pulo. Ela pode se mover uma distância
              horizontal, vertical ou ambos de até <strong>10 cm</strong>, não
              sendo afetado por queda ou altura durante esse movimento, mas deve
              ter se movido normalmente a distância que deseja pular antes de
              declarar um pulo. Se uma criatura termina seu pulo no ar, ela cai
              ao final do movimento, seguindo regras de queda. A distância
              percorrida no pulo não conta contra o movimento de uma criatura.
              Se não percorrer nenhuma distância, a figura ainda pode pular 3cm.
              Esse movimento não pode ser usado para entrar em contato de base
              com uma figura inimiga.
            </MobileText>

            <MobileText
              variant="quote"
              className="text-center italic text-lg leading-relaxed mt-4"
            >
              "Klaus correu pelos escombros, ganhando impulso. Oito centímetros
              de corrida furiosa antes de saltar sobre o abismo de 8 cm entre os
              edifícios. Por um momento, pairou no ar, suspenso entre vida e
              morte. Aterrizou do outro lado com um baque, rolando para absorver
              o impacto. Atrás dele, seus perseguidores hesitaram na beira do
              prédio anterior."
            </MobileText>

            <HeaderH1>Queda</HeaderH1>
            <MobileText>
              Uma figura pode cair até{" "}
              <strong>8 cm sem tomar nenhum tipo de dano</strong>. Se cair mais
              que isso, tome de dano igual a{" "}
              <strong>metade da distância caída</strong>.
            </MobileText>

            <MobileText
              variant="quote"
              className="text-center italic text-lg leading-relaxed mt-4"
            >
              "O besteiro cambaleou na beirada do telhado e caiu. Doze
              centímetros de queda livre. Bateu no chão com um estalo horrível —
              6 pontos de dano (12/2). Seus ossos quebraram como gravetos secos.
              Mas a adrenalina o manteve lutando."
            </MobileText>

            <HeaderH1>Terreno Acidentado</HeaderH1>
            <MobileText>
              Criatura gasta <strong>2 cm de movimento para cada 1 cm</strong>{" "}
              que se move em terreno acidentado. Criaturas montadas além disso
              rolam na tabela de "Opa garoto!".
            </MobileText>

            <MobileText
              variant="quote"
              className="text-center italic text-lg leading-relaxed mt-4"
            >
              "O soldado mergulhou nos escombros — pedras soltas, vigas
              quebradas, corpos em decomposição. Cada passo era uma armadilha.
              Seu movimento de 16 cm minguou para míseros 8 cm através da ruína.
              Atrás dele, o cavaleiro montado tentou seguir, mas seu cavalo
              tropeçou nas pedras irregulares."
            </MobileText>

            <HeaderH1>Natação</HeaderH1>

            <HeaderH2>Água Rasa</HeaderH2>
            <MobileText>
              Terreno de Água rasa apenas conta como terreno acidentado, e não
              oferece nenhuma outra penalidade além disso.
            </MobileText>

            <HeaderH2>Água Profunda</HeaderH2>
            <MobileText>
              Água profunda é muito complexa de navegar e figuras que queiram
              cruzá-la devem nadar. Figura deve rolar um teste de Ímpeto (CD 5).
              Adicione modificadores de natação de acordo com a tabela
              específica. Se tiver sucesso, pode ativar normalmente, embora
              tratando a água como terreno acidentado. Se falhar, perde a
              ativação e toma dano igual ao quanto falhou o teste.
            </MobileText>

            <div className="bg-[#1a1a1a] p-4 rounded-lg border border-[#333] mb-4">
              <HeaderH3 className="mb-3 text-center text-white">
                Tabela de Modificadores de Natação
              </HeaderH3>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-[#555]">
                      <th className="text-left py-3 px-4 text-white font-semibold">
                        Tipo de Armadura
                      </th>
                      <th className="text-center py-3 px-4 text-white font-semibold">
                        Modificador
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#333] hover:bg-[#2a2a2a]">
                      <td className="py-3 px-4 text-[#e0e0e0]">
                        Armadura Leve
                      </td>
                      <td className="text-center py-3 px-4 text-[#e0e0e0] font-semibold">
                        -2
                      </td>
                    </tr>
                    <tr className="border-b border-[#333] hover:bg-[#2a2a2a]">
                      <td className="py-3 px-4 text-[#e0e0e0]">
                        Armadura Pesada
                      </td>
                      <td className="text-center py-3 px-4 text-[#e0e0e0] font-semibold">
                        -5
                      </td>
                    </tr>
                    <tr className="border-b border-[#333] hover:bg-[#2a2a2a]">
                      <td className="py-3 px-4 text-[#e0e0e0]">Escudo</td>
                      <td className="text-center py-3 px-4 text-[#e0e0e0] font-semibold">
                        -1
                      </td>
                    </tr>
                    <tr className="hover:bg-[#2a2a2a]">
                      <td className="py-3 px-4 text-[#e0e0e0]">
                        Carregando Tesouro
                      </td>
                      <td className="text-center py-3 px-4 text-[#e0e0e0] font-semibold">
                        -2
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <MobileText
              variant="quote"
              className="text-center italic text-lg leading-relaxed mt-4"
            >
              "Johann pulou no esgoto fétido. Rolou Ímpeto, sem modificadores —
              resultado 3, falhou por 2. A água podre encheu seus pulmões. Dois
              pontos de dano enquanto se debatia, incapaz de se mover. Seu corpo
              afundou nas águas negras, sua ativação desperdiçada."
            </MobileText>

            <HeaderH1>Fuga Desesperada</HeaderH1>
            <MobileText>
              Uma figura pode gastar sua primeira ação do turno para tomar uma
              ação de fuga desesperada. Ao tomar essa ação, ela se move até{" "}
              <strong>8 cm</strong>, independente de quaisquer penalidades de
              movimento e terreno. A ativação da figura então termina
              imediatamente. Esse movimento não pode ser usado para entrar em
              contato de base com uma figura inimiga.
            </MobileText>

            <MobileText
              variant="quote"
              className="text-center italic text-lg leading-relaxed mt-4"
            >
              "O aprendiz viu o demônio avançar. Terror puro. 'FUJA!' sua mente
              gritou. Ele correu — através de escombros, água podre, fogo, tudo.
              Oito centímetros de puro desespero, ignorando cada obstáculo.
              Então parou, ofegante, sem fôlego para mais nada. Sua ativação
              acabou. Tudo que restava era esperar que o demônio não o
              alcançasse."
            </MobileText>

            <HeaderH1>Ação de Disparada</HeaderH1>
            <MobileText>
              Uma figura pode gastar sua segunda ação do turno para se mover
              novamente, seguindo as mesmas regras de movimento descritas acima,
              mas tendo apenas{" "}
              <strong>metade do seu valor de agilidade para o movimento</strong>
              . Esse movimento não pode ser usado para entrar em contato de base
              com uma figura inimiga.
            </MobileText>

            <MobileText
              variant="quote"
              className="text-center italic text-lg leading-relaxed mt-4"
            >
              "O mensageiro correu 16 cm através da praça arruinada. Não era
              suficiente. Ainda podia ouvir os cultistas atrás dele. Usou sua
              segunda ação para disparar novamente — mais 8 cm de movimento
              desesperado. Seus pulmões ardiam, suas pernas tremiam, mas ele
              estava vivo. Por enquanto."
            </MobileText>

            <HeaderH1>Combinando Movimentos</HeaderH1>
            <MobileText>
              As diferentes formas de movimento podem ser{" "}
              <strong>combinadas durante a mesma ação</strong>. Uma figura
              criativa pode escalar um muro, depois pular para outra plataforma,
              atravessar terreno acidentado, ou até mesmo nadar através de água
              rasa — tudo em um único movimento.
            </MobileText>

            <MobileText
              variant="quote"
              className="text-center italic text-lg leading-relaxed mt-4"
            >
              "O mercenário viu a passagem segura no segundo andar. Primeiro
              escalou 4 cm de parede (gastando 8 cm de movimento), depois pulou
              6 cm até a varanda, atravessou 3 cm de terreno acidentado
              (gastando 6 cm), e finalmente nadou 2 cm através de água rasa.
              Tudo em uma única ação de movimento. Seus inimigos ficaram
              perplexos vendo-o desaparecer através de uma rota que parecia
              impossível."
            </MobileText>

            <HeaderH1>Interceptação</HeaderH1>
            <MobileText>
              Se uma figura fizer um movimento a até 3cm de uma figura inimiga
              que tenha linha de visão contra ela, esta pode declarar uma{" "}
              <strong>interceptação</strong>. A figura que declarou
              interceptação move a figura que estava se movendo até que esta
              encoste em sua base. As duas figuras agora estão em combate.
            </MobileText>

            <MobileText
              variant="quote"
              className="text-center italic text-lg leading-relaxed mt-4"
            >
              "A Matriarca viu o Possuído correndo em direção à Noviça indefesa.
              'Não passará!' gritou, lançando-se no caminho do demônio. O
              Possuído estava a apenas 2cm quando ela interceptou, forçando-o a
              desviar para colidir com ela em vez da jovem. Aço sagrado
              encontrou carne corrompida, e a Noviça foi salva por uma irmã mais
              experiente."
            </MobileText>

            <WarningBox title="Resumo das Ações de Movimento" type="info">
              <MobileText>
                • <strong>Movimento Normal:</strong> Até M em cm
              </MobileText>
              <MobileText>
                • <strong>Escalar:</strong> 2 cm de movimento para cada 1 cm
                vertical
              </MobileText>
              <MobileText>
                • <strong>Pular:</strong> Até 10 cm (horizontal/vertical)
              </MobileText>
              <MobileText>
                • <strong>Queda:</strong> Até 8 cm sem dano, depois metade da
                distância
              </MobileText>
              <MobileText>
                • <strong>Terreno Acidentado:</strong> 2 cm de movimento para
                cada 1 cm
              </MobileText>
              <MobileText>
                • <strong>Natação:</strong> Teste de Ímpeto (CD 5) com
                modificadores
              </MobileText>
              <MobileText>
                • <strong>Fuga Desesperada:</strong> 8 cm, ignora penalidades
              </MobileText>
              <MobileText>
                • <strong>Disparada:</strong> Metade da M como segunda ação
              </MobileText>
              <MobileText>
                • <strong>Combinar Movimentos:</strong> Diferentes tipos podem
                ser usados na mesma ação
              </MobileText>
              <MobileText>
                • <strong>Interceptação:</strong> Pode interceptar movimento a
                até 3cm
              </MobileText>
            </WarningBox>

            <MobileText
              variant="quote"
              className="text-center text-lg leading-relaxed mt-8"
            >
              "Em Mordheim, movimento é sobrevivência. Quem se move melhor, vive
              mais tempo. Quem hesita, morre primeiro."
            </MobileText>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default MovementActionsPage;
