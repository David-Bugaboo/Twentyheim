-- SQL para inserir Hired Swords no banco de dados
-- Role: MERCENARIO
-- IMPORTANTE: Certifique-se de que os slugs de equipamentos e skill lists existem no banco antes de executar

-- Função auxiliar para converter strings com "+" ou "0" para números inteiros
-- Exemplo: "+2" -> 2, "0" -> 0, "+1" -> 1

-- 1. Mata-Trolls Anão
INSERT INTO base_figures (
  id, name, role, slug, lore, avaiability, exclusions, quality, race, 
  cost, movement, fight, shoot, armour, will, health, strength, 
  equipment_slots, startingxp, special_rules, can_get_blessings, 
  can_get_mutations, can_get_sacred_marks, no_xp, natural_attacks, created_at
) VALUES (
  gen_random_uuid(),
  'Mata-Trolls Anão',
  'MERCENARIO',
  'mata-trolls-anao-merc',
  'Mata-Trolls são membros do culto mórbido dos Anões obcecados em buscar uma morte honrosa em combate. Tendo cometido algum crime imperdoável ou sido desonrado de alguma forma, um Anão abandonará seu lar e vagará para morrer lutando contra um inimigo poderosa. Mata-Trolls são indivíduos são desajustadas, psicopatas e violentos. No entanto, há poucos lutadores melhores no Mundo Conhecido, que vendem seus serviços em Mordheim para quem eles acreditem que possam guiá-los para sua morte gloriosa em combate.',
  ARRAY['Mercenários', 'Caçadores de Bruxas'],
  ARRAY[]::text[],
  12,
  'anao',
  25,
  7,
  2,
  1,
  11,
  2,
  12,
  0,
  5,
  NULL,
  '[
    {"label": "Jornada pela Morte", "value": "O Mata-Trolls é Imune a Aterrorizante e tem a característica Mente-Férrea."},
    {"label": "Rancor Antigo", "value": "Essa figura tem Ódio(Orcs e Goblins)"},
    {"label": "Cabeça Dura", "value": "Anões são imunes à palavra-chave Concussiva(X)."},
    {"label": "Devagar e Sempre", "value": "O Mata-Trolls Anão nunca perde movimento devido ao uso de equipamentos."}
  ]'::jsonb,
  false,
  false,
  false,
  false,
  NULL,
  NOW()
);

-- Equipamentos iniciais do Mata-Trolls Anão (2x Machado Anão)
INSERT INTO mercenary_starting_equipment (id, figure_slug, equipment_slug, created_at)
SELECT gen_random_uuid(), 'mata-trolls-anao', 'machado-anao', NOW()
FROM generate_series(1, 2);

-- Listas de habilidades do Mata-Trolls Anão
INSERT INTO figure_to_skill_list (id, figure_slug, skill_list_slug, created_at)
VALUES 
  (gen_random_uuid(), 'mata-trolls-anao', 'combate', NOW()),
  (gen_random_uuid(), 'mata-trolls-anao', 'forca', NOW()),
  (gen_random_uuid(), 'mata-trolls-anao', 'mata-trolls-anao', NOW());

-- 2. Rato Ogróide do Clã Skryre
INSERT INTO base_figures (
  id, name, role, slug, lore, avaiability, exclusions, quality, race, 
  cost, movement, fight, shoot, armour, will, health, strength, 
  equipment_slots, startingxp, special_rules, can_get_blessings, 
  can_get_mutations, can_get_sacred_marks, no_xp, natural_attacks, created_at
) VALUES (
  gen_random_uuid(),
  'Rato Ogróide do Clã Skryre',
  'MERCENARIO',
  'rato-ogroide-de-clan-skryre',
  'Os engenheiros-bruxos do Clã Skryre são famosos por suas invenções hediondas que misturam magia vil e maquinário arcano. O Rato Ogróide do Clã Skryre é o auge dessa engenharia: um cadáver de Rato Ogróide combinado a um exoesqueleto mecânico e alimentado por Pedra-bruxa refinada. O clã aluga os poucos protótipos que produziu para testá-los em combate — uma besta aterrorizante e instável.',
  ARRAY['Skaven'],
  ARRAY[]::text[],
  25,
  'skaven',
  100,
  8,
  3,
  1,
  13,
  3,
  20,
  2,
  5,
  NULL,
  '[
    {"label": "Grande", "value": "O Rato Ogróide do Clã Skyre tem as características Grande, Aterrorizante e Construto."},
    {"label": "Aterrorizante", "value": "Causa Medo."},
    {"label": "Alimentado por Pedra-bruxa", "value": "Não requer pagamento em ouro para manutenção, mas exige 1 fragmento de Pedra-bruxa antes de cada partida para ser ativado."},
    {"label": "Máquina Pesada", "value": "Não pode correr."},
    {"label": "Sem Experiência", "value": "Não ganha experiência."}
  ]'::jsonb,
  false,
  false,
  false,
  true,
  '[
    {
      "name": "Espancamento",
      "damage": "+2",
      "type": "Ataque Corpo a Corpo",
      "specialRules": []
    },
    {
      "name": "Lançador de Chamas Corrompidas",
      "damage": "+2",
      "range": "especial",
      "type": "Ataque a Distância",
      "specialRules": [
        {
          "label": "Lança-Chamas",
          "value": "Posicione uma Área de Efeito(Cone). Todas as figuras na Área de Efeito recebem um ataque flamejante +2 com a característica Incendiária(5) e Penenetração de Armadura(3). Se dois ou mais números iguais forem rolados nas rolagens de ataque, o Rato Ogróide do Clã Skyre também sofre esse ataque e não pode mais disparar a arma até o fim do jogo."
        }
      ]
    }
  ]'::jsonb,
  NOW()
);

