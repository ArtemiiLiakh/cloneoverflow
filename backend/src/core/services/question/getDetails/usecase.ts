import { QuestionRepository } from '@core/repositories';
import { QuestionGetDetailsInput, QuestionGetDetailsOutput } from './dto';
import { IQuestionGetDetailsUseCase } from './type';

export class QuestionGetDetailsUseCase implements IQuestionGetDetailsUseCase {
  constructor (
    private questionRepository: QuestionRepository,
  ) {}

  execute ({ questionId, executorId }: QuestionGetDetailsInput): Promise<QuestionGetDetailsOutput> {
    return this.questionRepository.getDetailedById({
      questionId,
      voterId: executorId,
    });
  }
}