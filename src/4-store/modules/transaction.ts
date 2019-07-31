import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk'

import client, {CreateTransactionInput} from '8-remote/client';
import { getUserInfo} from './userinfo'

const NEW = 'pw-transfer/transaction/NEW';
const COMMIT   = 'pw-transfer/transaction/COMMIT';
const COMMIT_SUCCESS = 'pw-transfer/transaction/COMMIT_SUCCESS';
const COMMIT_FAILURE = 'pw-transfer/transaction/COMMIT_FAILURE';
const CANCEL = 'pw-transfer/transaction/CANCEL';

export interface TransactionState extends CreateTransactionInput {
  editing: boolean;
  //saving: boolean;
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
      })
      .catch((error:any) => {
        // todo error to messages
        dispatch(requestCommitFailure())
      })
  }
}
