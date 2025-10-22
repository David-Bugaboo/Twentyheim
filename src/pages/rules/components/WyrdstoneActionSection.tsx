import MobileText from "../../../components/MobileText";
import ActionSubsection from "./ActionSubsection";
import ActionSubsubsection from "./ActionSubsubsection";
import QuoteSection from "../../../components/QuoteSection";

const WyrdstoneActionSection = () => {
  return (
    <ActionSubsection
      title="Ação de Pegar — Fragmentos de Pedra-bruxa"
      color="#27ae60"
    >
      <MobileText className="mb-4">
        A razão pela qual todos estão aqui. A maldição verde que atrai tolos,
        desesperados e gananciosos para as ruínas. Os fragmentos de Pedra-bruxa
        — pedaços do próprio cometa que aniquilou esta cidade condenada. Não são
        pequenas lascas, apesar do nome "fragmentos" — são{" "}
        <strong>grandes pedaços</strong> do cometa, pesados, pulsantes de
        energia corrupta, e terrivelmente valiosos.
      </MobileText>

      <ActionSubsubsection title="O Ato de Pegar">
        <MobileText className="mb-3">
          Uma figura pode gastar uma ação para pegar um fragmento de Pedra-bruxa
          do chão. O momento em que a ganância supera o bom senso. Porém, há
          restrições — afant, pegar tesouros amaldiçoados enquanto inimigos
          observam raramente termina bem.
        </MobileText>
        <MobileText className="mb-4">
          <strong>Restrição de Proximidade:</strong> Uma figura{" "}
          <strong>não pode usar essa ação</strong> se um inimigo está a menos de{" "}
          <strong>3 cm do fragmento</strong>. Tente pegar pedras brilhantes
          enquanto alguém está querendo te matar e veja como termina.
        </MobileText>
      </ActionSubsubsection>

      <ActionSubsubsection title="O Peso da Ganância">
        <MobileText className="mb-3">
          Enquanto estiver carregando o fragmento, a figura tem apenas{" "}
          <strong>metade do seu movimento normal</strong> (arredonde para
          baixo). O cometa é pesado. A ganância, mais pesada ainda.
        </MobileText>
        <MobileText className="mb-3">
          <strong>Sobrecarga:</strong> Uma figura que esteja usando qualquer
          coisa que não seja uma <strong>arma de mão</strong> ou{" "}
          <strong>adaga</strong> fica sobrecarregada carregando o fragmento,
          sofrendo <strong>-2</strong> em Ímpeto, Precisão, rolagens de
          conjuração e Vontade. Carregar uma espada de duas mãos e um pedaço de
          cometa? Possível. Sábio? Discutível.
        </MobileText>
        <MobileText className="mb-4">
          <strong>Exceções e Restrições:</strong> Figuras com uma{" "}
          <strong>adaga na mão secundária não podem pegar</strong> fragmentos de
          Pedra-bruxa. Contudo, figuras com uma <strong>funda ou escudo</strong>{" "}
          podem (seguindo regras normais de sobrecarga se aplicável).
        </MobileText>
      </ActionSubsubsection>

      <ActionSubsubsection title="A Grande Fuga">
        <MobileText className="mb-4">
          Uma figura carregando um fragmento de Pedra-bruxa pode{" "}
          <strong>sair do mapa</strong>, capturando-a para seu bando. A figura e
          o fragmento não voltam para o jogo — ela fugiu com o tesouro, levando
          sua ganância (e o cometa amaldiçoado) para longe das ruínas. Missão
          cumprida. Sobrevivência garantida. Corrupção... bem, isso é problema
          para amanhã.
        </MobileText>
        <div className="bg-[#2a1f1f] p-4 rounded-lg border border-[#382929] mb-6">
          <MobileText variant="heading" className="mb-3">
            Exemplo: A Ganância de Wilhelm
          </MobileText>

          <div className="bg-[#2a1f1f] p-4 rounded-lg border border-[#382929] mb-3">
            <MobileText className="italic text-[#a89968] mb-3">
              Wilhelm viu o fragmento brilhando entre os escombros. Verde.
              Pulsante. Valioso. O orc mais próximo estava a 10 cm — longe o
              suficiente. Ele gastou sua ação para pegá-lo, agarrando o pedaço
              de cometa. Era pesado. Mais pesado do que parecia.
            </MobileText>

            <MobileText className="italic text-[#a89968] mb-3">
              Wilhelm carregava uma espada de duas mãos. Agora, com a
              Pedra-bruxa na outra mão, estava sobrecarregado. Seu movimento de
              16 cm caiu para 8 cm. Pior: -2 em Ímpeto, Precisão, Conjuração e
              Vontade. Cada passo era uma luta. Cada respiração, um esforço.
            </MobileText>

            <MobileText className="italic text-[#a89968] mb-0">
              Mas Wilhelm sorriu. A borda do mapa estava a 18 cm. Três turnos,
              talvez quatro, e ele poderia sair — fragmento em mãos, riqueza
              garantida. Claro, havia aquele orc. E aquele outro orc. E... ele
              parou de contar. "Um problema de cada vez," murmurou,
              arrastando-se através das ruínas, metade da velocidade mas o dobro
              da determinação.
            </MobileText>
          </div>
        </div>
      </ActionSubsubsection>
    </ActionSubsection>
  );
};

export default WyrdstoneActionSection;
