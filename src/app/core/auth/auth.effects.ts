import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ofType, createEffect, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { actionAuthSetTokens, actionAuthSetUser, authLogin, authLogout } from './auth.actions';
import { AuthState, User } from './auth.models';

@Injectable()
export class AuthEffects implements OnDestroy {

  public tokens = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionAuthSetTokens),
        filter((action) => action.tokens !== undefined),
        tap((action) => {
          this.data.getUser(action.tokens.accessToken)
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((user: User) => {
            this.store.dispatch(actionAuthSetUser({user}));
            this.store.dispatch(authLogin());
          });
        })
      ),
    { dispatch: false }
  );

  public login = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authLogin),
        tap(() => {
         this.router.navigate(['todo-list']);
        })
      ),
    { dispatch: false }
  );

  public logout = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authLogout),
        tap(() => {
          this.store.dispatch(actionAuthSetUser({user: undefined}));
          this.store.dispatch(actionAuthSetTokens({tokens: undefined}));
          this.router.navigate(['']);
        })
      ),
    { dispatch: false }
  );

  private readonly ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private actions$: Actions,
    private router: Router,
    private data: DataService,
    private store: Store<AuthState>
  ) {}

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
