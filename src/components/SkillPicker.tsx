import React, { useMemo, useState } from "react";
// Importa todos os arquivos de habilidades previamente
import combateData from "../pages/skills/data/combate.skills.json";
import atiradorData from "../pages/skills/data/atirador.skills.json";
import academicaData from "../pages/skills/data/academica.skills.json";
import forcaData from "../pages/skills/data/forca.skills.json";
import velocidadeData from "../pages/skills/data/velocidade.skills.json";
import agilidadeData from "../pages/skills/data/velocidade.skills.json"; // geralmente o mesmo arquivo
import irmasDeSigmarData from "../pages/skills/data/irmas-de-sigmar.skills.json";
import skavenDoClaEnshinData from "../pages/skills/data/skaven-do-cla-enshin.skills.json";
import saqueadoresHomemFeraData from "../pages/skills/data/saqueadores-homem-fera.skills.json";
import cacadoresDeTesouroAnoesData from "../pages/skills/data/cacadores-de-tesouro-anoes.skills.json";
import mataTrollsAnaoData from "../pages/skills/data/mata-trolls-anao.skills.json";
import habilidadesVonCarsteinData from "../pages/skills/data/habilidades-von-carstein.skills.json";
import habilidadesDeDragaoCarmesimData from "../pages/skills/data/habilidades-de-dragao-carmesim.skills.json";
import habilidadesDeLahmiaData from "../pages/skills/data/habilidades-de-lahmia.skills.json";
import habilidadesDeStrigoiData from "../pages/skills/data/habilidades-de-strigoi.skills.json";
import corsariosDruchiiData from "../pages/skills/data/corsarios-druchii.skills.json";
import habilidadesDeGeckosData from "../pages/skills/data/habilidades-de-geckos.skills.json";
import habilidadesDeSaurioData from "../pages/skills/data/habilidades-de-saurio.skills.json";
import hordasOrcData from "../pages/skills/data/hordas-orc.skills.json";
import filhosDeHashutData from "../pages/skills/data/filhos-de-hashut.skills.json";
import habilidadesDosNecrarcasData from "../pages/skills/data/habilidades-dos-necrarcas.skills.json";
import patrulheiroElficoData from "../pages/skills/data/patrulheiro-elfico.skills.json";

// Objeto que mapeia nomes de categorias (como aparecem no stats.skills) para os dados importados
const skillCategoryMap: Record<string, any[]> = {
  Combate: combateData as any[],
  Atirador: atiradorData as any[],
  Acadêmica: academicaData as any[],
  Força: forcaData as any[],
  Velocidade: velocidadeData as any[],
  Agilidade: agilidadeData as any[],
  "Irmãs de Sigmar": irmasDeSigmarData as any[],
  "Skaven do Clã Enshin": skavenDoClaEnshinData as any[],
  "Saqueadores Homem-Fera": saqueadoresHomemFeraData as any[],
  "Caçadores de Tesouro Anões": cacadoresDeTesouroAnoesData as any[],
  "Mata-Trolls Anão": mataTrollsAnaoData as any[],
  "Habilidades Von Carstein": habilidadesVonCarsteinData as any[],
  "Von Carstein": habilidadesVonCarsteinData as any[],
  "Habilidades de Dragão Carmesim": habilidadesDeDragaoCarmesimData as any[],
  "Habilidades de Lahmia": habilidadesDeLahmiaData as any[],
  "Habilidades de Strigoi": habilidadesDeStrigoiData as any[],
  "Corsários Druchii": corsariosDruchiiData as any[],
  "Habilidades de Geckos": habilidadesDeGeckosData as any[],
  "Habilidades de Saúrios": habilidadesDeSaurioData as any[],
  "Hordas Orc": hordasOrcData as any[],
  "Filhos de Hashut": filhosDeHashutData as any[],
  "Habilidades dos Necrarcas": habilidadesDosNecrarcasData as any[],
  "Patrulheiro Élfico": patrulheiroElficoData as any[],
};

type SkillData = {
  id?: string;
  name: string;
  description: string;
  type?: string;
};

type SkillPickerProps = {
  allowedSkills: string[]; // nomes das LISTAS/CATEGORIAS de habilidades permitidas (ex: ["Combate", "Atirador", "Força"])
  selectedSkills: SkillData[]; // habilidades já escolhidas para a figura
  onAdd: (skill: SkillData) => void;
};

const SkillPicker: React.FC<SkillPickerProps> = ({
  allowedSkills,
  selectedSkills,
  onAdd,
}) => {
  const [category, setCategory] = useState<string>("");
  const [skill, setSkill] = useState<string>("");

  const categories = useMemo(() => {
    const list: Array<{ key: string; label: string; skills: SkillData[] }> = [];
    const names: string[] = Object.keys(skillCategoryMap);

    // Itera por todas as categorias disponíveis
    for (const categoryName of names) {
      // Busca os dados dessa categoria no mapa
      const categoryData = skillCategoryMap[categoryName];

      if (!categoryData) {
        continue; // se não encontrar, pula
      }

      // Extrai os objetos completos das habilidades (com nome, descrição e id)
      const skillsList = (Array.isArray(categoryData) ? categoryData : [])
        .map((item: any) => ({
          id: item?.id, // Preserva o id do JSON original
          name: item?.name,
          description: item?.description || "",
          type: item?.type || categoryName,
        }))
        .filter(
          (skill: SkillData) => skill.name && typeof skill.name === "string"
        ) as SkillData[];

      if (skillsList.length > 0) {
        list.push({
          key: categoryName,
          label: categoryName,
          skills: skillsList,
        });
      }
    }

    // ordena por label
    list.sort((a, b) => a.label.localeCompare(b.label, "pt-BR"));
    return list;
  }, [allowedSkills]);

  const skillsForCategory = useMemo(() => {
    const found = categories.find((c) => c.key === category);
    if (!found) return [];
    const selectedNames = new Set((selectedSkills || []).map((s) => s.name));
    return found.skills
      .filter((s) => !selectedNames.has(s.name))
      .sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
  }, [categories, category, selectedSkills]);

  return (
    <div className="mt-4 bg-[#2a2a2a] p-4 rounded">
      <div className="flex flex-col md:flex-row gap-2 md:items-center">
        <select
          className="bg-[#1a1a1a] border border-gray-600 rounded px-2 py-1 text-white"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setSkill("");
          }}
        >
          <option value="">Escolher lista…</option>
          {categories.map((c) => (
            <option key={c.key} value={c.key}>
              {c.label}
            </option>
          ))}
        </select>

        <select
          className="bg-[#1a1a1a] border border-gray-600 rounded px-2 py-1 text-white"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          disabled={!category}
        >
          <option value="">Escolher habilidade…</option>
          {skillsForCategory.map((s) => (
            <option key={s.name} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>

        <button
          className="px-3 py-1 rounded bg-green-700 hover:bg-green-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!category || !skill}
          onClick={() => {
            if (!skill) return;
            const found = categories.find((c) => c.key === category);
            if (found) {
              const skillData = found.skills.find((s) => s.name === skill);
              if (skillData) {
                onAdd(skillData);
                setSkill("");
              }
            }
          }}
        >
          Adicionar
        </button>
      </div>
    </div>
  );
};

export default SkillPicker;
