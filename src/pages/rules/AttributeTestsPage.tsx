import PageTitle from "../../components/PageTitle";
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";
import HeaderH1 from "../../components/HeaderH1";
import HeaderH2 from "../../components/HeaderH2";
import HeaderH3 from "../../components/HeaderH3";

function AttributeTestsPage() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <MobileSection>
            <PageTitle>Testes de Característica</PageTitle>

            <MobileText>
              Os testes de característica são o coração do sistema de resolução
              de ações em Mordheim 025. Quando uma figura tenta realizar uma
              ação que tem chance de falhar, você rola um d6 e compara com o
              valor relevante da característica da figura.
            </MobileText>

            <HeaderH1>Como Fazer um Teste</HeaderH1>

            <MobileText>Para fazer um teste de característica:</MobileText>

            <MobileText>
              <strong>1.</strong> Role um d20
              <br />
              <strong>2.</strong> Some o valor da característica relevante
              <br />
              <strong>3.</strong> Compare o total com a{" "}
              <strong>CLASSE DE DIFICULDADE (CD)</strong>
              <br />
              <strong>4.</strong> Se o total for igual ou maior que o alvo, o
              teste é bem-sucedido!
            </MobileText>

            <HeaderH2>Fórmula Básica</HeaderH2>
            <MobileText>
              <strong>d20 + Característica ≥ 10</strong>
              <br />
              <em>Exemplo: Rolagem de 7 + Ímpeto 3 = 10 (sucesso!)</em>
            </MobileText>

            <HeaderH1>Modificadores</HeaderH1>
            <MobileText>
              Um modificador é qualquer valor que pode ser adicionado a um
              teste, seja positivo ou negativo. por exemplo, uma espada do raro
              metal élfico Ithilmar tem um modificador de +1 em Ímpeto. Ao rolar
              tal teste, o jogador poderia adicionar +1 ao resultado da rolagem.
              Sempre adicione todos os modificadores relevantes a uma rolagem de
              atributo.
            </MobileText>

            <HeaderH1>Testes Contestados</HeaderH1>

            <MobileText>
              Algumas situações envolvem testes opostos, onde duas figuras
              comparar sua habilidade em realizar determinad ação.
            </MobileText>
            <MobileText>
              <strong>Exemplo:</strong> Uma figura tenta lutar contra outra.
              Ambas fazem um teste de Ímpeto. A que conseguir o maior resultado
              vence a luta e enterra seu punhal na carne vulnerável do inimigo.
            </MobileText>

            <HeaderH1>1 e 20 (Sucesso e Falha Crítica)</HeaderH1>
            <MobileText>
              Rolar um 1 ou 20 natural é sempre um momento marcante quando se
              joga algum jogo em um motor de d20. Com 20Heim não é diferente.
            </MobileText>
            <HeaderH2>Falha Crítica</HeaderH2>
            <MobileText>
              Ao rolar um resultado natural de 1 (sem modificadores de atributo
              ou outras fontes) qualquer rolagem é uma FALHA CRITICA. Mesmo se
              os bonus na rolagem ainda fizessem com que o resultado fosse maior
              que a CD, ou maior que a rolagem de um oponente em caso de teste
              contestado, a ação falha automaticamente. Alguns tipos de ação,
              como conjuração de magia por exemplo, punem a figura severamente
              por uma falha crítica. Via de regra contudo, falhar
              automaticamente em mordheim já é punitivo suficiente, e talvez a
              causa da morte do seu tolo mercenário. Note que em um teste
              contestado, caso ambas as figures rolem um 1 natural, o menor
              resultado ainda prevalece.
            </MobileText>
            <HeaderH2>Sucesso Crítico</HeaderH2>
            <MobileText>
              Ao rolar um resultado natural de 20 (sem modificadores de atributo
              ou outras fontes) qualquer rolagem é um SUCESSO CRITICO. Mesmo se
              os bonus na rolagem ainda fizessem com que o resultado fosse menor
              que a CD, ou menor que a rolagem de um oponente em caso de teste
              contestado, a ação é bem-sucedida automaticamente. Note que em um
              teste contestado, caso ambas as figures rolem um 20 natural, o
              maior resultado ainda prevalece.
            </MobileText>
            <MobileText
              variant="quote"
              className="text-center text-lg leading-relaxed mt-8"
            >
              "O destino é decidido pelos dados, mas a sabedoria está em saber
              quando arriscar e quando recuar. Mordheim não perdoa os incautos."
            </MobileText>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default AttributeTestsPage;
