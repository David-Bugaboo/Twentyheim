import PageTitle from "../../components/PageTitle";
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";
import HeaderH1 from "../../components/HeaderH1";
import HeaderH2 from "../../components/HeaderH2";
import HeaderH3 from "../../components/HeaderH3";
import CornerDecoration from "../../components/CornerDecoration";

function AdvancementsPage() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <CornerDecoration />
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <MobileSection>
            <PageTitle>Avanços e Habilidades</PageTitle>

            <MobileText>
              Quando uma figura acumula experiência suficiente, ela pode avançar de nível, ganhando novas habilidades ou aumentando suas características. Este é o coração do crescimento do seu bando.
            </MobileText>

            <HeaderH1>Como Avançar</HeaderH1>

            <HeaderH2>Experiência Necessária</HeaderH2>
            <MobileText>
              • <strong>Novato → Veterano:</strong> 5 XP
              <br />• <strong>Veterano → Experiente:</strong> 10 XP
              <br />• <strong>Experiente → Mestre:</strong> 15 XP
              <br />• <strong>Mestre → Lenda:</strong> 20 XP
            </MobileText>

            <HeaderH2>Tipos de Avanços</HeaderH2>
            <MobileText>
              • <strong>Aumento de Característica:</strong> +1 em uma característica
              <br />• <strong>Nova Habilidade:</strong> Aprende uma habilidade especial
              <br />• <strong>Habilidade Dupla:</strong> Aprende duas habilidades básicas
              <br />• <strong>Especialização:</strong> Melhora uma habilidade existente
            </MobileText>

            <HeaderH1>Opções de Avanço</HeaderH1>

            <HeaderH2>Aumentos de Características</HeaderH2>
            <MobileText>
              • <strong>Movimento:</strong> +1cm de movimento
              <br />• <strong>Combate:</strong> +1 Ímpeto
              <br />• <strong>Precisão:</strong> +1 Precisão
              <br />• <strong>Armadura:</strong> +1 Armadura
              <br />• <strong>Vontade:</strong> +1 Vontade
              <br />• <strong>Vida:</strong> +1 ponto de vida
            </MobileText>

            <HeaderH2>Habilidades de Combate</HeaderH2>
            <MobileText>
              • <strong>Golpe Poderoso:</strong> +1 dano em ataques corpo a corpo
              <br />• <strong>Tiro Preciso:</strong> +1 dano em ataques à distância
              <br />• <strong>Esquiva:</strong> +1 Armadura contra ataques à distância
              <br />• <strong>Resistência:</strong> +1 Armadura contra ataques corpo a corpo
            </MobileText>

            <HeaderH2>Habilidades Especiais</HeaderH2>
            <MobileText>
              • <strong>Liderança:</strong> Aliados próximos ganham +1 Vontade
              <br />• <strong>Furtividade:</strong> Pode se mover sem ser detectado
              <br />• <strong>Percepção:</strong> Detecta armadilhas e inimigos ocultos
              <br />• <strong>Primeiros Socorros:</strong> Pode curar aliados feridos
            </MobileText>

            <HeaderH1>Restrições de Avanço</HeaderH1>

            <HeaderH2>Limitações por Tipo</HeaderH2>
            <MobileText>
              • <strong>Heróis:</strong> Podem escolher qualquer avanço
              <br />• <strong>Campeões:</strong> Limitados a certos tipos de avanços
              <br />• <strong>Soldados:</strong> Apenas aumentos básicos de características
              <br />• <strong>Mercenários:</strong> Não podem avançar
            </MobileText>

            <HeaderH2>Limitações por Característica</HeaderH2>
            <MobileText>
              • <strong>Máximo por Característica:</strong> +3 aumentos
              <br />• <strong>Máximo de Habilidades:</strong> 3 por figura
              <br />• <strong>Especializações:</strong> Apenas 1 por habilidade
            </MobileText>

            <HeaderH1>Estratégias de Avanço</HeaderH1>

            <HeaderH2>Foco em Combate</HeaderH2>
            <MobileText>
              • <strong>Guerreiros:</strong> Foque em Ímpeto e habilidades de combate
              <br />• <strong>Arqueiros:</strong> Foque em Precisão e habilidades de tiro
              <br />• <strong>Tankers:</strong> Foque em Armadura e Vida
            </MobileText>

            <HeaderH2>Foco em Suporte</HeaderH2>
            <MobileText>
              • <strong>Líderes:</strong> Foque em Vontade e habilidades de liderança
              <br />• <strong>Batedores:</strong> Foque em Movimento e furtividade
              <br />• <strong>Médicos:</strong> Foque em habilidades de cura
            </MobileText>

            <HeaderH1>Habilidades Únicas</HeaderH1>

            <HeaderH2>Habilidades de Classe</HeaderH2>
            <MobileText>
              • <strong>Guerreiro:</strong> Golpe Devastador, Resistência Férrea
              <br />• <strong>Arqueiro:</strong> Tiro Preciso, Olho de Águia
              <br />• <strong>Mago:</strong> Magia Potente, Resistência Mágica
              <br />• <strong>Sacerdote:</strong> Cura Divina, Proteção Sagrada
            </MobileText>

            <HeaderH2>Habilidades Raras</HeaderH2>
            <MobileText>
              • <strong>Liderança Natural:</strong> Aliados ganham +2 Vontade
              <br />• <strong>Instinto de Sobrevivência:</strong> +2 Armadura contra ataques surpresa
              <br />• <strong>Mestre de Armas:</strong> Pode usar qualquer arma sem penalidade
              <br />• <strong>Resistência Sobrenatural:</strong> Imune a efeitos mentais
            </MobileText>

            <HeaderH1>Exemplo de Avanço</HeaderH1>
            <MobileText className="italic text-[#c4a870]">
              João, um Guerreiro, acumulou 5 XP e pode avançar de Novato para Veterano. Ele escolhe aumentar seu Ímpeto de +3 para +4, tornando-o mais letal em combate. Na próxima batalha, ele será mais eficaz em derrotar inimigos.
            </MobileText>

            <HeaderH1>Dicas Importantes</HeaderH1>
            <MobileText>
              • <strong>Planejamento:</strong> Pense em como cada avanço se encaixa na estratégia do bando
              <br />• <strong>Equilíbrio:</strong> Não foque apenas em uma característica
              <br />• <strong>Sinergia:</strong> Habilidades que funcionam bem juntas
              <br />• <strong>Adaptação:</strong> Ajuste os avanços baseado nos desafios enfrentados
            </MobileText>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default AdvancementsPage;
