import * as React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';

import type { Theme } from '@material-ui/core/styles';

import SubHeader from './SubHeader';
import TransactionThreadCard from './TransactionThreadCard';
import MessageCard from './MessageCard';
import { UserContext } from './providers';

import type { Message, Transaction } from './types';

const useStyles = makeStyles((theme: Theme) => ({
  inboxWrapper: {
    maxWidth: '90%',
    margin: 'auto',
    marginBottom: '50px',
    textAlign: 'left',
  },
  sectionWrapper: {
    border: '1px solid black',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '5px',
    height: '100%',
    minHeight: '500px',
    position: 'relative',
  },
  sectionHeader: {
    margin: '5px',
  },
  messagesWrapper: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '200px',
    width: '100%',
  },
  threadsSection: {
    marginRight: '20px',
  },
  messageInputWrapper: {
    width: '100%',
    position: 'absolute',
    bottom: '10px',
  },
  messageInputForm: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  messageInput: {
    width: '100%',
  },
  noThreadsMessage: {
    margin: 'auto',
    width: '100%',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
  },
  noThreadsMessagePiece: {
    marginTop: '10px',
  },
}));

const fetchTransactions = (): Promise<Transaction[]> => {
  return Promise.resolve([
    {
      id: 1,
      donater: { id: 1, firstName: 'firstName1' },
      requester: { id: 2, firstName: 'firstName2' },
      asset: {
        id: 1,
        title: 'title 1',
      },
    },
    {
      id: 2,
      donater: { id: 1, firstName: 'firstName1' },
      requester: { id: 3, firstName: 'firstName3' },
      asset: {
        id: 2,
        title: 'title 2',
      },
    },
  ]);
};

// TODO: make the fetch find messages by transaction
// TODO: seed data so that messages appear without manually creating them

const fetchMessages = async (): Promise<Message[]> => {
  const res = await fetch('http://localhost:3001/api/messages');
  const data = await res.json();

  const messages = await data.map((message: any) => {
    return {
      id: message.id,
      text: message.text,
      transactionId: message.transaction_id,
      user: {
        id: message.user_id,
        firstName: message.user_first_name,
      },
    };
  });

  return messages;
};

// TODO use SubHeader component in Offer and Assets pages

// maybe call it SearchBar and have an optional leftContent prop?
function MessageInboxView(): JSX.Element {
  const classes = useStyles();
  const [user] = React.useContext(UserContext);
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const [selectedTransaction, setSelectedTransaction] = React.useState<Transaction | null>(null);
  const [messages, setMessages] = React.useState<Message[]>([]);

  const handleSendMessage = () => {};

  // todo switch to custom hook
  React.useEffect(() => {
    if (user) {
      (async function () {
        const transactions = await fetchTransactions(); // user.id
        setTransactions(transactions);
        setSelectedTransaction(transactions[0]);
      })();
    }
  }, [user]);

  // todo switch to custom hook
  React.useEffect(() => {
    if (selectedTransaction) {
      (async function () {
        const messages = await fetchMessages();
        setMessages(messages);
      })();
    }
  }, [selectedTransaction]);

  if (!user) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <SubHeader backTo="/" searchTo="/inbox" />
      <Grid container className={classes.inboxWrapper} justify="center">
        <Grid item className={`${classes.sectionWrapper} ${classes.threadsSection}`} xs={12} sm={4}>
          <Typography variant="h5" component="h5" className={classes.sectionHeader}>
            Inbox
          </Typography>
          {transactions.length ? (
            transactions.map((t) => (
              <TransactionThreadCard
                isSelected={t.id === selectedTransaction?.id}
                onClick={(transaction: Transaction) => setSelectedTransaction(transaction)}
                transaction={t}
                user={user}
              />
            ))
          ) : (
            <Box className={classes.noThreadsMessage}>
              <Typography className={classes.noThreadsMessagePiece}>Inbox empty</Typography>
              <Typography className={classes.noThreadsMessagePiece}>
                Support an organization by <Link to="/assets">contributing</Link> something they
                need
              </Typography>
              <Typography className={classes.noThreadsMessagePiece}>or</Typography>
              <Typography className={classes.noThreadsMessagePiece}>
                <Link to="/weDontHaveAPostRouteYet">Post</Link> a need
              </Typography>
            </Box>
          )}
        </Grid>
        <Grid item className={classes.sectionWrapper} xs={12} sm={7}>
          {selectedTransaction && (
            <Box className={classes.messagesWrapper}>
              <Typography variant="h5" component="h5" className={classes.sectionHeader}>
                Re: {selectedTransaction.asset.title}
              </Typography>
              {messages?.map((m) => (
                <MessageCard message={m} isCurrentUser={m.user.id === user?.id} />
              ))}
            </Box>
          )}
          <Box className={classes.messageInputWrapper}>
            <form onSubmit={handleSendMessage} className={classes.messageInputForm}>
              <TextField
                className={classes.messageInput}
                label="Enter your message here."
                variant="outlined"
              />
              <IconButton aria-label="send message" type="submit">
                <SendOutlinedIcon />
              </IconButton>
            </form>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default MessageInboxView;
