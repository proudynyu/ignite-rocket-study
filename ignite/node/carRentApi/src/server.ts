import Express from 'express';
import { constants } from './constants';
import { router } from './routes';

const app = Express();

app.use(Express.json());

app.use(router);

app.listen(constants.port, () =>
  console.log(`Server is running on ${constants.port}`)
);
