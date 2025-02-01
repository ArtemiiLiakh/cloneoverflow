import { UseCase } from '@common/services/UseCase';
import { UserGetInput, UserGetOutput } from './dto';

export interface IUserGetUseCase extends UseCase<UserGetInput, UserGetOutput> {}
