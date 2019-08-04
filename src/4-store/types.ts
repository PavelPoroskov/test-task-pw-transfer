import { Action } from 'redux';
import { Epic } from 'redux-observable';
import { BatchActionType } from 'redux-batched-actions';
import { mergeMap } from 'rxjs/operators';
import { of, from, empty } from 'rxjs';

import { ClientInteface } from '8-remote/client/index';
import { AuthState } from './modules/auth';
import { UserInfoState } from './modules/userinfo';
import { HistoryState } from './modules/history';
import { TransactionState } from './modules/transaction';
import { RecipientsState } from './modules/recipients';
import { FrontState } from './modules/front';

export interface RootState {
  auth: AuthState;
  userinfo: UserInfoState;
  history: HistoryState;
  transaction: TransactionState;
  recipients: RecipientsState;
  front: FrontState;
}

export interface EpicDependencies {
  readonly client: ClientInteface;
}

export interface ActionP extends Action {
  payload?: any;
  meta?: any;
}

type BatchAction<
  T extends Action,
  ActionType extends string = BatchActionType
> = Action<ActionType> & {
  payload: T[];
  meta: { batch: true };
};

const isBatch = <T extends Action>(
  action: T | BatchAction<T>
): action is BatchAction<T> =>
  (action as BatchAction<T>).meta && (action as BatchAction<T>).meta.batch;

export const ofType = <T extends Action>(type: T['type']) =>
  mergeMap((action: T) => {
    if (action.type === type) {
      return of(action);
    } else if (isBatch(action)) {
      return from(action.payload.filter(action => action.type === type));
    }

    return empty();
  });

export type AppEpic = Epic<ActionP, ActionP, RootState, EpicDependencies>;
