import PageTitle from "../../components/PageTitle";
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";
import HeaderH1 from "../../components/HeaderH1";
import HeaderH2 from "../../components/HeaderH2";
import HeaderH3 from "../../components/HeaderH3";

import WarningBox from "../../components/WarningBox";

function SurvivalTestPage() {
  // Dados para tabelas
  

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <MobileSection>
            <PageTitle>Ferimentos e Morte</PageTitle>
            <MobileText>
              Para cada modelo que foi reduzido a 0 de Vida durante o jogo,
              existe a possibilidade de que aquele modelo sofra ferimentos
              permanentes ou morra. Em Mordheim, cair não significa
              necessariamente morte — às vezes significa algo pior.
            </MobileText>
            <HeaderH1>Sobrevivência de Soldados</HeaderH1>
            <MobileText>
              Para cada soldado que foi reduzido a 0 de vida, role um dado. Em
              um resultado de 1-6, o soldado morre e todos os seus equipamentos
              são perdidos. Em qualquer outra rolagem ele está bem e pode ser
              usado no próximo jogo.
            </MobileText>
            <HeaderH1>Sobrevivência de Heróis</HeaderH1>
            Hérois reduzidos a 0 de vida durante o jogo devem rolar um dado e
            comparar com os resultados em{" "}
            <strong>Tabela de Sobrevivência</strong>.
            <WarningBox title="Liderança e Sucessão" type="warning">
              <p className="mb-3">
                <strong>Se o líder do bando for morto:</strong> O Herói com o
                próximo maior valor de Liderança assume o comando. Ele então
                ganha a regra especial Líder (embora deva continuar usando sua
                lista de Habilidades original) e pode usar a lista de
                Equipamentos disponível para o líder. Se houver mais de um Herói
                elegível para assumir o comando, a figura com o maior nível se
                torna o líder. Em caso de empate, randomize. Note que você não
                pode contratar um novo líder para seu bando.
              </p>
              <p className="mb-3">
                <strong>No caso de Cortes Vampíricas:</strong> A morte do
                Vampiro significa que o Necromante do bando deve assumir o
                controle. Se o bando não incluir um, os feitiços que mantêm os
                mortos inquietos juntos se desfazem, e o bando colapsa em uma
                pilha de ossos. Você pode comprar um Vampiro após o próximo
                jogo, momento em que o Necromante renunciará (querendo ou não) e
                perderá a habilidade Líder.
              </p>
              <p>
                <strong>Se o líder do bando for um conjurador:</strong> Seu
                sucessor terá direito a aprender a usar magia em seu lugar. O
                novo líder perde o acesso as suas habilidades e listas de
                habilidades e imediatamente aprende 3 magias das mesmas
                tradições disponíveis para o líder do bando. Após isso, ele é
                considerado um conjurador conforme apropriado para seu bando e
                usa a tabela de Avanço normalmente.
              </p>
            </WarningBox>
            <HeaderH1>Tabela de Sobrevivência</HeaderH1>
            <HeaderH2>Resultados(D20)</HeaderH2>
            <HeaderH3>1 - Morto</HeaderH3>
            <MobileText>
              A figura está morta, e seu corpo foi abandonado nos becos sombrios
              de Mordheim, para nunca mais ser encontrado. Todas as armas e
              equipamentos que ele carregava estão perdidos. Remova-o da ficha
              do bando.
            </MobileText>
            <HeaderH3>2 - Múltiplos Ferimentos</HeaderH3>
            <MobileText>
              Role mais 3 vezes nessa tabela. Re-role qualquer resultado de
              Morto, Capturado e Múltiplos Ferimentos.
            </MobileText>
            <HeaderH3>3 - Ferimento na Perna</HeaderH3>
            <MobileText>
              A perna da figura está quebrada. Ele sofre uma penalidade de -2 em
              seu atributo de Movimento a partir de agora.
            </MobileText>
            <HeaderH3>4 - Ferimento no Braço</HeaderH3>
            <MobileText>
              Role o dado novamente:
              <br />
              <br />
              1-5 = Ferimento grave no braço. O braço deve ser amputado. A
              figura só poderá usar uma única arma sem a característica Duas
              Mãos a partir de agora.
              <br />
              <br />
              6-20 = Ferimento leve. A figura não joga o próximo jogo.
            </MobileText>
            <HeaderH3>5 - Insanidade</HeaderH3>
            <MobileText>
              Role o dado novamente:
              <br />
              <br />
              1-5 = Insanidade completa. A figura age como uma criatura
              descontrolada em todo combate que participa.
              <br />
              <br />
              6-20 = Insanidade Temporária. No próximo jogo, a figura ganha um
              marcador de Atordoamento sempre que não terminar uma ativação em
              combate.
            </MobileText>
            <HeaderH3>6 - Perna Esmagada</HeaderH3>
            <MobileText>
              Role o dado novamente:
              <br />
              <br />
              1-5 = A figura não pode mais tomar ações de disparada ou escalar.
              <br />
              <br />
              6-20 = A figura não pode participar do próximo jogo.
            </MobileText>
            <HeaderH3>7 - Ferimento no Tórax</HeaderH3>
            <MobileText>
              A figura sofreu um ferimento grave no peito. Sua vida máxima é
              reduzida permanentemente em -2.
            </MobileText>
            <HeaderH3>8 - Cego de Um Olho</HeaderH3>
            <MobileText>
              A figura sobrevive, mas perde a visão em um olho; determine
              aleatoriamente qual. Um personagem que perde um olho tem sua
              Precisão reduzida em -2.
              <br />
              <br />
              Se a figura for posteriormente cegado no olho bom restante, ele
              deve se aposentar do bando.
            </MobileText>
            <HeaderH3>9 - Ferimento Infectado</HeaderH3>
            <MobileText>
              A figura sobrevive, mas sua ferida o impedirá de lutar se você
              rolar 1-5 em um dado no início de qualquer batalha. Role no início
              de cada batalha a partir de agora.
            </MobileText>
            <HeaderH3>10 - Condição Nervosa</HeaderH3>
            <MobileText>
              O sistema nervoso da figura foi danificado. Sua Vontade é reduzida
              em -1.
            </MobileText>
            <HeaderH3>11 - Ferimento na Mão</HeaderH3>
            <MobileText>
              A mão da figura está gravemente ferida. Seu Ímpeto é reduzido
              permanentemente em -1.
            </MobileText>
            <HeaderH3>12 - Ferimento Profundo</HeaderH3>
            <MobileText>
              A figura sofreu um ferimento sério e deve perder os próximos 2
              jogos enquanto se recupera. Ele não pode fazer nada enquanto se
              recupera, incluindo atividades.
            </MobileText>
            <HeaderH3>13 - Roubado</HeaderH3>
            <MobileText>
              A figura consegue escapar, mas todas as suas armas, armaduras e
              equipamentos estão perdidos.
            </MobileText>
            <HeaderH3>14 - Recuperação Completa</HeaderH3>
            <MobileText>
              A figura foi nocauteado ou sofreu um ferimento leve do qual se
              recupera completamente.
            </MobileText>
            <HeaderH3>15 - Inimizade Amarga</HeaderH3>
            <MobileText>
              A figura se recupera fisicamente, mas está psicologicamente
              marcado por sua experiência. A partir de agora, a figura ganha a
              característica Ódio contra o seguinte (role um D20):
              <br />
              <br />
              <strong>1-10:</strong> O indivíduo que reduziu a figura a 0 de
              vida. Se foi um Soldado, ele odeia o líder do bando daquele
              soldado.
              <br />
              <br />
              <strong>11-15:</strong> O líder do bando que o reduziu a 0 de
              vida.
              <br />
              <br />
              <strong>16-19:</strong> Todas as figuras do bando que o reduziu a
              0 de vida.
              <br />
              <br />
              <strong>20:</strong> Todos os bandos daquela mesmo tipo.
            </MobileText>
            <HeaderH3>16 - Capturado</HeaderH3>
            <MobileText>
              A figura recupera a consciência e se encontra preso pelo bando que
              jogou contra. (o bando da figura que o reduziu a 0 de vida se for
              um jogo multijogador)
              <br />
              <br />
              Ele pode ser resgatado por um preço definido pelo captor ou
              trocado por um membro de bando inimigo que está sendo mantido
              prisioneiro.
              <br />
              <br />
              Prisioneiros podem ser vendidos para traficantes de escravos por
              seu custo em coroas de ouro.
              <br />
              <br />
              Mortos-vivos podem matar seu prisioneiro e ganhar um novo Zumbi.
              <br />
              <br />
              O culto dos possuídos podem sacrificar o prisioneiro. O líder do
              bando ganhará +100 de Experiência se o fizer.
              <br />
              <br />
              Prisioneiros que são trocados ou resgatados mantêm todas as suas
              armas, armaduras e equipamentos; se prisioneiros são vendidos,
              mortos ou transformados em Zumbis, suas armas, etc., são mantidas
              por seus captores.
            </MobileText>
            <HeaderH3>17 - Caleijado</HeaderH3>
            <MobileText>
              A figura sobrevive e se torna insensível aos horrores de Mordheim.
              <br />
              <br />A partir de agora, ele é Imune a Aterrorizante.
            </MobileText>
            <HeaderH3>18 - Cicatrizes Horríveis</HeaderH3>
            <MobileText>
              A figura ganha a característica Aterrorizante.
            </MobileText>
            <HeaderH3>19 - Vendido as Arenas Clandestinas</HeaderH3>
            <MobileText>
              A figura acorda nas notórias Arenas Clandestinas do Refúgio dos
              Miseráveis e deve lutar contra um Gladiador.
              <br />
              <br />
              A figura rola um teste de Ímpeto ou Precisão CD 15.
              <br />
              <br />
              Se a figura perder, role um dado. Em 1-10 ele morreu, em 11-20 ele
              foi ferido. Se ele não estiver morto, é expulso das arenas
              clandestinos sem seu equipamento e pode se juntar novamente ao seu
              bando.
              <br />
              <br />
              Se a figura obtiver sucesso no teste, ele ganha 50 coroas de ouro,
              +50 de Experiência e está livre para se juntar novamente ao seu
              bando com todas as suas armas e equipamentos.
            </MobileText>
            <HeaderH3>20 - Supreendentemente Sobrevive</HeaderH3>
            <MobileText>
              A figura sobrevive e se junta novamente ao seu bando. Ela ganha
              +50 de Experiência.
            </MobileText>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default SurvivalTestPage;
