import { QuestionStatus } from "@prisma/client";

export class QuestionCreateResponse {
  id: string;
  title: string;
  text: string;
  rate: number;
  status: QuestionStatus;
  createdAt: Date;
  updatedAt: Date;
  user: {
    name: string;
    username: string;
    reputation: number;
  }
  tag: {
    id: string;
    name: string;
  }[]
}