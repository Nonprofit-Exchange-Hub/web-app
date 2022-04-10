import * as React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import PermIdentityRoundedIcon from '@material-ui/icons/PermIdentityRounded';

import type { Theme } from '@material-ui/core/styles';

import type { Transaction, User } from '../../../types';

const useStyles = makeStyles((theme: Theme) => ({
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
  threadsSection: {
    marginRight: '20px',
  },
  threadCardTitle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}));

function TransactionThreadCard({
  isSelected,
  onClick,
  transaction,
  user,
}: {
  isSelected: boolean;
  onClick: (transaction: Transaction) => void;
  transaction: Transaction;
  user?: User;
}): JSX.Element {
  const classes = useStyles();
  const otherUser =
    user?.id === transaction.asset.poster.id
      ? transaction.recipient.name
      : transaction.asset.poster.firstName;

  return (
    <Card
      className={isSelected ? classes.threadCardSelected : classes.threadCard}
      onClick={() => onClick(transaction)}
      variant={isSelected ? 'outlined' : undefined}
    >
      <CardContent className={classes.threadCardContent}>
        <Box className={classes.threadCardTitle}>
          <Typography variant="h6" component="h6">
            {otherUser}
          </Typography>
          <PermIdentityRoundedIcon />
        </Box>
        <Typography>Re: {transaction.asset.title}</Typography>
      </CardContent>
    </Card>
  );
}

export default TransactionThreadCard;
