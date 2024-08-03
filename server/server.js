const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
}));

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL || '*',
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

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log('listening on *:' + PORT);
});
