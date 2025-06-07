import { NoEntityWithIdException } from '@cloneoverflow/common';

export class QuestionIdInvalid extends NoEntityWithIdException {
  constructor () {
    super('Question');
  }
}