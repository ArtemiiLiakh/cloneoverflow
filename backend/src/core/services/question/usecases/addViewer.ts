import { QuestionUserStatusEnum } from '@cloneoverflow/common';
import { QuestionRepository } from '@core/domain/repositories/question/QuestionRepository';
import { QuestionUserRepository } from '@core/domain/repositories/question/QuestionUserRepository';
import { IValidateQuestionUseCase } from '@core/services/validation/types/usecases';
import { QuestionServiceInput } from '../dtos/QuestionServiceInput';
import { QuestionServiceOutput } from '../dtos/QuestionServiceOutput';
import { IQuestionAddViewerUseCase } from '../types/usecases';

export class QuestionAddViewerUseCase implements IQuestionAddViewerUseCase {
  constructor (
    private questionRepository: QuestionRepository,
    private questionUserRepository: QuestionUserRepository,
    private validateQuestionUseCase: IValidateQuestionUseCase,
  ) {}

  async execute (
    { executorId, questionId }: QuestionServiceInput.AddViewer,
  ): Promise<QuestionServiceOutput.AddViewer> {
    await this.validateQuestionUseCase.execute({ questionId });

    const viewer = await this.questionUserRepository.getOne({
      where: {
        questionId,
        userId: executorId,
        status: QuestionUserStatusEnum.VIEWER,
      },
    });

    if (!viewer) {
      await this.questionRepository.addViewer({
        questionId,
        userId: executorId,
      });
    }
  }
}