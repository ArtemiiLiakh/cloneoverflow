import { Global, Module } from '@nestjs/common';
import {
  AuthUserValidatorProvider,
  JwtAuthValidatorProvider,
  UserRatingValidatorProvider,
  VerificationCodeValidatorProvider,
} from '../../di/providers/validators';
import { EncryptionModule } from '../encryption.module';

@Global()
@Module({
  providers: [
    JwtAuthValidatorProvider,
    AuthUserValidatorProvider,
    UserRatingValidatorProvider,
    VerificationCodeValidatorProvider,
  ],
  exports: [
    JwtAuthValidatorProvider,
    AuthUserValidatorProvider,
    UserRatingValidatorProvider,
    VerificationCodeValidatorProvider,
  ],
  imports: [EncryptionModule],
})
export class ValidatorModule {}