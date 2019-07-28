import React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk'
import { register, choiceHaveAccount } from '4-store/modules/auth'

import RegisterForm from '5-components/RegisterForm'
import LinkButton from '5-components/LinkButton'

interface DispatchProps {
  submit: (input: any) => void,
  switchForm: () => void,
}

const styles: React.CSSProperties = {
}
const RegisterScreen: React.FC<DispatchProps> = ({submit, switchForm}) => {
  return (
    <div style={styles}>
      <div>Register</div>
      <div>
        <RegisterForm submit={submit}/>
      </div>
      <div>
        Use <LinkButton onClick={switchForm}>Login Form </LinkButton>, if You have account
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
export default connect(null,mapDispatchToProps)(RegisterScreen);
