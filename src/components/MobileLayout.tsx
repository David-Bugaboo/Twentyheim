


interface MobileLayoutProps {
  title: string;
  backButtonPath?: string;
  tableOfContents?: Array<{
    id: string;
    label: string;
    type: string;
    ref?: React.RefObject<null>;
  }>;
  children: React.ReactNode;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({
  children,
  
}) => {
  

  

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      {/* Table of Contents - sobrepõe o conteúdo */}
      

      {/* Content - sempre renderizado */}
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MobileLayout;
