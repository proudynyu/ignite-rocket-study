import { Server } from "node:http";

const BASE_URL = "http://localhost:3333";

describe("Server suite", () => {
    let server = {} as Server;

    beforeAll(async () => {
        server = (await import("../server")).server;

        await new Promise(resolve => {
            server.once("listening", resolve);
        });
    });

    afterAll(() => {
        server.close();
    });

    it("should return the users when a GET request is made to /users", async () => {
        const expectedData = [
            {
                name: "johhhn",
                last: "doe"
            }
        ];

        const response = await fetch(`${BASE_URL}/users`);
        expect(response.status).toBe(200);

        const data = await response.json();
        expect(data).toEqual(expectedData);
    });
});
