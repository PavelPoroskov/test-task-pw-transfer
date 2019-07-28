import React from 'react';
import { connect } from 'react-redux';

import {AppStoreState} from '4-store'

import RegisterScreen from '1-screens/RegisterScreen';
import LoginScreen from '1-screens/LoginScreen';
import MainScreen from '1-screens/MainScreen';

interface StateProps {
  readonly logged: boolean;
  readonly haveAccount: boolean;
}
interface DispatchProps {
  // choiceHaveAccount: (have: boolean) => void
}
type Props = StateProps & DispatchProps;

const SwitchScreen: React.FC<Props> = ({logged, haveAccount}) => {
  return (
    <React.Fragment>
      {!logged && haveAccount && <LoginScreen />}
      {!logged && !haveAccount && <RegisterScreen />} 
      {logged && <MainScreen />}
    </React.Fragment>
  );
}

const mapStateToProps = ({auth}: AppStoreState /*, ownProps*/): StateProps => ({
  logged: auth.logged,
  haveAccount: auth.haveAccount,
})

// const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): DispatchProps => {
//   return {
//     choiceHaveAccount: (have: boolean) => dispatch(choiceHaveAccount(have))
//   }
// }

export default connect(mapStateToProps)(SwitchScreen);
