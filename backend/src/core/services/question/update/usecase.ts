import { Exception } from '@cloneoverflow/common';
import { UserRatingActions } from '@common/enums/UserRatingActions';
import { QuestionRepository, UnitOfWork } from '@core/repositories';
import { IUserRatingValidator } from '@core/services/validators/types';
import { QuestionUpdateInput, QuestionUpdateOutput } from './dto';
import { IQuestionUpdateUseCase } from './type';

export class QuestionUpdateUseCase implements IQuestionUpdateUseCase {
  constructor (
    private userRatingValidator: IUserRatingValidator,
    private questionRepository: QuestionRepository,
    private unitOfWork: UnitOfWork,
  ) {}

  async execute (
    { executorId, questionId, data: { text, title, tags } }: QuestionUpdateInput,
  ): Promise<QuestionUpdateOutput> {
    const question = await this.questionRepository.getById({
      questionId,
      select: { ownerId: true },
    });

    if (question.ownerId !== executorId) {
      await this.userRatingValidator.validate({
        userId: executorId,
        action: UserRatingActions.QuestionUpdate,
      });
    }

    return this.unitOfWork.executeFn(async (unit) => {
      if (Array.isArray(tags)) {
        await unit.questionRepository.unrefAllTags({
          questionId,
        });

        if (tags.length > 0) {
          const tagEntities = await unit.tagRepository.createOrFindMany({ 
            names: tags,  
          });
          await unit.questionRepository.refTags({
            questionId,
            tags: tagEntities,
          });
        }
      }

      return unit.questionRepository.update({
        questionId,
        data: {
          title,
          text,
        },
      });
    }).catch(() => {
      throw new Exception('Question update failed');
    });
  }
}
