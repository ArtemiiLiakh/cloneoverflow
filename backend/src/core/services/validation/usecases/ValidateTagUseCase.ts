import { NoEntityWithIdException } from '@cloneoverflow/common';
import { TagRepository } from '@core/domain/repositories/tag/TagRepository';
import { ValidationServiceInput } from '../dtos/ValidationServiceInput';
import { IValidateTagUseCase } from '../types/usecases';

export class ValidateTagUseCase implements IValidateTagUseCase {
  constructor (
    private tagRepository: TagRepository,
  ) {}
  
  async execute ({ tagId, name }: ValidationServiceInput.ValidateTag): Promise<void> {
    if (!await this.tagRepository.isExist({ tagId, name })) {
      throw new NoEntityWithIdException('Tag');
    };
  }
}