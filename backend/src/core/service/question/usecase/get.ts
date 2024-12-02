import { NoEntityWithIdException, QuestionUserStatusEnum } from '@cloneoverflow/common';
import { QuestionRepository } from '@core/domain/repositories/question/QuestionRepository';
import { QuestionServiceInput } from '../dto/QuestionServiceInput';
import { QuestionServiceOutput } from '../dto/QuestionServiceOutput';
import { IQuestionAddViewerUseCase, IQuestionGetUseCase } from '../types/usecases';

export class QuestionGetUseCase implements IQuestionGetUseCase {
  
  constructor (
    private questionRepository: QuestionRepository,
    private addViewerUseCase: IQuestionAddViewerUseCase,
  ) {}

  async execute (
    { executorId, questionId }: QuestionServiceInput.Get,
  ): Promise<QuestionServiceOutput.Get> {
    const question = await this.questionRepository.findById({
      id: questionId,
      options: {
        include: {
          owner: true,
          tags: true,
          users: {
            userId: executorId,
            status: QuestionUserStatusEnum.VOTER,
          },
        },
      },
    });

    if (!question) {
      throw new NoEntityWithIdException('Question');
    }
  
    if (executorId) {
      await this.addViewerUseCase.execute({
        executorId,
        questionId,
      });
    }
  
    return {
      entity: question.entity, 
      owner: question.owner,
      tags: question.tags,
    };
  }
}