INSERT INTO figure_to_skill_list (id, figure_slug, skill_list_slug, created_at)
VALUES 
  (gen_random_uuid(), 'rato-ogroide-de-clan-skryre', 'forca', NOW()),
  (gen_random_uuid(), 'rato-ogroide-de-clan-skryre', 'combate', NOW());

-- 3. Guarda de Estradas
INSERT INTO base_figures (
  id, name, role, slug, lore, avaiability, exclusions, quality, race, 
  cost, movement, fight, shoot, armour, will, health, strength, 
  equipment_slots, startingxp, special_rules, can_get_blessings, 
  can_get_mutations, can_get_sacred_marks, no_xp, natural_attacks, created_at
) VALUES (
  gen_random_uuid(),
  'Guarda de Estradas',
  'MERCENARIO',
  'guarda-de-estradas',
  'Patrulhando as perigosas estradas do Império, Guardas de Estradas são homens sisudos de coragem inabalável. Figuras solitárias, percorrem longas distâncias em qualquer clima, com pouca comida. São lutadores duros e implacáveis, sem código de cavalaria — não oferecem misericórdia, pois não esperam recebê-la. São especializados no uso da besta, com a qual são caçadores e atiradores letais. Salteadores, vagabundos e bandidos são sua presa; a segurança das estradas é seu dever, executado com severidade inabalável.',
  ARRAY['Caçadores de Bruxas', 'Irmãs de Sigmar', 'Caçadores de Tesouro Anões', 'Mercenários'],
  ARRAY[]::text[],
  22,
  'humano',
  40,
  20,
  1,
  2,
  11,
  1,
  12,
  0,
  5,
  NULL,
  '[
    {"label": "Cavaleiro Perito", "value": "O Guarda de Estradas está montado em um cavalo de guerra. Ele não pode ser desmontado do seu cavalo, não pode escalar e gasta 3cm de movimento para 1cm de movimento ao atravessar terreno difícil. Ele não recebe penalidades por se mover antes de atirar, e pode usar a ação especial da habilidade Tiro Habilidoso como parte de uma ação de movimento."},
    {"label": "Severo", "value": "O Guarda de Estradas é imune a Aterrorizante."},
    {"label": "Inimizade", "value": "Um Guarda de Estradas nunca se juntará a um bando que também contenha um Salteador."}
  ]'::jsonb,
  false,
  false,
  false,
  false,
  NULL,
  NOW()
);

INSERT INTO mercenary_starting_equipment (id, figure_slug, equipment_slug, created_at)
VALUES 
  (gen_random_uuid(), 'guarda-de-estradas', 'besta', NOW()),
  (gen_random_uuid(), 'guarda-de-estradas', 'martelo', NOW()),
  (gen_random_uuid(), 'guarda-de-estradas', 'adaga', NOW()),
  (gen_random_uuid(), 'guarda-de-estradas', 'armadura-pesada', NOW()),
  (gen_random_uuid(), 'guarda-de-estradas', 'tocha', NOW());

INSERT INTO figure_to_skill_list (id, figure_slug, skill_list_slug, created_at)
VALUES 
  (gen_random_uuid(), 'guarda-de-estradas', 'combate', NOW()),
  (gen_random_uuid(), 'guarda-de-estradas', 'atirador', NOW()),
  (gen_random_uuid(), 'guarda-de-estradas', 'forca', NOW()),
  (gen_random_uuid(), 'guarda-de-estradas', 'cavalaria', NOW());

-- 4. Gladiador
INSERT INTO base_figures (
  id, name, role, slug, lore, avaiability, exclusions, quality, race, 
  cost, movement, fight, shoot, armour, will, health, strength, 
  equipment_slots, startingxp, special_rules, can_get_blessings, 
  can_get_mutations, can_get_sacred_marks, no_xp, natural_attacks, created_at
) VALUES (
  gen_random_uuid(),
  'Gladiador',
  'MERCENARIO',
  'gladiador',
  'Gladiadores são homens perigosos que ganham a vida nas arenas ilegais de combate do Império. Muitos são escravos e prisioneiros, mas alguns são homens livres que tiram seu sustento de lutas sangrentas em lugares como A Fenda dos Miseráveis ou os Poços Negros. Embora proibidas em muitas províncias, as arenas de combate são populares e muitas coroas são apostadas em seus resultados, levando autoridades a fecharem os olhos para esses sangrentos espetáculos. Fora das fossas, oferecem seus serviços a quem estiver disposto a pagar e são prontamente contratados por bandos que exploram as ruínas de Mordheim. São combatentes poderosos e perigosos, e seu armamento único lhes dá vantagem contra quase qualquer oponente.',
  ARRAY['Todos', 'Skaven'],
  ARRAY['Mortos-Vivos'],
  22,
  'humano',
  30,
  11,
  3,
  1,
  10,
  1,
  12,
  0,
  5,
  NULL,
  '[
    {"label": "Gladiador", "value": "O Gladiador tem a característica Forte."}
  ]'::jsonb,
  false,
  false,
  false,
  false,
  NULL,
  NOW()
);

