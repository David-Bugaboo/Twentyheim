import type { Equipment } from "./equipment.type";
import type { Figure } from "./figure.type";

export interface Warband {
  id: string;
  uid: string;
  crowns: number;
  name: string;
  vault: Equipment[];
  figures: Figure[];
}
