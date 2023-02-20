import Express from 'express';
import swaggerUi from 'swagger-ui-express';

import swaggerFile from './swagger.json';
import { constants } from './constants';
import { router } from './routes';

import './database'

const app = Express();

app.use(Express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.listen(constants.port, () =>
  console.log(`Server is running on ${constants.port}`)
);
