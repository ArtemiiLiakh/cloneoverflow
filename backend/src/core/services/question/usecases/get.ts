import { NoEntityWithIdException, QuestionUserStatusEnum } from '@cloneoverflow/common';
import { QuestionRepository } from '@core/domain/repositories/question/QuestionRepository';
import { QuestionUserRepository } from '@core/domain/repositories/question/QuestionUserRepository';
import { QuestionServiceInput } from '../dtos/QuestionServiceInput';
import { QuestionServiceOutput } from '../dtos/QuestionServiceOutput';
import { IQuestionAddViewerUseCase, IQuestionGetUseCase } from '../types/usecases';

export class QuestionGetUseCase implements IQuestionGetUseCase {
  
  constructor (
    private questionRepository: QuestionRepository,
    private questionUserRepository: QuestionUserRepository,
    private addViewerUseCase: IQuestionAddViewerUseCase,
  ) {}

  async execute (
    { executorId, questionId }: QuestionServiceInput.Get,
  ): Promise<QuestionServiceOutput.Get> {
    const question = await this.questionRepository.getQuestion({
      where: { questionId },
      include: {
        owner: true,
        tags: true,
      },
    });

    if (!question) {
      throw new NoEntityWithIdException('Question');
    }
  
    let voter;

    if (executorId) {
      await this.addViewerUseCase.execute({
        executorId,
        questionId,
      });

      voter = await this.questionUserRepository.getOne({
        where: {
          questionId,
          userId: executorId,
          status: QuestionUserStatusEnum.VOTER,
        },
      });
    }
  
    return {
      entity: question.entity, 
      owner: {
        id: question.owner!.id,
        name: question.owner!.name,
        rating: question.owner!.rating,
        username: question.owner!.username,
      },
      tags: question.tags,
      voter: voter ?? null,
    };
  }
}