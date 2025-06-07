import { UserRepoCreateInput, UserRepoCreateOutput } from './dtos/Create';
import { UserRepoDeleteInput, UserRepoDeleteOutput } from './dtos/Delete';
import { UserRepoGetByEmailInput, UserRepoGetByEmailOutput } from './dtos/GetByEmail';
import { UserRepoGetByIdInput, UserRepoGetByIdOutput } from './dtos/GetById';
import { UserRepoGetByUsernameInput, UserRepoGetByUsernameOutput } from './dtos/GetByUsername';
import { UserRepoGetCredsInput, UserRepoGetCredsOutput } from './dtos/GetCreds';
import { UserRepoGetProfileByIdInput, UserRepoGetProfileByIdOutput } from './dtos/GetProfileById';
import { UserRepoIsExistInput, UserRepoIsExistOutput } from './dtos/isExist';
import { UserRepoUpdateInput, UserRepoUpdateOutput } from './dtos/Update';
import { UserRepoUpdateCredsInput, UserRepoUpdateCredsOutput } from './dtos/UpdateCreds';
import { UserRepoincreaseRatingInput, UserRepoIncreaseRatingOutput } from './dtos/IncreaseRating';
import { UserRepoDecreaseRatingInput, UserRepoDecreaseRatingOutput } from './dtos/DecreaseRating';

export interface UserRepository {
  getById(payload: UserRepoGetByIdInput): Promise<UserRepoGetByIdOutput>
  getByEmail(payload: UserRepoGetByEmailInput): Promise<UserRepoGetByEmailOutput>;
  getByUsername(payload: UserRepoGetByUsernameInput): Promise<UserRepoGetByUsernameOutput>;
  getProfile(payload: UserRepoGetProfileByIdInput): Promise<UserRepoGetProfileByIdOutput>;
  getCreds(payload: UserRepoGetCredsInput): Promise<UserRepoGetCredsOutput>;
  isExist(payload: UserRepoIsExistInput): Promise<UserRepoIsExistOutput>; 
  
  create(payload: UserRepoCreateInput): Promise<UserRepoCreateOutput>; 
  update(payload: UserRepoUpdateInput): Promise<UserRepoUpdateOutput>;  
  updateCreds(payload: UserRepoUpdateCredsInput): Promise<UserRepoUpdateCredsOutput>; 
  delete(payload: UserRepoDeleteInput): Promise<UserRepoDeleteOutput>; 
  
  increaseRating(payload: UserRepoincreaseRatingInput): Promise<UserRepoIncreaseRatingOutput>; 
  decreaseRating(payload: UserRepoDecreaseRatingInput): Promise<UserRepoDecreaseRatingOutput>; 
}