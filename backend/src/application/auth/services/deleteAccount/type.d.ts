import { UseCase } from '@common/usecase/UseCase';
import { DeleteAccountInput, DeleteAccountOutput } from './dto';

export interface IDeleteAccountUseCase extends UseCase<DeleteAccountInput, DeleteAccountOutput> {}
