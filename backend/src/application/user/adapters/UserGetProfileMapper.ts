import { UserGetProfileResponse } from '@cloneoverflow/common/api/user';
import { UserGetProfileOutput } from '@application/user/usecases/dtos';

export function UserGetProfileMapperOutput (
  { user, bestAnswer, bestQuestion, answerAmount, questionAmount }: UserGetProfileOutput,
): UserGetProfileResponse {
  const answer: UserGetProfileResponse['bestAnswer'] = bestAnswer ? {
    id: bestAnswer.entity.answerId,
    rating: bestAnswer.entity.rating,
    isSolution: bestAnswer.entity.isSolution,
    createdAt: bestAnswer.entity.createdAt.toISOString(),
    question: {
      id: bestAnswer.question.questionId,
      title: bestAnswer.question.title,
      rating: bestAnswer.question.rating,
    },
  } : null;

  const question: UserGetProfileResponse['bestQuestion'] = bestQuestion ? {
    id: bestQuestion.entity.questionId,
    rating: bestQuestion.entity.rating,
    title: bestQuestion.entity.title,
    isClosed: bestQuestion.entity.isClosed,
    answersAmount: bestQuestion.answersAmount,
    tags: bestQuestion.tags.map(tag => tag.name),
    createdAt: bestQuestion.entity.createdAt.toISOString(),
  } : null;
  
  return {
    id: user.userId,
    name: user.name,
    username: user.username,
    rating: user.rating,
    about: user.about,
    status: user.status,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
    answerAmount,
    questionAmount,
    bestAnswer: answer,
    bestQuestion: question,
  };
}