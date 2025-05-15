import { UseCase } from '@common/services/UseCase';
import { UserGetProfileInput, UserGetProfileOutput } from './dto';

export interface IUserGetProfileUseCase extends UseCase<UserGetProfileInput, UserGetProfileOutput> {}
