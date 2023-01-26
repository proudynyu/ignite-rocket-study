import Fastify from 'fastify'
import cors from '@fastify/cors'
import { PrismaClient } from '@prisma/client'

const app = Fastify()
const prisma = new PrismaClient()

app.register(cors)

app.get('/', async () => {
    const habbits = await prisma.habit.findMany()
    return habbits
})

app.listen({
    port: 3333
})