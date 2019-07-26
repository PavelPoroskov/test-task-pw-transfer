import React from 'react';

import UserInfoHeader from '5-components/UserInfoHeader'

const UserInfoHeaderConnected: React.FC = () => {

  return <UserInfoHeader name="John Test" email="john.test@gmail.com" balance={123}/>;
}

export default UserInfoHeaderConnected;
