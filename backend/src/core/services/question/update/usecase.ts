import { Exception } from '@cloneoverflow/common';
import { QuestionRepository, UnitOfWork } from '@core/domain/repositories';
import { QuestionUpdateInput, QuestionUpdateOutput } from './dto';
import { IQuestionUpdateUseCase } from './type';

export class QuestionUpdateUseCase implements IQuestionUpdateUseCase {
  constructor (
    private questionRepository: QuestionRepository,
    private unitOfWork: UnitOfWork,
  ) {}

  async execute (
    { questionId, data: { text, title, tags } }: QuestionUpdateInput,
  ): Promise<QuestionUpdateOutput> {
    await this.questionRepository.validateById({ questionId });

    const question = await this.unitOfWork.execute(async (unit) => {
      if (Array.isArray(tags)) {
        await unit.questionRepository.unrefAllTags({
          questionId,
        });
        
        if (tags.length > 0) {
          const tagEntities = await unit.tagRepository.createOrFindMany({ tags });
          
          await unit.questionRepository.refTags({
            questionId,
            tags: tagEntities,
          });
        }
      }
  
      return await unit.questionRepository.update({
        questionId,
        question: {
          title,
          text,
        },
        returnEntity: true,
      }).then(question => question!);
    }).catch(() => {
      throw new Exception('Question update failed');
    });
    
    return question;
  }
}
