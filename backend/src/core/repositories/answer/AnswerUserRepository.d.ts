import { AnswerUserRepositoryInput } from './dtos/answerUser/AnswerUserRepositoryInput';
import { AnswerUserRepositoryOutput } from './dtos/answerUser/AnswerUserRepositoryOutput';

export interface AnswerUserRepository {
  getOne(payload: AnswerUserRepositoryInput.GetOne): Promise<AnswerUserRepositoryOutput.GetOne>;
  create(payload: AnswerUserRepositoryInput.Create): Promise<AnswerUserRepositoryOutput.Create>;
  update(payload: AnswerUserRepositoryInput.Update): Promise<AnswerUserRepositoryOutput.Update>
  delete(payload: AnswerUserRepositoryInput.Delete): Promise<AnswerUserRepositoryOutput.Delete>;
}