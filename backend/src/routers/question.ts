import express from "express";
import { 
  SearchQuestionsDTO, 
  QuestionUpdateDTO, 
  QuestionCreateDTO, 
  QuestionGetDTO, 
  VoteDTO,
  QuestionCloseDTO, 
} from '@cloneoverflow/common';
import { QuestionController } from "../controllers/question.controller";
import { AuthAccess, GetAuth } from "../middlewares/authAccess";
import { validateRequest } from "../middlewares/validation";
import { SearchController } from "../controllers/search.controller";

const router = express.Router();
const questionController = new QuestionController();
const searchController = new SearchController();

router.post('/create', 
  AuthAccess(), 
  validateRequest({ body: QuestionCreateDTO }), 
  questionController.create.bind(questionController)
);

router.patch('/:questionId/update', 
  AuthAccess(), 
  validateRequest({ body: QuestionUpdateDTO }), 
  questionController.update.bind(questionController)
);

router.get('/search', 
  validateRequest({ query: SearchQuestionsDTO }), 
  searchController.getQuestions.bind(searchController)
);

router.get('/:questionId', 
  GetAuth(),
  validateRequest({ query: QuestionGetDTO }),
  questionController.get.bind(questionController)
);

router.delete('/:questionId/delete', 
  questionController.delete.bind(questionController)
);

router.patch('/:questionId/closed', 
  AuthAccess(),
  validateRequest({
    body: QuestionCloseDTO,
  }),
  questionController.closeQuestion.bind(questionController),
);

router.patch('/:questionId/vote', 
  AuthAccess(),
  validateRequest({ body: VoteDTO }),
  questionController.voteQuestion.bind(questionController),
);

export { router as question };