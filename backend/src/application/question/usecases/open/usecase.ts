import { UnitOfWork } from '@common/repository/UnitOfWork';
import { QuestionAlreadyOpened } from '@core/question/exceptions';
import { CannotOpenOthersQuestion } from '@core/question/exceptions/CannotOpenOthersQuestion';
import { QuestionRepository } from '@core/question/repository/QuestionRepository';
import { QuestionOpenInput, QuestionOpenOutput } from './dto';
import { IQuestionOpenUseCase } from './type';

export class QuestionOpenUseCase implements IQuestionOpenUseCase {
  constructor (
    private questionRepository: QuestionRepository,
    private unitOfWork: UnitOfWork,
  ) {}
  
  async execute (
    { executorId, questionId }: QuestionOpenInput,
  ): Promise<QuestionOpenOutput> {
    const question = await this.questionRepository.getById({ 
      questionId,
      select: {
        ownerId: true,
        isClosed: true,
      },
    });

    if (executorId !== question.ownerId) {
      throw new CannotOpenOthersQuestion();
    }
      
    if (!question.isClosed) {
      throw new QuestionAlreadyOpened();
    }

    await this.unitOfWork.executeSeq((unit) => [
      unit.questionRepository.openQuestion({ questionId }),
      unit.answerRepository.clearSolution({ questionId }),
    ]);
  }
}