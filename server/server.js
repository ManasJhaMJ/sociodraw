const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
    }
});

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
        socket.broadcast.emit('drawing', data);
        drawingData.push(data);
    });

    socket.on('clearCanvas', () => {
        drawingData = [];
        io.emit('clearCanvas'); // Notify all clients to clear their canvas
    });
});

server.listen(process.env.PORT, () => {
    console.log('listening on *:' + process.env.PORT);
});
