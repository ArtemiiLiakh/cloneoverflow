import { QuestionStatus } from "@cloneoverflow/common";

export interface Question {
  id: string;
  ownerId: string;
  title: string;
  text: string;
  rate: number;
  views: number;
  status: QuestionStatus;
  createdAt: Date;
  updatedAt: Date;
}