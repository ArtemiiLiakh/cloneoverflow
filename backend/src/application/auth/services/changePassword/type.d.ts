import { UseCase } from '@common/usecase/UseCase';
import { ChangePasswordInput, ChangePasswordOutput } from './dto';

export interface IChangePasswordUseCase extends UseCase<ChangePasswordInput, ChangePasswordOutput> {}
