import { ForbiddenException } from '@cloneoverflow/common';

export class QuestionNotFavorite extends ForbiddenException {
  constructor () {
    super('Question is not your favorite');
  }
}