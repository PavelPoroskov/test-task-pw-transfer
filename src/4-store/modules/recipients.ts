import { AnyAction } from 'redux';
import { ofType } from "redux-observable"
import { switchMap, mergeMap, catchError } from "rxjs/operators";
import { of, from  } from "rxjs";

import { AppEpic } from "../types"

const GET   = 'pw-transfer/recipients/GET';
const GET_SUCCESS = 'pw-transfer/recipients/GET_SUCCESS';
const GET_FAILURE = 'pw-transfer/recipients/GET_FAILURE';

export interface RecipientsState {
  // list: Recipient[];
  list: {[key: string]: any},
  filter: string,
};

const initState: RecipientsState = {
  list: {},
  filter: '',
}
// Reducer
export default function reducer(state: RecipientsState = initState, action: AnyAction ): RecipientsState {
  switch (action.type) {
    case GET:
      return {
        ...state,
        filter: action.payload,
      }
    case GET_SUCCESS:
      return {
        ...state,
        list: action.payload.reduce((acc:{[key: string]: any},item:any) => {
          acc[item.name] = null;
          return acc;
        }, {}),
      }
    case GET_FAILURE:
      return state
    default: 
      return state;
  }
}

// Action Creators
export const requestRecipients = (filter: string) => ({ type: GET, payload: filter });
const requestRecipientsSuccess = (payload: any[]) => ({ type: GET_SUCCESS, payload });
const requestRecipientsFailure = (error: any) => ({ type: GET_FAILURE, payload: error.message })

// Side Effects
export const recipientsEpic: AppEpic = (action$, state$, {client}) => action$.pipe(
  ofType(GET),
  switchMap(({payload}) =>
    from(client.getRecipients(payload)).pipe(
      mergeMap(response => of(requestRecipientsSuccess(response))),
      catchError(error => of(requestRecipientsFailure(error)))
    )
  )
);
