import { UseCase } from '@common/usecase/UseCase';
import { SendVerificationCodeInput, SendVerificationCodeOutput } from './dto';

export interface ISendVerificationCodeUseCase extends UseCase<SendVerificationCodeInput, SendVerificationCodeOutput> {}
