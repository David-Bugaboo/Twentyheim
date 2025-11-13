import { GiftOfTzeentch } from "./gift-of-tzeentch.entity";

export class GiftOfTzeentchToWarbandSoldier {
  id!: string;
  giftOfTzeentchSlug!: string;
  warbandSoldierId!: string;
  createdAt!: Date;
  giftOfTzeentch?: GiftOfTzeentch;
}


