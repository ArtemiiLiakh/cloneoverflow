import { ForbiddenException } from '@cloneoverflow/common';

export class FavoriteUnavailableForUnauthorized extends ForbiddenException {
  constructor () {
    super('Filter by favorite is unavailable for unauthorized users');
  }
}