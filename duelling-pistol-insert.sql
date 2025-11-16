-- SQL para inserir Pistola de Duelo no banco de dados
-- Categoria: Arma de Fogo
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
  'pistola-de-duelo',
  'Pistola de Duelo',
  'Arma de Fogo',
  15,
  10,
  2,
  18,
  ARRAY[]::text[],
  ARRAY[]::text[],
  '[
    {
      "label": "Precisão",
      "value": "Uma pistola de duelo é construída para precisão, pois um duelista habilidoso é capaz de acertar uma moeda a vinte passos. Todos os tiros e ataques corpo a corpo de uma pistola de duelo têm um bônus de +1 em Ímpeto ou Precisão respectivamente."
    },
    {
    "label": "Preparar Tiro",
    "value": "A Pistola requer o uso de duas ações (uma delas pode substituir a de movimento) para recarregar e preparar o tiro. Caso uma figura esteja equipada com duas armas com a característica Pistola (Exceto Bestas de Mão), isso é reduzido para uma ação (que pode substituir a de movimento), mas a mesma pistola não pode ser usada para atirar em dois turnos consecutivos."
    },
    {
      "label": "Penetração de Armadura (2)",
      "value": "Pistolas de duelo são ainda melhores em penetrar armaduras do que sua Força 4 sugere. Um guerreiro ferido por uma pistola de duelo deve fazer seu teste de armadura com um modificador de -2."
    },
    {
    "label": "Pistola",
    "value": "Uma arma com essa característica é leve e prática, podendo ser usada com apenas uma mão. Ela conta como uma adaga em combate corpo a corpo, inclusive para Lutar com Duas Armas."
    },
  ]'::jsonb,
  NULL,
  NULL,
  NULL,
  NOW()
);

