import { TodoState } from './todo.models';
import { createReducer, on, Action } from '@ngrx/store';
import {
  actionGetTodoList,
  actionSetTodoCount,
  actionSetTodoList,
  actionTodoAdd,
} from './todo.actions';

export const initialState: TodoState = {
  todolist: [],
  count: 0,
};

const reducer = createReducer(
  initialState,
  on(
    actionSetTodoList,
    actionSetTodoCount,
    actionGetTodoList,
    actionTodoAdd,
    (state, action) => ({ ...state, ...action })
  )
);

export const todoReducer = (
  state: TodoState | undefined,
  action: Action
): TodoState => reducer(state, action);
