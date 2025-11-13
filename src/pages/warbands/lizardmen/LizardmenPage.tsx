// import React, { useMemo } from "react";
// import { useJsonData } from "../../../hooks/useJsonData";
// import { getStaticImport } from "../../../data/jsonFileMap";
// import { createWarbandNavigationSections } from "../../../utils/navigationSections";
// import QuickNavigation from "../../../components/QuickNavigation";
// import MobileSection from "../../../components/MobileSection";
// import HeaderH1 from "../../../components/HeaderH1";
// import HeaderH2 from "../../../components/HeaderH2";
// import MobileText from "../../../components/MobileText";
// import UnitCard from "../../../components/UnitCard";
// import PageTitle from "../../../components/PageTitle";

// interface Unit {
//   id: string;
//   name: string;
//   role?: string;
//   quantity?: string;
//   lore?: string;
//   stats: {
//     move: number;
//     fight: string;
//     shoot: string;
//     armour: number;
//     Vontade: string;
//     health: number;
//     cost: string;
//     skills?: string[];
//   };
//   spellAffinity?: {
//     aligned0?: string[];
//     aligned2?: string[];
//   };
//   abilities: Array<{
//     name: string;
//     description: string;
//   }>;
//   equipment?: {
//     "hand-to-hand"?: Array<{ name: string; cost: string }>;
//     ranged?: Array<{ name: string; cost: string }>;
//     armor?: Array<{ name: string; cost: string }>;
//     miscellaneous?: Array<{ name: string; cost: string }>;
//     modifiers?: Array<{ name: string; cost: string }>;
//   };
// }

// interface SacredMark {
//   id: string;
//   name: string;
//   restrictions?: string;
//   cost: string;
//   description: string;
// }

// const LizardmenPage: React.FC = () => {
//   // Carrega dados via hook (Firestore -> IndexedDB -> Static)
//   const staticImportFn = React.useMemo(
//     () => () => getStaticImport("lizardmen")(),
//     []
//   );

//   const { data: lizardmenData, loading: loadingUnits } = useJsonData({
//     fileId: "lizardmen",
//     staticImport: staticImportFn,
//   });

//   // Carrega marcas sagradas via hook (Firestore -> IndexedDB -> Static)
//   const sacredMarksStaticImportFn = React.useMemo(
//     () => () => getStaticImport("lizardmen-sacred-marks")(),
//     []
//   );

//   const { data: sacredMarksData, loading: loadingMarks } = useJsonData({
//     fileId: "lizardmen-sacred-marks",
//     staticImport: sacredMarksStaticImportFn,
//   });

//   const loading = loadingUnits || loadingMarks;

//   // Cria as seções de navegação de forma segura
//   const navigationSections = useMemo(() => {
//     const baseSections = [
//     { id: "introducao", title: "Introdução", level: 0 },
//     { id: "estrutura-do-bando", title: "Estrutura do Bando", level: 0 },
//     ];
    
//     const warbandSections = createWarbandNavigationSections(
//       lizardmenData as Unit[] | null | undefined,
//       baseSections
//     );

//     // Adiciona seção de marcas sagradas
//     const marksSection = {
//       id: "marcas-sagradas",
//       title: "Marcas Sagradas",
//       level: 0,
//       children: (sacredMarksData || []).map((mark: any, index: number) => ({
//         id: mark.id || `mark-${index}`,
//         title: mark.name,
//         level: 1,
//       })),
//     };

//     // Insere antes de "lider" ou no final
//     const leaderIndex = warbandSections.findIndex(s => s.id === "lider");
//     if (leaderIndex >= 0) {
//       warbandSections.splice(leaderIndex, 0, marksSection);
//     } else {
//       warbandSections.push(marksSection);
//     }

//     return warbandSections;
//   }, [lizardmenData, sacredMarksData]);

