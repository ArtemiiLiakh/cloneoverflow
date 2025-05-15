import { UseCase } from '@common/services/UseCase';
import { ChangePasswordInput, ChangePasswordOutput } from './dto';

export interface IChangePasswordUseCase extends UseCase<ChangePasswordInput, ChangePasswordOutput> {}
