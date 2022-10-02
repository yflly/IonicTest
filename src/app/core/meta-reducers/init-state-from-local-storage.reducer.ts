import { ActionReducer, INIT, UPDATE } from '@ngrx/store';

import { AppState } from '../core.state';

export const initState = (
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> => (state, action) => {
    const newState = reducer(state, action);
    if ([INIT.toString(), UPDATE.toString()].includes(action.type)) {
      return { ...newState, ...{} };
    }
    return newState;
  };
