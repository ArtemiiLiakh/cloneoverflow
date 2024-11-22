import { UseCase } from '@common/usecase/UseCase';
import { UserServiceInput } from '../dto/UserServiceInput';
import { UserServiceOutput } from '../dto/UserServiceOutput';

export interface IUserCreateUseCase extends UseCase<UserServiceInput.Create, UserServiceOutput.Create> {} 
export interface IUserGetUseCase extends UseCase<UserServiceInput.Get, UserServiceOutput.Get> {}
export interface IUserGetProfileUseCase extends UseCase<UserServiceInput.GetProfile, UserServiceOutput.GetProfile> {}
export interface IUserUpdateUseCase extends UseCase<UserServiceInput.Update, UserServiceOutput.Update> {}
