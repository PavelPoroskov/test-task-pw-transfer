import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk'

import { commit, cancelTransaction } from '4-store/modules/transaction'
import {AppStoreState} from '4-store'
import TransactionForm from '5-components/TransactionForm'

interface StateProps {
  readonly name: string,
  readonly amount: number,
  readonly balance: number,
}
interface DispatchProps {
  submit: (input: any) => void,
  cancel: () => void,
}
type Props = StateProps & DispatchProps;

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
export default connect(mapStateToProps,mapDispatchToProps)(TransactionForm);
