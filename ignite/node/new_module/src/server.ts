import { createServer } from "node:http";

import { port } from "./config";
import { json } from "./middlewares/json";
import { routes } from "./router";
import { extractSearchParams } from "./utils/extractSearchParams";

const server = createServer(async (req, res) => {
    const { method, url } = req;

    await json<User>(req, res);

    const route = routes.find((route) => {
        return route.method === method && route.path.test(url!);
    });

    if (route) {
        const routeParams = req.url?.match(route.path)!

        const { query, ...params } = routeParams.groups!

        // @ts-ignore: Unreachable code error
        req.params = { ...params }
        // @ts-ignore: Unreachable code error
        req.query = extractSearchParams(query) ?? {}

        return route.handler(req, res);
    }

    return res.writeHead(404).end("Not found");
});

server.listen(port, () => {
    console.log("Listening on port: ", port);
});

export { server };
