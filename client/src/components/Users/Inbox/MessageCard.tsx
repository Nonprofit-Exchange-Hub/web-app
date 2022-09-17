import * as React from 'react';
import makeStyles from '@mui/styles/makeStyles';

import type { Theme } from '@mui/material/styles';

import type { Message } from '../../../types';

const useStyles = makeStyles((theme: Theme) => ({
  currentUserMessage: {
    alignSelf: 'flex-end',
    border: '1px solid black',
    borderRadius: '10px',
    padding: '5px',
    maxWidth: '70%',
    marginLeft: '30%',
  },
  otherUserMessage: {
    alignSelf: 'flex-start',
    background: 'rgba(196, 196, 196, 0.3)',
    border: '1px solid black',
    borderRadius: '10px',
    padding: '5px',
    maxWidth: '70%',
  },
}));

function MessageCard({
  isCurrentUser,
  message,
}: {
  isCurrentUser: boolean;
  message: Message;
}): JSX.Element {
  const classes = useStyles();

  return (
    <div className={isCurrentUser ? classes.currentUserMessage : classes.otherUserMessage}>
      {message.user.firstName}: {message.text}
    </div>
  );
}

export default MessageCard;
