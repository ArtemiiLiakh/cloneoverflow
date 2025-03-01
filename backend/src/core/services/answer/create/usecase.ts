import { AnswerUserStatusEnum, Exception, NoEntityWithIdException } from '@cloneoverflow/common';
import { Answer } from '@core/models/Answer';
import { AnswerUser } from '@core/models/AnswerUser';
import { UnitOfWork } from '@core/repositories/UnitOfWork';
import { AnswerCreateInput, AnswerCreateOutput } from './dto';
import { IAnswerCreateUseCase } from './type';
import { QuestionRepository } from '@core/repositories';

export class AnswerCreateUseCase implements IAnswerCreateUseCase {
  constructor (
    private questionRepository: QuestionRepository,
    private unitOfWork: UnitOfWork,
  ) {}
  
  async execute (
    { executorId, questionId, text }: AnswerCreateInput,
  ): Promise<AnswerCreateOutput> {
    if (!await this.questionRepository.isExist({ questionId })) {
      throw new NoEntityWithIdException('Question');
    }

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