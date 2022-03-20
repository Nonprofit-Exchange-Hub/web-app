import { Message } from '../../src/messages/entities/message.entity';
import { User } from '../../src/users/entities/user.entity';

export const messageStub = (): Message => {
  return {
    id: 1,
    text: 'fakeMessage',
    created_date: new Date(2021, 11, 6),
    user: new User(),
    transaction_id: 1234,
  };
};
