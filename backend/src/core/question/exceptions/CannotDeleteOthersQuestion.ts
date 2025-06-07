import { ForbiddenException } from '@cloneoverflow/common';

export class CannotDeleteOthersQuestion extends ForbiddenException {
  constructor () {
    super('You can delete only your questions');
  }
}