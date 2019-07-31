import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk'

import {AppStoreState} from '4-store'
import {sortedHistory} from '4-store/selectors'
import { copyTransaction } from '4-store/modules/transaction'

import History from '5-components/History'

interface DispatchProps {
  copyTransaction: (payload: {name: string, amount: number}) => void,
}
const mapStateToProps = (state: AppStoreState /*, ownProps*/) => ({
  list: sortedHistory(state),
})
const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): DispatchProps => {
  return {
    copyTransaction: (payload?: {name: string, amount: number}) => dispatch(copyTransaction(payload))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(History);
