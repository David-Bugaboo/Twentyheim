export interface Equipment {
  id: string;
  base_equipment_id: string;
  base_modifier_id?: string;
  // Flags para determinar onde o equipamento está equipado
  mainHandWeapon?: boolean; // Equipado na mão primária
  offHandWeapon?: boolean; // Equipado na mão secundária
  twoHandedWeapon?: boolean; // Equipado como duas mãos (versátil em modo duas mãos ou arma de duas mãos)
  // Nota: Para armas "Par", ambos mainHandWeapon e offHandWeapon são true
}
