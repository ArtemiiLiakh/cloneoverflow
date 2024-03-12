import express from "express";
import { QuestionController } from "../controllers/question.controller";
import { AuthAccess } from "../middlewares/authAccess";
import { validateRequest } from "../middlewares/validation";
import { QuestionCreateDTO } from "../dtos/question.create.dto";

const router = express.Router();
const controller = new QuestionController();

router.post('/create', AuthAccess(), validateRequest({body: QuestionCreateDTO,}), controller.create.bind(controller));

export { router as question };