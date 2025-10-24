import MobileLayout from "../../components/MobileLayout";
import MobileSection from "../../components/MobileSection";
import HeaderH1 from "../../components/HeaderH1";
import MobileText from "../../components/MobileText";
import CollapsibleSection from "../../components/CollapsibleSection";
import GenericTable from "../../components/GenericTable";

function SpecialRulesPage() {
  return (
    <MobileLayout title="Regras Especiais" backButtonPath="/rules">
      <br />
      <div className="space-y-6">
        <MobileSection id="animosidade">
          <HeaderH1 id="animosidade">Animosidade</HeaderH1>
          <MobileText>
            Orcs e Goblins não gostam de nada mais que uma boa briga, a ponto de
            não ligar muito pra quem caem na porrada! No início de cada turno,
            role um dado para cada figura com a regra Animosidade. Um resultado
            de 1-5 significa que o guerreiro se ofendeu com algo que um de seus
            colegas de bando fez ou disse. Não role para modelos que estão em
            combate corpo a corpo (eles já estão brigando!).
          </MobileText>
          <MobileText>
            Para descobrir o quão ofendido o modelo está, role outro dado e
            consulte a tabela a seguir para ver o que acontece:
          </MobileText>

          <CollapsibleSection title="Tabela de Animosidade">
            <GenericTable
              data={[
                {
                  Resultado: "1-5",
                  Ação: "TÔ OUVINDO VIU, ARROMBADO!",
                  Descrição:
                    "O guerreiro decide que a figura aliada Orc ou Goblin mais próximo insultou sua linhagem ou higiene pessoal e deve pagar o preço! Se houver uma figura aliada Orc ou Goblin no alcance, o guerreiro ofendido irá imediatamente declarar carga e lutar uma rodada de combate corpo a corpo contra a fonte de sua ira. Se não houver alvos ao alcance e o guerreiro estiver armado com arma a distância, ele atira no amigo mais próximo. Caso contrário, ele se comporta como se tivesse rolado 6-15.",
                },
                {
                  Resultado: "6-15",
                  Ação: "É O QUE, GALINHA?",
                  Descrição:
                    "O guerreiro tem certeza de que ouviu um som ofensivo do Orc ou Goblin amigo mais próximo, ele perde sua ativação xingando seu ofensor.",
                },
                {
                  Resultado: "16-20",
                  Ação: "TU ACHA QUE É O BONZÃO,CARAI?!",
                  Descrição:
                    "A figura imagina que seus companheiros estão rindo dele, e decidiu mostrar quem é o bonzão. Este modelo ganha uma ação extra que deve ser um movimento o mais rápido possível em direção ao modelo inimigo mais próximo, declarando carga se possível. A figura ainda pode usar uma ação de disparada com uma de suas duas ações normais.",
                },
              ]}
            />
          </CollapsibleSection>
        </MobileSection>
      </div>
    </MobileLayout>
  );
}

export default SpecialRulesPage;
