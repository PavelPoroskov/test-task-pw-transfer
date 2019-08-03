import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { requestCommit, cancelTransaction } from '4-store/modules/transaction';
import { requestRecipients } from '4-store/modules/recipients';
import { RootState } from '4-store/types';
import TransactioForm from '5-components/TransactionForm';

const mapStateToProps = ({ transaction, userinfo, recipients }: RootState) => {
  return {
    name: transaction.name,
    amount: transaction.amount,
    balance: userinfo.balance,
    recipients: recipients.list,
    errorMessage: transaction.errorMessage
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    submit: (input: any) => dispatch(requestCommit(input)),
    cancel: () => dispatch(cancelTransaction()),
    onChangeFilter: (filter: string) => dispatch(requestRecipients(filter))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactioForm);
