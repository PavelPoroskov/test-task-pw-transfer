import { createSelector } from 'reselect';
import {RootState} from "./types"
import { sortBy } from '9-helpers/index';

const history = (state: RootState) => state.history.list;

export const sortedHistory = createSelector(
  history,
  (history) => {
    const list = history.slice();
    list.sort(sortBy('date', false));
    return list;
  },
);
