import { createSelector } from 'reselect';
import {AppStoreState} from "./index"
import { sortReverseBy } from '9-helpers/index';

const history = (state: AppStoreState) => state.history.list;

export const sortedHistory = createSelector(
  history,
  (history) => {
    const list = history.slice();
    list.sort(sortReverseBy('date'));
    return list;
  },
);

