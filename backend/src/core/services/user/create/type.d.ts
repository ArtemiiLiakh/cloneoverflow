import { UseCase } from '@common/usecase/UseCase';
import { UserCreateInput, UserCreateOutput } from './dto';

export interface IUserCreateUseCase extends UseCase<UserCreateInput, UserCreateOutput> {} 
