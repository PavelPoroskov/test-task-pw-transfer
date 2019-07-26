import React from 'react';

interface AuthHeaderProps {
  readonly openRegister: () => void;
  readonly openLogin: () => void;
  readonly openLogout: () => void;
}
const styles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  padding: '1em 1em',
  backgroundColor: 'lightblue',
  justifyContent: 'flex-end',
};
const AuthHeader: React.FC<AuthHeaderProps> = ({openRegister, openLogin, openLogout}) => {
  return (
    <div style={styles}>
      <button onClick={openRegister}>Register</button>
      <button onClick={openLogin}>Login</button>
      <button onClick={openLogout}>Logout</button>
    </div>
  );
}

export default AuthHeader;
