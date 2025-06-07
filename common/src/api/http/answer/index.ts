export * from './AnswerCreate';
export * from './AnswerDelete';
export * from './AnswerGet';
export * from './AnswerGetVote';
export * from './AnswerUpdate';
export * from './AnswerVoteDown';
export * from './AnswerVoteUp';

import { AnswerCreatePath } from './AnswerCreate';
import { AnswerDeletePath } from './AnswerDelete';
import { AnswerGetPath } from './AnswerGet';
import { AnswerGetVotePath } from './AnswerGetVote';
import { AnswerUpdatePath } from './AnswerUpdate';
import { AnswerVoteUpPath } from './AnswerVoteDown';
import { AnswerVoteDownPath } from './AnswerVoteUp';
import { answerPath } from './path';

export const AnswerPaths = {
  MainPath: answerPath,
  Create: AnswerCreatePath,
  Get: AnswerGetPath,
  Update: AnswerUpdatePath,
  Delete: AnswerDeletePath,
  VoteUp: AnswerVoteUpPath,
  VoteDown: AnswerVoteDownPath,
  GetVote: AnswerGetVotePath,
}