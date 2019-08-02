import { switchMap, mergeMap, catchError } from "rxjs/operators";
import { of, from  } from "rxjs";
import { ofType } from "redux-observable"

import {UserInfo} from '8-remote/client';
import {requestHistory} from './history'
import { ActionP, AppEpic } from "../types"

const GET   = 'pw-transfer/userinfor/GET';
const GET_SUCCESS = 'pw-transfer/userinfor/GET_SUCCESS';
const GET_FAILURE = 'pw-transfer/userinfor/GET_FAILURE';
const RESET = 'pw-transfer/userinfor/RESET';

export type UserInfoState = UserInfo;
const initState: UserInfoState = {
  id: -1,
  name: '',
  email: '',
  balance: -1,
}
// Reducer
export default function reducer(state: UserInfoState = initState, action: ActionP ): UserInfoState {
  switch (action.type) {
    case GET:
      return state
    case GET_SUCCESS:
      return action.payload
    case GET_FAILURE:
      return state
    case RESET:
      return initState
    default: 
      return state;
  }
}

// Action Creators
export const requestUserInfo = () => ({ type: GET });
const requestUserInfoSuccess = (payload: UserInfo) => ({ type: GET_SUCCESS, payload });
const requestUserInfoFailure = (payload: any) => ({ type: GET_FAILURE, payload });
export const resetUserInfo = () => ({ type: RESET });

export const userInfoEpic: AppEpic = (action$, state$, {client}) => action$.pipe(
  ofType(GET),
  switchMap(({payload}) =>
    from(client.getLoggedUserInfo()).pipe(
      mergeMap(response => of(
        requestUserInfoSuccess(response), 
        requestHistory()
      )),
      catchError(error => of(requestUserInfoFailure(error)))
    )
  )
);