INSERT INTO mercenary_starting_equipment (id, figure_slug, equipment_slug, created_at)
VALUES 
  (gen_random_uuid(), 'gladiador', 'estrela-da-manha', NOW()),
  (gen_random_uuid(), 'gladiador', 'broquel', NOW()),
  (gen_random_uuid(), 'gladiador', 'elmo', NOW()),
  (gen_random_uuid(), 'gladiador', 'armadura-leve', NOW());

INSERT INTO figure_to_skill_list (id, figure_slug, skill_list_slug, created_at)
VALUES 
  (gen_random_uuid(), 'gladiador', 'combate', NOW()),
  (gen_random_uuid(), 'gladiador', 'agilidade', NOW()),
  (gen_random_uuid(), 'gladiador', 'forca', NOW());

-- 5. Ogro Guarda-Costas
INSERT INTO base_figures (
  id, name, role, slug, lore, avaiability, exclusions, quality, race, 
  cost, movement, fight, shoot, armour, will, health, strength, 
  equipment_slots, startingxp, special_rules, can_get_blessings, 
  can_get_mutations, can_get_sacred_marks, no_xp, natural_attacks, created_at
) VALUES (
  gen_random_uuid(),
  'Ogro Guarda-Costas',
  'MERCENARIO',
  'ogro-guarda-costas',
  'Ogros são criaturas enormes e brutais, com mais de três metros de altura, compostos de ossos e músculos. Por isso, são muito requisitados como guarda-costas e mercenários, apesar de sua falta de inteligência. Um bando respaldado por um Ogro torna-se um inimigo temível, pois eles são lutadores extremamente perigosos e absolutamente aterrorizantes quando enfurecidos. Eles aceitam qualquer empregador, pois notoriamente não se importam com por quem lutam.',
  ARRAY['Todos'],
  ARRAY['Skaven'],
  25,
  'ogro',
  80,
  15,
  2,
  0,
  12,
  0,
  20,
  0,
  5,
  NULL,
  '[
    {"label": "Guarda Costas Monstruoso", "value": "O Ogro tem as características Grande, Forte e Aterrorizante."}
  ]'::jsonb,
  false,
  false,
  false,
  false,
  NULL,
  NOW()
);

INSERT INTO mercenary_starting_equipment (id, figure_slug, equipment_slug, created_at)
VALUES 
  (gen_random_uuid(), 'ogro-guarda-costas', 'arma-de-duas-maos', NOW()),
  (gen_random_uuid(), 'ogro-guarda-costas', 'armadura-leve', NOW());

INSERT INTO figure_to_skill_list (id, figure_slug, skill_list_slug, created_at)
VALUES 
  (gen_random_uuid(), 'ogro-guarda-costas', 'combate', NOW()),
  (gen_random_uuid(), 'ogro-guarda-costas', 'forca', NOW());

-- 6. Patrulheiro Elfo
INSERT INTO base_figures (
  id, name, role, slug, lore, avaiability, exclusions, quality, race, 
  cost, movement, fight, shoot, armour, will, health, strength, 
  equipment_slots, startingxp, special_rules, can_get_blessings, 
  can_get_mutations, can_get_sacred_marks, no_xp, natural_attacks, created_at
) VALUES (
  gen_random_uuid(),
  'Patrulheiro Elfo',
  'MERCENARIO',
  'patrulheiro-elfo',
  'Elfos são uma raça maravilhosa: ágeis, altos, belos, longevos e mágicos. Geralmente, são temidos e desconfiados pelos humanos, embora alguns vivam nas cidades entre homens e ofereçam seus serviços como menestréis e arqueiros em troca de uma taxa alta. Embora os Elfos se tornem mais raros no Velho Mundo a cada ano, ainda há alguns vagando pelas trilhas sem caminho da Floresta de Drakwald e da Floresta das Sombras. Elfos sensatamente tendem a evitar as ruínas de Mordheim, pois na Cidade dos Condenados há pouco para atrair essa raça feérica e estranha. As vezes são contratados por caçadores de tesouros, pois poucos podem igualar sua habilidade com o arco, ou sua rapidez e agilidade inumanas. Os sentidos de um Elfo são muito mais aguçados que os de qualquer humano, e eles são excelentes batedores.',
  ARRAY['Todos'],
  ARRAY[]::text[],
  8,
  'elfo',
  40,
  16,
  2,
  3,
  10,
  2,
  12,
  0,
  5,
  NULL,
  '[
    {"label": "Explorador", "value": "O Patrulheiro Elfo pode ser enviado para a atividade de Explorar as Ruínas, como se fosse um héroi. Quando o patrulheiro elfo é escolhido para a atividade de Explorar as Ruínas, ele pode modificar seu dado de exploração em até +3/-3."},
    {"label": "Visão Excelente", "value": "Elfos tem uma visão muito melhor que humanos. Eles adicionam +10cm ao alcance de qualquer arma a distância e consideram inimigos com a característica Furtividade(X) como (X+10)"}
  ]'::jsonb,
  false,
  false,
  false,
  false,
  NULL,
  NOW()
);

INSERT INTO mercenary_starting_equipment (id, figure_slug, equipment_slug, created_at)
VALUES 
  (gen_random_uuid(), 'patrulheiro-elfo', 'arco-longo', NOW()),
  (gen_random_uuid(), 'patrulheiro-elfo', 'espada', NOW()),
  (gen_random_uuid(), 'patrulheiro-elfo', 'manto-elfico', NOW()),
  (gen_random_uuid(), 'patrulheiro-elfo', 'aljava', NOW());

