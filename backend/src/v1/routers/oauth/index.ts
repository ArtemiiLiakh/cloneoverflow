import express from 'express';
import { google } from './google';

const oauth = express.Router();
oauth.use('/google', google);

export { oauth };