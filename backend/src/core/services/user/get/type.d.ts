import { UseCase } from '@common/usecase/UseCase';
import { UserGetInput, UserGetOutput } from './dto';

export interface IUserGetUseCase extends UseCase<UserGetInput, UserGetOutput> {}
