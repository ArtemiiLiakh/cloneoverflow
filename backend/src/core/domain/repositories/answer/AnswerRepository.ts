import { AnswerRepositoryOutput } from './output/AnswerRepositoryOutput';
import { AnswerRepositoryInput } from './input/AnswerRepositoryInput';

export interface AnswerRepository {
  findById<Select extends AnswerRepositoryInput.AnswerSelect>
    (payload: AnswerRepositoryInput.FindById<Select>): Promise<AnswerRepositoryOutput.FindById<Select>>;

  findOne<Select extends AnswerRepositoryInput.AnswerSelect>
    (payload: AnswerRepositoryInput.FindOne<Select>): Promise<AnswerRepositoryOutput.FindOne<Select>>;

  findMany<Select extends AnswerRepositoryInput.AnswerSelect>
    (payload: AnswerRepositoryInput.FindMany<Select>): Promise<AnswerRepositoryOutput.FindMany<Select>>;

  paginate<Select extends AnswerRepositoryInput.AnswerSelect>
    (payload: AnswerRepositoryInput.Paginate<Select>): Promise<AnswerRepositoryOutput.Paginate<Select>>;

  count(payload: AnswerRepositoryInput.Count): Promise<AnswerRepositoryOutput.Count>;
  create(payload: AnswerRepositoryInput.Create): Promise<AnswerRepositoryOutput.Create>;
  update(payload: AnswerRepositoryInput.Update): Promise<AnswerRepositoryOutput.Update>;
  updateMany(payload: AnswerRepositoryInput.UpdateMany): Promise<AnswerRepositoryOutput.UpdateMany>;
  delete(payload: AnswerRepositoryInput.Delete): Promise<AnswerRepositoryOutput.Delete>;
}