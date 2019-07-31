import React from 'react';

import LinkButton from '6-dsystem/LinkButton'

interface AuthHeaderProps {
  readonly logout: () => void;
}
const container: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  padding: '0.5em 1em',
  backgroundColor: '#0A0',
  alignItems: 'center'
};
const left: React.CSSProperties = {
  flex: 1,
  fontSize: '1.5em',
  fontWeight: 'bold',
};
const AuthHeader: React.FC<AuthHeaderProps> = ({logout}) => {
  return (
    <div style={container}>
      <div style={left}>
        PW Transfer
      </div>
      <div>
        <LinkButton onClick={logout}>Logout</LinkButton>
      </div>
    </div>
  );
}

export default AuthHeader;
