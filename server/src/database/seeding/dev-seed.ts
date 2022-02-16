import { User } from 'src/users/entities/user.entity';

export const users = (): User[] => {
  const users: User[] = [
    {
      id: 1,
      first_name: 'user1First',
      last_name: 'user2Last',
      email: 'user1First@example.com',
      password: 'Secret1234%',
      assets: [],
      transactions: [],
      messages: [],
      organizations: [],
    },
  ];
  return users;
};
