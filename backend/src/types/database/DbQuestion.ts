import { UserProfile, QuestionStatus, Answer, Tag } from "@prisma/client";

export class DbQuestion {
  id: string;
  userId: string;
  userProfile: UserProfile;
  title: string;
  text: string;
  rate: number;
  status: QuestionStatus;
  answers: Answer[];
  tags: Tag[];
  createdAt: Date;
  updatedAt: Date;
};