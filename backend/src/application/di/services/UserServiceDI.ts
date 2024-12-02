import { UserServiceFacade } from '@application/services/UserServiceFacade';
import { UserCreateUseCase } from '@core/service/user/usecase/create';
import { UserGetUseCase } from '@core/service/user/usecase/get';
import { UserGetProfileUseCase } from '@core/service/user/usecase/getProfile';
import { UserUpdateUseCase } from '@core/service/user/usecase/update';
import { 
  PrismaUserRepositoryDI, 
  PrismaAnswerRepositoryDI, 
  PrismaQuestionRepositoryDI,
} from '../repositories/PrismaRepositoriesDI';

const CreateUseCaseDI = new UserCreateUseCase(PrismaUserRepositoryDI);
const GetUseCaseDI = new UserGetUseCase(PrismaUserRepositoryDI);
const GetProfileUseCaseDI = new UserGetProfileUseCase(
  PrismaUserRepositoryDI, 
  PrismaAnswerRepositoryDI, 
  PrismaQuestionRepositoryDI,
);
const UpdateUseCaseDI = new UserUpdateUseCase(PrismaUserRepositoryDI);

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