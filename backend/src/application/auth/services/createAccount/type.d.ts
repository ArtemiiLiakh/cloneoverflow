import { UseCase } from '@common/usecase/UseCase';
import { CreateAccountInput, CreateAccountOutput } from './dto';

export interface ICreateAccountUseCase extends UseCase<CreateAccountInput, CreateAccountOutput> {}
