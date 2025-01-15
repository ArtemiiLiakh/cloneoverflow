import { AnswerRepository } from '@core/domain/repositories/answer/AnswerRepository';
import { UserAnswersSortBy } from '@core/services/utils/answer/AnswersSortBy';
import { AnswerServiceInput } from '../dtos/AnswerServiceInput';
import { AnswerServiceOutput } from '../dtos/AnswerServiceOutput';
import { IAnswerGetAllUseCase } from '../types/usecases';

export class AnswerGetAllUseCase implements IAnswerGetAllUseCase {
  constructor (
    private answerRepository: AnswerRepository,
  ) {}

  async execute ({ 
    ownerId, 
    rateFrom, 
    rateTo, 
    searchText, 
    orderBy, 
    sortBy, 
    pagination, 
    questionId, 
  }: AnswerServiceInput.GetAll): Promise<AnswerServiceOutput.GetAll> {
    const orderByMap = UserAnswersSortBy(sortBy, orderBy);

    const answers = await this.answerRepository.getMany({
      where: {
        questionId,
        ownerId,
        rating: {
          geq: rateFrom,
          leq: rateTo,
        },
        OR: !searchText ? undefined : [
          { text: { contains: searchText } },
          { 
            question: { 
              title: { contains: searchText },
            }, 
          },
        ],
      },
      pagination: {
        page: pagination?.page,
        pageSize: pagination?.pageSize,
      }, 
      include: {
        owner: true,
        question: true,
      },
      orderBy: orderByMap,
    });
  
    return {
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
    };
  }
}