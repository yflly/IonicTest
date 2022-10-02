import { authReducer, initialState } from './auth.reducer';
import { AuthState, Tokens, User } from './auth.models';
import { actionAuthSetTokens, actionAuthSetUser, authLogin, authLogout } from './auth.actions';

describe('AuthReducer', () => {
  const TEST_INITIAL_STATE: AuthState = {
    isAuthenticated: false
  };

  it('should return default state', () => {
    const action = {} as any;
    const state = authReducer(undefined, action);

    expect(state).toBe(initialState);
  });

  it('should set authentication to true on login', () => {
    const action = authLogin();
    const state = authReducer(TEST_INITIAL_STATE, action);

    expect(state.isAuthenticated).toBe(true);
    expect(state.user).toBeDefined();
    expect(state.tokens).toBeDefined();
  });

  it('should set authentication to false on logout', () => {
    const action = authLogout();
    const state = authReducer(TEST_INITIAL_STATE, action);

    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBe(undefined);
    expect(state.tokens).toBe(undefined);
  });

  it('should set tokens', () => {
    const tokens = new Tokens();
    tokens.accessToken = '1';
    tokens.refreshToken = '2';
    const action = actionAuthSetTokens({tokens});
    const state = authReducer(TEST_INITIAL_STATE, action);

    expect(state.tokens).toEqual(tokens);
    expect(state.user).toBeDefined();
  });

  it('should set set user', () => {
    const user = new User();
    user.id = '1';
    user.email = 'user@email.com';
    user.firstname = 'firstname';
    user.lastname = 'lastname';
    user.username = 'username';
    user.updatedAt = Date.now().toString();
    const action = actionAuthSetUser({user});
    const state = authReducer(TEST_INITIAL_STATE, action);

    expect(state.user).toEqual(user);
  });
});
