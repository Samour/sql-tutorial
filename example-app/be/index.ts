import * as express from 'express';
import * as cors from 'cors';
import { IConfig, loadConfig } from './config';
import users from './routes/users';
import polls from './routes/polls';

async function main(): Promise<void> {
  const config: IConfig = await loadConfig();

  const app: express.Application = express();

  app.use(cors());
  app.use(express.json());

  app.get('/hello', (req, res) => res.send({ msg: 'Hello World!' }));

  app.use('/users', users);
  app.use('/polls', polls);

  app.listen(config.server.port, () => console.log(`Server started on port ${config.server.port}`));
}

main().catch((e) => {
  console.error('Program completed abnormally');
  console.error(e);
});
