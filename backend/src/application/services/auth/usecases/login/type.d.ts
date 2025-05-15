import { UseCase } from '@common/services/UseCase';
import { LoginInput, LoginOutput } from './dto';

export interface ILoginUseCase extends UseCase<LoginInput, LoginOutput> {}
