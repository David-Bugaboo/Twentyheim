-- SQL para adicionar campo upkeep e popular com valores dos dados
-- Executar após os INSERTs principais

-- 1. Adicionar coluna upkeep se não existir
ALTER TABLE base_figures 
ADD COLUMN IF NOT EXISTS upkeep TEXT;

-- 2. Atualizar upkeep para TODOS os Hired Swords (Mercenários)
-- Verificar se todos os slugs estão corretos antes de executar
UPDATE base_figures SET upkeep = '10 coroas' WHERE slug = 'mata-trolls-anao-merc';
UPDATE base_figures SET upkeep = '1 Pedra-bruxa' WHERE slug = 'rato-ogroide-de-clan-skryre';
UPDATE base_figures SET upkeep = '20 coroas' WHERE slug = 'guarda-de-estradas';
UPDATE base_figures SET upkeep = '15 coroas' WHERE slug = 'gladiador';
UPDATE base_figures SET upkeep = '30 coroas' WHERE slug = 'ogro-guarda-costas';
UPDATE base_figures SET upkeep = '20 coroas' WHERE slug = 'patrulheiro-elfo';
UPDATE base_figures SET upkeep = '15 coroas' WHERE slug = 'cacador-de-bestas';
UPDATE base_figures SET upkeep = '20 coroas' WHERE slug = 'cavaleiro-errante';
UPDATE base_figures SET upkeep = '5 coroas' WHERE slug = 'patrulheiro-nanico';
UPDATE base_figures SET upkeep = '20 coroas' WHERE slug = 'salteador';
UPDATE base_figures SET upkeep = '20 coroas' WHERE slug = 'assassino-imperial';
UPDATE base_figures SET upkeep = '15 coroas' WHERE slug = 'atirador-de-elite-tileano';
UPDATE base_figures SET upkeep = '15 coroas' WHERE slug = 'bruxo';
UPDATE base_figures SET upkeep = '10 coroas' WHERE slug = 'menestrel';
UPDATE base_figures SET upkeep = '40 coroas' WHERE slug = 'orc-negro-capataz';
UPDATE base_figures SET upkeep = '12 coroas' WHERE slug = 'gecko-camaleao';

-- 3. Corrigir equipamentos do Mata-Trolls Anão (garantir 2x machado-anao explicitamente)
-- Primeiro, remover todos os machado-anao existentes para este figura
DELETE FROM mercenary_starting_equipment 
WHERE figure_slug = 'mata-trolls-anao-merc' 
AND equipment_slug = 'machado-anao';

-- Depois, inserir explicitamente 2x machado-anao
INSERT INTO mercenary_starting_equipment (id, figure_slug, equipment_slug, created_at)
VALUES 
  (gen_random_uuid(), 'mata-trolls-anao-merc', 'machado-anao', NOW()),
  (gen_random_uuid(), 'mata-trolls-anao-merc', 'machado-anao', NOW());

-- 4. Atualizar upkeep para Lendas (que já existem no banco)
UPDATE base_figures SET upkeep = '0 coroas' WHERE slug = 'aenur-espada-do-crepusculo';
UPDATE base_figures SET upkeep = '0 coroas' WHERE slug = 'bertha-bestraufrung';
UPDATE base_figures SET upkeep = '75 coroas' WHERE slug = 'condessa-marianna-chevaux';
UPDATE base_figures SET upkeep = '30 coroas' WHERE slug = 'johann-a-faca';
UPDATE base_figures SET upkeep = '1 Pedra-bruxa por partida' WHERE slug = 'nicodemus-o-peregrino-amaldicoado';
UPDATE base_figures SET upkeep = '35 coroas' WHERE slug = 'veskit-carrasco-de-clan-eshin';
