import { ForbiddenException } from '@cloneoverflow/common';

export class TokensIncompatible extends ForbiddenException {
  constructor () {
    super('Authorization tokens are incompatible');
  }
} 