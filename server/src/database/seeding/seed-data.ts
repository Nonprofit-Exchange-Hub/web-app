import { CreateUserDto } from '../../users/dto/create-user.dto';

export const seedUsers = (): CreateUserDto[] => {
  const users: CreateUserDto[] = [
    {
      firstName: 'user1First',
      last_name: 'user1Last',
      email: 'user1First@example.com',
      password: 'Secret1234%',
    },
    {
      firstName: 'user2First',
      last_name: 'user2Last',
      email: 'user2First@example.com',
      password: 'Secret1234%',
    },
  ];
  return users;
};
