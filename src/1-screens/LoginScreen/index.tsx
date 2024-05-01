import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Navigate } from 'react-router-dom';

import { requestLogin } from '4-store/modules/auth';
import { RootState } from '4-store/types';

import LoginForm from '5-components/LoginForm';
import RouterLink from '6-dsystem/RouterLink';

const mapStateToProps = ({ auth }: RootState) => ({
  logged: auth.logged,
  errorMessage: auth.errorMessage
});
type StateProps = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    submit: (input: any) => dispatch(requestLogin(input))
  };
};
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

const stylesRoot: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
};
const stylesFormContainer: React.CSSProperties = {
  marginTop: '10%',
  display: 'flex',
  justifyContent: 'center'
};
const LoginScreen: React.FC<DispatchProps & StateProps> = ({
  submit,
  logged,
  errorMessage
}) => {
  if (logged) {
    return <Navigate to="/history" replace/>;
  }

  return (
    <div style={stylesRoot}>
      <div style={stylesFormContainer}>
        <LoginForm submit={submit} errorMessage={errorMessage} />
      </div>
      <div>
        Use <RouterLink to="/register">Register Form </RouterLink> to create an
        account
      </div>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);
