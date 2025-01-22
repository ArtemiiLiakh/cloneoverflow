import { QuestionUserStatusEnum } from '@cloneoverflow/common';
import { QuestionUser } from '@core/domain/entities/QuestionUser';
import { QuestionRepository } from '@core/domain/repositories/question/QuestionRepository';
import { QuestionUserRepository } from '@core/domain/repositories/question/QuestionUserRepository';
import { IQuestionAddViewerService } from '../types';
import { QuestionGetInput, QuestionGetOutput } from './dto';
import { IQuestionGetUseCase } from './type';

export class QuestionGetUseCase implements IQuestionGetUseCase {
  constructor (
    private questionRepository: QuestionRepository,
    private questionUserRepository: QuestionUserRepository,
    private addViewerService: IQuestionAddViewerService,
  ) {}

  async execute (
    { executorId, questionId }: QuestionGetInput,
  ): Promise<QuestionGetOutput> {
    const question = await this.questionRepository.getQuestion({
      where: { questionId },
      include: {
        owner: true,
        tags: true,
      },
    });

    let voter: QuestionUser | undefined;

    if (executorId) {
      await this.addViewerService.execute({
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
      owner: question.owner ? {
        id: question.owner.id,
        name: question.owner.name,
        rating: question.owner.rating,
        username: question.owner.username,
      } : null,
      tags: question.tags ?? [],
      voter,
    };
  }
}