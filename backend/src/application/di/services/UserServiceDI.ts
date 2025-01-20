import { UserServiceFacade } from '@application/services/UserServiceFacade';
import { UserCreateUseCase } from '@core/services/user/create/usecase';
import { UserGetUseCase } from '@core/services/user/get/usecase';
import { UserGetProfileUseCase } from '@core/services/user/getProfile/usecase';
import { UserUpdateUseCase } from '@core/services/user/update/usecase';
import {
  PrismaAnswerRepositoryDI,
  PrismaQuestionRepositoryDI,
  PrismaUserRepositoryDI,
} from '../repositories/PrismaRepositoriesDI';
import { DataHasherDI } from '../security/hashers/DataHasherDI';

const CreateUseCaseDI = new UserCreateUseCase(PrismaUserRepositoryDI, DataHasherDI);
const GetUseCaseDI = new UserGetUseCase(PrismaUserRepositoryDI);

const GetProfileUseCaseDI = new UserGetProfileUseCase(
  PrismaUserRepositoryDI, 
  PrismaAnswerRepositoryDI, 
  PrismaQuestionRepositoryDI,
);
const UpdateUseCaseDI = new UserUpdateUseCase(
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