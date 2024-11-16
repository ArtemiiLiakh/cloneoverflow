import { UserRepositoryInput } from '@core/domain/repositories/user/input/UserRepositoryInput';
import { Prisma } from '@prisma/client';
import { AnswerWhereAdapter } from '../where/answer/AnswerWhereAdapter';
import { QuestionWhereAdapter } from '../where/question/QuestionWhereAdapter';
import { IncludeParams } from './utils/IncludeParams';

export const UserIncludeAdapter = (
  include: UserRepositoryInput.UserInclude | undefined,
  count: UserRepositoryInput.UserCount | undefined,
): Prisma.UserInclude => {
  if (!include && !count) return {};
  
  return {
    answers: IncludeParams<Prisma.AnswerWhereInput>(include?.answers, AnswerWhereAdapter), 
    questions: IncludeParams<Prisma.QuestionWhereInput>(include?.questions, QuestionWhereAdapter),
    _count: count ? {
      select: {
        answers: IncludeParams<Prisma.AnswerWhereInput>(count?.answers, AnswerWhereAdapter),
        questions: IncludeParams<Prisma.QuestionWhereInput>(count?.answers, QuestionWhereAdapter),
      },
    } : false,
  };
};