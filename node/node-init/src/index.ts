import express from 'express';

import { settings } from './config';

const app = express();

app.listen(settings.port, () =>
  console.log(`Listening on port ${settings.port}`)
);
