import { actionAuthSetTokens, actionAuthSetUser, authLogin, authLogout } from './auth.actions';
import { Tokens, User } from './auth.models';

describe('Auth Actions', () => {
  it('should create ActionAuthLogin action', () => {
    const action = authLogin();
    expect(action.type).toEqual('[Auth] Login');
  });

  it('should create ActionAuthLogout action', () => {
    const action = authLogout();
    expect(action.type).toEqual('[Auth] Logout');
  });

  it('should create ActionAuthSetTokens action', () => {
    const tokens = new Tokens();
    tokens.accessToken = '1';
    tokens.refreshToken = '2';
    const action = actionAuthSetTokens({tokens});
    expect(action.type).toEqual('[Auth] Set Tokens');
    expect(action.tokens).toEqual(tokens);
  });

  it('should create ActionAuthSetUser action', () => {
    const user = new User();
    user.id = '1';
    user.email = 'user@email.com';
    user.firstname = 'firstname';
    user.lastname = 'lastname';
    user.username = 'username';
    user.updatedAt = Date.now().toString();
    const action = actionAuthSetUser({user});
    expect(action.type).toEqual('[Auth] Set User');
    expect(action.user).toEqual(user);
  });
});
