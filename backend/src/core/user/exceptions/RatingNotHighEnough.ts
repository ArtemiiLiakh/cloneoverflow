import { ForbiddenException } from '@cloneoverflow/common';

export class RatingNotHighEnough extends ForbiddenException {
  constructor () {
    super('Your rating is not high enough to perform this action');
  }
}