import type { Equipment } from "./equipment.type";
import type { figure } from "./figure.type";


export interface Warband {
  id: string;
  uid: string;
  crowns: number;
  name: string;
  base_warband_id: number;
  vault: Equipment[];
  figures: figure[];
}
