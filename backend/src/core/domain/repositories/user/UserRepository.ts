import { UserRepositoryInput } from "./input/UserRepositoryInput";
import { UserRepositoryOutput } from "./output/UserRepositoryOutput";

export interface UserRepository {
  findById(payload: UserRepositoryInput.FindById): Promise<UserRepositoryOutput.FindById>;
  findByUsername(payload: UserRepositoryInput.FindByUsername): Promise<UserRepositoryOutput.FindByUsername>;
  findOne(payload: UserRepositoryInput.FindOne): Promise<UserRepositoryOutput.FindOne>;
  findWithCreds(payload: UserRepositoryInput.FindWithCreds): Promise<UserRepositoryOutput.FindWithCreds>;
  findMany(payload: UserRepositoryInput.FindMany): Promise<UserRepositoryOutput.FindMany>;
  count(payload: UserRepositoryInput.Count): Promise<UserRepositoryOutput.Count>;
  create(payload: UserRepositoryInput.Create): Promise<UserRepositoryOutput.Create>;
  update(payload: UserRepositoryInput.Update): Promise<UserRepositoryOutput.Update>;  
  updateCreds(payload: UserRepositoryInput.UpdateCreds): Promise<UserRepositoryOutput.UpdateCreds>;
  delete(payload: UserRepositoryInput.Delete): Promise<UserRepositoryOutput.Delete>;
}