import 'express-async-errors';
import express from 'express';
import parser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { userRouter } from './routers/userRouter';
import { authRouter } from './routers/authRouter';
import { questionRouter } from './routers/questionRouter';
import { answerRouter } from './routers/answerRouter';
import { prismaErrorHandler } from '@app/middlewares/prismaErrorHandler';
import { errorHandler } from '@app/middlewares/errorHandler';

const app = express();

app.use(parser.json());
app.use(cors({ 
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(cookieParser());

const api = express.Router();

api.use('/auth', authRouter);
api.use('/users', userRouter);
api.use('/questions', questionRouter);
api.use('/answers', answerRouter);

app.use('/api', api);

app.use(
  prismaErrorHandler, 
  errorHandler
);

export { app };