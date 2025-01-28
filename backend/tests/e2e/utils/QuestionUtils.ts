import { QuestionUserStatusEnum } from '@cloneoverflow/common';
import { Question } from '@core/domain/entities/Question';
import { QuestionUser } from '@core/domain/entities/QuestionUser';
import { QuestionRepository, UnitOfWork } from '@core/domain/repositories';

export class QuestionUtils {
  constructor (
    private questionRepository: QuestionRepository,
    private unitOfWork: UnitOfWork,
  ) {}

  async create (question: Partial<Question> & { ownerId: string }): Promise<Question> {
    const newQuestion = Question.new({
      id: question?.id,
      ownerId: question.ownerId,
      title: question?.title ?? 'title',
      text: question?.text ?? 'text',
      isClosed: question?.isClosed,
      rating: question?.rating,
      views: question?.views,
      createdAt: question?.createdAt,
      updatedAt: question?.updatedAt,
    });

    await this.unitOfWork.execute(async (unit) => {
      newQuestion.id = await unit.questionRepository.create({ 
        question: newQuestion, 
        returnId: true,
      }).then(id => id!);

      await unit.questionUserRepository.create({ 
        user: QuestionUser.new({
          userId: newQuestion.ownerId,
          questionId: newQuestion.id,
          status: QuestionUserStatusEnum.OWNER,
        }),
      });
    });

    return newQuestion;
  }

  getQuestion (questionId: string): Promise<Question | null> {
    return this.questionRepository.getById({ questionId }).catch(() => null);
  }

  async delete (questionId: string): Promise<void> {
    await this.questionRepository.delete({ questionId });
  }
}