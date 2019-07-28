import { Action, Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { getUserInfo, clearUserInfo } from './userinfo'
import client, { RegisterUserInput, LoginInput } from '9-remote/client'

const REGISTER = 'pw-transfer/auth/REGISTER';
const REGISTER_SUCCESS = 'pw-transfer/auth/REGISTER_SUCCESS';
const REGISTER_FAILURE = 'pw-transfer/auth/REGISTER_FAILURE';
const LOGIN = 'pw-transfer/auth/LOGIN';
const LOGIN_SUCCESS = 'pw-transfer/auth/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'pw-transfer/auth/LOGIN_FAILURE';
const LOGOUT = 'pw-transfer/auth/LOGOUT';

export interface AuthSate {
  logged: boolean;
};

// Reducer
export default function reducer(state: AuthSate = { logged: false }, action: Action<string>): AuthSate {
  switch (action.type) {
    case REGISTER:
    case LOGIN:
      return {
        logged: false,
      }
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        logged: true,
      }
    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
      return {
        logged: false,
      }
    case LOGOUT:
      return {
        logged: false,
      }
    default:
      return state;
  }
}

// Action Creators
const requestRegister = () => ({ type: REGISTER });
const requestRegisterSuccess = () => ({ type: REGISTER_SUCCESS });
const requestRegisterFailure = () => ({ type: REGISTER_FAILURE });

const requestLogin = () => ({ type: LOGIN });
const requestLoginSuccess = () => ({ type: LOGIN_SUCCESS });
const requestLoginFailure = () => ({ type: LOGIN_FAILURE });

export const requestLogout = () => ({ type: LOGOUT });

// Side Effects
export function register(input: RegisterUserInput) {
  return (dispatch: Dispatch) => {
    dispatch(requestRegister())
    return client.register(input)
      .then(() => {
        // dispatch(getUserInfo());
        // dispatch(getTransactions());
        return dispatch(requestRegisterSuccess())
      })
      .catch((error: any) => {
        // todo: add error to messages
        dispatch(requestRegisterFailure())
      })
  }
}
export function login(input: LoginInput) {
  return (dispatch: Dispatch) => {
    dispatch(requestLogin())
    return client.login(input)
      .then(() => {
        // dispatch(getUserInfo());
        // dispatch(getTransactions());
        return dispatch(requestLoginSuccess());
      })
      .catch((error: any) => {
        // todo: add error to messages
        dispatch(requestLoginFailure())
      })
  }
}
export function logout() {
  return (dispatch: Dispatch) => {
    dispatch(requestLogout());
    return client.logout()
  }
}

// register
//  after: getTransaction & getUserInfo
// login
//  after: getTransaction & getUserInfo
