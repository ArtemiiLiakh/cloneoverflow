import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import { errorHandler } from './middlewares/errorHandler';
import { prismaErrorHandler } from './middlewares/prismaErrorHandler';
import { auth } from './routers/auth';
import { user } from "./routers/user";
import { question } from "./routers/question";
import { answer } from './routers/answer';

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

app.use('/api', api);
app.use(prismaErrorHandler);
app.use(errorHandler);

app.listen(4000, () => {
  console.log('Started on http://127.0.0.1:4000');
});