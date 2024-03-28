export class AnswerCreateResponse {
  id: string;
  questionId: string;
  userId: string;
  text: string;
  rate: number;
  isSolution: boolean;
  createdAt: Date;
}