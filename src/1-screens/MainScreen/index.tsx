import React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk'

import { newTransaction } from '4-store/modules/transaction'
import {AppStoreState} from '4-store'

import LinkButton from '6-dsystem/LinkButton'
import AuthHeaderConnected from './AuthHeaderConnected'
import UserInfoHeaderConnected from './UserInfoHeaderConnected'
import TransactionFormConnected from './TransactionFormConnected'

interface StateProps {
  readonly editingTransaction: boolean,
}
interface DispatchProps {
  beginTransaction: () => void,
}
type Props = StateProps & DispatchProps;

const styles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
}
const containerTransaction: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  // backgroundColor: 'pink',
}

const MainScreenView: React.FC<Props> = ({editingTransaction,beginTransaction}) => {
  return (
    <div style={styles}>
      <AuthHeaderConnected />
      <UserInfoHeaderConnected />
      
      {!editingTransaction && <LinkButton onClick={beginTransaction}>New Transaction</LinkButton>}
      {editingTransaction && (
        <div style={containerTransaction}>
          <TransactionFormConnected />
        </div>
      )}
    </div>
  );
}

const mapStateToProps = ({transaction}: AppStoreState /*, ownProps*/) => ({
  editingTransaction: transaction.editing,
})
const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): DispatchProps => {
  return {
    beginTransaction: () => dispatch(newTransaction())
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(MainScreenView);
