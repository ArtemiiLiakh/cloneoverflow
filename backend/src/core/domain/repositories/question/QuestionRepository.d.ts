import { QuestionRepositoryOutput } from './dtos/QuestionRepositoryOutput';
import { QuestionRepositoryInput } from './dtos/QuestionRepositoryInput';

export interface QuestionRepository {
  getById(payload: QuestionRepositoryInput.GetById): Promise<QuestionRepositoryOutput.GetById>;
  getQuestion(payload: QuestionRepositoryInput.GetQuestion): Promise<QuestionRepositoryOutput.GetQuestion>;
  getPartialQuestion(payload: QuestionRepositoryInput.GetPartialQuestion): Promise<QuestionRepositoryOutput.GetPartialQuestion>;
  getPartialById(payload: QuestionRepositoryInput.GetPartialById): Promise<QuestionRepositoryOutput.GetPartialById>;
  getMany(payload: QuestionRepositoryInput.GetMany): Promise<QuestionRepositoryOutput.GetMany>;
  isExist(payload: QuestionRepositoryInput.IsExist): Promise<QuestionRepositoryOutput.IsExist>;

  count(payload: QuestionRepositoryInput.Count): Promise<QuestionRepositoryOutput.Count>;
  create(payload: QuestionRepositoryInput.Create): Promise<QuestionRepositoryOutput.Create>;
  update(payload: QuestionRepositoryInput.Update): Promise<QuestionRepositoryOutput.Update>;
  delete(payload: QuestionRepositoryInput.Delete): Promise<QuestionRepositoryOutput.Delete>;
  
  addViewer(payload: QuestionRepositoryInput.AddViewer): Promise<QuestionRepositoryOutput.AddViewer>;
  addRating(payload: QuestionRepositoryInput.AddRating): Promise<QuestionRepositoryOutput.AddRating>;
  refTags(payload: QuestionRepositoryInput.RefTags): Promise<QuestionRepositoryOutput.RefTags>;
  unrefAllTags(payload: QuestionRepositoryInput.UnrefTags): Promise<QuestionRepositoryOutput.UnrefTags>;

  closeQuestion(payload: QuestionRepositoryInput.CloseQuestion): Promise<QuestionRepositoryOutput.CloseQuestion>;
  openQuestion(payload: QuestionRepositoryInput.OpenQuestion): Promise<QuestionRepositoryOutput.OpenQuestion>;
}