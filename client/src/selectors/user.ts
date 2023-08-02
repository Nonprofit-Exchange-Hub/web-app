import { createSelector } from '@reduxjs/toolkit';

import { StoreUser } from '../types';

export const selectUser = (state: { user: StoreUser }) => state.user;

export const selectUserId = createSelector(selectUser, (user) => user.id);

export const selectUserIsLoading = createSelector(selectUser, (user) => user.isLoading);
