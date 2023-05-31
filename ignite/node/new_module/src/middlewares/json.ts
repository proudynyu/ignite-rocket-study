import { IncomingMessage, ServerResponse } from "http";

export async function json<T>(
    req: IncomingMessage,
    res: ServerResponse
): Promise<void> {
    const buffers = [];

    for await (const chunk of req) {
        buffers.push(chunk);
    }

    const body = JSON.parse(Buffer.concat(buffers).toString()) as T;

    try {
        // @ts-ignore: Unreachable code error
        req.body = body;
    } catch {
        // @ts-ignore: Unreachable code error
        req.body = null;
    }

    res.setHeader("Content-Type", "application/json");
}
