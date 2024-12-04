import { AbstractValidator } from '@common/validation/AbstractValidator';
import { ValidateServiceInput } from '../dtos/ValidateServiceInput';

export interface IValidateUserUseCase extends AbstractValidator<
  ValidateServiceInput.ValidateUser, void
> {}

export interface IValidateQuestionUseCase extends AbstractValidator<
  ValidateServiceInput.ValidateQuestion, void
> {}

export interface IValidateAnswerUseCase extends AbstractValidator<
  ValidateServiceInput.ValidateAnswer, void
> {}