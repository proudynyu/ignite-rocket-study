import Fastify from 'fastify';

const app = Fastify();

app.get("/", () => {
    return "hello";
})

app.listen({
    port: 3333
}).then(() => {
    console.log('Server is running on port 3333');
})
