import { createAction, props } from '@ngrx/store';
import { Tokens, User } from './auth.models';

export const authLogin = createAction('[Auth] Login');
export const authLogout = createAction('[Auth] Logout');

export const actionAuthSetTokens = createAction(
    '[Auth] Set Tokens',
    props<{ tokens?: Tokens }>()
);

export const actionAuthSetUser = createAction(
    '[Auth] Set User',
    props<{ user?: User }>()
);
