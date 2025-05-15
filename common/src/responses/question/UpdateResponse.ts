export interface QuestionUpdateResponse {
  id: string;
  title: string;
  text: string;
  rate: number;
  views: number;
  isClosed: boolean;
  createdAt: Date;
  updatedAt: Date;
}