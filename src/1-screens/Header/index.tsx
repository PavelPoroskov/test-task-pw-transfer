import React from 'react';
import RouterLink from '6-dsystem/RouterLink';

import AuthHeaderConnected from './AuthHeaderConnected';
import UserInfoHeaderConnected from './UserInfoHeaderConnected';

const styles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column'
};
const styleMenu: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between', //? compatibility
  paddingLeft: '5px',
  paddingRight: '5px'
};

const MainScreenView: React.FC = () => {
  return (
    <div style={styles}>
      <AuthHeaderConnected />
      <UserInfoHeaderConnected />

      <div style={styleMenu}>
        <RouterLink to="/history">Show History</RouterLink>
        <RouterLink to="/transaction">New Transaction</RouterLink>
      </div>
    </div>
  );
};

export default MainScreenView;
