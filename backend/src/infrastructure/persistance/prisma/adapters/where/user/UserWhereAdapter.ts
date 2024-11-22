import { UserRepositoryInput } from '@core/domain/repositories/user/input/UserRepositoryInput';
import { Prisma } from '@prisma/client';
import { UserWhereInputAdapter } from './UserWhereInputAdapter';
import { AnswerWhereInputAdapter } from '../answer/AnswerWhereInputAdapter';
import { QuestionWhereInputAdapter } from '../question/QuestionWhereInputAdapter';

export const UserWhereAdapter = (where: UserRepositoryInput.UserWhere): Prisma.UserWhereInput => {
  const { answers, questions } = where;
  
  return {
    ...UserWhereInputAdapter(where),
    
    answers: answers ? {
      some: AnswerWhereInputAdapter(answers),
    } : undefined,

    questions: questions ? {
      some: QuestionWhereInputAdapter(questions),
    } : undefined,
  };
};