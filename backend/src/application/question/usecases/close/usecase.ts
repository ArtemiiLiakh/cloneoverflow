import { UnitOfWork } from '@common/repository/UnitOfWork';
import { AnswerNotBelongToQuestion } from '@core/answer/exceptions';
import { AnswerRepository } from '@core/answer/repository/AnswerRepository';
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

    
    const answer = await this.answerRepository.getById({ 
      answerId,
      select: { questionId: true },
    });
    
    if (answer.questionId !== question.questionId) {
      throw new AnswerNotBelongToQuestion();
    }

    await this.unitOfWork.executeFn(async (unit) => {
      if (question.isClosed) {
        await unit.questionRepository.openQuestion({
          questionId,
        });

        await unit.answerRepository.clearSolution({
          questionId,
        });
      }

      await unit.questionRepository.closeQuestion({
        questionId,
      });

      await unit.answerRepository.setAsSolution({
        answerId,
      });
    });
  }
}