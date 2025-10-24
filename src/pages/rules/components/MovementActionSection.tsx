import MobileText from "../../../components/MobileText";
import ActionSubsection from "./ActionSubsection";
import ActionSubsubsection from "./ActionSubsubsection";
import QuoteSection from "../../../components/QuoteSection";

const MovementActionSection = () => {
  return (
    <ActionSubsection title="Ação de Movimento" color="#4a90e2">
      <MobileText className="mb-4">
        A figura pode se mover das seguintes formas durante seu turno:
      </MobileText>

      <ActionSubsubsection title="Movimento Normal">
        <MobileText className="mb-4">
          A miniatura pode se mover uma distância de até seu{" "}
          <strong>atributo de Agilidade em centímetros</strong>. Durante este
          movimento, ela pode se virar quanto quiser, fazer qualquer tipo de
          curva, e atravessa automaticamente qualquer obstáculo com menos de 2
          cm de altura. Contudo, esse movimento deve ser{" "}
          <strong>horizontal</strong>. Esse movimento só pode ser usado para
          encostar na base de uma figura inimiga se houver uma{" "}
          <strong>Declaração de Carga</strong> contra ela.
        </MobileText>
      </ActionSubsubsection>

      <ActionSubsubsection title="Escalar">
        <MobileText className="mb-3">
          Uma miniatura pode escalar superfícies verticais como muros e paredes.
          Para tal, ela se move ao , ao longo de seu comprimento vertical da
          parede ou obstáculo, gastando{" "}
          <strong>2 cm de movimento para cada 1 cm de escalada</strong>. Uma
          figura que termine seu movimento escalando cai no chão ao final do
          movimento, seguindo as regras normais de queda. Esse movimento só pode
          ser usado para encostar na base de uma figura inimiga se houver uma{" "}
          <strong>Declaração de Carga</strong> contra ela.
        </MobileText>
        <QuoteSection
          quote="Gregor agarrou as pedras irregulares da torre em ruínas, puxando-se
          para cima com força bruta. Gastou 6 cm de movimento para escalar
          apenas 3 cm de muro — cada centímetro vertical uma batalha contra a
          gravidade. No topo, vislumbrou o arqueiro inimigo. Sem pensar,
          lançou-se sobre ele numa carga desesperada. A luta foi breve,
          violenta. Depois, Gregor caiu, 6 cm direto para o chão pedregoso. A
          queda foi dolorida, mas valeu a pena."
        />
      </ActionSubsubsection>

      <ActionSubsubsection title="Pular">
        <MobileText className="mb-3">
          Uma figura pode declarar um pulo. Ela pode se mover uma distância
          horizontal, vertical ou ambos de até <strong>10 cm</strong>, não sendo
          afetado por queda ou altura durante esse movimento, mas deve ter se
          movido normalmente a distância que deseja pular antes de declarar um
          pulo. Se uma figura termina seu pulo no ar, ela cai ao final do
          movimento, seguindo regras de queda. A distância percorrida no pulo
          não conta contra o movimento de uma figura. Se não percorrer nenhuma
          distância, a figura ainda pode pular 3cm. Esse movimento só pode ser
          usado para encostar na base de uma figura inimiga se houver uma{" "}
          <strong>Declaração de Carga</strong> contra ela.
        </MobileText>
        <QuoteSection
          quote="Klaus correu pelos escombros, ganhando impulso. Oito centímetros de
          corrida furiosa antes de saltar sobre o abismo de 8 cm entre os
          edifícios. Por um momento, pairou no ar, suspenso entre vida e
          morte. Aterrizou do outro lado com um baque, rolando para absorver o
          impacto. Atrás dele, seus perseguidores hesitaram na beira do prédio
          anterior."
        />
      </ActionSubsubsection>

      <ActionSubsubsection title="Queda">
        <MobileText className="mb-3">
          Uma figura pode cair até{" "}
          <strong>8 cm sem tomar nenhum tipo de dano</strong>. Se cair mais que
          isso, tome de dano igual a <strong>metade da distância caída</strong>.
          Esse movimento só pode ser usado para encostar na base de uma figura
          inimiga se houver uma <strong>Declaração de Carga</strong> contra ela.
        </MobileText>
        <QuoteSection
          quote="O besteiro cambaleou na beirada do telhado e caiu. Doze centímetros de
          queda livre. Bateu no chão com um estalo horrível — 6 pontos de dano
          (12/2). Seus ossos quebraram como gravetos secos. Mas a adrenalina o
          manteve lutando."
        />
      </ActionSubsubsection>

      <ActionSubsubsection title="Terreno Acidentado">
        <MobileText className="mb-3">
          Criatura gasta <strong>2 cm de movimento para cada 1 cm</strong> que
          se move em terreno acidentado. Figuras montadas além disso rolam na
          tabela de "Opa garoto!".
        </MobileText>
        <QuoteSection
          quote="O soldado mergulhou nos escombros — pedras soltas, vigas quebradas,
          corpos em decomposição. Cada passo era uma armadilha. Seu movimentogan
          de 16 cm minguou para míseros 8 cm através da ruína. Atrás dele, o
          cavaleiro montado tentou seguir, mas seu cavalo tropeçou nas pedras
          irregulares."
        />
      </ActionSubsubsection>

      <ActionSubsubsection title="Natação">
        <ActionSubsubsection title="Água Rasa">
          <MobileText className="mb-3">
            Terreno de Água rasa apenas conta como terreno acidentado, e não
            oferece nenhuma outra penalidade além disso.
          </MobileText>
        </ActionSubsubsection>

        <ActionSubsubsection title="Água Profunda">
          <MobileText className="mb-3">
            Água profunda é muito complexa de navegar e figuras que queiram
            cruzá-la devem nadar. Figura deve rolar um teste de Ímpeto (CD 5).
            Adicione modificadores de natação de acordo com a tabela específica.
            Se tiver sucesso, pode ativar normalmente, embora tratando a água
            como terreno acidentado. Se falhar, perde a ativação e toma dano
            igual ao quanto falhou o teste.
          </MobileText>

          <div className="bg-[#2a1f1f] p-4 rounded-lg border border-[#382929] mb-4">
            <MobileText variant="subheading" className="mb-3 text-center">
              Tabela de Modificadores de Natação
            </MobileText>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-[#382929]">
                    <th className="text-left py-2 px-3 text-[#d4af37] font-semibold">
                      Tipo de Armadura
                    </th>
                    <th className="text-center py-2 px-3 text-[#d4af37] font-semibold">
                      Modificador
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#382929]">
                    <td className="py-2 px-3 text-[#d4c4a8]">Armadura Leve</td>
                    <td className="text-center py-2 px-3 text-[#d4c4a8]">-2</td>
                  </tr>
                  <tr className="border-b border-[#382929]">
                    <td className="py-2 px-3 text-[#d4c4a8]">
                      Armadura Pesada
                    </td>
                    <td className="text-center py-2 px-3 text-[#d4c4a8]">-5</td>
                  </tr>
                  <tr className="border-b border-[#382929]">
                    <td className="py-2 px-3 text-[#d4c4a8]">Escudo</td>
                    <td className="text-center py-2 px-3 text-[#d4c4a8]">-1</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 text-[#d4c4a8]">
                      Carregando Tesouro
                    </td>
                    <td className="text-center py-2 px-3 text-[#d4c4a8]">-2</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <QuoteSection
            quote="Johann pulou no esgoto fétido. Rolou Ímpeto, sem modificadores —
            resultado 3, falhou por 2. A água podre encheu seus pulmões. Dois
            pontos de dano enquanto se debatia, incapaz de se mover. Seu corpo
            afundou nas águas negras, sua ativação desperdiçada."
          />
        </ActionSubsubsection>
      </ActionSubsubsection>

      <ActionSubsubsection title="Fuga Desesperada">
        <MobileText className="mb-3">
          Uma figura pode gastar sua primeira ação do turno para tomar uma ação
          de fuga desesperada. Ao tomar essa ação, ela se move até{" "}
          <strong>8 cm</strong>, independente de quaisquer penalidades de
          movimento e terreno. A ativação da figura então termina imediatamente.
          Esse movimento nunca pode ser usado para declarar carga.
        </MobileText>
        <QuoteSection
          quote="O aprendiz viu o demônio avançar. Terror puro. 'FUJA!' sua mente
          gritou. Ele correu — através de escombros, água podre, fogo, tudo.
          Oito centímetros de puro desespero, ignorando cada obstáculo. Então
          parou, ofegante, sem fôlego para mais nada. Sua ativação acabou. Tudo
          que restava era esperar que o demônio não o alcançasse."
        />
      </ActionSubsubsection>

      <ActionSubsubsection title="Ação de Disparada">
        <MobileText className="mb-3">
          Uma figura pode gastar sua segunda ação do turno para se mover
          novamente, seguindo as mesmas regras de movimento descritas acima, mas
          tendo apenas{" "}
          <strong>metade do seu valor de agilidade para o movimento</strong>.
          Esse movimento só pode ser usado para encostar na base de uma figura
          inimiga se houver uma <strong>Declaração de Carga</strong> contra ela.
        </MobileText>
        <QuoteSection
          quote="O mensageiro correu 16 cm através da praça arruinada. Não era
          suficiente. Ainda podia ouvir os cultistas atrás dele. Usou sua
          segunda ação para disparar novamente — mais 8 cm de movimento
          desesperado. Seus pulmões ardiam, suas pernas tremiam, mas ele estava
          vivo. Por enquanto."
        />
      </ActionSubsubsection>
    </ActionSubsection>
  );
};

export default MovementActionSection;
