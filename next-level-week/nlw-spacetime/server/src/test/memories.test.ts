import { deepEqual } from 'node:assert'
import { describe, it, expect, afterAll, beforeAll } from '@jest/globals'
import { FastifyInstance } from 'fastify'

const BASE_URL = 'http://localhost:3333'

describe('memories API suite', () => {
    let server = {} as FastifyInstance

    async function makeRequest(url: string, data: unknown, method: 'POST'|'GET') {
        const response = await fetch(url, {
            method,
            body: JSON.stringify(data)
        })

        deepEqual(response.status, 200)
        return response.json()
    }

    beforeAll(async () => {
        server = (await import('../server')).app

        await server.listen({
            port: 3333
        }).then(() => {
            console.log("Server is running on port 3333");
        });
    })

    afterAll(() => {
        server.close()
    })

    it('should return true', () => {
        expect(1).toEqual(1)
    })
})