INSERT INTO figure_to_skill_list (id, figure_slug, skill_list_slug, created_at)
VALUES 
  (gen_random_uuid(), 'patrulheiro-elfo', 'atirador', NOW()),
  (gen_random_uuid(), 'patrulheiro-elfo', 'agilidade', NOW()),
  (gen_random_uuid(), 'patrulheiro-elfo', 'patrulheiro-elfo', NOW());

-- 7. Caçador de Bestas
INSERT INTO base_figures (
  id, name, role, slug, lore, avaiability, exclusions, quality, race, 
  cost, movement, fight, shoot, armour, will, health, strength, 
  equipment_slots, startingxp, special_rules, can_get_blessings, 
  can_get_mutations, can_get_sacred_marks, no_xp, natural_attacks, created_at
) VALUES (
  gen_random_uuid(),
  'Caçador de Bestas',
  'MERCENARIO',
  'cacador-de-bestas',
  'O Caçador de Bestas é um andarilho sombrio, cheio de mistério e autoaversão. Sua história é lamentável. Parentes e amigos massacrados pelas criaturas bestiais das terras selvagens. Ele é um dos muitos homens que foram levados à beira do abismo por suas experiências, ansiando agora apenas por vingança insaciável contra aqueles que destruíram suas vidas outrora normais. Eles se adornam com as peles de seus inimigos e assumem um aspecto verdadeiramente assustador. Apenas um capitão corajoso  contrataria tais ''homens selvagens'' da floresta, mas suas habilidades de caçador são incomparáveis e sua força bruta em combate é impressionante demais para ser ignorada. Perigoso e feroz, qualidades ideais para sobrevivência nas terras selvagens escuras e desenfreadas.',
  ARRAY['Todos', 'Bestas', 'Mortos-Vivos', 'Orcs & Goblins', 'Possuídos', 'Circo do Caos'],
  ARRAY['Skaven'],
  18,
  'humano',
  35,
  12,
  1,
  2,
  10,
  0,
  12,
  0,
  5,
  NULL,
  '[
    {"label": "Vingança contra Bestas", "value": "O Caçador de Bestas tem a característica Ódio(Homens-Fera). Ele não cobra seu custo de manutenção em partidas contra Homens-Fera,"},
    {"label": "Manto de Crânios", "value": "O Caçador de Bestas usa um manto de crânios macabro adornado com crânios de Homens-Fera. Ele tem a característica Aterrorizante contra Homens-Fera."},
    {"label": "Predador", "value": "O Caçador de Bestas é um predador de todas as criaturas malignas, mas especialmente de Homens-Fera. Em qualquer batalha ambientada na natureza (fora de Mordheim) que envolva Homens-Fera, o Caçador de Bestas pode ser posicionado após ambos os bandos terem se posicionado. Ele pode ser posicionado em qualquer lugar do tabuleiro que esteja fora da linha de visão de todas as figuras inimigas e fora da zona de posicionamento inimiga."}
  ]'::jsonb,
  false,
  false,
  false,
  false,
  NULL,
  NOW()
);

INSERT INTO mercenary_starting_equipment (id, figure_slug, equipment_slug, created_at)
VALUES 
  (gen_random_uuid(), 'cacador-de-bestas', 'machado', NOW()),
  (gen_random_uuid(), 'cacador-de-bestas', 'adaga', NOW()),
  (gen_random_uuid(), 'cacador-de-bestas', 'facas-de-arremesso', NOW()),
  (gen_random_uuid(), 'cacador-de-bestas', 'armadura-leve', NOW());

INSERT INTO figure_to_skill_list (id, figure_slug, skill_list_slug, created_at)
VALUES 
  (gen_random_uuid(), 'cacador-de-bestas', 'combate', NOW()),
  (gen_random_uuid(), 'cacador-de-bestas', 'forca', NOW());

-- 8. Cavaleiro Errante
INSERT INTO base_figures (
  id, name, role, slug, lore, avaiability, exclusions, quality, race, 
  cost, movement, fight, shoot, armour, will, health, strength, 
  equipment_slots, startingxp, special_rules, can_get_blessings, 
  can_get_mutations, can_get_sacred_marks, no_xp, natural_attacks, created_at
) VALUES (
  gen_random_uuid(),
  'Cavaleiro Errante',
  'MERCENARIO',
  'cavaleiro-errante',
  'Assim como guerreiros das classes sociais mais baixas podem se tornar mercenários, escudeiros ou nobres podem oferecer suas habilidades para contratação, tornando-se Cavaleiros-Errantes. Cavaleiros-Errantes são frequentemente os filhos mais novos de nobres, que herdaram pouco além de suas armas, cavalo e armadura. Tendo se desiludido com sua sorte na vida, eles tomaram o único caminho disponível para eles: o de um Mercenário. Considerações financeiras têm precedência sobre os dogmas da honra e cavalaria. Muitos Cavaleiros-Errantes se estabeleceram nos guetos ao redor de Mordheim, oferecendo sua considerável força aos contratantes mais ricos.',
  ARRAY['Mercenários', 'Caçadores de Bruxas'],
  ARRAY[]::text[],
  21,
  'humano',
  50,
  20,
  2,
  1,
  10,
  0,
  12,
  1,
  5,
  NULL,
  '[
    {"label": "Cavaleiro Nobre", "value": "O Cavaleiro Errante luta montado em um Cavalo de Guerra. Ele nunca pode ser desmontado do seu cavalo, não pode escalar e gasta 3cm de movimento para 1cm de movimento ao atravessar terreno difícil, mas ganha as características Chifres e Forte."}
  ]'::jsonb,
  false,
  false,
  false,
  false,
  NULL,
  NOW()
);

