import { BaseFigure } from './base-figure.entity';

export class BaseFigureToWarbandSoldier {
  id!: string;
  baseFigureSlug!: string;
  warbandSoldierId!: string;
  createdAt!: Date;
  baseFigure?: BaseFigure;
}
