import { UserRatingActions } from '@common/enums/UserRatingActions';
import { AnswerRepository } from '@core/repositories/answer/AnswerRepository';
import { IUserRatingValidator } from '@core/services/validators/types';
import { AnswerUpdateInput, AnswerUpdateOutput } from './dto';
import { IAnswerUpdateUseCase } from './type';

export class AnswerUpdateUseCase implements IAnswerUpdateUseCase {
  constructor (
    private userRatingValidator: IUserRatingValidator,
    private answerRepository: AnswerRepository,
  ) {}

  async execute (
    { executorId, answerId, text }: AnswerUpdateInput,
  ): Promise<AnswerUpdateOutput> {
    const answer = await this.answerRepository.getPartialById({
      answerId,
      select: { ownerId: true },
    });

    if (answer.ownerId !== executorId) {
      await this.userRatingValidator.validate({
        userId: executorId,
        action: UserRatingActions.AnswerUpdate,
      });
    }

    return await this.answerRepository.update({ 
      answerId, 
      answer: {
        text,
      },
      returnEntity: true,
    }).then(answer => answer!);
  }
}