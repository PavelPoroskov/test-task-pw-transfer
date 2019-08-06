import { connect, batch } from 'react-redux';
import { Dispatch } from 'redux';

import { RootState } from '4-store/types';
import { sortedHistory, columnsSettings } from '4-store/selectors';
import { copyTransaction } from '4-store/modules/transaction';
import { chooseHistory } from '4-store/modules/front';
import { changeSorting } from '4-store/modules/history';

import HistoryTable from '5-components/HistoryTable';

const mapStateToProps = (state: RootState) => ({
  list: sortedHistory(state),
  columnsSettings: columnsSettings(state)
});
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    copyTransaction: (payload?: { name: string; amount: number }) => {
      batch(() => {
        dispatch(copyTransaction(payload));
        dispatch(chooseHistory(false));
      });
    },
    updateSoringDate: () => dispatch(changeSorting('date')),
    updateSoringCorrespondent: () => dispatch(changeSorting('username')),
    updateSoringAmount: () => dispatch(changeSorting('amount'))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoryTable);
