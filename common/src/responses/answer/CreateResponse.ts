export interface AnswerCreateResponse {
  id: string;
  questionId: string;
  ownerId: string;
  text: string;
  rating: number;
  isSolution: boolean;
  createdAt: Date;
}