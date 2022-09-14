import Express from "express";
import cors from 'cors'

import configs from "./config";
import { router } from "./routes";

const { host, port } = configs;

const app = Express();

app.use(Express.json())
app.use(cors())

app.use(router)

app.listen(port, () => {
  console.log(`Listening on ${host}:${port}`);
});
