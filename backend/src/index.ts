import 'tsconfig-paths/register';
import config from './config';
import { initApplication } from '@application/http-rest/nestjs';

(async (): Promise<void> => {
  const app = await initApplication();
  await app.listen(config.SERVER_PORT);

  console.log('Started on http://127.0.0.1:8000');
})().catch(e => {
  console.error(e);
});
