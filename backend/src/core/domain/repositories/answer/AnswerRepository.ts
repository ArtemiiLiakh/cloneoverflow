import { AnswerRepositoryOutput } from "./output/AnswerRepositoryOutput";
import { AnswerRepositoryInput } from "./input/AnswerRepositoryInput";

export interface AnswerRepository {
  findById(payload: AnswerRepositoryInput.FindById): Promise<AnswerRepositoryOutput.FindById>;
  findOne(payload: AnswerRepositoryInput.FindOne): Promise<AnswerRepositoryOutput.FindOne>;
  findMany(payload: AnswerRepositoryInput.FindMany): Promise<AnswerRepositoryOutput.FindMany>;
  paginate(payload: AnswerRepositoryInput.Paginate): Promise<AnswerRepositoryOutput.Paginate>
  count(payload: AnswerRepositoryInput.Count): Promise<AnswerRepositoryOutput.Count>;
  create(payload: AnswerRepositoryInput.Create): Promise<AnswerRepositoryOutput.Create>;
  update(payload: AnswerRepositoryInput.Update): Promise<AnswerRepositoryOutput.Update>;
  updateMany(payload: AnswerRepositoryInput.UpdateMany): Promise<AnswerRepositoryOutput.UpdateMany>;
  delete(payload: AnswerRepositoryInput.Delete): Promise<AnswerRepositoryOutput.Delete>;
}