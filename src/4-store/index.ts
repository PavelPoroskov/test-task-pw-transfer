import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import auth, {AuthSate} from './modules/auth';
import userinfo, {UserInfoState} from './modules/userinfo';
// import transactions from './transactions';
// import recipients from './recipients';
// import messages from './messages';

export interface AppStoreState {
  auth: AuthSate;
  userinfo: UserInfoState;
}

const rootReducer = combineReducers<AppStoreState>({
  auth,
  userinfo,
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
  // applyMiddleware(thunk.withExtraArgument(client))
)
// export type AppStoreInterface = typeof store

export default store