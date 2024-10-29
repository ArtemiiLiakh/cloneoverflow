import { QuestionStatusEnum } from "../enums/statuses/QuestionStatus";
import { UserStatusEnum } from "../enums/statuses/UserStatus";

export class UserGetProfileResponse {
  id: string;
  name: string;
  username: string;
  about: string | null;
  reputation: number;
  status: UserStatusEnum;
  answersAmount: number;
  questionsAmount: number;
  bestAnswer: {
    id: string;
    text: string;
    rate: number;
    isSolution: boolean;
    createdAt: Date;
    updatedAt: Date;
    question: {
      id: string;
      title: string;
    };
  } | null;
  bestQuestion: {
    id: string;
    title: string;
    rate: number;
    status: QuestionStatusEnum;
    tags: string[];
    answersAmount: number;
    createdAt: Date;
    updatedAt: Date;
  } | null;
  createdAt: Date;
  updatedAt: Date;
}