import { AnswerRepository } from '@core/domain/repositories/answer/AnswerRepository';
import { UserAnswersSortBy } from '@core/services/utils/answer/AnswersSortBy';
import { AnswerServiceInput } from '../dtos/AnswerServiceInput';
import { AnswerServiceOutput } from '../dtos/AnswerServiceOutput';
import { IAnswerGetAllUseCase } from '../types/usecases';
import { AnswerUserRepository } from '@core/domain/repositories/answer/AnswerUserRepository';
import { AnswerUserStatusEnum } from '@cloneoverflow/common';

export class AnswerGetAllUseCase implements IAnswerGetAllUseCase {
  constructor (
    private answerRepository: AnswerRepository,
    private answerUserRepository: AnswerUserRepository,
  ) {}

  async execute ({ 
    executorId,
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

    let voter;
  
    if (executorId) {
      voter = await this.answerUserRepository.getOne({
        where: {
          userId: executorId,
          status: AnswerUserStatusEnum.VOTER,
        },
      });
    }
    
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
        owner: answer.owner!,
        question: answer.question!,
        userStats: voter ?? null,
      })),
      pagination: answers.pagination,
    };
  }
}