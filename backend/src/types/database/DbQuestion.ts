import { UserProfile, QuestionStatus, Answer, QuestionTags } from "@prisma/client";

export class DbQuestion {
  id: string;
  userId: string;
  userProfile: UserProfile;
  title: string;
  text: string;
  rate: number;
  status: QuestionStatus;
  answers: Answer[];
  tags: QuestionTags[];
  createdAt: Date;
  updatedAt: Date;
};