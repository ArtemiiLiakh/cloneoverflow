import { QuestionRepository } from '@core/domain/repositories';
import { QuestionGetInput, QuestionGetOutput } from './dto';
import { IQuestionGetUseCase } from './type';

export class QuestionGetUseCase implements IQuestionGetUseCase {
  constructor (
    private questionRepository: QuestionRepository,
  ) {}

  async execute (
    { questionId }: QuestionGetInput,
  ): Promise<QuestionGetOutput> {
    const question = await this.questionRepository.getQuestion({
      where: { questionId },
      include: {
        owner: true,
        tags: true,
      },
    });

    return {
      entity: question.entity, 
      owner: question.owner ? {
        id: question.owner.id,
        name: question.owner.name,
        rating: question.owner.rating,
        username: question.owner.username,
      } : null,
      tags: question.tags ?? [],
    };
  }
}