import { ForbiddenException } from '@cloneoverflow/common';

export class CannotVoteOwnQuestion extends ForbiddenException {
  constructor () {
    super('You cannot vote your own question');
  }
}