import { ForbiddenException } from '@cloneoverflow/common';

export class CannotVoteOwnAnswer extends ForbiddenException {
  constructor () {
    super('You cannot vote your own answer');
  }
}