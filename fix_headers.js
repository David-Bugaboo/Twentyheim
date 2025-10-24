const fs = require('fs');
const path = require('path');

const files = [
  'src/pages/weapons and equipments/ArmorAndShieldsPage.tsx',
  'src/pages/weapons and equipments/AccessoriesPage.tsx',
  'src/pages/weapons and equipments/ModifiersPage.tsx',
  'src/pages/weapons and equipments/RemediesAndPoisonsPage.tsx',
  'src/pages/warbands/orc-mob/OrcMobPage.tsx',
  'src/pages/warbands/sisters-of-sigmar/SistersOfSigmarPage.tsx',
  'src/pages/warbands/dark-elf-corsairs/DarkElfCorsairsPage.tsx',
  'src/pages/warbands/mercenaries/MercenariesPage.tsx',
  'src/pages/warbands/lizardmen/LizardmenPage.tsx',
  'src/pages/warbands/dwarf-treasure-hunters/DwarfTreasureHuntersPage.tsx',
  'src/pages/warbands/skaven/SkavenPage.tsx',
  'src/pages/warbands/sons-of-hashut/SonsOfHashutPage.tsx',
  'src/pages/warbands/vampire-courts/VampireCourtsPage.tsx',
  'src/pages/warbands/witch-hunters/WitchHuntersPage.tsx',
  'src/pages/warbands/dark-elf-corsairs/BridesOfKhainePage.tsx',
  'src/pages/HomePage.tsx'
];

const titles = {
  'ArmorAndShieldsPage.tsx': 'Armaduras e Escudos',
  'AccessoriesPage.tsx': 'Acessórios',
  'ModifiersPage.tsx': 'Modificadores de Equipamento',
  'RemediesAndPoisonsPage.tsx': 'Remédios e Venenos',
  'OrcMobPage.tsx': 'Horda Orc',
  'SistersOfSigmarPage.tsx': 'Irmãs de Sigmar',
  'DarkElfCorsairsPage.tsx': 'Corsários Druchii',
  'MercenariesPage.tsx': 'Mercenários',
  'LizardmenPage.tsx': 'Saúrios',
  'DwarfTreasureHuntersPage.tsx': 'Caçadores de Tesouro Anões',
  'SkavenPage.tsx': 'Skaven do Clã Enshin',
  'SonsOfHashutPage.tsx': 'Filhos de Hashut',
  'VampireCourtsPage.tsx': 'Cortes Vampíricas',
  'WitchHuntersPage.tsx': 'Caçadores de Bruxas',
  'BridesOfKhainePage.tsx': 'Noivas de Khaine',
  'HomePage.tsx': 'Wyrdgrave'
};

files.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove MobileHeroHeader import
    content = content.replace(/import MobileHeroHeader from[^;]+;\n/g, '');
    
    // Remove headerImage import
    content = content.replace(/import headerImage from[^;]+;\n/g, '');
    
    // Remove MobileHeroHeader usage
    content = content.replace(/<MobileHeroHeader[^>]*\/>\s*/g, '');
    
    // Add HeaderH1 after the opening div
    const fileName = path.basename(filePath);
    const title = titles[fileName] || 'Título';
    
    content = content.replace(
      /(<div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">\s*)/,
      `$1<HeaderH1>${title}</HeaderH1>\n          `
    );
    
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${filePath}`);
  }
});

console.log('All files updated!');
