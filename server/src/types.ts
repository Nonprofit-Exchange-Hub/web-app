import type { Request as RequestT } from 'express';

import type { User } from './users/entities/user.entity';

export type AuthedRequest = RequestT & { user: Omit<User, 'password'> };
