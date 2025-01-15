import { QuestionRepository } from '@core/domain/repositories/question/QuestionRepository';
import { QuestionsSortBy } from '@core/services/utils/question/QuestionsSortBy';
import { QuestionServiceInput } from '../dtos/QuestionServiceInput';
import { QuestionServiceOutput } from '../dtos/QuestionServiceOutput';
import { IQuestionGetAllUseCase } from '../types/usecases';

export class QuestionGetAllUseCase implements IQuestionGetAllUseCase {
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
  }: QuestionServiceInput.GetAll): Promise<QuestionServiceOutput.GetAll> {
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
  
    return {
      data: questions.data.map((question) => ({
        entity: {
          id: question.entity.id!,
          ownerId: question.entity.ownerId!,
          title: question.entity.title!,
          rating: question.entity.rating!,
          views: question.entity.views!,
          isClosed: question.entity.isClosed!,
          createdAt: question.entity.createdAt!,
        },
        owner: {
          id: question.owner!.id,
          name: question.owner!.name,
          username: question.owner!.username,
          rating: question.owner!.rating,
        },
        tags: question.tags ?? [],
        answerAmount: question.counts?.answers ?? 0,
      })),
      pagination: questions.pagination,
    };
  }
}