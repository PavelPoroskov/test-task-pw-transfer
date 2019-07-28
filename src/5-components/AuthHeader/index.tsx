import React from 'react';

import LinkButton from '5-components/LinkButton'

interface AuthHeaderProps {
  // readonly openRegister: () => void;
  // readonly openLogin: () => void;
  readonly openLogout: () => void;
}
const styles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  padding: '1em 1em',
  backgroundColor: 'lightblue',
  justifyContent: 'flex-end',
};
const AuthHeader: React.FC<AuthHeaderProps> = ({openLogout}) => {
  return (
    <div style={styles}>
      <LinkButton onClick={openLogout}>Logout</LinkButton>
    </div>
  );
}

export default AuthHeader;
