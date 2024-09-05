export interface Answer {
  id: string;
  ownerId: string;
  text: string;
  rate: number;
  isSolution: boolean;
  createdAt: Date;
  updatedAt: Date;
}