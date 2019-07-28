import { Action,AnyAction, Dispatch } from 'redux';
import client, {UserInfo} from '9-remote/client';

const GET   = 'pw-transfer/userinfor/GET';
const GET_SUCCESS = 'pw-transfer/userinfor/GET_SUCCESS';
const GET_FAILURE = 'pw-transfer/userinfor/GET_FAILURE';
const CLEAR = 'pw-transfer/userinfor/CLEAR';

export type UserInfoState = UserInfo | null;
interface UserInfoAction extends Action<string> {
  payload?: UserInfo
}

// Reducer
export default function reducer(state: UserInfoState = null, action: UserInfoAction ): UserInfoState {
  switch (action.type) {
    case GET:
      return state
    case GET_SUCCESS:
      return action.payload || null
    case GET_FAILURE:
      return state
    case CLEAR:
      return null
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
export function getUserInfo () {
  return (dispatch: Dispatch) => {
    dispatch(requestUserInfo())
    return client.getLoggedUserInfo()
      .then((result:UserInfo) => dispatch(requestUserInfoSuccess(result)))
      .catch((error:any) => {
        // todo error to messages
        dispatch(requestUserInfoFailure(error))
      })
  }
}
