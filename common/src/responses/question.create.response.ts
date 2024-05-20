import { QuestionStatus } from '../types/QuestionStatus';

export class QuestionCreateResponse {
  id: string;
  title: string;
  text: string;
  rate: number;
  status: QuestionStatus;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: string;
    name: string;
    username: string;
    reputation: number;
  }
  tag: {
    id: string;
    name: string;
  }[]
}