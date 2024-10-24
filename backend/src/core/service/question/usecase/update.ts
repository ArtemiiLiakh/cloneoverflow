import { Exception, ForbiddenException, NoEntityWithIdException } from "@cloneoverflow/common";
import { QuestionRepositoryInput } from "@core/domain/repositories/question/input/QuestionRepositoryInput";
import { QuestionRepository } from "@core/domain/repositories/question/QuestionRepository";
import { UnitOfWork } from "@core/domain/repositories/UnitOfWork";
import { QuestionServiceInput } from "../dto/QuestionServiceInput";
import { QuestionServiceOutput } from "../dto/QuestionServiceOutput";
import { IQuestionUpdateUseCase } from "../types/usecases";

export class QuestionUpdateUseCase implements IQuestionUpdateUseCase {
  constructor (
    private questionRepository: QuestionRepository,
    private unitOfWork: UnitOfWork,
  ) {}

  async execute(
    { 
      ownerId, 
      questionId, data: { text, title, tags } 
    }: QuestionServiceInput.Update
  ): Promise<QuestionServiceOutput.Update> {
    const question = await this.questionRepository.findById({ id: questionId });

    if (!question) {
      throw new NoEntityWithIdException('Question');
    }
  
    if (question.entity.ownerId !== ownerId) {
      throw new ForbiddenException('You are not owner of this question');
    }
  
    const questionUpdate = await this.unitOfWork.execute(async (unit) => {
      const updateData: QuestionRepositoryInput.Update['question'] = {
        title,
        text,
      };
  
      if (tags?.length) {
        await unit.questionRepository.unrefAllTags({
          id: questionId,
        });
  
        const tagEntities = await unit.tagRepository.createOrFindMany({ tags })
        
        await unit.questionRepository.refTags({
          id: questionId,
          tags: tagEntities,
        });
      }
  
      return await unit.questionRepository.update({
        id: questionId,
        question: updateData,
      });
    });
  
    if (!questionUpdate) {
      throw new Exception('Question update failed');
    }
  
    return questionUpdate;
  }
}
