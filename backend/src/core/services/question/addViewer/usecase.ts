import { Exception, NoEntityWithIdException, QuestionUserStatusEnum } from '@cloneoverflow/common';
import { QuestionUser } from '@core/domain/entities';
import { QuestionRepository, QuestionUserRepository, UnitOfWork } from '@core/domain/repositories';
import { QuestionAddViewerInput, QuestionAddViewerOutput } from './dto';
import { IQuestionAddViewerUseCase } from './type';

export class QuestionAddViewerUseCase implements IQuestionAddViewerUseCase {
  constructor (
    private questionRepository: QuestionRepository,
    private questionUserRepository: QuestionUserRepository,
    private unitOfWork: UnitOfWork,
  ) {}

  async execute (
    { executorId, questionId }: QuestionAddViewerInput,
  ): Promise<QuestionAddViewerOutput> {
    if (!await this.questionRepository.isExist({ questionId })) {
      throw new NoEntityWithIdException('Question');
    }

    const viewer = await this.questionUserRepository.getOne({
      where: {
        questionId,
        userId: executorId,
        status: QuestionUserStatusEnum.VIEWER,
      },
    });

    if (viewer) return;
    
    await this.unitOfWork.executeAll((unit) => [
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
    ]).catch(() => {
      throw new Exception('Adding viewer failed');
    });
  }
}