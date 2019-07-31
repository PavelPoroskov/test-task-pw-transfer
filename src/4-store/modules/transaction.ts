import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk'

import client, {CreateTransactionInput} from '8-remote/client';
import { getUserInfo} from './userinfo'
import { getHistory} from './history'

const NEW = 'pw-transfer/transaction/NEW';
const COPY = 'pw-transfer/transaction/COPY';
const COMMIT   = 'pw-transfer/transaction/COMMIT';
const COMMIT_SUCCESS = 'pw-transfer/transaction/COMMIT_SUCCESS';
const COMMIT_FAILURE = 'pw-transfer/transaction/COMMIT_FAILURE';
const CANCEL = 'pw-transfer/transaction/CANCEL';

export interface TransactionState {
  editing: boolean;
  //saving: boolean;
  name: string,
  amount: number,
};

const initState: TransactionState = {
  editing: false,
  name: '',
  amount: 0,
}
// Reducer
export default function reducer(state: TransactionState = initState, action: AnyAction ): TransactionState {
  switch (action.type) {
    case NEW:
      return {
        ...initState,
        editing: true,
      }
    case COPY:
      return {
        name: action.payload.name,
        // initAmount: `${action.payload.amount || ''}`,
        amount: action.payload.amount,
        editing: true,
      }
    case CANCEL:
      return initState
    // case COMMIT:
    //   return initState
    case COMMIT_SUCCESS:
      return initState
    case COMMIT_FAILURE:
      return state
    default: 
      return state;
  }
}

// Action Creators
export const newTransaction = () => ({ type: NEW });
export const copyTransaction = (payload?: CreateTransactionInput) => ({ type: COPY, payload });
export const cancelTransaction = () => ({ type: CANCEL });
const requestCommit = () => ({ type: COMMIT });
const requestCommitSuccess = () => ({ type: COMMIT_SUCCESS });
const requestCommitFailure = () => ({ type: COMMIT_FAILURE });

// Side Effects
export function commit (input: CreateTransactionInput): ThunkAction<Promise<void>, {}, {}, AnyAction> {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(requestCommit())
    return client.createTransaction(input)
      .then(() => {
        dispatch(requestCommitSuccess());
        dispatch(getUserInfo());
        dispatch(getHistory());
      })
      .catch((error:any) => {
        // todo error to messages
        dispatch(requestCommitFailure())
      })
  }
}
