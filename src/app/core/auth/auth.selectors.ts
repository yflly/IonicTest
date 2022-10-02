import { createSelector } from '@ngrx/store';

import { selectAuthState } from '../core.state';
import { AuthState } from './auth.models';

export const selectAuth = createSelector(
  selectAuthState,
  (state: AuthState) => state
);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => state.isAuthenticated
);


export const selectTokens = createSelector(
  selectAuthState,
  (state: AuthState) => state.tokens
);

export const selectUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.user
);
