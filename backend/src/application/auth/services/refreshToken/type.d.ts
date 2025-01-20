import { UseCase } from '@common/usecase/UseCase';
import { RefreshTokenInput, RefreshTokenOutput } from './dto';

export interface IRefreshTokenUseCase extends UseCase<RefreshTokenInput, RefreshTokenOutput> {}
