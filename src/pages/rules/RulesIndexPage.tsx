
import { useNavigate } from "react-router-dom";
import MobileLayout from "../../components/MobileLayout";
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";
import HeaderH1 from "../../components/HeaderH1";
import HeaderH2 from "../../components/HeaderH2";
import MobileNavigationButtons from "../../components/MobileNavigationButtons";

function RulesIndexPage() {
  const navigate = useNavigate();

  // Seções principais das regras
  const mainSections = [
    {
      label: "Introdução às Regras",
      path: "/rules/intro",
      description: "Conceitos básicos e introdução ao jogo"
    },
    {
      label: "Figuras e Atributos",
      path: "/rules/figures-and-attributes",
      description: "Atributos das figuras e sistema de rolagens"
    },
    {
      label: "Regras de Equipamentos",
      path: "/rules/equipment-rules",
      description: "Armas, armaduras e equipamentos"
    },
    {
      label: "Sistema de Combate",
      path: "/rules/combat-system",
      description: "Regras de combate corpo a corpo"
    }
  ];

  // Ações do jogo
  const gameActions = [
    {
      label: "Ações de Movimento",
      path: "/rules/movement-actions",
      description: "Como se mover pelo campo de batalha"
    },
    {
      label: "Ações de Combate",
      path: "/rules/combat-actions",
      description: "Combate corpo a corpo"
    },
    {
      label: "Ações de Tiro",
      path: "/rules/ranged-actions",
      description: "Combate à distância"
    },
    {
      label: "Ações de Conjuração",
      path: "/rules/spellcasting-actions",
      description: "Lançamento de magias"
    },
    {
      label: "Ações de Poder",
      path: "/rules/power-actions",
      description: "Uso de poderes especiais"
    },
    {
      label: "Outras Ações",
      path: "/rules/other-actions",
      description: "Ações especiais e interações"
    },
    {
      label: "Ações com Pedra-Bruxa",
      path: "/rules/wyrdstone-actions",
      description: "Uso da Pedra-Bruxa"
    }
  ];

  // Configuração e campanha
  const gameSetup = [
    {
      label: "Configuração do Jogo",
      path: "/rules/game-setup",
      description: "Como preparar e iniciar um jogo"
    },
    {
      label: "Criação de Bandos",
      path: "/rules/warband-creation",
      description: "Como criar e personalizar bandos"
    },
    {
      label: "Fim de Jogo",
      path: "/rules/game-end",
      description: "Condições de vitória e fim do jogo"
    },
    {
      label: "A Campanha",
      path: "/rules/campaign",
      description: "Fase de campanha e desenvolvimento"
    },
    {
      label: "Regras Especiais",
      path: "/rules/special-rules",
      description: "Regras específicas e exceções"
    }
  ];

  // Função para criar botões de navegação
  const createNavigationButtons = (items: any[]) => {
    return items.map(item => ({
      label: item.label,
      path: item.path
    }));
  };

  return (
    <MobileLayout title="Índice de Regras" backButtonPath="/">
      <div className="space-y-6">
        <HeaderH1>Índice de Regras</HeaderH1>
        
        <MobileText>
          Este índice organiza todas as regras de 20Heim de forma sistemática. 
          Navegue pelas seções abaixo para encontrar as regras específicas que você precisa.
        </MobileText>

        <MobileSection>
          <HeaderH2>Seções Principais</HeaderH2>
          <MobileText className="mb-4">
            As regras fundamentais do jogo, incluindo conceitos básicos, atributos e sistemas principais.
          </MobileText>
          <MobileNavigationButtons buttons={createNavigationButtons(mainSections)} />
        </MobileSection>

        <MobileSection>
          <HeaderH2>Ações do Jogo</HeaderH2>
          <MobileText className="mb-4">
            Todas as ações que as figuras podem realizar durante o jogo, desde movimento até magia.
          </MobileText>
          <MobileNavigationButtons buttons={createNavigationButtons(gameActions)} />
        </MobileSection>

        <MobileSection>
          <HeaderH2>Configuração e Campanha</HeaderH2>
          <MobileText className="mb-4">
            Como configurar jogos, criar bandos e gerenciar campanhas de longo prazo.
          </MobileText>
          <MobileNavigationButtons buttons={createNavigationButtons(gameSetup)} />
        </MobileSection>

        <MobileSection>
          <HeaderH2>Navegação Rápida</HeaderH2>
          <MobileText className="mb-4">
            Acesso direto às principais seções do jogo:
          </MobileText>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => navigate("/rules")}
              className="bg-[#8b7355] hover:bg-[#7a6349] text-white p-4 rounded-lg transition-colors duration-200"
            >
              <h3 className="font-bold text-lg mb-2">Regras Completas</h3>
              <p className="text-sm text-gray-200">
                Acesse todas as regras em uma única página
              </p>
            </button>
            <button
              onClick={() => navigate("/campaign")}
              className="bg-[#8b7355] hover:bg-[#7a6349] text-white p-4 rounded-lg transition-colors duration-200"
            >
              <h3 className="font-bold text-lg mb-2">Fase de Campanha</h3>
              <p className="text-sm text-gray-200">
                Gerenciamento pós-jogo e desenvolvimento
              </p>
            </button>
            <button
              onClick={() => navigate("/skills")}
              className="bg-[#8b7355] hover:bg-[#7a6349] text-white p-4 rounded-lg transition-colors duration-200"
            >
              <h3 className="font-bold text-lg mb-2">Habilidades</h3>
              <p className="text-sm text-gray-200">
                Índice de todas as habilidades disponíveis
              </p>
            </button>
            <button
              onClick={() => navigate("/equipment/weapons-and-equipments")}
              className="bg-[#8b7355] hover:bg-[#7a6349] text-white p-4 rounded-lg transition-colors duration-200"
            >
              <h3 className="font-bold text-lg mb-2">Equipamentos</h3>
              <p className="text-sm text-gray-200">
                Armas, armaduras e acessórios
              </p>
            </button>
          </div>
        </MobileSection>

        <MobileSection>
          <HeaderH2>Como Usar Este Índice</HeaderH2>
          <MobileText>
            <strong>Para Novos Jogadores:</strong> Comece com "Introdução às Regras" e "Figuras e Atributos" para entender os conceitos básicos.
            <br /><br />
            <strong>Para Jogadores Experientes:</strong> Use as seções específicas de ações para consultar regras detalhadas.
            <br /><br />
            <strong>Para Mestres:</strong> Foque em "Configuração do Jogo" e "A Campanha" para gerenciar sessões.
            <br /><br />
            <strong>Navegação:</strong> Cada seção contém links para outras seções relacionadas, facilitando a consulta cruzada.
          </MobileText>
        </MobileSection>
      </div>
    </MobileLayout>
  );
}

export default RulesIndexPage;