INSERT INTO mercenary_starting_equipment (id, figure_slug, equipment_slug, created_at)
VALUES 
  (gen_random_uuid(), 'cavaleiro-errante', 'armadura-pesada', NOW()),
  (gen_random_uuid(), 'cavaleiro-errante', 'escudo', NOW()),
  (gen_random_uuid(), 'cavaleiro-errante', 'lanca', NOW()),
  (gen_random_uuid(), 'cavaleiro-errante', 'espada', NOW());

INSERT INTO figure_to_skill_list (id, figure_slug, skill_list_slug, created_at)
VALUES 
  (gen_random_uuid(), 'cavaleiro-errante', 'combate', NOW()),
  (gen_random_uuid(), 'cavaleiro-errante', 'forca', NOW());

-- 9. Patrulheiro Nanico
INSERT INTO base_figures (
  id, name, role, slug, lore, avaiability, exclusions, quality, race, 
  cost, movement, fight, shoot, armour, will, health, strength, 
  equipment_slots, startingxp, special_rules, can_get_blessings, 
  can_get_mutations, can_get_sacred_marks, no_xp, natural_attacks, created_at
) VALUES (
  gen_random_uuid(),
  'Patrulheiro Nanico',
  'MERCENARIO',
  'patrulheiro-nanico',
  'Nanicos são criaturas diminutas, geralmente mais preocupadas com o horário da próxima refeição (ou duas) do que com feitos militares. Medem entre noventa centímetros e pouco mais de um metro, não são muito fortes nem resistentes, mas são naturalmente bons atiradores e bravos diante do perigo. Alguns Nanicos são mais aventureiros do que outros, e esses espíritos ousados são muito procurados por bandos mercenários: excelentes arqueiros — e cozinheiros ainda melhores.',
  ARRAY['Todos'],
  ARRAY['Cortes Vampiricas', 'Filhos de Hashut', 'Circo do Caos', 'Culto dos Possuídos', 'Horda Orc', 'Goblins', 'Saqueadores Homem-Fera'],
  5,
  'halfling',
  15,
  12,
  0,
  2,
  9,
  1,
  12,
  1,
  5,
  NULL,
  '[
    {"label": "Cozinheiro", "value": "Bandos com um Patrulheiro Nanico aumentam seu tamanho máximo em +1, já que guerreiros de toda parte são atraídos pelo cheiro de comida excelente. A figura extra não pode ser um Herói."},
    {"label": "Diminuto", "value": "Halflings são criaturas diminutas com pouca força física. Eles causam -1 de dano em ataques corpo a corpo."}
  ]'::jsonb,
  false,
  false,
  false,
  false,
  NULL,
  NOW()
);

INSERT INTO mercenary_starting_equipment (id, figure_slug, equipment_slug, created_at)
VALUES 
  (gen_random_uuid(), 'patrulheiro-nanico', 'arco', NOW()),
  (gen_random_uuid(), 'patrulheiro-nanico', 'adaga', NOW()),
  (gen_random_uuid(), 'patrulheiro-nanico', 'elmo', NOW());

INSERT INTO figure_to_skill_list (id, figure_slug, skill_list_slug, created_at)
VALUES 
  (gen_random_uuid(), 'patrulheiro-nanico', 'agilidade', NOW()),
  (gen_random_uuid(), 'patrulheiro-nanico', 'atirador', NOW());

-- 10. Salteador
INSERT INTO base_figures (
  id, name, role, slug, lore, avaiability, exclusions, quality, race, 
  cost, movement, fight, shoot, armour, will, health, strength, 
  equipment_slots, startingxp, special_rules, can_get_blessings, 
  can_get_mutations, can_get_sacred_marks, no_xp, natural_attacks, created_at
) VALUES (
  gen_random_uuid(),
  'Salteador',
  'MERCENARIO',
  'salteador',
  'Vagando pelas florestas e caminhos isolados do Império, salteadores atacam as muitas caravanas e carroças tolas ou desesperadas o suficiente para viajar por lá. Eles são homens sombrios e perigosos, frequentemente empregados por seu conhecimento de rotas de carga e maestria em arapucas e emboscadas. Muitas vezes aparecem em público, desprovidos de suas roupas negras, afetados e charmosos, mas essa farsa é uma máscara, pois conhecem apenas a crueldade. Pistoleiros mortais e cavaleiros de primeira, são um trunfo para qualquer bando, mas não confie muito neles, pois são capazes de trair qualquer um na primeira oportunidade.',
  ARRAY['Todos'],
  ARRAY['Irmãs de Sigmar', 'Caçadores de Bruxas'],
  20,
  'humano',
  35,
  20,
  3,
  4,
  7,
  0,
  12,
  0,
  5,
  NULL,
  '[
    {"label": "Pistoleiro Especialista", "value": "A habilidade do Salteador com um par de pistolas é incomparável e ele pode usar a ação preparar tiro com apenas uma ação ao invés de duas."},
    {"label": "Cavaleiro", "value": "O Salteador está montado em um cavalo de corrida. Ele não pode ser desmontado do seu cavalo, não pode escalar e gasta 3cm de movimento para 1cm de movimento ao atravessar terreno difícil. Ele não recebe penalidades por se mover antes de atirar"},
    {"label": "Inimizade", "value": "Um Salteador nunca se juntará a um bando que também contenha um Guarda de Estradas."}
  ]'::jsonb,
  false,
  false,
  false,
  false,
  NULL,
  NOW()
);

