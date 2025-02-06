import { UseCase } from '@common/services/UseCase';
import { CreateAccountInput, CreateAccountOutput } from './dto';

export interface ICreateAccountUseCase extends UseCase<CreateAccountInput, CreateAccountOutput> {}
