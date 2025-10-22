import React from "react";
import CollapsibleSection from "../../../components/CollapsibleSection";
import MobileText from "../../../components/MobileText";

const WarbandCreationSection: React.FC = () => {
  return (
    <CollapsibleSection id="criacao-de-bando" title="Criação de Bando">
      <MobileText>
        Então você deseja liderar almas condenadas pelas ruínas de Mordheim?
        Admirável… ou tolice. Antes de cruzar os portões rachados, todo capitão
        recebe uma bolsa com <strong>500 coroas de ouro</strong>. É o bastante
        para comprar esperança, armar desespero e — com sorte — sobreviver à
        primeira noite. Em Mordheim, cada coroa pesa tanto quanto sangue.
      </MobileText>

      <MobileText>
        Para novos capitães, o ideal é jogar alguns{" "}
        <strong>confrontos isolados</strong>
        antes de iniciar uma campanha. Partidas únicas ajudam a aprender o fluxo
        de turno, medir distâncias, entender coberturas e se acostumar com as
        rolagens. Quanto melhor você conhecer as regras, mais cruel — e
        divertida — será a Cidade dos Condenados.
      </MobileText>

      <MobileText>
        Mas a <strong>verdadeira diversão</strong> está nas{" "}
        <strong>campanhas</strong>: ver seu bando{" "}
        <strong>crescer em poder e reputação</strong>, equipar novas armas,
        conquistar <strong>Pedra‑bruxa</strong> e{" "}
        <strong>relíquias mágicas</strong>
        enquanto se embrenha pelos becos sombrios de Mordheim. É ali, entre
        vitórias e cicatrizes, que as lendas nascem.
      </MobileText>

      <MobileText variant="h3" className="mt-2">
        1) O Líder — Fardo e Maldição
      </MobileText>
      <MobileText>
        Todo bando precisa de um líder, o primeiro a enfrentar o perigo e,
        muitas vezes, o último a cair. Escolha seu <strong>bando</strong> na
        seção de Bandos; o herói inicial vem com sua ficha e instruções.
      </MobileText>
      <MobileText>
        • <strong>Equipamento do Herói</strong>: possui{" "}
        <strong>5 espaços</strong>. Selecione da lista permitida pelo bando —
        entre proteção e mobilidade, ataque e defesa, cada escolha cobra seu
        preço.
      </MobileText>
      <MobileText>
        • <strong>Poderes, magias e outros</strong>: Escolha os poderes, magias
        ou outro recurso para seu héroi de acordo com a quantidade e listas
        indicados na ficha.
      </MobileText>

      <MobileText variant="h3" className="mt-2">
        2) O Campeão — Luxo ou Necessidade?
      </MobileText>
      <MobileText>
        Tecnicamente opcional; praticamente essencial. Um campeão é seu braço
        direito e pode <strong>ativar soldados junto consigo</strong>,
        transformando desordem em força coordenada.
      </MobileText>
      <MobileText>
        • <strong>Custos</strong>: pague as coroas indicadas na ficha do
        campeão. Ele possui <strong>5 espaços</strong> de equipamento.
      </MobileText>
      <MobileText>
        • <strong>Poderes, magias e outros</strong>: Escolha os poderes, magias
        ou outro recurso para seu campeão de acordo com a quantidade e listas
        indicados na ficha.
      </MobileText>

      <MobileText variant="h3" className="mt-2">
        3) Os Soldados — Carne para o Moedor
      </MobileText>
      <MobileText>
        Recrute até <strong>8 soldados</strong> com o ouro restante. Alguns são
        veteranos, outros mal seguram uma lâmina sem se ferir. Cada soldado
        indica em sua ficha a quantidade máxima que pode existir no bando.
      </MobileText>
      <MobileText>
        • <strong>Custos</strong>: pague as coroas indicadas na ficha do
        soldado. Ele possui <strong>4 espaços</strong> de equipamento.
      </MobileText>

      <MobileText variant="h3" className="mt-2">
        4) Equipe seu Bando
      </MobileText>
      <MobileText>
        Compre equipamento na{" "}
        <a href="/common-items" className="text-[#d4af37] underline">
          página de Itens Comuns
        </a>{" "}
        e equipe cada <strong>soldado</strong>, <strong>herói</strong> ou
        <strong> campeão</strong> de acordo com os itens permitidos na
        <strong> ficha de cada unidade</strong>. Armas, armaduras e acessórios
        só podem ser escolhidos se forem listados como opções válidas. Distribua
        o arsenal com cuidado: quem atira precisa de munição e visão; quem
        avança precisa de proteção e aço.
      </MobileText>

      <div className="bg-[#2a1f1f] p-4 rounded-lg border border-[#382929] mb-4">
        <MobileText variant="heading" className="mb-1">
          Limite de Armadura
        </MobileText>
        <MobileText className="text-[#e7d9c0]">
          Uma figura, não importa quantos bônus e equipamentos que tenha, nunca
          pode ter mais de <strong>15 de Armadura</strong>, a não ser que um
          efeito específico diga o contrário. Esta é uma limitação fundamental
          do sistema — mesmo os guerreiros mais blindados têm pontos fracos que
          podem ser explorados.
        </MobileText>
      </div>

      <div className="bg-[#2a1f1f] p-4 rounded-lg border border-[#382929]">
        <MobileText variant="heading" className="mb-1">
          Espaços de Equipamento
        </MobileText>
        <MobileText className="text-[#e7d9c0]">
          Espaços de equipamento indicam quantos itens uma figura pode carregar.
          Uma figura só pode portar equipamentos enquanto tiver espaços
          disponíveis. Alguns itens ocupam mais de um espaço, enquanto outros —
          como adagas — não ocupam nenhum na primeira vez que são adicionados.
          Isso inclui itens mágicos e acessórios, como aljavas e similares.
          <br />
          Equipamento mágico segue uma pequena regra especial nesse sentido:
          Você só pode se aproveitar de efeitos de equipamento mágico ou
          reliquias de um tipo, mesmo que carregue vários. Dois anéis? Só
          ganhará bonus de um. Armadura e escudo mágicos? Escolha bem do que
          quer se beneficiar.
        </MobileText>
      </div>

      <MobileText
        variant="quote"
        className="text-center text-lg leading-relaxed"
      >
        Com as 500 coroas gastas e o bando reunido, resta apenas avançar. Que
        Sigmar tenha piedade — ou que Ranald ofereça sorte. Nas ruas
        destroçadas, você precisará de ambos.
      </MobileText>
    </CollapsibleSection>
  );
};

export default WarbandCreationSection;
