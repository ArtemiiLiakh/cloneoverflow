import { NoEntityWithIdException } from '@cloneoverflow/common';
import { QuestionRepository } from '@core/repositories';
import { QuestionAddViewerInput, QuestionAddViewerOutput } from './dto';
import { IQuestionAddViewerUseCase } from './type';

export class QuestionAddViewerUseCase implements IQuestionAddViewerUseCase {
  constructor (
    private questionRepository: QuestionRepository,
  ) {}

  async execute (
    { executorId, questionId }: QuestionAddViewerInput,
  ): Promise<QuestionAddViewerOutput> {
    if (!await this.questionRepository.isExist({ questionId })) {
      throw new NoEntityWithIdException('Question');
    }

    const viewer = await this.questionRepository.getViewer({
      questionId,
      userId: executorId,
    });

    if (viewer) return;
    
    await this.questionRepository.addViewer({
      userId: executorId,
      questionId,
    });
  }
}