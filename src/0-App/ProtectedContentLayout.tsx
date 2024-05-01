import React from 'react';
import { Outlet } from "react-router-dom";
import Header from '1-screens/Header';

const ProtectedContentLayout: React.FC = () => {
  // console.log('in ProtectedContentLayout');
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default ProtectedContentLayout;
