import { ForbiddenException } from '@cloneoverflow/common';

export class AnswerOwnerInvalid extends ForbiddenException {
  constructor () {
    super('You are not owner of this answer');
  }
}