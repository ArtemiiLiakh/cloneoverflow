import { QuestionUserStatusEnum } from '@cloneoverflow/common';
import { QuestionUser } from '@core/domain/entities/QuestionUser';
import { QuestionRepository } from '@core/domain/repositories/question/QuestionRepository';
import { QuestionUserRepository } from '@core/domain/repositories/question/QuestionUserRepository';
import { UnitOfWork } from '@core/domain/repositories/UnitOfWork';
import { QuestionServiceInput } from '../dtos/QuestionServiceInput';
import { QuestionServiceOutput } from '../dtos/QuestionServiceOutput';
import { IQuestionAddViewerUseCase } from '../types/usecases';

export class QuestionAddViewerUseCase implements IQuestionAddViewerUseCase {
  constructor (
    private questionRepository: QuestionRepository,
    private questionUserRepository: QuestionUserRepository,
    private unitOfWork: UnitOfWork,
  ) {}

  async execute (
    { executorId, questionId }: QuestionServiceInput.AddViewer,
  ): Promise<QuestionServiceOutput.AddViewer> {
    await this.questionRepository.validateById({ questionId });

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