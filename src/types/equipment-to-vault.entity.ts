import { Equipment } from "./equipment.entity";
import { Modifier } from "./modifier.entity";

export class EquipmentToVault {
  id!: string;
  warbandId!: string;
  equipmentSlug!: string;
  createdAt!: Date;
  customPrice?: number | null;
  modifierSlug?: string | null;
  equipment?: Equipment;
  modifier?: Modifier | null;
}


