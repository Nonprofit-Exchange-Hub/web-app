import { useEffect, useState } from 'react';
import { io, ManagerOptions, SocketOptions } from 'socket.io-client';
import Messages from './Messages';
import NewMessage from './NewMessage';
import { Box, Typography } from '@mui/material';
import { Message, Transaction, User } from '../types';

type TempChatProps = {
  classes: any;
  transaction: Transaction;
  messages: Message[] | [];
  user: User | null;
};
const TempChat = (props: TempChatProps) => {
  const { classes, transaction, messages, user } = props;
  const [socket, setSocket] = useState<any>(null);
  const [newMessages, setNewMessages] = useState<Message[]>([]);
  const [showTypingGesture, setShowTypingGesture] = useState<boolean>(false);
  const [userTyping, setUserTyping] = useState<string>('');

  useEffect(() => {
    const opts: Partial<ManagerOptions & SocketOptions> = {
      withCredentials: true,
    };
    const newSocket = io(`http://${window.location.hostname}:3002`, opts);
    newSocket.emit('join', { transactionId: transaction.id });
    // to do - send org id if user is logged in as an organization

    setSocket(newSocket);
    newSocket.on(`message_${transaction.id}`, (res: any) => {
      console.log(res);
      setNewMessages((prev) => [...prev, res]);
    });

    newSocket.on('join', (res: any) => {
      console.log(res);
    });

    newSocket.on('typing', (res: { name: string; isTyping: boolean }) => {
      console.log(res);
      setShowTypingGesture(res.isTyping);
      setUserTyping(res.name);
    });

    return () => newSocket.close() as any;
  }, [transaction]);

  return (
    <Box className={classes.messagesWrapper}>
      <Typography variant="h5" component="h5" className={classes.sectionHeader}>
        Re: {transaction.asset.title}
      </Typography>
      {socket ? (
        <div>
          <Messages
            socket={socket}
            messages={[...messages, ...newMessages]}
            transaction={transaction}
            user={user}
          />
        </div>
      ) : (
        <div>Not Connected</div>
      )}
      {showTypingGesture && <p>... {userTyping} is typing</p>}
      <Box className={classes.messageInputWrapper}>
        <NewMessage socket={socket} transactionId={transaction.id} classes={classes} />
      </Box>
    </Box>
  );
};

export default TempChat;
