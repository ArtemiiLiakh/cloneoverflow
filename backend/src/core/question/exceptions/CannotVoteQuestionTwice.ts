import { ForbiddenException } from '@cloneoverflow/common';

export class CannotVoteQuestionTwice extends ForbiddenException {
  constructor () {
    super('You cannot vote question more than one time');
  }
}