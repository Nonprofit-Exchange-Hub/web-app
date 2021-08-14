import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import TodayOutlined from '@material-ui/icons/TodayOutlined';
// import RoomOutlined from '@material-ui/icons/RoomOutlined';
import { Redirect } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

import type { Theme } from '@material-ui/core/styles';

import { SubHeader } from './components';
import { UserContext } from './providers';

import type { Asset, User } from './types';


const useStyles = makeStyles((theme: Theme) => ({
    inboxWrapper: {
        maxWidth: '90%',
        margin: 'auto',
    },
    box: {
        border: '1px solid black',
        borderRadius: '10px',
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

function TransactionThreadCard({ transaction }: { transaction: Transaction }): JSX.Element {
    return (
        <>
            Re: {transaction.asset.title}
        </>
    );
}

function MessageCard({ isCurrentUser, message }: { isCurrentUser: boolean, message: Message }): JSX.Element {
    return (
        <div style={{ backgroundColor: isCurrentUser ? 'red' : 'blue' }}>
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
            <Paper className={classes.inboxWrapper}>
                <Grid container>
                    <Grid item className={classes.box} xs={12} sm={4}>
                        <Typography>Inbox</Typography>
                        {transactions.map(t => (
                            <TransactionThreadCard transaction={t} />
                        ))}
                    </Grid>
                    <Grid item className={classes.box} xs={12} sm={8}>
                        {selectedTransaction ? (
                            <>
                                <Typography>Re: {selectedTransaction.asset.title}</Typography>
                                {messages?.map(m => (
                                    <MessageCard
                                        message={m}
                                        isCurrentUser={m.user.id === user.id}
                                    />
                                ))}
                            </>
                        ) : (
                            <>hi</>
                        )}
                        <input placeholder="new message" />
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
}

export default MessageInboxView;
