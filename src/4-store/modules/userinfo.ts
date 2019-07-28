import { AnyAction, Dispatch } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import client, {UserInfo} from '9-remote/client';

const GET   = 'pw-transfer/userinfor/GET';
const GET_SUCCESS = 'pw-transfer/userinfor/GET_SUCCESS';
const GET_FAILURE = 'pw-transfer/userinfor/GET_FAILURE';
const CLEAR = 'pw-transfer/userinfor/CLEAR';

export type UserInfoState = UserInfo;
const initState: UserInfoState = {
  id: -1,
  name: '',
  email: '',
  balance: -1,
}
// Reducer
export default function reducer(state: UserInfoState = initState, action: AnyAction ): UserInfoState {
  switch (action.type) {
    case GET:
      return state
    case GET_SUCCESS:
      return action.payload
    case GET_FAILURE:
      return state
    case CLEAR:
      return initState
    default: 
      return state;
  }
}

// Action Creators
const requestUserInfo = () => ({ type: GET });
const requestUserInfoSuccess = (payload: UserInfo) => ({ type: GET_SUCCESS, payload });
const requestUserInfoFailure = (payload: any) => ({ type: GET_FAILURE, payload });
export const clearUserInfo = () => ({ type: CLEAR });

// Side Effects
export function getUserInfo (): ThunkAction<Promise<void>, {}, {}, AnyAction> {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(requestUserInfo())
    return client.getLoggedUserInfo()
      .then((result:UserInfo) => {
        dispatch(requestUserInfoSuccess(result))
      })
      .catch((error:any) => {
        // todo error to messages
        dispatch(requestUserInfoFailure(error))
      })
  }
}
