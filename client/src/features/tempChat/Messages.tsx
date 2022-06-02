import React, { useEffect, useState } from 'react';

interface IMessage {
  text: string;
  name: string;
  id: string;
  created_date: Date;
}

function Messages({ socket }: any) {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [showTypingGesture, setShowTypingGesture] = useState<boolean>(false);
  const [userTyping, setUserTyping] = useState<string>('');

  useEffect(() => {
    socket.on('message', (res: IMessage[]) => {
      setMessages(res);
    });

    socket.on('typing', (res: { name: string; isTyping: boolean }) => {
      setShowTypingGesture(res.isTyping);
      setUserTyping(res.name);
    });

    socket.emit('findAllPocChat', (res: IMessage[]) => {
      setMessages(res);
    });
  }, [socket]);

  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleString('en-US');
  };

  return (
    <div className="message-list">
      {messages.map((message: IMessage) => (
        <div key={message.id} className="message-container">
          <span>{formatDate(message.created_date)}:</span>
          <span>{message.name}:</span>
          <span>{message.text}</span>
        </div>
      ))}
      {showTypingGesture && <p>... {userTyping} is typing</p>}
    </div>
  );
}

export default Messages;
