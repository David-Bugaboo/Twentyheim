import MobileLayout from "../../components/MobileLayout";
import MobileHeroHeader from "../../components/MobileHeroHeader";
import headerImage from "../../assets/header-art/6f9bb4964d8e7fb18c5f39ef34af39fe.png";

function CampaignPage() {
  const sections = [
    { id: "introducao", label: "Introdução", type: "Seção" },
    { id: "criacao-campanha", label: "Criação de Campanha", type: "Seção" },
    { id: "desenvolvimento", label: "Desenvolvimento", type: "Seção" },
    { id: "fim-de-campanha", label: "Fim de Campanha", type: "Seção" },
  ];

  return (
    <MobileLayout
      title="A Campanha"
      backButtonPath="/"
      tableOfContents={sections}
    >
      <MobileHeroHeader imageUrl={headerImage} title="A Campanha" />
      <br />
      <div className="space-y-6">
        {/* Conteúdo será adicionado aqui */}
        <div className="bg-[#2a1f1f] p-6 rounded-lg border border-[#382929] text-center">
          <p className="text-white text-lg">
            Conteúdo da campanha será adicionado aqui
          </p>
        </div>
      </div>
    </MobileLayout>
  );
}

export default CampaignPage;
