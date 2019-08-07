import { batchActions } from 'redux-batched-actions';
import { ofType } from 'redux-observable';
import { switchMap, catchError, map } from 'rxjs/operators';
import { of, from } from 'rxjs';

import { RegisterUserInput, LoginInput } from '8-remote/client/index';
import { requestUserInfo, resetUserInfo } from './userinfo';
import { requestHistory, resetHistory } from './history';
import { resetRecipients } from './recipients';
import { resetTransaction } from './transaction';
import { ActionP, AppEpic } from '../types';

const REGISTER = 'pw-transfer/auth/REGISTER';
const REGISTER_SUCCESS = 'pw-transfer/auth/REGISTER_SUCCESS';
const REGISTER_FAILURE = 'pw-transfer/auth/REGISTER_FAILURE';
const LOGIN = 'pw-transfer/auth/LOGIN';
const LOGIN_SUCCESS = 'pw-transfer/auth/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'pw-transfer/auth/LOGIN_FAILURE';
const LOGOUT = 'pw-transfer/auth/LOGOUT';

export interface AuthState {
  logged: boolean;
  errorMessage: string | null;
}

const initState: AuthState = {
  logged: false,
  errorMessage: null
};

export default function reducer(
  state: AuthState = initState,
  action: ActionP
): AuthState {
  switch (action.type) {
    case REGISTER:
    case LOGIN:
      return {
        ...state,
        logged: false,
        errorMessage: null
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        logged: true
      };
    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
      return {
        ...state,
        logged: false,
        errorMessage: action.payload
      };
    case LOGOUT:
      return initState;
    default:
      return state;
  }
}

// Action Creators
export const requestRegister = (input: RegisterUserInput) => ({
  type: REGISTER,
  payload: input
});
const requestRegisterSuccess = () => ({ type: REGISTER_SUCCESS });
const requestRegisterFailure = (error: any) => ({
  type: REGISTER_FAILURE,
  payload: error.message
});

export const requestLogin = (input: LoginInput) => ({
  type: LOGIN,
  payload: input
});
const requestLoginSuccess = () => ({ type: LOGIN_SUCCESS });
const requestLoginFailure = (error: any) => ({
  type: LOGIN_FAILURE,
  payload: error.message
});

export const requestLogout = () => ({ type: LOGOUT });

// Side Effects
export const registerEpic: AppEpic = (action$, state$, { client }) =>
  action$.pipe(
    ofType(REGISTER),
    switchMap(({ payload }) =>
      from(client.register(payload)).pipe(
        map(() =>
          batchActions([
            requestRegisterSuccess(),
            requestUserInfo(),
            requestHistory()
          ])
        ),
        catchError(error => of(requestRegisterFailure(error)))
      )
    )
  );

export const loginEpic: AppEpic = (action$, state$, { client }) =>
  action$.pipe(
    ofType(LOGIN),
    switchMap(({ payload }) =>
      from(client.login(payload)).pipe(
        map(() =>
          batchActions([
            requestLoginSuccess(),
            requestUserInfo(),
            requestHistory()
          ])
        ),
        catchError(error => of(requestLoginFailure(error)))
      )
    )
  );

export const logoutEpic: AppEpic = (action$, state$, { client }) =>
  action$.pipe(
    ofType(LOGIN),
    switchMap(() =>
      from(client.logout()).pipe(
        map(() =>
          batchActions([
            resetUserInfo(),
            resetHistory(),
            resetTransaction(),
            resetRecipients()
          ])
        )
      )
    )
  );
