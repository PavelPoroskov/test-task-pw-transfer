import React from 'react';
import { connect, batch } from 'react-redux';
import { Dispatch } from 'redux';

import { newTransaction } from '4-store/modules/transaction';
import { chooseHistory } from '4-store/modules/front';
import { RootState } from '4-store/types';

import LinkButton from '6-dsystem/LinkButton';
import AuthHeaderConnected from './AuthHeaderConnected';
import UserInfoHeaderConnected from './UserInfoHeaderConnected';
import TransactionFormConnected from './TransactionFormConnected';
import HistoryConnected from './HistoryConnected';
import Welcome from '5-components/Welcome';

const mapStateToProps = ({ transaction, front, userinfo }: RootState) => ({
  editingTransaction: transaction.editing,
  showHistory: front.showHistory,
  showWelocome: front.showWelcome,
  username: userinfo.name
});
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    beginTransaction: () => {
      batch(() => {
        dispatch(newTransaction());
        dispatch(chooseHistory(false));
      });
    },
    choiceHistory: (showHistory: boolean) =>
      dispatch(chooseHistory(showHistory))
  };
};
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type Props = StateProps & DispatchProps;

const styles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh'
};
const containerTransaction: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center'
};
const styleMenu: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between', //? compatibility
  paddingLeft: '0.5em',
  paddingRight: '0.5em'
};

const MainScreenView: React.FC<Props> = ({
  editingTransaction,
  beginTransaction,
  showHistory,
  showWelocome,
  username,
  choiceHistory
}) => {
  return (
    <div style={styles}>
      <AuthHeaderConnected />
      <UserInfoHeaderConnected />

      <div style={styleMenu}>
        {!showHistory && (
          <LinkButton onClick={() => choiceHistory(true)}>
            Show History
          </LinkButton>
        )}
        {showHistory && (
          <LinkButton onClick={() => choiceHistory(false)}>
            Hide History
          </LinkButton>
        )}
        <LinkButton onClick={beginTransaction}>New Transaction</LinkButton>
      </div>
      {!(showHistory || showWelocome) && editingTransaction && (
        <div style={containerTransaction}>
          <TransactionFormConnected />
        </div>
      )}
      {showHistory && <HistoryConnected />}
      {showWelocome && <Welcome username={username} />}
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainScreenView);
