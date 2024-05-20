import express from "express";
import { QuestionController } from "../controllers/question.controller";
import { AuthAccess } from "../middlewares/authAccess";
import { validateRequest } from "../middlewares/validation";
import { SearchQuestionsDTO, QuestionUpdateDTO, QuestionCreateDTO, QuestionGetDTO } from '@cloneoverflow/common';
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
  validateRequest({ query: QuestionGetDTO }),
  questionController.get.bind(questionController)
);

router.delete('/:questionId/delete', 
  questionController.delete.bind(questionController)
);

export { router as question };