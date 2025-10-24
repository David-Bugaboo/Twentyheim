import CollapsibleSection from "../../../components/CollapsibleSection";
import MobileText from "../../../components/MobileText";

const SpendingTreasureSection = () => {
  return (
    <CollapsibleSection id="gastar-tesouro" title="6. Gastar Coroas">
      <MobileText className="mb-4">
        Ouro ganho. Itens adquiridos. Agora vem a parte onde o suado dinheiro —
        comprado com sangue, suor e provável traição — é investido de volta no
        bando. Cada coroa gasta é uma aposta no futuro. Recrutar mais homens?
        Melhorar a base? Comprar aquele amuleto suspeito do mercador ainda mais
        suspeito? Escolhas. Sempre escolhas. E em Mordheim, escolhas erradas
        matam tão certeiro quanto lâminas.
      </MobileText>

      {/* Contratar Recrutas */}
      <MobileText variant="heading" className="">
        Contratar Recrutas
      </MobileText>

      <MobileText className="mb-2">
        Substitua os mortos. Reforce os números. Cada soldado tem seu custo
        listado na ficha do bando. Pague as coroas, adicione o nome à lista, e
        reze para que este dure mais que o último. Lembre-se: você pode ter no
        máximo 8 soldados. Novos soldados são adicionados no nivel 1, e voce
        deve comprar seu equipamento como normal. Carne é barata. Carne treinada
        e aço, nem tanto.
      </MobileText>

      {/* Contratar Novo Campeão */}
      <MobileText variant="heading" className="">
        Contratar um Novo Campeão
      </MobileText>

      <MobileText className="mb-2">
        Se seu campeão caiu (permanentemente, não apenas temporariamente
        ferido), você pode contratar um substituto. Pague o custo listado na
        ficha do bando.
      </MobileText>

      <MobileText className="mb-2">
        <strong>Líderes Experientes Atraem Asseclas Experientes:</strong> Um
        campeão recém-contratado entra no bando com o{" "}
        <strong>nível do Herói ÷ 3</strong> (arredondado para baixo). Um herói
        lendário atrai veteranos, não novatos. O jogador então faz os{" "}
        <strong>avanços apropriados</strong> para cada nível além do 1, mas não
        pode pegar o mesmo avanço mais que duas vezes nesse processo. Depois,
        escolha os poderes ou magia como indicados na ficha e compre os
        equipamentos adequados.
      </MobileText>

      {/* Requisitar Novo Herói */}
      <MobileText variant="heading" className="">
        Requisitar Novo Herói
      </MobileText>

      <MobileText className="mb-2">
        O impensável aconteceu. Seu herói morreu. O líder caiu. O bando está sem
        cabeça, cambaleando no limite da dissolução. Mas há uma última chance:
        requisitar um novo herói.
      </MobileText>

      <MobileText className="mb-2">
        O jogador simplesmente ganha um{" "}
        <strong>novo herói no mesmo nível do anterior</strong>. Legados atraem
        sucessores. Então escolha os poderes ou magia como indicados na ficha e
        compre os equipamentos adequados. Faça os{" "}
        <strong>avanços apropriados</strong> para cada nível além do 1, mas não
        pode pegar o mesmo avanço mais de duas vezes nesse processo.
      </MobileText>

      <MobileText className="mb-2">
        <strong>Começando do Zero:</strong> O novo herói{" "}
        <strong>não tem os itens</strong> do anterior — esses foram perdidos com
        o corpo, roubados, ou simplesmente desapareceram no caos. Também não
        possui quaisquer <strong>bônus narrativos</strong> ganhos pelo antigo
        herói através de eventos ou recompensas especiais. Ele tem apenas nível,
        atributos, e as escolhas que você faz agora.
      </MobileText>

      <MobileText className="mb-4">
        É um recomeço. Não tão devastador quanto perder tudo, mas doloroso o
        suficiente. Em Mordheim, até vitórias custam caro. E reze para nunca
        precisar usar essa regra.
      </MobileText>

      {/* Deserção Total */}
      <div className="bg-[#2a1f1f] p-4 rounded-lg border border-[#382929] mb-4">
        <MobileText variant="heading" className="mb-3 text-[#d4af37]">
          Deserção Total — Quando Tudo Desmorona
        </MobileText>

        <MobileText className="mb-2">
          Se <strong>herói e campeão morrerem</strong> no mesmo jogo, a
          liderança colapsa completamente.{" "}
          <strong>Todos os soldados debandam</strong>. Sem líderes para seguir,
          sem pagamento garantido, sem razão para ficar — eles simplesmente vão
          embora na calada da noite.
        </MobileText>

        <MobileText className="mb-2">
          O novo herói fica <strong>sem soldados</strong>, devendo recontratar
          com as coroas que o bando ainda possui no tesouro. Começar do nível
          anterior ajuda, mas começar sozinho... não tanto.
        </MobileText>

        <MobileText>
          <strong>Desertores Levam Tudo:</strong> Soldados desertores levam os{" "}
          <strong>itens mágicos</strong> que carregavam. Relíquias, armas
          encantadas, poções raras — tudo desaparece com eles nas sombras.
          Lealdade tem limites. E quando ambos os líderes caem, esse limite foi
          atingido.
        </MobileText>
      </div>

      {/* Comprar Itens Mágicos */}
      <MobileText variant="heading" className="">
        Comprar Itens Mágicos
      </MobileText>

      <MobileText className="mb-2">
        Mercadores sombrios vendem mais que Pedra-bruxa. Relíquias antigas.
        Armas encantadas. Poções de efeitos duvidosos. Se você tem coroas
        suficientes e contatos suficientemente suspeitos, pode negociar com
        eles.
      </MobileText>

      <MobileText className="mb-2">
        <div className="mt-2">
          O jogador pode comprar os itens rolados em uma atividade de exploração{" "}
          <strong>Explorar o Mercado Negro</strong> pelo seu preço de compra
          listado. O jogador também pode vender quaisquer items mágicos ou
          comuns de seu bando pelo seu preço de venda listado.
        </div>
      </MobileText>

      {/* Rearmar */}
      <MobileText variant="heading" className="">
        Rearmar
      </MobileText>

      <MobileText className="mb-4">
        O bando pode comprar quaisquer quantidade de items comuns, limitados
        apenas por quantas coroas possuem e quantos soldados para carregar.
      </MobileText>

      {/* Expandir Base */}
      <MobileText variant="heading" className="">
        Expandir Base
      </MobileText>

      <MobileText className="mb-2">
        Todo bando precisa de refúgio. Algum lugar para dormir entre as
        expedições, guardar tesouros, e esconder-se dos outros bandos igualmente
        desesperados. Se você tem uma base, pode investi-la para torná-la
        melhor.
      </MobileText>

      <MobileText className="mb-2">
        O jogador pode comprar uma <strong>expansão de base</strong> por Fase de
        Campanha jogo. Apenas uma — construção leva tempo, mesmo em Mordheim.
        Gaste as coroas, adicione a estrutura, ganhe os benefícios.
      </MobileText>

      <MobileText>
        <strong>Restrição de Mudança:</strong> Você{" "}
        <strong>não pode comprar uma expansão</strong> se tiver acabado de se
        mudar para a base na Fase de Campanha. Mal desempacotou as malas e
        já quer reformar? Paciência. Primeiro se estabeleça. Depois construa.
        Consulte as regras de Base e Melhorias para custos e benefícios
        específicos.
      </MobileText>
    </CollapsibleSection>
  );
};

export default SpendingTreasureSection;
