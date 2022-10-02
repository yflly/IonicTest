import { AuthState } from './auth.models';
import { actionAuthSetTokens, actionAuthSetUser, authLogin, authLogout } from './auth.actions';
import { createReducer, on, Action } from '@ngrx/store';

export const initialState: AuthState = {
  isAuthenticated: false,
  tokens: undefined,
  user: undefined,
};

const reducer = createReducer(
  initialState,
  on(authLogin, (state) => ({ ...state, isAuthenticated: true })),
  on(authLogout, (state) => ({ ...state, isAuthenticated: false })),

  on(
    actionAuthSetTokens,
    actionAuthSetUser,
    (state, action) => ({ ...state, ...action })
  ),
);

export const authReducer = (
  state: AuthState | undefined,
  action: Action
): AuthState => reducer(state, action);

