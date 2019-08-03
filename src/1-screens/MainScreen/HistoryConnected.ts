import { connect, batch } from 'react-redux';
import { Dispatch } from 'redux';

import { RootState } from '4-store/types';
import { sortedHistory } from '4-store/selectors';
import { copyTransaction } from '4-store/modules/transaction';
import { chooseHistory } from '4-store/modules/front';

import History from '5-components/History';

const mapStateToProps = (state: RootState) => ({
  list: sortedHistory(state)
});
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    copyTransaction: (payload?: { name: string; amount: number }) => {
      batch(() => {
        dispatch(copyTransaction(payload));
        dispatch(chooseHistory(false));
      });
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(History);
