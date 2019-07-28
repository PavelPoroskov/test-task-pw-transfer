import React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk'
import { choiceHaveAccount } from '4-store/modules/auth'

import {AppStoreState} from '4-store'

import MainScreen from '1-screens/MainScreen'
// import UserInfoHeaderConnected from './UserInfoHeaderConnected'
interface StateProps {
  readonly logged: boolean;
  readonly haveAccount: boolean;
}
interface DispatchProps {
  choiceHaveAccount: (have: boolean) => void
}
type Props = StateProps & DispatchProps;

const SwitchScreen: React.FC<Props> = ({logged, haveAccount, choiceHaveAccount}) => {
  return (
    <React.Fragment>
      {/* {!logged && haveAccount && <LoginScreen onChoiceForm={()=> choiceHaveAccount(false)}/>}
      {!logged && !haveAccount && <RegisterScreen onChoiceForm={()=> choiceHaveAccount(true)}/>} */}
      {logged && <MainScreen />}
    </React.Fragment>
  );
}

const mapStateToProps = ({auth}: AppStoreState /*, ownProps*/): StateProps => ({
  logged: auth.logged,
  haveAccount: auth.haveAccount,
})

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): DispatchProps => {
  return {
    choiceHaveAccount: (have: boolean) => dispatch(choiceHaveAccount(have))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SwitchScreen);
