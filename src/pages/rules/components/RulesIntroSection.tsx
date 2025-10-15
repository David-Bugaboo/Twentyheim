import React from "react";
import CollapsibleSection from "../../../components/CollapsibleSection";
import MobileText from "../../../components/MobileText";

const RulesIntroSection: React.FC = () => {
  return (
    <CollapsibleSection id="introducao" title="Introdução">
      <div className="bg-[#2a1f1f] p-4 rounded-lg border border-[#382929]">
        <MobileText variant="quote" className="text-center">
          "Welcome to Mordheim, City of the Damned!"
        </MobileText>
        <MobileText variant="small" className="text-center mt-2 text-[#b89d9d]">
          — Registro apócrifo encontrado nas ruínas do Distrito do Mercado
        </MobileText>
      </div>

      <MobileText>
        Mordheim é a cidade onde a esperança se perde nas sombras e a ambição é
        paga em sangue. Aqui, entre torres quebradas e becos onde a luz teme
        entrar, bandos rivais se enfrentam por pedaços da Pedra‑bruxa — a
        amaldiçoada wyrdstone — prometendo riqueza, poder e uma morte rápida a
        quem ousar tocá‑la. Este jogo retrata esse curto e brutal período no
        qual incontáveis escaramuças incendiaram as ruas, e cada encruzilhada se
        tornou um campo de batalha.
      </MobileText>

      <MobileText>
        Esta é uma experiência de caça, coragem e desespero. Você conduzirá um
        bando através da Cidade dos Condenados, buscando glória… e descobrindo,
        muitas vezes, apenas o gosto metálico do arrependimento.
      </MobileText>

      <MobileText variant="heading" className="mt-2">
        O que preciso para jogar
      </MobileText>
      <MobileText>
        • Pelo menos um <strong>dado de 20 lados</strong> (1d20), fácil de
        encontrar em lojas de RPG, eventos e na internet.
      </MobileText>
      <MobileText>
        • Uma <strong>trena</strong> para medir distâncias — as ruas de Mordheim
        exigem precisão.
      </MobileText>
      <MobileText>
        • <strong>Miniaturas</strong> que representem seu bando: impressão 3D,
        plástico, metal, bases de papel — tudo vale, contanto que sejam
        tridimensionais para permitir linha de visão verdadeira.
      </MobileText>
      <MobileText>
        • <strong>Terrenos</strong> que componham uma cidade em ruínas:
        passarelas quebradas, janelas escuras, vielas mortais. MDF, papercraft,
        kits plásticos — o que importa é a mesa contar a história da Cidade dos
        Condenados.
      </MobileText>

      <MobileText variant="heading" className="mt-2">
        Rolagens
      </MobileText>
      <MobileText>
        Sempre que as regras pedirem uma rolagem, role <strong>1d20</strong>. Em
        testes de atributo, role <strong>1d20</strong> e some o atributo
        indicado. As rolagens normalmente são feitas contra uma{" "}
        <strong>Classe de Dificuldade</strong> (CD): se o resultado for maior ou
        igual à CD, você tem sucesso; caso contrário, falha — e Mordheim cobra
        por cada erro.
      </MobileText>

      <MobileText variant="heading" className="mt-2">
        Atributos
      </MobileText>
      <MobileText>
        Os atributos descrevem a capacidade dos personagens — heróis orgulhosos
        ou mercenários famintos — de sobreviver à cidade.
      </MobileText>
      <MobileText>
        • <strong>Ímpeto</strong>: força física, iniciativa, graça, velocidade
        de combate e reflexos.
      </MobileText>
      <MobileText>
        • <strong>Precisão</strong>: domínio de tiros letais à distância, mesmo
        sob pressão.
      </MobileText>
      <MobileText>
        • <strong>Armadura</strong>: o quão resistente a ferimentos a criatura
        é.
      </MobileText>
      <MobileText>
        • <strong>Vontade</strong>: fortaleza da mente — inteligência,
        determinação e intuição.
      </MobileText>
      <MobileText>
        • <strong>Vigor</strong>: resistência e fôlego, a diferença entre cair e
        permanecer em combate.
      </MobileText>
    </CollapsibleSection>
  );
};

export default RulesIntroSection;
