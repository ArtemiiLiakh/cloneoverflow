import { questionPath } from './paths';

export const QuestionCreatePath = questionPath;

export interface QuestionCreateBody {
  title: string;
  text: string;
  tags?: string[];
}
 
export interface QuestionCreateResponse {
  id: string;
}