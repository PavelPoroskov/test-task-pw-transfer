import { ofType } from 'redux-observable';
import { switchMap, map, catchError, debounceTime } from 'rxjs/operators';
import { of, from } from 'rxjs';

import { ActionP, AppEpic } from '../types';

const GET = 'pw-transfer/recipients/GET';
const GET_SUCCESS = 'pw-transfer/recipients/GET_SUCCESS';
const GET_FAILURE = 'pw-transfer/recipients/GET_FAILURE';
const RESET = 'pw-transfer/recipients/RESET';

export interface RecipientsState {
  list: { [key: string]: any };
  filter: string;
}

const initState: RecipientsState = {
  list: {},
  filter: ''
};
// Reducer
export default function reducer(
  state: RecipientsState = initState,
  action: ActionP
): RecipientsState {
  switch (action.type) {
    case GET:
      return {
        ...state,
        filter: action.payload
      };
    case GET_SUCCESS:
      return {
        ...state,
        list: action.payload.reduce(
          (acc: { [key: string]: any }, item: any) => {
            acc[item.name] = null;
            return acc;
          },
          {}
        )
      };
    case GET_FAILURE:
      return state;
    case RESET:
      return initState;
    default:
      return state;
  }
}

// Action Creators
export const requestRecipients = (filter: string) => ({
  type: GET,
  payload: filter
});
const requestRecipientsSuccess = (payload: any[]) => ({
  type: GET_SUCCESS,
  payload
});
const requestRecipientsFailure = (error: any) => ({
  type: GET_FAILURE,
  payload: error.message
});
export const resetRecipients = () => ({ type: RESET });

// Side Effects
export const recipientsEpic: AppEpic = (action$, state$, { client }) =>
  action$.pipe(
    ofType(GET),
    debounceTime(400),
    switchMap(({ payload }) =>
      from(client.getRecipients(payload)).pipe(
        map(response => requestRecipientsSuccess(response)),
        catchError(error => of(requestRecipientsFailure(error)))
      )
    )
  );
