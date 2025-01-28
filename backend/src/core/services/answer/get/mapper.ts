import { AnswerRepositoryOutput } from '@core/domain/repositories/answer/dtos/AnswerRepositoryOutput';
import { AnswerGetOutput } from './dto';

export const getOutputMapper = (answer: AnswerRepositoryOutput.GetAnswer): AnswerGetOutput => ({
  entity: answer.entity,
  owner: answer.owner ? {
    id: answer.owner.id,
    name: answer.owner.name,
    username: answer.owner.username,
    rating: answer.owner.rating,
  } : null,
  question: {
    id: answer.question!.id,
    ownerId: answer.question!.ownerId,
    title: answer.question!.title,
    rating: answer.question!.rating,
    isClosed: answer.question!.isClosed,
  },
});