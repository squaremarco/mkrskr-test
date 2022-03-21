import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

export const getUsername = createSelector(
  (state: RootState) => state.user,
  (user) => user.username
);

export const getUserId = createSelector(
  (state: RootState) => state.user,
  (user) => user.sub
);
