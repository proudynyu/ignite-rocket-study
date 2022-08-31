import express from 'express';
import routes from './routes'

import { settings } from './config';

const app = express();

app.use(express.json())

app.use(routes)

app.listen(settings.port, () =>
  console.log(`Listening on port ${settings.port}`)
);
