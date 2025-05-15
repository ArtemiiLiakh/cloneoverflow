import { VerificationCodeType } from '@enums/VerificationCodeType';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';

export class AuthVerificationCodeDTO {
  @IsNotEmpty({ message: 'Email cannot be empty' })
  @IsEmail({}, { message: 'Email format is wrong' })
    email: string;

  @IsNotEmpty({ message: 'Verificaton code type cannot be empty' })
  @IsEnum(VerificationCodeType, { message: `Verification code type must be a valid enum value: ${Object.values(VerificationCodeType)}` })
    codeType: VerificationCodeType;
}