import { PrismaRepositoryDITokens } from '@application/http-rest/nestjs/di/tokens/persistence';
import { AnswerUserStatusEnum } from '@cloneoverflow/common';
import { Answer } from '@core/models/Answer';
import { AnswerUser } from '@core/models/AnswerUser';
import { AnswerRepository, UnitOfWork } from '@core/repositories';
import { INestApplication } from '@nestjs/common';

export class AnswerUtils {
  private answerRepository: AnswerRepository;
  private unitOfWork: UnitOfWork;

  constructor (
    nest: INestApplication,
  ) {
    this.answerRepository = nest.get(PrismaRepositoryDITokens.AnswerRepository);
    this.unitOfWork = nest.get(PrismaRepositoryDITokens.UnitOfWork);
  }

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