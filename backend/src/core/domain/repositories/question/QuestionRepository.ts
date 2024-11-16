import { QuestionRepositoryOutput } from './output/QuestionRepositoryOutput';
import { QuestionRepositoryInput } from './input/QuestionRepositoryInput';

export interface QuestionRepository {
  findById<Select extends QuestionRepositoryInput.QuestionSelect>
    (payload: QuestionRepositoryInput.FindById<Select>): Promise<QuestionRepositoryOutput.FindById<Select>>;
  
  findOne<Select extends QuestionRepositoryInput.QuestionSelect>
    (payload: QuestionRepositoryInput.FindOne<Select>): Promise<QuestionRepositoryOutput.FindOne<Select>>;
  
  findMany<Select extends QuestionRepositoryInput.QuestionSelect>
    (payload: QuestionRepositoryInput.FindMany<Select>): Promise<QuestionRepositoryOutput.FindMany<Select>>;
  
  paginate<Select extends QuestionRepositoryInput.QuestionSelect>
    (payload: QuestionRepositoryInput.Paginate<Select>): Promise<QuestionRepositoryOutput.Paginate<Select>>;

  count(payload: QuestionRepositoryInput.Count): Promise<QuestionRepositoryOutput.Count>;
  create(payload: QuestionRepositoryInput.Create): Promise<QuestionRepositoryOutput.Create>;
  update(payload: QuestionRepositoryInput.Update): Promise<QuestionRepositoryOutput.Update>;
  delete(payload: QuestionRepositoryInput.Delete): Promise<QuestionRepositoryOutput.Delete>;
  
  refTags(payload: QuestionRepositoryInput.RefTags): Promise<QuestionRepositoryOutput.RefTags>;
  unrefAllTags(payload: QuestionRepositoryInput.UnrefTags): Promise<QuestionRepositoryOutput.UnrefTags>;
}