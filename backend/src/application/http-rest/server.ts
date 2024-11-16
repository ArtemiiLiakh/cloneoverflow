import 'express-async-errors';
import express from 'express';
import parser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { userRouter } from './routers/userRouter';
import { authRouter } from './routers/authRouter';
import { questionRouter } from './routers/questionRouter';
import { answerRouter } from './routers/answerRouter';
import { tagRouter } from './routers/tagRouter';
import { errorHandler } from '@application/middlewares/errorHandler';
import { prismaErrorHandler } from '@application/middlewares/prismaErrorHandler';

const app = express();

app.use(parser.json());
app.use(cors({ 
  origin: 'http://localhost:3000',
  credentials: true,
}));

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cookieParser());

const api = express.Router();

api.use('/auth', authRouter);
api.use('/users', userRouter);
api.use('/questions', questionRouter);
api.use('/answers', answerRouter);
api.use('/tags', tagRouter);

app.use('/api', api);

app.use(
  prismaErrorHandler, 
  errorHandler,
);

export { app };