import { createAction, props } from '@ngrx/store';
import { Todo } from './todo.models';

export const actionTodoAdd = createAction(
    '[Todo] Add',
    props<{ label: string }>()
);

export const actionTodoSet = createAction(
    '[Todo] Set',
    props<{ id: string; label: string; done: boolean }>()
);

export const actionTodoDelete = createAction(
    '[Todo] Delete',
    props<{ id: string }>()
);

export const actionGetTodoList = createAction(
    '[Todo] Get List'
);

export const actionSetTodoList = createAction(
    '[Todo] Set Todo List',
    props<{ todolist: Array<Todo> }>()
);

export const actionSetTodoCount = createAction(
    '[Todo] Set Todo Count',
    props<{ count: number }>()
);
