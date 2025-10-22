import MobileText from "../../../components/MobileText";
import ActionSubsection from "./ActionSubsection";
import ActionSubsubsection from "./ActionSubsubsection";
import QuoteSection from "../../../components/QuoteSection";

const PowerActionSection = () => {
  return (
    <ActionSubsection title="Ação de Poder" color="#e67e22">
      <MobileText className="mb-4">
        Não é magia — é algo mais visceral. Mais brutal. O auge da habilidade
        marcial, técnica refinada até a perfeição, ou pura força de vontade
        manifestada em feitos sobre-humanos. Mas grandeza tem seu preço, e esse
        preço é pago em dor.
      </MobileText>

      <ActionSubsubsection title="Ativando Poderes">
        <MobileText className="mb-4">
          Uma figura que pode usar poderes utiliza essa ação para ativá-los. A
          figura rola um <strong>d20</strong> — a rolagem de ativação. Se essa
          rolagem for <strong>maior</strong> que a{" "}
          <strong>Classe de Dificuldade (CD)</strong> do poder, o poder é
          ativado com sucesso. Caso contrário, o poder falha. Simples. Direto.
          Doloroso.
        </MobileText>
        <div className="bg-[#2a1f1f] p-4 rounded-lg border border-[#382929] mb-6">
          <MobileText variant="heading" className="mb-3">
            Stress — O Preço da Excelência
          </MobileText>

          <MobileText className="mb-3">
            Ativar um poder é usar o auge da habilidade marcial do personagem, e
            a carga mental e física é grande. Músculos rasgam. Nervos queimam.
            Ossos rangem sob pressão impossível.
          </MobileText>

          <MobileText className="mb-3">
            <strong>Ao tentar ativar um poder:</strong> O jogador toma{" "}
            <strong>1 ponto de dano</strong> automaticamente. O esforço de
            tentar já cobra seu tributo.
          </MobileText>

          <MobileText>
            <strong>Caso falhe em ativar o poder:</strong> Toma mais{" "}
            <strong>2 pontos de dano</strong>, para um total de{" "}
            <strong>3 pontos</strong>. Falha não apenas nega o efeito — ela
            machuca. Profundamente.
          </MobileText>
        </div>
      </ActionSubsubsection>

      <ActionSubsubsection title="Uma Ação Especial">
        <MobileText className="mb-4">
          Esta ação é especial: ela <strong>não gasta</strong> uma das ações do
          jogador por padrão, a não ser que um poder específico exija uma ação
          para aplicar seus efeitos. Você pode ativar um poder e ainda mover,
          atacar, ou realizar outras ações. O corpo grita em protesto, mas
          obedece.
        </MobileText>
      </ActionSubsubsection>

      <ActionSubsubsection title="Forçar Poderes">
        <MobileText className="mb-4">
          Assim como magias, poderes podem ser <strong>Forçados</strong>.
          Aumente a rolagem de ativação em{" "}
          <strong>+1 para cada 1 ponto de vida gasto</strong>. A rolagem nunca
          pode exceder <strong>18</strong>. Sangue por sucesso. Vida por
          vitória. O preço é o mesmo, apenas a moeda que muda.
        </MobileText>
      </ActionSubsubsection>

      <ActionSubsubsection title="Stress Acumulado — O Limite da Carne">
        <MobileText className="mb-3">
          Um jogador pode usar essa ação{" "}
          <strong>uma vez por ativação de cada figura</strong> no jogo, podendo
          usar vários poderes no mesmo turno — um a cada ativação. Mas à medida
          que o stress se acumula, os poderes ficam mais difíceis de ativar. O
          corpo tem limites.
        </MobileText>

        <MobileText className="mb-3">
          <strong>Penalidade Progressiva:</strong> Cada poder além do primeiro
          usado no turno tem sua CD aumentada em{" "}
          <strong>+3 para cada outro poder</strong> ativado antes dele:
        </MobileText>

        <MobileText className="mb-3">
          • <strong>Primeiro poder:</strong> CD normal
          <br />• <strong>Segundo poder:</strong> CD +3
          <br />• <strong>Terceiro poder:</strong> CD +6
          <br />• <strong>Quarto poder:</strong> CD +9
          <br />• <strong>Quinto poder:</strong> CD +12
          <br />• <strong>Sexto poder:</strong> CD +15
        </MobileText>

        <MobileText className="mb-4">
          <strong>Limite Absoluto:</strong> Quando a penalidade chegar a{" "}
          <strong>+15</strong>, poderes não podem mais ser ativados neste turno.
          O corpo simplesmente se recusa. Carne e osso têm limites que nem a
          vontade mais feroz pode ultrapassar.
        </MobileText>

        <div className="bg-[#2a1f1f] p-4 rounded-lg border border-[#382929] mb-6">
          <MobileText variant="heading" className="mb-3">
            Exemplo: Klaus Empurra os Limites
          </MobileText>

          <MobileText>
            Klaus, na primeira ativação, usa "Muralha de Escudos!" (CD 3). Rola
            15 — sucesso fácil. Toma 1 de dano pelo esforço. Seus homens erguem
            escudos em formação perfeita.
            <br />
            <br />
            Segunda ativação: "Ataquem, malditos!" (CD 3, agora CD 6 pelo +3).
            Rola 8 — sucesso. Mais 1 de dano. Seu bando avança coordenado. Klaus
            sente os músculos protestando.
            <br />
            <br />
            Terceira ativação: "Afiem as lâminas!" (CD 3, agora CD 9 pelo +6).
            Rola 7 — falha. 3 pontos de dano. Klaus cospe sangue, garganta
            rasgada de tanto gritar ordens. O poder não ativa. Seus homens não
            recebem o bônus.
            <br />
            <br />
            Total de dano: 5 pontos em três ativações. Klaus cambaleia,
            segurando o peito. "Não posso continuar assim," ele pensa, sabendo
            que provavelmente continuará.
          </MobileText>
        </div>
      </ActionSubsubsection>
    </ActionSubsection>
  );
};

export default PowerActionSection;
