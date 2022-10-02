import { createSelector } from '@ngrx/store';

import { selectTodoState } from '../core.state';
import { TodoState } from './todo.models';

export const selectTodo = createSelector(
  selectTodoState,
  (state: TodoState) => state
);

export const selectTodoList = createSelector(
  selectTodoState,
  (state: TodoState) => state.todolist
);

export const selectTodoCount = createSelector(
  selectTodoState,
  (state: TodoState) => state.count
);

