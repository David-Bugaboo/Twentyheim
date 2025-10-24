import PageTitle from "../../components/PageTitle";
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";
import HeaderH1 from "../../components/HeaderH1";
import WarningBox from "../../components/WarningBox";
import QuickNavigation from "../../components/QuickNavigation";

function SpellcastingActionsPage() {
  const navigationSections = [
    { id: "intro", title: "Ações de Conjuração", level: 0 },
    { id: "conjuracao", title: "A Conjuração", level: 0 },
    { id: "forcar", title: "Forçar — Sangue pelo Poder", level: 1 },
    { id: "resumo", title: "Resumo das Ações de Conjuração", level: 1 },
  ];

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <QuickNavigation sections={navigationSections} />
          <MobileSection>
            <div id="intro">
              <PageTitle>Ações de Conjuração</PageTitle>
            </div>

            <MobileText>
              Brincando com os ventos do Caos. Canalizando poder que deveria
              permanecer adormecido. Algumas almas tolas ou desesperadas possuem
              o dom — ou maldição — da magia. E em Mordheim, onde a Pedra-bruxa
              contamina cada pedra, esse poder é ainda mais perigoso... e
              tentador.
            </MobileText>

            <div id="restricao-combate">
              <WarningBox title="Restrição: Figuras em Combate" type="warning">
                <MobileText>
                  <strong>
                    Uma figura em combate não pode usar uma ação de conjuração
                  </strong>{" "}
                  . Ela está ocupada demais lutando por sua vida para fazer os
                  complexos encantamentos necessários para conjurar. Exceto por
                  sacerdotes, que podem proferir sua fé enquanto batalham.
                </MobileText>
              </WarningBox>
            </div>

            <div id="conjuracao">
              <HeaderH1>A Conjuração</HeaderH1>
            </div>
            <MobileText>
              Essa ação não pode ser usada se a figura estiver usando armadura
              ou escudo, ou estiver em combate. Uma figura capaz de conjurar
              magias escolhe uma de suas magias conhecidas. Ela então rola um{" "}
              <strong>d20</strong> — a rolagem de conjuração. Este único número
              determina se ela canaliza poder arcano ou abraça o desastre,
              Embora algumas habilidades e relíquias possam adicionar bônus e
              penalidades à rolagem de conjuração.
            </MobileText>
            <MobileText>
              A figura deve rolar <strong>maior ou igual</strong> que a{" "}
              <strong>Classe de Dificuldade (CD)</strong> da magia. Se o fizer,
              a magia é conjurada com sucesso — poder flui, realidade se curva,
              o impossível se manifesta. Se falhar... bem, aí é que as coisas
              ficam interessantes.
            </MobileText>
            <MobileText>
              <strong>Consequências da Falha:</strong> Cada tradição mágica tem
              suas próprias consequências por falhar. Magos arcanos arriscam a
              corrupção do Caos. Sacerdotes podem sofrer a ira de seus deuses.
              Necromantes... necromantes aprendem que os mortos não perdoam
              facilmente. Cheque as consequências específicas na descrição da
              tradição mágica que está sendo utilizada.
            </MobileText>

            <div id="forcar">
              <WarningBox title="Forçar — Sangue pelo Poder" type="warning">
                <MobileText>
                  Às vezes, a magia não vem facilmente. Às vezes, os ventos não
                  sopram na direção que você precisa. E às vezes, a única opção
                  é <strong>forçar</strong> — sacrificar a sua própria vida como
                  canal arcano.
                </MobileText>

                <MobileText>
                  <strong>Forçar:</strong> Aumente a rolagem de conjuração em{" "}
                  <strong>+1 para cada 1 ponto de vida gasto</strong>. Você pode
                  gastar quantos pontos quiser, transformando sua própria
                  vitalidade em poder arcano.
                </MobileText>

                <MobileText>
                  <strong>Quando Forçar:</strong> Uma figura pode forçar{" "}
                  <strong>mesmo depois de já ter rolado</strong> o d20, e{" "}
                  <strong>mesmo se a rolagem tiver tido sucesso</strong>. Isso
                  permite tornar o efeito mais difícil de resistir, aumentar a
                  potência da magia, ou garantir que um feitiço crucial não
                  falhe. O sangue sempre tem um preço, mas às vezes vale a pena
                  pagá-lo.
                </MobileText>

                <MobileText>
                  <strong>Limite do Forçar:</strong> Forçar{" "}
                  <strong>nunca pode fazer</strong> uma rolagem de conjuração
                  ser <strong>maior que 18</strong>. Há um limite para quanto
                  poder o corpo mortal pode canalizar, não importa quanto sangue
                  você ofereça. Alguns tolos tentaram ultrapassar este limite.
                  Seus corpos retorcidos ainda decoram certas ruínas, avisos
                  silenciosos de ambição além da capacidade.
                </MobileText>
              </WarningBox>
            </div>

            <div id="resumo">
              <WarningBox title="Resumo das Ações de Conjuração" type="info">
                <MobileText>
                  • <strong>Restrições:</strong> Não pode usar armadura ou
                  escudo
                </MobileText>
                <MobileText>
                  • <strong>Rolagem:</strong> d20 contra CD da magia, a rolagem
                  de conjuração
                </MobileText>
                <MobileText>
                  • <strong>Sucesso:</strong> Rolagem de Conjuração {">="} CD =
                  magia conjurada
                </MobileText>
                <MobileText>
                  • <strong>Falha:</strong> Rolagem de Conjuração {"<"} CD =
                  consequências da tradição
                </MobileText>
                <MobileText>
                  • <strong>Forçar:</strong> +1 por ponto de vida gasto (máximo
                  18)
                </MobileText>
                <MobileText>
                  • <strong>Consequências:</strong> Varia por tradição mágica
                </MobileText>
              </WarningBox>
            </div>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default SpellcastingActionsPage;
