import { UserRepositoryInput } from './dtos/UserRepositoryInput';
import { UserRepositoryOutput } from './dtos/UserRepositoryOutput';

export interface UserRepository {
  getById(payload: UserRepositoryInput.GetById): Promise<UserRepositoryOutput.GetById>
  getByEmail(payload: UserRepositoryInput.GetByEmail): Promise<UserRepositoryOutput.GetByEmail>;
  getCreds(payload: UserRepositoryInput.GetCreds): Promise<UserRepositoryOutput.GetCreds>;
  getUser(payload: UserRepositoryInput.GetUser): Promise<UserRepositoryOutput.GetUser>;
  getPartialUser(payload: UserRepositoryInput.GetPartialUser): Promise<UserRepositoryOutput.GetPartialUser>; 
  getPartialById(payload: UserRepositoryInput.GetPartialById): Promise<UserRepositoryOutput.GetPartialById>; 
  getMany(payload: UserRepositoryInput.GetMany): Promise<UserRepositoryOutput.GetMany>;
  isExist(payload: UserRepositoryInput.IsExist): Promise<UserRepositoryOutput.IsExist>; 
  
  createWithCreds(payload: UserRepositoryInput.CreateWithCreds): Promise<UserRepositoryOutput.CreateWithCreds>; 
  update(payload: UserRepositoryInput.Update): Promise<UserRepositoryOutput.Update>;  
  updateCreds(payload: UserRepositoryInput.UpdateCreds): Promise<UserRepositoryOutput.UpdateCreds>; 
  delete(payload: UserRepositoryInput.Delete): Promise<UserRepositoryOutput.Delete>; 
  
  addRating(payload: UserRepositoryInput.AddRating): Promise<UserRepositoryOutput.AddRating>; 
}