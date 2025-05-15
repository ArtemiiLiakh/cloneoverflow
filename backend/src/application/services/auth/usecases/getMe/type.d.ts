import { UseCase } from '@common/services/UseCase';
import { GetMeInput, GetMeOutput } from './dto';

export interface IGetMeUseCase extends UseCase<GetMeInput, GetMeOutput> {}