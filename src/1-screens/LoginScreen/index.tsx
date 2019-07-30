import React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk'
import { login, choiceHaveAccount } from '4-store/modules/auth'

import LoginForm from '5-components/LoginForm'
import LinkButton from '6-dsystem/LinkButton'

const stylesRoot: React.CSSProperties = {
  minHeight: '100vh',
}
const stylesLevel2: React.CSSProperties = {
  borderRadius: '1em',
  border: 'solid',
  paddingBottom: '0.75rem',
}

const LoginScreen: React.FC<DispatchProps> = ({submit, switchForm}) => {
  return (
    <div style={stylesRoot} className="valign-wrapper">
      <div style={stylesLevel2} className="col l4 m6 s12 offset-l4 offset-m3">
        <LoginForm submit={submit}/>
        <div>
          Use <LinkButton onClick={switchForm}>Register Form </LinkButton> to create an account
        </div>
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
