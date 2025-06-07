import { ForbiddenException } from '@cloneoverflow/common';

export class QuestionAlreadyClosed extends ForbiddenException {
  constructor () {
    super('The question is already closed');
  }
}