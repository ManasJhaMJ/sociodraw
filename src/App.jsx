import React, { useState, useEffect } from 'react';
import Canvas from './Canvas';
import ColorPalette from './ColorPalette';
import io from 'socket.io-client';
import Notification from './Notification';

const socket = io('http://localhost:3001');

function App() {
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
    <div className="App">
      <h1>Realtime Canvas Drawing</h1>
      <ColorPalette selectedColor={color} onSelectColor={setColor} />
      <Canvas color={color} />
      {notification && <Notification message={notification} />}
    </div>
  );
}

export default App;
