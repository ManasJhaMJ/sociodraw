import React, { useState, useEffect } from 'react';
import Canvas from './Canvas';
import io from 'socket.io-client';
import Notification from './Notification';

const socket = io('http://localhost:3001');

function App() {
  const [notification, setNotification] = useState('');

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
      <Canvas />
      {notification && <Notification message={notification} />}
    </div>
  );
}

export default App;
