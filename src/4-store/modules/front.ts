import { ActionP } from '../types';

const CHOOSE = 'pw-transfer/front/CHOOSE';
const RESET = 'pw-transfer/front/RESET';

export interface FrontState {
  showHistory: boolean,
};

const initState: FrontState = {
  showHistory: false,
}
// Reducer
export default function reducer(state: FrontState = initState, action: ActionP ): FrontState {
  switch (action.type) {
    case CHOOSE:
      return {
        ...initState,
        showHistory: action.payload,
      }
    case RESET:
      return initState
    default: 
      return state;
  }
}

// Action Creators
export const chooseHistory = (showHistory: boolean) => ({ type: CHOOSE, payload: showHistory });
export const resetFront = () => ({ type: RESET });
