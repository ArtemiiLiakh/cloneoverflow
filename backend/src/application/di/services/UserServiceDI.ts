import { UserServiceFacade } from "@app/services/UserServiceFacade";
import { UserGetUseCase } from "@core/service/user/usecase/get";
import { UserGetProfileUseCase } from "@core/service/user/usecase/getProfile";
import { UserUpdateUseCase } from "@core/service/user/usecase/update";
import PrismaAnswerRepositoryDI from "../repositories/PrismaAnswerRepositoryDI";
import PrismaQuestionRepositoryDI from "../repositories/PrismaQuestionRepositoryDI";
import PrismaUserRepositoryDI from "../repositories/PrismaUserRepositoryDI";
import { UserCreateUseCase } from "@core/service/user/usecase/create";

const CreateUseCaseDI = new UserCreateUseCase(PrismaUserRepositoryDI);
const GetUseCaseDI = new UserGetUseCase(PrismaUserRepositoryDI);
const GetProfileUseCaseDI = new UserGetProfileUseCase(
  PrismaUserRepositoryDI, 
  PrismaAnswerRepositoryDI, 
  PrismaQuestionRepositoryDI
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