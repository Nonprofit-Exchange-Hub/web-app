import * as React from 'react';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

import type { Transaction, User } from '../../../types';
import { ListItemButton } from '@mui/material';

function TransactionThreadCard({
  isSelected,
  onClick,
  transaction,
  user,
}: {
  isSelected: boolean;
  onClick: (transaction: Transaction) => void;
  transaction: Transaction;
  user?: User | null;
}): JSX.Element {
  const message = transaction.messages[0];
  const sendingOrg = [transaction.donater_organization, transaction.claimer].find(
    (org) => org && org.id === message.sendingOrgId,
  );
  const renderMessage = () => {
    if (message) {
      return (
        <React.Fragment>
          <Typography
            sx={{ display: 'inline' }}
            component="span"
            variant="body2"
            color="text.primary"
          >
            {(sendingOrg && sendingOrg.name) ||
              (message.sendingUserId === (user && user.id)
                ? ' Me: '
                : `${transaction.donater_user.firstName} ${transaction.donater_user.last_name}: `)}
          </Typography>
          {message.text}
        </React.Fragment>
      );
    }
  };
  const userOrg =
    user && user.organizations && user.organizations[0] && user.organizations[0].organization.id;
  const userIsClaimer = userOrg === transaction.claimer.id;
  const donaterIsOrg = !!transaction.donater_organization;

  let otherUser = '';
  if (userIsClaimer) {
    // other user is donater
    if (donaterIsOrg) {
      otherUser = transaction.donater_organization && transaction.donater_organization.name;
    } else {
      otherUser = transaction.donater_user && transaction.donater_user.firstName;
    }
  } else {
    // other user is claimer
    otherUser = transaction.claimer && transaction.claimer.name;
  }

  return (
    <>
      <ListItemButton
        alignItems="flex-start"
        selected={isSelected}
        onClick={() => onClick(transaction)}
      >
        <ListItemAvatar>
          {!sendingOrg && (
            <Avatar
              alt={transaction.donater_user.firstName}
              src={transaction.donater_user.profile_image_url}
            />
          )}
        </ListItemAvatar>
        <ListItemText
          primary={
            <>
              <Typography variant="subtitle1" style={{ display: 'inline-block' }}>
                {otherUser}
              </Typography>
              <Typography variant="subtitle2" style={{ display: 'inline-block' }}>
                `Re: ${transaction.asset.title}`
              </Typography>
            </>
          }
          secondary={renderMessage()}
        />
      </ListItemButton>
      <Divider variant="inset" component="li" />
    </>
  );
}

export default TransactionThreadCard;
