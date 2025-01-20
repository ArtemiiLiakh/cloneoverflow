import { UseCase } from '@common/usecase/UseCase';
import { UserUpdateInput, UserUpdateOutput } from './dto';

export interface IUserUpdateUseCase extends UseCase<UserUpdateInput, UserUpdateOutput> {}
