import { UseCase } from '@common/usecase/UseCase';
import { LoginInput, LoginOutput } from './dto';

export interface ILoginUseCase extends UseCase<LoginInput, LoginOutput> {}
