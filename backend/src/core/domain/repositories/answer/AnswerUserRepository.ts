import { AnswerUserRepositoryOutput } from "./output/AnswerUserRepositoryOutput";
import { AnswerUserRepositoryInput } from "./input/AnswerUserRepositoryInput";

export interface AnswerUserRepository {
  findOne(payload: AnswerUserRepositoryInput.FindOne): Promise<AnswerUserRepositoryOutput.FindOne>;
  create(payload: AnswerUserRepositoryInput.Create): Promise<AnswerUserRepositoryOutput.Create>;
  update(payload: AnswerUserRepositoryInput.Update): Promise<AnswerUserRepositoryOutput.Update>
  delete(payload: AnswerUserRepositoryInput.Delete): Promise<AnswerUserRepositoryOutput.Delete>;
}