import { AnswerRepositoryOutput } from '@core/repositories/answer/dtos/AnswerRepositoryOutput';
import { QuestionRepositoryOutput } from '@core/repositories/question/dtos/QuestionRepositoryOutput';
import { UserRepositoryOutput } from '@core/repositories/user/dtos/UserRepositoryOutput';
import { UserGetProfileOutput } from './dto';

interface MapperProps {
  user: UserRepositoryOutput.GetUser,
  bestQuestion: QuestionRepositoryOutput.GetPartialQuestion | null,
  bestAnswer: AnswerRepositoryOutput.GetPartialAnswer | null,
}

export const getProfileOutputMapper = ({
  user,
  bestQuestion,
  bestAnswer,
}: MapperProps): UserGetProfileOutput => ({
  user: user.entity, 
  bestQuestion: bestQuestion ? {
    entity: {
      questionId: bestQuestion.entity.id!,
      ownerId: bestQuestion.entity.ownerId!,
      title: bestQuestion.entity.title!,
      rating: bestQuestion.entity.rating!,
      views: bestQuestion.entity.views!,
      isClosed: bestQuestion.entity.isClosed!,
      createdAt: bestQuestion.entity.createdAt!,
    },
    tags: bestQuestion.tags ?? [],
    answersAmount: bestQuestion.counts?.answers ?? 0,
  } : null, 
  bestAnswer: bestAnswer ? {
    entity: {
      answerId: bestAnswer.entity.id!,
      ownerId: bestAnswer.entity.ownerId!,
      questionId: bestAnswer.entity.questionId!,
      rating: bestAnswer.entity.rating!,
      isSolution: bestAnswer.entity.isSolution!,
      createdAt: bestAnswer.entity.createdAt!,
    },
    question: {
      questionId: bestAnswer.question!.id,
      ownerId: bestAnswer.question!.ownerId,
      title: bestAnswer.question!.title,
      rating: bestAnswer.question!.rating,
    },
  } : null,
  answersAmount: user.counts?.answers ?? 0,
  questionsAmount: user.counts?.questions ?? 0,
});