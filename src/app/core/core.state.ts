import {
  ActionReducerMap,
  MetaReducer,
  createFeatureSelector,
} from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

import { initState } from './meta-reducers/init-state-from-local-storage.reducer';
import { AuthState } from './auth/auth.models';
import { authReducer } from './auth/auth.reducer';
import { RouterStateUrl } from './router/router.state';
import { todoReducer } from './todo/todo.reducer';
import { TodoState } from './todo/todo.models';

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  todo: todoReducer,
  router: routerReducer,
};

export const metaReducers: MetaReducer<AppState>[] = [initState];

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectTodoState = createFeatureSelector<TodoState>('todo');

export const selectRouterState =
  createFeatureSelector<RouterReducerState<RouterStateUrl>>('router');

export interface AppState {
  auth: AuthState;
  todo: TodoState;
  router: RouterReducerState<RouterStateUrl>;
}
