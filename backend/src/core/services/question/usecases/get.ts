import { QuestionUserStatusEnum } from '@cloneoverflow/common';
import { QuestionUser } from '@core/domain/entities/QuestionUser';
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

    let voter: QuestionUser | undefined;

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
      }) ?? undefined;
    }
  
    return {
      entity: question.entity, 
      owner: {
        id: question.owner!.id,
        name: question.owner!.name,
        rating: question.owner!.rating,
        username: question.owner!.username,
      },
      tags: question.tags ?? [],
      voter,
    };
  }
}