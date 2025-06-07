import { UseCase } from '@common/services/UseCase';
import { UserUpdateInput, UserUpdateOutput } from './dto';

export interface IUserUpdateUseCase extends UseCase<UserUpdateInput, UserUpdateOutput> {}
