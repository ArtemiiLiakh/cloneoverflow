import { AnswerUserStatusEnum } from '@cloneoverflow/common';
import { Answer } from '@core/domain/entities/Answer';
import { AnswerUser } from '@core/domain/entities/AnswerUser';
import { AnswerRepository, UnitOfWork } from '@core/domain/repositories';

export class AnswerUtils {
  constructor (
    private answerRepository: AnswerRepository,
    private unitOfWork: UnitOfWork,
  ) {}

  async create (answer: Partial<Answer> & { ownerId: string, questionId: string }): Promise<Answer> {
    const newAnswer = Answer.new({
      id: answer.id,
      ownerId: answer.ownerId,
      questionId: answer.questionId,
      text: answer.text ?? '',
      rating: answer.rating,
      isSolution: answer.isSolution,
      createdAt: answer.createdAt,
      updatedAt: answer.updatedAt,
    });

    await this.unitOfWork.execute(async (unit) => {
      newAnswer.id = await unit.answerRepository.create({ 
        answer: newAnswer, 
        returnId: true,
      }).then(id => id!);

      await unit.answerUserRepository.create({
        user: AnswerUser.new({
          userId: answer.ownerId,
          answerId: newAnswer.id,
          status: AnswerUserStatusEnum.OWNER,
        }),
      });
    });

    return newAnswer;
  }

  async getAnswer (answerId: string): Promise<Answer | null> {
    return this.answerRepository.getById({ answerId }).catch(() => null);
  }

  async delete (answerId: string) {
    this.answerRepository.delete({ answerId });
  }
}