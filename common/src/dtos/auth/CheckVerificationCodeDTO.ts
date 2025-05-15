import { VerificationCodeType } from '@enums/VerificationCodeType';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';

export class CheckVerificationCodeDTO {
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email must be in email format' })
    email: string;

  @IsNotEmpty({ message: 'Verification code is required' })
    code: string;

  @IsNotEmpty({ message: 'Verification code type is required' })
  @IsEnum(VerificationCodeType, { message: `Verification code type must be a valid enum value: ${Object.values(VerificationCodeType)}` })
    codeType: VerificationCodeType;
}