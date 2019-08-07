import { batchActions } from 'redux-batched-actions';
import { ofType } from 'redux-observable';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of, from } from 'rxjs';

import { CreateTransactionInput } from '8-remote/client';
import { requestUserInfo } from './userinfo';
import { requestHistory } from './history';
import { ActionP, AppEpic } from '../types';

const COMMIT = 'pw-transfer/transaction/COMMIT';
const COMMIT_SUCCESS = 'pw-transfer/transaction/COMMIT_SUCCESS';
const COMMIT_FAILURE = 'pw-transfer/transaction/COMMIT_FAILURE';
const RESET = 'pw-transfer/transaction/RESET';

export interface TransactionState {
  errorMessage: string | null;
}

const initState: TransactionState = {
  errorMessage: null
};

// Reducer
export default function reducer(
  state: TransactionState = initState,
  action: ActionP
): TransactionState {
  switch (action.type) {
    case COMMIT:
      return initState;
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
export const resetTransaction = () => ({ type: RESET });
export const requestCommit = (props: {
  input: CreateTransactionInput;
  history: any;
}) => ({
  type: COMMIT,
  payload: props
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
      from(client.createTransaction(payload.input)).pipe(
        map(() => {
          payload.history.goBack();
          return batchActions([
            requestCommitSuccess(),
            requestUserInfo(),
            requestHistory()
          ]);
        }),
        catchError(error => of(requestCommitFailure(error)))
      )
    )
  );
