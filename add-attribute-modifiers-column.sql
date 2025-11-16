-- SQL para adicionar coluna attribute_modifiers na tabela equipments
-- Tipo: JSONB com valor padrão

ALTER TABLE equipments
ADD COLUMN IF NOT EXISTS attribute_modifiers JSONB DEFAULT '{
  "movement": 0,
  "fight": 0,
  "shoot": 0,
  "armour": 0,
  "will": 0,
  "health": 0,
  "strength": 0
}'::jsonb;

-- Atualiza registros existentes que possam ter NULL para o valor padrão
UPDATE equipments
SET attribute_modifiers = '{
  "movement": 0,
  "fight": 0,
  "shoot": 0,
  "armour": 0,
  "will": 0,
  "health": 0,
  "strength": 0
}'::jsonb
WHERE attribute_modifiers IS NULL;

