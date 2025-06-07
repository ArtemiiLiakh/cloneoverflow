import { CannotDeleteOthersQuestion } from '@core/question/exceptions';
import { QuestionRepository } from '@core/question/repository/QuestionRepository';
import { QuestionDeleteInput, QuestionDeleteOutput } from './dto';
import { IQuestionDeleteUseCase } from './type';

export class QuestionDeleteUseCase implements IQuestionDeleteUseCase {
  constructor (
    private questionRepository: QuestionRepository,
  ) {}

  async execute (
    { executorId, questionId }: QuestionDeleteInput,
  ): Promise<QuestionDeleteOutput> {

    const question = await this.questionRepository.getById({ questionId });

    if (question.ownerId !== executorId) {
      throw new CannotDeleteOthersQuestion();
    }

    await this.questionRepository.delete({ questionId });
  
    return question;
  }
}