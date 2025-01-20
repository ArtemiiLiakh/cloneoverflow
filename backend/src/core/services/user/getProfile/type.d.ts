import { UseCase } from '@common/usecase/UseCase';
import { UserGetProfileInput, UserGetProfileOutput } from './dto';

export interface IUserGetProfileUseCase extends UseCase<UserGetProfileInput, UserGetProfileOutput> {}
