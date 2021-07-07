const express = require('express');
const cors = require('cors');

const postsRouter = require('../posts/router');

const server = express();

server.use(express.json());
server.use(cors())

server.get('/', (req, res) => {
    res.send(`
    <h3> BlogPost API </h3>
    <p>You have connected to the API</p>
    `);
});

server.use('/api/posts', postsRouter)

module.exports = server;