import { ForbiddenException } from '@cloneoverflow/common';
import { UserRepository } from '@core/domain/repositories/user/UserRepository';
import { ValidateServiceInput } from '../dtos/ValidateServiceInput';
import { IValidateUserUseCase } from '../types/usecases';

export class ValidateUserUseCase implements IValidateUserUseCase {
  constructor (
    private userRepository: UserRepository,
  ) {}

  async validate ({ userId }: ValidateServiceInput.ValidateUser) {
    const user = await this.userRepository.findById({ 
      id: userId,
      options: {
        select: { id: true },
      },
    });
    if (!user) {
      throw new ForbiddenException();
    }
  }
}