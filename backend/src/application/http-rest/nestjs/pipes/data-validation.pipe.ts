import { ValidationException } from '@cloneoverflow/common';
import { ArgumentMetadata, ValidationPipe } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

export class DataValidationPipe extends ValidationPipe {
  async transform (value: unknown, metadata: ArgumentMetadata): Promise<unknown> {
    if (metadata.type === 'custom') {
      return super.transform(value, metadata);
    }

    if (!metadata.metatype || !this.toValidate(metadata)) {
      return value;
    }

    const data = plainToInstance(metadata.metatype, value);
    const errors = await this.validate(data);

    if (errors.length) {
      throw new ValidationException(errors);
    }

    return data;
  }
}