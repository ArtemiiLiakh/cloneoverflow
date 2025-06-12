import { VerificationCodeType } from '@cloneoverflow/common';
import { SendVerificationCodeBody } from '@cloneoverflow/common/api/auth';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { validationMessageEnum } from '../utils';

export class ApiSendVerificationCodeBody implements SendVerificationCodeBody {
  @ApiProperty({
    description: 'Email to which the verification code will be sent',
    type: 'string',
    format: 'email',
    example: 'example@gmail.com',
  })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email must be in email format' })
    email: string;

  @ApiProperty({
    description: 'Verification code type for which the code will be used',
    type: 'string',
    example: VerificationCodeType.ChangePassword,
  })
  @IsNotEmpty({ message: 'Verification code type is required' })
  @IsEnum(VerificationCodeType, validationMessageEnum(VerificationCodeType, 'Verification code type'))
    codeType: VerificationCodeType;
}