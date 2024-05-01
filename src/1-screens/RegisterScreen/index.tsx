import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Navigate, RouteProps } from 'react-router-dom';

import { requestRegister } from '4-store/modules/auth';
import { RootState } from '4-store/types';

import RegisterForm from '5-components/RegisterForm';
import RouterLink from '6-dsystem/RouterLink';

const mapStateToProps = ({ auth }: RootState) => ({
  logged: auth.logged,
  errorMessage: auth.errorMessage
});
type StateProps = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    submit: (input: any) => dispatch(requestRegister(input))
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
const RegisterScreen: React.FC<DispatchProps & StateProps & RouteProps> = ({
  submit,
  logged,
  errorMessage,
}) => {
  if (logged) {
    return <Navigate to="/welcome" replace />;
  }

  return (
    <div style={stylesRoot}>
      <div style={stylesFormContainer}>
        <RegisterForm submit={submit} errorMessage={errorMessage} />
      </div>
      <div>
        Use <RouterLink to="/login">Login Form </RouterLink> if you have an
        account
      </div>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterScreen);
