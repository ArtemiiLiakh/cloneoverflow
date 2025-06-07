import { UseCase } from '@common/services/UseCase';
import { DeleteAccountInput, DeleteAccountOutput } from './dto';

export interface IDeleteAccountUseCase extends UseCase<DeleteAccountInput, DeleteAccountOutput> {}
