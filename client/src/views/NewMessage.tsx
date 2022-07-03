import React, { useState } from 'react';

const NewMessage = ({ socket }: any) => {
  const [value, setValue] = useState('');
  const submitForm = (e: any) => {
    e.preventDefault();
    socket.emit('createPocChat', { text: value });
    setValue('');
  };

  const handleOnChange = (e: any): void => {
    setValue(e.currentTarget.value);
  };

  const handleOnFocus = (): void => {
    if (socket) {
      socket.emit('typing', { isTyping: true });
    }
  };

  const handleBlur = (e: any): void => {
    socket.emit('typing', { isTyping: false });
  };

  return (
    <form onSubmit={submitForm}>
      <input
        autoFocus
        value={value}
        placeholder="Type your message"
        onChange={handleOnChange}
        onBlur={handleBlur}
        onFocus={handleOnFocus}
      />
    </form>
  );
};

export default NewMessage;
