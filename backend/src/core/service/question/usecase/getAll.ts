import { QuestionRepository } from "@core/domain/repositories/question/QuestionRepository";
import { QuestionsSortBy } from "@core/service/utils/QuestionServiceUtils/QuestionsSortBy";
import { QuestionServiceInput } from "../dto/QuestionServiceInput";
import { QuestionServiceOutput } from "../dto/QuestionServiceOutput";
import { IQuestionGetAllUseCase } from "../types/usecases";

export class QuestionGetAllUseCase implements IQuestionGetAllUseCase {
  constructor (
    private questionRepository: QuestionRepository,
  ) {}

  async execute({ 
      ownerId, 
      rateFrom, 
      rateTo, 
      search, 
      tags, 
      sortBy, 
      orderBy, 
      pagination 
    }: QuestionServiceInput.GetAll
  ): Promise<QuestionServiceOutput.GetAll> {
    const orderByMap = QuestionsSortBy(sortBy, orderBy);

    const questions = await this.questionRepository.paginate({
      where: {
        title: {
          contains: search,
        },
        tags: {
          text: {
            in: tags,
          }
        },
        rate: {
          geq: rateFrom,
          leq: rateTo,
        },
        ownerId,
      },
      pagination,
      options: {
        include: {
          owner: true,
          tags: true,
        },
        count: {
          answers: true,
        },
        orderBy: orderByMap,
      },
    });
  
    const data: QuestionServiceOutput.GetAll["data"] = questions.data.map((question) => ({
      entity: question.entity,
      owner: question.owner!,
      tags: question.tags!,
      answerAmount: question.counts?.answers ?? 0,
    }));
  
    return {
      data,
      pagination: questions.pagination,
    };
  }
}