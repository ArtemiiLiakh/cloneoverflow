import express from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validateBody } from '../middlewares/validation';
import { AuthLoginDTO } from '../dtos/auth.login.dto';
import { AuthSignupDTO } from '../dtos/auth.signup.dto';
import { AuthAccess } from '../middlewares/authAccess';
import { AuthChangePasswordDTO } from '../dtos/auth.changePassword.dto';

const router = express.Router();
const controller = new AuthController();

router.post('/login', validateBody(AuthLoginDTO), controller.login.bind(controller));
router.post('/signup', validateBody(AuthSignupDTO), controller.signup.bind(controller));
router.get('/me', AuthAccess, controller.getMe.bind(controller));
router.post('/refreshToken', controller.refreshToken.bind(controller));
router.patch('/changePassword', AuthAccess, validateBody(AuthChangePasswordDTO), controller.changePassword.bind(controller));

export { router as auth };