//   // Extrai unidades de forma segura (com fallback para array vazio)
//   const leader = useMemo(() => {
//     if (!lizardmenData || !Array.isArray(lizardmenData)) return undefined;
//     return lizardmenData.find((unit) => unit.role === "Líder") as Unit | undefined;
//   }, [lizardmenData]);

//   const heroes = useMemo(() => {
//     if (!lizardmenData || !Array.isArray(lizardmenData)) return [];
//     return lizardmenData.filter((unit) => unit.role === "Herói") as Unit[];
//   }, [lizardmenData]);

//   const soldiers = useMemo(() => {
//     if (!lizardmenData || !Array.isArray(lizardmenData)) return [];
//     return lizardmenData.filter((unit) => !unit.role) as Unit[];
//   }, [lizardmenData]);

//   return (
//     <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
//       <div className="py-4">
//         <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
//           <QuickNavigation sections={navigationSections} loading={loading} />
//           <PageTitle>Reptilianos</PageTitle>
//           <MobileSection id="introducao">
//             <MobileText>
//               Os Reptilianos são uma das raças mais antigas do mundo, criadas
//               pelos Antigos para serem seus servos perfeitos. Eles habitam as
//               selvas tropicais de Lustria, onde construíram vastas
//               cidades-templos de pedra e ouro.
//             </MobileText>
//             <MobileText>
//               Os Reptilianos são divididos em várias castas: os Saurídeos são os
//               guerreiros, os Geckos são os servos e artesãos, e os Slann são
//               seus líderes supremos. Cada casta tem sua função específica na
//               sociedade reptiliana, e todos servem aos Grandes Planos dos
//               Antigos.
//             </MobileText>
//             <MobileText>
//               Em Mordheim, os Reptilianos são uma presença rara mas temível.
//               Eles vêm em busca de artefatos dos Antigos ou para cumprir
//               profecias antigas. Sua tecnologia avançada e poderes místicos os
//               tornam adversários formidáveis.
//             </MobileText>
//           </MobileSection>

//           <MobileSection id="estrutura-do-bando">
//             <HeaderH1 id="estrutura-do-bando">Estrutura do Bando</HeaderH1>
//             <MobileText>
//               Um bando Reptiliano deve incluir um mínimo de 3 modelos. Você tem
//               500 coroas que pode usar para recrutar e equipar seu bando. O
//               número máximo de guerreiros no bando é 12.
//             </MobileText>
//             <MobileText>
//               • <strong>Magisacerdote Gecko:</strong> Cada bando Lizardmen deve
//               ter um Magisacerdote Gecko – nem mais, nem menos!
//               <br />• <strong>Guerreiro Totêmico Saurídeo:</strong> Seu bando
//               pode incluir até 1 Guerreiro Totêmico Saurídeo.
//               <br />• <strong>Gecko Crista-Alta:</strong> Seu bando pode incluir
//               até 2 Geckos Crista-Alta.
//               <br />• <strong>Batedor Lagarto:</strong> Seu bando pode incluir
//               qualquer número de Batedores Lagarto.
//               <br />• <strong>Saurídeo Veterano:</strong> Seu bando pode incluir
//               de 1 a 5 Saurídeos Veteranos.
//               <br />• <strong>Kroxigor:</strong> Seu bando pode incluir até 1
//               Kroxigor.
//             </MobileText>
//           </MobileSection>

//           <MobileSection id="marcas-sagradas">
//             <HeaderH1 id="marcas-sagradas">Marcas Sagradas</HeaderH1>
//             <MobileText>
//               As Marcas Sagradas são bênçãos dos deuses reptilianos que podem
//               ser concedidas aos guerreiros mais dignos. Cada marca tem
//               restrições específicas e custos diferentes.
//             </MobileText>
//             <MobileText>
//               <strong>Regras das Marcas Sagradas:</strong>
//               <br />• Apenas <strong>heróis</strong> podem receber Marcas
//               Sagradas
//               <br />• Cada herói pode ter <strong>apenas uma</strong> Marca
//               Sagrada
//               <br />• Marcas Sagradas só podem ser compradas{" "}
//               <strong>durante a contratação</strong> do herói
//               <br />• Marcas Sagradas não podem ser compradas posteriormente
//               durante o jogo
//             </MobileText>

