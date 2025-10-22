import MobileText from "../../../components/MobileText";
import ActionSubsection from "./ActionSubsection";
import ActionSubsubsection from "./ActionSubsubsection";

const SpellcastingActionSection = () => {
  return (
    <ActionSubsection title="Ação de Conjuração" color="#9b59b6">
      <MobileText className="mb-4">
        Brincando com os ventos do Caos. Canalizando poder que deveria
        permanecer adormecido. Algumas almas tolas ou desesperadas possuem o dom
        — ou maldição — da magia. E em Mordheim, onde a Pedra-bruxa contamina
        cada pedra, esse poder é ainda mais perigoso... e tentador.
      </MobileText>

      <ActionSubsubsection title="A Conjuração">
        <MobileText className="mb-3">
          Essa ação não pode ser usada se a figura estiver usando armadura ou
          escudo. Uma figura capaz de conjurar magias escolhe uma de suas magias
          conhecidas. Ela então rola um <strong>d20</strong> — a rolagem de
          conjuração. Este único número determina se ela canaliza poder arcano
          ou abraça o desastre.
        </MobileText>
        <MobileText className="mb-3">
          A figura deve rolar <strong>mais</strong> que a{" "}
          <strong>Classe de Dificuldade (CD)</strong> da magia. Se o fizer, a
          magia é conjurada com sucesso — poder flui, realidade se curva, o
          impossível se manifesta. Se falhar... bem, aí é que as coisas ficam
          interessantes.
        </MobileText>
        <MobileText className="mb-4">
          <strong>Consequências da Falha:</strong> Cada tradição mágica tem suas
          próprias consequências por falhar. Magos arcanos arriscam a corrupção
          do Caos. Sacerdotes podem sofrer a ira de seus deuses. Necromantes...
          necromantes aprendem que os mortos não perdoam facilmente. Cheque as
          consequências específicas na descrição da tradição mágica que está
          sendo utilizada.
        </MobileText>
        <div className="bg-[#2a1f1f] p-4 rounded-lg border border-[#382929] mb-6">
          <MobileText variant="heading" className="mb-3">
            Forçar — Sangue pelo Poder
          </MobileText>

          <MobileText className="mb-3">
            Às vezes, a magia não vem facilmente. Às vezes, os ventos não sopram
            na direção que você precisa. E às vezes, a única opção é{" "}
            <strong>forçar</strong> — sacrificar a sua própria vida como canal
            arcano.
          </MobileText>

          <MobileText className="mb-3">
            <strong>Forçar:</strong> Aumente a rolagem de conjuração em{" "}
            <strong>+1 para cada 1 ponto de vida gasto</strong>. Você pode
            gastar quantos pontos quiser, transformando sua própria vitalidade
            em poder arcano.
          </MobileText>

          <MobileText className="mb-3">
            <strong>Limite do Forçar:</strong> Forçar{" "}
            <strong>nunca pode fazer</strong> uma rolagem de conjuração ser{" "}
            <strong>maior que 18</strong>. Há um limite para quanto poder o
            corpo mortal pode canalizar, não importa quanto sangue você ofereça.
            Alguns tolos tentaram ultrapassar este limite. Seus corpos
            retorcidos ainda decoram certas ruínas, avisos silenciosos de
            ambição além da capacidade.
          </MobileText>

          <MobileText className="mb-3">
            Uma barganha que os desesperados fazem... e que os mortos lamentam.
          </MobileText>

          <div className="bg-[#2a1f1f] p-4 rounded-lg border border-[#382929]">
            <MobileText className="italic text-[#a89968] mb-0">
              Bergson von Blutgarn rolou 12 para conjurar Bola de Fogo (CD 14).
              Falhou por 2. Mas ele não podia falhar — não agora, não com o
              cultista avançado enquanto espuma pela boca. Ele{" "}
              <strong>Forçou</strong> gastando 3 pontos de vida. Sua rolagem
              subiu para 15. Sucesso. A bola de fogo explodiu, consumindo o
              miserável. O aprendiz caiu de joelhos, pálido, sangrando pelo
              nariz. Mas vivo. Às vezes, o preço vale a pena.
            </MobileText>
          </div>
        </div>
        <div className="bg-[#2a1f1f] p-4 rounded-lg border border-[#382929] mb-6">
          <MobileText variant="heading" className="mb-3">
            Exemplo: Mago da Luz vs As Sombras
          </MobileText>

          <div className="bg-[#2a1f1f] p-4 rounded-lg border border-[#382929] mb-3">
            <MobileText className="italic text-[#a89968] mb-3">
              Maximilian levantou seu cajado, palavras de poder formando-se em
              seus lábios. A escuridão de Mordheim pressionava contra ele, mas
              ele conhecia a luz. "Vade Retro, Cramunhão!", ele declarou,
              conjurando contra o demônio à sua frente. CD 16 — não era fácil.
            </MobileText>

            <MobileText className="italic text-[#a89968] mb-3">
              <strong>Maximilian rola:</strong> d20 = 17
              <br />
              <em style={{ color: "#a89968" }}>
                Sucesso. Por um fio. Mas sucesso.
              </em>
            </MobileText>

            <MobileText className="italic text-[#a89968] mb-3">
              Luz sagrada explode do cajado, envolvendo o demônio em chamas
              purificadoras. A criatura grita — um som que não deveria existir
              neste mundo. O feitiço funciona conforme descrito na tradição da
              Luz.
            </MobileText>

            <MobileText className="italic text-[#a89968] mb-0">
              Maximilian respira fundo, suor escorrendo por seu rosto. Por
              pouco. Se tivesse rolado 16 ou menos... bem, melhor não pensar
              nisso. Em Mordheim, cada conjuração é um jogo com a morte. E a
              morte nunca esquece os apostadores.
            </MobileText>
          </div>
        </div>
      </ActionSubsubsection>
    </ActionSubsection>
  );
};

export default SpellcastingActionSection;
