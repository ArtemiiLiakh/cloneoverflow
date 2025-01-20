import { BadBodyException, Exception, ForbiddenException, QuestionUserStatusEnum } from '@cloneoverflow/common';
import { QuestionUser } from '@core/domain/entities/QuestionUser';
import { UnitOfWork } from '@core/domain/repositories';
import { AnswerRepository } from '@core/domain/repositories/answer/AnswerRepository';
import { QuestionRepository } from '@core/domain/repositories/question/QuestionRepository';
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
    const question = await this.questionRepository.getPartialById({ 
      questionId,
      select: {
        isClosed: true,
      },
    });

    if (question.ownerId !== executorId) {
      throw new ForbiddenException('You are not owner of the question');
    }

    if (question.isClosed) {
      throw new BadBodyException('The question is already closed');
    }
    
    const answer = await this.answerRepository.getPartialById({ 
      answerId,
      select: { questionId: true },
    });
    
    if (answer.questionId !== questionId) {
      throw new BadBodyException('Wrong answer id');
    }

    const result = await this.unitOfWork.execute((unit) => [
      unit.questionRepository.closeQuestion({
        questionId,
        answerId,
      }),

      unit.questionUserRepository.create({
        user: QuestionUser.new({
          questionId,
          userId: executorId,
          status: QuestionUserStatusEnum.ANSWERER,
        }),
      }),
    ]);

    if (!result) {
      throw new Exception('Closing quetion failed');
    }
  }
}