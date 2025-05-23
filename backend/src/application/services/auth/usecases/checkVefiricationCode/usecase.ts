import { UserRepository } from '@core/domain/repositories';
import { IVerificationCodeValidator } from '../validators/types';
import { CheckVerificationCodeInput, CheckVerificationCodeOutput } from './dto';
import { ICheckVerificationCodeUseCase } from './type';

export class CheckVerificationCodeUseCase implements ICheckVerificationCodeUseCase {
  constructor (
    private verificationCodeValidator: IVerificationCodeValidator,
    private userRepository: UserRepository,
  ) {}

  async execute ({ email, code, codeType }: CheckVerificationCodeInput): Promise<CheckVerificationCodeOutput> {
    const user = await this.userRepository.getByEmail({ email });

    await this.verificationCodeValidator.validate({
      userId: user.id,
      code,
      codeType,
    });
  }
}