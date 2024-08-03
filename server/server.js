const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
    }
});

io.on('connection', (socket) => {
    console.log('a user connected');
    io.emit('userNotification', 'A user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
        io.emit('userNotification', 'A user disconnected');
    });

    socket.on('drawing', (data) => {
        socket.broadcast.emit('drawing', data);
    });
});

server.listen(3001, () => {
    console.log('listening on *:3001');
});
