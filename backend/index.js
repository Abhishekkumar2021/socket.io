import express from 'express';
const app = express();
import http from 'http';
const server = http.createServer(app);
import { Server } from 'socket.io';
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
    }
});

// Controllers
import { onConnect } from './controllers/io.controllers.js';
io.on('connection', onConnect);

setTimeout(() => {
    // This will be sent to all clients
    io.emit('message', {
        message: 'This is a message from the server',
        date: new Date()
    });
}, 1000);

server.listen(8080, () => {
    console.log('listening on port 8080');
});