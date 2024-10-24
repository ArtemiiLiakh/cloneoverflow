import { QuestionRepositoryOutput } from './output/QuestionRepositoryOutput';
import { QuestionRepositoryInput } from './input/QuestionRepositoryInput';

export interface QuestionRepository {
  findById(payload: QuestionRepositoryInput.FindById): Promise<QuestionRepositoryOutput.FindById>;
  findOne(payload: QuestionRepositoryInput.FindOne): Promise<QuestionRepositoryOutput.FindOne>;
  findMany(payload: QuestionRepositoryInput.FindMany): Promise<QuestionRepositoryOutput.FindMany>;
  paginate(payload: QuestionRepositoryInput.Paginate): Promise<QuestionRepositoryOutput.Paginate>;
  count(payload: QuestionRepositoryInput.Count): Promise<QuestionRepositoryOutput.Count>;
  create(payload: QuestionRepositoryInput.Create): Promise<QuestionRepositoryOutput.Create>;
  update(payload: QuestionRepositoryInput.Update): Promise<QuestionRepositoryOutput.Update>;
  delete(payload: QuestionRepositoryInput.Delete): Promise<QuestionRepositoryOutput.Delete>;
  
  refTags(payload: QuestionRepositoryInput.RefTags): Promise<QuestionRepositoryOutput.RefTags>;
  unrefAllTags(payload: QuestionRepositoryInput.UnrefTags): Promise<QuestionRepositoryOutput.UnrefTags>;
}