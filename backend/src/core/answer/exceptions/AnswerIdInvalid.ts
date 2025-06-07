import { NoEntityWithIdException } from '@cloneoverflow/common';

export class AnswerIdInvalid extends NoEntityWithIdException {
  constructor () {
    super('Answer');
  }
}