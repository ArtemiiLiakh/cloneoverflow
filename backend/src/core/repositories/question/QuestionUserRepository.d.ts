import { QuestionUserRepositoryOutput } from './dtos/questionUser/QuestionUserRepositoryOutput';
import { QuestionUserRepositoryInput } from './dtos/questionUser/QuestionUserRepositoryInput';

export interface QuestionUserRepository {
  getOne(payload: QuestionUserRepositoryInput.GetOne): Promise<QuestionUserRepositoryOutput.GetOne>
  create(payload: QuestionUserRepositoryInput.Create): Promise<QuestionUserRepositoryOutput.Create>;
  update(payload: QuestionUserRepositoryInput.Update): Promise<QuestionUserRepositoryOutput.Update>
  delete(payload: QuestionUserRepositoryInput.Delete): Promise<QuestionUserRepositoryOutput.Delete>;
}