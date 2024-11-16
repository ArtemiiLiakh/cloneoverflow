import { QuestionUserRepositoryOutput } from './output/QuestionUserRepositoryOutput';
import { QuestionUserRepositoryInput } from './input/QuestionUserRepositoryInput';

export interface QuestionUserRepository {
  findOne(payload: QuestionUserRepositoryInput.FindOne): Promise<QuestionUserRepositoryOutput.FindOne>
  create(payload: QuestionUserRepositoryInput.Create): Promise<QuestionUserRepositoryOutput.Create>;
  update(payload: QuestionUserRepositoryInput.Update): Promise<QuestionUserRepositoryOutput.Update>
  delete(payload: QuestionUserRepositoryInput.Delete): Promise<QuestionUserRepositoryOutput.Delete>;
}