INSERT INTO mercenary_starting_equipment (id, figure_slug, equipment_slug, created_at)
VALUES 
  (gen_random_uuid(), 'salteador', 'adaga', NOW()),
  (gen_random_uuid(), 'salteador', 'pistola', NOW()),
  (gen_random_uuid(), 'salteador', 'pistola', NOW()),
  (gen_random_uuid(), 'salteador', 'espada', NOW());

INSERT INTO figure_to_skill_list (id, figure_slug, skill_list_slug, created_at)
VALUES 
  (gen_random_uuid(), 'salteador', 'combate', NOW()),
  (gen_random_uuid(), 'salteador', 'atirador', NOW()),
  (gen_random_uuid(), 'salteador', 'agilidade', NOW());

-- 11. Assassino Imperial
INSERT INTO base_figures (
  id, name, role, slug, lore, avaiability, exclusions, quality, race, 
  cost, movement, fight, shoot, armour, will, health, strength, 
  equipment_slots, startingxp, special_rules, can_get_blessings, 
  can_get_mutations, can_get_sacred_marks, no_xp, natural_attacks, created_at
) VALUES (
  gen_random_uuid(),
  'Assassino Imperial',
  'MERCENARIO',
  'assassino-imperial',
  'A política é um jogo perigoso, e nem todos eles são encontrados no campo de batalha. O Assassino se especializa em remover ''obstáculos'' com discrição. Ele será contratará pelo maior lance e a satisfação é garantida. Ele despacha suas tarefas desagradáveis com meticulosidade e fineza. Entre seus trabalhos, tal figura frequentemente se junta a um bando errante para aprimorar suas habilidades; assassinato não é uma profissão para os mal-treinados!',
  ARRAY['Todos'],
  ARRAY[]::text[],
  22,
  'humano',
  40,
  13,
  3,
  2,
  10,
  1,
  12,
  0,
  5,
  NULL,
  '[
    {"label": "Envenenador", "value": "Assassinos se especializam no uso de venenos. O Assassino começa cada jogo com uma de suas armas envenenada com Lótus Negro ou Veneno Sombrio. O jogador controlador decide qual veneno o Assassino está armado antes do jogo começar, e este veneno não precisa ser comprado."}
  ]'::jsonb,
  false,
  false,
  false,
  false,
  NULL,
  NOW()
);

INSERT INTO mercenary_starting_equipment (id, figure_slug, equipment_slug, created_at)
VALUES 
  (gen_random_uuid(), 'assassino-imperial', 'espada', NOW()),
  (gen_random_uuid(), 'assassino-imperial', 'adaga', NOW()),
  (gen_random_uuid(), 'assassino-imperial', 'facas-de-arremesso', NOW()),
  (gen_random_uuid(), 'assassino-imperial', 'besta-de-mao', NOW());

INSERT INTO figure_to_skill_list (id, figure_slug, skill_list_slug, created_at)
VALUES 
  (gen_random_uuid(), 'assassino-imperial', 'combate', NOW()),
  (gen_random_uuid(), 'assassino-imperial', 'atirador', NOW()),
  (gen_random_uuid(), 'assassino-imperial', 'agilidade', NOW()),
  (gen_random_uuid(), 'assassino-imperial', 'assassino', NOW());

-- 12. Atirador de Elite Tileano
INSERT INTO base_figures (
  id, name, role, slug, lore, avaiability, exclusions, quality, race, 
  cost, movement, fight, shoot, armour, will, health, strength, 
  equipment_slots, startingxp, special_rules, can_get_blessings, 
  can_get_mutations, can_get_sacred_marks, no_xp, natural_attacks, created_at
) VALUES (
  gen_random_uuid(),
  'Atirador de Elite Tileano',
  'MERCENARIO',
  'atirador-de-elite-tileano',
  'O Império não é o único lugar que produz mercenários. As constantes guerras entre as cidades-estado de Tilea proporcionam muitas oportunidades para um homem que sabe usar uma arma. Ainda assim, às vezes as guerras civis diminuem em Tilea e muitos desses mercenários são forçados a buscar emprego em outras terras. Muitos desses matadores profissionais temporariamente desempregados ouviram falar dos problemas que se avolumam em Mordheim e vieram procurar um novo patrocinador.',
  ARRAY['Todos', 'Orcs', 'Mortos-Vivos'],
  ARRAY['Skaven'],
  16,
  'humano',
  30,
  10,
  1,
  2,
  11,
  0,
  12,
  0,
  5,
  NULL,
  '[
    {"label": "Mãos Firmes", "value": "A mira do Atirador de Elite Tileano nunca vacila. Ele pode gastar uma ação para mirar nos pontos fracos (pode substituir sua ação de movimento), ganhando Penetração de Armadura(2) no seu próximo ataque a distância."},
    {"label": "Tiro de Olho de Águia", "value": "O Atirador tem olhos de águia e pode acertar o menor alvo. Ele sempre ignora o primeiro terreno interposto (mas não cobertura) entre ele e o alvo dos seus ataque a distância. Adicionalmente, ele trata figuras com a Característica Furtividade(X) como (X+10)"}
  ]'::jsonb,
  false,
  false,
  false,
  false,
  NULL,
  NOW()
);

