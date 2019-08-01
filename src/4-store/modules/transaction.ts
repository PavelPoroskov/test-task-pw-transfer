import { AnyAction } from 'redux';
import { ofType } from "redux-observable"
import { switchMap, mergeMap, catchError } from "rxjs/operators";
import { of, from  } from "rxjs";

import {CreateTransactionInput} from '8-remote/client';
import { requestUserInfo} from './userinfo'
import { AppEpic } from "../types"

const NEW = 'pw-transfer/transaction/NEW';
const COPY = 'pw-transfer/transaction/COPY';
const COMMIT   = 'pw-transfer/transaction/COMMIT';
const COMMIT_SUCCESS = 'pw-transfer/transaction/COMMIT_SUCCESS';
const COMMIT_FAILURE = 'pw-transfer/transaction/COMMIT_FAILURE';
const CANCEL = 'pw-transfer/transaction/CANCEL';

const CHOICE_HISTORY = 'pw-transfer/transaction/CHOICE_HISTORY';

export interface TransactionState {
  showHistory: boolean,
  editing: boolean;
  //saving: boolean;
  name: string,
  amount: number,
  errorMessage: string | null;
};

const initState: TransactionState = {
  showHistory: false,
  editing: false,
  name: '',
  amount: 0,
  errorMessage: null,
}
// Reducer
export default function reducer(state: TransactionState = initState, action: AnyAction ): TransactionState {
  switch (action.type) {
    case NEW:
      return {
        ...initState,
        editing: true,
        showHistory: false,
      }
    case COPY:
      return {
        errorMessage: null,
        name: action.payload.name,
        // initAmount: `${action.payload.amount || ''}`,
        amount: action.payload.amount,
        editing: true,
        showHistory: false,
      }
    case CANCEL:
      return initState
    // case COMMIT:
    //   return initState
    case COMMIT_SUCCESS:
      return initState
    case COMMIT_FAILURE:
      return {
        ...state,
        errorMessage: action.payload
      }
    case CHOICE_HISTORY:
      return {
        ...initState,
        showHistory: action.payload,
      }
    default: 
      return state;
  }
}

// Action Creators
export const newTransaction = () => ({ type: NEW });
export const copyTransaction = (payload?: CreateTransactionInput) => ({ type: COPY, payload });
export const cancelTransaction = () => ({ type: CANCEL });
export const requestCommit = (input: CreateTransactionInput) => ({ type: COMMIT, payload: input });
const requestCommitSuccess = () => ({ type: COMMIT_SUCCESS });
const requestCommitFailure = (error: any) => ({ type: COMMIT_FAILURE, payload: error.message });

export const choiceHistory = (showHistory: boolean) => ({ type: CHOICE_HISTORY, payload: showHistory });

// Side Effects
export const commitEpic: AppEpic = (action$, state$, {client}) => action$.pipe(
  ofType(COMMIT),
  switchMap(({payload}) =>
    from(client.createTransaction(payload)).pipe(
      mergeMap(response => of(
        requestCommitSuccess(),
        requestUserInfo()
      )),
      catchError(error => of(requestCommitFailure(error)))
    )
  )
);
