import { UserRepository } from '@core/user/repository/UserRepository';
import { GetMeInput, GetMeOutput } from './dto';
import { IGetMeUseCase } from './type';
import { UserUnauthorized } from '@application/auth/exceptions';

export class GetMeUseCase implements IGetMeUseCase {
  constructor (
    private userRepository: UserRepository,
  ) {}

  execute ({ executorId }: GetMeInput): Promise<GetMeOutput> {
    return this.userRepository.getById({
      userId: executorId,
    }).catch(() => {
      throw new UserUnauthorized();
    });
  }
}