import { UserServiceFacade } from '@application/services/UserServiceFacade';
import { UserCreateUseCase } from '@core/services/user/usecases/create';
import { UserGetUseCase } from '@core/services/user/usecases/get';
import { UserGetProfileUseCase } from '@core/services/user/usecases/getProfile';
import { UserUpdateUseCase } from '@core/services/user/usecases/update';
import {
  PrismaAnswerRepositoryDI,
  PrismaQuestionRepositoryDI,
  PrismaUserRepositoryDI,
} from '../repositories/PrismaRepositoriesDI';
import { ValidateUserUseCaseDI } from './ValidationServiceDI';

const CreateUseCaseDI = new UserCreateUseCase(PrismaUserRepositoryDI);
const GetUseCaseDI = new UserGetUseCase(PrismaUserRepositoryDI);

const GetProfileUseCaseDI = new UserGetProfileUseCase(
  PrismaUserRepositoryDI, 
  PrismaAnswerRepositoryDI, 
  PrismaQuestionRepositoryDI,
);
const UpdateUseCaseDI = new UserUpdateUseCase(
  ValidateUserUseCaseDI, 
  PrismaUserRepositoryDI,
);

export const userServiceFacadeDI = UserServiceFacade.new({
  userCreateUseCase: CreateUseCaseDI,
  userGetProfileUseCase: GetProfileUseCaseDI,
  userGetUseCase: GetUseCaseDI,
  userUpdateUseCase: UpdateUseCaseDI,
});

export const userUseCasesDI = {
  CreateUseCaseDI,
  GetUseCaseDI,
  GetProfileUseCaseDI,
  UpdateUseCaseDI,
};