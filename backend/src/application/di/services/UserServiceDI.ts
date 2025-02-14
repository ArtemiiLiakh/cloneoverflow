import { 
  UserCreateUseCase,
  UserGetProfileUseCase,
  UserGetUseCase,
  UserUpdateUseCase,
} from '@core/services/user';

import {
  PrismaAnswerRepositoryDI,
  PrismaQuestionRepositoryDI,
  PrismaUserRepositoryDI,
} from '../repositories/PrismaRepositoriesDI';

import { UserServiceFacade } from '@application/facades/UserServiceFacade';
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