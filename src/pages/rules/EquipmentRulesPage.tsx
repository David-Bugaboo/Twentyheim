import PageTitle from "../../components/PageTitle";
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";
import HeaderH1 from "../../components/HeaderH1";
import HeaderH2 from "../../components/HeaderH2";
import EquipmentCard from "../../components/EquipmentCard";
import WarningBox from "../../components/WarningBox";
import meleeWeapons from "../weapons and equipments/data/armas-corpo-a-corpo-refactor.json";
import armor from "../weapons and equipments/data/armaduras-e-escudos-refactor.json";
import accessories from "../weapons and equipments/data/acessorios-refactor.json";

function EquipmentRulesPage() {
  // Buscar a adaga real dos dados
  const daggerData = meleeWeapons
    .find((item) => item.id === "adaga");

  const armorData = armor
    .find((item) => item.id === "armadura-pesada");

  const torchData = accessories
    .find((item) => item.id === "tocha");

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <MobileSection>
            <PageTitle>Equipamentos</PageTitle>

            <MobileText>
              Em 20Heim, o equipamento é fundamental para a sobrevivência nas
              ruínas da cidade dos condenados. Cada figura pode carregar uma
              quantidade limitada de itens, e saber como usar esses equipamentos
              corretamente pode ser a diferença entre a vida e a morte na Cidade
              dos Condenados.
            </MobileText>

            <HeaderH1>Espaços de Item</HeaderH1>
            <MobileText>
              Hérois e Campeões tem 5 espaços de item. Soldados tem 4 espaços de
              item. Espaços de item representam quantas coisas uma miniatura
              pode carregar e não apenas armas e armaduras. Uma aljava por
              exemplo, gasta uma espaço de item assim como o arco para quem
              fornece flechas. Importante lembrar que equipamentos
              particularmente volumosos como armaduras pesadas e armas de duas
              mãos ocupam dois espaços de item, tornando importante pensar
              estratégicamente no que carregar. Por exemplo, um guerreiro
              carregando uma armadura pesada e uma arma de duas mãos ficaria
              efetivamente sem espaço para outros itens, como anéis ou amuletos
              mágicos.
            </MobileText>

            <WarningBox
              title="A Regra de Um: Limitações para items mágico"
              type="info"
            >
              Embora uma figura possa carregar mais de um tipo do mesmo item
              mágico (dois anéis ou duas espadas por exemplo), ela só pode se
              beneficia de um deles, e deve escolher no ínicio do jogo. Caso
              perca esse item, ou escolha descartá-lo (o item não pode ser
              recuperado até o fim do jogo) pode usar o efeito do outro. Um
              escudo conta como armadura, portando um escudo e armadura mágico
              não provem o beneficio de ambos se usados juntos. O mesmo vale
              para armas e quaisquer outros itens.
            </WarningBox>

            <HeaderH1>Armas</HeaderH1>
            <MobileText>
              São a forma mais segura de tirar um inimigo de circulação em
              mordheim. Elas vem nas mais diversas variedades e tipos,
              oferecendo bonus específicos e ocupando nichos estratégicos únicos
              para um guerreiro que as usem os atributos mais importantes de uma
              arma são:
            </MobileText>
            <HeaderH2>Atributos</HeaderH2>
            <MobileText>
              • <strong>Tipo:</strong> O tipo de arma, dentre corpo-a-corpo, a
              distância e de fogo.
              <br />• <strong>Modificador de Dano:</strong> Quanto dano a arma
              adiciona ou subtrai de um ataque desferido.
              <br />• <strong>Alcance Máximo:</strong> Para armas de distância.
              A distância máxima que a arma pode atingir.
              <br />• <strong>Exclusivo:</strong> Se o equipamento é exclusivo
              de alguma facção específica.
              <br />• <strong>Propriedades Especiais:</strong> Quaisquer
              propriedades especiais que a arma tenha, como Leve, Penetração de
              Armadura (X) e etcetera.
            </MobileText>

            <HeaderH2>Exemplo: Adaga</HeaderH2>
            <EquipmentCard
              name={daggerData?.name || null}
              type="Arma Corpo a Corpo"
              damageModifier={daggerData?.damageModifier || null}
              cost={daggerData?.purchaseCost || "primeira grátis/2 coroas"}
              spaces={daggerData?.slots || "1"}
              requirements={daggerData?.requirements || null}
              description={[daggerData?.flavorText || ""]}
              specialRules={daggerData?.specialRules || []}
            />
            <HeaderH1>Armaduras</HeaderH1>
            <MobileText>
              Qual a melhor forma de não levar uma punhalada em uma cidade onde
              todos estão tentando deslizar uma lamina entre suas costelas? Uma
              camada de gambenson e malha entre a ponta do punhal e sua pele,
              claro! Armaduras são a forma mais confiável de aumentar sua
              característica <strong>Resistência (T)</strong>. Todas as
              armaduras fornecem um bônus para T baseado na sua categoria,
              embora algumas ocupem mais espaços de equipamento e imponham
              penalidades a <strong>Movimento (M)</strong>.
            </MobileText>
            <HeaderH2>Atributos</HeaderH2>
            <MobileText>
              • <strong>Bônus de Armadura:</strong> O quanto a armadura aumenta
              a Resistência (T).
              <br />• <strong>Penalidade de Movimento:</strong> Quanto a
              característica Movimento(M) é penalizada.
              <br />• <strong>Propriedades Especiais:</strong> Quaisquer
              propriedades especiais que a arma tenha, como ocupar mais de um
              espaço de equipamento, fornecer resistência a tipos específicos e
              etcetera.
            </MobileText>

            <HeaderH2>Exemplo: Armadura Pesada</HeaderH2>
            <EquipmentCard
              name={armorData?.name || null}
              type="Armadura"
              damageModifier={armorData?.damageModifier || null}
              cost={armorData?.purchaseCost || "10 coroas"}
              spaces={armorData?.slots || "1"}
              armorBonus={armorData?.armorBonus}
              movePenalty={armorData?.movePenalty}
              requirements={armorData?.requirements || null}
              description={[armorData?.flavorText || ""]}
              specialRules={armorData?.specialRules || []}
            />

            <HeaderH1>Acessórios</HeaderH1>
            <MobileText>
              Armas e Armaduras são excelentes na hora de lutar, mas existem
              várias outras coisas importantes a se pensar en Mordheim. Portas a
              arrombar, escuridão a desbravar e algum lugar para carregar suas
              flechas. Essa é a função dos acessórios: Embora não pareçam
              extremamente uteis a principio, eles podem ser a diferença entre
              escapar de uma horda de zumbis subindo um cavalete portátil ou
              morrer com os ossos roídos em um beco. Escolha com sabedoria.
            </MobileText>

            <HeaderH2>Exemplo: Tocha</HeaderH2>
            <EquipmentCard
              name={torchData?.name || null}
              type="Acessório"
              damageModifier={torchData?.damageModifier || null}
              cost={torchData?.purchaseCost || "5 coroas"}
              spaces={torchData?.slots || "1"}
              requirements={torchData?.requirements || null}
              description={[torchData?.flavorText || ""]}
              specialRules={torchData?.specialRules || []}
            />

            <MobileText
              variant="quote"
              className="text-center text-lg leading-relaxed mt-8"
            >
              "Um mercenário bem equipado é um mercenário vivo. Nas ruínas de
              Mordheim, seu equipamento é sua única vantagem contra os horrores
              que espreitam nas sombras."
            </MobileText>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default EquipmentRulesPage;
