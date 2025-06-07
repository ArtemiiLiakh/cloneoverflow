import { ForbiddenException } from '@cloneoverflow/common';

export class QuestionAlreadyFavorite extends ForbiddenException {
  constructor () {
    super('Question is already favorite');
  }
}