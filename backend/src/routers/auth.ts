import express from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validateBody } from '../middlewares/validation';
import { AuthLoginDTO } from '../dtos/auth.login.dto';
import { AuthSignInDTO } from '../dtos/auth.signin.dto';

const router = express.Router();
const controller = new AuthController();

router.post('/login', validateBody(AuthLoginDTO), controller.login.bind(controller));
router.post('/signin', validateBody(AuthSignInDTO), controller.signin.bind(controller));

export { router as auth };