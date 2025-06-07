import { BadBodyException } from '@cloneoverflow/common';

export class AnswerNotBelongToQuestion extends BadBodyException {
  constructor () {
    super('This answer does not belong to question');
  }
}