import { switchMap, map, catchError } from 'rxjs/operators';
import { of, from } from 'rxjs';

import { Transaction } from '8-remote/client';
import { ActionP, AppEpic, ofType } from '../types';

const GET = 'pw-transfer/history/GET';
const GET_SUCCESS = 'pw-transfer/history/GET_SUCCESS';
const GET_FAILURE = 'pw-transfer/history/GET_FAILURE';
const CHANGE_SORTING = 'pw-transfer/history/CHANGE_SORTING';
const CHANGE_FILTER = 'pw-transfer/history/CHANGE_FILTER';
const RESET = 'pw-transfer/history/RESET';

interface SortField {
  name: string;
  direction: number; // 1 -- forward, -1 -- backward
}
type Sorting = SortField[];

export interface HistoryState {
  list: Transaction[];
  filter: {
    date: string | null;
    username: string | null;
    amount: number | null;
  };
  sorting: Sorting;
}
const initState: HistoryState = {
  list: [],
  filter: {
    date: null,
    username: null,
    amount: null
  },
  sorting: [{ name: 'date', direction: -1 }]
};

const updateSorting = (sorting: Sorting, field: string) => {
  const res: Sorting = [];
  let fined = false;
  for (let i = 0; i < sorting.length; i += 1) {
    const sortField = sorting[i];
    if (sortField.name === field) {
      if (sortField.direction === 1) {
        res.push({
          ...sortField,
          direction: -1
        });
      }
      fined = true;
    } else {
      res.push(sortField);
    }
  }

  if (!fined) {
    res.push({
      name: field,
      direction: 1
    });
  }

  return res;
};

const updateFilter = (newFilters: {
  date?: string;
  username?: string;
  amount?: number;
}) => {
  return {
    ...initState.filter,
    ...newFilters
  };
};

// Reducer
export default function reducer(
  state: HistoryState = initState,
  action: ActionP
): HistoryState {
  switch (action.type) {
    case GET:
      return state;
    case GET_SUCCESS:
      return {
        ...state,
        list: action.payload
      };
    case GET_FAILURE:
      return state;
    case CHANGE_SORTING:
      return {
        ...state,
        sorting: updateSorting(state.sorting, action.payload)
      };

    case CHANGE_FILTER:
      return {
        ...state,
        filter: updateFilter(action.payload)
      };
    case RESET:
      return initState;
    default:
      return state;
  }
}

// Action Creators
export const requestHistory = () => ({ type: GET });
const requestHistorySuccess = (payload: Transaction[]) => ({
  type: GET_SUCCESS,
  payload
});
const requestHistoryFailure = (payload: any) => ({
  type: GET_FAILURE,
  payload
});
export const resetHistory = () => ({ type: RESET });

export const changeSorting = (field: string) => ({
  type: CHANGE_SORTING,
  payload: field
});
export const changeFilter = (filters: {
  date?: string;
  username?: string;
  amount?: number;
}) => ({
  type: CHANGE_FILTER,
  payload: filters
});

export const historyEpic: AppEpic = (action$, state$, { client }) =>
  action$.pipe(
    ofType(GET),
    switchMap(({ payload }) =>
      from(client.getLoggedUserTransactions()).pipe(
        map(response => requestHistorySuccess(response)),
        catchError(error => of(requestHistoryFailure(error)))
      )
    )
  );
