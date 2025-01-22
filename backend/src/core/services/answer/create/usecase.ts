import { AnswerUserStatusEnum, Exception } from '@cloneoverflow/common';
import { Answer } from '@core/domain/entities/Answer';
import { AnswerUser } from '@core/domain/entities/AnswerUser';
import { QuestionRepository } from '@core/domain/repositories/question/QuestionRepository';
import { UnitOfWork } from '@core/domain/repositories/UnitOfWork';
import { AnswerCreateInput, AnswerCreateOutput } from './dto';
import { IAnswerCreateUseCase } from './type';

export class AnswerCreateUseCase implements IAnswerCreateUseCase {
  constructor (
    private questionRepository: QuestionRepository,
    private unitOfWork: UnitOfWork,
  ) {}
  
  async execute (
    { executorId, questionId, text }: AnswerCreateInput,
  ): Promise<AnswerCreateOutput> {
    await this.questionRepository.validateById({ questionId });

    const newAnswer = Answer.new({
      ownerId: executorId,
      questionId,
      text,
    });

    await this.unitOfWork.execute(async (unit) => {
      newAnswer.id = await unit.answerRepository.create({ 
        answer: newAnswer, 
        returnId: true,
      }).then(id => id!);

      await unit.answerUserRepository.create({
        user: AnswerUser.new({
          userId: executorId,
          answerId: newAnswer.id,
          status: AnswerUserStatusEnum.OWNER,
        }),
      });
    }).catch(() => { 
      throw new Exception('Answer creation failed'); 
    });
  
    return newAnswer;
  }
}