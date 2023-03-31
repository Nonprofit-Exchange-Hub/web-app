import { useEffect, useState } from 'react';
import { io, ManagerOptions, SocketOptions } from 'socket.io-client';
import Messages from './Messages';
import NewMessage from './NewMessage';

const TempChat = () => {
  const [socket, setSocket] = useState<any>(null);
  useEffect(() => {
    const opts: Partial<ManagerOptions & SocketOptions> = {
      withCredentials: true,
      transports: ['websocket'],
    };
    const newSocket = io(`http://${window.location.hostname}:3002`, opts);
    setSocket(newSocket);
    return () => newSocket.close() as any;
  }, [setSocket]);

  return (
    <div>
      <header>React Chat</header>
      {socket ? (
        <div>
          <Messages socket={socket} />
        </div>
      ) : (
        <div>Not Connected</div>
      )}
      <NewMessage socket={socket} />
    </div>
  );
};

export default TempChat;