//             <div className="space-y-6">
//               {loading ? (
//                 <MobileText>Carregando marcas sagradas...</MobileText>
//               ) : (sacredMarksData || []).length > 0 ? (
//                 (sacredMarksData || []).map((mark: SacredMark, index: number) => (
//                 <div
//                   key={mark.id}
//                   id={`mark-${index}`}
//                   className="bg-green-900/20 border border-green-500/40 rounded-lg p-4"
//                 >
//                   <HeaderH2 className="text-green-300 mb-2">
//                     {mark.name}
//                   </HeaderH2>
//                   <div className="mb-3">
//                     <div className="text-green-400 font-bold text-sm mb-1">
//                       Custo: {mark.cost}
//                     </div>
//                     {mark.restrictions && (
//                       <div className="text-green-400 font-bold text-sm mb-1">
//                         Restrições: {mark.restrictions}
//                       </div>
//                     )}
//                   </div>
//                   <div>
//                     <div className="text-green-400 font-bold text-sm mb-1">
//                       Descrição:
//                     </div>
//                     <div className="text-white text-sm">{mark.description}</div>
//                   </div>
//                 </div>
//               ))
//               ) : (
//                 <MobileText>Nenhuma marca sagrada encontrada</MobileText>
//               )}
//             </div>
//           </MobileSection>

//           <MobileSection id="lider">
//             <HeaderH1 id="lider">Líder</HeaderH1>
//             {loading ? (
//               <MobileText>Carregando...</MobileText>
//             ) : leader ? (
//               <UnitCard
//                 id={leader.id}
//                 name={leader.name}
//                 role={leader.role}
//                 quantity={leader.quantity}
//                 lore={leader.lore}
//                 qualidade={(leader as any).qualidade || 0}
//                 stats={leader.stats}
//                 spellAffinity={leader.spellAffinity}
//                 abilities={leader.abilities}
//                 equipment={leader.equipment}
//               />
//             ) : (
//               <MobileText>Nenhum líder encontrado</MobileText>
//             )}
//           </MobileSection>

//           <MobileSection id="herois">
//             <HeaderH1 id="herois">Heróis</HeaderH1>
//             {loading ? (
//               <MobileText>Carregando...</MobileText>
//             ) : heroes.length > 0 ? (
//               heroes.map((hero) => (
//               <UnitCard
//                 key={hero.id}
//                 id={hero.id}
//                 name={hero.name}
//                 role={hero.role}
//                 quantity={hero.quantity}
//                 lore={hero.lore}
//                 qualidade={(hero as any).qualidade || 0}
//                 stats={hero.stats}
//                 spellAffinity={hero.spellAffinity}
//                 abilities={hero.abilities}
//                 equipment={hero.equipment}
//               />
//               ))
//             ) : (
//               <MobileText>Nenhum herói encontrado</MobileText>
//             )}
//           </MobileSection>

//           <MobileSection id="soldados">
//             <HeaderH1 id="soldados">Soldados</HeaderH1>
//             {loading ? (
//               <MobileText>Carregando...</MobileText>
//             ) : soldiers.length > 0 ? (
//               soldiers.map((soldier) => (
//               <UnitCard
//                 key={soldier.id}
//                 id={soldier.id}
//                 name={soldier.name}
//                 quantity={soldier.quantity}
//                 lore={soldier.lore}
//                 qualidade={(soldier as any).qualidade || 0}
//                 stats={soldier.stats}
//                 abilities={soldier.abilities}
//                 equipment={soldier.equipment}
//               />
//               ))
//             ) : (
//               <MobileText>Nenhum soldado encontrado</MobileText>
//             )}
//           </MobileSection>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LizardmenPage;
