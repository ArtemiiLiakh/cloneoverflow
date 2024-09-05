import express, { Request, Response } from 'express';
import { AuthForgotPasswordDTO } from '@cloneoverflow/common';
import { GoogleService } from '@/v1/services/google/google.service';
import { Query, Body } from '@/v1/types/Requests';

const google = express.Router();
const googleService = new GoogleService();

google.get('/auth', async (req: Request, res: Response) => {
  const url = googleService.getAuthURL();
  res.send({ url });
});

interface GoogleCodeResponse {
  code: string;
  scope: string;
}

google.get('/callback', async (req: Query<GoogleCodeResponse>, res: Response) => {
  const code = req.query.code; 

  if (!code) {
    throw new Error('No code error')  
  }

  const tokens = await googleService.updateRefreshToken(code);

  res.status(200).send(tokens);
});

google.post('/sendEmail', async (req: Body<AuthForgotPasswordDTO>, res: Response) => {
  const { email } = req.body;

  googleService.email.sendEmail(email, {
    subject: 'Title',
    text: 'Hello'
  });

  res.send('ok');
});

export { google };