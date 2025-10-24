import MobileText from "../../../components/MobileText";
import ActionSubsection from "./ActionSubsection";


const OtherActionsSection = () => {
  return (
    <>
      <ActionSubsection title="Ação de Usar Item" color="#8e44ad">
        <MobileText className="mb-4">
          Remédios preparadas em alambiques esquecidos podem salvar vidas... ou
          destruí-las espetacularmente.
        </MobileText>
        <MobileText className="mb-4">
          Alguns <strong>itens mágicos e poções</strong> especificam que
          precisam de ações para serem bebidos, ativados ou utilizados. Esta é a
          ação usada para tal fim. Simples, direto, e frequentemente a diferença
          entre vida e morte.
        </MobileText>
        <MobileText className="mb-4">
          Consulte a descrição específica do item para saber seus efeitos,
          duração, e quaisquer consequências de uso. Alguns itens são puramente
          benignos. Outros... bem, em Mordheim, até as curas podem ter preço.
        </MobileText>
        <div className="bg-[#2a1f1f] p-4 rounded-lg border border-[#382929] mb-6">
          <MobileText variant="heading" className="mb-3">
            Exemplo: Poção do Desespero
          </MobileText>

          <MobileText className="italic text-[#a89968] mb-3">
            Klaus estava sangrando. Muito. O corte do cutelo orc havia atingido
            fundo — apenas 4 pontos de vida restantes. Ele enfiou a mão no cinto
            e puxou a poção que comprou na taverna: "Lágrimas de Shallya", o
            vendedor dissera. Cheirava a ervas mortas e esperança falsa.
          </MobileText>

          <MobileText className="italic text-[#a89968] mb-3">
            Klaus gastou uma ação para beber. O líquido queimou sua garganta.
            Depois, calor — a ferida parou de sangrar, a dor diminuiu. Recuperou
            5 pontos de vida. Não era milagre, mas em Mordheim, você aceita o
            que pode conseguir.
          </MobileText>

          <MobileText className="italic text-[#a89968]">
            "Valeu cada coroa," Klaus murmurou, jogando o frasco vazio nos
            escombros. Então pegou sua espada novamente. O orc ainda estava lá.
            E Klaus, agora, tinha vida suficiente para outro round. Às vezes, a
            alquimia funciona.
          </MobileText>
        </div>
      </ActionSubsection>

      <ActionSubsection title="Ações Especiais" color="#34495e">
        <MobileText className="mb-4">
          Nem toda ação se encaixa perfeitamente nas categorias acima. Algumas
          figuras possuem truques únicos, técnicas especializadas, ou
          habilidades que desafiam a normalidade. Estas são as{" "}
          <strong>ações especiais</strong> — capacidades únicas concedidas por
          habilidades, traits, magias ou equipamentos específicos.
        </MobileText>
        <MobileText className="mb-4">
          <strong>Ações Definidas por Habilidades:</strong> Quando uma
          habilidade, trait ou item concede uma "ação especial", ela especifica
          exatamente o que pode ser feito, quando pode ser usado, e quais seus
          efeitos. Estas ações seguem suas próprias regras, escritas em suas
          descrições.
        </MobileText>
        <MobileText className="mb-4">
          Algumas ações especiais substituem ações normais (como movimento ou
          tiro). Outras são completamente únicas. Sempre leia a descrição
          completa — em Mordheim, os detalhes matam.
        </MobileText>
        <div className="bg-[#2a1f1f] p-4 rounded-lg border border-[#382929] mb-6">
          <MobileText variant="heading" className="mb-3">
            Exemplo: Ação de Mirar do Skink Zarabataneiro
          </MobileText>

          <MobileText className="italic text-[#a89968] mb-3">
            Tik-Taq, o Lagarto Atirador, espreitava nas sombras, sua zarabatana
            firmemente segura. O cultista estava a 40 cm — alcance perfeito, mas
            o alvo se movia entre os escombros. Tik-Taq não era apressado.
            Lagartos nunca são.
          </MobileText>

          <MobileText className="italic text-[#a89968] mb-3">
            Ele usou sua primeira ação para <strong>Mirar</strong> — uma ação
            especial concedida por sua habilidade de zarabataneiro. Respiração
            controlada. Foco absoluto. Cálculo da distância, vento, e o
            movimento do alvo. Quando sua segunda ação veio, ele disparou{" "}
            <strong>Ignorando terrenos entre ele e o alvo</strong> .
          </MobileText>

          <MobileText className="italic text-[#a89968]">
            O dardo envenenado voou. Silencioso. Certeiro. O cultista caiu antes
            mesmo de saber que estava morto. Tik-Taq assentiu para si mesmo.
            Paciência, como sempre, vence pressa. Os sangue-quente nunca
            entendem isso.
          </MobileText>
        </div>
      </ActionSubsection>
    </>
  );
};

export default OtherActionsSection;
