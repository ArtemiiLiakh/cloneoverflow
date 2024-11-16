import { UserRepositoryInput } from './input/UserRepositoryInput';
import { UserRepositoryOutput } from './output/UserRepositoryOutput';

export interface UserRepository {
  findById<Select extends UserRepositoryInput.UserSelect>
    (payload: UserRepositoryInput.FindById<Select>): Promise<UserRepositoryOutput.FindById<Select>>;

  findByUsername<Select extends UserRepositoryInput.UserSelect>
    (payload: UserRepositoryInput.FindByUsername<Select>): Promise<UserRepositoryOutput.FindByUsername<Select>>;
  
  findByEmail<Select extends UserRepositoryInput.UserSelect>
    (payload: UserRepositoryInput.FindByEmail<Select>): Promise<UserRepositoryOutput.FindByEmail<Select>>;

  findOne<Select extends UserRepositoryInput.UserSelect>
    (payload: UserRepositoryInput.FindOne<Select>): Promise<UserRepositoryOutput.FindOne<Select>>;

    
  findMany<Select extends UserRepositoryInput.UserSelect>
    (payload: UserRepositoryInput.FindMany<Select>): Promise<UserRepositoryOutput.FindMany<Select>>;
  
  findWithCreds(payload: UserRepositoryInput.FindWithCreds): Promise<UserRepositoryOutput.FindWithCreds>;
  
  findCreds(payload: UserRepositoryInput.FindCreds): Promise<UserRepositoryOutput.FindCreds>;
  
  count(payload: UserRepositoryInput.Count): Promise<UserRepositoryOutput.Count>;
  create(payload: UserRepositoryInput.Create): Promise<UserRepositoryOutput.Create>;
  createWithCreds(payload: UserRepositoryInput.CreateWithCreds): Promise<UserRepositoryOutput.CreateWithCreds>;
  update(payload: UserRepositoryInput.Update): Promise<UserRepositoryOutput.Update>;  
  updateCreds(payload: UserRepositoryInput.UpdateCreds): Promise<UserRepositoryOutput.UpdateCreds>;
  delete(payload: UserRepositoryInput.Delete): Promise<UserRepositoryOutput.Delete>;
}