import { QuestionRepository } from '@core/domain/repositories/question/QuestionRepository';
import { QuestionAddViewerInput, QuestionAddViewerOutput } from './dto';
import { IQuestionAddViewerService, IQuestionAddViewerUseCase } from './type';

export class QuestionAddViewerUseCase implements IQuestionAddViewerUseCase {
  constructor (
    private questionRepository: QuestionRepository,
    private addViewerService: IQuestionAddViewerService,
  ) {}

  async execute (
    { executorId, questionId }: QuestionAddViewerInput,
  ): Promise<QuestionAddViewerOutput> {
    await this.questionRepository.validateById({ questionId });

    await this.addViewerService.execute({ executorId, questionId });
  }
}