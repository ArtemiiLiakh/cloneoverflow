import { ForbiddenException } from '@cloneoverflow/common';

export class CannotCloseOthersQuestion extends ForbiddenException {
  constructor () {
    super('You cannot close other\'s quesion');
  }
}