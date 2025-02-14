import { UnauthorizedException } from '@cloneoverflow/common';
import { UserRepository } from '@core/domain/repositories';
import { GetMeInput, GetMeOutput } from './dto';
import { IGetMeUseCase } from './type';

export class GetMeUseCase implements IGetMeUseCase {
  constructor (
    private userRepository: UserRepository,
  ) {}

  execute ({ executorId }: GetMeInput): Promise<GetMeOutput> {
    return this.userRepository.getById({
      userId: executorId,
    }).catch(() => {
      throw new UnauthorizedException();
    });
  }
}