import { AnswerRepositoryInput } from './dtos/AnswerRepositoryInput';
import { AnswerRepositoryOutput } from './dtos/AnswerRepositoryOutput';

export interface AnswerRepository {
  getById(payload: AnswerRepositoryInput.GetById): Promise<AnswerRepositoryOutput.GetById>;
  getAnswer(payload: AnswerRepositoryInput.GetAnswer): Promise<AnswerRepositoryOutput.GetAnswer>;
  getPartialById(payload: AnswerRepositoryInput.GetPartialById): Promise<AnswerRepositoryOutput.GetPartialById>;
  getPartialAnswer(payload: AnswerRepositoryInput.GetPartialAnswer): Promise<AnswerRepositoryOutput.GetPartialAnswer>;
  getMany(payload: AnswerRepositoryInput.GetMany): Promise<AnswerRepositoryOutput.GetMany>;
  isExist(payload: AnswerRepositoryInput.IsExist): Promise<AnswerRepositoryOutput.IsExist>;

  count(payload: AnswerRepositoryInput.Count): Promise<AnswerRepositoryOutput.Count>;
  create(payload: AnswerRepositoryInput.Create): Promise<AnswerRepositoryOutput.Create>;
  update(payload: AnswerRepositoryInput.Update): Promise<AnswerRepositoryOutput.Update>;
  delete(payload: AnswerRepositoryInput.Delete): Promise<AnswerRepositoryOutput.Delete>;
  
  addRating(payload: AnswerRepositoryInput.AddRating): Promise<AnswerRepositoryOutput.AddRating>;
}