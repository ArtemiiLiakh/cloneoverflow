import { Exception, QuestionUserStatusEnum } from '@cloneoverflow/common';
import { QuestionUser } from '@core/domain/entities/QuestionUser';
import { QuestionUserRepository, UnitOfWork } from '@core/domain/repositories';
import { QuestionAddViewerServiceInput } from './dto';
import { IQuestionAddViewerService } from './type';

export class QuestionAddViewerService implements IQuestionAddViewerService {
  constructor (
    private questionUserRepository: QuestionUserRepository,
    private unitOfWork: UnitOfWork,
  ) {}

  async execute ({ executorId, questionId }: QuestionAddViewerServiceInput): Promise<void> {
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