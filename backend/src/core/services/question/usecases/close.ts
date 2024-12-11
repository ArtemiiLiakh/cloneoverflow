import { BadBodyException, ForbiddenException, NoEntityWithIdException } from '@cloneoverflow/common';
import { AnswerRepository } from '@core/domain/repositories/answer/AnswerRepository';
import { QuestionRepository } from '@core/domain/repositories/question/QuestionRepository';
import { QuestionServiceInput } from '../dtos/QuestionServiceInput';
import { QuestionServiceOutput } from '../dtos/QuestionServiceOutput';
import { IQuestionCloseUseCase } from '../types/usecases';

export class QuestionCloseUseCase implements IQuestionCloseUseCase {
  constructor (
    private questionRepository: QuestionRepository,
    private answerRepository: AnswerRepository,
  ) {}
  
  async execute (
    { executorId, questionId, answerId }: QuestionServiceInput.CloseQuestion,
  ): Promise<QuestionServiceOutput.CloseQuestion> {
    const question = await this.questionRepository.getPartialQuestion({ 
      where: { id: questionId },
      select: {
        ownerId: true,
        isClosed: true,
      },
    });
    
    if (!question) {
      throw new NoEntityWithIdException('Question');
    }
    
    if (question.entity.ownerId !== executorId) {
      throw new ForbiddenException();
    }
    
    const answer = await this.answerRepository.getById({ answerId });
    
    if (!answer) {
      throw new NoEntityWithIdException('Question');
    }
    
    if (answer.questionId !== questionId) {
      throw new BadBodyException('Wrong answer id');
    }

    if (question.entity.isClosed) {
      throw new BadBodyException('The question is already closed');
    }

    await this.questionRepository.closeQuestion({
      questionId,
      answerId,
    });
  }
}