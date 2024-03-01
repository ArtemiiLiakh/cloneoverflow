import express, { Request, Response } from 'express';
import 'express-async-errors';
import bodyParser from 'body-parser';
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler';
import { auth } from './routers/auth';
import { prismaErrorHandler } from './middlewares/prismaErrorHandler';
import cookieParser from 'cookie-parser';
import { user } from "./routers/user";

const app = express();

app.use(bodyParser.json())
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cookieParser());

const api = express.Router(); 
api.use('/auth', auth);
api.use('/users', user)

app.use('/api', api);
app.use(prismaErrorHandler);
app.use(errorHandler);

app.listen(4000, () => {
  console.log('Started on http://127.0.0.1:4000');
});