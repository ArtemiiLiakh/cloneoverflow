import { UserStatus } from "../types";

class UserProfile {
  userId: string;
  name: string;
  username: string;
  reputation: number;
  about: string;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
}

export class QuestionGetDTO {
  id: string;
  userId: string;
  userProfile: UserProfile;
  title: string;
  text: string;
  rate: string;
  status: string;
  answers: string;
  tags: string;
  createdAt: string;
  updatedAt: string;
}