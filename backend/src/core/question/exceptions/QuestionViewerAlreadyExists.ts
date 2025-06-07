import { Exception } from '@cloneoverflow/common';

export class QuestionViewerAlreadyExists extends Exception {
  constructor () {
    super('Question viewer already exists', 409);
  }
}