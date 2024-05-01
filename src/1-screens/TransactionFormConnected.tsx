import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {
  useLocation,
  useNavigate,
} from 'react-router-dom';

import { requestCommit } from '4-store/modules/transaction';
import { requestRecipients } from '4-store/modules/recipients';
import { RootState } from '4-store/types';
import TransactionForm from '5-components/TransactionForm';

interface TransactionFormOwnProps {
  navigateBack: () => void
}

const mapStateToProps = (
  { transaction, userinfo, recipients }: RootState,
) => {
  return {
    balance: userinfo.balance,
    recipients: recipients.list,
    errorMessage: transaction.errorMessage
  };
};
const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: TransactionFormOwnProps
) => {
  return {
    submit: (input: any) =>
      dispatch(requestCommit({ input, navigateBack: ownProps.navigateBack })),
    onCancel: ownProps.navigateBack,
    onChangeFilter: (filter: string) => dispatch(requestRecipients(filter))
  };
};

const TransactionFormConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionForm);

export
const TransactionFormRoute = () => {
  const location = useLocation();
  const stateFromLink = location && location.state;
  const name = (stateFromLink && stateFromLink.name) || '';
  const amount = (stateFromLink && stateFromLink.amount) || 0;

  const navigate = useNavigate();
  const navigateBack = () => navigate(-1)

  return (
    <TransactionFormConnected
      name={name}
      amount={amount}
      navigateBack={navigateBack} 
    />
  )
}
