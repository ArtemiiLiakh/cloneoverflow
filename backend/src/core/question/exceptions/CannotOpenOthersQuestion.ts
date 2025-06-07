import { ForbiddenException } from '@cloneoverflow/common';

export class CannotOpenOthersQuestion extends ForbiddenException {
  constructor () {
    super('You cannot open other\'s quesion');
  }
}