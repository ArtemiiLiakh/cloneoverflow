import { NextFunction, Response } from 'express';
import { ExpressRequest } from './ExpressRequest';

export type ExpressFunction = (req: ExpressRequest, res: Response, next: NextFunction) => Promise<void>;