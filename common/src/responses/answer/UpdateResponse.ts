export interface AnswerUpdateResponse {
  id: string;
  questionId: string;
  ownerId: string;
  text: string;
  rate: number;
  isSolution: boolean;
  createdAt: Date;
}