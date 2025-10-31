import { useNavigate } from "react-router-dom";
import PageTitle from "../../../components/PageTitle";
import MobileSection from "../../../components/MobileSection";
import MobileText from "../../../components/MobileText";

function WarbandNotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48 max-w-3xl mx-auto">
          <MobileSection>
            <div className="text-center py-12">
              <PageTitle>Bando Não Encontrado</PageTitle>
              <MobileText className="mt-4 text-gray-400">
                O bando que você está procurando não existe ou foi excluído.
              </MobileText>
              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => navigate("/warband-builder")}
                  className="px-6 py-3 rounded bg-green-700 hover:bg-green-600 text-white font-semibold"
                >
                  Voltar para Meus Bandos
                </button>
              </div>
            </div>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default WarbandNotFoundPage;

