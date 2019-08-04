import { batchActions } from 'redux-batched-actions';
import { ofType } from 'redux-observable';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of, from } from 'rxjs';

import { CreateTransactionInput } from '8-remote/client';
import { requestUserInfo } from './userinfo';
import { requestHistory } from './history';
import { ActionP, AppEpic } from '../types';

const NEW = 'pw-transfer/transaction/NEW';
const COPY = 'pw-transfer/transaction/COPY';
const COMMIT = 'pw-transfer/transaction/COMMIT';
const COMMIT_SUCCESS = 'pw-transfer/transaction/COMMIT_SUCCESS';
const COMMIT_FAILURE = 'pw-transfer/transaction/COMMIT_FAILURE';
const RESET = 'pw-transfer/transaction/RESET';

export interface TransactionState {
  editing: boolean;
  name: string;
  amount: number;
  errorMessage: string | null;
}

const initState: TransactionState = {
  editing: false,
  name: '',
  amount: 0,
  errorMessage: null
};
// Reducer
export default function reducer(
  state: TransactionState = initState,
  action: ActionP
): TransactionState {
  switch (action.type) {
    case NEW:
      return {
        ...initState,
        editing: true
      };
    case COPY:
      return {
        errorMessage: null,
        name: action.payload.name,
        amount: action.payload.amount,
        editing: true
      };
    // case COMMIT:
    //   return initState
    case COMMIT_SUCCESS:
      return initState;
    case COMMIT_FAILURE:
      return {
        ...state,
        errorMessage: action.payload
      };
    case RESET:
      return initState;
    default:
      return state;
  }
}

// Action Creators
export const newTransaction = () => ({ type: NEW });
export const copyTransaction = (payload?: CreateTransactionInput) => ({
  type: COPY,
  payload
});
export const cancelTransaction = () => ({ type: RESET });
export const resetTransaction = () => ({ type: RESET });
export const requestCommit = (input: CreateTransactionInput) => ({
  type: COMMIT,
  payload: input
});
const requestCommitSuccess = () => ({ type: COMMIT_SUCCESS });
const requestCommitFailure = (error: any) => ({
  type: COMMIT_FAILURE,
  payload: error.message
});

// Side Effects
export const commitTransactionEpic: AppEpic = (action$, state$, { client }) =>
  action$.pipe(
    ofType(COMMIT),
    switchMap(({ payload }) =>
      from(client.createTransaction(payload)).pipe(
        map(() => batchActions([
          requestCommitSuccess(),
          requestUserInfo(),
          requestHistory()
        ])),
        catchError(error => of(requestCommitFailure(error)))
      )
    )
  );
