import { Tag, UserStatus } from '@cloneoverflow/common';
import { Answer, Question, UserProfile } from '@prisma/client';

export class DbUser {
  id: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  userProfile: UserProfile;
};

export class DbUserProfile {
  userId: string;
  name: string;
  username: string;
  reputation: number;
  about: string | null;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
  answers: (Answer & {
    question: Question;
  })[];
  questions: Question[];
}

export class DbUserGetProfile extends DbUser {
  userProfile: DbUserProfile & {
    answers: (Answer & {
      question: Question;
    })[];
    questions: (Question & {
      _count: {
        answers: number;
      };
      tags: Tag[];
    })[];
    _count: {
      answers: number;
      questions: number;
    };
  };
}

