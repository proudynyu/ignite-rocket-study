import { FastifyInstance } from "fastify";
import { z } from 'zod'

import { prisma } from '../lib/prisma';

export async function memoriesRoutes(app: FastifyInstance) {
    app.addHook('preHandler', async(request) => {
        await request.jwtVerify()
    })

    app.get("/memories", async (request) => {
        const userScheme = z.object({
            sub: z.string()
        })

        const { sub } = userScheme.parse(request.user)

        const memories = await prisma.memory.findMany({
            where: {
                userId: sub
            },
            orderBy: {
                createdAt: 'asc'
            }
        })

        return memories.map(memory => (
            {
                id: memory.id,
                coverUrl: memory.coverUrl,
                excerpt: memory.content.substring(0, 115).concat('...')
            }
        ))
    });

    app.get("/memories/:id", async (request, reply) => {
        const paramsSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = paramsSchema.parse(request.params)

        const memory = await prisma.memory.findUniqueOrThrow({
            where: {
                id
            }
        })

        const userScheme = z.object({
            sub: z.string()
        })

        const { sub } = userScheme.parse(request.user)

        if (!memory.isPublic && memory.userId !== sub) {
            return reply.status(401).send()
        }

        return memory
    });

    app.post("/memories", async (request) => {
        const bodySchema = z.object({
            content: z.string(),
            coverUrl: z.string(),
            isPublic: z.coerce.boolean().default(false)
        })

        const { content, isPublic, coverUrl } = bodySchema.parse(request.params)

        const userScheme = z.object({
            sub: z.string()
        })

        const { sub } = userScheme.parse(request.user)

        const memory = await prisma.memory.create({
            data: {
                content, coverUrl, isPublic, userId: sub
            }
        })

        return memory
    });

    app.put("/memories/:id", async (request, reply) => {
        const paramsSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = paramsSchema.parse(request.params)

        const bodySchema = z.object({
            content: z.string(),
            coverUrl: z.string(),
            isPublic: z.coerce.boolean().default(false)
        })

        const { content, isPublic, coverUrl } = bodySchema.parse(request.params)

        let memory = await prisma.memory.findUniqueOrThrow({
            where: {
                id,
            }
        })

        const userScheme = z.object({
            sub: z.string()
        })

        const { sub } = userScheme.parse(request.user)

        if (memory.userId !== sub) {
            return reply.status(401).send()
        }

        memory = await prisma.memory.update({
            where: {
                id
            },
            data: {
                content, isPublic, coverUrl
            }
        })

        return memory
    });
}
