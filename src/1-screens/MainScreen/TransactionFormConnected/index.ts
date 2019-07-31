import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk'

import { commit, cancelTransaction } from '4-store/modules/transaction'
import {AppStoreState} from '4-store'
import {DispatchProps} from './types'
import TransactioFormWithRecepients from './TransactionFormWithRecepients'

const mapStateToProps = ({transaction, userinfo}: AppStoreState /*, ownProps*/) => ({
  name: transaction.name,
  amount: transaction.amount,
  balance: userinfo.balance,
})
const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): DispatchProps => {
  return {
    submit: (input: any) => dispatch(commit(input)),
    cancel: () => dispatch(cancelTransaction())
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(TransactioFormWithRecepients);
