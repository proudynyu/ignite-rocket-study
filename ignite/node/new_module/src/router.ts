import { IncomingMessage, ServerResponse } from "http";
import { randomUUID } from "node:crypto";

import { database } from "./database";
import { buildRoutePath } from "./utils/buildRoutePath";

export const routes = [
    {
        method: "GET",
        path: buildRoutePath("/users"),
        handler: (
            _: IncomingMessage,
            res: ServerResponse<IncomingMessage> & {
                req: IncomingMessage;
            }
        ) => {
            const users = database.select("users");

            return res.end(JSON.stringify(users));
        },
    },
    {
        method: "POST",
        path: buildRoutePath("/users"),
        handler: (
            req: IncomingMessage,
            res: ServerResponse<IncomingMessage> & {
                req: IncomingMessage;
            }
        ) => {
            // @ts-ignore: Unreachable code error
            const { name, email } = req.body as User;

            const user = { id: randomUUID, name, email };
            database.insert("users", user);

            return res.writeHead(200).end(JSON.stringify(user));
        },
    },
    {
        method: "DELETE",
        path: buildRoutePath("/users/:id"),
        handler: (
            req: IncomingMessage,
            res: ServerResponse<IncomingMessage> & {
                req: IncomingMessage;
            }
        ) => {
            // @ts-ignore: Unreachable code error
            const { id } = req.params;

            database.delete("users", id);

            return res.writeHead(204).end();
        },
    },
    {
        method: "PUT",
        path: buildRoutePath("/users/:id"),
        handler: (
            req: IncomingMessage,
            res: ServerResponse<IncomingMessage> & {
                req: IncomingMessage;
            }
        ) => {
            // @ts-ignore: Unreachable code error
            const { id } = req.params;
            // @ts-ignore: Unreachable code error
            const { name, email } = req.body as User;

            database.update("users", id, {
                name,
                email,
            });

            return res.writeHead(204).end();
        },
    },
];
