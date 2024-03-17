import { QuestionStatus, Tag } from "@prisma/client";

export class QuestionUpdateResponse{
  id: string;
  title: string;
  text: string;
  rate: number;
  status: QuestionStatus;
  createdAt: Date;
  updatedAt: Date;
  tags: Tag[];
}