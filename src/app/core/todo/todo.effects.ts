import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ofType, createEffect, Actions } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { selectTokens } from '../auth/auth.selectors';
import { AppState } from '../core.state';
import { actionTodoAdd, actionGetTodoList, actionSetTodoCount, actionSetTodoList, actionTodoDelete, actionTodoSet } from './todo.actions';
import { Todos } from './todo.models';

@Injectable()
export class TodoEffects implements OnDestroy {

  public add = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionTodoAdd),
        withLatestFrom(this.store.pipe(select(selectTokens))),
        tap(([action, tokens]) => {
          this.data.addTodo(tokens.accessToken, action.label)
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe(() => {
            this.store.dispatch(actionGetTodoList());
          });
        })
      ),
    { dispatch: false }
  );

  public list = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionGetTodoList),
        withLatestFrom(this.store.pipe(select(selectTokens))),
        tap(([_action, tokens]) => {
         this.data.getTodoList(tokens.accessToken)
         .pipe(takeUntil(this.ngUnsubscribe))
         .subscribe((todos: Todos) => {
          this.store.dispatch(actionSetTodoCount({count: todos.count}));
          this.store.dispatch(actionSetTodoList({todolist: todos.rows}));
        });
        })
      ),
    { dispatch: false }
  );

  public delete = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionTodoDelete),
        withLatestFrom(this.store.pipe(select(selectTokens))),
        tap(([action, tokens]) => {
          this.data.deleteTodo(tokens.accessToken, action.id)
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe(() => {
            this.store.dispatch(actionGetTodoList());
          });
        })
      ),
    { dispatch: false }
  );

  public set = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionTodoSet),
        withLatestFrom(this.store.pipe(select(selectTokens))),
        tap(([action, tokens]) => {
          this.data.setTodo(tokens.accessToken, action.id, action.label, action.done)
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe(() => {
            this.store.dispatch(actionGetTodoList());
          });
        })
      ),
    { dispatch: false }
  );

  private readonly ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private actions$: Actions,
    private data: DataService,
    private store: Store<AppState>
  ) {}

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
