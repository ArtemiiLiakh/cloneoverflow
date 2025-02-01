import { UseCase } from '@common/services/UseCase';
import { UserCreateInput, UserCreateOutput } from './dto';

export interface IUserCreateUseCase extends UseCase<UserCreateInput, UserCreateOutput> {} 
