import PageTitle from "../../components/PageTitle";
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";
import HeaderH1 from "../../components/HeaderH1";
import HeaderH2 from "../../components/HeaderH2";
import HeaderH3 from "../../components/HeaderH3";
import GenericTable from "../../components/GenericTable";
import CornerDecoration from "../../components/CornerDecoration";

function SurvivalTestPage() {
  // Dados para tabelas
  const soldierSurvivalData = [
    { "Die Roll": "1-4", Result: "Morto" },
    { "Die Roll": "5-8", Result: "Gravemente Ferido" },
    { "Die Roll": "9+", Result: "Recuperação Completa" },
  ];

  const leaderSurvivalData = [
    { "Die Roll": "1-2", Result: "Morto" },
    { "Die Roll": "3-4", Result: "Ferimento Permanente" },
    { "Die Roll": "5-6", Result: "Gravemente Ferido" },
    { "Die Roll": "7-8", Result: "Por Um Triz" },
    { "Die Roll": "9+", Result: "Recuperação Completa" },
  ];

  const permanentInjuriesData = [
    { "Die Roll": "1-2", Injury: "Dedos Arrancados" },
    { "Die Roll": "3-6", Injury: "Perna Esmagada" },
    { "Die Roll": "7-10", Injury: "Braço Esmagado" },
    { "Die Roll": "11-12", Injury: "Dedos Arrancados" },
    { "Die Roll": "13-14", Injury: "Danos Internos" },
    { "Die Roll": "15-16", Injury: "Trauma" },
    {
      "Die Roll": "17-18",
      Injury: "Chaga Aberta",
    },
    { "Die Roll": "19", Injury: "Mandíbula Esmagada" },
    { "Die Roll": "20", Injury: "Caolho" },
  ];

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <CornerDecoration />
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <MobileSection>
            <PageTitle>Ferimentos e Morte</PageTitle>

            <MobileText>
              Para cada modelo que foi reduzido a 0 de Vigor durante o jogo,
              existe a possibilidade de que aquele modelo sofra ferimentos
              permanentes ou morra. Em Mordheim, cair não significa
              necessariamente morte — às vezes significa algo pior.
            </MobileText>

            <HeaderH1>Sobrevivência de Soldados</HeaderH1>
            <MobileText>
              Soldados que foram reduzidos a 0 de vida rolam na tabela de
              sobrevivência do soldado:
            </MobileText>
            <GenericTable data={soldierSurvivalData} scrollable={false} />
            <MobileText>
              <strong>MORTO:</strong> O soldado foi morto e deve ser removido da
              ficha do bando. Qualquer item que este soldado carregava é
              perdido.
            </MobileText>
            <MobileText>
              <strong>GRAVEMENTE FERIDO:</strong> O soldado está ferido. Ele
              podem permanecer no bando, mas não pode participar do próximo jogo
              enquanto estão se recuperando de seus ferimentos. Após esse jogo
              jogo, eles retorna para o próximo jogo com saúde completa. Ele
              pode ser temporariamente substituido por qualquer soldado com
              custo grátis do bando, que abandona o bando e deixa o equipamento
              dele no cofre do acampamento.
            </MobileText>
            <MobileText>
              <strong>RECUPERAÇÃO COMPLETA:</strong> O soldado se recupera
              rapidamente de seu sofrimento e retornará para o próximo jogo com
              saúde completa.
            </MobileText>

            <HeaderH1>Sobrevivência de Heróis e Campeões</HeaderH1>
            <MobileText>
              Heróis e campeões rolam na tabela de sobrevivência de líder:
            </MobileText>
            <GenericTable data={leaderSurvivalData} scrollable={false} />
            <MobileText>
              <strong>MORTO:</strong> A figura não sobrevive aos seus
              ferimentos. Veja a seção sobre recrutar novos membros do bando em
              'Gastando Tesouro' para o que fazer quando seu mago ou aprendiz
              morre.
            </MobileText>
            <MobileText>
              <strong>FERIMENTO PERMANENTE:</strong> A figura sofre um ferimento
              que nunca cicatriza completamente. Role na tabela de ferimentos
              permanentes abaixo para determinar a natureza exata do ferimento.
              Caso contrário, a figura retorna para o próximo jogo com saúde
              completa.
            </MobileText>
            <MobileText>
              <strong>SEQUESTRADO:</strong> A figura foi sequestrada enquanto
              estava desacordado e está preso nos poços de escravos de Mordheim.
              Dado tempo suficiente, ele será capaz de escapar por conta
              própria, mas perderá o próximo jogo. O bando pode ao invés disso
              pagar 150 coroas para comprar a liberdade da figura, e então ele
              jogará o próximo jogo normalmente sem maiores consequências. O
              Bando pode entrar em débito para pagar esse custo, mas não pode
              gastar nenhuma quantidade de coroas até que esta dívida seja paga
              completamente.
            </MobileText>
            <MobileText>
              <strong>ROUBADO:</strong> A figura escapa sem ferimento maior, mas
              perde todos os itens que estava carregando.
            </MobileText>
            <MobileText>
              <strong>RECUPERAÇÃO COMPLETA:</strong> Os ferimentos da figura
              provaram ser relativamente menores, e ela retorna com força total
              no próximo jogo.
            </MobileText>

            <HeaderH1>Registrando Ferimentos Permanentes</HeaderH1>
            <MobileText>
              Quando um modelo sofre um ferimento permanente, role um d20 e
              consulte a tabela abaixo:
            </MobileText>
            <GenericTable data={permanentInjuriesData} scrollable={false} />

            <HeaderH1>Descrições dos Ferimentos Permanentes</HeaderH1>
            <MobileText>
              <strong>DEDOS ARRANCADOS:</strong> As lâminas foram precisas — ou
              cruéis. Onde antes havia carne viva e movimento, restam tocos
              inchados e o eco de uma dor fantasma. A figura nunca mais manejará
              uma arma de arremesso com a mesma precisão; os deuses zombam
              daqueles que tentam puxar um gatilho sem dedos. -1 permanente em
              BS. Pode ser recebido duas vezes (-2 BS). Re-rolar resultados
              adicionais.
            </MobileText>
            <MobileText>
              <strong>ALEIJADO:</strong> Os ossos da perna foram esmagados por
              martelos de guerra ou pelas garras de criaturas monstruosas. A
              figura manca permanentemente, arrastando a perna ferida pelas
              ruínas. Ela sofre uma penalidade permanente de -4 em Movimento.
              Este ferimento pode ser recebido duas vezes, com efeito cumulativo
              de -8 em Movimento. Qualquer resultado adicional de Perna Esmagada
              deve ser re-rolado.
            </MobileText>
            <MobileText>
              <strong>JOÃO SEM BRAÇO:</strong> O golpe quebrou ossos e
              esperança. O membro balança inerte, frio, sem resposta — um peso
              morto preso a um corpo que se recusa a morrer. Mesmo levantar uma
              lâmina agora é um ato de penitência. -1 permanente em WS. Pode ser
              recebido duas vezes (-2 WS). Re-rolar resultados adicionais.
            </MobileText>
            <MobileText>
              <strong>INTESTINOS SOLTOS:</strong> A lâmina entrou fundo demais —
              e saiu levando parte de quem você era. O ventre nunca se fechou
              por completo; às vezes, na pressa da batalha, a figura precisa
              empurrar as vísceras de volta com a própria mão. O cheiro de
              sangue velho e bile a acompanha como um cão fiel, e cada movimento
              parece ameaçar abrir novamente o que nunca cicatrizou. -1
              permanente em Vida. Pode ser recebido duas vezes (-2 Vida).
              Re-rolar resultados adicionais.
            </MobileText>
            <MobileText>
              <strong>TRAUMA:</strong> Há coisas em Mordheim que não podem ser
              esquecidas. O olhar da figura perdeu o foco humano, como se visse
              algo além do mundo dos vivos. Às vezes fala sozinha. Às vezes com
              alguém que não está lá. -1 permanente em Vontade. Pode ser
              recebido duas vezes (-2 Vontade). Re-rolar resultados adicionais.
            </MobileText>
            <MobileText>
              <strong>FERIMENTO INFECTADO:</strong> A carne apodrece ao redor da
              ferida, inchada e pútrida. Vermes se aninham sob a pele, e o fedor
              anuncia a presença da morte antes que ela chegue. Os curandeiros
              chamam de "febre da ruína", e poucos sobrevivem tempo o bastante
              para dar um segundo nome a ela. Sem cuidados constantes — ou algum
              pacto sombrio — o corpo se consome lentamente. Deve gastar 30
              coroas antes de cada jogo em remédios, sangrias ou encantamentos
              menores, ou começar cada jogo com -3 de Vida. Se for recebida
              novamente, o custo sobe para 40 coroas e a penalidade para -4 de
              Vida. Re-rolar resultados adicionais.
            </MobileText>
            <MobileText>
              <strong>CARA RACHADA:</strong> O golpe partiu o rosto como argila
              seca. Dentes viraram fragmentos, ossos se fundiram em ângulos
              impossíveis, e o simples ato de falar é uma tortura de estalos e
              sangue. A voz da figura tornou-se um murmúrio arrastado e grotesco
              — poucos a entendem, e menos ainda a obedecem. Sempre que esta
              figura ativa, ela pode ativar no máximo dois soldados junto de si
              (em vez dos três normais). Se este ferimento for recebido uma
              segunda vez, o número de soldados que podem ser ativados junto ao
              ferido é reduzido para um. Qualquer resultado adicional de
              Mandíbula Esmigalhada deve ser re-rolado.
            </MobileText>
            <MobileText>
              <strong>CAOLHO:</strong> Um dos olhos foi arrancado, esmagado ou
              queimado. O mundo agora é metade sombra, metade ameaça. Os tiros
              vêm de todos os lados, e o inimigo parece sempre mais rápido.
              Efeito: Sofre -1 em rolagens de combate sempre que é alvo de
              ataques à distância. Se receber este ferimento duas vezes, a
              figura fica cega e deve ser retirada permanentemente (conta como
              morta).
            </MobileText>
            <MobileText>
              <strong>Nota:</strong> Ferimentos permanentes são cumulativos. Uma
              figura pode ter múltiplos ferimentos, cada um com seus próprios
              efeitos. Em Mordheim, sobreviver não é sempre uma benção.
            </MobileText>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default SurvivalTestPage;
