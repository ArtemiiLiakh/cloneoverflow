import { AnswerRepositoryOutput } from '@core/domain/repositories/answer/dtos/AnswerRepositoryOutput';
import { AnswerGetManyOutput } from './dto';

export const getManyOutputMapper = (
  answers: AnswerRepositoryOutput.GetMany,
): AnswerGetManyOutput => ({
  data: answers.data.map(answer => ({
    entity: {
      id: answer.entity.id!,
      questionId: answer.entity.questionId!,
      ownerId: answer.entity.ownerId!,
      text: answer.entity.text!,
      rating: answer.entity.rating!,
      isSolution: answer.entity.isSolution!,
      createdAt: answer.entity.createdAt!,
      updatedAt: answer.entity.updatedAt!,
    },
    owner: {
      id: answer.owner!.id,
      name: answer.owner!.name,
      rating: answer.owner!.rating,
      username: answer.owner!.username,
    },
    question: {
      id: answer.question!.id,
      ownerId: answer.question!.ownerId,
      rating: answer.question!.rating,
      title: answer.question!.title,
    },
  })),
  pagination: answers.pagination,
});