import { Global, Module } from '@nestjs/common';
import { EncryptionModule } from '../encryption.module';

import {
  JwtAuthValidatorProvider,
  UserRatingValidatorProvider,
  UserValidatorProvider,
  VerificationCodeValidatorProvider,
} from '@web/di/providers/validators';

@Global()
@Module({
  providers: [
    JwtAuthValidatorProvider,
    UserValidatorProvider,
    UserRatingValidatorProvider,
    VerificationCodeValidatorProvider,
  ],
  exports: [
    JwtAuthValidatorProvider,
    UserValidatorProvider,
    UserRatingValidatorProvider,
    VerificationCodeValidatorProvider,
  ],
  imports: [EncryptionModule],
})
export class ValidatorModule {}