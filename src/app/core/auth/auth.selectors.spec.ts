import { selectAuth, selectIsAuthenticated, selectTokens, selectUser } from './auth.selectors';

describe('Auth Selectors', () => {
  it('selectAuth', () => {
    const state = createAuthState();
    expect(selectAuth(state)).toBe(state.auth);
  });

  it('selectIsAuthenticated', () => {
    const state = createAuthState();
    expect(selectIsAuthenticated(state)).toBe(false);
  });

  it('selectTokens', () => {
    const state = createAuthState();
    expect(selectTokens(state)).toBe(undefined);
  });

  it('selectUser', () => {
    const state = createAuthState();
    expect(selectUser(state)).toBe(undefined);
  });
});

const createAuthState = () => ({
    auth: {
      isAuthenticated: false,
      tokens: undefined,
      user: undefined
    },
    todo: {} as any,
    router: {} as any
  });
