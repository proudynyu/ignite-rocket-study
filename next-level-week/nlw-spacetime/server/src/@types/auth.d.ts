import "@fastify/jwt"
import { string } from "zod"

declare module "@fastify/jwt" {
    export interface FastifgyJWT {
        user: {
            sub: string
            name: string
            avatarUrl: string
        }
    }
}
