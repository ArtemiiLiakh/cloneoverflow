import { QuestionGetResponse } from '@cloneoverflow/common/api/question';
import { QuestionGetDetailsOutput } from '@application/question/usecases/dtos';

export const QuestionGetDetailsMapper = (question: QuestionGetDetailsOutput): QuestionGetResponse => {
  return {
    id: question.questionId,
    title: question.title,
    text: question.text,
    rating: question.rating,
    views: question.views,
    isClosed: question.isClosed,
    isFavorite: question.isFavorite,
    createdAt: question.createdAt,
    updatedAt: question.updatedAt,
    myVoteType: question.voter ? question.voter.voteType : null,
    owner: question.owner ? {
      id: question.owner.userId,
      name: question.owner.name,
      username: question.owner.username,
      rating: question.owner.rating,
    } : null,
    tags: question.tags.map(tag => tag.name),
  };
};