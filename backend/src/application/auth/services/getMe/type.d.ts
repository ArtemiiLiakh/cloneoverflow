import { UseCase } from '@common/usecase/UseCase';
import { GetMeInput, GetMeOutput } from './dto';

export interface IGetMeUseCase extends UseCase<GetMeInput, GetMeOutput> {}