INSERT INTO mercenary_starting_equipment (id, figure_slug, equipment_slug, created_at)
VALUES 
  (gen_random_uuid(), 'atirador-de-elite-tileano', 'armadura-leve', NOW()),
  (gen_random_uuid(), 'atirador-de-elite-tileano', 'espada', NOW()),
  (gen_random_uuid(), 'atirador-de-elite-tileano', 'adaga', NOW()),
  (gen_random_uuid(), 'atirador-de-elite-tileano', 'besta', NOW());

INSERT INTO figure_to_skill_list (id, figure_slug, skill_list_slug, created_at)
VALUES 
  (gen_random_uuid(), 'atirador-de-elite-tileano', 'atirador', NOW());

-- 13. Bruxo
INSERT INTO base_figures (
  id, name, role, slug, lore, avaiability, exclusions, quality, race, 
  cost, movement, fight, shoot, armour, will, health, strength, 
  equipment_slots, startingxp, special_rules, can_get_blessings, 
  can_get_mutations, can_get_sacred_marks, no_xp, natural_attacks, created_at
) VALUES (
  gen_random_uuid(),
  'Bruxo',
  'MERCENARIO',
  'bruxo',
  'Magos, xamãs, místicos, todos estes e mais são associados com homens que podem empunhar o poder da magia. Toda magia é potencialmente perigosa e se origina do Caos, então aqueles abençoados (ou amaldiçoados) com o poder da feitiçaria são odiados e temidos. Ainda assim, não é difícil encontrar emprego se você é um mago, pois muitos estão dispostos a correr o risco da perseguição. Mas contratar um Bruxo não significa apenas que você perde seu ouro – se os ensinamentos do Culto de Sigmar são para ser acreditados, sua alma também está em risco...',
  ARRAY['Todos', 'Irmãs de Sigmar'],
  ARRAY['Caçadores de Bruxas'],
  16,
  'humano',
  30,
  8,
  0,
  0,
  10,
  1,
  12,
  0,
  5,
  NULL,
  '[
    {"label": "Magia", "value": "Bruxos são conjuradores da Tradição Magia Inferior. Eles são contratados com 1 magia dessa Tradição, e podem abrir mão de aprender uma habilidade para aprender uma nova magia ou reduzir a classe de dificuldade de uma magia que sabe em 1 ponto."}
  ]'::jsonb,
  false,
  false,
  false,
  false,
  NULL,
  NOW()
);

INSERT INTO mercenary_starting_equipment (id, figure_slug, equipment_slug, created_at)
VALUES 
  (gen_random_uuid(), 'bruxo', 'cajado', NOW());

INSERT INTO figure_to_skill_list (id, figure_slug, skill_list_slug, created_at)
VALUES 
  (gen_random_uuid(), 'bruxo', 'academico', NOW());

INSERT INTO figure_to_spell_lore (id, figure_slug, spell_lore_slug, created_at)
VALUES 
  (gen_random_uuid(), 'bruxo', 'magia-inferior', NOW());

-- 14. Menestrel
-- Nota: qualidade é uma string especial, usando 8 como base e adicionando a descrição nas special_rules
INSERT INTO base_figures (
  id, name, role, slug, lore, avaiability, exclusions, quality, race, 
  cost, movement, fight, shoot, armour, will, health, strength, 
  equipment_slots, startingxp, special_rules, can_get_blessings, 
  can_get_mutations, can_get_sacred_marks, no_xp, natural_attacks, created_at
) VALUES (
  gen_random_uuid(),
  'Menestrel',
  'MERCENARIO',
  'menestrel',
  'Nas ruas escuras e deprimentes de Mordheim, uma melodia empolgante que prenuncia a vitória do bando pode elevar até os espíritos mais deprimidos. Um Menestrel pode parecer fora de lugar na Cidade dos Condenados, mas há aqueles que estão dispostos a cantar seus hinos de batalha para qualquer um disposto a pagar. Estes homens são frequentemente treinados em combate também, pois apenas os cantores mais corajosos considerariam procurar uma audiência em Mordheim.',
  ARRAY['Mercenários', 'Irmãs de Sigmar', 'Caçadores de Bruxas'],
  ARRAY[]::text[],
  8,
  'humano',
  20,
  8,
  3,
  3,
  10,
  3,
  10,
  0,
  5,
  NULL,
  '[
    {"label": "Cantor", "value": "As canções de guerra empolgantes do Menestrel fortalecem os corações de todos ao seu redor. Qualquer figura dentro de 15cm do Menestrel tem +1 em Vontade."},
    {"label": "Qualidade Dinâmica", "value": "O Bardo aumenta a qualidade do bando em 8 pontos, +1 para cada ponto de experiência que tem."}
  ]'::jsonb,
  false,
  false,
  false,
  false,
  NULL,
  NOW()
);

INSERT INTO mercenary_starting_equipment (id, figure_slug, equipment_slug, created_at)
VALUES 
  (gen_random_uuid(), 'menestrel', 'espada', NOW()),
  (gen_random_uuid(), 'menestrel', 'adaga', NOW()),
  (gen_random_uuid(), 'menestrel', 'armadura-leve', NOW());

