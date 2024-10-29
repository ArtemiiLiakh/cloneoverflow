import { QuestionStatusEnum } from "../enums/statuses/QuestionStatus";

export class QuestionCreateResponse {
  id: string;
  title: string;
  text: string;
  rate: number;
  views: number;
  status: QuestionStatusEnum;
  createdAt: Date;
  updatedAt: Date;
}