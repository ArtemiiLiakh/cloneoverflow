import { UserGetAnswersPath } from './UserGetAnswers';
import { UserGetPath } from './UserGet';
import { UserGetProfilePath } from './UserGetProfile';
import { UserGetQuestionsPath } from './UserGetQuestions';
import { UserUpdatePath } from './UserUpdate';
import { userPath } from './paths';

export * from './paths';
export * from './UserGetAnswers';
export * from './UserGet';
export * from './UserGetProfile';
export * from './UserGetQuestions';
export * from './UserUpdate';

export const UserPaths = {
  MainPath: userPath,
  Get: UserGetPath,
  GetProfile: UserGetProfilePath,
  Update: UserUpdatePath,
  GetAnswers: UserGetAnswersPath,
  GetQuestions: UserGetQuestionsPath,
}