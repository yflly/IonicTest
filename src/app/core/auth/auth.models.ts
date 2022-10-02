export class Account {
  username: string;
  password: string;
}

export class User {
  id: string;
  username: string;
  email: string;
  firstname: string;
  lastname: string;

  avatar?: any;
  createdAt?: string;
  updatedAt?: string;
}

export class Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  tokens?: Tokens;
  user?: User;
}
