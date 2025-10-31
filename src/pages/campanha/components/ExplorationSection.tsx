import CollapsibleSection from "../../../components/CollapsibleSection";
import MobileText from "../../../components/MobileText";

const ExplorationSection = () => {
  return (
    <CollapsibleSection id="exploracao" title="3. Enviar Líderes">
      <MobileText className="mb-4">
        Heróis e campeões podem ser enviados para explorar as ruínas de
        Mordheim, Buscando mercadores de items raros, guerreiros experientes ou
        mais coroas e pedra bruxa.
      </MobileText>
      <MobileText className="mb-4">
        Cada guerreiro só pode ser enviado para uma dessas atividades de
        exploração, o que significa que o jogador pode fazer no máximo duas
        delas, ou repetir uma delas duas vezes. Escolha sabiamente!
      </MobileText>

      <MobileText variant="heading" className="mb-3">
        Explorar Ruinas
      </MobileText>
      <MobileText className="mb-3">
        O jogador pode enviar o Herói ou Campeão do seu bando para explorar as
        ruínas. Para cada um deles enviado, role 2d20 e compare as duas rolagens
        com a tabela na página <strong>Eventos de Exploração</strong>. Resolva o
        resultado do evento rolado antes de rolar do próximo guerreiro ou fazer
        outra atividade de exploração.
      </MobileText>

      <MobileText variant="heading" className="mb-3">
        Buscar no Mercado Negro
      </MobileText>
      <MobileText className="mb-3">
        O jogador pode enviar o Herói ou Campeão do seu bando para buscar items
        no mercado negro. Para cada um deles enviado, role 4 vezes na{" "}
        <strong>Tabela de Troca de Pedra-Bruxa</strong>, ignorando resultados de
        coroas e Mapa de Mordheim. Role nas subtabelas adequadas, e anote os
        items rolados. Voce pode comprar qualquer item rolado dessa forma pelo
        seu preço de compra. Se pelo menos um guerreiro for enviado para essa
        atividade, voce pode vender quaisquer itens comuns ou mágicos que o
        bando tenha pelo preço de venda.
      </MobileText>

      <MobileText variant="heading" className="mb-3">
        Buscar Guerreiros Experientes
      </MobileText>
      <MobileText className="mb-3">
        O jogador pode enviar o Herói ou Campeão do seu bando para procurar os
        serviços de mercenários experientes e até mesmo guerreiros lendários.
        Para cada um deles enviado, role uma vez na{" "}
        <strong>Tabela de Contratação de Guerreiros</strong>. Aquele guerreiro
        pode ser contratado pelo bando pelo seu custo de contratação e o upkeep
        do proximo jogo adiantado.
      </MobileText>
    </CollapsibleSection>
  );
};

export default ExplorationSection;
