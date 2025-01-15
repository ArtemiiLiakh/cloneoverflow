import { QuestionUserStatusEnum } from '@cloneoverflow/common';
import { QuestionUser } from '@core/domain/entities/QuestionUser';
import { QuestionUserRepository } from '@core/domain/repositories/question/QuestionUserRepository';
import { UnitOfWork } from '@core/domain/repositories/UnitOfWork';
import { IValidateQuestionUseCase } from '@core/services/validation/types/usecases';
import { QuestionServiceInput } from '../dtos/QuestionServiceInput';
import { QuestionServiceOutput } from '../dtos/QuestionServiceOutput';
import { IQuestionAddViewerUseCase } from '../types/usecases';

export class QuestionAddViewerUseCase implements IQuestionAddViewerUseCase {
  constructor (
    private unitOfWork: UnitOfWork,
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

    if (viewer) return;

    await this.unitOfWork.execute((unit) => [
      unit.questionRepository.addViewer({
        questionId,
      }),
      unit.questionUserRepository.create({
        user: QuestionUser.new({
          questionId,
          userId: executorId,
          status: QuestionUserStatusEnum.VIEWER,
        }),
      }),
    ]);
  }
}