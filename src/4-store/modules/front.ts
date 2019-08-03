import { ActionP } from '../types';

const CHOOSE_HISTORY = 'pw-transfer/front/CHOOSE_HISTORY';
const CHOOSE_WELCOME = 'pw-transfer/front/CHOOSE_WELCOME';
const RESET = 'pw-transfer/front/RESET';

export interface FrontState {
  showHistory: boolean,
  showWelcome: boolean,
};

const initState: FrontState = {
  showHistory: false,
  showWelcome: false,
}
// Reducer
export default function reducer(state: FrontState = initState, action: ActionP ): FrontState {
  switch (action.type) {
    case CHOOSE_HISTORY:
      return {
        ...initState,
        showHistory: action.payload,
      }
    case CHOOSE_WELCOME:
      return {
        ...initState,
        showWelcome: true,
      }
    case RESET:
      return initState
    default: 
      return state;
  }
}

// Action Creators
export const chooseHistory = (showHistory: boolean) => ({ type: CHOOSE_HISTORY, payload: showHistory });
export const chooseWelcome = () => ({ type: CHOOSE_WELCOME });
export const resetFront = () => ({ type: RESET });
