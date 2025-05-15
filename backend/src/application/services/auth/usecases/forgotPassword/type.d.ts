import { UseCase } from '@common/services/UseCase';
import { ForgotPasswordInput, ForgotPasswordOutput } from './dto';

export interface IForgotPasswordUseCase extends UseCase<ForgotPasswordInput, ForgotPasswordOutput> {}
