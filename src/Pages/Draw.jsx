import React, { useState, useEffect } from 'react';
import Canvas from '../Components/Canvas';
import ColorPalette from '../Components/ColorPalette';
import io from 'socket.io-client';
import Notification from '../Components/Notification';
import ChatBox from '../Components/ChatBox';

// const socket = io('http://localhost:3001');
const socket = io(process.env.SOCKET_URL);

function Draw() {
    const [notification, setNotification] = useState('');
    const [color, setColor] = useState('#000000');

    useEffect(() => {
        socket.on('userNotification', (message) => {
            setNotification(message);
            setTimeout(() => {
                setNotification('');
            }, 3000); // Hide the notification after 3 seconds
        });

        return () => {
            socket.off('userNotification');
        };
    }, []);

    return (
        <div className="draw">
            <h1>Realtime Canvas Drawing</h1>
            <p>
                Draw something on the canvas. Your changes will be reflected in real-time to all connected users.
            </p>
            <Canvas color={color} />
            <ColorPalette selectedColor={color} onSelectColor={setColor} />
            <ChatBox />
            {notification && <Notification message={notification} />}
        </div>
    );
}

export default Draw;
