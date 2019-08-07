import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import { RootState } from '4-store/types';

const mapStateToProps = ({ auth }: RootState) => ({
  logged: auth.logged
});
type StateProps = ReturnType<typeof mapStateToProps>;

const ProtectedRoute: React.FC<StateProps & RouteProps> = ({
  logged,
  component: Component,
  ...rest
}) => {
  if (logged) {
    return <Route {...rest} component={Component} />;
  }

  return (
    <Route
      {...rest}
      render={props => (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }
          }}
        />
      )}
    />
  );
};

export default connect(mapStateToProps)(ProtectedRoute);
