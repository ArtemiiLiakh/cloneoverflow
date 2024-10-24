import { UserServiceFacade } from "@app/services/UserServiceFacade";
import { UserGetUseCase } from "@core/service/user/usecase/get";
import { UserGetProfileUseCase } from "@core/service/user/usecase/getProfile";
import { UserUpdateUseCase } from "@core/service/user/usecase/update";
import PrismaAnswerRepositoryDI from "../repositories/PrismaAnswerRepositoryDI";
import PrismaQuestionRepositoryDI from "../repositories/PrismaQuestionRepositoryDI";
import PrismaUserRepositoryDI from "../repositories/PrismaUserRepositoryDI";

export const userServiceFacadeDI = new UserServiceFacade(
  new UserGetUseCase(PrismaUserRepositoryDI),
  new UserGetProfileUseCase(
    PrismaUserRepositoryDI, 
    PrismaAnswerRepositoryDI, 
    PrismaQuestionRepositoryDI
  ),
  new UserUpdateUseCase(PrismaUserRepositoryDI),
);

export const userUseCasesDI = {
  GetUseCase: new UserGetUseCase(PrismaUserRepositoryDI),
  GetProfileUseCase: new UserGetProfileUseCase(
    PrismaUserRepositoryDI, 
    PrismaAnswerRepositoryDI, 
    PrismaQuestionRepositoryDI
  ),
  UpdateUseCase: new UserUpdateUseCase(PrismaUserRepositoryDI),
};