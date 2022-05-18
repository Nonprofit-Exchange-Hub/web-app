import React, { useEffect, useState } from 'react';

function Messages({ socket }: any) {
  const [messages, setMessages] = useState<any>({});

  useEffect(() => {
    socket.emit('findAllPocChat', (response: any) => {
      console.log(response);
      setMessages(response);
    });
  }, [socket]);

  return (
    <div className="message-list">
      {[...Object.values(messages)]
        .sort((a: any, b: any) => a.time - b.time)
        .map((message: any) => (
          <div
            key={message.id}
            className="message-container"
            title={`Sent at ${new Date(message.time).toLocaleTimeString()}`}
          >
            <span>{message.text}:</span>
            <span>{message.name}</span>
          </div>
        ))}
    </div>
  );
}

export default Messages;
