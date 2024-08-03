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

// Store drawing data
let drawingData = [];

io.on('connection', (socket) => {
    console.log('a user connected');
    io.emit('userNotification', 'A user connected');

    // Send existing drawing data to the new user
    socket.emit('initialDrawingData', drawingData);

    socket.on('disconnect', () => {
        console.log('user disconnected');
        io.emit('userNotification', 'A user disconnected');
    });

    socket.on('drawing', (data) => {
        // Broadcast drawing data to other users
        socket.broadcast.emit('drawing', data);
        // Store drawing data
        drawingData.push(data);
    });
});

server.listen(3001, () => {
    console.log('listening on *:3001');
});
