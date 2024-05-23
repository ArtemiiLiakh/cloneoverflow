import { QuestionStatus } from '../types/QuestionStatus';
import { Tag } from '../types/Tag';

export class QuestionUpdateResponse{
  id: string;
  title: string;
  text: string;
  rate: number;
  views: number;
  status: QuestionStatus;
  createdAt: Date;
  updatedAt: Date;
  tags: Tag[];
}