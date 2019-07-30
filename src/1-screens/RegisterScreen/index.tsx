import React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk'
import { register, choiceHaveAccount } from '4-store/modules/auth'

import RegisterForm from '5-components/RegisterForm'
import LinkButton from '6-dsystem/LinkButton'

interface DispatchProps {
  submit: (input: any) => void,
  switchForm: () => void,
}

const stylesRoot: React.CSSProperties = {
  minHeight: '100vh',
}
const stylesLevel2: React.CSSProperties = {
  borderRadius: '1em',
  border: 'solid',
  paddingBottom: '0.75rem',
}
const stylesHeader: React.CSSProperties = {
  marginBottom: '1em',
}
const RegisterScreen: React.FC<DispatchProps> = ({ submit, switchForm }) => {
  return (
    <div style={stylesRoot} className="valign-wrapper">
      <div style={stylesLevel2} className="col l4 m6 s12 offset-l4 offset-m3">
        <h4 style={stylesHeader}>Register</h4>
        <div>
          <RegisterForm submit={submit} />
        </div>
        <div>
          Use <LinkButton onClick={switchForm}>Login Form </LinkButton> if you have an account
      </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): DispatchProps => {
  return {
    submit: (input) => dispatch(register(input)),
    switchForm: () => dispatch(choiceHaveAccount(true))
  }
}

// export default connect(mapStateToProps,mapDispatchToProps)(RegisterFormConnected);
export default connect(null, mapDispatchToProps)(RegisterScreen);
