import { Action, combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit'
// TODO batching is in last version. We can use it
import { enableBatching } from 'redux-batched-actions';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import client from '8-remote/client/index';
import auth, { registerEpic, loginEpic, logoutEpic } from './modules/auth';
import userinfo, { userInfoEpic } from './modules/userinfo';
import history, { historyEpic } from './modules/history';
import transaction, { commitTransactionEpic } from './modules/transaction';
import recipients, { recipientsEpic } from './modules/recipients';

import { RootState, EpicDependencies } from './types';

const rootReducer = combineReducers({
  auth,
  userinfo,
  transaction,
  history,
  recipients
});

const rootEpic = combineEpics(
  registerEpic,
  loginEpic,
  logoutEpic,
  userInfoEpic,
  historyEpic,
  commitTransactionEpic,
  recipientsEpic
);
const epicMiddleware = createEpicMiddleware<
  Action,
  Action,
  RootState,
  EpicDependencies
>({ dependencies: { client } });

function createStore() {
  const store = configureStore({
    reducer: enableBatching(rootReducer),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(epicMiddleware),
  })
  
  epicMiddleware.run(rootEpic);

  return store;
}

export default createStore();
