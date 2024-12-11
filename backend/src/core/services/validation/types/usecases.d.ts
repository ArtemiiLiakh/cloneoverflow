import { UseCase } from '@common/usecase/UseCase';
import { ValidationServiceInput } from '../dtos/ValidationServiceInput';
import { ValidationServiceOutput } from '../dtos/ValidationServiceOutput';

export interface IValidateUserUseCase extends UseCase<
  ValidationServiceInput.ValidateUser, 
  ValidationServiceOutput.ValidateUser
> {}

export interface IValidateQuestionUseCase extends UseCase<
  ValidationServiceInput.ValidateQuestion,
  ValidationServiceOutput.ValidateQuestion
> {}

export interface IValidateTagUseCase extends UseCase<
  ValidationServiceInput.ValidateTag,
  ValidationServiceOutput.ValidateTag
> {}

export interface IValidateAnswerUseCase extends UseCase<
  ValidationServiceInput.ValidateAnswer,
  ValidationServiceOutput.ValidateAnswer
> {}

