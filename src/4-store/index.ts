import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import auth, {AuthSate} from './modules/auth';
import userinfo, {UserInfoState} from './modules/userinfo';
import transaction, {TransactionState} from './modules/transaction';
import history, {HistoryState} from './modules/history';

export interface AppStoreState {
  auth: AuthSate;
  userinfo: UserInfoState;
  transaction: TransactionState;
  history: HistoryState;
}

const rootReducer = combineReducers<AppStoreState>({
  auth,
  userinfo,
  transaction,
  history,
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
  // applyMiddleware(thunk.withExtraArgument(client))
)

export default store