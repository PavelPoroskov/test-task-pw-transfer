import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { requestRegister, choiceUseLoginForm } from '4-store/modules/auth';
import { RootState } from '4-store/types';

import RegisterForm from '5-components/RegisterForm';
import LinkButton from '6-dsystem/LinkButton';

const mapStateToProps = ({ auth }: RootState) => ({
  errorMessage: auth.errorMessage
});
type StateProps = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    submit: (input: any) => dispatch(requestRegister(input)),
    switchForm: () => dispatch(choiceUseLoginForm(true))
  };
};
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

const stylesRoot: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
};
const stylesFormContainer: React.CSSProperties = {
  marginTop: '10%'
};
const RegisterScreen: React.FC<DispatchProps & StateProps> = ({
  submit,
  switchForm,
  errorMessage
}) => {
  return (
    <div style={stylesRoot}>
      <div style={stylesFormContainer}>
        <RegisterForm submit={submit} errorMessage={errorMessage} />
      </div>
      <div>
        Use <LinkButton onClick={switchForm}>Login Form </LinkButton> if you
        have an account
      </div>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterScreen);
