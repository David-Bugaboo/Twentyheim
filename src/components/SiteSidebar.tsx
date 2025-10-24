
import { Link, useLocation } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

interface SiteSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SiteSidebar: React.FC<SiteSidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  const navItems = [
    { label: "Início", path: "/" },
    { label: "Regras", path: "/rules" },
    { label: "Bandos", path: "/warbands" },
    { label: "Magia", path: "/magic" },
    { label: "Daemônios", path: "/daemons" },
    { label: "Construções", path: "/constructs" },
    { label: "Itens", path: "/items" },
    { label: "Campanha", path: "/campaign" },
    { label: "Base", path: "/base" },
  ];

  return (
    <>
      {/* Desktop Sidebar - sempre visível */}
      <div className="hidden md:block fixed left-0 top-0 h-full w-80 z-50">
        <div className="h-full bg-[#121212] border-r border-green-500/40 overflow-y-auto">
          <div className="p-6">
            <h2
              className="text-green-300 text-xl font-bold leading-tight tracking-[-0.015em] mb-6"
              style={{ fontFamily: "Cinzel, serif" }}
            >
              Navegação
            </h2>
            <div className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-4 py-3 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? "bg-green-900/30 border border-green-500/40 text-green-300"
                      : "bg-gray-800/50 hover:bg-gray-700/50 text-green-300"
                  }`}
                  onClick={onClose}
                >
                  <p className="text-base font-normal leading-normal">
                    {item.label}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar - overlay quando aberto */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-[#121212] overflow-y-auto">
          <div className="p-4">
            <div className="flex justify-between items-center mb-6">
              <h2
                className="text-green-300 text-xl font-bold leading-tight tracking-[-0.015em]"
                style={{ fontFamily: "Cinzel, serif" }}
              >
                Navegação
              </h2>
              <button
                onClick={onClose}
                className="text-white hover:text-green-300 transition-colors"
              >
                <CloseIcon />
              </button>
            </div>
            <div className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-4 py-3 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? "bg-green-900/30 border border-green-500/40 text-green-300"
                      : "bg-gray-800/50 hover:bg-gray-700/50 text-green-300"
                  }`}
                  onClick={onClose}
                >
                  <p className="text-base font-normal leading-normal">
                    {item.label}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SiteSidebar;
