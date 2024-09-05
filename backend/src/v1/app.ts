import 'express-async-errors';
import { errorHandler } from '@/v1/middlewares/errorHandler';
import { prismaErrorHandler } from '@/v1/middlewares/prismaErrorHandler';
import { answer } from '@/v1/routers/answer';
import { auth } from '@/v1/routers/auth';
import { oauth } from '@/v1/routers/oauth';
import { tags } from '@/v1/routers/tags';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { question } from "./routers/question";
import { user } from "./routers/user";

const app = express();

app.use(bodyParser.json())
app.use(cors({ 
  origin: 'http://localhost:3000',
  credentials: true, 
}));
app.use(cookieParser());

const api = express.Router(); 
api.use('/auth', auth);
api.use('/users', user);
api.use('/questions', question);
api.use('/answers', answer);
api.use('/tags', tags);
api.use('/oauth', oauth);

app.use('/api', api);
app.use(prismaErrorHandler);
app.use(errorHandler);

export default app;