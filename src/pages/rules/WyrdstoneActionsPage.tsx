import PageTitle from "../../components/PageTitle";
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";
import HeaderH2 from "../../components/HeaderH2";
import WarningBox from "../../components/WarningBox";
import CornerDecoration from "../../components/CornerDecoration";

function WyrdstoneActionsPage() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <CornerDecoration />
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <MobileSection>
            <PageTitle>Ação de Pegar — Fragmentos de Pedra-bruxa</PageTitle>

            <MobileText>
              A razão pela qual todos estão aqui. A maldição verde que atrai
              tolos, desesperados e gananciosos para as ruínas. Os fragmentos de
              Pedra-bruxa — pedaços do próprio cometa que aniquilou esta cidade
              condenada. Não são pequenas lascas, apesar do nome "fragmentos" —
              são <strong>grandes pedaços</strong> do cometa, pesados, pulsantes
              de energia corrupta, e terrivelmente valiosos.
            </MobileText>

            <HeaderH2>O Ato de Pegar</HeaderH2>
            <MobileText>
              Uma figura pode gastar uma ação para pegar um fragmento de
              Pedra-bruxa do chão. O momento em que a ganância supera o bom
              senso. Porém, há restrições — afinal, pegar tesouros amaldiçoados
              enquanto inimigos observam raramente termina bem.
            </MobileText>

            <MobileText>
              <strong>Fragmentos em Baús e Containers:</strong> Alguns
              fragmentos de Pedra-bruxa estarão em baús e containers fechados.
              Para poder pegar o fragmento, a figura deve primeiro gastar uma
              ação para destravar o container, fazendo um teste de{" "}
              <strong>Liderança (Ld)</strong> contra <strong>CD 14</strong>. Só
              após o sucesso neste teste é que uma ação pode ser gasta para
              pegar o fragmento.
            </MobileText>

            <MobileText>
              <strong>Restrição de Proximidade:</strong> Uma figura{" "}
              <strong>não pode usar essa ação</strong> se um inimigo está a
              menos de <strong>3 cm do fragmento</strong>. Tente pegar pedras
              brilhantes enquanto alguém está querendo te matar e veja como
              termina.
            </MobileText>

            <HeaderH2>O Peso da Ganância</HeaderH2>
            <MobileText>
              Enquanto estiver carregando o fragmento, a figura tem apenas{" "}
              <strong>metade do seu movimento normal</strong> (arredonde para
              baixo). O cometa é pesado. A ganância, mais pesada ainda.
            </MobileText>

            <MobileText>
              <strong>Sobrecarga:</strong> Uma figura que esteja usando qualquer
              coisa que não seja uma arma sem as características{" "}
              <strong>Duas Mãos ou Desbalanceada</strong> ou{" "}
              <strong>adaga</strong> fica sobrecarregada, sofrendo{" "}
              <strong>-2</strong> em Ímpeto, Precisão, rolagens de conjuração e
              Ld. Carregar uma espada de duas mãos e um pedaço de cometa?
              Possível. Sábio? Discutível.
            </MobileText>

            <MobileText>
              <strong>Exceções e Restrições:</strong> Figuras com uma{" "}
              <strong>arma leve na mão secundária não podem pegar</strong>{" "}
              fragmentos de Pedra-bruxa. Contudo, figuras com uma{" "}
              <strong>funda ou escudo</strong> podem (seguindo regras normais de
              sobrecarga se aplicável).
            </MobileText>

            <HeaderH2>A Grande Fuga</HeaderH2>
            <MobileText>
              Uma figura carregando um fragmento de Pedra-bruxa pode{" "}
              <strong>sair do mapa</strong>, capturando-a para seu bando. A
              figura e o fragmento não voltam para o jogo — ela fugiu com o
              tesouro, levando sua ganância (e o cometa amaldiçoado) para longe
              das ruínas. Missão cumprida. Sobrevivência garantida. Corrupção...
              bem, isso é problema para amanhã.
            </MobileText>

            <WarningBox title="Resumo da Ação de Pegar Pedra-bruxa" type="info">
              <MobileText>
                • <strong>Ação:</strong> Gasta uma ação para pegar um fragmento
              </MobileText>
              <MobileText>
                • <strong>Baús/Containers:</strong> Primeiro destravar (Ld CD
                14), depois pegar
              </MobileText>
              <MobileText>
                • <strong>Restrição:</strong> Inimigo não pode estar a menos de
                3 cm
              </MobileText>
              <MobileText>
                • <strong>Movimento:</strong> Reduzido para metade (arredondado
                para baixo)
              </MobileText>
              <MobileText>
                • <strong>Sobrecarga:</strong> -2 em Ímpeto, Precisão,
                Conjuração e Vontade (exceto adaga/arma de mão)
              </MobileText>
              <MobileText>
                • <strong>Exceção:</strong> Adaga na mão secundária impede pegar
                fragmentos
              </MobileText>
              <MobileText>
                • <strong>Fuga:</strong> Pode sair do mapa com o fragmento
              </MobileText>
            </WarningBox>

            <MobileText
              variant="quote"
              className="text-center italic text-lg leading-relaxed mt-8"
            >
              "A Pedra-bruxa promete riqueza além dos sonhos. Mas em Mordheim,
              cada promessa tem seu preço. E o preço da ganância é pago em
              sangue."
            </MobileText>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default WyrdstoneActionsPage;
