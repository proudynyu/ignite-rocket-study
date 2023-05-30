import {createServer} from 'node:http';
import {port, host} from './config';

const users: {name: string; last: string}[] = [
  {
    name: 'johhhn',
    last: 'doe',
  },
];

const server = createServer((req, res) => {
    const {method, url} = req;

    console.log(url);

    switch (method) {
        case 'GET':
            return res
                .setHeader('Content-Type', 'application/json')
                .writeHead(200)
                .end(JSON.stringify(users));
    }

    return res.writeHead(404).end('Not found');
});

server.listen(port, host);
