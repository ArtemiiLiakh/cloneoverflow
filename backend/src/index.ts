import express, { Request, Response } from 'express';
import 'express-async-errors';
import bodyParser from 'body-parser';
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler';
import { auth } from './routers/auth';
import { prismaErrorHandler } from './middlewares/prismaErrorHandler';

const app = express();

app.use(bodyParser.json())
app.use(cors());

app.use('/auth', auth);

app.use(prismaErrorHandler);
app.use(errorHandler);

app.listen(4000, () => {
  console.log('Started on http://127.0.0.1:4000')
});