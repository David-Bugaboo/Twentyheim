import { createContext, useRef, useState, useContext } from "react";

export const TOCContext = createContext<any>(undefined);

export function TOCProvider({ children }: { children: React.ReactNode }) {
  // Criar as refs no nível do componente
  const introducaoRef = useRef<HTMLElement>(null);
  const criacaoDeBandoRef = useRef<HTMLElement>(null);
  const sistemaDeCombateRef = useRef<HTMLElement>(null);
  const acoesRef = useRef<HTMLElement>(null);

  const [toc, setToc] = useState<any[]>([
    {
      path: "/rules",
      sections: [
        {
          id: "introducao",
          label: "Introdução",
          ref: introducaoRef,
        },
        {
          id: "criacao-de-bando",
          label: "Criação de Bando",
          ref: criacaoDeBandoRef,
        },
        {
          id: "sistema-de-combate",
          label: "Sistema de Combate",
          ref: sistemaDeCombateRef,
        },
        { id: "acoes", label: "Ações", ref: acoesRef },
      ],
    },
    {
      path: "/items/magic-equipment",
      sections: [
        {
          id: "rolando-equipamento-magico",
          label: "Rolando Equipamento Mágico",
        },
        {
          id: "modificadores-de-equipamento",
          label: "Modificadores de Equipamento",
        },
      ],
    },
    {
      path: "/items/relics",
      sections: [
        { id: "tabela-de-relicas", label: "Tabela de Relíquias" },
        { id: "rolando-relicas", label: "Rolando Relíquias" },
        { id: "relicas-arcanas", label: "Relíquias Arcanas" },
      ],
    },
    {
      path: "/items/potions",
      sections: [
        {
          id: "rolando-remedios-venenos-pocoes",
          label: "Rolando Remédios, Venenos e Poções",
        },
        { id: "remedios-e-venenos", label: "Remédios e Venenos" },
        { id: "pocoes", label: "Poções" },
      ],
    },
    {
      path: "/items/common-items",
      sections: [
        { id: "armas-corpo-a-corpo", label: "Armas Corpo a Corpo" },
        { id: "armas-a-distancia", label: "Armas à Distância" },
        { id: "armas-de-fogo", label: "Armas de Fogo" },
        { id: "armaduras", label: "Armaduras" },
        { id: "acessorios", label: "Acessórios" },
      ],
    },
    {
      path: "/items/mordheim-map",
      sections: [
        {
          id: "tabela-de-mapas-de-mordheim",
          label: "Tabela de Mapas de Mordheim",
        },
        { id: "os-bairros-de-mordheim", label: "Os Bairros de Mordheim" },
        { id: "estrategia-de-dominio", label: "Estratégia de Domínio" },
      ],
    },
  ]);

  return (
    <TOCContext.Provider value={{ toc, setToc }}>
      {children}
    </TOCContext.Provider>
  );
}

export const useTOC = () => {
  const context = useContext(TOCContext);
  if (!context) {
    throw new Error("useTOC must be used within a TOCProvider");
  }
  return context;
};

// Hook para buscar uma ref específica
export const useSectionRef = (path: string, sectionId: string) => {
  const { toc } = useTOC();
  const pageData = toc.find((item: any) => item.path === path);
  return (
    pageData?.sections.find((section: any) => section.id === sectionId)?.ref ||
    null
  );
};
