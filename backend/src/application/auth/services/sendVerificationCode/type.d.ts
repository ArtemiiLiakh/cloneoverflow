import { UseCase } from '@common/services/UseCase';
import { SendVerificationCodeInput, SendVerificationCodeOutput } from './dto';

export interface ISendVerificationCodeUseCase extends UseCase<SendVerificationCodeInput, SendVerificationCodeOutput> {}
