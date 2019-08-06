import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { RootState } from '4-store/types';
import { changeFilter } from '4-store/modules/history';
import { requestRecipients } from '4-store/modules/recipients';

import HistoryFilterForm from '5-components/HistoryFilterForm';

const mapStateToProps = (state: RootState) => ({
  correspondentList: state.recipients.list,
  date: state.history.filter.date,
  username: state.history.filter.username,
  amount: state.history.filter.amount,
  showFilter: state.front.showFilter
});
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    correspondentOnTyping: (filter: string) =>
      dispatch(requestRecipients(filter)),
    submit: (input: any) => dispatch(changeFilter(input)),
    clearFilter: () => dispatch(changeFilter({}))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoryFilterForm);
