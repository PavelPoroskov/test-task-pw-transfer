import { ofType } from "redux-observable"
import { switchMap, map, catchError } from "rxjs/operators";
import { of, from  } from "rxjs";

import {Transaction} from '8-remote/client';
import { ActionP, AppEpic } from "../types"

const GET   = 'pw-transfer/history/GET';
const GET_SUCCESS = 'pw-transfer/history/GET_SUCCESS';
const GET_FAILURE = 'pw-transfer/history/GET_FAILURE';
const RESET = 'pw-transfer/history/RESET';

export interface HistoryState {
  list: Transaction[];
  filter: {
    user?: string;
  }
}
const initState: HistoryState = {
  list: [],
  filter: {}
}
// Reducer
export default function reducer(state: HistoryState = initState, action: ActionP ): HistoryState {
  switch (action.type) {
    case GET:
      return state
    case GET_SUCCESS:
      return {
        ...state,
        list: action.payload
      }
    case GET_FAILURE:
      return state
    case RESET:
      return initState
    default: 
      return state;
  }
}

// Action Creators
export const requestHistory = () => ({ type: GET });
const requestHistorySuccess = (payload: Transaction[]) => ({ type: GET_SUCCESS, payload });
const requestHistoryFailure = (payload: any) => ({ type: GET_FAILURE, payload });
export const resetHistory = () => ({ type: RESET });

export const historyEpic: AppEpic = (action$, state$, {client}) => action$.pipe(
  ofType(GET),
  switchMap(({payload}) =>
    from(client.getLoggedUserTransactions()).pipe(
      map(response => requestHistorySuccess(response)),
      catchError(error => of(requestHistoryFailure(error)))
    )
  )
);
