import * as React from 'react';
import makeStyles from '@mui/styles/makeStyles';

import type { Theme } from '@mui/material/styles';

import { Typography } from '@mui/material';

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
  text,
  senderName,
  isCurrentUser,
  dateString,
}: {
  senderName: string;
  text: string;
  isCurrentUser: boolean;
  dateString: string;
}): JSX.Element {
  const classes = useStyles();
  return (
    <div className={isCurrentUser ? classes.currentUserMessage : classes.otherUserMessage}>
      <Typography variant="subtitle2" color="text.primary">
        {text}
      </Typography>
      <Typography variant="body2" color="text.primary">
        {dateString}
      </Typography>
    </div>
  );
}

export default MessageCard;
