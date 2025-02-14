import { UseCase } from '@common/services/UseCase';
import { RefreshTokenInput, RefreshTokenOutput } from './dto';

export interface IRefreshTokenUseCase extends UseCase<RefreshTokenInput, RefreshTokenOutput> {}
