export class AnswerGetResponse {
  id: string;
  text: string;
  rate: number;
  isSolution: boolean;
  owner: {
    id: string;
    name: string;
    username: string;
    reputation: number;
  };
  createdAt: Date;
  updatedAt: Date;
}