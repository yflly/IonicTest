export class Todo {
  id: string;
  label: string;
  done: boolean;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  user: string;
}

export class Todos {
  rows: Array<Todo>;
  count: number;
}

export interface TodoState {
  todolist: Array<Todo>;
  count: number;
}
