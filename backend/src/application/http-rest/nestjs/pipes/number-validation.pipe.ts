import { BadBodyException } from '@cloneoverflow/common';
import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { isNumberString } from 'class-validator';

export class NumberPipe implements PipeTransform {
  transform (value: any, metadata: ArgumentMetadata) {
    if (!isNumberString(value)) {
      throw new BadBodyException(`obj.${metadata.type}.${metadata.data}: value must be a number`);
    }

    return value;
  }
}