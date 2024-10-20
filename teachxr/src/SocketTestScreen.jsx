import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const SocketTestScreen = () => {
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        const socket = io('http://localhost:5000');

        socket.on('connect', () => {
            setConnected(true);
            console.log('Connected to socket server');
        });

        socket.on('message', (data) => {
            setResponse(data);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const sendMessage = () => {
        const socket = io('http://localhost:5000');
        socket.emit('message', message);
    };

    return (
        <div>
            <h1>Socket Test Screen</h1>
            <p>Connected: {connected ? 'Yes' : 'No'}</p>
            <input 
                type="text" 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                placeholder="Type a message" 
            />
            <button onClick={sendMessage}>Send Message</button>
            <p>Response from server: {response}</p>
        </div>
    );
};

export default SocketTestScreen;