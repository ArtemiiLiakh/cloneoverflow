export interface QuestionGetResponse {
  id: string;
  owner: {
    id: string;
    name: string;
    username: string;
    reputation: number;
  } | null;
  title: string;
  text: string;
  rate: number;
  views: number;
  isClosed: boolean;
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
}