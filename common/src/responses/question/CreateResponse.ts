export interface QuestionCreateResponse {
  id: string;
  ownerId: string;
  title: string;
  text: string;
  rating: number;
  views: number;
  isClosed: boolean;
  createdAt: Date;
  updatedAt: Date;
}