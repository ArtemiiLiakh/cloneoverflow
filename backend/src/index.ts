import config from './config';
import { initApplication } from '@web/index';

(async (): Promise<void> => {
  const app = await initApplication();
  await app.listen(config.SERVER_PORT);

  console.log('Started on http://127.0.0.1:8000');
})().catch(e => {
  console.error(e);
});
