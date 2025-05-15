import { UseCase } from '@common/services/UseCase';
import { CheckVerificationCodeInput, CheckVerificationCodeOutput } from './dto';

export interface ICheckVerificationCodeUseCase extends UseCase<CheckVerificationCodeInput, CheckVerificationCodeOutput> {}