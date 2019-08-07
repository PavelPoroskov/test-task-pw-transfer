import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router-dom';

import { requestCommit } from '4-store/modules/transaction';
import { requestRecipients } from '4-store/modules/recipients';
import { RootState } from '4-store/types';
import TransactioForm from '5-components/TransactionForm';

const mapStateToProps = (
  { transaction, userinfo, recipients }: RootState,
  { location }: RouteComponentProps
) => {
  const stateFromLink = location && location.state;
  return {
    name: (stateFromLink && stateFromLink.name) || '',
    amount: (stateFromLink && stateFromLink.amount) || 0,
    balance: userinfo.balance,
    recipients: recipients.list,
    errorMessage: transaction.errorMessage
  };
};
const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: RouteComponentProps
) => {
  return {
    submit: (input: any) =>
      dispatch(requestCommit({ input, history: ownProps.history })),
    cancel: () => ownProps && ownProps.history.goBack(),
    onChangeFilter: (filter: string) => dispatch(requestRecipients(filter))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactioForm);
