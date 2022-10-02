import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { AppState } from '../core.state';

import { AuthGuardService } from './auth-guard.service';
import { AuthState } from './auth.models';
import { selectIsAuthenticated } from './auth.selectors';

describe('AuthGuardService', () => {
  let authGuardService: AuthGuardService;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardService, provideMockStore()]
    });
    authGuardService = TestBed.inject<AuthGuardService>(AuthGuardService);
    store = TestBed.inject(MockStore);
    store.overrideSelector(selectIsAuthenticated, true);
  });

  it('should be created', () => {
    expect(authGuardService).toBeTruthy();
  });

  it('should return isAuthenticated from authState', () => {
    authGuardService.canActivate().subscribe((canActivate) => {
      expect(canActivate).toBe(true);
    });
  });
});

const createState = (authState: AuthState) => ({
    auth: authState
  } as AppState);


