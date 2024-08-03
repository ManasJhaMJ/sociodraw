import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io(process.env.SOCKET_URL);

function ChatBox() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        socket.on('chatMessage', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.off('chatMessage');
        };
    }, []);

    const sendMessage = () => {
        if (input.trim()) {
            socket.emit('chatMessage', input);
            setInput('');
        }
    };

    return (
        <div className="chat-box">
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index} className="message">{msg}</div>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}

export default ChatBox;
