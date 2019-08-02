import React from 'react';
import { connect } from 'react-redux';
import { requestLogin, choiceUseLoginForm } from '4-store/modules/auth'
import {RootState} from '4-store/types'

import { Dispatch } from 'redux';

import LoginForm from '5-components/LoginForm'
import LinkButton from '6-dsystem/LinkButton'

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    submit: (input: any) => dispatch(requestLogin(input)),
    switchForm: () => dispatch(choiceUseLoginForm(false))
  }
}
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

const mapStateToProps = ({auth}: RootState ) => ({
  errorMessage: auth.errorMessage,
})
type StateProps = ReturnType<typeof mapStateToProps>;

const stylesRoot: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}
const stylesFormContainer: React.CSSProperties = {
    marginTop: '10%',
    display: 'flex',
    justifyContent: 'center',
}
const LoginScreen: React.FC<DispatchProps & StateProps> = ({submit, switchForm, errorMessage}) => {
  return (
    <div style={stylesRoot}>
      <div style={stylesFormContainer}>
        <LoginForm submit={submit} errorMessage={errorMessage}/>
      </div>
      <div>
        Use <LinkButton onClick={switchForm}>Register Form </LinkButton> to create an account
      </div>
    </div>
  );
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginScreen);
