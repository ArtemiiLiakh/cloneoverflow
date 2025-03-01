import { QuestionRepository } from '@core/repositories/question/QuestionRepository';
import { QuestionsSortBy } from '@core/services/utils/QuestionsSortBy';
import { QuestionGetManyInput, QuestionGetManyOutput } from './dto';
import { IQuestionGetManyUseCase } from './type';
import { getManyOutputMapper } from './mapper';

export class QuestionGetManyUseCase implements IQuestionGetManyUseCase {
  constructor (
    private questionRepository: QuestionRepository,
  ) {}

  async execute ({ 
    ownerId, 
    rateFrom, 
    rateTo, 
    search, 
    tags, 
    sortBy, 
    orderBy, 
    pagination, 
  }: QuestionGetManyInput): Promise<QuestionGetManyOutput> {
    const orderByMap = QuestionsSortBy(sortBy, orderBy);

    const questions = await this.questionRepository.getMany({
      where: {
        ownerId,
        title: {
          contains: search,
        },
        rating: {
          geq: rateFrom,
          leq: rateTo,
        },
        tags: {
          name: {
            in: tags,
          },
        },
      },
      select: {
        id: true,
        ownerId: true,
        title: true,
        rating: true,
        views: true,
        isClosed: true,
        createdAt: true,
      },
      include: {
        owner: true,
        tags: true,
      },
      counts: {
        answers: true,
      },
      orderBy: orderByMap,
      pagination,
    });
  
    return getManyOutputMapper(questions);
  }
}