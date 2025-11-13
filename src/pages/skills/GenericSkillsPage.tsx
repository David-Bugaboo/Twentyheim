// import { useMemo } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import PageTitle from "../../components/PageTitle";
// import MobileText from "../../components/MobileText";
// import MobileSection from "../../components/MobileSection";
// import QuickNavigation from "../../components/QuickNavigation";
// import SkillCard from "../../components/SkillCard";

// import { getStaticImport } from "../../data/jsonFileMap";

// interface Skill {
//   id: string;
//   name: string;
//   type: string;
//   description: string;
// }

// // Mapeamento de slugs para fileIds e nomes
// // Note: agilidade usa o fileId "velocidade"
// const skillConfig: Record<string, { name: string; fileId: string }> = {
//   combate: { name: "Habilidades de Combate", fileId: "combate" },
//   atirador: { name: "Habilidades de Atirador", fileId: "atirador" },
//   academica: { name: "Habilidades Acadêmicas", fileId: "academica" },
//   forca: { name: "Habilidades de Força", fileId: "forca" },
//   agilidade: {
//     name: "Habilidades de Agilidade",
//     fileId: "velocidade", // slug agilidade mapeia para fileId velocidade
//   },
//   "irmas-de-sigmar": {
//     name: "Habilidades das Irmãs de Sigmar",
//     fileId: "irmas-de-sigmar",
//   },
//   "skaven-do-cla-enshin": {
//     name: "Habilidades Skaven do Clã Enshin",
//     fileId: "skaven-do-cla-enshin",
//   },
//   "saqueadores-homem-fera": {
//     name: "Habilidades dos Saqueadores Homem-Fera",
//     fileId: "saqueadores-homem-fera",
//   },
//   "cacadores-de-tesouro-anoes": {
//     name: "Habilidades dos Caçadores de Tesouro Anões",
//     fileId: "cacadores-de-tesouro-anoes",
//   },
//   "mata-trolls-anao": {
//     name: "Habilidades dos Mata-Trolls Anão",
//     fileId: "mata-trolls-anao",
//   },
//   "habilidades-von-carstein": {
//     name: "Habilidades Von Carstein",
//     fileId: "habilidades-von-carstein",
//   },
//   "habilidades-de-dragao-carmesim": {
//     name: "Habilidades de Dragão Carmesim",
//     fileId: "habilidades-de-dragao-carmesim",
//   },
//   "habilidades-dos-necrarcas": {
//     name: "Habilidades dos Necrarcas",
//     fileId: "habilidades-dos-necrarcas",
//   },
//   "habilidades-de-lahmia": {
//     name: "Habilidades de Lahmia",
//     fileId: "habilidades-de-lahmia",
//   },
//   "habilidades-de-strigoi": {
//     name: "Habilidades de Strigoi",
//     fileId: "habilidades-de-strigoi",
//   },
//   "corsarios-druchii": {
//     name: "Habilidades dos Corsários Druchii",
//     fileId: "corsarios-druchii",
//   },
//   "habilidades-de-geckos": {
//     name: "Habilidades de Geckos",
//     fileId: "habilidades-de-geckos",
//   },
//   "habilidades-de-saurio": {
//     name: "Habilidades de Sáurio",
//     fileId: "habilidades-de-saurio",
//   },
//   "habilidades-de-saurios": {
//     name: "Habilidades de Sáurios",
//     fileId: "habilidades-de-saurio", // Mesmo arquivo que saurio
//   },
//   "hordas-orc": {
//     name: "Habilidades das Hordas Orc",
//     fileId: "hordas-orc",
//   },
//   "filhos-de-hashut": {
//     name: "Habilidades dos Filhos de Hashut",
//     fileId: "filhos-de-hashut",
//   },
//   "patrulheiro-elfo": {
//     name: "Habilidades do Patrulheiro Elfo",
//     fileId: "patrulheiro-elfo",
//   },
// };
// /*
// function GenericSkillsPage() {
//   const { slug } = useParams<{ slug: string }>();
//   const navigate = useNavigate();
  
//   // Obtém a configuração baseada no slug
//   const config = slug ? skillConfig[slug] : null;
  
//   // Cria o staticImport apenas se o slug for válido
//   const staticImportFn = useMemo(() => {
//     if (!config) return () => Promise.resolve({ default: [] });
//     return () => getStaticImport(config.fileId)();
//   }, [config]);
  
//   // Carrega dados via hook (Firestore -> IndexedDB -> Static)
//   const { data: skills, loading, error: loadError } = useJsonData<Skill[]>({
//     fileId: config?.fileId || "",
//     staticImport: staticImportFn,
//     enabled: !!config,
//   });

//   const error = config ? null : `Tipo de skill "${slug}" não encontrado`;

//   if (loading) {
//     return (
//       <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
//         <div className="py-4">
//           <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
//             <MobileSection>
//               <PageTitle>Carregando...</PageTitle>
//               <MobileText>
//                 Por favor, aguarde enquanto carregamos as habilidades.
//               </MobileText>
//             </MobileSection>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error || loadError || !config) {
//     return (
//       <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
//         <div className="py-4">
//           <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
//             <MobileSection>
//               <PageTitle>Erro</PageTitle>
//               <MobileText>{error || loadError?.message || "Tipo de skill não encontrado"}</MobileText>
//               <button
//                 onClick={() => navigate("/skills")}
//                 className="mt-4 px-4 py-2 bg-green-900/20 border border-green-500/40 hover:bg-green-800/30 hover:border-green-400/60 text-white rounded-lg transition-colors duration-200"
//               >
//                 Voltar para Skills
//               </button>
//             </MobileSection>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const skillsArray = (skills || []) as Skill[];
//   const navigationSections = [
//     { id: "intro", title: config.name, level: 0 },
//     ...skillsArray.map((skill, index) => ({
//       id: `skill-${index}`,
//       title: skill.name,
//       level: 1,
//     })),
//   ];

//   return (
//     <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
//       <div className="py-4">
//         <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
//           <QuickNavigation sections={navigationSections} loading={loading} />
//           <MobileSection>
//             <div id="intro">
//               <PageTitle>{config.name}</PageTitle>
//             </div>

//             {loading ? (
//               <MobileText>Carregando habilidades...</MobileText>
//             ) : skillsArray.length === 0 ? (
//               <MobileText>Nenhuma habilidade encontrada para este tipo.</MobileText>
//             ) : (
//             <div className="space-y-6 mt-6">
//                 {skillsArray.map((skill, index) => (
//                 <div key={skill.id || index} id={`skill-${index}`}>
//                   <SkillCard
//                     name={skill.name}
//                     description={skill.description}
//                   />
//                 </div>
//               ))}
//             </div>
//             )}
//           </MobileSection>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default GenericSkillsPage;
// */