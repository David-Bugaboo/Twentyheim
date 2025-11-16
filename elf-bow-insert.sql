-- SQL para inserir Arco Élfico no banco de dados
-- Categoria: Arma a Distância
-- IMPORTANTE: Certifique-se de que a tabela de equipamentos existe antes de executar

INSERT INTO equipments (
  id,
  slug,
  name,
  category,
  cost,
  range,
  damage_bonus,
  rarity,
  avaiability,
  exclusions,
  special_rules,
  armour_bonus,
  movement_penalty,
  slot,
  created_at
) VALUES (
  gen_random_uuid(),
  'arco-elfico',
  'Arco Élfico',
  'Arma a Distância',
  35,
  36,
  1,
  20,
  ARRAY[]::text[],
  ARRAY[]::text[],
  '[
    {
      "label": "Penetração de Armadura (1)",
      "value": "Uma arma com essa palavra chave ignora (X) pontos de armadura do alvo de seus ataques."
    }
  ]'::jsonb,
  NULL,
  NULL,
  NULL,
  NOW()
);

