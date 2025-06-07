import { ForbiddenException } from '@cloneoverflow/common';

export class CannotVoteAnswerTwice extends ForbiddenException {
  constructor () {
    super('You cannot vote answer more that one time');
  }
}