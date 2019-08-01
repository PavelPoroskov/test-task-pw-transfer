import { Action } from "redux";
import { Epic } from 'redux-observable';
import {ClientInteface} from '8-remote/client/index'
import {AuthState} from './modules/auth';
import {UserInfoState} from './modules/userinfo';
import {HistoryState} from './modules/history';
import {TransactionState} from './modules/transaction';
import {RecipientsState} from './modules/recipients';

export interface RootState {
  auth: AuthState;
  userinfo: UserInfoState;
  history: HistoryState;
  transaction: TransactionState;
  recipients: RecipientsState;
}

export interface EpicDependencies {
  readonly client: ClientInteface;
}

interface ActionP extends Action {
  payload?: any
}

export type AppEpic = Epic<ActionP,ActionP,RootState,EpicDependencies>;
