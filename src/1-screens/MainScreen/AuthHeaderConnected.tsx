import React from 'react';

import AuthHeader from '5-components/AuthHeader'

const AuthHeaderConnected: React.FC = () => {
  const openRegister = () => {

  }
  const openLogin = () => {
    
  }
  const openLogout = () => {
    
  }

  return <AuthHeader openRegister={openRegister} openLogin={openLogin} openLogout={openLogout}/>;
}

export default AuthHeaderConnected;
