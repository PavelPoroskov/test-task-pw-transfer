import React from 'react';

import AuthHeaderConnected from './AuthHeaderConnected'
import UserInfoHeaderConnected from './UserInfoHeaderConnected'

const styles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
}
const MainScreen: React.FC = () => {
  return (
    <div style={styles}>
      <AuthHeaderConnected />
      <UserInfoHeaderConnected />
    </div>
  );
}

export default MainScreen;
