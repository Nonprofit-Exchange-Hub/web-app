import React from 'react';
import { Message } from '../types';
import MessageCard from '../components/Users/Inbox/MessageCard';

function Messages({ socket, messages, transaction, user }: any) {
  const formatDate = (date: string): string => {
    return new Date(date).toLocaleString('en-US');
  };

  return (
    <div className="message-list">
      {messages.map((message: Message) => {
        const sendingOrg = [transaction.donater_organization, transaction.claimer].find(
          (org) => org && org.id === message.sendingOrgId,
        );
        const userOrg =
          user &&
          user.organizations[0] &&
          user.organizations[0].organization &&
          user.organizations[0].organization.id;

        let sendingUser = null;
        if (transaction.donater_user && transaction.donater_user.id === message.sendingUserId) {
          sendingUser = transaction.donater_user;
        }
        const senderName = sendingOrg ? sendingOrg.name : sendingUser && sendingUser.firstName;
        const isCurrentUser =
          message.sendingUserId === user.id || (userOrg && userOrg === message.sendingOrgId);

        return (
          <MessageCard
            senderName={senderName}
            text={message.text}
            dateString={formatDate(message.created_date)}
            isCurrentUser={isCurrentUser}
          />
        );
      })}
    </div>
  );
}

export default Messages;
