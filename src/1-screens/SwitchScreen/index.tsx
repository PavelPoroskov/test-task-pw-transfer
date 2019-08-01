import React from 'react';
import { connect } from 'react-redux';

import {RootState} from '4-store/types'

import RegisterScreen from '1-screens/RegisterScreen';
import LoginScreen from '1-screens/LoginScreen';
import MainScreen from '1-screens/MainScreen';

interface StateProps {
  readonly logged: boolean;
  readonly useLoginForm: boolean;
}

const SwitchScreen: React.FC<StateProps> = ({logged, useLoginForm}) => {
  return (
    <React.Fragment>
      {!logged && useLoginForm && <LoginScreen />}
      {!logged && !useLoginForm && <RegisterScreen />} 
      {logged && <MainScreen />}
    </React.Fragment>
  );
}

const mapStateToProps = ({auth}: RootState /*, ownProps*/): StateProps => ({
  logged: auth.logged,
  useLoginForm: auth.useLoginForm,
})

export default connect(mapStateToProps)(SwitchScreen);
