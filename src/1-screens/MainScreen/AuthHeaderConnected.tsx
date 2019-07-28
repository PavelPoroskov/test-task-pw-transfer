import React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk'

import { logout } from '4-store/modules/auth'
import AuthHeader from '5-components/AuthHeader'

interface DispatchProps {
  logout: () => void,
}

const AuthHeaderConnected: React.FC<DispatchProps> = ({logout}) => {
  // const openRegister = () => {

  // }
  // const openLogin = () => {
    
  // }
  // const openLogout = () => {
    
  // }

  return <AuthHeader openLogout={logout}/>;
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): DispatchProps => {
  return {
    logout: () => dispatch(logout())
  }
}

// export default connect(mapStateToProps,mapDispatchToProps)(RegisterFormConnected);
export default connect(null,mapDispatchToProps)(AuthHeaderConnected);
