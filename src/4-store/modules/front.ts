import { ActionP } from '../types';

const CHOOSE_HISTORY = 'pw-transfer/front/CHOOSE_HISTORY';
const CHOOSE_WELCOME = 'pw-transfer/front/CHOOSE_WELCOME';
const CHOOSE_FILTER = 'pw-transfer/front/CHOOSE_FILTER';
const RESET = 'pw-transfer/front/RESET';

export interface FrontState {
  showHistory: boolean;
  showWelcome: boolean;
  showFilter: boolean;
}

const initState: FrontState = {
  showHistory: false,
  showWelcome: false,
  showFilter: false
};
// Reducer
export default function reducer(
  state: FrontState = initState,
  action: ActionP
): FrontState {
  switch (action.type) {
    case CHOOSE_HISTORY:
      return {
        ...state,
        showWelcome: false,
        showHistory: action.payload
      };
    case CHOOSE_FILTER:
      return {
        ...state,
        showFilter: action.payload
      };
    case CHOOSE_WELCOME:
      return {
        ...initState,
        showWelcome: true
      };
    case RESET:
      return initState;
    default:
      return state;
  }
}

// Action Creators
export const chooseHistory = (showHistory: boolean) => ({
  type: CHOOSE_HISTORY,
  payload: showHistory
});
export const chooseFilter = (showFilter: boolean) => ({
  type: CHOOSE_FILTER,
  payload: showFilter
});
export const chooseWelcome = () => ({ type: CHOOSE_WELCOME });
export const resetFront = () => ({ type: RESET });
