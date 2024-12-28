import { BadBodyException, ForbiddenException, NoEntityWithIdException } from '@cloneoverflow/common';
import { AnswerRepository } from '@core/domain/repositories/answer/AnswerRepository';
import { QuestionRepository } from '@core/domain/repositories/question/QuestionRepository';
import { QuestionServiceInput } from '../dtos/QuestionServiceInput';
import { QuestionServiceOutput } from '../dtos/QuestionServiceOutput';
import { IQuestionOpenUseCase } from '../types/usecases';

export class QuestionOpenUseCase implements IQuestionOpenUseCase {
  constructor (
    private questionRepository: QuestionRepository,
    private answerRepository: AnswerRepository,
  ) {}
  
  async execute (
    { executorId, questionId, answerId }: QuestionServiceInput.OpenQuestion,
  ): Promise<QuestionServiceOutput.OpenQuestion> {
    const question = await this.questionRepository.getPartialById({ 
      questionId,
      select: {
        ownerId: true,
        isClosed: true,
      },
    });
    
    if (!question) {
      throw new NoEntityWithIdException('Question');
    }
    
    if (question.ownerId !== executorId) {
      throw new ForbiddenException();
    }
    
    const answer = await this.answerRepository.getById({ answerId });
    
    if (!answer) {
      throw new NoEntityWithIdException('Question');
    }
    
    if (answer.questionId !== questionId) {
      throw new BadBodyException('Wrong answer id');
    }

    if (!question.isClosed) {
      throw new BadBodyException('The question is already opened');
    }

    await this.questionRepository.openQuestion({
      questionId,
    });
  }
}