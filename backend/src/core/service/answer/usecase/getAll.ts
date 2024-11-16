import { AnswerRepository } from '@core/domain/repositories/answer/AnswerRepository';
import { UserAnswersSortBy } from '@core/service/utils/answer/AnswersSortBy';
import { AnswerServiceInput } from '../dto/AnswerServiceInput';
import { AnswerServiceOutput } from '../dto/AnswerServiceOutput';
import { IAnswerGetAllUseCase } from '../types/usecases';
import { UserAnswerStatus } from '@prisma/client';

export class AnswerGetAllUseCase implements IAnswerGetAllUseCase {
  constructor (
    private answerRepository: AnswerRepository,
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

    const answers = await this.answerRepository.paginate({
      where: {
        questionId,
        ownerId,
        rate: {
          geq: rateFrom,
          leq: rateTo,
        },
        OR: [
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
      options: {
        include: {
          owner: true,
          question: true,
          users: {
            userId: executorId,
            status: UserAnswerStatus.VOTER,
          },
        },
        orderBy: orderByMap,
      },
    });
  
    return {
      data: answers.data.map(answer => ({
        entity: answer.entity,
        owner: answer.owner!,
        question: answer.question!,
        questionId: answer.question!.id,
        userStats: answer.users?.at(0),
      })),
      pagination: answers.pagination,
    };
  }
}