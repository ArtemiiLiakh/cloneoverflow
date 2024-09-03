import { QuestionController } from "@/controllers/question.controller";
import { SearchController } from "@/controllers/search.controller";
import { AuthAccess, GetAuth } from "@/middlewares/authAccess";
import { validateRequest } from "@/middlewares/validation";
import { questionService, tagsService } from "@/services";
import {
  QuestionCloseDTO,
  QuestionCreateDTO,
  QuestionGetDTO,
  QuestionUpdateDTO,
  SearchQuestionsDTO,
  VoteDTO,
} from '@cloneoverflow/common';
import express from "express";

const question = express.Router();

const questionController = new QuestionController(questionService);
const searchController = new SearchController(questionService, tagsService);

question.post('/create', 
  AuthAccess(), 
  validateRequest({ body: QuestionCreateDTO }), 
  questionController.create.bind(questionController)
);

question.patch('/:questionId/update', 
  AuthAccess(), 
  validateRequest({ body: QuestionUpdateDTO }), 
  questionController.update.bind(questionController)
);

question.get('/search', 
  validateRequest({ query: SearchQuestionsDTO }), 
  searchController.searchQuestions.bind(searchController)
);

question.get('/:questionId/get', 
  GetAuth(),
  validateRequest({ query: QuestionGetDTO }),
  questionController.get.bind(questionController)
);

question.delete('/:questionId/delete', 
  AuthAccess(),
  questionController.delete.bind(questionController)
);

question.patch('/:questionId/close', 
  AuthAccess(),
  validateRequest({
    body: QuestionCloseDTO,
  }),
  questionController.closeQuestion.bind(questionController),
);

question.patch('/:questionId/vote', 
  AuthAccess(),
  validateRequest({ body: VoteDTO }),
  questionController.voteQuestion.bind(questionController),
);

export { question };
