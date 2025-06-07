import { NotFoundException } from '@cloneoverflow/common';

export class QuestionNotFound extends NotFoundException {
  constructor () {
    super('Question not found');
  }
}