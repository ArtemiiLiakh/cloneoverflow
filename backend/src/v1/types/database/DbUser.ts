import { Tag, UserStatus } from '@cloneoverflow/common';
import { Answer, Question, User, UserAnswers, UserProfile, UserQuestions } from '@prisma/client';

export class DbUser implements User {
  id: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  userProfile: UserProfile;
};

export class DbUserGetProfile extends DbUser {
  userProfile: {
    userId: string;
    name: string;
    username: string;
    reputation: number;
    about: string | null;
    status: UserStatus;
    createdAt: Date;
    updatedAt: Date;
    userAnswers: (UserAnswers & {
      answer: Answer & {
        question: Question;
      };
    })[];
    userQuestions: (UserQuestions & {
      question: Question & {
        _count: {
          answers: number;
        };
        tags: Tag[];
      };
    })[];
    _count: {
      userAnswers: number;
      userQuestions: number;
    };
  };
}

