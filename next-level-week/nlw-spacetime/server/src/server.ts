import 'dotenv/config'

import Fastify from "fastify";
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'

import { authRouter } from './routes/auth'
import { memoriesRoutes } from "./routes/memories";

export const app = Fastify();

app.register(cors, {
    origin: true
})

app.register(jwt, {
    secret: 'spacetime'
})

app.register(memoriesRoutes);
app.register(authRouter);

app.listen({
    port: 3333
}).then(() => {
    console.log("Server is running on port 3333");
});
