import { createSelector } from 'reselect';
import { RootState } from './types';

interface SortField {
  name: string,
  direction: number, // 1 -- forward, -1 -- backward
}
type Sorting = SortField[]

export function sortByFields(sortFields: Sorting) {

  return function compare(o1: any, o2: any) {
    for (let i=0; i< sortFields.length; i+=1) {
      const {name, direction} = sortFields[i];

      let o1value = o1[name];
      let o2value = o2[name];
      if (name === 'amount') {
        o1value = 0 < o1value ? o1value : -o1value;
        o2value = 0 < o2value ? o2value : -o2value;
      }

      if (o1value < o2value) {
        return -direction;
      }
      if (o1value > o2value) {
        return direction;
      }
    }
    return 0;
  };
}

const history = (state: RootState) => state.history.list;
const history_filter = (state: RootState) => state.history.filter;
const history_sorting = (state: RootState) => state.history.sorting;

export const filteredHistory = createSelector(
  history,
  history_filter,
  (history, filter) => {
    const list = history.filter(item => {
      if (filter.username != null) {
        // fullname or substring, or list of fullname
        if (item.username !== filter.username) {
          return false
        }
      }
      if (filter.date != null) {
        // period or date
        if (item.date !== filter.date) {
          return false
        }
      }
      if (filter.amount != null) {
        if (item.amount !== Math.max(filter.amount, -filter.amount)) {
          return false
        }
      }
      return true;
    });
    return list;
  }
);

export const sortedHistory = createSelector(
  filteredHistory,
  history_sorting,
  (history,sorting) => {
    const list = history.slice();
    if (sorting.length) {
      list.sort(sortByFields(sorting));
    }
    return list;
  }
);

export const columnsSettings = createSelector(
  history_sorting,
  (sorting) => {
    const res: {[name: string]: { direction: null | number, order: null | number}} = {
      date: {
        direction: null,
        order: null,
      },
      username: {
        direction: null,
        order: null,
      },
      amount: {
        direction: null,
        order: null,
      }
    };

    for (let i=0; i< sorting.length; i+=1) {
      const {name, direction} = sorting[i];

      if (res[name]) {
        res[name].direction = direction;
        if (1 < sorting.length) {
          res[name].order = i + 1;
        }
      }
    }

    return res;
  }
);
