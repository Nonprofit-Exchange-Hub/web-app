import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import Messages from './Messages';

const TempChat = () => {
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:3001`);
    setSocket(newSocket);
    return () => newSocket.close() as any;
  }, [setSocket]);

  return (
    <div className="App">
      <header className="app-header">React Chat</header>
      {socket ? (
        <div className="chat-container">
          <Messages socket={socket} />
        </div>
      ) : (
        <div>Not Connected</div>
      )}
    </div>
  );
};

export default TempChat;
