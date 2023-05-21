import 'dotenv/config'

import { resolve } from 'node:path'
import Fastify from "fastify";
import cors from '@fastify/cors'
import multipart from '@fastify/multipart'
import jwt from '@fastify/jwt'

import { authRouter } from './routes/auth'
import { memoriesRoutes } from "./routes/memories";
import { uploadRouter } from './routes/upload';

export const app = Fastify();

app.register(multipart);
app.register(require("@fastify/static"), {
    root: resolve(__dirname, '../uploads'),
    prefix: 'uploads'
})

app.register(cors, {
    origin: true
})

app.register(jwt, {
    secret: 'spacetime'
})

app.register(memoriesRoutes);
app.register(uploadRouter;
app.register(authRouter);

app
    .listen({
        port: 3333,
        host: '0.0.0.0'
    })
    .then(() => {
        console.log("Server is running on port 3333");
    });
