# Estrutura de Refatoração - WarbandDetailPage

## Estrutura Proposta

```
src/pages/tools/warband-detail/
├── components/
│   ├── CommonComponents.tsx          ✅ (StatRow, SectionCard, Spinner)
│   ├── CollapsibleSection.tsx        ✅
│   ├── AvailableFiguresSection.tsx   (Lista de figuras disponíveis)
│   ├── VaultSection.tsx              (Seção do cofre)
│   ├── SoldierListSection.tsx       (Lista de soldados no bando)
│   ├── SoldierDetailSection.tsx     (Detalhes do soldado selecionado)
│   ├── EquipmentSection.tsx          (Seção de equipamentos - equipados + inventário)
│   ├── SkillsSection.tsx             (Seção de habilidades colapsável)
│   ├── SpellsSection.tsx             (Seção de magias colapsável)
│   ├── modals/
│   │   ├── EquipmentDialog.tsx        (Modal de equipamentos disponíveis)
│   │   ├── SkillsDialog.tsx          (Modal de habilidades disponíveis)
│   │   ├── SpellsDialog.tsx          (Modal de magias disponíveis)
│   │   └── VaultModal.tsx            (Modal de compra/loot de equipamentos)
│   └── soldier-card/
│       ├── SoldierCard.tsx           (Card do soldado na lista)
│       └── SoldierActions.tsx        (Botões de ação do soldado)
├── hooks/
│   ├── useWarbandData.ts             (Carregamento de dados do bando)
│   ├── useSoldierManagement.ts       (Ações: add, fire, kill, undo)
│   ├── useEquipmentManagement.ts     (Equipar, desequipar, cofre)
│   ├── useSkillsManagement.ts        (Adicionar/remover habilidades)
│   ├── useSpellsManagement.ts        (Adicionar/remover magias)
│   └── useEquipmentCatalog.ts        (Catálogo de equipamentos)
├── utils/
│   ├── helpers.ts                    ✅ (normalizeString, parseSpecialRules, etc)
│   ├── equipment-helpers.ts          ✅ (extractEquipment, checkAvailability)
│   └── soldier-helpers.ts            (getSoldierRelations, groupSoldiers)
└── types/
    └── index.ts                       ✅ (Types compartilhados)
```

## Ordem de Implementação Sugerida

1. ✅ Utils e helpers básicos
2. ✅ Componentes comuns (StatRow, SectionCard, Spinner, CollapsibleSection)
3. Hook useWarbandData (carregamento principal)
4. Componente SkillsSection (já existe lógica, só extrair)
5. Componente SpellsSection (já existe lógica, só extrair)
6. Hook useSkillsManagement
7. Hook useSpellsManagement
8. Componente EquipmentSection
9. Hook useEquipmentManagement
10. Componentes de modais
11. Componentes de seções maiores (AvailableFiguresSection, etc)
12. Refatorar página principal

## Benefícios

- **Manutenibilidade**: Código organizado e fácil de encontrar
- **Reutilização**: Componentes e hooks podem ser reutilizados
- **Testabilidade**: Componentes menores são mais fáceis de testar
- **Performance**: Possibilidade de memoização mais granular
- **Legibilidade**: Página principal muito mais limpa

