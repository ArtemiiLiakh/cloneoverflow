import { QuestionIdInvalid, QuestionViewerAlreadyExists } from '@core/question/exceptions';
import { QuestionRepository } from '@core/question/repository/QuestionRepository';
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
      throw new QuestionIdInvalid();
    }

    const viewer = await this.questionRepository.getViewer({
      questionId,
      userId: executorId,
    });

    if (viewer) throw new QuestionViewerAlreadyExists();
    
    await this.questionRepository.addViewer({
      userId: executorId,
      questionId,
    });
  }
}