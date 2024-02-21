import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

app.use(bodyParser.json())
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send({
    hello: 'world',
  });
});

app.listen(4000, () => {
  console.log('Started on http://127.0.0.1:4000')
});