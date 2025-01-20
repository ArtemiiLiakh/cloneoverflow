import { UseCase } from '@common/usecase/UseCase';
import { ForgotPasswordInput, ForgotPasswordOutput } from './dto';

export interface IForgotPasswordUseCase extends UseCase<ForgotPasswordInput, ForgotPasswordOutput> {}