INSERT INTO figure_to_skill_list (id, figure_slug, skill_list_slug, created_at)
VALUES 
  (gen_random_uuid(), 'menestrel', 'academico', NOW()),
  (gen_random_uuid(), 'menestrel', 'agilidade', NOW());

-- 15. Orc Negro Capataz
INSERT INTO base_figures (
  id, name, role, slug, lore, avaiability, exclusions, quality, race, 
  cost, movement, fight, shoot, armour, will, health, strength, 
  equipment_slots, startingxp, special_rules, can_get_blessings, 
  can_get_mutations, can_get_sacred_marks, no_xp, natural_attacks, created_at
) VALUES (
  gen_random_uuid(),
  'Orc Negro Capataz',
  'MERCENARIO',
  'orc-negro-capataz',
  'Escolhidos à mão de um grupo de seus melhores guardas, estes Orcs de elite foram ordenados por ninguém menos que Grimgor Ironhide para se infiltrar em Mordheim e manter um olho no saque obtido na Cidade dos Condenados.',
  ARRAY['Horda Orc', 'Goblins'],
  ARRAY[]::text[],
  15,
  'orc',
  60,
  9,
  2,
  1,
  13,
  0,
  12,
  1,
  5,
  NULL,
  '[
    {"label": "CALA BOCA, PORRA!", "value": "Enquanto um Chefaum Orc ou um Chefim Goblin tem este guerreiro feroz no bando, os pele-verde relutam em causar problemas. Qualquer Orc ou Goblin dentro de 15cm do Orc Negro não sofre os efeitos da Animosidade. O resto do bando testa normalmente."},
    {"label": "É NÓIS!", "value": "Se qualquer líder Orc ou Goblin for reduzido a zero de vida durante a batalha, o Orc Negro assume o controle do bando. Pela duração da batalha ele ganha a habilidade ''Líder''. Se o líder Orc ou Goblin receber o resultado ''Morto'' após a batalha, então o Orc Negro decide preencher a nova posição vaga permanentemente. O Orc Negro se torna o novo líder do bando, mas mantém seu custo de manutenção."}
  ]'::jsonb,
  false,
  false,
  false,
  false,
  NULL,
  NOW()
);

INSERT INTO mercenary_starting_equipment (id, figure_slug, equipment_slug, created_at)
VALUES 
  (gen_random_uuid(), 'orc-negro-capataz', 'armadura-pesada', NOW()),
  (gen_random_uuid(), 'orc-negro-capataz', 'elmo', NOW()),
  (gen_random_uuid(), 'orc-negro-capataz', 'arma-de-duas-maos', NOW());

INSERT INTO figure_to_skill_list (id, figure_slug, skill_list_slug, created_at)
VALUES 
  (gen_random_uuid(), 'orc-negro-capataz', 'combate', NOW()),
  (gen_random_uuid(), 'orc-negro-capataz', 'forca', NOW());

-- 16. Gecko-Camaleão
-- Nota: qualidade é uma string especial, usando 16 como base e adicionando a descrição nas special_rules
INSERT INTO base_figures (
  id, name, role, slug, lore, avaiability, exclusions, quality, race, 
  cost, movement, fight, shoot, armour, will, health, strength, 
  equipment_slots, startingxp, special_rules, can_get_blessings, 
  can_get_mutations, can_get_sacred_marks, no_xp, natural_attacks, created_at
) VALUES (
  gen_random_uuid(),
  'Gecko-Camaleão',
  'MERCENARIO',
  'gecko-camaleao',
  'Geckos-Camaleão são uma raça incrivelmente rara de Skink que pode mudar a cor de sua pele à vontade para se misturar com seu ambiente. Desnecessário dizer que eles são muito furtivos e difíceis de detectar.',
  ARRAY['Reptilianos'],
  ARRAY[]::text[],
  16,
  'skink',
  70,
  17,
  2,
  2,
  9,
  0,
  12,
  1,
  5,
  NULL,
  '[
    {"label": "Ancestralidade Reptiliana", "value": "O Gecko Crista-Alta tem a característica Anfíbio."},
    {"label": "Pele de Camaleão", "value": "Devido a sua camuflagem natural, o Gecko-Camaleão tem a característica Furtividade(25). Adicionalmente, ele ganha +2 nos seus testes de Ímpeto contra ataques a distância se estiver em cobertura."},
    {"label": "Infiltrador", "value": "O Camaleão Skink é um mestre do disfarce e posicionamento. Você pode posicioná-lo em qualquer lugar do tabuleiro fora da linha de visão e a pelo menos 30cm de qualquer modelo inimigo."},
    {"label": "Qualidade Dinâmica", "value": "O Gecko-Camaleão aumenta a qualidade do bando em 16 pontos, +1 para cada ponto de experiência que tem."}
  ]'::jsonb,
  false,
  false,
  false,
  false,
  NULL,
  NOW()
);

INSERT INTO mercenary_starting_equipment (id, figure_slug, equipment_slug, created_at)
VALUES 
  (gen_random_uuid(), 'gecko-camaleao', 'adaga', NOW()),
  (gen_random_uuid(), 'gecko-camaleao', 'zarabatana', NOW()),
  (gen_random_uuid(), 'gecko-camaleao', 'broquel', NOW());

INSERT INTO figure_to_skill_list (id, figure_slug, skill_list_slug, created_at)
VALUES 
  (gen_random_uuid(), 'gecko-camaleao', 'atirador', NOW()),
  (gen_random_uuid(), 'gecko-camaleao', 'agilidade', NOW());
