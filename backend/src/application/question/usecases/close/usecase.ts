import { UnitOfWork } from '@common/repository/UnitOfWork';
import { AnswerNotBelongToQuestion } from '@core/answer/exceptions';
import { AnswerRepository } from '@core/answer/repository/AnswerRepository';
import { QuestionAlreadyClosed } from '@core/question/exceptions';
import { CannotCloseOthersQuestion } from '@core/question/exceptions/CannotCloseOthersQuestion';
import { QuestionRepository } from '@core/question/repository/QuestionRepository';
import { QuestionCloseInput, QuestionCloseOutput } from './dto';
import { IQuestionCloseUseCase } from './type';

export class QuestionCloseUseCase implements IQuestionCloseUseCase {
  constructor (
    private questionRepository: QuestionRepository,
    private answerRepository: AnswerRepository,
    private unitOfWork: UnitOfWork,
  ) {}
  
  async execute (
    { executorId, questionId, answerId }: QuestionCloseInput,
  ): Promise<QuestionCloseOutput> {
    const question = await this.questionRepository.getById({ 
      questionId,
    });

    if (question.ownerId !== executorId) {
      throw new CannotCloseOthersQuestion();
    }

    if (question.isClosed) {
      throw new QuestionAlreadyClosed();
    }
    
    const answer = await this.answerRepository.getById({ 
      answerId,
      select: { questionId: true },
    });
    
    if (answer.questionId !== question.questionId) {
      throw new AnswerNotBelongToQuestion();
    }

    await this.unitOfWork.executeSeq((unit) => [
      unit.questionRepository.closeQuestion({
        questionId,
      }),
      unit.answerRepository.setAsSolution({
        answerId,
      }),
    ]);
  }
}