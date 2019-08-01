import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import {RootState} from '4-store/types'
import {sortedHistory} from '4-store/selectors'
import { copyTransaction } from '4-store/modules/transaction'

import History from '5-components/History'

const mapStateToProps = (state: RootState /*, ownProps*/) => ({
  list: sortedHistory(state),
})
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    copyTransaction: (payload?: {name: string, amount: number}) => dispatch(copyTransaction(payload))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(History);
