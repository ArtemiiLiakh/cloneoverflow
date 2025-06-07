import { QuestionIdInvalid } from '@core/question/exceptions/QuestionIdInvalid';
import { AnswerCreateInput, AnswerCreateOutput } from './dto';
import { IAnswerCreateUseCase } from './type';
import { AnswerRepository } from '@core/answer/repository/AnswerRepository';
import { QuestionRepository } from '@core/question/repository/QuestionRepository';

export class AnswerCreateUseCase implements IAnswerCreateUseCase {
  constructor (
    private questionRepository: QuestionRepository,
    private answerRepository: AnswerRepository,
  ) {}
  
  async execute (
    { executorId, questionId, text }: AnswerCreateInput,
  ): Promise<AnswerCreateOutput> {
    if (!await this.questionRepository.isExist({ questionId })) {
      throw new QuestionIdInvalid();
    }

    return this.answerRepository.create({ 
      ownerId: executorId,
      questionId,
      text,
    });
  }
}