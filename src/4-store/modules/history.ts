import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import client, {Transaction} from '8-remote/client';

const GET   = 'pw-transfer/history/GET';
const GET_SUCCESS = 'pw-transfer/history/GET_SUCCESS';
const GET_FAILURE = 'pw-transfer/history/GET_FAILURE';
const CLEAR = 'pw-transfer/history/CLEAR';

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
export default function reducer(state: HistoryState = initState, action: AnyAction ): HistoryState {
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
    case CLEAR:
      return initState
    default: 
      return state;
  }
}

// Action Creators
const requestHistory = () => ({ type: GET });
const requestHistorySuccess = (payload: Transaction[]) => ({ type: GET_SUCCESS, payload });
const requestHistoryFailure = (payload: any) => ({ type: GET_FAILURE, payload });
export const clearHistory = () => ({ type: CLEAR });

// Side Effects
export function getHistory (): ThunkAction<Promise<void>, {}, {}, AnyAction> {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(requestHistory())
    return client.getLoggedUserTransactions()
      .then((result: Transaction[]) => {
        dispatch(requestHistorySuccess(result))
      })
      .catch((error:any) => {
        // todo error to messages
        dispatch(requestHistoryFailure(error))
      })
  }
}
