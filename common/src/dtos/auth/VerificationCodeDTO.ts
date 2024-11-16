import { VerificationCodeType } from '@enums/VerificationCodeType';
import { validationMessage } from '@utils/validationUtils';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';

export class AuthVerificationCodeDTO {
  @IsNotEmpty(validationMessage('Email cannot be empty'))
  @IsEmail({}, validationMessage('Email format is wrong'))
    email: string;

  @IsNotEmpty(validationMessage('Verificaton code type cannot be empty'))
  @IsEnum(VerificationCodeType, validationMessage(`Verification code type must be a valid enum value: ${Object.values(VerificationCodeType)}`))
    codeType: VerificationCodeType;
}