import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { RootState } from '4-store/types';
import { sortedHistory, columnsSettings } from '4-store/selectors';
import { changeSorting } from '4-store/modules/history';

import HistoryTable from '5-components/HistoryTable';

const mapStateToProps = (state: RootState) => ({
  list: sortedHistory(state),
  columnsSettings: columnsSettings(state)
});
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    updateSoringDate: () => dispatch(changeSorting('date')),
    updateSoringCorrespondent: () => dispatch(changeSorting('username')),
    updateSoringAmount: () => dispatch(changeSorting('amount'))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoryTable);
