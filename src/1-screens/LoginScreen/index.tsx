import React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk'
import { login, choiceHaveAccount } from '4-store/modules/auth'

import LoginForm from '5-components/LoginForm'
import LinkButton from '5-components/LinkButton'

const styles: React.CSSProperties = {
}

const LoginScreen: React.FC<DispatchProps> = ({submit, switchForm}) => {
  return (
    <div style={styles}>
      <div>Login</div>
      <div>
        <LoginForm submit={submit}/>
      </div>
      <div>
        Use <LinkButton onClick={switchForm}>Register Form </LinkButton> to create account
      </div>
    </div>
  );
}

interface DispatchProps {
  submit: (input: any) => void,
  switchForm: () => void,
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): DispatchProps => {
  return {
    submit: (input) => dispatch(login(input)),
    switchForm: () => dispatch(choiceHaveAccount(false))
  }
}

// export default connect(mapStateToProps,mapDispatchToProps)(RegisterFormConnected);
export default connect(null,mapDispatchToProps)(LoginScreen);
