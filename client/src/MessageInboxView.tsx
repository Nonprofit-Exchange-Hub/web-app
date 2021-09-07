import * as React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import TodayOutlined from '@material-ui/icons/TodayOutlined';
// import RoomOutlined from '@material-ui/icons/RoomOutlined';
import { Redirect } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import PermIdentityRoundedIcon from '@material-ui/icons/PermIdentityRounded';
import TextField from '@material-ui/core/TextField';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';

import type { Theme } from '@material-ui/core/styles';

// import StyledLink from './StyledLink';
import SubHeader from './SubHeader';
import { UserContext } from './providers';

import type { Asset, User } from './types';


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
        minHeight: '300px',
    },
    sectionHeader: {
        margin: '5px',
    },
    threadCardSelected: {
        background: 'rgba(196, 196, 196, 0.3)',
        width: '95%',
        margin: '0 auto',
    },
    threadCard: {
        background: 'white',
        width: '95%',
        margin: '0 auto',
        boxShadow: 'none',
    },
    threadCardContent: {
        padding: '10px 4px 10px 40px',
    },
    messagesWrapper: {
        minHeight: '200px',
        width: '100%',
    },
    threadsSection: {
        marginRight: '20px',
    },
    threadCardTitle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    messageInputWrapper: {
        position: 'relative',
        width: '100%',
    },
    messageInputForm: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 0,
    },
    messageInput: {
        width: '100%',
    },
    currentUserMessage: {
        border: '1px solid black',
        borderRadius: '10px',
        padding: '5px',
        maxWidth: '70%',
        marginLeft: '30%',
    },
    otherUserMessage: {
        background: 'rgba(196, 196, 196, 0.3)',
        border: '1px solid black',
        borderRadius: '10px',
        padding: '5px',
        maxWidth: '70%',
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


type Props = {
  // headerText: string,
  // cards: Asset[],
};

type Transaction = {
    id: number,
    donater: User,
    requester: User,
    asset: Pick<Asset, 'id' | 'title'>,
};

type Message = {
    id: number,
    text: string,
    transactionId: number,
    user: User,
};

const fetchTransactions = (): Promise<Transaction[]> => {
    return Promise.resolve([
        {
            id: 1,
            donater: { id: 1, firstName: 'firstName1'},
            requester: { id: 2, firstName: 'firstName2' },
            asset: {
                id: 1,
                title: 'title 1',
            }
        },
        {
            id: 2,
            donater: { id: 1, firstName: 'firstName1'},
            requester: { id: 3, firstName: 'firstName3' },
            asset: {
                id: 2,
                title: 'title 2',
            }
        },
    ]);
};

const messages1 = [
    { id: 1, text: 'hi', transactionId: 1, user: { id: 1, firstName: 'james' } },
    { id: 1, text: 'hello', transactionId: 1, user: { id: 2, firstName: 'user2' } },
];
const messages2 = [
    { id: 1, text: 'yo', transactionId: 1, user: { id: 1, firstName: 'james' } },
    { id: 1, text: 'what\'s good?', transactionId: 1, user: { id: 3, firstName: 'user3' } },
];
const threads = [messages1, messages2];

const fetchMessages = (id: number): Promise<Message[]> => {
    return Promise.resolve(threads.find(thread => thread[0].transactionId === id) || []);
};

function TransactionThreadCard({
    isSelected,
    onClick,
    transaction,
    user,
}: {
    isSelected: boolean,
    onClick: (transaction: Transaction) => void,
    transaction: Transaction,
    user?: User,
}): JSX.Element {
    const classes = useStyles();
    const otherUser = user?.id === transaction.requester.id
        ? transaction.requester.firstName : transaction.donater.firstName;

    return (
        <Card
            className={isSelected ? classes.threadCardSelected : classes.threadCard}
            onClick={() => onClick(transaction)}
            variant={isSelected ? 'outlined' : undefined}
        >
            <CardContent className={classes.threadCardContent}>
                <Box className={classes.threadCardTitle}>
                    <Typography variant="h6" component="h6">{otherUser}</Typography>
                    <PermIdentityRoundedIcon />
                </Box>
                <Typography>Re: {transaction.asset.title}</Typography>
            </CardContent>
        </Card>
    );
}

function MessageCard({ isCurrentUser, message }: { isCurrentUser: boolean, message: Message }): JSX.Element {
    const classes = useStyles();

    return (
        <div className={isCurrentUser ? classes.currentUserMessage : classes.otherUserMessage}>
            {message.user.firstName}: {message.text}
        </div>
    );
}


// TODO use SubHeader component in Offer and Assets pages
// maybe call it SearchBar and have an optional leftContent prop?

function MessageInboxView(props: Props): JSX.Element {
    const classes = useStyles();
    const [user] = React.useContext(UserContext);
    const [transactions, setTransactions] = React.useState<Transaction[]>([]);
    const [selectedTransaction, setSelectedTransaction] = React.useState<Transaction | null>(null);
    const [messages, setMessages] = React.useState<Message[]>([]);

    const handleSendMessage = () => {};

    // if (!user) {
    //     return <Redirect to="/" />
    // }

    // todo switch to custom hook
    React.useEffect(() => {
        // todo switch to if user
        if (!user) {
            (async function() {
                const transactions = await fetchTransactions(); // user.id
                setTransactions(transactions);
                setSelectedTransaction(transactions[0]);
            }())
        }
    }, [user]);

    // todo switch to custom hook
    React.useEffect(() => {
        if (selectedTransaction) {
            (async function() {
                const messages = await fetchMessages(selectedTransaction.id);
                setMessages(messages);
            }())
        }
    }, [selectedTransaction]);

    return (
        <>
            <SubHeader backTo="/" searchTo="/inbox" />
            <Grid container className={classes.inboxWrapper} justify="center">
                <Grid
                    item
                    className={`${classes.sectionWrapper} ${classes.threadsSection}`}
                    xs={12}
                    sm={4}
                >
                    <Typography
                        variant="h5"
                        component="h5"
                        className={classes.sectionHeader}
                    >
                        Inbox
                    </Typography>
                    {transactions.length ? transactions.map(t => (
                        <TransactionThreadCard
                            isSelected={t.id === selectedTransaction?.id}
                            onClick={(transaction: Transaction) => setSelectedTransaction(transaction)}
                            transaction={t}
                            user={user}
                        />
                    )) : (
                        <Box className={classes.noThreadsMessage}>
                            <Typography className={classes.noThreadsMessagePiece}>
                                Inbox empty
                            </Typography>
                            <Typography className={classes.noThreadsMessagePiece}>
                                Support an organization by <Link to="/assets">contributing</Link> something they need
                            </Typography>
                            <Typography className={classes.noThreadsMessagePiece}>
                                or
                            </Typography>
                            <Typography className={classes.noThreadsMessagePiece}>
                                <Link to="/weDontHaveAPostRouteYet">Post</Link> a need
                            </Typography>
                        </Box>
                    )}
                </Grid>
                <Grid item className={classes.sectionWrapper} xs={12} sm={7}>
                    {selectedTransaction && (
                        <Box className={classes.messagesWrapper}>
                            <Typography
                                variant="h5"
                                component="h5"
                                className={classes.sectionHeader}
                            >
                                Re: {selectedTransaction.asset.title}
                            </Typography>
                            {messages?.map(m => (
                                <MessageCard
                                    message={m}
                                    isCurrentUser={m.user.id === user?.id}
                                />
                            ))}
                        </Box>
                    )}
                    <Box className={classes.messageInputWrapper}>
                        <form
                            onSubmit={handleSendMessage}
                            className={classes.messageInputForm}
                        >
                            <TextField
                                className={classes.messageInput}
                                label="Enter your message here."
                                variant="outlined"
                            />
                            <IconButton
                                aria-label="send message"
                                type="submit"
                            >
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
