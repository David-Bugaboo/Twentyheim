import CollapsibleSection from "../../../components/CollapsibleSection";
import MobileText from "../../../components/MobileText";

const MagicAndPowersSection = () => {
  return (
    <CollapsibleSection
      id="magias-e-poderes-fora-de-jogo"
      title="2. Magias e Poderes Fora de Jogo"
    >
      <MobileText className="mb-4">
        Nem toda magia é conjurada no calor da batalha. Algumas magias e poderes
        são rituais lentos, cuidadosos, realizados no silêncio relativo após a
        carnificina. Estas são as{" "}
        <strong>magias e poderes Fora de Jogo (D)</strong> — marcados com o
        designador <strong>(A)</strong> em suas descrições.
      </MobileText>

      <MobileText className="mb-3">
        <strong>Quando Podem Ser Usadas:</strong> Estas magias e poderes podem
        ser tentadas apenas <strong>após um jogo</strong>, durante esta fase da
        Fase de Campanha. O momento de calma (relativa) para trabalhos mais
        delicados ou extensos.
      </MobileText>

      <MobileText className="mb-3">
        <strong>Limitação de Uso:</strong> Os usuários dessas magias e poderes
        podem tentar usar cada uma apenas <strong>uma vez</strong> nesta fase.
        Uma tentativa. Um resultado. Acerte ou erre, mas não há segunda chance
        até o próximo jogo.
      </MobileText>

      <MobileText className="mb-3">
        <strong>Não Podem Ser Forçadas:</strong> Estas magias e poderes{" "}
        <strong>não podem ser Forçados</strong>. Você não pode gastar vida
        adicional para melhorar a rolagem. O ritual é o que é — sangue extra não
        ajuda quando você tem tempo para fazer direito.
      </MobileText>

      <MobileText className="mb-4">
        <strong>Sem Dano por Falha:</strong> Nenhum dano é tomado por falhar em
        usar estas magias ou poderes. O custo da falha é apenas tempo
        desperdiçado e oportunidade perdida. Pequeno consolo, mas melhor que
        sangrar.
      </MobileText>

      <div className="bg-[#2a1f1f] p-4 rounded-lg border border-[#382929] mb-6">
        <MobileText className="italic text-[#b89d9d]">
          Após a batalha, Maximilian retornou ao acampamento. Seus homens
          cuidavam dos feridos. Ele, por sua vez, abriu seu grimório e tentou
          "Alquimia" — uma magia que só pode ser usada depois do combate. Rolou
          14 contra CD 12. Sucesso. Sem dano tomado, sem forçar necessário.
          Apenas tempo, conhecimento, e as palavras certas. Um dos soldados
          gravemente feridos recebe uma poção recém preparada para se recuperar.
        </MobileText>
      </div>
    </CollapsibleSection>
  );
};

export default MagicAndPowersSection;
