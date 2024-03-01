import express from "express";
import { UserController } from "../controllers/user.controller";
import { AuthAccess } from "../middlewares/authAccess";
import { validateBody } from "../middlewares/validation";
import { UserUpdateDto } from "../dtos/user.update.dto";

const router = express.Router();
const controller = new UserController();

router.patch('/:userId/update', AuthAccess, validateBody(UserUpdateDto), controller.update.bind(controller));

export { router as user };