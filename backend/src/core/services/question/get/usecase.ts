import { QuestionRepository } from '@core/repositories';
import { QuestionGetInput, QuestionGetOutput } from './dto';
import { IQuestionGetUseCase } from './type';

export class QuestionGetUseCase implements IQuestionGetUseCase {
  constructor (
    private questionRepository: QuestionRepository,
  ) {}

  execute (
    { questionId }: QuestionGetInput,
  ): Promise<QuestionGetOutput> {
    return this.questionRepository.getById({
      questionId,
    });
  }
}