import { AnswerRepository } from '@core/repositories/answer/AnswerRepository';
import { UserAnswersSortBy } from '@core/services/utils/AnswersSortBy';
import { AnswerGetManyInput, AnswerGetManyOutput } from './dto';
import { IAnswerGetManyUseCase } from './type';
import { getManyOutputMapper } from './mapper';

export class AnswerGetManyUseCase implements IAnswerGetManyUseCase {
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
  }: AnswerGetManyInput): Promise<AnswerGetManyOutput> {
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
  
    return getManyOutputMapper(answers);
  }
}