import { UseCase } from '@common/usecase/UseCase';
import { SignUpInput, SignUpOutput } from './dto';

export interface ISignUpUseCase extends UseCase<SignUpInput, SignUpOutput> {}
