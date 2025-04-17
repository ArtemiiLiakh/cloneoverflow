import { QuestionGetResponse } from '@cloneoverflow/common';
import { QuestionGetDetailsOutput } from '@core/services/question/dtos';

export const QuestionGetDetailsMapper = (question: QuestionGetDetailsOutput): QuestionGetResponse => {
  return {
    id: question.questionId,
    title: question.title,
    text: question.text,
    rating: question.rating,
    views: question.views,
    isClosed: question.isClosed,
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