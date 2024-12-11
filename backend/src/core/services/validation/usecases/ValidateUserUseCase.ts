import { ForbiddenException } from '@cloneoverflow/common';
import { UserRepository } from '@core/domain/repositories/user/UserRepository';
import { ValidationServiceInput } from '../dtos/ValidationServiceInput';
import { IValidateUserUseCase } from '../types/usecases';

export class ValidateUserUseCase implements IValidateUserUseCase {
  constructor (
    private userRepository: UserRepository,
  ) {}
  
  async execute ({ userId }: ValidationServiceInput.ValidateUser): Promise<void> {
    if (!await this.userRepository.isExist({ userId })) {
      throw new ForbiddenException();
    }
  }
}