import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import client, { RegisterUserInput, LoginInput } from '8-remote/client/index'
import { getUserInfo, clearUserInfo } from './userinfo'
import { getHistory, clearHistory } from './history'

const REGISTER = 'pw-transfer/auth/REGISTER';
const REGISTER_SUCCESS = 'pw-transfer/auth/REGISTER_SUCCESS';
const REGISTER_FAILURE = 'pw-transfer/auth/REGISTER_FAILURE';
const LOGIN = 'pw-transfer/auth/LOGIN';
const LOGIN_SUCCESS = 'pw-transfer/auth/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'pw-transfer/auth/LOGIN_FAILURE';
const LOGOUT = 'pw-transfer/auth/LOGOUT';
const CHOICE_HAVE_ACCOUNT = 'pw-transfer/auth/CHOICE_HAVE_ACCOUNT';

export interface AuthSate {
  logged: boolean;
  haveAccount: boolean;
};

const initState: AuthSate = {
  logged: false,
  haveAccount: true,
}
// Reducer
export default function reducer(state: AuthSate = initState, action: AnyAction): AuthSate {
  switch (action.type) {
    case CHOICE_HAVE_ACCOUNT:
      return {
        ...state,
        haveAccount: action.payload,
      }
    case REGISTER:
    case LOGIN:
      return {
        ...state,
        logged: false,
      }
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        logged: true,
      }
    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
      return {
        ...state,
        logged: false,
      }
    case LOGOUT:
      return {
        ...state,
        logged: false,
      }
    default:
      return state;
  }
}

// Action Creators
export const choiceHaveAccount = (payload: boolean) => ({ type: CHOICE_HAVE_ACCOUNT, payload });
const requestRegister = () => ({ type: REGISTER });
const requestRegisterSuccess = () => ({ type: REGISTER_SUCCESS });
const requestRegisterFailure = () => ({ type: REGISTER_FAILURE });

const requestLogin = () => ({ type: LOGIN });
const requestLoginSuccess = () => ({ type: LOGIN_SUCCESS });
const requestLoginFailure = () => ({ type: LOGIN_FAILURE });

export const requestLogout = () => ({ type: LOGOUT });

// Side Effects
export function register(input: RegisterUserInput): ThunkAction<Promise<void>, {}, {}, AnyAction> {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(requestRegister())
    return client.register(input)
      .then(() => {
        
        dispatch(getUserInfo());
        dispatch(getHistory());
        dispatch(requestRegisterSuccess())
      })
      .catch((error: any) => {
        // // todo: add error to messages
        // console.log('register error');
        // console.log(error);
        dispatch(requestRegisterFailure())
      })
  }
}
export function login(input: LoginInput): ThunkAction<Promise<void>, {}, {}, AnyAction> {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(requestLogin())
    return client.login(input)
      .then(() => {
        dispatch(getUserInfo());
        dispatch(getHistory());
        dispatch(requestLoginSuccess());
      })
      .catch((error: any) => {
        // todo: add error to messages
        dispatch(requestLoginFailure())
      })
  }
}
export function logout(): ThunkAction<Promise<void>, {}, {}, AnyAction> {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(clearUserInfo());
    dispatch(clearHistory());
    dispatch(requestLogout());
    return client.logout();
  }
}
