import { createServer } from "node:http";

import { port } from "./config";
import { json } from "./middlewares/json";
import { Database } from "./database";

const users = new Database();

const server = createServer(async (req, res) => {
    const { method, url } = req;

    await json<User>(req, res);

    if (method === "GET" && url === "/users") {
        return res.end(JSON.stringify(users.select("users")));
    }

    if (method === "POST" && url === "/users") {
        // @ts-ignore: Unreachable code error
        const { name, last } = req.body as User;
        users.insert("users", { name, last });

        return res.writeHead(200).end(JSON.stringify(users));
    }

    return res.writeHead(404).end("Not found");
});

server.listen(port, () => {
    console.log("Listening on port: ", port);
});

export { server };
