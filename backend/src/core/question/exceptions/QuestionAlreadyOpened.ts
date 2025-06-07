import { ForbiddenException } from '@cloneoverflow/common';

export class QuestionAlreadyOpened extends ForbiddenException {
  constructor () {
    super('The question is already opened');
  }
}