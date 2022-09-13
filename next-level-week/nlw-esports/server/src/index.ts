import Express from "express";

import configs from "./config";
import { router } from "./routes";

const { host, port } = configs;

const app = Express();

app.use(router)

app.listen(port, () => {
  console.log(`Listening on ${host}:${port}`);
});
